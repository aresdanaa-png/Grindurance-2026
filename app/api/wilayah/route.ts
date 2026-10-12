import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'provinces';
    const id = searchParams.get('id');

    let targetUrl = '';
    if (type === 'provinces') {
      targetUrl = 'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json';
    } else if (type === 'regencies' && id) {
      targetUrl = `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`;
    } else if (type === 'districts' && id) {
      targetUrl = `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`;
    } else if (type === 'villages' && id) {
      targetUrl = `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`;
    } else {
      return NextResponse.json({ error: 'Parameter tidak valid' }, { status: 400 });
    }

    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GrinduranceBot/1.0)',
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Upstream returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Error fetching wilayah Indonesia:', err);
    return NextResponse.json(
      { error: err.message || 'Gagal memuat data wilayah Indonesia' },
      { status: 500 }
    );
  }
}
