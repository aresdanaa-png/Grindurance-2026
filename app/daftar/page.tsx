'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Category, PackageType, JerseySize, Gender, Order, Participant } from '@/lib/types';
import BibCard from '@/components/BibCard';
import IndonesiaAddressSelect from '@/components/IndonesiaAddressSelect';
import { useLanguage } from '@/lib/context/LanguageContext';

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: '60',
    name: '60K Gravel Discovery',
    distance_km: 60,
    category_type: 'fun',
    is_pair: false,
    price_medal_only: 290000,
    price_medal_jersey: 540000,
    quota: 100,
    current_enrolled: 24,
    cot_hours: 6,
    wave_start_time: '06:00',
    prologue_required_km: 0,
    mandatory_pitstop_cp: null,
    tracking_required: false,
    is_active: true,
  },
  {
    id: '120_SINGLE',
    name: '120K Gravel Explorer (Solo)',
    distance_km: 120,
    category_type: 'race',
    is_pair: false,
    price_medal_only: 390000,
    price_medal_jersey: 640000,
    quota: 100,
    current_enrolled: 42,
    cot_hours: 11,
    wave_start_time: '05:30',
    prologue_required_km: 0,
    mandatory_pitstop_cp: null,
    tracking_required: true,
    is_active: true,
  },
  {
    id: '120_PAIR',
    name: '120K Pair Challenge (2 Riders)',
    distance_km: 120,
    category_type: 'race',
    is_pair: true,
    price_medal_only: 780000,
    price_medal_jersey: 1280000,
    quota: 50,
    current_enrolled: 18,
    cot_hours: 11,
    wave_start_time: '05:30',
    prologue_required_km: 0,
    mandatory_pitstop_cp: null,
    tracking_required: true,
    is_active: true,
  },
  {
    id: '200',
    name: '200K Gravel Adventure',
    distance_km: 200,
    category_type: 'ultra',
    is_pair: false,
    price_medal_only: 490000,
    price_medal_jersey: 740000,
    quota: 75,
    current_enrolled: 31,
    cot_hours: 16,
    wave_start_time: '05:00',
    prologue_required_km: 0,
    mandatory_pitstop_cp: 4,
    tracking_required: true,
    is_active: true,
  },
  {
    id: '150',
    name: '200K Road Challenge',
    distance_km: 200,
    category_type: 'cross',
    is_pair: false,
    price_medal_only: 450000,
    price_medal_jersey: 700000,
    quota: 75,
    current_enrolled: 28,
    cot_hours: 14,
    wave_start_time: '05:15',
    prologue_required_km: 0,
    mandatory_pitstop_cp: 3,
    tracking_required: true,
    is_active: true,
  },
];

// Visual Poster & Stencil Identity per Kategori
const CATEGORY_VISUALS: Record<string, { 
  image: string; 
  headline: string; 
  subtitle: string; 
  elevation: string;
  badge: string; 
  terrain: string;
}> = {
  '60': {
    image: '/backgrounds/bg-categories.webp',
    headline: 'DISCOVERY 60KM',
    subtitle: 'REKREASI & PEMULA · SUKAMAKMUR',
    elevation: '+450 M GAIN',
    badge: 'NON-RACE // FUN',
    terrain: '65% ASPAL · 35% MAKADAM HALUS',
  },
  '120_SINGLE': {
    image: '/pesepeda.webp',
    headline: 'EXPLORER 120KM',
    subtitle: 'SOLO EXPEDITION · JONGGOL RIDGE',
    elevation: '+1,450 M GAIN',
    badge: 'SOLO EXPEDITION',
    terrain: 'GRAVEL & TANJAKAN JONGGOL',
  },
  '120_PAIR': {
    image: '/pesepeda2.webp',
    headline: 'PAIR RACE 120KM',
    subtitle: '2-RIDER TANDEM · PODIUM TOP 3',
    elevation: '+1,450 M GAIN',
    badge: 'OFFICIAL RACE // PODIUM',
    terrain: 'KOMPETISI TANDEM CAMPURAN',
  },
  '200': {
    image: '/perjalanan-siklis-di-jalur-oranye.webp',
    headline: 'ULTRA 200KM',
    subtitle: 'BRUTAL UNSUPPORTED · PITSTOP CP4',
    elevation: '+2,800 M GAIN',
    badge: 'ULTRA EXPEDITION',
    terrain: 'EKSPEDISI HUJAN & JALUR LIAR',
  },
  '150': {
    image: '/hero.webp',
    headline: 'ROAD 200KM',
    subtitle: 'ENDURANCE ASPHALT LOOP · SENTUL',
    elevation: '+2,100 M GAIN',
    badge: 'ROAD CHALLENGE',
    terrain: '100% ASPAL BERGELOMBANG',
  },
};

const JERSEY_SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export default function RegistrationPage() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<Category>(DEFAULT_CATEGORIES[2]); // Default 120_PAIR
  const [packageType, setPackageType] = useState<PackageType>('MEDAL_JERSEY');
  const [rpcMethod, setRpcMethod] = useState<'PICKUP' | 'HANDLING'>('PICKUP');

  const formSectionRef = useRef<HTMLDivElement>(null);

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

  // Ambil data live dari Supabase
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error('Menggunakan data kategori default:', err);
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

  const rpcHandlingFee = rpcMethod === 'HANDLING' ? 20000 : 0;
  const mealCouponDiscount = isEligibleForMealCoupon() ? 50000 : 0;
  const netPrice = Math.max(0, basePrice + rpcHandlingFee - mealCouponDiscount);

  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    // Smooth scroll down to registration configuration section
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Submit Final
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

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[600px] pointer-events-none opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 10%, rgba(250,109,11,0.2) 0%, transparent 65%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── JIKA ORDER SUDAH DIBUAT (HALAMAN INVOICE / SUKSES) ── */}
        {createdOrder ? (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Header Konfirmasi */}
            <div className="p-8 rounded-3xl border border-[#FA6D0B]/50 bg-gradient-to-b from-[#1C1F26] to-[#121418] text-center space-y-3 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FA6D0B] to-transparent" />
              
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-[#FA6D0B] text-black inline-block shadow-[0_0_15px_rgba(250,109,11,0.5)]">
                {createdOrder.payment_status === 'PAID' ? 'LUNAS // TERDAFTAR RESMI' : 'MENUNGGU PEMBAYARAN // PAYMENT PENDING'}
              </span>

              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
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
        ) : (
          /* ── JIKA FORMULIR NORMAL (DIRTYLAND-INSPIRED BUT FRESH & BESPOKE) ── */
          <div className="space-y-16">

            {/* Header Telemetri & Title */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono uppercase tracking-[0.25em] text-[#FA6D0B]">
                <span className="w-2 h-2 rounded-full bg-[#FA6D0B] animate-pulse" />
                GX-ID ATHLETE ROSTER // SEASON 2026
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                PILIH MEDAN <span className="text-[#FA6D0B]">TEMPUR</span> ANDA
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Setiap kategori adalah ekspedisi mandiri (*unsupported*) menembus koridor Jonggol–Sukamakmur–Sentul.
                Klik kategori di bawah untuk mengunci slot nomor dada Anda.
              </p>
            </div>

            {/* ── SECTION 1: ART-DIRECTED PHOTOGRAPHIC CATEGORY MONOLITHS ── */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2 font-mono text-xs text-slate-400">
                <span className="text-[#FA6D0B] font-bold uppercase tracking-widest">[01 // 5 KATEGORI RESMI]</span>
                <span className="uppercase tracking-widest text-[10px] text-slate-500">KLIK KARTU UNTUK MEMILIH</span>
              </div>

              {/* Grid 5 Kategori Bergaya Editorial Gravel Monolith */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {categories.map((cat) => {
                  const isSelected = selectedCategory?.id === cat.id;
                  const visual = CATEGORY_VISUALS[cat.id] || {
                    image: '/pesepeda.webp',
                    headline: cat.name.toUpperCase(),
                    subtitle: 'ULTRA ENDURANCE EXPEDITION',
                    elevation: '+1,450 M GAIN',
                    badge: 'OFFICIAL EXPEDITION',
                    terrain: 'GRAVEL & ASPAL',
                  };
                  const quotaPercent = Math.min(100, Math.round((cat.current_enrolled / cat.quota) * 100));

                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat)}
                      className={`relative h-[460px] sm:h-[490px] rounded-3xl overflow-hidden border transition-all duration-500 group cursor-pointer flex flex-col justify-between p-6 select-none ${
                        isSelected
                          ? 'border-2 border-[#FA6D0B] shadow-[0_0_40px_rgba(250,109,11,0.35)] ring-2 ring-[#FA6D0B]/40 scale-[1.01]'
                          : 'border-white/15 hover:border-white/40 hover:shadow-2xl hover:scale-[1.008]'
                      }`}
                    >
                      {/* Background Hero Photography */}
                      <Image
                        src={visual.image}
                        alt={cat.name}
                        fill
                        className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
                          isSelected ? 'filter brightness-105 saturate-110' : 'filter brightness-90 saturate-95 group-hover:brightness-100'
                        }`}
                        priority
                      />

                      {/* Dark Vignette & Atmospheric Film Shroud */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35 z-10 pointer-events-none" />

                      {/* Stencil Grid Pattern Texture Overlay */}
                      <div 
                        className="absolute inset-0 opacity-[0.12] z-10 pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
                          backgroundSize: '16px 16px'
                        }}
                      />

                      {/* ── TOP HUD TELEMETRY ── */}
                      <div className="relative z-20 flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider ${
                            isSelected ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.5)]' : 'bg-black/70 backdrop-blur-md text-white border border-white/20'
                          }`}>
                            {visual.badge}
                          </span>
                          <div className="text-[10px] font-mono font-bold text-slate-300 tracking-wider">
                            {visual.elevation} · COT {cat.cot_hours ? `${cat.cot_hours}H` : '-'}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">FLAG-OFF</span>
                          <span className="text-xs font-mono font-bold text-white">{cat.wave_start_time || '05:30'} WIB</span>
                        </div>
                      </div>

                      {/* ── CENTER STENCIL HEROIC TYPOGRAPHY ── */}
                      <div className="relative z-20 my-auto text-center space-y-2 py-4">
                        <div 
                          className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] leading-none transition-transform duration-300 group-hover:scale-105"
                          style={{
                            WebkitTextStroke: isSelected ? '1px rgba(250,109,11,0.8)' : '1px rgba(255,255,255,0.2)',
                            textShadow: isSelected ? '0 0 25px rgba(250,109,11,0.5)' : 'none'
                          }}
                        >
                          {visual.headline}
                        </div>

                        <p className="text-[11px] sm:text-xs font-mono font-bold text-[#FA6D0B] tracking-wider uppercase drop-shadow-md">
                          {visual.subtitle}
                        </p>

                        <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase pt-1">
                          {visual.terrain}
                        </div>
                      </div>

                      {/* ── BOTTOM INDUSTRIAL LEDGER & SELECTION BAR ── */}
                      <div className="relative z-20 space-y-3 border-t border-white/15 pt-3">
                        {/* Live Quota Progress */}
                        <div className="space-y-1 font-mono text-[10px]">
                          <div className="flex justify-between text-slate-300">
                            <span>KUOTA TERISI:</span>
                            <span className={quotaPercent > 80 ? 'text-[#FA6D0B] font-bold' : 'text-white font-bold'}>
                              {cat.current_enrolled}/{cat.quota} ({quotaPercent}%)
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                            <div 
                              className={`h-full transition-all duration-500 rounded-full ${isSelected ? 'bg-[#FA6D0B]' : 'bg-white/80'}`}
                              style={{ width: `${quotaPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Price & Action Button */}
                        <div className="flex items-center justify-between gap-3 pt-1">
                          <div>
                            <span className="text-[9px] font-mono text-slate-400 block uppercase">STARTING FROM:</span>
                            <span className="text-base font-mono font-black text-[#FA6D0B]">
                              {formatRupiah(cat.price_medal_only)}
                            </span>
                          </div>

                          <div className={`px-4 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.6)]'
                              : 'bg-black/80 backdrop-blur-md text-white border border-white/25 group-hover:border-[#FA6D0B] group-hover:text-[#FA6D0B]'
                          }`}>
                            <span>{isSelected ? 'TERPILIH' : 'PILIH RUTE'}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        </div>
                      </div>

                      {/* Active Corner Accent */}
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden z-30">
                          <div className="absolute top-2 right-[-24px] rotate-45 bg-[#FA6D0B] text-black font-mono font-black text-[9px] py-0.5 px-8 uppercase shadow-lg">
                            ACTIVE
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── SECTION 2: REGISTRATION CONFIGURATION & TELEMETRY FORM ── */}
            <div ref={formSectionRef} className="pt-8 border-t border-white/10 space-y-12">
              
              {/* Active Selected Category Banner */}
              <div className="p-6 rounded-3xl border border-[#FA6D0B]/40 bg-[#15171C] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FA6D0B] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest font-bold">KATEGORI TERKUNCI:</span>
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase text-white mt-0.5">
                    {selectedCategory.name}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Jarak: <span className="text-white font-bold">{selectedCategory.distance_km} KM</span> · 
                    Format: <span className="text-white font-bold">{selectedCategory.is_pair ? 'Tandem Tim (2 Riders)' : 'Solo Rider'}</span> · 
                    COT: <span className="text-white font-bold">{selectedCategory.cot_hours} Jam</span>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">ESTIMASI BIAYA DASAR:</span>
                  <span className="text-2xl font-mono font-black text-[#FA6D0B]">
                    {formatRupiah(netPrice)}
                  </span>
                </div>
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

              {/* Form Input Container */}
              <form onSubmit={handleFinalSubmit} className="space-y-10">

                {/* 2.1 Konfigurasi Paket & RPC Handling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Paket Medali vs Jersey */}
                  <div className="space-y-3">
                    <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      PILIHAN PAKET LOMBA <span className="text-[#FA6D0B]">*</span>
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
                          [REKOMENDASI GX-ID]
                        </span>
                        <div className="text-sm font-black text-white uppercase">MEDALI + FINISHER JERSEY</div>
                        <div className="font-mono text-sm text-[#FA6D0B] font-bold mt-1">
                          {formatRupiah(selectedCategory.price_medal_jersey)}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">
                          Termasuk official finisher jersey edisi spesial 8 tahun GX-ID.
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
                          [PAKET DASAR]
                        </span>
                        <div className="text-sm font-black text-white uppercase">MEDALI SAJA</div>
                        <div className="font-mono text-sm text-white font-bold mt-1">
                          {formatRupiah(selectedCategory.price_medal_only)}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">
                          Hanya medali finisher (tanpa jersey), slot dan asuransi tetap aktif.
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Pengambilan Race Pack */}
                  <div className="space-y-3">
                    <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      DISTRIBUSI RACE PACK (RPC) <span className="text-[#FA6D0B]">*</span>
                    </label>
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
                          Paket race pack dipersiapkan khusus dan dikirim ke alamat rumah Anda.
                        </p>
                      </button>
                    </div>
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

                {/* 2.2 Form Fields Rider 1 */}
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
                  /* 2.3 Form Fields Rider 2 */
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

                {/* 2.4 Safety Waiver & Agreement */}
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

                {/* 2.5 Submit Action Bar */}
                <div className="p-6 rounded-3xl border border-white/15 bg-gradient-to-r from-[#15171C] via-[#1A1D24] to-[#15171C] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">NOMINAL AKHIR PEMBAYARAN:</span>
                    <span className="text-2xl sm:text-3xl font-mono font-black text-[#FA6D0B] block">
                      {formatRupiah(netPrice)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !waiverAgreed}
                    className="w-full sm:w-auto px-9 py-4 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_30px_rgba(250,109,11,0.4)] hover:bg-[#DE5A00] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer"
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

              </form>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
