import Link from 'next/link';
import { Award, Clock, MapPin, Bike, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

export default function KategoriPage() {
  const categoriesList = [
    {
      id: '60',
      name: 'Urban Gravel 60++ KM',
      badge: 'Fun Gravel Ride',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      cot: '5–6 Jam',
      start: '07:00 WIB',
      elevation: '±350 m+',
      pitstop: 'CP#6 (Wajib 30 Menit)',
      prolog: 'Tidak Ada',
      tracking: 'Opsional (Rekomendasi Komoot / Strava)',
      description: 'Format rekreasi yang memadukan aspal perkotaan Cibubur dan lintasan tanah pedesaan Jonggol. Sangat ramah untuk pemula, sepeda lipat, hybrid, dan penikmat gowes santai.',
      priceMedal: 'Rp 250.000',
      priceJersey: 'Rp 300.000',
    },
    {
      id: '80',
      name: 'Urban Gravel 80++ KM',
      badge: 'Fun Gravel Ride',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      cot: '7–8 Jam',
      start: '07:00 WIB',
      elevation: '±550 m+',
      pitstop: 'CP#6 (Wajib 30 Menit)',
      prolog: 'Tidak Ada',
      tracking: 'Opsional',
      description: 'Eksplorasi jarak menengah melintasi persawahan Cileungsi dan perbukitan Jonggol timur. Cocok untuk pesepeda akhir pekan yang ingin meningkatkan jarak jelajah.',
      priceMedal: 'Rp 300.000',
      priceJersey: 'Rp 350.000',
    },
    {
      id: '120',
      name: 'Amazing Race 120++ KM',
      badge: 'Competitive Race (Podium)',
      badgeColor: 'bg-brand-gold/20 text-brand-gold border-brand-gold/40',
      cot: '9–10 Jam',
      start: '06:00 WIB',
      elevation: '±950 m+',
      pitstop: 'CP#4 (Wajib 30 Menit)',
      prolog: 'Tidak Ada',
      tracking: 'Wajib Aktif (RaceRoute.id / Strava)',
      description: 'Satu-satunya kategori kompetitif resmi dengan perebutan podium Top 3 Fastest (Men, Women, Master 50+, Pair Mix). Membutuhkan strategi kecepatan dan manajemen energi yang solid.',
      priceMedal: 'Rp 400.000 (Single) / Rp 700.000 (Pair)',
      priceJersey: 'Rp 450.000 (Single) / Rp 750.000 (Pair)',
    },
    {
      id: '150',
      name: 'Cross Gravel 150++ KM',
      badge: 'Cross / Gran Fondo',
      badgeColor: 'bg-brand-orange/20 text-brand-orange border-brand-orange/40',
      cot: '13–14 Jam',
      start: '05:30 WIB',
      elevation: '±1.300 m+',
      pitstop: 'CP#4 (Wajib 30 Menit)',
      prolog: 'Wajib 30 KM Subuh (03:00 - 05:00 WIB)',
      tracking: 'Wajib Aktif',
      description: 'Tantangan endurance melintasi tanjakan Sukamakmur-Cariu dan segmen makadam bebatuan lepas kaki Gunung Batu. Menguji ketahanan fisik dan navigasi.',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: '200',
      name: 'Ultra Gravel 200++ KM',
      badge: 'Ultra-Endurance (Night Ride)',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      cot: '16–18 Jam',
      start: '05:30 WIB',
      elevation: '±1.700 m+',
      pitstop: 'CP#4 (Wajib 30 Menit)',
      prolog: 'Wajib 30 KM Subuh (03:00 - 05:00 WIB)',
      tracking: 'Wajib Aktif',
      description: 'Kasta tertinggi ketahanan mandiri. Ujian fisik ekstrem dengan navigasi malam musim hujan menembus pelosok Bogor timur dan Sentul kembali ke Cibubur.',
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: 'VIRTUAL',
      name: 'Virtual Ride Nasional (19 Chapter)',
      badge: 'Virtual Challenge',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      cot: 'Fleksibel (Sesuai Kategori Pilihan)',
      start: 'Minggu Event',
      elevation: 'Tantangan Outdoor Mandiri',
      pitstop: 'Mandiri di Rute Lokal Masing-masing',
      prolog: 'Tidak Ada',
      tracking: 'Wajib Sinkronisasi Strava (Anti-Indoor)',
      description: 'Bagi seluruh anggota GX-ID di 19 Chapter se-Indonesia. Bersepeda di kota Anda masing-masing, tersinkronisasi otomatis via Strava Webhook, medali fisik dikirimkan via DHS Logistik.',
      priceMedal: 'Rp 200.000',
      priceJersey: 'Rp 250.000',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          5 Kategori Jarak + 1 Virtual Ride
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Detail Kategori & <span className="gradient-gold-text">Spesifikasi Rute</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Pilih kategori yang sesuai dengan target kebugaran dan pengalaman ketahanan bersepeda Anda.
        </p>
      </div>

      {/* Grid Kategori */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoriesList.map((cat) => (
          <div
            key={cat.id}
            className="bg-brand-card p-6 sm:p-7 rounded-3xl border border-brand-border flex flex-col justify-between hover:border-slate-700 transition-all space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-lg border ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
                <span className="text-xs text-slate-500 font-semibold">Start: {cat.start}</span>
              </div>

              <h3 className="text-2xl font-black text-white">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cat.description}</p>

              <div className="mt-5 grid grid-cols-2 gap-3 bg-brand-dark/70 p-4 rounded-2xl border border-brand-border/60 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Batas Waktu (COT)</span>
                  <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" /> {cat.cot}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Estimasi Elevasi</span>
                  <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                    <Bike className="w-3.5 h-3.5 text-brand-orange" /> {cat.elevation}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Pitstop Wajib</span>
                  <span className="font-bold text-slate-300 mt-0.5 block">{cat.pitstop}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Syarat Prolog Subuh</span>
                  <span className={`font-bold mt-0.5 block ${cat.prolog.includes('Wajib') ? 'text-red-400' : 'text-slate-400'}`}>
                    {cat.prolog}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Harga Medal Saja / Medal & Jersey</span>
                <span className="text-sm font-black text-brand-gold">{cat.priceMedal} / {cat.priceJersey}</span>
              </div>
              <Link
                href="/daftar"
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow flex items-center gap-1 transition-all"
              >
                <span>Pilih</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
