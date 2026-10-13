'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Users, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  Compass, 
  Coffee,
  CheckCircle2,
  ChevronDown,
  Mountain,
  Gauge,
  TrendingUp,
  Award,
  Zap,
  Activity,
  Calendar,
  Check
} from 'lucide-react';

interface CategoryData {
  id: string;
  tabLabel: string;
  km: string;
  watermark: string;
  subtitle: string;
  title: string;
  titleNote?: string;
  elevation: string;
  elevationMeters: number;
  cot: string;
  wave: string;
  tag: string;
  format: string;
  specialRules: string;
  photo: string;
  priceMedal: string;
  priceJersey: string;
  pairPriceMedal?: string;
  pairPriceJersey?: string;
  desc: string;
  routeHighlights: string;
  terrain: string;
  gearTip: string;
  isRace?: boolean;
  elevationPath: string;
  waypoints: { name: string; km: string; x: number; y: number }[];
}

export default function HomePage() {
  const [selectedId, setSelectedId] = useState<string>('120_PAIR');

  const categories: CategoryData[] = [
    {
      id: '60',
      tabLabel: '60 KM',
      km: '60 KM',
      watermark: '60K',
      subtitle: 'FUN GRAVEL',
      title: 'Fun Gravel 60',
      elevation: '+450 m',
      elevationMeters: 450,
      cot: '7 Jam',
      wave: '07:00 WIB',
      tag: 'REKREASI & PEMULA',
      format: 'Fun Gravel / Non-Kompetitif',
      specialRules: 'Ramah Sepeda Lipat (Seli), Hybrid & Pemula',
      photo: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 250.000',
      priceJersey: 'Rp 300.000',
      desc: 'Lintasan tanah pedesaan Jonggol & aspal halus Cibubur. Sangat ideal bagi pesepeda yang baru pertama kali mencicipi gravel serta pengguna sepeda lipat.',
      routeHighlights: 'Cibubur Basecamp → Pasir Angin → Jonggol Lowland → ABEEY Coffee Finish',
      terrain: 'Aspal Pinggiran Kota & Makadam Halus Pasir Angin',
      gearTip: 'Ramah Sepeda Lipat (Seli 20"), Hybrid, & Gravel Pemula',
      elevationPath: 'M 0 100 Q 80 90, 160 85 T 320 60 T 480 80 T 640 45 T 800 95 L 800 130 L 0 130 Z',
      waypoints: [
        { name: 'START (ABEEY)', km: '0 KM', x: 20, y: 98 },
        { name: 'CP#1 Pasir Angin', km: '28 KM', x: 340, y: 65 },
        { name: 'CP#2 Lowland', km: '45 KM', x: 580, y: 52 },
        { name: 'FINISH LOUNGE', km: '60 KM', x: 770, y: 93 },
      ],
    },
    {
      id: '80',
      tabLabel: '80 KM',
      km: '80 KM',
      watermark: '80K',
      subtitle: 'FUN GRAVEL',
      title: 'Fun Gravel 80',
      elevation: '+750 m',
      elevationMeters: 750,
      cot: '9 Jam',
      wave: '07:00 WIB',
      tag: 'EKSPLORASI SCENIC',
      format: 'Fun Gravel / Non-Kompetitif',
      specialRules: 'Rolling Terrain · Ban Rekomendasi 38c+',
      photo: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 300.000',
      priceJersey: 'Rp 350.000',
      desc: 'Menjelajahi persawahan Cileungsi dan makadam khas Pemandian Sodong. Etape peningkatan jarak ideal dengan rolling hills berirama dinamis.',
      routeHighlights: 'Cileungsi → Sodong Makadam → Klapanunggal Ridge → ABEEY Coffee Finish',
      terrain: 'Rolling Hills, Persawahan Cileungsi & Makadam Pemandian Sodong',
      gearTip: 'Rekomendasi Ban 38c+ · Joy of Riding & Scenic Gravel',
      elevationPath: 'M 0 105 Q 100 80, 200 65 T 400 40 T 550 70 T 680 30 T 800 100 L 800 130 L 0 130 Z',
      waypoints: [
        { name: 'START (ABEEY)', km: '0 KM', x: 20, y: 102 },
        { name: 'CP#1 Cileungsi', km: '32 KM', x: 250, y: 62 },
        { name: 'CP#2 Sodong Makadam', km: '56 KM', x: 500, y: 48 },
        { name: 'FINISH LOUNGE', km: '80 KM', x: 770, y: 98 },
      ],
    },
    {
      id: '120_PAIR',
      tabLabel: '120 KM',
      km: '120 KM',
      watermark: '120K',
      subtitle: 'RACE (PODIUM)',
      title: 'Race 120',
      titleNote: '(Single & Pair Mix)',
      elevation: '+1,450 m',
      elevationMeters: 1450,
      cot: '11 Jam',
      wave: '06:00 WIB',
      tag: 'OFFICIAL RACE // PODIUM TOP 3',
      format: 'Official Race (Top 3 Podium)',
      specialRules: 'Mendukung Tim PAIR Mix 2 Pax · Handicap Waktu · Live Tracking GPS',
      photo: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
      pairPriceMedal: 'Rp 700.000',
      pairPriceJersey: 'Rp 750.000',
      desc: 'Satu-satunya kategori balap kompetitif resmi dengan perebutan podium Top 3. Menaklukkan tanjakan koridor Jonggol–Sukamakmur dengan opsi tandem 2 pesepeda (Pair Mix).',
      routeHighlights: 'Cibubur → Jonggol Ridge → Tanjakan Sukamakmur → Sentul Descent → ABEEY Coffee Finish',
      terrain: 'Koridor Jonggol Ridge & Tanjakan Sukamakmur (+1.450 m)',
      gearTip: 'Live Tracking RaceRoute.id Wajib · Perebutan Podium Top 3 · Opsi Tandem PAIR MIX',
      isRace: true,
      elevationPath: 'M 0 110 Q 120 90, 240 60 T 420 20 T 560 65 T 700 35 T 800 105 L 800 130 L 0 130 Z',
      waypoints: [
        { name: 'START WAVE 1', km: '0 KM', x: 20, y: 108 },
        { name: 'CP#1 Jonggol', km: '42 KM', x: 260, y: 55 },
        { name: 'KOM Sukamakmur', km: '78 KM', x: 420, y: 18 },
        { name: 'CP#4 Sentul Loop', km: '102 KM', x: 670, y: 42 },
        { name: 'PODIUM GATE', km: '120 KM', x: 770, y: 102 },
      ],
    },
    {
      id: '150',
      tabLabel: '150 KM',
      km: '150 KM',
      watermark: '150K',
      subtitle: 'CROSS GRAVEL',
      title: 'Cross Gravel 150',
      elevation: '+2,100 m',
      elevationMeters: 2100,
      cot: '15 Jam',
      wave: '05:30 WIB',
      tag: 'WAJIB PROLOG 30 KM',
      format: 'Cross Gravel Endurance',
      specialRules: 'Wajib Prolog 30 km (03:00–05:00 WIB) · Pitstop Wajib 30 Menit',
      photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
      desc: 'Tantangan klasik veteran endurance menembus tanjakan ganda Sukamakmur dan turunan teknis berbatu di tengah guyuran musim hujan khas Jawa Barat.',
      routeHighlights: 'Prolog 30 km Subuh → Sukamakmur → Jonggol Loop → Puncak Dua → ABEEY Coffee Finish',
      terrain: 'Tanjakan Ganda Sukamakmur, Jalur Batu Puncak Dua & Sentul Loop',
      gearTip: 'Wajib Prolog 30 km (03:00–05:00 WIB) · Ban Min 38–40mm & Wet Lube',
      elevationPath: 'M 0 115 Q 100 85, 200 45 T 380 15 T 500 70 T 640 25 T 800 110 L 800 130 L 0 130 Z',
      waypoints: [
        { name: 'PROLOG CHECK', km: '0 KM', x: 20, y: 112 },
        { name: 'CP#1 Jonggol', km: '50 KM', x: 220, y: 42 },
        { name: 'KOM Sukamakmur', km: '88 KM', x: 380, y: 14 },
        { name: 'CP#4 Pitstop 30m', km: '122 KM', x: 620, y: 32 },
        { name: 'FINISHER GATE', km: '150 KM', x: 770, y: 108 },
      ],
    },
    {
      id: '200',
      tabLabel: '200 KM',
      km: '200 KM',
      watermark: '200K',
      subtitle: 'ULTRA GRAVEL',
      title: 'Ultra Gravel 200',
      elevation: '+3,180 m',
      elevationMeters: 3180,
      cot: '19 Jam',
      wave: '05:30 WIB',
      tag: 'ULTRA GRAVEL // NIGHT NAV',
      format: 'Ultra Gravel Endurance',
      specialRules: 'Prolog 30 km · Night Navigation · Lampu Depan Ganda >500lm & Rompi Reflektif',
      photo: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
      desc: 'Kategori puncak ketahanan fisik, mental, dan navigasi malam mandiri. Loop penuh Jonggol–Sukamakmur–Babakan Madang–Sentul dengan total elevasi tembus +3.180 meter.',
      routeHighlights: 'Prolog 30 km → Jonggol → Sukamakmur Monster Pass → Sentul Loop → Malam ABEEY Coffee',
      terrain: 'Loop Penuh 4 Wilayah · Monster Pass Sukamakmur · Sentul Extreme',
      gearTip: 'Wajib Prolog 30 km · Night Nav: Lampu Depan >500lm & Rompi Reflektif',
      elevationPath: 'M 0 115 Q 90 80, 180 35 T 350 10 T 480 65 T 620 18 T 720 50 T 800 110 L 800 130 L 0 130 Z',
      waypoints: [
        { name: 'PROLOG 30K', km: '0 KM', x: 20, y: 112 },
        { name: 'CP#2 Jonggol', km: '62 KM', x: 200, y: 32 },
        { name: 'MONSTER PASS', km: '110 KM', x: 350, y: 9 },
        { name: 'CP#6 Night Nav', km: '165 KM', x: 600, y: 22 },
        { name: 'LEGEND GATE', km: '200 KM', x: 770, y: 108 },
      ],
    },
    {
      id: 'VIRTUAL',
      tabLabel: 'VIRTUAL RIDE',
      km: 'BEBAS',
      watermark: 'GPS',
      subtitle: 'VIRTUAL RIDE',
      title: 'Virtual Ride',
      titleNote: '(19 Chapters)',
      elevation: 'Rute Lokal',
      elevationMeters: 0,
      cot: 'Fleksibel',
      wave: 'Mandiri H-Event',
      tag: 'VALIDASI STRAVA / KOMOOT',
      format: 'Virtual Ride Mandiri',
      specialRules: 'Khusus Luar Jabodetabek · Outdoor Only · Medali Dikirim DHS Logistik',
      photo: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 200.000',
      priceJersey: 'Rp 250.000',
      desc: 'Bagi 80.000+ anggota GX-ID di 19 Chapter se-Indonesia. Selesaikan jarak tantangan di kota domisili Anda, validasi via Strava Webhook, dan medali resmi dikirim ke rumah.',
      routeHighlights: '19 Chapter: Bandung, Surabaya, Medan, Bali, Jogja, Makassar, Semarang, Solo & Nasional',
      terrain: 'Rute Domisili Lokal di 19 Regional Chapter GX-ID se-Indonesia',
      gearTip: 'Outdoor GPS Validasi Otomatis via Strava Webhook · Medali via DHS Logistik',
      elevationPath: 'M 0 75 Q 100 60, 200 75 T 400 60 T 600 75 T 800 65 L 800 130 L 0 130 Z',
      waypoints: [
        { name: 'START LOKAL', km: 'Kota Anda', x: 20, y: 72 },
        { name: 'STRAVA SYNC', km: 'GPS Log', x: 280, y: 64 },
        { name: 'AUTO-VALIDATE', km: 'Cloud Bot', x: 540, y: 72 },
        { name: 'DHS LOGISTIK', km: 'Kirim Rumah', x: 770, y: 63 },
      ],
    },
  ];

  const currentCategory = categories.find((c) => c.id === selectedId) || categories[2];

  return (
    <div className="bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC ATHLETIC HERO SECTION (NIKE TRAIL / CANYON STYLE) */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Cinematic Action Photography Background with soft dissolve at the bottom */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
          }}
        >
          <img
            src="/hero.webp"
            alt="Gravel Grindurance Cyclist Action"
            className="w-full h-full object-cover object-center scale-[1.15] filter brightness-[0.78] contrast-[1.1] saturate-[1.2]"
            style={{ transformOrigin: 'center center' }}
          />
          {/* Soft dark gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11]/60 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 w-full flex flex-col items-center sm:items-start space-y-6">
          
          {/* 1. Event Graphic Title with Radial Fire Backlight & Kinetic Glow */}
          <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[1150px] group">
            {/* Ambient Radial Backlight Glow in exact logo orange */}
            <div className="absolute -inset-4 sm:-inset-10 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.35)_0%,rgba(250,109,11,0.12)_45%,transparent_70%)] blur-2xl sm:blur-3xl opacity-90 -z-10 animate-pulse pointer-events-none" />
            
            <img
              src="/nama_event.webp"
              alt="Gravel Grindurance"
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_55px_rgba(250,109,11,0.45)] transition-all duration-700 group-hover:scale-[1.015] group-hover:drop-shadow-[0_0_80px_rgba(250,109,11,0.7)]"
            />
          </div>

          {/* 2. Tagline (Guaranteed 1 Line) & Subtext */}
          <div className="space-y-2 max-w-4xl text-center sm:text-left w-full">
            <h2 className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-extrabold uppercase tracking-wider italic whitespace-nowrap overflow-hidden text-ellipsis">
              UN-SUPPORTED RAIN SEASON EXPEDITION <span className="text-[#FA6D0B]">//</span> 60–200 KM
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
              Tantangan ketahanan mandiri musim hujan edisi perayaan komunitas GX-ID. Hadir dengan 5 kategori offline serta Virtual Ride nasional terintegrasi.
            </p>
          </div>

          {/* 3. Action Buttons (Styled Exactly Like Header CTA Pill) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Primary Action Button (REGISTER NOW — Solid Orange Pill) */}
            <Link
              href="/daftar"
              className="group relative px-8 sm:px-9 py-3 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] border border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,109,11,0.55)] flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>REGISTER NOW // JOIN THE EXPEDITION</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>

            {/* Secondary Action Button (PANDUAN LOMBA & PERATURAN) */}
            <Link
              href="/peraturan"
              className="group relative px-7 sm:px-8 py-3 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wider text-white border border-[#FA6D0B]/60 hover:border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,109,11,0.3)] overflow-hidden flex items-center justify-center gap-2.5"
            >
              {/* Hover background fill */}
              <span className="absolute inset-0 bg-[#FA6D0B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                PANDUAN LOMBA & PERATURAN
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
          </div>

          {/* 4. Running Text Ticker — Directly Under Buttons */}
          <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[1150px] mt-6 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden py-3 px-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="animate-marquee flex items-center whitespace-nowrap text-xs sm:text-[13px] font-semibold tracking-widest uppercase text-slate-300">
              {/* Set 1 */}
              <div className="flex items-center">
                <span>MINGGU KE-2 DESEMBER 2026</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>START & FINISH: ABEEY COFFEE & LRT HARJAMUKTI CIBUBUR</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>RUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>FORMAT: SELF-SUPPORTED · RAIN SEASON EXPEDITION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>KATEGORI: 60 KM · 80 KM · 120 KM RACE · 150 KM CROSS · 200 KM ULTRA</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>VIRTUAL RIDE NASIONAL: STRAVA GPS AUTO-VALIDATION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span className="text-[#FA6D0B] font-bold">INSENTIF MEAL COUPON RP 50.000: WANITA, USIA ≤ 17 TAHUN & TIM PAIR MIX</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>80.000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>
              </div>

              {/* Set 2 */}
              <div className="flex items-center" aria-hidden="true">
                <span>MINGGU KE-2 DESEMBER 2026</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>START & FINISH: ABEEY COFFEE & LRT HARJAMUKTI CIBUBUR</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>RUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>FORMAT: SELF-SUPPORTED · RAIN SEASON EXPEDITION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>KATEGORI: 60 KM · 80 KM · 120 KM RACE · 150 KM CROSS · 200 KM ULTRA</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>VIRTUAL RIDE NASIONAL: STRAVA GPS AUTO-VALIDATION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span className="text-[#FA6D0B] font-bold">INSENTIF MEAL COUPON RP 50.000: WANITA, USIA ≤ 17 TAHUN & TIM PAIR MIX</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>80.000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* ========================================================================= */}
      {/* 2. HYBRID COCKPIT TELEMETRY & ATHLETIC MONOLITHS (NIKE TRAIL X GARMIN HUD) */}
      {/* ========================================================================= */}
      <section id="kategori" className="relative pt-8 pb-24">
        
        {/* Dynamic Fluid Wave Background Overlapping Upwards into Hero with Feathered Blend */}
        <div 
          className="absolute -top-64 bottom-0 inset-x-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/bg-orange.webp"
            alt="Grindurance Fluid Flow Background"
            className="w-full h-full object-cover object-top opacity-95 filter contrast-125 saturate-135 brightness-110"
          />
        </div>

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-3">
              <span className="text-sm sm:text-base md:text-lg font-black text-[#FA6D0B] uppercase tracking-widest block font-mono pl-7 sm:pl-9 md:pl-11">
                60 — 200 KM EXPEDITION
              </span>
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] group">
                {/* Subtle ambient backlight glow in brand orange */}
                <div className="absolute -inset-3 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.28)_0%,transparent_70%)] blur-2xl opacity-80 pointer-events-none" />
                <img
                  src="/text official categories.webp"
                  alt="Official Categories"
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
            <div className="border-l-2 border-[#FA6D0B] pl-4 py-0.5 max-w-md">
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                Tanpa mobil pengawal. Menembus guyuran hujan lebat, bebatuan makadam, dan tanjakan brutal hingga <span className="text-[#FA6D0B] font-bold font-mono">+3.180 meter</span> di koridor liar Jonggol–Sukamakmur.
              </p>
            </div>
          </div>
        </div>

        {/* SVG Definition for the Custom Grindurance Speed/Velocity Pattern (Orange Brand Tone) */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="grinduranceSpeedPattern" width="30" height="48" patternUnits="userSpaceOnUse">
              {/* Continuous baseline thin tracks */}
              {[4, 12, 20, 28, 36, 44].map((y) => (
                <line
                  key={`line-${y}`}
                  x1="0"
                  y1={y}
                  x2="30"
                  y2={y}
                  stroke="#FA6D0B"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />
              ))}

              {/* Diagonal velocity bars (shift 5px per line, width 16px, height 3.5px) */}
              {[
                { y: 2.25, x: 0 },
                { y: 10.25, x: 5 },
                { y: 18.25, x: 10 },
                { y: 26.25, x: 15 },
                { y: 34.25, x: 20 },
                { y: 42.25, x: 25 },
              ].map((bar, i) => (
                <g key={`bar-${i}`}>
                  <rect
                    x={bar.x}
                    y={bar.y}
                    width="16"
                    height="3.5"
                    rx="1.75"
                    fill="#FA6D0B"
                  />
                  <rect
                    x={bar.x - 30}
                    y={bar.y}
                    width="16"
                    height="3.5"
                    rx="1.75"
                    fill="#FA6D0B"
                  />
                </g>
              ))}
            </pattern>
          </defs>
        </svg>

        {/* Full-Bleed Edge-to-Edge Category Stage Bar (Translucent Glass to Let BG Glow Through) */}
        <div className="relative z-10 w-full border-y border-white/10 bg-black/40 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="flex lg:grid lg:grid-cols-6 divide-x divide-white/10 overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map((c) => {
              const isActive = c.id === selectedId;
              const isRace = c.isRace || c.id === '120_PAIR';
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`group relative text-left py-4 sm:py-5 px-4 sm:px-5 lg:px-6 transition-all duration-300 flex flex-col justify-between overflow-hidden focus:outline-none min-w-[175px] sm:min-w-[195px] lg:min-w-0 flex-shrink-0 lg:flex-shrink ${
                    isRace
                      ? isActive
                        ? 'bg-gradient-to-b from-[#FA6D0B]/20 via-[#FA6D0B]/10 to-transparent text-white shadow-[inset_0_0_24px_rgba(250,109,11,0.2)] border-x border-[#FA6D0B]/40 z-20'
                        : 'bg-gradient-to-b from-amber-500/[0.06] via-white/[0.02] to-transparent hover:from-amber-500/[0.14] hover:via-white/[0.03] hover:to-transparent text-slate-300 border-x border-amber-500/20'
                      : isActive
                        ? 'bg-gradient-to-b from-[#FA6D0B]/25 via-[#FA6D0B]/10 to-transparent text-white'
                        : 'bg-transparent hover:bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  {/* Unified Aerodynamic Speed Pattern Layer across the column (Fading gracefully from right to left) */}
                  {isRace && (
                    <div 
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 overflow-hidden ${
                        isActive ? 'opacity-40 group-hover:opacity-55' : 'opacity-20 group-hover:opacity-35'
                      }`}
                      style={{
                        maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)',
                      }}
                    >
                      <div 
                        className="absolute inset-x-0 -top-12 -bottom-12 animate-race-flow group-hover:animate-race-flow-fast"
                      >
                        <svg className="w-full h-full">
                          <rect width="100%" height="100%" fill="url(#grinduranceSpeedPattern)" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Top Glowing Indicator Bar */}
                  <div
                    className={`absolute top-0 inset-x-0 transition-all duration-300 ${
                      isRace
                        ? isActive
                          ? 'bg-gradient-to-r from-amber-400 via-[#FA6D0B] to-amber-500 shadow-[0_0_24px_#FA6D0B] h-[3px]'
                          : 'bg-gradient-to-r from-amber-500/40 via-[#FA6D0B]/30 to-amber-500/40 group-hover:from-amber-400 group-hover:to-[#FA6D0B] h-[2px]'
                        : isActive
                          ? 'bg-[#FA6D0B] shadow-[0_0_18px_#FA6D0B] h-1'
                          : 'bg-transparent group-hover:bg-white/20 h-1'
                    }`}
                  />

                  {/* Micro Racing Pill Badge (Styled exactly like header pill tags, NO ICONS) */}
                  {isRace ? (
                    <div className="relative z-10 flex items-center justify-between gap-1 mb-1.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                        isActive
                          ? 'bg-[#FA6D0B] text-black shadow-[0_0_14px_rgba(250,109,11,0.6)]'
                          : 'bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/40 group-hover:border-[#FA6D0B]'
                      }`}>
                        PODIUM TOP 3
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-wider text-[#FA6D0B] uppercase">
                        PAIR MIX // DUAL
                      </span>
                    </div>
                  ) : (
                    <div className="h-2" />
                  )}

                  {/* Header Row: Big Bold Distance + Telemetry Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`font-display text-2xl sm:text-3xl font-black italic tracking-tight uppercase transition-all leading-none inline-block pr-1.5 ${
                        isRace
                          ? isActive
                            ? 'text-white drop-shadow-[0_0_24px_rgba(250,109,11,0.75)]'
                            : 'text-white/90 group-hover:text-white drop-shadow-[0_0_12px_rgba(250,109,11,0.3)]'
                          : isActive
                            ? 'text-white drop-shadow-[0_0_20px_rgba(250,109,11,0.65)]'
                            : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {c.km === 'BEBAS' ? 'VIRTUAL' : c.km}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight shrink-0 transition-all duration-300 ${
                        isRace
                          ? isActive
                            ? 'text-amber-300 drop-shadow-[0_0_14px_rgba(245,158,11,0.9)] font-black'
                            : 'text-amber-400/80 group-hover:text-amber-300'
                          : isActive
                            ? 'text-[#FA6D0B] drop-shadow-[0_0_14px_rgba(250,109,11,0.9)] font-black'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {c.elevation === 'Rute Lokal' ? 'GPS LOG' : c.elevation}
                    </span>
                  </div>

                  {/* Subtitle & Telemetry Meta */}
                  <div className="relative z-10 space-y-0.5">
                    <div
                      className={`text-xs font-bold uppercase tracking-wider truncate ${
                        isRace
                          ? isActive
                            ? 'text-[#FA6D0B] font-black'
                            : 'text-[#FA6D0B]/90 group-hover:text-[#FA6D0B]'
                          : isActive
                            ? 'text-[#FA6D0B]'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {isRace ? 'OFFICIAL RACE // PODIUM' : c.subtitle}
                    </div>
                    <div className={`text-[10px] truncate font-mono ${
                      isRace
                        ? isActive 
                          ? 'text-amber-100/90 font-medium' 
                          : 'text-slate-300 group-hover:text-amber-100'
                        : 'text-slate-300'
                    }`}>
                      {c.cot !== 'Fleksibel' ? `COT ${c.cot} // ${c.wave}` : '19 CHAPTER NASIONAL'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* THE CENTERPIECE: OPEN ATHLETIC SHOWCASE (NO CONFINING OUTER BORDERS) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-6">
          
          {/* KOLOM KIRI (5 COLS): DUMMY ROUTE MAP PREVIEW (DENGAN BACKGROUND RUTE DI SEMUA KATEGORI) */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[440px] lg:min-h-[490px] rounded-2xl overflow-hidden bg-[#0A0C10] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between p-5 sm:p-6 group select-none">
            {/* Background Image: public/background rute.webp */}
            <img
              src="/background rute.webp"
              alt="Background Rute"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.42] contrast-125 saturate-120 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            {/* Vignette Overlay to maintain full GPS telemetry & node legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-black/45 to-[#0A0C10]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.18)_0%,transparent_75%)] pointer-events-none" />

            {/* Top Header: Judul Rute Besar Layaknya Judul - Rata Tengah & Lebih Besar */}
            <div className="relative z-10 flex items-center justify-center text-center pb-2">
              <h4 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white italic tracking-tight leading-none inline-block pr-2 drop-shadow-md">
                {currentCategory.id === 'VIRTUAL' ? 'ROUTE VIRTUAL RIDE' : `ROUTE ${currentCategory.km}`}
              </h4>
            </div>

            {/* Center: Dynamic Stylized Route Map Canvas */}
            <div className="relative w-full h-56 sm:h-64 my-auto flex items-center justify-center">
              <svg viewBox="0 0 460 300" className="w-full h-full max-h-[290px]">
                <defs>
                  <filter id="mapRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#FA6D0B" floodOpacity="0.8" />
                  </filter>
                  <linearGradient id="mapRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FA6D0B" />
                    <stop offset="50%" stopColor="#FFB366" />
                    <stop offset="100%" stopColor="#FA6D0B" />
                  </linearGradient>
                </defs>

                {/* Topographic Background Relief Curves */}
                <path d="M 0 90 Q 120 60, 240 90 T 460 70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <path d="M 0 150 Q 150 120, 270 140 T 460 130" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <path d="M 0 210 Q 110 190, 260 200 T 460 190" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <circle cx="280" cy="140" r="70" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="280" cy="140" r="115" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4 4" />

                {/* Dynamic GPS Gravel Loop Line */}
                <path
                  d={
                    currentCategory.id === '60'
                      ? "M 100 180 C 140 120, 230 90, 320 110 C 370 140, 360 210, 280 230 C 200 240, 120 220, 100 180 Z"
                      : currentCategory.id === '80'
                      ? "M 90 190 C 120 100, 230 70, 340 85 C 400 120, 380 220, 290 240 C 190 250, 110 230, 90 190 Z"
                      : currentCategory.id === '120_PAIR'
                      ? "M 80 200 C 110 80, 230 50, 370 70 C 420 110, 410 220, 330 250 C 240 270, 130 250, 80 200 Z"
                      : currentCategory.id === '150'
                      ? "M 70 210 C 100 70, 230 40, 380 60 C 430 100, 420 230, 340 260 C 230 280, 120 260, 70 210 Z"
                      : currentCategory.id === '200'
                      ? "M 60 215 C 90 60, 230 30, 390 50 C 440 90, 430 240, 350 270 C 220 290, 110 270, 60 215 Z"
                      : "M 80 150 C 160 80, 300 80, 380 150 C 300 220, 160 220, 80 150 Z"
                  }
                  fill="none"
                  stroke="url(#mapRouteGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#mapRouteGlow)"
                />

                {/* Animated Flowing Trail Dash */}
                <path
                  d={
                    currentCategory.id === '60'
                      ? "M 100 180 C 140 120, 230 90, 320 110 C 370 140, 360 210, 280 230 C 200 240, 120 220, 100 180 Z"
                      : currentCategory.id === '80'
                      ? "M 90 190 C 120 100, 230 70, 340 85 C 400 120, 380 220, 290 240 C 190 250, 110 230, 90 190 Z"
                      : currentCategory.id === '120_PAIR'
                      ? "M 80 200 C 110 80, 230 50, 370 70 C 420 110, 410 220, 330 250 C 240 270, 130 250, 80 200 Z"
                      : currentCategory.id === '150'
                      ? "M 70 210 C 100 70, 230 40, 380 60 C 430 100, 420 230, 340 260 C 230 280, 120 260, 70 210 Z"
                      : currentCategory.id === '200'
                      ? "M 60 215 C 90 60, 230 30, 390 50 C 440 90, 430 240, 350 270 C 220 290, 110 270, 60 215 Z"
                      : "M 80 150 C 160 80, 300 80, 380 150 C 300 220, 160 220, 80 150 Z"
                  }
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                  className="animate-dash-flow opacity-80"
                />

                {/* Checkpoint Nodes along the Loop */}
                {currentCategory.id === 'VIRTUAL' ? (
                  <>
                    <g transform="translate(85, 150)">
                      <circle cx="0" cy="0" r="10" fill="none" stroke="#FA6D0B" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
                      <circle cx="0" cy="0" r="5" fill="#FA6D0B" stroke="#000" strokeWidth="2" />
                      <text x="-12" y="-10" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="monospace" textAnchor="end">START LOKAL</text>
                    </g>
                    <g transform="translate(230, 80)">
                      <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#FA6D0B" strokeWidth="2" />
                      <text x="0" y="-10" fill="#CBD5E1" fontSize="8.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">STRAVA // KOMOOT</text>
                    </g>
                    <g transform="translate(370, 150)">
                      <circle cx="0" cy="0" r="5" fill="#FA6D0B" stroke="#FFF" strokeWidth="1.5" />
                      <text x="12" y="-6" fill="#FA6D0B" fontSize="8.5" fontWeight="900" fontFamily="monospace">AUTO-VALIDATE</text>
                    </g>
                  </>
                ) : (
                  <>
                    {/* Node 1: START // ABEEY */}
                    <g transform="translate(85, 195)">
                      <circle cx="0" cy="0" r="10" fill="none" stroke="#FA6D0B" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
                      <circle cx="0" cy="0" r="5" fill="#FA6D0B" stroke="#000" strokeWidth="2" />
                      <text x="-12" y="-10" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="monospace" textAnchor="end">START // ABEEY</text>
                    </g>

                    {/* Node 2: CP#1 */}
                    <g transform="translate(235, 68)">
                      <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#FA6D0B" strokeWidth="2" />
                      <text x="0" y="-10" fill="#CBD5E1" fontSize="8.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">CP#1 // JONGGOL</text>
                    </g>

                    {/* Node 3: KOM CLIMB */}
                    <g transform="translate(365, 80)">
                      <circle cx="0" cy="0" r="5" fill="#FA6D0B" stroke="#FFF" strokeWidth="1.5" />
                      <text x="12" y="-6" fill="#FA6D0B" fontSize="8.5" fontWeight="900" fontFamily="monospace">KOM // SUKAMAKMUR</text>
                    </g>

                    {/* Node 4: PITSTOP CP */}
                    <g transform="translate(325, 245)">
                      <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#FA6D0B" strokeWidth="2" />
                      <text x="12" y="14" fill="#CBD5E1" fontSize="8.5" fontWeight="700" fontFamily="monospace">PITSTOP // CP#4</text>
                    </g>
                  </>
                )}
              </svg>
            </div>

            {/* Bottom Footer: Route Highlights & GPX Release Note */}
            <div className="relative z-10 space-y-2 pt-3 border-t border-white/[0.08]">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#FA6D0B] font-bold">KORIDOR RUTE //</span>
                <span className="text-slate-300 truncate max-w-[220px] sm:max-w-xs">{currentCategory.routeHighlights}</span>
              </div>
              <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-400 pt-1 border-t border-white/[0.04]">
                <span>ELEVASI {currentCategory.elevation}</span>
                <span className="text-amber-400 font-bold uppercase tracking-wider">
                  {currentCategory.id === 'VIRTUAL' ? 'VALIDASI VIA STRAVA / KOMOOT' : 'FILE .GPX AKAN DIBUKA H-2'}
                </span>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (7 COLS): TATA LETAK TERBUKA, FLUID & BEBAS BATASAN KAKU */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Header: Judul Etape Besar (Single Line Layout - Never Wraps) */}
            <div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase text-white italic tracking-tight leading-none drop-shadow-sm flex items-baseline gap-x-2.5 whitespace-nowrap">
                <span>{currentCategory.title}</span>
                {currentCategory.titleNote && (
                  <span className="text-xs sm:text-sm lg:text-base font-mono font-bold text-slate-400 not-italic uppercase tracking-wider inline-block">
                    {currentCategory.titleNote}
                  </span>
                )}
              </h3>
            </div>
            
            {/* 1. BARIS SPESIFIKASI KUNCI (OPEN TELEMETRY BAR) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/[0.08] py-4 sm:py-5 border-y border-white/[0.08]">
              {/* Jarak */}
              <div className="space-y-1 sm:pr-4">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">JARAK</span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className={`font-display font-black text-white italic leading-none ${currentCategory.id === 'VIRTUAL' ? 'text-xl sm:text-2xl xl:text-3xl' : 'text-2xl sm:text-3xl xl:text-4xl'}`}>
                    {currentCategory.km.split(' ')[0]}
                  </span>
                  {currentCategory.km.split(' ')[1] && (
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                      {currentCategory.km.split(' ')[1]}
                    </span>
                  )}
                </div>
              </div>

              {/* Total Elev */}
              <div className="space-y-1 sm:px-4">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">TOTAL ELEV</span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  {currentCategory.id === 'VIRTUAL' ? (
                    <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-[#FA6D0B] italic leading-none">
                      Rute Lokal
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-[#FA6D0B] italic leading-none">
                        {currentCategory.elevation.split(' ')[0]}
                      </span>
                      {currentCategory.elevation.split(' ')[1] && (
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B]/80 uppercase not-italic">
                          {currentCategory.elevation.split(' ')[1]}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Wave Start */}
              <div className="space-y-1 sm:px-4 border-t sm:border-t-0 border-white/[0.08] pt-3 sm:pt-0">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">WAVE START</span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  {currentCategory.id === 'VIRTUAL' ? (
                    <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-white italic leading-none">
                      Mandiri
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                        {currentCategory.wave.split(' ')[0]}
                      </span>
                      {currentCategory.wave.split(' ')[1] && (
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                          {currentCategory.wave.split(' ')[1]}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Batas Waktu */}
              <div className="space-y-1 sm:pl-4 border-t sm:border-t-0 border-white/[0.08] pt-3 sm:pt-0">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">BATAS WAKTU</span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  {currentCategory.id === 'VIRTUAL' ? (
                    <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-white italic leading-none">
                      Fleksibel
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                        {currentCategory.cot.split(' ')[0]}
                      </span>
                      {currentCategory.cot.split(' ')[1] && (
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                          {currentCategory.cot.split(' ')[1]}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 2. CERITA ETAPE & LINTASAN (TERBUKA & TYPOGRAPHIC) */}
            <div className="space-y-3.5">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {currentCategory.desc}
              </p>
              
              <div className="space-y-2 py-1 text-xs sm:text-[13px]">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <span className="text-[#FA6D0B] font-bold font-mono tracking-wider shrink-0">LINTASAN //</span>
                  <span>{currentCategory.routeHighlights}</span>
                </div>
                {currentCategory.isRace ? (
                  <div className="flex items-start gap-2.5 text-amber-300 font-medium pt-1">
                    <span className="text-[#FA6D0B] font-bold font-mono tracking-wider shrink-0">REGULASI //</span>
                    <span>Wajib Live Tracking via <strong>RaceRoute.id</strong> · Perebutan Podium Top 3 Putra, Putri &amp; Tim Tandem Pair Mix.</span>
                  </div>
                ) : (currentCategory.id === '150' || currentCategory.id === '200') ? (
                  <div className="flex items-start gap-2.5 text-amber-300 font-medium pt-1">
                    <span className="text-[#FA6D0B] font-bold font-mono tracking-wider shrink-0">REGULASI //</span>
                    <span>Wajib menyelesaikan <strong>Prolog 30 km mandiri (03:00–05:00 WIB)</strong> sebelum registrasi start.</span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* 3. BIAYA & AKSI REGISTRASI (STRIP TERBUKA DENGAN CTA PILL ELEGAN) */}
            <div className="pt-6 border-t border-white/[0.08] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  BIAYA PENDAFTARAN RESMI //
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold w-fit">
                  SUBSIDI MEAL COUPON RP 50.000 // WANITA, ≤17 TH &amp; PAIR MIX
                </span>
              </div>

              <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
                {currentCategory.isRace ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10 flex-1">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-mono uppercase tracking-wider font-bold mb-1">Single Rider:</span>
                      <div className="flex items-baseline gap-2 whitespace-nowrap">
                        <strong className="text-xl sm:text-2xl font-display font-black text-white italic leading-none">{currentCategory.priceMedal}</strong>
                        <span className="text-xs text-slate-500 font-mono">/</span>
                        <strong className="text-xl sm:text-2xl font-display font-black text-[#FA6D0B] italic leading-none">{currentCategory.priceJersey}</strong>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">(+Jersey)</span>
                      </div>
                    </div>
                    <div className="pt-3 sm:pt-0 sm:pl-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] text-[#FA6D0B] font-mono uppercase tracking-wider font-bold">Tim Pair Mix (2 Pax):</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FA6D0B]/20 text-[#FA6D0B] font-mono font-bold">Hemat 100k</span>
                      </div>
                      <div className="flex items-baseline gap-2 whitespace-nowrap">
                        <strong className="text-xl sm:text-2xl font-display font-black text-white italic leading-none">{currentCategory.pairPriceMedal}</strong>
                        <span className="text-xs text-slate-500 font-mono">/</span>
                        <strong className="text-xl sm:text-2xl font-display font-black text-[#FA6D0B] italic leading-none">{currentCategory.pairPriceJersey}</strong>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">(+Jersey)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-6 sm:gap-8 flex-1">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-mono uppercase tracking-wider font-bold mb-1">Paket Medal Saja</span>
                      <strong className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white italic tracking-tight block leading-none">
                        {currentCategory.priceMedal}
                      </strong>
                    </div>
                    <div className="h-10 w-px bg-white/10 hidden sm:block" />
                    <div>
                      <span className="text-[11px] text-[#FA6D0B] block font-mono uppercase tracking-wider font-bold mb-1">Paket Medal + Jersey</span>
                      <strong className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#FA6D0B] italic tracking-tight block leading-none drop-shadow-[0_0_12px_rgba(250,109,11,0.35)]">
                        {currentCategory.priceJersey}
                      </strong>
                    </div>
                  </div>
                )}

                {/* Primary Registration Action CTA */}
                <Link
                  href={`/daftar?category=${currentCategory.id}`}
                  className="group relative px-8 py-3.5 rounded-full text-xs sm:text-[13px] font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,109,11,0.6)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-95 shrink-0"
                >
                  <span>DAFTAR SEKARANG</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>


      {/* ========================================================================= */}
      {/* 3. COMMUNITY, VENUE & LIFESTYLE (HUMAN WARMTH AT ABEEY COFFEE) */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-b border-white/10 bg-[#111216]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Image Collage */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop"
                  alt="Gravel Adventure"
                  className="w-full h-52 object-cover rounded-lg filter contrast-105"
                />
                <img
                  src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop"
                  alt="Cyclist Sweat"
                  className="w-full h-40 object-cover rounded-lg filter contrast-105"
                />
              </div>
              <div className="space-y-4 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop"
                  alt="Gravel Bicycle"
                  className="w-full h-40 object-cover rounded-lg filter contrast-105"
                />
                <img
                  src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop"
                  alt="Scenic Forest Trail"
                  className="w-full h-52 object-cover rounded-lg filter contrast-105"
                />
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block">
                BASECAMP & KOMUNITAS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic">
                DIBANGUN OLEH KOMUNITAS, UNTUK KEBERSAMAAN
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Gravel Grindurance bukan sekadar angka kilometer di atas kertas. Ini adalah perayaan 
                persahabatan 80.000 pesepeda dari 19 Chapter se-Indonesia. 
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-[#FA6D0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">ABEEY Coffee & Eatery (Basecamp & Lounge)</strong>
                    <span className="text-slate-400">Titik start dan pemulihan finisher. Nikmati hidangan lokal, kombucha sehat, dan sharing rute bersama teman satu komunitas.</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FA6D0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Akses Ramah Sepeda: Stasiun LRT Harjamukti</strong>
                    <span className="text-slate-400">Hanya beberapa langkah dari venue start. Sepeda lipat maupun road/gravel bike diizinkan masuk gerbong kereta LRT Jabodebek.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/peserta"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#FA6D0B] hover:underline"
                >
                  <span>Cek Rider Roster & Teman Skuad Anda &rarr;</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. RACE OPS & CRITICAL RULES */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-1">
              REGULASI & KESELAMATAN
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic">
              ATURAN KESELAMATAN & PROLOG
            </h2>
          </div>
          <Link
            href="/peraturan"
            className="text-xs font-bold text-[#F59E0B] hover:underline flex items-center gap-1"
          >
            <span>Baca Regulasi Lengkap Athlete Guide &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#F59E0B] font-bold block text-sm">01 / PROLOG 30 KM SUBUH</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">Wajib Untuk 150 & 200 KM</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Peserta kategori 150 km dan 200 km wajib menempuh minimal 30 km mandiri antara pukul 03:00–05:00 WIB. 
              Track GPS diverifikasi panitia di Meja Scrutineering sebelum wave start dilepas.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#FA6D0B] font-bold block text-sm">02 / UN-SUPPORTED EXPEDITION</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">Prinsip Mandiri Penuh</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dilarang membawa mobil pengawal (support car) atau bantuan feeding eksternal pribadi. 
              Peserta mengandalkan logistik mandiri dan warung lokal di sepanjang rute untuk perbekalan.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#F59E0B] font-bold block text-sm">03 / EMERGENCY MEDICAL BACKUP</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">SPGDT RS Hermina Cibubur</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dukungan ambulans gawat darurat dan tim medis siaga. Nomor darurat SPGDT RS Hermina Cibubur (021-828-1234) 
              wajib disimpan di telepon genggam setiap atlet.
            </p>
          </div>

        </div>

      </section>


      {/* ========================================================================= */}
      {/* 5. FINAL HIGH-ENERGY CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-[#0D0E11] to-black text-center space-y-6">
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest block">
          KUOTA TERBATAS // AMBIL NOMOR BIB ANDA SEKARANG
        </span>
        <h2 className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tight text-white italic drop-shadow-md">
          BERANI TAKLUKKAN MEDAN JONGGOL?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Pilih paket Medal Saja atau Medal & Jersey resmi GX-ID Anniversary Edition. 
          Pendaftaran ditutup saat kuota gelombang terpenuhi.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/daftar"
            className="px-12 py-5 rounded font-display uppercase tracking-wider text-lg font-black bg-[#F59E0B] hover:bg-[#D97706] text-black shadow-[0_0_40px_rgba(245,158,11,0.5)] inline-flex items-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <span>DAFTAR SEKARANG — PILIH KATEGORI</span>
            <ArrowUpRight className="w-6 h-6 stroke-[3]" />
          </Link>
        </div>
      </section>

    </div>
  );
}
