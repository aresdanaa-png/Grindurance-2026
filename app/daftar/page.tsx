'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Category, PackageType, JerseySize, Gender, Order, Participant, RegistrationPayload } from '@/lib/types';
import BibCard from '@/components/BibCard';
import InvoiceCockpit from '@/components/payment/InvoiceCockpit';
import IndonesiaAddressSelect from '@/components/IndonesiaAddressSelect';
import { useLanguage } from '@/lib/context/LanguageContext';
import { 
  CATEGORIES, 
  CategoryData, 
  GPX_FILE_MAP, 
  GPX_DISPLAY_INFO 
} from '@/lib/data/categories';
import ElevationProfile from '@/components/ElevationProfile';

// Dynamically import RouteMap without SSR
const RouteMap = dynamic(() => import('@/components/RouteMap'), { ssr: false });

// 6 PILIHAN RESMI KATEGORI GRINDURANCE 2026 (120 KM RACE MERUPAKAN 1 KATEGORI DENGAN OPSI SINGLE/PAIR DI DALAMNYA)
const RACE_120_SINGLE_CONFIG: Category = {
  id: '120_SINGLE',
  name: '120 (Race) Single',
  distance_km: 120,
  category_type: 'race',
  is_pair: false,
  price_medal_only: 400000,
  price_medal_jersey: 450000,
  quota: 100,
  current_enrolled: 34,
  cot_hours: 11,
  wave_start_time: '06:00',
  prologue_required_km: 0,
  mandatory_pitstop_cp: 4,
  tracking_required: true,
  is_active: true,
};

const RACE_120_PAIR_CONFIG: Category = {
  id: '120_PAIR',
  name: '120 (Race) Pair Mix',
  distance_km: 120,
  category_type: 'race',
  is_pair: true,
  price_medal_only: 700000,
  price_medal_jersey: 750000,
  quota: 30,
  current_enrolled: 12,
  cot_hours: 11,
  wave_start_time: '06:00',
  prologue_required_km: 0,
  mandatory_pitstop_cp: 4,
  tracking_required: true,
  is_active: true,
};

const OFFICIAL_CATEGORIES: Category[] = [
  {
    id: '60',
    name: '70 Fun Gravel Ride',
    distance_km: 70,
    category_type: 'fun',
    is_pair: false,
    price_medal_only: 250000,
    price_medal_jersey: 300000,
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
    price_medal_only: 300000,
    price_medal_jersey: 350000,
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
    price_medal_only: 400000,
    price_medal_jersey: 450000,
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
    price_medal_only: 400000,
    price_medal_jersey: 450000,
    quota: 75,
    current_enrolled: 29,
    cot_hours: 15,
    wave_start_time: '05:30',
    prologue_required_km: 30, // Route 120/150 sama bedanya yg 150 Prolog 30 km
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
    price_medal_only: 400000,
    price_medal_jersey: 450000,
    quota: 50,
    current_enrolled: 21,
    cot_hours: 19,
    wave_start_time: '05:30',
    prologue_required_km: 30, // Route 200 hanya disiapkan 170 km yg 30 km Prolog
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
    price_medal_only: 200000,
    price_medal_jersey: 250000,
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

// Visual Poster & Kata Ajakan Spesifik per 6 Kategori Resmi
export interface CategoryVisual {
  image: string;
  headline: string;
  subtitle: string;
  elevation: string;
  badge: string;
  terrain: string;
  callToAction: string;
  prologueNote?: string;
}

function getCategoryVisual(catId: string, t: (id: string, eng: string) => string): CategoryVisual {
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

const JERSEY_SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

// Helper untuk mengambil data briefing teknis
function getCategoryDetail(id: string): CategoryData {
  const match = CATEGORIES.find(c => c.id === id);
  if (match) return match;
  if (id === '120_SINGLE' || id === '120_PAIR') return CATEGORIES.find(c => c.id === '120') || CATEGORIES[2];
  return CATEGORIES[2];
}

export default function RegistrationPage() {
  const { language, t } = useLanguage();
  
  // Step state: 'select' (Pilih Gambar) -> 'detail' (Peta Besar & Briefing) -> 'form' (Isi Form) -> 'invoice' (Tagihan)
  const [currentStep, setCurrentStep] = useState<'select' | 'detail' | 'form' | 'invoice'>('select');
  
  const [categories, setCategories] = useState<Category[]>(OFFICIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<Category>(RACE_120_SINGLE_CONFIG); // Default 120 Single
  const [packageType, setPackageType] = useState<PackageType>('MEDAL_JERSEY');
  const [rpcMethod, setRpcMethod] = useState<'PICKUP' | 'HANDLING'>('PICKUP');

  // Pair Active Tab
  const [pairActiveTab, setPairActiveTab] = useState<'rider1' | 'rider2'>('rider1');

  // Input Rider 1
  const [rider1, setRider1] = useState({
    full_name: '',
    nik: '',
    gender: 'male' as Gender,
    birth_date: '',
    religion: 'Islam',
    email: '',
    phone_number: '',
    address_detail: '',
    province_id: '',
    province_name: '',
    regency_id: '',
    regency_name: '',
    district_id: '',
    district_name: '',
    village_id: '',
    village_name: '',
    postal_code: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    blood_type: 'O',
    medical_notes: '',
    community_chapter: 'GX-ID Jabodetabek',
    jersey_size: 'L' as JerseySize,
  });

  // Input Rider 2 (Jika Pair)
  const [rider2, setRider2] = useState({
    full_name: '',
    nik: '',
    gender: 'female' as Gender,
    birth_date: '',
    religion: 'Islam',
    email: '',
    phone_number: '',
    address_detail: '',
    province_id: '',
    province_name: '',
    regency_id: '',
    regency_name: '',
    district_id: '',
    district_name: '',
    village_id: '',
    village_name: '',
    postal_code: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    blood_type: 'B',
    medical_notes: '',
    community_chapter: 'GX-ID Jabodetabek',
    jersey_size: 'M' as JerseySize,
  });

  // Waiver & Submission
  const [waiverAgreed, setWaiverAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Order Result
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [createdParticipants, setCreatedParticipants] = useState<Participant[]>([]);
  const [simulatingPayment, setSimulatingPayment] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentMethodTab, setPaymentMethodTab] = useState<'qris' | 'bank'>('qris');

  // Promo Code State
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [promoFeedback, setPromoFeedback] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: '',
  });

  const PROMO_REGISTRY: Record<string, { discount: number; label: string }> = {
    'GRIND2026': { discount: 50000, label: 'Official Launch Privilege' },
    'GXID2026': { discount: 50000, label: 'GX-ID Community Partner' },
    'GRAVELID': { discount: 75000, label: 'Gravel Enthusiast Reward' },
    'EARLYBIRD': { discount: 50000, label: 'Early Bird Privilege' },
    'KOMUNITAS': { discount: 40000, label: 'Komunitas Sepeda Nasional' },
    'SPECIALPAIR': { discount: 100000, label: 'Duo Tandem Team Privilege' },
  };

  const handleApplyPromo = () => {
    const clean = promoCodeInput.trim().toUpperCase();
    if (!clean) {
      setPromoFeedback({
        status: 'error',
        message: t('Silakan masukkan kode promo.', 'Please enter a promo code.'),
      });
      return;
    }

    const match = PROMO_REGISTRY[clean];
    if (match) {
      if (clean === 'SPECIALPAIR' && !selectedCategory.is_pair) {
        setPromoFeedback({
          status: 'error',
          message: t('Voucher SPECIALPAIR hanya berlaku untuk kategori Pair / Tandem.', 'SPECIALPAIR voucher is only valid for Pair category.'),
        });
        return;
      }
      setAppliedPromo({
        code: clean,
        discount: match.discount,
        label: match.label,
      });
      setPromoFeedback({
        status: 'success',
        message: t(`Kode promo ${clean} aktif! Hemat ${formatRupiah(match.discount)}.`, `Promo code ${clean} applied! Saved ${formatRupiah(match.discount)}.`),
      });
    } else {
      setPromoFeedback({
        status: 'error',
        message: t('Kode promo tidak valid atau kuota telah habis.', 'Invalid promo code or voucher expired.'),
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoFeedback({ status: 'idle', message: '' });
  };

  // Ambil data live dari Supabase (filter hanya kategori aktif dan cocokkan ke official list)
  useEffect(() => {
    // Baca parameter kategori dari URL jika diarahkan dari halaman kategori / homepage (cth: /daftar?category=120_PAIR)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        const p = catParam.toLowerCase();
        if (p === '120_pair') {
          setSelectedCategory(RACE_120_PAIR_CONFIG);
          setCurrentStep('detail');
        } else if (p === '120' || p === '120_single') {
          setSelectedCategory(RACE_120_SINGLE_CONFIG);
          setCurrentStep('detail');
        } else {
          const found = OFFICIAL_CATEGORIES.find(c => c.id.toLowerCase() === p || (p === '70' && c.id === '60') || (p === '60' && c.id === '70'));
          if (found) {
            setSelectedCategory(found);
            setCurrentStep('detail');
          }
        }
      }

      const stepParam = params.get('step') || params.get('preview');
      if (stepParam === 'invoice' || stepParam === 'payment' || params.get('demo') === '1' || params.get('demo') === 'true') {
        const demoOrder: Order = {
          id: 'demo-order-uuid-8829',
          order_id: 'GX-2026-DEMO-8829',
          category_id: '120_SINGLE',
          package_type: 'MEDAL_JERSEY',
          gross_amount: 450000,
          discount_meal_coupon: 50000,
          discount_promo: 50000,
          promo_code: 'GXID2026',
          net_amount: 350000,
          payment_status: 'PENDING',
          created_at: new Date().toISOString(),
        };
        const demoParticipant: Participant = {
          id: 'demo-part-uuid-1',
          order_id: 'demo-order-uuid-8829',
          registration_code: 'GX26-DEMO-1201',
          bib_number: 1201,
          rider_role: 'SINGLE',
          full_name: 'ADITYA PRATAMA',
          gender: 'male',
          birth_date: '1995-04-12',
          email: 'aditya.pratama@grindurance.id',
          phone_number: '081234567890',
          emergency_contact_name: 'Budi Santoso',
          emergency_contact_phone: '081298765432',
          blood_type: 'O+',
          community_chapter: 'GX-ID Jabodetabek',
          category_id: '120_SINGLE',
          jersey_size: 'L',
          has_meal_coupon: true,
          status: 'REGISTERED',
          prologue_status: 'NOT_REQUIRED',
          qr_checkin_hash: 'GXID-1201-DEMO-2026',
          created_at: new Date().toISOString(),
        };
        setSelectedCategory(RACE_120_SINGLE_CONFIG);
        setCreatedOrder(demoOrder);
        setCreatedParticipants([demoParticipant]);
        setCurrentStep('invoice');
      }
    }

    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          const matched = OFFICIAL_CATEGORIES.map(off => {
            const live = data.categories.find((c: Category) => c.id === off.id || (off.id === '120' && c.id === '120_SINGLE'));
            return live ? {
              ...off,
              current_enrolled: live.current_enrolled,
              quota: live.quota,
              price_medal_only: live.price_medal_only || off.price_medal_only,
              price_medal_jersey: live.price_medal_jersey || off.price_medal_jersey,
            } : off;
          });
          setCategories(matched);
        }
      } catch (err) {
        console.error('Menggunakan data kategori default resmi:', err);
      }
    }
    fetchCategories();
  }, []);

  const getAge = (birthDateString: string) => {
    if (!birthDateString) return 25;
    const today = new Date();
    const birth = new Date(birthDateString);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const isEligibleForMealCoupon = () => {
    if (!selectedCategory) return false;
    const r1Eligible = rider1.gender === 'female' || (Boolean(rider1.birth_date) && getAge(rider1.birth_date) < 17);
    if (!selectedCategory.is_pair) {
      return r1Eligible;
    } else {
      const r2Eligible = rider2.gender === 'female' || (Boolean(rider2.birth_date) && getAge(rider2.birth_date) < 17);
      return r1Eligible || r2Eligible;
    }
  };

  const basePrice = selectedCategory
    ? packageType === 'MEDAL_JERSEY'
      ? selectedCategory.price_medal_jersey
      : selectedCategory.price_medal_only
    : 0;

  const rpcHandlingFee = (rpcMethod === 'HANDLING' && selectedCategory?.id !== 'VIRTUAL') ? 20000 : 0;
  const promoDiscount = appliedPromo ? appliedPromo.discount : 0;
  // KUPON MAKAN RP 50.000 BUKAN PENGURANGAN JUMLAH TOTALAN (BENTUK VOUCHER PASCA-BAYAR)
  const hasMealCouponPerk = isEligibleForMealCoupon();
  const netPrice = Math.max(0, basePrice + rpcHandlingFee - promoDiscount);

  // Navigasi Step 1 -> Step 2
  const handleSelectToDetail = (cat: Category) => {
    if (cat.id === '120') {
      setSelectedCategory(RACE_120_SINGLE_CONFIG);
    } else {
      setSelectedCategory(cat);
    }
    setCurrentStep('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigasi Step 2 -> Step 3
  const handleProceedToForm = () => {
    setCurrentStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Final (Step 3 -> Step 4)
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!rider1.full_name || !rider1.nik || !rider1.email || !rider1.phone_number || !rider1.emergency_contact_phone) {
      setErrorMessage(t('MOHON LENGKAPI SELURUH DATA WAJIB RIDER 1 (TERMASUK NIK DAN KONTAK DARURAT).', 'PLEASE COMPLETE ALL REQUIRED FIELDS FOR RIDER 1 (INCLUDING ID & EMERGENCY CONTACT).'));
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }
    if (rider1.nik.trim().length !== 16) {
      setErrorMessage(t('NOMOR NIK RIDER 1 WAJIB 16 DIGIT SESUAI KTP.', 'RIDER 1 ID NUMBER MUST BE EXACTLY 16 DIGITS.'));
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }
    if (!rider1.province_id || !rider1.regency_id || !rider1.district_id || !rider1.address_detail) {
      setErrorMessage(t('MOHON LENGKAPI ALAMAT DOMISILI RIDER 1.', 'PLEASE COMPLETE RESIDENTIAL ADDRESS FOR RIDER 1.'));
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    if (selectedCategory.is_pair) {
      if (!rider2.full_name || !rider2.nik || !rider2.email || !rider2.phone_number || !rider2.emergency_contact_phone) {
        setErrorMessage(t('MOHON LENGKAPI SELURUH DATA WAJIB RIDER 2 (PARTNER).', 'PLEASE COMPLETE ALL REQUIRED FIELDS FOR RIDER 2 (PARTNER).'));
        window.scrollTo({ top: 250, behavior: 'smooth' });
        return;
      }
      if (rider2.nik.trim().length !== 16) {
        setErrorMessage(t('NOMOR NIK RIDER 2 WAJIB 16 DIGIT SESUAI KTP.', 'RIDER 2 ID NUMBER MUST BE EXACTLY 16 DIGITS.'));
        window.scrollTo({ top: 250, behavior: 'smooth' });
        return;
      }
      if (!rider2.province_id || !rider2.regency_id || !rider2.district_id || !rider2.address_detail) {
        setErrorMessage(t('MOHON LENGKAPI ALAMAT DOMISILI RIDER 2.', 'PLEASE COMPLETE RESIDENTIAL ADDRESS FOR RIDER 2.'));
        window.scrollTo({ top: 250, behavior: 'smooth' });
        return;
      }
    }

    if (!waiverAgreed) {
      setErrorMessage(t('ANDA WAJIB MENYETUJUI SURAT PERNYATAAN KESELAMATAN (WAIVER) SEBELUM MELANJUTKAN.', 'YOU MUST AGREE TO THE SAFETY WAIVER BEFORE PROCEEDING.'));
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    try {
      const payload: RegistrationPayload = {
        category_id: selectedCategory.id,
        package_type: packageType,
        rpc_method: rpcMethod,
        promo_code: appliedPromo?.code,
        rider_1: rider1,
        rider_2: selectedCategory.is_pair ? rider2 : undefined,
        waiver_agreed: waiverAgreed,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || t('Gagal memproses pendaftaran.', 'Failed to process registration.'));
      }

      setCreatedOrder(result.order);
      setCreatedParticipants(result.participants);
      setCurrentStep('invoice');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || t('Terjadi kesalahan sistem saat menghubungi server.', 'A system error occurred while contacting the server.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!createdOrder) return;
    setSimulatingPayment(true);
    try {
      const res = await fetch('/api/payment/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: createdOrder.order_id }),
      });
      const data = await res.json();
      if (data.success) {
        setCreatedOrder(data.order);
        setCreatedParticipants(data.participants);
      }
    } catch (err) {
      console.error('Gagal simulasi pembayaran:', err);
    } finally {
      setSimulatingPayment(false);
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const detailCategoryData = getCategoryDetail(selectedCategory.id);
  const detailVisual = getCategoryVisual(selectedCategory.id, t);

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Dynamic Cinematic Video Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/perjalanan-siklis-di-jalur-oranye.webp"
          className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15] saturate-[1.1] scale-105"
        >
          <source src="/cta-background.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Vignette & Ambient Overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(10,11,14,0.45) 0%, rgba(10,11,14,0.85) 60%, #0A0B0E 100%)'
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0A0B0E] via-[#0A0B0E]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/90 to-transparent" />

        {/* Ambient Brand Orange Glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[650px] opacity-25"
          style={{
            background: 'radial-gradient(circle at 50% 10%, rgba(250,109,11,0.3) 0%, transparent 65%)'
          }}
        />

        {/* Subtle Horizontal Telemetry Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100%_48px]"
          aria-hidden="true" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">


        {/* ========================================================================= */}
        {/* STEP 1: PILIH KATEGORI (6 KATEGORI RESMI GRINDURANCE 2026) */}
        {/* ========================================================================= */}
        {currentStep === 'select' && (
          <div className="space-y-10 animate-slide-up-fade">
            
            {/* Header Telemetri & Title - Graphic Asset "OFFICIAL CATEGORY" */}
            <div className="border-b border-white/10 pb-6 sm:pb-8 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-widest block">
                  GX-ID OFFICIAL SPEC SHEET · 2026 EDITION
                </span>
                
                {/* Semantic H1 for SEO */}
                <h1 className="sr-only">
                  Official Categories — {t('Pilih Kategori Lintasan Grindurance 2026', 'Choose Grindurance 2026 Course Category')}
                </h1>

                {/* Gambar Teks Official Categories */}
                <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[620px] group">
                  <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.35)_0%,transparent_70%)] blur-2xl opacity-80 pointer-events-none animate-pulse-slow" />
                  <img
                    src="/text official categories.webp"
                    alt="Official Categories"
                    className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 hover:scale-[1.01]"
                  />
                </div>
              </div>

              <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 max-w-xl">
                <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed font-sans">
                  {t(
                    '5 kategori etape off-road koridor Jonggol–Sukamakmur dan 1 format Virtual Ride 19 Chapter se-Indonesia. Klik kategori untuk memeriksa peta satelit, profil kontur elevasi, dan regulasi resmi.',
                    '5 off-road stage categories along the Jonggol–Sukamakmur corridor and 1 Virtual Ride across 19 nationwide chapters. Click any category to review satellite maps, elevation profiles, and official regulations.'
                  )}
                </p>
              </div>
            </div>

            {/* Grid 6 Kategori Bergaya Editorial Gravel Monolith (3 Baris, Tiap Baris 2 Kategori) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
              {categories.map((cat, idx) => {
                const visual = getCategoryVisual(cat.id, t);

                return (
                  <div
                    key={cat.id}
                    onClick={() => handleSelectToDetail(cat)}
                    style={{
                      animationDelay: `${idx * 90}ms`,
                      animationFillMode: 'forwards',
                    }}
                    className="opacity-0 animate-slide-up-fade relative aspect-square sm:aspect-square md:aspect-square lg:aspect-auto lg:h-[460px] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 group cursor-pointer flex flex-col justify-between select-none shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(250,109,11,0.3)] p-3 sm:p-5"
                  >
                    {/* Background Hero Photography */}
                    <Image
                      src={visual.image}
                      alt={cat.name}
                      fill
                      className="object-cover object-center filter brightness-[0.8] group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 ease-out"
                      priority
                    />

                    {/* Dark Vignette Overlay for Crisp Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/40 to-[#0A0B0E]/50 z-10 pointer-events-none group-hover:via-[#0A0B0E]/30 transition-colors duration-500" />

                    {/* Shimmer Sweep on Hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20">
                      <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out" />
                    </div>

                    {/* 1. TOP HUD: Category Tag & Telemetry (Clean Minimalist Line) */}
                    <div className="relative z-20 flex items-center justify-between gap-2 font-mono">
                      <span className="font-bold text-[#FA6D0B] uppercase tracking-wider text-[9px] sm:text-xs">
                        {cat.id === '120' || cat.id === '120_SINGLE' || cat.id === '120_PAIR'
                          ? '120 KM RACE'
                          : cat.id === '200' 
                          ? '200 KM ULTRA' 
                          : cat.id === '150' 
                          ? '150 KM GRAND FONDO' 
                          : cat.id === '100' 
                          ? '100 KM FONDO' 
                          : cat.id === 'VIRTUAL' 
                          ? 'VIRTUAL RIDE' 
                          : '70 KM FUN GRAVEL'}
                      </span>
                      <span className="text-[8px] sm:text-[10px] text-slate-300 font-medium tracking-wide">
                        {visual.elevation}
                      </span>
                    </div>

                    {/* 2. CENTER: Bold Stage Headline */}
                    <div className="relative z-20 my-auto py-2">
                      <h2 className="font-display italic text-base sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-md leading-tight group-hover:text-[#FA6D0B] transition-colors duration-300">
                        {visual.headline}
                      </h2>
                      <p className="font-mono text-[8px] sm:text-xs text-slate-300 uppercase tracking-wider mt-0.5 line-clamp-1">
                        {visual.subtitle.split('·')[0]}
                      </p>
                    </div>

                    {/* 3. BOTTOM: Price & Action Arrow (Single Clean Flush Line) */}
                    <div className="relative z-20 flex items-end justify-between font-mono pt-1">
                      <div>
                        <span className="text-[7.5px] sm:text-[9.5px] text-slate-400 uppercase tracking-widest block leading-none mb-0.5">
                          {t('MULAI DARI', 'STARTING FROM')}
                        </span>
                        <span className="font-display italic text-sm sm:text-xl font-black text-white leading-none">
                          {formatRupiah(cat.price_medal_only)}
                        </span>
                      </div>

                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#FA6D0B] text-black flex items-center justify-center shadow-[0_0_15px_rgba(250,109,11,0.4)] group-hover:scale-110 group-hover:bg-[#DE5A00] transition-all shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: DETAIL KATEGORI (ATHLETIC COCKPIT: PETA, ELEVASI, TELEMETRI & ATURAN) */}
        {/* ========================================================================= */}
        {currentStep === 'detail' && (
          <div className="space-y-6 animate-slide-up-fade">
            
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep('select');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-[#FA6D0B] transition-colors cursor-pointer"
              >
                {t('← KEMBALI · PILIH KATEGORI LAIN', '← BACK · CHOOSE ANOTHER CATEGORY')}
              </button>

              <div className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest font-bold">
                {t('TAHAP 02 / 03 · RACE BRIEFING & ELEVATION MATRIX', 'STEP 02 / 03 · RACE BRIEFING & ELEVATION MATRIX')}
              </div>
            </div>

            {selectedCategory.id === 'VIRTUAL' ? (
              /* VIRTUAL RIDE DASHBOARD: 19 CHAPTERS & STRAVA PROTOCOL */
              <div className="space-y-6">
                
                {/* Top Summary Card */}
                <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-1">
                        {detailVisual.badge}
                      </span>
                      <h1 className="font-display italic text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-none">
                        {selectedCategory.name}
                      </h1>
                    </div>
                  </div>

                  {/* 4-Metric Telemetry Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/10 py-4 border-b border-white/10">
                    <div className="space-y-1 sm:pr-4">
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider block">{t('JARAK', 'DISTANCE')}</span>
                      <div className="font-display font-black text-white italic text-2xl sm:text-3xl leading-none">
                        {t('BEBAS', 'FLEXIBLE')}
                      </div>
                      <span className="text-xs font-mono text-slate-300 block">{t('Rute Kota Domisili', 'Local City Route')}</span>
                    </div>

                    <div className="space-y-1 sm:px-4">
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider block">TOTAL ELEV</span>
                      <div className="font-display font-black text-[#FA6D0B] italic text-2xl sm:text-3xl leading-none">
                        {t('MANDIRI', 'LOCAL')}
                      </div>
                      <span className="text-xs font-mono text-slate-300 block">{t('Kontur Domisili', 'Local Elevation')}</span>
                    </div>

                    <div className="space-y-1 sm:px-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider block">WAVE START</span>
                      <div className="font-display font-black text-white italic text-2xl sm:text-3xl leading-none">
                        {t('MANDIRI', 'SELF-START')}
                      </div>
                      <span className="text-xs font-mono text-slate-300 block">{t('Race Window 24 Jam', '24h Race Window')}</span>
                    </div>

                    <div className="space-y-1 sm:pl-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider block">{t('BATAS WAKTU (COT)', 'CUT OFF TIME (COT)')}</span>
                      <div className="font-display font-black text-white italic text-2xl sm:text-3xl leading-none">
                        {t('FLEKSIBEL', 'FLEXIBLE')}
                      </div>
                      <span className="text-xs font-mono text-slate-300 block">{t('Sinkronisasi GPS', 'GPS Synchronization')}</span>
                    </div>
                  </div>

                  {/* Narrative */}
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                      {t('KARAKTERISTIK ETAPE ·', 'STAGE CHARACTERISTICS ·')}
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed">
                      {language === 'ENG' && detailCategoryData.descEng ? detailCategoryData.descEng : detailCategoryData.desc}
                    </p>
                  </div>

                  {/* Logistics Note */}
                  {detailVisual.prologueNote && (
                    <div className="p-3.5 rounded-xl bg-[#FA6D0B]/10 font-mono text-xs space-y-1 shadow-md">
                      <span className="font-bold text-[#FA6D0B] uppercase tracking-wider block">
                        {t('PROTOKOL LOGISTIK & STRAVA VIRTUAL RIDE', 'LOGISTICS & STRAVA PROTOCOL')}
                      </span>
                      <p className="text-slate-300 font-sans text-xs leading-relaxed">{detailVisual.prologueNote}</p>
                    </div>
                  )}
                </div>

                {/* 19 Chapters Network Banner */}
                <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest font-bold block">
                        GX-ID NATIONAL NETWORK · 19 REGIONAL CHAPTERS
                      </span>
                      <h3 className="font-display italic text-xl sm:text-2xl font-black uppercase text-white mt-0.5">
                        {t('JARINGAN GOWES SERENTAK SE-INDONESIA', 'NATIONWIDE SIMULTANEOUS RIDE NETWORK')}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      COMMUNITY TIKUM
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {t(
                      'Khusus bagi 80.000+ anggota komunitas GX-ID dan pesepeda di luar Jabodetabek. Anda dapat memilih rute outdoor favorit di kota domisili Anda, merekam aktivitas menggunakan GPS cycling computer (Garmin / Wahoo / Strava / Komoot), dan medali cor logam resmi serta jersey finisher akan dikirimkan langsung ke alamat Anda via DHS Logistik.',
                      'Dedicated to 80,000+ GX-ID community members and cyclists outside Jabodetabek. Ride your favorite outdoor route locally, record via GPS computer (Garmin / Wahoo / Strava / Komoot), and official die-cast metal medals and finisher jerseys will be delivered directly via DHS Logistics.'
                    )}
                  </p>

                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      {t('CHAPTER REGIONAL TERDAFTAR (TIKUM RESMI):', 'REGISTERED REGIONAL CHAPTERS (OFFICIAL MEETPOINTS):')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Bandung', 'Surabaya', 'Medan', 'Bali', 'Yogyakarta',
                        'Makassar', 'Semarang', 'Solo', 'Jabodetabek', 'Palembang',
                        'Balikpapan', 'Malang', 'Banjarmasin', 'Padang', 'Batam',
                        'Lampung', 'Manado', 'Samarinda', 'Papua'
                      ].map((chapter) => (
                        <span
                          key={chapter}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.06] text-[11px] font-mono text-slate-300 font-bold hover:bg-[#FA6D0B]/20 hover:text-[#FA6D0B] transition-colors shadow-sm"
                        >
                          GX-ID {chapter}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4-Step Virtual Protocol Cards */}
                <div className="space-y-3">
                  <div className="font-mono text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                    {t('ALUR 4 TAHAP KELULUSAN VIRTUAL RIDE ·', '4-STAGE VIRTUAL RIDE COMPLETION PROTOCOL ·')}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                      <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">{t('TAHAP 01', 'STAGE 01')}</div>
                      <div className="text-sm font-black text-white font-mono uppercase">{t('REGISTRASI & BIB', 'REGISTRATION & BIB')}</div>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {t('Pilih paket medali / jersey, isi identitas dan alamat domisili untuk pengiriman logistik, lalu selesaikan pembayaran.', 'Select medal / jersey package, enter identity and shipping address for logistics, then complete payment.')}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                      <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">{t('TAHAP 02', 'STAGE 02')}</div>
                      <div className="text-sm font-black text-white font-mono uppercase">{t('GOWES OUTDOOR', 'OUTDOOR RIDE')}</div>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {t('Gowes di rute kota Anda pada periode race window. Wajib outdoor (dilarang indoor roller) dengan GPS tracking aktif.', 'Ride in your local city during the race window. Must be outdoors (no indoor trainers) with active GPS tracking.')}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                      <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">{t('TAHAP 03', 'STAGE 03')}</div>
                      <div className="text-sm font-black text-white font-mono uppercase">{t('STRAVA SYNC', 'STRAVA SYNC')}</div>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {t('Sinkronkan URL aktivitas Strava atau file GPX. Server otomatis Grindurance memverifikasi validitas data rekaman.', 'Sync Strava activity URL or GPX file. Grindurance automated server verifies activity data validity.')}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                      <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">{t('TAHAP 04', 'STAGE 04')}</div>
                      <div className="text-sm font-black text-white font-mono uppercase">{t('MEDALI DIKIRIM', 'MEDAL DISPATCH')}</div>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {t('Setelah status FINISHER terverifikasi, medali cor logam resmi dan jersey eksklusif dikirim via DHS Logistik ke rumah.', 'Once FINISHER status is verified, official die-cast medal and exclusive jersey are shipped directly to your home via DHS Logistics.')}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* ON-SITE CATEGORIES: EXPANSIVE HERO ROUTE MAP & FULL-WIDTH ELEVATION PROFILE */
              <div className="space-y-6">
                
                {/* 1. Category Hero Title Header & Quota Info */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-1">
                        {detailVisual.badge}
                      </span>
                      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-white italic tracking-tight leading-none drop-shadow-sm flex flex-wrap items-baseline gap-x-3">
                        <span>{language === 'ENG' && detailCategoryData.titleEng ? detailCategoryData.titleEng : detailCategoryData.title}</span>
                        {detailCategoryData.titleNote && (
                          <span className="text-xs sm:text-sm lg:text-base font-mono font-bold text-slate-400 not-italic uppercase tracking-wider inline-block">
                            {detailCategoryData.titleNote}
                          </span>
                        )}
                      </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start sm:self-auto">
                      <div className="font-mono text-xs sm:text-sm text-slate-300">
                        {t('KUOTA:', 'QUOTA:')} <strong className="text-white font-bold">{selectedCategory.quota - selectedCategory.current_enrolled} {t('SLOT', 'SLOTS')}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={handleProceedToForm}
                        className="px-5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] hover:bg-[#DE5A00] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <span>{t('LANJUT DAFTAR', 'REGISTER NOW')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Race Format Toggle: Single vs Pair */}
                  {(selectedCategory.id === '120' || selectedCategory.id === '120_SINGLE' || selectedCategory.id === '120_PAIR') && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                          {t('PILIHAN FORMAT // 120 KM RACE', '120 KM RACE // FORMAT SELECTION')}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
                          {t(
                            'Pilih bertanding secara individu (Sendiri / 1 Pax) atau tim berpasangan (Pair Mix / 2 Pax). Biaya dan formulir otomatis disesuaikan.',
                            'Choose to race individually (Solo / 1 Pax) or tandem team (Pair Mix / 2 Pax). Fees and form fields automatically adjust.'
                          )}
                        </p>
                      </div>
                      <div className="inline-flex rounded-xl bg-black/80 p-1.5 shrink-0 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(RACE_120_SINGLE_CONFIG)}
                          className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                            !selectedCategory.is_pair
                              ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] font-black'
                              : 'text-slate-400 hover:text-white font-bold hover:bg-white/[0.05]'
                          }`}
                        >
                          {t('SENDIRI // 1 RIDER', 'SINGLE // 1 RIDER')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(RACE_120_PAIR_CONFIG)}
                          className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                            selectedCategory.is_pair
                              ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] font-black'
                              : 'text-slate-400 hover:text-white font-bold hover:bg-white/[0.05]'
                          }`}
                        >
                          {t('PAIR MIX // 2 PAX', 'PAIR MIX // 2 PAX')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Prologue Protocol Note if applicable */}
                  {detailVisual.prologueNote && (
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FA6D0B]/10 font-mono text-xs space-y-1 shadow-md">
                      <span className="font-bold text-[#FA6D0B] uppercase tracking-wider block">
                        {t('PROTOKOL WAJIB PROLOG 30 KM', 'MANDATORY 30 KM PROLOGUE PROTOCOL')}
                      </span>
                      <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">{detailVisual.prologueNote}</p>
                    </div>
                  )}

                  {/* 2. OPEN TELEMETRY BAR (4 METRICS FULL WIDTH) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/10 py-5 px-5 sm:px-6 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] font-mono">
                    {/* Jarak */}
                    <div className="space-y-1 sm:pr-4">
                      <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">{t('JARAK TEMPUH', 'TOTAL DISTANCE')}</span>
                      <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                        <span className="font-display font-black text-white italic leading-none text-2xl sm:text-3xl xl:text-4xl">
                          {detailCategoryData.km.split(' ')[0]}
                        </span>
                        {detailCategoryData.km.split(' ')[1] && (
                          <span className="text-sm font-bold text-slate-300 uppercase not-italic">
                            {detailCategoryData.km.split(' ')[1]}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 truncate">
                        {selectedCategory.id === '150' 
                          ? t('120K + 30K Prolog', '120K + 30K Prologue') 
                          : selectedCategory.id === '200' 
                          ? t('170K + 30K Prolog', '170K + 30K Prologue') 
                          : t('Rute Penuh', 'Full Route')}
                      </div>
                    </div>

                    {/* Total Elev */}
                    <div className="space-y-1 sm:px-4">
                      <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">{t('TOTAL ELEVASI', 'TOTAL ELEVATION')}</span>
                      <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                        <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-[#FA6D0B] italic leading-none">
                          {detailCategoryData.elevation.split(' ')[0]}
                        </span>
                        {detailCategoryData.elevation.split(' ')[1] && (
                          <span className="text-sm font-bold text-[#FA6D0B]/80 uppercase not-italic">
                            {detailCategoryData.elevation.split(' ')[1]}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 truncate">
                        Max Alt: {detailCategoryData.maxAlt}
                      </div>
                    </div>

                    {/* Wave Start */}
                    <div className="space-y-1 sm:px-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                      <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">WAVE START</span>
                      <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                        <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                          {selectedCategory.wave_start_time || detailCategoryData.wave.split(' ')[0]}
                        </span>
                        <span className="text-sm font-bold text-slate-300 uppercase not-italic">
                          WIB
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 truncate">
                        {t('Start Serentak', 'Simultaneous Wave')}
                      </div>
                    </div>

                    {/* Batas Waktu COT */}
                    <div className="space-y-1 sm:pl-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                      <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">{t('BATAS WAKTU (COT)', 'CUT OFF TIME (COT)')}</span>
                      <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                        <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                          {selectedCategory.cot_hours || detailCategoryData.cot.split(' ')[0]}
                        </span>
                        <span className="text-sm font-bold text-slate-300 uppercase not-italic">
                          {t('JAM', 'HRS')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 truncate">
                        {t('Penutupan Jalur', 'Course Closure')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. THE BIG ROUTE MAP (FULL WIDTH & EXPANSIVE HEIGHT) */}
                <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[660px] xl:h-[720px] rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col">
                  
                  {/* Map Header Bar */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 px-4 sm:px-6 py-3 shrink-0 bg-black/60 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <h2 className="font-display text-base sm:text-xl font-black uppercase text-white italic tracking-wider leading-none">
                        {detailCategoryData.km} {t('PETA RUTE VECTOR HUD RESMI · GPX LIVE', 'OFFICIAL VECTOR HUD ROUTE MAP · GPX LIVE')}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      <span>{t('KORIDOR JONGGOL–SUKAMAKMUR', 'JONGGOL–SUKAMAKMUR CORRIDOR')}</span>
                      <span>·</span>
                      <span className="text-[#FA6D0B] font-bold">{t('LINE RADAR', 'LINE RADAR')}</span>
                    </div>
                  </div>

                  {/* Leaflet GPX Live Map Container */}
                  <div className="relative z-10 flex-1 w-full min-h-0">
                    <RouteMap
                      gpxFile={GPX_FILE_MAP[selectedCategory.id] ?? null}
                      categoryKm={detailCategoryData.km}
                      categoryId={detailCategoryData.id}
                      gpxTotalKm={GPX_DISPLAY_INFO[detailCategoryData.id]?.gpxKm ?? ''}
                      prologKm={GPX_DISPLAY_INFO[detailCategoryData.id]?.prologKm ?? 0}
                      gpxFileName={GPX_DISPLAY_INFO[detailCategoryData.id]?.fileName ?? ''}
                      accentColor="#FA6D0B"
                    />
                  </div>
                </div>

                {/* 4. THE BIG ELEVATION PROFILE (FULL WIDTH INTERACTIVE CONTOUR) */}
                <div className="w-full">
                  <ElevationProfile
                    category={detailCategoryData}
                    accentColor="#FA6D0B"
                  />
                </div>

                {/* 5. 2-COLUMN GRID: STAGE SPECS, SURFACE BREAKDOWN & SPECIAL REGULATIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
                  
                  {/* Left Column: Karakteristik Etape & Komposisi Medan */}
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-5 flex flex-col justify-between">
                    
                    {/* Narasi Karakteristik Etape */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                        {t('KARAKTERISTIK ETAPE ·', 'STAGE CHARACTERISTICS ·')}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium leading-relaxed">
                        {language === 'ENG' && detailCategoryData.descEng ? detailCategoryData.descEng : detailCategoryData.desc}
                      </p>
                    </div>

                    {/* Surface Breakdown */}
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#FA6D0B] uppercase tracking-wider font-bold">{t('KOMPOSISI MEDAN ·', 'SURFACE BREAKDOWN ·')}</span>
                        <span className="text-slate-300">
                          <span className="text-slate-300 font-bold">{detailCategoryData.surfaceBreakdown.asphalt}</span> {t('Aspal', 'Asphalt')} ·{' '}
                          <span className="text-[#FA6D0B] font-bold">{detailCategoryData.surfaceBreakdown.gravel}</span> {t('Makadam', 'Gravel')} ·{' '}
                          <span className="text-slate-400 font-bold">{detailCategoryData.surfaceBreakdown.unpaved}</span> {t('Tanah/Batu', 'Dirt/Rocky')}
                        </span>
                      </div>
                      
                      {/* Segmented Progress Bar */}
                      <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden flex">
                        <div style={{ width: detailCategoryData.surfaceBreakdown.asphalt }} className="h-full bg-slate-300 transition-all duration-700 ease-out" title="Aspal" />
                        <div style={{ width: detailCategoryData.surfaceBreakdown.gravel }} className="h-full bg-[#FA6D0B] transition-all duration-700 ease-out" title="Makadam" />
                        <div style={{ width: detailCategoryData.surfaceBreakdown.unpaved }} className="h-full bg-white/40 transition-all duration-700 ease-out" title="Tanah/Batu" />
                      </div>

                      <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                        <span>{t('Tanjakan Rata-rata:', 'Avg Gradient:')} <strong className="text-white">{detailCategoryData.avgGradient}</strong></span>
                        <span>{t('Tanjakan Maksimum:', 'Max Gradient:')} <strong className="text-[#FA6D0B]">{detailCategoryData.maxGradient}</strong></span>
                        <span>{t('Rekomendasi Ban:', 'Tire Spec:')} <strong className="text-white">{detailCategoryData.gearTip}</strong></span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Regulasi & Aturan Teknis */}
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 flex flex-col justify-between">
                    
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                        {t('REGULASI & ATURAN TEKNIS ·', 'TECHNICAL RULES & REGULATIONS ·')}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-black/50 space-y-1 font-mono shadow-inner">
                          <strong className="text-white block uppercase text-[10px] tracking-wider">{t('FORMAT KOMPETISI:', 'COMPETITION FORMAT:')}</strong>
                          <p className="text-slate-300 font-sans text-xs leading-relaxed">{language === 'ENG' && detailCategoryData.formatEng ? detailCategoryData.formatEng : detailCategoryData.format}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-black/50 space-y-1 font-mono shadow-inner">
                          <strong className="text-[#FA6D0B] block uppercase text-[10px] tracking-wider">{t('GEAR WAJIB & ATURAN TEKNIS:', 'MANDATORY GEAR & RULES:')}</strong>
                          <p className="text-slate-300 font-sans text-xs leading-relaxed">{language === 'ENG' && detailCategoryData.specialRulesEng ? detailCategoryData.specialRulesEng : detailCategoryData.specialRules}</p>
                        </div>
                      </div>

                      {detailCategoryData.routeHighlights && (
                        <div className="p-3.5 rounded-xl bg-black/50 space-y-1 font-mono text-xs shadow-inner">
                          <strong className="text-white block uppercase text-[10px] tracking-wider">{t('HIGHLIGHT RUTE KORIDOR:', 'CORRIDOR ROUTE HIGHLIGHTS:')}</strong>
                          <p className="text-slate-300 font-sans text-xs leading-relaxed">{detailCategoryData.routeHighlights}</p>
                        </div>
                      )}
                    </div>

                  </div>

                </div>

                {/* 6. MATRIKS POS CHECKPOINT & PITSTOP STATIONS */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2">
                    <span className="text-slate-300 uppercase tracking-wider font-bold">
                      {t('CHECKPOINT & PITSTOP ETAPE ·', 'STAGE CHECKPOINTS & PITSTOPS ·')} {detailCategoryData.km}
                    </span>
                    <span className="text-[10px] text-[#FA6D0B] font-bold uppercase tracking-wider">
                      {selectedCategory.id === '150' || selectedCategory.id === '200' ? t('WAJIB PITSTOP 30 MENIT', 'MANDATORY 30-MIN PITSTOP') : 'SMART GEOFENCING'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                    {detailCategoryData.stations.map((st, idx) => {
                      const isPitstop = st.type === 'PITSTOP';
                      const isKOM = st.type === 'KOM';
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl text-left flex flex-col justify-between backdrop-blur-sm shadow-sm ${
                            isPitstop || isKOM
                              ? 'bg-[#FA6D0B]/20 shadow-[0_4px_20px_rgba(250,109,11,0.2)]'
                              : 'bg-black/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono font-bold text-[#FA6D0B]">{st.km}</span>
                            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                              isPitstop || isKOM ? 'bg-[#FA6D0B] text-black' : 'bg-white/10 text-white'
                            }`}>
                              {st.type}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-white uppercase leading-snug block line-clamp-2">
                            {language === 'ENG' && st.nameEng ? st.nameEng : st.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate mt-1">
                            {language === 'ENG' && st.descEng ? st.descEng : st.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* BOTTOM STICKY ACTION BANNER: TOMBOL DAFTAR DI PALING BAWAH */}
            <div className="p-5 sm:p-6 rounded-2xl bg-black/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  {t('SIAP UNTUK TANTANGAN INI?', 'READY FOR THIS CHALLENGE?')}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white italic mt-0.5">
                  {t('AMBIL BAGIAN DI', 'PARTICIPATE IN')} {selectedCategory.name}
                </h3>
                <div className="font-mono text-xs text-slate-300 mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>{t('Biaya Tiket:', 'Entry Fee:')} <strong className="text-[#FA6D0B] font-bold">{formatRupiah(selectedCategory.price_medal_only)}</strong></span>
                  <span>·</span>
                  <span>{t('Sisa Kuota:', 'Remaining Quota:')} <strong className="text-white font-bold">{selectedCategory.quota - selectedCategory.current_enrolled} {t('Slot', 'Slots')}</strong></span>
                  <span>·</span>
                  <span className="text-slate-400">{t('TERBUKA · KUOTA TERBATAS', 'OPEN · LIMITED SLOTS')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep('select');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/[0.04] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-white/40 transition-all cursor-pointer"
                >
                  {t('← KEMBALI', '← BACK')}
                </button>

                <button
                  type="button"
                  onClick={handleProceedToForm}
                  className="relative overflow-hidden px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_35px_rgba(250,109,11,0.65)] hover:bg-[#DE5A00] transition-all flex items-center justify-center gap-2 group cursor-pointer hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />
                  <span className="relative z-10">{t('DAFTAR KATEGORI INI SEKARANG', 'REGISTER THIS CATEGORY NOW')}</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* STEP 3: FORMULIR PENDAFTARAN ATLET & WAIVER (EDITORIAL ATHLETIC EXPEDITION) */}
        {/* ========================================================================= */}
        {currentStep === 'form' && (
          <div className="space-y-8 animate-slide-up-fade w-full max-w-7xl mx-auto">
            
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep('detail');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-[#FA6D0B] transition-colors cursor-pointer"
              >
                {t('← KEMBALI // DETAIL KATEGORI', '← BACK // CATEGORY DETAILS')}
              </button>

              <div className="text-xs sm:text-sm font-mono text-[#FA6D0B] uppercase tracking-widest font-bold">
                {t('TAHAP 03 / 03 // FORMULIR REGISTRASI ATLET', 'STAGE 03 / 03 // ATHLETE REGISTRATION FORM')}
              </div>
            </div>

            {/* Selected Category Cockpit Strip */}
            <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
                  {selectedCategory.is_pair 
                    ? t('KATEGORI TERPILIH · PAIR MIX (2 PESERTA)', 'SELECTED CATEGORY · PAIR MIX (2 RIDERS)') 
                    : (selectedCategory.id === '120_SINGLE' 
                        ? t('KATEGORI TERPILIH · INDIVIDU (1 PESERTA)', 'SELECTED CATEGORY · SOLO (1 RIDER)') 
                        : t('KATEGORI TERPILIH · PESERTA TUNGGAL', 'SELECTED CATEGORY · SOLO RIDER'))}
                </div>
                
                <h2 className="font-display italic text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none drop-shadow-sm">
                  {selectedCategory.name}
                </h2>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-base font-mono text-slate-300 pt-1">
                  <span>{t('Jarak:', 'Distance:')} <strong className="text-white font-black">{selectedCategory.id === 'VIRTUAL' ? t('Bebas (Rute Domisili)', 'Flexible (Local Course)') : `${selectedCategory.distance_km} KM`}</strong></span>
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('Format:', 'Format:')} <strong className="text-white font-black">{selectedCategory.is_pair ? t('Tandem Tim (2 Riders)', 'Pair Tandem (2 Riders)') : selectedCategory.id === '120_SINGLE' ? t('Individu / Sendiri (1 Rider)', 'Individual Solo (1 Rider)') : selectedCategory.id === 'VIRTUAL' ? t('Virtual Ride (19 Chapters)', 'Virtual Ride (19 Chapters)') : t('Solo Rider', 'Solo Rider')}</strong></span>
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('COT:', 'COT:')} <strong className="text-white font-black">{selectedCategory.cot_hours ? `${selectedCategory.cot_hours} ${t('Jam', 'Hours')}` : t('Fleksibel', 'Flexible')}</strong></span>
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('Flag-off:', 'Flag-off:')} <strong className="text-[#FA6D0B] font-black">{selectedCategory.wave_start_time || '05:30'} WIB</strong></span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep('select');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 sm:px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.04] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:border-[#FA6D0B] hover:bg-[#FA6D0B]/10 transition-all cursor-pointer self-start lg:self-center shrink-0"
              >
                {t('GANTI KATEGORI', 'CHANGE CATEGORY')}
              </button>
            </div>

            {/* Race Format Toggle: Single vs Pair */}
            {(selectedCategory.id === '120' || selectedCategory.id === '120_SINGLE' || selectedCategory.id === '120_PAIR') && (
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                    {t('PILIHAN FORMAT // 120 KM RACE', '120 KM RACE // FORMAT SELECTION')}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
                    {t(
                      'Pilih bertanding secara individu (Sendiri / 1 Pax) atau tim berpasangan (Pair Mix / 2 Pax). Biaya dan kolom pendaftaran otomatis disesuaikan.',
                      'Choose to race individually (Solo / 1 Pax) or tandem team (Pair Mix / 2 Pax). Fees and registration fields automatically adjust.'
                    )}
                  </p>
                </div>
                <div className="inline-flex rounded-xl bg-black/80 p-1.5 shrink-0 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(RACE_120_SINGLE_CONFIG)}
                    className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                      !selectedCategory.is_pair
                        ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] font-black'
                        : 'text-slate-400 hover:text-white font-bold hover:bg-white/[0.05]'
                    }`}
                  >
                    {t('SENDIRI // 1 RIDER', 'SINGLE // 1 RIDER')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(RACE_120_PAIR_CONFIG)}
                    className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                      selectedCategory.is_pair
                        ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] font-black'
                        : 'text-slate-400 hover:text-white font-bold hover:bg-white/[0.05]'
                    }`}
                  >
                    {t('PAIR MIX // 2 PAX', 'PAIR MIX // 2 PAX')}
                  </button>
                </div>
              </div>
            )}

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-4 sm:p-5 rounded-2xl bg-black/90 text-white font-mono text-xs sm:text-sm flex items-center justify-between gap-3 animate-shake shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#FA6D0B] uppercase tracking-wider">{t('PERINGATAN DATA //', 'DATA ALERT //')}</span>
                  <span>{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage('')}
                  className="text-white hover:text-white uppercase font-bold text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20 shrink-0 cursor-pointer shadow-sm transition-colors"
                >
                  {t('TUTUP', 'CLOSE')}
                </button>
              </div>
            )}

            {/* Formulir Pendaftaran */}
            <form onSubmit={handleFinalSubmit} className="space-y-8">

              {/* ========================================================================= */}
              {/* 3.1 PILIHAN PAKET ATLET (DUAL PACKAGE COMPARISON · 1:1 RACE PACK SECTION) */}
              {/* ========================================================================= */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                      {t('PILIHAN PAKET ATLET // 2026 EDITION', 'ATHLETE PACKAGE OPTIONS // 2026 EDITION')}
                    </span>
                    <h3 className="font-display italic text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
                      {t('PILIH PAKET FINISHER RESMI', 'SELECT OFFICIAL FINISHER PACKAGE')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {/* Tier 1: Medal Only */}
                  <div
                    onClick={() => setPackageType('MEDAL_ONLY')}
                    className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl ${
                      packageType === 'MEDAL_ONLY'
                        ? 'bg-black/80 ring-2 ring-[#FA6D0B] shadow-[0_0_45px_rgba(250,109,11,0.25)]'
                        : 'bg-black/40 hover:bg-black/60'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider">
                          {selectedCategory.is_pair ? t('PAKET 2 RIDER · ESENSIAL', '2 RIDERS PACKAGE · ESSENTIAL') : t('PAKET 1 RIDER · ESENSIAL', '1 RIDER PACKAGE · ESSENTIAL')}
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider">
                          {t('TARIF DASAR', 'BASE RATE')}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                          {selectedCategory.is_pair ? t('PAKET MEDAL ONLY (2 RIDERS)', 'MEDAL ONLY PACKAGE (2 RIDERS)') : t('PAKET MEDAL ONLY', 'MEDAL ONLY PACKAGE')}
                        </h4>
                        <div className="font-display italic text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">
                          {formatRupiah(selectedCategory.price_medal_only)}
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 mt-2.5 font-sans leading-relaxed">
                          {selectedCategory.is_pair
                            ? t('Fasilitas esensial untuk 2 atlet tim tandem: medali cor finisher resmi hari-H (tanpa jersey finisher).', 'Essential perks for both team riders: official die-cast medals on race day (without finisher jerseys).')
                            : t('Pilihan tepat bagi pesepeda yang fokus pada esensi jarak, tantangan mandiri, dan koleksi medali resmi finisher.', 'The ideal choice for cyclists focusing on pure distance, self-supported challenge, and official finisher medal.')}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 space-y-3 text-sm sm:text-base text-white font-sans font-medium">
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{selectedCategory.is_pair ? t('2x Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)', '2x Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)') : 'Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)'}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{t('Nomor Plat Sepeda Tahan Air #1000+ & QR Check-in', 'Waterproof Bike Number Plate #1000+ & QR Check-in')}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{t('Asuransi Kecelakaan Resmi 1 Hari Event', 'Official 1-Day Event Accident Insurance')}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{t('Nutrisi NDR Energy Gel + Isotonic Drink', 'NDR Energy Gel Nutrition + Isotonic Drink')}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{t('Akses Finisher Lounge & Voucher Pemulihan ABEEY Coffee', 'Finisher Lounge Access & ABEEY Coffee Recovery Voucher')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono">
                      <span className="text-slate-300 font-medium uppercase tracking-wider">{t('TARIF RESMI DASAR', 'OFFICIAL BASE RATE')}</span>
                      <span className={`font-bold uppercase tracking-wider ${packageType === 'MEDAL_ONLY' ? 'text-[#FA6D0B]' : 'text-slate-300'}`}>
                        {packageType === 'MEDAL_ONLY' ? t('✓ PAKET TERPILIH', '✓ SELECTED PACKAGE') : t('KLIK UNTUK MEMILIH', 'CLICK TO SELECT')}
                      </span>
                    </div>
                  </div>

                  {/* Tier 2: Medal & Jersey */}
                  <div
                    onClick={() => setPackageType('MEDAL_JERSEY')}
                    className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl ${
                      packageType === 'MEDAL_JERSEY'
                        ? 'bg-black/80 ring-2 ring-[#FA6D0B] shadow-[0_0_45px_rgba(250,109,11,0.25)]'
                        : 'bg-black/40 hover:bg-black/60'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                        <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                          {selectedCategory.is_pair ? t('PAKET 2 RIDER · LENGKAP', '2 RIDERS PACKAGE · COMPLETE') : t('PAKET 1 RIDER · LENGKAP', '1 RIDER PACKAGE · COMPLETE')}
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                          {selectedCategory.is_pair ? t('+RP 50.000 (TOTAL TIM)', '+IDR 50K (TOTAL TEAM)') : t('+RP 50.000 / PAX', '+IDR 50K / PAX')}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                          {selectedCategory.is_pair ? t('PAKET MEDAL & JERSEY RESMI (2 RIDERS)', 'OFFICIAL MEDAL & JERSEY PACKAGE (2 RIDERS)') : t('PAKET MEDAL & JERSEY RESMI', 'OFFICIAL MEDAL & JERSEY PACKAGE')}
                        </h4>
                        <div className="font-display italic text-3xl sm:text-4xl lg:text-5xl font-black text-[#FA6D0B] mt-2">
                          {formatRupiah(selectedCategory.price_medal_jersey)}
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 mt-2.5 font-sans leading-relaxed">
                          {selectedCategory.is_pair
                            ? t('Paket terfavorit tim tandem. Seluruh fasilitas Medal Only ditambah 2 Official Anniversary Aero Jersey buatan Pollride untuk Kapten & Partner.', 'Top-favorite team package. All Medal Only perks plus 2 Official Anniversary Aero Jerseys by Pollride for Captain & Partner.')
                            : t('Paket lengkap terfavorit. Mendapatkan seluruh fasilitas Paket Medal Only ditambah Official Anniversary Aero Jersey buatan Pollride.', 'Top-favorite complete package. Includes all Medal Only perks plus the Official Anniversary Aero Jersey by Pollride.')}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 space-y-3 text-sm sm:text-base text-white font-sans font-medium">
                        <div className="flex items-start gap-2.5 font-bold text-white">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{selectedCategory.is_pair ? t('2x Official Anniversary Aero Jersey by Pollride (Senilai Rp 700.000)', '2x Official Anniversary Aero Jersey by Pollride (IDR 700K Value)') : t('Official Anniversary Aero Jersey by Pollride (Senilai Rp 350.000)', 'Official Anniversary Aero Jersey by Pollride (IDR 350K Value)')}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{selectedCategory.is_pair ? t('2x Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)', '2x Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)') : 'Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)'}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{t('Nomor Plat Sepeda Tahan Air #1000+ & QR Check-in', 'Waterproof Bike Number Plate #1000+ & QR Check-in')}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{t('Asuransi Kecelakaan Resmi 1 Hari Event', 'Official 1-Day Event Accident Insurance')}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#FA6D0B] font-mono font-bold text-sm shrink-0 select-none mt-0.5">//</span>
                          <span>{t('Nutrisi NDR Energy Gel + Isotonic + Voucher ABEEY Coffee', 'NDR Energy Gel Nutrition + Isotonic + ABEEY Coffee Voucher')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono">
                      <span className="text-slate-300 font-medium uppercase tracking-wider">{t('SUBSIDI KOMUNITAS GX-ID', 'GX-ID COMMUNITY SUBSIDY')}</span>
                      <span className={`font-bold uppercase tracking-wider ${packageType === 'MEDAL_JERSEY' ? 'text-[#FA6D0B]' : 'text-slate-300'}`}>
                        {packageType === 'MEDAL_JERSEY' ? t('✓ PAKET TERPILIH', '✓ SELECTED PACKAGE') : t('KLIK UNTUK MEMILIH', 'CLICK TO SELECT')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* 3.2 LOGISTIK RACE PACK & KODE PROMO (2-COLUMN TELEMETRY STRIP) */}
              {/* ========================================================================= */}
              <div className="rounded-2xl bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 p-6 sm:p-8 gap-6 lg:gap-0">
                  
                  {/* Column 1: Logistik & Pengambilan Race Pack */}
                  <div className="flex flex-col justify-between lg:pr-8 space-y-5">
                    <div className="space-y-2.5">
                      <div>
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                          {selectedCategory.id === 'VIRTUAL' ? t('METODE PENGIRIMAN // VIRTUAL RIDE', 'SHIPPING METHOD // VIRTUAL RIDE') : t('PENGAMBILAN RACE PACK (RPC) // LOGISTIK', 'RACE PACK COLLECTION (RPC) // LOGISTICS')}
                        </span>
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-none">
                        {selectedCategory.id === 'VIRTUAL' ? t('PENGIRIMAN DHS LOGISTIK KE RUMAH', 'DHS HOME DELIVERY') : t('OPSI PENGAMBILAN PERLENGKAPAN', 'RACE PACK COLLECTION OPTIONS')}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                        {selectedCategory.id === 'VIRTUAL'
                          ? t('Medali cor logam resmi dan jersey akan dikirim via kurir DHS Logistik langsung ke alamat domisili Anda setelah verifikasi data Strava selesai. Bebas biaya handling.', 'Official medal and jersey delivered directly via DHS Logistics after Strava validation is complete. Free of handling charges.')
                          : t('Pilih cara Anda menerima perlengkapan hari-H (nomor plat sepeda tahan air, chip timing, jersey Pollride & nutrisi balap).', 'Choose how you receive your official race pack (waterproof bike number plate, timing chip, Pollride jersey & race nutrition).')}
                      </p>
                    </div>

                    {selectedCategory.id !== 'VIRTUAL' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                        {/* Opsi 1: Ambil Mandiri */}
                        <button
                          type="button"
                          onClick={() => setRpcMethod('PICKUP')}
                          className={`p-4 sm:p-5 rounded-xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg ${
                            rpcMethod === 'PICKUP'
                              ? 'bg-black/80 ring-2 ring-[#FA6D0B] shadow-[0_0_25px_rgba(250,109,11,0.25)]'
                              : 'bg-black/40 hover:bg-black/60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                                {t('RPC DAY RESMI', 'OFFICIAL RPC DAY')}
                              </span>
                              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                                {t('GRATIS (RP 0)', 'FREE (IDR 0)')}
                              </span>
                            </div>
                            <div className="text-sm sm:text-base font-black text-white uppercase font-sans">
                              {t('AMBIL DI CIBUBUR', 'PICK UP AT CIBUBUR')}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 mt-2 font-sans leading-relaxed">
                            {t('ABEEY Coffee & LRT Harjamukti Cibubur (Minggu, 6 Des 2026, 10:00–17:00 WIB).', 'ABEEY Coffee & LRT Harjamukti Cibubur (Sunday, Dec 6, 2026, 10:00–17:00 WIB).')}
                          </p>
                        </button>

                        {/* Opsi 2: Handling Fee */}
                        <button
                          type="button"
                          onClick={() => setRpcMethod('HANDLING')}
                          className={`p-4 sm:p-5 rounded-xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg ${
                            rpcMethod === 'HANDLING'
                              ? 'bg-black/80 ring-2 ring-[#FA6D0B] shadow-[0_0_25px_rgba(250,109,11,0.25)]'
                              : 'bg-black/40 hover:bg-black/60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                                {t('EKSPEDISI LOGISTIK', 'LOGISTICS EXPEDITION')}
                              </span>
                              <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase">
                                +Rp 20.000
                              </span>
                            </div>
                            <div className="text-sm sm:text-base font-black text-white uppercase font-sans">
                              {t('HANDLING & KIRIM RUMAH', 'HANDLING & HOME DELIVERY')}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 mt-2 font-sans leading-relaxed">
                            {t('Paket race pack dikirim aman langsung ke alamat rumah Anda sebelum hari-H event.', 'Race pack safely shipped directly to your home address prior to race day.')}
                          </p>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Column 2: Kode Promo / Voucher Komunitas */}
                  <div className="flex flex-col justify-between lg:pl-8 space-y-5 pt-6 lg:pt-0">
                    <div className="space-y-2.5">
                      <div>
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                          {t('KODE PROMO // VOUCHER KOMUNITAS', 'PROMO CODE // COMMUNITY VOUCHER')}
                        </span>
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-none">
                        {t('VOUCHER RESMI KOMUNITAS', 'OFFICIAL COMMUNITY VOUCHER')}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                        {t('Masukkan kode voucher resmi komunitas GX-ID atau early bird untuk memotong nominal registrasi secara otomatis.', 'Enter official GX-ID community voucher code or early bird code for instant automated deduction.')}
                      </p>
                    </div>

                    {!appliedPromo ? (
                      <div className="space-y-3.5 pt-2">
                        <div className="flex gap-2.5">
                          <input
                            type="text"
                            value={promoCodeInput}
                            onChange={(e) => {
                              setPromoCodeInput(e.target.value.toUpperCase());
                              if (promoFeedback.message) setPromoFeedback({ status: 'idle', message: '' });
                            }}
                            placeholder={t('MASUKKAN KODE PROMO', 'ENTER PROMO CODE')}
                            className="flex-1 px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base uppercase placeholder:text-slate-500 outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            className="px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase tracking-wider bg-[#FA6D0B] text-black hover:bg-orange-400 border border-[#FA6D0B] transition-all cursor-pointer whitespace-nowrap active:scale-95"
                          >
                            {t('TERAPKAN', 'APPLY')}
                          </button>
                        </div>

                        {promoFeedback.message && (
                          <div className={`text-xs sm:text-sm font-mono font-bold leading-relaxed ${promoFeedback.status === 'success' ? 'text-[#FA6D0B]' : 'text-white'}`}>
                            {promoFeedback.message}
                          </div>
                        )}

                        <div className="text-xs font-mono text-slate-400 font-medium">
                          {t('Contoh kode: GRIND2026, GXID2026, GRAVELID, EARLYBIRD, SPECIALPAIR', 'Example codes: GRIND2026, GXID2026, GRAVELID, EARLYBIRD, SPECIALPAIR')}
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl border-l-4 border-l-[#FA6D0B] bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                            {t('KODE PROMO AKTIF // TERVERIFIKASI', 'ACTIVE PROMO CODE // VERIFIED')}
                          </span>
                          <button
                            type="button"
                            onClick={handleRemovePromo}
                            className="text-xs font-mono text-slate-400 hover:text-[#FA6D0B] uppercase font-bold cursor-pointer transition-colors"
                          >
                            {t('HAPUS KODE', 'REMOVE CODE')}
                          </button>
                        </div>
                        <div className="font-mono text-lg font-black text-white tracking-wider">
                          {appliedPromo.code}
                        </div>
                        <div className="text-sm sm:text-base text-[#FA6D0B] font-bold font-mono">
                          - {formatRupiah(appliedPromo.discount)} ({appliedPromo.label})
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* ========================================================================= */}
              {/* 3.3 HAK BENEFIT KUPON MAKAN (PESERTA <17 THN & WANITA) */}
              {/* ========================================================================= */}
              {isEligibleForMealCoupon() && (
                <div className="p-6 sm:p-7 rounded-2xl bg-black/60 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#FA6D0B] uppercase tracking-wider">
                        {t('HAK BENEFIT KHUSUS ATLET //', 'SPECIAL ATHLETE PRIVILEGE //')}
                      </span>
                      <span className="text-white font-bold font-mono text-xs sm:text-sm uppercase">
                        {t('E-VOUCHER KUPON MAKAN RP 50.000', 'IDR 50,000 MEAL COUPON VOUCHER')}
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl">
                      {t(
                        'Peserta berumur di bawah 17 tahun dan wanita berhak menerima E-Voucher Kupon Makan senilai Rp 50.000. Voucher ini otomatis terbit dan siap ditukarkan di venue setelah pendaftaran dan pembayaran selesai (bukan berupa pengurangan total tagihan).',
                        'Participants under 17 years old and female riders are entitled to an official IDR 50,000 Meal Coupon Voucher. This voucher is issued upon completed registration and payment for redemption at the venue (not deducted from invoice total).'
                      )}
                    </p>
                  </div>
                  <div className="font-display italic text-2xl sm:text-3xl font-black text-[#FA6D0B] shrink-0 self-start sm:self-auto px-5 py-3 rounded-xl bg-black/80 shadow-inner">
                    +VOUCHER 50K
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 3.4 TAB SWITCHER UNTUK KATEGORI PAIR (TIM TANDEM) */}
              {/* ========================================================================= */}
              {selectedCategory.is_pair && (
                <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-black/70 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setPairActiveTab('rider1')}
                    className={`py-4 px-6 rounded-xl text-xs sm:text-base font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                      pairActiveTab === 'rider1'
                        ? 'bg-[#FA6D0B] text-black shadow-[0_0_25px_rgba(250,109,11,0.5)]'
                        : 'text-slate-400 hover:text-white bg-transparent'
                    }`}
                  >
                    {t('01 // RIDER 1 (KAPTEN TIM)', '01 // RIDER 1 (TEAM CAPTAIN)')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPairActiveTab('rider2')}
                    className={`py-4 px-6 rounded-xl text-xs sm:text-base font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                      pairActiveTab === 'rider2'
                        ? 'bg-[#FA6D0B] text-black shadow-[0_0_25px_rgba(250,109,11,0.5)]'
                        : 'text-slate-400 hover:text-white bg-transparent'
                    }`}
                  >
                    {t('02 // RIDER 2 (PARTNER TIM)', '02 // RIDER 2 (TEAM PARTNER)')}
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 3.5 IDENTITAS ATLET (RIDER 1 / PESERTA TUNGGAL) */}
              {/* ========================================================================= */}
              {(!selectedCategory.is_pair || pairActiveTab === 'rider1') ? (
                <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-7">
                  <div className="border-b border-white/10 pb-4">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#FA6D0B] uppercase tracking-widest block">
                      {t('IDENTITAS ATLET //', 'ATHLETE IDENTITY //')} {selectedCategory.is_pair ? t('RIDER 1 (KAPTEN TIM)', 'RIDER 1 (TEAM CAPTAIN)') : t('PESERTA RESMI', 'OFFICIAL RIDER')}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                      {t('Lengkapi data identitas resmi sesuai KTP atau Paspor untuk verifikasi asuransi dan nomor start.', 'Complete official identity data as in ID or Passport for insurance and start number verification.')}
                    </p>
                  </div>

                  {/* Bagian 1: Identitas Resmi */}
                  <div className="space-y-4">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
                      {t('1. DATA IDENTITAS RESMI // KTP ATAU PASPOR', '1. OFFICIAL IDENTITY DATA // ID OR PASSPORT')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('NAMA LENGKAP (SESUAI KTP/PASPOR)', 'FULL NAME (AS IN ID/PASSPORT)')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={rider1.full_name}
                          onChange={(e) => setRider1({ ...rider1, full_name: e.target.value })}
                          placeholder={t('Nama Lengkap Atlet', 'Athlete Full Name')}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('NOMOR NIK / PASPOR (16 DIGIT KTP)', 'ID / PASSPORT NUMBER (16 DIGIT ID)')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={16}
                          value={rider1.nik}
                          onChange={(e) => setRider1({ ...rider1, nik: e.target.value.replace(/\D/g, '') })}
                          placeholder="3201012345670001"
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('AGAMA / KEPERCAYAAN', 'RELIGION / BELIEF')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <select
                          value={rider1.religion}
                          onChange={(e) => setRider1({ ...rider1, religion: e.target.value })}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base transition-all outline-none cursor-pointer"
                        >
                          <option value="Islam" className="bg-[#15171C]">Islam</option>
                          <option value="Kristen Protestan" className="bg-[#15171C]">Kristen Protestan</option>
                          <option value="Katolik" className="bg-[#15171C]">Katolik</option>
                          <option value="Hindu" className="bg-[#15171C]">Hindu</option>
                          <option value="Buddha" className="bg-[#15171C]">Buddha</option>
                          <option value="Khonghucu" className="bg-[#15171C]">Khonghucu</option>
                          <option value="Lainnya" className="bg-[#15171C]">{t('Lainnya / Penghayat Kepercayaan', 'Other / Traditional Belief')}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Bagian 2: Data Fisik & Kesiapan Medis */}
                  <div className="space-y-4 pt-5 border-t border-white/10">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
                      {t('2. DATA FISIK & KESIAPAN MEDIS // SAFETY PROTOCOL', '2. PHYSICAL DATA & MEDICAL READINESS // SAFETY PROTOCOL')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('JENIS KELAMIN', 'GENDER')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setRider1({ ...rider1, gender: 'male' })}
                            className={`py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase transition-all cursor-pointer shadow-md ${
                              rider1.gender === 'male'
                                ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
                            }`}
                          >
                            {t('LAKI-LAKI', 'MALE')}
                          </button>
                          <button
                            type="button"
                            onClick={() => setRider1({ ...rider1, gender: 'female' })}
                            className={`py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase transition-all cursor-pointer shadow-md ${
                              rider1.gender === 'female'
                                ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
                            }`}
                          >
                            {t('PEREMPUAN', 'FEMALE')}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('TANGGAL LAHIR', 'DATE OF BIRTH')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={rider1.birth_date}
                          onChange={(e) => setRider1({ ...rider1, birth_date: e.target.value })}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('GOLONGAN DARAH', 'BLOOD TYPE')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <select
                          value={rider1.blood_type}
                          onChange={(e) => setRider1({ ...rider1, blood_type: e.target.value })}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base transition-all outline-none cursor-pointer"
                        >
                          <option value="A" className="bg-[#15171C]">{t('GOLONGAN DARAH A', 'BLOOD TYPE A')}</option>
                          <option value="B" className="bg-[#15171C]">{t('GOLONGAN DARAH B', 'BLOOD TYPE B')}</option>
                          <option value="AB" className="bg-[#15171C]">{t('GOLONGAN DARAH AB', 'BLOOD TYPE AB')}</option>
                          <option value="O" className="bg-[#15171C]">{t('GOLONGAN DARAH O', 'BLOOD TYPE O')}</option>
                          <option value="-" className="bg-[#15171C]">{t('TIDAK TAHU (-)', 'UNKNOWN (-)')}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('ALERGI / MEDIC ALERT', 'ALLERGY / MEDIC ALERT')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="text"
                          value={rider1.medical_notes}
                          onChange={(e) => setRider1({ ...rider1, medical_notes: e.target.value })}
                          placeholder={t('Cth: Asma, Alergi Antibiotik, atau -', 'E.g. Asthma, Penicillin allergy, or -')}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bagian 3: Kontak & Komunikasi Resmi */}
                  <div className="space-y-4 pt-5 border-t border-white/10">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
                      {t('3. KONTAK RESMI & KOMUNIKASI // E-INVOICE & GPX UPDATE', '3. OFFICIAL CONTACT & COMMUNICATION // E-INVOICE & GPX UPDATE')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('EMAIL AKTIF (E-INVOICE & BRIEFING)', 'ACTIVE EMAIL (E-INVOICE & BRIEFING)')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={rider1.email}
                          onChange={(e) => setRider1({ ...rider1, email: e.target.value })}
                          placeholder="nama@email.com"
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('NOMOR WHATSAPP AKTIF (BROADCAST DARURAT)', 'ACTIVE WHATSAPP (EMERGENCY BROADCAST)')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={rider1.phone_number}
                          onChange={(e) => setRider1({ ...rider1, phone_number: e.target.value })}
                          placeholder="081234567890"
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bagian 4: Kontak Darurat */}
                  <div className="space-y-4 pt-5 border-t border-white/10">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
                      {t('4. KONTAK DARURAT (SAFETY PROTOCOL MARSHAL)', '4. EMERGENCY CONTACT (SAFETY PROTOCOL MARSHAL)')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('NAMA KONTAK DARURAT (KELUARGA / KERABAT)', 'EMERGENCY CONTACT NAME (FAMILY / KIN)')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={rider1.emergency_contact_name}
                          onChange={(e) => setRider1({ ...rider1, emergency_contact_name: e.target.value })}
                          placeholder={t('Nama Keluarga / Kerabat', 'Family / Relative Full Name')}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('NOMOR HP KONTAK DARURAT', 'EMERGENCY CONTACT PHONE')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={rider1.emergency_contact_phone}
                          onChange={(e) => setRider1({ ...rider1, emergency_contact_phone: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bagian 5: Jersey Finisher Size (jika Paket MEDAL_JERSEY) */}
                  {packageType === 'MEDAL_JERSEY' && (
                    <div className="space-y-3 pt-5 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                          {t('5. UKURAN JERSEY FINISHER // POLLRIDE AERO FIT', '5. FINISHER JERSEY SIZE // POLLRIDE AERO FIT')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <span className="text-xs font-mono text-[#FA6D0B] uppercase font-bold">POLLRIDE OFFICIAL</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                        {JERSEY_SIZES.map((sz) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setRider1({ ...rider1, jersey_size: sz })}
                            className={`py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black transition-all cursor-pointer shadow-md ${
                              rider1.jersey_size === sz
                                ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                                : 'bg-black/60 text-slate-300 hover:bg-black/80 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bagian 6: Alamat Domisili */}
                  <div className="pt-5 border-t border-white/10">
                    <IndonesiaAddressSelect
                      prefixId="r1"
                      value={{
                        address_detail: rider1.address_detail,
                        province_id: rider1.province_id,
                        province_name: rider1.province_name,
                        regency_id: rider1.regency_id,
                        regency_name: rider1.regency_name,
                        district_id: rider1.district_id,
                        district_name: rider1.district_name,
                        village_id: rider1.village_id,
                        village_name: rider1.village_name,
                        postal_code: rider1.postal_code,
                      }}
                      onChange={(addr) => setRider1({ ...rider1, ...addr })}
                    />
                  </div>
                </div>
              ) : (
                /* ========================================================================= */
                /* 3.6 IDENTITAS ATLET (RIDER 2 · PARTNER TIM TANDEM) */
                /* ========================================================================= */
                <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-7">
                  <div className="border-b border-white/10 pb-4">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#FA6D0B] uppercase tracking-widest block">
                      {t('IDENTITAS ATLET // RIDER 2 (PARTNER TIM TANDEM)', 'ATHLETE IDENTITY // RIDER 2 (TANDEM TEAM PARTNER)')}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                      {t('Lengkapi data resmi partner tim tandem sesuai KTP atau Paspor untuk polis asuransi dan nomor bib kedua.', 'Complete official partner data as in ID or Passport for insurance and second race bib.')}
                    </p>
                  </div>

                  {/* Bagian 1: Identitas Resmi Partner */}
                  <div className="space-y-4">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
                      {t('1. DATA IDENTITAS RESMI PARTNER // KTP ATAU PASPOR', '1. OFFICIAL PARTNER IDENTITY DATA // ID OR PASSPORT')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('NAMA LENGKAP PARTNER (SESUAI KTP/PASPOR)', 'PARTNER FULL NAME (AS IN ID/PASSPORT)')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={rider2.full_name}
                          onChange={(e) => setRider2({ ...rider2, full_name: e.target.value })}
                          placeholder={t('Nama Lengkap Partner', 'Partner Full Name')}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('NIK PARTNER (16 DIGIT KTP)', 'PARTNER ID NUMBER (16 DIGIT ID)')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={16}
                          value={rider2.nik}
                          onChange={(e) => setRider2({ ...rider2, nik: e.target.value.replace(/\D/g, '') })}
                          placeholder="3201012345670002"
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('AGAMA / KEPERCAYAAN PARTNER', 'PARTNER RELIGION / BELIEF')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <select
                          value={rider2.religion}
                          onChange={(e) => setRider2({ ...rider2, religion: e.target.value })}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base transition-all outline-none cursor-pointer"
                        >
                          <option value="Islam" className="bg-[#15171C]">Islam</option>
                          <option value="Kristen Protestan" className="bg-[#15171C]">Kristen Protestan</option>
                          <option value="Katolik" className="bg-[#15171C]">Katolik</option>
                          <option value="Hindu" className="bg-[#15171C]">Hindu</option>
                          <option value="Buddha" className="bg-[#15171C]">Buddha</option>
                          <option value="Khonghucu" className="bg-[#15171C]">Khonghucu</option>
                          <option value="Lainnya" className="bg-[#15171C]">{t('Lainnya / Penghayat Kepercayaan', 'Other / Traditional Belief')}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Bagian 2: Data Fisik & Medis Partner */}
                  <div className="space-y-4 pt-5 border-t border-white/10">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
                      {t('2. DATA FISIK & KESIAPAN MEDIS PARTNER // SAFETY PROTOCOL', '2. PARTNER PHYSICAL DATA & MEDICAL READINESS // SAFETY PROTOCOL')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('JENIS KELAMIN PARTNER', 'PARTNER GENDER')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setRider2({ ...rider2, gender: 'male' })}
                            className={`py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase transition-all cursor-pointer shadow-md ${
                              rider2.gender === 'male'
                                ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
                            }`}
                          >
                            {t('LAKI-LAKI', 'MALE')}
                          </button>
                          <button
                            type="button"
                            onClick={() => setRider2({ ...rider2, gender: 'female' })}
                            className={`py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase transition-all cursor-pointer shadow-md ${
                              rider2.gender === 'female'
                                ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
                            }`}
                          >
                            {t('PEREMPUAN', 'FEMALE')}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('TANGGAL LAHIR', 'DATE OF BIRTH')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={rider2.birth_date}
                          onChange={(e) => setRider2({ ...rider2, birth_date: e.target.value })}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('GOLONGAN DARAH', 'BLOOD TYPE')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <select
                          value={rider2.blood_type}
                          onChange={(e) => setRider2({ ...rider2, blood_type: e.target.value })}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base transition-all outline-none cursor-pointer"
                        >
                          <option value="A" className="bg-[#15171C]">{t('GOLONGAN DARAH A', 'BLOOD TYPE A')}</option>
                          <option value="B" className="bg-[#15171C]">{t('GOLONGAN DARAH B', 'BLOOD TYPE B')}</option>
                          <option value="AB" className="bg-[#15171C]">{t('GOLONGAN DARAH AB', 'BLOOD TYPE AB')}</option>
                          <option value="O" className="bg-[#15171C]">{t('GOLONGAN DARAH O', 'BLOOD TYPE O')}</option>
                          <option value="-" className="bg-[#15171C]">{t('TIDAK TAHU (-)', 'UNKNOWN (-)')}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('ALERGI / MEDIC ALERT', 'ALLERGY / MEDIC ALERT')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="text"
                          value={rider2.medical_notes}
                          onChange={(e) => setRider2({ ...rider2, medical_notes: e.target.value })}
                          placeholder={t('Cth: Asma, Alergi Makanan, atau -', 'E.g. Asthma, Food allergy, or -')}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bagian 3: Kontak Partner */}
                  <div className="space-y-4 pt-5 border-t border-white/10">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
                      {t('3. KONTAK RESMI PARTNER // E-INVOICE & GPX UPDATE', '3. OFFICIAL PARTNER CONTACT // E-INVOICE & GPX UPDATE')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('EMAIL PARTNER', 'PARTNER EMAIL')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={rider2.email}
                          onChange={(e) => setRider2({ ...rider2, email: e.target.value })}
                          placeholder="partner@email.com"
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('WHATSAPP PARTNER', 'PARTNER WHATSAPP')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={rider2.phone_number}
                          onChange={(e) => setRider2({ ...rider2, phone_number: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bagian 4: Kontak Darurat Partner */}
                  <div className="space-y-4 pt-5 border-t border-white/10">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
                      {t('4. KONTAK DARURAT PARTNER (SAFETY PROTOCOL MARSHAL)', '4. PARTNER EMERGENCY CONTACT (SAFETY PROTOCOL MARSHAL)')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('KONTAK DARURAT PARTNER (NAMA)', 'PARTNER EMERGENCY CONTACT NAME')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={rider2.emergency_contact_name}
                          onChange={(e) => setRider2({ ...rider2, emergency_contact_name: e.target.value })}
                          placeholder={t('Nama Kontak Darurat Partner', 'Partner Emergency Contact')}
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {t('NOMOR HP KONTAK DARURAT', 'EMERGENCY CONTACT PHONE')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={rider2.emergency_contact_phone}
                          onChange={(e) => setRider2({ ...rider2, emergency_contact_phone: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 border border-white/20 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bagian 5: Jersey Finisher Size Partner (jika Paket MEDAL_JERSEY) */}
                  {packageType === 'MEDAL_JERSEY' && (
                    <div className="space-y-3 pt-5 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                          {t('5. UKURAN JERSEY FINISHER PARTNER // POLLRIDE AERO FIT', '5. PARTNER FINISHER JERSEY SIZE // POLLRIDE AERO FIT')} <span className="text-[#FA6D0B]">*</span>
                        </label>
                        <span className="text-xs font-mono text-[#FA6D0B] uppercase font-bold">POLLRIDE OFFICIAL</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                        {JERSEY_SIZES.map((sz) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setRider2({ ...rider2, jersey_size: sz })}
                            className={`py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black transition-all cursor-pointer shadow-md ${
                              rider2.jersey_size === sz
                                ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                                : 'bg-black/60 text-slate-300 hover:bg-black/80 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bagian 6: Alamat Domisili Partner */}
                  <div className="pt-5 border-t border-white/10">
                    <IndonesiaAddressSelect
                      prefixId="r2"
                      value={{
                        address_detail: rider2.address_detail,
                        province_id: rider2.province_id,
                        province_name: rider2.province_name,
                        regency_id: rider2.regency_id,
                        regency_name: rider2.regency_name,
                        district_id: rider2.district_id,
                        district_name: rider2.district_name,
                        village_id: rider2.village_id,
                        village_name: rider2.village_name,
                        postal_code: rider2.postal_code,
                      }}
                      onChange={(addr) => setRider2({ ...rider2, ...addr })}
                    />
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 3.7 SURAT PERNYATAAN & PELEPASAN TANGGUNG JAWAB (SAFETY WAIVER) */}
              {/* ========================================================================= */}
              <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-5">
                <div className="border-b border-white/10 pb-3.5">
                  <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider block">
                    {t('SURAT PERNYATAAN & PELEPASAN TANGGUNG JAWAB (WAIVER)', 'SAFETY STATEMENT & LIABILITY WAIVER')}
                  </span>
                </div>

                <div className="p-5 sm:p-6 rounded-xl bg-black/60 text-xs sm:text-sm font-mono text-slate-200 leading-relaxed space-y-3 shadow-sm">
                  <p>
                    {t(
                      '1. Saya menyadari bahwa Gravel Grindurance 2026 adalah tantangan bersepeda mandiri (unsupported) di jalan raya umum dan pedesaan yang tidak steril dari lalu lintas.',
                      '1. I understand that Gravel Grindurance 2026 is an unsupported cycling challenge on public and rural roads that are not closed to general traffic.'
                    )}
                  </p>
                  <p>
                    {t(
                      '2. Saya wajib memakai helm keselamatan bersepeda bersertifikasi, lampu depan min 400 lumen menyala, lampu belakang merah, serta wajib mematuhi seluruh rambu jalan dan arahan marshal etape.',
                      '2. I must wear a certified cycling helmet, operating front light (min 400 lumens), red rear light, and obey all traffic regulations and race marshal instructions.'
                    )}
                  </p>
                  <p>
                    {t(
                      '3. Saya bertanggung jawab penuh atas kebugaran fisik, kelayakan teknis sepeda gravel, serta keselamatan pribadi selama rangkaian tantangan berlangsung hingga garis finis.',
                      '3. I take full personal responsibility for my physical fitness, bicycle mechanical readiness, and personal safety throughout the challenge until the finish line.'
                    )}
                  </p>
                </div>

                <label className="p-4 sm:p-5 rounded-xl bg-black/60 transition-all flex items-start gap-4 cursor-pointer select-none shadow-sm">
                  <input
                    type="checkbox"
                    checked={waiverAgreed}
                    onChange={(e) => setWaiverAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/20 text-[#FA6D0B] focus:ring-[#FA6D0B] bg-black/80 accent-[#FA6D0B] shrink-0 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm md:text-base text-white font-mono font-bold leading-relaxed">
                    {t(
                      'SAYA TELAH MEMBACA, MEMAHAMI, DAN SECARA SADAR MENYETUJUI SELURUH PROTOKOL KESELAMATAN SERTA SURAT PERNYATAAN MANDIRI (WAIVER) GRINDURANCE 2026.',
                      'I HAVE READ, UNDERSTOOD, AND CONSCIOUSLY AGREE TO ALL SAFETY PROTOCOLS AND THE OFFICIAL GRINDURANCE 2026 WAIVER.'
                    )}
                  </span>
                </label>
              </div>

              {/* ========================================================================= */}
              {/* 3.8 SUBMIT ACTION BAR (TARIF FINAL & CTA BUTTON) */}
              {/* ========================================================================= */}
              <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs sm:text-sm font-mono text-slate-300 uppercase tracking-widest block font-bold">
                    {t('TOTAL BIAYA REGISTRASI // TARIF FINAL', 'TOTAL REGISTRATION FEE // FINAL RATE')}
                  </span>
                  <div className="font-display italic text-4xl sm:text-5xl lg:text-6xl font-black text-[#FA6D0B] leading-none mt-2">
                    {formatRupiah(netPrice)}
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate-200 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span>{packageType === 'MEDAL_JERSEY' ? t('Paket Medal + Jersey', 'Medal + Jersey Package') : t('Paket Medal Saja', 'Medal Only Package')}</span>
                    {rpcMethod === 'HANDLING' && selectedCategory?.id !== 'VIRTUAL' && (
                      <>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="text-slate-200 font-semibold">+Rp 20.000 RPC</span>
                      </>
                    )}
                    {hasMealCouponPerk && (
                      <>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="text-white font-semibold">{t('+Voucher Makan Rp 50.000', '+IDR 50k Meal Voucher')}</span>
                      </>
                    )}
                    {promoDiscount > 0 && appliedPromo && (
                      <>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="text-[#FA6D0B] font-bold">-{formatRupiah(promoDiscount)} ({appliedPromo.code})</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3.5 w-full lg:w-auto shrink-0 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep('detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-7 py-4 rounded-full border border-white/20 bg-white/[0.04] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:border-[#FA6D0B] hover:bg-[#FA6D0B]/10 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {t('← DETAIL', '← DETAILS')}
                  </button>

                  <button
                    type="submit"
                    disabled={submitting || !waiverAgreed}
                    className="relative overflow-hidden flex-1 lg:flex-none px-8 sm:px-12 py-4 sm:py-5 rounded-full text-xs sm:text-base font-sans font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_35px_rgba(250,109,11,0.65)] hover:bg-[#DE5A00] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />
                    {submitting ? (
                      <span className="relative z-10">{t('MEMPROSES PENDAFTARAN...', 'PROCESSING REGISTRATION...')}</span>
                    ) : (
                      <>
                        <span className="relative z-10">{t('KUNCI NOMOR DADA & TERBITKAN INVOICE', 'LOCK BIB NUMBER & ISSUE INVOICE')}</span>
                        <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: INVOICE RESMI, BOOKING ID & PEMBAYARAN */}
        {/* ========================================================================= */}
        {currentStep === 'invoice' && createdOrder && (
          <div className="space-y-8 animate-slide-up-fade">
            {/* WhatsApp Notification & Direct Resume Magic Link Card */}
            <div className="rounded-2xl bg-[#121418]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/5">
                <span className="font-mono text-xs font-bold text-[#FA6D0B] tracking-widest uppercase">
                  // NOTIFIKASI OTOMATIS TERSIMPAN · WHATSAPP RESMI PANITIA
                </span>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  SELF-SERVICE RESUME · COT 24 JAM
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display italic text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  {t('Pendaftaran Tersimpan — Lanjutkan Bayar Kapan Saja', 'Registration Saved — Resume Payment Anytime')}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {t(
                    'Pesan resmi dan tautan langsung tagihan telah disiapkan untuk WhatsApp Anda. Anda dapat menunda dan melanjutkan pembayaran esok hari melalui tautan di bawah ini atau melalui menu "Cek Tagihan" di website.',
                    'An official notification and direct invoice link have been generated for your WhatsApp. You may defer and resume payment tomorrow via the direct link below or via the "Check Bill" menu on the website.'
                  )}
                </p>

                <div className="pt-2">
                  <div className="rounded-xl bg-black/70 p-4 font-mono text-xs text-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-[#FA6D0B] font-bold shrink-0 select-none">// LINK:</span>
                      <span className="truncate text-slate-200 select-all">
                        {typeof window !== 'undefined'
                          ? `${window.location.origin}/pembayaran?code=${createdParticipants[0]?.registration_code || createdOrder.order_id}`
                          : `/pembayaran?code=${createdParticipants[0]?.registration_code || createdOrder.order_id}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const directUrl = typeof window !== 'undefined'
                          ? `${window.location.origin}/pembayaran?code=${createdParticipants[0]?.registration_code || createdOrder.order_id}`
                          : `/pembayaran?code=${createdParticipants[0]?.registration_code || createdOrder.order_id}`;
                        navigator.clipboard.writeText(directUrl);
                        setCopiedField('magic_link');
                        setTimeout(() => setCopiedField(null), 2500);
                      }}
                      className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-[#FA6D0B] text-black font-mono font-black text-xs uppercase tracking-wider hover:bg-[#DE5A00] transition-all shrink-0 cursor-pointer text-center shadow-[0_0_15px_rgba(250,109,11,0.35)]"
                    >
                      {copiedField === 'magic_link'
                        ? t('TAUTAN TERSALIN!', 'LINK COPIED!')
                        : t('SALIN TAUTAN PEMBAYARAN', 'COPY PAYMENT LINK')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <InvoiceCockpit
              order={createdOrder}
              category={selectedCategory}
              participants={createdParticipants}
              onSimulateSuccess={handleSimulatePayment}
              isSimulating={simulatingPayment}
            />
          </div>
        )}

      </div>

    </div>
  );
}
