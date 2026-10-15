'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function SafetySection() {
  const { t } = useLanguage();

  return (
    <>
      {/* 5. RACE OPS & CRITICAL SAFETY REGULATIONS */}
      {/* ========================================================================= */}
      <section id="regulasi" className="py-8 sm:py-10 border-t border-white/10 bg-[#0D0E11] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
                {t('SAFETY PROTOCOLS // MITIGASI KESELAMATAN', 'SAFETY PROTOCOLS // RISK MITIGATION')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white italic">
                {t('ATURAN KESELAMATAN & PROLOG MANDIRI', 'SAFETY REGULATIONS & SELF-START PROLOGUE')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {t(
                  'Standar operasional ketat untuk menjamin integritas olahraga ketahanan dan keselamatan fisik seluruh peserta di koridor medan ekstrem musim hujan.',
                  'Strict operational standards ensuring ultra-endurance sporting integrity and the physical safety of all riders in extreme rain season conditions.'
                )}
              </p>
            </div>

            <Link
              href="/peraturan"
              className="px-6 py-2.5 rounded-full border border-white/15 hover:border-[#FA6D0B] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all flex items-center gap-2 shrink-0"
            >
              <span>{t('BACA REGULASI ATHLETE GUIDE', 'READ ATHLETE GUIDE RULES')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FA6D0B]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Rule Card 1 */}
            <div className="p-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-white/20 transition-all shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                    {t('01 // SUBUH SHIFT', '01 // DAWN SHIFT')}
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/30">
                    {t('WAJIB 150 & 200 KM', 'MANDATORY FOR 150 & 200 KM')}
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                  {t('PROLOG 30 KM SUBUH', 'DAWN 30 KM PROLOGUE')}
                </h3>
                <div className="text-[11px] font-mono text-slate-400">
                  {t('03:00 — 05:00 WIB · MEJA SCRUTINEERING', '03:00 — 05:00 WIB · SCRUTINEERING DESK')}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {t(
                    'Peserta kategori 150 km dan 200 km wajib menuntaskan minimal 30 km mandiri sebelum pukul 05:00 WIB. File rekam jejak GPS (Garmin, Wahoo, Strava) diverifikasi panitia di Meja Scrutineering fajar sebelum masuk starting grid.',
                    'Participants in the 150 km and 200 km categories must complete at least 30 km independently before 05:00 WIB. GPS activity log files (Garmin, Wahoo, Strava) are verified by marshals at the dawn Scrutineering Desk before entering starting grid.'
                  )}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {t('STATUS: ', 'STATUS: ')}<strong className="text-white">{t('VERIFIKASI LOG GPX/FIT', 'GPX/FIT LOG VERIFICATION')}</strong>
              </div>
            </div>

            {/* Rule Card 2 */}
            <div className="p-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-white/20 transition-all shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                    {t('02 // KEMANDIRIAN', '02 // SELF-RELIANCE')}
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-white border border-white/15">
                    UN-SUPPORTED
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                  {t('PRINSIP MANDIRI PENUH', 'FULL SELF-SUPPORT PRINCIPLE')}
                </h3>
                <div className="text-[11px] font-mono text-slate-400">
                  {t('DILARANG SUPPORT CAR PRIBADI', 'NO PRIVATE SUPPORT CARS')}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {t(
                    'Dilarang membawa mobil pengawal atau bantuan feeding eksternal pribadi. Peserta mengandalkan perbekalan mandiri pada sepeda dan warung lokal di sepanjang rute untuk suplai makanan dan cairan.',
                    'Private escort cars and dedicated external feeding crews are strictly prohibited. Riders must rely on on-bike provisions and roadside local stalls for nourishment and hydration.'
                  )}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {t('LOGISTIK: ', 'LOGISTICS: ')}<strong className="text-white">{t('WARUNG LOKAL & HYDRATION PACK', 'LOCAL WARUNGS & HYDRATION PACK')}</strong>
              </div>
            </div>

            {/* Rule Card 3 */}
            <div className="p-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-white/20 transition-all shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                    {t('03 // TIM MEDIS 24 JAM', '03 // 24-HR MEDICAL SQUAD')}
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#FA6D0B] text-black">
                    EMERGENCY SPGDT
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                  SPGDT RS HERMINA CIBUBUR
                </h3>
                <div className="text-[11px] font-mono text-[#FA6D0B] font-bold">
                  {t('HOTLINE DARURAT: (021) 828-1234', 'EMERGENCY HOTLINE: (021) 828-1234')}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {t(
                    'Dukungan ambulans gawat darurat dan tim medis siaga di pos-pos rute. Nomor darurat SPGDT RS Hermina Cibubur (021) 828-1234 dan WhatsApp 0815 1965 6133 wajib disimpan di telepon genggam setiap atlet.',
                    'Emergency mobile ambulances and paramedic units staged along the route. The 24/7 RS Hermina Cibubur SPGDT hotline (021) 828-1234 and WhatsApp 0815 1965 6133 must be saved on every athlete phone.'
                  )}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {t('RUJUKAN: ', 'REFERRAL: ')}<strong className="text-white">{t('RS HERMINA CIBUBUR // TRIAGE SIAGA', 'RS HERMINA CIBUBUR // TRIAGE ON STANDBY')}</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
    </>
  );
}
