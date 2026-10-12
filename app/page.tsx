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
  ChevronDown
} from 'lucide-react';

export default function HomePage() {
  const categories = [
    {
      id: '60',
      km: '60 KM',
      subtitle: 'APEX SPRINT',
      title: 'Urban Gravel 60',
      elevation: '+450 m',
      cot: '6 Jam',
      wave: '07:00 WIB',
      tag: 'ENTRY LEVEL & HYBRID',
      photo: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=800&auto=format&fit=crop',
      price: 'Rp 250k / Rp 300k',
      desc: 'Lintasan tanah pedesaan Jonggol & aspal Cibubur. Sangat ramah pemula, sepeda lipat, dan gowes santai.',
    },
    {
      id: '80',
      km: '80 KM',
      subtitle: 'RIDGELINE RUSH',
      title: 'Urban Gravel 80',
      elevation: '+750 m',
      cot: '8 Jam',
      wave: '07:00 WIB',
      tag: 'WEEKEND CHALLENGE',
      photo: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=800&auto=format&fit=crop',
      price: 'Rp 300k / Rp 350k',
      desc: 'Menjelajahi persawahan Cileungsi dan makadam Pemandian Sodong. Etape peningkatan jarak ideal.',
    },
    {
      id: '120_PAIR',
      km: '120 KM',
      subtitle: 'SUMMIT SEEKER',
      title: 'Amazing Race 120 (Pair & Single)',
      elevation: '+1,450 m',
      cot: '10 Jam',
      wave: '06:00 WIB',
      tag: 'RACE PODIUM & PAIR MIX',
      photo: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=800&auto=format&fit=crop',
      price: 'Single: Rp 400k // Pair: Rp 700k',
      desc: 'Kompetisi resmi dengan perebutan podium Top 3. Mendukung tandem Pair Mix 2 Pax dengan handicap waktu.',
    },
    {
      id: '150',
      km: '150 KM',
      subtitle: 'EPIC CROSS',
      title: 'Cross Gravel 150',
      elevation: '+2,100 m',
      cot: '14 Jam',
      wave: '05:30 WIB',
      tag: 'WAJIB PROLOG 30 KM',
      photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      price: 'Rp 400k / Rp 450k',
      desc: 'Tantangan klasik veteran endurance menembus tanjakan Sukamakmur dan turunan teknis berbatu.',
    },
    {
      id: '200',
      km: '200 KM',
      subtitle: 'GRINDURANCE ULTRA',
      title: 'Ultra Gravel 200',
      elevation: '+3,180 m',
      cot: '18 Jam',
      wave: '05:30 WIB',
      tag: 'THE PINNACLE // NIGHT NAV',
      photo: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop',
      price: 'Rp 400k / Rp 450k',
      desc: 'Kategori puncak ketahanan fisik dan navigasi malam. Loop penuh Jonggol–Sukamakmur–Sentul.',
    },
  ];

  return (
    <div className="bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#F59E0B] selection:text-black">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC ATHLETIC HERO SECTION (NIKE TRAIL / CANYON STYLE) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        
        {/* Cinematic Action Photography Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2200&auto=format&fit=crop"
            alt="Gravel Grindurance Cyclist Action"
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.15]"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/40 to-[#0D0E11]/80" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left w-full space-y-8">
          
          {/* Top Athletic Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
              GX-ID ANNIVERSARY EDITION // DESEMBER 2026
            </span>
          </div>

          {/* Monumental Kinetic Headline */}
          <div className="space-y-2">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-tight text-white leading-[0.92] italic drop-shadow-lg">
              GRAVEL <br />
              <span className="text-[#F59E0B]">GRINDURANCE</span> 2026
            </h1>
            <p className="font-display text-xl sm:text-3xl text-slate-300 uppercase tracking-wider font-semibold pt-2">
              CONQUER THE CHASE. UNLEASH THE DIRT. REGISTER NOW.
            </p>
          </div>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
            Tantangan ketahanan sepeda gravel dan ultra-cycling mandiri di lintasan Jonggol–Sukamakmur–Sentul. 
            Jelajahi makadam batu lepas dan aspal kelupas di musim hujan bersama ribuan pesepeda dari 19 Chapter se-Indonesia.
          </p>

          {/* High-Energy Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/daftar"
              className="px-9 py-4 rounded-md font-display uppercase tracking-wider text-base font-bold bg-[#F59E0B] hover:bg-[#D97706] text-black shadow-[0_0_35px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>GET YOUR SPOT // DAFTAR SEKARANG</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </Link>

            <a
              href="#kategori"
              className="px-8 py-4 rounded-md font-display uppercase tracking-wider text-sm font-bold bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition-colors"
            >
              <span>EXPLORE 5 RACES</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Meal Coupon Incentive Ribbon */}
          <div className="inline-flex items-center gap-3 p-3 rounded-lg bg-black/70 border border-white/15 backdrop-blur-md text-xs font-mono text-slate-300">
            <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <span>
              <strong className="text-white">Meal Coupon Rp 50.000 Otomatis:</strong> Untuk wanita, remaja $\le 17$ tahun, dan tim Pair Mix.
            </span>
          </div>

        </div>

      </section>


      {/* ========================================================================= */}
      {/* 2. THE 5 RACE TIERS (ATHLETIC PHOTO CARDS ALA NIKE TRAIL & CANYON) */}
      {/* ========================================================================= */}
      <section id="kategori" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-widest block mb-1">
              // OFFICIAL CATEGORY SPECIFICATIONS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic">
              PILIH JARAK TANTANGAN ANDA
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-md">
            Mulai dari etape 60 km pemula hingga 200 km ultra dengan navigasi malam dan elevasi tembus +3.180 meter.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((c) => (
            <div
              key={c.id}
              className="group bg-[#15171C] border border-white/10 hover:border-[#F59E0B] rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              {/* Card Photo Header */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={c.photo}
                  alt={c.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15171C] via-[#15171C]/20 to-transparent" />
                
                {/* Distance Badge on Photo */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-[#F59E0B]/60 px-2.5 py-1 rounded">
                  <span className="font-display text-lg font-black text-[#F59E0B] block leading-none italic">
                    {c.km}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-slate-300 uppercase block">
                    {c.subtitle}
                  </span>
                </div>

                <div className="absolute bottom-2 right-3 font-mono text-[10px] text-slate-300 bg-black/60 px-2 py-0.5 rounded">
                  {c.elevation}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                {/* Quick Spec List */}
                <div className="border-t border-white/10 pt-3 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Wave Start:</span>
                    <span className="text-white font-bold">{c.wave}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Batas Waktu:</span>
                    <span className="text-white font-bold">{c.cot}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Biaya Mulai:</span>
                    <span className="text-[#F59E0B] font-bold">{c.price.split('//')[0]}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <Link
                    href={`/daftar?category=${c.id}`}
                    className="w-full py-2.5 rounded font-display uppercase tracking-wider text-xs font-bold bg-[#F59E0B] hover:bg-[#D97706] text-black flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>DAFTAR {c.km}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Virtual Ride Banner */}
        <div className="p-6 rounded-lg bg-gradient-to-r from-[#171920] to-[#121318] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F59E0B] uppercase">
              <Compass className="w-4 h-4" />
              <span>VIRTUAL RIDE NASIONAL // 19 CHAPTERS SE-INDONESIA</span>
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-white tracking-tight">
              Gowes Dari Kota Anda Sendiri Via Strava Webhook
            </h3>
            <p className="text-xs text-slate-400 max-w-xl font-sans">
              Bagi anggota GX-ID di luar Jabodetabek. Selesaikan jarak tantangan di rute lokal Anda, 
              validasi otomatis via Strava, dan medali resmi dikirim ke rumah Anda via DHS Logistik.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="text-right font-mono text-xs hidden sm:block">
              <span className="text-slate-400 block">Biaya Registrasi:</span>
              <span className="text-[#F59E0B] font-bold text-base">Rp 200.000</span>
            </div>
            <Link
              href="/daftar?category=VIRTUAL"
              className="px-6 py-3 rounded font-display uppercase tracking-wider text-xs font-bold bg-white hover:bg-slate-200 text-black transition-colors"
            >
              Daftar Virtual Ride
            </Link>
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
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-widest block">
                // THE ATHLETE LOUNGE & COMMUNITY DNA
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic">
                DIBANGUN OLEH KOMUNITAS, UNTUK KEBERSAMAAN
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Gravel Grindurance bukan sekadar angka kilometer di atas kertas. Ini adalah perayaan 
                persahabatan 80.000 pesepeda dari 19 Chapter se-Indonesia. 
              </p>

              <div className="space-y-4 font-mono text-xs text-slate-300">
                <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans text-sm">ABEEY Coffee & Eatery (Basecamp & Lounge)</strong>
                    <span>Titik start dan pemulihan finisher. Nikmati hidangan lokal, kombucha sehat, dan sharing rute bersama teman satu komunitas.</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans text-sm">Akses Ramah Sepeda: Stasiun LRT Harjamukti</strong>
                    <span>Hanya beberapa langkah dari venue start. Sepeda lipat maupun road/gravel bike diizinkan masuk gerbong kereta LRT Jabodebek.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/peserta"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F59E0B] hover:underline"
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
            <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-widest block mb-1">
              // RACE OPERATION RIGOR
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic">
              ATURAN KESELAMATAN & PROLOG
            </h2>
          </div>
          <Link
            href="/peraturan"
            className="font-mono text-xs text-[#F59E0B] hover:underline flex items-center gap-1"
          >
            <span>Baca Regulasi Lengkap Athlete Guide &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          
          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#F59E0B] font-bold block text-sm">01 / PROLOG 30 KM SUBUR</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">Wajib Untuk 150 & 200 KM</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Peserta kategori 150 km dan 200 km wajib menempuh minimal 30 km mandiri antara pukul 03:00–05:00 WIB. 
              Track GPS diverifikasi panitia di Meja Scrutineering sebelum wave start dilepas.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#F59E0B] font-bold block text-sm">02 / MANDATORY 30-MIN PITSTOP</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">Penalti Waktu 300%</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Wajib istirahat minimal 30 menit di CP#4 Jonggol atau CP#6 Sodong demi keselamatan musim hujan. 
              Keberangkatan dini dikenakan denda penalti waktu 300% dari sisa menit yang dilanggar.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#F59E0B] font-bold block text-sm">03 / EMERGENCY MEDICAL BACKUP</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">SPGDT RS Hermina Cibubur</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
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
        <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-widest block">
          KUOTA TERBATAS // AMBIL NOMOR BIB ANDA SEKARANG
        </span>
        <h2 className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tight text-white italic drop-shadow-md">
          BERANI TAKLUKKAN MEDAN JONGGOL?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
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
