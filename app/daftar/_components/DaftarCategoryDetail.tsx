'use client';

import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@/lib/types';
import { 
  GPX_FILE_MAP, 
  GPX_DISPLAY_INFO, 
  CategoryData, 
  PricingPhase 
} from '@/lib/data/categories';
import ElevationProfile from '@/components/ElevationProfile';
import { CategoryVisual } from './types';

const RouteMap = dynamic(() => import('@/components/RouteMap'), { ssr: false });

interface DaftarCategoryDetailProps {
  selectedCategory: Category;
  detailCategoryData: CategoryData;
  detailVisual: CategoryVisual;
  activePhase: PricingPhase;
  language: string;
  race120SingleConfig: Category;
  race120PairConfig: Category;
  setSelectedCategory: (cat: Category) => void;
  onBack: () => void;
  onProceed: () => void;
  formatRupiah: (amount: number) => string;
  t: (id: string, eng: string) => string;
}

export default function DaftarCategoryDetail({
  selectedCategory,
  detailCategoryData,
  detailVisual,
  activePhase,
  language,
  race120SingleConfig,
  race120PairConfig,
  setSelectedCategory,
  onBack,
  onProceed,
  formatRupiah,
  t,
}: DaftarCategoryDetailProps) {
  return (
    <div className="space-y-6 animate-slide-up-fade">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-[#FA6D0B] transition-colors cursor-pointer"
        >
          {t('← KEMBALI · PILIH KATEGORI LAIN', '← BACK · CHOOSE ANOTHER CATEGORY')}
        </button>

        <div className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest font-bold">
          {t('TAHAP 02 / 03 · RACE BRIEFING & ELEVATION MATRIX', 'STEP 02 / 03 · RACE BRIEFING & ELEVATION MATRIX')}
        </div>
      </div>

      {selectedCategory.id === 'VIRTUAL' ? (
        /* VIRTUAL RIDE DASHBOARD: 19 CHAPTERS & STRAVA PROTOCOL */
        <div className="space-y-6">
          {/* Top Summary Card */}
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-1">
                  {detailVisual.badge}
                </span>
                <h1 className="font-display italic text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-none">
                  {selectedCategory.name}
                </h1>
              </div>
            </div>

            {/* 4-Metric Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/10 py-4 border-b border-white/10">
              <div className="space-y-1 sm:pr-4">
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider block">{t('JARAK', 'DISTANCE')}</span>
                <div className="font-display font-black text-white italic text-2xl sm:text-3xl leading-none">
                  {t('BEBAS', 'FLEXIBLE')}
                </div>
                <span className="text-xs font-mono text-slate-300 block">{t('Rute Kota Domisili', 'Local City Route')}</span>
              </div>

              <div className="space-y-1 sm:px-4">
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider block">TOTAL ELEV</span>
                <div className="font-display font-black text-[#FA6D0B] italic text-2xl sm:text-3xl leading-none">
                  {t('MANDIRI', 'LOCAL')}
                </div>
                <span className="text-xs font-mono text-slate-300 block">{t('Kontur Domisili', 'Local Elevation')}</span>
              </div>

              <div className="space-y-1 sm:px-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider block">WAVE START</span>
                <div className="font-display font-black text-white italic text-2xl sm:text-3xl leading-none">
                  {t('MANDIRI', 'SELF-START')}
                </div>
                <span className="text-xs font-mono text-slate-300 block">{t('Race Window 24 Jam', '24h Race Window')}</span>
              </div>

              <div className="space-y-1 sm:pl-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase tracking-wider block">{t('BATAS WAKTU (COT)', 'CUT OFF TIME (COT)')}</span>
                <div className="font-display font-black text-white italic text-2xl sm:text-3xl leading-none">
                  {t('FLEKSIBEL', 'FLEXIBLE')}
                </div>
                <span className="text-xs font-mono text-slate-300 block">{t('Sinkronisasi GPS', 'GPS Synchronization')}</span>
              </div>
            </div>

            {/* Narrative */}
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                {t('KARAKTERISTIK ETAPE ·', 'STAGE CHARACTERISTICS ·')}
              </span>
              <p className="text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed">
                {language === 'ENG' && detailCategoryData.descEng ? detailCategoryData.descEng : detailCategoryData.desc}
              </p>
            </div>

            {/* Logistics Note */}
            {detailVisual.prologueNote && (
              <div className="p-3.5 rounded-xl bg-[#FA6D0B]/10 font-mono text-xs space-y-1 shadow-md">
                <span className="font-bold text-[#FA6D0B] uppercase tracking-wider block">
                  {t('PROTOKOL LOGISTIK & STRAVA VIRTUAL RIDE', 'LOGISTICS & STRAVA PROTOCOL')}
                </span>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">{detailVisual.prologueNote}</p>
              </div>
            )}
          </div>

          {/* 19 Chapters Network Banner */}
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#FA6D0B] uppercase tracking-widest font-bold block">
                  GX-ID NATIONAL NETWORK · 19 REGIONAL CHAPTERS
                </span>
                <h3 className="font-display italic text-xl sm:text-2xl font-black uppercase text-white mt-0.5">
                  {t('JARINGAN GOWES SERENTAK SE-INDONESIA', 'NATIONWIDE SIMULTANEOUS RIDE NETWORK')}
                </h3>
              </div>
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                COMMUNITY TIKUM
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {t(
                'Khusus bagi 80.000+ anggota komunitas GX-ID dan pesepeda di luar Jabodetabek. Anda dapat memilih rute outdoor favorit di kota domisili Anda, merekam aktivitas menggunakan GPS cycling computer (Garmin / Wahoo / Strava / Komoot), dan medali cor logam resmi serta jersey finisher akan dikirimkan langsung ke alamat Anda via DHS Logistik.',
                'Dedicated to 80,000+ GX-ID community members and cyclists outside Jabodetabek. Ride your favorite outdoor route locally, record via GPS computer (Garmin / Wahoo / Strava / Komoot), and official die-cast metal medals and finisher jerseys will be delivered directly via DHS Logistics.'
              )}
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                {t('CHAPTER REGIONAL TERDAFTAR (TIKUM RESMI):', 'REGISTERED REGIONAL CHAPTERS (OFFICIAL MEETPOINTS):')}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Bandung', 'Surabaya', 'Medan', 'Bali', 'Yogyakarta',
                  'Makassar', 'Semarang', 'Solo', 'Jabodetabek', 'Palembang',
                  'Balikpapan', 'Malang', 'Banjarmasin', 'Padang', 'Batam',
                  'Lampung', 'Manado', 'Samarinda', 'Papua'
                ].map((chapter) => (
                  <span
                    key={chapter}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.06] text-[11px] font-mono text-slate-300 font-bold hover:bg-[#FA6D0B]/20 hover:text-[#FA6D0B] transition-colors shadow-sm"
                  >
                    GX-ID {chapter}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Step Virtual Protocol Cards */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              {t('ALUR 4 TAHAP KELULUSAN VIRTUAL RIDE ·', '4-STAGE VIRTUAL RIDE COMPLETION PROTOCOL ·')}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">{t('TAHAP 01', 'STAGE 01')}</div>
                <div className="text-sm font-black text-white font-mono uppercase">{t('REGISTRASI & BIB', 'REGISTRATION & BIB')}</div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  {t('Pilih paket medali / jersey, isi identitas dan alamat domisili untuk pengiriman logistik, lalu selesaikan pembayaran.', 'Select medal / jersey package, enter identity and shipping address for logistics, then complete payment.')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">{t('TAHAP 02', 'STAGE 02')}</div>
                <div className="text-sm font-black text-white font-mono uppercase">{t('GOWES OUTDOOR', 'OUTDOOR RIDE')}</div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  {t('Gowes di rute kota Anda pada periode race window. Wajib outdoor (dilarang indoor roller) dengan GPS tracking aktif.', 'Ride in your local city during the race window. Must be outdoors (no indoor trainers) with active GPS tracking.')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">{t('TAHAP 03', 'STAGE 03')}</div>
                <div className="text-sm font-black text-white font-mono uppercase">{t('STRAVA SYNC', 'STRAVA SYNC')}</div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  {t('Sinkronkan URL aktivitas Strava atau file GPX. Server otomatis Grindurance memverifikasi validitas data rekaman.', 'Sync Strava activity URL or GPX file. Grindurance automated server verifies activity data validity.')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl space-y-2 shadow-lg">
                <div className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">{t('TAHAP 04', 'STAGE 04')}</div>
                <div className="text-sm font-black text-white font-mono uppercase">{t('MEDALI DIKIRIM', 'MEDAL DISPATCH')}</div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  {t('Setelah status FINISHER terverifikasi, medali cor logam resmi dan jersey eksklusif dikirim via DHS Logistik ke rumah.', 'Once FINISHER status is verified, official die-cast medal and exclusive jersey are shipped directly to your home via DHS Logistics.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ON-SITE CATEGORIES: EXPANSIVE HERO ROUTE MAP & FULL-WIDTH ELEVATION PROFILE */
        <div className="space-y-6">
          {/* 1. Category Hero Title Header & Quota Info */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-1">
                  {detailVisual.badge}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-white italic tracking-tight leading-none drop-shadow-sm flex flex-wrap items-baseline gap-x-3">
                  <span>{language === 'ENG' && detailCategoryData.titleEng ? detailCategoryData.titleEng : detailCategoryData.title}</span>
                  {detailCategoryData.titleNote && (
                    <span className="text-xs sm:text-sm lg:text-base font-mono font-bold text-slate-400 not-italic uppercase tracking-wider inline-block">
                      {detailCategoryData.titleNote}
                    </span>
                  )}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start sm:self-auto">
                <div className="font-mono text-xs sm:text-sm text-slate-300">
                  {t('KUOTA:', 'QUOTA:')} <strong className="text-white font-bold">{selectedCategory.quota - selectedCategory.current_enrolled} {t('SLOT', 'SLOTS')}</strong>
                </div>
                <button
                  type="button"
                  onClick={onProceed}
                  className="px-5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] hover:bg-[#DE5A00] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>{t('LANJUT DAFTAR', 'REGISTER NOW')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Race Format Toggle: Single vs Pair */}
            {(selectedCategory.id === '120' || selectedCategory.id === '120_SINGLE' || selectedCategory.id === '120_PAIR') && (
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                    {t('PILIHAN FORMAT · 120 KM RACE', '120 KM RACE · FORMAT SELECTION')}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
                    {t(
                      'Pilih bertanding secara individu (Sendiri / 1 Pax) atau tim berpasangan (Pair Mix / 2 Pax). Biaya dan formulir otomatis disesuaikan.',
                      'Choose to race individually (Solo / 1 Pax) or tandem team (Pair Mix / 2 Pax). Fees and form fields automatically adjust.'
                    )}
                  </p>
                </div>
                <div className="inline-flex rounded-xl bg-black/80 p-1.5 shrink-0 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(race120SingleConfig)}
                    className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                      !selectedCategory.is_pair
                        ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] font-black'
                        : 'text-slate-400 hover:text-white font-bold hover:bg-white/[0.05]'
                    }`}
                  >
                    {t('SENDIRI · 1 RIDER', 'SINGLE · 1 RIDER')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(race120PairConfig)}
                    className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                      selectedCategory.is_pair
                        ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.55)] font-black'
                        : 'text-slate-400 hover:text-white font-bold hover:bg-white/[0.05]'
                    }`}
                  >
                    {t('PAIR MIX · 2 PAX', 'PAIR MIX · 2 PAX')}
                  </button>
                </div>
              </div>
            )}

            {/* Prologue Protocol Note if applicable */}
            {detailVisual.prologueNote && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FA6D0B]/10 font-mono text-xs space-y-1 shadow-md">
                <span className="font-bold text-[#FA6D0B] uppercase tracking-wider block">
                  {t('PROTOKOL WAJIB PROLOG 30 KM', 'MANDATORY 30 KM PROLOGUE PROTOCOL')}
                </span>
                <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">{detailVisual.prologueNote}</p>
              </div>
            )}

            {/* 2. OPEN TELEMETRY BAR (4 METRICS FULL WIDTH) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/10 py-5 px-5 sm:px-6 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] font-mono">
              <div className="space-y-1 sm:pr-4">
                <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">{t('JARAK TEMPUH', 'TOTAL DISTANCE')}</span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="font-display font-black text-white italic leading-none text-2xl sm:text-3xl xl:text-4xl">
                    {detailCategoryData.km.split(' ')[0]}
                  </span>
                  {detailCategoryData.km.split(' ')[1] && (
                    <span className="text-sm font-bold text-slate-300 uppercase not-italic">
                      {detailCategoryData.km.split(' ')[1]}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-300 truncate">
                  {selectedCategory.id === '150' 
                    ? t('120K + 30K Prolog', '120K + 30K Prologue') 
                    : selectedCategory.id === '200' 
                    ? t('170K + 30K Prolog', '170K + 30K Prologue') 
                    : t('Rute Penuh', 'Full Route')}
                </div>
              </div>

              <div className="space-y-1 sm:px-4">
                <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">{t('TOTAL ELEVASI', 'TOTAL ELEVATION')}</span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-[#FA6D0B] italic leading-none">
                    {detailCategoryData.elevation.split(' ')[0]}
                  </span>
                  {detailCategoryData.elevation.split(' ')[1] && (
                    <span className="text-sm font-bold text-[#FA6D0B]/80 uppercase not-italic">
                      {detailCategoryData.elevation.split(' ')[1]}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-300 truncate">
                  Max Alt: {detailCategoryData.maxAlt}
                </div>
              </div>

              <div className="space-y-1 sm:px-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">WAVE START</span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                    {selectedCategory.wave_start_time || detailCategoryData.wave.split(' ')[0]}
                  </span>
                  <span className="text-sm font-bold text-slate-300 uppercase not-italic">
                    WIB
                  </span>
                </div>
                <div className="text-xs text-slate-300 truncate">
                  {t('Start Serentak', 'Simultaneous Wave')}
                </div>
              </div>

              <div className="space-y-1 sm:pl-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">{t('BATAS WAKTU (COT)', 'CUT OFF TIME (COT)')}</span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                    {selectedCategory.cot_hours || detailCategoryData.cot.split(' ')[0]}
                  </span>
                  <span className="text-sm font-bold text-slate-300 uppercase not-italic">
                    {t('JAM', 'HRS')}
                  </span>
                </div>
                <div className="text-xs text-slate-300 truncate">
                  {t('Penutupan Jalur', 'Course Closure')}
                </div>
              </div>
            </div>
          </div>

          {/* 3. THE BIG ROUTE MAP */}
          <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[660px] xl:h-[720px] rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 px-4 sm:px-6 py-3 shrink-0 bg-black/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-base sm:text-xl font-black uppercase text-white italic tracking-wider leading-none">
                  {detailCategoryData.km} {t('PETA RUTE VECTOR HUD RESMI · GPX LIVE', 'OFFICIAL VECTOR HUD ROUTE MAP · GPX LIVE')}
                </h2>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                <span>{t('KORIDOR JONGGOL–SUKAMAKMUR', 'JONGGOL–SUKAMAKMUR CORRIDOR')}</span>
                <span>·</span>
                <span className="text-[#FA6D0B] font-bold">{t('LINE RADAR', 'LINE RADAR')}</span>
              </div>
            </div>

            <div className="relative z-10 flex-1 w-full min-h-0">
              <RouteMap
                gpxFile={GPX_FILE_MAP[selectedCategory.id] ?? null}
                categoryKm={detailCategoryData.km}
                categoryId={detailCategoryData.id}
                gpxTotalKm={GPX_DISPLAY_INFO[detailCategoryData.id]?.gpxKm ?? ''}
                prologKm={GPX_DISPLAY_INFO[detailCategoryData.id]?.prologKm ?? 0}
                gpxFileName={GPX_DISPLAY_INFO[detailCategoryData.id]?.fileName ?? ''}
                accentColor="#FA6D0B"
              />
            </div>
          </div>

          {/* 4. THE BIG ELEVATION PROFILE */}
          <div className="w-full">
            <ElevationProfile
              category={detailCategoryData}
              accentColor="#FA6D0B"
            />
          </div>

          {/* 5. 2-COLUMN GRID: STAGE SPECS, SURFACE BREAKDOWN & SPECIAL REGULATIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* Left Column */}
            <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-5 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                  {t('KARAKTERISTIK ETAPE ·', 'STAGE CHARACTERISTICS ·')}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium leading-relaxed">
                  {language === 'ENG' && detailCategoryData.descEng ? detailCategoryData.descEng : detailCategoryData.desc}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FA6D0B] uppercase tracking-wider font-bold">{t('KOMPOSISI MEDAN ·', 'SURFACE BREAKDOWN ·')}</span>
                  <span className="text-slate-300">
                    <span className="text-slate-300 font-bold">{detailCategoryData.surfaceBreakdown.asphalt}</span> {t('Aspal', 'Asphalt')} ·{' '}
                    <span className="text-[#FA6D0B] font-bold">{detailCategoryData.surfaceBreakdown.gravel}</span> {t('Makadam', 'Gravel')} ·{' '}
                    <span className="text-slate-400 font-bold">{detailCategoryData.surfaceBreakdown.unpaved}</span> {t('Tanah/Batu', 'Dirt/Rocky')}
                  </span>
                </div>

                <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden flex">
                  <div style={{ width: detailCategoryData.surfaceBreakdown.asphalt }} className="h-full bg-slate-300 transition-all duration-700 ease-out" title="Aspal" />
                  <div style={{ width: detailCategoryData.surfaceBreakdown.gravel }} className="h-full bg-[#FA6D0B] transition-all duration-700 ease-out" title="Makadam" />
                  <div style={{ width: detailCategoryData.surfaceBreakdown.unpaved }} className="h-full bg-white/40 transition-all duration-700 ease-out" title="Tanah/Batu" />
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                  <span>{t('Tanjakan Rata-rata:', 'Avg Gradient:')} <strong className="text-white">{detailCategoryData.avgGradient}</strong></span>
                  <span>{t('Tanjakan Maksimum:', 'Max Gradient:')} <strong className="text-[#FA6D0B]">{detailCategoryData.maxGradient}</strong></span>
                  <span>{t('Rekomendasi Ban:', 'Tire Spec:')} <strong className="text-white">{detailCategoryData.gearTip}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                  {t('REGULASI & ATURAN TEKNIS ·', 'TECHNICAL RULES & REGULATIONS ·')}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/50 space-y-1 font-mono shadow-inner">
                    <strong className="text-white block uppercase text-[10px] tracking-wider">{t('FORMAT KOMPETISI:', 'COMPETITION FORMAT:')}</strong>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">{language === 'ENG' && detailCategoryData.formatEng ? detailCategoryData.formatEng : detailCategoryData.format}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 space-y-1 font-mono shadow-inner">
                    <strong className="text-[#FA6D0B] block uppercase text-[10px] tracking-wider">{t('GEAR WAJIB & ATURAN TEKNIS:', 'MANDATORY GEAR & RULES:')}</strong>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">{language === 'ENG' && detailCategoryData.specialRulesEng ? detailCategoryData.specialRulesEng : detailCategoryData.specialRules}</p>
                  </div>
                </div>

                {detailCategoryData.routeHighlights && (
                  <div className="p-3.5 rounded-xl bg-black/50 space-y-1 font-mono text-xs shadow-inner">
                    <strong className="text-white block uppercase text-[10px] tracking-wider">{t('HIGHLIGHT RUTE KORIDOR:', 'CORRIDOR ROUTE HIGHLIGHTS:')}</strong>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">{detailCategoryData.routeHighlights}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 6. MATRIKS POS CHECKPOINT & PITSTOP STATIONS */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2">
              <span className="text-slate-300 uppercase tracking-wider font-bold">
                {t('CHECKPOINT & PITSTOP ETAPE ·', 'STAGE CHECKPOINTS & PITSTOPS ·')} {detailCategoryData.km}
              </span>
              <span className="text-[10px] text-[#FA6D0B] font-bold uppercase tracking-wider">
                {selectedCategory.id === '150' || selectedCategory.id === '200' ? t('WAJIB PITSTOP 30 MENIT', 'MANDATORY 30-MIN PITSTOP') : 'SMART GEOFENCING'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
              {detailCategoryData.stations.map((st, idx) => {
                const isPitstop = st.type === 'PITSTOP';
                const isKOM = st.type === 'KOM';
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl text-left flex flex-col justify-between backdrop-blur-sm shadow-sm ${
                      isPitstop || isKOM
                        ? 'bg-[#FA6D0B]/20 shadow-[0_4px_20px_rgba(250,109,11,0.2)]'
                        : 'bg-black/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#FA6D0B]">{st.km}</span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                        isPitstop || isKOM ? 'bg-[#FA6D0B] text-black' : 'bg-white/10 text-white'
                      }`}>
                        {st.type}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white uppercase leading-snug block line-clamp-2">
                      {language === 'ENG' && st.nameEng ? st.nameEng : st.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate mt-1">
                      {language === 'ENG' && st.descEng ? st.descEng : st.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM STICKY ACTION BANNER */}
      <div className="p-5 sm:p-6 lg:p-7 rounded-2xl bg-black/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
            {t('SIAP UNTUK TANTANGAN INI?', 'READY FOR THIS CHALLENGE?')}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white italic mt-1 leading-tight tracking-tight">
            {t('AMBIL BAGIAN DI', 'PARTICIPATE IN')} {selectedCategory.name}
          </h3>
          <div className="font-mono text-xs text-slate-300 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span>{t('Biaya Tiket:', 'Entry Fee:')} <strong className="text-[#FA6D0B] font-bold">{formatRupiah(selectedCategory.price_medal_only)}</strong></span>
            {activePhase === 'EARLY_BIRD' && (
              <span className="text-[10px] font-mono font-bold uppercase text-black bg-[#FA6D0B] px-1.5 py-0.5 rounded-sm">
                EARLY BIRD TILL 15 NOV
              </span>
            )}
            <span className="text-white/20">·</span>
            <span>{t('Sisa Kuota:', 'Remaining Quota:')} <strong className="text-white font-bold">{selectedCategory.quota - selectedCategory.current_enrolled} {t('Slot', 'Slots')}</strong></span>
            <span className="text-white/20">·</span>
            <span className="text-slate-400 font-bold">
              {activePhase === 'CLOSED' ? t('PENDAFTARAN DITUTUP (29 NOV)', 'REGISTRATION CLOSED (NOV 29)') : t('PENUTUPAN 29 NOV 2026', 'CLOSES NOV 29, 2026')}
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/[0.04] text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all cursor-pointer text-center active:scale-95 whitespace-nowrap"
          >
            {t('← KEMBALI', '← BACK')}
          </button>

          <button
            type="button"
            onClick={onProceed}
            disabled={activePhase === 'CLOSED'}
            className="relative overflow-hidden w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_35px_rgba(250,109,11,0.65)] hover:bg-[#DE5A00] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />
            <span className="relative z-10">
              {activePhase === 'CLOSED' ? t('PENDAFTARAN RESMI DITUTUP', 'REGISTRATION CLOSED') : t('DAFTAR SEKARANG', 'REGISTER NOW')}
            </span>
            {activePhase !== 'CLOSED' && (
              <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out shrink-0" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
