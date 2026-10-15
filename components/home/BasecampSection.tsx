'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function BasecampSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* 4. BASECAMP & KOMUNITAS (GX-ID INDONESIA) */}
      {/* ========================================================================= */}
      <section id="basecamp" className="py-8 sm:py-10 border-t border-white/10 bg-[#0B0C0E] relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                {t('BASECAMP & COMMUNITY // VENUE RESMI', 'BASECAMP & COMMUNITY // OFFICIAL VENUE')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white italic">
                {t('DIBANGUN OLEH KOMUNITAS, UNTUK KEBERSAMAAN', 'BUILT BY RIDERS, FORMED IN COMMUNITY')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {t(
                  'Gravel Grindurance bukan sekadar angka kilometer di atas kertas. Ini adalah perayaan persahabatan 80.000 pesepeda dari 19 Chapter se-Indonesia di koridor petualangan Cibubur–Jonggol.',
                  'Gravel Grindurance is more than just mileage on paper. It is an endurance celebration of camaraderie uniting 80,000+ riders across 19 Regional Chapters in the Cibubur–Jonggol adventure corridor.'
                )}
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
                      {t('01 // VENUE UTAMA', '01 // MAIN VENUE')}
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
                    {t('Titik Start, Finish Gate & Athlete Recovery Lounge', 'Start Point, Finish Gate & Athlete Recovery Lounge')}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {t(
                      'Titik pelepasan gelombang start fajar dan panggung penyambutan seluruh finisher sah. Dilengkapi fasilitas atlet: area parkir sepeda aman berkapasitas besar, musholla, shower atlet, serta area selebrasi komunitas.',
                      'Dawn wave dispatch point and welcoming stage for all official finishers. Equipped with athlete facilities: secure bike parking for 100+ units, prayer room, rider showers, and community celebration areas.'
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('Parkir Sepeda Aman 100+ Unit', 'Secure Bike Parking 100+ Units')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('Musholla & Athlete Shower', 'Prayer Room & Athlete Showers')}</span>
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
                    {t('TRANSIT INTEGRASI', 'TRANSIT INTEGRATION')}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight">
                    STASIUN LRT HARJAMUKTI
                  </h3>
                  <div className="text-xs font-mono text-[#FA6D0B] mt-1 uppercase tracking-wider">
                    {t('Akses Terintegrasi 0 Meter dari Venue', 'Integrated Access 0 Meters from Venue')}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {t(
                      'Akses transportasi publik ramah sepeda tanpa kemacetan jalan raya. Pesepeda dari seluruh Jabodebek dapat membawa sepeda (sepeda lipat, gravel, maupun road bike) langsung ke dalam gerbong kereta LRT Jabodebek.',
                      'Eco-friendly public transit avoiding highway congestion. Cyclists from across greater Jakarta can carry bicycles (folding bikes, gravel, and road bikes) onboard Jabodebek LRT train cars.'
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('Terkoneksi Jakarta & Depok', 'Connected to Jakarta & Depok')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('Sepeda Masuk Gerbong Kereta', 'Bikes Allowed In Train Cars')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('Jalan Kaki Langsung ke Venue', 'Walk Directly to Venue')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FA6D0B] font-bold select-none">//</span>
                  <span>{t('Bebas Macet & Bebas Polusi', 'Zero Traffic & Zero Pollution')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Community Roster Strip */}
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FA6D0B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                <span>{t('KOMUNITAS GRAVEL & ULTRA INDONESIA', 'INDONESIAN GRAVEL & ULTRA COMMUNITY')}</span>
                <span>//</span>
                <span>GX-ID 2026</span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                {t('CEK RIDER ROSTER & TEMAN SKUAD ANDA', 'CHECK RIDER ROSTER & SQUAD MATES')}
              </h4>
              <p className="text-xs text-slate-400">
                {t(
                  'Lihat daftar nama atlet terdaftar dari 19 chapter nasional dan verifikasi nomor BIB Anda.',
                  'View registered athletes across 19 national chapters and verify your digital BIB assignment.'
                )}
              </p>
            </div>
            <Link
              href="/peserta"
              className="px-7 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_25px_rgba(250,109,11,0.35)]"
            >
              <span>{t('LIHAT RIDER ROSTER', 'VIEW RIDER ROSTER')}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
    </>
  );
}
