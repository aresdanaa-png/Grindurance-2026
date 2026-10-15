'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { 
  CATEGORIES, 
  CategoryData, 
  GPX_FILE_MAP, 
  GPX_DISPLAY_INFO 
} from '@/lib/data/categories';

const RouteMap = dynamic(() => import('@/components/RouteMap'), { ssr: false });

export default function CategoryCockpit() {
  const [selectedId, setSelectedId] = useState<string>('120_PAIR');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Status Registrasi Resmi GX-ID
  const REGISTRATION_PRODUCTION_DEADLINE = '10 November 2026';

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
      <section id="kategori" className="relative pt-8 pb-0">
        
        {/* Cinematic Action Cyclist Motion Background (pesepeda.webp) - MIDDLE IMAGE: Solo Aero Cyclist */}
        <div 
          className="absolute -top-96 sm:-top-[420px] -bottom-72 inset-x-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 8%, black 22%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 8%, black 22%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/pesepeda.webp"
            alt="Grindurance Gravel Cyclist Solo In Motion"
            className="w-full h-full object-cover object-[center_20%] lg:object-[70%_12%] opacity-90 filter contrast-120 saturate-125 brightness-100"
          />
          {/* Seamless gradient overlays for extreme typographic legibility without cutting off the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E11] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11]/90 via-[#0D0E11]/55 to-[#0D0E11]/25" />
        </div>

        {/* Seamless Horizontal Motion Blur Transition Seam between Hero and Categories */}
        <div 
          className="absolute -top-36 inset-x-0 h-48 z-[2] pointer-events-none opacity-70 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)'
          }}
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.25)_0%,transparent_70%)] blur-2xl" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-3">
              <span className="text-sm sm:text-base md:text-lg font-black text-[#FA6D0B] uppercase tracking-widest block font-mono">
                60 — 200 KM EXPEDITION
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
                Tanpa mobil pengawal. Menembus guyuran hujan lebat, bebatuan makadam, dan tanjakan brutal hingga <span className="text-[#FA6D0B] font-bold font-mono">+3.180 meter</span> di koridor liar Jonggol–Sukamakmur.
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

        {/* Full-Bleed Edge-to-Edge Category Stage Bar (Translucent Glass to Let BG Glow Through) */}
        <div className="relative z-10 w-full border-y border-white/10 bg-black/40 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="flex lg:grid lg:grid-cols-6 divide-x divide-white/10 overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map((c) => {
              const isActive = c.id === selectedId;
              const isRace = c.isRace || c.id === '120_PAIR';
              return (
                <button
                  key={c.id}
                  onClick={() => handleCategorySelect(c.id)}
                  className={`group relative text-left py-4 sm:py-5 px-4 sm:px-5 lg:px-6 transition-all duration-300 flex flex-col justify-between overflow-hidden focus:outline-none min-w-[175px] sm:min-w-[195px] lg:min-w-0 flex-shrink-0 lg:flex-shrink ${
                    isRace
                      ? isActive
                        ? 'bg-gradient-to-b from-[#FA6D0B]/20 via-[#FA6D0B]/10 to-transparent text-white shadow-[inset_0_0_24px_rgba(250,109,11,0.2)] border-x border-[#FA6D0B]/40 z-20'
                        : 'bg-gradient-to-b from-[#FA6D0B]/[0.06] via-white/[0.02] to-transparent hover:from-[#FA6D0B]/[0.12] hover:via-white/[0.03] hover:to-transparent text-slate-300 border-x border-[#FA6D0B]/20'
                      : isActive
                        ? 'bg-gradient-to-b from-[#FA6D0B]/25 via-[#FA6D0B]/10 to-transparent text-white'
                        : 'bg-transparent hover:bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  {/* Unified Aerodynamic Speed Pattern Layer across the column */}
                  {isRace && (
                    <div 
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 overflow-hidden ${
                        isActive ? 'opacity-40 group-hover:opacity-55' : 'opacity-20 group-hover:opacity-35'
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

                  {/* Top Glowing Indicator Bar */}
                  <div
                    className={`absolute top-0 inset-x-0 transition-all duration-300 ${
                      isRace
                        ? isActive
                          ? 'bg-[#FA6D0B] shadow-[0_0_24px_#FA6D0B] h-[3px]'
                          : 'bg-[#FA6D0B]/40 group-hover:bg-[#FA6D0B] h-[2px]'
                        : isActive
                          ? 'bg-[#FA6D0B] shadow-[0_0_18px_#FA6D0B] h-1'
                          : 'bg-transparent group-hover:bg-white/20 h-1'
                    }`}
                  />

                  {/* Micro Racing Pill Badge */}
                  {isRace ? (
                    <div className="relative z-10 flex items-center justify-between gap-1 mb-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                        isActive
                          ? 'bg-[#FA6D0B] text-black shadow-[0_0_14px_rgba(250,109,11,0.6)]'
                          : 'bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/40 group-hover:border-[#FA6D0B]'
                      }`}>
                        PODIUM TOP 3
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-wider text-[#FA6D0B] uppercase">
                        PAIR MIX · DUAL
                      </span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[9px] font-mono text-slate-500 font-semibold uppercase">
                        KUOTA: {c.quota.split(' ')[0]}
                      </span>
                    </div>
                  )}

                  {/* Header Row: Big Bold Distance + Telemetry Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`font-display text-2xl sm:text-3xl font-black italic tracking-tight uppercase transition-all leading-none inline-block pr-1.5 ${
                        isRace
                          ? isActive
                            ? 'text-white drop-shadow-[0_0_24px_rgba(250,109,11,0.75)]'
                            : 'text-white/90 group-hover:text-white drop-shadow-[0_0_12px_rgba(250,109,11,0.3)]'
                          : isActive
                            ? 'text-white drop-shadow-[0_0_20px_rgba(250,109,11,0.65)]'
                            : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {c.km === 'BEBAS' ? 'VIRTUAL' : c.km}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight shrink-0 transition-all duration-300 ${
                        isRace
                          ? isActive
                            ? 'text-white drop-shadow-[0_0_14px_rgba(250,109,11,0.9)] font-black'
                            : 'text-[#FA6D0B] group-hover:text-white'
                          : isActive
                            ? 'text-[#FA6D0B] drop-shadow-[0_0_14px_rgba(250,109,11,0.9)] font-black'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {c.elevation === 'Rute Lokal' ? 'GPS LOG' : c.elevation}
                    </span>
                  </div>

                  {/* Subtitle & Telemetry Meta */}
                  <div className="relative z-10 space-y-0.5">
                    <div
                      className={`text-xs font-bold uppercase tracking-wider truncate ${
                        isRace
                          ? isActive
                            ? 'text-[#FA6D0B] font-black'
                            : 'text-[#FA6D0B]/90 group-hover:text-[#FA6D0B]'
                          : isActive
                            ? 'text-[#FA6D0B]'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {isRace ? 'AMAZING RACE · PODIUM' : c.subtitle}
                    </div>
                    <div className={`text-[10px] truncate font-mono ${
                      isRace
                        ? isActive 
                          ? 'text-white/90 font-medium' 
                          : 'text-slate-300 group-hover:text-white'
                        : 'text-slate-300'
                    }`}>
                      {c.cot !== 'Fleksibel' ? `COT ${c.cot} · ${c.wave}` : '19 CHAPTER NASIONAL'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* THE CENTERPIECE: OPEN ATHLETIC SHOWCASE */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          
          {/* Smooth Cross-Fade Transition Container */}
          <div className={`transition-all duration-300 transform ${
            isTransitioning ? 'opacity-25 scale-[0.99] translate-y-1 blur-[1px]' : 'opacity-100 scale-100 translate-y-0 blur-0'
          }`}>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch pt-1 pb-2">
            
              {/* KOLOM KIRI (5 COLS): ROUTE MAP — Tab toggle antara SVG schematic & Leaflet GPX live map */}
              <div className="lg:col-span-5 select-none">
                
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.5)] flex flex-col">
                  
                  {/* HEADER: Title + Telemetry */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 sm:px-5 py-3 shrink-0 bg-black/40">
                    <h4 className="font-display text-base sm:text-lg lg:text-xl font-black uppercase text-white italic tracking-wider leading-none">
                      {currentCategory.id === 'VIRTUAL' ? 'VIRTUAL ROUTE' : `${currentCategory.km} ROUTE`}
                    </h4>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#FA6D0B] uppercase">
                      GPX LIVE // SATELLITE
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

              </div>

              {/* KOLOM KANAN (7 COLS): TATA LETAK DATA & TELEMETRI DENGAN FROSTED CARD ELEGAN */}
              <div className="lg:col-span-7 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 p-5 sm:p-6 flex flex-col justify-between shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                
                {/* 1. Header Etape */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase text-white italic tracking-tight leading-none drop-shadow-sm flex items-baseline gap-x-2.5 whitespace-nowrap">
                    <span>{currentCategory.title}</span>
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
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">JARAK</span>
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
                          Rute Lokal
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
                          Mandiri
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
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">BATAS WAKTU (COT)</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      {currentCategory.id === 'VIRTUAL' ? (
                        <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-white italic leading-none">
                          Fleksibel
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                            {currentCategory.cot.split(' ')[0]}
                          </span>
                          {currentCategory.cot.split(' ')[1] && (
                            <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                              {currentCategory.cot.split(' ')[1]}
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
                    KARAKTERISTIK ETAPE //
                  </span>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                    {currentCategory.desc}
                  </p>
                </div>

                {/* 4. Surface Breakdown (Komposisi Permukaan Jalur) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FA6D0B] uppercase tracking-wider font-bold">KOMPOSISI MEDAN //</span>
                    <span className="text-slate-300">
                      <span className="text-[#FA6D0B] font-bold">{currentCategory.surfaceBreakdown.asphalt}</span> Aspal ·{' '}
                      <span className="text-white font-bold">{currentCategory.surfaceBreakdown.gravel}</span> Makadam ·{' '}
                      <span className="text-slate-400 font-bold">{currentCategory.surfaceBreakdown.unpaved}</span> Tanah/Batu
                    </span>
                  </div>
                  {/* Progress multi-segment bar */}
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                    <div style={{ width: currentCategory.surfaceBreakdown.asphalt }} className="h-full bg-slate-400" title="Aspal" />
                    <div style={{ width: currentCategory.surfaceBreakdown.gravel }} className="h-full bg-[#FA6D0B]" title="Makadam" />
                    <div style={{ width: currentCategory.surfaceBreakdown.unpaved }} className="h-full bg-white/30" title="Tanah/Batu" />
                  </div>
                </div>

                {/* 5. TIERED PRICING — Matching Official GX-ID Contribution Package */}
                <div className="pt-3.5 border-t border-white/10">

                  {/* Row 1: Section label + Official Production Deadline Status */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-sans font-black uppercase tracking-widest text-[#FA6D0B]">
                        BIAYA PENDAFTARAN //
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold text-slate-400 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                      <span>BATAS AKHIR PRODUKSI: <strong className="text-white">10 NOVEMBER 2026</strong></span>
                    </div>
                  </div>

                  {/* Row 2: Two packages side by side + CTA */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-0">

                    {/* TIER 1: PAKET MEDAL SAJA */}
                    <div className="flex-1 py-3 pr-5 border-r border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-sans font-black uppercase tracking-widest text-slate-300">
                          PAKET MEDAL SAJA
                        </span>
                        <span className="text-[9px] font-sans font-bold uppercase text-slate-400">
                          ESENSIAL
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
                                <span className="text-[10px] font-sans text-slate-400">/ Tim</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1">TARIF DASAR</div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-display italic font-black text-3xl text-white leading-none">
                              {currentCategory.regular.medal}
                            </span>
                          </div>
                          <div className="text-[10px] font-sans text-slate-400 mt-1.5">Termasuk seluruh fasilitas hari-H</div>
                        </div>
                      )}
                    </div>

                    {/* SEPARATOR */}
                    <div className="hidden sm:block w-[1px] bg-white/10 my-2 self-stretch" />

                    {/* TIER 2: PAKET MEDAL & JERSEY RESMI */}
                    <div className="flex-1 py-3 sm:pl-5 sm:pr-5 border-t sm:border-t-0 border-white/10 sm:border-r border-white/10 bg-[#FA6D0B]/[0.03]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-sans font-black uppercase tracking-widest text-[#FA6D0B]">
                          MEDAL + JERSEY RESMI
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
                                <span className="text-[10px] font-sans text-slate-400">/ Tim (2 Jersey)</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1">PAKET LENGKAP</div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-display italic font-black text-3xl text-white leading-none">
                              {currentCategory.regular.jersey}
                            </span>
                          </div>
                          <div className="text-[10px] font-sans text-[#FA6D0B] font-bold mt-1.5">Termasuk Aero Jersey Pollride (Nilai Rp 350.000)</div>
                        </div>
                      )}
                    </div>

                    {/* CTA + VOUCHER */}
                    <div className="flex flex-col justify-between gap-3 sm:pl-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10 sm:w-[190px] shrink-0">
                      <div>
                        <div className="text-[10px] font-sans font-black uppercase tracking-widest text-[#FA6D0B] mb-1">MEAL COUPON RP 50.000</div>
                        <p className="text-[10px] font-sans text-slate-300 leading-relaxed">
                          Otomatis untuk <strong className="text-white font-bold">Wanita · Usia ≤17 Th · Tim Pair Mix</strong> (1 kupon/tim).<br />
                          <span className="text-slate-400 text-[9px]">*Tidak berlaku untuk Pair Men&amp;Men.</span>
                        </p>
                      </div>
                      <Link
                        href={`/daftar?category=${currentCategory.id}`}
                        className="group w-full px-4 py-3 rounded-full text-[11px] font-sans font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-300 hover:shadow-[0_0_24px_rgba(250,109,11,0.5)] flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap text-center"
                      >
                        DAFTAR SEKARANG
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                      </Link>
                    </div>

                  </div>

                  {/* Foreigner & Expatriate Rate Banner */}
                  <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[10px] font-sans text-slate-400">
                    <span>
                      <strong className="text-white font-semibold">Peserta Asing (WNA / Expat):</strong> Single US$50 (Rp 890.000) · Pair US$80 (Rp 1.424.000) sudah termasuk opsi jersey resmi.
                    </span>
                    <span className="text-slate-500 uppercase tracking-wider">KONTRIBUSI GLOBAL</span>
                  </div>
                </div>

              </div>

            </div>

            {/* ROW 2: TECHNICAL DETAILS, CHECKPOINTS & PROTOCOLS (TIGHTENED & HARMONIZED) */}
            <div className="mt-3 pt-3 border-t border-white/10 space-y-3.5">
              
              {/* Checkpoint & Pitstop Grid (Full Width, Compact & Icon-free) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 uppercase tracking-wider font-bold">
                    CHECKPOINT &amp; PITSTOP ETAPE // {currentCategory.km}
                  </span>
                  <span className="text-[10px] text-[#FA6D0B] font-bold uppercase tracking-wider">
                    {currentCategory.id === '150' || currentCategory.id === '200' ? 'WAJIB PITSTOP 30 MENIT' : 'SMART GEOFENCING'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                  {currentCategory.stations.map((st, sIdx) => {
                    const isPitstop = st.type === 'PITSTOP';
                    const isKOM = st.type === 'KOM';
                    return (
                      <div 
                        key={sIdx}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between backdrop-blur-sm shadow-sm ${
                          isPitstop 
                            ? 'bg-[#FA6D0B]/10 border-[#FA6D0B]/50' 
                            : isKOM
                            ? 'bg-[#FA6D0B]/10 border-[#FA6D0B]/50'
                            : 'bg-black/50 border-white/10'
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
                        <span className="text-xs font-bold text-white uppercase leading-snug block line-clamp-2">{st.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate mt-1">{st.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety & Protocol Box (Pure Typography, Icon-free) */}
              <div className="p-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 space-y-1.5 text-xs">
                <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                  REGULASI TEKNIS &amp; PROTOKOL //
                </span>
                <div className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                  {currentCategory.isRace ? (
                    <span>Wajib mengaktifkan Live Tracking via <strong>RaceRoute.id / Traccar</strong>. Perebutan Podium Resmi Top 3 (Putra, Putri &amp; Tim Tandem Pair Mix). Format balap kompetitif tercepat.</span>
                  ) : (currentCategory.id === '150' || currentCategory.id === '200') ? (
                    <span>Wajib menyelesaikan <strong>Prolog 30 km mandiri (03:00–05:00 WIB)</strong> sebelum registrasi start. Wajib istirahat <strong>Pitstop 30 Menit di CP#4</strong> (penalti 300% jika melanggar). Wajib wet lube &amp; ban 35–40mm.</span>
                  ) : currentCategory.id === 'VIRTUAL' ? (
                    <span>Khusus domisili luar Jabodetabek. Wajib rekaman outdoor satelit murni via <strong>Strava / Komoot</strong>. Sinkronisasi otomatis Strava Webhook, medali resmi dikirim via DHS Logistik.</span>
                  ) : (
                    <span>Kategori rekreasional mandiri (*un-supported joy of riding*). Ramah bagi pengguna sepeda lipat (Seli 20"), sepeda hybrid, dan pemula. Wajib helm &amp; lampu sepeda.</span>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================================================= */}
    </>
  );
}
