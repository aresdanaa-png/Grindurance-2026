import Link from 'next/link';
import { Clock, MapPin, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

export default function KategoriPage() {
  const categoriesList = [
    {
      id: '200',
      name: '200 Ultra (200 KM)',
      badge: 'Tier 01 // Ultra',
      isPremier: true,
      cot: '19 Jam',
      start: '05:30 WIB (Wave 1)',
      elevation: '+3,180 m+',
      prolog: 'Wajib 30 KM Subuh (03:00 - 05:00 WIB)',
      tracking: 'Wajib Live Tracking (Traccar / Strava)',
      description: 'Format ketahanan ultra murni bagi pesepeda jarak jauh berpengalaman. Melewati malam dan jalur makadam Gunung Batu serta tanjakan ekstrem Sukamakmur.',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: '150',
      name: '150 Grand Fondo (150 KM)',
      badge: 'Tier 02 // Grand Fondo',
      isPremier: false,
      cot: '15 Jam',
      start: '05:30 WIB (Wave 1)',
      elevation: '+2,100 m+',
      prolog: 'Wajib 30 KM Subuh (03:00 - 05:00 WIB)',
      tracking: 'Wajib Live Tracking',
      description: 'Jarak klasik veteran endurance yang menguji efisiensi tenaga di jalan aspal kelupas dan perbukitan Jonggol selatan sebelum loop kembali ke Sentul.',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: '120_PAIR',
      name: '120 (Race) Single & Pair Mix',
      badge: 'Tier 03 // Race (Podium)',
      isPremier: false,
      cot: '11 Jam',
      start: '06:00 WIB (Wave 2)',
      elevation: '+1,450 m+',
      prolog: 'Tidak Ada Prolog',
      tracking: 'Wajib Aktif (RaceRoute.id / Strava)',
      description: 'Satu-satunya kategori kompetitif resmi dengan perebutan podium Top 3. Mendukung registrasi tandem Pair Mix 2 Pax (Pria & Wanita) dengan handicap waktu khusus.',
      priceMedal: 'Single: Rp 400.000 // Pair: Rp 700.000',
      priceJersey: 'Single: Rp 450.000 // Pair: Rp 750.000',
    },
    {
      id: '100',
      name: '100 Fondo (100 KM)',
      badge: 'Tier 04 // Fondo Exploration',
      isPremier: false,
      cot: '9.5 Jam',
      start: '07:00 WIB (Wave 3)',
      elevation: '+850 m+',
      prolog: 'Tidak Ada Prolog',
      tracking: 'Opsional (Rekomendasi Komoot / Strava)',
      description: 'Eksplorasi rute fondo melintasi persawahan Cileungsi dan perbukitan Jonggol timur. Cocok untuk pesepeda yang ingin menaklukkan 100 km dengan atmosfer festival.',
      priceMedal: 'Rp 300.000',
      priceJersey: 'Rp 350.000',
    },
    {
      id: '60',
      name: '60 Fun Ride (60 KM)',
      badge: 'Tier 05 // Fun Ride',
      isPremier: false,
      cot: '7 Jam',
      start: '07:00 WIB (Wave 3)',
      elevation: '+450 m+',
      prolog: 'Tidak Ada Prolog',
      tracking: 'Opsional',
      description: 'Format rekreasi yang memadukan aspal perkotaan Cibubur dan lintasan tanah pedesaan Jonggol. Sangat ramah untuk pemula, sepeda lipat, hybrid, dan penikmat gowes santai.',
      priceMedal: 'Rp 250.000',
      priceJersey: 'Rp 300.000',
    },
    {
      id: 'VIRTUAL',
      name: 'Virtual Ride Nasional',
      badge: 'Tier 06 // Nationwide (19 Chapters)',
      isPremier: false,
      cot: 'Fleksibel H-Event',
      start: 'Waktu Mandiri (Outdoor GPS)',
      elevation: 'Sesuai Rute Mandiri',
      prolog: 'Tidak Ada Prolog',
      tracking: 'Wajib Sinkronisasi Strava Webhook',
      description: 'Dibuka untuk seluruh anggota GX-ID se-Indonesia dari 19 chapter regional di luar Jabodetabek. Medali finisher resmi dan jersey dikirim langsung via DHS Logistik.',
      priceMedal: 'Rp 200.000',
      priceJersey: 'Rp 250.000',
    },
  ];

  return (
    <div className="bg-brand-base text-brand-light font-sans py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="border-b border-brand-border/60 pb-8">
          <span className="font-sans font-bold text-xs text-brand-gold uppercase tracking-widest block mb-2">
            GX-ID OFFICIAL SPEC SHEET // 2026 EDITION
          </span>
          <h1 className="font-display italic text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            PANDUAN KATEGORI & RUTE
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed font-sans">
            Perbandingan teknis komprehensif 5 kategori jarak offline ditambah 1 format daring nasional. 
            Setiap kategori dirancang dengan profil elevasi, batas waktu (COT), dan tantangan navigasi mandiri.
          </p>
        </div>

        {/* Spec Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-2xl border ${
                cat.isPremier ? 'border-brand-gold/60 bg-gradient-to-b from-brand-card to-zinc-950' : 'border-zinc-800 bg-brand-card'
              } p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-brand-gold/50 transition-all`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                    cat.isPremier 
                      ? 'bg-brand-gold text-brand-dark' 
                      : 'border border-zinc-700 bg-zinc-900 text-slate-300'
                  }`}>
                    {cat.badge}
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">{cat.start}</span>
                </div>

                <div>
                  <h3 className="font-display italic text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Technical Table */}
                <div className="border-t border-zinc-800/80 pt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Batas Waktu (COT):</span>
                    <span className="text-white font-bold">{cat.cot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Elevasi:</span>
                    <span className="text-white font-bold">{cat.elevation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Syarat Prolog:</span>
                    <span className={cat.prolog.includes('Wajib') ? 'text-brand-gold font-bold' : 'text-slate-500'}>
                      {cat.prolog}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Live Tracking:</span>
                    <span className="text-white font-semibold">{cat.tracking}</span>
                  </div>
                </div>

                {/* Price Matrix */}
                <div className="border-t border-zinc-800/80 pt-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Medal Saja</span>
                    <span className="text-white font-bold text-sm">{cat.priceMedal}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-brand-gold block uppercase font-bold tracking-wider">Medal & Jersey</span>
                    <span className="text-brand-gold font-black text-sm">{cat.priceJersey}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/daftar?category=${cat.id}`}
                  className="w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-brand-gold text-white hover:text-brand-dark border border-zinc-700 hover:border-brand-gold font-display italic font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Daftar Kategori Ini</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Notice Strip */}
        <div className="rounded-2xl border border-zinc-800 bg-brand-card p-6 font-sans text-xs text-slate-400 space-y-2">
          <div className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Aturan Teknis Sepeda & Aksesoris Musim Hujan:</span>
          </div>
          <p className="leading-relaxed text-xs text-slate-400">
            1. Ban minimal yang diizinkan adalah 35mm (sangat direkomendasikan 38–45c untuk segmen makadam Sodong).
            <br />
            2. Wajib membawa wet lube, ban dalam/tubeless plug kit cadangan, lampu depan ganda (satu cadangan), dan lampu belakang merah steady non-flashing.
            <br />
            3. Peserta wanita, remaja usia ≤ 17 tahun, dan tim Pair Mix (Pria & Wanita) berhak atas potongan Meal Coupon senilai Rp 50.000 yang dipotong otomatis saat checkout.
          </p>
        </div>

      </div>
    </div>
  );
}
