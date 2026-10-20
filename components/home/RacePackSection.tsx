'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function RacePackSection() {
  const { t } = useLanguage();
  return (
    <>
      {/* 2.5 PAKET PESERTA & MERCHANDISE (RAD RACE INSPIRED - EDITORIAL & ELEGAN) */}
      <section id="racepack" className="pt-6 sm:pt-8 pb-5 sm:pb-6 text-white relative">
        
        {/* Dynamic Action Tandem Cyclists Background (pesepeda2.webp) - 3RD BOTTOM IMAGE */}
        <div 
          className="absolute top-8 sm:top-12 bottom-0 inset-x-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 35%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 35%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/backgrounds/bg-racepack.webp"
            alt="Grindurance Equipped Gravel Cyclist"
            className="w-full h-full object-cover object-[center_10%] lg:object-[75%_8%] opacity-90 filter contrast-[1.18] saturate-[1.2] brightness-[0.95] blur-[0.4px]"
          />
          {/* Seamless dark gradient overlays - smooth top fade-in from dark pause and bottom dissolve */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#090A0D] via-[#090A0D]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/80 via-[#090A0D]/45 to-[#090A0D]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0C0E] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7 relative z-10">
          
          {/* Section Header: Alternating Right-Aligned Layout (Kiri-Kanan Rhythm) with Custom Text Graphic */}
          <div className="flex flex-col md:flex-row-reverse md:items-end justify-between gap-4 border-b border-white/10 pb-4 sm:pb-5">
            <div className="flex flex-col items-start md:items-end space-y-3">
              <span className="text-sm sm:text-base md:text-lg font-black text-[#FA6D0B] uppercase tracking-widest block font-mono">
                PARTICIPANT PACKAGES // 2026 EDITION
              </span>
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[560px] group">
                {/* Ambient Radial Backlight Glow in exact brand orange */}
                <div className="absolute -inset-3 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.28)_0%,transparent_70%)] blur-2xl opacity-80 pointer-events-none" />
                <img
                  src="/text race pack.webp"
                  alt="Race Pack & Merchandise"
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

            <div className="flex flex-col items-start space-y-3.5 max-w-md">
              {/* Pure Typographic Sub-Header */}
              <div className="font-mono text-xs font-bold uppercase tracking-widest">
                <span className="text-white font-black">{t('2 OPSI PAKET', '2 PACKAGE OPTIONS')}</span>
                <span className="text-[#FA6D0B] mx-2 font-bold select-none">//</span>
                <span className="text-slate-400">{t('TARIF TRANSPARAN', 'TRANSPARENT RATES')}</span>
              </div>
              <div className="border-l-2 md:border-l-0 md:border-r-2 border-[#FA6D0B] pl-4 md:pl-0 md:pr-4 py-0.5 md:text-right w-full">
                <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                  {t(
                    'Sistem pendaftaran dua opsi: pilih paket Medal Saja untuk esensi tantangan mandiri, atau upgrade ke paket Medal & Jersey resmi GX-ID buatan Pollride (+Rp 50.000). Seluruh paket mencakup perlengkapan hari-H.',
                    'Two registration options: choose the Medal Only package for the pure self-supported challenge, or upgrade to the official Pollride GX-ID Medal & Jersey package (+IDR 50,000). All packages include race-day essentials.'
                  )}
                </p>
                {/* Micro-telemetry Status: Batas Produksi */}
                <div className="mt-2.5 flex items-center md:justify-end gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse shrink-0" />
                  <span>{t('JAMINAN HARI-H DITUTUP:', 'RACEDAY GUARANTEE CLOSES:')} <strong className="text-white font-bold">{t('10 NOVEMBER 2026', 'NOVEMBER 10, 2026')}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL PACKAGE COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tier 1: Medal Only */}
            <div className="p-5 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl flex flex-col justify-between space-y-6 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
                      {t('OPSI 01', 'OPTION 01')}
                    </span>
                    <span className="text-[#FA6D0B] font-bold text-xs tracking-wider select-none">//</span>
                    <span className="text-white text-xs font-sans font-bold uppercase tracking-wider">
                      {t('ESENSIAL', 'ESSENTIAL')}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-slate-400 font-semibold uppercase tracking-wider">
                    {t('TARIF DASAR KATEGORI', 'BASE CATEGORY RATE')}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    {t('PAKET MEDAL ONLY', 'MEDAL ONLY PACKAGE')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {t(
                      'Pilihan tepat bagi pesepeda yang fokus pada esensi jarak, tantangan mandiri, dan koleksi medali resmi finisher.',
                      'The ideal choice for cyclists focusing on pure endurance distance, self-supported challenge, and official finisher medals.'
                    )}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3.5 text-xs sm:text-[13px] text-slate-300 font-sans">
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>{t('Nomor Plat Sepeda Tahan Air #1000+ & QR Check-in', 'Waterproof Bike Number Plate #1000+ & QR Check-in')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>{t('Asuransi Kecelakaan Resmi 1 Hari Event', 'Official 1-Day Event Accident Insurance')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>{t('Nutrisi NDR Energy Gel + Isotonic Drink', 'NDR Energy Gel Nutrition + Isotonic Drink')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>{t('Akses Finisher Lounge & Voucher Pemulihan ABEEY Coffee', 'Finisher Lounge Access & ABEEY Coffee Recovery Voucher')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans">
                <span className="text-slate-400 font-medium uppercase tracking-wider">{t('MULAI DARI RP 200.000', 'STARTING FROM IDR 200,000')}</span>
                <span className="text-white font-bold uppercase tracking-wider">{t('TERMASUK FASILITAS HARI-H', 'INCLUDES RACEDAY ESSENTIALS')}</span>
              </div>
            </div>

            {/* Tier 2: Medal & Jersey */}
            <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-b from-[#FA6D0B]/15 via-black/60 to-black/80 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-[0_20px_60px_rgba(250,109,11,0.22)] transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-black text-[#FA6D0B] uppercase tracking-wider">
                      {t('OPSI 02', 'OPTION 02')}
                    </span>
                    <span className="text-[#FA6D0B] font-bold text-xs tracking-wider select-none">//</span>
                    <span className="text-white text-xs font-sans font-bold uppercase tracking-wider">
                      {t('REKOMENDASI LENGKAP', 'COMPLETE RECOMMENDED')}
                    </span>
                  </div>
                  <span className="text-xs font-sans font-bold text-[#FA6D0B] uppercase tracking-wider">
                    {t('HANYA +RP 50.000 / PAX', 'ONLY +IDR 50,000 / PAX')}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    {t('PAKET MEDAL & JERSEY RESMI', 'OFFICIAL MEDAL & JERSEY PACKAGE')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {t(
                      'Paket lengkap terfavorit. Mendapatkan seluruh fasilitas Paket Medal Only ditambah Official Anniversary Aero Jersey buatan Pollride.',
                      'Top-favorite complete package. Includes all Medal Only perks plus the Official Anniversary Aero Jersey by Pollride.'
                    )}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3.5 text-xs sm:text-[13px] text-slate-300 font-sans">
                  <div className="flex items-start gap-3 font-bold text-white">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>{t('Official Anniversary Aero Jersey by Pollride (Senilai Rp 350.000)', 'Official Anniversary Aero Jersey by Pollride (IDR 350K Value)')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>{t('Nomor Plat Sepeda Tahan Air #1000+ & QR Check-in', 'Waterproof Bike Number Plate #1000+ & QR Check-in')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>{t('Asuransi Kecelakaan Resmi 1 Hari Event', 'Official 1-Day Event Accident Insurance')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>{t('Nutrisi NDR Energy Gel + Isotonic + Voucher ABEEY Coffee', 'NDR Energy Gel Nutrition + Isotonic + ABEEY Coffee Voucher')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans">
                <span className="text-slate-400 font-medium uppercase tracking-wider">{t('SUBSIDI KOMUNITAS GX-ID', 'GX-ID COMMUNITY SUBSIDY')}</span>
                <span className="text-[#FA6D0B] font-bold uppercase tracking-wider">BEST SELLER EDITION</span>
              </div>
            </div>

          </div>

          {/* LOGISTIK RACE PACK (RPC) — 2-COLUMN ATHLETIC TELEMETRY STRIP */}
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 p-6 sm:p-7 gap-6 md:gap-0">
              
              {/* Column 1: Ambil Mandiri saat RPC Day */}
              <div className="flex flex-col justify-between md:pr-8 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                      {t('PENGAMBILAN MANDIRI // RPC DAY', 'SELF-PICKUP // RPC DAY')}
                    </span>
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white/10 text-white border border-white/15">
                      {t('GRATIS / RP 0', 'FREE / IDR 0')}
                    </span>
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-none">
                    {t('MINGGU, 6 DESEMBER 2026', 'SUNDAY, DECEMBER 6, 2026')}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {t('Diambil langsung di ', 'Pick up directly at ')}<strong className="text-white">ABEEY Coffee &amp; Eatery Cibubur</strong>{t(' (10:00–17:00 WIB). Sudah termasuk menghadiri sesi Coaching Clinic & Technical Meeting resmi.', ' (10:00–17:00 WIB). Includes access to official Coaching Clinic & Technical Meeting sessions.')}
                </p>
              </div>

              {/* Column 2: Opsi Handling Fee */}
              <div className="flex flex-col justify-between md:pl-8 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                      {t('OPSI HANDLING FEE // LOGISTIK KHUSUS', 'HANDLING FEE OPTION // SPECIAL LOGISTICS')}
                    </span>
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-[#FA6D0B] text-black">
                      {t('OPSI TAMBAHAN', 'ADD-ON OPTION')}
                    </span>
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-[#FA6D0B] tracking-tight leading-none">
                    +RP 20.000 <span className="text-xs font-sans text-slate-400 font-bold uppercase tracking-wider">{t('/ PAX', '/ RIDER')}</span>
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {t('Bagi peserta yang ', 'For riders who are ')}<strong className="text-white">{t('berhalangan hadir saat RPC Day', 'unable to attend RPC Day')}</strong>{t('. Disiapkan via handling khusus panitia / pengambilan saat Hari-H dengan konfirmasi terlebih dahulu.', '. Handled via dedicated organizer desk / race-day collection with prior notice.')}
                </p>
              </div>

            </div>
          </div>

          {/* EDITORIAL PRODUCT SHOWCASE (Lookbook Grid — Harmonized with UI DNA) */}
          <div className="space-y-4 pt-4">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FA6D0B]">
                  {t('RINCIAN ITEM RESMI', 'OFFICIAL ITEM DETAILS')}
                </span>
                <span className="text-[#FA6D0B] font-bold text-xs select-none">//</span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                  LOOKBOOK
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                // 3 CORE ITEMS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* ITEM 1: JERSEY */}
              <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 transition-all duration-300 flex flex-col justify-between p-6 select-none">
                    {/* Top Labels */}
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs font-black uppercase tracking-wider text-[#FA6D0B]">
                        // POLLRIDE AERO FIT
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {t('EDISI 2026', '2026 EDITION')}
                      </span>
                    </div>

                    {/* Pure Typographic Centerpiece */}
                    <div className="flex flex-col items-center justify-center my-auto text-center space-y-1.5">
                      <div className="font-display text-6xl sm:text-7xl font-black text-white/10 tracking-tighter group-hover:text-white/20 transition-colors leading-none">
                        01
                      </div>
                      <div className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        COMING SOON
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FA6D0B] font-bold">
                        OFFICIAL DESIGN REVEAL
                      </div>
                    </div>

                    {/* Bottom Telemetry Strip */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <span>APPAREL LAB</span>
                      <span className="text-white font-bold">{t('STAGE // PRODUKSI', 'STAGE // PRODUCTION')}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider">
                      <span className="text-slate-400">01</span>
                      <span className="text-[#FA6D0B] font-bold text-xs select-none">//</span>
                      <span className="text-[#FA6D0B]">{t('APPAREL RESMI', 'OFFICIAL APPAREL')}</span>
                    </div>
                    <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                      OFFICIAL ANNIVERSARY JERSEY
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {t(
                        'Material mesh bernapas berteknologi quick-dry dengan grafis kontur topografi Jonggol–Sukamakmur. Dirancang khusus untuk cuaca basah dan lembap.',
                        'Breathable quick-dry mesh material with Jonggol–Sukamakmur topographic contour graphics. Engineered specifically for humid and wet conditions.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>Quick-Dry Mesh</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('3 Saku Belakang', '3 Rear Pockets')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>Zipper YKK Lock</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('Garis Reflektif', 'Reflective Accents')}</span>
                  </div>
                </div>
              </div>

              {/* ITEM 2: MEDAL */}
              <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 transition-all duration-300 flex flex-col justify-between p-6 select-none">
                    {/* Top Labels */}
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                        // {t('SEMUA KATEGORI', 'ALL CATEGORIES')}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {t('EDISI 2026', '2026 EDITION')}
                      </span>
                    </div>

                    {/* Pure Typographic Centerpiece */}
                    <div className="flex flex-col items-center justify-center my-auto text-center space-y-1.5">
                      <div className="font-display text-6xl sm:text-7xl font-black text-white/10 tracking-tighter group-hover:text-white/20 transition-colors leading-none">
                        02
                      </div>
                      <div className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        COMING SOON
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FA6D0B] font-bold">
                        MOLD 3D RELIEF
                      </div>
                    </div>

                    {/* Bottom Telemetry Strip */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <span>ZINC ALLOY METAL</span>
                      <span className="text-white font-bold">{t('STAGE // CETAK', 'STAGE // MOLDING')}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider">
                      <span className="text-slate-400">02</span>
                      <span className="text-[#FA6D0B] font-bold text-xs select-none">//</span>
                      <span className="text-[#FA6D0B]">{t('MEDALI SAH', 'OFFICIAL MEDAL')}</span>
                    </div>
                    <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                      HEAVY FINISHER METAL MEDAL
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {t(
                        'Medali berbobot tebal dari paduan zinc alloy antique bronze dengan ukiran timbul 3D topografi puncak pegunungan dan lanyard tenun edisi peringatan.',
                        'Heavyweight solid zinc alloy medal in antique bronze with 3D embossed summit topography and official commemorative woven lanyard.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('Paduan Solid Zinc', 'Solid Zinc Alloy')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('Relief Timbul 3D', '3D Embossed Relief')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('Lanyard Woven Tebal', 'Heavy Woven Lanyard')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('Finisher Luring & Virtual', 'In-Person & Virtual Finishers')}</span>
                  </div>
                </div>
              </div>

              {/* ITEM 3: RACE PACK KIT */}
              <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 transition-all duration-300 flex flex-col justify-between p-6 select-none">
                    {/* Top Labels */}
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                        // {t('HARI-H READY', 'RACE-DAY READY')}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {t('EDISI 2026', '2026 EDITION')}
                      </span>
                    </div>

                    {/* Pure Typographic Centerpiece */}
                    <div className="flex flex-col items-center justify-center my-auto text-center space-y-1.5">
                      <div className="font-display text-6xl sm:text-7xl font-black text-white/10 tracking-tighter group-hover:text-white/20 transition-colors leading-none">
                        03
                      </div>
                      <div className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        COMING SOON
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FA6D0B] font-bold">
                        {t('KURASI PERLENGKAPAN', 'EQUIPMENT CURATION')}
                      </div>
                    </div>

                    {/* Bottom Telemetry Strip */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <span>{t('LOGISTIK ATLET', 'ATHLETE LOGISTICS')}</span>
                      <span className="text-white font-bold">{t('STAGE // FINALISASI', 'STAGE // FINALIZATION')}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider">
                      <span className="text-slate-400">03</span>
                      <span className="text-[#FA6D0B] font-bold text-xs select-none">//</span>
                      <span className="text-[#FA6D0B]">{t('ESENSIAL ATLET', 'ATHLETE ESSENTIALS')}</span>
                    </div>
                    <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                      {t('PERLENGKAPAN & LAYANAN HARI-H', 'RACE-DAY GEAR & SERVICES')}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {t(
                        'Plat nomor sepeda tahan air, nutrisi gel energi NDR, minuman elektrolit, asuransi kecelakaan resmi, serta voucher hidangan pemulihan di ABEEY.',
                        'Waterproof bike number plate, NDR energy gel nutrition, electrolyte drinks, official accident insurance, and recovery meal voucher at ABEEY.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('Plat BIB Waterproof', 'Waterproof BIB Plate')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>NDR Energy Gel</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('Asuransi Resmi', 'Official Insurance')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[#FA6D0B] font-bold select-none">//</span>
                    <span>{t('Voucher ABEEY Lounge', 'ABEEY Lounge Voucher')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Minimalist Bottom CTA Strip */}
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-[#FA6D0B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                <span>{t('KUOTA TERBATAS', 'LIMITED SLOTS')}</span>
                <span className="font-bold text-xs">//</span>
                <span>{t('AMANKAN BIB ANDA', 'SECURE YOUR BIB')}</span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                {t('PILIH KATEGORI & DAPATKAN PAKET ANDA', 'CHOOSE CATEGORY & GET YOUR PACK')}
              </h4>
              <p className="text-xs text-slate-400">
                {t(
                  'Pendaftaran ditutup saat kuota per kategori terpenuhi atau batas akhir pendaftaran tercapai.',
                  'Registration closes once category quota is reached or registration deadline expires.'
                )}
              </p>
            </div>
            <Link
              href="/daftar"
              className="px-8 py-3.5 rounded-full text-xs font-sans font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_25px_rgba(250,109,11,0.35)]"
            >
              <span>{t('PILIH PAKET & DAFTAR', 'SELECT PACK & REGISTER')}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
    </>
  );
}
