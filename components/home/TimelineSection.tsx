'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function TimelineSection() {
  const [activeScheduleTab, setActiveScheduleTab] = useState<'raceday' | 'praevent' | 'matrix'>('raceday');
  const { t } = useLanguage();

  return (
    <>
      {/* 4. EVENT TIMELINE & WAVE DISPATCH RUNDOWN (POIN 2) */}
      {/* ========================================================================= */}
      <section id="jadwal" className="pt-6 sm:pt-8 pb-8 sm:pb-10 border-t border-white/10 bg-[#0B0C0E] relative overflow-hidden">
        
        {/* Action Cyclist on Orange Trail Background (Perjalanan Siklis di Jalur Oranye) */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 8%, black 22%, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 8%, black 22%, black 82%, transparent 100%)'
          }}
        >
          <img
            src="/backgrounds/bg-timeline.webp"
            alt="Perjalanan Siklis di Jalur Oranye - Grindurance Ultra Cycling"
            className="w-full h-full object-cover object-[center_30%] sm:object-[center_22%] opacity-85 filter contrast-[1.15] saturate-[1.2] brightness-[0.95] blur-[0.4px]"
          />
          {/* Seamless overlays to ensure perfect blend with #0B0C0E */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0B0C0E] via-[#0B0C0E]/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/75 via-[#0B0C0E]/30 to-[#0B0C0E]/75" />
          <div className="absolute inset-0 bg-[#0B0C0E]/20" />
        </div>

        {/* Luminous Orange Aurora Ambient Glows */}
        <div className="absolute -top-16 right-1/4 w-[540px] h-[540px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.18)_0%,rgba(250,109,11,0.04)_50%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-[620px] h-[620px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.12)_0%,rgba(217,83,7,0.03)_55%,transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/3 w-[560px] h-[560px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Subtle Horizontal Telemetry Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100%_48px]"
          aria-hidden="true" 
        />

        {/* Vignette Overlay for High-Contrast Information Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/40 via-transparent to-[#0B0C0E]/70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 sm:pb-5">
            <div className="space-y-3">
              <span className="text-sm sm:text-base font-black text-[#FA6D0B] uppercase tracking-widest block font-mono">
                {t('RUNDOWN RESMI // OPERASIONAL BALAPAN', 'OFFICIAL RUNDOWN // RACE OPERATIONS')}
              </span>
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] group">
                {/* Subtle ambient backlight glow in brand orange */}
                <div className="absolute -inset-3 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.28)_0%,transparent_70%)] blur-2xl opacity-80 pointer-events-none" />
                <img
                  src="/text-event-timeline.webp"
                  alt="Event Timeline & Wave Dispatch"
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <h2 className="sr-only">EVENT TIMELINE &amp; WAVE DISPATCH</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {t(
                  'Manajemen waktu presisi untuk menjamin keselamatan dan kelancaran 5 kategori balap. Mulai dari sesi Race Pack Collection (RPC), verifikasi Scrutineering fajar, pelepasan gelombang start teratur, hingga panggung podium perayaan di ABEEY Coffee & Eatery.',
                  'Precise time management ensuring the safety and seamless operation of 5 race categories. From the Race Pack Collection (RPC) session, dawn Scrutineering verification, staggered wave dispatch, to the celebration podium stage at ABEEY Coffee & Eatery.'
                )}
              </p>
            </div>

            {/* Quick Action / Reference */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/peraturan"
                className="px-5 py-2.5 rounded-full border border-white/15 hover:border-[#FA6D0B]/50 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all flex items-center gap-2"
              >
                <span>ATHLETE GUIDE PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FA6D0B]" />
              </Link>
            </div>
          </div>

          {/* Interactive Tab Switcher: Using Brand Pill Shape rounded-full (1 Baris Saja - DNA UI) */}
          <div className="flex items-center gap-2 sm:gap-2.5 border-b border-white/10 pb-3 sm:pb-3.5 overflow-x-auto no-scrollbar flex-nowrap w-full">
            <button
              onClick={() => setActiveScheduleTab('raceday')}
              className={`px-3.5 sm:px-4 lg:px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeScheduleTab === 'raceday'
                  ? 'bg-[#FA6D0B] text-black shadow-lg shadow-[#FA6D0B]/20 font-black'
                  : 'bg-black/20 backdrop-blur-md text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-black/30'
              }`}
            >
              <span>{t('RACE DAY (HARI-H) // 13 DES 2026', 'RACE DAY // DEC 13, 2026')}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeScheduleTab === 'raceday' ? 'bg-black/20 text-black font-black' : 'bg-white/10 text-slate-300'
              }`}>
                03:00–21:00 WIB
              </span>
            </button>

            <button
              onClick={() => setActiveScheduleTab('praevent')}
              className={`px-3.5 sm:px-4 lg:px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeScheduleTab === 'praevent'
                  ? 'bg-[#FA6D0B] text-black shadow-lg shadow-[#FA6D0B]/20 font-black'
                  : 'bg-black/20 backdrop-blur-md text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-black/30'
              }`}
            >
              <span>{t('RPC DAY & PRA-EVENT // 6 DES 2026', 'RPC DAY & PRE-EVENT // DEC 6, 2026')}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeScheduleTab === 'praevent' ? 'bg-black/20 text-black font-black' : 'bg-white/10 text-slate-300'
              }`}>
                RPC, CLINIC &amp; TM
              </span>
            </button>

            <button
              onClick={() => setActiveScheduleTab('matrix')}
              className={`px-3.5 sm:px-4 lg:px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeScheduleTab === 'matrix'
                  ? 'bg-[#FA6D0B] text-black shadow-lg shadow-[#FA6D0B]/20 font-black'
                  : 'bg-black/20 backdrop-blur-md text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-black/30'
              }`}
            >
              <span>{t('MATRIKS GELOMBANG (5 KATEGORI)', 'WAVE DISPATCH MATRIX (5 CATEGORIES)')}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeScheduleTab === 'matrix' ? 'bg-black/20 text-black font-black' : 'bg-white/10 text-slate-300'
              }`}>
                WAVE &amp; COT
              </span>
            </button>
          </div>

          {/* TAB 1: RACE DAY ITINERARY */}
          {activeScheduleTab === 'raceday' && (
            <div className="space-y-6">
              
              {/* Context Summary Bar */}
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FA6D0B] shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                      {t(
                        'VENUE UTAMA: ABEEY COFFEE & EATERY, HARJAMUKTI — MINGGU, 13 DESEMBER 2026',
                        'MAIN VENUE: ABEEY COFFEE & EATERY, HARJAMUKTI — SUNDAY, DECEMBER 13, 2026'
                      )}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {t(
                        'Titik Kumpul Start & Finish Terintegrasi Stasiun LRT Harjamukti Cibubur',
                        'Integrated Start & Finish Assembly Point with Harjamukti Cibubur LRT Station'
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400 shrink-0">
                  <span>FLAG OFF: <strong className="text-[#FA6D0B]">05:30 WIB</strong></span>
                  <span className="text-[#FA6D0B]">//</span>
                  <span>FINAL COT: <strong className="text-white">00:30 WIB (H+1)</strong></span>
                </div>
              </div>

              {/* Vertical Timeline Container */}
              <div className="relative border-l border-white/15 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">

                {/* ITEM 1: PROLOG 30 KM */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-black group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-[#FA6D0B]/40 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          03:00 — 05:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FA6D0B]">
                          {t('WAJIB KHUSUS 150 & 200 KM', 'MANDATORY FOR 150 & 200 KM')}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">
                        {t('RUTE MANDIRI SUBUH', 'DAWN SELF-ROUTE')}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                      {t('MANDIRI PROLOG 30 KM // REKAMAN GPS MANDIRI', 'SELF-START 30 KM PROLOGUE // GPS ACTIVITY LOG')}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(
                        'Peserta kategori 150 km dan 200 km wajib menuntaskan minimal 30 km mandiri dari titik asal masing-masing menuju venue atau di rute sekitar Cibubur sebelum pukul 05:00 WIB. File aktivitas rekam jejak GPS (Garmin, Wahoo, atau Strava GPX/FIT) diverifikasi panitia di Meja Scrutineering fajar.',
                        'Participants in the 150 km and 200 km categories must complete at least 30 km independently from their origin point to the venue or around Cibubur before 05:00 WIB. GPS activity log files (Garmin, Wahoo, or Strava GPX/FIT) are verified at the dawn Scrutineering Desk.'
                      )}
                    </p>

                    <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-300 space-y-0.5">
                      <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">
                        {t('Mitigasi Keselamatan Mutlak:', 'Absolute Safety Mitigation:')}
                      </strong>
                      <span className="text-slate-400">
                        {t(
                          'Peserta yang gagal melampirkan log prolog 30 km atau tiba lewat pukul 05:15 WIB tidak diizinkan masuk starting grid demi mencegah kelelahan berlebih dan risiko medis.',
                          'Riders failing to submit a 30 km prologue log or arriving after 05:15 WIB will not be admitted to the starting grid to prevent severe exhaustion and medical risks.'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ITEM 2: VENUE OPEN & SCRUTINEERING */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/40 bg-black group-hover:border-white group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-white/25 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          04:30 — 05:15 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                          {t('SEMUA PESERTA LURING', 'ALL IN-PERSON RIDERS')}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">ABEEY COFFEE LOUNGE</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                      {t('VENUE OPEN & MEJA SCRUTINEERING AKHIR', 'VENUE OPEN & FINAL SCRUTINEERING DESK')}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(
                        'Pintu registrasi ulang dan inspeksi teknis dibuka. Peserta melakukan scan QR e-ticket nomor BIB, verifikasi kelayakan sepeda (rem, ban, drivetrain), serta inspeksi perlengkapan keselamatan wajib.',
                        'Check-in and technical inspection gates open. Riders scan registration QR e-tickets, verify bicycle roadworthiness (brakes, tires, drivetrain), and complete mandatory safety gear inspections.'
                      )}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] font-mono text-slate-300">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                        <span className="text-[#FA6D0B] font-bold text-xs select-none">//</span>
                        <span>{t('2 Lampu Depan (400+ lm) & Lampu Belakang', '2 Front Headlamps (400+ lm) & Rear Light')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                        <span className="text-[#FA6D0B] font-bold text-xs select-none">//</span>
                        <span>{t('Rompi Reflektif EN ISO 20471 & Helm CE', 'EN ISO 20471 Reflective Vest & CE Helmet')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                        <span className="text-[#FA6D0B] font-bold text-xs select-none">//</span>
                        <span>{t('Plat Nomor Sepeda & Botol Hidrasi Penuh', 'Bike Number Plate & Filled Hydration Bottles')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ITEM 3: WAVE 1 DISPATCH */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-[#FA6D0B] group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border-2 border-[#FA6D0B]/50 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          05:30 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FA6D0B] text-black font-black">
                          WAVE 1 DISPATCH
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#FA6D0B] font-bold uppercase">{t('FAJAR PERDANA', 'FIRST DAWN')}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      FLAG OFF WAVE 1: ULTRA 200 KM &amp; 150 GRAND FONDO
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(
                        'Pelepasan fajar awal untuk memaksimalkan jam cahaya matahari (daylight hours) sebelum transisi navigasi malam hari. Mengarungi jalur aspal awal Cibubur–Cileungsi yang steril menuju perbukitan pedalaman Jonggol, Sukamakmur, dan Cariu.',
                        'Early dawn departure to maximize daylight hours before transitioning into nighttime navigation. Tackling the clear initial Cibubur–Cileungsi tarmac route toward the backcountry hills of Jonggol, Sukamakmur, and Cariu.'
                      )}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-300">
                      <span>COT 200 KM: <strong className="text-white">{t('19 JAM (00:30 WIB H+1)', '19 HOURS (00:30 WIB D+1)')}</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>COT 150 KM: <strong className="text-white">{t('15 JAM (20:30 WIB)', '15 HOURS (20:30 WIB)')}</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>MODE: <strong className="text-[#FA6D0B]">{t('EKSPEDISI MANDIRI PENUH', 'FULL SELF-EXPEDITION')}</strong></span>
                    </div>
                  </div>
                </div>

                {/* ITEM 4: WAVE 2 DISPATCH */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-[#FA6D0B] group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-[#FA6D0B]/40 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          06:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FA6D0B] text-black font-black">
                          WAVE 2 DISPATCH
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#FA6D0B] font-bold uppercase">{t('KOMPETITIF RESMI', 'OFFICIAL COMPETITIVE')}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      FLAG OFF WAVE 2: 120 (RACE) AMAZING RACE (SINGLE &amp; PAIR MIX)
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(
                        'Pelepasan kategori balap berintensitas tinggi perebutan Top 3 Podium & Jersey Juara Pollride. Jalur steril dari rombongan rekreasi agar dinamika peloton cepat dan formasi aerodinamis dapat terbentuk secara aman.',
                        'High-intensity race dispatch contending for Top 3 Podium spots & the Pollride Champions Jersey. Clear course dynamics separated from recreational packs for safe paceline speeds.'
                      )}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-300">
                      <span>COT 120 KM: <strong className="text-white">{t('11 JAM (17:00 WIB)', '11 HOURS (17:00 WIB)')}</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>LIVE TRACKING: <strong className="text-white">{t('WAJIB AKTIF TERUS', 'ALWAYS ACTIVE')}</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>PITSTOP: <strong className="text-white">{t('WAJIB 30 MENIT (CP#4)', 'MANDATORY 30 MIN (CP#4)')}</strong></span>
                    </div>
                  </div>
                </div>

                {/* ITEM 5: WAVE 3 DISPATCH */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/60 bg-white group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-white/20 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          07:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-white/20 text-white font-bold">
                          WAVE 3 DISPATCH
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">{t('CAHAYA MATAHARI PENUH', 'FULL MORNING SUNLIGHT')}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                      FLAG OFF WAVE 3: 100 FONDO &amp; 60 FUN RIDE
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(
                        'Pelepasan di bawah sinar matahari pagi penuh dengan atmosfer festival dan kebersamaan komunitas. Sangat ramah untuk sepeda lipat (folding bike), sepeda hybrid, dan pemula gravel tanpa tekanan persaingan podium.',
                        'Morning departure immersed in a vibrant festival and community spirit. Very accommodating for folding bikes, hybrid bikes, and gravel beginners without podium pressure.'
                      )}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-300">
                      <span>COT 100 KM: <strong className="text-white">{t('9.5 JAM (16:30 WIB)', '9.5 HOURS (16:30 WIB)')}</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>COT 60 KM: <strong className="text-white">{t('7 JAM (14:00 WIB)', '7 HOURS (14:00 WIB)')}</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>ATMOSFER: <strong className="text-white">{t('FESTIVAL & PARADE KOMUNITAS', 'FESTIVAL & COMMUNITY PARADE')}</strong></span>
                    </div>
                  </div>
                </div>

                {/* ITEM 6: PITSTOP 30-MIN REST */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-black group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-[#FA6D0B]/40 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          10:00 — 16:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-[#FA6D0B] text-[#FA6D0B] font-bold">
                          {t('PENALTI 300%', '300% PENALTY')}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">CP#4 / CP#6 JONGGOL</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                      MANDATORY 30-MIN NEUTRALIZED PITSTOP // SMART GEOFENCING
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(
                        'Seluruh peserta wajib mengambil jeda istirahat minimal 30 menit tanpa bergerak yang terverifikasi sensor smart geofencing dan scan barcode: di CP#4 untuk kategori 120, 150, dan 200 km, serta di CP#6 untuk kategori 60 Fun Ride dan 100 Fondo.',
                        'All riders must observe a mandatory stationary rest break of at least 30 minutes verified by smart geofencing and barcode scan: at CP#4 for 120, 150, and 200 km, and at CP#6 for 60 Fun Ride and 100 Fondo.'
                      )}
                    </p>

                    <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-300 space-y-0.5">
                      <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">
                        {t('Regulasi Waktu Netral:', 'Neutral Time Regulation:')}
                      </strong>
                      <span className="text-slate-400">
                        {t(
                          'Waktu istirahat 30 menit tidak dihitung dalam race time bersih. Peserta yang keluar pos di bawah 30 menit otomatis diganjar penalti waktu 300% (penambahan 90 menit ke catatan waktu).',
                          'The 30-minute rest is deducted from net race time. Riders departing before completing 30 full minutes will automatically receive a 300% time penalty (90 minutes added to their official time).'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ITEM 7: FINISHER ARRIVAL & RECOVERY */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/40 bg-black group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-white/20 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          11:00 — 21:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-white/20 text-white font-bold">
                          {t('SEMUA FINISHER SAH', 'ALL OFFICIAL FINISHERS')}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">FINISHER GATE ABEEY</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                      FINISHER ARRIVAL, MEDAL CLAIM &amp; ATHLETE RECOVERY LOUNGE
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(
                        'Penyambutan finisher di ABEEY Coffee & Eatery. Pengalungan Heavy Metal Finisher Medal, verifikasi log GPS akhir, penukaran voucher hidangan hangat, hidrasi isotonik NDR, dan sajian fermented kombucha artisan (Candala, Palapa, Mantra).',
                        'Finisher reception at ABEEY Coffee & Eatery. Awarding of Heavy Metal Finisher Medals, final GPS log verification, warm recovery meal vouchers, NDR isotonic hydration, and artisan fermented kombucha (Candala, Palapa, Mantra).'
                      )}
                    </p>
                  </div>
                </div>

                {/* ITEM 8: PODIUM CEREMONY */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-[#FA6D0B] group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-[#FA6D0B]/40 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          17:00 — 18:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FA6D0B] text-black font-black">
                          STAGE CEREMONY
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#FA6D0B] font-bold uppercase">{t('PANGGUNG UTAMA', 'MAIN STAGE')}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                      PODIUM CEREMONY 120 (RACE) &amp; COMMUNITY AWARDS
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(
                        'Penganugerahan piala dan hadiah sponsor bagi Top 3 120 KM Kategori Pria, Wanita, dan Pair Mix. Penyerahan sertifikat Best Spirit Community untuk chapter teraktif, serta pengundian hadiah doorprize utama.',
                        'Awarding trophies and sponsor prizes for the Top 3 120 KM Men, Women, and Pair Mix categories. Best Spirit Community honors for the most active chapters, followed by grand doorprize giveaways.'
                      )}
                    </p>
                  </div>
                </div>

                {/* ITEM 9: OFFICIAL COT CLOSING */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/60 bg-white group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          21:00 — 00:30 WIB (H+1)
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-white/30 text-white font-bold">
                          {t('BATAS AKHIR MUTLAK', 'ABSOLUTE CUT-OFF')}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">FINAL FINISH GATE</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                      OFFICIAL COT // 21:00 WIB (STAGE) &amp; 00:30 WIB (ULTRA 200 KM)
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {t(
                        'Pukul 21:00 WIB merupakan batas akhir kategori 60–150 KM serta penutupan panggung perayaan utama. Pos finis dan tim ambulans malam RS Hermina Cibubur tetap bersiaga mengawal peserta Ultra 200 KM hingga batas Cut-Off Time resmi pukul 00:30 WIB dini hari (19 jam perlombaan).',
                        '21:00 WIB marks the final deadline for 60–150 KM categories and main stage closing. The finish line and RS Hermina Cibubur mobile paramedic teams remain deployed to escort Ultra 200 KM riders until official Cut-Off Time at 00:30 WIB (19 race hours).'
                      )}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PRA-EVENT (H-1) */}
          {activeScheduleTab === 'praevent' && (
            <div className="space-y-6">
              
              {/* Context Summary Bar */}
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FA6D0B] shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                      {t(
                        'H-7 (6 HARI SEBELUM EVENT): MINGGU, 6 DESEMBER 2026 // ABEEY COFFEE CIBUBUR',
                        'D-7 (6 DAYS BEFORE RACE): SUNDAY, DEC 6, 2026 // ABEEY COFFEE CIBUBUR'
                      )}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {t(
                        'Pengambilan Race Pack (RPC Mandiri), Coaching Clinic & Technical Meeting Resmi',
                        'Race Pack Collection (Self-Pickup RPC), Coaching Clinic & Official Technical Meeting'
                      )}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#FA6D0B] shrink-0 font-bold uppercase">
                  {t('WAJIB E-TICKET & IDENTITAS RESMI (KTP/SIM)', 'E-TICKET & OFFICIAL ID (NATIONAL ID/PASSPORT) REQUIRED')}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Pra-Event Card 1 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-[#FA6D0B]/40 transition-colors">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm font-black text-white">
                      10:00 — 17:00 WIB
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">OFFICIAL RPC DESK</span>
                  </div>

                  <h3 className="font-display italic text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                    RACE PACK COLLECTION (RPC) &amp; PRE-CHECK
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t(
                      'Pengambilan perlengkapan atlet: Jersey Pollride, nomor plat sepeda waterproof, goodie bag, suplemen gel NDR, serta kartu asuransi 1 hari. Pemeriksaan awal fungsi sepeda dapat dilakukan bersama tim mekanik rekanan.',
                      'Collection of athlete gear: Pollride Jersey, waterproof bike number plate, goodie bag, NDR energy gel supplements, and 1-day official accident insurance card. Pre-race bicycle safety checks available with partner mechanics.'
                    )}
                  </p>

                  <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-400 space-y-1">
                    <div>
                      <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">
                        {t('Opsi Pengambilan:', 'Collection Options:')}
                      </strong>
                      <span>
                        {t(
                          'Mandiri saat RPC Day (Gratis / Rp 0). Bagi peserta berhalangan hadir, tersedia opsi Handling Fee RPC (+Rp 20.000) saat registrasi.',
                          'In-person on RPC Day (Free / IDR 0). For participants unable to attend, an RPC Handling Fee option (+IDR 20,000) is available during registration.'
                        )}
                      </span>
                    </div>
                    <div>
                      <strong className="text-white font-mono uppercase tracking-wider text-[11px] block mt-1">
                        {t('Dokumen Wajib:', 'Required Documents:')}
                      </strong>
                      <span>
                        {t(
                          'E-ticket QR Code pendaftaran & Kartu Identitas Fisik (KTP/SIM/Paspor). Pengambilan diwakilkan wajib menyertakan surat kuasa.',
                          'Registration QR E-ticket & physical ID card (National ID/Driving License/Passport). Third-party collection requires an authorization letter.'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pra-Event Card 2 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm font-black text-white">
                      11:00 — 12:30 WIB
                    </span>
                    <span className="text-[10px] font-mono text-[#FA6D0B] uppercase font-bold tracking-wider">LIVE INSTAGRAM</span>
                  </div>

                  <h3 className="font-display italic text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                    COACHING CLINIC: GRAVEL NAVIGATION &amp; GEAR
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t(
                      'Sesi edukasi praktis bersama pelatih ketahanan GX-ID. Membedah strategi tekanan angin ban (tire pressure) untuk makadam Jonggol, sinkronisasi rute GPX di head unit Garmin/Wahoo, dan manajemen cairan saat hujan tropis.',
                      'Practical briefing with GX-ID endurance coaches. Covering tire pressure strategies for Jonggol macadam, GPX navigation setup on Garmin/Wahoo head units, and hydration strategy in wet tropical weather.'
                    )}
                  </p>

                  <div className="border-l-2 border-white/20 pl-4 py-1 text-xs text-slate-400 space-y-0.5">
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">
                      {t('Format Sesi:', 'Session Format:')}
                    </strong>
                    <span>
                      {t(
                        'Tersedia tatap muka di area outdoor ABEEY Coffee serta siaran langsung di Instagram @gxid.official.',
                        'Available in-person at ABEEY Coffee outdoor arena and livestreamed on Instagram @gxid.official.'
                      )}
                    </span>
                  </div>
                </div>

                {/* Pra-Event Card 3 */}
                <div className="p-8 rounded-2xl border-2 border-[#FA6D0B]/50 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm font-black text-white">
                      14:00 — 15:30 WIB
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FA6D0B] text-black font-black">
                      {t('BRIEFING WAJIB', 'MANDATORY BRIEFING')}
                    </span>
                  </div>

                  <h3 className="font-display italic text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                    TECHNICAL MEETING &amp; SAFETY WORKSHOP
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t(
                      'Pengarahan teknis rute final: pengumuman titik kritis tanjakan Sukamakmur & Cariu, koordinat penempatan ambulans SPGDT RS Hermina Cibubur, tata kelola smart geofencing pitstop 30 menit, dan sistem darurat evakuasi.',
                      'Final route technical briefing: critical elevation sectors in Sukamakmur & Cariu, RS Hermina Cibubur ambulance staging points, 30-minute geofenced pitstop protocols, and emergency evacuation protocols.'
                    )}
                  </p>

                  <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-300 space-y-0.5">
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">
                      {t('Wajib Hadir / Menyimak:', 'Attendance Recommended:')}
                    </strong>
                    <span className="text-slate-400">
                      {t(
                        'Seluruh kapten squad, peserta solo, dan pair mix sangat disarankan hadir atau menyimak rekaman sesi ini sebelum flag off esok paginya.',
                        'All squad captains, solo riders, and pair mix athletes are strongly advised to attend or review the recording prior to race morning.'
                      )}
                    </span>
                  </div>
                </div>

                {/* Pra-Event Card 4 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm font-black text-white">
                      15:30 — 17:30 WIB
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">COMMUNITY LOUNGE</span>
                  </div>

                  <h3 className="font-display italic text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                    COMMUNITY GATHERING &amp; BARISTA SOCIAL HOUR
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t(
                      'Temu kangen antar-pesepeda dari 19 chapter GX-ID se-Indonesia. Saling bertukar cerita petualangan ekspedisi mandiri sambil mencicipi racikan kopi dan kombucha khas ABEEY Eatery sebelum kembali istirahat persiapan dini hari.',
                      'Community gathering with riders representing 19 GX-ID chapters across Indonesia. Sharing endurance stories over artisan coffee and kombucha before resting ahead of dawn.'
                    )}
                  </p>

                  <div className="border-l-2 border-white/20 pl-4 py-1 text-xs text-slate-400 space-y-0.5">
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">
                      {t('Akses Lokasi:', 'Location Access:')}
                    </strong>
                    <span>
                      {t(
                        'Terhubung langsung ke akomodasi sekitar Cibubur Junction dan Stasiun LRT Harjamukti.',
                        'Directly accessible to accommodations near Cibubur Junction and Harjamukti LRT Station.'
                      )}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: WAVE DISPATCH MATRIX (TABLE) */}
          {activeScheduleTab === 'matrix' && (
            <div className="space-y-6">
              
              {/* Context Summary Bar */}
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                <div>
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {t('MATRIKS PERBANDINGAN OPERASIONAL 5 KATEGORI', '5-CATEGORY OPERATIONAL MATRIX')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t(
                      'Rincian gelombang flag off, syarat prolog, batas waktu Cut-Off Time (COT), dan regulasi lampu wajib.',
                      'Breakdown of wave dispatch, prologue requirements, Cut-Off Times (COT), and lighting gear mandates.'
                    )}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#FA6D0B] font-bold uppercase">
                  {t('INTERVAL PELEPASAN: 15–30 MENIT', 'DISPATCH INTERVAL: 15–30 MINUTES')}
                </span>
              </div>

              {/* Responsive Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                <table className="w-full text-left border-collapse text-[11px] lg:text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[10px] lg:text-[11px] uppercase text-slate-400 tracking-wider whitespace-nowrap">
                      <th className="py-3.5 px-3 sm:px-4">{t('Kategori & Jarak', 'Category & Distance')}</th>
                      <th className="py-3.5 px-2.5 sm:px-3">{t('Gelombang & Start', 'Wave & Start')}</th>
                      <th className="py-3.5 px-2.5 sm:px-3">{t('Prolog Subuh', 'Dawn Prologue')}</th>
                      <th className="py-3.5 px-2.5 sm:px-3">Cut-Off Time (COT)</th>
                      <th className="py-3.5 px-2.5 sm:px-3">{t('Pitstop Wajib', 'Mandatory Pitstop')}</th>
                      <th className="py-3.5 px-2.5 sm:px-3">{t('Standar Lampu', 'Lighting Standards')}</th>
                      <th className="py-3.5 px-3 sm:px-4">{t('Sifat Kategori', 'Category Nature')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] font-mono text-[11px] lg:text-xs">
                    
                    {/* Row 200 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <strong className="text-white text-xs lg:text-sm font-display font-black uppercase tracking-tight block">200 KM ULTRA</strong>
                        <span className="text-[10px] lg:text-[11px] text-[#FA6D0B]">Ultra Gravel Grind</span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/30 font-bold inline-block whitespace-nowrap text-[10px] lg:text-[11px]">
                          WAVE 1 (05:30 WIB)
                        </span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-[#FA6D0B] font-bold whitespace-nowrap">
                        {t('Wajib 30 KM (03:00–05:00)', 'Mandatory 30 KM (03:00–05:00)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-white font-bold whitespace-nowrap">
                        {t('19 Jam (00:30 WIB H+1)', '19 Hours (00:30 WIB D+1)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                        {t('Wajib 30 Min (CP#4)', 'Mandatory 30 Min (CP#4)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                        {t('2 Depan (400+ lm) + Rompi EN ISO', '2 Front (400+ lm) + EN ISO Vest')}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20 text-slate-300 text-[10px] inline-block whitespace-nowrap">
                          {t('Ekspedisi Mandiri Ultra', 'Ultra Self-Expedition')}
                        </span>
                      </td>
                    </tr>

                    {/* Row 150 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <strong className="text-white text-xs lg:text-sm font-display font-black uppercase tracking-tight block">150 GRAND FONDO</strong>
                        <span className="text-[10px] lg:text-[11px] text-[#FA6D0B]">Grand Fondo Endurance</span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/30 font-bold inline-block whitespace-nowrap text-[10px] lg:text-[11px]">
                          WAVE 1 (05:30 WIB)
                        </span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-[#FA6D0B] font-bold whitespace-nowrap">
                        {t('Wajib 30 KM (03:00–05:00)', 'Mandatory 30 KM (03:00–05:00)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-white font-bold whitespace-nowrap">
                        {t('15 Jam (20:30 WIB)', '15 Hours (20:30 WIB)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                        {t('Wajib 30 Min (CP#4)', 'Mandatory 30 Min (CP#4)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                        {t('2 Depan (400+ lm) + Rompi EN ISO', '2 Front (400+ lm) + EN ISO Vest')}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20 text-slate-300 text-[10px] inline-block whitespace-nowrap">
                          Grand Fondo
                        </span>
                      </td>
                    </tr>

                    {/* Row 120 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors bg-[#FA6D0B]/[0.03]">
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <strong className="text-white text-xs lg:text-sm font-display font-black uppercase tracking-tight block">120 (RACE)</strong>
                        <span className="text-[10px] lg:text-[11px] text-[#FA6D0B]">Single &amp; Pair Mix</span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FA6D0B] text-black font-black inline-block whitespace-nowrap text-[10px] lg:text-[11px]">
                          WAVE 2 (06:00 WIB)
                        </span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-500 whitespace-nowrap">
                        {t('Tidak Ada', 'None')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-white font-bold whitespace-nowrap">
                        {t('11 Jam (17:00 WIB)', '11 Hours (17:00 WIB)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                        {t('Wajib 30 Min (CP#4)', 'Mandatory 30 Min (CP#4)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                        {t('Min 1 Depan + Belakang Aktif', 'Min 1 Front + Active Rear')}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FA6D0B]/20 text-[#FA6D0B] border border-[#FA6D0B]/40 text-[10px] font-bold inline-block whitespace-nowrap">
                          {t('KOMPETITIF (PODIUM TOP 3)', 'COMPETITIVE (TOP 3 PODIUM)')}
                        </span>
                      </td>
                    </tr>

                    {/* Row 100 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <strong className="text-white text-xs lg:text-sm font-display font-black uppercase tracking-tight block">100 FONDO</strong>
                        <span className="text-[10px] lg:text-[11px] text-slate-400">Fondo Exploration</span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20 text-white font-bold inline-block whitespace-nowrap text-[10px] lg:text-[11px]">
                          WAVE 3 (07:00 WIB)
                        </span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-500 whitespace-nowrap">
                        {t('Tidak Ada', 'None')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-white font-bold whitespace-nowrap">
                        {t('9.5 Jam (16:30 WIB)', '9.5 Hours (16:30 WIB)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-400 whitespace-nowrap">
                        {t('Wajib 30 Min (CP#6)', 'Mandatory 30 Min (CP#6)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-400 whitespace-nowrap">
                        {t('Rekomendasi Senja/Siang', 'Recommended Dusk/Daylight')}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 text-slate-300 text-[10px] inline-block whitespace-nowrap">
                          {t('Fondo / Rekreasi', 'Fondo / Recreational')}
                        </span>
                      </td>
                    </tr>

                    {/* Row 60 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <strong className="text-white text-xs lg:text-sm font-display font-black uppercase tracking-tight block">60 FUN RIDE</strong>
                        <span className="text-[10px] lg:text-[11px] text-slate-400">{t('Fun Ride Ramah Seli', 'Folding-Bike Friendly')}</span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20 text-white font-bold inline-block whitespace-nowrap text-[10px] lg:text-[11px]">
                          WAVE 3 (07:00 WIB)
                        </span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-500 whitespace-nowrap">
                        {t('Tidak Ada', 'None')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-white font-bold whitespace-nowrap">
                        {t('7 Jam (14:00 WIB)', '7 Hours (14:00 WIB)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-400 whitespace-nowrap">
                        {t('Wajib 30 Min (CP#6)', 'Mandatory 30 Min (CP#6)')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-400 whitespace-nowrap">
                        {t('Standar Reflektor/Lampu', 'Standard Reflectors/Lights')}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 text-slate-300 text-[10px] inline-block whitespace-nowrap">
                          {t('Parade Festival', 'Festival Parade')}
                        </span>
                      </td>
                    </tr>

                    {/* Row Virtual Ride */}
                    <tr className="hover:bg-white/[0.02] transition-colors bg-white/[0.01]">
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <strong className="text-white text-xs lg:text-sm font-display font-black uppercase tracking-tight block">VIRTUAL RIDE</strong>
                        <span className="text-[10px] lg:text-[11px] text-white">{t('19 Chapter Nasional', '19 National Chapters')}</span>
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                        {t('Mandiri H-Event', 'Self-Ride Race Week')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-500 whitespace-nowrap">
                        {t('Rute Lokal Domisili', 'Local Domicile Route')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                        {t('Sesuai Jarak Pilihan', 'As Selected Distance')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-400 whitespace-nowrap">
                        {t('Mandiri', 'Self-Supported')}
                      </td>
                      <td className="py-3.5 px-2.5 sm:px-3 text-slate-400 whitespace-nowrap">
                        {t('Standar Jalan Raya Lokal', 'Local Road Standards')}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#FA6D0B]/40 text-[#FA6D0B] text-[10px] font-bold inline-block whitespace-nowrap">
                          {t('Validasi Strava Webhook', 'Strava Webhook Validation')}
                        </span>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Bottom Rule Highlight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-1">
                  <span className="text-[#FA6D0B] font-bold block uppercase">
                    {t('// DISIPLIN JADWAL FLAG OFF', '// FLAG OFF SCHEDULE DISCIPLINE')}
                  </span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {t(
                      'Peserta yang terlambat pada wave kategorinya akan dilepas di gelombang berikutnya. Namun, catatan waktu resmi (official race time) tetap dihitung sejak gelombang aslinya dilepas (chasing time penalty).',
                      'Riders missing their category wave will start with the subsequent wave. However, official race time starts from their original wave dispatch (chasing time penalty).'
                    )}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-1">
                  <span className="text-[#FA6D0B] font-bold block uppercase">
                    {t('// LIVE TRACKING AKTIF (120, 150, 200 KM)', '// LIVE TRACKING ACTIVE (120, 150, 200 KM)')}
                  </span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {t(
                      'Kategori kompetitif dan ultra wajib menyerahkan tautan pelacakan langsung (Garmin LiveTrack, Strava Beacon, atau WhatsApp Live Location) pada saat Scrutineering fajar untuk pengawasan panitia dan paramedis.',
                      'Competitive and ultra categories must submit active live tracking links (Garmin LiveTrack, Strava Beacon, or WhatsApp Live Location) during dawn Scrutineering for safety and paramedic monitoring.'
                    )}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </section>
      {/* ========================================================================= */}
    </>
  );
}
