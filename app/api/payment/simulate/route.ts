import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID wajib disertakan.' }, { status: 400 });
    }

    // 1. Update status order menjadi PAID
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'PAID',
        payment_channel: 'SIMULATOR',
        paid_at: new Date().toISOString(),
      })
      .eq('order_id', order_id)
      .select()
      .single();

    if (updateError || !updatedOrder) {
      return NextResponse.json(
        { error: 'Gagal memperbarui status order: ' + (updateError?.message || '') },
        { status: 500 }
      );
    }

    // 2. Ambil data peserta yang nomor BIB-nya sudah otomatis diterbitkan oleh trigger Supabase
    const { data: participants, error: partError } = await supabase
      .from('participants')
      .select('*')
      .eq('order_id', updatedOrder.id);

    return NextResponse.json({
      success: true,
      message: 'Simulasi pembayaran berhasil! Nomor BIB otomatis terbit.',
      order: updatedOrder,
      participants: participants || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Gagal memproses simulasi pembayaran.' },
      { status: 500 }
    );
  }
}
