'use client';

import Link from 'next/link';
import { ArrowUpRight, Instagram, Users, Share2, Compass, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CommunitySocialSection() {
  const { t } = useLanguage();

  const stories = [
    {
      title: t('Fajar Dingin Jonggol', 'Chilly Jonggol Dawn'),
      category: '03:30 WIB // PROLOG',
      image: '/perjalanan-siklis-di-jalur-oranye.webp',
      author: '@gx_bogor.chapter',
      tag: '#GrinduranceDawn',
    },
    {
      title: t('Koridor Makadam & Lumpur Basah', 'Wet Mud & Rough Macadam'),
      category: 'STAGE // SUKAMAKMUR',
      image: '/pesepeda.webp',
      author: '@gravelgrindurance',
      tag: '#RainySeasonUltra',
    },
    {
      title: t('Sinergi Tim Pair Mix 120 KM', '120 KM Pair Mix Synergy'),
      category: 'COMPETITIVE RACE // PAIR',
      image: '/pesepeda2.webp',
      author: '@gx_jakarta.south',
      tag: '#PairMix120',
    },
    {
      title: t('Hangatnya Kopi Pemulihan Basecamp', 'Warm Basecamp Recovery Coffee'),
      category: 'FINISH LINE // ABEEY',
      image: '/hero.webp',
      author: '@abeeycoffee',
      tag: '#FinisherLounge',
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
      {/* Cinematic Action Photography Background (bg-community.webp) */}
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
        {/* Seamless dark gradient overlays for extreme legibility */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0B0C0E] via-[#0B0C0E]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/80 via-[#0B0C0E]/35 to-[#0B0C0E]/80" />
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 sm:pb-5">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FA6D0B]/30 bg-[#FA6D0B]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                GX-ID ECOSYSTEM // 8 YEARS COMMITTED
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white italic">
              {t('80.000+ PESEPEDA · 19 CHAPTER NUSANTARA', '80,000+ RIDERS · 19 REGIONAL CHAPTERS')}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t(
                'Bukan sekadar event sehari, melainkan rumah persaudaraan ultra-cycling mandiri terbesar di Indonesia. Bagikan kisah perjuangan Anda di koridor Jonggol bersama ribuan petualang lainnya.',
                'More than a one-day race, GX-ID is Indonesia’s largest grassroots ultra-cycling camaraderie. Share your endurance tales across the Jonggol corridor with thousands of fellow adventurers.'
              )}
            </p>
          </div>

          {/* Social Quick Link Pill */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#FA6D0B] text-white hover:text-black border border-white/15 hover:border-[#FA6D0B] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@gravelgrindurance</span>
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* 4 Community Story Cards (Instagram Vibe) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between aspect-[4/5] hover:border-[#FA6D0B]/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Background Photo with zoom effect */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
              </div>

              {/* Top Badge: Category & Instagram Tag */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[#FA6D0B] border border-[#FA6D0B]/40">
                  {story.category}
                </span>
                <span className="text-[10px] font-mono text-white/80 font-bold">
                  {story.tag}
                </span>
              </div>

              {/* Bottom Meta & Caption */}
              <div className="relative z-10 p-4 space-y-1.5">
                <div className="text-[10px] font-mono text-[#FA6D0B] font-bold">
                  {story.author}
                </div>
                <h3 className="font-display text-base sm:text-lg font-black uppercase text-white tracking-tight leading-snug line-clamp-2">
                  {story.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* 19 Chapters Strip & Action Bar */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5 sm:p-6 space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-white">
              <Users className="w-4 h-4 text-[#FA6D0B]" />
              <span>{t('19 CHAPTER REGIONAL RESMI GX-ID', '19 OFFICIAL GX-ID REGIONAL CHAPTERS')}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {t('TERBUKA UNTUK SELURUH MERK & JENIS SEPEDA', 'OPEN FOR ALL BIKE BRANDS & TYPES')}
            </span>
          </div>

          {/* Chapter Pills */}
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

          {/* Direct Community Connect Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="text-slate-400">
              {t('Ingin bergabung dengan grup ride mingguan chapter terdekat?', 'Want to join weekly community training rides with your local chapter?')}
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href="https://strava.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:border-[#FA6D0B] text-slate-300 hover:text-white transition-all flex items-center gap-2 text-[11px] font-bold"
              >
                <Compass className="w-3.5 h-3.5 text-[#FA6D0B]" />
                <span>STRAVA CLUB GX-ID</span>
              </a>
              <a
                href="https://wa.me/6281290001000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#FA6D0B] text-black hover:bg-white font-black transition-all flex items-center gap-2 text-[11px]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{t('HUBUNGI ADMIN CHAPTER', 'CONTACT CHAPTER ADMIN')}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
