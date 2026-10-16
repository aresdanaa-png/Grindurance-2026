'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function KategoriPage() {
  const { t } = useLanguage();

  const categoriesList = [
    {
      id: '200',
      name: t('200 Ultra (200 KM)', '200 Ultra (200 KM)'),
      badge: 'TIER 01 // ULTRA EXPEDITION',
      isPremier: true,
      cot: t('19 Jam', '19 Hours'),
      start: '05:30 WIB (Wave 1)',
      elevation: '+3,180 m+',
      prolog: t('Wajib 30 KM Subuh (03:00 - 05:00 WIB)', 'Mandatory 30 KM Dawn Prologue (03:00 - 05:00 WIB)'),
      tracking: t('Wajib Live Tracking (Traccar / Strava)', 'Mandatory Live Tracking (Traccar / Strava)'),
      description: t(
        'Format ketahanan ultra murni bagi pesepeda jarak jauh berpengalaman. Melewati malam dan jalur makadam Gunung Batu serta tanjakan ekstrem Sukamakmur.',
        'Pure ultra-endurance format for experienced long-distance cyclists. Navigating through night conditions, Gunung Batu macadam, and extreme Sukamakmur climbs.'
      ),
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: '150',
      name: t('150 Grand Fondo (150 KM)', '150 Grand Fondo (150 KM)'),
      badge: 'TIER 02 // GRAND FONDO',
      isPremier: false,
      cot: t('15 Jam', '15 Hours'),
      start: '05:30 WIB (Wave 1)',
      elevation: '+2,100 m+',
      prolog: t('Wajib 30 KM Subuh (03:00 - 05:00 WIB)', 'Mandatory 30 KM Dawn Prologue (03:00 - 05:00 WIB)'),
      tracking: t('Wajib Live Tracking', 'Mandatory Live Tracking'),
      description: t(
        'Jarak klasik veteran endurance yang menguji efisiensi tenaga di jalan aspal kelupas dan perbukitan Jonggol selatan sebelum loop kembali ke Sentul.',
        'Classic endurance veteran distance testing energy efficiency across broken tarmac and southern Jonggol hills before looping back towards Sentul.'
      ),
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: '120_SINGLE',
      name: t('120 Race · Sendiri (120 KM)', '120 Race · Solo (120 KM)'),
      badge: 'TIER 03A // OFFICIAL RACE (INDIVIDU)',
      isPremier: false,
      cot: t('11 Jam', '11 Hours'),
      start: '06:00 WIB (Wave 2)',
      elevation: '+1,450 m+',
      prolog: t('Tidak Ada Prolog', 'No Prologue'),
      tracking: t('Wajib Aktif (RaceRoute.id / Strava)', 'Mandatory Active (RaceRoute.id / Strava)'),
      description: t(
        'Kategori kompetitif resmi klasifikasi individu dengan perebutan podium Top 3 Pria & Wanita. Rute cepat dan teknis di tanjakan Jonggol.',
        'Official individual competitive classification contesting the Top 3 Men & Women podium. Fast and technical sectors on Jonggol climbs.'
      ),
      priceMedal: 'Rp 400.000',
      priceJersey: 'Rp 450.000',
    },
    {
      id: '120_PAIR',
      name: t('120 Race · Pair Mix (120 KM)', '120 Race · Pair Mix (120 KM)'),
      badge: 'TIER 03B // OFFICIAL RACE (PAIR MIX 2 PAX)',
      isPremier: false,
      cot: t('11 Jam', '11 Hours'),
      start: '06:00 WIB (Wave 2)',
      elevation: '+1,450 m+',
      prolog: t('Tidak Ada Prolog', 'No Prologue'),
      tracking: t('Wajib Aktif (RaceRoute.id / Strava)', 'Mandatory Active (RaceRoute.id / Strava)'),
      description: t(
        'Format tim tandem berpasangan (Pria & Wanita). Seluruh anggota tim wajib finis bersamaan dengan batas deviasi maksimal 2 menit.',
        'Tandem partner team format (Male & Female). Both riders must finish together within a maximum 2-minute gap.'
      ),
      priceMedal: 'Rp 700.000 (2 Pax)',
      priceJersey: 'Rp 750.000 (2 Pax)',
    },
    {
      id: '100',
      name: t('100 Fondo (100 KM)', '100 Fondo (100 KM)'),
      badge: 'TIER 04 // FONDO EXPLORATION',
      isPremier: false,
      cot: t('9.5 Jam', '9.5 Hours'),
      start: '07:00 WIB (Wave 3)',
      elevation: '+850 m+',
      prolog: t('Tidak Ada Prolog', 'No Prologue'),
      tracking: t('Opsional (Rekomendasi Komoot / Strava)', 'Optional (Komoot / Strava Recommended)'),
      description: t(
        'Eksplorasi rute fondo melintasi persawahan Cileungsi dan perbukitan Jonggol timur. Cocok untuk pesepeda yang ingin menaklukkan 100 km dengan atmosfer festival.',
        'Fondo exploration route traversing Cileungsi rice fields and eastern Jonggol hills. Perfect for cyclists aiming to conquer 100 km in a lively festival atmosphere.'
      ),
      priceMedal: 'Rp 300.000',
      priceJersey: 'Rp 350.000',
    },
    {
      id: '60',
      name: t('60 Fun Ride (60 KM)', '60 Fun Ride (60 KM)'),
      badge: 'TIER 05 // FUN RIDE',
      isPremier: false,
      cot: t('7 Jam', '7 Hours'),
      start: '07:00 WIB (Wave 3)',
      elevation: '+450 m+',
      prolog: t('Tidak Ada Prolog', 'No Prologue'),
      tracking: t('Opsional', 'Optional'),
      description: t(
        'Format rekreasi yang memadukan aspal perkotaan Cibubur dan lintasan tanah pedesaan Jonggol. Sangat ramah untuk pemula, sepeda lipat, hybrid, dan penikmat gowes santai.',
        'Recreational format blending Cibubur urban tarmac with Jonggol countryside dirt roads. Highly accommodating for beginners, folding bikes, hybrids, and leisure riders.'
      ),
      priceMedal: 'Rp 250.000',
      priceJersey: 'Rp 300.000',
    },
    {
      id: 'VIRTUAL',
      name: t('Virtual Ride Nasional', 'Nationwide Virtual Ride'),
      badge: 'TIER 06 // NATIONWIDE (19 CHAPTERS)',
      isPremier: false,
      cot: t('Fleksibel H-Event', 'Flexible Race Week'),
      start: t('Waktu Mandiri (Outdoor GPS)', 'Self-Timed (Outdoor GPS)'),
      elevation: t('Sesuai Rute Mandiri', 'Per Self-Planned Route'),
      prolog: t('Tidak Ada Prolog', 'No Prologue'),
      tracking: t('Wajib Sinkronisasi Strava Webhook', 'Mandatory Strava Webhook Sync'),
      description: t(
        'Dibuka untuk seluruh anggota GX-ID se-Indonesia dari 19 chapter regional di luar Jabodetabek. Medali finisher resmi dan jersey dikirim langsung via DHS Logistik.',
        'Open to all GX-ID members across 19 regional chapters outside Jabodetabek. Official finisher medals and jerseys shipped directly via DHS Logistics.'
      ),
      priceMedal: 'Rp 200.000',
      priceJersey: 'Rp 250.000',
    },
  ];

  return (
    <div className="bg-[#0D0E11] text-[#F3F4F6] font-sans py-14 px-4 sm:px-6 lg:px-8 selection:bg-[#FA6D0B] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-8">
          <span className="font-mono font-bold text-xs sm:text-sm text-[#FA6D0B] uppercase tracking-widest block mb-2">
            GX-ID OFFICIAL SPEC SHEET // 2026 EDITION
          </span>
          <h1 className="font-display italic text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            {t('PANDUAN KATEGORI & RUTE', 'CATEGORY & ROUTE GUIDE')}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-sans">
            {t(
              'Perbandingan teknis komprehensif seluruh kategori offline resmi ditambah format daring nasional. Setiap kategori dirancang dengan profil elevasi, batas waktu (COT), dan tantangan navigasi mandiri.',
              'Comprehensive technical comparison of all official offline categories plus nationwide virtual ride. Each category is engineered with detailed elevation profiles, Cut-Off Times (COT), and self-supported navigation challenges.'
            )}
          </p>
        </div>

        {/* Spec Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-2xl border ${
                cat.isPremier ? 'border-[#FA6D0B]/60 bg-black/60 shadow-[0_0_40px_rgba(250,109,11,0.15)]' : 'border-white/10 bg-black/40'
              } p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#FA6D0B]/50 transition-all backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)]`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3 font-mono">
                  <span className="font-bold text-[#FA6D0B] uppercase tracking-wider">
                    {cat.badge}
                  </span>
                  <span className="text-slate-300 font-bold">{cat.start}</span>
                </div>

                <div>
                  <h3 className="font-display italic text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Technical Table */}
                <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs sm:text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('Batas Waktu (COT):', 'Cut-Off Time (COT):')}</span>
                    <span className="text-white font-bold">{cat.cot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('Total Elevasi:', 'Total Elevation:')}</span>
                    <span className="text-[#FA6D0B] font-bold">{cat.elevation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('Syarat Prolog:', 'Prologue Requirement:')}</span>
                    <span className={cat.prolog.includes('Wajib') || cat.prolog.includes('Mandatory') ? 'text-[#FA6D0B] font-bold' : 'text-slate-400'}>
                      {cat.prolog}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('Live Tracking:', 'Live Tracking:')}</span>
                    <span className="text-white font-semibold">{cat.tracking}</span>
                  </div>
                </div>

                {/* Price Matrix */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs sm:text-sm font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{t('Paket Medal Saja', 'Medal Only')}</span>
                    <span className="text-white font-bold text-sm sm:text-base">{cat.priceMedal}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#FA6D0B] block uppercase font-bold tracking-wider">{t('Paket Medal & Jersey', 'Medal & Jersey')}</span>
                    <span className="text-[#FA6D0B] font-black text-sm sm:text-base">{cat.priceJersey}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/daftar?category=${cat.id}`}
                  className="w-full py-4 rounded-full bg-[#FA6D0B] hover:bg-[#DE5A00] text-black font-sans font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(250,109,11,0.4)] hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                >
                  <span>{t('Daftar Kategori Ini', 'Register This Category')}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Notice Strip */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8 font-sans text-xs sm:text-sm text-slate-300 space-y-3 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider border-b border-white/10 pb-2.5">
            {t('ATURAN TEKNIS SEPEDA & AKSESORIS MUSIM HUJAN //', 'RAINY SEASON BIKE & GEAR TECHNICAL REGULATIONS //')}
          </div>
          <p className="leading-relaxed space-y-1.5 text-slate-300">
            <span className="block">{t('1. Ban minimal yang diizinkan adalah 35mm (sangat direkomendasikan 38–45c untuk segmen makadam Jonggol & Sodong).', '1. Minimum tire width allowed is 35mm (38–45c strongly recommended for Jonggol & Sodong macadam sectors).')}</span>
            <span className="block">{t('2. Wajib membawa wet lube, ban dalam/tubeless plug kit cadangan, lampu depan ganda (satu cadangan), dan lampu belakang merah steady non-flashing.', '2. Mandatory wet lube, spare inner tube/tubeless repair kit, dual front headlights (one spare), and steady non-flashing red rear light.')}</span>
            <span className="block">{t('3. Peserta wanita, remaja usia ≤ 17 tahun, dan tim Pair Mix berhak atas potongan Meal Coupon senilai Rp 50.000 yang dipotong otomatis saat registrasi.', '3. Female riders, youth riders aged ≤ 17, and Pair Mix teams are eligible for an automatic IDR 50,000 Meal Coupon applied at registration.')}</span>
          </p>
        </div>

      </div>
    </div>
  );
}
