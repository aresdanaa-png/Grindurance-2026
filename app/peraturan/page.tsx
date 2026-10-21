'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function PeraturanPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black scroll-smooth relative overflow-x-hidden">
      
      {/* ──────────────────────────────────────────────────────────
          1. HERO HEADER: ATMOSPHERIC ATHLETIC BANNER
      ────────────────────────────────────────────────────────── */}
      <div className="relative border-b border-white/10 overflow-hidden bg-black">
        {/* Background Cyclist Action Photography with Seamless Fade Dissolve */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/perjalanan-siklis-di-jalur-oranye.webp"
            alt="Gravel Grindurance Cyclists"
            fill
            priority
            className="object-cover object-[center_35%] opacity-35 filter grayscale contrast-125 scale-105"
          />
          {/* Radial Orange Ambient Backlight Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FA6D0B]/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
          {/* Top & Bottom Dissolve Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E11]/80 via-transparent to-[#0D0E11]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11] via-transparent to-[#0D0E11]" />
        </div>

        {/* Faint Event Logo Watermark */}
        <div className="absolute -bottom-10 right-4 sm:right-12 pointer-events-none select-none opacity-[0.05] z-0">
          <img
            src="/nama_event.webp"
            alt=""
            className="w-[500px] sm:w-[750px] h-auto object-contain filter brightness-0 invert"
          />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="font-bold text-[#FA6D0B] uppercase tracking-widest px-3 py-1 bg-[#FA6D0B]/15 rounded-full border border-[#FA6D0B]/30 backdrop-blur-md">
              GX-ID TECHNICAL HANDBOOK · 2026 OFFICIAL SPEC
            </span>
            <span className="text-white/30 select-none hidden sm:inline">·</span>
            <span className="text-slate-400">
              STATUS: <strong className="text-white">ENFORCED · ZERO TOLERANCE</strong>
            </span>
            <span className="text-white/30 select-none hidden sm:inline">·</span>
            <span className="text-slate-400">
              COT MAX: <strong className="text-[#FA6D0B]">17 JAM (ULTRA 200K)</strong>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display italic text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[0.95]">
              {t('REGULASI & ATURAN TEKNIS BALAP', 'RACE REGULATIONS & TECHNICAL HANDBOOK')}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-sans">
              {t(
                'Buku panduan keselamatan resmi, etika kemandirian mutlak tanpa bantuan luar (self-supported), matriks sanksi penalti waktu, spesifikasi teknis sepeda musim hujan, dan protokol gawat darurat SPGDT 24 Jam.',
                'Official safety rulebook, absolute self-supported ethos, official time penalty matrix, rainy season mechanical requirements, and 24-hour SPGDT emergency protocols for Gravel Grindurance 2026.'
              )}
            </p>
          </div>

          {/* Telemetry Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-black/60 backdrop-blur-xl shadow-lg relative overflow-hidden group transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FA6D0B]/5 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">SUPPORT FORMAT</span>
              <strong className="text-white text-sm sm:text-base font-bold uppercase mt-1 block">UNSUPPORTED</strong>
            </div>
            <div className="p-4 rounded-xl bg-black/60 backdrop-blur-xl shadow-lg relative overflow-hidden group transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FA6D0B]/5 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">PENALTI MAKSIMUM</span>
              <strong className="text-white text-sm sm:text-base font-bold uppercase mt-1 block">300% / DSQ SEKETIKA</strong>
            </div>
            <div className="p-4 rounded-xl bg-black/60 backdrop-blur-xl shadow-lg relative overflow-hidden group transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FA6D0B]/5 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">SPESIFIKASI BAN</span>
              <strong className="text-[#FA6D0B] text-sm sm:text-base font-bold uppercase mt-1 block">MIN 35C TUBELESS</strong>
            </div>
            <div className="p-4 rounded-xl bg-black/60 backdrop-blur-xl shadow-lg relative overflow-hidden group transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.03] rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">TIM MEDIS SPGDT</span>
              <strong className="text-white text-sm sm:text-base font-bold uppercase mt-1 block">24H FREE EVACUATION</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. STICKY TELEMETRY QUICK-JUMP NAVIGATION BAR
      ────────────────────────────────────────────────────────── */}
      <div className="sticky top-16 sm:top-[72px] z-40 bg-[#0D0E11]/92 backdrop-blur-2xl border-y border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none font-mono text-[11px] sm:text-xs">
            <a
              href="#unsupported"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-[#FA6D0B]/10 text-slate-300 whitespace-nowrap transition-all uppercase tracking-wider font-bold"
            >
              01 · {t('KEMANDIRIAN', 'SELF-SUPPORT')}
            </a>
            <a
              href="#penalti"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-[#FA6D0B]/10 text-slate-300 whitespace-nowrap transition-all uppercase tracking-wider font-bold"
            >
              02 · {t('MATRIKS PENALTI', 'PENALTY MATRIX')}
            </a>
            <a
              href="#prolog"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-[#FA6D0B]/10 text-slate-300 whitespace-nowrap transition-all uppercase tracking-wider font-bold"
            >
              03 · {t('PROLOG 30 KM', '30K PROLOGUE')}
            </a>
            <a
              href="#ultra200"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-[#FA6D0B]/10 text-slate-300 whitespace-nowrap transition-all uppercase tracking-wider font-bold"
            >
              04 · {t('COT 17 JAM ULTRA', '17H ULTRA COT')}
            </a>
            <a
              href="#scrutineering"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-[#FA6D0B]/10 text-slate-300 whitespace-nowrap transition-all uppercase tracking-wider font-bold"
            >
              05 · {t('SCRUTINEERING HUJAN', 'SCRUTINEERING')}
            </a>
            <a
              href="#medis"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-[#FA6D0B]/10 text-slate-300 whitespace-nowrap transition-all uppercase tracking-wider font-bold"
            >
              06 · {t('MEDIS SPGDT 24H', 'SPGDT MEDICAL')}
            </a>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          3. ATHLETIC ATMOSPHERIC BACKGROUND SYSTEM (DNA INFUSION)
      ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Background 1: Upper Section Timeline Action Photography */}
        <div 
          className="absolute top-96 left-0 right-0 h-[1800px] opacity-25"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/backgrounds/bg-timeline.webp"
            alt=""
            className="w-full h-full object-cover object-[center_20%] filter contrast-[1.15] saturate-[1.2] brightness-[0.85]"
          />
        </div>

        {/* Background 2: Lower Section Categories / Pelotons Photography */}
        <div 
          className="absolute top-[2800px] left-0 right-0 h-[2200px] opacity-20"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/backgrounds/bg-categories.webp"
            alt=""
            className="w-full h-full object-cover object-[center_35%] filter contrast-[1.2] saturate-[1.2] brightness-[0.8]"
          />
        </div>

        {/* Luminous Orange Aurora Ambient Glows */}
        <div className="absolute top-[18%] -left-32 w-[650px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.18)_0%,rgba(250,109,11,0.03)_50%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-[48%] -right-32 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.15)_0%,rgba(217,83,7,0.02)_55%,transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute top-[75%] left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Subtle Horizontal Telemetry Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100%_48px]"
          aria-hidden="true" 
        />
      </div>

      {/* ──────────────────────────────────────────────────────────
          4. MAIN REGULATIONS CONTENT CONTAINER
      ────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">

        {/* ── 01. PRINSIP UTAMA: UNSUPPORTED (KEMANDIRIAN PENUH) ── */}
        <ScrollReveal>
          <section id="unsupported" className="space-y-6">
            <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-6 sm:p-10 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group">
              {/* Ambient Radial Corner Flare */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FA6D0B]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FA6D0B]/15 transition-all duration-700" />

            <div className="border-b border-white/10 pb-4 flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
                01 · {t('PRINSIP DASAR KEMANDIRIAN', 'CORE ETHOS: PURE SELF-SUPPORTED')}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                REF: GX-ID-REG-01
              </span>
            </div>

            <div>
              <h2 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {t('FILOSOFI KEMANDIRIAN MUTLAK (SELF-SUPPORTED ETHOS)', 'ABSOLUTE SELF-SUPPORTED PHILOSOPHY')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-4xl">
                {t(
                  'Gravel Grindurance menganut tradisi balap tantangan ketahanan murni tanpa bantuan luar (unsupported). Setiap peserta bertanggung jawab penuh atas navigasi rute, hidrasi, nutrisi, perbaikan mekanik sepeda, dan keselamatan dirinya sendiri sejak dilepas di Start Gate hingga menyentuh garis Finis.',
                  'Gravel Grindurance adheres to pure unsupported endurance challenge traditions. Every rider carries total autonomy over course navigation, hydration, nutrition, mechanical repairs, and self-preservation from Start Gate dispatch until crossing the Finish Line.'
                )}
              </p>
            </div>

            {/* Commissaire Callout Quote */}
            <div className="border-l-2 border-[#FA6D0B] pl-4 sm:pl-6 py-2.5 bg-[#FA6D0B]/10 rounded-r-xl backdrop-blur-md">
              <p className="font-sans italic text-xs sm:text-sm text-slate-200 leading-relaxed">
                {t(
                  '"Beautiful Suffering lahir dari kemandirian sejati. Tidak ada mobil pengawal, tidak ada jalan pintas. Hanya Anda, sepeda Anda, dan tantangan cuaca koridor Jonggol."',
                  '"Beautiful Suffering is born of true autonomy. No escort vehicles, no shortcuts. Just you, your machine, and the West Java elements."'
                )}
              </p>
              <span className="font-mono text-[11px] text-[#FA6D0B] font-bold block mt-1 uppercase tracking-wider">
                DEWAN COMMISSAIRE GRINDURANCE 2026
              </span>
            </div>

            {/* 2-Column Rules Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs">
              {/* Strictly Forbidden Box */}
              <div className="bg-black/60 backdrop-blur-xl p-6 sm:p-7 rounded-2xl transition-all space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden group/box">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
                    {t('DILARANG KERAS', 'STRICTLY FORBIDDEN')}
                  </span>
                  <span className="text-[10px] text-white font-bold px-2.5 py-0.5 rounded-full bg-white/10">
                    DSQ TRIGGER
                  </span>
                </div>
                <ul className="space-y-3 text-slate-300 font-sans leading-relaxed text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-white font-mono font-bold select-none shrink-0">•</span>
                    <span>{t('Membawa mobil atau kru pengawalan pribadi (private support car/escort crew) di sepanjang koridor perlombaan.', 'Private vehicle escort, personal support cars, or motor assistance along the course.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white font-mono font-bold select-none shrink-0">•</span>
                    <span>{t('Menerima suplai makanan/minuman (feeding) atau pergantian sepeda/roda dari kendaraan pribadi di luar pos resmi panitia.', 'Receiving nutrition feeding or spare bike/wheel handoffs from private escort vehicles.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white font-mono font-bold select-none shrink-0">•</span>
                    <span>{t('Pelanggaran terhadap asas ini berakibat DISKUALIFIKASI (DSQ) seketika tanpa kompromi.', 'Violating these principles results in immediate DISQUALIFICATION (DSQ) with no right of appeal.')}</span>
                  </li>
                </ul>
              </div>

              {/* Permitted Commercial Access Box */}
              <div className="bg-black/60 backdrop-blur-xl p-6 sm:p-7 rounded-2xl transition-all space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden group/box">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-black text-[#FA6D0B] uppercase tracking-wider text-xs sm:text-sm">
                    {t('DIPERBOLEHKAN', 'PERMITTED')}
                  </span>
                  <span className="text-[10px] text-[#FA6D0B] font-bold px-2.5 py-0.5 rounded-full bg-[#FA6D0B]/15">
                    PUBLIC ACCESS
                  </span>
                </div>
                <ul className="space-y-3 text-slate-300 font-sans leading-relaxed text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-mono font-bold select-none shrink-0">•</span>
                    <span>{t('Membeli makanan, minuman, dan suku cadang dari warung warga lokal, minimarket, atau bengkel umum yang terbuka untuk publik.', 'Purchasing provisions and bike parts from local roadside warungs, minimarts, or public workshops.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-mono font-bold select-none shrink-0">•</span>
                    <span>{t('Saling tolong-menolong antar sesama peserta di lintasan (bantuan mekanik kawan, berbagi pompa atau tambal ban).', 'Mutual peer assistance between registered riders (sharing tools, patches, chain links, pumps).')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FA6D0B] font-mono font-bold select-none shrink-0">•</span>
                    <span>{t('Memanfaatkan fasilitas musala, tempat istirahat umum warga, dan pos hidrasi resmi panitia.', 'Using community resting spots, public restrooms, and official event water refill stations.')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </section>
        </ScrollReveal>

        {/* ── 02. TABEL PENALTI WAKTU & DISKUALIFIKASI RESMI ── */}
        <ScrollReveal>
          <section id="penalti" className="space-y-6">
          <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-6 sm:p-10 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
            {/* Ambient Backlight Flare */}
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#FA6D0B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="border-b border-white/10 pb-4 flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
                02 · {t('SANKSI & DISKUALIFIKASI RESMI', 'OFFICIAL SANCTIONS & PENALTY MATRIX')}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                REF: GX-ID-PENALTY-02
              </span>
            </div>

            <div>
              <h2 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {t('MATRIKS PENALTI WAKTU TERUKUR', 'MEASURED TIME PENALTY MATRIX')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-4xl">
                {t(
                  'Penalti dihitung oleh panitia melalui verifikasi rekaman GPX, catatan waktu scan barcode tiap pos checkpoint, dan sistem LiveTracking Traccar. Seluruh penalti waktu akan ditambahkan langsung ke waktu tempuh resmi atlet.',
                  'Penalties are computed by the commissaire desk auditing GPX activity files, geofence checkpoints, and Traccar live telemetry logs. Time penalties are directly added to the rider’s official elapsed time.'
                )}
              </p>
            </div>

            {/* Commissaire Matrix Table */}
            <div className="overflow-x-auto rounded-2xl bg-black/55 backdrop-blur-xl shadow-lg">
              <table className="w-full text-left text-xs sm:text-sm font-mono text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-slate-400 uppercase tracking-wider text-[11px] bg-white/[0.05]">
                    <th className="py-4 px-4 sm:px-6">{t('PELANGGARAN REGULASI', 'VIOLATION')}</th>
                    <th className="py-4 px-4 sm:px-6">{t('SANKSI WAKTU / STATUS', 'SANCTION')}</th>
                    <th className="py-4 px-4 sm:px-6">{t('DASAR PERHITUNGAN TEKNIS', 'TECHNICAL BASIS')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white uppercase">
                      {t('Keluar Rute / Potong Jalan (Off-Course)', 'Off-Course Shortcut')}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-black text-[#FA6D0B] uppercase whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-[#FA6D0B]/20 border border-[#FA6D0B]/40 inline-block shadow-[0_0_15px_rgba(250,109,11,0.2)]">
                        150% {t('WAKTU SEGMEN', 'SEGMENT TIME')}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 font-sans text-xs leading-relaxed">
                      {t('Dihitung 1,5x dari estimasi waktu lintasan resmi yang dilewati/dipotong.', 'Calculated as 1.5x the baseline time of the bypassed official course sector.')}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white uppercase">
                      {t('Mangkir Pitstop Wajib 30 Menit', 'Skipping Mandatory 30-Min Pitstop')}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-black text-[#FA6D0B] uppercase whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-[#FA6D0B]/15 inline-block">
                        300% (+90 {t('MENIT', 'MINUTES')})
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 font-sans text-xs leading-relaxed">
                      {t('Wajib jeda netral min. 30 menit di pos nutrisi (CP#4 / CP#6). Mangkir dikenai denda 3x lipat.', 'Mandatory 30-min neutral rest break. Skipping or under-timing incurs a 3x surcharge penalty.')}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white uppercase">
                      {t('Melewatkan 1 Checkpoint (CP)', 'Missing 1 Checkpoint (CP)')}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-black text-[#FA6D0B] uppercase whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-[#FA6D0B]/20 inline-block shadow-[0_0_15px_rgba(250,109,11,0.2)]">
                        +60 {t('MENIT PENALTI', 'MINUTES PENALTY')}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 font-sans text-xs leading-relaxed">
                      {t('Tidak ada log barcode scan atau geofencing Traccar di titik pos terkait.', 'Missing timestamp verification or geofence breadcrumb at designated checkpoint.')}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white uppercase">
                      {t('Melewatkan > 1 Checkpoint (CP)', 'Missing > 1 Checkpoint (CP)')}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-black text-white uppercase whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-white/10 inline-block">
                        NC (NON-COMPETITIVE)
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 font-sans text-xs leading-relaxed">
                      {t('Kehilangan hak atas klasifikasi podium balap kompetitif.', 'Loss of podium and competitive ranking eligibility; designated as non-competitive finisher.')}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white uppercase">
                      {t('Bantuan Kendaraan / Mobil Kru Pengawal', 'Private Support Car / Vehicle Escort')}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-black text-black uppercase whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-[#FA6D0B] text-black inline-block shadow-[0_0_20px_rgba(250,109,11,0.4)]">
                        DSQ · DISKUALIFIKASI
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 font-sans text-xs leading-relaxed">
                      {t('Pelanggaran berat asas unsupported. Nomor peserta dicabut seketika.', 'Severe breach of self-supported rules. Bib number revoked immediately on the course.')}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white uppercase">
                      {t('Penggunaan Sepeda Listrik (E-Bike)', 'E-Bike / Motorized Assist')}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-black text-slate-400 uppercase whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 inline-block">
                        NC · REKREASI EKSHIBISI
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 font-sans text-xs leading-relaxed">
                      {t('Hanya diizinkan sebagai gowes ekshibisi, tidak masuk klasifikasi podium.', 'Permitted solely as exhibition ride; completely excluded from official timing & podium.')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* ── 03. ARSITEKTUR PROLOG MANDIRI 30 KM (150 KM & 200 KM) ── */}
        <ScrollReveal>
          <section id="prolog" className="space-y-6">
          <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-6 sm:p-10 space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
            {/* Ambient Backlight Flare */}
            <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#FA6D0B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="border-b border-white/10 pb-4 flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
                03 · {t('REGULASI PROLOG 30 KM MANDIRI', 'MANDATORY 30 KM SELF-PROLOGUE PROTOCOL')}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                KHUSUS 150 KM &amp; 200 KM
              </span>
            </div>

            <div>
              <h2 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {t('KONSEP JARAK KOMPOSIT RESMI', 'COMPOSITE DISTANCE ARCHITECTURE')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-4xl">
                {t(
                  'Sesuai dokumen resmi GRINDURANCE 2026, kategori 150 KM dan 200 KM menerapkan format jarak komposit: peserta merancang dan menyelesaikan sendiri etape prolog 30 km di waktu subuh sebelum bergabung di Start Gate LRT Harjamukti Cibubur.',
                  'Per canonical GRINDURANCE 2026 specifications, 150 KM and 200 KM categories feature composite distance architecture: riders design and complete an independent 30 km dawn prologue before regrouping at LRT Harjamukti Start Gate.'
                )}
              </p>
            </div>

            {/* Visual Composite Distance Breakdown Bars */}
            <div className="space-y-4 font-mono">
              {/* 150 KM Breakdown */}
              <div className="p-5 sm:p-6 rounded-2xl bg-black/55 backdrop-blur-xl space-y-3 shadow-lg">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-bold text-white uppercase text-sm sm:text-base font-display italic">
                    150 KM GRAND FONDO
                  </span>
                  <span className="text-[#FA6D0B] font-bold">TOTAL: 150 KM · ELEVASI +1.760 M</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                  <div className="sm:col-span-3 p-3.5 rounded-xl bg-[#FA6D0B]/15 text-center">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">PROLOG MANDIRI</span>
                    <strong className="text-[#FA6D0B] text-lg block font-display italic">30 KM</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">03:00 - 05:00 WIB</span>
                  </div>
                  <div className="sm:col-span-1 flex items-center justify-center text-white/40 text-xl font-bold">
                    +
                  </div>
                  <div className="sm:col-span-8 p-3.5 rounded-xl bg-white/[0.04] flex flex-col justify-center">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">RUTE RESMI PANITIA</span>
                      <strong className="text-white text-lg font-display italic">120 KM</strong>
                    </div>
                    <span className="text-[11px] text-slate-300 font-sans mt-0.5">
                      Koridor Jonggol Ridge &amp; Sukamakmur · Elevasi gain +1.760 m · Max altitude 680 m MDPL
                    </span>
                  </div>
                </div>
              </div>

              {/* 200 KM Breakdown */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FA6D0B]/10 to-black/60 backdrop-blur-xl space-y-3 shadow-lg">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-bold text-[#FA6D0B] uppercase text-sm sm:text-base font-display italic">
                    200 KM ULTRA ENDURANCE
                  </span>
                  <span className="text-white font-bold">TOTAL: 200 KM · ELEVASI +2.530 M · COT 17 JAM</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                  <div className="sm:col-span-3 p-3.5 rounded-xl bg-[#FA6D0B] text-black text-center font-bold shadow-[0_0_20px_rgba(250,109,11,0.3)]">
                    <span className="text-[10px] uppercase block">PROLOG MANDIRI</span>
                    <strong className="text-black text-lg block font-display italic">30 KM</strong>
                    <span className="text-[10px] block mt-0.5">03:00 - 05:00 WIB</span>
                  </div>
                  <div className="sm:col-span-1 flex items-center justify-center text-white/40 text-xl font-bold">
                    +
                  </div>
                  <div className="sm:col-span-8 p-3.5 rounded-xl bg-white/[0.04] flex flex-col justify-center">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">RUTE RESMI ULTRA</span>
                      <strong className="text-white text-lg font-display italic">170 KM</strong>
                    </div>
                    <span className="text-[11px] text-slate-300 font-sans mt-0.5">
                      Full Loop 4 Wilayah · 8 Tanjakan (Tanjakan ke-5: 8.87 km @ 7%) · Max altitude 1.110 m MDPL
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrutineering Dawn Flow Steps */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <span className="font-mono text-xs text-[#FA6D0B] uppercase font-bold tracking-wider block">
                PROSEDUR VERIFIKASI PROLOG DI MEJA SCRUTINEERING SUBUH:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 font-mono text-xs">
                <div className="p-5 rounded-2xl bg-black/50 backdrop-blur-xl space-y-2 hover:bg-[#FA6D0B]/5 transition-all shadow-md group">
                  <span className="text-[#FA6D0B] font-bold block text-xs group-hover:scale-105 transition-transform">STEP 01</span>
                  <strong className="text-white block font-sans text-sm">Gowes Mandiri Subuh</strong>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Selesaikan gowes outdoor min 30 km antara pukul 03:00 – 05:00 WIB menuju venue start.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-black/50 backdrop-blur-xl space-y-2 hover:bg-[#FA6D0B]/5 transition-all shadow-md group">
                  <span className="text-[#FA6D0B] font-bold block text-xs group-hover:scale-105 transition-transform">STEP 02</span>
                  <strong className="text-white block font-sans text-sm">Tunjukkan GPS Log</strong>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Tunjukkan file track log (Garmin / Wahoo / Strava) ke dewan commissaire di meja scrutineering.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-black/50 backdrop-blur-xl space-y-2 hover:bg-[#FA6D0B]/5 transition-all shadow-md group">
                  <span className="text-[#FA6D0B] font-bold block text-xs group-hover:scale-105 transition-transform">STEP 03</span>
                  <strong className="text-white block font-sans text-sm">Stempel Cleared</strong>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Peserta yang memenuhi jarak &ge; 30 km menerima stempel verifikasi pada nomor plat BIB sepeda.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-black/50 backdrop-blur-xl space-y-2 hover:bg-black/70 transition-all shadow-md group">
                  <span className="text-white font-bold block text-xs group-hover:scale-105 transition-transform">DISIPLIN</span>
                  <strong className="text-white block font-sans text-sm">Deny Start</strong>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Peserta yang gagal membuktikan 30 km dilarang masuk start pen atau diturunkan kategori.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* ── 04. REGULASI KHUSUS 200 KM ULTRA & DAYLIGHT RIDGE ── */}
        <ScrollReveal>
          <section id="ultra200" className="space-y-6">
          <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-6 sm:p-10 space-y-6 shadow-[0_20px_60px_rgba(250,109,11,0.2)] relative overflow-hidden">
            {/* Ambient Orange Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FA6D0B]/12 rounded-full blur-3xl pointer-events-none" />

            <div className="border-b border-white/10 pb-4 flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
                04 · {t('REGULASI KHUSUS 200 KM ULTRA', 'SPECIAL REGULATIONS: 200 KM ULTRA')}
              </span>
              <span className="text-xs text-black font-black bg-[#FA6D0B] px-3.5 py-1 rounded-full uppercase shadow-[0_0_15px_rgba(250,109,11,0.4)]">
                COT RESMI: 17 JAM
              </span>
            </div>

            <div>
              <h2 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {t('BATAS WAKTU 17 JAM & DAYLIGHT RIDGE COMPLETION', '17-HOUR CUT-OFF & DAYLIGHT RIDGE MANDATE')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-4xl">
                {t(
                  'Kategori 200 KM Ultra adalah ujian puncak fisik, mental, dan navigasi malam. Dua regulasi keselamatan mutlak diberlakukan untuk melindungi keselamatan peserta di medan terpencil:',
                  'The 200 KM Ultra represents the ultimate trial of physical stamina and night navigation. Two safety mandates are enforced to safeguard athletes across remote backcountry corridors:'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {/* Box COT 17 Jam */}
              <div className="p-7 rounded-2xl bg-gradient-to-br from-[#FA6D0B]/15 via-black/60 to-black/85 backdrop-blur-xl space-y-3 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FA6D0B]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FA6D0B]/20 transition-all" />
                <span className="font-display italic text-2xl sm:text-3xl font-black text-[#FA6D0B] uppercase tracking-tight block">
                  COT RESMI · 17 JAM DARI START
                </span>
                <p className="font-sans text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {t(
                    'Pelepasan Wave 1 berlangsung pukul 05:30 WIB. Garis finis resmi di ABBEY Coffee & Eatery ditutup tepat pukul 22:30 WIB malam (tepat 17 jam perlombaan). Peserta yang tiba setelah 22:30 WIB tercatat sebagai DNF (Did Not Finish).',
                    'Wave 1 dispatches at 05:30 WIB. The official finish line at ABBEY Coffee shuts down at 22:30 WIB (exactly 17 hours of racing). Arrivals past 22:30 WIB are designated DNF.'
                  )}
                </p>
              </div>

              {/* Box Daylight Ridge Completion */}
              <div className="p-7 rounded-2xl bg-black/60 backdrop-blur-xl space-y-3 shadow-lg relative overflow-hidden group">
                <span className="font-display italic text-2xl sm:text-3xl font-black text-white uppercase tracking-tight block">
                  DAYLIGHT RIDGE · WAJIB SAAT TERANG
                </span>
                <p className="font-sans text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {t(
                    'Peserta wajib telah menyelesaikan segmen punggungan karst berbahaya dan tanjakan monster ke-5 (8.87 km @ 7%, elevasi 628 m) saat kondisi masih terang sebelum pukul 17:30 WIB. Peserta yang terlambat akan ditahan marshals demi keselamatan navigasi.',
                    'Riders must clear hazardous karst ridges and the 5th climb (8.87 km @ 7%, 628 m climb) during daylight before 17:30 WIB. Stragglers will be held by marshals for safety extraction.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* ── 05. CHECKLIST SCRUTINEERING & SEPEDA MUSIM HUJAN ── */}
        <ScrollReveal>
          <section id="scrutineering" className="space-y-6">
          <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-6 sm:p-10 space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
            {/* Ambient Backlight Flare */}
            <div className="absolute -top-16 right-1/4 w-80 h-80 bg-[#FA6D0B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="border-b border-white/10 pb-4 flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
                05 · {t('STANDAR TEKNIS & SCRUTINEERING SEPEDA', 'SCRUTINEERING & RAINY SEASON BIKE SPECS')}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                MEJA SCRUTINEERING SUBUH
              </span>
            </div>

            <div>
              <h2 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {t('STANDAR PERALATAN MUSIM HUJAN (WET GRAVEL)', 'WET SEASON TECHNICAL SPECIFICATIONS')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-4xl">
                {t(
                  'Desember merupakan puncak musim hujan di Jawa Barat. Seluruh sepeda wajib lulus inspeksi mekanik di meja scrutineering sebelum diizinkan masuk ke start pen:',
                  'December brings peak monsoon season to West Java. Every bicycle must clear mechanical scrutineering inspection before entering the start corrals:'
                )}
              </p>
            </div>

            {/* 4 Technical Inspection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              {/* Card 1: Ban */}
              <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl hover:bg-black/75 transition-all space-y-3 shadow-lg relative overflow-hidden group">
                <div className="w-8 h-1 bg-[#FA6D0B] rounded-full group-hover:w-16 transition-all" />
                <span className="font-black text-[#FA6D0B] uppercase tracking-wider block text-xs sm:text-sm">
                  SPESIFIKASI BAN
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(
                    'Lebar ban minimal 35mm untuk 100K–200K (sangat direkomendasikan tubeless 38–45c dengan sealant segar untuk menaklukkan makadam basah).',
                    'Minimum 35mm tire width for 100K–200K (tubeless 38–45c with fresh sealant strongly recommended for wet macadam).'
                  )}
                </p>
              </div>

              {/* Card 2: Kokpit No Aerobars */}
              <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl hover:bg-black/75 transition-all space-y-3 shadow-lg relative overflow-hidden group">
                <div className="w-8 h-1 bg-white/60 rounded-full group-hover:w-16 transition-all" />
                <span className="font-black text-white uppercase tracking-wider block text-xs sm:text-sm">
                  AEROBAR DILARANG
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(
                    'Clip-on aerobar TT dilarang keras di seluruh kategori offline demi kecepatan reaksi pengereman di lintasan licin dan turunan teknis.',
                    'Clip-on aero bars strictly prohibited across all categories for instant emergency braking response on wet technical descents.'
                  )}
                </p>
              </div>

              {/* Card 3: Lampu Ganda */}
              <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl hover:bg-black/75 transition-all space-y-3 shadow-lg relative overflow-hidden group">
                <div className="w-8 h-1 bg-white/60 rounded-full group-hover:w-16 transition-all" />
                <span className="font-black text-white uppercase tracking-wider block text-xs sm:text-sm">
                  PENCAHAYAAN GANDA
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(
                    'Kategori 120, 150, dan 200 wajib membawa minimal 2 lampu depan mandiri (min 400 lumen) serta lampu belakang merah steady non-strobo.',
                    'Categories 120, 150, and 200 require min 2 independent front headlamps (min 400 lumens) and steady non-strobe red rear lights.'
                  )}
                </p>
              </div>

              {/* Card 4: Drivetrain & Tools */}
              <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl hover:bg-black/75 transition-all space-y-3 shadow-lg relative overflow-hidden group">
                <div className="w-8 h-1 bg-white/60 rounded-full group-hover:w-16 transition-all" />
                <span className="font-black text-white uppercase tracking-wider block text-xs sm:text-sm">
                  RANTAI & TOOLKIT
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(
                    'Wajib menggunakan pelumas rantai basah (wet lube), membawa master chain link cadangan, pompa mini/CO2, dan multitool dengan chain breaker.',
                    'Mandatory wet chain lube, spare master quick-link, mini pump/CO2, and multitool equipped with chain breaker.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* ── 06. TIM MEDIS SPGDT & RESPON GAWAT DARURAT 24 JAM ── */}
        <ScrollReveal>
          <section id="medis" className="space-y-6">
          <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-6 sm:p-10 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
            {/* Ambient Backlight Flare */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FA6D0B]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="border-b border-white/10 pb-4 flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
                06 · {t('DUKUNGAN MEDIS & SISTEM EVAKUASI', 'MEDICAL SUPPORT & ROUTE EVACUATION')}
              </span>
              <span className="text-xs text-white font-bold px-3 py-1 rounded-full bg-white/10 uppercase tracking-widest font-mono">
                RS HERMINA SPGDT 24H
              </span>
            </div>

            <div>
              <h2 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {t('TIM MEDIS SPGDT & EVAKUASI RESMI BEBAS BIAYA', 'OFFICIAL SPGDT PARAMEDICS & FREE EVACUATION')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-4xl">
                {t(
                  'Ambulans mobile berfasilitas Advance Life Support dan tim paramedis sepeda motor trail bersiaga di koridor Jonggol & Sukamakmur. Evakuasi medis darurat di rute perlombaan untuk atlet terdaftar resmi adalah BEBAS BIAYA (GRATIS).',
                  'Mobile Advance Life Support ambulances and dirt-bike paramedic teams patrol the Jonggol & Sukamakmur corridors. Emergency route evacuation for registered riders is completely FREE OF CHARGE.'
                )}
              </p>
            </div>

            {/* Tactical Medical Dispatch Box */}
            <div className="bg-black/70 backdrop-blur-xl p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 font-mono shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
                  {t('HOTLINE GAWAT DARURAT MEDIS 24 JAM (SPGDT / RS HERMINA):', '24-HOUR EMERGENCY MEDICAL HOTLINE (SPGDT / RS HERMINA):')}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white hover:text-[#FA6D0B] tracking-widest block font-mono transition-colors">
                  0815 1965 6133
                </span>
                <span className="text-[11px] text-slate-400 block font-sans">
                  {t('Siaga ambulans darurat di titik Jonggol & Sukamakmur', 'Emergency ambulances staged at Jonggol & Sukamakmur')}
                </span>
              </div>
              <a
                href="https://wa.me/6281519656133"
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto px-8 py-4 rounded-full font-mono font-black text-xs uppercase tracking-wider bg-[#FA6D0B] hover:bg-[#DE5A00] text-black transition-all cursor-pointer whitespace-nowrap shadow-[0_0_25px_rgba(250,109,11,0.5)] hover:-translate-y-0.5 active:scale-95 text-center flex items-center justify-center shrink-0"
              >
                {t('HUBUNGI MEDIS SPGDT', 'CALL SPGDT EMERGENCY')}
              </a>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* ── FINAL REGISTRATION CTA ── */}
        <ScrollReveal>
          <div className="text-center pt-8 pb-4 space-y-4 max-w-xl mx-auto px-2">
            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              {t('SIAP MENGHADAPI TANTANGAN BEAUTIFUL SUFFERING?', 'READY TO EMBRACE BEAUTIFUL SUFFERING?')}
            </p>
            <div className="flex justify-center">
              <Link
                href="/daftar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-4.5 rounded-full font-sans font-black uppercase tracking-wider text-xs sm:text-sm bg-[#FA6D0B] text-black shadow-[0_0_40px_rgba(250,109,11,0.6)] hover:bg-[#DE5A00] transition-all hover:-translate-y-0.5 active:scale-95 group cursor-pointer text-center whitespace-nowrap"
              >
                <span>{t('DAFTAR SEKARANG — AMBIL NOMOR START', 'REGISTER NOW — CLAIM YOUR BIB')}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
