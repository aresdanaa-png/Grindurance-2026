'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import BibCard from '@/components/BibCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/lib/context/LanguageContext';

interface RosterItem {
  id: string;
  bib_number: number;
  full_name: string;
  partner_name?: string | null;
  rider_role: string;
  category_id: string;
  category_name: string;
  distance_km: number;
  wave_start_time: string;
  gender: string;
  partner_gender?: string | null;
  community_chapter: string;
  jersey_size: string;
  package_type: string;
  status: 'CONFIRMED' | 'PROLOG_VERIFIED' | 'SCRUTINEERED' | 'ON_COURSE' | 'FINISHED';
  prologue_required: boolean;
  prologue_status: 'NOT_REQUIRED' | 'PENDING' | 'PASSED' | 'REJECTED';
  qr_checkin_hash: string;
  created_at: string;
}

interface RosterStats {
  total: number;
  male: number;
  female: number;
  pair_teams: number;
  prolog_passed: number;
  prolog_required_total: number;
}

export default function PesertaPage() {
  const { t } = useLanguage();
  const [roster, setRoster] = useState<RosterItem[]>([]);
  const [stats, setStats] = useState<RosterStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiderForBib, setSelectedRiderForBib] = useState<RosterItem | null>(null);

  const categoryTabs = [
    { id: 'ALL', label: t('SEMUA KATEGORI', 'ALL CATEGORIES') },
    { id: '200', label: '200 ULTRA' },
    { id: '150', label: '150 GRAND FONDO' },
    { id: '120_SINGLE', label: '120 (RACE) SINGLE' },
    { id: '120_PAIR', label: '120 (RACE) PAIR MIX' },
    { id: '100', label: '100 FONDO' },
    { id: '60', label: '70 FUN GRAVEL' },
    { id: 'VIRTUAL', label: 'VIRTUAL RIDE' },
  ];

  useEffect(() => {
    fetchRoster();
  }, [selectedCategory, searchQuery]);

  const fetchRoster = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'ALL') params.set('category', selectedCategory);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());

      const res = await fetch(`/api/roster?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setRoster(data.roster);
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to load roster:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black scroll-smooth relative overflow-x-hidden">
      
      {/* ──────────────────────────────────────────────────────────
          1. HERO HEADER: ATMOSPHERIC ATHLETIC BANNER
      ────────────────────────────────────────────────────────── */}
      <div className="relative border-b border-white/10 overflow-hidden bg-black">
        {/* Background Cyclist Action Photography with Seamless Fade Dissolve */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/backgrounds/bg-community.webp"
            alt="Gravel Grindurance Roster"
            fill
            priority
            className="object-cover object-[center_35%] opacity-35 filter grayscale contrast-125 scale-105"
          />
          {/* Radial Orange Ambient Backlight Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FA6D0B]/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
          {/* Top & Bottom Dissolve Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E11]/80 via-transparent to-[#0D0E11]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11] via-transparent to-[#0D0E11]" />
        </div>

        {/* Faint Event Logo Watermark */}
        <div className="absolute -bottom-10 right-4 sm:right-12 pointer-events-none select-none opacity-[0.05] z-0">
          <img
            src="/nama_event.webp"
            alt=""
            className="w-[500px] sm:w-[750px] h-auto object-contain filter brightness-0 invert"
          />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="font-bold text-[#FA6D0B] uppercase tracking-widest px-3 py-1 bg-[#FA6D0B]/15 rounded-full border border-[#FA6D0B]/30 backdrop-blur-md">
              GX-ID OFFICIAL START LIST // RIDER ROSTER 2026
            </span>
            <span className="text-white/30 select-none hidden sm:inline">·</span>
            <span className="text-slate-400">
              STATUS: <strong className="text-white">TERKONFIRMASI // 19 CHAPTER</strong>
            </span>
            <span className="text-white/30 select-none hidden sm:inline">·</span>
            <span className="text-slate-400">
              FLAG-OFF: <strong className="text-[#FA6D0B]">WAVE 1 (05:30) · WAVE 2 (06:00) · WAVE 3 (07:00)</strong>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display italic text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[0.95]">
              {t('ROSTER ATLET & ALOKASI WAVE', 'ATHLETE ROSTER & WAVE ALLOCATION')}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-sans">
              {t(
                'Daftar peserta resmi terkonfirmasi, alokasi gelombang start (Wave 1 / 2 / 3), status verifikasi prolog 30 km (03:00–05:00 WIB), serta representasi 19 Chapter Regional GX-ID se-Indonesia.',
                'Confirmed participant start list, wave dispatch allocation (Wave 1 / 2 / 3), 30 km dawn prologue verification (03:00–05:00 WIB), and 19 GX-ID National Regional Chapter representation.'
              )}
            </p>
          </div>

          {/* Telemetry Metric Cards */}
          {stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 font-mono">
              <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl shadow-lg space-y-1 relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  {t('TOTAL ATLET RESMI', 'TOTAL REGISTERED RIDERS')}
                </span>
                <span className="font-display italic text-3xl sm:text-5xl font-black text-white block tracking-tight">
                  {stats.total}
                </span>
                <span className="text-xs text-slate-400 block font-medium pt-1 font-sans">
                  {stats.male} {t('Pria', 'Men')} · {stats.female} {t('Wanita', 'Women')}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FA6D0B]/10 to-black/60 backdrop-blur-xl shadow-lg space-y-1 relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FA6D0B]/10 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  120K PAIR MIX
                </span>
                <span className="font-display italic text-3xl sm:text-5xl font-black text-[#FA6D0B] block tracking-tight">
                  {stats.pair_teams} <span className="text-lg font-mono not-italic text-slate-300 font-bold">{t('TIM', 'TEAMS')}</span>
                </span>
                <span className="text-xs text-slate-400 block font-medium pt-1 font-sans">
                  {t('Format Tandem 2 Pax', '2-Rider Tandem Format')}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl shadow-lg space-y-1 relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FA6D0B]/5 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  {t('PROLOG 30K LOLOS', '30K PROLOGUE PASSED')}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display italic text-3xl sm:text-5xl font-black text-white block tracking-tight">
                    {stats.prolog_passed}
                  </span>
                  <span className="text-sm font-mono text-slate-400 font-bold">/ {stats.prolog_required_total}</span>
                </div>
                <span className="text-xs text-slate-400 block font-medium pt-1 font-sans">
                  {t('Kategori 150K & 200K (03:00–05:00 WIB)', '150K & 200K (03:00–05:00 WIB)')}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl shadow-lg space-y-1 relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  {t('BASECAMP START // VENUE', 'START BASECAMP // VENUE')}
                </span>
                <span className="font-display italic text-2xl sm:text-3xl font-black text-white block tracking-tight mt-1">
                  ABEEY COFFEE
                </span>
                <span className="text-xs text-slate-400 block font-medium pt-1 font-sans">
                  LRT Harjamukti, Cibubur
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. ATHLETIC ATMOSPHERIC BACKGROUND SYSTEM (DNA INFUSION)
      ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Background Cycling Action Photography */}
        <div 
          className="absolute top-[600px] left-0 right-0 h-[1400px] opacity-20"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/backgrounds/bg-timeline.webp"
            alt=""
            className="w-full h-full object-cover object-[center_25%] filter contrast-[1.15] saturate-[1.2] brightness-[0.8]"
          />
        </div>

        {/* Ambient Aurora Glows */}
        <div className="absolute top-[35%] -left-32 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-[65%] -right-32 w-[650px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Subtle Horizontal Telemetry Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100%_48px]"
          aria-hidden="true" 
        />
      </div>

      {/* ──────────────────────────────────────────────────────────
          3. BODY: SEARCH, FILTER, AND ROSTER TABLE
      ────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative z-10">
        
        {/* Search & Actions Toolbar */}
        <ScrollReveal>
          <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <input
                type="text"
                placeholder={t('Cari No. BIB (#1001), Nama Atlet, atau Chapter...', 'Search BIB No, Rider Name, or Chapter...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl px-5 py-3.5 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400 hover:text-white uppercase transition-colors cursor-pointer"
                >
                  [HAPUS]
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/scrutineering"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white transition-all cursor-pointer shadow-md"
              >
                <span>Scrutineering Desk //</span>
              </Link>
              <Link
                href="/daftar"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-sans font-black uppercase tracking-wider bg-[#FA6D0B] hover:bg-[#DE5A00] text-black shadow-[0_0_25px_rgba(250,109,11,0.45)] transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95 group"
              >
                <span>{t('Daftar Rider', 'Register Rider')}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10 font-mono text-xs">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2.5 font-bold tracking-wider uppercase whitespace-nowrap transition-all rounded-lg cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.4)] font-black'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* Start List Roster Table */}
        <ScrollReveal>
          <div className="bg-black/60 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative">
          {/* Subtle Ambient Backlight in Table */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FA6D0B]/5 rounded-full blur-3xl pointer-events-none" />

          {loading ? (
            <div className="py-24 text-center font-mono">
              <div className="w-8 h-8 border-2 border-white/10 border-t-[#FA6D0B] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs text-slate-400 uppercase tracking-wider">{t('Memuat Roster Atlet GX-ID...', 'Loading GX-ID Rider Roster...')}</p>
            </div>
          ) : roster.length === 0 ? (
            <div className="py-24 text-center space-y-3 p-6 font-mono">
              <span className="text-xs text-[#FA6D0B] font-bold uppercase tracking-wider block">// STATUS: NO RECORDS</span>
              <p className="font-display italic text-2xl font-black text-white uppercase">{t('Tidak Ada Atlet Ditemukan', 'No Riders Found')}</p>
              <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-sm mx-auto">
                {t('Sesuaikan kata kunci pencarian Anda atau pilih kategori lain.', 'Adjust search keyword or select another category filter.')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b border-white/15 bg-black/80 backdrop-blur-md font-mono text-[11px] tracking-wider text-slate-400 uppercase font-bold">
                    <th className="py-4 px-6">BIB #</th>
                    <th className="py-4 px-6">{t('NAMA RIDER / TIM', 'RIDER / SQUAD NAME')}</th>
                    <th className="py-4 px-6">{t('KATEGORI & WAVE', 'CATEGORY & WAVE')}</th>
                    <th className="py-4 px-6">{t('CHAPTER REGIONAL', 'REGIONAL CHAPTER')}</th>
                    <th className="py-4 px-6">{t('PAKET', 'PACKAGE')}</th>
                    <th className="py-4 px-6">{t('STATUS PROLOG', 'PROLOGUE STATUS')}</th>
                    <th className="py-4 px-6 text-right">{t('PLAT BIB', 'BIB PLATE')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {roster.map((rider) => (
                    <tr
                      key={rider.id}
                      className="hover:bg-white/[0.04] transition-colors group"
                    >
                      {/* BIB Number */}
                      <td className="py-4 px-6">
                        <span className="font-display italic text-lg sm:text-xl font-black text-[#FA6D0B] tracking-tight">
                          #{rider.bib_number}
                        </span>
                      </td>

                      {/* Rider Name */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-white group-hover:text-[#FA6D0B] transition-colors text-sm sm:text-base">
                          {rider.full_name}
                        </div>
                        {rider.partner_name && (
                          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#FA6D0B] font-mono font-bold">
                            <span>// PAIR: {rider.partner_name}</span>
                          </div>
                        )}
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {rider.gender === 'female' ? t('Wanita', 'Female') : t('Pria', 'Male')} · {t('Jersey:', 'Jersey:')} {rider.jersey_size}
                        </span>
                      </td>

                      {/* Category & Wave */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-xs sm:text-sm">
                          {rider.category_name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Wave: <strong className="text-white">{rider.wave_start_time}</strong>
                        </div>
                      </td>

                      {/* Chapter */}
                      <td className="py-4 px-6 text-xs text-slate-300 font-medium">
                        {rider.community_chapter}
                      </td>

                      {/* Package */}
                      <td className="py-4 px-6 text-xs font-mono">
                        {rider.package_type === 'MEDAL_JERSEY' ? (
                          <span className="text-[#FA6D0B] font-bold">Medal &amp; Jersey</span>
                        ) : (
                          <span className="text-slate-400">{t('Medal Saja', 'Medal Only')}</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-xs font-mono">
                        {rider.prologue_required ? (
                          rider.prologue_status === 'PASSED' ? (
                            <span className="inline-block px-2.5 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider text-white bg-white/15">
                              [PROLOG LOLOS]
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider text-[#FA6D0B] bg-[#FA6D0B]/15">
                              [PROLOG PENDING]
                            </span>
                          )
                        ) : (
                          <span className="inline-block px-2.5 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider text-slate-400 bg-white/[0.04]">
                            [TERDAFTAR RESMI]
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedRiderForBib(rider)}
                          className="px-3.5 py-1.5 rounded-lg border border-white/20 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-[#FA6D0B]/15 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                        >
                          {t('PLAT //', 'PLATE //')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </ScrollReveal>

        {/* Modal Digital Bike Plate BIB */}
        {selectedRiderForBib && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0D0E11] max-w-xl w-full p-6 sm:p-8 rounded-2xl relative space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.9)] animate-slide-up-fade">
              <button
                type="button"
                onClick={() => setSelectedRiderForBib(null)}
                className="absolute top-4 right-4 px-3 py-1 font-mono text-xs uppercase font-bold text-slate-400 hover:text-white border border-white/20 rounded bg-black cursor-pointer transition-colors"
              >
                [X]
              </button>

              <div className="text-center space-y-1">
                <span className="text-[10px] sm:text-xs font-mono text-[#FA6D0B] uppercase tracking-widest font-bold block">
                  DIGITAL BIKE PLATE VOUCHER // OFFICIAL
                </span>
                <h3 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  BIB #{selectedRiderForBib.bib_number}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans">
                  {selectedRiderForBib.full_name} · {selectedRiderForBib.community_chapter}
                </p>
              </div>

              {/* Render Bib Card */}
              <div className="flex justify-center">
                <BibCard
                  bibNumber={selectedRiderForBib.bib_number}
                  fullName={selectedRiderForBib.full_name}
                  categoryName={selectedRiderForBib.category_name}
                  distanceKm={selectedRiderForBib.distance_km}
                  qrHash={selectedRiderForBib.qr_checkin_hash}
                  registrationCode={selectedRiderForBib.qr_checkin_hash || `GXID-${selectedRiderForBib.bib_number}`}
                  communityChapter={selectedRiderForBib.community_chapter}
                />
              </div>

              <div className="bg-black/60 p-4 rounded-xl text-xs font-mono text-slate-300 space-y-1.5 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Wave Start:</span>
                  <span className="text-white font-bold">{selectedRiderForBib.wave_start_time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Venue Flag-Off:</span>
                  <span className="text-white font-medium">ABEEY Coffee (LRT Harjamukti)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('Paket:', 'Package:')}</span>
                  <span className="text-[#FA6D0B] font-bold">
                    {selectedRiderForBib.package_type === 'MEDAL_JERSEY' ? 'Medal & Jersey' : t('Medal Saja', 'Medal Only')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRiderForBib(null)}
                className="w-full py-3.5 rounded-full border border-white/20 bg-black hover:bg-zinc-900 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                {t('TUTUP JENDELA', 'CLOSE WINDOW')}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
