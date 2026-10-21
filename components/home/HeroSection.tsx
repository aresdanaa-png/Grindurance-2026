'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  const mobileTickerItems = [
    t('MINGGU, 13 DESEMBER 2026', 'SUNDAY, 13 DECEMBER 2026'),
    'START & FINISH: ABBEY COFFEE LRT HARJAMUKTI',
    'CIBUBUR — JONGGOL — SENTUL',
    'SELF-SUPPORTED · RAIN SEASON CHALLENGE',
    '70K · 100K · 120K · 150K · 200K · VIRTUAL',
    t('MEAL VOUCHER ABEEY: 120K, 150K, 200K & WANITA', 'ABEEY MEAL VOUCHER: 120K, 150K, 200K & FEMALE'),
    '19 REGIONAL CHAPTERS GX-ID',
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. CINEMATIC ATHLETIC HERO SECTION (NIKE TRAIL / CANYON STYLE) */}
      {/* ========================================================================= */}
      <section className="relative flex flex-col justify-between h-[100dvh] md:h-auto md:min-h-0 overflow-hidden">
        
        {/* Mobile Dedicated Portrait Background (pesepeda.webp - 1024x1536) */}
        <div className="md:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/pesepeda.webp"
            alt="Gravel Grindurance Cyclist Action"
            className="w-full h-full object-cover object-[center_42%] scale-[2.1] origin-[center_42%] filter brightness-[0.96] contrast-[1.14] saturate-[1.28]"
          />
          {/* Subtle top dark gradient for typographic pop while keeping helmet clearly visible behind title */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0D0E11]/70 via-[#0D0E11]/30 to-transparent pointer-events-none" />
          {/* Bottom dark gradient to ensure the telemetry HUD and buttons blend seamlessly into #0D0E11 */}
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/70 to-transparent pointer-events-none" />
        </div>

        {/* Desktop Cinematic Action Photography Background (bg-hero.webp - 1920x1072) */}
        <div 
          className="hidden md:block absolute -top-16 inset-x-0 bottom-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
          }}
        >
          <img
            src="/backgrounds/bg-hero.webp"
            alt="Gravel Grindurance Cyclist Action"
            className="w-full h-full object-cover object-[center_top] scale-105 filter brightness-[0.76] contrast-[1.08] saturate-[1.18] blur-[0.4px]"
          />
          {/* Soft dark gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11]/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ========================================================================= */}
        {/* 1. MOBILE RESPONSIVE LAYOUT (PROPORSIONAL SESUAI REFERENSI — 1 LAYAR 100DVH) */}
        {/* ========================================================================= */}
        <div className="md:hidden relative z-10 w-full h-full flex flex-col justify-between pt-16 pb-4 px-4">
          
          {/* Top: Event Title Logo & Tagline */}
          <div className="pt-2 flex flex-col items-center">
            <div className="relative w-full max-w-[325px] sm:max-w-[340px] group">
              <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.4)_0%,rgba(250,109,11,0.15)_45%,transparent_70%)] blur-2xl opacity-90 -z-10 animate-pulse pointer-events-none" />
              <img
                src="/nama_event.webp"
                alt="Gravel Grindurance"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_55px_rgba(250,109,11,0.45)]"
              />
            </div>
            {/* Tagline right below the title (Compact & Sleek) */}
            <h2 className="mt-1 font-display text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-slate-200 italic text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] leading-tight">
              UN-SUPPORTED RAIN SEASON CHALLENGE <span className="text-[#FA6D0B] font-black">·</span> 70–200 KM
            </h2>
          </div>

          {/* Middle: Cinematic Photography Breathing Space (Foto Pesepeda Tampil Jelas di Tengah) */}
          <div className="flex-1 pointer-events-none" />

          {/* Bottom: Ultra-Slim Telemetry HUD & Action CTAs */}
          <div className="w-full max-w-sm mx-auto space-y-1.5">
            
            {/* Mobile Running Text Ticker — Directly Above Telemetry HUD */}
            <div className="w-full rounded-full bg-black/60 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.6)] overflow-hidden py-1 px-2.5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div className="animate-marquee flex items-center whitespace-nowrap text-[10px] font-mono font-semibold tracking-wider uppercase text-slate-300">
                {/* Loop 1 */}
                <div className="flex items-center">
                  {mobileTickerItems.map((item, idx) => (
                    <span key={`ticker-1-${idx}`} className="flex items-center">
                      <span className={item.includes('INSENTIF') ? 'text-[#FA6D0B] font-bold' : ''}>{item}</span>
                      <span className="mx-3 text-[#FA6D0B] font-bold select-none">·</span>
                    </span>
                  ))}
                </div>
                {/* Loop 2 (for seamless loop) */}
                <div className="flex items-center" aria-hidden="true">
                  {mobileTickerItems.map((item, idx) => (
                    <span key={`ticker-2-${idx}`} className="flex items-center">
                      <span className={item.includes('INSENTIF') ? 'text-[#FA6D0B] font-bold' : ''}>{item}</span>
                      <span className="mx-3 text-[#FA6D0B] font-bold select-none">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ultra-Slim Telemetry Glass HUD (Clean Borderless Athletic Cockpit) */}
            <div className="rounded-2xl bg-black/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] px-4 py-3">
              <div className="grid grid-cols-2 divide-x divide-white/[0.08]">
                {/* Date */}
                <div className="pr-3 flex flex-col justify-center">
                  <span className="text-[9px] font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block leading-none mb-1">
                    {t('OFFICIAL RACE DATE', 'OFFICIAL RACE DATE')}
                  </span>
                  <span className="font-display text-[13px] font-black uppercase text-white italic tracking-wide leading-tight block">
                    {t('13 DESEMBER 2026', '13 DECEMBER 2026')}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5 leading-none">
                    {t('MINGGU KE-2 · 05:30 WIB', 'WEEK 2 · 05:30 WIB')}
                  </span>
                </div>

                {/* Venue */}
                <div className="pl-3 flex flex-col justify-center">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">
                    START &amp; FINISH
                  </span>
                  <span className="font-display text-[12px] font-black uppercase text-white italic tracking-wide leading-tight block">
                    ABBEY COFFEE &amp; EATERY
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5 leading-none">
                    {t('LRT HARJAMUKTI CIBUBUR', 'LRT HARJAMUKTI CIBUBUR')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row (Clean Borderless Full-Capsule Styling) */}
            <div className="grid grid-cols-2 gap-2.5 w-full pt-0.5">
              {/* Primary: DAFTAR SEKARANG */}
              <Link
                href="/daftar"
                className="group relative px-4 py-3 rounded-full text-xs font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-300 hover:shadow-[0_0_35px_rgba(250,109,11,0.65)] flex items-center justify-center gap-1.5 active:scale-95 overflow-hidden text-center whitespace-nowrap"
              >
                <span className="absolute inset-0 w-1/3 bg-white/25 blur-sm -skew-x-12 animate-sheen-sweep pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
                <span className="relative z-10">{t('DAFTAR SEKARANG', 'REGISTER NOW')}</span>
                <ArrowUpRight className="relative z-10 w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out shrink-0" />
              </Link>

              {/* Secondary: PANDUAN LOMBA */}
              <Link
                href="/peraturan"
                className="group relative px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/[0.08] hover:bg-[#FA6D0B] hover:text-black backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,109,11,0.5)] active:scale-95 overflow-hidden flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
              >
                <span className="relative z-10 font-bold transition-colors duration-300">
                  {t('PANDUAN LOMBA', 'RACE GUIDE')}
                </span>
                <ArrowUpRight className="relative z-10 w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out shrink-0" />
              </Link>
            </div>

            {/* Mobile Minimalist Chevron Down Scroll Indicator (Single Compact Row) */}
            <a
              href="#kategori"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('kategori')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="pt-2 pb-0.5 flex items-center justify-center cursor-pointer group active:scale-95 transition-all select-none"
              aria-label={t('Gulir ke bawah untuk rute dan kategori', 'Scroll down for route and categories')}
            >
              <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-white transition-colors">
                <span>{t('GULIR KE BAWAH', 'SCROLL TO EXPLORE')}</span>
                <span className="text-[#FA6D0B] font-black tracking-normal inline-block animate-bounce text-[10px]">↓</span>
              </div>
            </a>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. DESKTOP VIEWPORT LAYOUT (100% UNTOUCHED ORIGINAL DESKTOP DESIGN) */}
        {/* ========================================================================= */}
        <div className="hidden md:flex relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-4 w-full flex-col items-start space-y-4 my-auto">
          
          {/* 1. Event Graphic Title with Radial Fire Backlight & Kinetic Glow */}
          <div className="relative w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[1150px] group">
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.35)_0%,rgba(250,109,11,0.12)_45%,transparent_70%)] blur-3xl opacity-90 -z-10 animate-pulse pointer-events-none" />
            <img
              src="/nama_event.webp"
              alt="Gravel Grindurance"
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_55px_rgba(250,109,11,0.45)] transition-all duration-700 group-hover:scale-[1.015] group-hover:drop-shadow-[0_0_80px_rgba(250,109,11,0.7)]"
            />
          </div>

          {/* 2. Tagline & Narrative Subtext */}
          <div className="space-y-2 max-w-4xl text-left w-full">
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-white font-extrabold uppercase tracking-wider italic whitespace-nowrap leading-tight">
              UN-SUPPORTED RAIN SEASON CHALLENGE <span className="text-[#FA6D0B] font-black">·</span> 70–200 KM
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
              {t(
                'Tantangan ketahanan mandiri musim hujan edisi perayaan GX-ID. Hadir dengan 5 kategori offline & Virtual Ride nasional.',
                'Self-supported rainy season endurance challenge celebrating GX-ID anniversary. Featuring 5 offline categories & national Virtual Ride.'
              )}
            </p>
          </div>

          {/* 3. Action Buttons Row */}
          <div className="pt-1 flex flex-row items-center gap-4 w-auto">
            <Link
              href="/daftar"
              className="group relative px-9 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] border border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_35px_rgba(250,109,11,0.65)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden text-center whitespace-nowrap"
            >
              <span className="absolute inset-0 w-1/3 bg-white/20 blur-sm -skew-x-12 animate-sheen-sweep pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
              <span className="relative z-10 font-black">{t('DAFTAR SEKARANG · GABUNG TANTANGAN', 'REGISTER NOW · JOIN THE CHALLENGE')}</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0" />
            </Link>

            <Link
              href="/peraturan"
              className="group relative px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white border border-[#FA6D0B]/60 hover:border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,109,11,0.3)] overflow-hidden flex items-center justify-center gap-2 text-center whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-[#FA6D0B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                {t('PANDUAN LOMBA & PERATURAN', 'RACE GUIDE & REGULATIONS')}
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
            </Link>
          </div>

          {/* 4. Running Text Ticker */}
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[1150px] mt-2.5 rounded-2xl bg-black/80 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.8)] overflow-hidden py-2.5 px-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="animate-marquee flex items-center whitespace-nowrap text-[13px] font-semibold tracking-widest uppercase text-slate-300">
              {/* Set 1 */}
              <div className="flex items-center">
                <span>{t('MINGGU, 13 DESEMBER 2026 (MINGGU KE-2)', 'SUNDAY, 13 DECEMBER 2026 (WEEK 2)')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">·</span>
                <span>START &amp; FINISH: ABBEY COFFEE &amp; LRT HARJAMUKTI CIBUBUR</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">·</span>
                <span>{t('RUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP', 'ROUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">·</span>
                <span>FORMAT: SELF-SUPPORTED · RAIN SEASON CHALLENGE</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">·</span>
                <span>{t('KATEGORI: 70 FUN GRAVEL · 100 FONDO · 120 (RACE) · 150 GRAND FONDO · 200 ULTRA', 'CATEGORIES: 70 FUN GRAVEL · 100 FONDO · 120 (RACE) · 150 GRAND FONDO · 200 ULTRA')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">·</span>
                <span>{t('VIRTUAL RIDE NASIONAL: STRAVA GPS AUTO-VALIDATION', 'NATIONWIDE VIRTUAL RIDE: STRAVA GPS AUTO-VALIDATION')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">·</span>
                <span className="text-[#FA6D0B] font-bold">{t('MEAL VOUCHER ABEEY: 120KM, 150KM, 200KM & SEMUA PESERTA WANITA', 'ABEEY MEAL VOUCHER: 120KM, 150KM, 200KM & ALL FEMALE RIDERS')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">·</span>
                <span>{t('80.000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID', '80,000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID')}</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">·</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* DESKTOP ONLY FULL-BLEED TELEMETRY STRIP */}
        {/* ========================================================================= */}
        <div className="hidden md:block relative z-20 w-full border-t border-white/10 bg-black/85 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.6)] shrink-0 py-3">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-white/10">
              
              {/* Segment 1: Waktu & Tanggal Gelaran Resmi */}
              <div className="pr-4 md:pr-10 lg:pr-14 flex flex-col justify-center">
                <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block leading-none mb-1.5">
                  {t('OFFICIAL RACE DATE · MINGGU KE-2', 'OFFICIAL RACE DATE · WEEK 2')}
                </span>
                <span className="font-display text-2xl lg:text-4xl font-black uppercase text-white italic tracking-wider leading-tight block">
                  {t('MINGGU, 13 DESEMBER 2026', 'SUNDAY, 13 DECEMBER 2026')}
                </span>
              </div>

              {/* Segment 2: Lokasi Start & Finish Staging Arena */}
              <div className="pl-4 md:pl-10 lg:pl-14 flex flex-col justify-center">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1.5">
                  START &amp; FINISH ARENA
                </span>
                <span className="font-display text-xl lg:text-3xl font-black uppercase text-white italic tracking-wide leading-tight block">
                  ABBEY COFFEE &amp; EATERY
                </span>
                <span className="text-xs text-slate-400 font-mono mt-1 block leading-none">
                  {t('LRT Harjamukti Cibubur', 'LRT Harjamukti Cibubur')}
                </span>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
    </>
  );
}
