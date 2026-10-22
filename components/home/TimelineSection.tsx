'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { useLanguage } from '@/lib/context/LanguageContext';
import { 
  RACEDAY_ITINERARY, 
  PRAEVENT_ITINERARY, 
  WAVE_MATRIX_ROWS 
} from '@/lib/data/timeline';

export default function TimelineSection() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeScheduleTab, setActiveScheduleTab] = useState<'raceday' | 'praevent' | 'matrix'>('raceday');
  const { t } = useLanguage();

  return (
    <>
      {/* 4. EVENT TIMELINE & WAVE DISPATCH RUNDOWN */}
      <section id="jadwal" className="pt-6 sm:pt-8 pb-8 sm:pb-10 border-t border-white/10 bg-[#0B0C0E] relative overflow-hidden">
        {/* Action Cyclist on Orange Trail Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 8%, black 22%, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 8%, black 22%, black 82%, transparent 100%)',
          }}
        >
          <img
            src="/backgrounds/bg-timeline.webp"
            alt="Perjalanan Siklis di Jalur Oranye - Grindurance Ultra Cycling"
            className="w-full h-full object-cover object-[center_30%] sm:object-[center_22%] opacity-85 filter contrast-[1.15] saturate-[1.2] brightness-[0.95] blur-[0.4px]"
          />
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/40 via-transparent to-[#0B0C0E]/70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 sm:pb-5">
            <div className="space-y-3">
              <span className="text-sm sm:text-base font-black text-[#FA6D0B] uppercase tracking-widest block font-mono">
                {t('RUNDOWN RESMI · OPERASIONAL BALAPAN', 'OFFICIAL RUNDOWN · RACE OPERATIONS')}
              </span>
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] group">
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
                  'Manajemen waktu presisi untuk menjamin keselamatan dan kelancaran 5 kategori balap. Mulai dari sesi Race Pack Collection (RPC), verifikasi Scrutineering fajar, pelepasan gelombang start teratur, hingga panggung podium perayaan di ABBEY Coffee & Eatery.',
                  'Precise time management ensuring the safety and seamless operation of 5 race categories. From the Race Pack Collection (RPC) session, dawn Scrutineering verification, staggered wave dispatch, to the celebration podium stage at ABBEY Coffee & Eatery.'
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                href="/peraturan"
                variant="secondary"
                size="sm"
                withArrow
                className="font-mono text-xs font-bold"
              >
                ATHLETE GUIDE PDF
              </Button>
            </div>
          </div>

          {/* EDITORIAL DROPDOWN TRIGGER BAR */}
          <div className="border-y border-white/10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
              <span className="font-black text-[#FA6D0B] uppercase tracking-wider">
                AGENDA RESMI
              </span>
              <span className="text-white/20 select-none">·</span>
              <span className="text-white font-bold">
                6 &amp; 13 DESEMBER 2026
              </span>
              <span className="text-white/20 select-none hidden sm:inline">·</span>
              <span className="text-slate-300">
                ABBEY COFFEE &amp; LRT HARJAMUKTI
              </span>
              <span className="text-white/20 select-none hidden sm:inline">·</span>
              <span className="text-slate-400">
                5 KATEGORI BALAP
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-xs font-black uppercase tracking-wider text-[#FA6D0B] hover:text-white transition-colors flex items-center gap-2 cursor-pointer select-none self-start sm:self-auto group py-1"
            >
              <span>{isExpanded ? t('TUTUP RUNDOWN JADWAL', 'COLLAPSE RUNDOWN') : t('BUKA RUNDOWN JADWAL LENGKAP', 'EXPAND FULL RUNDOWN')}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/[0.06] group-hover:bg-[#FA6D0B] group-hover:text-black transition-all">
                {isExpanded ? '[ − ]' : '[ + ]'}
              </span>
            </button>
          </div>

          {/* COMPACT COLLAPSED DISPATCH CARD */}
          {!isExpanded && (
            <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:items-center justify-between gap-5 animate-fade-in">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#FA6D0B] tracking-wider">
                  <span>PELEPASAN 3 GELOMBANG UTAMA</span>
                  <span className="text-white/20 select-none">·</span>
                  <span className="text-slate-400 font-bold">START: 05:30 WIB</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="border-l border-[#FA6D0B] pl-3 py-0.5">
                    <span className="text-white font-bold block">05:30 WIB · WAVE 1</span>
                    <span className="text-slate-400 text-[11px]">200 Ultra &amp; 150 Grand Fondo</span>
                  </div>
                  <div className="border-l border-[#FA6D0B] pl-3 py-0.5">
                    <span className="text-white font-bold block">06:00 WIB · WAVE 2</span>
                    <span className="text-slate-400 text-[11px]">120 Race (Single &amp; Pair Mix)</span>
                  </div>
                  <div className="border-l border-white/20 pl-3 py-0.5">
                    <span className="text-white font-bold block">07:00 WIB · WAVE 3</span>
                    <span className="text-slate-400 text-[11px]">100 Fondo &amp; 70 Fun Gravel</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                withArrow
                onClick={() => setIsExpanded(true)}
                className="shrink-0"
              >
                {t('BUKA RUNDOWN LENGKAP & MATRIKS', 'EXPAND FULL RUNDOWN & MATRIX')}
              </Button>
            </div>
          )}

          {/* COLLAPSIBLE ACCORDION BODY */}
          {isExpanded && (
            <div className="space-y-6 pt-2 animate-fade-in">
              {/* Clean Editorial Underline Tabs */}
              <div className="flex items-center gap-6 sm:gap-8 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveScheduleTab('raceday')}
                  className={`font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors pb-1 border-b-2 whitespace-nowrap cursor-pointer ${
                    activeScheduleTab === 'raceday'
                      ? 'text-[#FA6D0B] border-[#FA6D0B] font-black'
                      : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                >
                  <span>{t('RACE DAY (13 DES 2026)', 'RACE DAY (DEC 13, 2026)')}</span>
                  <span className="text-slate-500 font-normal ml-2">· 03:00–21:00 WIB</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveScheduleTab('praevent')}
                  className={`font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors pb-1 border-b-2 whitespace-nowrap cursor-pointer ${
                    activeScheduleTab === 'praevent'
                      ? 'text-[#FA6D0B] border-[#FA6D0B] font-black'
                      : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                >
                  <span>{t('RPC & PRA-EVENT (6 DES 2026)', 'RPC & PRE-EVENT (DEC 6, 2026)')}</span>
                  <span className="text-slate-500 font-normal ml-2">· RPC, CLINIC &amp; TM</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveScheduleTab('matrix')}
                  className={`font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors pb-1 border-b-2 whitespace-nowrap cursor-pointer ${
                    activeScheduleTab === 'matrix'
                      ? 'text-[#FA6D0B] border-[#FA6D0B] font-black'
                      : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                >
                  <span>{t('MATRIKS GELOMBANG', 'WAVE MATRIX')}</span>
                  <span className="text-slate-500 font-normal ml-2">· 5 KATEGORI</span>
                </button>
              </div>

              {/* TAB 1: RACE DAY ITINERARY (DRIVEN BY lib/data/timeline.ts) */}
              {activeScheduleTab === 'raceday' && (
                <div className="space-y-6">
                  {/* Context Summary Bar */}
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    <div>
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                        {t(
                          'VENUE UTAMA: ABBEY COFFEE & EATERY, HARJAMUKTI — MINGGU, 13 DESEMBER 2026',
                          'MAIN VENUE: ABBEY COFFEE & EATERY, HARJAMUKTI — SUNDAY, DECEMBER 13, 2026'
                        )}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {t(
                          'Titik Kumpul Start & Finish Terintegrasi Stasiun LRT Harjamukti Cibubur',
                          'Integrated Start & Finish Assembly Point with Harjamukti Cibubur LRT Station'
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 shrink-0">
                      <span>FLAG OFF: <strong className="text-[#FA6D0B]">05:30 WIB</strong></span>
                      <span className="text-white/20 select-none">·</span>
                      <span>FINAL COT: <strong className="text-white">00:30 WIB (H+1)</strong></span>
                    </div>
                  </div>

                  {/* Vertical Timeline Container */}
                  <div className="relative border-l border-white/15 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
                    {RACEDAY_ITINERARY.map((item) => {
                      const isHighlight = item.variant === 'highlight';
                      return (
                        <div key={item.id} className="relative group">
                          {/* Dot Marker */}
                          <div
                            className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-transform group-hover:scale-125 ${
                              isHighlight
                                ? 'border-[#FA6D0B] bg-[#FA6D0B]'
                                : item.badgeHighlight
                                ? 'border-[#FA6D0B] bg-black'
                                : 'border-white/40 bg-black group-hover:border-white'
                            }`}
                          />

                          <div
                            className={`p-6 rounded-2xl backdrop-blur-xl space-y-4 transition-colors ${
                              isHighlight
                                ? 'bg-gradient-to-br from-[#FA6D0B]/15 via-black/60 to-black/80 shadow-[0_20px_50px_rgba(250,109,11,0.2)]'
                                : 'bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                              <div className="flex flex-wrap items-baseline gap-3">
                                <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                                  {item.time}
                                </span>
                                <span className="text-white/20 select-none">·</span>
                                <span
                                  className={`font-mono text-xs font-bold uppercase tracking-widest ${
                                    item.badgeHighlight ? 'text-[#FA6D0B]' : 'text-slate-300'
                                  }`}
                                >
                                  {t(item.badge.id, item.badge.en)}
                                </span>
                              </div>
                              <span
                                className={`text-[11px] font-mono uppercase ${
                                  isHighlight ? 'text-[#FA6D0B] font-bold' : 'text-slate-400'
                                }`}
                              >
                                {t(item.locationTag.id, item.locationTag.en)}
                              </span>
                            </div>

                            <h3
                              className={`font-display font-black uppercase text-white tracking-tight ${
                                isHighlight ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                              }`}
                            >
                              {t(item.title.id, item.title.en)}
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {t(item.description.id, item.description.en)}
                            </p>

                            {/* Note Alert */}
                            {item.note && (
                              <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-300 space-y-0.5">
                                <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">
                                  {t(item.note.label.id, item.note.label.en)}
                                </strong>
                                <span className="text-slate-400">
                                  {t(item.note.text.id, item.note.text.en)}
                                </span>
                              </div>
                            )}

                            {/* Bullet Features */}
                            {item.bullets && item.bullets.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] font-mono text-slate-300">
                                {item.bullets.map((bullet, idx) => (
                                  <div key={idx} className="p-3 rounded-xl bg-black/60 flex items-center gap-2.5 shadow-sm">
                                    <span className="text-[#FA6D0B] font-bold text-sm leading-none shrink-0 select-none">·</span>
                                    <span>{t(bullet.id, bullet.en)}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Key Metrics */}
                            {item.metrics && item.metrics.length > 0 && (
                              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-300">
                                {item.metrics.map((metric, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    {idx > 0 && <span className="text-white/20 select-none mr-2">·</span>}
                                    <span>
                                      {metric.label}:{' '}
                                      <strong className={metric.highlight ? 'text-[#FA6D0B]' : 'text-white'}>
                                        {t(metric.value.id, metric.value.en)}
                                      </strong>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: PRA-EVENT (DRIVEN BY lib/data/timeline.ts) */}
              {activeScheduleTab === 'praevent' && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#FA6D0B] shrink-0" />
                      <div>
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                          {t(
                            'H-7 (6 HARI SEBELUM EVENT): MINGGU, 6 DESEMBER 2026 · ABEEY COFFEE CIBUBUR',
                            'D-7 (6 DAYS BEFORE RACE): SUNDAY, DEC 6, 2026 · ABEEY COFFEE CIBUBUR'
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
                    {PRAEVENT_ITINERARY.map((pra) => (
                      <div
                        key={pra.id}
                        className={`p-8 rounded-2xl backdrop-blur-xl space-y-4 transition-colors ${
                          pra.isHighlight
                            ? 'bg-gradient-to-br from-[#FA6D0B]/15 via-black/60 to-black/80 shadow-[0_20px_50px_rgba(250,109,11,0.2)]'
                            : 'bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                          <span className="font-mono text-sm font-black text-white">{pra.time}</span>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-wider ${
                              pra.badgeHighlight ? 'text-[#FA6D0B] font-bold' : 'text-slate-400'
                            }`}
                          >
                            {t(pra.badgeTag.id, pra.badgeTag.en)}
                          </span>
                        </div>

                        <h3 className="font-display italic text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                          {t(pra.title.id, pra.title.en)}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {t(pra.description.id, pra.description.en)}
                        </p>

                        <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-400 space-y-1">
                          {pra.details.map((detail, idx) => (
                            <div key={idx}>
                              <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">
                                {t(detail.title.id, detail.title.en)}
                              </strong>
                              <span>{t(detail.description.id, detail.description.en)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: WAVE DISPATCH MATRIX (DRIVEN BY lib/data/timeline.ts) */}
              {activeScheduleTab === 'matrix' && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
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

                  <div className="overflow-x-auto rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
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
                        {WAVE_MATRIX_ROWS.map((row) => (
                          <tr
                            key={row.categoryId}
                            className={`hover:bg-white/[0.02] transition-colors ${
                              row.rowHighlight ? 'bg-[#FA6D0B]/[0.03]' : ''
                            }`}
                          >
                            <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                              <strong className="text-white text-xs lg:text-sm font-display font-black uppercase tracking-tight block">
                                {row.categoryTitle}
                              </strong>
                              <span className="text-[10px] lg:text-[11px] text-[#FA6D0B]">
                                {t(row.categorySubtitle.id, row.categorySubtitle.en)}
                              </span>
                            </td>
                            <td className="py-3.5 px-2.5 sm:px-3 whitespace-nowrap">
                              <span className="font-mono text-xs font-black uppercase tracking-wider text-[#FA6D0B]">
                                {row.wave}
                              </span>
                            </td>
                            <td
                              className={`py-3.5 px-2.5 sm:px-3 whitespace-nowrap ${
                                row.prologueHighlight ? 'text-[#FA6D0B] font-bold' : 'text-slate-500'
                              }`}
                            >
                              {t(row.prologue.id, row.prologue.en)}
                            </td>
                            <td className="py-3.5 px-2.5 sm:px-3 text-white font-bold whitespace-nowrap">
                              {t(row.cot.id, row.cot.en)}
                            </td>
                            <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                              {t(row.pitstop.id, row.pitstop.en)}
                            </td>
                            <td className="py-3.5 px-2.5 sm:px-3 text-slate-300 whitespace-nowrap">
                              {t(row.lighting.id, row.lighting.en)}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                              <span
                                className={`font-mono text-xs uppercase tracking-wider ${
                                  row.isCompetitive ? 'font-black text-[#FA6D0B]' : 'text-slate-300'
                                }`}
                              >
                                {t(row.nature.id, row.nature.en)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
