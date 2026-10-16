'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import BibCard from '@/components/BibCard';
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
    { id: '60', label: '60 FUN RIDE' },
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
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] py-14 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FA6D0B] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-8">
          <div className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-widest mb-2 block">
            OFFICIAL START LIST // RIDER ROSTER 2026
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white italic">
            {t('ROSTER ATLET & WAVE ALLOCATION', 'ATHLETE ROSTER & WAVE ALLOCATION')}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-sans">
            {t(
              'Daftar peserta resmi terkonfirmasi, alokasi gelombang start (Wave 1 / 2 / 3), status verifikasi prolog 30 km (03:00–05:00 WIB), serta representasi 19 Chapter Regional GX-ID se-Indonesia.',
              'Confirmed participant start list, wave dispatch allocation (Wave 1 / 2 / 3), 30 km dawn prologue verification (03:00–05:00 WIB), and 19 GX-ID National Regional Chapter representation.'
            )}
          </p>

          {/* Stats Bar */}
          {stats && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 border-t border-l border-white/10 font-mono">
              <div className="border-r border-b border-white/10 p-5 bg-black/40 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  {t('TOTAL ATLET RESMI', 'TOTAL REGISTERED RIDERS')}
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-white mt-1 block italic">
                  {stats.total}
                </span>
                <span className="text-xs text-slate-400 mt-1 block font-medium">
                  {stats.male} {t('Pria', 'Men')} · {stats.female} {t('Wanita', 'Women')}
                </span>
              </div>

              <div className="border-r border-b border-white/10 p-5 bg-black/40 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  120K PAIR MIX
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#FA6D0B] mt-1 block italic">
                  {stats.pair_teams} {t('TIM', 'TEAMS')}
                </span>
                <span className="text-xs text-slate-400 mt-1 block font-medium">
                  {t('Format Tandem 2 Pax', '2-Rider Tandem Format')}
                </span>
              </div>

              <div className="border-r border-b border-white/10 p-5 bg-black/40 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  {t('PROLOG 30K LOLOS', '30K PROLOGUE PASSED')}
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-white mt-1 block italic">
                  {stats.prolog_passed} <span className="text-sm text-slate-400 not-italic">/ {stats.prolog_required_total}</span>
                </span>
                <span className="text-xs text-slate-400 mt-1 block font-medium">
                  {t('Kategori 150K & 200K', '150K & 200K Categories')}
                </span>
              </div>

              <div className="border-r border-b border-white/10 p-5 bg-black/40 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block font-bold">
                  {t('BASECAMP START', 'START BASECAMP')}
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold text-white mt-2 block italic">
                  ABEEY COFFEE
                </span>
                <span className="text-xs text-slate-400 mt-1 block font-medium">
                  LRT Harjamukti, Cibubur
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={t('Cari No. BIB (#1001), Nama Atlet, atau Chapter...', 'Search BIB No, Rider Name, or Chapter...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400 hover:text-white uppercase"
                >
                  {t('HAPUS', 'CLEAR')}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/scrutineering"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-white/20 bg-black/60 hover:bg-black text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <span>Scrutineering Desk //</span>
              </Link>
              <Link
                href="/daftar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-sans font-black uppercase tracking-wider bg-[#FA6D0B] hover:bg-[#DE5A00] text-black shadow-[0_0_20px_rgba(250,109,11,0.4)] transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95 group"
              >
                <span>{t('Daftar Rider', 'Register Rider')}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10 font-mono text-xs">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 font-bold tracking-wider uppercase whitespace-nowrap transition-all rounded-lg cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.4)] font-black'
                    : 'bg-black/40 text-slate-400 hover:text-white hover:bg-black/60 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start List Table */}
        <div className="border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          {loading ? (
            <div className="py-20 text-center font-mono">
              <div className="w-8 h-8 border-2 border-white/10 border-t-[#FA6D0B] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs text-slate-400 uppercase tracking-wider">{t('Memuat Roster Atlet GX-ID...', 'Loading GX-ID Rider Roster...')}</p>
            </div>
          ) : roster.length === 0 ? (
            <div className="py-20 text-center space-y-2 p-6 font-mono">
              <span className="text-xs text-[#FA6D0B] font-bold uppercase tracking-wider block">// STATUS: EMPTY</span>
              <p className="text-base font-bold text-white uppercase">{t('Tidak ada atlet ditemukan', 'No riders found')}</p>
              <p className="text-xs text-slate-400 font-sans">
                {t('Sesuaikan kata kunci pencarian atau pilih kategori lain.', 'Adjust search keyword or select another category.')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-black/60 text-[11px] tracking-wider text-slate-400 uppercase font-bold">
                    <th className="py-4 px-5">BIB #</th>
                    <th className="py-4 px-5">{t('NAMA RIDER / TIM', 'RIDER / SQUAD NAME')}</th>
                    <th className="py-4 px-5">{t('KATEGORI & WAVE', 'CATEGORY & WAVE')}</th>
                    <th className="py-4 px-5">{t('CHAPTER REGIONAL', 'REGIONAL CHAPTER')}</th>
                    <th className="py-4 px-5">{t('PAKET', 'PACKAGE')}</th>
                    <th className="py-4 px-5">{t('STATUS PROLOG', 'PROLOGUE STATUS')}</th>
                    <th className="py-4 px-5 text-right">{t('PLAT BIB', 'BIB PLATE')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {roster.map((rider) => (
                    <tr
                      key={rider.id}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      {/* BIB Number */}
                      <td className="py-4 px-5 font-bold tabular-nums">
                        <span className="font-mono text-sm font-black text-[#FA6D0B]">
                          #{rider.bib_number}
                        </span>
                      </td>

                      {/* Rider Name */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-white group-hover:text-[#FA6D0B] transition-colors text-sm font-sans">
                          {rider.full_name}
                        </div>
                        {rider.partner_name && (
                          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#FA6D0B] font-bold">
                            <span>// PAIR: {rider.partner_name}</span>
                          </div>
                        )}
                        <span className="text-[11px] text-slate-400 block mt-0.5 font-sans">
                          {rider.gender === 'female' ? t('Wanita', 'Female') : t('Pria', 'Male')} · {t('Jersey:', 'Jersey:')} {rider.jersey_size}
                        </span>
                      </td>

                      {/* Category & Wave */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-white font-sans">
                          {rider.category_name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Wave: <strong className="text-white">{rider.wave_start_time} WIB</strong>
                        </div>
                      </td>

                      {/* Chapter */}
                      <td className="py-4 px-5 text-xs text-slate-300 font-sans">
                        {rider.community_chapter}
                      </td>

                      {/* Package */}
                      <td className="py-4 px-5 text-xs">
                        {rider.package_type === 'MEDAL_JERSEY' ? (
                          <span className="text-[#FA6D0B] font-bold">Medal &amp; Jersey</span>
                        ) : (
                          <span className="text-slate-400">{t('Medal Saja', 'Medal Only')}</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5 text-xs">
                        {rider.prologue_required ? (
                          rider.prologue_status === 'PASSED' ? (
                            <span className="text-white font-bold tracking-wider uppercase">
                              [PROLOG LOLOS]
                            </span>
                          ) : (
                            <span className="text-[#FA6D0B] font-bold tracking-wider uppercase">
                              [PROLOG PENDING]
                            </span>
                          )
                        ) : (
                          <span className="text-slate-400 tracking-wider uppercase">
                            [TERDAFTAR]
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => setSelectedRiderForBib(rider)}
                          className="px-3.5 py-1.5 rounded-lg border border-white/20 hover:border-[#FA6D0B] hover:text-[#FA6D0B] text-slate-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
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

        {/* Modal Digital Bike Plate BIB */}
        {selectedRiderForBib && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0D0E11] border border-white/20 max-w-xl w-full p-6 sm:p-8 rounded-2xl relative space-y-6 shadow-2xl">
              <button
                onClick={() => setSelectedRiderForBib(null)}
                className="absolute top-4 right-4 px-3 py-1 font-mono text-xs uppercase font-bold text-slate-400 hover:text-white border border-white/20 rounded bg-black cursor-pointer transition-colors"
              >
                TUTUP [X]
              </button>

              <div className="text-center space-y-1">
                <span className="text-[10px] sm:text-xs font-mono text-[#FA6D0B] uppercase tracking-widest font-bold block">
                  DIGITAL BIKE PLATE VOUCHER // OFFICIAL
                </span>
                <h3 className="font-display text-3xl font-black text-white uppercase italic">
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

              <div className="border border-white/10 bg-black/60 p-4 rounded-xl text-xs font-mono text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Wave Start:</span>
                  <span className="text-white font-bold">{selectedRiderForBib.wave_start_time} WIB</span>
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
