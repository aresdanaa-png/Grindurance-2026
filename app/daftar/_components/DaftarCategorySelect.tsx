'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@/lib/types';
import { PricingPhase, REGULAR_PRICES } from '@/lib/data/categories';
import { CategoryVisual } from './types';

interface DaftarCategorySelectProps {
  categories: Category[];
  activePhase: PricingPhase;
  onSelectCategory: (cat: Category) => void;
  formatRupiah: (amount: number) => string;
  getCategoryVisual: (id: string, t: (id: string, eng: string) => string) => CategoryVisual;
  t: (id: string, eng: string) => string;
}

export default function DaftarCategorySelect({
  categories,
  activePhase,
  onSelectCategory,
  formatRupiah,
  getCategoryVisual,
  t,
}: DaftarCategorySelectProps) {
  return (
    <div className="space-y-10 animate-slide-up-fade">
      {/* Header Telemetri & Title - Graphic Asset "OFFICIAL CATEGORY" */}
      <div className="border-b border-white/10 pb-6 sm:pb-8 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-widest block">
            GX-ID OFFICIAL SPEC SHEET · 2026 EDITION
          </span>

          <h1 className="sr-only">
            Official Categories — {t('Pilih Kategori Lintasan Grindurance 2026', 'Choose Grindurance 2026 Course Category')}
          </h1>

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

      {/* OFFICIAL REGISTRATION TIMELINE & TIER STATUS BANNER */}
      <div
        className={`rounded-2xl p-4 sm:p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] ${
          activePhase === 'CLOSED'
            ? 'bg-black/90 border-white/20'
            : activePhase === 'REGULAR'
            ? 'bg-[#0B0C0E]/90 border-white/15'
            : 'bg-black/80 border-[#FA6D0B]/40'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span
            className={`px-3 py-1 rounded text-xs font-mono font-black uppercase tracking-wider self-start sm:self-auto ${
              activePhase === 'CLOSED'
                ? 'bg-white/20 text-white'
                : activePhase === 'REGULAR'
                ? 'bg-white/15 text-white'
                : 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
            }`}
          >
            {activePhase === 'CLOSED'
              ? t('PENDAFTARAN DITUTUP', 'REGISTRATION CLOSED')
              : activePhase === 'REGULAR'
              ? t('TARIF REGULER AKTIF', 'REGULAR TIER ACTIVE')
              : t('EARLY BIRD AKTIF', 'EARLY BIRD ACTIVE')}
          </span>
          <div>
            <div className="font-mono text-xs sm:text-sm text-white font-bold leading-tight">
              {activePhase === 'CLOSED' && t('Pendaftaran Resmi Ditutup pada 29 November 2026 pukul 23:59 WIB', 'Official Registration Closed on Nov 29, 2026 at 23:59 WIB')}
              {activePhase === 'REGULAR' && t('Periode Reguler · Penutupan Pendaftaran: Minggu, 29 November 2026 (23:59 WIB)', 'Regular Period · Closes Sunday, Nov 29, 2026 (23:59 WIB)')}
              {activePhase === 'EARLY_BIRD' && t('Tarif Early Bird Aktif Hingga: Minggu, 15 November 2026 (23:59 WIB)', 'Early Bird Active Until: Sunday, Nov 15, 2026 (23:59 WIB)')}
            </div>
            <div className="font-mono text-[11px] text-slate-400 mt-0.5">
              {activePhase === 'CLOSED' && t('H-14 sebelum Hari-H untuk finalisasi race pack & asuransi peserta.', 'H-14 pre-event for race pack finalization & athlete insurance.')}
              {activePhase === 'REGULAR' && t('Penutupan resmi tepat 2 minggu sebelum event (Minggu, 13 Desember 2026).', 'Officially closes 2 weeks prior to event date (Sunday, Dec 13, 2026).')}
              {activePhase === 'EARLY_BIRD' && t('Go-live 1 November · Hemat hingga Rp 150.000 dibanding tarif reguler.', 'Go-live Nov 1 · Save up to IDR 150,000 compared to regular tier.')}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] sm:text-xs text-slate-300 pt-2 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[#FA6D0B] font-bold">RACE DAY:</span>
            <span className="text-white font-bold">13 DESEMBER 2026</span>
          </div>
          <span className="text-white/20 select-none">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">PENUTUPAN:</span>
            <span className="text-[#FA6D0B] font-bold">29 NOV 2026</span>
          </div>
        </div>
      </div>

      {/* Grid 6 Kategori Bergaya Editorial Gravel Monolith (2 Kolom) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
        {categories.map((cat, idx) => {
          const visual = getCategoryVisual(cat.id, t);

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/40 to-[#0D0E11]/50 z-10 pointer-events-none group-hover:via-[#0D0E11]/30 transition-colors duration-500" />

              {/* Shimmer Sweep on Hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out" />
              </div>

              {/* 1. TOP HUD: Category Tag & Telemetry */}
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

              {/* 3. BOTTOM: Price & Action Arrow */}
              <div className="relative z-20 flex items-end justify-between font-mono pt-1">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[7.5px] sm:text-[9.5px] text-slate-400 uppercase tracking-widest block leading-none">
                      {t('MULAI DARI', 'STARTING FROM')}
                    </span>
                    {activePhase === 'EARLY_BIRD' && (
                      <span className="text-[7px] sm:text-[8px] font-mono font-bold uppercase text-black bg-[#FA6D0B] px-1 py-0.2 rounded-sm leading-none">
                        EARLY BIRD
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display italic text-sm sm:text-xl font-black text-white leading-none">
                      {formatRupiah(cat.price_medal_only)}
                    </span>
                    {activePhase === 'EARLY_BIRD' && (
                      <span className="line-through text-slate-400 font-mono text-[9px] sm:text-[11px] leading-none">
                        {formatRupiah(REGULAR_PRICES[cat.id]?.medal ?? cat.price_medal_only)}
                      </span>
                    )}
                  </div>
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
  );
}
