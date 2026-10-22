import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAdminRequest } from '@/lib/auth/adminAuth';

export const dynamic = 'force-dynamic';

/**
 * Format string agar aman di CSV (escape quotes dan wrap with double quotes jika ada koma/newline)
 */
function escapeCsv(value: any): string {
  if (value === null || value === undefined) return '""';
  const str = String(value).trim();
  // Double-quote escape
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Format label kategori ramah cetak & rekap
 */
function getCategoryDisplayName(catId: string, isPair?: boolean): string {
  switch (catId) {
    case '70':
    case '60':
      return '70 KM FUN GRAVEL';
    case '100':
    case '80':
      return '100 KM FONDO';
    case '120':
    case '120_SINGLE':
      return isPair ? '120 KM RACE (PAIR MIX)' : '120 KM RACE (SINGLE)';
    case '120_PAIR':
      return '120 KM RACE (PAIR MIX)';
    case '150':
      return '150 KM GRAND FONDO';
    case '200':
      return '200 KM ULTRA';
    case 'VIRTUAL':
      return 'VIRTUAL RIDE';
    default:
      return catId ? `KATEGORI ${catId}` : 'UMUM';
  }
}

export async function GET(req: Request) {
  try {
    // 1. Verifikasi Sesi Admin
    const auth = verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json({ error: 'Akses ditolak. Sesi admin tidak valid.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get('category_id') || 'ALL';
    const statusFilter = searchParams.get('status') || 'ALL';

    // 2. Query Orders dan Participants dari Supabase
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
        paid_at,
        created_at,
        raw_payload,
        category:categories (
          id,
          name,
          distance_km,
          is_pair
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
      .order('created_at', { ascending: true });

    if (statusFilter !== 'ALL') {
      query = query.eq('payment_status', statusFilter);
    }

    if (categoryFilter !== 'ALL') {
      query = query.eq('category_id', categoryFilter);
    }

    const { data: rawOrders, error } = await query;

    if (error) {
      console.error('Error fetching data for roster export:', error);
      return NextResponse.json({ error: 'Gagal mengambil data roster: ' + error.message }, { status: 500 });
    }

    // 3. Kolom CSV Header
    const headers = [
      'No',
      'No. BIB',
      'Kategori Etape',
      'Order ID',
      'Kode Registrasi',
      'Nama Lengkap Rider',
      'Role Rider',
      'Jenis Kelamin',
      'Tanggal Lahir',
      'Golongan Darah',
      'No. WhatsApp / HP',
      'Email',
      'Komunitas / Chapter',
      'Kontak Darurat (Nama)',
      'Kontak Darurat (No. HP)',
      'Paket Pendaftaran',
      'Ukuran Jersey Pollride',
      'Kupon Makan',
      'Catatan Medis',
      'Status Pembayaran',
      'Status Peserta',
      'Nominal Bayar (IDR)',
      'Waktu Registrasi',
      'Waktu Bayar / Verifikasi',
    ];

    const rows: string[][] = [];
    let rowNumber = 1;

    (rawOrders || []).forEach((o: any) => {
      let participants = o.participants || [];
      const paidParts = o.raw_payload?.paid_participants || [];

      // Merge verified BIB & status from raw_payload jika ada
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
            };
          }
          return p;
        });
      }

      const catName = getCategoryDisplayName(o.category_id, o.category?.is_pair);
      const isMedalJersey = o.package_type === 'MEDAL_JERSEY';
      const packageLabel = isMedalJersey ? 'Medali + Jersey Pollride' : 'Medali Saja';

      participants.forEach((p: any) => {
        const bib = p.bib_number ? String(p.bib_number) : 'BELUM TERBIT';
        const genderLabel = p.gender === 'female' ? 'Perempuan' : 'Laki-Laki';
        const roleLabel =
          p.rider_role === 'PAIR_RIDER_1'
            ? 'Pair Rider 1'
            : p.rider_role === 'PAIR_RIDER_2'
            ? 'Pair Rider 2'
            : 'Single';
        const jerseySize = isMedalJersey ? (p.jersey_size || '-') : 'TIDAK IKUT PO';
        const mealCoupon = p.has_meal_coupon ? 'YA' : 'TIDAK';

        rows.push([
          String(rowNumber++),
          bib,
          catName,
          o.order_id || '-',
          p.registration_code || '-',
          p.full_name || '-',
          roleLabel,
          genderLabel,
          p.birth_date || '-',
          p.blood_type || '-',
          p.phone_number || '-',
          p.email || '-',
          p.community_chapter || 'Umum',
          p.emergency_contact_name || '-',
          p.emergency_contact_phone || '-',
          packageLabel,
          jerseySize,
          mealCoupon,
          p.medical_notes || 'Tidak Ada',
          o.payment_status || 'PENDING',
          p.status || 'REGISTERED',
          String(o.net_amount || 0),
          o.created_at ? new Date(o.created_at).toLocaleString('id-ID') : '-',
          o.paid_at ? new Date(o.paid_at).toLocaleString('id-ID') : '-',
        ]);
      });
    });

    // 4. Rakit file CSV dengan UTF-8 BOM (\uFEFF) untuk kompatibilitas sempurna Excel
    const csvContent =
      '\uFEFF' +
      headers.map(escapeCsv).join(',') +
      '\r\n' +
      rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = `GXID_Roster_Grindurance_2026_${categoryFilter}_${dateStr}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
  } catch (err: any) {
    console.error('Error in export-roster API:', err);
    return NextResponse.json({ error: err.message || 'Gagal mengekspor data roster.' }, { status: 500 });
  }
}
