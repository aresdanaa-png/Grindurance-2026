import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function SafetySection() {
  return (
    <>
      {/* 5. RACE OPS & CRITICAL SAFETY REGULATIONS */}
      {/* ========================================================================= */}
      <section id="regulasi" className="py-16 sm:py-20 border-t border-white/10 bg-[#0D0E11] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 sm:pb-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                SAFETY PROTOCOLS // MITIGASI KESELAMATAN
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white italic">
                ATURAN KESELAMATAN &amp; PROLOG MANDIRI
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Standar operasional ketat untuk menjamin integritas olahraga ketahanan dan keselamatan fisik seluruh peserta di koridor medan ekstrem musim hujan.
              </p>
            </div>

            <Link
              href="/peraturan"
              className="px-6 py-2.5 rounded-full border border-white/15 hover:border-[#FA6D0B] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all flex items-center gap-2 shrink-0"
            >
              <span>BACA REGULASI ATHLETE GUIDE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FA6D0B]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Rule Card 1 */}
            <div className="p-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-white/20 transition-all shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                    01 // SUBUH SHIFT
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/30">
                    WAJIB 150 &amp; 200 KM
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                  PROLOG 30 KM SUBUH
                </h3>
                <div className="text-[11px] font-mono text-slate-400">
                  03:00 — 05:00 WIB · MEJA SCRUTINEERING
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Peserta kategori 150 km dan 200 km wajib menuntaskan minimal 30 km mandiri sebelum pukul 05:00 WIB. File rekam jejak GPS (Garmin, Wahoo, Strava) diverifikasi panitia di Meja Scrutineering fajar sebelum masuk starting grid.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                STATUS: <strong className="text-white">VERIFIKASI LOG GPX/FIT</strong>
              </div>
            </div>

            {/* Rule Card 2 */}
            <div className="p-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-white/20 transition-all shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                    02 // KEMANDIRIAN
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-white border border-white/15">
                    UN-SUPPORTED
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                  PRINSIP MANDIRI PENUH
                </h3>
                <div className="text-[11px] font-mono text-slate-400">
                  DILARANG SUPPORT CAR PRIBADI
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Dilarang membawa mobil pengawal atau bantuan feeding eksternal pribadi. Peserta mengandalkan perbekalan mandiri pada sepeda dan warung lokal di sepanjang rute untuk suplai makanan dan cairan.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                LOGISTIK: <strong className="text-white">WARUNG LOKAL &amp; HYDRATION PACK</strong>
              </div>
            </div>

            {/* Rule Card 3 */}
            <div className="p-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-white/20 transition-all shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                    03 // TIM MEDIS 24 JAM
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#FA6D0B] text-black">
                    EMERGENCY SPGDT
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                  SPGDT RS HERMINA CIBUBUR
                </h3>
                <div className="text-[11px] font-mono text-[#FA6D0B] font-bold">
                  HOTLINE DARURAT: (021) 828-1234
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Dukungan ambulans gawat darurat dan tim medis siaga di pos-pos rute. Nomor darurat SPGDT RS Hermina Cibubur (021) 828-1234 dan WhatsApp 0815 1965 6133 wajib disimpan di telepon genggam setiap atlet.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                RUJUKAN: <strong className="text-white">RS HERMINA CIBUBUR // TRIAGE SIAGA</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
    </>
  );
}
