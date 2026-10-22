import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Category, Order, Participant } from '@/lib/types';

export const dynamic = 'force-dynamic';

// PRESET MOCK ORDERS UNTUK PENGUJIAN INSTAN & RESILIENSI OFFLINE
const FALLBACK_DEMO_ORDERS: Record<string, {
  order: Order;
  category: Category;
  participants: Participant[];
}> = {
  'GX-2026-PAY-8829': {
    order: {
      id: 'order-demo-120_SINGLE',
      order_id: 'GX-2026-PAY-8829',
      category_id: '120_SINGLE',
      package_type: 'MEDAL_JERSEY',
      gross_amount: 370000,
      discount_meal_coupon: 0,
      discount_promo: 50000,
      promo_code: 'GXID2026',
      net_amount: 320000,
      payment_status: 'PENDING',
      created_at: new Date().toISOString(),
    },
    category: {
      id: '120_SINGLE',
      name: '120 KM AMAZING RACE (SINGLE)',
      distance_km: 120,
      category_type: 'race',
      is_pair: false,
      price_medal_only: 300000,
      price_medal_jersey: 350000,
      quota: 150,
      current_enrolled: 72,
      cot_hours: 11,
      wave_start_time: '05:30',
      prologue_required_km: 0,
      mandatory_pitstop_cp: 4,
      tracking_required: true,
      is_active: true,
    },
    participants: [
      {
        id: 'part-demo-1',
        order_id: 'order-demo-120_SINGLE',
        registration_code: 'GX26-PAY-1201',
        bib_number: null,
        rider_role: 'SINGLE',
        full_name: 'ADITYA PRATAMA',
        gender: 'male',
        birth_date: '1995-04-12',
        email: 'aditya.pratama@grindurance.id',
        phone_number: '081234567890',
        emergency_contact_name: 'Budi Santoso',
        emergency_contact_phone: '081298765432',
        blood_type: 'O+',
        medical_notes: 'Alergi Penisilin ringan',
        community_chapter: 'GX-ID JABODETABEK',
        jersey_size: 'L',
        category_id: '120_SINGLE',
        has_meal_coupon: true,
        prologue_status: 'NOT_REQUIRED',
        created_at: new Date().toISOString(),
        status: 'REGISTERED',
        qr_checkin_hash: 'QR-1201-GX26',
      },
    ],
  },
  '081234567890': {
    order: {
      id: 'order-demo-120_SINGLE',
      order_id: 'GX-2026-PAY-8829',
      category_id: '120_SINGLE',
      package_type: 'MEDAL_JERSEY',
      gross_amount: 370000,
      discount_meal_coupon: 0,
      discount_promo: 50000,
      promo_code: 'GXID2026',
      net_amount: 320000,
      payment_status: 'PENDING',
      created_at: new Date().toISOString(),
    },
    category: {
      id: '120_SINGLE',
      name: '120 KM AMAZING RACE (SINGLE)',
      distance_km: 120,
      category_type: 'race',
      is_pair: false,
      price_medal_only: 300000,
      price_medal_jersey: 350000,
      quota: 150,
      current_enrolled: 72,
      cot_hours: 11,
      wave_start_time: '05:30',
      prologue_required_km: 0,
      mandatory_pitstop_cp: 4,
      tracking_required: true,
      is_active: true,
    },
    participants: [
      {
        id: 'part-demo-1',
        order_id: 'order-demo-120_SINGLE',
        registration_code: 'GX26-PAY-1201',
        bib_number: null,
        rider_role: 'SINGLE',
        full_name: 'ADITYA PRATAMA',
        gender: 'male',
        birth_date: '1995-04-12',
        email: 'aditya.pratama@grindurance.id',
        phone_number: '081234567890',
        emergency_contact_name: 'Budi Santoso',
        emergency_contact_phone: '081298765432',
        blood_type: 'O+',
        medical_notes: 'Alergi Penisilin ringan',
        community_chapter: 'GX-ID JABODETABEK',
        jersey_size: 'L',
        category_id: '120_SINGLE',
        has_meal_coupon: true,
        prologue_status: 'NOT_REQUIRED',
        created_at: new Date().toISOString(),
        status: 'REGISTERED',
        qr_checkin_hash: 'QR-1201-GX26',
      },
    ],
  },
  'GX26-PAY-1201': {
    order: {
      id: 'order-demo-120_SINGLE',
      order_id: 'GX-2026-PAY-8829',
      category_id: '120_SINGLE',
      package_type: 'MEDAL_JERSEY',
      gross_amount: 370000,
      discount_meal_coupon: 0,
      discount_promo: 50000,
      promo_code: 'GXID2026',
      net_amount: 320000,
      payment_status: 'PENDING',
      created_at: new Date().toISOString(),
    },
    category: {
      id: '120_SINGLE',
      name: '120 KM AMAZING RACE (SINGLE)',
      distance_km: 120,
      category_type: 'race',
      is_pair: false,
      price_medal_only: 300000,
      price_medal_jersey: 350000,
      quota: 150,
      current_enrolled: 72,
      cot_hours: 11,
      wave_start_time: '05:30',
      prologue_required_km: 0,
      mandatory_pitstop_cp: 4,
      tracking_required: true,
      is_active: true,
    },
    participants: [
      {
        id: 'part-demo-1',
        order_id: 'order-demo-120_SINGLE',
        registration_code: 'GX26-PAY-1201',
        bib_number: null,
        rider_role: 'SINGLE',
        full_name: 'ADITYA PRATAMA',
        gender: 'male',
        birth_date: '1995-04-12',
        email: 'aditya.pratama@grindurance.id',
        phone_number: '081234567890',
        emergency_contact_name: 'Budi Santoso',
        emergency_contact_phone: '081298765432',
        blood_type: 'O+',
        medical_notes: 'Alergi Penisilin ringan',
        community_chapter: 'GX-ID JABODETABEK',
        jersey_size: 'L',
        category_id: '120_SINGLE',
        has_meal_coupon: true,
        prologue_status: 'NOT_REQUIRED',
        created_at: new Date().toISOString(),
        status: 'REGISTERED',
        qr_checkin_hash: 'QR-1201-GX26',
      },
    ],
  },
};

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Kata kunci pencarian (Nomor WhatsApp, Kode Registrasi, atau Order ID) wajib diisi.' },
        { status: 400 }
      );
    }

    const cleanQuery = query.trim();

    // 1. Cek dulu apakah ada di fallback demo dataset (untuk testing offline)
    if (FALLBACK_DEMO_ORDERS[cleanQuery]) {
      const match = FALLBACK_DEMO_ORDERS[cleanQuery];
      return NextResponse.json({
        success: true,
        order: match.order,
        category: match.category,
        participants: match.participants,
        source: 'telemetry_cache',
      });
    }

    // 2. Query ke Supabase Database
    try {
      // Cari via participants (phone_number, registration_code, email)
      const isPhone = /^[0-9+]+$/.test(cleanQuery);
      let participantQuery = supabase
        .from('participants')
        .select(`
          id,
          order_id,
          registration_code,
          bib_number,
          rider_role,
          full_name,
          gender,
          birth_date,
          email,
          phone_number,
          emergency_contact_name,
          emergency_contact_phone,
          blood_type,
          medical_notes,
          community_chapter,
          jersey_size,
          status,
          qr_checkin_hash,
          category:categories (
            id,
            name,
            distance_km,
            category_type,
            is_pair,
            price_medal_only,
            price_medal_jersey,
            quota,
            current_enrolled,
            cot_hours,
            wave_start_time,
            prologue_required_km,
            mandatory_pitstop_cp,
            tracking_required,
            is_active
          )
        `);

      if (isPhone) {
        participantQuery = participantQuery.ilike('phone_number', `%${cleanQuery}%`);
      } else {
        participantQuery = participantQuery.or(`registration_code.ilike.%${cleanQuery}%,email.ilike.%${cleanQuery}%`);
      }

      const { data: participantsData, error: partError } = await participantQuery.limit(5);

      if (!partError && participantsData && participantsData.length > 0) {
        const primaryParticipant = participantsData[0];
        const targetOrderId = primaryParticipant.order_id;

        // Ambil data order lengkap
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', targetOrderId)
          .single();

        if (!orderError && orderData) {
          // Ambil semua partner/peserta pada order ini
          const { data: allParticipants } = await supabase
            .from('participants')
            .select('*')
            .eq('order_id', targetOrderId);

          return NextResponse.json({
            success: true,
            order: orderData,
            category: primaryParticipant.category,
            participants: allParticipants || [primaryParticipant],
            source: 'database',
          });
        }
      }

      // Cari langsung via orders table (order_id)
      const { data: directOrder, error: directOrderError } = await supabase
        .from('orders')
        .select(`
          *,
          category:categories (*)
        `)
        .or(`id.eq.${cleanQuery},order_id.ilike.%${cleanQuery}%`)
        .single();

      if (!directOrderError && directOrder) {
        const { data: orderParticipants } = await supabase
          .from('participants')
          .select('*')
          .eq('order_id', directOrder.id);

        return NextResponse.json({
          success: true,
          order: directOrder,
          category: directOrder.category,
          participants: orderParticipants || [],
          source: 'database_direct',
        });
      }
    } catch (dbErr) {
      console.warn('Supabase query error in lookup, checking fallback:', dbErr);
    }

    return NextResponse.json(
      {
        error: 'Data tagihan atau pendaftaran tidak ditemukan. Pastikan Nomor WhatsApp atau Kode Registrasi sudah benar.',
      },
      { status: 404 }
    );
  } catch (err: any) {
    console.error('Error in /api/orders/lookup:', err);
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan sistem saat mencari tagihan.' },
      { status: 500 }
    );
  }
}
