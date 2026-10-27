export interface LocalizedText {
  id: string;
  en: string;
}

export interface PackTierItem {
  id: string;
  optionNumber: string;
  tierTag: LocalizedText;
  tierBadge: LocalizedText;
  priceTag: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  inclusions: Array<{
    text: LocalizedText;
    isBold?: boolean;
  }>;
  footerMeta: {
    left: LocalizedText;
    right: LocalizedText;
  };
  isFeatured?: boolean;
}

export interface RpcOption {
  id: 'pickup' | 'handling';
  tag: LocalizedText;
  badge: LocalizedText;
  badgeHighlight?: boolean;
  title: LocalizedText;
  subtitle: LocalizedText;
  items: LocalizedText[];
}

export interface OfficialGearItem {
  id: string;
  itemNumber: string;
  tagCategory: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  specs: LocalizedText[];
  imageSrc?: string;
  imageBackSrc?: string;
  visualPreview: {
    topLeftText: string;
    topRightText: LocalizedText;
    numberBadge: string;
    centerTitle: string;
    centerSubtitle: LocalizedText;
    bottomTagLeft: string;
    bottomTagRight: LocalizedText;
  };
}

// 1. DUA OPSI PAKET UTAMA (MEDAL ONLY VS MEDAL & JERSEY)
export const PACK_TIERS: PackTierItem[] = [
  {
    id: 'tier-medal-only',
    optionNumber: '01',
    tierTag: { id: 'OPSI 01', en: 'OPTION 01' },
    tierBadge: { id: 'ESENSIAL', en: 'ESSENTIAL' },
    priceTag: { id: 'TARIF DASAR KATEGORI', en: 'BASE CATEGORY RATE' },
    title: { id: 'PAKET MEDAL ONLY', en: 'MEDAL ONLY PACKAGE' },
    description: {
      id: 'Pilihan tepat bagi pesepeda yang fokus pada esensi jarak, tantangan mandiri, dan koleksi medali resmi finisher (dikalungkan saat berhasil finish di bawah COT).',
      en: 'The ideal choice for cyclists focusing on pure endurance distance, self-supported challenge, and official finisher medal (awarded upon finish under COT).',
    },
    inclusions: [
      {
        text: {
          id: 'Heavy Finisher Metal Medal (Dikalungkan saat Finish di bawah COT)',
          en: 'Heavy Finisher Metal Medal (Awarded upon Finish under COT)',
        },
      },
      {
        text: {
          id: 'Race Pack: Nomor Plat Sepeda Tahan Air #1000+ & Kabel Ties',
          en: 'Race Pack: Waterproof Bike BIB Plate #1000+ & Zip Ties',
        },
      },
      {
        text: {
          id: 'Race Pack: Nutrisi Hidrasi NDR Drinkmix Carbs 80g',
          en: 'Race Pack: NDR Drinkmix Carbs 80g Hydration Nutrition',
        },
      },
      {
        text: {
          id: 'Race Pack: Asuransi Kecelakaan Resmi 1 Hari Event',
          en: 'Race Pack: Official 1-Day Event Accident Insurance',
        },
      },
      {
        text: {
          id: 'Race Pack: Voucher Pemulihan ABBEY Coffee & Stiker GX-ID',
          en: 'Race Pack: ABBEY Coffee Recovery Voucher & GX-ID Stickers',
        },
      },
    ],
    footerMeta: {
      left: { id: 'MULAI DARI RP 150.000', en: 'STARTING FROM IDR 150,000' },
      right: { id: 'TERMASUK FASILITAS HARI-H', en: 'INCLUDES RACEDAY ESSENTIALS' },
    },
    isFeatured: false,
  },
  {
    id: 'tier-medal-jersey',
    optionNumber: '02',
    tierTag: { id: 'OPSI 02', en: 'OPTION 02' },
    tierBadge: { id: 'REKOMENDASI LENGKAP', en: 'COMPLETE RECOMMENDED' },
    priceTag: { id: 'MULAI +RP 50.000 / PAX', en: 'FROM +IDR 50,000 / PAX' },
    title: { id: 'PAKET MEDAL & JERSEY RESMI', en: 'OFFICIAL MEDAL & JERSEY PACKAGE' },
    description: {
      id: 'Paket lengkap terfavorit. Mendapatkan seluruh starter kit Race Pack dan Medali Finisher (< COT) ditambah Official Anniversary Aero Jersey buatan Pollride (Pre-Order).',
      en: 'Top-favorite complete package. Includes all Race Pack starter items and Finisher Medal (< COT) plus Official Anniversary Aero Jersey by Pollride (Pre-Order).',
    },
    inclusions: [
      {
        text: {
          id: 'Official Anniversary Aero Jersey by Pollride (Pre-Order / Bundel Resmi)',
          en: 'Official Anniversary Aero Jersey by Pollride (Pre-Order / Official Bundle)',
        },
        isBold: true,
      },
      {
        text: {
          id: 'Heavy Finisher Metal Medal (Dikalungkan saat Finish di bawah COT)',
          en: 'Heavy Finisher Metal Medal (Awarded upon Finish under COT)',
        },
      },
      {
        text: {
          id: 'Race Pack: Nomor Plat Sepeda Tahan Air #1000+ & Kabel Ties',
          en: 'Race Pack: Waterproof Bike BIB Plate #1000+ & Zip Ties',
        },
      },
      {
        text: {
          id: 'Race Pack: Nutrisi Hidrasi NDR Drinkmix Carbs 80g',
          en: 'Race Pack: NDR Drinkmix Carbs 80g Hydration Nutrition',
        },
      },
      {
        text: {
          id: 'Race Pack: Asuransi 1 Hari, Voucher ABBEY Coffee, & Stiker GX-ID',
          en: 'Race Pack: 1-Day Insurance, ABBEY Coffee Voucher, & GX-ID Stickers',
        },
      },
    ],
    footerMeta: {
      left: { id: 'SUBSIDI KOMUNITAS GX-ID', en: 'GX-ID COMMUNITY SUBSIDY' },
      right: { id: 'BEST SELLER EDITION', en: 'BEST SELLER EDITION' },
    },
    isFeatured: true,
  },
];

export interface RpcRequirement {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
}

// 2. LOGISTIK PENGAMBILAN RACE PACK (RPC)
export const RPC_LOGISTICS: RpcOption[] = [
  {
    id: 'pickup',
    tag: { id: 'PENGAMBILAN MANDIRI & PRA-EVENT (H-6)', en: 'IN-PERSON PICKUP & PRE-EVENT (D-6)' },
    badge: { id: 'GRATIS (RP 0)', en: 'FREE (IDR 0)' },
    badgeHighlight: false,
    title: { id: 'MINGGU, 13 DESEMBER 2026', en: 'SUNDAY, DEC 13, 2026' },
    subtitle: { id: 'ABBEY Coffee & Eatery · Stasiun LRT Harjamukti Cibubur · 10:00–17:00 WIB', en: 'ABBEY Coffee & Eatery · Harjamukti LRT Station Cibubur · 10:00–17:00 WIB' },
    items: [
      { id: 'Pengambilan Starter Kit (Plat BIB #1000+, Nutrisi NDR, Asuransi, Voucher ABBEY)', en: 'Starter Kit collection (BIB Plate #1000+, NDR Nutrition, Insurance, ABBEY Voucher)' },
      { id: 'Akses Coaching Clinic Navigasi Gravel & Strategi Ban (11:00 WIB)', en: 'Access to Gravel Navigation & Tire Strategy Clinic (11:00 WIB)' },
      { id: 'Pengarahan Teknis Rute Final & Regulasi Safety di Technical Meeting (14:00 WIB)', en: 'Final Route & Safety Briefing at Official Technical Meeting (14:00 WIB)' },
    ],
  },
  {
    id: 'handling',
    tag: { id: 'LAYANAN MEJA HARI-H', en: 'RACE-DAY DESK SERVICE' },
    badge: { id: '+RP 20.000 / PESERTA', en: '+IDR 20,000 / RIDER' },
    badgeHighlight: true,
    title: { id: 'SABTU, 19 DESEMBER 2026', en: 'SATURDAY, DEC 19, 2026' },
    subtitle: { id: 'Meja Khusus Registrasi Ulang Subuh di Venue Start · 04:30–05:15 WIB', en: 'Dedicated Dawn Re-Registration Desk at Start Venue · 04:30–05:15 WIB' },
    items: [
      { id: 'Khusus peserta berdomisili luar kota atau berhalangan hadir saat RPC 13 Des', en: 'Specifically for out-of-town riders or unable to attend Dec 13 RPC Day' },
      { id: 'Starter Kit disiapkan khusus di meja check-in fajar sebelum pelepasan start', en: 'Starter Kit staged at dawn check-in desk prior to wave dispatch' },
      { id: 'Dipilih langsung saat registrasi online dengan handling fee resmi Rp 20.000', en: 'Selected during online registration with official IDR 20,000 handling fee' },
    ],
  },
];

export const RPC_REQUIREMENTS: RpcRequirement[] = [
  {
    id: 'req-doc',
    label: { id: 'DOKUMEN WAJIB', en: 'REQUIRED DOCUMENTS' },
    description: {
      id: 'Tunjukkan E-Ticket QR Code konfirmasi pendaftaran & Kartu Identitas Fisik asli (KTP/SIM/Paspor).',
      en: 'Present your registration QR E-ticket & physical government ID card (National ID/Driver License/Passport).',
    },
  },
  {
    id: 'req-proxy',
    label: { id: 'PENGAMBILAN DIWAKILKAN', en: 'PROXY COLLECTION' },
    description: {
      id: 'Wajib membawa Surat Kuasa tertulis yang ditandatangani serta foto KTP peserta pendaftar.',
      en: 'Must present a signed authorization letter and a photo of the registered participant’s ID card.',
    },
  },
  {
    id: 'req-rule',
    label: { id: 'KETENTUAN STARTER KIT', en: 'STARTER KIT POLICY' },
    description: {
      id: 'Race Pack murni memuat BIB, NDR, asuransi, & voucher. Medali diserahkan saat finish < COT, jersey didapatkan via PO.',
      en: 'Race Pack only includes BIB, NDR, insurance, & voucher. Medal awarded at finish < COT, jersey fulfilled via PO.',
    },
  },
];

// 3. 3 PRODUK RESMI (JERSEY PO, MEDALI FINISHER < COT, RACEPACK STARTER KIT)
export const OFFICIAL_GEAR_ITEMS: OfficialGearItem[] = [
  {
    id: 'jersey',
    itemNumber: '01',
    tagCategory: { id: 'APPAREL RESMI (PO / ADD-ON)', en: 'OFFICIAL APPAREL (PO / ADD-ON)' },
    title: { id: 'OFFICIAL ANNIVERSARY JERSEY', en: 'OFFICIAL ANNIVERSARY JERSEY' },
    description: {
      id: 'Jersey balap resmi buatan Pollride Apparel dengan pola aerodinamis short sleeve tanpa saku belakang. Jersey didapatkan melalui sistem Pre-Order (PO) atau memilih Paket Medal & Jersey. Saat ini desain resmi masih dalam tahap finalisasi.',
      en: 'Official race jersey by Pollride Apparel with aerodynamic short sleeve cut without back pocket. Available via Pre-Order (PO) or Medal & Jersey package. Currently in final official design phase.',
    },
    specs: [
      { id: 'Pre-Order / Bundel Jersey', en: 'Pre-Order / Jersey Bundle' },
      { id: 'Pollride Aero Fit (No Pocket)', en: 'Pollride Aero Fit (No Pocket)' },
      { id: 'Size XS s/d 5XL', en: 'Sizes XS to 5XL' },
      { id: 'Quick-Dry Breathable Fabric', en: 'Quick-Dry Breathable Fabric' },
    ],
    // Dikosongkan sesuai permintaan karena masih tahap desain
    visualPreview: {
      topLeftText: 'POLLRIDE APPAREL',
      topRightText: { id: 'TAHAP DESAIN', en: 'DESIGN STAGE' },
      numberBadge: '01',
      centerTitle: 'COMING SOON',
      centerSubtitle: { id: 'TAHAP FINALISASI DESAIN', en: 'DESIGN FINALIZATION' },
      bottomTagLeft: 'PRE-ORDER (PO) · SIZE XS–5XL',
      bottomTagRight: { id: 'STATUS: TAHAP DESAIN', en: 'STATUS: IN DESIGN' },
    },
  },
  {
    id: 'medal',
    itemNumber: '02',
    tagCategory: { id: 'MEDALI FINISHER SAH', en: 'OFFICIAL FINISHER MEDAL' },
    title: { id: 'HEAVY FINISHER METAL MEDAL', en: 'HEAVY FINISHER METAL MEDAL' },
    description: {
      id: 'Medali berbobot tebal dari paduan zinc alloy antique bronze dengan ukiran timbul 3D topografi puncak pegunungan, kontur elevasi, dan lanyard tenun. Medali hanya diserahkan di garis finish kepada peserta yang berhasil finish di bawah batas Cut-Off Time (COT).',
      en: 'Heavyweight solid zinc alloy medal in antique bronze with 3D embossed mountain topography and woven lanyard. Exclusively awarded at the finish line to riders who finish under the Cut-Off Time (COT).',
    },
    specs: [
      { id: 'Khusus Finish < COT', en: 'Exclusively Finish < COT' },
      { id: 'Paduan Solid Zinc 3D', en: 'Solid Zinc 3D Alloy' },
      { id: 'Relief Topografi Gunung', en: 'Mountain Topography Relief' },
      { id: 'Finisher Luring & Virtual', en: 'In-Person & Virtual Finishers' },
    ],
    imageSrc: '/racepacks/finisher-medal.webp',
    visualPreview: {
      topLeftText: 'FINISHER REWARD',
      topRightText: { id: 'SYARAT: < COT', en: 'REQ: < COT' },
      numberBadge: '02',
      centerTitle: 'MEDALI 3D',
      centerSubtitle: { id: 'FINISHER UNDER COT', en: 'FINISHER UNDER COT' },
      bottomTagLeft: 'ZINC ALLOY METAL',
      bottomTagRight: { id: 'DI GARIS FINISH', en: 'AT FINISH LINE' },
    },
  },
  {
    id: 'racepack',
    itemNumber: '03',
    tagCategory: { id: 'RACE PACK STARTER KIT', en: 'RACE PACK STARTER KIT' },
    title: { id: 'OFFICIAL RACE PACK STARTER KIT', en: 'OFFICIAL RACE PACK STARTER KIT' },
    description: {
      id: 'Paket starter kit yang diambil saat pengambilan Race Pack (RPC). Mencakup nutrisi hidrasi NDR Drinkmix Carbs 80g, plat nomor sepeda waterproof #1000+ dengan kabel ties, asuransi kecelakaan 1 hari event, voucher pemulihan ABBEY Coffee, dan stiker resmi GX-ID. Tidak memuat medali (diberikan saat finish < COT) maupun jersey (dipesan via PO).',
      en: 'Official starter kit collected during Race Pack Collection (RPC). Includes NDR Drinkmix Carbs 80g nutrition, waterproof bike plate #1000+ with zip ties, 1-day accident insurance, ABBEY Coffee recovery voucher, and official GX-ID stickers. Excludes medal (awarded at finish < COT) and jersey (pre-ordered via PO).',
    },
    specs: [
      { id: 'Nutrisi NDR Drinkmix 80g', en: 'NDR Drinkmix 80g Nutrition' },
      { id: 'Plat BIB Sepeda Waterproof', en: 'Waterproof Bike BIB Plate' },
      { id: 'Asuransi Kecelakaan 1 Hari', en: '1-Day Accident Insurance' },
      { id: 'Voucher ABBEY Coffee & Stiker', en: 'ABBEY Coffee Voucher & Stickers' },
    ],
    imageSrc: '/racepacks/starter-kit.webp',
    visualPreview: {
      topLeftText: 'PENGAMBILAN RPC',
      topRightText: { id: 'STARTER PACK', en: 'STARTER PACK' },
      numberBadge: '03',
      centerTitle: 'RACEPACK KIT',
      centerSubtitle: { id: 'STARTER KIT HARI-H', en: 'RACE-DAY STARTER KIT' },
      bottomTagLeft: 'NDR · BIB · ASURANSI · VOUCHER',
      bottomTagRight: { id: 'STATUS: RESMI', en: 'STATUS: OFFICIAL' },
    },
  },
];
