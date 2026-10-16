'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0B0C0E] border-t border-white/10 text-slate-400 mt-auto relative overflow-hidden">
      
      {/* 1. Subtle Industrial Telemetry Header Strip */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-md py-3 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-slate-300">
            <span className="text-[#FA6D0B] font-bold">GX-ID ECOSYSTEM // 8 YEARS COMMITTED</span>
            <span className="text-white/20 select-none hidden sm:inline">·</span>
            <span>{t('STAGING ARENA: LRT HARJAMUKTI, CIBUBUR', 'STAGING ARENA: LRT HARJAMUKTI, CIBUBUR')}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>6°22&apos;46&quot;S 106°54&apos;03&quot;E</span>
            <span className="text-[#FA6D0B] font-bold select-none">//</span>
            <span>JONGGOL LOOP</span>
          </div>
        </div>
      </div>

      {/* 2. Custom Event Logo Graphic Watermark (Pure White & Transparent) */}
      <div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full max-w-5xl pointer-events-none select-none overflow-hidden opacity-[0.035] z-0 flex justify-center pb-2"
        aria-hidden="true"
      >
        <img
          src="/nama_event.webp"
          alt=""
          className="w-[90%] max-w-4xl h-auto object-contain filter brightness-0 invert"
        />
      </div>

      {/* 3. Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Info & Identity (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-3">
              <Link href="/" className="inline-block group">
                <img
                  src="/nama_event.webp"
                  alt="Gravel Grindurance 2026"
                  className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <span className="font-display text-xs sm:text-sm font-black uppercase italic tracking-wider text-[#FA6D0B] block">
                ANNIVERSARY EDITION <span className="text-white font-mono font-normal">·</span> 8 YEARS OF ENDURANCE
              </span>
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {t(
                'Ekspedisi balap sepeda ultra-endurance dan gravel mandiri (unsupported) tahunan oleh GX-ID (Gravel & Ultra Cycling Indonesia). Melintasi koridor Jonggol–Sukamakmur–Sentul di musim hujan.',
                'Annual unsupported ultra-endurance gravel cycling expedition organized by GX-ID (Gravel & Ultra Cycling Indonesia). Traversing Jonggol–Sukamakmur–Sentul loops in the rainy season.'
              )}
            </p>

            <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-2 border-t border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="text-[#FA6D0B] font-bold tracking-wider">HOST //</span>
                <span className="text-slate-200 font-medium">ABEEY Coffee &amp; Eatery · LRT Harjamukti</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[#FA6D0B] font-bold tracking-wider">DATE //</span>
                <span className="text-slate-200 font-medium">{t('Minggu, 13 Desember 2026', 'Sunday, 13 December 2026')}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[#FA6D0B] font-bold tracking-wider">COMMUNITY //</span>
                <span className="text-slate-200 font-medium">{t('80.000+ Pesepeda · 19 Chapter', '80,000+ Cyclists · 19 Chapters')}</span>
              </div>
            </div>
          </div>

          {/* Athlete Race Hub (3 Cols) */}
          <div className="md:col-span-3 space-y-3.5">
            <div className="border-b border-white/10 pb-2.5 flex items-center justify-between">
              <h4 className="font-display text-xs sm:text-sm font-black uppercase italic tracking-wider text-white">
                {t('ATHLETE RACE HUB', 'ATHLETE RACE HUB')}
              </h4>
              <span className="text-[#FA6D0B] font-mono text-[10px] tracking-widest font-bold">// 01</span>
            </div>

            <ul className="space-y-2.5 font-display font-bold uppercase tracking-wider text-xs sm:text-[13px]">
              <li>
                <Link href="/kategori" className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">{t('5 Kategori & Rute GPX', '5 Categories & GPX Routes')}</span>
                  <span className="font-mono text-[10px] text-slate-500 group-hover:text-[#FA6D0B]">60–200K</span>
                </Link>
              </li>
              <li>
                <Link href="/peserta" className="text-white hover:text-[#FA6D0B] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Rider Roster (Start List)</span>
                </Link>
              </li>
              <li>
                <Link href="/cek-bib" className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">{t('Cek Nomor BIB Digital', 'Check Digital BIB Number')}</span>
                </Link>
              </li>
              <li>
                <Link href="/peraturan" className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">{t('Regulasi & Athlete Guide', 'Rules & Athlete Guide')}</span>
                </Link>
              </li>
              <li>
                <Link href="/scrutineering" className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">{t('Meja Scrutineering', 'Scrutineering Desk')}</span>
                  <span className="font-mono text-[10px] text-slate-500">03:00 WIB</span>
                </Link>
              </li>
              <li>
                <Link href="/checkpoint" className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">{t('Kalkulator Pitstop 300%', '300% Pitstop Calculator')}</span>
                  <span className="font-mono text-[10px] text-slate-500">CP#4 / CP#6</span>
                </Link>
              </li>
              <li className="pt-1.5 border-t border-white/5">
                <Link href="/daftar" className="text-[#FA6D0B] hover:text-white font-black tracking-wider transition-colors flex items-center gap-1.5">
                  <span>{t('PENDAFTARAN PESERTA →', 'RIDER REGISTRATION →')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Community Channels (2 Cols) */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="border-b border-white/10 pb-2.5 flex items-center justify-between">
              <h4 className="font-display text-xs sm:text-sm font-black uppercase italic tracking-wider text-white">
                GX-ID NETWORK
              </h4>
              <span className="text-[#FA6D0B] font-mono text-[10px] tracking-widest font-bold">// 02</span>
            </div>

            <ul className="space-y-2.5 font-display font-bold uppercase tracking-wider text-xs sm:text-[13px]">
              <li>
                <a
                  href="https://instagram.com/gxid.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">@gxid.official</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/260107147993705/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">FB GX-ID Group</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/260107147993705/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">FB Marketplace</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://strava.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Strava Club GX-ID</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://linktr.ee/gxid.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Portofolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <Link href="/#chapters" className="text-slate-300 hover:text-[#FA6D0B] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">{t('19 Chapter Resmi', '19 Official Chapters')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Race Operations & Emergency (2 Cols) */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="border-b border-white/10 pb-2.5 flex items-center justify-between">
              <h4 className="font-display text-xs sm:text-sm font-black uppercase italic tracking-wider text-white">
                OPERATIONS
              </h4>
              <span className="text-[#FA6D0B] font-mono text-[10px] tracking-widest font-bold">// 03</span>
            </div>
            
            {/* Emergency Hospital Partner */}
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-3.5 space-y-1.5">
              <span className="block text-[9px] uppercase text-[#FA6D0B] font-mono font-bold tracking-wider">
                EMERGENCY MEDICAL PARTNER //
              </span>
              <span className="text-white font-display font-black text-xs sm:text-[13px] uppercase italic block leading-snug">
                SPGDT RS Hermina Cibubur
              </span>
              <span className="text-slate-400 font-mono text-[10px] block">
                HOTLINE: 021-828-1234
              </span>
            </div>

            {/* Committee WhatsApp Hotline */}
            <div className="pt-1">
              <a
                href="https://wa.me/628562720141"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3.5 rounded-full border border-[#FA6D0B]/60 hover:border-[#FA6D0B] bg-[#FA6D0B]/10 hover:bg-[#FA6D0B] text-[#FA6D0B] hover:text-black font-display font-black text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center justify-between group active:scale-95 shadow-sm"
              >
                <span>{t('WHATSAPP PANITIA', 'COMMITTEE HOTLINE')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* 4. Telemetry Bottom Bar (Copyright & Datum Protocol) */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 gap-3 text-center sm:text-left">
          <p>© 2026 GX-ID (GRAVEL &amp; ULTRA CYCLING INDONESIA). ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 uppercase tracking-wider">
            <span>{t('TERRAIN: MAKADAM · ASPAL RUSAK · TANAH', 'TERRAIN: MACADAM · ROUGH TARMAC · DIRT')}</span>
            <span className="text-[#FA6D0B] select-none">//</span>
            <span>TIMEZONE: WIB (UTC+7)</span>
            <span className="text-[#FA6D0B] select-none">//</span>
            <span className="text-[#FA6D0B] font-bold">RAIN SEASON EDITION</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
