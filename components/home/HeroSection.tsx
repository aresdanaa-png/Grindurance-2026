'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. CINEMATIC ATHLETIC HERO SECTION (NIKE TRAIL / CANYON STYLE) */}
      {/* ========================================================================= */}
      <section className="relative flex flex-col justify-start overflow-hidden">
        
        {/* Cinematic Action Photography Background with soft dissolve at the bottom */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)'
          }}
        >
          <img
            src="/backgrounds/bg-hero.webp"
            alt="Gravel Grindurance Cyclist Action"
            className="w-full h-full object-cover object-[center_top] translate-y-3 sm:translate-y-5 filter brightness-[0.76] contrast-[1.08] saturate-[1.18] blur-[0.4px]"
          />
          {/* Soft dark gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11]/60 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-2 sm:pb-3 w-full flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
          
          {/* 1. Event Graphic Title with Radial Fire Backlight & Kinetic Glow */}
          <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[1150px] group">
            {/* Ambient Radial Backlight Glow in exact logo orange */}
            <div className="absolute -inset-4 sm:-inset-10 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.35)_0%,rgba(250,109,11,0.12)_45%,transparent_70%)] blur-2xl sm:blur-3xl opacity-90 -z-10 animate-pulse pointer-events-none" />
            
            <img
              src="/nama_event.webp"
              alt="Gravel Grindurance"
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_55px_rgba(250,109,11,0.45)] transition-all duration-700 group-hover:scale-[1.015] group-hover:drop-shadow-[0_0_80px_rgba(250,109,11,0.7)]"
            />
          </div>

          {/* 2. Tagline (Guaranteed 1 Line) & Subtext */}
          <div className="space-y-2 max-w-4xl text-center sm:text-left w-full">
            <h2 className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-extrabold uppercase tracking-wider italic whitespace-nowrap overflow-hidden text-ellipsis">
              UN-SUPPORTED RAIN SEASON EXPEDITION <span className="text-[#FA6D0B] font-black">·</span> 60–200 KM
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
              {t(
                'Tantangan ketahanan mandiri musim hujan edisi perayaan komunitas GX-ID. Hadir dengan 5 kategori offline serta Virtual Ride nasional terintegrasi.',
                'Self-supported rainy season endurance challenge celebrating GX-ID community anniversary. Featuring 5 offline categories and national Virtual Ride.'
              )}
            </p>
          </div>

          {/* 3. Action Buttons (Styled Exactly Like Header CTA Pill) */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Primary Action Button (REGISTER NOW — Solid Orange Pill) */}
            <Link
              href="/daftar"
              className="group relative px-8 sm:px-9 py-3 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] border border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_35px_rgba(250,109,11,0.65)] flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden"
            >
              {/* Subtle Ambient Sheen Sweep */}
              <span className="absolute inset-0 w-1/3 bg-white/20 blur-sm -skew-x-12 animate-sheen-sweep pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
              <span className="relative z-10">{t('DAFTAR SEKARANG · GABUNG EKSPEDISI', 'REGISTER NOW · JOIN THE EXPEDITION')}</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
            </Link>

            {/* Secondary Action Button (PANDUAN LOMBA & PERATURAN) */}
            <Link
              href="/peraturan"
              className="group relative px-7 sm:px-8 py-3 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wider text-white border border-[#FA6D0B]/60 hover:border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,109,11,0.3)] overflow-hidden flex items-center justify-center gap-2.5"
            >
              {/* Hover background fill */}
              <span className="absolute inset-0 bg-[#FA6D0B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                {t('PANDUAN LOMBA & PERATURAN', 'RACE GUIDE & REGULATIONS')}
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
          </div>

          {/* 4. Running Text Ticker — Directly Under Buttons */}
          <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[1150px] mt-2 sm:mt-2.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden py-2 sm:py-2.5 px-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="animate-marquee flex items-center whitespace-nowrap text-xs sm:text-[13px] font-semibold tracking-widest uppercase text-slate-300">
              {/* Set 1 */}
              <div className="flex items-center">
                <span>{t('MINGGU, 13 DESEMBER 2026 (MINGGU KE-2)', 'SUNDAY, 13 DECEMBER 2026 (WEEK 2)')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>START &amp; FINISH: ABEEY COFFEE &amp; LRT HARJAMUKTI CIBUBUR</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>{t('RUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP', 'ROUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>FORMAT: SELF-SUPPORTED · RAIN SEASON EXPEDITION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>{t('KATEGORI: 60 FUN RIDE · 100 FONDO · 120 (RACE) · 150 GRAND FONDO · 200 ULTRA', 'CATEGORIES: 60 FUN RIDE · 100 FONDO · 120 (RACE) · 150 GRAND FONDO · 200 ULTRA')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>{t('VIRTUAL RIDE NASIONAL: STRAVA GPS AUTO-VALIDATION', 'NATIONWIDE VIRTUAL RIDE: STRAVA GPS AUTO-VALIDATION')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span className="text-[#FA6D0B] font-bold">{t('INSENTIF MEAL COUPON RP 50.000: WANITA, USIA ≤ 17 TAHUN & TIM PAIR MIX', 'IDR 50,000 MEAL INCENTIVE: FEMALE, AGE ≤ 17 & PAIR MIX TEAMS')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>{t('80.000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID', '80,000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>
              </div>

              {/* Set 2 */}
              <div className="flex items-center" aria-hidden="true">
                <span>{t('MINGGU, 13 DESEMBER 2026 (MINGGU KE-2)', 'SUNDAY, 13 DECEMBER 2026 (WEEK 2)')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>START &amp; FINISH: ABEEY COFFEE &amp; LRT HARJAMUKTI CIBUBUR</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>{t('RUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP', 'ROUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>FORMAT: SELF-SUPPORTED · RAIN SEASON EXPEDITION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>{t('KATEGORI: 60 FUN RIDE · 100 FONDO · 120 (RACE) · 150 GRAND FONDO · 200 ULTRA', 'CATEGORIES: 60 FUN RIDE · 100 FONDO · 120 (RACE) · 150 GRAND FONDO · 200 ULTRA')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>{t('VIRTUAL RIDE NASIONAL: STRAVA GPS AUTO-VALIDATION', 'NATIONWIDE VIRTUAL RIDE: STRAVA GPS AUTO-VALIDATION')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span className="text-[#FA6D0B] font-bold">{t('INSENTIF MEAL COUPON RP 50.000: WANITA, USIA ≤ 17 TAHUN & TIM PAIR MIX', 'IDR 50,000 MEAL INCENTIVE: FEMALE, AGE ≤ 17 & PAIR MIX TEAMS')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>{t('80.000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID', '80,000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 1.5 FULL-BLEED OFFICIAL EVENT TELEMETRY STRIP (PURE TYPOGRAPHY - DATE & VENUE FOCUS) */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full border-y border-white/10 bg-black/60 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 py-2.5 sm:py-3">
            
            {/* Segment 1: Waktu & Tanggal Gelaran Resmi */}
            <div className="py-2.5 md:py-0 md:pr-10 lg:pr-14 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block leading-none mb-1.5">
                {t('OFFICIAL RACE DATE · MINGGU KE-2', 'OFFICIAL RACE DATE · WEEK 2')}
              </span>
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white italic tracking-wider leading-none block">
                {t('MINGGU, 13 DESEMBER 2026', 'SUNDAY, 13 DECEMBER 2026')}
              </span>
            </div>

            {/* Segment 2: Lokasi Start & Finish Staging Arena */}
            <div className="py-2.5 md:py-0 md:pl-10 lg:pl-14 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1.5">
                START &amp; FINISH ARENA
              </span>
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white italic tracking-wide leading-none block">
                ABEEY COFFEE &amp; EATERY, CIBUBUR
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-mono mt-1 block">
                {t('Akses Terintegrasi Stasiun LRT Harjamukti', 'Integrated Access: LRT Harjamukti Station')}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
    </>
  );
}
