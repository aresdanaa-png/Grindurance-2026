export interface StationItem {
  km: string;
  name: string;
  type: 'START' | 'WS' | 'CP' | 'KOM' | 'PITSTOP' | 'FINISH';
  desc?: string;
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
  titleNote?: string;
  elevation: string;
  elevationMeters: number;
  cot: string;
  wave: string;
  quota: string;
  tag: string;
  format: string;
  specialRules: string;
  photo: string;
  priceMedal: string;
  priceJersey: string;
  pairPriceMedal?: string;
  pairPriceJersey?: string;
  earlyBird: PriceTier;
  regular: PriceTier;
  desc: string;
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
  '80':       '/gpx/GRINDURANCE 100 K - ver 2.0.gpx',
  '120_PAIR': '/gpx/GRINDURANCE 120_150 K - ver 1.0.gpx',
  '150':      '/gpx/GRINDURANCE 120_150 K - ver 1.0.gpx',
  '200':      '/gpx/GRINDURANCE 200 K - ver 1.0.gpx',
  'VIRTUAL':  null,
};

export const GPX_DISPLAY_INFO: Record<string, { fileName: string; gpxKm: string; prologKm: number }> = {
  '60':       { fileName: 'GRINDURANCE 60 K - ver 1.0.gpx',       gpxKm: '60 km',  prologKm: 0  },
  '80':       { fileName: 'GRINDURANCE 100 K - ver 2.0.gpx',      gpxKm: '100 km', prologKm: 0  },
  '120_PAIR': { fileName: 'GRINDURANCE 120_150 K - ver 1.0.gpx',  gpxKm: '120 km', prologKm: 0  },
  '150':      { fileName: 'GRINDURANCE 120_150 K - ver 1.0.gpx',  gpxKm: '120 km', prologKm: 30 },
  '200':      { fileName: 'GRINDURANCE 200 K - ver 1.0.gpx',      gpxKm: '170 km', prologKm: 30 },
  'VIRTUAL':  { fileName: '',                                       gpxKm: '',       prologKm: 0  },
};

export const CATEGORIES: CategoryData[] = [
  {
    id: '60',
    tabLabel: '60 KM',
    km: '60 KM',
    watermark: '60K',
    subtitle: 'FUN GRAVEL',
    title: 'Fun Gravel 60',
    elevation: '+450 m',
    elevationMeters: 450,
    cot: '7 Jam',
    wave: '07:00 WIB',
    quota: '150 Peserta',
    tag: 'REKREASI & PEMULA',
    format: 'Fun Gravel / Non-Kompetitif',
    specialRules: 'Ramah Sepeda Lipat (Seli), Hybrid & Pemula',
    photo: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 225.000',
    priceJersey: 'Rp 275.000',
    earlyBird: { medal: 'Rp 225.000', jersey: 'Rp 275.000' },
    regular: { medal: 'Rp 250.000', jersey: 'Rp 300.000' },
    desc: 'Lintasan tanah pedesaan Jonggol & aspal halus Cibubur. Sangat ideal bagi pesepeda yang baru pertama kali mencicipi gravel serta pengguna sepeda lipat.',
    routeHighlights: 'Cibubur Basecamp → Pasir Angin → Jonggol Lowland → ABEEY Coffee Finish',
    terrain: 'Aspal Pinggiran Kota & Makadam Halus Pasir Angin',
    gearTip: 'Ramah Sepeda Lipat (Seli 20"), Hybrid, & Gravel Pemula',
    maxAlt: '380 m MDPL',
    avgGradient: '3.2% Rata-rata',
    maxGradient: '11% Maksimum',
    surfaceBreakdown: { asphalt: '65%', gravel: '25%', unpaved: '10%' },
    stations: [
      { km: 'KM 0', name: 'Start ABEEY Coffee & LRT', type: 'START', desc: 'Pelepasan 07:00 WIB' },
      { km: 'KM 28', name: 'WS#1 Pasir Angin (Refill Air)', type: 'WS', desc: 'Water station mandiri' },
      { km: 'KM 45', name: 'CP#2 Jonggol Lowland', type: 'CP', desc: 'Pemeriksaan rute' },
      { km: 'KM 60', name: 'Finish Lounge ABEEY', type: 'FINISH', desc: 'Pengambilan medali' },
    ],
  },
  {
    id: '80',
    tabLabel: '80 KM',
    km: '80 KM',
    watermark: '80K',
    subtitle: 'FUN GRAVEL',
    title: 'Fun Gravel 80',
    elevation: '+750 m',
    elevationMeters: 750,
    cot: '9 Jam',
    wave: '07:00 WIB',
    quota: '150 Peserta',
    tag: 'EKSPLORASI SCENIC',
    format: 'Fun Gravel / Non-Kompetitif',
    specialRules: 'Rolling Terrain · Ban Rekomendasi 38c+',
    photo: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 275.000',
    priceJersey: 'Rp 325.000',
    earlyBird: { medal: 'Rp 275.000', jersey: 'Rp 325.000' },
    regular: { medal: 'Rp 300.000', jersey: 'Rp 350.000' },
    desc: 'Menjelajahi persawahan Cileungsi dan makadam khas Pemandian Sodong. Etape peningkatan jarak ideal dengan rolling hills berirama dinamis.',
    routeHighlights: 'Cileungsi → Sodong Makadam → Klapanunggal Ridge → ABEEY Coffee Finish',
    terrain: 'Rolling Hills, Persawahan Cileungsi & Makadam Pemandian Sodong',
    gearTip: 'Rekomendasi Ban 38c+ · Joy of Riding & Scenic Gravel',
    maxAlt: '620 m MDPL',
    avgGradient: '4.5% Rata-rata',
    maxGradient: '14% Maksimum',
    surfaceBreakdown: { asphalt: '50%', gravel: '35%', unpaved: '15%' },
    stations: [
      { km: 'KM 0', name: 'Start ABEEY Coffee', type: 'START', desc: 'Pelepasan 07:00 WIB' },
      { km: 'KM 32', name: 'WS#1 Persawahan Cileungsi', type: 'WS', desc: 'Water station mandiri' },
      { km: 'KM 56', name: 'CP#2 Pemandian Sodong', type: 'CP', desc: 'Makadam berbatu' },
      { km: 'KM 68', name: 'WS#2 Klapanunggal Ridge', type: 'WS', desc: 'Titik hidrasi bukit' },
      { km: 'KM 80', name: 'Finish Lounge ABEEY', type: 'FINISH', desc: 'Finisher celebration' },
    ],
  },
  {
    id: '120_PAIR',
    tabLabel: '120 KM',
    km: '120 KM',
    watermark: '120K',
    subtitle: 'AMAZING RACE (PODIUM)',
    title: 'Race 120',
    titleNote: '(Single & Pair Mix)',
    elevation: '+1,450 m',
    elevationMeters: 1450,
    cot: '11 Jam',
    wave: '06:00 WIB',
    quota: '100 Single / 30 Tim',
    tag: 'OFFICIAL RACE · PODIUM TOP 3',
    format: 'Official Race (Top 3 Podium)',
    specialRules: 'Mendukung Tim PAIR Mix 2 Pax · Handicap Waktu · Live Tracking GPS',
    photo: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 350.000',
    priceJersey: 'Rp 400.000',
    pairPriceMedal: 'Rp 600.000',
    pairPriceJersey: 'Rp 650.000',
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000', pairMedal: 'Rp 600.000', pairJersey: 'Rp 650.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000', pairMedal: 'Rp 700.000', pairJersey: 'Rp 750.000' },
    desc: 'Satu-satunya kategori balap kompetitif resmi dengan perebutan podium Top 3. Menaklukkan tanjakan koridor Jonggol–Sukamakmur dengan opsi tandem 2 pesepeda (Pair Mix).',
    routeHighlights: 'Cibubur → Jonggol Ridge → Tanjakan Sukamakmur → Sentul Descent → ABEEY Coffee Finish',
    terrain: 'Koridor Jonggol Ridge & Tanjakan Sukamakmur (+1.450 m)',
    gearTip: 'Live Tracking RaceRoute.id Wajib · Perebutan Podium Top 3 · Opsi Tandem PAIR MIX',
    isRace: true,
    maxAlt: '980 m MDPL',
    avgGradient: '6.8% Rata-rata',
    maxGradient: '19% Maksimum',
    surfaceBreakdown: { asphalt: '45%', gravel: '40%', unpaved: '15%' },
    stations: [
      { km: 'KM 0', name: 'Start Wave 1 (06:00 WIB)', type: 'START', desc: 'Timing gate aktivasi' },
      { km: 'KM 42', name: 'CP#1 Jonggol Ridge', type: 'CP', desc: 'Geofencing check' },
      { km: 'KM 78', name: 'KOM Tanjakan Sukamakmur', type: 'KOM', desc: 'Puncak tanjakan +1.450m' },
      { km: 'KM 102', name: 'CP#4 Pitstop Wajib 30 Menit', type: 'PITSTOP', desc: 'Wajib jeda rest & nutrisi' },
      { km: 'KM 120', name: 'Podium Gate ABEEY', type: 'FINISH', desc: 'Awarding podium Top 3' },
    ],
  },
  {
    id: '150',
    tabLabel: '150 KM',
    km: '150 KM',
    watermark: '150K',
    subtitle: 'CROSS GRAVEL',
    title: 'Cross Gravel 150',
    elevation: '+2,100 m',
    elevationMeters: 2100,
    cot: '15 Jam',
    wave: '05:30 WIB',
    quota: '75 Peserta',
    tag: 'WAJIB PROLOG 30 KM',
    format: 'Cross Gravel Endurance',
    specialRules: 'Wajib Prolog 30 km (03:00–05:00 WIB) · Pitstop Wajib 30 Menit',
    photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 350.000',
    priceJersey: 'Rp 400.000',
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000' },
    desc: 'Tantangan klasik veteran endurance menembus tanjakan ganda Sukamakmur dan turunan teknis berbatu di tengah guyuran musim hujan khas Jawa Barat.',
    routeHighlights: 'Prolog 30 km Subuh → Sukamakmur → Jonggol Loop → Puncak Dua → ABEEY Coffee Finish',
    terrain: 'Tanjakan Ganda Sukamakmur, Jalur Batu Puncak Dua & Sentul Loop',
    gearTip: 'Wajib Prolog 30 km (03:00–05:00 WIB) · Ban Min 38–40mm & Wet Lube',
    maxAlt: '1.240 m MDPL',
    avgGradient: '8.1% Rata-rata',
    maxGradient: '23% Maksimum',
    surfaceBreakdown: { asphalt: '35%', gravel: '45%', unpaved: '20%' },
    stations: [
      { km: '03:00 WIB', name: 'Prolog 30 km Mandiri Subuh', type: 'START', desc: 'Validasi GPS scrutineering' },
      { km: 'KM 0', name: 'Wave Start ABEEY (05:30 WIB)', type: 'START', desc: 'Pelepasan fajar' },
      { km: 'KM 50', name: 'CP#1 Jonggol Rural', type: 'CP', desc: 'Pos verifikasi' },
      { km: 'KM 88', name: 'KOM Sukamakmur Summit', type: 'KOM', desc: 'Puncak elevasi ganda' },
      { km: 'KM 122', name: 'CP#4 Pitstop Wajib 30 Menit', type: 'PITSTOP', desc: 'Penalti 300% jika dilewati' },
      { km: 'KM 150', name: 'Finisher Gate ABEEY', type: 'FINISH', desc: 'Penyerahan medali' },
    ],
  },
  {
    id: '200',
    tabLabel: '200 KM',
    km: '200 KM',
    watermark: '200K',
    subtitle: 'ULTRA GRAVEL',
    title: 'Ultra Gravel 200',
    elevation: '+3,180 m',
    elevationMeters: 3180,
    cot: '19 Jam',
    wave: '05:30 WIB',
    quota: '50 Peserta',
    tag: 'ULTRA GRAVEL · NIGHT NAV',
    format: 'Ultra Gravel Endurance',
    specialRules: 'Prolog 30 km · Night Navigation · Lampu Depan Ganda >500lm & Rompi Reflektif',
    photo: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 350.000',
    priceJersey: 'Rp 400.000',
    earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000' },
    regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000' },
    desc: 'Kategori puncak ketahanan fisik, mental, dan navigasi malam mandiri. Loop penuh Jonggol–Sukamakmur–Babakan Madang–Sentul dengan total elevasi tembus +3.180 meter.',
    routeHighlights: 'Prolog 30 km → Jonggol → Sukamakmur Monster Pass → Sentul Loop → Malam ABEEY Coffee',
    terrain: 'Loop Penuh 4 Wilayah · Monster Pass Sukamakmur · Sentul Extreme',
    gearTip: 'Wajib Prolog 30 km · Night Nav: Lampu Depan >500lm & Rompi Reflektif',
    maxAlt: '1.480 m MDPL',
    avgGradient: '9.4% Rata-rata',
    maxGradient: '26% Maksimum',
    surfaceBreakdown: { asphalt: '30%', gravel: '45%', unpaved: '25%' },
    stations: [
      { km: '03:00 WIB', name: 'Prolog 30 km Mandiri Subuh', type: 'START', desc: 'Validasi GPS scrutineering' },
      { km: 'KM 0', name: 'Wave Start ABEEY (05:30 WIB)', type: 'START', desc: 'Pelepasan fajar ultra' },
      { km: 'KM 62', name: 'CP#2 Jonggol Cimenyan', type: 'CP', desc: 'Pos verifikasi' },
      { km: 'KM 110', name: 'MONSTER PASS Sukamakmur', type: 'KOM', desc: 'Tanjakan monster +3.180m' },
      { km: 'KM 145', name: 'CP#4 Pitstop Wajib 30 Menit', type: 'PITSTOP', desc: 'Jeda istirahat & nutrisi' },
      { km: 'KM 175', name: 'CP#6 Night Navigation', type: 'CP', desc: 'Cek lampu & reflektif' },
      { km: 'KM 200', name: 'Legend Finisher Gate ABEEY', type: 'FINISH', desc: 'Gelar finisher ultra' },
    ],
  },
  {
    id: 'VIRTUAL',
    tabLabel: 'VIRTUAL RIDE',
    km: 'BEBAS',
    watermark: 'GPS',
    subtitle: 'VIRTUAL RIDE',
    title: 'Virtual Ride',
    titleNote: '(19 Chapters)',
    elevation: 'Rute Lokal',
    elevationMeters: 0,
    cot: 'Fleksibel',
    wave: 'Mandiri H-Event',
    quota: '1.000 Peserta',
    tag: 'VALIDASI STRAVA / KOMOOT',
    format: 'Virtual Ride Mandiri',
    specialRules: 'Khusus Luar Jabodetabek · Outdoor Only · Medali Dikirim DHS Logistik',
    photo: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop',
    priceMedal: 'Rp 175.000',
    priceJersey: 'Rp 225.000',
    earlyBird: { medal: 'Rp 175.000', jersey: 'Rp 225.000' },
    regular: { medal: 'Rp 200.000', jersey: 'Rp 250.000' },
    desc: 'Bagi 80.000+ anggota GX-ID di 19 Chapter se-Indonesia. Selesaikan jarak tantangan di kota domisili Anda, validasi via Strava Webhook, dan medali resmi dikirim ke rumah.',
    routeHighlights: '19 Chapter: Bandung, Surabaya, Medan, Bali, Jogja, Makassar, Semarang, Solo & Nasional',
    terrain: 'Rute Domisili Lokal di 19 Regional Chapter GX-ID se-Indonesia',
    gearTip: 'Outdoor GPS Validasi Otomatis via Strava Webhook · Medali via DHS Logistik',
    maxAlt: 'Rute Lokal',
    avgGradient: 'Variatif',
    maxGradient: 'Variatif',
    surfaceBreakdown: { asphalt: '50%', gravel: '40%', unpaved: '10%' },
    stations: [
      { km: 'STEP 1', name: 'Tikum Chapter Kota Anda', type: 'START', desc: '19 Regional Chapter' },
      { km: 'STEP 2', name: 'Rekam GPS Luar Ruang', type: 'CP', desc: 'Garmin, Wahoo, atau HP' },
      { km: 'STEP 3', name: 'Strava Webhook Auto-Validation', type: 'WS', desc: 'Sertifikasi otomatis awan' },
      { km: 'STEP 4', name: 'Medali Dikirim DHS Logistik', type: 'FINISH', desc: 'Langsung tiba ke rumah' },
    ],
  },
];
