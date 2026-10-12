'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Eye,
  X,
  Bike
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
  { id: 'ALL', label: 'Semua Kategori' },
  { id: '200', label: '200 KM Ultra' },
  { id: '150', label: '150 KM Cross' },
  { id: '120_SINGLE', label: '120 KM Race Single' },
  { id: '120_PAIR', label: '120 KM Pair Mix' },
  { id: '80', label: '80 KM Urban' },
  { id: '60', label: '60 KM Urban' },
  { id: 'VIRTUAL', label: 'Virtual Ride' },
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
    <div className="min-h-screen bg-brand-dark text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="border-b border-brand-border/60 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            Official Start List & Rider Roster
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Roster Atlet <span className="text-brand-gold">Grindurance 2026</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            Daftar peserta terkonfirmasi, jadwal pelepasan gelombang (Wave Start), status verifikasi 
            prolog 30 km (03:00–05:00 WIB), serta representasi 19 Chapter Regional GX-ID.
          </p>

          {/* Stats Cards modeled after international race boards */}
          {stats && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-brand-card/90 border border-brand-border/60 rounded-2xl p-4">
                <span className="text-xs font-mono text-slate-400 block uppercase">Total Atlet Masuk</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 block">
                  {stats.total}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {stats.male} Pria • {stats.female} Wanita
                </span>
              </div>

              <div className="bg-brand-card/90 border border-brand-border/60 rounded-2xl p-4">
                <span className="text-xs font-mono text-brand-gold block uppercase">120K Pair Mix Teams</span>
                <span className="text-2xl sm:text-3xl font-black text-brand-gold font-mono mt-1 block">
                  {stats.pair_teams} Tim
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Format Tandem 2 Pax
                </span>
              </div>

              <div className="bg-brand-card/90 border border-brand-border/60 rounded-2xl p-4">
                <span className="text-xs font-mono text-emerald-400 block uppercase">Prolog 30 km Lolos</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1 block">
                  {stats.prolog_passed} <span className="text-sm text-slate-400">/ {stats.prolog_required_total}</span>
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Kategori 150K & 200K
                </span>
              </div>

              <div className="bg-brand-card/90 border border-brand-border/60 rounded-2xl p-4">
                <span className="text-xs font-mono text-brand-sky block uppercase">Titik Kumpul Start</span>
                <span className="text-base sm:text-lg font-bold text-white mt-1 block">
                  ABEEY Coffee
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
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
                className="w-full bg-brand-card border border-brand-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold transition-colors font-mono"
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

            <div className="flex items-center gap-2">
              <Link
                href="/scrutineering"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-slate-200 border border-zinc-700 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                Scrutineering Desk (Panitia)
              </Link>
              <Link
                href="/daftar"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-gold text-brand-dark hover:brightness-110 shadow-glow transition-all"
              >
                Daftar Sebagai Rider
              </Link>
            </div>
          </div>

          {/* Category Pills (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-brand-gold text-brand-dark font-bold shadow-sm'
                    : 'bg-brand-card/60 text-slate-400 hover:text-white hover:bg-brand-card border border-brand-border/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start List Table */}
        <div className="bg-brand-card/80 border border-brand-border/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-mono text-slate-400">Memuat Roster Atlet GX-ID...</p>
            </div>
          ) : roster.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Users className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-base font-semibold text-slate-300">Tidak ada atlet ditemukan</p>
              <p className="text-xs text-slate-500 font-mono">
                Coba sesuaikan kata kunci pencarian atau pilih kategori lain.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-border/60 bg-zinc-900/60 text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                    <th className="py-3.5 px-4 font-semibold">BIB #</th>
                    <th className="py-3.5 px-4 font-semibold">Nama Rider / Skuad</th>
                    <th className="py-3.5 px-4 font-semibold">Kategori & Wave</th>
                    <th className="py-3.5 px-4 font-semibold">Chapter Regional</th>
                    <th className="py-3.5 px-4 font-semibold">Paket</th>
                    <th className="py-3.5 px-4 font-semibold">Status Scrutineering</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Plat BIB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40 font-mono">
                  {roster.map((rider) => (
                    <tr
                      key={rider.id}
                      className="hover:bg-brand-cardHover/50 transition-colors group"
                    >
                      {/* BIB Number */}
                      <td className="py-4 px-4 font-mono">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-zinc-900 border border-brand-gold/40 text-brand-gold font-bold text-sm tracking-widest shadow-sm">
                          #{rider.bib_number}
                        </span>
                      </td>

                      {/* Rider Name */}
                      <td className="py-4 px-4 font-sans">
                        <div className="font-bold text-white group-hover:text-brand-gold transition-colors">
                          {rider.full_name}
                        </div>
                        {rider.partner_name && (
                          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-brand-gold font-medium">
                            <span className="px-1.5 py-0.2 bg-brand-gold/15 rounded text-[10px] font-mono uppercase">
                              Pair Mix
                            </span>
                            <span>& {rider.partner_name}</span>
                          </div>
                        )}
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                          {rider.gender === 'female' ? 'Wanita' : 'Pria'} • Ukuran: {rider.jersey_size}
                        </span>
                      </td>

                      {/* Category & Wave */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-200">
                          {rider.category_name}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5 font-mono">
                          <Clock className="w-3 h-3 text-brand-orange" />
                          <span>{rider.wave_start_time}</span>
                        </div>
                      </td>

                      {/* Chapter */}
                      <td className="py-4 px-4 font-sans">
                        <span className="text-xs text-slate-300 block font-medium">
                          {rider.community_chapter}
                        </span>
                      </td>

                      {/* Package */}
                      <td className="py-4 px-4 font-mono text-xs">
                        {rider.package_type === 'MEDAL_JERSEY' ? (
                          <span className="inline-flex items-center gap-1 text-brand-gold font-semibold">
                            <Sparkles className="w-3 h-3" />
                            Medal & Jersey
                          </span>
                        ) : (
                          <span className="text-slate-400">Medal Saja</span>
                        )}
                      </td>

                      {/* Status Scrutineering / Prolog */}
                      <td className="py-4 px-4 font-mono text-xs">
                        {rider.prologue_required ? (
                          rider.prologue_status === 'PASSED' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
                              <CheckCircle2 className="w-3 h-3" />
                              Prolog 30K Lolos
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold text-[11px]">
                              <AlertTriangle className="w-3 h-3" />
                              Prolog Pending
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-slate-400" />
                            Confirmed
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedRiderForBib(rider)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-brand-gold hover:text-brand-dark text-slate-300 text-xs font-semibold transition-all border border-zinc-700 hover:border-brand-gold"
                        >
                          <Eye className="w-3.5 h-3.5" />
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
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-brand-card border border-brand-border rounded-2xl max-w-xl w-full p-6 relative space-y-6 shadow-2xl">
              <button
                onClick={() => setSelectedRiderForBib(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">
                  Digital Bike Plate Voucher
                </span>
                <h3 className="text-xl font-black text-white uppercase">
                  Nomor BIB #{selectedRiderForBib.bib_number}
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

              <div className="bg-zinc-900/80 border border-brand-border/40 rounded-xl p-3.5 text-xs text-slate-400 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Wave Start Time:</span>
                  <span className="font-mono text-white font-semibold">{selectedRiderForBib.wave_start_time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Venue Kumpul:</span>
                  <span className="text-white font-medium">ABEEY Coffee (LRT Harjamukti)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Paket Terdaftar:</span>
                  <span className="font-mono text-brand-gold">
                    {selectedRiderForBib.package_type === 'MEDAL_JERSEY' ? 'Medal & Jersey' : 'Medal Saja'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRiderForBib(null)}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors"
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
