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
    const { category_id, package_type, rpc_method, rider_1, rider_2, waiver_agreed } = body;

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

    // 2. Hitung Harga Bruto (Gross Amount) termasuk Opsi Handling Fee RPC Rp 20.000 jika dipilih
    const rpc_handling_fee = (rpc_method === 'HANDLING' && category_id !== 'VIRTUAL') ? 20000 : 0;
    const base_amount = package_type === 'MEDAL_JERSEY'
      ? Number(category.price_medal_jersey)
      : Number(category.price_medal_only);
    const gross_amount = base_amount + rpc_handling_fee;

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
        raw_payload: {
          rider_1,
          rider_2,
          category_id,
          package_type,
          rpc_method: rpc_method ?? 'PICKUP',
          rpc_handling_fee,
          registered_at: new Date().toISOString(),
        },
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
    const buildParticipantObj = (rider: any, role: string, hasCoupon: boolean) => ({
      order_id: newOrder.id,
      registration_code: `GG26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      rider_role: role,
      full_name: rider.full_name,
      nik: rider.nik || null,
      gender: rider.gender,
      birth_date: rider.birth_date || null,
      religion: rider.religion || null,
      email: rider.email,
      phone_number: rider.phone_number,
      address_detail: rider.address_detail || null,
      province_id: rider.province_id || null,
      province_name: rider.province_name || null,
      regency_id: rider.regency_id || null,
      regency_name: rider.regency_name || null,
      district_id: rider.district_id || null,
      district_name: rider.district_name || null,
      village_id: rider.village_id || null,
      village_name: rider.village_name || null,
      postal_code: rider.postal_code || null,
      emergency_contact_name: rider.emergency_contact_name,
      emergency_contact_phone: rider.emergency_contact_phone,
      blood_type: rider.blood_type || '-',
      medical_notes: rider.medical_notes || null,
      community_chapter: rider.community_chapter || 'Umum',
      category_id,
      jersey_size: package_type === 'MEDAL_JERSEY' ? rider.jersey_size : '-',
      has_meal_coupon: hasCoupon,
      status: 'REGISTERED',
      prologue_status: category.prologue_required_km > 0 ? 'WAITING_VERIFICATION' : 'NOT_REQUIRED',
    });

    const participantsToInsert = [
      buildParticipantObj(rider_1, category.is_pair ? 'PAIR_RIDER_1' : 'SINGLE', rider_1_has_coupon),
    ];

    if (category.is_pair && rider_2) {
      participantsToInsert.push(
        buildParticipantObj(rider_2, 'PAIR_RIDER_2', rider_2_has_coupon)
      );
    }

    // Coba insert dengan kolom lengkap
    let insertedParticipants: any[] | null = null;
    const { data: fullInsertData, error: fullInsertError } = await supabase
      .from('participants')
      .insert(participantsToInsert)
      .select();

    if (fullInsertError) {
      // Jika kolom belum ditambahkan di Supabase DB (PGRST204 / 42703 / column not found), fallback ke kolom dasar
      const isColumnMissing =
        fullInsertError.code === '42703' ||
        fullInsertError.code === 'PGRST204' ||
        fullInsertError.message?.toLowerCase().includes('column') ||
        fullInsertError.message?.toLowerCase().includes('schema cache');

      if (isColumnMissing) {
        console.warn('Kolom baru belum ada di tabel Supabase, fallback ke skema dasar sambil simpan di raw_payload');
        const fallbackParticipants = participantsToInsert.map((p) => {
          const {
            nik, address_detail, province_id, province_name, regency_id, regency_name,
            district_id, district_name, village_id, village_name, postal_code, medical_notes, religion,
            ...base
          } = p as any;
          return base;
        });

        const { data: fallbackData, error: fallbackError } = await supabase
          .from('participants')
          .insert(fallbackParticipants)
          .select();

        if (fallbackError) {
          console.error('Fallback participant insert error:', fallbackError);
          return NextResponse.json(
            { error: 'Gagal menyimpan data peserta: ' + fallbackError.message },
            { status: 500 }
          );
        }
        // Gabungkan kembali data input untuk response frontend
        insertedParticipants = (fallbackData || []).map((fb, idx) => ({
          ...fb,
          ...participantsToInsert[idx],
        }));
      } else {
        console.error('Error inserting participants:', fullInsertError);
        return NextResponse.json(
          { error: 'Gagal menyimpan data peserta: ' + fullInsertError.message },
          { status: 500 }
        );
      }
    } else {
      insertedParticipants = fullInsertData;
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
