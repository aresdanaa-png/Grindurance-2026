'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Timer, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Flame, 
  Compass, 
  ArrowRight,
  ShieldAlert,
  Play,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CheckpointPage() {
  const { language, t } = useLanguage();
  const [bibNumber, setBibNumber] = useState('2001');
  const [riderName, setRiderName] = useState('Bagus Setyawan (Ultra Gravel 200)');
  const [selectedCp, setSelectedCp] = useState('CP#4'); // CP#4 Jonggol
  const [actualRestMinutes, setActualRestMinutes] = useState(18); // default to 18 min for demonstration

  const MANDATORY_REST_MIN = 30;
  const PENALTY_MULTIPLIER = 3.0; // 300%

  // Calculations
  const isViolated = actualRestMinutes < MANDATORY_REST_MIN;
  const violationMinutes = isViolated ? MANDATORY_REST_MIN - actualRestMinutes : 0;
  const penaltyMinutes = violationMinutes * PENALTY_MULTIPLIER;
  const totalAddedPenalty = penaltyMinutes;

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-brand-border/60 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-sans font-semibold uppercase mb-2">
            <Timer className="w-4 h-4" />
            {t('Race Operations — Checkpoint & Dwell Time Engine', 'Race Operations — Checkpoint & Dwell Time Engine')}
          </div>
          <h1 className="font-display italic text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {t('Kalkulator & Log', 'Calculator & Log')} <span className="text-brand-gold">{t('Mandatory Pitstop', 'Mandatory Pitstop')}</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed font-sans">
            {t(
              'Implementasi aturan resmi GX-ID: Istirahat wajib minimal 30 menit di CP#4 (Jonggol) / CP#6 (Sodong). Pelanggaran keberangkatan dini dikenakan penalti 300% dari sisa waktu istirahat yang tidak dipenuhi.',
              'Official GX-ID rule implementation: Mandatory 30-minute rest at CP#4 (Jonggol) / CP#6 (Sodong). Early departure incurs a 300% penalty on the unfulfilled mandatory dwell time.'
            )}
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Form & Controls (7 Cols) */}
          <div className="md:col-span-7 bg-brand-card/90 border border-brand-border/80 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-border/50 pb-4">
              <h3 className="text-sm font-sans font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold" />
                {t('Pencatatan Dwell Time Checkpoint', 'Checkpoint Dwell Time Recording')}
              </h3>
              <span className="text-xs font-sans font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/30">
                {t('Aturan Khusus GX-ID', 'GX-ID Special Rule')}
              </span>
            </div>

            {/* Checkpoint selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedCp('CP#4')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedCp === 'CP#4'
                    ? 'bg-zinc-800 border-brand-gold shadow-sm'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span className="text-[10px] font-sans font-semibold text-slate-400 block tracking-wider">KM 82.5 • LOOP TENGGARA</span>
                <span className="text-sm font-bold text-white block mt-0.5">CP#4 Jonggol (Cimenyan)</span>
                <span className="text-[11px] font-sans font-bold text-brand-gold mt-1 block">{t('Kategori 120, 150, 200 km', 'Categories 120, 150, 200 km')}</span>
              </button>

              <button
                onClick={() => setSelectedCp('CP#6')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedCp === 'CP#6'
                    ? 'bg-zinc-800 border-brand-gold shadow-sm'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span className="text-[10px] font-sans font-semibold text-slate-400 block tracking-wider">KM 45.0 • SODONG SPRINGS</span>
                <span className="text-sm font-bold text-white block mt-0.5">CP#6 Sodong / Cileungsi</span>
                <span className="text-[11px] font-sans font-bold text-brand-gold mt-1 block">{t('Kategori 60, 100 km', 'Categories 60, 100 km')}</span>
              </button>
            </div>

            {/* Rider BIB Input */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-sans font-bold text-slate-400 block mb-1">{t('Nomor BIB:', 'BIB Number:')}</label>
                  <input
                    type="text"
                    value={bibNumber}
                    onChange={(e) => setBibNumber(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-base font-display italic text-brand-gold font-black focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[11px] font-sans font-bold text-slate-400 block mb-1">{t('Nama Atlet:', 'Athlete Name:')}</label>
                  <input
                    type="text"
                    value={riderName}
                    onChange={(e) => setRiderName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-slate-200 font-sans focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            {/* Actual Rest Slider */}
            <div className="space-y-3 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-slate-300">
                  {t('Durasi Istirahat Aktual di Pitstop:', 'Actual Rest Dwell Time at Pitstop:')}
                </span>
                <span className="text-2xl font-black font-display italic text-white">
                  {actualRestMinutes} {t('Menit', 'Minutes')}
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="60"
                step="1"
                value={actualRestMinutes}
                onChange={(e) => setActualRestMinutes(parseInt(e.target.value))}
                className="w-full accent-brand-gold cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-sans font-semibold text-slate-500">
                <span>5 {t('Menit (Cepat)', 'Mins (Fast)')}</span>
                <span className="text-amber-400 font-bold">30 {t('Menit (Wajib Minimum)', 'Mins (Mandatory Min)')}</span>
                <span>60 {t('Menit', 'Mins')}</span>
              </div>
            </div>

            {/* Rule Summary */}
            <div className="text-xs text-slate-400 space-y-1 font-sans bg-black/40 p-3.5 rounded-xl border border-zinc-800">
              <div className="text-slate-300 font-bold mb-1">{t('Ketentuan Aturan 300%:', '300% Rule Terms:')}</div>
              <p>• {t('Waktu istirahat wajib = ', 'Mandatory dwell rest time = ')}<strong>30 {t('menit', 'minutes')}</strong> {t('penuh.', 'full.')}</p>
              <p>• {t('Berangkat sebelum 30 menit = Pelanggaran!', 'Departing before 30 mins = Violation!')}</p>
              <p>• {t('Rumus Penalti:', 'Penalty Formula:')} <code className="text-amber-400 font-bold">(30 - {t('Durasi Aktual', 'Actual Duration')}) × 300%</code></p>
            </div>
          </div>

          {/* Result Card & Penalty Analysis (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className={`p-6 rounded-2xl border ${
              isViolated
                ? 'bg-rose-950/20 border-rose-500/40'
                : 'bg-emerald-950/20 border-emerald-500/40'
            } space-y-5 shadow-2xl`}>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-slate-400">
                  {t('Hasil Kalkulasi Otomatis', 'Automated Calculation Result')}
                </span>
                {isViolated ? (
                  <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-sans font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {t('PENALTI 300%', '300% PENALTY')}
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-sans font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t('MEMENUHI SYARAT', 'PASSED')}
                  </span>
                )}
              </div>

              {/* Penalty Numbers */}
              <div className="space-y-3 font-sans">
                <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-white/5">
                  <span>{t('Wajib Istirahat:', 'Mandatory Rest:')}</span>
                  <span className="text-white font-bold">30 {t('Menit', 'Minutes')}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-white/5">
                  <span>{t('Istirahat Dilakukan:', 'Actual Rest:')}</span>
                  <span className="text-white font-bold">{actualRestMinutes} {t('Menit', 'Minutes')}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-white/5">
                  <span>{t('Selisih Waktu Dilanggar:', 'Deficit Time:')}</span>
                  <span className={isViolated ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                    {violationMinutes} {t('Menit', 'Minutes')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-white/5">
                  <span>{t('Faktor Pengali:', 'Multiplier Factor:')}</span>
                  <span className="text-amber-400 font-bold">300% (x3)</span>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-xs uppercase font-sans font-bold text-slate-200">
                    {t('Total Penalti Ditambahkan:', 'Total Penalty Added:')}
                  </span>
                  <span className={`text-3xl font-black font-display italic ${
                    isViolated ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    +{penaltyMinutes} {t('Menit', 'Mins')}
                  </span>
                </div>
              </div>

              {/* Status Explanation */}
              <div className="p-3 rounded-xl bg-black/60 text-xs text-slate-300 leading-relaxed font-sans">
                {isViolated ? (
                  <p>
                    ⚠️ {t('Atlet', 'Rider')} <strong>BIB #{bibNumber}</strong> {t('berangkat', 'departed')} <strong className="text-rose-400">{violationMinutes} {t('menit lebih awal', 'minutes early')}</strong>. 
                    {t('Sistem otomatis menambahkan', 'System automatically adds')} <strong className="text-rose-400">+{penaltyMinutes} {t('menit', 'minutes')}</strong> {t('ke catatan waktu resmi pada papan klasemen finish.', 'to official finish leaderboard time.')}
                  </p>
                ) : (
                  <p>
                    ✅ {t('Atlet', 'Rider')} <strong>BIB #{bibNumber}</strong> {t('telah beristirahat selama', 'has rested for')} {actualRestMinutes} {t('menit (memenuhi batas minimum 30 menit).', 'minutes (meets mandatory 30-min minimum).')} 
                    <strong> {t('Nol penalti waktu', 'Zero time penalty')}</strong> {t('dikenakan.', 'applied.')}
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  alert(t(`Log Pitstop tercatat: BIB #${bibNumber} di ${selectedCp} dengan penalti +${penaltyMinutes} menit tersimpan.`, `Pitstop Log recorded: BIB #${bibNumber} at ${selectedCp} with +${penaltyMinutes} mins penalty saved.`));
                }}
                className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                {t('Simpan Log Dwell Time ke Database', 'Save Dwell Time Log to Database')}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/peraturan"
                className="text-xs font-sans font-semibold text-slate-400 hover:text-brand-gold underline transition-colors"
              >
                {t('Lihat Pasal Aturan Pitstop & Keselamatan di Athlete Guide →', 'View Pitstop & Safety Rules in Athlete Guide →')}
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
