import Link from 'next/link';
import { Clock, MapPin, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

export default function KategoriPage() {
  const categoriesList = [
    {
      id: '200',
      name: 'Ultra Gravel 200++ KM',
      badge: 'Tier 01 // Ultra Endurance',
      isPremier: true,
      cot: '18 Jam',
      start: '05:30 WIB (Wave 1)',
      elevation: '+3,180 m+',
      pitstop: 'CP#4 Jonggol (Wajib 30 Menit)',
      prolog: 'Wajib 30 KM Subuh (03:00 - 05:00 WIB)',
      tracking: 'Wajib Live Tracking (Traccar / Strava)',
      description: 'Format ketahanan ultra murni bagi pesepeda jarak jauh berpengalaman. Melewati malam dan jalur makadam Gunung Batu serta tanjakan ekstrem Sukamakmur.',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: '150',
      name: 'Cross Gravel 150++ KM',
      badge: 'Tier 02 // Cross Gran Fondo',
      isPremier: false,
      cot: '14 Jam',
      start: '05:30 WIB (Wave 1)',
      elevation: '+2,100 m+',
      pitstop: 'CP#4 Jonggol (Wajib 30 Menit)',
      prolog: 'Wajib 30 KM Subuh (03:00 - 05:00 WIB)',
      tracking: 'Wajib Live Tracking',
      description: 'Jarak klasik veteran endurance yang menguji efisiensi tenaga di jalan aspal kelupas dan perbukitan Jonggol selatan sebelum loop kembali ke Sentul.',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: '120_PAIR',
      name: 'Amazing Race 120 KM (Pair & Single)',
      badge: 'Tier 03 // Competitive Race',
      isPremier: false,
      cot: '10 Jam',
      start: '06:00 WIB (Wave 2)',
      elevation: '+1,450 m+',
      pitstop: 'CP#4 Jonggol (Wajib 30 Menit)',
      prolog: 'Tidak Ada Prolog',
      tracking: 'Wajib Aktif (RaceRoute.id / Strava)',
      description: 'Satu-satunya kategori kompetitif resmi dengan perebutan podium Top 3. Mendukung registrasi tandem Pair Mix 2 Pax (Pria & Wanita) dengan handicap waktu khusus.',
      priceMedal: 'Single: Rp 400.000 // Pair: Rp 700.000',
      priceJersey: 'Single: Rp 450.000 // Pair: Rp 750.000',
    },
    {
      id: '80',
      name: 'Urban Gravel 80++ KM',
      badge: 'Tier 04 // Weekend Challenge',
      isPremier: false,
      cot: '8 Jam',
      start: '07:00 WIB (Wave 3)',
      elevation: '+750 m+',
      pitstop: 'CP#6 Sodong Springs (Wajib 30 Menit)',
      prolog: 'Tidak Ada Prolog',
      tracking: 'Opsional (Rekomendasi Komoot / Strava)',
      description: 'Eksplorasi jarak menengah melintasi persawahan Cileungsi dan perbukitan Jonggol timur. Cocok untuk pesepeda akhir pekan yang ingin meningkatkan jarak jelajah.',
      priceMedal: 'Rp 300.000',
      priceJersey: 'Rp 350.000',
    },
    {
      id: '60',
      name: 'Urban Gravel 60++ KM',
      badge: 'Tier 05 // Entry Level',
      isPremier: false,
      cot: '6 Jam',
      start: '07:00 WIB (Wave 3)',
      elevation: '+450 m+',
      pitstop: 'CP#6 Sodong Springs (Wajib 30 Menit)',
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
      pitstop: 'Mandiri',
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
        <div className="border-b border-brand-border pb-8">
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block mb-2">
            GX-ID OFFICIAL SPEC SHEET // 2026 EDITION
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            PANDUAN KATEGORI & RUTE
          </h1>
          <p className="mt-3 text-sm sm:text-base text-brand-muted max-w-3xl leading-relaxed">
            Perbandingan teknis komprehensif 5 kategori jarak offline ditambah 1 format daring nasional. 
            Setiap kategori dirancang dengan profil elevasi, batas waktu (COT), dan aturan pitstop tersendiri.
          </p>
        </div>

        {/* Spec Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className={`border ${
                cat.isPremier ? 'border-brand-accent/60' : 'border-brand-border'
              } bg-brand-surface p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-brand-borderHover transition-all`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-0.5 border ${
                    cat.isPremier 
                      ? 'border-brand-accent/40 bg-brand-base text-brand-accent font-bold' 
                      : 'border-brand-border bg-brand-base text-brand-muted'
                  }`}>
                    {cat.badge}
                  </span>
                  <span className="text-brand-muted">{cat.start}</span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs text-brand-muted mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Technical Table */}
                <div className="border-t border-brand-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Batas Waktu (COT):</span>
                    <span className="text-white font-bold">{cat.cot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Total Elevasi:</span>
                    <span className="text-white font-bold">{cat.elevation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Ketentuan Pitstop:</span>
                    <span className="text-white">{cat.pitstop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Syarat Prolog:</span>
                    <span className={cat.prolog.includes('Wajib') ? 'text-brand-accent font-bold' : 'text-zinc-500'}>
                      {cat.prolog}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Live Tracking:</span>
                    <span className="text-white">{cat.tracking}</span>
                  </div>
                </div>

                {/* Price Matrix */}
                <div className="border-t border-brand-border pt-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-brand-muted block uppercase">Medal Saja</span>
                    <span className="text-white font-bold">{cat.priceMedal}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-brand-accent block uppercase">Medal & Jersey</span>
                    <span className="text-brand-accent font-bold">{cat.priceJersey}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/daftar?category=${cat.id}`}
                  className="w-full py-3 border border-brand-border hover:border-brand-accent bg-zinc-900 hover:bg-brand-accent text-white hover:text-brand-base font-display font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Daftar Kategori Ini</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Notice Strip */}
        <div className="border border-brand-border bg-brand-surface p-6 font-mono text-xs text-brand-muted space-y-2">
          <div className="text-white font-bold uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span>Aturan Teknis Sepeda & Aksesoris Musim Hujan:</span>
          </div>
          <p className="font-sans leading-relaxed text-xs">
            1. Ban minimal yang diizinkan adalah 35mm (sangat direkomendasikan 38–45c untuk segmen makadam Sodong).
            <br />
            2. Wajib membawa wet lube, ban dalam/tubeless plug kit cadangan, lampu depan ganda (satu cadangan), dan lampu belakang merah steady non-flashing.
            <br />
            3. Peserta wanita, remaja usia $\le 17$ tahun, dan tim Pair Mix (Pria & Wanita) berhak atas potongan Meal Coupon senilai Rp 50.000 yang dipotong otomatis saat checkout.
          </p>
        </div>

      </div>
    </div>
  );
}
