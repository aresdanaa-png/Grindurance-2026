'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0B0C0E] relative overflow-hidden">
      
      {/* 1. Cinematic Drone Action Video Background with Seamless Fade Dissolve */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 10%, black 30%, black 75%, rgba(0,0,0,0.4) 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 10%, black 30%, black 75%, rgba(0,0,0,0.4) 90%, transparent 100%)'
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/perjalanan-siklis-di-jalur-oranye.webp"
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.15] saturate-[1.2]"
        >
          <source src="/cta-background.mp4" type="video/mp4" />
        </video>
        {/* Soft edge dissolve gradients */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0B0C0E] via-[#0B0C0E]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/80 via-[#0B0C0E]/35 to-[#0B0C0E]/80" />
      </div>

      {/* 2. Luminous Orange Aurora Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.22)_0%,rgba(250,109,11,0.06)_50%,transparent_75%)] blur-3xl pointer-events-none" />

      {/* 3. Subtle Horizontal Telemetry Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100%_48px]"
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6 sm:space-y-7 text-center">
        
        {/* Telemetry Status Line (Monospace Industrial) */}
        <div className="space-y-2">
          <span className="text-[11px] sm:text-xs font-mono font-black text-[#FA6D0B] uppercase tracking-[0.3em] block">
            {t('FINAL CALL // KUOTA TERBATAS RESMI GX-ID', 'FINAL CALL // OFFICIAL LIMITED GX-ID SLOTS')}
          </span>

          {/* Event Graphic Title with Radial Backlight */}
          <div className="relative max-w-md sm:max-w-xl mx-auto py-1 group">
            <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.3)_0%,transparent_70%)] blur-2xl opacity-75 pointer-events-none" />
            <img
              src="/nama_event.webp"
              alt="Gravel Grindurance 2026"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Display Headline */}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white italic drop-shadow-lg leading-tight">
          {t('BERANI TAKLUKKAN MEDAN JONGGOL?', 'DARE TO CONQUER JONGGOL CORRIDORS?')}
        </h2>

        {/* Narrative Description */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          {t(
            'Pilih paket Medal Saja atau Medal & Jersey resmi GX-ID Anniversary Edition. Tantangan ketahanan musim hujan mandiri edisi perayaan 8 tahun komunitas GX-ID. Pendaftaran ditutup saat kuota terpenuhi.',
            'Choose between Medal Only or Official Medal & Jersey GX-ID Anniversary Edition. An unsupported rainy-season endurance test marking 8 years of GX-ID community pride. Registration closes upon quota fulfillment.'
          )}
        </p>

        {/* Unified Aerodynamic Cockpit Telemetry Strip (Single Monolith Panel with Low Opacity) */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative group">
          {/* Subtle Top Kinetic Orange Edge */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FA6D0B] to-transparent opacity-80" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-3 sm:py-3.5 px-3 sm:px-4 text-center space-y-1">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                {t('KATEGORI RUTE', 'ROUTE CATEGORIES')}
              </span>
              <span className="font-display font-black text-xs sm:text-[13px] text-white uppercase italic tracking-wide block">
                5 PILIHAN <span className="text-[#FA6D0B]">·</span> 60K–200K
              </span>
            </div>

            <div className="py-3 sm:py-3.5 px-3 sm:px-4 text-center space-y-1">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                {t('FORMAT RACE', 'RACE FORMAT')}
              </span>
              <span className="font-display font-black text-xs sm:text-[13px] text-white uppercase italic tracking-wide block">
                100% UN-SUPPORTED
              </span>
            </div>

            <div className="py-3 sm:py-3.5 px-3 sm:px-4 text-center space-y-1">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                {t('LOKASI HOST', 'HOST VENUE')}
              </span>
              <span className="font-display font-black text-xs sm:text-[13px] text-white uppercase italic tracking-wide block">
                ABEEY LRT HARJAMUKTI
              </span>
            </div>

            <div className="py-3 sm:py-3.5 px-3 sm:px-4 text-center space-y-1">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                {t('PILIHAN PAKET', 'PACKAGE OPTIONS')}
              </span>
              <span className="font-display font-black text-xs sm:text-[13px] text-white uppercase italic tracking-wide block">
                MEDAL <span className="text-[#FA6D0B]">·</span> JERSEY
              </span>
            </div>
          </div>
        </div>

        {/* Dual Athletic Action Buttons (Standard per RULES.md) */}
        <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/daftar"
            className="group relative w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-300 hover:shadow-[0_0_35px_rgba(250,109,11,0.65)] flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden"
          >
            <span className="absolute inset-0 w-1/3 bg-white/20 blur-sm -skew-x-12 animate-sheen-sweep pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
            <span className="relative z-10">{t('DAFTAR SEKARANG — PILIH KATEGORI', 'REGISTER NOW — SELECT CATEGORY')}</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
          </Link>

          <Link
            href="/peraturan"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-white border border-[#FA6D0B]/60 hover:border-[#FA6D0B] bg-white/[0.03] hover:bg-[#FA6D0B]/10 transition-all duration-300 flex items-center justify-center"
          >
            <span>{t('REGULASI & ATHLETE GUIDE', 'RULES & ATHLETE GUIDE')}</span>
          </Link>
        </div>

        {/* Telemetry Footer Subtext */}
        <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest pt-1">
          {t(
            'PENDAFTARAN RESMI DITUTUP SAAT KUOTA TERPENUHI · TERBUKA UNTUK SELURUH MERK SEPEDA',
            'OFFICIAL REGISTRATION CLOSES UPON QUOTA FULL · OPEN TO ALL BIKE BRANDS'
          )}
        </p>

      </div>
    </section>
  );
}
