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
  { id: '200', label: '200 KM ULTRA' },
  { id: '150', label: '150 KM CROSS' },
  { id: '120_SINGLE', label: '120 KM SINGLE' },
  { id: '120_PAIR', label: '120 KM PAIR MIX' },
  { id: '80', label: '80 KM URBAN' },
  { id: '60', label: '60 KM URBAN' },
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
    <div className="min-h-screen bg-brand-base text-brand-light py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="border-b border-brand-border pb-8">
          <div className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-2 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            <span>OFFICIAL START LIST // RIDER ROSTER 2026</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            ROSTER ATLET & WAVE ALLOCATION
          </h1>
          <p className="mt-3 text-sm sm:text-base text-brand-muted max-w-3xl leading-relaxed">
            Daftar peserta terkonfirmasi, alokasi gelombang start (Wave 1 / 2 / 3), status verifikasi 
            prolog 30 km (03:00–05:00 WIB), serta representasi 19 Chapter Regional GX-ID se-Indonesia.
          </p>

          {/* Stats Bar */}
          {stats && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 border-t border-l border-brand-border font-mono">
              <div className="border-r border-b border-brand-border p-4 bg-brand-surface">
                <span className="text-[10px] text-brand-muted uppercase tracking-widest block">Total Atlet Masuk</span>
                <span className="font-display text-3xl font-bold text-white mt-1 block">
                  {stats.total}
                </span>
                <span className="text-[11px] text-brand-muted mt-0.5 block">
                  {stats.male} Pria • {stats.female} Wanita
                </span>
              </div>

              <div className="border-r border-b border-brand-border p-4 bg-brand-surface">
                <span className="text-[10px] text-brand-muted uppercase tracking-widest block">120K Pair Mix</span>
                <span className="font-display text-3xl font-bold text-brand-accent mt-1 block">
                  {stats.pair_teams} Tim
                </span>
                <span className="text-[11px] text-brand-muted mt-0.5 block">
                  Format Tandem 2 Pax
                </span>
              </div>

              <div className="border-r border-b border-brand-border p-4 bg-brand-surface">
                <span className="text-[10px] text-brand-muted uppercase tracking-widest block">Prolog 30K Lolos</span>
                <span className="font-display text-3xl font-bold text-white mt-1 block">
                  {stats.prolog_passed} <span className="text-xs text-brand-muted">/ {stats.prolog_required_total}</span>
                </span>
                <span className="text-[11px] text-brand-muted mt-0.5 block">
                  Kategori 150K & 200K
                </span>
              </div>

              <div className="border-r border-b border-brand-border p-4 bg-brand-surface">
                <span className="text-[10px] text-brand-muted uppercase tracking-widest block">Basecamp Start</span>
                <span className="font-display text-xl font-bold text-white mt-2 block">
                  ABEEY COFFEE
                </span>
                <span className="text-[11px] text-brand-muted mt-0.5 block">
                  LRT Harjamukti, Cibubur
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 font-mono">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                type="text"
                placeholder="Cari No. BIB, Nama Rider, atau Chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-surface border border-brand-border rounded-sm pl-10 pr-4 py-2.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent transition-colors font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/scrutineering"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm text-xs font-mono font-semibold border border-brand-border bg-brand-surface hover:bg-brand-surfaceHover text-white transition-colors"
              >
                <span>Scrutineering Desk</span>
              </Link>
              <Link
                href="/daftar"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm text-xs font-display font-bold uppercase tracking-wider bg-brand-accent hover:bg-brand-accentDark text-brand-base shadow-solar transition-all"
              >
                <span>Daftar Rider</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-brand-border">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-brand-accent text-brand-base font-bold'
                    : 'bg-brand-surface text-brand-muted hover:text-white hover:bg-brand-surfaceHover border border-brand-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start List Table */}
        <div className="border border-brand-border bg-brand-surface overflow-hidden shadow-subtle">
          {loading ? (
            <div className="py-20 text-center font-mono">
              <div className="w-8 h-8 border-2 border-brand-border border-t-brand-accent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs text-brand-muted">Memuat Roster Atlet GX-ID...</p>
            </div>
          ) : roster.length === 0 ? (
            <div className="py-20 text-center space-y-2 font-mono">
              <Users className="w-10 h-10 text-brand-muted mx-auto" />
              <p className="text-sm font-semibold text-white">Tidak ada atlet ditemukan</p>
              <p className="text-xs text-brand-muted">
                Sesuaikan kata kunci pencarian atau pilih kategori lain.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-base font-mono text-[11px] tracking-wider text-brand-muted uppercase">
                    <th className="py-3 px-4 font-semibold">BIB #</th>
                    <th className="py-3 px-4 font-semibold">Nama Rider / Skuad</th>
                    <th className="py-3 px-4 font-semibold">Kategori & Wave</th>
                    <th className="py-3 px-4 font-semibold">Chapter Regional</th>
                    <th className="py-3 px-4 font-semibold">Paket</th>
                    <th className="py-3 px-4 font-semibold">Status Scrutineering</th>
                    <th className="py-3 px-4 font-semibold text-right">Plat BIB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border font-mono">
                  {roster.map((rider) => (
                    <tr
                      key={rider.id}
                      className="hover:bg-brand-surfaceHover/80 transition-colors group"
                    >
                      {/* BIB Number */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="inline-block px-2 py-0.5 border border-brand-accent/40 bg-brand-base text-brand-accent font-bold tracking-widest">
                          #{rider.bib_number}
                        </span>
                      </td>

                      {/* Rider Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white group-hover:text-brand-accent transition-colors font-sans text-sm">
                          {rider.full_name}
                        </div>
                        {rider.partner_name && (
                          <div className="flex items-center gap-1 mt-0.5 text-xs text-brand-accent font-medium">
                            <span className="border border-brand-accent/30 px-1 py-0.2 text-[10px] uppercase">
                              Pair
                            </span>
                            <span>& {rider.partner_name}</span>
                          </div>
                        )}
                        <span className="text-[10px] text-brand-muted block mt-0.5">
                          {rider.gender === 'female' ? 'Wanita' : 'Pria'} • Ukuran: {rider.jersey_size}
                        </span>
                      </td>

                      {/* Category & Wave */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">
                          {rider.category_name}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-brand-muted mt-0.5">
                          <Clock className="w-3 h-3 text-brand-accent" />
                          <span>{rider.wave_start_time}</span>
                        </div>
                      </td>

                      {/* Chapter */}
                      <td className="py-3.5 px-4 font-sans text-xs text-brand-muted">
                        {rider.community_chapter}
                      </td>

                      {/* Package */}
                      <td className="py-3.5 px-4 text-xs">
                        {rider.package_type === 'MEDAL_JERSEY' ? (
                          <span className="text-brand-accent font-medium">Medal & Jersey</span>
                        ) : (
                          <span className="text-brand-muted">Medal Saja</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-xs">
                        {rider.prologue_required ? (
                          rider.prologue_status === 'PASSED' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-white/20 bg-white/5 text-white text-[10px] uppercase tracking-wider">
                              <CheckCircle2 className="w-3 h-3" />
                              Prolog Lolos
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-brand-accent/40 bg-brand-accent/10 text-brand-accent text-[10px] uppercase tracking-wider">
                              <AlertTriangle className="w-3 h-3" />
                              Prolog Pending
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-brand-border bg-brand-base text-brand-muted text-[10px] uppercase tracking-wider">
                            Confirmed
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedRiderForBib(rider)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 border border-brand-border hover:border-brand-accent hover:text-brand-accent text-brand-muted text-[11px] font-semibold transition-colors"
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
            <div className="bg-brand-surface border border-brand-border max-w-xl w-full p-6 relative space-y-6 shadow-2xl font-mono">
              <button
                onClick={() => setSelectedRiderForBib(null)}
                className="absolute top-4 right-4 p-2 text-brand-muted hover:text-white border border-brand-border bg-brand-base transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1">
                <span className="text-[10px] text-brand-accent uppercase tracking-widest block">
                  DIGITAL BIKE PLATE VOUCHER
                </span>
                <h3 className="font-display text-2xl font-bold text-white uppercase">
                  BIB #{selectedRiderForBib.bib_number}
                </h3>
                <p className="text-xs text-brand-muted font-sans">
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

              <div className="border border-brand-border bg-brand-base p-3 text-xs text-brand-muted space-y-1">
                <div className="flex justify-between">
                  <span>Wave Start:</span>
                  <span className="text-white font-bold">{selectedRiderForBib.wave_start_time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Start Venue:</span>
                  <span className="text-white">ABEEY Coffee (LRT Harjamukti)</span>
                </div>
                <div className="flex justify-between">
                  <span>Paket:</span>
                  <span className="text-brand-accent font-bold">
                    {selectedRiderForBib.package_type === 'MEDAL_JERSEY' ? 'Medal & Jersey' : 'Medal Saja'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRiderForBib(null)}
                className="w-full py-2.5 border border-brand-border bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider transition-colors"
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
