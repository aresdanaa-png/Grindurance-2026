'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { 
  CANONICAL_PRICE_TABLE, 
  getActivePricingPhase, 
  PricingPhase, 
  PriceTableRow 
} from '@/lib/data/categories';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function PriceListSection() {
  const { language, t } = useLanguage();
  const [activePhase, setActivePhase] = useState<PricingPhase>('EARLY_BIRD');
  const [mobileFilterPhase, setMobileFilterPhase] = useState<'EARLY_BIRD' | 'REGULAR'>('EARLY_BIRD');

  useEffect(() => {
    const phase = getActivePricingPhase();
    setActivePhase(phase);
    if (phase === 'REGULAR') {
      setMobileFilterPhase('REGULAR');
    }
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
        {/* DESKTOP VIEW: HIGH-CONTRAST ATHLETIC TABULAR MATRIX (hidden md:block) */}
        {/* ========================================================================= */}
        <div className="hidden md:block">
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  <th scope="col" className="py-4 px-6 text-white">
                    {t('KATEGORI & JARAK', 'CATEGORY & DISTANCE')}
                  </th>
                  <th scope="col" className="py-4 px-5">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{t('PAKET MEDAL SAJA', 'MEDAL ONLY PACKAGE')}</span>
                      <span className="text-[10px] text-slate-400 font-normal">Early Bird vs Reguler</span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-5">
                    <div className="flex flex-col">
                      <span className="text-[#FA6D0B] font-bold">{t('PAKET MEDAL + JERSEY', 'MEDAL + JERSEY PACKAGE')}</span>
                      <span className="text-[10px] text-slate-400 font-normal">+ Pollride Aero Jersey</span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-5">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{t('VOUCHER MAKAN ABEEY', 'ABEEY MEAL VOUCHER')}</span>
                      <span className="text-[10px] text-slate-400 font-normal">Pemulihan Finisher</span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-6 text-right">
                    {t('AKSI', 'ACTION')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs">
                {priceRows.map((row) => {
                  const isEb = activePhase === 'EARLY_BIRD';
                  return (
                    <tr 
                      key={row.id}
                      className="hover:bg-white/[0.03] transition-colors duration-200 group"
                    >
                      {/* 1. Category & Distance */}
                      <td className="py-4 px-6 align-middle">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-black text-base lg:text-lg text-white uppercase tracking-tight group-hover:text-[#FA6D0B] transition-colors">
                              {language === 'ENG' ? row.categoryNameEng : row.categoryName}
                            </span>
                            {row.isRace && (
                              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#FA6D0B]/20 text-[#FA6D0B]">
                                RACE
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                            <span className="text-white font-bold">{row.distanceDisplay}</span>
                            <span className="text-white/20 select-none">·</span>
                            <span>{language === 'ENG' ? row.formatBadgeEng : row.formatBadge}</span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Paket Medal Only */}
                      <td className="py-4 px-5 align-middle font-mono">
                        <div className="space-y-0.5">
                          <div className="flex items-baseline gap-2">
                            <span className="font-display italic font-black text-lg lg:text-xl text-white">
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
                              <span className="text-[#FA6D0B] font-bold">Tarif Early Bird</span>
                            ) : (
                              <span>Tarif Reguler</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Paket Medal + Jersey */}
                      <td className="py-4 px-5 align-middle font-mono">
                        <div className="space-y-0.5">
                          <div className="flex items-baseline gap-2">
                            <span className="font-display italic font-black text-lg lg:text-xl text-[#FA6D0B]">
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
                            <span>{isEb ? row.earlyBird.jersey : row.regular.jersey}</span>
                          </div>
                        </div>
                      </td>

                      {/* 4. Abeey Meal Voucher */}
                      <td className="py-4 px-5 align-middle">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] text-[11px] font-medium text-slate-300">
                          <span className="text-[#FA6D0B] font-bold">✓</span>
                          <span>{language === 'ENG' ? row.abeeyMealVoucherEng : row.abeeyMealVoucher}</span>
                        </div>
                      </td>

                      {/* 5. CTA Button */}
                      <td className="py-4 px-6 align-middle text-right">
                        <Link
                          href={row.registerUrl}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(250,109,11,0.25)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] whitespace-nowrap"
                        >
                          <span>{t('DAFTAR', 'REGISTER')}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW: INTUITIVE ATHLETIC CARD MATRIX (md:hidden) */}
        {/* ========================================================================= */}
        <div className="md:hidden space-y-4">
          
          {/* Phase Filter Pill Switcher for Quick Comparison */}
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-white/[0.04] backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMobileFilterPhase('EARLY_BIRD')}
              className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 text-center ${
                mobileFilterPhase === 'EARLY_BIRD'
                  ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('EARLY BIRD (1–15 NOV)', 'EARLY BIRD (NOV 1–15)')}
            </button>
            <button
              type="button"
              onClick={() => setMobileFilterPhase('REGULAR')}
              className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 text-center ${
                mobileFilterPhase === 'REGULAR'
                  ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('REGULER (16–29 NOV)', 'REGULAR (NOV 16–29)')}
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {priceRows.map((row) => {
              const isSelectedEb = mobileFilterPhase === 'EARLY_BIRD';
              return (
                <div 
                  key={row.id}
                  className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                >
                  {/* Top Bar: Title, Distance & Race Badge */}
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                          {language === 'ENG' ? row.categoryNameEng : row.categoryName}
                        </h3>
                        {row.isRace && (
                          <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#FA6D0B]/20 text-[#FA6D0B]">
                            RACE
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span className="text-white font-bold">{row.distanceDisplay}</span>
                        <span className="text-white/20 select-none">·</span>
                        <span>{language === 'ENG' ? row.formatBadgeEng : row.formatBadge}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-white">
                        {isSelectedEb ? 'EARLY BIRD' : 'REGULER'}
                      </span>
                    </div>
                  </div>

                  {/* 2 Package Options Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    
                    {/* Option 1: Medal Only */}
                    <div className="p-3 rounded-xl bg-white/[0.03] space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block tracking-wider">
                        {t('MEDAL ONLY', 'MEDAL ONLY')}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display italic font-black text-xl text-white">
                          {isSelectedEb ? row.earlyBird.medal : row.regular.medal}
                        </span>
                        {isSelectedEb && (
                          <span className="line-through text-slate-500 text-[10px] font-mono">
                            {row.regular.medal}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {t('Esensial tantangan', 'Essential challenge')}
                      </span>
                    </div>

                    {/* Option 2: Medal + Jersey */}
                    <div className="p-3 rounded-xl bg-[#FA6D0B]/10 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#FA6D0B] block tracking-wider">
                        {t('MEDAL + JERSEY', 'MEDAL + JERSEY')}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display italic font-black text-xl text-[#FA6D0B]">
                          {isSelectedEb ? row.earlyBird.jersey : row.regular.jersey}
                        </span>
                        {isSelectedEb && (
                          <span className="line-through text-slate-500 text-[10px] font-mono">
                            {row.regular.jersey}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-300 block">
                        {t('+ Jersey Pollride', '+ Pollride jersey')}
                      </span>
                    </div>

                  </div>

                  {/* Bottom Perks Strip */}
                  <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">{t('Voucher Makan Abeey:', 'Abeey Meal Voucher:')}</span>
                      <span className="font-medium text-white text-right">
                        {language === 'ENG' ? row.abeeyMealVoucherEng : row.abeeyMealVoucher}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">{t('Asuransi Kecelakaan:', 'Accident Insurance:')}</span>
                      <span className="font-medium text-[#FA6D0B] text-right">
                        {t('Termasuk Hari-H', 'Race-Day Included')}
                      </span>
                    </div>
                  </div>

                  {/* Direct Mobile Registration CTA */}
                  <Link
                    href={row.registerUrl}
                    className="w-full py-3 rounded-full text-xs font-mono font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,109,11,0.3)] active:scale-95"
                  >
                    <span>{t('DAFTAR SEKARANG', 'REGISTER NOW')}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>

                </div>
              );
            })}
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
