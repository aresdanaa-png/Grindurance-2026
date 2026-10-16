'use client';

import { useLanguage } from '@/lib/context/LanguageContext';
import {
  PRESENTING_TOP_TIER,
  PRESENTING_BOTTOM_TIER,
  SUPPORTING_PARTNERS,
  SponsorItem,
} from '@/lib/data/sponsors';

function MainSponsorLogo({ item }: { item: SponsorItem }) {
  return (
    <div
      className="h-16 sm:h-20 lg:h-24 w-36 sm:w-44 lg:w-52 flex items-center justify-center p-2 transition-all duration-300 hover:scale-105 opacity-95 hover:opacity-100 group"
      title={item.name}
    >
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.name}
          className="max-h-full max-w-full w-auto h-auto object-contain filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
        />
      ) : (
        <span className="font-display text-sm sm:text-base lg:text-lg font-black italic tracking-widest text-white/90 group-hover:text-white">
          {item.customText}
        </span>
      )}
    </div>
  );
}

function SupportingSponsorLogo({ item }: { item: SponsorItem }) {
  return (
    <div
      className="h-8 sm:h-9 lg:h-10 w-24 sm:w-28 lg:w-32 flex items-center justify-center p-1.5 transition-all duration-300 hover:scale-105 opacity-80 hover:opacity-100 group"
      title={item.name}
    >
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.name}
          className="max-h-full max-w-full w-auto h-auto object-contain filter drop-shadow-md"
        />
      ) : (
        <span className="font-display text-xs sm:text-sm font-black italic tracking-widest text-white/90 group-hover:text-white">
          {item.customText}
        </span>
      )}
    </div>
  );
}

export default function SponsorsSection() {
  const { t } = useLanguage();

  return (
    <section id="sponsors" className="py-12 sm:py-16 border-t border-white/10 bg-[#0D0E11] relative overflow-hidden">
      {/* Cinematic Action Photography Background (bg-sponsors.webp - Barisan Pesepeda di Atas Feri) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, black 25%, black 75%, rgba(0,0,0,0.2) 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, black 25%, black 75%, rgba(0,0,0,0.2) 90%, transparent 100%)'
        }}
      >
        <img
          src="/backgrounds/bg-sponsors.webp"
          alt="Grindurance Expedition Ferry Crossing"
          className="w-full h-full object-cover object-[center_35%] opacity-40 filter contrast-[1.12] saturate-[1.1] brightness-[0.7] blur-[0.4px]"
        />
        {/* Deep dark gradient overlays to guarantee 100% sponsor logo visibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0D0E11] via-[#0D0E11]/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/90 to-transparent" />
        <div className="absolute inset-0 bg-[#0D0E11]/60" />
      </div>

      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Minimalist Section Header */}
        <div className="text-center space-y-2 sm:space-y-3 flex flex-col items-center justify-center">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.35em] text-[#FA6D0B] uppercase block">
            OFFICIAL PARTNERS
          </span>
          <h2 className="sr-only">GRAVEL GRINDURANCE — OFFICIAL PARTNERS</h2>
          <img
            src="/nama_event.webp"
            alt="Gravel Grindurance"
            className="h-14 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto max-w-[340px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[720px] object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] drop-shadow-[0_0_35px_rgba(250,109,11,0.25)]"
          />
        </div>

        {/* ========================================================================= */}
        {/* 5 LOGO UTAMA (PRESENTED BY): Abeey, J&T, BYD, RS Hermina Depok, DHS */}
        {/* Row 1: Abeey | J&T | BYD   |   Row 2: Hermina Depok | DHS           */}
        {/* ========================================================================= */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-slate-400">
            <span className="h-px w-12 sm:w-20 bg-white/15" />
            <span>PRESENTED BY</span>
            <span className="h-px w-12 sm:w-20 bg-white/15" />
          </div>

          {/* Row 1: Abeey, J&T, BYD */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-7 max-w-4xl mx-auto px-4">
            {PRESENTING_TOP_TIER.map((item) => (
              <MainSponsorLogo key={item.id} item={item} />
            ))}
          </div>

          {/* Row 2: Hermina Depok, DHS */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-7 max-w-4xl mx-auto px-4">
            {PRESENTING_BOTTOM_TIER.map((item) => (
              <MainSponsorLogo key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: SUPPORTING PARTNERS (Clean Transparent Logos, Balanced Scale) */}
        {/* ========================================================================= */}
        <div className="space-y-4 sm:space-y-5 pt-1">
          <div className="flex items-center justify-center gap-4 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-slate-500">
            <span className="h-px w-10 sm:w-16 bg-white/10" />
            <span>SUPPORTING PARTNERS</span>
            <span className="h-px w-10 sm:w-16 bg-white/10" />
          </div>

          {/* Row 1: first 6 */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto px-4">
            {SUPPORTING_PARTNERS.slice(0, 6).map((item) => (
              <SupportingSponsorLogo key={item.id} item={item} />
            ))}
          </div>

          {/* Row 2: last 5 */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto px-4">
            {SUPPORTING_PARTNERS.slice(6).map((item) => (
              <SupportingSponsorLogo key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Subtle Partnership Liaison Line */}
        <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center text-xs font-mono text-slate-500">
          <span>{t('Tertarik berkolaborasi dengan ekspedisi kami?', 'Interested in partnering with our expedition?')}</span>
          <a
            href="https://wa.me/6281290001000?text=Halo%20Sekretariat%20GX-ID,%20kami%20ingin%20berdiskusi%20kemitraan%20resmi%20Grindurance%202026"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-[#FA6D0B] font-bold tracking-wider uppercase transition-colors underline underline-offset-4"
          >
            {t('Hubungi Sekretariat GX-ID (WhatsApp) →', 'Contact GX-ID Secretariat (WhatsApp) →')}
          </a>
        </div>

      </div>
    </section>
  );
}
