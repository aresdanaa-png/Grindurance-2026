'use client';

import React, { useState } from 'react';
import { JerseySize } from '@/lib/types';
import { OFFICIAL_SIZE_CHART, SizeChartItem } from '@/lib/data/sizeChart';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize?: JerseySize;
  onSelectSize?: (size: JerseySize) => void;
}

export default function SizeChartModal({
  isOpen,
  onClose,
  selectedSize,
  onSelectSize,
}: SizeChartModalProps) {
  const [activeTab, setActiveTab] = useState<'interactive' | 'official_image'>('interactive');
  const [tierFilter, setTierFilter] = useState<'ALL' | 'STANDARD' | 'UP_SIZE'>('ALL');
  const [focusedSize, setFocusedSize] = useState<JerseySize>(selectedSize || 'L');
  const [showMeasureDetails, setShowMeasureDetails] = useState(false);

  if (!isOpen) return null;

  const currentItem: SizeChartItem =
    OFFICIAL_SIZE_CHART.find((item) => item.size === focusedSize) || OFFICIAL_SIZE_CHART[3]; // default L

  const filteredItems = OFFICIAL_SIZE_CHART.filter((item) => {
    if (tierFilter === 'STANDARD') return item.tier === 'STANDARD';
    if (tierFilter === 'UP_SIZE') return item.tier === 'UP_SIZE';
    return true;
  });

  const handleSizeClick = (size: JerseySize) => {
    setFocusedSize(size);
    if (onSelectSize) {
      onSelectSize(size);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] bg-black/95 flex flex-col items-center justify-center p-2.5 sm:p-6 backdrop-blur-md animate-fade-in-area overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-gradient-to-b from-[#14161B] via-[#0E1014] to-[#0A0B0E] rounded-3xl p-4 sm:p-7 space-y-4 sm:space-y-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[94vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cockpit Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5 shrink-0 font-mono">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider block">
                // SPEC // PANDUAN UKURAN JERSEY
              </span>
              <span className="text-white/20 select-none hidden sm:inline">·</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#FA6D0B] uppercase tracking-wider">
                POLLRIDE AERO FIT
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 tracking-wider uppercase mt-0.5">
              SHORT SLEEVE WITHOUT BACK POCKET · SATUAN: SENTIMETER (cm)
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            {/* View Switcher: Interactive vs Raw Graphic */}
            <div className="flex items-center rounded-xl bg-black/70 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('interactive')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-[#FA6D0B] text-black font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                INTERAKTIF
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('official_image')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'official_image'
                    ? 'bg-[#FA6D0B] text-black font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                GAMBAR RESMI
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-mono text-[11px] sm:text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
            >
              ✕ TUTUP
            </button>
          </div>
        </div>

        {/* Scrollable Main Cockpit Area */}
        <div className="overflow-y-auto space-y-4 pr-0.5 sm:pr-1 flex-1">
          {activeTab === 'interactive' ? (
            <>
              {/* Dynamic HUD Telemetry Bar (Active Inspector) */}
              <div className="rounded-2xl bg-black/60 p-3 sm:p-4 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FA6D0B]/20 flex flex-col items-center justify-center shrink-0">
                    <span className="font-display italic font-black text-xl sm:text-2xl text-[#FA6D0B] leading-none">
                      {currentItem.size}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                        {currentItem.label}
                      </span>
                      <span className="text-white/20 select-none">·</span>
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                          currentItem.tier === 'UP_SIZE' ? 'text-[#FA6D0B]' : 'text-slate-400'
                        }`}
                      >
                        {currentItem.note}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 font-mono text-[11px] text-slate-300">
                      <span>
                        DADA: <strong className="text-white font-bold">{currentItem.chestSizeCm} cm</strong>
                      </span>
                      <span>
                        TINGGI: <strong className="text-white font-bold">{currentItem.lengthCm} cm</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Tier Filter Strip (Lebih ringkas & fokus) */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto font-mono text-[10px]">
                  <span className="text-slate-400 uppercase mr-1 hidden sm:inline">FILTER:</span>
                  <button
                    type="button"
                    onClick={() => setTierFilter('ALL')}
                    className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-colors cursor-pointer ${
                      tierFilter === 'ALL'
                        ? 'bg-white/15 text-white font-bold'
                        : 'text-slate-400 hover:text-white bg-black/40'
                    }`}
                  >
                    SEMUA (9)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTierFilter('STANDARD')}
                    className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-colors cursor-pointer ${
                      tierFilter === 'STANDARD'
                        ? 'bg-white/15 text-white font-bold'
                        : 'text-slate-400 hover:text-white bg-black/40'
                    }`}
                  >
                    STANDARD (5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTierFilter('UP_SIZE')}
                    className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-colors cursor-pointer ${
                      tierFilter === 'UP_SIZE'
                        ? 'bg-[#FA6D0B]/25 text-[#FA6D0B] font-bold'
                        : 'text-slate-400 hover:text-white bg-black/40'
                    }`}
                  >
                    UP SIZE (4)
                  </button>
                </div>
              </div>

              {/* Main Matrix: Desktop Cockpit vs Mobile Dense Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
                {/* 1. Size Matrix Table (Desktop & Mobile Optimized) */}
                <div className="lg:col-span-7 space-y-2.5 font-mono">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                    <span className="font-bold text-white uppercase tracking-wider">
                      // MATRIKS UKURAN (KLIK UNTUK MEMILIH)
                    </span>
                    <span className="text-[10px]">TOLERANSI ±1–2 CM</span>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden sm:block overflow-hidden rounded-2xl bg-black/60 shadow-inner">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-400 bg-white/[0.03]">
                          <th className="py-2.5 px-3 font-bold">SIZE</th>
                          <th className="py-2.5 px-3 font-bold text-center">LINGKAR DADA</th>
                          <th className="py-2.5 px-3 font-bold text-center">TINGGI BAJU</th>
                          <th className="py-2.5 px-3 font-bold text-right">KATEGORI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredItems.map((row) => {
                          const isCurrentActive = focusedSize === row.size;
                          const isSelectedByRider = selectedSize === row.size;
                          const isUpSize = row.tier === 'UP_SIZE';
                          return (
                            <tr
                              key={row.size}
                              onClick={() => handleSizeClick(row.size)}
                              onMouseEnter={() => setFocusedSize(row.size)}
                              className={`transition-all cursor-pointer ${
                                isCurrentActive
                                  ? 'bg-[#FA6D0B]/20 text-white font-bold'
                                  : 'hover:bg-white/[0.04] text-slate-300'
                              }`}
                            >
                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-display italic font-black text-sm text-white">
                                    {row.size}
                                  </span>
                                  {isSelectedByRider && (
                                    <span className="text-[9px] text-[#FA6D0B] font-mono font-bold uppercase">
                                      // TERPILIH
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-center font-bold text-white">
                                {row.chestSizeCm} cm
                              </td>
                              <td className="py-2.5 px-3 text-center font-bold text-white">
                                {row.lengthCm} cm
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                {isUpSize ? (
                                  <span className="text-[10px] font-bold text-[#FA6D0B] uppercase">
                                    UP SIZE
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-400 uppercase">
                                    STANDARD
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Compact Grid View (Ringkas, hemat vertikal, responsif) */}
                  <div className="grid grid-cols-2 sm:hidden gap-2">
                    {filteredItems.map((row) => {
                      const isCurrentActive = focusedSize === row.size;
                      const isSelectedByRider = selectedSize === row.size;
                      const isUpSize = row.tier === 'UP_SIZE';
                      return (
                        <button
                          type="button"
                          key={row.size}
                          onClick={() => handleSizeClick(row.size)}
                          className={`p-2.5 rounded-xl text-left transition-all cursor-pointer shadow-sm flex flex-col justify-between ${
                            isCurrentActive
                              ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_15px_rgba(250,109,11,0.35)]'
                              : 'bg-black/70 text-slate-300 hover:bg-black/90'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-display italic font-black text-lg leading-none">
                              {row.size}
                            </span>
                            <span
                              className={`text-[9px] font-mono uppercase tracking-wider ${
                                isCurrentActive
                                  ? 'text-black/80 font-bold'
                                  : isUpSize
                                  ? 'text-[#FA6D0B] font-bold'
                                  : 'text-slate-400'
                              }`}
                            >
                              {isUpSize ? 'Up Size' : 'Std'}
                            </span>
                          </div>
                          <div className="mt-2 space-y-0.5 text-[11px] font-mono">
                            <div className="flex justify-between">
                              <span className={isCurrentActive ? 'text-black/80' : 'text-slate-400'}>
                                Dada:
                              </span>
                              <strong className={isCurrentActive ? 'text-black' : 'text-white'}>
                                {row.chestSizeCm} cm
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span className={isCurrentActive ? 'text-black/80' : 'text-slate-400'}>
                                Tinggi:
                              </span>
                              <strong className={isCurrentActive ? 'text-black' : 'text-white'}>
                                {row.lengthCm} cm
                              </strong>
                            </div>
                          </div>
                          {isSelectedByRider && (
                            <div className="mt-1 pt-1 border-t border-black/20 text-[9px] font-mono uppercase tracking-wider text-black font-black">
                              ✓ TERPILIH
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Visual Aero Diagram & Quick Measure Guide */}
                <div className="lg:col-span-5 space-y-3 font-mono">
                  <div className="rounded-2xl bg-black/60 p-3.5 sm:p-4 shadow-inner space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                        // SKEMA TELEMETRI AERO
                      </span>
                      <span className="text-[10px] text-[#FA6D0B] font-bold uppercase">
                        FIT: {currentItem.size}
                      </span>
                    </div>

                    {/* Vector Schematic Graphic */}
                    <div className="relative py-1 flex items-center justify-center">
                      <svg
                        viewBox="0 0 200 180"
                        className="w-36 h-36 sm:w-44 sm:h-44 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Jersey Silhouette */}
                        <path
                          d="M 60 35 L 80 43 C 90 47, 110 47, 120 43 L 140 35 L 165 67 L 145 83 L 135 73 L 135 158 L 65 158 L 65 73 L 55 83 L 35 67 Z"
                          fill="rgba(255, 255, 255, 0.04)"
                          stroke="rgba(255, 255, 255, 0.35)"
                          strokeWidth="2"
                        />
                        {/* Collar */}
                        <path
                          d="M 80 43 C 90 53, 110 53, 120 43"
                          stroke="#FA6D0B"
                          strokeWidth="2.2"
                        />
                        {/* Chest Size Line */}
                        <line
                          x1="55"
                          y1="88"
                          x2="145"
                          y2="88"
                          stroke="#FA6D0B"
                          strokeWidth="2.2"
                          strokeDasharray="4 3"
                        />
                        <polygon points="55,88 62,84 62,92" fill="#FA6D0B" />
                        <polygon points="145,88 138,84 138,92" fill="#FA6D0B" />

                        {/* Length Line */}
                        <line
                          x1="100"
                          y1="47"
                          x2="100"
                          y2="158"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeDasharray="4 3"
                        />
                        <polygon points="100,47 96,54 104,54" fill="#FFFFFF" />
                        <polygon points="100,158 96,151 104,151" fill="#FFFFFF" />
                      </svg>

                      {/* Live Measure Readouts Overlay */}
                      <div className="absolute bottom-1 right-1 text-[10px] font-mono text-right space-y-1">
                        <div className="text-[#FA6D0B] font-bold">
                          DADA: {currentItem.chestSizeCm} CM
                        </div>
                        <div className="text-white font-bold">
                          TINGGI: {currentItem.lengthCm} CM
                        </div>
                      </div>
                    </div>

                    {/* Accordion / Drawer Cara Pengukuran (Ringkas di Mobile) */}
                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <button
                        type="button"
                        onClick={() => setShowMeasureDetails(!showMeasureDetails)}
                        className="w-full flex items-center justify-between text-[11px] font-bold text-slate-300 hover:text-white uppercase transition-colors cursor-pointer"
                      >
                        <span>// PANDUAN CARA MENGUKUR</span>
                        <span className="text-[#FA6D0B]">
                          {showMeasureDetails ? '[-] SEMBUNYIKAN' : '[+] BACA DETAIL'}
                        </span>
                      </button>

                      {showMeasureDetails && (
                        <div className="space-y-2 font-sans text-xs text-slate-300 leading-relaxed pt-1 animate-fade-in-area">
                          <div>
                            <strong className="text-white font-mono uppercase block text-[10px]">
                              1. LINGKAR DADA (CHEST SIZE)
                            </strong>
                            <p className="text-slate-400 text-[11px]">
                              Ukur keliling bagian dada terlebar tepat di bawah ketiak dengan pita meteran.
                            </p>
                          </div>
                          <div>
                            <strong className="text-white font-mono uppercase block text-[10px]">
                              2. TINGGI BAJU (LENGTH)
                            </strong>
                            <p className="text-slate-400 text-[11px]">
                              Ukur vertikal dari titik bahu tertinggi di sebelah kerah lurus ke keliman bawah.
                            </p>
                          </div>
                          <div>
                            <strong className="text-[#FA6D0B] font-mono uppercase block text-[10px]">
                              3. PILIHAN UP SIZE (2XL – 5XL)
                            </strong>
                            <p className="text-slate-400 text-[11px]">
                              Dirancang khusus bagi pengendara dengan postur lebih berisi untuk performa tahan lama.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* TAB 2: GAMBAR RESMI PABRIKAN POLLRIDE (Cropped Clean) */
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center p-2 sm:p-4 shadow-inner">
                <img
                  src="/size-chart.jpeg"
                  alt="Panduan Resmi Ukuran Jersey Pollride Apparel Gravel Grindurance 2026"
                  className="w-full h-auto max-h-[55vh] object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-1.5 px-1">
                <span>MANUFAKTUR RESMI: POLLRIDE APPAREL</span>
                <span className="text-[#FA6D0B]">TOLERANSI UKURAN KONVEKSI: ±1–2 CM</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Quick-Action Bar (Sticky on Desktop and Mobile) */}
        {onSelectSize && (
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 font-mono">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 uppercase">UKURAN TERPILIH:</span>
              <span className="font-display italic font-black text-base text-[#FA6D0B]">
                {focusedSize}
              </span>
              <span className="text-slate-400 text-[11px]">
                ({currentItem.chestSizeCm} cm / {currentItem.lengthCm} cm · {currentItem.note})
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectSize(focusedSize);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#FA6D0B] hover:bg-[#DE5A00] text-black font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(250,109,11,0.4)] active:scale-95"
            >
              TERAPKAN UKURAN {focusedSize}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
