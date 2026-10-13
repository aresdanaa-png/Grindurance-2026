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
      title: 'Race 120 (Single & Pair Mix)',
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
      title: 'Virtual Ride Nasional (19 Chapters)',
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
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block font-mono">
                60 — 200 KM EXPEDITION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white italic">
                OFFICIAL CATEGORIES
              </h2>
            </div>
            <div className="border-l-2 border-[#FA6D0B] pl-4 py-0.5 max-w-md">
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                Tanpa mobil pengawal. Menembus guyuran hujan lebat, bebatuan makadam, dan tanjakan brutal hingga <span className="text-[#FA6D0B] font-bold font-mono">+3.180 meter</span> di koridor liar Jonggol–Sukamakmur.
              </p>
            </div>
          </div>
        </div>

        {/* Full-Bleed Edge-to-Edge Category Stage Bar (Translucent Glass to Let BG Glow Through) */}
        <div className="relative z-10 w-full border-y border-white/10 bg-black/40 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="flex lg:grid lg:grid-cols-6 divide-x divide-white/10 overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map((c) => {
              const isActive = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`group relative text-left py-4 sm:py-5 px-4 sm:px-5 lg:px-6 transition-all duration-300 flex flex-col justify-between overflow-hidden focus:outline-none min-w-[165px] sm:min-w-[190px] lg:min-w-0 flex-shrink-0 lg:flex-shrink ${
                    isActive
                      ? 'bg-gradient-to-b from-[#FA6D0B]/25 via-[#FA6D0B]/10 to-transparent text-white'
                      : 'bg-transparent hover:bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  {/* Top Glowing Indicator Bar */}
                  <div
                    className={`absolute top-0 inset-x-0 h-1 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FA6D0B] shadow-[0_0_18px_#FA6D0B]'
                        : 'bg-transparent group-hover:bg-white/20'
                    }`}
                  />

                  {/* Header Row: Big Bold Distance + Telemetry Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`font-display text-2xl sm:text-3xl font-black italic tracking-tight uppercase transition-colors leading-none ${
                        isActive
                          ? 'text-white drop-shadow-[0_0_20px_rgba(250,109,11,0.65)]'
                          : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {c.km === 'BEBAS' ? 'VIRTUAL' : c.km}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight shrink-0 transition-all duration-300 ${
                        isActive
                          ? 'text-[#FA6D0B] drop-shadow-[0_0_14px_rgba(250,109,11,0.9)] font-black'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {c.elevation === 'Rute Lokal' ? 'GPS LOG' : c.elevation}
                    </span>
                  </div>

                  {/* Subtitle & Telemetry Meta */}
                  <div className="space-y-0.5">
                    <div
                      className={`text-xs font-bold uppercase tracking-wider truncate ${
                        isActive ? 'text-[#FA6D0B]' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {c.subtitle}
                    </div>
                    <div className="text-[10px] text-slate-300 truncate font-mono">
                      {c.cot !== 'Fleksibel' ? `COT ${c.cot} · ${c.wave}` : '19 Chapter Nasional'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* THE CENTERPIECE: THE CLEAN ATHLETIC CARD (FOCUSED ON REGISTRANT POV) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/50 backdrop-blur-2xl rounded-2xl overflow-hidden p-6 sm:p-8 transition-all duration-500 border ${
            currentCategory.isRace 
              ? 'border-[#FA6D0B]/50 shadow-[0_20px_60px_rgba(250,109,11,0.2)]' 
              : 'border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
          }`}>
          
          {/* KOLOM KIRI (5 COLS): FOTO ATLETIS BERSIH DENGAN TITLE & STATUS */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] rounded-xl overflow-hidden group flex flex-col justify-between p-6 border border-white/10">
            {/* Background Image */}
            <img
              src={currentCategory.photo}
              alt={currentCategory.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
            />
            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

            {/* Top Badge: Hanya 1 Badge Elegan */}
            <div className="relative z-10">
              {currentCategory.isRace ? (
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.6)]">
                  <span>★</span>
                  <span>OFFICIAL RACE · TOP 3 PODIUM &amp; PAIR MIX</span>
                </span>
              ) : currentCategory.id === '150' || currentCategory.id === '200' ? (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/40">
                  <span>⚠️</span>
                  <span>WAJIB PROLOG 30 KM SUBUH</span>
                </span>
              ) : currentCategory.id === '60' ? (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40">
                  <span>🚲</span>
                  <span>RAMAH SEPEDA LIPAT (SELI) &amp; PEMULA</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#FA6D0B] border border-[#FA6D0B]/40">
                  <span>●</span>
                  <span>{currentCategory.tag}</span>
                </span>
              )}
            </div>

            {/* Bottom Caption: Judul Etape & Jarak */}
            <div className="relative z-10 space-y-1.5 pt-12">
              <span className="text-xs font-mono font-bold text-[#FA6D0B] tracking-widest uppercase block">
                {currentCategory.subtitle} · {currentCategory.format.split('/')[0]}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white italic tracking-tight leading-none drop-shadow-md">
                {currentCategory.title}
              </h3>
            </div>
          </div>

          {/* KOLOM KANAN (7 COLS): HANYA 3 HAL ESENSIAL BAGI PENDAFTAR */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* 1. BARIS SPESIFIKASI KUNCI (MINIMALIST TELEMETRY BAR) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-black/60 border border-white/10">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Jarak</span>
                <strong className="font-display text-base sm:text-lg font-black text-white italic">{currentCategory.km}</strong>
              </div>
              <div className="space-y-0.5 border-l border-white/10 pl-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total Elev</span>
                <strong className="font-display text-base sm:text-lg font-black text-[#FA6D0B] italic">{currentCategory.elevation}</strong>
              </div>
              <div className="space-y-0.5 border-l border-white/10 pl-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Wave Start</span>
                <strong className="font-display text-base sm:text-lg font-black text-white italic">{currentCategory.wave}</strong>
              </div>
              <div className="space-y-0.5 border-l border-white/10 pl-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Batas Waktu</span>
                <strong className="font-display text-base sm:text-lg font-black text-white italic">{currentCategory.cot}</strong>
              </div>
            </div>

            {/* 2. CERITA ETAPE & LINTASAN (RINGKAS & MENUSUK) */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {currentCategory.desc}
              </p>
              
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-1 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <span className="text-[#FA6D0B] font-bold font-mono shrink-0">LINTASAN:</span>
                  <span>{currentCategory.routeHighlights}</span>
                </div>
                {currentCategory.isRace ? (
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-medium pt-1 border-t border-white/10">
                    <span>🏆</span>
                    <span>Wajib Live Tracking via <strong>RaceRoute.id</strong> · Perebutan Podium Top 3 Putra, Putri, &amp; Tim Tandem Pair Mix.</span>
                  </div>
                ) : (currentCategory.id === '150' || currentCategory.id === '200') ? (
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-medium pt-1 border-t border-white/10">
                    <span>⚠️</span>
                    <span>Wajib menyelesaikan <strong>Prolog 30 km mandiri (03:00–05:00 WIB)</strong> sebelum registrasi start.</span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* 3. BIAYA & AKSI REGISTRASI LANGSUNG (SUPER CLEAR) */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-black/80 to-[#18191E]/90 border border-white/15 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Biaya Pendaftaran Resmi
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold border border-emerald-500/30 w-fit">
                  ✓ Subsidi Meal Coupon Rp 50.000 (Wanita / ≤17 Th / Pair Mix)
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {currentCategory.isRace ? (
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Single Rider:</span>
                      <span className="font-mono text-white font-bold">
                        {currentCategory.priceMedal} <span className="text-slate-400 font-normal">(Medal)</span> / <strong className="text-[#FA6D0B]">{currentCategory.priceJersey}</strong> <span className="text-slate-400 font-normal">(+Jersey)</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#FA6D0B] font-semibold flex items-center gap-1.5">
                        <span>Tim Pair Mix (2 Pax):</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#FA6D0B]/20 text-[#FA6D0B] font-mono">Hemat 100k</span>
                      </span>
                      <span className="font-mono text-white font-bold">
                        {currentCategory.pairPriceMedal} <span className="text-slate-400 font-normal">(Medal)</span> / <strong className="text-[#FA6D0B]">{currentCategory.pairPriceJersey}</strong> <span className="text-slate-400 font-normal">(+Jersey)</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-xs sm:text-sm flex-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Paket Medal Saja:</span>
                      <strong className="text-white font-mono text-sm">{currentCategory.priceMedal}</strong>
                    </div>
                    <div className="h-6 w-px bg-white/15" />
                    <div>
                      <span className="text-[10px] text-[#FA6D0B] block font-mono font-semibold">Paket Medal + Jersey:</span>
                      <strong className="text-[#FA6D0B] font-mono text-sm">{currentCategory.priceJersey}</strong>
                    </div>
                  </div>
                )}

                {/* Primary Registration Action CTA */}
                <Link
                  href={`/daftar?category=${currentCategory.id}`}
                  className="group relative px-7 py-3.5 rounded-full text-xs sm:text-[13px] font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] border border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,109,11,0.6)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-95 shrink-0"
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
