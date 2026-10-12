import Link from 'next/link';
import { 
  Award, Shield, Users, Bike, Clock, MapPin, 
  ChevronRight, Sparkles, Navigation, AlertTriangle, 
  HeartHandshake, CheckCircle2, Flame
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-brand-border/60">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            GX-ID Anniversary Edition · Desember 2026
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none">
            Gravel <span className="gradient-gold-text">Grindurance</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-300 tracking-normal mt-2">
              Jonggol Loop · Musim Hujan · Self-Supported
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Tantangan ketahanan gravel dan ultra-endurance tahunan oleh GX-ID (Gravel & Ultra Cycling Indonesia). Lintasan aspal kelupas, tanah perkebunan, dan makadam bebatuan dari Cibubur melintasi Jonggol, Sukamakmur, hingga Sentul.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/daftar"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Daftar Sekarang</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>

            <a
              href="#kategori"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-brand-card border border-brand-border text-white hover:bg-brand-cardHover transition-all flex items-center justify-center gap-2"
            >
              <span>Eksplorasi 5 Kategori</span>
            </a>
          </div>

          {/* Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 text-left">
            <div className="bg-brand-card/80 p-4 rounded-2xl border border-brand-border">
              <span className="text-2xl font-black text-brand-gold block">80.000+</span>
              <span className="text-xs text-slate-400 font-medium">Anggota Komunitas GX-ID</span>
            </div>
            <div className="bg-brand-card/80 p-4 rounded-2xl border border-brand-border">
              <span className="text-2xl font-black text-brand-orange block">19 Chapter</span>
              <span className="text-xs text-slate-400 font-medium">Regional Se-Indonesia</span>
            </div>
            <div className="bg-brand-card/80 p-4 rounded-2xl border border-brand-border">
              <span className="text-2xl font-black text-brand-sky block">60 - 200 KM</span>
              <span className="text-xs text-slate-400 font-medium">5 Pilihan Kategori Tantangan</span>
            </div>
            <div className="bg-brand-card/80 p-4 rounded-2xl border border-brand-border">
              <span className="text-2xl font-black text-emerald-400 block">Hybrid</span>
              <span className="text-xs text-slate-400 font-medium">Offline Loop & Virtual Ride</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5 KATEGORI TANTANGAN */}
      {/* ========================================================================= */}
      <section id="kategori" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            Tantang Batas Kemampuan Anda
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Kategori Jarak & Format Tantangan
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Tersedia pilihan jarak mulai dari pemula rekreasi hingga spesialis ultra-cycling dengan navigasi malam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 60 KM */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-border flex flex-col justify-between hover:border-brand-border/80 transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-1 rounded-md bg-brand-dark text-xs font-bold text-brand-sky border border-brand-border">
                  Fun Gravel
                </span>
                <span className="text-xs text-slate-500 font-semibold">Start: 07:00 WIB</span>
              </div>
              <h3 className="text-xl font-black text-white">Urban Gravel 60++ KM</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Rute ramah pemula, sepeda lipat, hybrid, dan pesepeda rekreasi yang ingin menikmati keindahan pedesaan Jonggol.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Batas Waktu (COT): 5–6 Jam</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Pitstop Wajib CP#6 (Min. 30 Mnt)</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Mulai dari</span>
                <span className="text-lg font-black text-brand-gold">Rp 250.000</span>
              </div>
              <Link href="/daftar" className="text-xs font-bold text-white hover:text-brand-gold flex items-center gap-1">
                Daftar <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 80 KM */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-border flex flex-col justify-between hover:border-brand-border/80 transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-1 rounded-md bg-brand-dark text-xs font-bold text-brand-sky border border-brand-border">
                  Fun Gravel
                </span>
                <span className="text-xs text-slate-500 font-semibold">Start: 07:00 WIB</span>
              </div>
              <h3 className="text-xl font-black text-white">Urban Gravel 80++ KM</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Tantangan eksplorasi jarak menengah bagi pesepeda akhir pekan dengan lanskap persawahan dan perbukitan santai.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Batas Waktu (COT): 7–8 Jam</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Pitstop Wajib CP#6 (Min. 30 Mnt)</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Mulai dari</span>
                <span className="text-lg font-black text-brand-gold">Rp 300.000</span>
              </div>
              <Link href="/daftar" className="text-xs font-bold text-white hover:text-brand-gold flex items-center gap-1">
                Daftar <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 120 KM RACE */}
          <div className="bg-gradient-to-br from-brand-card to-brand-cardHover p-6 rounded-2xl border-2 border-brand-gold shadow-glow flex flex-col justify-between relative">
            <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-brand-gold text-brand-dark">
              Kompetitif (Podium)
            </div>
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-1 rounded-md bg-brand-dark text-xs font-bold text-brand-gold border border-brand-gold/30">
                  Amazing Race
                </span>
              </div>
              <h3 className="text-xl font-black text-white">Amazing Race 120++ KM</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Satu-satunya kategori balapan berhadiah podium (Top 3 Fastest). Tersedia kelas Individu & Pair Mix (2 pax) dengan sistem handicap waktu.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Batas Waktu (COT): 9–10 Jam | Start: 06:00 WIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Live Tracking & Geofencing Wajib</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Single / Pair Mix</span>
                <span className="text-lg font-black text-brand-gold">Rp 400k / Rp 700k</span>
              </div>
              <Link href="/daftar" className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1">
                Daftar Race <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 150 KM CROSS */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-border flex flex-col justify-between hover:border-brand-border/80 transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-1 rounded-md bg-brand-dark text-xs font-bold text-brand-orange border border-brand-border">
                  Cross Gravel
                </span>
                <span className="text-xs text-red-400 font-bold">Wajib Prolog 30 KM</span>
              </div>
              <h3 className="text-xl font-black text-white">Cross Gravel 150++ KM</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Ujian ketahanan veteran endurance menembus tanjakan menengah Sukamakmur-Cariu dan bebatuan lepas Gunung Batu.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>COT: 13–14 Jam | Start: 05:30 WIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Prolog Mandiri 30 KM Subuh (03:00-05:00)</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Mulai dari</span>
                <span className="text-lg font-black text-brand-gold">Rp 400.000</span>
              </div>
              <Link href="/daftar" className="text-xs font-bold text-white hover:text-brand-gold flex items-center gap-1">
                Daftar <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 200 KM ULTRA */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-border flex flex-col justify-between hover:border-brand-border/80 transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-1 rounded-md bg-brand-dark text-xs font-bold text-purple-400 border border-brand-border">
                  Ultra Gravel
                </span>
                <span className="text-xs text-red-400 font-bold">Wajib Prolog 30 KM</span>
              </div>
              <h3 className="text-xl font-black text-white">Ultra Gravel 200++ KM</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Level tertinggi bagi spesialis ultra-endurance. Navigasi malam musim hujan dengan elevasi dan lumpur ekstrem.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>COT: 16–18 Jam | Start: 05:30 WIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  <span>Wajib 2 Lampu Depan & Navigasi Malam</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Mulai dari</span>
                <span className="text-lg font-black text-brand-gold">Rp 400.000</span>
              </div>
              <Link href="/daftar" className="text-xs font-bold text-white hover:text-brand-gold flex items-center gap-1">
                Daftar <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* VIRTUAL RIDE */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-border flex flex-col justify-between hover:border-brand-border/80 transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-1 rounded-md bg-brand-dark text-xs font-bold text-emerald-400 border border-brand-border">
                  Virtual Ride
                </span>
                <span className="text-xs text-emerald-400 font-bold">Nasional</span>
              </div>
              <h3 className="text-xl font-black text-white">Virtual Ride 19 Chapter</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Bagi anggota di luar Jabodetabek. Gowes di kota Anda masing-masing, validasi otomatis via Strava Webhook, medali fisik dikirim ke rumah.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Validasi Otomatis Strava (Anti-Indoor)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Pengiriman Medali via DHS Logistik</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Mulai dari</span>
                <span className="text-lg font-black text-emerald-400">Rp 200.000</span>
              </div>
              <Link href="/daftar" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
                Daftar Virtual <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ATURAN UTAMA & DNA BALAP */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-card p-8 sm:p-12 rounded-3xl border border-brand-border space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
              Filosofi & Regulasi Wajib
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Standar Regulasi GX-ID Grindurance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-brand-dark/60 p-6 rounded-2xl border border-brand-border/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Unsupported (Mandiri)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dilarang membawa mobil atau kru pendukung pribadi (*support car/crew*). Peserta wajib mandiri menyiapkan logistik, navigasi, dan perbaikan mekanik.
              </p>
            </div>

            <div className="bg-brand-dark/60 p-6 rounded-2xl border border-brand-border/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Pitstop Wajib 30 Menit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Di pos pitstop wajib (CP#4 / CP#6), peserta wajib berhenti minimal 30 menit. Istirahat kurang dari 30 menit dikenai penalti waktu 3x lipat (300%).
              </p>
            </div>

            <div className="bg-brand-dark/60 p-6 rounded-2xl border border-brand-border/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Navigation className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Prolog 30 KM Subuh</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Khusus kategori 150 km & 200 km, peserta wajib menempuh minimal 30 km mandiri antara pukul 03:00–05:00 WIB dan diverifikasi di meja scrutineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CTA BOTTOM BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-cardHover via-brand-card to-brand-cardHover p-8 sm:p-12 rounded-3xl border border-brand-gold/40 shadow-glow text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Siap Menaklukkan Lintasan Gravel 2026?
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Amankan nomor BIB dan official jersey Anda sekarang sebelum kuota kategori habis.
          </p>
          <div className="pt-2">
            <Link
              href="/daftar"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm bg-brand-gold text-brand-dark hover:brightness-110 shadow-glow transition-all"
            >
              <span>Buka Formulir Pendaftaran</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
