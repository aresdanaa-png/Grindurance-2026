export interface SponsorItem {
  id: string;
  name: string;
  logo: string | null;
  heightClass: string;
  maxWidthClass?: string;
  customText?: string;
}

// 1a. PRESENTED BY — TOP ROW: ABEEY, JNT, BYD (Optically Balanced Visual Weight)
export const PRESENTING_TOP_TIER: SponsorItem[] = [
  {
    id: 'abeey',
    name: 'Abeey Coffee & Eatery',
    logo: '/sponsors/cafe abeey white.png',
    heightClass: 'h-14 sm:h-16 lg:h-20 xl:h-22',
    maxWidthClass: 'max-w-[160px] sm:max-w-[200px] lg:max-w-[240px]',
  },
  {
    id: 'jnt',
    name: 'J&T Express',
    logo: '/sponsors/jnt.svg',
    heightClass: 'h-8 sm:h-10 lg:h-12 xl:h-13',
    maxWidthClass: 'max-w-[140px] sm:max-w-[180px] lg:max-w-[210px]',
  },
  {
    id: 'byd',
    name: 'BYD Auto',
    logo: '/sponsors/byd.svg',
    heightClass: 'h-8 sm:h-10 lg:h-12 xl:h-13',
    maxWidthClass: 'max-w-[140px] sm:max-w-[170px] lg:max-w-[200px]',
  },
];

// 1b. PRESENTED BY — BOTTOM ROW: HERMINA DEPOK & DHS (Harmonious Presence)
export const PRESENTING_BOTTOM_TIER: SponsorItem[] = [
  {
    id: 'hermina-depok',
    name: 'RS Hermina Depok',
    logo: '/sponsors/hermina-depok-tight.png',
    heightClass: 'h-14 sm:h-18 lg:h-20 xl:h-22',
    maxWidthClass: 'max-w-[110px] sm:max-w-[130px] lg:max-w-[150px]',
  },
  {
    id: 'dhs',
    name: 'DHS Logistik',
    logo: '/sponsors/dhs-logo.png',
    heightClass: 'h-11 sm:h-14 lg:h-16 xl:h-18',
    maxWidthClass: 'max-w-[140px] sm:max-w-[180px] lg:max-w-[210px]',
  },
];

// 2. SUPPORTING PARTNERS (Half-size Hierarchy, Legible Details & Balanced Area)
export const SUPPORTING_PARTNERS: SponsorItem[] = [
  {
    id: 'hermina-jatinegara',
    name: 'RS Hermina Jatinegara',
    logo: '/sponsors/hermina-jatinegara-tight.png',
    heightClass: 'h-14 sm:h-16 lg:h-18',
  },
  {
    id: 'hermina-podomoro',
    name: 'RS Hermina Podomoro',
    logo: '/sponsors/hermina-podomoro-tight.png',
    heightClass: 'h-14 sm:h-16 lg:h-18',
  },
  {
    id: 'ndr',
    name: 'NDR Energy Gel',
    logo: '/sponsors/ndr-clean.png',
    heightClass: 'h-9 sm:h-10 lg:h-12',
  },
  {
    id: 'raceroute',
    name: 'RaceRoute.id',
    logo: '/sponsors/raceroute-clean.png',
    heightClass: 'h-8 sm:h-9 lg:h-10',
  },
  {
    id: 'raceonebike',
    name: 'RaceOneBike',
    logo: '/sponsors/raceonebike-clean.png',
    heightClass: 'h-10 sm:h-12 lg:h-14',
  },
  {
    id: 'sorlex',
    name: 'Sorlex',
    logo: '/sponsors/sorlex.png',
    heightClass: 'h-8 sm:h-9 lg:h-10',
  },
  {
    id: 'miri-miri',
    name: 'Miri-Miri',
    logo: '/sponsors/miri-miri.png',
    heightClass: 'h-11 sm:h-13 lg:h-15',
  },
  {
    id: 'kedai-vian',
    name: 'Kedai Vian',
    logo: '/sponsors/kedai-vian.png',
    heightClass: 'h-12 sm:h-14 lg:h-16',
  },
  {
    id: 'jerjhon',
    name: 'Jerjhon',
    logo: '/sponsors/jerjhon.png',
    heightClass: 'h-9 sm:h-11 lg:h-12',
  },
  {
    id: 'sulep',
    name: 'Sulep Apparel Bags & Parts',
    logo: '/sponsors/sulep-clean.png',
    heightClass: 'h-14 sm:h-16 lg:h-18',
  },
  {
    id: 'rudeboys',
    name: 'Rudeboys',
    logo: '/sponsors/rudeboys.png',
    heightClass: 'h-12 sm:h-14 lg:h-16',
  },
  {
    id: 'pollride',
    name: 'Pollride',
    logo: null,
    customText: 'POLLRIDE',
    heightClass: 'h-8 sm:h-10 lg:h-11',
  },
];
