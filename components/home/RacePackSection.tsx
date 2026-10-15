import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function RacePackSection() {
  return (
    <>
      {/* 2.5 PAKET PESERTA & MERCHANDISE (RAD RACE INSPIRED - EDITORIAL & ELEGAN) */}
      <section id="racepack" className="pt-12 sm:pt-16 pb-8 sm:pb-10 text-white relative">
        
        {/* Dynamic Action Tandem Cyclists Background (pesepeda2.webp) - 3RD BOTTOM IMAGE */}
        <div 
          className="absolute top-8 sm:top-12 bottom-0 inset-x-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 35%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 35%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/pesepeda2.webp"
            alt="Grindurance Gravel Cyclists Tandem In Motion"
            className="w-full h-full object-cover object-[center_10%] lg:object-[75%_8%] opacity-90 filter contrast-120 saturate-125 brightness-100"
          />
          {/* Seamless dark gradient overlays - smooth top fade-in from dark pause and bottom dissolve */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#090A0D] via-[#090A0D]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/80 via-[#090A0D]/45 to-[#090A0D]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0C0E] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
          
          {/* Section Header: Alternating Right-Aligned Layout (Kiri-Kanan Rhythm) with Custom Text Graphic */}
          <div className="flex flex-col md:flex-row-reverse md:items-end justify-between gap-6 border-b border-white/10 pb-8">
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
              {/* UI DNA: Pill Capsule from user design */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm">
                <span className="text-xs font-bold text-white uppercase tracking-wider">2 OPSI PAKET</span>
                <span className="text-[#FA6D0B] font-bold text-xs">//</span>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">TARIF TRANSPARAN</span>
              </div>
              <div className="border-l-2 md:border-l-0 md:border-r-2 border-[#FA6D0B] pl-4 md:pl-0 md:pr-4 py-0.5 md:text-right w-full">
                <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                  Sistem pendaftaran dua opsi: pilih paket <strong className="text-white">Medal Saja</strong> untuk esensi tantangan mandiri, atau upgrade ke paket <strong className="text-white">Medal &amp; Jersey</strong> resmi GX-ID buatan Pollride (+Rp 50.000). Seluruh paket mencakup perlengkapan hari-H.
                </p>
                {/* Micro-telemetry Status: Batas Produksi */}
                <div className="mt-2.5 flex items-center md:justify-end gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse shrink-0" />
                  <span>JAMINAN HARI-H DITUTUP: <strong className="text-white font-bold">10 SEPTEMBER 2026</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL PACKAGE COMPARISON (Exact 1:1 Match with User UI DNA) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tier 1: Medal Only */}
            <div className="p-7 sm:p-8 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-white/20 transition-all duration-300 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full border border-white/20 text-white text-[11px] font-sans font-bold uppercase tracking-wider">
                      OPSI 01
                    </span>
                    <span className="text-[#FA6D0B] font-bold text-xs tracking-wider">//</span>
                    <span className="text-white text-xs font-sans font-bold uppercase tracking-wider">
                      ESENSIAL
                    </span>
                  </div>
                  <span className="text-xs font-sans text-slate-400 font-semibold uppercase tracking-wider">
                    TARIF DASAR KATEGORI
                  </span>
                </div>
                
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    PAKET MEDAL ONLY
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    Pilihan tepat bagi pesepeda yang fokus pada esensi jarak, tantangan mandiri, dan koleksi medali resmi finisher.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3.5 text-xs sm:text-[13px] text-slate-300 font-sans">
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Nomor Plat Sepeda Tahan Air #1000+ &amp; QR Check-in</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Asuransi Kecelakaan Resmi 1 Hari Event</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Nutrisi NDR Energy Gel + Isotonic Drink</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Akses Finisher Lounge &amp; Voucher Pemulihan ABEEY Coffee</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans">
                <span className="text-slate-400 font-medium uppercase tracking-wider">MULAI DARI RP 200.000</span>
                <span className="text-white font-bold uppercase tracking-wider">TERMASUK FASILITAS HARI-H</span>
              </div>
            </div>

            {/* Tier 2: Medal & Jersey */}
            <div className="p-7 sm:p-8 rounded-2xl border-2 border-[#FA6D0B] bg-black/20 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-[0_0_45px_rgba(250,109,11,0.18)] transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-[#FA6D0B] text-black text-[11px] font-sans font-black uppercase tracking-wider">
                      OPSI 02
                    </span>
                    <span className="text-[#FA6D0B] font-bold text-xs tracking-wider">//</span>
                    <span className="text-white text-xs font-sans font-bold uppercase tracking-wider">
                      REKOMENDASI LENGKAP
                    </span>
                  </div>
                  <span className="text-xs font-sans font-bold text-[#FA6D0B] uppercase tracking-wider">
                    HANYA +RP 50.000 / PAX
                  </span>
                </div>
                
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    PAKET MEDAL &amp; JERSEY RESMI
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Paket lengkap terfavorit. Mendapatkan seluruh fasilitas Paket Medal Only ditambah Official Anniversary Aero Jersey buatan Pollride.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3.5 text-xs sm:text-[13px] text-slate-300 font-sans">
                  <div className="flex items-start gap-3 font-bold text-white">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Official Anniversary Aero Jersey by Pollride (Senilai Rp 350.000)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Nomor Plat Sepeda Tahan Air #1000+ &amp; QR Check-in</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Asuransi Kecelakaan Resmi 1 Hari Event</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA6D0B] font-mono font-bold text-xs shrink-0 select-none mt-0.5">//</span>
                    <span>Nutrisi NDR Energy Gel + Isotonic + Voucher ABEEY Coffee</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans">
                <span className="text-slate-400 font-medium uppercase tracking-wider">SUBSIDI KOMUNITAS GX-ID</span>
                <span className="text-[#FA6D0B] font-bold uppercase tracking-wider">BEST SELLER EDITION</span>
              </div>
            </div>

          </div>

          {/* LOGISTIK RACE PACK (RPC) — 2-COLUMN ATHLETIC TELEMETRY STRIP */}
          <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 p-6 sm:p-7 gap-6 md:gap-0">
              
              {/* Column 1: Ambil Mandiri saat RPC Day */}
              <div className="flex flex-col justify-between md:pr-8 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                      PENGAMBILAN MANDIRI // RPC DAY
                    </span>
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white/10 text-white border border-white/15">
                      GRATIS / RP 0
                    </span>
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-none">
                    MINGGU, 6 DESEMBER 2026
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Diambil langsung di <strong className="text-white">ABEEY Coffee &amp; Eatery Cibubur</strong> (10:00–17:00 WIB). Sudah termasuk menghadiri sesi Coaching Clinic &amp; Technical Meeting resmi.
                </p>
              </div>

              {/* Column 2: Opsi Handling Fee */}
              <div className="flex flex-col justify-between md:pl-8 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                      OPSI HANDLING FEE // LOGISTIK KHUSUS
                    </span>
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-[#FA6D0B] text-black">
                      OPSI TAMBAHAN
                    </span>
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-[#FA6D0B] tracking-tight leading-none">
                    +RP 20.000 <span className="text-xs font-sans text-slate-400 font-bold uppercase tracking-wider">/ PAX</span>
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Bagi peserta yang <strong className="text-white">berhalangan hadir saat RPC Day</strong>. Disiapkan via handling khusus panitia / pengambilan saat Hari-H dengan konfirmasi terlebih dahulu.
                </p>
              </div>

            </div>
          </div>

          {/* EDITORIAL PRODUCT SHOWCASE (Lookbook Grid — Harmonized with UI DNA) */}
          <div className="space-y-6 pt-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#FA6D0B]">
                  RINCIAN ITEM RESMI
                </span>
                <span className="text-[#FA6D0B] font-bold text-xs">//</span>
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-white">
                  LOOKBOOK
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                3 CORE ITEMS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* ITEM 1: JERSEY */}
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between space-y-5 hover:border-[#FA6D0B]/40 transition-all duration-300 group shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-[#FA6D0B]/40 transition-all duration-300 flex flex-col justify-between p-6 select-none">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-sans font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FA6D0B] text-black">
                        POLLRIDE AERO FIT
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        EDISI 2026
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
                      <span className="text-white font-bold">STAGE // PRODUKSI</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider">
                      <span className="text-slate-400">01</span>
                      <span className="text-[#FA6D0B] font-bold text-xs">//</span>
                      <span className="text-[#FA6D0B]">APPAREL RESMI</span>
                    </div>
                    <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                      OFFICIAL ANNIVERSARY JERSEY
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Material mesh bernapas berteknologi quick-dry dengan grafis kontur topografi Jonggol–Sukamakmur. Dirancang khusus untuk cuaca basah dan lembap.
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px] font-sans">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Quick-Dry Mesh</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>3 Saku Belakang</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Zipper YKK Lock</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Garis Reflektif</span>
                  </div>
                </div>
              </div>

              {/* ITEM 2: MEDAL */}
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between space-y-5 hover:border-[#FA6D0B]/40 transition-all duration-300 group shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-[#FA6D0B]/40 transition-all duration-300 flex flex-col justify-between p-6 select-none">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-sm">
                        SEMUA KATEGORI
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        EDISI 2026
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
                      <span className="text-white font-bold">STAGE // CETAK</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider">
                      <span className="text-slate-400">02</span>
                      <span className="text-[#FA6D0B] font-bold text-xs">//</span>
                      <span className="text-[#FA6D0B]">MEDALI SAH</span>
                    </div>
                    <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                      HEAVY FINISHER METAL MEDAL
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Medali berbobot tebal dari paduan zinc alloy antique bronze dengan ukiran timbul 3D topografi puncak pegunungan dan lanyard tenun edisi peringatan.
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px] font-sans">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Paduan Solid Zinc</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Relief Timbul 3D</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Lanyard Woven Tebal</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Finisher Luring &amp; Virtual</span>
                  </div>
                </div>
              </div>

              {/* ITEM 3: RACE PACK KIT */}
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between space-y-5 hover:border-[#FA6D0B]/40 transition-all duration-300 group shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-[#FA6D0B]/40 transition-all duration-300 flex flex-col justify-between p-6 select-none">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-sm">
                        HARI-H READY
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        EDISI 2026
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
                        KURASI PERLENGKAPAN
                      </div>
                    </div>

                    {/* Bottom Telemetry Strip */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <span>LOGISTIK ATLET</span>
                      <span className="text-white font-bold">STAGE // FINALISASI</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider">
                      <span className="text-slate-400">03</span>
                      <span className="text-[#FA6D0B] font-bold text-xs">//</span>
                      <span className="text-[#FA6D0B]">ESENSIAL ATLET</span>
                    </div>
                    <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                      PERLENGKAPAN &amp; LAYANAN HARI-H
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Plat nomor sepeda tahan air, nutrisi gel energi NDR, minuman elektrolit, asuransi kecelakaan resmi, serta voucher hidangan pemulihan di ABEEY.
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px] font-sans">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Plat BIB Waterproof</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>NDR Energy Gel</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Asuransi Resmi</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shrink-0" />
                    <span>Voucher ABEEY Lounge</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Minimalist Bottom CTA Strip */}
          <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-[#FA6D0B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                <span>KUOTA TERBATAS</span>
                <span className="font-bold text-xs">//</span>
                <span>AMANKAN BIB ANDA</span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                PILIH KATEGORI &amp; DAPATKAN PAKET ANDA
              </h4>
              <p className="text-xs text-slate-400">
                Pendaftaran ditutup saat kuota per kategori terpenuhi atau batas akhir pendaftaran tercapai.
              </p>
            </div>
            <Link
              href="/daftar"
              className="px-8 py-3.5 rounded-full text-xs font-sans font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_25px_rgba(250,109,11,0.35)]"
            >
              <span>PILIH PAKET &amp; DAFTAR</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
    </>
  );
}
