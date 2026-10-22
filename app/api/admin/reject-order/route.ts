import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAdminRequest } from '@/lib/auth/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json({ error: 'Akses ditolak. Sesi admin tidak valid.' }, { status: 401 });
    }

    const { order_id, reason = 'Bukti transfer tidak valid atau nominal tidak sesuai.' } = await req.json();

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID wajib disertakan.' }, { status: 400 });
    }

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(order_id);
    const orderQuery = isUuid
      ? supabase.from('orders').select('*').or(`order_id.eq.${order_id},id.eq.${order_id}`)
      : supabase.from('orders').select('*').eq('order_id', order_id);

    const { data: order, error: orderErr } = await orderQuery.single();

    if (orderErr || !order) {
      return NextResponse.json({ error: 'Order tidak ditemukan.' }, { status: 404 });
    }

    const nowIso = new Date().toISOString();
    const updatedRawPayload = {
      ...(order.raw_payload || {}),
      rejected_by: auth.username || 'panitia',
      rejected_at: nowIso,
      rejection_reason: reason,
    };

    const { data: updatedOrder, error: updateErr } = await supabase
      .from('orders')
      .update({
        payment_status: 'REJECTED',
        admin_notes: reason,
        raw_payload: updatedRawPayload,
        updated_at: nowIso,
      })
      .eq('id', order.id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: 'Gagal menolak pesanan: ' + updateErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Pesanan ${order.order_id} berhasil ditolak dengan catatan: ${reason}`,
      order: updatedOrder,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Gagal memproses penolakan order.' }, { status: 500 });
  }
}
