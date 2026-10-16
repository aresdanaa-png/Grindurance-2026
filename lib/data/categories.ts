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
  '60':       '/gpx/GRINDURANCE 60 K - ver 1.0.gpx',
  '100':      '/gpx/GRINDURANCE 100 K - ver 2.0.gpx',
  '80':       '/gpx/GRINDURANCE 100 K - ver 2.0.gpx',
  '120_PAIR': '/gpx/GRINDURANCE 120_150 K - ver 1.0.gpx',
  '150':      '/gpx/GRINDURANCE 120_150 K - ver 1.0.gpx',
  '200':      '/gpx/GRINDURANCE 200 K - ver 1.0.gpx',
  'VIRTUAL':  null,
};

export const GPX_DISPLAY_INFO: Record<string, { fileName: string; gpxKm: string; prologKm: number }> = {
  '60':       { fileName: 'GRINDURANCE 60 K - ver 1.0.gpx',       gpxKm: '60 km',  prologKm: 0  },
  '100':      { fileName: 'GRINDURANCE 100 K - ver 2.0.gpx',      gpxKm: '100 km', prologKm: 0  },
  '80':       { fileName: 'GRINDURANCE 100 K - ver 2.0.gpx',      gpxKm: '100 km', prologKm: 0  },
  '120_PAIR': { fileName: 'GRINDURANCE 120_150 K - ver 1.0.gpx',  gpxKm: '120 km', prologKm: 0  },
  '150':      { fileName: 'GRINDURANCE 120_150 K - ver 1.0.gpx',  gpxKm: '120 km', prologKm: 30 },
  '200':      { fileName: 'GRINDURANCE 200 K - ver 1.0.gpx',      gpxKm: '170 km', prologKm: 30 },
  'VIRTUAL':  { fileName: '',                                       gpxKm: '',       prologKm: 0  },
};

// PROTOKOL RILIS GPX: File dikunci hingga H-2 sebelum Race Day (11 Desember 2026, 00:00 WIB)
export const EVENT_DATE_ISO = '2026-12-13T00:00:00+07:00';
export const GPX_UNLOCK_DATE_ISO = '2026-12-11T00:00:00+07:00';

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
    tabLabel: '60 KM',
    km: '60 KM',
    watermark: '60K',
    subtitle: 'FUN RIDE',
    title: '60 Fun Ride',
    titleEng: '60 Fun Ride',
    elevation: '+450 m',
    elevationMeters: 450,
    cot: '7 Jam',
    cotEng: '7 Hours',
    wave: '07:00 WIB',
    quota: '150 Peserta',
    quotaEng: '150 Riders',
    tag: 'REKREASI & PEMULA',
    tagEng: 'RECREATION & BEGINNER',
    format: 'Fun Ride / Non-Kompetitif',
    formatEng: 'Fun Ride / Non-Competitive',
    specialRules: 'Ramah Sepeda Lipat (Seli), Hybrid & Pemula · Pitstop Wajib 30 Min (CP#6)',
    specialRulesEng: 'Folding Bike Friendly, Hybrid & Beginners · Mandatory 30-Min Pitstop (CP#6)',
    photo: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 225.000',
    priceJersey: 'Rp 275.000',
    earlyBird: { medal: 'Rp 225.000', jersey: 'Rp 275.000' },
    regular: { medal: 'Rp 250.000', jersey: 'Rp 300.000' },
    desc: 'Lintasan tanah pedesaan Jonggol & aspal halus Cibubur. Sangat ideal bagi pesepeda yang baru pertama kali mencicipi gravel serta pengguna sepeda lipat.',
    descEng: 'Jonggol countryside dirt paths & smooth Cibubur asphalt. Ideal for beginners tasting gravel for the first time and folding bike riders.',
    routeHighlights: 'Cibubur Basecamp → Pasir Angin → CP#6 Jonggol → ABEEY Coffee Finish',
    terrain: 'Aspal Pinggiran Kota & Makadam Halus Pasir Angin',
    gearTip: 'Ramah Sepeda Lipat (Seli 20"), Hybrid, & Gravel Pemula',
    maxAlt: '380 m MDPL',
    avgGradient: '3.2% Rata-rata',
    maxGradient: '11% Maksimum',
    surfaceBreakdown: { asphalt: '65%', gravel: '25%', unpaved: '10%' },
    stations: [
      { km: 'KM 0', name: 'Start ABEEY Coffee & LRT', nameEng: 'Start ABEEY Coffee & LRT', type: 'START', desc: 'Pelepasan 07:00 WIB', descEng: '07:00 WIB Wave Dispatch' },
      { km: 'KM 28', name: 'WS#1 Pasir Angin (Refill Air)', nameEng: 'WS#1 Pasir Angin (Water Refill)', type: 'WS', desc: 'Water station mandiri', descEng: 'Self-service water station' },
      { km: 'KM 42', name: 'CP#6 Pitstop Wajib 30 Menit', nameEng: 'CP#6 Mandatory 30-Min Pitstop', type: 'PITSTOP', desc: 'Jeda netral nutrisi & istirahat', descEng: 'Neutral nutrition & rest break' },
      { km: 'KM 60', name: 'Finish Lounge ABEEY', nameEng: 'ABEEY Finish Lounge', type: 'FINISH', desc: 'Pengambilan medali', descEng: 'Official medal collection' },
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
    elevation: '+850 m',
    elevationMeters: 850,
    cot: '9.5 Jam',
    cotEng: '9.5 Hours',
    wave: '07:00 WIB',
    quota: '150 Peserta',
    quotaEng: '150 Riders',
    tag: 'EKSPLORASI FONDO',
    tagEng: 'FONDO EXPLORATION',
    format: 'Fondo / Non-Kompetitif',
    formatEng: 'Fondo / Non-Competitive',
    specialRules: 'Rolling Terrain · Ban Rekomendasi 38c+ · Pitstop Wajib 30 Min (CP#6)',
    specialRulesEng: 'Rolling Terrain · Recommended 38c+ Tires · Mandatory 30-Min Pitstop (CP#6)',
    photo: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 275.000',
    priceJersey: 'Rp 325.000',
    earlyBird: { medal: 'Rp 275.000', jersey: 'Rp 325.000' },
    regular: { medal: 'Rp 300.000', jersey: 'Rp 350.000' },
    desc: 'Lintasan 100 km menembus persawahan Cileungsi dan makadam khas Pemandian Sodong. Etape peningkatan jarak ideal dengan rolling hills berirama dinamis.',
    descEng: '100 km course cutting through Cileungsi paddy fields and Sodong Springs macadam. Ideal progression distance with dynamic rolling hills.',
    routeHighlights: 'Cileungsi → Sodong Makadam → Klapanunggal Ridge → ABEEY Coffee Finish',
    terrain: 'Rolling Hills, Persawahan Cileungsi & Makadam Pemandian Sodong (+850 m)',
    gearTip: 'Rekomendasi Ban 38c+ · Joy of Riding & Scenic Gravel',
    maxAlt: '680 m MDPL',
    avgGradient: '4.8% Rata-rata',
    maxGradient: '15% Maksimum',
    surfaceBreakdown: { asphalt: '50%', gravel: '35%', unpaved: '15%' },
    stations: [
      { km: 'KM 0', name: 'Start ABEEY Coffee', nameEng: 'Start ABEEY Coffee', type: 'START', desc: 'Pelepasan 07:00 WIB', descEng: '07:00 WIB Wave Dispatch' },
      { km: 'KM 38', name: 'WS#1 Persawahan Cileungsi', nameEng: 'WS#1 Cileungsi Rice Fields', type: 'WS', desc: 'Water station mandiri', descEng: 'Self-service water station' },
      { km: 'KM 65', name: 'CP#6 Pitstop Wajib 30 Menit (Sodong)', nameEng: 'CP#6 Mandatory 30-Min Pitstop (Sodong)', type: 'PITSTOP', desc: 'Makadam & jeda netral nutrisi', descEng: 'Macadam & neutral nutrition break' },
      { km: 'KM 82', name: 'WS#2 Klapanunggal Ridge', nameEng: 'WS#2 Klapanunggal Ridge', type: 'WS', desc: 'Titik hidrasi bukit', descEng: 'Hilltop hydration point' },
      { km: 'KM 100', name: 'Finish Lounge ABEEY', nameEng: 'ABEEY Finish Lounge', type: 'FINISH', desc: 'Finisher celebration', descEng: 'Finisher celebration' },
    ],
  },
  {
    id: '120_PAIR',
    tabLabel: '120 KM',
    km: '120 KM',
    watermark: '120K',
    subtitle: 'RACE (PODIUM)',
    title: '120 (Race)',
    titleEng: '120 (Race)',
    titleNote: '(Single & Pair Mix)',
    elevation: '+1,450 m',
    elevationMeters: 1450,
    cot: '11 Jam',
    cotEng: '11 Hours',
    wave: '06:00 WIB',
    quota: '100 Single / 30 Tim',
    quotaEng: '100 Single / 30 Teams',
    tag: 'OFFICIAL RACE · PODIUM TOP 3',
    tagEng: 'OFFICIAL RACE · TOP 3 PODIUM',
    format: 'Official Race (Top 3 Podium)',
    formatEng: 'Official Race (Top 3 Podium)',
    specialRules: 'Mendukung Tim PAIR Mix 2 Pax · Handicap Waktu · Live Tracking GPS',
    specialRulesEng: 'Supports Pair Mix 2-Rider Teams · Time Handicap · Mandatory GPS Live Tracking',
    photo: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 350.000',
    priceJersey: 'Rp 400.000',
    pairPriceMedal: 'Rp 600.000',
    pairPriceJersey: 'Rp 650.000',
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000', pairMedal: 'Rp 600.000', pairJersey: 'Rp 650.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000', pairMedal: 'Rp 700.000', pairJersey: 'Rp 750.000' },
    desc: 'Satu-satunya kategori balap kompetitif resmi dengan perebutan podium Top 3. Menaklukkan tanjakan koridor Jonggol–Sukamakmur dengan opsi tandem 2 pesepeda (Pair Mix).',
    descEng: 'The only official competitive race category battling for Top 3 podium. Conquering Jonggol–Sukamakmur ridge with optional 2-rider tandem (Pair Mix).',
    routeHighlights: 'Cibubur → Jonggol Ridge → Tanjakan Sukamakmur → Sentul Descent → ABEEY Coffee Finish',
    terrain: 'Koridor Jonggol Ridge & Tanjakan Sukamakmur (+1.450 m)',
    gearTip: 'Live Tracking RaceRoute.id Wajib · Perebutan Podium Top 3 · Opsi Tandem PAIR MIX',
    isRace: true,
    maxAlt: '980 m MDPL',
    avgGradient: '6.8% Rata-rata',
    maxGradient: '19% Maksimum',
    surfaceBreakdown: { asphalt: '45%', gravel: '40%', unpaved: '15%' },
    stations: [
      { km: 'KM 0', name: 'Start Wave 2 (06:00 WIB)', nameEng: 'Start Wave 2 (06:00 WIB)', type: 'START', desc: 'Timing gate aktivasi', descEng: 'Timing gate activation' },
      { km: 'KM 42', name: 'CP#1 Jonggol Ridge', nameEng: 'CP#1 Jonggol Ridge', type: 'CP', desc: 'Geofencing check', descEng: 'Geofencing verification' },
      { km: 'KM 78', name: 'KOM Tanjakan Sukamakmur', nameEng: 'KOM Sukamakmur Climb', type: 'KOM', desc: 'Puncak tanjakan +1.450m', descEng: 'Summit climb +1,450m' },
      { km: 'KM 102', name: 'CP#4 Pitstop Wajib 30 Menit', nameEng: 'CP#4 Mandatory 30-Min Pitstop', type: 'PITSTOP', desc: 'Wajib jeda rest & nutrisi', descEng: 'Mandatory rest & nutrition break' },
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
    elevation: '+2,100 m',
    elevationMeters: 2100,
    cot: '15 Jam',
    cotEng: '15 Hours',
    wave: '05:30 WIB',
    quota: '75 Peserta',
    quotaEng: '75 Riders',
    tag: 'WAJIB PROLOG 30 KM',
    tagEng: 'MANDATORY 30 KM PROLOGUE',
    format: 'Grand Fondo Endurance',
    formatEng: 'Grand Fondo Endurance',
    specialRules: 'Wajib Prolog 30 km (03:00–05:00 WIB) · Pitstop Wajib 30 Menit',
    specialRulesEng: 'Mandatory 30 km Prologue (03:00–05:00 WIB) · Mandatory 30-Min Pitstop',
    photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 350.000',
    priceJersey: 'Rp 400.000',
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000' },
    desc: 'Tantangan klasik veteran endurance menembus tanjakan ganda Sukamakmur dan turunan teknis berbatu di tengah guyuran musim hujan khas Jawa Barat.',
    descEng: 'Classic veteran endurance challenge braving dual Sukamakmur climbs and technical rocky descents amidst West Java monsoon rain.',
    routeHighlights: 'Prolog 30 km Subuh → Sukamakmur → Jonggol Loop → Puncak Dua → ABEEY Coffee Finish',
    terrain: 'Tanjakan Ganda Sukamakmur, Jalur Batu Puncak Dua & Sentul Loop',
    gearTip: 'Wajib Prolog 30 km (03:00–05:00 WIB) · Ban Min 38–40mm & Wet Lube',
    maxAlt: '1.240 m MDPL',
    avgGradient: '8.1% Rata-rata',
    maxGradient: '23% Maksimum',
    surfaceBreakdown: { asphalt: '35%', gravel: '45%', unpaved: '20%' },
    stations: [
      { km: '03:00 WIB', name: 'Prolog 30 km Mandiri Subuh', nameEng: 'Dawn 30 km Self-Prologue', type: 'START', desc: 'Validasi GPS scrutineering', descEng: 'GPS Scrutineering Validation' },
      { km: 'KM 0', name: 'Wave Start ABEEY (05:30 WIB)', nameEng: 'Wave Start ABEEY (05:30 WIB)', type: 'START', desc: 'Pelepasan fajar', descEng: 'Dawn wave dispatch' },
      { km: 'KM 50', name: 'CP#1 Jonggol Rural', nameEng: 'CP#1 Jonggol Rural', type: 'CP', desc: 'Pos verifikasi', descEng: 'Verification checkpoint' },
      { km: 'KM 88', name: 'KOM Sukamakmur Summit', nameEng: 'KOM Sukamakmur Summit', type: 'KOM', desc: 'Puncak elevasi ganda', descEng: 'Twin elevation summit' },
      { km: 'KM 122', name: 'CP#4 Pitstop Wajib 30 Menit', nameEng: 'CP#4 Mandatory 30-Min Pitstop', type: 'PITSTOP', desc: 'Penalti 300% jika dilewati', descEng: '300% penalty if skipped' },
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
    elevation: '+3,180 m',
    elevationMeters: 3180,
    cot: '19 Jam',
    cotEng: '19 Hours',
    wave: '05:30 WIB',
    quota: '50 Peserta',
    quotaEng: '50 Riders',
    tag: 'ULTRA GRAVEL · NIGHT NAV',
    tagEng: 'ULTRA GRAVEL · NIGHT NAV',
    format: 'Ultra Endurance',
    formatEng: 'Ultra Endurance',
    specialRules: 'Prolog 30 km · Night Navigation · Lampu Depan Ganda >500lm & Rompi Reflektif',
    specialRulesEng: '30 km Prologue · Night Navigation · Dual >500lm Front Lights & Reflective Vest',
    photo: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 350.000',
    priceJersey: 'Rp 400.000',
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000' },
    desc: 'Kategori puncak ketahanan fisik, mental, dan navigasi malam mandiri. Loop penuh Jonggol–Sukamakmur–Babakan Madang–Sentul dengan total elevasi tembus +3.180 meter.',
    descEng: 'The pinnacle of physical, mental, and self-supported night navigation endurance. Full 4-region loop exceeding +3,180m total elevation.',
    routeHighlights: 'Prolog 30 km → Jonggol → Sukamakmur Monster Pass → Sentul Loop → Malam ABEEY Coffee',
    terrain: 'Loop Penuh 4 Wilayah · Monster Pass Sukamakmur · Sentul Extreme',
    gearTip: 'Wajib Prolog 30 km · Night Nav: Lampu Depan >500lm & Rompi Reflektif',
    maxAlt: '1.480 m MDPL',
    avgGradient: '9.4% Rata-rata',
    maxGradient: '26% Maksimum',
    surfaceBreakdown: { asphalt: '30%', gravel: '45%', unpaved: '25%' },
    stations: [
      { km: '03:00 WIB', name: 'Prolog 30 km Mandiri Subuh', nameEng: 'Dawn 30 km Self-Prologue', type: 'START', desc: 'Validasi GPS scrutineering', descEng: 'GPS Scrutineering Validation' },
      { km: 'KM 0', name: 'Wave Start ABEEY (05:30 WIB)', nameEng: 'Wave Start ABEEY (05:30 WIB)', type: 'START', desc: 'Pelepasan fajar ultra', descEng: 'Ultra dawn wave dispatch' },
      { km: 'KM 62', name: 'CP#2 Jonggol Cimenyan', nameEng: 'CP#2 Jonggol Cimenyan', type: 'CP', desc: 'Pos verifikasi', descEng: 'Verification checkpoint' },
      { km: 'KM 110', name: 'MONSTER PASS Sukamakmur', nameEng: 'MONSTER PASS Sukamakmur', type: 'KOM', desc: 'Tanjakan monster +3.180m', descEng: 'Monster climb +3,180m' },
      { km: 'KM 145', name: 'CP#4 Pitstop Wajib 30 Menit', nameEng: 'CP#4 Mandatory 30-Min Pitstop', type: 'PITSTOP', desc: 'Jeda istirahat & nutrisi', descEng: 'Rest & nutrition break' },
      { km: 'KM 175', name: 'CP#6 Night Navigation', nameEng: 'CP#6 Night Navigation', type: 'CP', desc: 'Cek lampu & reflektif', descEng: 'Light & reflective vest check' },
      { km: 'KM 200', name: 'Legend Finisher Gate ABEEY', nameEng: 'ABEEY Legend Finisher Gate', type: 'FINISH', desc: 'Gelar finisher ultra', descEng: 'Ultra finisher coronation' },
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
    photo: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop',
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
