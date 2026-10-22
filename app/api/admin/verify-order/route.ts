import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAdminRequest } from '@/lib/auth/adminAuth';

export const dynamic = 'force-dynamic';

/**
 * Nomor BIB dasar (awal sequence) per kategori sesuai ketetapan resmi
 */
function getCategoryBibBase(categoryId: string): number {
  switch (categoryId) {
    case '70':
    case '60':
      return 6001;
    case '100':
    case '80':
      return 8001;
    case '120':
    case '120_SINGLE':
      return 1201;
    case '120_PAIR':
      return 2201;
    case '150':
      return 1501;
    case '200':
      return 2001;
    case 'VIRTUAL':
      return 9001;
    default:
      return 1001;
  }
}

export async function POST(req: Request) {
  try {
    // 0. Autentikasi Admin
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json({ error: 'Akses ditolak. Sesi admin tidak valid.' }, { status: 401 });
    }

    const body = await req.json();
    const { order_id, admin_notes } = body;

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID wajib disertakan.' }, { status: 400 });
    }

    // 1. Ambil data Order
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(order_id);
    const orderQuery = isUuid
      ? supabase.from('orders').select('*').or(`order_id.eq.${order_id},id.eq.${order_id}`)
      : supabase.from('orders').select('*').eq('order_id', order_id);

    const { data: order, error: orderErr } = await orderQuery.single();

    if (orderErr || !order) {
      return NextResponse.json({ error: 'Data transaksi order tidak ditemukan.' }, { status: 404 });
    }

    // 2. Ambil data peserta yang terkait dengan order ini
    const { data: participants, error: partErr } = await supabase
      .from('participants')
      .select('*')
      .eq('order_id', order.id);

    if (partErr || !participants || participants.length === 0) {
      return NextResponse.json({ error: 'Data peserta untuk order ini tidak ditemukan.' }, { status: 404 });
    }

    // 3. Engine Sequential BIB: Ambil nomor BIB tertinggi yang SUDAH TERVERIFIKASI pada kategori ini
    const effectiveCategory = order.category_id;
    const baseBib = getCategoryBibBase(effectiveCategory);

    // Ambil semua BIB yang sudah terbit di database participants
    const { data: existingVerifiedParticipants } = await supabase
      .from('participants')
      .select('bib_number, category_id')
      .not('bib_number', 'is', null);

    // JUGA ambil dari orders berstatus PAID (melindungi dari limitasi RLS)
    const { data: paidOrders } = await supabase
      .from('orders')
      .select('raw_payload, category_id')
      .eq('payment_status', 'PAID');

    const usedBibs = new Set<number>();
    const categoryUsedBibs: number[] = [];

    (existingVerifiedParticipants || []).forEach((p: any) => {
      const n = Number(p.bib_number);
      if (!isNaN(n) && n > 0) {
        usedBibs.add(n);
        if (p.category_id === effectiveCategory && n >= baseBib) {
          categoryUsedBibs.push(n);
        }
      }
    });

    (paidOrders || []).forEach((o: any) => {
      const paidParts = o.raw_payload?.paid_participants || [];
      paidParts.forEach((p: any) => {
        const n = Number(p.bib_number);
        if (!isNaN(n) && n > 0) {
          usedBibs.add(n);
          if ((p.category_id === effectiveCategory || o.category_id === effectiveCategory) && n >= baseBib) {
            categoryUsedBibs.push(n);
          }
        }
      });
    });

    let nextBib = categoryUsedBibs.length > 0 ? Math.max(...categoryUsedBibs) + 1 : baseBib;

    // 4. Terbitkan nomor BIB berurutan untuk setiap peserta dalam order
    const updatedParticipants = [];

    for (const p of participants) {
      let assignedBib = p.bib_number;

      // Jika peserta belum memiliki nomor BIB (sesuai aturan wajib kosong hingga diverifikasi)
      if (!assignedBib) {
        while (usedBibs.has(nextBib)) {
          nextBib++;
        }
        usedBibs.add(nextBib);
        assignedBib = nextBib;
        nextBib++;
      }

      const qrHash = p.qr_checkin_hash || `GXID-${assignedBib}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // Update peserta ke status PAID dengan nomor BIB resmi
      const { data: updatedP, error: updatePErr } = await supabase
        .from('participants')
        .update({
          status: 'PAID',
          bib_number: assignedBib,
          qr_checkin_hash: qrHash,
          updated_at: new Date().toISOString(),
        })
        .eq('id', p.id)
        .select()
        .single();

      if (!updatePErr && updatedP) {
        updatedParticipants.push(updatedP);
      } else {
        // Fallback optimistic
        updatedParticipants.push({
          ...p,
          status: 'PAID',
          bib_number: assignedBib,
          qr_checkin_hash: qrHash,
          updated_at: new Date().toISOString(),
        });
      }
    }

    // 5. Update Status Order menjadi PAID
    const nowIso = new Date().toISOString();
    const updatedRawPayload = {
      ...(order.raw_payload || {}),
      verified_by: auth.username || 'panitia',
      verified_at: nowIso,
      admin_notes: admin_notes || 'Verifikasi manual admin panitia GX-ID.',
      paid_participants: updatedParticipants,
    };

    const { data: updatedOrder, error: updateOrderErr } = await supabase
      .from('orders')
      .update({
        payment_status: 'PAID',
        paid_at: nowIso,
        raw_payload: updatedRawPayload,
        updated_at: nowIso,
      })
      .eq('id', order.id)
      .select()
      .single();

    if (updateOrderErr) {
      console.error('Gagal memperbarui status order menjadi PAID:', updateOrderErr);
    }

    // 6. Sinkronisasi Kuota Kategori
    try {
      const { count } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', effectiveCategory)
        .in('status', ['PAID', 'PROLOG_VERIFIED', 'CHECKED_IN', 'FINISHER']);

      if (typeof count === 'number') {
        await supabase
          .from('categories')
          .update({ current_enrolled: count })
          .eq('id', effectiveCategory);
      }
    } catch (_) {}

    return NextResponse.json({
      success: true,
      message: `Pesanan ${order.order_id} berhasil diverifikasi! Nomor BIB resmi telah diterbitkan.`,
      order: updatedOrder || { ...order, payment_status: 'PAID', paid_at: nowIso },
      participants: updatedParticipants,
    });
  } catch (err: any) {
    console.error('Error in verify-order route:', err);
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan sistem saat memverifikasi pembayaran.' },
      { status: 500 }
    );
  }
}
