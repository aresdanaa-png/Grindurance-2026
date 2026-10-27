'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CheckpointPage() {
  const { t } = useLanguage();
  const [bibNumber, setBibNumber] = useState('2001');
  const [riderName, setRiderName] = useState('Bagus Setyawan (Ultra Gravel 200)');
  const [selectedCp, setSelectedCp] = useState('CP_A');
  const [actualRestMinutes, setActualRestMinutes] = useState(18);

  const MANDATORY_REST_MIN = 30;
  const PENALTY_MULTIPLIER = 3.0; // 300%

  // Calculations
  const isViolated = actualRestMinutes < MANDATORY_REST_MIN;
  const violationMinutes = isViolated ? MANDATORY_REST_MIN - actualRestMinutes : 0;
  const penaltyMinutes = violationMinutes * PENALTY_MULTIPLIER;

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] py-14 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FA6D0B] selection:text-black">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-widest block mb-2">
            RACE OPERATIONS // CHECKPOINT &amp; DWELL TIME ENGINE
          </span>
          <h1 className="font-display italic text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            {t('KALKULATOR & LOG MANDATORY PITSTOP', 'CALCULATOR & MANDATORY PITSTOP LOG')}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed font-sans">
            {t(
              'Implementasi aturan resmi GX-ID: Istirahat wajib minimal 30 menit di titik checkpoint pitstop resmi (TBA). Pelanggaran keberangkatan dini dikenakan penalti 300% dari sisa waktu istirahat yang tidak dipenuhi.',
              'Official GX-ID rule implementation: Mandatory 30-minute rest at designated official checkpoint pitstop (TBA). Early departure incurs a 300% penalty on the unfulfilled mandatory dwell time.'
            )}
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Form & Controls (7 Cols) */}
          <div className="md:col-span-7 bg-black/60 rounded-2xl p-6 sm:p-7 space-y-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider block">
                01 // {t('PENCATATAN WAKTU CHECKPOINT', 'CHECKPOINT DWELL TIME RECORDING')}
              </span>
              <span className="font-mono text-xs text-slate-400 uppercase">
                {t('ATURAN RESMI GX-ID', 'OFFICIAL GX-ID RULE')}
              </span>
            </div>

            {/* Checkpoint selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono">
              <button
                type="button"
                onClick={() => setSelectedCp('CP_A')}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer shadow-lg ${
                  selectedCp === 'CP_A'
                    ? 'bg-black/90 ring-2 ring-[#FA6D0B] shadow-[0_0_25px_rgba(250,109,11,0.25)]'
                    : 'bg-black/40 hover:bg-black/60'
                }`}
              >
                <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-bold">{t('LOKASI RESMI (TBA)', 'OFFICIAL LOCATION (TBA)')}</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-0.5 uppercase">{t('POS PITSTOP RESMI A', 'OFFICIAL PITSTOP A')}</span>
                <span className="text-xs text-[#FA6D0B] font-bold mt-1 block uppercase">{t('Kategori 120, 150, 200 km', 'Categories 120, 150, 200 km')}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCp('CP_B')}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer shadow-lg ${
                  selectedCp === 'CP_B'
                    ? 'bg-black/90 ring-2 ring-[#FA6D0B] shadow-[0_0_25px_rgba(250,109,11,0.25)]'
                    : 'bg-black/40 hover:bg-black/60'
                }`}
              >
                <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-bold">{t('LOKASI RESMI (TBA)', 'OFFICIAL LOCATION (TBA)')}</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-0.5 uppercase">{t('POS PITSTOP RESMI B', 'OFFICIAL PITSTOP B')}</span>
                <span className="text-xs text-[#FA6D0B] font-bold mt-1 block uppercase">{t('Kategori 70, 100 km', 'Categories 70, 100 km')}</span>
              </button>
            </div>

            {/* Rider BIB Input */}
            <div className="space-y-4 font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">{t('NOMOR BIB:', 'BIB NUMBER:')}</label>
                  <input
                    type="text"
                    value={bibNumber}
                    onChange={(e) => setBibNumber(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-3 text-lg font-display italic text-[#FA6D0B] font-black focus:outline-none focus:border-[#FA6D0B]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">{t('NAMA ATLET:', 'ATHLETE NAME:')}</label>
                  <input
                    type="text"
                    value={riderName}
                    onChange={(e) => setRiderName(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-[#FA6D0B]"
                  />
                </div>
              </div>
            </div>

            {/* Actual Rest Slider */}
            <div className="space-y-3.5 p-5 rounded-xl bg-black/60 font-mono shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('DURASI ISTIRAHAT AKTUAL DI PITSTOP:', 'ACTUAL DWELL TIME AT PITSTOP:')}
                </span>
                <span className="text-2xl font-black font-display italic text-white">
                  {actualRestMinutes} {t('MENIT', 'MINS')}
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="60"
                step="1"
                value={actualRestMinutes}
                onChange={(e) => setActualRestMinutes(parseInt(e.target.value))}
                className="w-full accent-[#FA6D0B] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-bold uppercase">
                <span>5 {t('Menit (Cepat)', 'Mins (Fast)')}</span>
                <span className="text-[#FA6D0B]">30 {t('Menit (Wajib)', 'Mins (Mandatory)')}</span>
                <span>60 {t('Menit', 'Mins')}</span>
              </div>
            </div>

            {/* Rule Summary */}
            <div className="text-xs text-slate-300 space-y-1.5 font-mono bg-black/60 p-4 rounded-xl shadow-sm">
              <div className="text-[#FA6D0B] font-bold uppercase tracking-wider mb-1">// {t('KETENTUAN ATURAN PENALTI 300%:', '300% PENALTY FORMULA:')}</div>
              <p>• {t('Waktu istirahat wajib = 30 menit penuh di area steril pitstop.', 'Mandatory dwell rest time = 30 full minutes at sterile pitstop area.')}</p>
              <p>• {t('Berangkat sebelum 30 menit = Pelanggaran regulasi balap!', 'Departing before 30 mins = Official rule violation!')}</p>
              <p>• {t('Rumus:', 'Formula:')} <code className="text-white font-bold">(30 - {t('Durasi Aktual', 'Actual Duration')}) × 300%</code></p>
            </div>
          </div>

          {/* Result Card & Penalty Analysis (5 Cols) */}
          <div className="md:col-span-5 space-y-4 font-mono">
            <div className="p-6 sm:p-7 rounded-2xl bg-black/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-5 backdrop-blur-xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('STATUS KALKULASI', 'CALCULATION STATUS')}
                </span>
                <span className={`text-xs font-black uppercase tracking-wider ${
                  isViolated ? 'text-[#FA6D0B]' : 'text-white'
                }`}>
                  {isViolated ? t('// PENALTI 300% AKTIF', '// 300% PENALTY ACTIVE') : t('// MEMENUHI SYARAT', '// MANDATORY DWELL PASSED')}
                </span>
              </div>

              {/* Penalty Numbers */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-white/10">
                  <span>{t('Wajib Istirahat:', 'Mandatory Rest:')}</span>
                  <span className="text-white font-bold">30 {t('Menit', 'Minutes')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-white/10">
                  <span>{t('Istirahat Dilakukan:', 'Actual Rest:')}</span>
                  <span className="text-white font-bold">{actualRestMinutes} {t('Menit', 'Minutes')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-white/10">
                  <span>{t('Defisit Waktu:', 'Deficit Time:')}</span>
                  <span className={isViolated ? 'text-[#FA6D0B] font-bold' : 'text-slate-400'}>
                    {violationMinutes} {t('Menit', 'Minutes')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-white/10">
                  <span>{t('Faktor Pengali:', 'Multiplier Factor:')}</span>
                  <span className="text-[#FA6D0B] font-bold">300% (x3)</span>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-xs uppercase font-bold text-slate-200">
                    {t('Total Penalti:', 'Total Penalty Added:')}
                  </span>
                  <span className={`text-3xl font-black font-display italic ${
                    isViolated ? 'text-[#FA6D0B]' : 'text-white'
                  }`}>
                    +{penaltyMinutes} {t('Menit', 'Mins')}
                  </span>
                </div>
              </div>

              {/* Status Explanation */}
              <div className="p-4 rounded-xl bg-black/60 text-xs text-slate-300 leading-relaxed font-sans shadow-sm">
                {isViolated ? (
                  <p>
                    {t('Atlet', 'Rider')} <strong>BIB #{bibNumber}</strong> {t('berangkat', 'departed')} <strong className="text-white">{violationMinutes} {t('menit lebih awal', 'minutes early')}</strong>. 
                    {t('Sistem otomatis menambahkan penalti', 'System automatically appends')} <strong className="text-[#FA6D0B]">+{penaltyMinutes} {t('menit', 'minutes')}</strong> {t('ke catatan waktu resmi pada papan klasemen finish.', 'to official finish leaderboard time.')}
                  </p>
                ) : (
                  <p>
                    {t('Atlet', 'Rider')} <strong>BIB #{bibNumber}</strong> {t('telah beristirahat selama', 'has rested for')} {actualRestMinutes} {t('menit (memenuhi batas minimum 30 menit).', 'minutes (meets mandatory 30-min minimum).')} 
                    <strong> {t('Nol penalti waktu dikenakan.', 'Zero time penalty applied.')}</strong>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  const cpName = selectedCp === 'CP_A' ? t('Pos Pitstop A (TBA)', 'Pitstop Station A (TBA)') : t('Pos Pitstop B (TBA)', 'Pitstop Station B (TBA)');
                  alert(t(`Log Pitstop tercatat: BIB #${bibNumber} di ${cpName} dengan penalti +${penaltyMinutes} menit tersimpan.`, `Pitstop Log recorded: BIB #${bibNumber} at ${cpName} with +${penaltyMinutes} mins penalty saved.`));
                }}
                className="w-full py-4 rounded-full bg-[#FA6D0B] hover:bg-[#DE5A00] text-black font-sans font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(250,109,11,0.35)] hover:-translate-y-0.5 active:scale-95"
              >
                {t('SIMPAN LOG DWELL TIME RESMI', 'SAVE OFFICIAL DWELL TIME LOG')}
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/peraturan"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:text-[#FA6D0B] uppercase tracking-wider transition-colors"
              >
                <span>{t('BACA PASAL ATURAN PITSTOP & KESELAMATAN', 'READ PITSTOP & SAFETY REGULATIONS')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
