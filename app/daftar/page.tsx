'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

const JERSEY_SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export default function RegistrationPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<Category>(DEFAULT_CATEGORIES[1]);
  const [packageType, setPackageType] = useState<PackageType>('MEDAL_JERSEY');
  const [rpcMethod, setRpcMethod] = useState<'PICKUP' | 'HANDLING'>('PICKUP');

  // Pair Active Tab in Step 2
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

  // Step 3 Waiver
  const [waiverAgreed, setWaiverAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Step 4 (Order & Confirmation)
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
          const defaultCat = data.categories.find((c: Category) => c.id === '120_SINGLE') || data.categories[0];
          setSelectedCategory(defaultCat);
        }
      } catch (err) {
        console.error('Menggunakan data kategori default:', err);
      }
    }
    fetchCategories();
  }, []);

  // Hitung Umur untuk Insentif Kupon Makan Rp 50.000
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

  // Kalkulasi Harga
  const basePrice = selectedCategory
    ? packageType === 'MEDAL_JERSEY'
      ? selectedCategory.price_medal_jersey
      : selectedCategory.price_medal_only
    : 0;

  const rpcHandlingFee = rpcMethod === 'HANDLING' ? 20000 : 0;
  const mealCouponDiscount = isEligibleForMealCoupon() ? 50000 : 0;
  const netPrice = Math.max(0, basePrice + rpcHandlingFee - mealCouponDiscount);

  // Validasi Step 2
  const handleProceedToStep3 = (e: React.FormEvent) => {
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
      setErrorMessage('MOHON LENGKAPI ALAMAT DOMISILI RIDER 1 DENGAN JELAS.');
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
        setErrorMessage('MOHON LENGKAPI ALAMAT DOMISILI RIDER 2 DENGAN JELAS.');
        return;
      }
    }

    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Final
  const handleFinalSubmit = async () => {
    if (!waiverAgreed) {
      setErrorMessage('ANDA WAJIB MENYETUJUI SURAT PERNYATAAN KESELAMATAN (WAIVER) SEBELUM MELANJUTKAN.');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');

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
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat menghubungi server.');
    } finally {
      setSubmitting(false);
    }
  };

  // Simulasi Bayar
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
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Subtle Ambience */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-20 z-0 bg-radial-gradient"
        style={{
          background: 'radial-gradient(circle at 50% 15%, rgba(250,109,11,0.18) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── 1. Telemetry Top Header ── */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono uppercase tracking-[0.2em] text-[#FA6D0B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
            GX-ID ATHLETE TELEMETRY // PORTAL PENDAFTARAN RESMI 2026
          </div>
          
          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            REGISTRASI ATLET <span className="text-[#FA6D0B]">GRINDURANCE 2026</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Ekspedisi balap sepeda ultra-endurance dan gravel mandiri (*unsupported*) koridor Jonggol–Sukamakmur–Sentul.
            Minggu, 13 Desember 2026.
          </p>
        </div>

        {/* ── 2. Industrial Stepper Navigation (RULES.md) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
          {[
            { num: 1, code: '01/04', title: 'KATEGORI & PAKET' },
            { num: 2, code: '02/04', title: 'DATA ATLET' },
            { num: 3, code: '03/04', title: 'SAFETY & WAIVER' },
            { num: 4, code: '04/04', title: 'INVOICE & BOOKING' },
          ].map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div
                key={s.num}
                className={`p-3 rounded-xl border transition-all duration-300 font-mono ${
                  isActive
                    ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 shadow-[0_0_20px_rgba(250,109,11,0.15)]'
                    : isDone
                    ? 'border-white/20 bg-white/[0.04] text-white'
                    : 'border-white/10 bg-black/40 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase mb-1">
                  <span className={isActive ? 'text-[#FA6D0B] font-bold' : isDone ? 'text-slate-300' : 'text-slate-600'}>
                    [{s.code}]
                  </span>
                  {isDone && <span className="text-emerald-400 font-bold">[SELESAI]</span>}
                  {isActive && <span className="text-[#FA6D0B] font-bold animate-pulse">[AKTIF]</span>}
                </div>
                <div className={`text-xs font-bold uppercase tracking-wider truncate ${isActive ? 'text-white' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                  {s.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 font-mono text-xs flex items-center justify-between gap-3">
            <div>
              <span className="font-bold text-red-400">[PERINGATAN SISTEM]</span> {errorMessage}
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="text-red-400 hover:text-white uppercase font-bold text-[10px] shrink-0"
            >
              [TUTUP]
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: KATEGORI & PAKET LOMBA */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-8">
            
            {/* Header Bagian */}
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest block">TAHAP 01 // SELEKSI RUTE</span>
                <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">PILIH KATEGORI JARAK EKSPEDISI</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:block">5 PILIHAN TERSERTIFIKASI</span>
            </div>

            {/* Grid Kartu Kategori */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const isSelected = selectedCategory?.id === cat.id;
                const quotaPercent = Math.min(100, Math.round((cat.current_enrolled / cat.quota) * 100));

                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-[#FA6D0B] bg-[#15171C] shadow-[0_0_25px_rgba(250,109,11,0.2)] ring-1 ring-[#FA6D0B]'
                        : 'border-white/10 bg-[#121418] hover:border-white/20 hover:bg-[#15171C]'
                    }`}
                  >
                    <div>
                      {/* Top Metric Bar */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isSelected ? 'bg-[#FA6D0B] text-black' : 'bg-white/10 text-white'
                        }`}>
                          {cat.distance_km} KM
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                          {cat.is_pair ? '[PAIR 2 RIDERS]' : '[SOLO RIDER]'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-base sm:text-lg font-black uppercase text-white tracking-wide mb-1 group-hover:text-[#FA6D0B] transition-colors">
                        {cat.name}
                      </h3>

                      {/* COT & Wave */}
                      <div className="font-mono text-[11px] text-slate-400 space-y-1 mb-4">
                        <div>COT: <span className="text-white font-bold">{cat.cot_hours ? `${cat.cot_hours} JAM` : 'NO COT'}</span></div>
                        <div>FLAG-OFF: <span className="text-white font-bold">{cat.wave_start_time || '05:30'} WIB</span></div>
                      </div>

                      {/* Quota Meter */}
                      <div className="space-y-1.5 mb-4 font-mono text-[10px]">
                        <div className="flex justify-between text-slate-400">
                          <span>KUOTA TERISI:</span>
                          <span className={quotaPercent > 80 ? 'text-[#FA6D0B] font-bold' : 'text-slate-300 font-bold'}>
                            {cat.current_enrolled}/{cat.quota} ({quotaPercent}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#FA6D0B] transition-all duration-500 rounded-full"
                            style={{ width: `${quotaPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase">MULAI DARI:</span>
                        <span className="text-sm font-bold text-[#FA6D0B]">
                          {formatRupiah(cat.price_medal_only)}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#FA6D0B]' : 'text-slate-500'}`}>
                        {isSelected ? '[TERPILIH]' : '[PILIH]'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pilihan Paket & RPC Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              
              {/* Paket Lomba */}
              <div className="space-y-3">
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  PILIHAN PAKET ATLET <span className="text-[#FA6D0B]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPackageType('MEDAL_JERSEY')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      packageType === 'MEDAL_JERSEY'
                        ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]'
                        : 'border-white/10 bg-[#121418] hover:border-white/20'
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block mb-1">
                      [REKOMENDASI KOMUNITAS]
                    </span>
                    <div className="text-sm font-bold text-white uppercase">MEDALI + JERSEY</div>
                    <div className="font-mono text-xs text-[#FA6D0B] font-bold mt-1">
                      {formatRupiah(selectedCategory?.price_medal_jersey || 0)}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-sans">
                      Termasuk Jersey Finisher eksklusif GX-ID edisi ulang tahun ke-8.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageType('MEDAL_ONLY')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      packageType === 'MEDAL_ONLY'
                        ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]'
                        : 'border-white/10 bg-[#121418] hover:border-white/20'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                      [PAKET BASE]
                    </span>
                    <div className="text-sm font-bold text-white uppercase">MEDALI SAJA</div>
                    <div className="font-mono text-xs text-white font-bold mt-1">
                      {formatRupiah(selectedCategory?.price_medal_only || 0)}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-sans">
                      Paket hemat tanpa finisher jersey, medali tetap diberikan di garis finish.
                    </p>
                  </button>
                </div>
              </div>

              {/* Metode Pengambilan Race Pack */}
              <div className="space-y-3">
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  PENGAMBILAN RACE PACK (RPC) <span className="text-[#FA6D0B]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRpcMethod('PICKUP')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      rpcMethod === 'PICKUP'
                        ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]'
                        : 'border-white/10 bg-[#121418] hover:border-white/20'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                      [GRATIS // FREE]
                    </span>
                    <div className="text-sm font-bold text-white uppercase">AMBIL DI CIBUBUR</div>
                    <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">
                      Lokasi: ABEEY Coffee &amp; Eatery, LRT Harjamukti, Cibubur (11–12 Des 2026).
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRpcMethod('HANDLING')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      rpcMethod === 'HANDLING'
                        ? 'border-[#FA6D0B] bg-[#FA6D0B]/10 ring-1 ring-[#FA6D0B]'
                        : 'border-white/10 bg-[#121418] hover:border-white/20'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-[#FA6D0B] font-bold uppercase tracking-wider block mb-1">
                      [+RP 20.000]
                    </span>
                    <div className="text-sm font-bold text-white uppercase">HANDLING &amp; KIRIM</div>
                    <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">
                      Paket race pack dikirim langsung ke alamat domisili atlet sebelum event.
                    </p>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Bar Estimasi & Tombol Next */}
            <div className="p-5 rounded-2xl border border-white/15 bg-[#15171C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">RINGKASAN PILIHAN:</span>
                <div className="text-sm font-bold text-white uppercase">
                  {selectedCategory?.name} · {packageType === 'MEDAL_JERSEY' ? 'MEDALI + JERSEY' : 'MEDALI SAJA'}
                </div>
                <div className="font-mono text-xs text-[#FA6D0B] font-bold mt-0.5">
                  ESTIMASI BIAYA: {formatRupiah(netPrice)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_25px_rgba(250,109,11,0.3)] hover:bg-[#DE5A00] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>LANJUT: INPUT DATA ATLET</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: FORMULIR DATA ATLET */}
        {/* ========================================================================= */}
        {step === 2 && (
          <form onSubmit={handleProceedToStep3} className="space-y-8">
            
            {/* Header Bagian */}
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest block">TAHAP 02 // DATA ATLET &amp; TIM</span>
                <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                  {selectedCategory?.is_pair ? 'TELEMETRI RIDER PAIR (2 PESERTA)' : 'TELEMETRI RIDER TUNGGAL'}
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:block">KATEGORI: {selectedCategory?.name}</span>
            </div>

            {/* Banner Insentif Kupon Makan Jika Memenuhi Syarat */}
            {isEligibleForMealCoupon() && (
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-400">[INSENTIF GX-ID AKTIF]</span> Diskon Kupon Makan Rp 50.000 otomatis dipotong dari invoice Anda.
                </div>
                <span className="text-emerald-400 font-bold shrink-0 text-[10px] uppercase tracking-wider">[-RP 50.000]</span>
              </div>
            )}

            {/* Switcher Tab untuk Kategori Pair */}
            {selectedCategory?.is_pair && (
              <div className="flex border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setPairActiveTab('rider1')}
                  className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all ${
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
                  className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all ${
                    pairActiveTab === 'rider2'
                      ? 'border-[#FA6D0B] text-[#FA6D0B] bg-white/[0.02]'
                      : 'border-transparent text-slate-500 hover:text-white'
                  }`}
                >
                  [02] RIDER 2 // PARTNER TIM
                </button>
              </div>
            )}

            {/* Form Fields: Rider 1 (atau Rider 2 jika pairActiveTab === 'rider2') */}
            {(!selectedCategory?.is_pair || pairActiveTab === 'rider1') ? (
              <div className="space-y-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest pb-1 border-b border-white/5">
                  IDENTITAS RESMI RIDER 1 {selectedCategory?.is_pair && '(KAPTEN)'}
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
                      placeholder="Contoh: Raden Bagus Prakoso"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      NOMOR INDUK KEPENDUDUKAN (NIK / PASPOR) <span className="text-[#FA6D0B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={rider1.nik}
                      onChange={(e) => setRider1({ ...rider1, nik: e.target.value.replace(/\D/g, '') })}
                      placeholder="Contoh: 3201012345670001 (16 digit)"
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
                        className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all ${
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
                        className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all ${
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
                      placeholder="Nama Keluarga / Pasangan"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      KOMUNITAS / KLUB SEPEDA (OPSIONAL)
                    </label>
                    <input
                      type="text"
                      value={rider1.community_chapter}
                      onChange={(e) => setRider1({ ...rider1, community_chapter: e.target.value })}
                      placeholder="Contoh: GX-ID Bogor / Solo Gravel Club"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                    />
                  </div>

                  {packageType === 'MEDAL_JERSEY' && (
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        UKURAN JERSEY FINISHER <span className="text-[#FA6D0B]">*</span>
                      </label>
                      <div className="grid grid-cols-6 gap-1.5">
                        {JERSEY_SIZES.map((sz) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setRider1({ ...rider1, jersey_size: sz })}
                            className={`py-3 rounded-lg border text-xs font-mono font-bold transition-all ${
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
                </div>

                {/* Integrasi Alamat Domisili */}
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
              /* Form Fields: Rider 2 (Jika Pair) */
              <div className="space-y-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest pb-1 border-b border-white/5">
                  IDENTITAS RESMI RIDER 2 (PARTNER TIM)
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
                      placeholder="Nama Sesuai KTP"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      NIK PARTNER (16 DIGIT) <span className="text-[#FA6D0B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={rider2.nik}
                      onChange={(e) => setRider2({ ...rider2, nik: e.target.value.replace(/\D/g, '') })}
                      placeholder="Contoh: 3201012345670002"
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
                        className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all ${
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
                        className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all ${
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
                      UKURAN JERSEY PARTNER <span className="text-[#FA6D0B]">*</span>
                    </label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {JERSEY_SIZES.map((sz) => (
                        <button
                          type="button"
                          key={sz}
                          onClick={() => setRider2({ ...rider2, jersey_size: sz })}
                          className={`py-3 rounded-lg border text-xs font-mono font-bold transition-all ${
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

            {/* Navigation Buttons Step 2 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
              >
                ← KEMBALI // GANTI KATEGORI
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_25px_rgba(250,109,11,0.3)] hover:bg-[#DE5A00] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>LANJUT: PROTOKOL KESELAMATAN</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: PROTOKOL KESELAMATAN & WAIVER */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="space-y-8">
            
            {/* Header Bagian */}
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest block">TAHAP 03 // SAFETY &amp; WAIVER</span>
                <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">PROTOKOL KESELAMATAN MANDIRI (UNSUPPORTED)</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:block">PERNYATAAN RESMI ATLET</span>
            </div>

            {/* Kotak Protokol Ultra-Endurance */}
            <div className="p-6 rounded-2xl border border-white/15 bg-[#121418] space-y-4 font-mono text-xs leading-relaxed text-slate-300">
              <div className="text-[#FA6D0B] font-bold text-sm tracking-wider uppercase border-b border-white/10 pb-2">
                5 PRINSIP DASAR KESELAMATAN GRINDURANCE 2026:
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex gap-3">
                  <span className="text-[#FA6D0B] font-bold shrink-0">[01]</span>
                  <div>
                    <strong className="text-white block">LALU LINTAS TERBUKA (OPEN TRAFFIC ROAD):</strong>
                    Jalur lomba adalah jalan raya umum yang tidak disterilkan. Peserta wajib mematuhi seluruh peraturan lalu lintas RI, rambu jalan, dan mengutamakan keselamatan diri serta pengguna jalan lainnya.
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-[#FA6D0B] font-bold shrink-0">[02]</span>
                  <div>
                    <strong className="text-white block">PERLENGKAPAN WAJIB (MANDATORY GEAR):</strong>
                    Peserta wajib memakai helm standar keselamatan bersepeda yang terkunci selama gowes, lampu depan (min. 400 lumens), lampu belakang merah (statis &amp; berkedip), dan rompi/tali reflektif bercahaya di malam hari.
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-[#FA6D0B] font-bold shrink-0">[03]</span>
                  <div>
                    <strong className="text-white block">PRINSIP MANDIRI (SELF-SUPPORTED):</strong>
                    Dilarang menggunakan kendaraan pengawal pribadi (*support car*), mobil evakuasi khusus, atau melakukan *drafting* di belakang kendaraan bermotor. Bantuan pihak ketiga hanya diperbolehkan jika tersedia untuk umum secara komersial di rute.
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-[#FA6D0B] font-bold shrink-0">[04]</span>
                  <div>
                    <strong className="text-white block">PROTOKOL DNF (DID NOT FINISH):</strong>
                    Jika peserta tidak mampu melanjutkan karena kendala fisik, mekanik, atau cuaca ekstrem, wajib melapor ke Race Control Center melalui WhatsApp darurat panitia dan mengatur evakuasi mandiri.
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-[#FA6D0B] font-bold shrink-0">[05]</span>
                  <div>
                    <strong className="text-white block">PELEPASAN TANGGUNG JAWAB (LIABILITY WAIVER):</strong>
                    Peserta secara sadar memahami risiko cedera fisik dalam olahraga endurance luar ruang dan membebaskan panitia GX-ID serta sponsor dari segala tuntutan hukum akibat kelalaian pribadi.
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Checkbox Persetujuan */}
            <label className="p-4 rounded-xl border border-white/15 bg-[#15171C] flex items-start gap-3 cursor-pointer hover:border-[#FA6D0B] transition-colors select-none">
              <input
                type="checkbox"
                checked={waiverAgreed}
                onChange={(e) => setWaiverAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 text-[#FA6D0B] focus:ring-[#FA6D0B] bg-black/60 accent-[#FA6D0B]"
              />
              <span className="text-xs text-white font-mono leading-relaxed">
                SAYA TELAH MEMBACA, MEMAHAMI, DAN SECARA SADAR MENYETUJUI SELURUH PROTOKOL KESELAMATAN SERTA SURAT PERNYATAAN MANDIRI (WAIVER) GRINDURANCE 2026. SAYA MENJAMIN DATA YANG DIINPUT ADALAH BENAR DAN VALID.
              </span>
            </label>

            {/* Ringkasan Final Sebelum Submit */}
            <div className="p-5 rounded-2xl border border-white/10 bg-black/40 font-mono text-xs space-y-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-2 border-b border-white/5 pb-1">
                RINGKASAN TELEMETRI TRANSAKSI:
              </span>
              <div className="flex justify-between">
                <span className="text-slate-400">KATEGORI:</span>
                <span className="text-white font-bold">{selectedCategory?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PAKET ATLET:</span>
                <span className="text-white font-bold">{packageType === 'MEDAL_JERSEY' ? 'MEDALI + JERSEY FINISHER' : 'MEDALI SAJA'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PENGAMBILAN RPC:</span>
                <span className="text-white font-bold">{rpcMethod === 'PICKUP' ? 'AMBIL DI CIBUBUR (GRATIS)' : 'HANDLING & KIRIM (+RP 20.000)'}</span>
              </div>
              {mealCouponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>INSENTIF KUPON MAKAN GX-ID:</span>
                  <span>- Rp 50.000</span>
                </div>
              )}
              <div className="flex justify-between border-t border-white/10 pt-2 text-sm">
                <span className="text-white font-bold">TOTAL NOMINAL:</span>
                <span className="text-[#FA6D0B] font-bold">{formatRupiah(netPrice)}</span>
              </div>
            </div>

            {/* Tombol Aksi Step 3 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
              >
                ← KEMBALI // EDIT DATA ATLET
              </button>

              <button
                type="button"
                disabled={submitting || !waiverAgreed}
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_30px_rgba(250,109,11,0.35)] hover:bg-[#DE5A00] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                {submitting ? (
                  <span>MEMPROSES PENDAFTARAN...</span>
                ) : (
                  <>
                    <span>KONFIRMASI &amp; BUAT INVOICE PENDAFTARAN</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: INVOICE RESMI, BOOKING ID & PEMBAYARAN */}
        {/* ========================================================================= */}
        {step === 4 && createdOrder && (
          <div className="space-y-8">
            
            {/* Header Konfirmasi */}
            <div className="p-6 rounded-2xl border border-[#FA6D0B]/50 bg-[#FA6D0B]/10 text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#FA6D0B] text-black inline-block">
                STATUS: {createdOrder.payment_status === 'PAID' ? 'LUNAS // TERDAFTAR RESMI' : 'MENUNGGU PEMBAYARAN // PAYMENT PENDING'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                INVOICE RESERVASI PENDAFTARAN
              </h2>
              <div className="font-mono text-sm text-slate-300">
                KODE ORDER: <span className="text-[#FA6D0B] font-bold text-base">{createdOrder.order_id}</span>
              </div>
            </div>

            {/* Rincian Tagihan Finansial */}
            <div className="p-6 rounded-2xl border border-white/15 bg-[#15171C] space-y-4 font-mono">
              <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                RINCIAN PEMBAYARAN RESMI:
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>BIAYA PENDAFTARAN KATEGORI:</span>
                  <span className="font-bold">{formatRupiah(createdOrder.gross_amount - (rpcMethod === 'HANDLING' ? 20000 : 0))}</span>
                </div>

                {rpcMethod === 'HANDLING' && (
                  <div className="flex justify-between text-slate-300">
                    <span>BIAYA LAYANAN HANDLING &amp; PACKAGING:</span>
                    <span className="font-bold">Rp 20.000</span>
                  </div>
                )}

                {createdOrder.discount_meal_coupon > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>INSENTIF KUPON MAKAN GX-ID:</span>
                    <span>- {formatRupiah(createdOrder.discount_meal_coupon)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-white/10 pt-3 text-base text-white">
                  <div>
                    <span className="font-bold block">TOTAL TRANSFER RESMI:</span>
                    <span className="text-[10px] text-slate-400 block font-normal">Pastikan nominal transfer sesuai angka di bawah.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black text-[#FA6D0B] block">
                      {formatRupiah(createdOrder.net_amount)}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(createdOrder.net_amount.toString(), 'nominal')}
                      className="text-[10px] text-slate-400 hover:text-white uppercase font-bold tracking-wider mt-1"
                    >
                      {copiedField === 'nominal' ? '[NOMINAL DISALIN!]' : '[SALIN NOMINAL]'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruksi Transfer Bank / QRIS */}
            <div className="p-6 rounded-2xl border border-white/15 bg-[#121418] space-y-4 font-mono">
              <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                REKENING RESMI PANITIA GX-ID:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-black/60 space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">BANK CENTRAL ASIA (BCA)</span>
                  <div className="text-lg font-bold text-white tracking-widest">8831 2948 20</div>
                  <div className="text-[11px] text-slate-400">A.N. GX-ID INDONESIA / GRINDURANCE</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('8831294820', 'bca')}
                    className="text-[10px] text-[#FA6D0B] hover:text-white uppercase font-bold tracking-wider pt-1 block"
                  >
                    {copiedField === 'bca' ? '[REKENING DISALIN!]' : '[SALIN NO REKENING]'}
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-black/60 space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">BANK MANDIRI</span>
                  <div className="text-lg font-bold text-white tracking-widest">133 00 2819 4021</div>
                  <div className="text-[11px] text-slate-400">A.N. PANITIA GRINDURANCE 2026</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('1330028194021', 'mandiri')}
                    className="text-[10px] text-[#FA6D0B] hover:text-white uppercase font-bold tracking-wider pt-1 block"
                  >
                    {copiedField === 'mandiri' ? '[REKENING DISALIN!]' : '[SALIN NO REKENING]'}
                  </button>
                </div>
              </div>
            </div>

            {/* Digital BIB Preview */}
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-2 flex items-center justify-between">
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

            {/* Sandbox Testing Action & Navigation Buttons */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#15171C] flex flex-col sm:flex-row items-center justify-between gap-4">
              {createdOrder.payment_status !== 'PAID' && (
                <button
                  type="button"
                  disabled={simulatingPayment}
                  onClick={handleSimulatePayment}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {simulatingPayment ? '[MEMPROSES SIMULASI...]' : '[SIMULASI PEMBAYARAN BERHASIL (SANDBOX)]'}
                </button>
              )}

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link
                  href="/peserta"
                  className="px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.04] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>LIHAT START LIST</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.25)] hover:bg-[#DE5A00] transition-all"
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
