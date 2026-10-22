'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CANONICAL_PRICE_TABLE, 
  getActivePricingPhase, 
  PricingPhase, 
  PriceTableRow 
} from '@/lib/data/categories';
import { useLanguage } from '@/lib/context/LanguageContext';
import Button from '@/components/ui/Button';

export default function PriceListSection() {
  const { language, t } = useLanguage();
  const [activePhase, setActivePhase] = useState<PricingPhase>('EARLY_BIRD');
  const [selectedPhase, setSelectedPhase] = useState<'EARLY_BIRD' | 'REGULAR'>('EARLY_BIRD');

  useEffect(() => {
    const phase = getActivePricingPhase();
    setActivePhase(phase);
    setSelectedPhase(phase === 'REGULAR' ? 'REGULAR' : 'EARLY_BIRD');
  }, []);

  const priceRows: PriceTableRow[] = CANONICAL_PRICE_TABLE;

  return (
    <section id="daftar-harga" className="py-12 sm:py-16 text-white relative">
      
      {/* Background Ambient Radial Glow (Electric Orange Accent) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-mono font-black text-[#FA6D0B] uppercase tracking-widest block">
                {t('DAFTAR BIAYA PENDAFTARAN RESMI · 2026', 'OFFICIAL REGISTRATION PRICE LIST · 2026')}
              </span>
              <span className="text-white/20 select-none">·</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                GX-ID ANNIVERSARY
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              {t('PAKET PENDAFTARAN RESMI', 'OFFICIAL ENTRY PACKAGES')}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
              {t(
                'Dua pilihan paket pendaftaran: Paket Medal Saja (esensial) atau Paket Lengkap Medal & Aero Jersey Pollride. Seluruh kategori telah mencakup asuransi resmi hari-H.',
                'Two package tiers: Medal Only (essential) or Complete Medal & Pollride Aero Jersey. All categories automatically include official race-day insurance.'
              )}
            </p>
          </div>

          {/* Official Registry Status */}
          <div className="flex flex-col items-start md:items-end space-y-1.5 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs uppercase tracking-wider">
              <span className="text-[#FA6D0B] font-bold">STATUS //</span>
              <span className="text-white font-bold">
                {activePhase === 'EARLY_BIRD'
                  ? t('FASE 1 AKTIF', 'PHASE 1 ACTIVE')
                  : activePhase === 'REGULAR'
                  ? t('FASE 2 AKTIF', 'PHASE 2 ACTIVE')
                  : t('PENDAFTARAN DITUTUP', 'REGISTRATION CLOSED')}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {t('PENUTUPAN RESMI: 29 NOV 2026 (H-14)', 'OFFICIAL DEADLINE: NOV 29, 2026 (H-14)')}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UNIFIED AERODYNAMIC PHASE COCKPIT (RAD RACE & RAPHA EDITORIAL AESTHETIC) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative group">
          {/* Subtle Top Kinetic Orange Edge for Active Stage */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#FA6D0B] via-[#FA6D0B]/80 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* TAHAP 01: EARLY BIRD */}
            <div className={`p-6 sm:p-7 flex flex-col justify-between space-y-5 transition-colors ${
              activePhase === 'EARLY_BIRD' ? 'bg-[#FA6D0B]/[0.03]' : ''
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#FA6D0B] font-black uppercase tracking-widest">
                      // TAHAP 01
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-300 uppercase">
                      EARLY BIRD
                    </span>
                  </div>
                  {activePhase === 'EARLY_BIRD' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FA6D0B] text-black font-mono text-[9px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(250,109,11,0.4)]">
                      {t('SEDANG BERLANGSUNG', 'ACTIVE NOW')}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                      {t('SELESAI', 'CONCLUDED')}
                    </span>
                  )}
                </div>

                <div>
                  <div className="font-display text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-white">
                    01 — 15 NOV 2026
                  </div>
                  <div className="text-[11px] font-mono text-[#FA6D0B] font-bold uppercase tracking-wider mt-1">
                    {t('HEMAT HINGGA RP 100.000 / PESERTA', 'SAVE UP TO RP 100,000 / RIDER')}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">
                      {t('HARGA PERDANA', 'INITIAL PRICE')}
                    </span>
                    <span className="text-xs font-sans font-bold text-white block">
                      {t('Tarif Terendah Resmi', 'Lowest Official Rate')}
                    </span>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">
                      {t('ALOKASI KUOTA', 'SLOT ALLOCATION')}
                    </span>
                    <span className="text-xs font-sans font-bold text-white block">
                      {t('Prioritas Jersey & Wave 1', 'Priority Jersey & Wave 1')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{t('BATAS AKHIR FASE:', 'PHASE DEADLINE:')} 15 NOV (23:59 WIB)</span>
                <span className="text-[#FA6D0B] font-bold uppercase tracking-wider">
                  {activePhase === 'EARLY_BIRD' ? t('SLOT TERBATAS', 'LIMITED SLOTS') : ''}
                </span>
              </div>
            </div>

            {/* TAHAP 02: TARIF REGULER */}
            <div className={`p-6 sm:p-7 flex flex-col justify-between space-y-5 transition-colors ${
              activePhase === 'REGULAR' ? 'bg-[#FA6D0B]/[0.03]' : ''
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      // TAHAP 02
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-300 uppercase">
                      TARIF REGULER
                    </span>
                  </div>
                  {activePhase === 'REGULAR' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FA6D0B] text-black font-mono text-[9px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(250,109,11,0.4)]">
                      {t('SEDANG BERLANGSUNG', 'ACTIVE NOW')}
                    </span>
                  ) : activePhase === 'EARLY_BIRD' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono text-[9px] font-bold uppercase tracking-wider border border-white/10">
                      {t('GELOMBANG FINAL', 'FINAL WAVE')}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                      {t('DITUTUP', 'CLOSED')}
                    </span>
                  )}
                </div>

                <div>
                  <div className="font-display text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-white">
                    16 — 29 NOV 2026
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-1">
                    {t('TARIF RESMI STANDAR · PENUTUPAN H-14', 'STANDARD OFFICIAL RATE · H-14 CUT-OFF')}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">
                      {t('STANDAR TARIF', 'STANDARD TIER')}
                    </span>
                    <span className="text-xs font-sans font-bold text-white block">
                      {t('5 Etape & Virtual Ride', '5 Stages & Virtual Ride')}
                    </span>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">
                      {t('BATAS LOGISTIK', 'LOGISTICS CUT-OFF')}
                    </span>
                    <span className="text-xs font-sans font-bold text-white block">
                      {t('Produksi Jersey & BIB', 'Jersey & BIB Production')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{t('PENUTUPAN TOTAL:', 'FINAL CLOSE:')} 29 NOV (23:59 WIB)</span>
                <span className="text-slate-400 font-bold uppercase tracking-wider">
                  {t('TIDAK ADA OTS', 'NO OTS (ON-SITE)')}
                </span>
              </div>
            </div>

          </div>

          {/* Integrated Logistics Strip */}
          <div className="bg-white/[0.02] border-t border-white/10 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="text-[#FA6D0B] font-bold">// PROTOKOL LOGISTIK:</span>
              <span>{t('Pendaftaran resmi ditutup mutlak H-14 (29 Nov 2026, 23:59 WIB) untuk finalisasi asuransi & produksi jersey Pollride.', 'Official registration closes at H-14 (Nov 29, 2026, 23:59 WIB) for insurance & Pollride jersey production.')}</span>
            </span>
            <span className="text-slate-500 uppercase tracking-wider shrink-0">
              {t('TERBUKA SEMUA MERK SEPEDA', 'OPEN TO ALL BIKE BRANDS')}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESPONSIVE OFFICIAL PRICE TABLE (MOBILE & DESKTOP UNIFIED) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          
          {/* Table Header Control & Phase Switcher Toolbar */}
          <div className="px-4 sm:px-6 py-3.5 bg-white/[0.02] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-[#FA6D0B] uppercase tracking-wider">
                  // MATRIKS TARIF RESMI
                </span>
                <span className="text-white/20 select-none hidden sm:inline">·</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase hidden sm:inline">
                  {selectedPhase === 'EARLY_BIRD' 
                    ? t('FASE 1: HEMAT RP 100.000 / PESERTA', 'PHASE 1: SAVE RP 100,000 / RIDER')
                    : t('FASE 2: TARIF REGULER H-14', 'PHASE 2: REGULAR RATE H-14')}
                </span>
              </div>

              {/* Mobile Swipe Hint */}
              <div className="sm:hidden flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-1 rounded">
                <span>{t('GESER TABEL', 'SWIPE TABLE')}</span>
                <span className="text-[#FA6D0B] font-bold">→</span>
              </div>
            </div>

            {/* Phase Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedPhase('EARLY_BIRD')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 text-center ${
                  selectedPhase === 'EARLY_BIRD'
                    ? 'bg-[#FA6D0B] text-black shadow-[0_0_12px_rgba(250,109,11,0.35)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('EARLY BIRD (01–15 NOV)', 'EARLY BIRD (NOV 01–15)')}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPhase('REGULAR')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 text-center ${
                  selectedPhase === 'REGULAR'
                    ? 'bg-[#FA6D0B] text-black shadow-[0_0_12px_rgba(250,109,11,0.35)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('REGULER (16–29 NOV)', 'REGULAR (NOV 16–29)')}
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable Table Container */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20">
            <table className="w-full text-left border-collapse min-w-[680px] md:min-w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {/* Sticky Column: Category & Distance */}
                  <th scope="col" className="py-4 px-4 sm:px-6 text-white sticky left-0 bg-[#0B0C0E] z-20 border-r border-white/10 shadow-[4px_0_12px_rgba(0,0,0,0.6)] md:shadow-none min-w-[155px] sm:min-w-[190px]">
                    {t('KATEGORI & JARAK', 'CATEGORY & DISTANCE')}
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{t('PAKET MEDAL SAJA', 'MEDAL ONLY PACKAGE')}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {selectedPhase === 'EARLY_BIRD' ? t('Early Bird (Diskon)', 'Early Bird (Discounted)') : t('Tarif Standar', 'Standard Rate')}
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-[#FA6D0B] font-bold">{t('PAKET MEDAL + JERSEY', 'MEDAL + JERSEY PACKAGE')}</span>
                      <span className="text-[10px] text-slate-400 font-normal">+ Pollride Aero Jersey</span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{t('VOUCHER MAKAN ABEEY', 'ABEEY MEAL VOUCHER')}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{t('Pemulihan Finisher', 'Finisher Recovery')}</span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    {t('AKSI', 'ACTION')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs">
                {priceRows.map((row) => {
                  const isEb = selectedPhase === 'EARLY_BIRD';
                  return (
                    <tr 
                      key={row.id}
                      className="hover:bg-white/[0.03] transition-colors duration-200 group"
                    >
                      {/* 1. Category & Distance (Pinned Left on Mobile Scroll) */}
                      <td className="py-4 px-4 sm:px-6 align-middle sticky left-0 bg-[#0B0C0E] z-10 border-r border-white/10 shadow-[4px_0_12px_rgba(0,0,0,0.6)] md:shadow-none min-w-[155px] sm:min-w-[190px]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-display font-black text-sm sm:text-base lg:text-lg text-white uppercase tracking-tight group-hover:text-[#FA6D0B] transition-colors whitespace-nowrap">
                              {language === 'ENG' ? row.categoryNameEng : row.categoryName}
                            </span>
                            {row.isRace && (
                              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#FA6D0B]/20 text-[#FA6D0B] shrink-0">
                                RACE
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400">
                            <span className="text-white font-bold">{row.distanceDisplay}</span>
                            <span className="text-white/20 select-none">·</span>
                            <span className="truncate max-w-[110px] sm:max-w-none">{language === 'ENG' ? row.formatBadgeEng : row.formatBadge}</span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Paket Medal Only */}
                      <td className="py-4 px-4 sm:px-5 align-middle font-mono whitespace-nowrap">
                        <div className="space-y-0.5">
                          <div className="flex items-baseline gap-2">
                            <span className="font-display italic font-black text-base sm:text-lg lg:text-xl text-white">
                              {isEb ? row.earlyBird.medal : row.regular.medal}
                            </span>
                            {isEb && (
                              <span className="line-through text-slate-500 text-xs">
                                {row.regular.medal}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
                            {isEb ? (
                              <span className="text-[#FA6D0B] font-bold">{t('Tarif Early Bird', 'Early Bird Rate')}</span>
                            ) : (
                              <span>{t('Tarif Reguler', 'Regular Rate')}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Paket Medal + Jersey */}
                      <td className="py-4 px-4 sm:px-5 align-middle font-mono whitespace-nowrap">
                        <div className="space-y-0.5">
                          <div className="flex items-baseline gap-2">
                            <span className="font-display italic font-black text-base sm:text-lg lg:text-xl text-[#FA6D0B]">
                              {isEb ? row.earlyBird.jersey : row.regular.jersey}
                            </span>
                            {isEb && (
                              <span className="line-through text-slate-500 text-xs">
                                {row.regular.jersey}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-300 uppercase tracking-wide flex items-center gap-1">
                            <span className="font-bold text-white">Pollride Fit</span>
                            <span className="text-white/30">·</span>
                            <span>{isEb ? t('Hemat Rp 100K', 'Save Rp 100K') : t('Standar', 'Standard')}</span>
                          </div>
                        </div>
                      </td>

                      {/* 4. Abeey Meal Voucher */}
                      <td className="py-4 px-4 sm:px-5 align-middle whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] text-[11px] font-medium text-slate-300">
                          <span className="text-[#FA6D0B] font-bold">✓</span>
                          <span>{language === 'ENG' ? row.abeeyMealVoucherEng : row.abeeyMealVoucher}</span>
                        </div>
                      </td>

                      {/* 5. CTA Button */}
                      <td className="py-4 px-4 sm:px-6 align-middle text-right whitespace-nowrap">
                        <Button
                          href={row.registerUrl}
                          variant="primary"
                          size="sm"
                          withArrow
                          className="font-mono text-xs font-black shadow-[0_0_15px_rgba(250,109,11,0.25)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        >
                          {t('DAFTAR', 'REGISTER')}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* POLICY & REGULATION CALLOUTS STRIP (CANONICAL NOTES) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Note 1: Asuransi Hari-H */}
          <div className="rounded-2xl bg-black/50 backdrop-blur-md p-5 space-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2">
              <span className="text-[#FA6D0B] font-bold text-sm">✓</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                {t('ASURANSI HARI-H TERMASUK', 'RACE-DAY INSURANCE INCLUDED')}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t(
                'Seluruh paket pendaftaran resmi sudah mencakup perlindungan asuransi kecelakaan resmi selama 1 hari penuh jalannya event Grindurance 2026.',
                'All official packages include 1-day comprehensive event accident insurance for Grindurance 2026.'
              )}
            </p>
          </div>

          {/* Note 2: Voucher Makan Abeey */}
          <div className="rounded-2xl bg-black/50 backdrop-blur-md p-5 space-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2">
              <span className="text-[#FA6D0B] font-bold text-sm">✓</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                {t('MEAL VOUCHER ABEEY EATERY', 'ABEEY EATERY MEAL VOUCHER')}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t(
                'Otomatis untuk kategori 120km, 150km, 200km, serta seluruh peserta perempuan & usia ≤17 tahun di semua etape. Dapat ditukar di finish lounge.',
                'Included for 120km, 150km, 200km, and all female & youth riders ≤17 years across all categories. Redeemable at the finish lounge.'
              )}
            </p>
          </div>

          {/* Note 3: Tarif Internasional (WNA / Expat) */}
          <div className="rounded-2xl bg-black/50 backdrop-blur-md p-5 space-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2">
              <span className="text-[#FA6D0B] font-bold text-sm">✓</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                {t('TARIF PESERTA WNA / EXPAT', 'INTERNATIONAL / EXPAT RATE')}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t(
                'Peserta mancanegara (WNA / Expat): Single US$50 (Rp 890.000) / Pair US$80 (Rp 1.424.000) sudah termasuk opsi jersey Pollride resmi.',
                'International / Expat participants: Single US$50 (IDR 890K) / Pair US$80 (IDR 1.424M), including official Pollride race jersey.'
              )}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
