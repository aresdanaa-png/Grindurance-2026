export interface SponsorItem {
  id: string;
  name: string;
  logo: string | null;
  heightClass?: string;
  maxWidthClass?: string;
  customText?: string;
}

// 5 LOGO UTAMA (PRESENTED BY): Abeey, J&T, BYD, RS Hermina Depok, DHS
export const PRESENTED_BY_SPONSORS: SponsorItem[] = [
  {
    id: 'abeey',
    name: 'Abeey Coffee & Eatery',
    logo: '/sponsors/cafe abeey white.png',
  },
  {
    id: 'jnt',
    name: 'J&T Express',
    logo: '/sponsors/jnt.svg',
  },
  {
    id: 'byd',
    name: 'BYD Auto',
    logo: '/sponsors/byd.svg',
  },
  {
    id: 'hermina-depok',
    name: 'RS Hermina Depok',
    logo: '/sponsors/hermina-depok-tight.png',
  },
  {
    id: 'dhs',
    name: 'DHS Logistik',
    logo: '/sponsors/dhs-logo.png',
  },
];

// Backwards compatibility aliases
export const PRESENTING_TOP_TIER = PRESENTED_BY_SPONSORS.slice(0, 3);
export const PRESENTING_BOTTOM_TIER = PRESENTED_BY_SPONSORS.slice(3);

// SUPPORTING PARTNERS
export const SUPPORTING_PARTNERS: SponsorItem[] = [
  {
    id: 'hermina-jatinegara',
    name: 'RS Hermina Jatinegara',
    logo: '/sponsors/hermina-jatinegara-tight.png',
  },
  {
    id: 'hermina-podomoro',
    name: 'RS Hermina Podomoro',
    logo: '/sponsors/hermina-podomoro-tight.png',
  },
  {
    id: 'ndr',
    name: 'NDR Energy Gel',
    logo: '/sponsors/ndr-clean.png',
  },
  {
    id: 'raceroute',
    name: 'RaceRoute.id',
    logo: '/sponsors/raceroute-clean.png',
  },
  {
    id: 'raceonebike',
    name: 'RaceOneBike',
    logo: '/sponsors/raceonebike-clean.png',
  },
  {
    id: 'sorlex',
    name: 'Sorlex',
    logo: '/sponsors/sorlex.png',
  },
  {
    id: 'miri-miri',
    name: 'Miri-Miri',
    logo: '/sponsors/miri-miri.png',
  },
  {
    id: 'kedai-vian',
    name: 'Kedai Vian',
    logo: '/sponsors/kedai-vian.png',
  },
  {
    id: 'jerjhon',
    name: 'Jerjhon',
    logo: '/sponsors/jerjhon.png',
  },
  {
    id: 'sulep',
    name: 'Sulep Apparel Bags & Parts',
    logo: '/sponsors/sulep-clean.png',
  },
  {
    id: 'rudeboys',
    name: 'Rudeboys',
    logo: '/sponsors/rudeboys.png',
  },
  {
    id: 'pollride',
    name: 'Pollride',
    logo: null,
    customText: 'POLLRIDE',
  },
];
