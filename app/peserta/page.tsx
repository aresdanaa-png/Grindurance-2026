'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Clock, 
  Compass, 
  CheckCircle2, 
  AlertTriangle,
  Eye,
  X,
  ArrowUpRight
} from 'lucide-react';
import BibCard from '@/components/BibCard';

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

const CATEGORY_TABS = [
  { id: 'ALL', label: 'SEMUA KATEGORI' },
  { id: '200', label: '200 ULTRA' },
  { id: '150', label: '150 GRAND FONDO' },
  { id: '120_SINGLE', label: '120 (RACE) SINGLE' },
  { id: '120_PAIR', label: '120 (RACE) PAIR MIX' },
  { id: '100', label: '100 FONDO' },
  { id: '60', label: '60 FUN RIDE' },
  { id: 'VIRTUAL', label: 'VIRTUAL RIDE' },
];

export default function PesertaPage() {
  const [roster, setRoster] = useState<RosterItem[]>([]);
  const [stats, setStats] = useState<RosterStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiderForBib, setSelectedRiderForBib] = useState<RosterItem | null>(null);

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
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-8">
          <div className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest mb-2 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            <span>OFFICIAL START LIST // RIDER ROSTER 2026</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white italic">
            ROSTER ATLET & WAVE ALLOCATION
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Daftar peserta terkonfirmasi, alokasi gelombang start (Wave 1 / 2 / 3), status verifikasi 
            prolog 30 km (03:00–05:00 WIB), serta representasi 19 Chapter Regional GX-ID se-Indonesia.
          </p>

          {/* Stats Bar */}
          {stats && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 border-t border-l border-white/10">
              <div className="border-r border-b border-white/10 p-4 bg-[#15171C]">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Total Atlet Masuk</span>
                <span className="font-display text-3xl font-bold text-white mt-1 block">
                  {stats.total}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block font-medium">
                  {stats.male} Pria • {stats.female} Wanita
                </span>
              </div>

              <div className="border-r border-b border-white/10 p-4 bg-[#15171C]">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">120K Pair Mix</span>
                <span className="font-display text-3xl font-bold text-[#FA6D0B] mt-1 block">
                  {stats.pair_teams} Tim
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block font-medium">
                  Format Tandem 2 Pax
                </span>
              </div>

              <div className="border-r border-b border-white/10 p-4 bg-[#15171C]">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Prolog 30K Lolos</span>
                <span className="font-display text-3xl font-bold text-white mt-1 block">
                  {stats.prolog_passed} <span className="text-xs text-slate-400">/ {stats.prolog_required_total}</span>
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block font-medium">
                  Kategori 150K & 200K
                </span>
              </div>

              <div className="border-r border-b border-white/10 p-4 bg-[#15171C]">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Basecamp Start</span>
                <span className="font-display text-xl font-bold text-white mt-2 block">
                  ABEEY COFFEE
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block font-medium">
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari No. BIB, Nama Rider, atau Chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#15171C] border border-white/10 rounded pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FA6D0B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/scrutineering"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded text-xs font-semibold border border-white/10 bg-[#15171C] hover:bg-[#1D2027] text-white transition-colors"
              >
                <span>Scrutineering Desk</span>
              </Link>
              <Link
                href="/daftar"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded text-xs font-display font-bold uppercase tracking-wider bg-[#FA6D0B] hover:bg-[#D97706] text-black shadow-sm transition-all"
              >
                <span>Daftar Rider</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all rounded ${
                  selectedCategory === tab.id
                    ? 'bg-[#FA6D0B] text-black'
                    : 'bg-[#15171C] text-slate-400 hover:text-white hover:bg-[#1D2027] border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start List Table */}
        <div className="border border-white/10 bg-[#15171C] rounded-lg overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-white/10 border-t-[#FA6D0B] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs text-slate-400">Memuat Roster Atlet GX-ID...</p>
            </div>
          ) : roster.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <Users className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">Tidak ada atlet ditemukan</p>
              <p className="text-xs text-slate-400">
                Sesuaikan kata kunci pencarian atau pilih kategori lain.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0D0E11] text-[11px] tracking-wider text-slate-400 uppercase font-bold">
                    <th className="py-3.5 px-4">BIB #</th>
                    <th className="py-3.5 px-4">Nama Rider / Skuad</th>
                    <th className="py-3.5 px-4">Kategori & Wave</th>
                    <th className="py-3.5 px-4">Chapter Regional</th>
                    <th className="py-3.5 px-4">Paket</th>
                    <th className="py-3.5 px-4">Status Scrutineering</th>
                    <th className="py-3.5 px-4 text-right">Plat BIB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {roster.map((rider) => (
                    <tr
                      key={rider.id}
                      className="hover:bg-[#1D2027]/80 transition-colors group"
                    >
                      {/* BIB Number */}
                      <td className="py-3.5 px-4 font-bold tabular-nums">
                        <span className="inline-block px-2.5 py-0.5 border border-[#FA6D0B]/50 bg-black text-[#FA6D0B] font-bold tracking-wider rounded">
                          #{rider.bib_number}
                        </span>
                      </td>

                      {/* Rider Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white group-hover:text-[#FA6D0B] transition-colors text-sm">
                          {rider.full_name}
                        </div>
                        {rider.partner_name && (
                          <div className="flex items-center gap-1 mt-0.5 text-xs text-[#FA6D0B] font-semibold">
                            <span className="border border-[#FA6D0B]/40 px-1 py-0.2 text-[10px] uppercase rounded">
                              Pair
                            </span>
                            <span>& {rider.partner_name}</span>
                          </div>
                        )}
                        <span className="text-[11px] text-slate-400 block mt-0.5 font-medium">
                          {rider.gender === 'female' ? 'Wanita' : 'Pria'} • Ukuran: {rider.jersey_size}
                        </span>
                      </td>

                      {/* Category & Wave */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">
                          {rider.category_name}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5 font-medium tabular-nums">
                          <Clock className="w-3 h-3 text-[#FA6D0B]" />
                          <span>{rider.wave_start_time}</span>
                        </div>
                      </td>

                      {/* Chapter */}
                      <td className="py-3.5 px-4 text-xs text-slate-300 font-medium">
                        {rider.community_chapter}
                      </td>

                      {/* Package */}
                      <td className="py-3.5 px-4 text-xs">
                        {rider.package_type === 'MEDAL_JERSEY' ? (
                          <span className="text-[#FA6D0B] font-bold">Medal & Jersey</span>
                        ) : (
                          <span className="text-slate-400 font-medium">Medal Saja</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-xs">
                        {rider.prologue_required ? (
                          rider.prologue_status === 'PASSED' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 border border-white/20 bg-white/5 text-white text-[10px] uppercase tracking-wider font-bold rounded">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                              Prolog Lolos
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#FA6D0B]/40 bg-[#FA6D0B]/10 text-[#FA6D0B] text-[10px] uppercase tracking-wider font-bold rounded">
                              <AlertTriangle className="w-3 h-3" />
                              Prolog Pending
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 border border-white/10 bg-black/40 text-slate-300 text-[10px] uppercase tracking-wider font-medium rounded">
                            Confirmed
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedRiderForBib(rider)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded border border-white/15 hover:border-[#FA6D0B] hover:text-[#FA6D0B] text-slate-300 text-[11px] font-bold transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Plat</span>
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
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#15171C] border border-white/15 max-w-xl w-full p-6 rounded-lg relative space-y-6 shadow-2xl">
              <button
                onClick={() => setSelectedRiderForBib(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white border border-white/10 bg-black rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1">
                <span className="text-[10px] text-[#FA6D0B] uppercase tracking-widest font-bold block">
                  DIGITAL BIKE PLATE VOUCHER
                </span>
                <h3 className="font-display text-2xl font-bold text-white uppercase italic">
                  BIB #{selectedRiderForBib.bib_number}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedRiderForBib.full_name} • {selectedRiderForBib.community_chapter}
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

              <div className="border border-white/10 bg-black/60 p-3.5 rounded text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span>Wave Start:</span>
                  <span className="text-white font-bold">{selectedRiderForBib.wave_start_time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Start Venue:</span>
                  <span className="text-white font-medium">ABEEY Coffee (LRT Harjamukti)</span>
                </div>
                <div className="flex justify-between">
                  <span>Paket:</span>
                  <span className="text-[#FA6D0B] font-bold">
                    {selectedRiderForBib.package_type === 'MEDAL_JERSEY' ? 'Medal & Jersey' : 'Medal Saja'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRiderForBib(null)}
                className="w-full py-2.5 rounded border border-white/10 bg-black hover:bg-zinc-900 text-white text-xs uppercase tracking-wider font-bold transition-colors"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
