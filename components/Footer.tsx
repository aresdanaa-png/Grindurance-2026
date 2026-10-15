'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0D0E11] border-t border-white/10 text-slate-400 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-black tracking-tight text-white uppercase italic">
                GRAVEL GRINDURANCE <span className="text-[#FA6D0B]">2026</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {t(
                'Ekspedisi balap sepeda ultra-endurance dan gravel mandiri (unsupported) tahunan oleh GX-ID (Gravel & Ultra Cycling Indonesia). Loop Jonggol–Sukamakmur–Sentul di musim hujan.',
                'Annual unsupported ultra-endurance gravel cycling expedition organized by GX-ID (Gravel & Ultra Cycling Indonesia). Traversing Jonggol–Sukamakmur–Sentul loops during the rainy season.'
              )}
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1 font-semibold">
              <div>HOST: ABEEY Coffee & Eatery • LRT Harjamukti, Cibubur</div>
              <div>{t('DATE: Minggu, Minggu Ke-2 Desember 2026', 'DATE: Sunday, 2nd Week of December 2026')}</div>
              <div>{t('COMMUNITY: 80.000+ Pesepeda • 19 Chapter Regional', 'COMMUNITY: 80,000+ Cyclists • 19 Regional Chapters')}</div>
            </div>
          </div>

          {/* Navigasi (3 Cols) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] border-b border-white/10 pb-2">
              {t('Navigasi Resmi', 'Official Navigation')}
            </h4>
            <ul className="space-y-2 uppercase tracking-wide font-medium">
              <li>
                <Link href="/kategori" className="hover:text-[#FA6D0B] transition-colors">
                  {t('5 Kategori & Rute', '5 Categories & Routes')}
                </Link>
              </li>
              <li>
                <Link href="/peserta" className="hover:text-[#FA6D0B] transition-colors text-white font-bold">
                  Rider Roster (Start List)
                </Link>
              </li>
              <li>
                <Link href="/peraturan" className="hover:text-[#FA6D0B] transition-colors">
                  {t('Regulasi & Athlete Guide', 'Rules & Athlete Guide')}
                </Link>
              </li>
              <li>
                <Link href="/cek-bib" className="hover:text-[#FA6D0B] transition-colors">
                  {t('Cek Nomor BIB Digital', 'Check Digital BIB Number')}
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="hover:text-[#FA6D0B] transition-colors text-[#FA6D0B] font-bold">
                  {t('Pendaftaran Peserta', 'Rider Registration')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Operasional & Kontak (4 Cols) */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] border-b border-white/10 pb-2">
              Race Operations & Hotline
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/scrutineering" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>{t('Meja Scrutineering (Prolog 30 km)', 'Scrutineering Desk (30 km Prologue)')}</span>
                  <span className="text-[10px] text-[#FA6D0B] border border-white/10 px-1.5 py-0.5 rounded">03:00 WIB</span>
                </Link>
              </li>
              <li>
                <Link href="/checkpoint" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>{t('Kalkulator Pitstop 300%', '300% Pitstop Calculator')}</span>
                  <span className="text-[10px] text-slate-400 border border-white/10 px-1.5 py-0.5 rounded">CP#4 / CP#6</span>
                </Link>
              </li>
              <li className="pt-2 text-slate-400">
                <span className="block text-[10px] uppercase text-slate-500 font-bold">Emergency Medical Partner:</span>
                <span className="text-white font-semibold">SPGDT RS Hermina Cibubur (021-828-1234)</span>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/628562720141"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#FA6D0B] hover:underline text-xs font-bold"
                >
                  <span>{t('WhatsApp Panitia (+62 856-2720-141)', 'Committee WhatsApp (+62 856-2720-141)')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© 2026 GX-ID (Gravel & Ultra Cycling Indonesia). All rights reserved.</p>
          <div className="flex items-center gap-4 uppercase tracking-wider font-semibold">
            <span>{t('Terrain: Makadam · Aspal Rusak · Tanah', 'Terrain: Macadam · Rough Tarmac · Dirt')}</span>
            <span>•</span>
            <span className="text-[#FA6D0B]">Rain Season Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
