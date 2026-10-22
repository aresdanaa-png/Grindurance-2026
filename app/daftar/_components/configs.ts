import { Category, JerseySize } from '@/lib/types';
import { 
  CATEGORIES, 
  CategoryData, 
  getPricesForCategory, 
  PricingPhase 
} from '@/lib/data/categories';
import { CategoryVisual } from './types';

export const JERSEY_SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

export interface JerseyDimension {
  size: JerseySize;
  chestCm: number;
  lengthCm: number;
  label: string;
  tier: 'STANDARD' | 'UP_SIZE';
  note: 'Standard' | 'Up Size';
}

export const JERSEY_DIMENSIONS: JerseyDimension[] = [
  { size: 'XS', chestCm: 86, lengthCm: 60, label: 'Extra Small', tier: 'STANDARD', note: 'Standard' },
  { size: 'S', chestCm: 90, lengthCm: 62, label: 'Small', tier: 'STANDARD', note: 'Standard' },
  { size: 'M', chestCm: 96, lengthCm: 64, label: 'Medium', tier: 'STANDARD', note: 'Standard' },
  { size: 'L', chestCm: 100, lengthCm: 66, label: 'Large', tier: 'STANDARD', note: 'Standard' },
  { size: 'XL', chestCm: 104, lengthCm: 68, label: 'Extra Large', tier: 'STANDARD', note: 'Standard' },
  { size: '2XL', chestCm: 108, lengthCm: 70, label: 'Double Large (Up Size)', tier: 'UP_SIZE', note: 'Up Size' },
  { size: '3XL', chestCm: 112, lengthCm: 72, label: 'Triple Large (Up Size)', tier: 'UP_SIZE', note: 'Up Size' },
  { size: '4XL', chestCm: 116, lengthCm: 74, label: '4X Large (Up Size)', tier: 'UP_SIZE', note: 'Up Size' },
  { size: '5XL', chestCm: 120, lengthCm: 76, label: '5X Large (Up Size)', tier: 'UP_SIZE', note: 'Up Size' },
];

export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export function buildCategoryConfigs(phase: PricingPhase) {
  const p70 = getPricesForCategory('70', phase);
  const p100 = getPricesForCategory('100', phase);
  const p120s = getPricesForCategory('120_SINGLE', phase);
  const p120p = getPricesForCategory('120_PAIR', phase);
  const p150 = getPricesForCategory('150', phase);
  const p200 = getPricesForCategory('200', phase);
  const pVirt = getPricesForCategory('VIRTUAL', phase);

  const race120Single: Category = {
    id: '120_SINGLE',
    name: '120 (Race) Single',
    distance_km: 120,
    category_type: 'race',
    is_pair: false,
    price_medal_only: p120s.medal,
    price_medal_jersey: p120s.jersey,
    quota: 100,
    current_enrolled: 34,
    cot_hours: 11,
    wave_start_time: '06:00',
    prologue_required_km: 0,
    mandatory_pitstop_cp: 4,
    tracking_required: true,
    is_active: true,
  };

  const race120Pair: Category = {
    id: '120_PAIR',
    name: '120 (Race) Pair Mix',
    distance_km: 120,
    category_type: 'race',
    is_pair: true,
    price_medal_only: p120p.medal,
    price_medal_jersey: p120p.jersey,
    quota: 30,
    current_enrolled: 12,
    cot_hours: 11,
    wave_start_time: '06:00',
    prologue_required_km: 0,
    mandatory_pitstop_cp: 4,
    tracking_required: true,
    is_active: true,
  };

  const officialCategories: Category[] = [
    {
      id: '60',
      name: '70 Fun Gravel Ride',
      distance_km: 70,
      category_type: 'fun',
      is_pair: false,
      price_medal_only: p70.medal,
      price_medal_jersey: p70.jersey,
      quota: 150,
      current_enrolled: 42,
      cot_hours: 7,
      wave_start_time: '07:00',
      prologue_required_km: 0,
      mandatory_pitstop_cp: 6,
      tracking_required: false,
      is_active: true,
    },
    {
      id: '100',
      name: '100 Fondo',
      distance_km: 100,
      category_type: 'cross',
      is_pair: false,
      price_medal_only: p100.medal,
      price_medal_jersey: p100.jersey,
      quota: 150,
      current_enrolled: 56,
      cot_hours: 9.5,
      wave_start_time: '07:00',
      prologue_required_km: 0,
      mandatory_pitstop_cp: 6,
      tracking_required: false,
      is_active: true,
    },
    {
      id: '120',
      name: '120 Amazing Race',
      distance_km: 120,
      category_type: 'race',
      is_pair: false,
      price_medal_only: p120s.medal,
      price_medal_jersey: p120s.jersey,
      quota: 100,
      current_enrolled: 34,
      cot_hours: 11,
      wave_start_time: '06:00',
      prologue_required_km: 0,
      mandatory_pitstop_cp: 4,
      tracking_required: true,
      is_active: true,
    },
    {
      id: '150',
      name: '150 Grand Fondo',
      distance_km: 150,
      category_type: 'race',
      is_pair: false,
      price_medal_only: p150.medal,
      price_medal_jersey: p150.jersey,
      quota: 75,
      current_enrolled: 29,
      cot_hours: 15,
      wave_start_time: '05:30',
      prologue_required_km: 30,
      mandatory_pitstop_cp: 4,
      tracking_required: true,
      is_active: true,
    },
    {
      id: '200',
      name: '200 Ultra',
      distance_km: 200,
      category_type: 'ultra',
      is_pair: false,
      price_medal_only: p200.medal,
      price_medal_jersey: p200.jersey,
      quota: 50,
      current_enrolled: 21,
      cot_hours: 17,
      wave_start_time: '05:30',
      prologue_required_km: 30,
      mandatory_pitstop_cp: 4,
      tracking_required: true,
      is_active: true,
    },
    {
      id: 'VIRTUAL',
      name: 'Virtual Ride (19 Chapters)',
      distance_km: 0,
      category_type: 'virtual',
      is_pair: false,
      price_medal_only: pVirt.medal,
      price_medal_jersey: pVirt.jersey,
      quota: 1000,
      current_enrolled: 142,
      cot_hours: null,
      wave_start_time: 'Fleksibel',
      prologue_required_km: 0,
      mandatory_pitstop_cp: null,
      tracking_required: true,
      is_active: true,
    },
  ];

  return { race120Single, race120Pair, officialCategories };
}

export function getCategoryVisual(catId: string, t: (id: string, eng: string) => string): CategoryVisual {
  switch (catId) {
    case '70':
    case '60':
      return {
        image: '/categories/cat_60_funride.jpg?v=landscape_2026',
        headline: '70 FUN GRAVEL',
        subtitle: t('REKREASI & PEMULA · 69,9 KM · JONGGOL', 'RECREATIONAL & BEGINNER · 69.9 KM · JONGGOL'),
        elevation: '+778 M GAIN',
        badge: t('FUN GRAVEL · REKREASI', 'FUN GRAVEL · RECREATION'),
        terrain: t('UNPAVED 8.16 KM · PATH 2.61 KM · OFF-GRID 2.24 KM', '8.16 KM UNPAVED · 2.61 KM PATH · 2.24 KM OFF-GRID'),
        callToAction: t('GAS PETUALANGAN PERDANA!', 'START FIRST ADVENTURE!'),
      };
    case '100':
      return {
        image: '/categories/cat_100_fondo.jpg?v=landscape_2026',
        headline: '100 FONDO',
        subtitle: t('101 KM · 3 TANJAKAN UTAMA · MAKADAM SODONG', '101 KM · 3 MAIN CLIMBS · SODONG MACADAM'),
        elevation: '+1,070 M GAIN',
        badge: t('FONDO · EKSPLORASI', 'FONDO · EXPLORATION'),
        terrain: t('PATH 3.02 KM & OFF-GRID 5.11 KM · PERSAWAHAN SODONG', '3.02 KM PATH & 5.11 KM OFF-GRID · SODONG RICE FIELDS'),
        callToAction: t('PACU NYALIMU!', 'IGNITE YOUR COURAGE!'),
      };
    case '120':
      return {
        image: '/categories/cat_120_race.jpg?v=landscape_2026',
        headline: '120 AMAZING RACE',
        subtitle: t('OFFICIAL RACE · 7 TANJAKAN · PODIUM TOP 3', 'OFFICIAL RACE · 7 CLIMBS · TOP 3 PODIUM'),
        elevation: '+1,760 M GAIN',
        badge: t('OFFICIAL RACE · PODIUM TOP 3', 'OFFICIAL RACE · TOP 3 PODIUM'),
        terrain: t('UNPAVED 16.5 KM · OFF-GRID 3.77 KM · JONGGOL RIDGE', 'UNPAVED 16.5 KM · OFF-GRID 3.77 KM · JONGGOL RIDGE'),
        callToAction: t('REBUT PODIUM JUARA!', 'CLAIM YOUR PODIUM!'),
      };
    case '120_SINGLE':
      return {
        image: '/categories/cat_120_race.jpg?v=landscape_2026',
        headline: '120 RACE SINGLE',
        subtitle: t('OFFICIAL RACE · INDIVIDU / SENDIRI (1 RIDER)', 'OFFICIAL RACE · SOLO / INDIVIDUAL (1 RIDER)'),
        elevation: '+1,760 M GAIN',
        badge: t('OFFICIAL RACE · PODIUM INDIVIDU', 'OFFICIAL RACE · INDIVIDUAL PODIUM'),
        terrain: t('UNPAVED 16.5 KM · OFF-GRID 3.77 KM · JONGGOL RIDGE', 'UNPAVED 16.5 KM · OFF-GRID 3.77 KM · JONGGOL RIDGE'),
        callToAction: t('REBUT PODIUM SENDIRI!', 'CLAIM YOUR PODIUM!'),
      };
    case '120_PAIR':
      return {
        image: '/categories/cat_120_race.jpg?v=landscape_2026',
        headline: '120 RACE PAIR MIX',
        subtitle: t('OFFICIAL RACE · TANDEM TIM (2 RIDERS)', 'OFFICIAL RACE · TANDEM TEAM (2 RIDERS)'),
        elevation: '+1,760 M GAIN',
        badge: t('OFFICIAL RACE · PODIUM PAIR MIX', 'OFFICIAL RACE · PAIR MIX PODIUM'),
        terrain: t('UNPAVED 16.5 KM · OFF-GRID 3.77 KM · JONGGOL RIDGE', 'UNPAVED 16.5 KM · OFF-GRID 3.77 KM · JONGGOL RIDGE'),
        callToAction: t('KOMPAK REBUT PODIUM BERDUA!', 'CLAIM PODIUM TOGETHER!'),
      };
    case '150':
      return {
        image: '/categories/cat_150_grandfondo.jpg?v=landscape_2026',
        headline: '150 GRAND FONDO',
        subtitle: t('120 KM UTAMA + 30 KM PROLOG MANDIRI', '120 KM MAIN COURSE + 30 KM PROLOGUE'),
        elevation: '+1,760 M GAIN',
        badge: t('GRAND FONDO · PROLOG 30K', 'GRAND FONDO · 30K PROLOGUE'),
        terrain: t('RUTE UTAMA 120 KM (+1.760 M) + PROLOG 30 KM', '120 KM MAIN ROUTE (+1,760 M) + 30 KM PROLOGUE'),
        callToAction: t('TEMBUS BATAS 150 KM!', 'BREAK THE 150K LIMIT!'),
        prologueNote: t(
          'Total 150 km terdiri dari rute utama 120 km (+1.760 m elevasi) ditambah 30 km prolog yang dirancang & diselesaikan mandiri oleh peserta sebelum start.',
          'Total 150 km consists of 120 km main course (+1,760 m elevation) plus 30 km self-designed prologue completed before wave start.'
        ),
      };
    case '200':
      return {
        image: '/categories/cat_200_ultra.jpg?v=landscape_2026',
        headline: '200 ULTRA',
        subtitle: t('170 KM UTAMA + 30 KM PROLOG MANDIRI · COT 17 JAM', '170 KM MAIN + 30 KM PROLOGUE · 17-HOUR COT'),
        elevation: '+2,530 M GAIN',
        badge: t('ULTRA CHALLENGE · PROLOG 30K', 'ULTRA CHALLENGE · 30K PROLOGUE'),
        terrain: t('8 TANJAKAN (MAX 1.110 M MDPL) · DAYLIGHT RIDGE & NIGHT NAV', '8 CLIMBS (MAX 1,110 M MDPL) · DAYLIGHT RIDGE & NIGHT NAV'),
        callToAction: t('JADI LEGENDA 200 KM!', 'BECOME A 200K LEGEND!'),
        prologueNote: t(
          'Rute resmi 170 km (+2.530 m elevasi, titik tertinggi 1.110 m MDPL). Peserta wajib menyelesaikan Prolog 30 km mandiri (Total 200 km). Batas Waktu (COT) Resmi: 17 Jam dari start.',
          'Official course is 170 km (+2,530 m elevation, peak 1,110 m MDPL). Mandatory 30 km self-prologue (Total 200 km). Official Cut-Off Time: 17 Hours from wave start.'
        ),
      };
    case 'VIRTUAL':
      return {
        image: '/categories/cat_virtual_ride.jpg?v=landscape_2026',
        headline: 'VIRTUAL RIDE',
        subtitle: t('19 REGIONAL CHAPTERS · SE-INDONESIA', '19 REGIONAL CHAPTERS · NATIONWIDE'),
        elevation: t('RUTE DOMISILI', 'LOCAL ROUTE'),
        badge: t('VIRTUAL · STRAVA GPS', 'VIRTUAL · STRAVA GPS'),
        terrain: t('OUTDOOR DI KOTA DOMISILI ANDA', 'OUTDOOR IN YOUR LOCAL CITY'),
        callToAction: t('KIBARKAN SEMANGAT KOTAMU!', 'IGNITE YOUR CITY SPIRIT!'),
        prologueNote: t(
          'Khusus cyclist di luar Jabodetabek (19 Chapter GX-ID). Rekam aktivitas via Strava/Garmin, medali finisher resmi dan jersey dikirim langsung ke rumah via DHS Logistik.',
          'Dedicated to cyclists outside Jabodetabek across 19 GX-ID chapters. Track via Strava/Garmin; finisher medals and jerseys shipped directly to your door via DHS Logistics.'
        ),
      };
    default:
      return {
        image: '/categories/cat_60_funride.jpg',
        headline: catId,
        subtitle: t('TANTANGAN RESMI · GRINDURANCE 2026', 'OFFICIAL CHALLENGE · GRINDURANCE 2026'),
        elevation: '+1,760 M GAIN',
        badge: t('OFFICIAL CHALLENGE', 'OFFICIAL CHALLENGE'),
        terrain: t('GRAVEL & ASPAL', 'GRAVEL & ASPHALT'),
        callToAction: t('PILIH KATEGORI INI', 'SELECT THIS CATEGORY'),
      };
  }
}

export function getCategoryDetail(id: string): CategoryData {
  const match = CATEGORIES.find(c => c.id === id);
  if (match) return match;
  if (id === '120_SINGLE' || id === '120_PAIR') return CATEGORIES.find(c => c.id === '120') || CATEGORIES[2];
  return CATEGORIES[2];
}

export const PROMO_REGISTRY: Record<string, { discount: number; label: string }> = {
  'GRIND2026': { discount: 50000, label: 'Official Launch Privilege' },
  'GXID2026': { discount: 50000, label: 'GX-ID Community Partner' },
  'GRAVELID': { discount: 75000, label: 'Gravel Enthusiast Reward' },
  'EARLYBIRD': { discount: 50000, label: 'Early Bird Privilege' },
  'KOMUNITAS': { discount: 40000, label: 'Komunitas Sepeda Nasional' },
  'SPECIALPAIR': { discount: 100000, label: 'Duo Tandem Team Privilege' },
};
