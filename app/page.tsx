import Link from 'next/link';
import { 
  ArrowUpRight, 
  Compass, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronRight,
  Sparkles,
  Users,
  Activity
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-brand-base text-brand-light font-sans selection:bg-brand-accent selection:text-brand-base">
      
      {/* ========================================================================= */}
      {/* 1. HERO EXPEDITION HEADER */}
      {/* ========================================================================= */}
      <section className="relative border-b border-brand-border bg-grid-surveyor pt-8 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Top Meta Header Bar */}
        <div className="max-w-7xl mx-auto border-b border-brand-border pb-4 mb-8 flex flex-wrap items-center justify-between text-[11px] font-mono text-brand-muted gap-2 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span>GX-ID EXPEDITION // EDITION 04</span>
          </div>
          <div>CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP</div>
          <div className="hidden sm:block text-brand-accent">DESEMBER 2026 // RAIN SEASON</div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            
            {/* Tagline */}
            <div className="inline-block border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs text-brand-accent uppercase tracking-wider">
              ANNIVERSARY EDITION · 80.000+ RIDERS · 19 CHAPTERS
            </div>

            {/* Monumental Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold uppercase tracking-tight text-white leading-none">
              GRAVEL <span className="text-brand-accent">GRINDURANCE</span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl text-brand-muted tracking-normal font-sans font-light mt-3">
                Jonggol Loop · Musim Hujan · Unsupported Ultra
              </span>
            </h1>

            <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed font-sans">
              Uji batas ketahanan fisik dan navigasi mandiri di atas makadam batu lepas, tanah perkebunan basah, 
              dan aspal kelupas. Pilihan 5 jarak bertingkat (60–200 km) dengan kontrol waktu pitstop ketat 
              dan prolog subuh 30 km.
            </p>

            {/* Conversion CTA Group */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/daftar"
                className="px-8 py-4 rounded-sm font-display uppercase tracking-wider text-base font-bold bg-brand-accent hover:bg-brand-accentDark text-brand-base shadow-solar flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Daftar Sekarang — Pilih Kategori</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </Link>

              <Link
                href="/peserta"
                className="px-6 py-4 rounded-sm font-mono uppercase tracking-wider text-xs font-semibold border border-brand-border bg-brand-surface hover:bg-brand-surfaceHover text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Users className="w-4 h-4 text-brand-accent" />
                <span>Lihat Start List ({13}+ Atlet Terdaftar)</span>
              </Link>
            </div>

            {/* Meal Coupon Incentive Notice */}
            <div className="p-3 rounded-sm border border-brand-border bg-brand-surface/60 max-w-xl text-xs font-mono text-brand-muted flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Insentif Meal Coupon Rp 50.000:</strong> Otomatis diberikan untuk 
                peserta wanita, remaja $\le 17$ tahun, dan tim Pair Mix (Pria & Wanita).
              </span>
            </div>

          </div>

          {/* Technical Specs Strip (Hairline Grid) */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-l border-brand-border font-mono">
            <div className="border-r border-b border-brand-border p-5 bg-brand-surface/40">
              <span className="text-[10px] text-brand-muted uppercase tracking-widest block">Total Elevasi Maksimum</span>
              <span className="font-display text-3xl sm:text-4xl font-bold text-white mt-1 block">
                +3,180 M
              </span>
              <span className="text-[11px] text-brand-muted mt-1 block">Tanjakan Sukamakmur–Cariu</span>
            </div>

            <div className="border-r border-b border-brand-border p-5 bg-brand-surface/40">
              <span className="text-[10px] text-brand-muted uppercase tracking-widest block">Komposisi Medan</span>
              <span className="font-display text-3xl sm:text-4xl font-bold text-brand-accent mt-1 block">
                58% UNPAVED
              </span>
              <span className="text-[11px] text-brand-muted mt-1 block">Makadam, Tanah, Aspal Kelupas</span>
            </div>

            <div className="border-r border-b border-brand-border p-5 bg-brand-surface/40">
              <span className="text-[10px] text-brand-muted uppercase tracking-widest block">Batas Waktu (COT)</span>
              <span className="font-display text-3xl sm:text-4xl font-bold text-white mt-1 block">
                6 – 18 JAM
              </span>
              <span className="text-[11px] text-brand-muted mt-1 block">Sesuai Kategori Pilihan</span>
            </div>

            <div className="border-r border-b border-brand-border p-5 bg-brand-surface/40">
              <span className="text-[10px] text-brand-muted uppercase tracking-widest block">Basecamp / Start</span>
              <span className="font-display text-xl sm:text-2xl font-bold text-white mt-2 block">
                ABEEY COFFEE
              </span>
              <span className="text-[11px] text-brand-muted mt-1 block">LRT Harjamukti, Cibubur</span>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. SECTION 01 // TOPOGRAPHIC REALITY & ELEVATION PROFILE */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border max-w-7xl mx-auto">
        <div className="space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-border pb-6">
            <div>
              <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block mb-1">
                [ 01 // THE TOPOGRAPHY ]
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
                PROFIL ELEVASI & REALITAS MEDAN
              </h2>
            </div>
            <div className="font-mono text-xs text-brand-muted">
              LOOP JABODETABEK TIMUR · TITIK TERTINGGI: 1.020 MDPL
            </div>
          </div>

          {/* Elevation Profile Diagram (Technical SVG Graphic) */}
          <div className="border border-brand-border bg-brand-surface p-6 sm:p-8 relative">
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-brand-muted">
              <span>CIBUBUR (70m)</span>
              <span>JONGGOL CP#4 (180m)</span>
              <span className="text-brand-accent font-bold">SUKAMAKMUR SUMMIT (1,020m)</span>
              <span>SENTUL PASS (680m)</span>
              <span>CIBUBUR (70m)</span>
            </div>

            {/* SVG Elevation Path */}
            <div className="relative h-44 sm:h-56 w-full border-b border-brand-border flex items-end">
              <svg 
                viewBox="0 0 1000 240" 
                className="w-full h-full preserve-3d"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="elevationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0B0C0E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area under curve */}
                <path
                  d="M 0,220 Q 150,210 250,180 T 500,40 T 750,110 T 1000,220 L 1000,240 L 0,240 Z"
                  fill="url(#elevationGrad)"
                />

                {/* Profile Line */}
                <path
                  d="M 0,220 Q 150,210 250,180 T 500,40 T 750,110 T 1000,220"
                  stroke="#D97706"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Checkpoint Markers */}
                {/* Start / Finish */}
                <circle cx="20" cy="220" r="5" fill="#FFFFFF" stroke="#0B0C0E" strokeWidth="2" />
                {/* CP#4 Jonggol */}
                <circle cx="250" cy="180" r="5" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
                {/* Sukamakmur Peak */}
                <circle cx="500" cy="40" r="6" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
                {/* CP#6 Sodong */}
                <circle cx="750" cy="110" r="5" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>

            {/* Surface Breakdown Meter */}
            <div className="mt-8 pt-6 border-t border-brand-border space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white uppercase font-bold">Surface Breakdown (Komposisi Permukaan):</span>
                <span className="text-brand-muted">100% Verified Survey GPX</span>
              </div>

              <div className="w-full h-3 rounded-none overflow-hidden flex bg-zinc-900 border border-brand-border">
                <div style={{ width: '42%' }} className="bg-brand-accent" title="42% Makadam Kasar" />
                <div style={{ width: '34%' }} className="bg-zinc-600" title="34% Aspal Kelupas / Rusak" />
                <div style={{ width: '24%' }} className="bg-zinc-800" title="24% Tanah Perkebunan Basah" />
              </div>

              <div className="flex flex-wrap gap-6 text-[11px] font-mono text-brand-muted pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brand-accent inline-block" />
                  <span className="text-white font-medium">42%</span> Makadam Batu Lepas (Gunung Batu)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-zinc-600 inline-block" />
                  <span className="text-white font-medium">34%</span> Aspal Kelupas / Tarmac Patah
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-zinc-800 inline-block" />
                  <span className="text-white font-medium">24%</span> Singletrack Tanah Basah
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. SECTION 02 // THE FIVE TIERS & SPEC SHEETS */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border max-w-7xl mx-auto">
        <div className="space-y-10">
          
          <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block mb-1">
                [ 02 // THE FIVE COURSES ]
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
                SPESIFIKASI KATEGORI TANTANGAN
              </h2>
            </div>
            <div className="font-mono text-xs text-brand-muted">
              PILIH SESUAI KAPASITAS KETAHANAN ANDA
            </div>
          </div>

          {/* Technical Spec List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
            
            {/* 200 KM ULTRA */}
            <div className="border border-brand-accent/50 bg-brand-surface p-6 flex flex-col justify-between relative group hover:border-brand-accent transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-accent font-bold px-2 py-0.5 border border-brand-accent/40 bg-brand-base">
                    ULTRA GRAVEL
                  </span>
                  <span className="text-brand-muted">WAVE 1 // 05:30 WIB</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase">200++ KM ULTRA</h3>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    Kategori puncak bagi spesialis ultra-cycling. Membutuhkan navigasi malam hari dan persiapan fisik ekstrem.
                  </p>
                </div>

                <div className="border-t border-brand-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Batas Waktu (COT):</span>
                    <span className="text-white font-bold">18 Jam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Prolog Mandiri:</span>
                    <span className="text-brand-accent font-bold">WAJIB 30 KM (03:00)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Mandatory Pitstop:</span>
                    <span className="text-white">CP#4 Jonggol (Min 30 mnt)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Paket Biaya:</span>
                    <span className="text-brand-accent font-bold">Rp 400k / Rp 450k</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/daftar?category=200"
                  className="w-full py-3 border border-brand-accent bg-brand-accent text-brand-base hover:bg-brand-accentDark font-display font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Daftar 200 KM</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* 150 KM CROSS */}
            <div className="border border-brand-border bg-brand-surface p-6 flex flex-col justify-between hover:border-brand-borderHover transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-bold px-2 py-0.5 border border-brand-border bg-brand-base">
                    CROSS GRAVEL
                  </span>
                  <span className="text-brand-muted">WAVE 1 // 05:30 WIB</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase">150++ KM CROSS</h3>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    Jarak klasik veteran endurance yang menggabungkan tanjakan Sukamakmur dengan turunan teknis berbatu.
                  </p>
                </div>

                <div className="border-t border-brand-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Batas Waktu (COT):</span>
                    <span className="text-white font-bold">14 Jam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Prolog Mandiri:</span>
                    <span className="text-brand-accent font-bold">WAJIB 30 KM (03:00)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Mandatory Pitstop:</span>
                    <span className="text-white">CP#4 Jonggol (Min 30 mnt)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Paket Biaya:</span>
                    <span className="text-white font-bold">Rp 400k / Rp 450k</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/daftar?category=150"
                  className="w-full py-3 border border-brand-border bg-zinc-900 text-white hover:border-brand-accent hover:text-brand-accent font-display font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Daftar 150 KM</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 120 KM AMAZING RACE (SINGLE & PAIR MIX) */}
            <div className="border border-brand-border bg-brand-surface p-6 flex flex-col justify-between hover:border-brand-borderHover transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-bold px-2 py-0.5 border border-brand-border bg-brand-base">
                    RACE & TANDEM PAIR
                  </span>
                  <span className="text-brand-muted">WAVE 2 // 06:00 WIB</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase">120 KM AMAZING RACE</h3>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    Format kompetisi murni. Tersedia opsi Single Individual atau Tandem Pair Mix (2 Pax) dengan handicap waktu.
                  </p>
                </div>

                <div className="border-t border-brand-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Batas Waktu (COT):</span>
                    <span className="text-white font-bold">10 Jam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Podium & Hadiah:</span>
                    <span className="text-brand-accent font-bold">TOP 3 PODIUM FINISHER</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Pair Mix 2 Pax:</span>
                    <span className="text-white">Rp 700k / Rp 750k (2 Pax)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Single Biaya:</span>
                    <span className="text-white font-bold">Rp 400k / Rp 450k</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/daftar?category=120_PAIR"
                  className="w-full py-3 border border-brand-border bg-zinc-900 text-white hover:border-brand-accent hover:text-brand-accent font-display font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Daftar 120 KM (Pair/Single)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 80 KM URBAN */}
            <div className="border border-brand-border bg-brand-surface p-6 flex flex-col justify-between hover:border-brand-borderHover transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-muted px-2 py-0.5 border border-brand-border bg-brand-base">
                    FUN GRAVEL
                  </span>
                  <span className="text-brand-muted">WAVE 3 // 07:00 WIB</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase">80 KM URBAN GRAVEL</h3>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    Jarak ideal bagi pesepeda akhir pekan yang ingin merasakan tantangan makadam Sodong dengan cut-off ramah.
                  </p>
                </div>

                <div className="border-t border-brand-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Batas Waktu (COT):</span>
                    <span className="text-white font-bold">8 Jam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Prolog Mandiri:</span>
                    <span className="text-zinc-500">Tidak Wajib</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Mandatory Pitstop:</span>
                    <span className="text-white">CP#6 Sodong (Min 30 mnt)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Paket Biaya:</span>
                    <span className="text-white font-bold">Rp 300k / Rp 350k</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/daftar?category=80"
                  className="w-full py-3 border border-brand-border bg-zinc-900 text-white hover:border-brand-accent hover:text-brand-accent font-display font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Daftar 80 KM</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 60 KM URBAN */}
            <div className="border border-brand-border bg-brand-surface p-6 flex flex-col justify-between hover:border-brand-borderHover transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-muted px-2 py-0.5 border border-brand-border bg-brand-base">
                    ENTRY LEVEL
                  </span>
                  <span className="text-brand-muted">WAVE 3 // 07:00 WIB</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase">60 KM URBAN GRAVEL</h3>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    Rute ramah pemula, sepeda lipat, sepeda hybrid, dan pesepeda rekreasi pedesaan Jonggol.
                  </p>
                </div>

                <div className="border-t border-brand-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Batas Waktu (COT):</span>
                    <span className="text-white font-bold">6 Jam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Prolog Mandiri:</span>
                    <span className="text-zinc-500">Tidak Wajib</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Mandatory Pitstop:</span>
                    <span className="text-white">CP#6 Sodong (Min 30 mnt)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Paket Biaya:</span>
                    <span className="text-white font-bold">Rp 250k / Rp 300k</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/daftar?category=60"
                  className="w-full py-3 border border-brand-border bg-zinc-900 text-white hover:border-brand-accent hover:text-brand-accent font-display font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Daftar 60 KM</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* VIRTUAL RIDE */}
            <div className="border border-brand-border bg-brand-surface p-6 flex flex-col justify-between hover:border-brand-borderHover transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-accent font-bold px-2 py-0.5 border border-brand-accent/40 bg-brand-base">
                    NASIONAL (19 CHAPTERS)
                  </span>
                  <span className="text-brand-muted">H-EVENT FLEXIBLE</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white uppercase">VIRTUAL RIDE</h3>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    Bagi ribuan anggota GX-ID se-Indonesia di luar Jabodetabek. Validasi otomatis rekaman GPS Strava outdoor.
                  </p>
                </div>

                <div className="border-t border-brand-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Sinkronisasi:</span>
                    <span className="text-white font-bold">Strava Webhook Outdoor</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Pengiriman Medali:</span>
                    <span className="text-white font-bold">DHS Logistik ke Rumah</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">E-Sertifikat:</span>
                    <span className="text-brand-accent font-bold">Auto-Generated PDF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Paket Biaya:</span>
                    <span className="text-white font-bold">Rp 200k / Rp 250k</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/daftar?category=VIRTUAL"
                  className="w-full py-3 border border-brand-border bg-zinc-900 text-white hover:border-brand-accent hover:text-brand-accent font-display font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Daftar Virtual Ride</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. SECTION 03 // DISCIPLINE & RULES CODE OF CONDUCT */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border max-w-7xl mx-auto">
        <div className="space-y-10">
          
          <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block mb-1">
                [ 03 // THE CODE OF CONDUCT ]
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
                DISIPLIN OPERASIONAL BALAP
              </h2>
            </div>
            <Link
              href="/peraturan"
              className="font-mono text-xs text-brand-accent hover:underline flex items-center gap-1"
            >
              <span>Baca Athlete Guide Lengkap</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            <div className="border border-brand-border bg-brand-surface p-6 space-y-3">
              <span className="text-brand-accent font-bold block text-sm">01 / PROLOG MANDIRI 30 KM</span>
              <h4 className="text-white font-bold text-base font-sans">Verifikasi GPS Pra-Start</h4>
              <p className="text-brand-muted font-sans leading-relaxed text-xs">
                Peserta 150 km & 200 km wajib gowes minimal 30 km antara 03:00–05:00 WIB sebelum meja registrasi ABEEY Coffee dibuka. 
                Gagal memenuhi jarak prolog = tidak diizinkan masuk garis start (*DNS*).
              </p>
            </div>

            <div className="border border-brand-border bg-brand-surface p-6 space-y-3">
              <span className="text-brand-accent font-bold block text-sm">02 / MANDATORY 30-MIN PITSTOP</span>
              <h4 className="text-white font-bold text-base font-sans">Penalti 300% Dwell Time</h4>
              <p className="text-brand-muted font-sans leading-relaxed text-xs">
                Untuk keselamatan di musim hujan, setiap rider wajib beristirahat minimal 30 menit penuh di CP resmi. 
                Meninggalkan pos lebih awal dikenakan penalti waktu 300% dari selisih durasi yang dilanggar.
              </p>
            </div>

            <div className="border border-brand-border bg-brand-surface p-6 space-y-3">
              <span className="text-brand-accent font-bold block text-sm">03 / SELF-SUPPORTED ETHICS</span>
              <h4 className="text-white font-bold text-base font-sans">Kemandirian Navigasi & Alat</h4>
              <p className="text-brand-muted font-sans leading-relaxed text-xs">
                Dilarang menerima bantuan kendaraan pengawal (*no support crew*). Setiap atlet wajib membawa ban dalam cadangan, 
                lampu depan ganda, rompi reflektif, dan kontak SPGDT RS Hermina Cibubur.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block">
          SLOT TERBATAS // WAVE ALLOCATION BASED
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase text-white tracking-tight">
          AMBIL NOMOR BIB ANDA SEKARANG
        </h2>
        <p className="text-sm text-brand-muted max-w-xl mx-auto font-sans leading-relaxed">
          Amankan kuota sebelum pendaftaran ditutup. Pilih paket Medal Saja atau Medal & Jersey resmi 
          GX-ID Anniversary Edition.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/daftar"
            className="px-10 py-5 rounded-sm font-display uppercase tracking-wider text-lg font-bold bg-brand-accent hover:bg-brand-accentDark text-brand-base shadow-solar inline-flex items-center gap-2 transition-all active:scale-95"
          >
            <span>Buka Formulir Pendaftaran</span>
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </Link>
        </div>
      </section>

    </div>
  );
}
