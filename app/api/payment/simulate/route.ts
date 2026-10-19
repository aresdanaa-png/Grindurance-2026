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
    let { data: participants, error: partError } = await supabase
      .from('participants')
      .select('*')
      .eq('order_id', updatedOrder.id);

    // 3. Fallback jika trigger PostgreSQL tidak aktif: pastikan status PAID dan nomor BIB terbit
    if (participants && participants.length > 0) {
      const needsBibOrPaid = participants.some((p: any) => !p.bib_number || p.status !== 'PAID');
      if (needsBibOrPaid) {
        const getCategoryBibBase = (catId: string): number => {
          switch (catId) {
            case '60': return 6001;
            case '80':
            case '100': return 8001;
            case '120':
            case '120_SINGLE': return 1201;
            case '120_PAIR': return 2201;
            case '150': return 1501;
            case '200': return 2001;
            case 'VIRTUAL': return 9001;
            default: return 1001;
          }
        };

        const { data: allParticipants } = await supabase
          .from('participants')
          .select('bib_number')
          .not('bib_number', 'is', null);

        const usedBibs = new Set<number>((allParticipants || []).map((p: any) => Number(p.bib_number)));
        let nextBib = getCategoryBibBase(updatedOrder.category_id);

        const enrichedParticipants = [];
        for (const p of participants) {
          let assignedBib = p.bib_number;
          if (!assignedBib) {
            while (usedBibs.has(nextBib)) {
              nextBib++;
            }
            usedBibs.add(nextBib);
            assignedBib = nextBib;
          }

          const qrHash = p.qr_checkin_hash || `GXID-${assignedBib}-${Date.now().toString(36).toUpperCase()}`;

          // Coba update ke database Supabase
          try {
            await supabase
              .from('participants')
              .update({
                status: 'PAID',
                bib_number: assignedBib,
                qr_checkin_hash: qrHash,
                updated_at: new Date().toISOString(),
              })
              .eq('id', p.id);
          } catch (_) {}

          enrichedParticipants.push({
            ...p,
            status: 'PAID',
            bib_number: assignedBib,
            qr_checkin_hash: qrHash,
            updated_at: new Date().toISOString(),
          });
        }

        // Ambil ulang jika database trigger berhasil memperbarui, jika tidak gunakan enrichedParticipants
        const { data: refreshedParticipants } = await supabase
          .from('participants')
          .select('*')
          .eq('order_id', updatedOrder.id);

        if (refreshedParticipants && refreshedParticipants.length > 0 && refreshedParticipants[0].bib_number) {
          participants = refreshedParticipants;
        } else {
          participants = enrichedParticipants;
          try {
            await supabase
              .from('orders')
              .update({
                raw_payload: {
                  ...(updatedOrder.raw_payload || {}),
                  paid_participants: enrichedParticipants,
                },
              })
              .eq('id', updatedOrder.id);
          } catch (_) {}
        }

        // Update kuota kategori
        const { count } = await supabase
          .from('participants')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', updatedOrder.category_id)
          .in('status', ['PAID', 'PROLOG_VERIFIED', 'CHECKED_IN', 'FINISHER']);

        if (typeof count === 'number') {
          await supabase
            .from('categories')
            .update({ current_enrolled: count })
            .eq('id', updatedOrder.category_id);
        }
      }
    }

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
