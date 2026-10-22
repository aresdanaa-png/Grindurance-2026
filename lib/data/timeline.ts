export interface LocalizedText {
  id: string;
  en: string;
}

export interface TimelineItineraryItem {
  id: string;
  time: string;
  badge: LocalizedText;
  badgeHighlight?: boolean;
  locationTag: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  bullets?: LocalizedText[];
  note?: {
    label: LocalizedText;
    text: LocalizedText;
  };
  metrics?: Array<{
    label: string;
    value: LocalizedText;
    highlight?: boolean;
  }>;
  variant?: 'highlight' | 'accent' | 'default';
}

export interface PraEventItem {
  id: string;
  time: string;
  badgeTag: LocalizedText;
  badgeHighlight?: boolean;
  title: LocalizedText;
  description: LocalizedText;
  details: Array<{
    title: LocalizedText;
    description: LocalizedText;
  }>;
  isHighlight?: boolean;
}

export interface WaveMatrixRow {
  categoryId: string;
  categoryTitle: string;
  categorySubtitle: LocalizedText;
  wave: string;
  prologue: LocalizedText;
  prologueHighlight?: boolean;
  cot: LocalizedText;
  pitstop: LocalizedText;
  lighting: LocalizedText;
  nature: LocalizedText;
  isCompetitive?: boolean;
  rowHighlight?: boolean;
}

// 1. DATA JADWAL RACE DAY (13 DESEMBER 2026)
export const RACEDAY_ITINERARY: TimelineItineraryItem[] = [
  {
    id: 'prologue',
    time: '03:00 — 05:00 WIB',
    badge: {
      id: 'WAJIB KHUSUS 150 & 200 KM',
      en: 'MANDATORY FOR 150 & 200 KM',
    },
    badgeHighlight: true,
    locationTag: {
      id: 'RUTE MANDIRI SUBUH',
      en: 'DAWN SELF-ROUTE',
    },
    title: {
      id: 'MANDIRI PROLOG 30 KM · REKAMAN GPS MANDIRI',
      en: 'SELF-START 30 KM PROLOGUE · GPS ACTIVITY LOG',
    },
    description: {
      id: 'Peserta kategori 150 km dan 200 km wajib menuntaskan minimal 30 km mandiri dari titik asal masing-masing menuju venue atau di rute sekitar Cibubur sebelum pukul 05:00 WIB. File aktivitas rekam jejak GPS (Garmin, Wahoo, atau Strava GPX/FIT) diverifikasi panitia di Meja Scrutineering fajar.',
      en: 'Participants in the 150 km and 200 km categories must complete at least 30 km independently from their origin point to the venue or around Cibubur before 05:00 WIB. GPS activity log files (Garmin, Wahoo, or Strava GPX/FIT) are verified at the dawn Scrutineering Desk.',
    },
    note: {
      label: {
        id: 'Mitigasi Keselamatan Mutlak:',
        en: 'Absolute Safety Mitigation:',
      },
      text: {
        id: 'Peserta yang gagal melampirkan log prolog 30 km atau tiba lewat pukul 05:15 WIB tidak diizinkan masuk starting grid demi mencegah kelelahan berlebih dan risiko medis.',
        en: 'Riders failing to submit a 30 km prologue log or arriving after 05:15 WIB will not be admitted to the starting grid to prevent severe exhaustion and medical risks.',
      },
    },
    variant: 'default',
  },
  {
    id: 'scrutineering',
    time: '04:30 — 05:15 WIB',
    badge: {
      id: 'SEMUA PESERTA LURING',
      en: 'ALL IN-PERSON RIDERS',
    },
    locationTag: {
      id: 'ABEEY COFFEE LOUNGE',
      en: 'ABEEY COFFEE LOUNGE',
    },
    title: {
      id: 'VENUE OPEN & MEJA SCRUTINEERING AKHIR',
      en: 'VENUE OPEN & FINAL SCRUTINEERING DESK',
    },
    description: {
      id: 'Pintu registrasi ulang dan inspeksi teknis dibuka. Peserta melakukan scan QR e-ticket nomor BIB, verifikasi kelayakan sepeda (rem, ban, drivetrain), serta inspeksi perlengkapan keselamatan wajib.',
      en: 'Check-in and technical inspection gates open. Riders scan registration QR e-tickets, verify bicycle roadworthiness (brakes, tires, drivetrain), and complete mandatory safety gear inspections.',
    },
    bullets: [
      {
        id: '2 Lampu Depan (400+ lm) & Lampu Belakang',
        en: '2 Front Headlamps (400+ lm) & Rear Light',
      },
      {
        id: 'Rompi Reflektif EN ISO 20471 & Helm CE',
        en: 'EN ISO 20471 Reflective Vest & CE Helmet',
      },
      {
        id: 'Plat Nomor Sepeda & Botol Hidrasi Penuh',
        en: 'Bike Number Plate & Filled Hydration Bottles',
      },
    ],
    variant: 'default',
  },
  {
    id: 'wave-1',
    time: '05:30 WIB',
    badge: {
      id: 'WAVE 1 DISPATCH',
      en: 'WAVE 1 DISPATCH',
    },
    badgeHighlight: true,
    locationTag: {
      id: 'FAJAR PERDANA',
      en: 'FIRST DAWN',
    },
    title: {
      id: 'FLAG OFF WAVE 1: ULTRA 200 KM & 150 GRAND FONDO',
      en: 'FLAG OFF WAVE 1: ULTRA 200 KM & 150 GRAND FONDO',
    },
    description: {
      id: 'Pelepasan fajar awal untuk memaksimalkan jam cahaya matahari (daylight hours) sebelum transisi navigasi malam hari. Mengarungi jalur aspal awal Cibubur–Cileungsi yang steril menuju perbukitan pedalaman Jonggol, Sukamakmur, dan Cariu.',
      en: 'Early dawn departure to maximize daylight hours before transitioning into nighttime navigation. Tackling the clear initial Cibubur–Cileungsi tarmac route toward the backcountry hills of Jonggol, Sukamakmur, and Cariu.',
    },
    metrics: [
      {
        label: 'COT 200 KM',
        value: { id: '17 JAM (22:30 WIB)', en: '17 HOURS (22:30 WIB)' },
        highlight: false,
      },
      {
        label: 'COT 150 KM',
        value: { id: '15 JAM (20:30 WIB)', en: '15 HOURS (20:30 WIB)' },
        highlight: false,
      },
      {
        label: 'MODE',
        value: { id: 'TANTANGAN MANDIRI PENUH', en: 'FULL SELF-CHALLENGE' },
        highlight: true,
      },
    ],
    variant: 'highlight',
  },
  {
    id: 'wave-2',
    time: '06:00 WIB',
    badge: {
      id: 'WAVE 2 DISPATCH',
      en: 'WAVE 2 DISPATCH',
    },
    badgeHighlight: true,
    locationTag: {
      id: 'KOMPETITIF RESMI',
      en: 'OFFICIAL COMPETITIVE',
    },
    title: {
      id: 'FLAG OFF WAVE 2: 120 (RACE) AMAZING RACE (SINGLE & PAIR MIX)',
      en: 'FLAG OFF WAVE 2: 120 (RACE) AMAZING RACE (SINGLE & PAIR MIX)',
    },
    description: {
      id: 'Pelepasan kategori balap berintensitas tinggi perebutan Top 3 Podium & Jersey Juara Pollride. Jalur steril dari rombongan rekreasi agar dinamika peloton cepat dan formasi aerodinamis dapat terbentuk secara aman.',
      en: 'High-intensity race dispatch contending for Top 3 Podium spots & the Pollride Champions Jersey. Clear course dynamics separated from recreational packs for safe paceline speeds.',
    },
    metrics: [
      {
        label: 'COT 120 KM',
        value: { id: '11 JAM (17:00 WIB)', en: '11 HOURS (17:00 WIB)' },
        highlight: false,
      },
      {
        label: 'LIVE TRACKING',
        value: { id: 'WAJIB AKTIF TERUS', en: 'ALWAYS ACTIVE' },
        highlight: false,
      },
      {
        label: 'PITSTOP',
        value: { id: 'WAJIB 30 MENIT (CP#4)', en: 'MANDATORY 30 MIN (CP#4)' },
        highlight: false,
      },
    ],
    variant: 'highlight',
  },
  {
    id: 'wave-3',
    time: '07:00 WIB',
    badge: {
      id: 'WAVE 3 DISPATCH',
      en: 'WAVE 3 DISPATCH',
    },
    badgeHighlight: false,
    locationTag: {
      id: 'CAHAYA MATAHARI PENUH',
      en: 'FULL MORNING SUNLIGHT',
    },
    title: {
      id: 'FLAG OFF WAVE 3: 100 FONDO & 70 FUN GRAVEL',
      en: 'FLAG OFF WAVE 3: 100 FONDO & 70 FUN GRAVEL',
    },
    description: {
      id: 'Pelepasan di bawah sinar matahari pagi penuh dengan atmosfer festival dan kebersamaan komunitas. Sangat ramah untuk sepeda lipat (folding bike), sepeda hybrid, dan pemula gravel tanpa tekanan persaingan podium.',
      en: 'Morning departure immersed in a vibrant festival and community spirit. Very accommodating for folding bikes, hybrid bikes, and gravel beginners without podium pressure.',
    },
    metrics: [
      {
        label: 'COT 100 KM',
        value: { id: '9.5 JAM (16:30 WIB)', en: '9.5 HOURS (16:30 WIB)' },
        highlight: false,
      },
      {
        label: 'COT 70 KM',
        value: { id: '7 JAM (14:00 WIB)', en: '7 HOURS (14:00 WIB)' },
        highlight: false,
      },
      {
        label: 'ATMOSFER',
        value: { id: 'FESTIVAL & PARADE KOMUNITAS', en: 'FESTIVAL & COMMUNITY PARADE' },
        highlight: false,
      },
    ],
    variant: 'default',
  },
  {
    id: 'pitstop',
    time: '10:00 — 16:00 WIB',
    badge: {
      id: 'PENALTI 300%',
      en: '300% PENALTY',
    },
    badgeHighlight: true,
    locationTag: {
      id: 'CP#4 / CP#6 JONGGOL',
      en: 'CP#4 / CP#6 JONGGOL',
    },
    title: {
      id: 'MANDATORY 30-MIN NEUTRALIZED PITSTOP · SMART GEOFENCING',
      en: 'MANDATORY 30-MIN NEUTRALIZED PITSTOP · SMART GEOFENCING',
    },
    description: {
      id: 'Seluruh peserta wajib mengambil jeda istirahat minimal 30 menit tanpa bergerak yang terverifikasi sensor smart geofencing dan scan barcode: di CP#4 untuk kategori 120, 150, dan 200 km, serta di CP#6 untuk kategori 70 Fun Gravel dan 100 Fondo.',
      en: 'All riders must observe a mandatory stationary rest break of at least 30 minutes verified by smart geofencing and barcode scan: at CP#4 for 120, 150, and 200 km, and at CP#6 for 70 Fun Gravel and 100 Fondo.',
    },
    note: {
      label: {
        id: 'Regulasi Waktu Netral:',
        en: 'Neutral Time Regulation:',
      },
      text: {
        id: 'Waktu istirahat 30 menit tidak dihitung dalam race time bersih. Peserta yang keluar pos di bawah 30 menit otomatis diganjar penalti waktu 300% (penambahan 90 menit ke catatan waktu).',
        en: 'The 30-minute rest is deducted from net race time. Riders departing before completing 30 full minutes will automatically receive a 300% time penalty (90 minutes added to their official time).',
      },
    },
    variant: 'default',
  },
  {
    id: 'finisher',
    time: '11:00 — 21:00 WIB',
    badge: {
      id: 'SEMUA FINISHER SAH',
      en: 'ALL OFFICIAL FINISHERS',
    },
    locationTag: {
      id: 'FINISHER GATE ABEEY',
      en: 'FINISHER GATE ABEEY',
    },
    title: {
      id: 'FINISHER ARRIVAL, MEDAL CLAIM & ATHLETE RECOVERY LOUNGE',
      en: 'FINISHER ARRIVAL, MEDAL CLAIM & ATHLETE RECOVERY LOUNGE',
    },
    description: {
      id: 'Penyambutan finisher di ABEEY Coffee & Eatery. Pengalungan Heavy Metal Finisher Medal, verifikasi log GPS akhir, penukaran voucher hidangan hangat, hidrasi isotonik NDR, dan sajian fermented kombucha artisan (Candala, Palapa, Mantra).',
      en: 'Finisher reception at ABEEY Coffee & Eatery. Awarding of Heavy Metal Finisher Medals, final GPS log verification, warm recovery meal vouchers, NDR isotonic hydration, and artisan fermented kombucha (Candala, Palapa, Mantra).',
    },
    variant: 'default',
  },
  {
    id: 'podium',
    time: '17:00 — 18:00 WIB',
    badge: {
      id: 'STAGE CEREMONY',
      en: 'STAGE CEREMONY',
    },
    badgeHighlight: true,
    locationTag: {
      id: 'PANGGUNG UTAMA',
      en: 'MAIN STAGE',
    },
    title: {
      id: 'PODIUM CEREMONY 120 (RACE) & COMMUNITY AWARDS',
      en: 'PODIUM CEREMONY 120 (RACE) & COMMUNITY AWARDS',
    },
    description: {
      id: 'Penganugerahan piala dan hadiah sponsor bagi Top 3 120 KM Kategori Pria, Wanita, dan Pair Mix. Penyerahan sertifikat Best Spirit Community untuk chapter teraktif, serta pengundian hadiah doorprize utama.',
      en: 'Awarding trophies and sponsor prizes for the Top 3 120 KM Men, Women, and Pair Mix categories. Best Spirit Community honors for the most active chapters, followed by grand doorprize giveaways.',
    },
    variant: 'highlight',
  },
  {
    id: 'cot-closing',
    time: '21:00 — 00:30 WIB (H+1)',
    badge: {
      id: 'BATAS AKHIR MUTLAK',
      en: 'ABSOLUTE CUT-OFF',
    },
    locationTag: {
      id: 'FINAL FINISH GATE',
      en: 'FINAL FINISH GATE',
    },
    title: {
      id: 'OFFICIAL COT · 21:00 WIB (STAGE) & 22:30 WIB (ULTRA 200 KM)',
      en: 'OFFICIAL COT · 21:00 WIB (STAGE) & 22:30 WIB (ULTRA 200 KM)',
    },
    description: {
      id: 'Pukul 21:00 WIB merupakan batas akhir kategori 70–150 KM serta penutupan panggung perayaan utama. Pos finis dan tim ambulans malam RS Hermina Cibubur tetap bersiaga mengawal peserta Ultra 200 KM hingga batas Cut-Off Time resmi pukul 22:30 WIB malam (17 jam perlombaan). Peserta wajib menyelesaikan punggungan rawan saat masih terang (Daylight Ridge Completion).',
      en: '21:00 WIB marks the final deadline for 70–150 KM categories and main stage closing. The finish line and RS Hermina Cibubur mobile paramedic teams remain deployed to escort Ultra 200 KM riders until official Cut-Off Time at 22:30 WIB (17 race hours). Riders must clear hazardous ridge sectors during daylight (Daylight Ridge Completion).',
    },
    variant: 'default',
  },
];

// 2. DATA PRA-EVENT & RPC (6 DESEMBER 2026)
export const PRAEVENT_ITINERARY: PraEventItem[] = [
  {
    id: 'rpc-collection',
    time: '10:00 — 17:00 WIB',
    badgeTag: {
      id: 'OFFICIAL RPC DESK',
      en: 'OFFICIAL RPC DESK',
    },
    title: {
      id: 'RACE PACK COLLECTION (RPC) & PRE-CHECK',
      en: 'RACE PACK COLLECTION (RPC) & PRE-CHECK',
    },
    description: {
      id: 'Pengambilan starter kit atlet: nomor plat sepeda waterproof #1000+, nutrisi hidrasi NDR Drinkmix Carbs 83g, voucher pemulihan ABBEY Coffee, stiker resmi GX-ID, serta kartu asuransi 1 hari. Pemeriksaan awal fungsi sepeda dapat dilakukan bersama tim mekanik rekanan.',
      en: 'Collection of athlete starter kit: waterproof bike number plate #1000+, NDR Drinkmix Carbs 83g hydration, ABBEY Coffee recovery voucher, GX-ID official stickers, and 1-day accident insurance card. Pre-race bicycle safety checks available with partner mechanics.',
    },
    details: [
      {
        title: { id: 'Opsi Pengambilan:', en: 'Collection Options:' },
        description: {
          id: 'Mandiri saat RPC Day (Gratis / Rp 0). Bagi peserta berhalangan hadir, tersedia opsi Handling Fee RPC (+Rp 20.000) saat registrasi.',
          en: 'In-person on RPC Day (Free / IDR 0). For participants unable to attend, an RPC Handling Fee option (+IDR 20,000) is available during registration.',
        },
      },
      {
        title: { id: 'Dokumen Wajib:', en: 'Required Documents:' },
        description: {
          id: 'E-ticket QR Code pendaftaran & Kartu Identitas Fisik (KTP/SIM/Paspor). Pengambilan diwakilkan wajib menyertakan surat kuasa.',
          en: 'Registration QR E-ticket & physical ID card (National ID/Driving License/Passport). Third-party collection requires an authorization letter.',
        },
      },
    ],
  },
  {
    id: 'coaching-clinic',
    time: '11:00 — 12:30 WIB',
    badgeTag: {
      id: 'LIVE INSTAGRAM',
      en: 'LIVE INSTAGRAM',
    },
    badgeHighlight: true,
    title: {
      id: 'COACHING CLINIC: GRAVEL NAVIGATION & GEAR',
      en: 'COACHING CLINIC: GRAVEL NAVIGATION & GEAR',
    },
    description: {
      id: 'Sesi edukasi praktis bersama pelatih ketahanan GX-ID. Membedah strategi tekanan angin ban (tire pressure) untuk makadam Jonggol, sinkronisasi rute GPX di head unit Garmin/Wahoo, dan manajemen cairan saat hujan tropis.',
      en: 'Practical briefing with GX-ID endurance coaches. Covering tire pressure strategies for Jonggol macadam, GPX navigation setup on Garmin/Wahoo head units, and hydration strategy in wet tropical weather.',
    },
    details: [
      {
        title: { id: 'Format Sesi:', en: 'Session Format:' },
        description: {
          id: 'Tersedia tatap muka di area outdoor ABEEY Coffee serta siaran langsung di Instagram @gxid.official.',
          en: 'Available in-person at ABEEY Coffee outdoor arena and livestreamed on Instagram @gxid.official.',
        },
      },
    ],
  },
  {
    id: 'technical-meeting',
    time: '14:00 — 15:30 WIB',
    badgeTag: {
      id: 'BRIEFING WAJIB',
      en: 'MANDATORY BRIEFING',
    },
    badgeHighlight: true,
    isHighlight: true,
    title: {
      id: 'TECHNICAL MEETING & SAFETY WORKSHOP',
      en: 'TECHNICAL MEETING & SAFETY WORKSHOP',
    },
    description: {
      id: 'Pengarahan teknis rute final: pengumuman titik kritis tanjakan Sukamakmur & Cariu, koordinat penempatan ambulans SPGDT RS Hermina Cibubur, tata kelola smart geofencing pitstop 30 menit, dan sistem darurat evakuasi.',
      en: 'Final route technical briefing: critical elevation sectors in Sukamakmur & Cariu, RS Hermina Cibubur ambulance staging points, 30-minute geofenced pitstop protocols, and emergency evacuation protocols.',
    },
    details: [
      {
        title: { id: 'Wajib Hadir / Menyimak:', en: 'Attendance Recommended:' },
        description: {
          id: 'Seluruh kapten squad, peserta solo, dan pair mix sangat disarankan hadir atau menyimak rekaman sesi ini sebelum flag off esok paginya.',
          en: 'All squad captains, solo riders, and pair mix athletes are strongly advised to attend or review the recording prior to race morning.',
        },
      },
    ],
  },
  {
    id: 'community-gathering',
    time: '15:30 — 17:30 WIB',
    badgeTag: {
      id: 'COMMUNITY LOUNGE',
      en: 'COMMUNITY LOUNGE',
    },
    title: {
      id: 'COMMUNITY GATHERING & BARISTA SOCIAL HOUR',
      en: 'COMMUNITY GATHERING & BARISTA SOCIAL HOUR',
    },
    description: {
      id: 'Temu kangen antar-pesepeda dari 19 chapter GX-ID se-Indonesia. Saling bertukar cerita petualangan ekspedisi mandiri sambil mencicipi racikan kopi dan kombucha khas ABEEY Eatery sebelum kembali istirahat persiapan dini hari.',
      en: 'Community gathering with riders representing 19 GX-ID chapters across Indonesia. Sharing endurance stories over artisan coffee and kombucha before resting ahead of dawn.',
    },
    details: [
      {
        title: { id: 'Akses Lokasi:', en: 'Location Access:' },
        description: {
          id: 'Terhubung langsung ke akomodasi sekitar Cibubur Junction dan Stasiun LRT Harjamukti.',
          en: 'Directly accessible to accommodations near Cibubur Junction and Harjamukti LRT Station.',
        },
      },
    ],
  },
];

// 3. MATRIKS OPERASIONAL GELOMBANG (WAVE MATRIX)
export const WAVE_MATRIX_ROWS: WaveMatrixRow[] = [
  {
    categoryId: '200',
    categoryTitle: '200 KM ULTRA',
    categorySubtitle: { id: 'Ultra Gravel Grind', en: 'Ultra Gravel Grind' },
    wave: 'WAVE 1 · 05:30 WIB',
    prologue: { id: 'Wajib 30 KM (03:00–05:00)', en: 'Mandatory 30 KM (03:00–05:00)' },
    prologueHighlight: true,
    cot: { id: '17 Jam (22:30 WIB)', en: '17 Hours (22:30 WIB)' },
    pitstop: { id: 'Wajib 30 Min (CP#4)', en: 'Mandatory 30 Min (CP#4)' },
    lighting: { id: '2 Depan (400+ lm) + Rompi EN ISO', en: '2 Front (400+ lm) + EN ISO Vest' },
    nature: { id: 'Tantangan Mandiri Ultra', en: 'Ultra Self-Challenge' },
  },
  {
    categoryId: '150',
    categoryTitle: '150 GRAND FONDO',
    categorySubtitle: { id: 'Grand Fondo Endurance', en: 'Grand Fondo Endurance' },
    wave: 'WAVE 1 · 05:30 WIB',
    prologue: { id: 'Wajib 30 KM (03:00–05:00)', en: 'Mandatory 30 KM (03:00–05:00)' },
    prologueHighlight: true,
    cot: { id: '15 Jam (20:30 WIB)', en: '15 Hours (20:30 WIB)' },
    pitstop: { id: 'Wajib 30 Min (CP#4)', en: 'Mandatory 30 Min (CP#4)' },
    lighting: { id: '2 Depan (400+ lm) + Rompi EN ISO', en: '2 Front (400+ lm) + EN ISO Vest' },
    nature: { id: 'Grand Fondo', en: 'Grand Fondo' },
  },
  {
    categoryId: '120',
    categoryTitle: '120 (RACE)',
    categorySubtitle: { id: 'Single & Pair Mix', en: 'Single & Pair Mix' },
    wave: 'WAVE 2 · 06:00 WIB',
    prologue: { id: 'Tidak Ada', en: 'None' },
    prologueHighlight: false,
    cot: { id: '11 Jam (17:00 WIB)', en: '11 Hours (17:00 WIB)' },
    pitstop: { id: 'Wajib 30 Min (CP#4)', en: 'Mandatory 30 Min (CP#4)' },
    lighting: { id: 'Min 1 Depan + Belakang Aktif', en: 'Min 1 Front + Active Rear' },
    nature: { id: 'KOMPETITIF (PODIUM TOP 3)', en: 'COMPETITIVE (TOP 3 PODIUM)' },
    isCompetitive: true,
    rowHighlight: true,
  },
  {
    categoryId: '100',
    categoryTitle: '100 FONDO',
    categorySubtitle: { id: 'Fondo Exploration', en: 'Fondo Exploration' },
    wave: 'WAVE 3 · 07:00 WIB',
    prologue: { id: 'Tidak Ada', en: 'None' },
    prologueHighlight: false,
    cot: { id: '9.5 Jam (16:30 WIB)', en: '9.5 Hours (16:30 WIB)' },
    pitstop: { id: 'Wajib 30 Min (CP#6)', en: 'Mandatory 30 Min (CP#6)' },
    lighting: { id: 'Rekomendasi Senja/Siang', en: 'Recommended Dusk/Daylight' },
    nature: { id: 'Fondo / Rekreasi', en: 'Fondo / Recreational' },
  },
  {
    categoryId: '60',
    categoryTitle: '70 FUN GRAVEL',
    categorySubtitle: { id: 'Fun Gravel Ramah Seli & Pemula', en: 'Folding-Bike & Beginner Friendly' },
    wave: 'WAVE 3 · 07:00 WIB',
    prologue: { id: 'Tidak Ada', en: 'None' },
    prologueHighlight: false,
    cot: { id: '7 Jam (14:00 WIB)', en: '7 Hours (14:00 WIB)' },
    pitstop: { id: 'Wajib 30 Min (CP#6)', en: 'Mandatory 30 Min (CP#6)' },
    lighting: { id: 'Standar Reflektor/Lampu', en: 'Standard Reflectors/Lights' },
    nature: { id: 'Parade Festival', en: 'Festival Parade' },
  },
];
