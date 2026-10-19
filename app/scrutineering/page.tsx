'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';

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
    prologue_km: 18.5,
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
  const { t } = useLanguage();
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
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] py-14 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FA6D0B] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Ops Header */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-widest block mb-2">
              RACE OPERATIONS // SCRUTINEERING DESK
            </span>
            <h1 className="font-display italic text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              {t('MEJA INSPEKSI & PROLOG 30 KM', 'INSPECTION DESK & 30 KM PROLOGUE')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-mono">
              {t('Venue: ABEEY Coffee Lounge · LRT Harjamukti Cibubur | Waktu: 03:00–05:00 WIB', 'Venue: ABEEY Coffee Lounge · LRT Harjamukti Cibubur | Time: 03:00–05:00 WIB')}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <div className="bg-black/60 backdrop-blur-xl px-5 py-3 rounded-xl text-right shadow-md">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{t('STATUS CLEARANCE', 'CLEARANCE STATUS')}</span>
              <span className="text-xl sm:text-2xl font-black text-white italic">
                {clearedCount} {t('LOLOS', 'CLEARED')} <span className="text-xs text-slate-400 not-italic">/ {candidates.length}</span>
              </span>
            </div>
            <Link
              href="/peserta"
              className="px-5 py-3 rounded-xl bg-black/60 hover:bg-black text-xs font-bold text-slate-200 hover:text-white transition-all uppercase tracking-wider shadow-md"
            >
              {t('ROSTER ATLET //', 'ATHLETE ROSTER //')}
            </Link>
          </div>
        </div>

        {/* 2-Column Ops Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Candidate List & Search (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 font-mono">
            <div className="bg-black/60 rounded-2xl p-5 sm:p-6 space-y-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {t('ANTEAN ATLET SCRUTINEERING', 'SCRUTINEERING QUEUE')}
                </span>
                <span className="text-xs font-bold text-[#FA6D0B]">
                  {waitingCount} {t('MENUNGGU', 'WAITING')}
                </span>
              </div>

              {/* Quick Search */}
              <div>
                <input
                  type="text"
                  placeholder={t('Cari No. BIB / Nama...', 'Search BIB No. / Rider Name...')}
                  value={searchBib}
                  onChange={(e) => setSearchBib(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#FA6D0B]"
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
                      type="button"
                      onClick={() => handleSelectRider(c)}
                      className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between cursor-pointer shadow-sm ${
                        selectedRider?.bib === c.bib
                          ? 'bg-black/90 ring-2 ring-[#FA6D0B] shadow-[0_0_20px_rgba(250,109,11,0.25)]'
                          : 'bg-black/40 hover:bg-black/60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-black text-[#FA6D0B]">
                            #{c.bib}
                          </span>
                          <span className="font-bold text-sm text-white font-sans">{c.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          {c.category} · {c.wave}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {c.chapter}
                        </div>
                      </div>

                      <div className="text-right text-xs font-bold">
                        {c.clearance_status === 'CLEARED' ? (
                          <span className="text-white">
                            [LOLOS]
                          </span>
                        ) : c.clearance_status === 'DNS' ? (
                          <span className="text-slate-400">
                            [DITOLAK]
                          </span>
                        ) : (
                          <span className="text-[#FA6D0B]">
                            [CEK FISIK]
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
              <div className="bg-black/60 rounded-2xl p-6 sm:p-7 space-y-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] font-mono">
                
                {/* Rider Header Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-black font-display italic text-[#FA6D0B]">
                        BIB #{selectedRider.bib}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-white font-sans">{selectedRider.name}</h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      {selectedRider.category} · {selectedRider.wave} · {selectedRider.chapter}
                    </p>
                  </div>

                  <div>
                    {selectedRider.clearance_status === 'CLEARED' ? (
                      <span className="text-white text-xs font-bold uppercase tracking-wider block">
                        [CLEARED FOR START]
                      </span>
                    ) : (
                      <span className="text-[#FA6D0B] text-xs font-bold uppercase tracking-wider block">
                        [INSPEKSI DIPERLUKAN]
                      </span>
                    )}
                  </div>
                </div>

                {/* Section 1: Prologue 30 km Verification */}
                <div className="p-4 sm:p-5 rounded-xl bg-black/60 backdrop-blur-xl space-y-3 shadow-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FA6D0B]">
                      1. {t('VERIFIKASI PROLOG 30 KM (03:00–05:00 WIB)', '1. 30 KM PROLOGUE VERIFICATION (03:00–05:00 WIB)')}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {selectedRider.prologue_required ? t('WAJIB (150K & 200K)', 'MANDATORY (150K & 200K)') : t('TIDAK WAJIB', 'NOT REQUIRED')}
                    </span>
                  </div>

                  {selectedRider.prologue_required ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {t(
                          'Cek rekaman GPS Strava / Garmin / Wahoo peserta sebelum jam 05:00 WIB di venue ABEEY Coffee. Jarak minimal wajib adalah persis 30.0 km.',
                          'Verify rider Strava / Garmin / Wahoo GPS activity logs before 05:00 WIB at ABEEY Coffee. Mandatory minimum distance is 30.0 km.'
                        )}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 block mb-1">
                            {t('JARAK TEMPUH GPS TERCATAT (KM):', 'RECORDED GPS DISTANCE (KM):')}
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={prologKmInput}
                            onChange={(e) => setPrologKmInput(e.target.value)}
                            className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-base font-display italic font-bold text-white focus:outline-none focus:border-[#FA6D0B]"
                          />
                        </div>

                        <div className="pt-2 sm:pt-4">
                          {parseFloat(prologKmInput) >= 30.0 ? (
                            <div className="p-3 rounded-xl bg-white/10 text-white text-xs font-bold uppercase shadow-inner">
                              // {t('SYARAT TERPENUHI (≥ 30 KM) · PROLOG VALID', 'REQUIREMENT MET (≥ 30 KM) · PROLOGUE VALID')}
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-black/80 text-[#FA6D0B] text-xs font-bold uppercase shadow-inner">
                              // {t('KURANG DARI 30.0 KM! DENY START', 'LESS THAN 30.0 KM! DENY START')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic font-sans">
                      {t('Kategori ini tidak memiliki syarat prolog 30 km. Langsung lanjutkan ke inspeksi kelayakan sepeda.', 'This category does not require the 30 km prologue. Proceed directly to bike inspection.')}
                    </p>
                  )}
                </div>

                {/* Section 2: Technical Equipment Checklist */}
                <div className="space-y-3">
                  <div className="border-b border-white/10 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FA6D0B]">
                      2. {t('STANDAR KESELAMATAN & PERLENGKAPAN WAJIB', '2. MANDATORY SAFETY & GEAR STANDARDS')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-black/60 hover:bg-black/80 transition-colors cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={chkHelmet}
                        onChange={(e) => setChkHelmet(e.target.checked)}
                        className="rounded border-white/20 text-[#FA6D0B] accent-[#FA6D0B] focus:ring-0"
                      />
                      <span className="text-slate-200">{t('Helm Bersertifikasi CE/CPSC', 'CE/CPSC Certified Helmet')}</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-black/60 hover:bg-black/80 transition-colors cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={chkFrontLight}
                        onChange={(e) => setChkFrontLight(e.target.checked)}
                        className="rounded border-white/20 text-[#FA6D0B] accent-[#FA6D0B] focus:ring-0"
                      />
                      <span className="text-slate-200">{t('Lampu Depan Ganda (Min 400lm + Backup)', 'Dual Front Lights (Min 400lm + Backup)')}</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-black/60 hover:bg-black/80 transition-colors cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={chkRearLight}
                        onChange={(e) => setChkRearLight(e.target.checked)}
                        className="rounded border-white/20 text-[#FA6D0B] accent-[#FA6D0B] focus:ring-0"
                      />
                      <span className="text-slate-200">{t('Lampu Belakang Merah Steady', 'Dual Rear Lights (Steady Red)')}</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-black/60 hover:bg-black/80 transition-colors cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={chkReflective}
                        onChange={(e) => setChkReflective(e.target.checked)}
                        className="rounded border-white/20 text-[#FA6D0B] accent-[#FA6D0B] focus:ring-0"
                      />
                      <span className="text-slate-200">{t('Rompi Reflektif / Sash', 'Reflective Vest / Sash')}</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-black/60 hover:bg-black/80 transition-colors cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={chkTools}
                        onChange={(e) => setChkTools(e.target.checked)}
                        className="rounded border-white/20 text-[#FA6D0B] accent-[#FA6D0B] focus:ring-0"
                      />
                      <span className="text-slate-200">{t('Tubeless Plug Kit / Ban Dalam & Wet Lube', 'Tubeless Plug Kit / Inner Tube & Wet Lube')}</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-black/60 hover:bg-black/80 transition-colors cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={chkEmergencyContact}
                        onChange={(e) => setChkEmergencyContact(e.target.checked)}
                        className="rounded border-white/20 text-[#FA6D0B] accent-[#FA6D0B] focus:ring-0"
                      />
                      <span className="text-slate-200">{t('Kontak Darurat SPGDT Hermina Tersimpan', 'SPGDT Hermina Emergency Contact Saved')}</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-black/60 hover:bg-black/80 transition-colors cursor-pointer sm:col-span-2 shadow-sm">
                      <input
                        type="checkbox"
                        checked={chkTyreWidth}
                        onChange={(e) => setChkTyreWidth(e.target.checked)}
                        className="rounded border-white/20 text-[#FA6D0B] accent-[#FA6D0B] focus:ring-0"
                      />
                      <span className="text-slate-200">{t('Lebar Ban Layak (≥ 35c, disarankan 38–45c)', 'Tire Width Standard (≥ 35c, recommended 38–45c)')}</span>
                    </label>
                  </div>
                </div>

                {/* Section 3: Notes & Action Button */}
                <div className="space-y-4 pt-2 border-t border-white/10">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      {t('CATATAN TAMBAHAN MARSHAL (OPSIONAL):', 'MARSHAL INSPECTION NOTES (OPTIONAL):')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('Catatan teknis perlengkapan...', 'Technical gear notes...')}
                      value={marshallNote}
                      onChange={(e) => setMarshallNote(e.target.value)}
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:border-[#FA6D0B]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleApproveClearance}
                      className="flex-1 py-4 px-6 rounded-full font-black text-xs font-sans uppercase tracking-wider bg-[#FA6D0B] hover:bg-[#DE5A00] text-black shadow-[0_0_25px_rgba(250,109,11,0.4)] transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
                    >
                      {t('SETUJUI & TERBITKAN IZIN START (WAVE CLEARANCE)', 'APPROVE & ISSUE WAVE CLEARANCE')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        alert(t(`BIB #${selectedRider.bib} ditandai butuh perbaikan perlengkapan sebelum 05:00 WIB.`, `BIB #${selectedRider.bib} marked pending gear correction before 05:00 WIB.`));
                      }}
                      className="py-4 px-6 rounded-full text-xs font-bold font-mono bg-black/60 hover:bg-black text-slate-300 border border-white/20 transition-all uppercase tracking-wider cursor-pointer"
                    >
                      {t('TAHAN (PENDING GEAR)', 'HOLD (PENDING GEAR)')}
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-black/60 rounded-2xl p-12 text-center text-slate-400 font-mono shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                {t('Pilih atlet dari daftar antrean sebelah kiri untuk memulai pemeriksaan.', 'Select a rider from the queue on the left to start inspection.')}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
