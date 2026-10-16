'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CommunitySocialSection() {
  const { t } = useLanguage();

  const communityCards = [
    {
      title: 'IG : gxid.official',
      category: 'INSTAGRAM // OFFICIAL',
      subtitle: t('Live Briefing & Galeri', 'Live Briefing & Gallery'),
      image: '/perjalanan-siklis-di-jalur-oranye.webp',
      href: 'https://instagram.com/gxid.official',
      isExternal: true,
    },
    {
      title: 'FB GX-ID',
      category: 'FACEBOOK // GROUP',
      subtitle: t('41.000+ Komunitas', '41,000+ Cyclists'),
      image: '/pesepeda2.webp',
      href: 'https://www.facebook.com/groups/260107147993705/',
      isExternal: true,
    },
    {
      title: 'FB Marketplace GX-ID',
      category: 'MARKETPLACE // FORUM',
      subtitle: t('Jual Beli Gear & Part', 'Gear & Parts Trading'),
      image: '/pesepeda.webp',
      href: 'https://www.facebook.com/groups/260107147993705/',
      isExternal: true,
    },
    {
      title: t('Pendaftaran Event', 'Event Registration'),
      category: 'REGISTRATION // 2026',
      subtitle: t('Pilih 5 Kategori Rute', 'Select 5 Route Categories'),
      image: '/backgrounds/bg-categories.webp',
      href: '/daftar',
      isInternal: true,
    },
    {
      title: t('Portofolio', 'Portfolio'),
      category: 'TRACK RECORD // 8 YEARS',
      subtitle: t('Arsip Ekspedisi GX-ID', 'GX-ID Expedition Archive'),
      image: '/hero.webp',
      href: 'https://linktr.ee/gxid.official',
      isExternal: true,
    },
    {
      title: t('Region/Chapter GX-ID', 'Region/Chapter GX-ID'),
      category: 'NETWORK // 19 CHAPTERS',
      subtitle: t('Lihat Daftar Nusantara ↓', 'View Regional Chapters ↓'),
      image: '/backgrounds/bg-timeline.webp',
      href: '#chapters',
      isExternal: false,
    },
  ];

  const chapters = [
    'Jabodetabek', 'Bandung Raya', 'Semarang', 'Solo Raya', 'Yogyakarta',
    'Surabaya-Sidoarjo', 'Malang', 'Bali & Nusa', 'Medan', 'Palembang',
    'Lampung', 'Pekanbaru', 'Balikpapan', 'Samarinda', 'Banjarmasin',
    'Makassar', 'Manado', 'Lombok', 'Virtual Nationwide'
  ];

  return (
    <section id="komunitas" className="pt-8 sm:pt-10 pb-8 sm:pb-10 border-t border-white/10 bg-[#0B0C0E] relative overflow-hidden">
      {/* Cinematic Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, black 25%, black 75%, rgba(0,0,0,0.3) 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, black 25%, black 75%, rgba(0,0,0,0.3) 90%, transparent 100%)'
        }}
      >
        <img
          src="/backgrounds/bg-community.webp"
          alt="GX-ID Community Cyclists"
          className="w-full h-full object-cover object-[center_20%] opacity-80 filter contrast-[1.12] saturate-[1.15] brightness-[0.9] blur-[0.4px]"
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0B0C0E] via-[#0B0C0E]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/80 via-[#0B0C0E]/35 to-[#0B0C0E]/80" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 sm:pb-5">
          <div className="space-y-2.5">
            {/* Pure mono industrial label — no badge, no dot, no icon */}
            <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-[0.3em] block">
              GX-ID ECOSYSTEM // 8 YEARS COMMITTED
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white italic">
              {t('80.000+ PESEPEDA · 19 CHAPTER NUSANTARA', '80,000+ RIDERS · 19 REGIONAL CHAPTERS')}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t(
                'Bukan sekadar event sehari, melainkan rumah persaudaraan ultra-cycling mandiri terbesar di Indonesia. Bagikan kisah perjuangan Anda di koridor Jonggol bersama ribuan petualang lainnya.',
                "More than a one-day race, GX-ID is Indonesia's largest grassroots ultra-cycling camaraderie. Share your endurance tales across the Jonggol corridor with thousands of fellow adventurers."
              )}
            </p>
          </div>

          {/* Instagram link — text only, ArrowUpRight allowed on CTA */}
          <a
            href="https://instagram.com/gravelgrindurance"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 bg-[#FA6D0B] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(250,109,11,0.55)] active:scale-95 flex items-center gap-2"
          >
            @GRAVELGRINDURANCE
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* 6 Official Community Cards (Replacing old story cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {communityCards.map((card, idx) => {
            const cardInner = (
              <>
                {/* Background Photo */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.15] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                </div>

                {/* Top: Category & Arrow */}
                <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#FA6D0B]">
                    {card.category}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FA6D0B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Bottom Meta */}
                <div className="relative z-10 p-3 sm:p-4 space-y-1">
                  <h3 className="font-display text-sm sm:text-base font-black uppercase text-white tracking-tight leading-snug group-hover:text-[#FA6D0B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-300 font-medium">
                    {card.subtitle}
                  </p>
                </div>
              </>
            );

            if (card.isInternal) {
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between aspect-[3/4] sm:aspect-[4/5] hover:border-[#FA6D0B] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_36px_rgba(250,109,11,0.25)]"
                >
                  {cardInner}
                </Link>
              );
            }

            return (
              <a
                key={idx}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between aspect-[3/4] sm:aspect-[4/5] hover:border-[#FA6D0B] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_36px_rgba(250,109,11,0.25)]"
              >
                {cardInner}
              </a>
            );
          })}
        </div>

        {/* 19 Chapters Strip & Action Bar */}
        <div id="chapters" className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5 sm:p-6 space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
            {/* Pure mono industrial label — no icon */}
            <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              {t('19 CHAPTER REGIONAL RESMI GX-ID', '19 OFFICIAL GX-ID REGIONAL CHAPTERS')}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {t('TERBUKA UNTUK SELURUH MERK & JENIS SEPEDA', 'OPEN FOR ALL BIKE BRANDS & TYPES')}
            </span>
          </div>

          {/* Chapter Tags */}
          <div className="flex flex-wrap gap-2">
            {chapters.map((ch, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FA6D0B]/50 hover:bg-[#FA6D0B]/10 text-slate-300 hover:text-white text-[11px] font-mono transition-all duration-200 cursor-default"
              >
                #{ch}
              </span>
            ))}
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono border-t border-white/5">
            <div className="text-slate-400">
              {t('Ingin bergabung dengan grup ride mingguan chapter terdekat?', 'Want to join weekly community training rides with your local chapter?')}
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href="https://strava.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:border-[#FA6D0B] text-slate-300 hover:text-white transition-all text-[11px] font-bold uppercase tracking-wider"
              >
                STRAVA CLUB GX-ID
              </a>
              <a
                href="https://wa.me/6281290001000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#FA6D0B] text-black hover:bg-white font-black transition-all text-[11px] uppercase tracking-wider flex items-center gap-1.5 hover:shadow-[0_0_24px_rgba(250,109,11,0.55)] active:scale-95"
              >
                {t('HUBUNGI ADMIN CHAPTER', 'CONTACT CHAPTER ADMIN')}
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
