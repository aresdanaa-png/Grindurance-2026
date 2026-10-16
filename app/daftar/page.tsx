'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Category, PackageType, JerseySize, Gender, Order, Participant } from '@/lib/types';
import BibCard from '@/components/BibCard';
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

// 5 KATEGORI RESMI GRINDURANCE 2026
const OFFICIAL_CATEGORIES: Category[] = [
  {
    id: '60',
    name: '60 Fun Ride',
    distance_km: 60,
    category_type: 'fun',
    is_pair: false,
    price_medal_only: 225000,
    price_medal_jersey: 275000,
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
    price_medal_only: 275000,
    price_medal_jersey: 325000,
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
    id: '120_PAIR',
    name: '120 (Race)',
    distance_km: 120,
    category_type: 'race',
    is_pair: true,
    price_medal_only: 350000,
    price_medal_jersey: 400000,
    quota: 100,
    current_enrolled: 38,
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
    price_medal_only: 350000,
    price_medal_jersey: 400000,
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
    price_medal_only: 350000,
    price_medal_jersey: 400000,
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
    price_medal_only: 175000,
    price_medal_jersey: 225000,
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
const CATEGORY_VISUALS: Record<string, { 
  image: string; 
  headline: string; 
  subtitle: string; 
  elevation: string;
  badge: string; 
  terrain: string;
  callToAction: string;
  prologueNote?: string;
}> = {
  '60': {
    image: '/categories/cat_60_funride.jpg?v=landscape_2026',
    headline: '60 FUN RIDE',
    subtitle: 'REKREASI & PEMULA · SUKAMAKMUR',
    elevation: '+450 M GAIN',
    badge: 'FUN RIDE // REKREASI',
    terrain: '65% ASPAL · 35% MAKADAM HALUS',
    callToAction: 'MULAI PETUALANGAN',
  },
  '100': {
    image: '/categories/cat_100_fondo.jpg?v=landscape_2026',
    headline: '100 FONDO',
    subtitle: 'EKSPLORASI PERSAWAHAN & MAKADAM SODONG',
    elevation: '+850 M GAIN',
    badge: 'FONDO // EKSPLORASI',
    terrain: 'ROLLING HILLS & MAKADAM SODONG',
    callToAction: 'JELAJAHI JALUR',
  },
  '120_PAIR': {
    image: '/categories/cat_120_race.jpg?v=landscape_2026',
    headline: '120 (RACE)',
    subtitle: 'OFFICIAL RACE · SINGLE & PAIR MIX',
    elevation: '+1,450 M GAIN',
    badge: 'OFFICIAL RACE // PODIUM',
    terrain: 'KORIDOR JONGGOL RIDGE & SUKAMAKMUR',
    callToAction: 'REBUT PODIUM DUAL',
  },
  '150': {
    image: '/categories/cat_150_grandfondo.jpg?v=landscape_2026',
    headline: '150 GRAND FONDO',
    subtitle: 'RUTE 120 KM + WAJIB PROLOG 30 KM SUBUH',
    elevation: '+1,450 M GAIN',
    badge: 'GRAND FONDO // PROLOG 30K',
    terrain: 'RUTE 120 KM DITAMBAH PROLOG 30 KM',
    callToAction: 'TAKLUKKAN TANTANGAN',
    prologueNote: 'Rute 120 km dan 150 km memiliki trek sama, bedanya kategori 150 wajib menyelesaikan Prolog 30 km mandiri (03:00–05:00 WIB).',
  },
  '200': {
    image: '/categories/cat_200_ultra.jpg?v=landscape_2026',
    headline: '200 ULTRA',
    subtitle: 'RUTE 170 KM + WAJIB PROLOG 30 KM',
    elevation: '+3,180 M GAIN',
    badge: 'ULTRA EXPEDITION // PROLOG 30K',
    terrain: 'RUTE 170 KM DITAMBAH PROLOG 30 KM',
    callToAction: 'UJI KETAHANAN EKSTREM',
    prologueNote: 'Rute resmi disiapkan 170 km, peserta wajib menyelesaikan Prolog 30 km mandiri (Total jarak 200 km).',
  },
  'VIRTUAL': {
    image: '/categories/cat_virtual_ride.jpg?v=landscape_2026',
    headline: 'VIRTUAL RIDE',
    subtitle: '19 REGIONAL CHAPTERS · SE-INDONESIA',
    elevation: 'RUTE DOMISILI',
    badge: 'VIRTUAL // STRAVA GPS',
    terrain: 'OUTDOOR DI KOTA DOMISILI ANDA',
    callToAction: 'GOWES DI KOTA ANDA',
    prologueNote: 'Khusus cyclist di luar Jabodetabek (19 Chapter GX-ID). Rekam aktivitas via Strava/Garmin, medali finisher resmi dan jersey dikirim langsung ke rumah via DHS Logistik.',
  },
};

const JERSEY_SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

// Helper untuk mengambil data briefing teknis
function getCategoryDetail(id: string): CategoryData {
  const match = CATEGORIES.find(c => c.id === id);
  if (match) return match;
  if (id === '120_SINGLE') return CATEGORIES.find(c => c.id === '120_PAIR') || CATEGORIES[2];
  return CATEGORIES[2];
}

export default function RegistrationPage() {
  const { t } = useLanguage();
  
  // Step state: 'select' (Pilih Gambar) -> 'detail' (Peta Besar & Briefing) -> 'form' (Isi Form) -> 'invoice' (Tagihan)
  const [currentStep, setCurrentStep] = useState<'select' | 'detail' | 'form' | 'invoice'>('select');
  
  const [categories, setCategories] = useState<Category[]>(OFFICIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<Category>(OFFICIAL_CATEGORIES[2]); // Default 120 (Race)
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

  // Ambil data live dari Supabase (filter hanya kategori aktif dan cocokkan ke official list)
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          // Sinkronisasi dengan official list 60, 100, 120, 150, 200, VIRTUAL
          const validIds = ['60', '100', '120_PAIR', '150', '200', 'VIRTUAL'];
          const matched = OFFICIAL_CATEGORIES.map(off => {
            const live = data.categories.find((c: Category) => c.id === off.id);
            return live ? { ...off, current_enrolled: live.current_enrolled, quota: live.quota } : off;
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
    if (!selectedCategory.is_pair) {
      return rider1.gender === 'female' || getAge(rider1.birth_date) <= 17;
    } else {
      const isMenAndMen = rider1.gender === 'male' && rider2.gender === 'male';
      return !isMenAndMen;
    }
  };

  const basePrice = selectedCategory
    ? packageType === 'MEDAL_JERSEY'
      ? selectedCategory.price_medal_jersey
      : selectedCategory.price_medal_only
    : 0;

  const rpcHandlingFee = (rpcMethod === 'HANDLING' && selectedCategory?.id !== 'VIRTUAL') ? 20000 : 0;
  const mealCouponDiscount = isEligibleForMealCoupon() ? 50000 : 0;
  const netPrice = Math.max(0, basePrice + rpcHandlingFee - mealCouponDiscount);

  // Navigasi Step 1 -> Step 2
  const handleSelectToDetail = (cat: Category) => {
    setSelectedCategory(cat);
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
      setErrorMessage('MOHON LENGKAPI SELURUH DATA WAJIB RIDER 1 (TERMASUK NIK DAN KONTAK DARURAT).');
      return;
    }
    if (rider1.nik.trim().length !== 16) {
      setErrorMessage('NOMOR NIK RIDER 1 WAJIB 16 DIGIT SESUAI KTP.');
      return;
    }
    if (!rider1.province_id || !rider1.regency_id || !rider1.district_id || !rider1.address_detail) {
      setErrorMessage('MOHON LENGKAPI ALAMAT DOMISILI RIDER 1.');
      return;
    }

    if (selectedCategory.is_pair) {
      if (!rider2.full_name || !rider2.nik || !rider2.email || !rider2.phone_number || !rider2.emergency_contact_phone) {
        setErrorMessage('MOHON LENGKAPI SELURUH DATA WAJIB RIDER 2 (PARTNER).');
        return;
      }
      if (rider2.nik.trim().length !== 16) {
        setErrorMessage('NOMOR NIK RIDER 2 WAJIB 16 DIGIT SESUAI KTP.');
        return;
      }
      if (!rider2.province_id || !rider2.regency_id || !rider2.district_id || !rider2.address_detail) {
        setErrorMessage('MOHON LENGKAPI ALAMAT DOMISILI RIDER 2.');
        return;
      }
    }

    if (!waiverAgreed) {
      setErrorMessage('ANDA WAJIB MENYETUJUI SURAT PERNYATAAN KESELAMATAN (WAIVER) SEBELUM MELANJUTKAN.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        category_id: selectedCategory.id,
        package_type: packageType,
        rpc_method: rpcMethod,
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
        throw new Error(result.error || 'Gagal memproses pendaftaran.');
      }

      setCreatedOrder(result.order);
      setCreatedParticipants(result.participants);
      setCurrentStep('invoice');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat menghubungi server.');
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

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[600px] pointer-events-none opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 10%, rgba(250,109,11,0.25) 0%, transparent 65%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ========================================================================= */}
        {/* STEP 1: PILIH KATEGORI (6 KATEGORI RESMI GRINDURANCE 2026) */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* STEP 1: PILIH KATEGORI (6 KATEGORI RESMI GRINDURANCE 2026) */}
        {/* ========================================================================= */}
        {currentStep === 'select' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Header Telemetri & Title - Format DNA Master Bible */}
            <div className="border-b border-white/10 pb-6 sm:pb-8 mb-8 sm:mb-12">
              <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-2">
                GX-ID OFFICIAL SPEC SHEET // 2026 EDITION
              </span>
              <h1 className="font-display italic text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                PILIH KATEGORI LINTASAN
              </h1>
              <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-400 max-w-3xl leading-relaxed font-sans">
                5 kategori etape off-road koridor Jonggol–Sukamakmur dan 1 format Virtual Ride 19 Chapter se-Indonesia. Klik kategori untuk memeriksa peta satelit, profil kontur elevasi, dan regulasi resmi.
              </p>
            </div>

            {/* Grid 6 Kategori Bergaya Editorial Gravel Monolith */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((cat) => {
                const visual = CATEGORY_VISUALS[cat.id] || {
                  image: '/categories/cat_60_funride.jpg',
                  headline: cat.name.toUpperCase(),
                  subtitle: 'ULTRA ENDURANCE EXPEDITION',
                  elevation: '+1,450 M GAIN',
                  badge: 'OFFICIAL EXPEDITION',
                  terrain: 'GRAVEL & ASPAL',
                  callToAction: 'PILIH KATEGORI',
                };
                const quotaPercent = Math.min(100, Math.round((cat.current_enrolled / cat.quota) * 100));

                return (
                  <div
                    key={cat.id}
                    onClick={() => handleSelectToDetail(cat)}
                    className="relative h-[480px] sm:h-[510px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#FA6D0B] transition-all duration-300 group cursor-pointer flex flex-col justify-between p-6 sm:p-7 select-none shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(250,109,11,0.25)]"
                  >
                    {/* Background Hero Photography */}
                    <Image
                      src={visual.image}
                      alt={cat.name}
                      fill
                      className="object-cover object-center filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      priority
                    />

                    {/* Dark Vignette & Atmospheric Film Shroud */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/60 to-[#0A0B0E]/30 z-10 pointer-events-none group-hover:via-[#0A0B0E]/50 transition-colors duration-500" />

                    {/* ── TOP HUD TELEMETRY (PURE TYPOGRAPHY, NO PILL BADGES) ── */}
                    <div className="relative z-20 flex items-start justify-between gap-3 font-mono text-xs border-b border-white/10 pb-3">
                      <div>
                        <span className="font-bold text-[#FA6D0B] uppercase tracking-widest block">
                          {cat.id === '120_PAIR' 
                            ? 'OFFICIAL RACE // 120 KM' 
                            : cat.id === '200' 
                            ? 'ULTRA EXPEDITION // 200 KM' 
                            : cat.id === '150' 
                            ? 'GRAND FONDO // 150 KM' 
                            : cat.id === '100' 
                            ? 'FONDO // 100 KM' 
                            : cat.id === 'VIRTUAL' 
                            ? 'VIRTUAL STRAVA // 19 CHAPTERS' 
                            : 'FUN RIDE // 60 KM'}
                        </span>
                        <span className="text-[11px] text-slate-400 tracking-wider uppercase block mt-0.5">
                          {visual.elevation} · {cat.cot_hours ? `COT ${cat.cot_hours}H` : 'RUTE MANDIRI'}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block">START</span>
                        <span className="text-xs font-bold text-white tracking-wider block">{cat.wave_start_time || '05:30'} WIB</span>
                      </div>
                    </div>

                    {/* ── CENTER HEROIC TYPOGRAPHY (CLEAN & AIRY) ── */}
                    <div className="relative z-20 my-auto space-y-2 py-4">
                      <h2 className="font-display italic text-4xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md leading-none">
                        {visual.headline}
                      </h2>

                      <p className="font-mono text-xs text-slate-300 uppercase tracking-wider">
                        {visual.subtitle}
                      </p>

                      {visual.prologueNote && (
                        <p className="font-mono text-[11px] font-bold text-[#FA6D0B] uppercase tracking-wider pt-1">
                          // WAJIB PROLOG 30 KM SUBUH
                        </p>
                      )}
                    </div>

                    {/* ── BOTTOM INDUSTRIAL LEDGER & CALL TO ACTION STRIP ── */}
                    <div className="relative z-20 space-y-3 border-t border-white/10 pt-4 font-mono">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-[11px] text-slate-400 uppercase tracking-widest">BIAYA MULAI DARI</span>
                        <span className="font-display italic text-xl sm:text-2xl font-black text-white">{formatRupiah(cat.price_medal_only)}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5 pt-2">
                        <span>KUOTA: <strong className="text-white">{cat.quota - cat.current_enrolled} SLOT</strong></span>
                        <span className="text-[#FA6D0B] font-bold">{quotaPercent}% TERISI</span>
                      </div>

                      <div className="w-full py-3.5 rounded-full bg-[#FA6D0B] group-hover:bg-[#DE5A00] text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,109,11,0.25)] group-hover:shadow-[0_0_35px_rgba(250,109,11,0.65)]">
                        <span>PILIH KATEGORI</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: DETAIL KATEGORI (PETA BESAR, ELEVASI, ATURAN & BRIEFING) */}
        {/* ========================================================================= */}
        {currentStep === 'detail' && (
          <div className="space-y-10 animate-fadeIn">
            
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
                ← KEMBALI // PILIH KATEGORI LAIN
              </button>

              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                TAHAP 02 / 03 · RACE BRIEFING &amp; ELEVATION MATRIX
              </div>
            </div>

            {/* Hero Category Title Header */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-2">
                {CATEGORY_VISUALS[selectedCategory.id]?.badge || 'OFFICIAL CATEGORY'}
              </span>

              <h1 className="font-display italic text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none">
                {selectedCategory.name}
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-slate-400 font-sans max-w-3xl leading-relaxed">
                {detailCategoryData.desc}
              </p>

              {CATEGORY_VISUALS[selectedCategory.id]?.prologueNote && (
                <div className="mt-4 p-4 rounded-xl border border-white/10 bg-black/40 font-mono text-xs text-[#FA6D0B] space-y-1">
                  <span className="font-bold uppercase tracking-wider block">// PROTOKOL WAJIB PROLOG 30 KM</span>
                  <p className="text-slate-300 font-sans">{CATEGORY_VISUALS[selectedCategory.id]?.prologueNote}</p>
                </div>
              )}
            </div>

            {/* 4-Metric Bar Telemetry */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 rounded-2xl border border-white/10 bg-[#121418] font-mono text-xs">
              <div className="space-y-1 border-r border-white/10 pr-2">
                <span className="text-[10px] text-slate-500 uppercase block">JARAK TEMPUH:</span>
                <span className="text-xl sm:text-2xl font-black text-white block">
                  {selectedCategory.id === 'VIRTUAL' ? 'BEBAS' : `${selectedCategory.distance_km} KM`}
                </span>
                <span className="text-[10px] text-slate-400">
                  {selectedCategory.id === '150' 
                    ? 'Rute 120km + 30km Prolog' 
                    : selectedCategory.id === '200' 
                    ? 'Rute 170km + 30km Prolog' 
                    : selectedCategory.id === 'VIRTUAL' 
                    ? 'Rute Domisili Lokal' 
                    : 'Rute Penuh'}
                </span>
              </div>

              <div className="space-y-1 border-r border-white/10 pr-2 sm:px-2">
                <span className="text-[10px] text-slate-500 uppercase block">TOTAL ELEVASI:</span>
                <span className="text-xl sm:text-2xl font-black text-[#FA6D0B] block">{detailCategoryData.elevation}</span>
                <span className="text-[10px] text-slate-400">
                  {selectedCategory.id === 'VIRTUAL' ? 'Kontur Domisili' : `Max Alt: ${detailCategoryData.maxAlt}`}
                </span>
              </div>

              <div className="space-y-1 border-r border-white/10 pr-2 sm:px-2">
                <span className="text-[10px] text-slate-500 uppercase block">BATAS WAKTU (COT):</span>
                <span className="text-xl sm:text-2xl font-black text-white block">
                  {selectedCategory.cot_hours ? `${selectedCategory.cot_hours} JAM` : 'FLEKSIBEL'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {selectedCategory.id === 'VIRTUAL' ? 'Sinkronisasi Strava Webhook' : `Flag-off: ${selectedCategory.wave_start_time || '05:30'} WIB`}
                </span>
              </div>

              <div className="space-y-1 sm:pl-2">
                <span className="text-[10px] text-slate-500 uppercase block">KUOTA PESERTA:</span>
                <span className="text-xl sm:text-2xl font-black text-white block">{selectedCategory.quota} SLOT</span>
                <span className="text-[10px] text-emerald-400 font-bold">Tersedia: {selectedCategory.quota - selectedCategory.current_enrolled} Slot</span>
              </div>
            </div>

            {selectedCategory.id === 'VIRTUAL' ? (
              /* VIRTUAL RIDE DASHBOARD: 19 CHAPTERS & STRAVA PROTOCOL */
              <div className="space-y-8">
                {/* 19 Chapters Network Banner */}
                <div className="p-6 sm:p-8 rounded-3xl border border-[#FA6D0B]/30 bg-gradient-to-b from-[#181B22] to-[#0E1015] shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest font-bold block">
                        GX-ID NATIONAL NETWORK // 19 REGIONAL CHAPTERS
                      </span>
                      <h3 className="font-display italic text-xl sm:text-3xl font-black uppercase text-white mt-1">
                        JARINGAN GOWES SERENTAK SE-INDONESIA
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest self-start sm:self-auto">
                      STRAVA WEBHOOK // CONNECTED
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    Khusus bagi 80.000+ anggota komunitas GX-ID dan pesepeda di luar Jabodetabek. Anda dapat memilih rute outdoor favorit di kota domisili Anda, merekam aktivitas menggunakan GPS cycling computer (Garmin / Wahoo / Strava / Komoot), dan medali cor logam resmi serta jersey finisher akan dikirimkan langsung ke alamat Anda via DHS Logistik.
                  </p>

                  {/* 19 Chapters Grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      CHAPTER REGIONAL TERDAFTAR (TIKUM RESMI):
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
                          className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300 font-bold hover:border-[#FA6D0B] hover:text-[#FA6D0B] transition-colors"
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
                    [ALUR 4 TAHAP KELULUSAN VIRTUAL RIDE]
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border border-white/15 bg-[#121418] space-y-2">
                      <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">TAHAP 01</div>
                      <div className="text-sm font-black text-white font-mono uppercase">REGISTRASI &amp; BIB</div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        Pilih paket medali / jersey, isi identitas dan alamat domisili untuk pengiriman logistik, lalu selesaikan pembayaran.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/15 bg-[#121418] space-y-2">
                      <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">TAHAP 02</div>
                      <div className="text-sm font-black text-white font-mono uppercase">GOWES OUTDOOR</div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        Gowes di rute kota Anda pada periode race window. Wajib outdoor (dilarang indoor roller) dengan GPS tracking aktif.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/15 bg-[#121418] space-y-2">
                      <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">TAHAP 03</div>
                      <div className="text-sm font-black text-white font-mono uppercase">STRAVA SYNC</div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        Sinkronkan URL aktivitas Strava atau file GPX. Server otomatis Grindurance memverifikasi validitas data rekaman.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/15 bg-[#121418] space-y-2">
                      <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">TAHAP 04</div>
                      <div className="text-sm font-black text-white font-mono uppercase">MEDALI DIKIRIM</div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        Setelah status FINISHER terverifikasi, medali cor logam resmi dan jersey eksklusif dikirim via DHS Logistik ke rumah.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ON-SITE CATEGORIES: LARGE GPX LIVE MAP & ELEVATION PROFILE */
              <>
                {/* PETA BESAR (LARGE GPX LIVE MAP) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-white/10 pb-2">
                    <span className="font-bold text-white uppercase tracking-wider">[PETA RUTE RESMI // SATELLITE LIVE GPX]</span>
                    <span className="text-[10px] text-[#FA6D0B] uppercase">KORIDOR JONGGOL–SUKAMAKMUR–SENTUL</span>
                  </div>

                  <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl">
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

                {/* DIAGRAM PROFIL ELEVASI INTERAKTIF */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-white/10 pb-2">
                    <span className="font-bold text-white uppercase tracking-wider">[DIAGRAM KONTUR ELEVASI &amp; CHECKPOINT STATION]</span>
                    <span className="text-[10px] text-slate-500 uppercase">HOVER / SCRUB UNTUK DETAIL KM &amp; TINGGI</span>
                  </div>

                  <div className="p-4 sm:p-6 rounded-3xl border border-white/15 bg-[#121418]">
                    <ElevationProfile
                      category={detailCategoryData}
                      accentColor="#FA6D0B"
                    />
                  </div>
                </div>
              </>
            )}

            {/* GRID DETAIL: PEMBAGIAN PERMUKAAN & MATRIKS CHECKPOINT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Karakter Permukaan Jalan (Surface Breakdown) */}
              <div className="p-6 rounded-3xl border border-white/15 bg-[#121418] space-y-4 font-mono text-xs">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex justify-between">
                  <span>KOMPOSISI JALUR &amp; PERMUKAAN:</span>
                  <span className="text-[#FA6D0B]">TERRAIN SPECS</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>ASPAL MULUS / ROLLING:</span>
                      <span className="font-bold text-white">{detailCategoryData.surfaceBreakdown.asphalt}</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full" style={{ width: detailCategoryData.surfaceBreakdown.asphalt }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>GRAVEL &amp; KERIKIL MAKADAM:</span>
                      <span className="font-bold text-[#FA6D0B]">{detailCategoryData.surfaceBreakdown.gravel}</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FA6D0B] rounded-full" style={{ width: detailCategoryData.surfaceBreakdown.gravel }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>TANAH PADAT / UNPAVED:</span>
                      <span className="font-bold text-amber-300">{detailCategoryData.surfaceBreakdown.unpaved}</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: detailCategoryData.surfaceBreakdown.unpaved }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 border-t border-white/5 space-y-1">
                  <div>Tanjakan Rata-rata: <span className="text-white font-bold">{detailCategoryData.avgGradient}</span></div>
                  <div>Tanjakan Maksimum: <span className="text-[#FA6D0B] font-bold">{detailCategoryData.maxGradient}</span></div>
                  <div>Rekomendasi Ban: <span className="text-white font-bold">{detailCategoryData.gearTip}</span></div>
                </div>
              </div>

              {/* Aturan & Regulasi Khusus Kategori Ini */}
              <div className="p-6 rounded-3xl border border-white/15 bg-[#121418] space-y-4 font-mono text-xs">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex justify-between">
                  <span>REGULASI &amp; PERATURAN KHUSUS:</span>
                  <span className="text-emerald-400">RULES</span>
                </div>

                <div className="space-y-3 leading-relaxed text-slate-300">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <strong className="text-white block uppercase">FORMAT KOMPETISI / EKSPEDISI:</strong>
                    <p>{detailCategoryData.format}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <strong className="text-[#FA6D0B] block uppercase">ATURAN TEKNIS &amp; GEAR WAJIB:</strong>
                    <p>{detailCategoryData.specialRules}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <strong className="text-white block uppercase">HIGHLIGHT RUTE KORIDOR:</strong>
                    <p>{detailCategoryData.routeHighlights}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* MATRIKS POS CHECKPOINT (STATIONS) */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                MATRIKS CHECKPOINT, WATER STATION &amp; FINISH LOUNGE:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {detailCategoryData.stations.map((st, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-white/10 bg-[#121418] font-mono text-xs space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#FA6D0B] font-bold">{st.km}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[9px] uppercase font-bold">{st.type}</span>
                    </div>
                    <div className="font-bold text-white text-sm truncate">{st.name}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM STICKY ACTION BANNER: TOMBOL DAFTAR DI PALING BAWAH */}
            <div className="p-6 sm:p-8 rounded-3xl border border-[#FA6D0B]/50 bg-gradient-to-r from-[#171A21] via-[#1F242E] to-[#171A21] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">SIAP UNTUK TANTANGAN INI?</span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mt-0.5">
                  AMBIL BAGIAN DI {selectedCategory.name}
                </h3>
                <div className="font-mono text-xs text-slate-300 mt-1 flex flex-wrap gap-x-4">
                  <span>Biaya Tiket: <strong className="text-[#FA6D0B]">{formatRupiah(selectedCategory.price_medal_only)}</strong></span>
                  <span>Sisa Kuota: <strong className="text-emerald-400">{selectedCategory.quota - selectedCategory.current_enrolled} Slot</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep('select');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-4 rounded-full border border-white/20 bg-white/[0.04] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  ← KEMBALI
                </button>

                <button
                  type="button"
                  onClick={handleProceedToForm}
                  className="px-8 sm:px-10 py-4 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_30px_rgba(250,109,11,0.5)] hover:bg-[#DE5A00] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>DAFTAR KATEGORI INI SEKARANG</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: FORMULIR PENDAFTARAN ATLET & WAIVER */}
        {/* ========================================================================= */}
        {currentStep === 'form' && (
          <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto">
            
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep('detail');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-[#FA6D0B] transition-colors cursor-pointer"
              >
                ← KEMBALI // DETAIL KATEGORI
              </button>

              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                TAHAP 03 / 03 · FORMULIR REGISTRASI ATLET
              </div>
            </div>

            {/* Selected Category Sticky Banner */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#121418] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#FA6D0B] uppercase tracking-widest font-bold block">
                  KATEGORI PILIHAN // ACTIVE SELECTION
                </span>
                <h2 className="font-display italic text-2xl font-black uppercase text-white mt-0.5">
                  {selectedCategory.name}
                </h2>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Jarak: <span className="text-white font-bold">{selectedCategory.id === 'VIRTUAL' ? 'Bebas (Rute Domisili)' : `${selectedCategory.distance_km} KM`}</span> · 
                  Format: <span className="text-white font-bold">{selectedCategory.is_pair ? 'Tandem Tim (2 Riders)' : selectedCategory.id === 'VIRTUAL' ? 'Virtual Ride (19 Chapters)' : 'Solo Rider'}</span> · 
                  COT: <span className="text-white font-bold">{selectedCategory.cot_hours ? `${selectedCategory.cot_hours} Jam` : 'Fleksibel'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep('select');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-mono font-bold text-[#FA6D0B] hover:text-white uppercase tracking-wider underline cursor-pointer self-start sm:self-center"
              >
                [GANTI KATEGORI]
              </button>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-300 font-mono text-xs flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-red-400">[PERINGATAN]</span> {errorMessage}
                </div>
                <button
                  onClick={() => setErrorMessage('')}
                  className="text-red-400 hover:text-white uppercase font-bold text-[10px] shrink-0 cursor-pointer"
                >
                  [TUTUP]
                </button>
              </div>
            )}

            {/* Formulir Pendaftaran */}
            <form onSubmit={handleFinalSubmit} className="space-y-10">

              {/* 3.1 Pilihan Paket & RPC Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Paket Jersey vs Medal */}
                <div className="space-y-3">
                  <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    PILIHAN PAKET ATLET <span className="text-[#FA6D0B]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPackageType('MEDAL_JERSEY')}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        packageType === 'MEDAL_JERSEY'
                          ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]'
                          : 'border-white/10 bg-[#121418] hover:border-white/25'
                      }`}
                    >
                      <span className="text-[9px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block mb-1">
                        [REKOMENDASI KOMUNITAS]
                      </span>
                      <div className="text-sm font-black text-white uppercase">MEDALI + FINISHER JERSEY</div>
                      <div className="font-mono text-sm text-[#FA6D0B] font-bold mt-1">
                        {formatRupiah(selectedCategory.price_medal_jersey)}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">
                        Termasuk jersey finisher eksklusif 8 tahun GX-ID.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPackageType('MEDAL_ONLY')}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        packageType === 'MEDAL_ONLY'
                          ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]'
                          : 'border-white/10 bg-[#121418] hover:border-white/25'
                      }`}
                    >
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                        [PAKET BASE]
                      </span>
                      <div className="text-sm font-black text-white uppercase">MEDALI SAJA</div>
                      <div className="font-mono text-sm text-white font-bold mt-1">
                        {formatRupiah(selectedCategory.price_medal_only)}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">
                        Hanya medali finisher (tanpa jersey finisher).
                      </p>
                    </button>
                  </div>
                </div>

                {/* Pengambilan Race Pack */}
                <div className="space-y-3">
                  <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {selectedCategory.id === 'VIRTUAL' ? 'METODE PENGIRIMAN MEDALI & RACE PACK' : 'PENGAMBILAN RACE PACK (RPC)'} <span className="text-[#FA6D0B]">*</span>
                  </label>
                  {selectedCategory.id === 'VIRTUAL' ? (
                    <div className="p-5 rounded-2xl border border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]">
                      <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                        [TERMASUK DALAM PAKET VIRTUAL]
                      </span>
                      <div className="text-sm font-black text-white uppercase">PENGIRIMAN DHS LOGISTIK KE ALAMAT RUMAH</div>
                      <p className="text-[10px] text-slate-300 mt-2 font-sans leading-relaxed">
                        Medali finisher resmi dan jersey akan dikirim via kurir DHS Logistik langsung ke alamat domisili Anda setelah validasi GPS Strava selesai. Bebas biaya handling on-site.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRpcMethod('PICKUP')}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                          rpcMethod === 'PICKUP'
                            ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]'
                            : 'border-white/10 bg-[#121418] hover:border-white/25'
                        }`}
                      >
                        <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                          [GRATIS // FREE]
                        </span>
                        <div className="text-sm font-black text-white uppercase">AMBIL DI CIBUBUR</div>
                        <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">
                          Lokasi: ABEEY Coffee &amp; Eatery, LRT Harjamukti, Cibubur (11–12 Des 2026).
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRpcMethod('HANDLING')}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                          rpcMethod === 'HANDLING'
                            ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]'
                            : 'border-white/10 bg-[#121418] hover:border-white/25'
                        }`}
                      >
                        <span className="text-[9px] font-mono text-[#FA6D0B] font-bold uppercase tracking-wider block mb-1">
                          [+RP 20.000]
                        </span>
                        <div className="text-sm font-black text-white uppercase">HANDLING &amp; KIRIM</div>
                        <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">
                          Paket race pack dikirim langsung ke alamat rumah Anda.
                        </p>
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Banner Insentif Kupon Makan Jika Memenuhi Syarat */}
              {isEligibleForMealCoupon() && (
                <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-400">[INSENTIF GX-ID AKTIF]</span> Diskon Kupon Makan Rp 50.000 otomatis dipotong dari invoice Anda.
                  </div>
                  <span className="text-emerald-400 font-bold shrink-0 text-xs uppercase tracking-wider">[-RP 50.000]</span>
                </div>
              )}

              {/* Tab Switcher Jika Kategori Pair */}
              {selectedCategory.is_pair && (
                <div className="flex border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setPairActiveTab('rider1')}
                    className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      pairActiveTab === 'rider1'
                        ? 'border-[#FA6D0B] text-[#FA6D0B] bg-white/[0.02]'
                        : 'border-transparent text-slate-500 hover:text-white'
                    }`}
                  >
                    [01] RIDER 1 // KAPTEN TIM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPairActiveTab('rider2')}
                    className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      pairActiveTab === 'rider2'
                        ? 'border-[#FA6D0B] text-[#FA6D0B] bg-white/[0.02]'
                        : 'border-transparent text-slate-500 hover:text-white'
                    }`}
                  >
                    [02] RIDER 2 // PARTNER TIM
                  </button>
                </div>
              )}

              {/* 3.2 Form Fields: Rider 1 */}
              {(!selectedCategory.is_pair || pairActiveTab === 'rider1') ? (
                <div className="space-y-6">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest pb-1 border-b border-white/10">
                    IDENTITAS ATLET RIDER 1 {selectedCategory.is_pair && '(KAPTEN TIM)'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        NAMA LENGKAP (SESUAI KTP/PASPOR) <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rider1.full_name}
                        onChange={(e) => setRider1({ ...rider1, full_name: e.target.value })}
                        placeholder="Nama Lengkap"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        NOMOR NIK / PASPOR (16 DIGIT KTP) <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        value={rider1.nik}
                        onChange={(e) => setRider1({ ...rider1, nik: e.target.value.replace(/\D/g, '') })}
                        placeholder="3201012345670001"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        JENIS KELAMIN <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRider1({ ...rider1, gender: 'male' })}
                          className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                            rider1.gender === 'male'
                              ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 text-[#FA6D0B]'
                              : 'border-white/15 bg-black/60 text-slate-400'
                          }`}
                        >
                          LAKI-LAKI
                        </button>
                        <button
                          type="button"
                          onClick={() => setRider1({ ...rider1, gender: 'female' })}
                          className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                            rider1.gender === 'female'
                              ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 text-[#FA6D0B]'
                              : 'border-white/15 bg-black/60 text-slate-400'
                          }`}
                        >
                          PEREMPUAN
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        TANGGAL LAHIR <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={rider1.birth_date}
                        onChange={(e) => setRider1({ ...rider1, birth_date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        GOLONGAN DARAH <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <select
                        value={rider1.blood_type}
                        onChange={(e) => setRider1({ ...rider1, blood_type: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm transition-all outline-none"
                      >
                        <option value="A" className="bg-[#15171C]">GOLONGAN DARAH A</option>
                        <option value="B" className="bg-[#15171C]">GOLONGAN DARAH B</option>
                        <option value="AB" className="bg-[#15171C]">GOLONGAN DARAH AB</option>
                        <option value="O" className="bg-[#15171C]">GOLONGAN DARAH O</option>
                        <option value="-" className="bg-[#15171C]">TIDAK TAHU (-)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        EMAIL AKTIF <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={rider1.email}
                        onChange={(e) => setRider1({ ...rider1, email: e.target.value })}
                        placeholder="nama@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        NOMOR WHATSAPP AKTIF <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rider1.phone_number}
                        onChange={(e) => setRider1({ ...rider1, phone_number: e.target.value })}
                        placeholder="081234567890"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        NAMA KONTAK DARURAT <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rider1.emergency_contact_name}
                        onChange={(e) => setRider1({ ...rider1, emergency_contact_name: e.target.value })}
                        placeholder="Keluarga / Kerabat"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        NOMOR HP KONTAK DARURAT <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rider1.emergency_contact_phone}
                        onChange={(e) => setRider1({ ...rider1, emergency_contact_phone: e.target.value })}
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {packageType === 'MEDAL_JERSEY' && (
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        UKURAN JERSEY FINISHER RIDER 1 <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {JERSEY_SIZES.map((sz) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setRider1({ ...rider1, jersey_size: sz })}
                            className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                              rider1.jersey_size === sz
                                ? 'border-[#FA6D0B] bg-[#FA6D0B] text-black font-black'
                                : 'border-white/15 bg-black/60 text-slate-400 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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
              ) : (
                /* 3.3 Form Fields: Rider 2 */
                <div className="space-y-6">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest pb-1 border-b border-white/10">
                    IDENTITAS ATLET RIDER 2 (PARTNER TIM)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        NAMA LENGKAP PARTNER <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rider2.full_name}
                        onChange={(e) => setRider2({ ...rider2, full_name: e.target.value })}
                        placeholder="Nama Lengkap Partner"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        NIK PARTNER (16 DIGIT KTP) <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        value={rider2.nik}
                        onChange={(e) => setRider2({ ...rider2, nik: e.target.value.replace(/\D/g, '') })}
                        placeholder="3201012345670002"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        JENIS KELAMIN PARTNER <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRider2({ ...rider2, gender: 'male' })}
                          className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                            rider2.gender === 'male'
                              ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 text-[#FA6D0B]'
                              : 'border-white/15 bg-black/60 text-slate-400'
                          }`}
                        >
                          LAKI-LAKI
                        </button>
                        <button
                          type="button"
                          onClick={() => setRider2({ ...rider2, gender: 'female' })}
                          className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                            rider2.gender === 'female'
                              ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 text-[#FA6D0B]'
                              : 'border-white/15 bg-black/60 text-slate-400'
                          }`}
                        >
                          PEREMPUAN
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        TANGGAL LAHIR <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={rider2.birth_date}
                        onChange={(e) => setRider2({ ...rider2, birth_date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        GOLONGAN DARAH <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <select
                        value={rider2.blood_type}
                        onChange={(e) => setRider2({ ...rider2, blood_type: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm transition-all outline-none"
                      >
                        <option value="A" className="bg-[#15171C]">GOLONGAN DARAH A</option>
                        <option value="B" className="bg-[#15171C]">GOLONGAN DARAH B</option>
                        <option value="AB" className="bg-[#15171C]">GOLONGAN DARAH AB</option>
                        <option value="O" className="bg-[#15171C]">GOLONGAN DARAH O</option>
                        <option value="-" className="bg-[#15171C]">TIDAK TAHU (-)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        EMAIL PARTNER <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={rider2.email}
                        onChange={(e) => setRider2({ ...rider2, email: e.target.value })}
                        placeholder="partner@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        WHATSAPP PARTNER <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rider2.phone_number}
                        onChange={(e) => setRider2({ ...rider2, phone_number: e.target.value })}
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        KONTAK DARURAT (NAMA) <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rider2.emergency_contact_name}
                        onChange={(e) => setRider2({ ...rider2, emergency_contact_name: e.target.value })}
                        placeholder="Nama Kontak Darurat Partner"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        NOMOR HP KONTAK DARURAT <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rider2.emergency_contact_phone}
                        onChange={(e) => setRider2({ ...rider2, emergency_contact_phone: e.target.value })}
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {packageType === 'MEDAL_JERSEY' && (
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        UKURAN JERSEY FINISHER PARTNER <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {JERSEY_SIZES.map((sz) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setRider2({ ...rider2, jersey_size: sz })}
                            className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                              rider2.jersey_size === sz
                                ? 'border-[#FA6D0B] bg-[#FA6D0B] text-black font-black'
                                : 'border-white/15 bg-black/60 text-slate-400 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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
              )}

              {/* 3.4 Safety Waiver & Agreement */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  SURAT PERNYATAAN &amp; PELEPASAN TANGGUNG JAWAB (WAIVER):
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-[#121418] text-xs font-mono text-slate-300 leading-relaxed space-y-2">
                  <p>
                    1. Saya menyadari bahwa Gravel Grindurance 2026 adalah ekspedisi bersepeda mandiri (*unsupported*) di jalan raya umum yang tidak steril.
                  </p>
                  <p>
                    2. Saya wajib memakai helm keselamatan, lampu depan min 400 lumen, lampu belakang merah, serta mematuhi aturan lalu lintas dan arahan marshal.
                  </p>
                  <p>
                    3. Saya bertanggung jawab penuh atas kondisi fisik, sepeda, dan keselamatan pribadi selama kegiatan berlangsung.
                  </p>
                </div>

                <label className="p-4 rounded-xl border border-white/15 bg-[#15171C] flex items-start gap-3 cursor-pointer hover:border-[#FA6D0B] transition-colors select-none">
                  <input
                    type="checkbox"
                    checked={waiverAgreed}
                    onChange={(e) => setWaiverAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/20 text-[#FA6D0B] focus:ring-[#FA6D0B] bg-black/60 accent-[#FA6D0B]"
                  />
                  <span className="text-xs text-white font-mono leading-relaxed">
                    SAYA TELAH MEMBACA, MEMAHAMI, DAN SECARA SADAR MENYETUJUI SELURUH PROTOKOL KESELAMATAN SERTA SURAT PERNYATAAN MANDIRI (WAIVER) GRINDURANCE 2026.
                  </span>
                </label>
              </div>

              {/* 3.5 Submit Action Bar */}
              <div className="p-6 rounded-3xl border border-white/15 bg-gradient-to-r from-[#15171C] via-[#1A1D24] to-[#15171C] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">NOMINAL AKHIR PEMBAYARAN:</span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-[#FA6D0B] block">
                    {formatRupiah(netPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep('detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-4 rounded-full border border-white/20 bg-white/[0.04] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    ← DETAIL
                  </button>

                  <button
                    type="submit"
                    disabled={submitting || !waiverAgreed}
                    className="flex-1 sm:flex-none px-9 py-4 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_30px_rgba(250,109,11,0.4)] hover:bg-[#DE5A00] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {submitting ? (
                      <span>MEMPROSES PENDAFTARAN...</span>
                    ) : (
                      <>
                        <span>KUNCI NOMOR DADA &amp; TERBITKAN INVOICE</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Header Konfirmasi */}
            <div className="p-8 rounded-2xl border border-white/10 bg-[#121418] text-center space-y-4 relative overflow-hidden shadow-2xl">
              <div className="inline-block">
                <span className="px-4 py-1.5 text-xs font-mono font-black uppercase tracking-widest bg-[#FA6D0B] text-black">
                  STATUS: {createdOrder.payment_status === 'PAID' ? 'LUNAS // TERDAFTAR RESMI' : 'MENUNGGU PEMBAYARAN // PAYMENT PENDING'}
                </span>
              </div>

              <h1 className="font-display italic text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                INVOICE RESERVASI RESMI
              </h1>

              <div className="font-mono text-sm sm:text-base text-slate-300">
                BOOKING ID: <span className="text-[#FA6D0B] font-bold tracking-widest">{createdOrder.order_id}</span>
              </div>
            </div>

            {/* Rincian Tagihan Finansial */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#121418] space-y-5 font-mono">
              <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 flex justify-between">
                <span>RINCIAN TRANSAKSI:</span>
                <span className="text-[#FA6D0B]">{selectedCategory.name}</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>TIKET KATEGORI:</span>
                  <span className="font-bold text-white">{formatRupiah(createdOrder.gross_amount - (rpcMethod === 'HANDLING' ? 20000 : 0))}</span>
                </div>

                {rpcMethod === 'HANDLING' && (
                  <div className="flex justify-between text-slate-300">
                    <span>LAYANAN HANDLING &amp; PACKAGING RPC:</span>
                    <span className="font-bold text-white">Rp 20.000</span>
                  </div>
                )}

                {createdOrder.discount_meal_coupon > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>INSENTIF KUPON MAKAN GX-ID:</span>
                    <span>- {formatRupiah(createdOrder.discount_meal_coupon)}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/15 pt-4 text-white gap-2">
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">TOTAL TRANSFER WAJIB:</span>
                    <span className="text-[11px] text-slate-500 font-sans">Transfer sesuai nominal persis untuk verifikasi otomatis.</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-2xl sm:text-3xl font-black text-[#FA6D0B] block font-mono">
                      {formatRupiah(createdOrder.net_amount)}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(createdOrder.net_amount.toString(), 'nominal')}
                      className="text-[11px] text-slate-400 hover:text-white uppercase font-bold tracking-wider mt-1 cursor-pointer"
                    >
                      {copiedField === 'nominal' ? '[NOMINAL DISALIN!]' : '[SALIN NOMINAL]'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Rekening Resmi Panitia */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#121418] space-y-4 font-mono">
              <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
                REKENING PEMBAYARAN PANITIA GX-ID:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-white/10 bg-black/60 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">BCA (BANK CENTRAL ASIA)</span>
                  <div className="text-xl font-black text-white tracking-widest">8831 2948 20</div>
                  <div className="text-xs text-slate-400">A.N. GX-ID INDONESIA / GRINDURANCE</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('8831294820', 'bca')}
                    className="text-xs text-[#FA6D0B] hover:text-white uppercase font-bold tracking-wider pt-2 block cursor-pointer"
                  >
                    {copiedField === 'bca' ? '[REKENING DISALIN!]' : '[SALIN REKENING BCA]'}
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-black/60 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">BANK MANDIRI</span>
                  <div className="text-xl font-black text-white tracking-widest">133 00 2819 4021</div>
                  <div className="text-xs text-slate-400">A.N. PANITIA GRINDURANCE 2026</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('1330028194021', 'mandiri')}
                    className="text-xs text-[#FA6D0B] hover:text-white uppercase font-bold tracking-wider pt-2 block cursor-pointer"
                  >
                    {copiedField === 'mandiri' ? '[REKENING DISALIN!]' : '[SALIN REKENING MANDIRI]'}
                  </button>
                </div>
              </div>
            </div>

            {/* Digital BIB Preview */}
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  KARTU BIB DIGITAL SEMENTARA:
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">[SIMULASI RACE BIB]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {createdParticipants.map((p) => (
                  <BibCard
                    key={p.id}
                    bibNumber={p.bib_number || 'PENDING'}
                    fullName={p.full_name}
                    categoryName={selectedCategory?.name || 'GRINDURANCE'}
                    distanceKm={selectedCategory?.distance_km || 120}
                    riderRole={p.rider_role}
                    bloodType={p.blood_type}
                    medicalNotes={p.medical_notes}
                    communityChapter={p.community_chapter}
                    registrationCode={p.registration_code}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 rounded-3xl border border-white/10 bg-[#121418] flex flex-col sm:flex-row items-center justify-between gap-4">
              {createdOrder.payment_status !== 'PAID' && (
                <button
                  type="button"
                  disabled={simulatingPayment}
                  onClick={handleSimulatePayment}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {simulatingPayment ? '[MEMPROSES SIMULASI...]' : '[SIMULASI PEMBAYARAN BERHASIL (SANDBOX)]'}
                </button>
              )}

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link
                  href="/peserta"
                  className="px-6 py-3 rounded-full border border-white/20 bg-white/[0.04] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>LIHAT START LIST</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/"
                  className="px-7 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.25)] hover:bg-[#DE5A00] transition-all"
                >
                  BERANDA
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
