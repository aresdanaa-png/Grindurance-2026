import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { RegistrationPayload } from '@/lib/types';

export const dynamic = 'force-dynamic';

function calculateAge(birthDateString?: string): number {
  if (!birthDateString) return 25; // default adult if omitted
  const today = new Date();
  const birth = new Date(birthDateString);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export async function POST(req: Request) {
  try {
    const body: RegistrationPayload = await req.json();
    const { category_id, package_type, rider_1, rider_2, waiver_agreed } = body;

    if (!waiver_agreed) {
      return NextResponse.json(
        { error: 'Anda wajib menyetujui pernyataan keselamatan dan pelepasan tanggung jawab (waiver).' },
        { status: 400 }
      );
    }

    if (!category_id || !package_type || !rider_1) {
      return NextResponse.json(
        { error: 'Data pendaftaran belum lengkap.' },
        { status: 400 }
      );
    }

    // 1. Ambil data kategori dari Supabase
    const { data: category, error: catError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', category_id)
      .single();

    if (catError || !category) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan atau tidak aktif.' },
        { status: 404 }
      );
    }

    // Cek kuota
    if (category.current_enrolled >= category.quota) {
      return NextResponse.json(
        { error: `Kuota untuk kategori ${category.name} sudah penuh.` },
        { status: 400 }
      );
    }

    // Jika kategori Pair, wajib ada rider_2
    if (category.is_pair && !rider_2) {
      return NextResponse.json(
        { error: 'Kategori Pair membutuhkan data Rider 2 (Partner).' },
        { status: 400 }
      );
    }

    // 2. Hitung Harga Bruto (Gross Amount)
    const gross_amount = package_type === 'MEDAL_JERSEY'
      ? Number(category.price_medal_jersey)
      : Number(category.price_medal_only);

    // 3. Hitung Insentif Meal Coupon Rp 50.000 sesuai aturan resmi GX-ID
    // Aturan: Wanita, Remaja <= 17 th, Pair Mix (Men & Women), atau Pair (Women & Women)
    // Pengecualian: Pair (Men & Men) TIDAK DAPAT kupon
    let discount_meal_coupon = 0;
    let rider_1_has_coupon = false;
    let rider_2_has_coupon = false;

    if (!category.is_pair) {
      // Single Rider
      const age1 = calculateAge(rider_1.birth_date);
      if (rider_1.gender === 'female' || age1 <= 17) {
        discount_meal_coupon = 50000;
        rider_1_has_coupon = true;
      }
    } else if (rider_2) {
      // Pair Rider
      const isMenAndMen = rider_1.gender === 'male' && rider_2.gender === 'male';
      if (!isMenAndMen) {
        // Pair Mix atau Pair Women & Women berhak 1 kupon per pair (Rp 50.000)
        discount_meal_coupon = 50000;
        rider_1_has_coupon = true;
        rider_2_has_coupon = false;
      }
    }

    const net_amount = Math.max(0, gross_amount - discount_meal_coupon);

    // Generate kode unik
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const order_id = `GG26-ORD-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    // 4. Buat Order di Supabase
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_id,
        category_id,
        package_type,
        gross_amount,
        discount_meal_coupon,
        net_amount,
        payment_status: 'PENDING',
        payment_channel: null,
      })
      .select()
      .single();

    if (orderError || !newOrder) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Gagal membuat pesanan di database: ' + (orderError?.message || '') },
        { status: 500 }
      );
    }

    // 5. Tambahkan Peserta (Participants)
    const participantsToInsert = [
      {
        order_id: newOrder.id,
        registration_code: `GG26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        rider_role: category.is_pair ? 'PAIR_RIDER_1' : 'SINGLE',
        full_name: rider_1.full_name,
        gender: rider_1.gender,
        birth_date: rider_1.birth_date || null,
        email: rider_1.email,
        phone_number: rider_1.phone_number,
        emergency_contact_name: rider_1.emergency_contact_name,
        emergency_contact_phone: rider_1.emergency_contact_phone,
        blood_type: rider_1.blood_type || '-',
        community_chapter: rider_1.community_chapter || 'Umum',
        category_id,
        jersey_size: package_type === 'MEDAL_JERSEY' ? rider_1.jersey_size : '-',
        has_meal_coupon: rider_1_has_coupon,
        status: 'REGISTERED',
        prologue_status: category.prologue_required_km > 0 ? 'WAITING_VERIFICATION' : 'NOT_REQUIRED',
      },
    ];

    if (category.is_pair && rider_2) {
      participantsToInsert.push({
        order_id: newOrder.id,
        registration_code: `GG26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        rider_role: 'PAIR_RIDER_2',
        full_name: rider_2.full_name,
        gender: rider_2.gender,
        birth_date: rider_2.birth_date || null,
        email: rider_2.email,
        phone_number: rider_2.phone_number,
        emergency_contact_name: rider_2.emergency_contact_name,
        emergency_contact_phone: rider_2.emergency_contact_phone,
        blood_type: rider_2.blood_type || '-',
        community_chapter: rider_2.community_chapter || 'Umum',
        category_id,
        jersey_size: package_type === 'MEDAL_JERSEY' ? rider_2.jersey_size : '-',
        has_meal_coupon: rider_2_has_coupon,
        status: 'REGISTERED',
        prologue_status: category.prologue_required_km > 0 ? 'WAITING_VERIFICATION' : 'NOT_REQUIRED',
      });
    }

    const { data: insertedParticipants, error: partError } = await supabase
      .from('participants')
      .insert(participantsToInsert)
      .select();

    if (partError) {
      console.error('Error inserting participants:', partError);
      return NextResponse.json(
        { error: 'Gagal menyimpan data peserta: ' + partError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: newOrder,
      participants: insertedParticipants,
    });
  } catch (err: any) {
    console.error('Registration exception:', err);
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan sistem saat mendaftar.' },
      { status: 500 }
    );
  }
}
