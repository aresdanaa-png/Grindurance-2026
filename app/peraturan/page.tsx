'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function PeraturanPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 font-sans selection:bg-[#FA6D0B] selection:text-black">
      {/* Header */}
      <div className="border-b border-white/10 pb-8 text-center space-y-3">
        <span className="font-mono font-bold text-xs sm:text-sm text-[#FA6D0B] uppercase tracking-widest block">
          GX-ID OFFICIAL ATHLETE GUIDE // 2026 EDITION
        </span>
        <h1 className="font-display italic text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          {t('REGULASI & ATURAN BALAP', 'RACE REGULATIONS & RULES')}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t(
            'Panduan teknis keselamatan, etika kemandirian (unsupported), spesifikasi sepeda musim hujan, dan sistem penalti resmi Gravel Grindurance 2026.',
            'Technical safety guidelines, self-supported riding ethics, rainy season bike specs, and official penalty systems for Gravel Grindurance 2026.'
          )}
        </p>
      </div>

      {/* 1. PRINSIP UTAMA: UNSUPPORTED */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8 space-y-5 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
            01 // {t('PRINSIP DASAR KEMANDIRIAN', 'CORE PRINCIPLE: SELF-SUPPORTED')}
          </span>
          <span className="font-mono text-xs text-slate-400 uppercase">
            {t('KEMANDIRIAN PENUH', 'PURE SELF-SUPPORT')}
          </span>
        </div>
        
        <h2 className="font-display italic text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          {t('PRINSIP MANDIRI (SELF-SUPPORTED EXPEDITION)', 'SELF-SUPPORTED EXPEDITION ETHOS')}
        </h2>
        
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {t(
            'Gravel Grindurance menganut filosofi kemandirian penuh pesepeda. Seluruh kebutuhan navigasi, hidrasi, nutrisi, dan perbaikan mekanik wajib dipersiapkan dan dibawa sendiri oleh peserta.',
            'Gravel Grindurance adheres to the philosophy of pure self-supported endurance. All navigation, hydration, nutrition, and mechanical maintenance needs must be prepared and carried by riders themselves.'
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
          <div className="bg-black/60 p-5 rounded-xl border border-red-500/30 space-y-2">
            <span className="font-bold text-red-400 uppercase tracking-wider block">
              // {t('DILARANG KERAS', 'STRICTLY PROHIBITED')}
            </span>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {t(
                'Membawa mobil atau kru pendukung pribadi (support car/crew). Peserta yang kedapatan menerima bantuan kendaraan pribadi di rute akan didiskualifikasi (DSQ) seketika.',
                'Carrying private escort vehicles or support crews. Riders caught receiving private vehicle assistance will be immediately disqualified (DSQ).'
              )}
            </p>
          </div>

          <div className="bg-black/60 p-5 rounded-xl border border-white/15 space-y-2">
            <span className="font-bold text-white uppercase tracking-wider block">
              // {t('DIPERBOLEHKAN', 'PERMITTED')}
            </span>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {t(
                'Memanfaatkan fasilitas umum di sepanjang rute (warung warga, minimarket, bengkel lokal) serta saling membantu antar sesama peserta di lintasan.',
                'Utilizing public facilities along the course (roadside stalls, convenience stores, local repair shops) and assisting fellow riders on the road.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 2. TABEL PENALTI WAKTU RESMI */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8 space-y-5 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
            02 // {t('SANKSI & DISKUALIFIKASI', 'SANCTIONS & DISQUALIFICATIONS')}
          </span>
          <span className="font-mono text-xs text-slate-400 uppercase">
            {t('VERIFIKASI GPX & GEOFENCE', 'GPX & GEOFENCE AUDIT')}
          </span>
        </div>

        <h2 className="font-display italic text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          {t('SISTEM PENALTI WAKTU RESMI', 'OFFICIAL TIME PENALTY MATRIX')}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-sans">
          {t(
            'Penalti dihitung oleh panitia melalui verifikasi berkas rekaman GPX, catatan waktu scan barcode tiap pos checkpoint, dan sistem LiveTracking Traccar.',
            'Penalties are calculated by race marshals through official GPX activity logs, geofencing timestamps, and Traccar LiveTracking telemetry.'
          )}
        </p>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs sm:text-sm font-mono text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-white/15 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">{t('JENIS PELANGGARAN', 'VIOLATION TYPE')}</th>
                <th className="py-3 px-4">{t('SANKSI PENALTI', 'SANCTION')}</th>
                <th className="py-3 px-4">{t('KETERANGAN TEKNIS', 'REMARKS')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3.5 px-4 font-bold text-white uppercase">{t('Keluar Rute / Potong Jalan', 'Off-Course / Short Cutting')}</td>
                <td className="py-3.5 px-4 font-black text-[#FA6D0B] uppercase">{t('150% Waktu Segmen', '150% Segment Time')}</td>
                <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">{t('Dihitung dari selisih estimasi waktu segmen yang dipotong', 'Calculated based on estimated time of bypassed segment')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white uppercase">{t('Bantuan Mobil / Kru Pribadi', 'Private Vehicle Escort')}</td>
                <td className="py-3.5 px-4 font-black text-red-400 uppercase">{t('DSQ (Diskualifikasi Langsung)', 'DSQ (Immediate Disqualification)')}</td>
                <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">{t('Dilarang menerima pengawalan pribadi atau feeding kendaraan', 'Strictly forbidden to receive private motor escort or vehicle feeding')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white uppercase">{t('Melewatkan 1 Checkpoint (CP)', 'Missing 1 Checkpoint (CP)')}</td>
                <td className="py-3.5 px-4 font-black text-[#FA6D0B] uppercase">{t('+60 Menit Waktu Tambahan', '+60 Minutes Penalty')}</td>
                <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">{t('Tidak ada scan barcode atau log geofence di pos terkait', 'No barcode scan or geofence log recorded at the checkpoint')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white uppercase">{t('Melewatkan > 1 Checkpoint', 'Missing > 1 Checkpoint')}</td>
                <td className="py-3.5 px-4 font-black text-red-400 uppercase">NC (Non-Competitive)</td>
                <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">{t('Kehilangan hak atas podium kompetisi resmi', 'Forfeiture of competitive podium eligibility')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white uppercase">{t('Penggunaan Sepeda E-Bike', 'E-Bike Usage')}</td>
                <td className="py-3.5 px-4 font-black text-slate-400 uppercase">Kategori Khusus NC</td>
                <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">{t('Boleh berpartisipasi tetapi tidak masuk klasifikasi podium', 'Permitted to participate but excluded from podium classification')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SYARAT PROLOG 30 KM & PRINSIP MANDIRI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-7 space-y-4 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="border-b border-white/10 pb-2.5">
            <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-wider block">
              03A // {t('PROTOKOL PROLOG 30 KM', '30 KM PROLOGUE PROTOCOL')}
            </span>
          </div>
          <h3 className="font-display italic text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            {t('KHUSUS 150 KM & 200 KM', '150 KM & 200 KM ONLY')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {t(
              'Peserta kategori Grand Fondo 150 km & Ultra 200 km wajib menempuh ≥ 30 km gowes mandiri sebelum registrasi ulang di venue start resmi.',
              'Grand Fondo 150 km & Ultra 200 km riders must complete ≥ 30 km self-start riding prior to check-in at official start venue.'
            )}
          </p>
          <ul className="text-xs sm:text-sm font-mono text-slate-300 space-y-2 border-t border-white/10 pt-3">
            <li>// {t('Waktu tempuh prolog: Antara 03:00 – 05:00 WIB dini hari.', 'Prologue window: Between 03:00 – 05:00 WIB dawn.')}</li>
            <li>// {t('Validasi dilakukan via track log GPS di meja scrutineering subuh.', 'Validation via GPS activity file at dawn Scrutineering Desk.')}</li>
            <li>// {t('Gagal memenuhi jarak prolog: DENY START (tidak diizinkan flag off).', 'Failing to meet distance: DENY START (barred from wave flag off).')}</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-7 space-y-4 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="border-b border-white/10 pb-2.5">
            <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-wider block">
              03B // {t('NAVIGASI & LOGISTIK', 'NAVIGATION & LOGISTICS')}
            </span>
          </div>
          <h3 className="font-display italic text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            {t('NAVIGASI MANDIRI GPX', 'AUTONOMOUS GPX NAVIGATION')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {t(
              'Seluruh peserta wajib mengandalkan navigasi mandiri dan logistik swadaya di sepanjang rute ekspedisi:',
              'All riders must rely on autonomous navigation and self-provisions across the course:'
            )}
          </p>
          <ul className="text-xs sm:text-sm font-mono text-slate-300 space-y-2 border-t border-white/10 pt-3">
            <li>// {t('Navigasi menggunakan file GPX resmi pada GPS bike computer atau ponsel.', 'Navigation via official GPX file loaded onto GPS bike computers or smartphones.')}</li>
            <li>// {t('Perbekalan makanan/minuman diperoleh secara mandiri di warung UMKM lokal.', 'Food and hydration sourced independently from local roadside stalls.')}</li>
            <li>// {t('Dilarang keras membuang sampah sembarangan di seluruh segmen lintasan.', 'Strictly forbidden to litter anywhere along forested hills and gravel paths.')}</li>
          </ul>
        </div>
      </div>

      {/* 4. KELAYAKAN SEPEDA & PERLENGKAPAN WAJIB */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8 space-y-5 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
            04 // {t('STANDAR KELAYAKAN TEKNIS', 'TECHNICAL EQUIPMENT STANDARDS')}
          </span>
          <span className="font-mono text-xs text-slate-400 uppercase">
            SCRUTINEERING PROTOCOL
          </span>
        </div>

        <h2 className="font-display italic text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          {t('STANDAR SEPEDA & PERLENGKAPAN WAJIB', 'BICYCLE STANDARDS & MANDATORY GEAR')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="bg-black/60 p-5 rounded-xl border border-white/10 space-y-2">
            <span className="font-bold text-[#FA6D0B] uppercase tracking-wider block">
              // {t('SPESIFIKASI BAN', 'TIRE SPECIFICATIONS')}
            </span>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {t(
                'Minimal 28 mm untuk kategori Fun (60K). Minimal 35 mm (sangat disarankan tubeless semi-slick 38–45c) untuk 100K, 120K, 150K, dan 200K.',
                'Minimum 28 mm for Fun Ride (60K). Minimum 35 mm (tubeless semi-slick 38–45c strongly advised) for 100K, 120K, 150K, and 200K.'
              )}
            </p>
          </div>

          <div className="bg-black/60 p-5 rounded-xl border border-white/10 space-y-2">
            <span className="font-bold text-red-400 uppercase tracking-wider block">
              // {t('AEROBAR DILARANG', 'AEROBARS PROHIBITED')}
            </span>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {t(
                'Penggunaan stang tambahan (aerobar / clip-on TT bar) dilarang keras di seluruh kategori demi keselamatan pengereman kelompok.',
                'Clip-on handlebars (aerobars / TT bars) are strictly forbidden in all categories for group braking safety.'
              )}
            </p>
          </div>

          <div className="bg-black/60 p-5 rounded-xl border border-white/10 space-y-2">
            <span className="font-bold text-white uppercase tracking-wider block">
              // {t('SISTEM LAMPU', 'LIGHTING SYSTEMS')}
            </span>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {t(
                'Lampu depan putih min 400 lumen dan lampu belakang merah wajib aktif. Khusus 120K, 150K, dan 200K wajib membawa 2 lampu depan.',
                'Active front white lights (min 400 lumens) and rear red lights mandatory. For 120K, 150K, and 200K, minimum 2 independent front headlamps required.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 5. MEDIS & RESPON GAWAT DARURAT */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8 space-y-5 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FA6D0B] uppercase tracking-wider">
            05 // {t('DUKUNGAN MEDIS & GAWAT DARURAT', 'MEDICAL SUPPORT & EMERGENCY')}
          </span>
          <span className="font-mono text-xs text-slate-400 uppercase">
            RS HERMINA SPGDT
          </span>
        </div>

        <h2 className="font-display italic text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          {t('TIM MEDIS SPGDT & EVAKUASI RESMI', 'SPGDT PARAMEDICS & ROUTE EVACUATION')}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {t(
            'Ambulans mobile berfasilitas gawat darurat dan mobile medic sepeda motor bersiaga di sepanjang rute Jonggol & Sukamakmur. Evakuasi medis darurat untuk atlet terdaftar adalah BEBAS BIAYA (GRATIS).',
            'Mobile ICU ambulances and paramedic motorcycle units are staged along Jonggol & Sukamakmur corridors. Emergency evacuation for registered riders is completely FREE.'
          )}
        </p>

        <div className="bg-black/60 p-5 sm:p-6 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
              {t('HOTLINE GAWAT DARURAT MEDIS 24 JAM:', '24-HOUR EMERGENCY MEDICAL HOTLINE:')}
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#FA6D0B] tracking-widest mt-1 block">
              0815 1965 6133
            </span>
          </div>
          <a
            href="https://wa.me/6281519656133"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-full font-mono font-black text-xs uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer whitespace-nowrap shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            {t('HUBUNGI MEDIS SPGDT', 'CALL SPGDT EMERGENCY')}
          </a>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-4">
        <Link
          href="/daftar"
          className="inline-flex items-center gap-2 px-10 py-4.5 rounded-full font-sans font-black uppercase tracking-wider text-xs sm:text-sm bg-[#FA6D0B] text-black shadow-[0_0_35px_rgba(250,109,11,0.65)] hover:bg-[#DE5A00] transition-all hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
        >
          <span>{t('PAHAM REGULASI? DAFTARKAN DIRI SEKARANG', 'UNDERSTOOD THE RULES? REGISTER NOW')}</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
