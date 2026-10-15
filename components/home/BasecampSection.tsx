import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function BasecampSection() {
  return (
    <>
      {/* 4. BASECAMP & KOMUNITAS (GX-ID INDONESIA) */}
      {/* ========================================================================= */}
      <section id="basecamp" className="py-16 sm:py-20 border-t border-white/10 bg-[#0B0C0E] relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 sm:pb-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                BASECAMP &amp; COMMUNITY // VENUE RESMI
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white italic">
                DIBANGUN OLEH KOMUNITAS, UNTUK KEBERSAMAAN
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Gravel Grindurance bukan sekadar angka kilometer di atas kertas. Ini adalah perayaan persahabatan 80.000 pesepeda dari 19 Chapter se-Indonesia di koridor petualangan Cibubur–Jonggol.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#FA6D0B] animate-pulse" />
              <span>EST. 2018 · 19 REGIONAL CHAPTERS</span>
            </div>
          </div>

          {/* 2-Column Basecamp & Transit Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Card 1: ABEEY Coffee & Eatery */}
            <div className="p-7 sm:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#FA6D0B]/20 text-[#FA6D0B] border border-[#FA6D0B]/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                      01 // VENUE UTAMA
                    </span>
                    <span className="text-[#FA6D0B] font-bold text-xs">//</span>
                    <span className="text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                      STAGING ARENA
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    CIBUBUR
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight">
                    ABEEY COFFEE &amp; EATERY
                  </h3>
                  <div className="text-xs font-mono text-[#FA6D0B] mt-1 uppercase tracking-wider">
                    Titik Start, Finish Gate &amp; Athlete Recovery Lounge
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    Titik pelepasan gelombang start fajar dan panggung penyambutan seluruh finisher sah. Dilengkapi fasilitas atlet: area parkir sepeda aman berkapasitas besar, musholla, shower atlet, serta area selebrasi komunitas.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>Parkir Sepeda Aman 100+ Unit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>Musholla &amp; Athlete Shower</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>Artisan Fermented Kombucha</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>Warm Recovery Meals &amp; Coffee</span>
                </div>
              </div>
            </div>

            {/* Card 2: Akses LRT Harjamukti */}
            <div className="p-7 sm:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider">
                      02 // ECO-MOBILITY
                    </span>
                    <span className="text-[#FA6D0B] font-bold text-xs">//</span>
                    <span className="text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                      GREEN CYCLING
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    TRANSIT INTEGRASI
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight">
                    STASIUN LRT HARJAMUKTI
                  </h3>
                  <div className="text-xs font-mono text-[#FA6D0B] mt-1 uppercase tracking-wider">
                    Akses Terintegrasi 0 Meter dari Venue
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    Akses transportasi publik ramah sepeda tanpa kemacetan jalan raya. Pesepeda dari seluruh Jabodebek dapat membawa sepeda (sepeda lipat, gravel, maupun road bike) langsung ke dalam gerbong kereta LRT Jabodebek.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>Terkoneksi Jakarta &amp; Depok</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>Sepeda Masuk Gerbong Kereta</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>Jalan Kaki Langsung ke Venue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>Bebas Macet &amp; Bebas Polusi</span>
                </div>
              </div>
            </div>

          </div>

          {/* Community Roster Strip */}
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FA6D0B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                <span>KOMUNITAS GRAVEL &amp; ULTRA INDONESIA</span>
                <span>//</span>
                <span>GX-ID 2026</span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                CEK RIDER ROSTER &amp; TEMAN SKUAD ANDA
              </h4>
              <p className="text-xs text-slate-400">
                Lihat daftar nama atlet terdaftar dari 19 chapter nasional dan verifikasi nomor BIB Anda.
              </p>
            </div>
            <Link
              href="/peserta"
              className="px-7 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_25px_rgba(250,109,11,0.35)]"
            >
              <span>LIHAT RIDER ROSTER</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
    </>
  );
}
