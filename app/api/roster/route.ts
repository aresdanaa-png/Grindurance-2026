import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export interface RosterEntry {
  id: string;
  bib_number: number;
  full_name: string;
  partner_name?: string | null;
  rider_role: string;
  category_id: string;
  category_name: string;
  distance_km: number;
  wave_start_time: string;
  gender: string;
  partner_gender?: string | null;
  community_chapter: string;
  jersey_size: string;
  package_type: string;
  status: 'CONFIRMED' | 'PROLOG_VERIFIED' | 'SCRUTINEERED' | 'ON_COURSE' | 'FINISHED';
  prologue_required: boolean;
  prologue_status: 'NOT_REQUIRED' | 'PENDING' | 'PASSED' | 'REJECTED';
  qr_checkin_hash: string;
  created_at: string;
}

// Realistic GX-ID Seed Roster representing various regional chapters
const SEED_ROSTER: RosterEntry[] = [
  {
    id: 'seed-2001',
    bib_number: 2001,
    full_name: 'Bagus Setyawan',
    rider_role: 'SINGLE',
    category_id: '200',
    category_name: '200 Ultra',
    distance_km: 200,
    wave_start_time: '05:30 WIB',
    gender: 'male',
    community_chapter: 'GX-ID Chapter Bandung Barat',
    jersey_size: 'L',
    package_type: 'MEDAL_JERSEY',
    status: 'PROLOG_VERIFIED',
    prologue_required: true,
    prologue_status: 'PASSED',
    qr_checkin_hash: 'gxid-2026-chk-2001-bagus',
    created_at: '2026-10-10T08:30:00Z',
  },
  {
    id: 'seed-2002',
    bib_number: 2002,
    full_name: 'Donny Prasetya',
    rider_role: 'SINGLE',
    category_id: '200',
    category_name: '200 Ultra',
    distance_km: 200,
    wave_start_time: '05:30 WIB',
    gender: 'male',
    community_chapter: 'GX-ID Chapter Jakarta Selatan',
    jersey_size: 'XL',
    package_type: 'MEDAL_JERSEY',
    status: 'CONFIRMED',
    prologue_required: true,
    prologue_status: 'PENDING',
    qr_checkin_hash: 'gxid-2026-chk-2002-donny',
    created_at: '2026-10-10T09:15:00Z',
  },
  {
    id: 'seed-2003',
    bib_number: 2003,
    full_name: 'Dewi Kartika',
    rider_role: 'SINGLE',
    category_id: '200',
    category_name: '200 Ultra',
    distance_km: 200,
    wave_start_time: '05:30 WIB',
    gender: 'female',
    community_chapter: 'GX-ID Chapter Bogor Raya',
    jersey_size: 'S',
    package_type: 'MEDAL_JERSEY',
    status: 'PROLOG_VERIFIED',
    prologue_required: true,
    prologue_status: 'PASSED',
    qr_checkin_hash: 'gxid-2026-chk-2003-dewi',
    created_at: '2026-10-10T10:00:00Z',
  },
  {
    id: 'seed-1501',
    bib_number: 1501,
    full_name: 'Rian Hidayat',
    rider_role: 'SINGLE',
    category_id: '150',
    category_name: '150 Grand Fondo',
    distance_km: 150,
    wave_start_time: '05:30 WIB',
    gender: 'male',
    community_chapter: 'GX-ID Chapter Bekasi Pesisir',
    jersey_size: 'M',
    package_type: 'MEDAL_JERSEY',
    status: 'PROLOG_VERIFIED',
    prologue_required: true,
    prologue_status: 'PASSED',
    qr_checkin_hash: 'gxid-2026-chk-1501-rian',
    created_at: '2026-10-10T11:20:00Z',
  },
  {
    id: 'seed-1502',
    bib_number: 1502,
    full_name: 'Faisal Ramadhan',
    rider_role: 'SINGLE',
    category_id: '150',
    category_name: '150 Grand Fondo',
    distance_km: 150,
    wave_start_time: '05:30 WIB',
    gender: 'male',
    community_chapter: 'GX-ID Chapter Solo Raya',
    jersey_size: 'L',
    package_type: 'MEDAL_ONLY',
    status: 'CONFIRMED',
    prologue_required: true,
    prologue_status: 'PENDING',
    qr_checkin_hash: 'gxid-2026-chk-1502-faisal',
    created_at: '2026-10-10T12:05:00Z',
  },
  {
    id: 'seed-2201',
    bib_number: 2201,
    full_name: 'Dimas Kurniawan',
    partner_name: 'Nadia Safitri',
    rider_role: 'PAIR_RIDER_1',
    category_id: '120_PAIR',
    category_name: '120 (Race) Pair Mix',
    distance_km: 120,
    wave_start_time: '06:00 WIB',
    gender: 'male',
    partner_gender: 'female',
    community_chapter: 'GX-ID Chapter Depok & Cikeas',
    jersey_size: 'L & S',
    package_type: 'MEDAL_JERSEY',
    status: 'CONFIRMED',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    qr_checkin_hash: 'gxid-2026-chk-2201-dimas-nadia',
    created_at: '2026-10-10T14:10:00Z',
  },
  {
    id: 'seed-2202',
    bib_number: 2202,
    full_name: 'Ahmad Maulana',
    partner_name: 'Teguh Wicaksono',
    rider_role: 'PAIR_RIDER_1',
    category_id: '120_PAIR',
    category_name: '120 (Race) Pair Mix',
    distance_km: 120,
    wave_start_time: '06:00 WIB',
    gender: 'male',
    partner_gender: 'male',
    community_chapter: 'GX-ID Chapter Surabaya Timur',
    jersey_size: 'M & XL',
    package_type: 'MEDAL_ONLY',
    status: 'CONFIRMED',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    qr_checkin_hash: 'gxid-2026-chk-2202-ahmad-teguh',
    created_at: '2026-10-10T15:20:00Z',
  },
  {
    id: 'seed-1201',
    bib_number: 1201,
    full_name: 'Hendrik Wijaya',
    rider_role: 'SINGLE',
    category_id: '120_SINGLE',
    category_name: '120 (Race) Single',
    distance_km: 120,
    wave_start_time: '06:00 WIB',
    gender: 'male',
    community_chapter: 'GX-ID Chapter Tangerang Raya',
    jersey_size: 'M',
    package_type: 'MEDAL_JERSEY',
    status: 'CONFIRMED',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    qr_checkin_hash: 'gxid-2026-chk-1201-hendrik',
    created_at: '2026-10-10T16:00:00Z',
  },
  {
    id: 'seed-1202',
    bib_number: 1202,
    full_name: 'Maya Angela',
    rider_role: 'SINGLE',
    category_id: '120_SINGLE',
    category_name: '120 (Race) Single',
    distance_km: 120,
    wave_start_time: '06:00 WIB',
    gender: 'female',
    community_chapter: 'GX-ID Chapter Semarang',
    jersey_size: 'S',
    package_type: 'MEDAL_JERSEY',
    status: 'CONFIRMED',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    qr_checkin_hash: 'gxid-2026-chk-1202-maya',
    created_at: '2026-10-10T16:45:00Z',
  },
  {
    id: 'seed-8001',
    bib_number: 8001,
    full_name: 'Bambang Soedjarwo (Master 50+)',
    rider_role: 'SINGLE',
    category_id: '100',
    category_name: '100 Fondo',
    distance_km: 100,
    wave_start_time: '07:00 WIB',
    gender: 'male',
    community_chapter: 'GX-ID Chapter Cibubur & Jonggol',
    jersey_size: 'XL',
    package_type: 'MEDAL_JERSEY',
    status: 'CONFIRMED',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    qr_checkin_hash: 'gxid-2026-chk-8001-bambang',
    created_at: '2026-10-11T09:00:00Z',
  },
  {
    id: 'seed-8002',
    bib_number: 8002,
    full_name: 'Yovita Lestari',
    rider_role: 'SINGLE',
    category_id: '100',
    category_name: '100 Fondo',
    distance_km: 100,
    wave_start_time: '07:00 WIB',
    gender: 'female',
    community_chapter: 'GX-ID Chapter Yogyakarta',
    jersey_size: 'M',
    package_type: 'MEDAL_ONLY',
    status: 'CONFIRMED',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    qr_checkin_hash: 'gxid-2026-chk-8002-yovita',
    created_at: '2026-10-11T10:30:00Z',
  },
  {
    id: 'seed-6001',
    bib_number: 6001,
    full_name: 'Kresna Wardhana',
    rider_role: 'SINGLE',
    category_id: '60',
    category_name: '70 Fun Gravel Ride',
    distance_km: 70,
    wave_start_time: '07:00 WIB',
    gender: 'male',
    community_chapter: 'GX-ID Chapter Cileungsi & Sentul',
    jersey_size: 'L',
    package_type: 'MEDAL_JERSEY',
    status: 'CONFIRMED',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    qr_checkin_hash: 'gxid-2026-chk-6001-kresna',
    created_at: '2026-10-11T11:15:00Z',
  },
  {
    id: 'seed-9001',
    bib_number: 9001,
    full_name: 'Agus Salim',
    rider_role: 'SINGLE',
    category_id: 'VIRTUAL',
    category_name: 'Virtual Ride Nasional',
    distance_km: 0,
    wave_start_time: 'Fleksibel (H-Event)',
    gender: 'male',
    community_chapter: 'GX-ID Chapter Medan & Deli',
    jersey_size: 'L',
    package_type: 'MEDAL_JERSEY',
    status: 'CONFIRMED',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    qr_checkin_hash: 'gxid-2026-chk-9001-agus',
    created_at: '2026-10-11T13:00:00Z',
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase().trim();

    // Query dari database Supabase
    let dbParticipants: any[] = [];
    try {
      const { data, error } = await supabase
        .from('participants')
        .select(`
          id,
          bib_number,
          rider_role,
          full_name,
          gender,
          community_chapter,
          jersey_size,
          category_id,
          status,
          prologue_status,
          qr_checkin_hash,
          created_at,
          category:categories (
            id,
            name,
            distance_km,
            wave_start_time,
            prologue_required_km
          ),
          order:orders (
            package_type,
            payment_status,
            raw_payload
          )
        `)
        .order('bib_number', { ascending: true });

      if (!error && data && data.length > 0) {
        // Map Supabase rows to RosterEntry format
        dbParticipants = data.map((p) => {
          const categoryObj = Array.isArray(p.category) ? p.category[0] : p.category;
          const orderObj = Array.isArray(p.order) ? p.order[0] : p.order;

          let displayStatus: RosterEntry['status'] = 'CONFIRMED';
          if (p.status === 'PROLOG_VERIFIED') displayStatus = 'PROLOG_VERIFIED';
          if (p.status === 'CHECKED_IN') displayStatus = 'SCRUTINEERED';
          if (p.status === 'FINISHER') displayStatus = 'FINISHED';

          const prolReq = (categoryObj?.prologue_required_km || 0) > 0;

          // Cek fallback BIB dari raw_payload jika p.bib_number null
          let bibNum = p.bib_number;
          if (!bibNum && orderObj?.raw_payload?.paid_participants) {
            const found = (orderObj.raw_payload.paid_participants as any[]).find((pp) => pp.id === p.id);
            if (found && found.bib_number) bibNum = found.bib_number;
          }

          return {
            id: p.id,
            bib_number: bibNum || 1201,
            full_name: p.full_name,
            rider_role: p.rider_role,
            category_id: p.category_id,
            category_name: categoryObj?.name || 'Gravel Category',
            distance_km: categoryObj?.distance_km || 0,
            wave_start_time: categoryObj?.wave_start_time ? `${categoryObj.wave_start_time.slice(0, 5)} WIB` : '07:00 WIB',
            gender: p.gender,
            community_chapter: p.community_chapter || 'GX-ID Independent',
            jersey_size: p.jersey_size || 'M',
            package_type: orderObj?.package_type || 'MEDAL_JERSEY',
            status: displayStatus,
            prologue_required: prolReq,
            prologue_status: p.prologue_status || (prolReq ? 'PENDING' : 'NOT_REQUIRED'),
            qr_checkin_hash: p.qr_checkin_hash || `gxid-2026-${p.id}`,
            created_at: p.created_at,
          };
        });
      }
    } catch (e) {
      console.warn('Database query fallback to seed:', e);
    }

    // Gabungkan database real dengan seed roster (tanpa menduplikasi bib_number)
    const existingBibs = new Set(dbParticipants.map((p) => p.bib_number));
    const combined = [
      ...dbParticipants,
      ...SEED_ROSTER.filter((s) => !existingBibs.has(s.bib_number)),
    ];

    // Filter berdasarkan kategori jika ada
    let filtered = combined;
    if (category && category !== 'ALL') {
      filtered = filtered.filter((r) => {
        if (category === '100') return r.category_id === '100' || r.category_id === '80';
        if (category === '70' || category === '60') return r.category_id === '70' || r.category_id === '60';
        return r.category_id === category;
      });
    }

    // Filter berdasarkan pencarian nama / bib / chapter
    if (search) {
      filtered = filtered.filter((r) => {
        const bibMatch = r.bib_number.toString().includes(search);
        const nameMatch = r.full_name.toLowerCase().includes(search);
        const partnerMatch = r.partner_name?.toLowerCase().includes(search);
        const chapterMatch = r.community_chapter.toLowerCase().includes(search);
        return bibMatch || nameMatch || partnerMatch || chapterMatch;
      });
    }

    // Urutkan berdasarkan jarak (tertinggi ke terendah) kemudian bib_number
    filtered.sort((a, b) => {
      if (b.distance_km !== a.distance_km) {
        return b.distance_km - a.distance_km;
      }
      return a.bib_number - b.bib_number;
    });

    // Statistik agregat
    const stats = {
      total: combined.length,
      male: combined.filter((r) => r.gender === 'male').length,
      female: combined.filter((r) => r.gender === 'female').length,
      pair_teams: combined.filter((r) => r.category_id === '120_PAIR').length,
      prolog_passed: combined.filter((r) => r.prologue_status === 'PASSED').length,
      prolog_required_total: combined.filter((r) => r.prologue_required).length,
    };

    return NextResponse.json({
      success: true,
      stats,
      roster: filtered,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
