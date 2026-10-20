'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, GPX_FILE_MAP, GPX_DISPLAY_INFO } from '@/lib/data/categories';
import { useLanguage } from '@/lib/context/LanguageContext';
import ElevationProfile from '@/components/ElevationProfile';

const RouteMap = dynamic(() => import('@/components/RouteMap'), { ssr: false });

export default function CategoryCockpit() {
  const { language, t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>('120');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'radar' | 'specs' | 'checkpoints'>('radar');

  const handleCategorySelect = (id: string) => {
    if (id === selectedId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedId(id);
      setIsTransitioning(false);
    }, 150);
  };

  const categories = CATEGORIES;
  const currentCategory = categories.find((c) => c.id === selectedId) || categories[2];

  return (
    <>
      {/* 2. HYBRID COCKPIT TELEMETRY & ATHLETIC MONOLITHS (NIKE TRAIL X GARMIN HUD) */}
      {/* ========================================================================= */}
      <section id="kategori" className="relative pt-3 sm:pt-4 pb-16 lg:pb-0">
        
        {/* Cinematic Action Cyclist Motion Background (pesepeda.webp) - MIDDLE IMAGE: Solo Aero Cyclist */}
        <div 
          className="absolute top-0 sm:-top-[420px] -bottom-72 inset-x-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, black 8%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, black 8%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/backgrounds/bg-categories.webp"
            alt="Grindurance High Speed Gravel Cyclist"
            className="w-full h-full object-cover object-[center_8%] lg:object-[72%_5%] opacity-90 filter contrast-[1.18] saturate-[1.2] brightness-[0.95] blur-[0.4px]"
          />
          {/* Seamless gradient overlays for extreme typographic legibility without cutting off the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E11]/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11]/90 via-[#0D0E11]/55 to-[#0D0E11]/25" />
        </div>

        {/* Seamless Horizontal Motion Blur Transition Seam between Hero and Categories */}
        <div 
          className="absolute top-0 sm:-top-36 inset-x-0 h-48 z-[2] pointer-events-none opacity-70 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)'
          }}
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.25)_0%,transparent_70%)] blur-2xl" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-3 sm:pb-4">
            <div className="space-y-3">
              <span className="text-sm sm:text-base md:text-lg font-black text-[#FA6D0B] uppercase tracking-widest block font-mono">
                70 — 200 KM CHALLENGE
              </span>
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] group">
                {/* Subtle ambient backlight glow in brand orange */}
                <div className="absolute -inset-3 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.28)_0%,transparent_70%)] blur-2xl opacity-80 pointer-events-none" />
                <img
                  src="/text official categories.webp"
                  alt="Official Categories"
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
            <div className="border-l-2 border-[#FA6D0B] pl-4 py-0.5 max-w-md">
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                {t(
                  'Tanpa mobil pengawal. Menembus guyuran hujan lebat, bebatuan makadam, dan tanjakan brutal hingga ',
                  'Self-supported. Braving heavy downpours, rough macadam, and brutal climbs up to '
                )}<span className="text-[#FA6D0B] font-bold font-mono">+2.530 meter</span>{t(
                  ' di koridor liar Jonggol–Sukamakmur.',
                  ' in the wild Jonggol–Sukamakmur corridor.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* SVG Definition for the Custom Grindurance Speed/Velocity Pattern (Orange Brand Tone) */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="grinduranceSpeedPattern" width="30" height="48" patternUnits="userSpaceOnUse">
              {/* Continuous baseline thin tracks */}
              {[4, 12, 20, 28, 36, 44].map((y) => (
                <line
                  key={`line-${y}`}
                  x1="0"
                  y1={y}
                  x2="30"
                  y2={y}
                  stroke="#FA6D0B"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />
              ))}

              {/* Diagonal velocity bars (shift 5px per line, width 16px, height 3.5px) */}
              {[
                { y: 2.25, x: 0 },
                { y: 10.25, x: 5 },
                { y: 18.25, x: 10 },
                { y: 26.25, x: 15 },
                { y: 34.25, x: 20 },
                { y: 42.25, x: 25 },
              ].map((bar, i) => (
                <g key={`bar-${i}`}>
                  <rect
                    x={bar.x}
                    y={bar.y}
                    width="16"
                    height="3.5"
                    rx="1.75"
                    fill="#FA6D0B"
                  />
                  <rect
                    x={bar.x - 30}
                    y={bar.y}
                    width="16"
                    height="3.5"
                    rx="1.75"
                    fill="#FA6D0B"
                  />
                </g>
              ))}
            </pattern>
          </defs>
        </svg>

        {/* Athletic Telemetry Monolith Matrix (Seamless Unified Chassis inside max-w-7xl, Tight & Compact) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2.5 sm:mb-3">
          
          {/* DESKTOP MATRIX (md:block) — 100% UNTOUCHED ORIGINAL DESIGN */}
          <div className="hidden md:block rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="grid grid-cols-3 gap-px">
              {categories.map((c, idx) => {
                const isActive = c.id === selectedId;
                const isRace = c.isRace || c.id === '120';
                const etapeNumber = `0${idx + 1}`;

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCategorySelect(c.id)}
                    className={`group relative text-left px-3.5 py-2.5 sm:px-4.5 sm:py-3 lg:px-5 lg:py-3.5 transition-all duration-200 flex flex-col justify-between overflow-hidden focus:outline-none cursor-pointer ${
                      isRace
                        ? isActive
                          ? 'bg-gradient-to-b from-[#FA6D0B]/25 via-[#FA6D0B]/[0.08] to-[#0B0C0E] text-white shadow-[inset_0_0_30px_rgba(250,109,11,0.18)] z-10'
                          : 'bg-[#0B0C0E] hover:bg-[#131519] text-slate-300'
                        : isActive
                          ? 'bg-gradient-to-b from-[#FA6D0B]/20 via-[#FA6D0B]/[0.05] to-[#0B0C0E] text-white shadow-[inset_0_0_25px_rgba(250,109,11,0.12)] z-10'
                          : 'bg-[#0B0C0E] hover:bg-[#131519] text-slate-400 hover:text-white'
                    }`}
                  >
                    {/* Unified Aerodynamic Speed Pattern Layer across the cell for Race */}
                    {isRace && (
                      <div 
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 overflow-hidden ${
                          isActive ? 'opacity-35 group-hover:opacity-50' : 'opacity-15 group-hover:opacity-25'
                        }`}
                        style={{
                          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)',
                        }}
                      >
                        <div 
                          className="absolute inset-x-0 -top-12 -bottom-12 animate-race-flow group-hover:animate-race-flow-fast"
                        >
                          <svg className="w-full h-full">
                            <rect width="100%" height="100%" fill="url(#grinduranceSpeedPattern)" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Top Laser Accent Line */}
                    <div
                      className={`absolute top-0 inset-x-0 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FA6D0B] shadow-[0_0_16px_#FA6D0B] h-[2.5px]'
                          : 'bg-transparent group-hover:bg-white/20 h-[1.5px]'
                      }`}
                    />

                    {/* Telemetry Header Row (Pure Typography, Compact) */}
                    <div className="relative z-10 flex items-center justify-between gap-2 mb-1">
                      <span className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-none ${
                        isRace ? 'text-[#FA6D0B]' : (isActive ? 'text-[#FA6D0B]' : 'text-slate-400 group-hover:text-slate-300')
                      }`}>
                        ETAPE // {etapeNumber}
                      </span>
                      {isRace ? (
                        <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-black bg-[#FA6D0B] px-1.5 py-0.5 rounded-sm shadow-[0_0_10px_rgba(250,109,11,0.5)] leading-none">
                          PODIUM TOP 3
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 tracking-wider uppercase font-medium leading-none">
                          {t('KUOTA //', 'QUOTA //')} {c.quota.split(' ')[0]}
                        </span>
                      )}
                    </div>

                    {/* Middle Row: Bold Distance & Elevation Telemetry */}
                    <div className="relative z-10 flex items-baseline justify-between gap-2 my-1 sm:my-1.5">
                      <span
                        className={`font-display text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-tight uppercase transition-all leading-none ${
                          isRace
                            ? isActive
                              ? 'text-white drop-shadow-[0_0_24px_rgba(250,109,11,0.75)]'
                              : 'text-white/90 group-hover:text-white drop-shadow-[0_0_12px_rgba(250,109,11,0.3)]'
                            : isActive
                              ? 'text-white drop-shadow-[0_0_20px_rgba(250,109,11,0.65)]'
                              : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {c.km === 'BEBAS' ? 'VIRTUAL' : c.km}
                      </span>
                      <span
                        className={`text-xs sm:text-[13px] font-mono font-bold tracking-tight shrink-0 transition-all duration-300 leading-none ${
                          isRace
                            ? isActive
                              ? 'text-white drop-shadow-[0_0_12px_rgba(250,109,11,0.9)] font-black'
                              : 'text-[#FA6D0B] group-hover:text-white'
                            : isActive
                              ? 'text-[#FA6D0B] drop-shadow-[0_0_12px_rgba(250,109,11,0.9)] font-black'
                              : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {c.elevation === 'Rute Lokal' ? 'GPS LOG' : c.elevation}
                      </span>
                    </div>

                    {/* Bottom Metadata & Telemetry Spec */}
                    <div className="relative z-10 space-y-0.5 border-t border-white/10 pt-1.5 sm:pt-2">
                      <div
                        className={`font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider truncate leading-tight ${
                          isRace
                            ? isActive
                              ? 'text-[#FA6D0B]'
                              : 'text-[#FA6D0B]/90 group-hover:text-[#FA6D0B]'
                            : isActive
                              ? 'text-[#FA6D0B]'
                              : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {isRace ? 'OFFICIAL RACE // SINGLE & PAIR' : c.subtitle}
                      </div>
                      <div className={`text-[9px] sm:text-[10px] truncate font-mono leading-tight ${
                        isRace
                          ? isActive 
                          : 'text-slate-400'
                      }`}>
                        {c.cot !== 'Fleksibel' ? `COT // ${language === 'ENG' ? (c.cotEng || c.cot.replace('Jam', 'HOURS')) : c.cot.toUpperCase()} · ${c.wave}` : t('19 CHAPTER // SE-INDONESIA', '19 CHAPTERS // NATIONWIDE')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE ATHLETIC CATEGORY SELECTOR (md:hidden) — COMPACT SWIPE RAIL */}
          <div className="md:hidden space-y-2">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-2.5 pb-2 no-scrollbar w-full">
              {categories.map((c, idx) => {
                const isActive = c.id === selectedId;
                const isRace = c.isRace || c.id === '120';
                const etapeNumber = `0${idx + 1}`;

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCategorySelect(c.id)}
                    className={`group relative text-left w-[215px] shrink-0 snap-center rounded-2xl p-3.5 transition-all duration-300 flex flex-col justify-between overflow-hidden focus:outline-none cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-b from-[#FA6D0B]/25 via-[#FA6D0B]/[0.08] to-[#0B0C0E] shadow-[0_15px_35px_rgba(250,109,11,0.25)]'
                        : 'bg-[#0B0C0E]/95 shadow-[0_10px_25px_rgba(0,0,0,0.6)] text-slate-400'
                    }`}
                  >
                    {/* Top Laser Line on Active */}
                    {isActive && (
                      <div className="absolute top-0 inset-x-0 h-[2.5px] bg-[#FA6D0B] shadow-[0_0_12px_#FA6D0B] rounded-t-2xl" />
                    )}

                    {/* Top Header */}
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${
                        isActive ? 'text-[#FA6D0B]' : 'text-slate-400'
                      }`}>
                        ETAPE // {etapeNumber}
                      </span>
                      {isRace ? (
                        <span className="font-mono text-[8px] font-black uppercase tracking-wider text-black bg-[#FA6D0B] px-1 py-0.2 rounded-sm">
                          PODIUM
                        </span>
                      ) : (
                        <span className="font-mono text-[8px] text-slate-400 uppercase tracking-wider">
                          {c.quota.split(' ')[0]} {t('KUOTA', 'QUOTA')}
                        </span>
                      )}
                    </div>

                    {/* Distance & Elevation */}
                    <div className="flex items-baseline justify-between gap-1 my-0.5">
                      <span className={`font-display text-2xl font-black italic uppercase leading-none ${
                        isActive ? 'text-white' : 'text-slate-200'
                      }`}>
                        {c.km === 'BEBAS' ? 'VIRTUAL' : c.km}
                      </span>
                      <span className={`font-mono text-[11px] font-bold leading-none ${
                        isActive ? 'text-[#FA6D0B]' : 'text-slate-400'
                      }`}>
                        {c.elevation === 'Rute Lokal' ? 'GPS LOG' : c.elevation}
                      </span>
                    </div>

                    {/* Subtitle & COT */}
                    <div className="border-t border-white/10 pt-1 mt-1 space-y-0.5">
                      <div className={`font-mono text-[10px] font-bold uppercase tracking-wide truncate ${
                        isActive ? 'text-[#FA6D0B]' : 'text-slate-300'
                      }`}>
                        {isRace ? 'OFFICIAL RACE' : c.subtitle}
                      </div>
                      <div className="font-mono text-[8px] text-slate-400 truncate">
                        {c.cot !== 'Fleksibel' ? `COT // ${language === 'ENG' ? (c.cotEng || c.cot.replace('Jam', 'HRS')) : c.cot.toUpperCase()} · ${c.wave}` : t('19 CHAPTER SE-INDONESIA', '19 CHAPTERS NATIONWIDE')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* THE CENTERPIECE: OPEN ATHLETIC SHOWCASE */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0">
          
          {/* MOBILE SEGMENTED COCKPIT TABS (lg:hidden) — CLEAN BORDERLESS CAPSULE */}
          <div className="lg:hidden flex items-center bg-black/80 backdrop-blur-xl p-1.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.6)] mb-3 font-mono text-xs gap-1">
            <button
              type="button"
              onClick={() => setMobileTab('radar')}
              className={`flex-1 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer text-center text-[11px] ${
                mobileTab === 'radar'
                  ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('RUTE & KONTUR', 'ROUTE & RADAR')}
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('specs')}
              className={`flex-1 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer text-center text-[11px] ${
                mobileTab === 'specs'
                  ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('SPESIFIKASI', 'SPECS & FEE')}
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('checkpoints')}
              className={`flex-1 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer text-center text-[11px] ${
                mobileTab === 'checkpoints'
                  ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('CHECKPOINT', 'CHECKPOINTS')}
            </button>
          </div>

          {/* Smooth Cross-Fade Transition Container */}
          <div className={`transition-all duration-300 transform ${
            isTransitioning ? 'opacity-25 scale-[0.99] translate-y-1 blur-[1px]' : 'opacity-100 scale-100 translate-y-0 blur-0'
          }`}>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch pt-1 pb-1">
            
              {/* KOLOM KIRI (5 COLS): ROUTE MAP & ELEVATION PROFILE */}
              <div className={`lg:col-span-5 select-none flex-col gap-4 ${mobileTab === 'radar' ? 'flex' : 'hidden lg:flex'}`}>
                
                {/* KOTAK MAP GPX LIVE */}
                <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-[5/4] rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col">
                  
                  {/* HEADER: Title + Telemetry */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 sm:px-5 py-3 shrink-0 bg-black/40">
                    <h4 className="font-display text-base sm:text-lg lg:text-xl font-black uppercase text-white italic tracking-wider leading-none">
                      {currentCategory.id === 'VIRTUAL' ? t('RUTE VIRTUAL', 'VIRTUAL ROUTE') : `${currentCategory.km} ${t('RUTE', 'ROUTE')}`}
                    </h4>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#FA6D0B] uppercase">
                      GPX LIVE // VECTOR HUD
                    </span>
                  </div>

                  {/* GPX LIVE MAP */}
                  <div className="relative z-10 flex-1 min-h-0">
                    <RouteMap
                      gpxFile={GPX_FILE_MAP[currentCategory.id] ?? null}
                      categoryKm={currentCategory.km}
                      categoryId={currentCategory.id}
                      gpxTotalKm={GPX_DISPLAY_INFO[currentCategory.id]?.gpxKm ?? ''}
                      prologKm={GPX_DISPLAY_INFO[currentCategory.id]?.prologKm ?? 0}
                      gpxFileName={GPX_DISPLAY_INFO[currentCategory.id]?.fileName ?? ''}
                      accentColor="#FA6D0B"
                    />
                  </div>

                </div>

                {/* KOTAK DIAGRAM ELEVASI (ELEVATION PROFILE) */}
                <ElevationProfile
                  category={currentCategory}
                  accentColor="#FA6D0B"
                />

              </div>

              {/* KOLOM KANAN (7 COLS): TATA LETAK DATA & TELEMETRI DENGAN FROSTED CARD ELEGAN */}
              <div className={`lg:col-span-7 rounded-2xl bg-black/60 backdrop-blur-xl p-4 sm:p-6 flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4 ${mobileTab === 'specs' ? 'flex' : 'hidden lg:flex'}`}>
                
                {/* 1. Header Etape */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase text-white italic tracking-tight leading-tight drop-shadow-sm flex flex-wrap items-baseline gap-x-2.5">
                    <span>{language === 'ENG' && currentCategory.titleEng ? currentCategory.titleEng : currentCategory.title}</span>
                    {currentCategory.titleNote && (
                      <span className="text-xs sm:text-sm lg:text-base font-mono font-bold text-slate-400 not-italic uppercase tracking-wider inline-block">
                        {currentCategory.titleNote}
                      </span>
                    )}
                  </h3>
                </div>
                
                {/* 2. BARIS SPESIFIKASI KUNCI (OPEN TELEMETRY BAR) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/10 py-3.5 border-y border-white/10">
                  {/* Jarak */}
                  <div className="space-y-1 sm:pr-4">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">{t('JARAK', 'DISTANCE')}</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      <span className={`font-display font-black text-white italic leading-none ${currentCategory.id === 'VIRTUAL' ? 'text-xl sm:text-2xl xl:text-3xl' : 'text-2xl sm:text-3xl xl:text-4xl'}`}>
                        {currentCategory.km.split(' ')[0]}
                      </span>
                      {currentCategory.km.split(' ')[1] && (
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                          {currentCategory.km.split(' ')[1]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Total Elev */}
                  <div className="space-y-1 sm:px-4">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">TOTAL ELEV</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      {currentCategory.id === 'VIRTUAL' ? (
                        <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-[#FA6D0B] italic leading-none">
                          {t('Rute Lokal', 'Local Route')}
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-[#FA6D0B] italic leading-none">
                            {currentCategory.elevation.split(' ')[0]}
                          </span>
                          {currentCategory.elevation.split(' ')[1] && (
                            <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B]/80 uppercase not-italic">
                              {currentCategory.elevation.split(' ')[1]}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Wave Start */}
                  <div className="space-y-1 sm:px-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">WAVE START</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      {currentCategory.id === 'VIRTUAL' ? (
                        <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-white italic leading-none">
                          {t('Mandiri', 'Self-Start')}
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                            {currentCategory.wave.split(' ')[0]}
                          </span>
                          {currentCategory.wave.split(' ')[1] && (
                            <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                              {currentCategory.wave.split(' ')[1]}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Batas Waktu */}
                  <div className="space-y-1 sm:pl-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">{t('BATAS WAKTU (COT)', 'CUT OFF TIME (COT)')}</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      {currentCategory.id === 'VIRTUAL' ? (
                        <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-white italic leading-none">
                          {t('Fleksibel', 'Flexible')}
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                            {currentCategory.cot.split(' ')[0]}
                          </span>
                          {currentCategory.cot.split(' ')[1] && (
                            <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                              {language === 'ENG' ? (currentCategory.cot.split(' ')[1] === 'Jam' ? 'HOURS' : currentCategory.cot.split(' ')[1]) : currentCategory.cot.split(' ')[1]}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Narasi Deskripsi Jalur & Karakteristik Etape */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                    {t('KARAKTERISTIK ETAPE //', 'STAGE CHARACTERISTICS //')}
                  </span>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                    {language === 'ENG' && currentCategory.descEng ? currentCategory.descEng : currentCategory.desc}
                  </p>
                </div>

                {/* 4. Surface Breakdown (Komposisi Permukaan Jalur) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FA6D0B] uppercase tracking-wider font-bold">{t('KOMPOSISI MEDAN //', 'SURFACE BREAKDOWN //')}</span>
                    <span className="text-slate-300">
                      <span className="text-[#FA6D0B] font-bold">{currentCategory.surfaceBreakdown.asphalt}</span> {t('Aspal', 'Asphalt')} ·{' '}
                      <span className="text-white font-bold">{currentCategory.surfaceBreakdown.gravel}</span> {t('Makadam', 'Gravel')} ·{' '}
                      <span className="text-slate-400 font-bold">{currentCategory.surfaceBreakdown.unpaved}</span> {t('Tanah/Batu', 'Dirt/Rocky')}
                    </span>
                  </div>
                  {/* Progress multi-segment bar */}
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                    <div style={{ width: currentCategory.surfaceBreakdown.asphalt }} className="h-full bg-slate-400 transition-all duration-700 ease-out" title="Aspal" />
                    <div style={{ width: currentCategory.surfaceBreakdown.gravel }} className="h-full bg-[#FA6D0B] transition-all duration-700 ease-out" title="Makadam" />
                    <div style={{ width: currentCategory.surfaceBreakdown.unpaved }} className="h-full bg-white/30 transition-all duration-700 ease-out" title="Tanah/Batu" />
                  </div>
                </div>

                {/* 5. TIERED PRICING — Matching Official GX-ID Contribution Package */}
                <div className="pt-3.5 border-t border-white/10">

                  {/* Row 1: Section label + Official Production Deadline Status */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-sans font-black uppercase tracking-widest text-[#FA6D0B]">
                        {t('BIAYA PENDAFTARAN //', 'REGISTRATION FEE //')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold text-slate-400 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                      <span>{t('BATAS AKHIR PRODUKSI:', 'PRODUCTION DEADLINE:')} <strong className="text-white">{t('10 NOVEMBER 2026', 'NOVEMBER 10, 2026')}</strong></span>
                    </div>
                  </div>

                  {/* Row 2: Two packages side by side + CTA */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-0">

                    {/* TIER 1: PAKET MEDAL SAJA */}
                    <div className="flex-1 py-3 pr-5 border-r border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-sans font-black uppercase tracking-widest text-slate-300">
                          {t('PAKET MEDAL SAJA', 'MEDAL ONLY PACKAGE')}
                        </span>
                        <span className="text-[9px] font-sans font-bold uppercase text-slate-400">
                          {t('ESENSIAL', 'ESSENTIAL')}
                        </span>
                      </div>

                      {currentCategory.isRace ? (
                        <div className="space-y-2">
                          <div>
                            <div className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-0.5">SINGLE RIDER</div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-display italic font-black text-2xl text-white leading-none">
                                {currentCategory.regular.medal}
                              </span>
                            </div>
                          </div>
                          {currentCategory.regular.pairMedal && (
                            <div className="pt-1.5 border-t border-white/[0.06]">
                              <div className="text-[9px] font-sans font-bold text-[#FA6D0B] uppercase tracking-wider mb-0.5">PAIR MIX (2 PAX)</div>
                              <div className="flex items-baseline gap-2">
                                <span className="font-display italic font-black text-2xl text-[#FA6D0B] leading-none">
                                  {currentCategory.regular.pairMedal}
                                </span>
                                <span className="text-[10px] font-sans text-slate-400">{t('/ Tim', '/ Team')}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1">{t('TARIF DASAR', 'BASE RATE')}</div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-display italic font-black text-3xl text-white leading-none">
                              {currentCategory.regular.medal}
                            </span>
                          </div>
                          <div className="text-[10px] font-sans text-slate-400 mt-1.5">{t('Termasuk seluruh fasilitas hari-H', 'Includes all race-day amenities')}</div>
                        </div>
                      )}
                    </div>

                    {/* SEPARATOR */}
                    <div className="hidden sm:block w-[1px] bg-white/10 my-2 self-stretch" />

                    {/* TIER 2: PAKET MEDAL & JERSEY RESMI */}
                    <div className="flex-1 py-3 sm:pl-5 sm:pr-5 border-t sm:border-t-0 border-white/10 sm:border-r border-white/10 bg-[#FA6D0B]/[0.03]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-sans font-black uppercase tracking-widest text-[#FA6D0B]">
                          {t('MEDAL + JERSEY RESMI', 'OFFICIAL MEDAL + JERSEY')}
                        </span>
                        <span className="text-[9px] font-sans font-black uppercase px-2 py-0.5 rounded bg-[#FA6D0B] text-black">
                          +RP 50.000
                        </span>
                      </div>

                      {currentCategory.isRace ? (
                        <div className="space-y-2">
                          <div>
                            <div className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-0.5">SINGLE RIDER</div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-display italic font-black text-2xl text-white leading-none">
                                {currentCategory.regular.jersey}
                              </span>
                            </div>
                          </div>
                          {currentCategory.regular.pairJersey && (
                            <div className="pt-1.5 border-t border-white/[0.06]">
                              <div className="text-[9px] font-sans font-bold text-[#FA6D0B] uppercase tracking-wider mb-0.5">PAIR MIX (2 PAX)</div>
                              <div className="flex items-baseline gap-2">
                                <span className="font-display italic font-black text-2xl text-[#FA6D0B] leading-none">
                                  {currentCategory.regular.pairJersey}
                                </span>
                                <span className="text-[10px] font-sans text-slate-400">{t('/ Tim (2 Jersey)', '/ Team (2 Jerseys)')}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1">{t('PAKET LENGKAP', 'FULL PACKAGE')}</div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-display italic font-black text-3xl text-white leading-none">
                              {currentCategory.regular.jersey}
                            </span>
                          </div>
                          <div className="text-[10px] font-sans text-[#FA6D0B] font-bold mt-1.5">{t('Termasuk Aero Jersey Pollride (Nilai Rp 350.000)', 'Includes Pollride Aero Jersey (IDR 350K Value)')}</div>
                        </div>
                      )}
                    </div>

                    {/* CTA + VOUCHER */}
                    <div className="flex flex-col justify-between gap-3 sm:pl-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10 sm:w-[190px] shrink-0">
                      <div>
                        <div className="text-[10px] font-sans font-black uppercase tracking-widest text-[#FA6D0B] mb-1">{t('MEAL COUPON RP 50.000', 'IDR 50,000 MEAL COUPON')}</div>
                        <p className="text-[10px] font-sans text-slate-300 leading-relaxed">
                          {t('Otomatis untuk ', 'Automatic for ')}<strong className="text-white font-bold">{t('Wanita · Usia ≤17 Th · Tim Pair Mix', 'Women · Age ≤17 Yrs · Pair Mix Teams')}</strong> {t('(1 kupon/tim).', '(1 coupon/team).')}<br />
                          <span className="text-slate-400 text-[9px]">{t('*Tidak berlaku untuk Pair Men&Men.', '*Not valid for Pair Men&Men.')}</span>
                        </p>
                      </div>
                      <Link
                        href={`/daftar?category=${currentCategory.id}`}
                        className="group w-full px-4 py-3 rounded-full text-[11px] font-sans font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-300 hover:shadow-[0_0_24px_rgba(250,109,11,0.5)] flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap text-center"
                      >
                        {t('DAFTAR SEKARANG', 'REGISTER NOW')}
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                      </Link>
                    </div>

                  </div>

                  {/* Foreigner & Expatriate Rate Banner */}
                  <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[10px] font-sans text-slate-400">
                    <span>
                      <strong className="text-white font-semibold">{t('Peserta Asing (WNA / Expat):', 'International Riders (Expat):')}</strong> {t('Single US$50 (Rp 890.000) · Pair US$80 (Rp 1.424.000) sudah termasuk opsi jersey resmi.', 'Single US$50 · Pair US$80 (includes official race jersey option).')}
                    </span>
                    <span className="text-slate-500 uppercase tracking-wider">{t('KONTRIBUSI GLOBAL', 'GLOBAL TIER')}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* ROW 2: TECHNICAL DETAILS, CHECKPOINTS & PROTOCOLS (TIGHTENED & HARMONIZED) */}
            <div className={`mt-3 pt-3 border-t border-white/10 space-y-3.5 ${mobileTab === 'checkpoints' ? 'block' : 'hidden lg:block'}`}>
              
              {/* Checkpoint & Pitstop Grid (Full Width, Compact & Icon-free) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 uppercase tracking-wider font-bold">
                    {t('CHECKPOINT & PITSTOP ETAPE //', 'STAGE CHECKPOINTS & PITSTOPS //')} {currentCategory.km}
                  </span>
                  <span className="text-[10px] text-[#FA6D0B] font-bold uppercase tracking-wider">
                    {currentCategory.id === '150' || currentCategory.id === '200' ? t('WAJIB PITSTOP 30 MENIT', 'MANDATORY 30-MIN PITSTOP') : 'SMART GEOFENCING'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                  {currentCategory.stations.map((st, sIdx) => {
                    const isPitstop = st.type === 'PITSTOP';
                    const isKOM = st.type === 'KOM';
                    return (
                      <div 
                        key={sIdx}
                        className={`p-3 rounded-xl text-left flex flex-col justify-between backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.4)] ${
                          isPitstop 
                            ? 'bg-[#FA6D0B]/20' 
                            : isKOM
                            ? 'bg-[#FA6D0B]/20'
                            : 'bg-black/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold text-[#FA6D0B]">{st.km}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                            isPitstop || isKOM ? 'bg-[#FA6D0B] text-black' : 'bg-white/10 text-white'
                          }`}>
                            {st.type}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-white uppercase leading-snug block line-clamp-2">
                          {language === 'ENG' && st.nameEng ? st.nameEng : st.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate mt-1">
                          {language === 'ENG' && st.descEng ? st.descEng : st.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety & Protocol Box (Pure Typography, Icon-free) */}
              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-1.5 text-xs">
                <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                  {t('REGULASI TEKNIS & PROTOKOL //', 'TECHNICAL REGULATIONS & PROTOCOLS //')}
                </span>
                <div className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                  {currentCategory.isRace ? (
                    <span>{t('Wajib mengaktifkan Live Tracking via ', 'Mandatory Live Tracking via ')}<strong>RaceRoute.id / Traccar</strong>{t('. Perebutan Podium Resmi Top 3 (Putra, Putri & Tim Tandem Pair Mix). Format balap kompetitif tercepat.', '. Top 3 Official Podium contest (Men, Women & Pair Mix Tandem Teams). Fastest competitive race format.')}</span>
                  ) : (currentCategory.id === '150' || currentCategory.id === '200') ? (
                    <span>{t('Wajib menyelesaikan ', 'Mandatory ')}<strong>{t('Prolog 30 km mandiri (03:00–05:00 WIB)', '30 km self-start prologue (03:00–05:00 WIB)')}</strong>{t(' sebelum registrasi start. Wajib istirahat ', ' before morning staging. Mandatory ')}<strong>{t('Pitstop 30 Menit di CP#4', '30-Minute Pitstop at CP#4')}</strong>{t(' (penalti 300% jika melanggar). Wajib wet lube & ban 35–40mm.', ' (300% penalty for violations). Wet lube & 35–40mm tires required.')}</span>
                  ) : currentCategory.id === 'VIRTUAL' ? (
                    <span>{t('Khusus domisili luar Jabodetabek. Wajib rekaman outdoor satelit murni via ', 'Exclusive for riders domiciled outside Greater Jakarta (Jabodetabek). Genuine outdoor GPS recording required via ')}<strong>Strava / Komoot</strong>{t('. Sinkronisasi otomatis Strava Webhook, medali resmi dikirim via DHS Logistik.', '. Automated Strava Webhook sync, official medal dispatched via DHS Logistics.')}</span>
                  ) : (
                    <span>{t('Kategori rekreasional mandiri (un-supported joy of riding). Ramah bagi pengguna sepeda lipat (Seli 20"), sepeda hybrid, dan pemula. Wajib helm & lampu sepeda.', 'Self-supported recreational category (un-supported joy of riding). Friendly for folding bikes (20" wheels), hybrid bikes, and beginner riders. Helmet & bike lights required.')}</span>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Sticky Mobile Booking Bottom Bar (lg:hidden) */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0D0E11]/95 backdrop-blur-xl border-t border-white/15 px-4 py-2.5 shadow-[0_-10px_35px_rgba(0,0,0,0.85)]">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#FA6D0B] font-bold uppercase tracking-wider truncate">
                <span>{currentCategory.km}</span>
                <span className="text-white/25">·</span>
                <span className="text-slate-300 truncate">{currentCategory.title}</span>
              </div>
              <div className="text-xs sm:text-sm font-display italic font-black text-white">
                {currentCategory.regular.medal}
                <span className="text-[10px] font-sans font-normal text-slate-400 not-italic ml-1">
                  {currentCategory.isRace ? '/ Single' : ''}
                </span>
              </div>
            </div>
            <Link
              href={`/daftar?category=${currentCategory.id}`}
              className="px-5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all flex items-center gap-1.5 shadow-[0_0_16px_rgba(250,109,11,0.5)] shrink-0 active:scale-95 cursor-pointer"
            >
              <span>{t('DAFTAR', 'REGISTER')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

      </section>


      {/* ========================================================================= */}
    </>
  );
}
