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
      id: 'Pilihan tepat bagi pesepeda yang fokus pada esensi jarak, tantangan mandiri, dan koleksi medali resmi finisher.',
      en: 'The ideal choice for cyclists focusing on pure endurance distance, self-supported challenge, and official finisher medals.',
    },
    inclusions: [
      {
        text: {
          id: 'Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)',
          en: 'Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)',
        },
      },
      {
        text: {
          id: 'Nomor Plat Sepeda Tahan Air #1000+ & QR Check-in',
          en: 'Waterproof Bike Number Plate #1000+ & QR Check-in',
        },
      },
      {
        text: {
          id: 'Asuransi Kecelakaan Resmi 1 Hari Event',
          en: 'Official 1-Day Event Accident Insurance',
        },
      },
      {
        text: {
          id: 'Nutrisi NDR Energy Gel + Isotonic Drink',
          en: 'NDR Energy Gel Nutrition + Isotonic Drink',
        },
      },
      {
        text: {
          id: 'Akses Finisher Lounge & Voucher Pemulihan ABBEY Coffee',
          en: 'Finisher Lounge Access & ABBEY Coffee Recovery Voucher',
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
      id: 'Paket lengkap terfavorit. Mendapatkan seluruh fasilitas Paket Medal Only ditambah Official Anniversary Aero Jersey buatan Pollride.',
      en: 'Top-favorite complete package. Includes all Medal Only perks plus the Official Anniversary Aero Jersey by Pollride.',
    },
    inclusions: [
      {
        text: {
          id: 'Official Anniversary Aero Jersey by Pollride (Senilai Rp 350.000)',
          en: 'Official Anniversary Aero Jersey by Pollride (IDR 350K Value)',
        },
        isBold: true,
      },
      {
        text: {
          id: 'Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)',
          en: 'Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)',
        },
      },
      {
        text: {
          id: 'Nomor Plat Sepeda Tahan Air #1000+ & QR Check-in',
          en: 'Waterproof Bike Number Plate #1000+ & QR Check-in',
        },
      },
      {
        text: {
          id: 'Asuransi Kecelakaan Resmi 1 Hari Event',
          en: 'Official 1-Day Event Accident Insurance',
        },
      },
      {
        text: {
          id: 'Nutrisi NDR Energy Gel + Isotonic + Voucher ABBEY Coffee',
          en: 'NDR Energy Gel Nutrition + Isotonic + ABBEY Coffee Voucher',
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

// 2. LOGISTIK PENGAMBILAN RACE PACK (RPC)
export const RPC_LOGISTICS: RpcOption[] = [
  {
    id: 'pickup',
    tag: { id: 'PENGAMBILAN MANDIRI', en: 'IN-PERSON PICKUP' },
    badge: { id: 'GRATIS', en: 'FREE' },
    badgeHighlight: false,
    title: { id: 'MINGGU, 6 DESEMBER 2026', en: 'SUNDAY, DEC 6, 2026' },
    subtitle: { id: 'ABBEY Coffee & Eatery · 10:00–17:00 WIB', en: 'ABBEY Coffee & Eatery · 10:00–17:00 WIB' },
    items: [
      { id: 'Pengambilan langsung di venue start/finish', en: 'Direct collection at start/finish venue' },
      { id: 'Akses resmi Coaching Clinic & Technical Meeting', en: 'Access to Coaching Clinic & Technical Meeting' },
    ],
  },
  {
    id: 'handling',
    tag: { id: 'PENGAMBILAN HARI-H', en: 'RACE-DAY PICKUP' },
    badge: { id: 'OPSI TAMBAHAN', en: 'ADD-ON' },
    badgeHighlight: true,
    title: { id: '+RP 20.000 / PESERTA', en: '+IDR 20,000 / RIDER' },
    subtitle: { id: 'Minggu, 13 Desember 2026 (Subuh Hari-H)', en: 'Sunday, Dec 13, 2026 (Race Dawn)' },
    items: [
      { id: 'Khusus peserta luar kota atau berhalangan hadir', en: 'For out-of-town riders or unable to attend' },
      { id: 'Dilayani di meja khusus panitia saat registrasi ulang', en: 'Handled via dedicated organizer desk during check-in' },
    ],
  },
];

// 3. 4 PRODUK RESMI (JERSEY, MEDALI, NUTRISI NDR, HARI-H ESSENTIALS)
export const OFFICIAL_GEAR_ITEMS: OfficialGearItem[] = [
  {
    id: 'jersey',
    itemNumber: '01',
    tagCategory: { id: 'APPAREL RESMI', en: 'OFFICIAL APPAREL' },
    title: { id: 'OFFICIAL ANNIVERSARY JERSEY', en: 'OFFICIAL ANNIVERSARY JERSEY' },
    description: {
      id: 'Jersey balap resmi buatan Pollride Apparel dengan spesifikasi short sleeve aerodinamis tanpa saku belakang. Tersedia ukuran XS hingga 5XL.',
      en: 'Official race jersey by Pollride Apparel with aerodynamic short sleeve cut without back pocket. Available in sizes XS to 5XL.',
    },
    specs: [
      { id: 'Pollride Aero Fit', en: 'Pollride Aero Fit' },
      { id: 'Short Sleeve No Pocket', en: 'Short Sleeve No Pocket' },
      { id: 'Size XS s/d 5XL', en: 'Sizes XS to 5XL' },
      { id: 'Quick-Dry Breathable', en: 'Quick-Dry Breathable' },
    ],
    imageSrc: '/size-chart.jpeg',
    visualPreview: {
      topLeftText: 'POLLRIDE APPAREL',
      topRightText: { id: 'EDISI 2026', en: '2026 EDITION' },
      numberBadge: '01',
      centerTitle: 'POLLRIDE',
      centerSubtitle: { id: 'OFFICIAL RACE JERSEY', en: 'OFFICIAL RACE JERSEY' },
      bottomTagLeft: 'SIZE XS–5XL',
      bottomTagRight: { id: 'STATUS: PRODUKSI', en: 'STATUS: PRODUCTION' },
    },
  },
  {
    id: 'medal',
    itemNumber: '02',
    tagCategory: { id: 'MEDALI SAH', en: 'OFFICIAL MEDAL' },
    title: { id: 'HEAVY FINISHER METAL MEDAL', en: 'HEAVY FINISHER METAL MEDAL' },
    description: {
      id: 'Medali berbobot tebal dari paduan zinc alloy antique bronze dengan ukiran timbul 3D topografi puncak pegunungan dan lanyard tenun edisi peringatan.',
      en: 'Heavyweight solid zinc alloy medal in antique bronze with 3D embossed summit topography and official commemorative woven lanyard.',
    },
    specs: [
      { id: 'Paduan Solid Zinc', en: 'Solid Zinc Alloy' },
      { id: 'Relief Timbul 3D', en: '3D Embossed Relief' },
      { id: 'Lanyard Woven Tebal', en: 'Heavy Woven Lanyard' },
      { id: 'Finisher Luring & Virtual', en: 'In-Person & Virtual Finishers' },
    ],
    visualPreview: {
      topLeftText: 'SEMUA KATEGORI',
      topRightText: { id: 'EDISI 2026', en: '2026 EDITION' },
      numberBadge: '02',
      centerTitle: 'COMING SOON',
      centerSubtitle: { id: 'MOLD 3D RELIEF', en: 'MOLD 3D RELIEF' },
      bottomTagLeft: 'ZINC ALLOY METAL',
      bottomTagRight: { id: 'STATUS: CETAK', en: 'STATUS: MOLDING' },
    },
  },
  {
    id: 'ndr-drinkmix',
    itemNumber: '03',
    tagCategory: { id: 'NUTRISI ENDURANCE', en: 'ENDURANCE FUEL' },
    title: { id: 'NDR DRINKMIX 80G HIGH CARB FUEL', en: 'NDR DRINKMIX 80G HIGH CARB FUEL' },
    description: {
      id: 'Bahan bakar karbohidrat konsentrasi tinggi resmi panitia (80g carbs per sachet / 320 kkal) dengan maltodekstrin, fruktosa kristalin, dan elektrolit lengkap.',
      en: 'Official ultra-endurance high carb fuel (80g carbs per serving / 320 kcal) with maltodextrin, crystalline fructose, and complete electrolytes.',
    },
    specs: [
      { id: '80g Karbohidrat Murni', en: '80g Pure Carbs' },
      { id: '320 kkal Energi Rute', en: '320 kcal Route Energy' },
      { id: 'Elektrolit Na, K, Mg', en: 'Electrolytes Na, K, Mg' },
      { id: 'Ramah Lambung Isotonic', en: 'Gut-Friendly Isotonic' },
    ],
    imageSrc: '/sponsors/ndr-drinkmix-depan.png',
    imageBackSrc: '/sponsors/ndr-drinkmix-belakang.png',
    visualPreview: {
      topLeftText: 'NDR FUEL LAB',
      topRightText: { id: 'OFFICIAL PARTNER', en: 'OFFICIAL PARTNER' },
      numberBadge: '03',
      centerTitle: '80G CARBS',
      centerSubtitle: { id: 'HIGH ENERGY DRINKMIX', en: 'HIGH ENERGY DRINKMIX' },
      bottomTagLeft: '320 KCAL FUEL',
      bottomTagRight: { id: 'STATUS: READY', en: 'STATUS: READY' },
    },
  },
  {
    id: 'essentials',
    itemNumber: '04',
    tagCategory: { id: 'ESENSIAL ATLET', en: 'ATHLETE ESSENTIALS' },
    title: { id: 'PERLENGKAPAN & LAYANAN HARI-H', en: 'RACE-DAY GEAR & SERVICES' },
    description: {
      id: 'Plat nomor sepeda tahan air, asuransi kecelakaan resmi 1 hari event, serta voucher hidangan pemulihan di ABEEY Coffee & Eatery LRT Harjamukti.',
      en: 'Waterproof bike number plate, official 1-day accident insurance, and recovery meal voucher at ABEEY Coffee & Eatery LRT Harjamukti.',
    },
    specs: [
      { id: 'Plat BIB Waterproof', en: 'Waterproof BIB Plate' },
      { id: 'Asuransi Resmi Event', en: 'Official Race Insurance' },
      { id: 'Voucher ABBEY Lounge', en: 'ABBEY Lounge Voucher' },
      { id: 'Kupon Makan Rp 50.000*', en: 'IDR 50K Meal Coupon*' },
    ],
    visualPreview: {
      topLeftText: 'HARI-H READY',
      topRightText: { id: 'EDISI 2026', en: '2026 EDITION' },
      numberBadge: '04',
      centerTitle: 'COMING SOON',
      centerSubtitle: { id: 'KURASI LOGISTIK', en: 'LOGISTICS CURATION' },
      bottomTagLeft: 'LOGISTIK ATLET',
      bottomTagRight: { id: 'STATUS: FINALISASI', en: 'STATUS: FINALIZATION' },
    },
  },
];
