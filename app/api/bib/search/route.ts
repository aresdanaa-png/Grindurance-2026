import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'Kata kunci pencarian wajib diisi.' }, { status: 400 });
    }

    const cleanQuery = query.trim();

    // Cari berdasarkan nomor BIB (jika input angka) atau kode registrasi atau nama
    let dbQuery = supabase
      .from('participants')
      .select(`
        id,
        order_id,
        registration_code,
        bib_number,
        rider_role,
        full_name,
        gender,
        phone_number,
        blood_type,
        community_chapter,
        jersey_size,
        status,
        qr_checkin_hash,
        category:categories (
          id,
          name,
          distance_km,
          category_type
        ),
        order:orders (
          id,
          order_id,
          package_type,
          payment_status,
          net_amount
        )
      `);

    const isNumeric = /^\d+$/.test(cleanQuery);
    if (isNumeric) {
      dbQuery = dbQuery.or(`bib_number.eq.${cleanQuery},phone_number.ilike.%${cleanQuery}%`);
    } else {
      dbQuery = dbQuery.or(`registration_code.ilike.%${cleanQuery}%,full_name.ilike.%${cleanQuery}%`);
    }

    const { data: participants, error } = await dbQuery.limit(5);

    if (error) {
      console.error('Error searching BIB:', error);
      return NextResponse.json({ error: 'Gagal mencari data peserta.' }, { status: 500 });
    }

    // Mask nomor HP demi privasi data sebelum dikirim ke browser
    const sanitized = (participants || []).map((p: any) => ({
      ...p,
      phone_number: p.phone_number
        ? p.phone_number.slice(0, 4) + '****' + p.phone_number.slice(-3)
        : '',
    }));

    return NextResponse.json({
      success: true,
      results: sanitized,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan sistem.' },
      { status: 500 }
    );
  }
}
