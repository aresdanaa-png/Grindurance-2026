'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CommunitySocialSection() {
  const { t } = useLanguage();

  const communityChannels = [
    {
      title: 'IG : gxid.official',
      category: 'INSTAGRAM // OFFICIAL',
      handle: '@gxid.official',
      description: t('Siaran Live & Galeri', 'Live Streams & Gallery'),
      bannerImage: '/perjalanan-siklis-di-jalur-oranye.webp',
      platformType: 'instagram',
      ctaText: t('Buka Instagram', 'Open Instagram'),
      href: 'https://instagram.com/gxid.official',
      isExternal: true,
    },
    {
      title: 'FB GX-ID',
      category: 'FACEBOOK // GROUP',
      handle: 'GX-ID Group',
      description: t('41.000+ Komunitas', '41,000+ Cyclists'),
      bannerImage: '/pesepeda2.webp',
      platformType: 'facebook',
      ctaText: t('Buka Facebook', 'Open Facebook'),
      href: 'https://www.facebook.com/groups/260107147993705/',
      isExternal: true,
    },
    {
      title: 'FB Marketplace GX-ID',
      category: 'MARKETPLACE // FORUM',
      handle: 'GX-ID Market',
      description: t('Jual Beli Gear & Part', 'Gear & Parts Trading'),
      bannerImage: '/pesepeda.webp',
      platformType: 'marketplace',
      ctaText: t('Buka Marketplace', 'Open Marketplace'),
      href: 'https://www.facebook.com/groups/260107147993705/',
      isExternal: true,
    },
    {
      title: t('Pendaftaran Event', 'Event Registration'),
      category: 'REGISTRATION // 2026',
      handle: 'Gravel Grindurance',
      description: t('5 Kategori Rute Balap', '5 Race Route Categories'),
      bannerImage: '/backgrounds/bg-categories.webp',
      platformType: 'registration',
      ctaText: t('Daftar Sekarang', 'Register Now'),
      href: '/daftar',
      isInternal: true,
    },
    {
      title: t('Portofolio', 'Portfolio'),
      category: 'TRACK RECORD // 8 YEARS',
      handle: 'Linktree GX-ID',
      description: t('Dokumentasi & Arsip', 'Archive & Track Record'),
      bannerImage: '/hero.webp',
      platformType: 'portfolio',
      ctaText: t('Buka Portofolio', 'Open Portfolio'),
      href: 'https://linktr.ee/gxid.official',
      isExternal: true,
    },
    {
      title: t('Region/Chapter GX-ID', 'Region/Chapter GX-ID'),
      category: 'NETWORK // 19 CHAPTERS',
      handle: '19 Chapter Resmi',
      description: t('Jaringan Seluruh Indonesia', 'Nationwide Network'),
      bannerImage: '/backgrounds/bg-timeline.webp',
      platformType: 'chapter',
      ctaText: t('Lihat Chapter', 'View Chapters'),
      href: '#chapters',
      isInternal: false,
    },
  ];

  const chapters = [
    'Jabodetabek', 'Bandung Raya', 'Semarang', 'Solo Raya', 'Yogyakarta',
    'Surabaya-Sidoarjo', 'Malang', 'Bali & Nusa', 'Medan', 'Palembang',
    'Lampung', 'Pekanbaru', 'Balikpapan', 'Samarinda', 'Banjarmasin',
    'Makassar', 'Manado', 'Lombok', 'Virtual Nationwide'
  ];

  const renderProfileAvatar = (type: string) => {
    switch (type) {
      case 'instagram':
        return (
          <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center p-3">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-white" strokeWidth="0">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          </div>
        );
      case 'facebook':
        return (
          <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#1877F2] to-blue-400 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#1877F2] flex items-center justify-center p-2.5">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
          </div>
        );
      case 'marketplace':
        return (
          <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#0084FF] via-[#00A400] to-[#FA6D0B] shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0E1013] border border-white/10 flex items-center justify-center p-3">
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                <path d="M3 9l1.5-6h15L21 9v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" fill="#0084FF" />
                <path d="M2 9h20M7 9v11M17 9v11" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M3 9c0 1.657 1.343 3 3 3s3-1.343 3-3M9 9c0 1.657 1.343 3 3 3s3-1.343 3-3M15 9c0 1.657 1.343 3 3 3s3-1.343 3-3" stroke="#ffffff" strokeWidth="1.4" />
              </svg>
            </div>
          </div>
        );
      case 'registration':
        return (
          <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#FA6D0B] via-white to-[#FA6D0B] shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0B0C0E] border border-white/10 flex items-center justify-center p-2 overflow-hidden">
              <img
                src="/nama_event.webp"
                alt="Gravel Grindurance 2026"
                className="w-full h-full object-contain filter brightness-110 drop-shadow"
              />
            </div>
          </div>
        );
      case 'portfolio':
        return (
          <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#39E09B] via-emerald-400 to-[#FA6D0B] shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#39E09B] flex items-center justify-center p-3">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-black">
                <path d="M10.8 13.2V8.4l-3 3-1.7-1.7 4.9-4.9h2v4.9l3-3 1.7 1.7-3 3v4.8h4.8l-3-3 1.7-1.7 4.9 4.9v2l-4.9 4.9-1.7-1.7 3-3h-4.8v4.8l3-3 1.7 1.7-4.9 4.9h-2l-4.9-4.9 1.7-1.7 3 3V18H6.5l3 3-1.7 1.7L2.9 17.8v-2l4.9-4.9 1.7 1.7-3 3h4.3z" />
              </svg>
            </div>
          </div>
        );
      case 'chapter':
        return (
          <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#FA6D0B] via-amber-400 to-white shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0D0E11] border border-white/10 flex items-center justify-center p-2.5 overflow-hidden">
              <img
                src="/logo-gx-id.webp"
                alt="19 Chapter Regional GX-ID"
                className="w-full h-full object-contain filter brightness-110 drop-shadow"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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

        {/* 6 Official Profile Channel Cards (Profil Asli Tiap Platform & Link Langsung) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {communityChannels.map((item, idx) => {
            const cardInner = (
              <>
                {/* Atmospheric Top Banner */}
                <div className="h-16 sm:h-20 w-full relative overflow-hidden bg-black/60 border-b border-white/5">
                  <img
                    src={item.bannerImage}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.4] contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0E1013]" />
                  <span className="absolute top-2.5 left-3 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-[#FA6D0B]">
                    {item.category}
                  </span>
                  <div className="absolute top-2.5 right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-[#FA6D0B] group-hover:border-[#FA6D0B] transition-colors">
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                {/* Profile Photo (Gambar Profil Asli Tiap Platform) */}
                <div className="relative -mt-8 sm:-mt-10 mb-1 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    {renderProfileAvatar(item.platformType)}
                  </div>
                </div>

                {/* Identity & Meta */}
                <div className="px-3 pb-3.5 pt-1 flex flex-col items-center text-center flex-1 justify-between space-y-2.5">
                  <div className="space-y-0.5">
                    <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-white group-hover:text-[#FA6D0B] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-mono text-[#FA6D0B] font-bold">
                      {item.handle}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-mono text-slate-400 line-clamp-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro CTA Button */}
                  <div className="w-full pt-1">
                    <span className="w-full py-1.5 px-2.5 rounded-full bg-white/[0.04] group-hover:bg-[#FA6D0B] border border-white/10 group-hover:border-[#FA6D0B] text-slate-300 group-hover:text-black font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm">
                      <span>{item.ctaText}</span>
                      <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </>
            );

            if (item.isInternal) {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E1013] hover:border-[#FA6D0B] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_36px_rgba(250,109,11,0.25)] flex flex-col justify-between hover:-translate-y-1"
                >
                  {cardInner}
                </Link>
              );
            }

            return (
              <a
                key={idx}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E1013] hover:border-[#FA6D0B] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_36px_rgba(250,109,11,0.25)] flex flex-col justify-between hover:-translate-y-1"
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
