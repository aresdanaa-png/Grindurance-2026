'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Category, PackageType, JerseySize } from '@/lib/types';
import { PricingPhase } from '@/lib/data/categories';
import { RiderState, PromoState, PromoFeedback } from './types';
import DaftarRiderFormFields from './DaftarRiderFormFields';

interface DaftarFormStepProps {
  selectedCategory: Category;
  packageType: PackageType;
  setPackageType: (type: PackageType) => void;
  rpcMethod: 'PICKUP' | 'HANDLING';
  setRpcMethod: (method: 'PICKUP' | 'HANDLING') => void;
  pairActiveTab: 'rider1' | 'rider2';
  setPairActiveTab: (tab: 'rider1' | 'rider2') => void;
  rider1: RiderState;
  setRider1: React.Dispatch<React.SetStateAction<RiderState>>;
  rider2: RiderState;
  setRider2: React.Dispatch<React.SetStateAction<RiderState>>;
  promoCodeInput: string;
  setPromoCodeInput: (code: string) => void;
  appliedPromo: PromoState | null;
  promoFeedback: PromoFeedback;
  handleApplyPromo: () => void;
  handleRemovePromo: () => void;
  waiverAgreed: boolean;
  setWaiverAgreed: (agreed: boolean) => void;
  submitting: boolean;
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
  activePhase: PricingPhase;
  hasMealCouponPerk: boolean;
  netPrice: number;
  promoDiscount: number;
  rpcHandlingFee: number;
  jerseySizes: JerseySize[];
  race120SingleConfig: Category;
  race120PairConfig: Category;
  setSelectedCategory: (cat: Category) => void;
  onBackToDetail: () => void;
  onBackToSelect: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formatRupiah: (amount: number) => string;
  t: (id: string, eng: string) => string;
}

export default function DaftarFormStep({
  selectedCategory,
  packageType,
  setPackageType,
  rpcMethod,
  setRpcMethod,
  pairActiveTab,
  setPairActiveTab,
  rider1,
  setRider1,
  rider2,
  setRider2,
  promoCodeInput,
  setPromoCodeInput,
  appliedPromo,
  promoFeedback,
  handleApplyPromo,
  handleRemovePromo,
  waiverAgreed,
  setWaiverAgreed,
  submitting,
  errorMessage,
  setErrorMessage,
  activePhase,
  hasMealCouponPerk,
  netPrice,
  promoDiscount,
  rpcHandlingFee,
  jerseySizes,
  race120SingleConfig,
  race120PairConfig,
  setSelectedCategory,
  onBackToDetail,
  onBackToSelect,
  onSubmit,
  formatRupiah,
  t,
}: DaftarFormStepProps) {
  return (
    <div className="space-y-8 animate-slide-up-fade w-full max-w-7xl mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={onBackToDetail}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-[#FA6D0B] transition-colors cursor-pointer"
        >
          {t('← KEMBALI · DETAIL KATEGORI', '← BACK · CATEGORY DETAILS')}
        </button>

        <div className="text-xs sm:text-sm font-mono text-[#FA6D0B] uppercase tracking-widest font-bold">
          {t('TAHAP 03 / 03 · FORMULIR REGISTRASI ATLET', 'STAGE 03 / 03 · ATHLETE REGISTRATION FORM')}
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
            <span className="text-white/30 font-bold select-none">·</span>
            <span>{t('Format:', 'Format:')} <strong className="text-white font-black">{selectedCategory.is_pair ? t('Tandem Tim (2 Riders)', 'Pair Tandem (2 Riders)') : selectedCategory.id === '120_SINGLE' ? t('Individu / Sendiri (1 Rider)', 'Individual Solo (1 Rider)') : selectedCategory.id === 'VIRTUAL' ? t('Virtual Ride (19 Chapters)', 'Virtual Ride (19 Chapters)') : t('Solo Rider', 'Solo Rider')}</strong></span>
            <span className="text-white/30 font-bold select-none">·</span>
            <span>{t('COT:', 'COT:')} <strong className="text-white font-black">{selectedCategory.cot_hours ? `${selectedCategory.cot_hours} ${t('Jam', 'Hours')}` : t('Fleksibel', 'Flexible')}</strong></span>
            <span className="text-white/30 font-bold select-none">·</span>
            <span>{t('Flag-off:', 'Flag-off:')} <strong className="text-[#FA6D0B] font-black">{selectedCategory.wave_start_time || '05:30'} WIB</strong></span>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToSelect}
          className="px-7 sm:px-8 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-all cursor-pointer self-start lg:self-center shrink-0 active:scale-95"
        >
          {t('GANTI KATEGORI', 'CHANGE CATEGORY')}
        </button>
      </div>

      {/* Race Format Toggle: Single vs Pair */}
      {(selectedCategory.id === '120' || selectedCategory.id === '120_SINGLE' || selectedCategory.id === '120_PAIR') && (
        <div className="p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
              {t('PILIHAN FORMAT · 120 KM RACE', '120 KM RACE · FORMAT SELECTION')}
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
              onClick={() => setSelectedCategory(race120SingleConfig)}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                !selectedCategory.is_pair
                  ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] font-black'
                  : 'text-slate-400 hover:text-white font-bold hover:bg-white/[0.05]'
              }`}
            >
              {t('SENDIRI · 1 RIDER', 'SINGLE · 1 RIDER')}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory(race120PairConfig)}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                selectedCategory.is_pair
                  ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] font-black'
                  : 'text-slate-400 hover:text-white font-bold hover:bg-white/[0.05]'
              }`}
            >
              {t('PAIR MIX · 2 PAX', 'PAIR MIX · 2 PAX')}
            </button>
          </div>
        </div>
      )}

      {/* Error Message Box */}
      {errorMessage && (
        <div className="p-4 sm:p-5 rounded-2xl bg-black/90 text-white font-mono text-xs sm:text-sm flex items-center justify-between gap-3 animate-shake shadow-xl">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#FA6D0B] uppercase tracking-wider">{t('PERINGATAN DATA:', 'DATA ALERT:')}</span>
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
      <form onSubmit={onSubmit} className="space-y-8">
        {/* 3.1 PILIHAN PAKET ATLET */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                {t('PILIHAN PAKET ATLET · 2026 EDITION', 'ATHLETE PACKAGE OPTIONS · 2026 EDITION')}
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
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
                    <span>{selectedCategory.is_pair ? t('2x Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)', '2x Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)') : 'Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
                    <span>{t('Nomor Plat Sepeda Tahan Air #1000+ & QR Check-in', 'Waterproof Bike Number Plate #1000+ & QR Check-in')}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
                    <span>{t('Asuransi Kecelakaan Resmi 1 Hari Event', 'Official 1-Day Event Accident Insurance')}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
                    <span>{t('Nutrisi NDR Energy Gel + Isotonic Drink', 'NDR Energy Gel Nutrition + Isotonic Drink')}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
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
                    +{formatRupiah(selectedCategory.price_medal_jersey - selectedCategory.price_medal_only)} {selectedCategory.is_pair ? t('(TOTAL TIM)', '(TOTAL TEAM)') : '/ PAX'}
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
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
                    <span>{selectedCategory.is_pair ? t('2x Official Anniversary Aero Jersey by Pollride (Senilai Rp 700.000)', '2x Official Anniversary Aero Jersey by Pollride (IDR 700K Value)') : t('Official Anniversary Aero Jersey by Pollride (Senilai Rp 350.000)', 'Official Anniversary Aero Jersey by Pollride (IDR 350K Value)')}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
                    <span>{selectedCategory.is_pair ? t('2x Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)', '2x Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)') : 'Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
                    <span>{t('Nomor Plat Sepeda Tahan Air #1000+ & QR Check-in', 'Waterproof Bike Number Plate #1000+ & QR Check-in')}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
                    <span>{t('Asuransi Kecelakaan Resmi 1 Hari Event', 'Official 1-Day Event Accident Insurance')}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-bold text-base leading-none shrink-0 select-none mt-0.5">·</span>
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

        {/* 3.2 LOGISTIK RACE PACK & KODE PROMO */}
        <div className="rounded-2xl bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 p-6 sm:p-8 gap-6 lg:gap-0">
            {/* Column 1: Logistik */}
            <div className="flex flex-col justify-between lg:pr-8 space-y-5">
              <div className="space-y-2.5">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                  {selectedCategory.id === 'VIRTUAL' ? t('METODE PENGIRIMAN · VIRTUAL RIDE', 'SHIPPING METHOD · VIRTUAL RIDE') : t('PENGAMBILAN RACE PACK (RPC) · LOGISTIK', 'RACE PACK COLLECTION (RPC) · LOGISTICS')}
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-none">
                  {selectedCategory.id === 'VIRTUAL' ? t('PENGIRIMAN DHS LOGISTIK KE RUMAH', 'DHS HOME DELIVERY') : t('OPSI PENGAMBILAN PERLENGKAPAN', 'RACE PACK COLLECTION OPTIONS')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  {selectedCategory.id === 'VIRTUAL'
                    ? t('Medali cor logam resmi dan jersey akan dikirim via kurir DHS Logistik langsung ke alamat domisili Anda setelah verifikasi data Strava selesai. Bebas biaya handling.', 'Official medal and jersey delivered directly via DHS Logistics after Strava validation is complete. Free of handling charges.')
                    : t('Pilih opsi pengambilan starter kit (nomor plat sepeda waterproof #1000+, nutrisi NDR Drinkmix 83g, asuransi, & voucher ABBEY). Medali finisher diserahkan saat finish < COT, jersey via PO.', 'Choose your starter kit collection option (waterproof bike plate #1000+, NDR Drinkmix 83g, insurance, & ABBEY voucher). Finisher medal awarded at finish < COT, jersey fulfilled via PO.')}
                </p>
              </div>

              {selectedCategory.id !== 'VIRTUAL' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
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
                          {t('RPC DAY RESMI (H-7)', 'OFFICIAL RPC DAY (H-7)')}
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
                      {t('ABEEY Coffee & LRT Harjamukti Cibubur (Minggu, 6 Des 2026, 10:00–17:00 WIB). Termasuk Coaching Clinic & Technical Meeting.', 'ABEEY Coffee & LRT Harjamukti Cibubur (Sunday, Dec 6, 2026, 10:00–17:00 WIB). Includes Coaching Clinic & Technical Meeting.')}
                    </p>
                  </button>

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
                          {t('LAYANAN HARI-H', 'RACE-DAY DESK')}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase">
                          +Rp 20.000
                        </span>
                      </div>
                      <div className="text-sm sm:text-base font-black text-white uppercase font-sans">
                        {t('PENGAMBILAN HARI-H', 'RACE-DAY MORNING PICKUP')}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 mt-2 font-sans leading-relaxed">
                      {t('Khusus peserta luar kota / berhalangan hadir saat RPC. Diambil di meja panitia saat registrasi ulang fajar Hari-H (13 Des 2026, 04:30–05:15 WIB).', 'For out-of-town riders or unable to attend RPC. Collected at organizer desk during race dawn re-registration (Dec 13, 2026, 04:30–05:15 WIB).')}
                    </p>
                  </button>
                </div>
              )}
            </div>

            {/* Column 2: Promo Code */}
            <div className="flex flex-col justify-between lg:pl-8 space-y-5 pt-6 lg:pt-0">
              <div className="space-y-2.5">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                  {t('KODE PROMO · VOUCHER KOMUNITAS', 'PROMO CODE · COMMUNITY VOUCHER')}
                </span>
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
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      placeholder={t('MASUKKAN KODE PROMO', 'ENTER PROMO CODE')}
                      className="flex-1 px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm sm:text-base uppercase placeholder:text-slate-500 outline-none transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase tracking-wider bg-[#FA6D0B] text-black hover:bg-[#DE5A00] transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-md"
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
                      {t('KODE PROMO AKTIF · TERVERIFIKASI', 'ACTIVE PROMO CODE · VERIFIED')}
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

        {/* 3.3 HAK BENEFIT KUPON MAKAN */}
        {hasMealCouponPerk && (
          <div className="p-6 sm:p-7 rounded-2xl bg-black/60 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-xs sm:text-sm text-[#FA6D0B] uppercase tracking-wider">
                  {t('HAK BENEFIT KHUSUS ATLET ·', 'SPECIAL ATHLETE PRIVILEGE ·')}
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

        {/* 3.4 TAB SWITCHER UNTUK PAIR */}
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
              {t('01 · RIDER 1 (KAPTEN TIM)', '01 · RIDER 1 (TEAM CAPTAIN)')}
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
              {t('02 · RIDER 2 (PARTNER TIM)', '02 · RIDER 2 (TEAM PARTNER)')}
            </button>
          </div>
        )}

        {/* 3.5 & 3.6 IDENTITAS ATLET (RIDER 1 & RIDER 2) */}
        {(!selectedCategory.is_pair || pairActiveTab === 'rider1') && (
          <DaftarRiderFormFields
            rider={rider1}
            onChange={(updated) => setRider1((prev) => ({ ...prev, ...updated }))}
            riderRoleTitle={
              selectedCategory.is_pair
                ? t('IDENTITAS ATLET · RIDER 1 (KAPTEN TIM)', 'ATHLETE IDENTITY · RIDER 1 (TEAM CAPTAIN)')
                : t('IDENTITAS ATLET · PESERTA RESMI', 'ATHLETE IDENTITY · OFFICIAL RIDER')
            }
            riderRoleSubtitle={t(
              'Lengkapi data identitas resmi sesuai KTP atau Paspor untuk verifikasi asuransi dan nomor start.',
              'Complete official identity data as in ID or Passport for insurance and start number verification.'
            )}
            prefixId="r1"
            packageType={packageType}
            jerseySizes={jerseySizes}
            t={t}
          />
        )}

        {selectedCategory.is_pair && pairActiveTab === 'rider2' && (
          <DaftarRiderFormFields
            rider={rider2}
            onChange={(updated) => setRider2((prev) => ({ ...prev, ...updated }))}
            riderRoleTitle={t('IDENTITAS ATLET · RIDER 2 (PARTNER TIM)', 'ATHLETE IDENTITY · RIDER 2 (TEAM PARTNER)')}
            riderRoleSubtitle={t(
              'Lengkapi data identitas partner tim tandem sesuai KTP/Paspor untuk pendaftaran nomor BIB ganda dan asuransi resmi.',
              'Complete team partner identity data according to ID/Passport for dual BIB issuance and official insurance.'
            )}
            prefixId="r2"
            packageType={packageType}
            jerseySizes={jerseySizes}
            t={t}
          />
        )}

        {/* 3.7 SURAT PERNYATAAN & PELEPASAN TANGGUNG JAWAB (WAIVER) */}
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

        {/* 3.8 SUBMIT ACTION BAR */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs sm:text-sm font-mono text-slate-300 uppercase tracking-widest block font-bold">
              {t('TOTAL BIAYA REGISTRASI · TARIF FINAL', 'TOTAL REGISTRATION FEE · FINAL RATE')}
            </span>
            <div className="font-display italic text-4xl sm:text-5xl lg:text-6xl font-black text-[#FA6D0B] leading-none mt-2">
              {formatRupiah(netPrice)}
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-200 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span>{packageType === 'MEDAL_JERSEY' ? t('Paket Medal + Jersey', 'Medal + Jersey Package') : t('Paket Medal Saja', 'Medal Only Package')}</span>
              {rpcMethod === 'HANDLING' && selectedCategory?.id !== 'VIRTUAL' && (
                <>
                  <span className="text-white/30 font-bold select-none">·</span>
                  <span className="text-slate-200 font-semibold">+Rp 20.000 RPC</span>
                </>
              )}
              {hasMealCouponPerk && (
                <>
                  <span className="text-white/30 font-bold select-none">·</span>
                  <span className="text-white font-semibold">{t('+Voucher Makan Rp 50.000', '+IDR 50k Meal Voucher')}</span>
                </>
              )}
              {promoDiscount > 0 && appliedPromo && (
                <>
                  <span className="text-white/30 font-bold select-none">·</span>
                  <span className="text-[#FA6D0B] font-bold">-{formatRupiah(promoDiscount)} ({appliedPromo.code})</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0 justify-end">
            <button
              type="button"
              onClick={onBackToDetail}
              className="w-full sm:w-auto text-center px-7 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              {t('← DETAIL', '← DETAILS')}
            </button>

            <button
              type="submit"
              disabled={submitting || !waiverAgreed || activePhase === 'CLOSED'}
              className="relative overflow-hidden w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-full text-xs sm:text-base font-sans font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_35px_rgba(250,109,11,0.65)] hover:bg-[#DE5A00] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />
              {submitting ? (
                <span className="relative z-10">{t('MEMPROSES PENDAFTARAN...', 'PROCESSING REGISTRATION...')}</span>
              ) : activePhase === 'CLOSED' ? (
                <span className="relative z-10">{t('PENDAFTARAN RESMI DITUTUP (29 NOV)', 'REGISTRATION CLOSED (NOV 29)')}</span>
              ) : (
                <>
                  <span className="relative z-10">{t('KUNCI NOMOR DADA & TERBITKAN INVOICE', 'LOCK BIB NUMBER & ISSUE INVOICE')}</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out shrink-0" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
