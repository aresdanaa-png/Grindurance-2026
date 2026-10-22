import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAdminRequest } from '@/lib/auth/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json({ error: 'Akses ditolak. Sesi admin tidak valid.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get('status') || 'ALL';
    const categoryFilter = searchParams.get('category_id') || 'ALL';
    const searchQuery = (searchParams.get('search') || '').trim().toLowerCase();

    // 1. Ambil data orders beserta participants dan categories
    let query = supabase
      .from('orders')
      .select(`
        id,
        order_id,
        category_id,
        package_type,
        gross_amount,
        discount_meal_coupon,
        net_amount,
        payment_status,
        payment_channel,
        proof_of_payment_url,
        paid_at,
        created_at,
        updated_at,
        raw_payload,
        category:categories (
          id,
          name,
          distance_km,
          category_type,
          is_pair,
          price_medal_only,
          price_medal_jersey,
          quota,
          current_enrolled
        ),
        participants (
          id,
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
          community_chapter,
          jersey_size,
          has_meal_coupon,
          status,
          prologue_status,
          qr_checkin_hash,
          created_at
        )
      `)
      .order('created_at', { ascending: false });

    if (statusFilter !== 'ALL') {
      query = query.eq('payment_status', statusFilter);
    }

    if (categoryFilter !== 'ALL') {
      query = query.eq('category_id', categoryFilter);
    }

    const { data: rawOrders, error } = await query;

    if (error) {
      console.error('Error fetching admin orders:', error);
      return NextResponse.json({ error: 'Gagal mengambil data pesanan: ' + error.message }, { status: 500 });
    }

    let orders = (rawOrders || []).map((o: any) => {
      let participants = o.participants || [];
      const paidParts = o.raw_payload?.paid_participants || [];

      if (paidParts.length > 0) {
        participants = participants.map((p: any) => {
          const matched = paidParts.find(
            (pp: any) => pp.id === p.id || pp.registration_code === p.registration_code
          );
          if (matched && matched.bib_number) {
            return {
              ...p,
              bib_number: matched.bib_number,
              status: matched.status || 'PAID',
              qr_checkin_hash: matched.qr_checkin_hash || p.qr_checkin_hash,
            };
          }
          return p;
        });
      }

      return {
        ...o,
        discount_promo: o.raw_payload?.discount_promo || 0,
        promo_code: o.raw_payload?.promo_code || null,
        participants,
      };
    });

    // Filter pencarian client-side (nama rider, no HP, order_id, BIB)
    if (searchQuery) {
      orders = orders.filter((o: any) => {
        const matchOrderId = (o.order_id || '').toLowerCase().includes(searchQuery);
        const matchParticipants = (o.participants || []).some((p: any) =>
          (p.full_name || '').toLowerCase().includes(searchQuery) ||
          (p.phone_number || '').toLowerCase().includes(searchQuery) ||
          (p.registration_code || '').toLowerCase().includes(searchQuery) ||
          String(p.bib_number || '').includes(searchQuery)
        );
        return matchOrderId || matchParticipants;
      });
    }

    // 2. Hitung KPI Real-Time & Rekap PO Jersey Vendor (Pollride)
    let totalRevenue = 0;
    let pendingVerificationCount = 0;
    let paidOrdersCount = 0;
    let totalRegisteredParticipants = 0;

    const jerseyRecap: Record<string, { total: number; male: number; female: number }> = {
      'XS': { total: 0, male: 0, female: 0 },
      'S': { total: 0, male: 0, female: 0 },
      'M': { total: 0, male: 0, female: 0 },
      'L': { total: 0, male: 0, female: 0 },
      'XL': { total: 0, male: 0, female: 0 },
      '2XL': { total: 0, male: 0, female: 0 },
      '3XL': { total: 0, male: 0, female: 0 },
      '4XL': { total: 0, male: 0, female: 0 },
      '5XL': { total: 0, male: 0, female: 0 },
    };

    let totalJerseyCount = 0;

    (rawOrders || []).forEach((o: any) => {
      const isPaid = o.payment_status === 'PAID';
      const isPendingVerif = o.payment_status === 'PENDING_VERIFICATION';

      if (isPaid) {
        totalRevenue += Number(o.net_amount || 0);
        paidOrdersCount++;
      }

      if (isPendingVerif) {
        pendingVerificationCount++;
      }

      (o.participants || []).forEach((p: any) => {
        totalRegisteredParticipants++;
        const size = (p.jersey_size || '').trim().toUpperCase();

        if (o.package_type === 'MEDAL_JERSEY' && size && size !== '-') {
          const normSize = size === 'XXL' ? '2XL' : size;
          if (!jerseyRecap[normSize]) {
            jerseyRecap[normSize] = { total: 0, male: 0, female: 0 };
          }
          jerseyRecap[normSize].total++;
          totalJerseyCount++;
          if (p.gender === 'female') {
            jerseyRecap[normSize].female++;
          } else {
            jerseyRecap[normSize].male++;
          }
        }
      });
    });

    return NextResponse.json({
      success: true,
      orders,
      kpis: {
        total_orders: (rawOrders || []).length,
        paid_orders: paidOrdersCount,
        pending_verification: pendingVerificationCount,
        total_revenue: totalRevenue,
        total_participants: totalRegisteredParticipants,
        total_jersey_po: totalJerseyCount,
        jersey_size_breakdown: jerseyRecap,
      },
    });
  } catch (err: any) {
    console.error('Error in admin/orders route:', err);
    return NextResponse.json({ error: err.message || 'Gagal memproses permintaan data admin.' }, { status: 500 });
  }
}
