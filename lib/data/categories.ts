export interface StationItem {
  km: string;
  name: string;
  nameEng?: string;
  type: 'START' | 'WS' | 'CP' | 'KOM' | 'PITSTOP' | 'FINISH';
  desc?: string;
  descEng?: string;
}

export interface PriceTier {
  medal: string;
  jersey: string;
  pairMedal?: string;
  pairJersey?: string;
}

export interface CategoryData {
  id: string;
  tabLabel: string;
  km: string;
  watermark: string;
  subtitle: string;
  title: string;
  titleEng?: string;
  titleNote?: string;
  elevation: string;
  elevationMeters: number;
  cot: string;
  cotEng?: string;
  wave: string;
  quota: string;
  quotaEng?: string;
  tag: string;
  tagEng?: string;
  format: string;
  formatEng?: string;
  specialRules: string;
  specialRulesEng?: string;
  photo: string;
  priceMedal: string;
  priceJersey: string;
  pairPriceMedal?: string;
  pairPriceJersey?: string;
  earlyBird: PriceTier;
  regular: PriceTier;
  desc: string;
  descEng?: string;
  routeHighlights: string;
  terrain: string;
  gearTip: string;
  isRace?: boolean;
  maxAlt: string;
  avgGradient: string;
  maxGradient: string;
  surfaceBreakdown: { asphalt: string; gravel: string; unpaved: string };
  stations: StationItem[];
}

export const GPX_FILE_MAP: Record<string, string | null> = {
  '60':         '/gpx/GRINDURANCE 70 K - ver 4.0.gpx',
  '70':         '/gpx/GRINDURANCE 70 K - ver 4.0.gpx',
  '100':        '/gpx/GRINDURANCE 100 K - ver 2.0.gpx',
  '80':         '/gpx/GRINDURANCE 100 K - ver 2.0.gpx',
  '120':        '/gpx/GRINDURANCE 120_150 K - ver 1.0.gpx',
  '120_SINGLE': '/gpx/GRINDURANCE 120_150 K - ver 1.0.gpx',
  '120_PAIR':   '/gpx/GRINDURANCE 120_150 K - ver 1.0.gpx',
  '150':        '/gpx/GRINDURANCE 120_150 K - ver 1.0.gpx',
  '200':        '/gpx/GRINDURANCE 200 K - ver 4.0.gpx',
  'VIRTUAL':    null,
};

export const GPX_DISPLAY_INFO: Record<string, { fileName: string; gpxKm: string; prologKm: number }> = {
  '60':         { fileName: 'GRINDURANCE 70 K - ver 4.0.gpx',       gpxKm: '70 km (69.9 km)', prologKm: 0  },
  '70':         { fileName: 'GRINDURANCE 70 K - ver 4.0.gpx',       gpxKm: '70 km (69.9 km)', prologKm: 0  },
  '100':        { fileName: 'GRINDURANCE 100 K - ver 2.0.gpx',      gpxKm: '100 km',          prologKm: 0  },
  '80':         { fileName: 'GRINDURANCE 100 K - ver 2.0.gpx',      gpxKm: '100 km',          prologKm: 0  },
  '120':        { fileName: 'GRINDURANCE 120_150 K - ver 1.0.gpx',  gpxKm: '120 km',          prologKm: 0  },
  '120_SINGLE': { fileName: 'GRINDURANCE 120_150 K - ver 1.0.gpx',  gpxKm: '120 km',          prologKm: 0  },
  '120_PAIR':   { fileName: 'GRINDURANCE 120_150 K - ver 1.0.gpx',  gpxKm: '120 km',          prologKm: 0  },
  '150':        { fileName: 'GRINDURANCE 120_150 K - ver 1.0.gpx',  gpxKm: '120 km',          prologKm: 30 },
  '200':        { fileName: 'GRINDURANCE 200 K - ver 4.0.gpx',      gpxKm: '170 km',          prologKm: 30 },
  'VIRTUAL':    { fileName: '',                                     gpxKm: '',                prologKm: 0  },
};

// =========================================================================
// CANONICAL EVENT & REGISTRATION TIMELINE (MAKE NO MISTAKES)
// =========================================================================
// 1. Web Pendaftaran Go-Live: 1 November 2026, 00:00:00 WIB
export const REGISTRATION_GO_LIVE_DATE_ISO = '2026-11-01T00:00:00+07:00';

// 2. Early Bird aktif selama 2 minggu (14 hari penuh): Berakhir 15 November 2026, 23:59:59 WIB
export const EARLY_BIRD_END_DATE_ISO = '2026-11-15T23:59:59+07:00';

// 3. Tarif Reguler aktif mulai: 16 November 2026, 00:00:00 WIB
export const REGULAR_START_DATE_ISO = '2026-11-16T00:00:00+07:00';

// 4. Penutupan Pendaftaran: Tepat 2 minggu sebelum event (19 Des - 14 hari) = 5 Desember 2026, 23:59:59 WIB
export const REGISTRATION_CLOSE_DATE_ISO = '2026-12-05T23:59:59+07:00';

// 5. Coaching Clinic, RPC & TM (Pra-Event): 13 Desember 2026
export const RPC_DATE_ISO = '2026-12-13T00:00:00+07:00';

// 6. Protokol Rilis GPX (H-2): 17 Desember 2026, 00:00:00 WIB
export const GPX_UNLOCK_DATE_ISO = '2026-12-17T00:00:00+07:00';

// 7. Hari-H Race Day: Sabtu, 19 Desember 2026
export const EVENT_DATE_ISO = '2026-12-19T00:00:00+07:00';

export type PricingPhase = 'EARLY_BIRD' | 'REGULAR' | 'CLOSED';

export function getActivePricingPhase(customDate?: Date | string | null): PricingPhase {
  if (typeof window !== 'undefined' && !customDate) {
    try {
      const params = new URLSearchParams(window.location.search);
      const phaseParam = params.get('phase') || params.get('tier');
      if (phaseParam) {
        const p = phaseParam.toUpperCase();
        if (p === 'EARLY_BIRD' || p === 'EARLYBIRD' || p === 'EARLY') return 'EARLY_BIRD';
        if (p === 'REGULAR' || p === 'REGULER') return 'REGULAR';
        if (p === 'CLOSED' || p === 'TUTUP') return 'CLOSED';
      }
      const simDateParam = params.get('date');
      if (simDateParam) {
        customDate = new Date(simDateParam);
      }
    } catch {
      // ignore
    }
  }

  const now = customDate ? new Date(customDate) : new Date();
  const ebEnd = new Date(EARLY_BIRD_END_DATE_ISO);
  const regClose = new Date(REGISTRATION_CLOSE_DATE_ISO);

  if (now > regClose) {
    return 'CLOSED';
  }
  if (now > ebEnd) {
    return 'REGULAR';
  }
  return 'EARLY_BIRD';
}

export const EARLY_BIRD_PRICES: Record<string, { medal: number; jersey: number; pairMedal?: number; pairJersey?: number }> = {
  '60':         { medal: 150000, jersey: 250000 },
  '70':         { medal: 150000, jersey: 250000 },
  '80':         { medal: 200000, jersey: 250000 },
  '100':        { medal: 200000, jersey: 250000 },
  '120':        { medal: 300000, jersey: 350000 },
  '120_SINGLE': { medal: 300000, jersey: 350000 },
  '120_PAIR':   { medal: 550000, jersey: 650000, pairMedal: 550000, pairJersey: 650000 },
  '150':        { medal: 350000, jersey: 400000 },
  '200':        { medal: 350000, jersey: 400000 },
  'VIRTUAL':    { medal: 175000, jersey: 225000 },
};

export const REGULAR_PRICES: Record<string, { medal: number; jersey: number; pairMedal?: number; pairJersey?: number }> = {
  '60':         { medal: 250000, jersey: 300000 },
  '70':         { medal: 250000, jersey: 300000 },
  '80':         { medal: 300000, jersey: 350000 },
  '100':        { medal: 300000, jersey: 350000 },
  '120':        { medal: 400000, jersey: 450000 },
  '120_SINGLE': { medal: 400000, jersey: 450000 },
  '120_PAIR':   { medal: 700000, jersey: 750000, pairMedal: 700000, pairJersey: 750000 },
  '150':        { medal: 400000, jersey: 450000 },
  '200':        { medal: 400000, jersey: 450000 },
  'VIRTUAL':    { medal: 200000, jersey: 250000 },
};

export function getPricesForCategory(categoryId: string, phase: PricingPhase = 'EARLY_BIRD'): { medal: number; jersey: number; pairMedal?: number; pairJersey?: number } {
  const map = phase === 'REGULAR' ? REGULAR_PRICES : EARLY_BIRD_PRICES;
  return map[categoryId] || { medal: 150000, jersey: 250000 };
}

export interface PriceTableRow {
  id: string;
  categoryCode: string;
  categoryName: string;
  categoryNameEng: string;
  distanceDisplay: string;
  formatBadge: string;
  formatBadgeEng: string;
  isRace?: boolean;
  earlyBird: {
    medal: string;
    jersey: string;
    medalRaw: number;
    jerseyRaw: number;
  };
  regular: {
    medal: string;
    jersey: string;
    medalRaw: number;
    jerseyRaw: number;
  };
  abeeyMealVoucher: string;
  abeeyMealVoucherEng: string;
  registerUrl: string;
}

export const CANONICAL_PRICE_TABLE: PriceTableRow[] = [
  {
    id: '70',
    categoryCode: '60',
    categoryName: '70 Fun Gravel Ride',
    categoryNameEng: '70 Fun Gravel Ride',
    distanceDisplay: '69,9 KM',
    formatBadge: 'Non-Race / Rekreasi',
    formatBadgeEng: 'Non-Race / Recreational',
    isRace: false,
    earlyBird: { medal: 'Rp 150.000', jersey: 'Rp 250.000', medalRaw: 150000, jerseyRaw: 250000 },
    regular: { medal: 'Rp 250.000', jersey: 'Rp 300.000', medalRaw: 250000, jerseyRaw: 300000 },
    abeeyMealVoucher: 'Perempuan & ≤17 Th',
    abeeyMealVoucherEng: 'Female & Youth ≤17',
    registerUrl: '/daftar?category=60',
  },
  {
    id: '100',
    categoryCode: '100',
    categoryName: '100 Fondo',
    categoryNameEng: '100 Fondo',
    distanceDisplay: '101 KM',
    formatBadge: 'Non-Race / Fondo',
    formatBadgeEng: 'Non-Race / Fondo',
    isRace: false,
    earlyBird: { medal: 'Rp 200.000', jersey: 'Rp 250.000', medalRaw: 200000, jerseyRaw: 250000 },
    regular: { medal: 'Rp 300.000', jersey: 'Rp 350.000', medalRaw: 300000, jerseyRaw: 350000 },
    abeeyMealVoucher: 'Perempuan & ≤17 Th',
    abeeyMealVoucherEng: 'Female & Youth ≤17',
    registerUrl: '/daftar?category=100',
  },
  {
    id: '120_SINGLE',
    categoryCode: '120',
    categoryName: '120 Race (Single)',
    categoryNameEng: '120 Race (Single)',
    distanceDisplay: '120 KM',
    formatBadge: 'Official Race · Top 3',
    formatBadgeEng: 'Official Race · Top 3',
    isRace: true,
    earlyBird: { medal: 'Rp 300.000', jersey: 'Rp 350.000', medalRaw: 300000, jerseyRaw: 350000 },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000', medalRaw: 400000, jerseyRaw: 450000 },
    abeeyMealVoucher: 'Semua Peserta (Otomatis)',
    abeeyMealVoucherEng: 'All Participants (Auto)',
    registerUrl: '/daftar?category=120',
  },
  {
    id: '120_PAIR',
    categoryCode: '120',
    categoryName: '120 Race Pair Mix (2 Pax)',
    categoryNameEng: '120 Race Pair Mix (2 Riders)',
    distanceDisplay: '120 KM',
    formatBadge: 'Official Race · Tim 2 Orang',
    formatBadgeEng: 'Official Race · 2-Rider Team',
    isRace: true,
    earlyBird: { medal: 'Rp 550.000', jersey: 'Rp 650.000', medalRaw: 550000, jerseyRaw: 650000 },
    regular: { medal: 'Rp 700.000', jersey: 'Rp 750.000', medalRaw: 700000, jerseyRaw: 750000 },
    abeeyMealVoucher: 'Semua Peserta (2 Kupon)',
    abeeyMealVoucherEng: 'All Participants (2 Vouchers)',
    registerUrl: '/daftar?category=120',
  },
  {
    id: '150',
    categoryCode: '150',
    categoryName: '150 Grand Fondo',
    categoryNameEng: '150 Grand Fondo',
    distanceDisplay: '150 KM (120k + 30k)',
    formatBadge: 'Non-Race · Wajib Prolog',
    formatBadgeEng: 'Non-Race · Prologue Required',
    isRace: false,
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000', medalRaw: 350000, jerseyRaw: 400000 },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000', medalRaw: 400000, jerseyRaw: 450000 },
    abeeyMealVoucher: 'Semua Peserta (Otomatis)',
    abeeyMealVoucherEng: 'All Participants (Auto)',
    registerUrl: '/daftar?category=150',
  },
  {
    id: '200',
    categoryCode: '200',
    categoryName: '200 Ultra Endurance',
    categoryNameEng: '200 Ultra Endurance',
    distanceDisplay: '200 KM (170k + 30k)',
    formatBadge: 'Non-Race · COT 17 Jam',
    formatBadgeEng: 'Non-Race · 17h COT',
    isRace: false,
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000', medalRaw: 350000, jerseyRaw: 400000 },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000', medalRaw: 400000, jerseyRaw: 450000 },
    abeeyMealVoucher: 'Semua Peserta (Otomatis)',
    abeeyMealVoucherEng: 'All Participants (Auto)',
    registerUrl: '/daftar?category=200',
  },
  {
    id: 'VIRTUAL',
    categoryCode: 'VIRTUAL',
    categoryName: 'Virtual Ride (19 Chapter)',
    categoryNameEng: 'Virtual Ride (19 Chapters)',
    distanceDisplay: 'Rute Mandiri',
    formatBadge: 'Mandiri · Strava Sync',
    formatBadgeEng: 'Self-Supported · Strava Sync',
    isRace: false,
    earlyBird: { medal: 'Rp 175.000', jersey: 'Rp 225.000', medalRaw: 175000, jerseyRaw: 225000 },
    regular: { medal: 'Rp 200.000', jersey: 'Rp 250.000', medalRaw: 200000, jerseyRaw: 250000 },
    abeeyMealVoucher: 'Non-Venue (Dikirim DHS)',
    abeeyMealVoucherEng: 'Non-Venue (DHS Shipped)',
    registerUrl: '/daftar?category=VIRTUAL',
  },
];

export function isGpxDownloadLocked(): boolean {
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('unlock_gpx') === '1') return false;
    } catch {
      // ignore
    }
  }
  return new Date() < new Date(GPX_UNLOCK_DATE_ISO);
}

export const CATEGORIES: CategoryData[] = [
  {
    id: '60',
    tabLabel: '70 KM',
    km: '70 KM',
    watermark: '70K',
    subtitle: 'FUN GRAVEL',
    title: '70 Fun Gravel Ride',
    titleEng: '70 Fun Gravel Ride',
    elevation: '+650–778 m',
    elevationMeters: 778,
    cot: '7 Jam',
    cotEng: '7 Hours',
    wave: '07:00 WIB',
    quota: '150 Peserta',
    quotaEng: '150 Riders',
    tag: 'REKREASI & PEMULA',
    tagEng: 'RECREATION & BEGINNER',
    format: 'Fun Gravel / Non-Kompetitif',
    formatEng: 'Fun Gravel / Non-Competitive',
    specialRules: 'Ramah Sepeda Lipat (Seli), Hybrid & Pemula · Tanpa Tekanan Berlebih · Pitstop Wajib 30 Min (TBA)',
    specialRulesEng: 'Folding Bike Friendly, Hybrid & Beginners · No Excessive Pressure · Mandatory 30-Min Pitstop (TBA)',
    photo: '/categories/cat_60_funride.jpg',
    priceMedal: 'Rp 150.000',
    priceJersey: 'Rp 250.000',
    earlyBird: { medal: 'Rp 150.000', jersey: 'Rp 250.000' },
    regular: { medal: 'Rp 250.000', jersey: 'Rp 300.000' },
    desc: 'Gerbang menuju Beautiful Suffering di alam bebas. Rute 69,9 km dengan pemandangan tebing kapur (karst), kebun bambu, dan sawah terasering Jonggol. Menghadapi dua tanjakan utama (2,66 km @ 5% & 2,62 km @ 7%) sebelum turunan panjang kembali ke kota.',
    descEng: 'Gateway to Beautiful Suffering in the wild. A 69.9 km route featuring karst limestone cliffs, bamboo groves, and terraced rice paddies in Jonggol. Tackles two main climbs (2.66 km @ 5% & 2.62 km @ 7%) before a long descent back to town.',
    routeHighlights: 'LRT Harjamukti → Tebing Karst & Kebun Bambu → 2 Tanjakan Berurutan → Sawah Terasering → Finish Lounge ABBEY',
    terrain: 'Aspal & Beton, Unpaved 8,16 km, Path 2,61 km, Off-Grid 2,24 km',
    gearTip: 'Ramah Sepeda Lipat (Seli 20"), Hybrid, & Gravel Pemula (Ban 35mm-45mm Disarankan)',
    maxAlt: '290 m MDPL',
    avgGradient: '3.5% Rata-rata',
    maxGradient: '7% (Tanjakan ke-2: 2,62 km @ 7%)',
    surfaceBreakdown: { asphalt: '81%', gravel: '12%', unpaved: '7%' },
    stations: [
      { km: 'KM 0', name: 'Start ABBEY Coffee & LRT', nameEng: 'Start ABBEY Coffee & LRT', type: 'START', desc: 'Pelepasan 07:00 WIB', descEng: '07:00 WIB Wave Dispatch' },
      { km: 'KM 28', name: 'WS#1 Pasir Angin (Refill Air)', nameEng: 'WS#1 Pasir Angin (Water Refill)', type: 'WS', desc: 'Water station mandiri', descEng: 'Self-service water station' },
      { km: 'KM 42', name: 'Pitstop Wajib 30 Menit (TBA)', nameEng: 'Mandatory 30-Min Pitstop (TBA)', type: 'PITSTOP', desc: 'Jeda netral nutrisi & istirahat', descEng: 'Neutral nutrition & rest break' },
      { km: 'KM 70', name: 'Finish Lounge ABBEY Coffee', nameEng: 'Finish Lounge ABBEY Coffee', type: 'FINISH', desc: 'Pengambilan medali finisher (69,9 km)', descEng: 'Official medal collection (69.9 km)' },
    ],
  },
  {
    id: '100',
    tabLabel: '100 KM',
    km: '100 KM',
    watermark: '100K',
    subtitle: 'FONDO',
    title: '100 Fondo',
    titleEng: '100 Fondo',
    elevation: '+1.070 m',
    elevationMeters: 1070,
    cot: '9.5 Jam',
    cotEng: '9.5 Hours',
    wave: '07:00 WIB',
    quota: '150 Peserta',
    quotaEng: '150 Riders',
    tag: 'EKSPLORASI FONDO',
    tagEng: 'FONDO EXPLORATION',
    format: 'Fondo / Non-Kompetitif',
    formatEng: 'Fondo / Non-Competitive',
    specialRules: 'Rute 101 km · 3 Tanjakan Utama · Ban Rekomendasi 38c+ · Pitstop Wajib 30 Min',
    specialRulesEng: '101 km Course · 3 Key Climbs · Recommended 38c+ Tires · Mandatory 30-Min Pitstop',
    photo: '/categories/cat_100_fondo.jpg',
    priceMedal: 'Rp 200.000',
    priceJersey: 'Rp 250.000',
    earlyBird: { medal: 'Rp 200.000', jersey: 'Rp 250.000' },
    regular: { medal: 'Rp 300.000', jersey: 'Rp 350.000' },
    desc: 'Lintasan 101 km menembus persawahan Cileungsi dan makadam khas Pemandian Sodong. 3 tanjakan terukur dengan segmen jalan tanah (path 3,02 km & off-grid 5,11 km).',
    descEng: '101 km course cutting through Cileungsi paddy fields and Sodong Springs macadam. 3 climbs with dirt segments (3.02 km path & 5.11 km off-grid).',
    routeHighlights: '101 km · 3 Tanjakan Utama · Sodong Makadam · Segmen Path 3.02 km & Off-grid 5.11 km',
    terrain: 'Rolling Hills, Persawahan Cileungsi & Makadam Pemandian Sodong (+1.070 m)',
    gearTip: 'Rekomendasi Ban 38c+ · Joy of Riding & Scenic Gravel',
    maxAlt: '310 m MDPL',
    avgGradient: '4.8% Rata-rata',
    maxGradient: '11.8% Maksimum',
    surfaceBreakdown: { asphalt: '50%', gravel: '35%', unpaved: '15%' },
    stations: [
      { km: 'KM 0', name: 'Start ABEEY Coffee', nameEng: 'Start ABEEY Coffee', type: 'START', desc: 'Pelepasan 07:00 WIB', descEng: '07:00 WIB Wave Dispatch' },
      { km: 'KM 38', name: 'WS#1 Persawahan Cileungsi', nameEng: 'WS#1 Cileungsi Rice Fields', type: 'WS', desc: 'Water station mandiri', descEng: 'Self-service water station' },
      { km: 'KM 65', name: 'Pitstop Wajib 30 Menit (TBA)', nameEng: 'Mandatory 30-Min Pitstop (TBA)', type: 'PITSTOP', desc: 'Makadam & jeda netral nutrisi', descEng: 'Macadam & neutral nutrition break' },
      { km: 'KM 82', name: 'WS#2 Klapanunggal Ridge', nameEng: 'WS#2 Klapanunggal Ridge', type: 'WS', desc: 'Titik hidrasi bukit', descEng: 'Hilltop hydration point' },
      { km: 'KM 101', name: 'Finish Lounge ABEEY', nameEng: 'ABEEY Finish Lounge', type: 'FINISH', desc: 'Finisher celebration', descEng: 'Finisher celebration' },
    ],
  },
  {
    id: '120',
    tabLabel: '120 KM',
    km: '120 KM',
    watermark: '120K',
    subtitle: 'RACE (SINGLE & PAIR)',
    title: '120 (Race)',
    titleEng: '120 (Race)',
    titleNote: 'SINGLE & PAIR MIX',
    elevation: '+1.760 m',
    elevationMeters: 1760,
    cot: '11 Jam',
    cotEng: '11 Hours',
    wave: '06:00 WIB',
    quota: '100 Single · 30 Tim',
    quotaEng: '100 Single · 30 Teams',
    tag: 'OFFICIAL RACE · PODIUM TOP 3',
    tagEng: 'OFFICIAL RACE · TOP 3 PODIUM',
    format: 'Official Race (Top 3 Podium)',
    formatEng: 'Official Race (Top 3 Podium)',
    specialRules: 'Mendukung Single & Tim Pair Mix 2 Pax · Handicap Waktu · Live Tracking GPS',
    specialRulesEng: 'Supports Single & Pair Mix 2-Rider Teams · Time Handicap · Mandatory GPS Live Tracking',
    photo: '/categories/cat_120_race.jpg',
    priceMedal: 'Rp 300.000',
    priceJersey: 'Rp 350.000',
    pairPriceMedal: 'Rp 550.000',
    pairPriceJersey: 'Rp 650.000',
    earlyBird: { medal: 'Rp 300.000', jersey: 'Rp 350.000', pairMedal: 'Rp 550.000', pairJersey: 'Rp 650.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000', pairMedal: 'Rp 700.000', pairJersey: 'Rp 750.000' },
    desc: 'Satu-satunya kategori balap kompetitif resmi dengan perebutan podium Top 3. 7 tanjakan terjal, 16.5 km jalur unpaved, dan 3.77 km off-grid menembus koridor Jonggol–Sukamakmur.',
    descEng: 'The only official competitive race category battling for Top 3 podium. 7 steep climbs, 16.5 km unpaved, and 3.77 km off-grid through Jonggol–Sukamakmur.',
    routeHighlights: '120 km · 7 Tanjakan · Tanjakan ke-4 (4.07 km @ 7%) · Unpaved 16.5 km · Off-Grid 3.77 km',
    terrain: 'Koridor Jonggol Ridge & Tanjakan Sukamakmur (+1.760 m)',
    gearTip: 'Live Tracking RaceRoute.id Wajib · Perebutan Podium Top 3 · Pilihan Single & PAIR MIX',
    isRace: true,
    maxAlt: '680 m MDPL',
    avgGradient: '6.8% Rata-rata',
    maxGradient: '14.6% Maksimum',
    surfaceBreakdown: { asphalt: '45%', gravel: '40%', unpaved: '15%' },
    stations: [
      { km: 'KM 0', name: 'Start Wave 2 (06:00 WIB)', nameEng: 'Start Wave 2 (06:00 WIB)', type: 'START', desc: 'Timing gate aktivasi', descEng: 'Timing gate activation' },
      { km: 'KM 42', name: 'Checkpoint Geofencing (TBA)', nameEng: 'Geofencing Checkpoint (TBA)', type: 'CP', desc: 'Geofencing check', descEng: 'Geofencing verification' },
      { km: 'KM 78', name: 'KOM Tanjakan Sukamakmur', nameEng: 'KOM Sukamakmur Climb', type: 'KOM', desc: 'Puncak tanjakan +1.760m', descEng: 'Summit climb +1,760m' },
      { km: 'KM 102', name: 'Pitstop Wajib 30 Menit (TBA)', nameEng: 'Mandatory 30-Min Pitstop (TBA)', type: 'PITSTOP', desc: 'Wajib jeda rest & nutrisi', descEng: 'Mandatory rest & nutrition break' },
      { km: 'KM 120', name: 'Podium Gate ABEEY', nameEng: 'ABEEY Podium Gate', type: 'FINISH', desc: 'Awarding podium Top 3', descEng: 'Top 3 Podium Awarding' },
    ],
  },
  {
    id: '150',
    tabLabel: '150 KM',
    km: '150 KM',
    watermark: '150K',
    subtitle: 'GRAND FONDO',
    title: '150 Grand Fondo',
    titleEng: '150 Grand Fondo',
    elevation: '+1.760 m',
    elevationMeters: 1760,
    cot: '15 Jam',
    cotEng: '15 Hours',
    wave: '05:30 WIB',
    quota: '75 Peserta',
    quotaEng: '75 Riders',
    tag: 'WAJIB PROLOG 30 KM',
    tagEng: 'MANDATORY 30 KM PROLOGUE',
    format: 'Grand Fondo Endurance',
    formatEng: 'Grand Fondo Endurance',
    specialRules: 'Wajib Prolog 30 km Mandiri + 120 km Rute Utama · Pitstop Wajib 30 Menit',
    specialRulesEng: 'Mandatory 30 km Self-Prologue + 120 km Main Course · Mandatory 30-Min Pitstop',
    photo: '/categories/cat_150_grandfondo.jpg',
    priceMedal: 'Rp 350.000',
    priceJersey: 'Rp 400.000',
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000' },
    desc: 'Total 150 km yang terdiri dari 30 km prolog yang dirancang dan diselesaikan sendiri oleh peserta sebelum tiba di LRT Harjamukti, ditambah 120 km rute utama (+1.760 m).',
    descEng: 'Total 150 km consisting of 30 km self-designed prologue completed before arriving at LRT Harjamukti, followed by 120 km main course (+1,760 m).',
    routeHighlights: 'Prolog 30 km Mandiri + 120 km Rute Utama (+1.760 m elevasi, 7 tanjakan)',
    terrain: 'Prolog Mandiri + Koridor Jonggol Ridge & Sukamakmur (+1.760 m)',
    gearTip: 'Wajib Prolog 30 km Mandiri · Ban Min 38–40mm & Wet Lube',
    maxAlt: '680 m MDPL',
    avgGradient: '6.8% Rata-rata',
    maxGradient: '14.6% Maksimum',
    surfaceBreakdown: { asphalt: '45%', gravel: '40%', unpaved: '15%' },
    stations: [
      { km: 'SEBELUM START', name: 'Prolog 30 km Mandiri Peserta', nameEng: '30 km Self-Prologue', type: 'START', desc: 'Validasi log GPS Strava', descEng: 'Strava GPS log verification' },
      { km: 'KM 0', name: 'Wave Start ABEEY (05:30 WIB)', nameEng: 'Wave Start ABEEY (05:30 WIB)', type: 'START', desc: 'Pelepasan fajar', descEng: 'Dawn wave dispatch' },
      { km: 'KM 50', name: 'Checkpoint Verifikasi (TBA)', nameEng: 'Verification Checkpoint (TBA)', type: 'CP', desc: 'Pos verifikasi', descEng: 'Verification checkpoint' },
      { km: 'KM 88', name: 'KOM Sukamakmur Summit', nameEng: 'KOM Sukamakmur Summit', type: 'KOM', desc: 'Puncak elevasi 680m MDPL', descEng: 'Summit elevation 680m MDPL' },
      { km: 'KM 122', name: 'Pitstop Wajib 30 Menit (TBA)', nameEng: 'Mandatory 30-Min Pitstop (TBA)', type: 'PITSTOP', desc: 'Penalti 300% jika dilewati', descEng: '300% penalty if skipped' },
      { km: 'KM 150', name: 'Finisher Gate ABEEY', nameEng: 'ABEEY Finisher Gate', type: 'FINISH', desc: 'Penyerahan medali', descEng: 'Official medal presentation' },
    ],
  },
  {
    id: '200',
    tabLabel: '200 KM',
    km: '200 KM',
    watermark: '200K',
    subtitle: 'ULTRA',
    title: '200 Ultra',
    titleEng: '200 Ultra',
    elevation: '+2.530 m',
    elevationMeters: 2530,
    cot: '17 Jam',
    cotEng: '17 Hours',
    wave: '05:30 WIB',
    quota: '50 Peserta',
    quotaEng: '50 Riders',
    tag: 'ULTRA GRAVEL · NIGHT NAV',
    tagEng: 'ULTRA GRAVEL · NIGHT NAV',
    format: 'Ultra Endurance',
    formatEng: 'Ultra Endurance',
    specialRules: 'Prolog 30 km Mandiri + 170 km Utama · COT Resmi 17 Jam · Daylight Ridge Completion',
    specialRulesEng: '30 km Self-Prologue + 170 km Main Course · Official 17-Hour COT · Daylight Ridge Completion',
    photo: '/categories/cat_200_ultra.jpg',
    priceMedal: 'Rp 350.000',
    priceJersey: 'Rp 400.000',
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000' },
    desc: 'Kategori ultra sejati. Total 200 km (170 km rute utama + 30 km prolog mandiri). Elevasi total +2.530 m dengan 8 tanjakan (tanjakan ke-5: 8.87 km @ 7% gain 628m). Batas waktu ketat 17 jam.',
    descEng: 'True ultra endurance. Total 200 km (170 km main route + 30 km self-prologue). Total +2,530 m elevation gain with 8 climbs (5th climb: 8.87 km @ 7%). Strict 17-hour cut-off time.',
    routeHighlights: 'Prolog 30 km Mandiri + 170 km Utama · 8 Tanjakan (Tanjakan ke-5: 8.87 km @ 7%) · COT 17 Jam',
    terrain: 'Loop Penuh Jonggol–Sukamakmur–Sentul · Puncak 1.110 m MDPL (+2.530 m)',
    gearTip: 'Wajib Prolog 30 km · COT 17 Jam · Lampu Depan Ganda >500lm & Rompi Reflektif',
    maxAlt: '1.110 m MDPL',
    avgGradient: '7.0% Rata-rata',
    maxGradient: '18.2% Maksimum',
    surfaceBreakdown: { asphalt: '30%', gravel: '45%', unpaved: '25%' },
    stations: [
      { km: 'SEBELUM START', name: 'Prolog 30 km Mandiri Subuh', nameEng: 'Dawn 30 km Self-Prologue', type: 'START', desc: 'Validasi GPS scrutineering', descEng: 'GPS Scrutineering Validation' },
      { km: 'KM 0', name: 'Wave Start ABEEY (05:30 WIB)', nameEng: 'Wave Start ABEEY (05:30 WIB)', type: 'START', desc: 'Pelepasan fajar ultra', descEng: 'Ultra dawn wave dispatch' },
      { km: 'KM 62', name: 'Checkpoint Verifikasi (TBA)', nameEng: 'Verification Checkpoint (TBA)', type: 'CP', desc: 'Pos verifikasi geofencing', descEng: 'Geofencing check' },
      { km: 'KM 110', name: 'Tanjakan Utama (8.87 km @ 7%)', nameEng: 'Main Summit (8.87 km @ 7%)', type: 'KOM', desc: 'Puncak 1.110 m MDPL', descEng: 'Peak 1,110 m MDPL' },
      { km: 'KM 145', name: 'Pitstop Wajib 30 Menit (TBA)', nameEng: 'Mandatory 30-Min Pitstop (TBA)', type: 'PITSTOP', desc: 'Jeda istirahat & nutrisi', descEng: 'Rest & nutrition break' },
      { km: 'KM 175', name: 'Checkpoint Night Nav (TBA)', nameEng: 'Night Navigation Checkpoint (TBA)', type: 'CP', desc: 'Cek lampu ganda & rompi reflektif', descEng: 'Dual light & reflective vest check' },
      { km: 'KM 200', name: 'Legend Finisher Gate ABEEY', nameEng: 'ABEEY Legend Finisher Gate', type: 'FINISH', desc: 'COT 17 Jam dari start', descEng: 'Official 17-Hour COT' },
    ],
  },
  {
    id: 'VIRTUAL',
    tabLabel: 'VIRTUAL RIDE',
    km: 'BEBAS',
    watermark: 'GPS',
    subtitle: 'VIRTUAL RIDE',
    title: 'Virtual Ride',
    titleEng: 'Virtual Ride',
    titleNote: '(19 Chapters)',
    elevation: 'Rute Lokal',
    elevationMeters: 0,
    cot: 'Fleksibel',
    cotEng: 'Flexible',
    wave: 'Mandiri H-Event',
    quota: '1.000 Peserta',
    quotaEng: '1,000 Riders',
    tag: 'VALIDASI STRAVA / KOMOOT',
    tagEng: 'STRAVA / KOMOOT VALIDATION',
    format: 'Virtual Ride Mandiri',
    formatEng: 'Self-Supported Virtual Ride',
    specialRules: 'Khusus Luar Jabodetabek · Outdoor Only · Medali Dikirim DHS Logistik',
    specialRulesEng: 'Exclusively Outside Jabodetabek · Outdoor Only · Medal Dispatched via DHS Logistics',
    photo: '/categories/cat_virtual_ride.jpg',
    priceMedal: 'Rp 175.000',
    priceJersey: 'Rp 225.000',
    earlyBird: { medal: 'Rp 175.000', jersey: 'Rp 225.000' },
    regular: { medal: 'Rp 200.000', jersey: 'Rp 250.000' },
    desc: 'Bagi 80.000+ anggota GX-ID di 19 Chapter se-Indonesia. Selesaikan jarak tantangan di kota domisili Anda, validasi via Strava Webhook, dan medali resmi dikirim ke rumah.',
    descEng: 'For 80,000+ GX-ID members across 19 Regional Chapters. Complete your ride in your hometown, validate via Strava Webhook, and official medals are shipped to your doorstep.',
    routeHighlights: '19 Chapter: Bandung, Surabaya, Medan, Bali, Jogja, Makassar, Semarang, Solo & Nasional',
    terrain: 'Rute Domisili Lokal di 19 Regional Chapter GX-ID se-Indonesia',
    gearTip: 'Outdoor GPS Validasi Otomatis via Strava Webhook · Medali via DHS Logistik',
    maxAlt: 'Rute Lokal',
    avgGradient: 'Variatif',
    maxGradient: 'Variatif',
    surfaceBreakdown: { asphalt: '50%', gravel: '40%', unpaved: '10%' },
    stations: [
      { km: 'STEP 1', name: 'Tikum Chapter Kota Anda', nameEng: 'Local Chapter Gathering Point', type: 'START', desc: '19 Regional Chapter', descEng: '19 Regional Chapters' },
      { km: 'STEP 2', name: 'Rekam GPS Luar Ruang', nameEng: 'Outdoor GPS Activity Recording', type: 'CP', desc: 'Garmin, Wahoo, atau HP', descEng: 'Garmin, Wahoo, or Smartphone' },
      { km: 'STEP 3', name: 'Strava Webhook Auto-Validation', nameEng: 'Strava Webhook Auto-Validation', type: 'WS', desc: 'Sertifikasi otomatis awan', descEng: 'Cloud auto-certification' },
      { km: 'STEP 4', name: 'Medali Dikirim DHS Logistik', nameEng: 'Medal Shipped via DHS Logistics', type: 'FINISH', desc: 'Langsung tiba ke rumah', descEng: 'Delivered to your doorstep' },
    ],
  },
];
