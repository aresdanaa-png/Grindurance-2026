'use client';

import { useState, useEffect } from 'react';
import { 
  Award, Shield, Users, CheckCircle2, ChevronRight, ChevronLeft, 
  Sparkles, AlertCircle, CreditCard, RefreshCw, Bike, Clock, 
  MapPin, Check, QrCode, HeartPulse, IdCard, BookOpen
} from 'lucide-react';
import { Category, PackageType, JerseySize, Gender, Order, Participant } from '@/lib/types';
import BibCard from '@/components/BibCard';
import IndonesiaAddressSelect, { AddressData } from '@/components/IndonesiaAddressSelect';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function RegistrationPage() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Pilihan Langkah 1
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [packageType, setPackageType] = useState<PackageType>('MEDAL_JERSEY');
  const [rpcMethod, setRpcMethod] = useState<'PICKUP' | 'HANDLING'>('PICKUP');

  // Input Langkah 2 (Rider 1)
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

  // Input Langkah 2 (Rider 2 - Jika Pair)
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

  // Langkah 3
  const [waiverAgreed, setWaiverAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hasil Setelah Submit (Langkah 4 / Sukses)
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [createdParticipants, setCreatedParticipants] = useState<Participant[]>([]);
  const [simulatingPayment, setSimulatingPayment] = useState(false);

  // Ambil data kategori dari database Supabase saat halaman dimuat
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
          if (data.categories.length > 0) {
            setSelectedCategory(data.categories[0]);
          }
        }
      } catch (err) {
        console.error('Gagal memuat kategori:', err);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // Hitung Umur untuk Kupon Makan
  const getAge = (birthDateString: string) => {
    if (!birthDateString) return 25;
    const today = new Date();
    const birth = new Date(birthDateString);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // Cek kualifikasi Meal Coupon Rp 50.000
  const isEligibleForMealCoupon = () => {
    if (!selectedCategory) return false;
    if (!selectedCategory.is_pair) {
      return rider1.gender === 'female' || getAge(rider1.birth_date) <= 17;
    } else {
      // Pair: berhak jika bukan Men & Men
      const isMenAndMen = rider1.gender === 'male' && rider2.gender === 'male';
      return !isMenAndMen;
    }
  };

  // Hitung Estimasi Biaya
  const basePrice = selectedCategory
    ? packageType === 'MEDAL_JERSEY'
      ? selectedCategory.price_medal_jersey
      : selectedCategory.price_medal_only
    : 0;

  const rpcHandlingFee = rpcMethod === 'HANDLING' ? 20000 : 0;
  const mealCouponDiscount = isEligibleForMealCoupon() ? 50000 : 0;
  const netPrice = Math.max(0, basePrice + rpcHandlingFee - mealCouponDiscount);

  // Submit Registrasi (Langkah 2 ke Langkah 3)
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validasi Rider 1
    if (!rider1.full_name || !rider1.nik || !rider1.email || !rider1.phone_number || !rider1.emergency_contact_phone) {
      setErrorMessage('Mohon lengkapi semua data wajib Rider 1 (Termasuk NIK dan Kontak Darurat).');
      return;
    }
    if (rider1.nik.trim().length !== 16) {
      setErrorMessage('Nomor NIK Rider 1 harus terdiri dari 16 digit angka sesuai KTP.');
      return;
    }
    if (!rider1.province_id || !rider1.regency_id || !rider1.district_id || !rider1.address_detail) {
      setErrorMessage('Mohon lengkapi alamat domisili Rider 1 (Provinsi, Kab/Kota, Kecamatan, dan Alamat Detail).');
      return;
    }

    // Validasi Rider 2 (Jika Pair)
    if (selectedCategory?.is_pair) {
      if (!rider2.full_name || !rider2.nik || !rider2.email || !rider2.phone_number || !rider2.emergency_contact_phone) {
        setErrorMessage('Mohon lengkapi semua data wajib Rider 2 (Partner).');
        return;
      }
      if (rider2.nik.trim().length !== 16) {
        setErrorMessage('Nomor NIK Rider 2 harus terdiri dari 16 digit angka sesuai KTP.');
        return;
      }
      if (!rider2.province_id || !rider2.regency_id || !rider2.district_id || !rider2.address_detail) {
        setErrorMessage('Mohon lengkapi alamat domisili Rider 2 (Provinsi, Kab/Kota, Kecamatan, dan Alamat Detail).');
        return;
      }
    }
    setStep(3);
  };

  // Final Submit Pendaftaran
  const handleFinalSubmit = async () => {
    if (!waiverAgreed) {
      setErrorMessage('Anda wajib menyetujui pernyataan keselamatan dan pelepasan tanggung jawab.');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        category_id: selectedCategory?.id,
        package_type: packageType,
        rpc_method: rpcMethod,
        rider_1: rider1,
        rider_2: selectedCategory?.is_pair ? rider2 : undefined,
        waiver_agreed: waiverAgreed,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Gagal mendaftar.');
      }

      setCreatedOrder(result.order);
      setCreatedParticipants(result.participants);
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setSubmitting(false);
    }
  };

  // Trigger Simulasi Bayar Instan (Dev Mode)
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

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Wizard */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          {t('Registrasi Resmi GX-ID', 'Official GX-ID Registration')}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {t('Pendaftaran', 'Registration')} <span className="gradient-gold-text">Grindurance 2026</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          {t('Pilih kategori jarak, lengkapi identitas rider, dan amankan slot nomor dada Anda secara instan.', 'Select distance category, complete rider profile, and secure your race bib number instantly.')}
        </p>

        {/* Indikator Langkah */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 max-w-xl mx-auto">
          {[
            { num: 1, label: t('Kategori & Paket', 'Category & Package') },
            { num: 2, label: t('Data Rider', 'Rider Details') },
            { num: 3, label: t('Review & Bayar', 'Review & Pay') },
            { num: 4, label: t('E-Ticket', 'E-Ticket') },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  step === item.num
                    ? 'bg-brand-gold text-brand-dark ring-4 ring-brand-gold/20'
                    : step > item.num
                    ? 'bg-brand-green text-white'
                    : 'bg-brand-card border border-brand-border text-slate-500'
                }`}
              >
                {step > item.num ? <Check className="w-4 h-4 stroke-[3]" /> : item.num}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${step === item.num ? 'text-white' : 'text-slate-500'}`}>
                {item.label}
              </span>
              {item.num < 4 && <div className="w-4 sm:w-8 h-0.5 bg-brand-border mx-1" />}
            </div>
          ))}
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LANGKAH 1: PILIH KATEGORI & PAKET */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="space-y-8">
          {/* Toggle Pilihan Paket: Medal Saja vs Medal & Jersey */}
          <div className="bg-brand-card p-4 sm:p-6 rounded-2xl border border-brand-border">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-gold" />
              {t('1. Pilih Opsi Paket Perlengkapan', '1. Choose Gear Package Option')}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {t('Semua peserta berhak mendapatkan Medali Finisher resmi & Asuransi Kecelakaan terbatas hari-H.', 'All participants receive an official Finisher Medal & race-day limited accident insurance.')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPackageType('MEDAL_JERSEY')}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  packageType === 'MEDAL_JERSEY'
                    ? 'bg-brand-cardHover border-brand-gold ring-2 ring-brand-gold/20 shadow-glow'
                    : 'bg-brand-dark/50 border-brand-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    {t('Paket Medal & Official Jersey', 'Official Medal & Jersey Package')}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-brand-gold text-brand-dark">
                    {t('Direkomendasikan', 'Recommended')}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {t('Termasuk Jersey Eksklusif Anniversary Edition + Medali Logam Finisher + Asuransi.', 'Includes Exclusive Anniversary Edition Jersey + Finisher Metal Medal + Insurance.')}
                </p>
                <div className="mt-3 text-xs font-semibold text-brand-gold">
                  {t('+ Rp 50.000 dari paket medali saja', '+ IDR 50,000 from medal-only package')}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPackageType('MEDAL_ONLY')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  packageType === 'MEDAL_ONLY'
                    ? 'bg-brand-cardHover border-brand-gold ring-2 ring-brand-gold/20 shadow-glow'
                    : 'bg-brand-dark/50 border-brand-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">
                    {t('Paket Medal Saja', 'Medal Only Package')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
                    {t('Ekonomis', 'Standard')}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {t('Termasuk Medali Logam Finisher + e-Sertifikat + Asuransi Kecelakaan (Tanpa Jersey).', 'Includes Finisher Metal Medal + e-Certificate + Accident Insurance (No Jersey).')}
                </p>
                <div className="mt-3 text-xs font-semibold text-slate-400">
                  {t('Harga tiket dasar', 'Base entry rate')}
                </div>
              </button>
            </div>
          </div>

          {/* Pemilihan Kategori Jarak */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Bike className="w-5 h-5 text-brand-orange" />
              {t('2. Pilih Kategori Tantangan Jarak', '2. Select Distance Challenge Category')}
            </h3>

            {loadingCategories ? (
              <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-3">
                <RefreshCw className="w-5 h-5 animate-spin" />
                {t('Memuat kategori resmi dari server...', 'Loading official categories from server...')}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const isSelected = selectedCategory?.id === cat.id;
                  const price = packageType === 'MEDAL_JERSEY' ? cat.price_medal_jersey : cat.price_medal_only;
                  const isFull = cat.current_enrolled >= cat.quota;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => !isFull && setSelectedCategory(cat)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isFull
                          ? 'opacity-50 cursor-not-allowed bg-brand-dark/40 border-slate-800'
                          : isSelected
                          ? 'bg-brand-cardHover border-brand-gold ring-2 ring-brand-gold/30 shadow-glow'
                          : 'bg-brand-card border-brand-border hover:border-slate-600'
                      }`}
                    >
                      {cat.prologue_required_km > 0 && (
                        <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400">
                          {t(`Wajib Prolog ${cat.prologue_required_km} KM`, `Mandatory ${cat.prologue_required_km} KM Prologue`)}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                            {cat.category_type}
                          </span>
                          {cat.is_pair && (
                            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              Pair (2 Pax)
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-black text-white">{cat.name}</h4>
                        <div className="text-2xl font-black text-brand-gold mt-2">
                          Rp {Number(price).toLocaleString('id-ID')}
                        </div>

                        <div className="mt-4 space-y-1.5 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>COT: {cat.cot_hours ? `${cat.cot_hours} ${t('Jam', 'Hours')}` : t('Fleksibel', 'Flexible')}</span>
                            {cat.wave_start_time && (
                              <span className="text-slate-600">| Start: {cat.wave_start_time.slice(0, 5)} WIB</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          {t('Slot:', 'Slots:')} {cat.current_enrolled}/{cat.quota}
                        </span>
                        <span className={`font-bold ${isSelected ? 'text-brand-gold' : 'text-slate-400'}`}>
                          {isSelected ? t('✓ Terpilih', '✓ Selected') : t('Pilih Kategori', 'Select Category')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Metode Pengambilan Race Pack (RPC) */}
          <div className="bg-brand-card p-4 sm:p-6 rounded-2xl border border-brand-border">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-orange" />
              {t('3. Pilih Metode Pengambilan Race Pack (RPC)', '3. Choose Race Pack Collection Method')}
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {t('Race pack berisi Nomor Plat Sepeda resmi, Jersey Pollride (jika paket jersey), Suplemen NDR, dan Asuransi Hari-H.', 'Race pack includes official Bike Plate, Pollride Jersey (if jersey package), NDR nutrition, and race-day insurance.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRpcMethod('PICKUP')}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  rpcMethod === 'PICKUP'
                    ? 'bg-brand-cardHover border-brand-gold ring-2 ring-brand-gold/20 shadow-glow'
                    : 'bg-brand-dark/50 border-brand-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    {t('Ambil Mandiri saat RPC Day', 'Self-Pickup on RPC Day')}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {t('Gratis / Rp 0', 'Free / IDR 0')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('Diambil saat RPC Day, Coaching Clinic & Technical Meeting pada Minggu, 6 Des 2026 di ABEEY Coffee Cibubur.', 'Collected during RPC Day, Coaching Clinic & Technical Meeting on Sunday, Dec 6, 2026 at ABEEY Coffee Cibubur.')}
                </p>
                <div className="mt-3 text-[11px] font-semibold text-emerald-400">
                  {t('✓ Tanpa biaya tambahan', '✓ No additional fee')}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRpcMethod('HANDLING')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  rpcMethod === 'HANDLING'
                    ? 'bg-brand-cardHover border-brand-orange ring-2 ring-brand-orange/30 shadow-glow'
                    : 'bg-brand-dark/50 border-brand-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    {t('Handling Fee Khusus', 'Special Handling Fee')}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FA6D0B] text-black">
                    +Rp 20.000
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('Bagi peserta yang berhalangan hadir saat RPC Day. Disiapkan via handling khusus panitia / pengambilan saat Hari-H dengan verifikasi e-ticket.', 'For riders unable to attend RPC Day. Prepared via special marshal handling / race-day collection with e-ticket verification.')}
                </p>
                <div className="mt-3 text-[11px] font-semibold text-[#FA6D0B]">
                  {t('+ Rp 20.000 biaya layanan logistik', '+ IDR 20,000 logistics handling fee')}
                </div>
              </button>
            </div>
          </div>

          {/* Tombol Lanjut ke Langkah 2 */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!selectedCategory}
              onClick={() => setStep(2)}
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{t('Lanjut ke Data Rider', 'Continue to Rider Details')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LANGKAH 2: FORM DATA RIDER (SINGLE / PAIR) */}
      {/* ========================================================================= */}
      {step === 2 && (
        <form onSubmit={handleProceedToReview} className="space-y-8">
          {/* Banner Kategori yang Dipilih */}
          <div className="bg-brand-card p-4 rounded-xl border border-brand-border flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">{t('Kategori Terpilih:', 'Selected Category:')}</span>
              <span className="text-base font-bold text-white">
                {selectedCategory?.name} ({packageType === 'MEDAL_JERSEY' ? t('Medal & Jersey', 'Medal & Jersey') : t('Medal Saja', 'Medal Only')})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-brand-gold hover:underline font-semibold"
            >
              {t('Ubah Kategori', 'Change Category')}
            </button>
          </div>

          {/* FORM RIDER 1 */}
          <div className="bg-brand-card p-6 sm:p-7 rounded-2xl border border-brand-border space-y-5">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FA6D0B]" />
                {selectedCategory?.is_pair ? t('Data Rider 1 (Kapten Tim)', 'Rider 1 Details (Team Captain)') : t('Data Peserta', 'Participant Details')}
              </h3>
              <span className="text-xs text-slate-400">{t('* Wajib diisi', '* Required')}</span>
            </div>

            {/* Bagian 1: Identitas Pribadi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Nama Lengkap Sesuai KTP *', 'Full Name as on ID/Passport *')}</label>
                <input
                  type="text"
                  required
                  value={rider1.full_name}
                  onChange={(e) => setRider1({ ...rider1, full_name: e.target.value })}
                  placeholder={t('Contoh: Budi Pratama', 'e.g., John Doe')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-slate-300 font-semibold">{t('NIK No (16 Digit) *', 'National ID / Passport *')}</label>
                  <span className={`text-[10px] font-mono ${rider1.nik.length === 16 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                    {rider1.nik.length}/16
                  </span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={rider1.nik}
                  onChange={(e) => setRider1({ ...rider1, nik: e.target.value.replace(/\D/g, '') })}
                  placeholder={t('Contoh: 320117XXXXXXXXXX', 'e.g., 320117XXXXXXXXXX')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-mono tracking-wider focus:border-[#FA6D0B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Agama / Kepercayaan *', 'Religion / Belief *')}</label>
                <select
                  required
                  value={rider1.religion}
                  onChange={(e) => setRider1({ ...rider1, religion: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                >
                  <option value="Islam">Islam</option>
                  <option value="Kristen Protestan">{t('Kristen Protestan', 'Protestant Christian')}</option>
                  <option value="Katolik">{t('Katolik', 'Catholic')}</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Khonghucu">Khonghucu</option>
                  <option value="Penghayat Kepercayaan">{t('Penghayat Kepercayaan', 'Traditional Belief')}</option>
                  <option value="Lainnya">{t('Lainnya', 'Other')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Jenis Kelamin *', 'Gender *')}</label>
                <select
                  value={rider1.gender}
                  onChange={(e) => setRider1({ ...rider1, gender: e.target.value as Gender })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                >
                  <option value="male">{t('Laki-laki', 'Male')}</option>
                  <option value="female">{t('Perempuan (Berhak Kupon Makan Rp 50.000)', 'Female (Eligible for IDR 50K Meal Voucher)')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Tanggal Lahir *', 'Date of Birth *')}</label>
                <input
                  type="date"
                  required
                  value={rider1.birth_date}
                  onChange={(e) => setRider1({ ...rider1, birth_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Email Aktif *', 'Active Email *')}</label>
                <input
                  type="email"
                  required
                  value={rider1.email}
                  onChange={(e) => setRider1({ ...rider1, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">{t('No. WhatsApp / HP *', 'WhatsApp / Phone Number *')}</label>
                <input
                  type="tel"
                  required
                  value={rider1.phone_number}
                  onChange={(e) => setRider1({ ...rider1, phone_number: e.target.value })}
                  placeholder="08123456789"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Komunitas / Chapter GX-ID', 'GX-ID Chapter / Community')}</label>
                <input
                  type="text"
                  value={rider1.community_chapter}
                  onChange={(e) => setRider1({ ...rider1, community_chapter: e.target.value })}
                  placeholder={t('Contoh: GX-ID Bogor / Umum', 'e.g., GX-ID Jakarta / General')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                />
              </div>

              {packageType === 'MEDAL_JERSEY' && (
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Ukuran Jersey *', 'Jersey Size *')}</label>
                  <select
                    value={rider1.jersey_size}
                    onChange={(e) => setRider1({ ...rider1, jersey_size: e.target.value as JerseySize })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  >
                    <option value="XS">XS ({t('Dada 86-90 cm', 'Chest 86-90 cm')})</option>
                    <option value="S">S ({t('Dada 91-95 cm', 'Chest 91-95 cm')})</option>
                    <option value="M">M ({t('Dada 96-100 cm', 'Chest 96-100 cm')})</option>
                    <option value="L">L ({t('Dada 101-105 cm', 'Chest 101-105 cm')})</option>
                    <option value="XL">XL ({t('Dada 106-110 cm', 'Chest 106-110 cm')})</option>
                    <option value="XXL">XXL ({t('Dada 111-115 cm', 'Chest 111-115 cm')})</option>
                  </select>
                </div>
              )}
            </div>

            {/* Bagian 2: Alamat Lengkap & Wilayah Indonesia (Dropdown API Bertingkat) */}
            <IndonesiaAddressSelect
              prefixId="rider1-addr"
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
              onChange={(updated) => setRider1({ ...rider1, ...updated })}
            />

            {/* Bagian 3: Medis & Kontak Darurat */}
            <div className="pt-2 border-t border-brand-border/60 space-y-3">
              <label className="text-xs text-slate-200 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <HeartPulse className="w-3.5 h-3.5 text-red-500" />
                {t('Kesehatan & Kesiapsiagaan Medis Darurat (SPGDT RS Hermina Cibubur)', 'Emergency Medical Preparedness (SPGDT RS Hermina Cibubur)')}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Golongan Darah', 'Blood Type')}</label>
                  <select
                    value={rider1.blood_type}
                    onChange={(e) => setRider1({ ...rider1, blood_type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                    <option value="-">{t('Tidak Tahu / Belum Cek', 'Unknown / Not Checked')}</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    {t('Alergi / Medic Alert (Catatan Medis Khusus)', 'Allergies / Medic Alert (Special Medical Notes)')}
                  </label>
                  <input
                    type="text"
                    value={rider1.medical_notes}
                    onChange={(e) => setRider1({ ...rider1, medical_notes: e.target.value })}
                    placeholder={t('Cth: Alergi Penisilin, Asma dingin, Hipertensi, atau ketik \'Tidak Ada\'', 'e.g., Penicillin Allergy, Cold Asthma, Hypertension, or \'None\'')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {t('Informasi ini sangat penting untuk kesiapsiagaan tim medis di jalur balap.', 'This information is critical for race medical team preparedness along the route.')}
                  </span>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Kontak Darurat (Nama & Hubungan) *', 'Emergency Contact (Name & Relationship) *')}</label>
                  <input
                    type="text"
                    required
                    value={rider1.emergency_contact_name}
                    onChange={(e) => setRider1({ ...rider1, emergency_contact_name: e.target.value })}
                    placeholder={t('Contoh: Siti (Istri / Saudara)', 'e.g., Sarah (Spouse / Relative)')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('No. HP Kontak Darurat *', 'Emergency Contact Phone *')}</label>
                  <input
                    type="tel"
                    required
                    value={rider1.emergency_contact_phone}
                    onChange={(e) => setRider1({ ...rider1, emergency_contact_phone: e.target.value })}
                    placeholder="08987654321"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FORM RIDER 2 (HANYA MUNCUL JIKA KATEGORI PAIR) */}
          {selectedCategory?.is_pair && (
            <div className="bg-brand-card p-6 sm:p-7 rounded-2xl border border-brand-border space-y-5">
              <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  {t('Data Rider 2 (Partner Tim)', 'Rider 2 Details (Team Partner)')}
                </h3>
                <span className="text-xs text-slate-400">{t('* Wajib diisi', '* Required')}</span>
              </div>

              {/* Bagian 1: Identitas Pribadi Rider 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Nama Lengkap Sesuai KTP *', 'Full Name as on ID/Passport *')}</label>
                  <input
                    type="text"
                    required
                    value={rider2.full_name}
                    onChange={(e) => setRider2({ ...rider2, full_name: e.target.value })}
                    placeholder={t('Contoh: Rina Kusuma', 'e.g., Jane Smith')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-slate-300 font-semibold">{t('NIK No (16 Digit) *', 'National ID / Passport *')}</label>
                    <span className={`text-[10px] font-mono ${rider2.nik.length === 16 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                      {rider2.nik.length}/16
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={rider2.nik}
                    onChange={(e) => setRider2({ ...rider2, nik: e.target.value.replace(/\D/g, '') })}
                    placeholder={t('Contoh: 320117XXXXXXXXXX', 'e.g., 320117XXXXXXXXXX')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-mono tracking-wider focus:border-[#FA6D0B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Agama / Kepercayaan *', 'Religion / Belief *')}</label>
                  <select
                    required
                    value={rider2.religion}
                    onChange={(e) => setRider2({ ...rider2, religion: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  >
                    <option value="Islam">Islam</option>
                    <option value="Kristen Protestan">{t('Kristen Protestan', 'Protestant Christian')}</option>
                    <option value="Katolik">{t('Katolik', 'Catholic')}</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Khonghucu">Khonghucu</option>
                    <option value="Penghayat Kepercayaan">{t('Penghayat Kepercayaan', 'Traditional Belief')}</option>
                    <option value="Lainnya">{t('Lainnya', 'Other')}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Jenis Kelamin *', 'Gender *')}</label>
                  <select
                    value={rider2.gender}
                    onChange={(e) => setRider2({ ...rider2, gender: e.target.value as Gender })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  >
                    <option value="female">{t('Perempuan', 'Female')}</option>
                    <option value="male">{t('Laki-laki', 'Male')}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Tanggal Lahir *', 'Date of Birth *')}</label>
                  <input
                    type="date"
                    required
                    value={rider2.birth_date}
                    onChange={(e) => setRider2({ ...rider2, birth_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Email Aktif *', 'Active Email *')}</label>
                  <input
                    type="email"
                    required
                    value={rider2.email}
                    onChange={(e) => setRider2({ ...rider2, email: e.target.value })}
                    placeholder="partner@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('No. WhatsApp / HP *', 'WhatsApp / Phone Number *')}</label>
                  <input
                    type="tel"
                    required
                    value={rider2.phone_number}
                    onChange={(e) => setRider2({ ...rider2, phone_number: e.target.value })}
                    placeholder="08198765432"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Komunitas / Chapter GX-ID', 'GX-ID Chapter / Community')}</label>
                  <input
                    type="text"
                    value={rider2.community_chapter}
                    onChange={(e) => setRider2({ ...rider2, community_chapter: e.target.value })}
                    placeholder={t('Contoh: GX-ID Bogor / Umum', 'e.g., GX-ID Jakarta / General')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                  />
                </div>

                {packageType === 'MEDAL_JERSEY' && (
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Ukuran Jersey Rider 2 *', 'Rider 2 Jersey Size *')}</label>
                    <select
                      value={rider2.jersey_size}
                      onChange={(e) => setRider2({ ...rider2, jersey_size: e.target.value as JerseySize })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                    >
                      <option value="XS">XS ({t('Dada 86-90 cm', 'Chest 86-90 cm')})</option>
                      <option value="S">S ({t('Dada 91-95 cm', 'Chest 91-95 cm')})</option>
                      <option value="M">M ({t('Dada 96-100 cm', 'Chest 96-100 cm')})</option>
                      <option value="L">L ({t('Dada 101-105 cm', 'Chest 101-105 cm')})</option>
                      <option value="XL">XL ({t('Dada 106-110 cm', 'Chest 106-110 cm')})</option>
                      <option value="XXL">XXL ({t('Dada 111-115 cm', 'Chest 111-115 cm')})</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Bagian 2: Alamat Lengkap & Wilayah Indonesia Rider 2 */}
              <IndonesiaAddressSelect
                prefixId="rider2-addr"
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
                onChange={(updated) => setRider2({ ...rider2, ...updated })}
              />

              {/* Bagian 3: Medis & Kontak Darurat Rider 2 */}
              <div className="pt-2 border-t border-brand-border/60 space-y-3">
                <label className="text-xs text-slate-200 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <HeartPulse className="w-3.5 h-3.5 text-red-500" />
                  {t('Kesehatan & Kesiapsiagaan Medis Darurat Rider 2', 'Rider 2 Emergency Medical Preparedness')}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Golongan Darah', 'Blood Type')}</label>
                    <select
                      value={rider2.blood_type}
                      onChange={(e) => setRider2({ ...rider2, blood_type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                      <option value="-">{t('Tidak Tahu / Belum Cek', 'Unknown / Not Checked')}</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-slate-300 font-semibold block mb-1">
                      {t('Alergi / Medic Alert (Catatan Medis Khusus)', 'Allergies / Medic Alert (Special Medical Notes)')}
                    </label>
                    <input
                      type="text"
                      value={rider2.medical_notes}
                      onChange={(e) => setRider2({ ...rider2, medical_notes: e.target.value })}
                      placeholder={t('Cth: Alergi Makanan, Asma dingin, atau ketik \'Tidak Ada\'', 'e.g., Food Allergy, Cold Asthma, or \'None\'')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">{t('Kontak Darurat (Nama & Hubungan) *', 'Emergency Contact (Name & Relationship) *')}</label>
                    <input
                      type="text"
                      required
                      value={rider2.emergency_contact_name}
                      onChange={(e) => setRider2({ ...rider2, emergency_contact_name: e.target.value })}
                      placeholder={t('Contoh: Budi (Keluarga)', 'e.g., David (Family)')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">{t('No. HP Kontak Darurat *', 'Emergency Contact Phone *')}</label>
                    <input
                      type="tel"
                      required
                      value={rider2.emergency_contact_phone}
                      onChange={(e) => setRider2({ ...rider2, emergency_contact_phone: e.target.value })}
                      placeholder="08112233445"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs focus:border-[#FA6D0B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifikasi Kupon Makan GX-ID */}
          {isEligibleForMealCoupon() && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold block">{t('Selamat! Pendaftaran Anda Berhak Mendapatkan Meal Coupon Rp 50.000!', 'Congratulations! Your registration qualifies for an IDR 50,000 Meal Coupon!')}</span>
                <span>{t('Potongan kupon makan Rp 50.000 otomatis dipotongkan pada invoice pembayaran Anda di langkah berikutnya.', 'The IDR 50,000 meal voucher is automatically deducted from your invoice on the next step.')}</span>
              </div>
            </div>
          )}

          {/* Tombol Navigasi */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-xl border border-brand-border text-slate-300 hover:bg-brand-card text-sm font-semibold flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('Kembali', 'Back')}</span>
            </button>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow flex items-center gap-2"
            >
              <span>{t('Lanjut ke Review Invoice', 'Continue to Review Invoice')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* LANGKAH 3: REVIEW INVOICE, WAIVER & CHECKOUT */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-brand-card p-6 sm:p-8 rounded-2xl border border-brand-border">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-brand-gold" />
              {t('Ringkasan Pesanan (Invoice)', 'Order Summary (Invoice)')}
            </h3>

            {/* Rincian Tagihan */}
            <div className="space-y-3 border-b border-brand-border/60 pb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">{t('Kategori Tantangan', 'Challenge Category')}</span>
                <span className="text-white font-bold">{selectedCategory?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('Pilihan Paket', 'Package Selection')}</span>
                <span className="text-white font-semibold">
                  {packageType === 'MEDAL_JERSEY' ? t('Medal & Official Jersey', 'Official Medal & Jersey') : t('Medal Saja', 'Medal Only')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('Peserta Terdaftar', 'Registered Riders')}</span>
                <span className="text-white font-medium">
                  {selectedCategory?.is_pair ? `${rider1.full_name} & ${rider2.full_name}` : rider1.full_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('Harga Tiket Dasar', 'Base Ticket Price')}</span>
                <span className="text-white">Rp {Number(basePrice).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('Metode Pengambilan RPC', 'RPC Collection Method')}</span>
                <span className="text-white font-medium">
                  {rpcMethod === 'PICKUP' 
                    ? t('Ambil Mandiri (RPC Day 6 Des 2026 - Rp 0)', 'Self-Pickup (RPC Day Dec 6, 2026 - Free)') 
                    : t('Handling Fee Khusus (+Rp 20.000)', 'Special Handling Fee (+IDR 20,000)')}
                </span>
              </div>
              {rpcMethod === 'HANDLING' && (
                <div className="flex justify-between text-[#FA6D0B] font-semibold">
                  <span>{t('Biaya Layanan Handling RPC', 'RPC Logistics Handling Fee')}</span>
                  <span>+ Rp 20.000</span>
                </div>
              )}
              {mealCouponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>{t('Insentif Kupon Makan (GX-ID Voucher)', 'Meal Coupon Incentive (GX-ID Voucher)')}</span>
                  <span>- Rp {mealCouponDiscount.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>

            {/* Verifikasi Data Identitas & Medis Peserta */}
            <div className="py-4 border-b border-brand-border/60 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                {t('Ringkasan Identitas & Medis Peserta:', 'Participant Identity & Medical Summary:')}
              </span>
              <div className="p-3.5 rounded-xl bg-brand-dark/90 border border-brand-border text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FA6D0B]" />
                    {rider1.full_name} ({rider1.gender === 'male' ? t('L', 'M') : t('P', 'F')})
                  </span>
                  <span className="font-mono text-slate-400">{t('NIK', 'ID')}: {rider1.nik}</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  <span className="text-slate-500 font-semibold">{t('Alamat:', 'Address:')}</span> {rider1.address_detail}, {rider1.village_name ? `${rider1.village_name}, ` : ''}{rider1.district_name}, {rider1.regency_name}, {rider1.province_name} {rider1.postal_code}
                </div>
                <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1 border-t border-brand-border/40">
                  <span><strong className="text-slate-300">{t('Agama:', 'Religion:')}</strong> {rider1.religion}</span>
                  <span><strong className="text-slate-300">{t('Gol. Darah:', 'Blood Type:')}</strong> {rider1.blood_type}</span>
                  <span><strong className="text-slate-300">{t('Medic Alert:', 'Medic Alert:')}</strong> {rider1.medical_notes || t('Tidak Ada', 'None')}</span>
                  <span><strong className="text-slate-300">{t('Kontak Darurat:', 'Emergency Contact:')}</strong> {rider1.emergency_contact_name} ({rider1.emergency_contact_phone})</span>
                </div>
              </div>

              {selectedCategory?.is_pair && (
                <div className="p-3.5 rounded-xl bg-brand-dark/90 border border-brand-border text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      {rider2.full_name} ({rider2.gender === 'male' ? t('L', 'M') : t('P', 'F')}) - {t('Partner', 'Partner')}
                    </span>
                    <span className="font-mono text-slate-400">{t('NIK', 'ID')}: {rider2.nik}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">
                    <span className="text-slate-500 font-semibold">{t('Alamat:', 'Address:')}</span> {rider2.address_detail}, {rider2.village_name ? `${rider2.village_name}, ` : ''}{rider2.district_name}, {rider2.regency_name}, {rider2.province_name} {rider2.postal_code}
                  </div>
                  <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1 border-t border-brand-border/40">
                    <span><strong className="text-slate-300">{t('Agama:', 'Religion:')}</strong> {rider2.religion}</span>
                    <span><strong className="text-slate-300">{t('Gol. Darah:', 'Blood Type:')}</strong> {rider2.blood_type}</span>
                    <span><strong className="text-slate-300">{t('Medic Alert:', 'Medic Alert:')}</strong> {rider2.medical_notes || t('Tidak Ada', 'None')}</span>
                    <span><strong className="text-slate-300">{t('Kontak Darurat:', 'Emergency Contact:')}</strong> {rider2.emergency_contact_name} ({rider2.emergency_contact_phone})</span>
                  </div>
                </div>
              )}
            </div>

            {/* Total Akhir */}
            <div className="pt-6 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">{t('Total Pembayaran', 'Total Payment')}</span>
                <span className="text-2xl sm:text-3xl font-black gradient-gold-text">
                  Rp {netPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="text-right text-xs text-slate-500">
                {t('100% Aman & Transparan', '100% Secure & Transparent')}
              </div>
            </div>
          </div>

          {/* Persetujuan Waiver Risiko Wajib */}
          <div className="bg-brand-dark/80 p-5 rounded-2xl border border-brand-border space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-orange" />
              {t('Pernyataan Pelepasan Tanggung Jawab (Safety & Risk Waiver)', 'Safety & Risk Liability Waiver')}
            </h4>
            <div className="text-xs text-slate-400 leading-relaxed bg-brand-card/60 p-4 rounded-xl border border-brand-border/60 max-h-36 overflow-y-auto">
              {t(
                'Saya memahami dan menyetujui bahwa Gravel Grindurance 2026 adalah kegiatan bersepeda mandiri (unsupported / self-supported). Saya menyatakan dalam kondisi fisik prima dan sepeda saya layak jalan dengan sistem rem pakem. Segala risiko keselamatan, material, dan kesehatan di jalan raya maupun lintasan gravel adalah tanggung jawab pribadi saya sepenuhnya, serta melepaskan pihak penyelenggara (GX-ID) dari segala tuntutan hukum.',
                'I understand and agree that Gravel Grindurance 2026 is an unsupported / self-supported cycling expedition. I declare that I am in prime physical condition and my bicycle is roadworthy with functional brakes. All safety, material, and health risks on public roads and gravel tracks are solely my personal responsibility, and I release the organizers (GX-ID) from any legal liability.'
              )}
            </div>
            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={waiverAgreed}
                onChange={(e) => setWaiverAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-brand-border bg-brand-dark text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-xs text-slate-300 font-medium">
                {t('Saya telah membaca, memahami, dan menyetujui seluruh ketentuan di atas. *', 'I have read, understood, and agree to all terms above. *')}
              </span>
            </label>
          </div>

          {/* Tombol Selesaikan Pendaftaran */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl border border-brand-border text-slate-300 hover:bg-brand-card text-sm font-semibold flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('Kembali', 'Back')}</span>
            </button>

            <button
              type="button"
              disabled={!waiverAgreed || submitting}
              onClick={handleFinalSubmit}
              className="px-8 py-4 rounded-xl font-black text-sm bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('Memproses Pendaftaran...', 'Processing Registration...')}</span>
                </>
              ) : (
                <>
                  <span>{t('Konfirmasi & Buat Pesanan', 'Confirm & Place Order')}</span>
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LANGKAH 4: ORDER CREATED & SIMULASI PEMBAYARAN INSTAN */}
      {/* ========================================================================= */}
      {step === 4 && createdOrder && (
        <div className="space-y-6 animate-fadeIn">
          {createdOrder.payment_status === 'PAID' ? (
            /* KONDISI LUNAS */
            <div className="bg-brand-card p-6 sm:p-10 rounded-3xl border-2 border-brand-gold shadow-glow text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{t('Pembayaran Terverifikasi Lunas', 'Payment Verified & Confirmed')}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {t('Selamat Datang di ', 'Welcome to ')}<span className="gradient-gold-text">Grindurance 2026!</span>
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Invoice <span className="font-sans font-bold text-white tracking-wider">{createdOrder.order_id}</span> {t('telah lunas.', 'has been settled.')}
                </p>
              </div>

              {/* Kartu Nomor BIB Balap Resmi (Interactive & Downloadable) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
                {createdParticipants.map((p) => (
                  <BibCard
                    key={p.id}
                    bibNumber={p.bib_number || 'PENDING'}
                    fullName={p.full_name}
                    categoryName={selectedCategory?.name || 'Gravel Grindurance'}
                    distanceKm={selectedCategory?.distance_km || 0}
                    riderRole={p.rider_role}
                    bloodType={p.blood_type}
                    medicalNotes={p.medical_notes}
                    communityChapter={p.community_chapter}
                    qrHash={p.qr_checkin_hash || undefined}
                    registrationCode={p.registration_code}
                  />
                ))}
              </div>

              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {t('Nomor BIB Anda otomatis tersimpan di database resmi. Panduan teknis rute (.gpx) dan jadwal pengambilan race pack akan kami kirimkan menjelang event.', 'Your BIB number is officially recorded in the database. Technical route GPX files and race pack collection schedules will be sent prior to the event.')}
              </p>
            </div>
          ) : (
            /* KONDISI MENUNGGU PEMBAYARAN */
            <div className="bg-brand-card p-6 sm:p-8 rounded-2xl border border-brand-border space-y-6">
              <div className="border-b border-brand-border pb-4">
                <span className="text-xs text-brand-orange font-bold uppercase tracking-wider block">
                  {t('Status: Menunggu Pembayaran', 'Status: Awaiting Payment')}
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {t('Tagihan Pesanan:', 'Order Invoice:')} <span className="font-sans font-bold tracking-wider text-brand-gold">{createdOrder.order_id}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {t('Selesaikan pembayaran sebesar ', 'Complete payment of ')}<span className="text-white font-bold">Rp {Number(createdOrder.net_amount).toLocaleString('id-ID')}</span>{t(' untuk mengaktifkan nomor BIB Anda.', ' to activate your official BIB number.')}
                </p>
              </div>

              {/* Pilihan Cara Bayar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Metode Transfer Bank / QRIS */}
                <div className="bg-brand-dark/70 p-5 rounded-xl border border-brand-border space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-brand-gold" />
                    {t('QRIS & Transfer Bank', 'QRIS & Bank Transfer')}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t('Pembayaran via Virtual Account & QRIS Dinamis Midtrans akan segera diaktifkan. Untuk saat ini Anda dapat menguji seluruh sistem menggunakan tombol simulator di sebelah kanan.', 'Payment via Virtual Account & Dynamic Midtrans QRIS is enabled. For development/testing, you can test the end-to-end flow using the instant simulator on the right.')}
                  </p>
                </div>

                {/* Simulator Pembayaran Instan (Khusus Mode Dev) */}
                <div className="bg-gradient-to-br from-brand-cardHover to-brand-dark p-5 rounded-xl border border-brand-gold/40 shadow-glow space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-gold" />
                      {t('Simulator Pembayaran Instan', 'Instant Payment Simulator')}
                    </h4>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-brand-gold text-brand-dark">
                      Dev Testing
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t('Klik tombol di bawah untuk menyimulasikan notifikasi lunas dari bank. Database akan otomatis mengeksekusi trigger, menerbitkan nomor BIB (#6001, #8001, dst.), dan meng-update kuota secara real-time.', 'Click the button below to simulate confirmed bank payment. The database trigger automatically issues your BIB number and updates quotas in real time.')}
                  </p>
                  <button
                    type="button"
                    disabled={simulatingPayment}
                    onClick={handleSimulatePayment}
                    className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-brand-gold text-brand-dark hover:brightness-110 shadow-glow transition-all flex items-center justify-center gap-2"
                  >
                    {simulatingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{t('Menerbitkan Nomor BIB...', 'Issuing BIB Number...')}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t('Simulasikan Pembayaran Lunas Sekarang', 'Simulate Successful Payment Now')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
