'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { PACK_TIERS, RPC_LOGISTICS, OFFICIAL_GEAR_ITEMS } from '@/lib/data/racepacks';

export default function RacePackSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* 2.5 PAKET PESERTA & MERCHANDISE (RAD RACE INSPIRED - EDITORIAL & ELEGAN) */}
      <section id="racepack" className="pt-6 sm:pt-8 pb-5 sm:pb-6 text-white relative">
        {/* Dynamic Action Tandem Cyclists Background (pesepeda2.webp) */}
        <div 
          className="absolute top-8 sm:top-12 bottom-0 inset-x-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 35%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 35%, black 85%, transparent 100%)',
          }}
        >
          <img
            src="/backgrounds/bg-racepack.webp"
            alt="Grindurance Equipped Gravel Cyclist"
            className="w-full h-full object-cover object-[center_10%] lg:object-[75%_8%] opacity-90 filter contrast-[1.18] saturate-[1.2] brightness-[0.95] blur-[0.4px]"
          />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#090A0D] via-[#090A0D]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/80 via-[#090A0D]/45 to-[#090A0D]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0C0E] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7 relative z-10">
          {/* Section Header: Alternating Right-Aligned Layout */}
          <div className="flex flex-col md:flex-row-reverse md:items-end justify-between gap-4 border-b border-white/10 pb-4 sm:pb-5">
            <div className="flex flex-col items-start md:items-end space-y-3">
              <span className="text-sm sm:text-base md:text-lg font-black text-[#FA6D0B] uppercase tracking-widest block font-mono">
                PARTICIPANT PACKAGES · 2026 EDITION
              </span>
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[560px] group">
                <div className="absolute -inset-3 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.28)_0%,transparent_70%)] blur-2xl opacity-80 pointer-events-none" />
                <img
                  src="/text race pack.webp"
                  alt="Race Pack & Merchandise"
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

            <div className="flex flex-col items-start space-y-3.5 max-w-md">
              <div className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="text-white font-black">{t('2 OPSI PAKET', '2 PACKAGE OPTIONS')}</span>
                <span className="text-white/20 select-none">·</span>
                <span className="text-slate-400">{t('TARIF TRANSPARAN', 'TRANSPARENT RATES')}</span>
              </div>
              <div className="border-l-2 md:border-l-0 md:border-r-2 border-[#FA6D0B] pl-4 md:pl-0 md:pr-4 py-0.5 md:text-right w-full">
                <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                  {t(
                    'Sistem pendaftaran dua opsi: pilih paket Medal Saja untuk esensi tantangan mandiri, atau upgrade ke paket Medal & Jersey resmi GX-ID buatan Pollride (mulai +Rp 50.000). Seluruh paket mencakup perlengkapan hari-H.',
                    'Two registration options: choose the Medal Only package for the pure self-supported challenge, or upgrade to the official Pollride GX-ID Medal & Jersey package (from +IDR 50,000). All packages include race-day essentials.'
                  )}
                </p>
                <div className="mt-2.5 flex items-center md:justify-end gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse shrink-0" />
                  <span>{t('PENUTUPAN PENDAFTARAN:', 'REGISTRATION CLOSES:')} <strong className="text-white font-bold">{t('29 NOVEMBER 2026 (H-14)', 'NOVEMBER 29, 2026 (H-14)')}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL PACKAGE COMPARISON (DRIVEN BY lib/data/racepacks.ts) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PACK_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-5 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 ${
                  tier.isFeatured
                    ? 'bg-gradient-to-b from-[#FA6D0B]/15 via-black/60 to-black/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(250,109,11,0.22)]'
                    : 'bg-black/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-black uppercase tracking-wider ${tier.isFeatured ? 'text-[#FA6D0B]' : 'text-white'}`}>
                        {t(tier.tierTag.id, tier.tierTag.en)}
                      </span>
                      <span className="text-white/30 font-normal select-none">·</span>
                      <span className="text-white text-xs font-sans font-bold uppercase tracking-wider">
                        {t(tier.tierBadge.id, tier.tierBadge.en)}
                      </span>
                    </div>
                    <span className={`text-xs font-sans uppercase tracking-wider ${tier.isFeatured ? 'font-bold text-[#FA6D0B]' : 'text-slate-400 font-semibold'}`}>
                      {t(tier.priceTag.id, tier.priceTag.en)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      {t(tier.title.id, tier.title.en)}
                    </h3>
                    <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${tier.isFeatured ? 'text-slate-300' : 'text-slate-400'}`}>
                      {t(tier.description.id, tier.description.en)}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-3 text-xs sm:text-[13px] text-slate-300 font-sans">
                    {tier.inclusions.map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-2.5 ${item.isBold ? 'font-bold text-white' : ''}`}>
                        <span className="text-[#FA6D0B] text-base leading-none shrink-0 select-none mt-0.5">·</span>
                        <span>{t(item.text.id, item.text.en)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans">
                  <span className="text-slate-400 font-medium uppercase tracking-wider">
                    {t(tier.footerMeta.left.id, tier.footerMeta.left.en)}
                  </span>
                  <span className={`font-bold uppercase tracking-wider ${tier.isFeatured ? 'text-[#FA6D0B]' : 'text-white'}`}>
                    {t(tier.footerMeta.right.id, tier.footerMeta.right.en)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* LOGISTIK RACE PACK (RPC) */}
          <div className="rounded-2xl bg-black/70 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 p-6 sm:p-8 gap-6 md:gap-0">
              {RPC_LOGISTICS.map((rpc, idx) => (
                <div
                  key={rpc.id}
                  className={`flex flex-col justify-between space-y-4 ${idx === 0 ? 'md:pr-8' : 'md:pl-8'}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                        {t(rpc.tag.id, rpc.tag.en)}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded shrink-0 ${
                          rpc.badgeHighlight
                            ? 'bg-[#FA6D0B]/20 text-[#FA6D0B]'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        {t(rpc.badge.id, rpc.badge.en)}
                      </span>
                    </div>
                    <h4
                      className={`font-display text-xl sm:text-2xl font-black uppercase tracking-tight ${
                        rpc.id === 'handling' ? 'text-[#FA6D0B]' : 'text-white'
                      }`}
                    >
                      {t(rpc.title.id, rpc.title.en)}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {t(rpc.subtitle.id, rpc.subtitle.en)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-2 text-xs text-slate-300 font-sans">
                    {rpc.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2">
                        <span className="text-[#FA6D0B] font-bold">·</span>
                        <span>{t(item.id, item.en)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EDITORIAL PRODUCT SHOWCASE */}
          <div className="space-y-5 pt-4">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                {t('RINCIAN PERLENGKAPAN RESMI', 'OFFICIAL RACE PACK ITEMS')}
              </span>
              <span className="text-xs font-mono text-[#FA6D0B] font-bold uppercase tracking-wider">
                {OFFICIAL_GEAR_ITEMS.length} ITEM
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OFFICIAL_GEAR_ITEMS.map((gear) => (
                <div
                  key={gear.id}
                  className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 transition-all duration-300 flex flex-col justify-between p-6 select-none">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-xs font-black uppercase tracking-wider text-[#FA6D0B]">
                          {gear.visualPreview.topLeftText}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          {t(gear.visualPreview.topRightText.id, gear.visualPreview.topRightText.en)}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center my-auto text-center space-y-1.5">
                        <div className="font-display text-6xl sm:text-7xl font-black text-white/10 tracking-tighter group-hover:text-white/20 transition-colors leading-none">
                          {gear.visualPreview.numberBadge}
                        </div>
                        <div className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                          {gear.visualPreview.centerTitle}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FA6D0B] font-bold">
                          {t(gear.visualPreview.centerSubtitle.id, gear.visualPreview.centerSubtitle.en)}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        <span>{gear.visualPreview.bottomTagLeft}</span>
                        <span className="text-white font-bold">
                          {t(gear.visualPreview.bottomTagRight.id, gear.visualPreview.bottomTagRight.en)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
                        <span className="text-slate-400">{gear.itemNumber}</span>
                        <span className="text-white/30 font-normal select-none">·</span>
                        <span className="text-[#FA6D0B]">{t(gear.tagCategory.id, gear.tagCategory.en)}</span>
                      </div>
                      <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug">
                        {t(gear.title.id, gear.title.en)}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {t(gear.description.id, gear.description.en)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {gear.specs.map((spec, specIdx) => (
                      <div key={specIdx} className="flex items-center gap-2 text-slate-300">
                        <span className="text-[#FA6D0B] text-sm leading-none shrink-0 select-none">·</span>
                        <span>{t(spec.id, spec.en)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimalist Bottom CTA Strip */}
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-[#FA6D0B]">
                <span>{t('KUOTA TERBATAS', 'LIMITED SLOTS')}</span>
                <span className="text-white/30 font-normal select-none">·</span>
                <span>{t('AMANKAN BIB ANDA', 'SECURE YOUR BIB')}</span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                {t('PILIH KATEGORI & DAPATKAN PAKET ANDA', 'CHOOSE CATEGORY & GET YOUR PACK')}
              </h4>
              <p className="text-xs text-slate-400">
                {t(
                  'Pendaftaran ditutup saat kuota per kategori terpenuhi atau batas akhir pendaftaran tercapai.',
                  'Registration closes once category quota is reached or registration deadline expires.'
                )}
              </p>
            </div>
            <Link
              href="/daftar"
              className="px-8 py-3.5 rounded-full text-xs font-sans font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_25px_rgba(250,109,11,0.35)]"
            >
              <span>{t('PILIH PAKET & DAFTAR', 'SELECT PACK & REGISTER')}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
