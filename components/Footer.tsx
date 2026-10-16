'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0B0C0E] border-t border-white/10 text-slate-400 mt-auto font-sans relative overflow-hidden">
      
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

      {/* 2. Massive Background Watermark Typography (Rapha / Canyon Editorial Style) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden opacity-[0.025] z-0"
        aria-hidden="true"
      >
        <span className="font-display text-[160px] sm:text-[220px] lg:text-[280px] font-black italic tracking-tighter uppercase text-white whitespace-nowrap leading-none block">
          GRINDURANCE
        </span>
      </div>

      {/* 3. Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Info & Identity (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-3">
              <Link href="/" className="inline-block group">
                <img
                  src="/nama_event.webp"
                  alt="Gravel Grindurance 2026"
                  className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <span className="font-display text-xs sm:text-sm font-black uppercase italic tracking-wider text-[#FA6D0B] block">
                ANNIVERSARY EDITION <span className="text-white font-mono font-normal">·</span> 8 YEARS OF ENDURANCE
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {t(
                'Ekspedisi balap sepeda ultra-endurance dan gravel mandiri (unsupported) tahunan oleh GX-ID (Gravel & Ultra Cycling Indonesia). Melintasi koridor Jonggol–Sukamakmur–Sentul di musim hujan.',
                'Annual unsupported ultra-endurance gravel cycling expedition organized by GX-ID (Gravel & Ultra Cycling Indonesia). Traversing Jonggol–Sukamakmur–Sentul loops in the rainy season.'
              )}
            </p>

            <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1.5 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-[#FA6D0B] font-bold">HOST:</span>
                <span className="text-slate-300">ABEEY Coffee & Eatery · LRT Harjamukti, Cibubur</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FA6D0B] font-bold">DATE:</span>
                <span className="text-slate-300">{t('Minggu, 13 Desember 2026 (Minggu Ke-2)', 'Sunday, 13 December 2026 (Week 2)')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FA6D0B] font-bold">COMMUNITY:</span>
                <span className="text-slate-300">{t('80.000+ Pesepeda · 19 Chapter Regional', '80,000+ Cyclists · 19 Regional Chapters')}</span>
              </div>
            </div>
          </div>

          {/* Athlete Race Hub (2.5 Cols) */}
          <div className="md:col-span-3 space-y-3.5 text-xs">
            <h4 className="text-white font-mono font-black uppercase tracking-wider text-[11px] border-b border-white/10 pb-2">
              {t('ATHLETE RACE HUB', 'ATHLETE RACE HUB')}
            </h4>
            <ul className="space-y-2 uppercase tracking-wide font-mono text-[11px]">
              <li>
                <Link href="/kategori" className="hover:text-[#FA6D0B] transition-colors flex items-center justify-between">
                  <span>{t('5 Kategori & GPX', '5 Categories & GPX')}</span>
                  <span className="text-[10px] text-[#FA6D0B]">60–200K</span>
                </Link>
              </li>
              <li>
                <Link href="/peserta" className="hover:text-[#FA6D0B] transition-colors text-white font-bold flex items-center justify-between">
                  <span>Rider Roster (Start List)</span>
                  <span className="text-[9px] text-[#FA6D0B] bg-[#FA6D0B]/10 px-1.5 py-0.5 rounded border border-[#FA6D0B]/20">LIVE</span>
                </Link>
              </li>
              <li>
                <Link href="/cek-bib" className="hover:text-[#FA6D0B] transition-colors">
                  {t('Cek Nomor BIB Digital', 'Check Digital BIB Number')}
                </Link>
              </li>
              <li>
                <Link href="/peraturan" className="hover:text-[#FA6D0B] transition-colors">
                  {t('Regulasi & Athlete Guide', 'Rules & Athlete Guide')}
                </Link>
              </li>
              <li>
                <Link href="/scrutineering" className="hover:text-[#FA6D0B] transition-colors flex items-center justify-between">
                  <span>{t('Meja Scrutineering', 'Scrutineering Desk')}</span>
                  <span className="text-[10px] text-slate-500">03:00 WIB</span>
                </Link>
              </li>
              <li>
                <Link href="/checkpoint" className="hover:text-[#FA6D0B] transition-colors flex items-center justify-between">
                  <span>{t('Kalkulator Pitstop 300%', '300% Pitstop Calculator')}</span>
                  <span className="text-[10px] text-slate-500">CP#4 / CP#6</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/daftar" className="hover:text-white transition-colors text-[#FA6D0B] font-bold">
                  {t('Pendaftaran Peserta →', 'Rider Registration →')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Community Channels (2.5 Cols) */}
          <div className="md:col-span-2 space-y-3.5 text-xs">
            <h4 className="text-white font-mono font-black uppercase tracking-wider text-[11px] border-b border-white/10 pb-2">
              GX-ID NETWORK
            </h4>
            <ul className="space-y-2 uppercase tracking-wide font-mono text-[11px]">
              <li>
                <a
                  href="https://instagram.com/gxid.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span>@gxid.official</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/260107147993705/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span>FB GX-ID Group</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/260107147993705/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span>FB Marketplace</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://strava.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span>Strava Club GX-ID</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://linktr.ee/gxid.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FA6D0B] transition-colors flex items-center justify-between group"
                >
                  <span>Portofolio Linktree</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FA6D0B] transition-colors" />
                </a>
              </li>
              <li>
                <Link href="/#chapters" className="hover:text-[#FA6D0B] transition-colors">
                  {t('19 Chapter Resmi', '19 Official Chapters')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Race Operations & Emergency (2 Cols) */}
          <div className="md:col-span-2 space-y-3.5 text-xs">
            <h4 className="text-white font-mono font-black uppercase tracking-wider text-[11px] border-b border-white/10 pb-2">
              RACE OPERATIONS
            </h4>
            
            {/* Emergency Hospital Partner */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 space-y-1">
              <span className="block text-[9px] uppercase text-[#FA6D0B] font-mono font-bold tracking-wider">
                EMERGENCY MEDICAL PARTNER:
              </span>
              <span className="text-white font-mono text-[11px] font-bold block leading-snug">
                SPGDT RS Hermina Cibubur
              </span>
              <span className="text-slate-400 font-mono text-[10px] block">
                021-828-1234
              </span>
            </div>

            {/* Committee WhatsApp Hotline */}
            <div className="pt-1">
              <a
                href="https://wa.me/628562720141"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3.5 rounded-full border border-[#FA6D0B]/60 hover:border-[#FA6D0B] bg-[#FA6D0B]/10 hover:bg-[#FA6D0B] text-[#FA6D0B] hover:text-black font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center justify-between group active:scale-95 shadow-sm"
              >
                <span>{t('WHATSAPP PANITIA', 'COMMITTEE HOTLINE')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* 4. Telemetry Bottom Bar (Copyright & Datum Protocol) */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 gap-3 text-center sm:text-left">
          <p>© 2026 GX-ID (Gravel & Ultra Cycling Indonesia). All rights reserved.</p>
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
