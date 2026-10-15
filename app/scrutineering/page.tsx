'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Bike, 
  Lightbulb, 
  Activity, 
  PhoneCall, 
  Sparkles,
  ChevronRight,
  RefreshCw,
  QrCode
} from 'lucide-react';

interface ScrutineerCandidate {
  bib: number;
  name: string;
  category: string;
  distance_km: number;
  wave: string;
  chapter: string;
  prologue_required: boolean;
  prologue_km?: number;
  prologue_status?: 'NOT_REQUIRED' | 'PENDING' | 'PASSED' | 'REJECTED';
  gear_cleared: boolean;
  clearance_status: 'WAITING' | 'CLEARED' | 'DNS';
}

const SAMPLE_CANDIDATES: ScrutineerCandidate[] = [
  {
    bib: 2001,
    name: 'Bagus Setyawan',
    category: '200 Ultra',
    distance_km: 200,
    wave: 'Wave 1 (05:30 WIB)',
    chapter: 'GX-ID Chapter Bandung Barat',
    prologue_required: true,
    prologue_km: 32.4,
    prologue_status: 'PASSED',
    gear_cleared: true,
    clearance_status: 'CLEARED',
  },
  {
    bib: 2002,
    name: 'Donny Prasetya',
    category: '200 Ultra',
    distance_km: 200,
    wave: 'Wave 1 (05:30 WIB)',
    chapter: 'GX-ID Chapter Jakarta Selatan',
    prologue_required: true,
    prologue_km: 0,
    prologue_status: 'PENDING',
    gear_cleared: false,
    clearance_status: 'WAITING',
  },
  {
    bib: 1501,
    name: 'Rian Hidayat',
    category: '150 Grand Fondo',
    distance_km: 150,
    wave: 'Wave 1 (05:30 WIB)',
    chapter: 'GX-ID Chapter Bekasi Pesisir',
    prologue_required: true,
    prologue_km: 31.1,
    prologue_status: 'PASSED',
    gear_cleared: true,
    clearance_status: 'CLEARED',
  },
  {
    bib: 1502,
    name: 'Faisal Ramadhan',
    category: '150 Grand Fondo',
    distance_km: 150,
    wave: 'Wave 1 (05:30 WIB)',
    chapter: 'GX-ID Chapter Solo Raya',
    prologue_required: true,
    prologue_km: 18.5, // Kurang dari 30km!
    prologue_status: 'PENDING',
    gear_cleared: false,
    clearance_status: 'WAITING',
  },
  {
    bib: 1201,
    name: 'Hendrik Wijaya',
    category: '120 (Race) Single',
    distance_km: 120,
    wave: 'Wave 2 (06:00 WIB)',
    chapter: 'GX-ID Chapter Tangerang Raya',
    prologue_required: false,
    prologue_status: 'NOT_REQUIRED',
    gear_cleared: true,
    clearance_status: 'CLEARED',
  },
];

export default function ScrutineeringPage() {
  const [candidates, setCandidates] = useState<ScrutineerCandidate[]>(SAMPLE_CANDIDATES);
  const [searchBib, setSearchBib] = useState('');
  const [selectedRider, setSelectedRider] = useState<ScrutineerCandidate>(SAMPLE_CANDIDATES[1]); // default to Donny (pending)

  // Inspection Checklist State for active rider
  const [prologKmInput, setPrologKmInput] = useState<string>('30.5');
  const [chkHelmet, setChkHelmet] = useState(true);
  const [chkFrontLight, setChkFrontLight] = useState(true);
  const [chkRearLight, setChkRearLight] = useState(true);
  const [chkReflective, setChkReflective] = useState(true);
  const [chkTools, setChkTools] = useState(true);
  const [chkEmergencyContact, setChkEmergencyContact] = useState(true);
  const [chkTyreWidth, setChkTyreWidth] = useState(true);
  const [marshallNote, setMarshallNote] = useState('');

  const handleSelectRider = (rider: ScrutineerCandidate) => {
    setSelectedRider(rider);
    setPrologKmInput(rider.prologue_km ? rider.prologue_km.toString() : '30.0');
  };

  const handleApproveClearance = () => {
    if (!selectedRider) return;

    const recordedKm = parseFloat(prologKmInput) || 0;
    const isPrologPass = !selectedRider.prologue_required || recordedKm >= 30.0;

    const updated = candidates.map((c) => {
      if (c.bib === selectedRider.bib) {
        return {
          ...c,
          prologue_km: recordedKm,
          prologue_status: isPrologPass ? 'PASSED' : 'REJECTED',
          gear_cleared: true,
          clearance_status: isPrologPass ? 'CLEARED' : 'DNS',
        } as ScrutineerCandidate;
      }
      return c;
    });

    setCandidates(updated);
    setSelectedRider({
      ...selectedRider,
      prologue_km: recordedKm,
      prologue_status: isPrologPass ? 'PASSED' : 'REJECTED',
      gear_cleared: true,
      clearance_status: isPrologPass ? 'CLEARED' : 'DNS',
    });
  };

  const clearedCount = candidates.filter((c) => c.clearance_status === 'CLEARED').length;
  const waitingCount = candidates.filter((c) => c.clearance_status === 'WAITING').length;

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Ops Header */}
        <div className="border-b border-brand-border/60 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-sans font-bold uppercase mb-2">
              <ShieldCheck className="w-4 h-4" />
              Race Operations — Scrutineering Desk
            </div>
            <h1 className="font-display italic text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Meja Inspeksi <span className="text-brand-gold">& Prolog 30 KM</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Venue: ABEEY Coffee Lounge • LRT Harjamukti Cibubur | Waktu: 03:00–05:00 WIB
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 border border-brand-border/60 px-4 py-2 rounded-xl text-right">
              <span className="text-[10px] font-sans font-semibold text-slate-400 block uppercase">Status Wave Clearance</span>
              <span className="text-xl font-black font-display italic text-emerald-400">
                {clearedCount} Lolos <span className="text-xs font-sans text-slate-500">/ {candidates.length}</span>
              </span>
            </div>
            <Link
              href="/peserta"
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold font-sans text-slate-200 border border-zinc-700 transition-colors uppercase tracking-wider"
            >
              Start List Roster
            </Link>
          </div>
        </div>

        {/* 2-Column Ops Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Candidate List & Search (4 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-brand-card/90 border border-brand-border/60 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-300">
                  Antrean Atlet Scrutineering
                </h3>
                <span className="text-[11px] font-sans font-bold text-brand-gold">
                  {waitingCount} Menunggu
                </span>
              </div>

              {/* Quick Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari No. BIB / Nama..."
                  value={searchBib}
                  onChange={(e) => setSearchBib(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 font-sans focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* Candidates List */}
              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {candidates
                  .filter((c) => 
                    c.name.toLowerCase().includes(searchBib.toLowerCase()) || 
                    c.bib.toString().includes(searchBib)
                  )
                  .map((c) => (
                    <button
                      key={c.bib}
                      onClick={() => handleSelectRider(c)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        selectedRider?.bib === c.bib
                          ? 'bg-zinc-800/90 border-brand-gold shadow-md'
                          : 'bg-zinc-900/60 border-brand-border/40 hover:bg-zinc-800/50 hover:border-zinc-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display italic text-sm font-black text-brand-gold bg-black px-1.5 py-0.5 rounded border border-brand-gold/30">
                            #{c.bib}
                          </span>
                          <span className="font-bold text-sm text-white font-sans">{c.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans font-medium">
                          {c.category} • {c.wave}
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans">
                          {c.chapter}
                        </div>
                      </div>

                      <div className="text-right">
                        {c.clearance_status === 'CLEARED' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            LOLOS
                          </span>
                        ) : c.clearance_status === 'DNS' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/30">
                            <XCircle className="w-3 h-3" />
                            REJECTED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                            <Clock className="w-3 h-3" />
                            CEK FISIK
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Marshall Inspection Workbench (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {selectedRider ? (
              <div className="bg-brand-card border border-brand-border/80 rounded-2xl p-6 space-y-6 shadow-xl">
                
                {/* Rider Header Card */}
                <div className="flex items-start justify-between border-b border-brand-border/60 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black font-display italic text-brand-gold">
                        BIB #{selectedRider.bib}
                      </span>
                      <h2 className="text-xl font-bold text-white font-sans">{selectedRider.name}</h2>
                    </div>
                    <p className="text-xs font-sans text-slate-400 mt-1 font-medium">
                      {selectedRider.category} • {selectedRider.wave} • {selectedRider.chapter}
                    </p>
                  </div>

                  <div>
                    {selectedRider.clearance_status === 'CLEARED' ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-sans font-bold inline-flex items-center gap-1.5 uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        CLEARED FOR START
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-sans font-bold inline-flex items-center gap-1.5 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4" />
                        INSPEKSI DIPERLUKAN
                      </span>
                    )}
                  </div>
                </div>

                {/* Section 1: Prologue 30 km Verification */}
                <div className={`p-4 rounded-xl border ${
                  selectedRider.prologue_required 
                    ? 'bg-zinc-900/90 border-brand-gold/40' 
                    : 'bg-zinc-900/40 border-zinc-800'
                } space-y-3`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-200">
                        1. Verifikasi Prolog 30 KM (Mandiri 03:00–05:00 WIB)
                      </h4>
                    </div>
                    <span className="text-[11px] font-sans font-bold text-slate-400">
                      {selectedRider.prologue_required ? 'WAJIB (150K & 200K)' : 'TIDAK WAJIB'}
                    </span>
                  </div>

                  {selectedRider.prologue_required ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        Cek rekaman GPS Strava / Garmin / Wahoo peserta sebelum jam 05:00 WIB di ABEEY Coffee. 
                        Jarak minimal wajib adalah <strong>30.0 km</strong>.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                        <div>
                          <label className="text-[11px] font-sans font-bold text-slate-400 block mb-1">
                            Jarak Tempuh GPS Tercatat (KM):
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={prologKmInput}
                            onChange={(e) => setPrologKmInput(e.target.value)}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-base font-display italic font-bold text-white focus:outline-none focus:border-brand-gold"
                          />
                        </div>

                        <div className="pt-4 sm:pt-0">
                          {parseFloat(prologKmInput) >= 30.0 ? (
                            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-sans font-semibold flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span>Memenuhi syarat (≥ 30 km). Prolog Valid!</span>
                            </div>
                          ) : (
                            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-sans font-semibold flex items-center gap-2">
                              <XCircle className="w-4 h-4 shrink-0" />
                              <span>Kurang dari 30.0 km! Tidak memenuhi syarat prolog.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic font-sans">
                      Kategori ini tidak memiliki syarat prolog 30 km. Langsung lanjutkan ke inspeksi perlengkapan.
                    </p>
                  )}
                </div>

                {/* Section 2: Technical Equipment Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-brand-orange" />
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-200">
                      2. Standar Keselamatan & Perlengkapan Wajib (Scrutineering)
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
                    <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={chkHelmet}
                        onChange={(e) => setChkHelmet(e.target.checked)}
                        className="rounded border-zinc-700 text-brand-gold focus:ring-0"
                      />
                      <span className="text-slate-200">Helm Standar CE/CPSC (Kencang & utuh)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={chkFrontLight}
                        onChange={(e) => setChkFrontLight(e.target.checked)}
                        className="rounded border-zinc-700 text-brand-gold focus:ring-0"
                      />
                      <span className="text-slate-200">Lampu Depan Ganda (Utama &gt;500lm + Backup)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={chkRearLight}
                        onChange={(e) => setChkRearLight(e.target.checked)}
                        className="rounded border-zinc-700 text-brand-gold focus:ring-0"
                      />
                      <span className="text-slate-200">Lampu Belakang Ganda (Merah Steady)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={chkReflective}
                        onChange={(e) => setChkReflective(e.target.checked)}
                        className="rounded border-zinc-700 text-brand-gold focus:ring-0"
                      />
                      <span className="text-slate-200">Rompi Reflektif / Sash (EN ISO 20471)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={chkTools}
                        onChange={(e) => setChkTools(e.target.checked)}
                        className="rounded border-zinc-700 text-brand-gold focus:ring-0"
                      />
                      <span className="text-slate-200">Tubeless Plug Kit / Ban Dalam & Pompa</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={chkEmergencyContact}
                        onChange={(e) => setChkEmergencyContact(e.target.checked)}
                        className="rounded border-zinc-700 text-brand-gold focus:ring-0"
                      />
                      <span className="text-slate-200">Kontak Darurat SPGDT RS Hermina Tersimpan</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={chkTyreWidth}
                        onChange={(e) => setChkTyreWidth(e.target.checked)}
                        className="rounded border-zinc-700 text-brand-gold focus:ring-0"
                      />
                      <span className="text-slate-200">Rekomendasi Ban (≥ 38c, optimal 45c untuk makadam Sodong)</span>
                    </label>
                  </div>
                </div>

                {/* Section 3: Notes & Action Button */}
                <div className="space-y-4 pt-2 border-t border-brand-border/60">
                  <div>
                    <label className="text-[11px] font-sans font-bold text-slate-400 block mb-1">
                      Catatan Tambahan Marshall (Opsional):
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Lampu cadangan baterai baru, stiker scrutineering #04 ditempel di fork kiri..."
                      value={marshallNote}
                      onChange={(e) => setMarshallNote(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 font-sans focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleApproveClearance}
                      className="flex-1 py-3 px-4 rounded-xl font-bold font-sans text-xs uppercase tracking-wider bg-brand-gold hover:brightness-110 text-brand-dark shadow-glow transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      Setujui & Terbitkan Izin Start (Wave Clearance)
                    </button>
                    <button
                      onClick={() => {
                        alert(`BIB #${selectedRider.bib} ditandai butuh perbaikan perlengkapan sebelum 05:00 WIB.`);
                      }}
                      className="py-3 px-4 rounded-xl font-sans text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-slate-300 border border-zinc-700 transition-colors uppercase tracking-wider"
                    >
                      Tahan (Pending Gear)
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-brand-card border border-brand-border/60 rounded-2xl p-12 text-center text-slate-400">
                Pilih atlet dari daftar antrean sebelah kiri untuk memulai pemeriksaan.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
