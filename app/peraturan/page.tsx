'use client';

import { Shield, AlertTriangle, Clock, Navigation, Bike, HeartPulse, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function PeraturanPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 font-sans">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          {t('GX-ID Official Athlete Guide', 'GX-ID Official Athlete Guide')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t('Regulasi & ', 'Regulations & ')}<span className="gradient-gold-text">{t('Aturan Balap', 'Race Rules')}</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          {t(
            'Panduan teknis keselamatan, etika kemandirian (unsupported), spesifikasi sepeda, dan sistem penalti resmi Gravel Grindurance 2026.',
            'Technical safety guidelines, self-supported riding ethics, bike specifications, and official penalty systems for Gravel Grindurance 2026.'
          )}
        </p>
      </div>

      {/* 1. PRINSIP UTAMA: UNSUPPORTED */}
      <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center font-black">
            1
          </div>
          <h2 className="text-xl font-black text-white">{t('Prinsip Mandiri (Self-Supported)', 'Self-Supported Principle')}</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {t(
            'Gravel Grindurance menganut filosofi kemandirian penuh pesepeda. Seluruh kebutuhan navigasi, hidrasi, nutrisi, dan perbaikan mekanik wajib dipersiapkan dan dibawa sendiri oleh peserta.',
            'Gravel Grindurance adheres to the philosophy of pure self-supported endurance. All navigation, hydration, nutrition, and mechanical maintenance needs must be prepared and carried by riders themselves.'
          )}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border text-xs text-slate-400 space-y-1.5">
            <span className="font-bold text-red-400 block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> {t('Dilarang Keras:', 'Strictly Prohibited:')}
            </span>
            <span>{t(
              'Membawa mobil atau kru pendukung pribadi (support car/crew). Peserta yang kedapatan menerima bantuan kendaraan pribadi akan didiskualifikasi (DSQ).',
              'Carrying private escort vehicles or support crews. Riders caught receiving private vehicle assistance will be disqualified (DSQ).'
            )}</span>
          </div>
          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border text-xs text-slate-400 space-y-1.5">
            <span className="font-bold text-emerald-400 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {t('Diperbolehkan:', 'Permitted:')}
            </span>
            <span>{t(
              'Memanfaatkan fasilitas umum di sepanjang rute (warung warga, minimarket, bengkel lokal) serta saling membantu antar sesama peserta di lintasan.',
              'Utilizing public facilities along the course (roadside stalls, convenience stores, local repair shops) and assisting fellow riders on the road.'
            )}</span>
          </div>
        </div>
      </div>

      {/* 2. TABEL PENALTI WAKTU RESMI */}
      <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/20 text-brand-gold flex items-center justify-center font-black">
            2
          </div>
          <h2 className="text-xl font-black text-white">{t('Sistem Penalti Waktu & Diskualifikasi', 'Time Penalty System & Disqualification')}</h2>
        </div>
        <p className="text-xs text-slate-400">
          {t(
            'Penalti dihitung oleh panitia melalui verifikasi data GPX, checkpoint geofencing, dan LiveTracking.',
            'Penalties are calculated by marshals through GPX logs, geofencing timestamps, and LiveTracking.'
          )}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-brand-border text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">{t('Jenis Pelanggaran', 'Violation Type')}</th>
                <th className="py-3 px-4">{t('Sanksi / Penalti Waktu', 'Sanction / Time Penalty')}</th>
                <th className="py-3 px-4">{t('Keterangan', 'Remarks')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">{t('Keluar Rute / Ambil Jalan Pintas', 'Off-Course / Short Cutting')}</td>
                <td className="py-3.5 px-4 font-bold text-brand-orange">{t('150% Waktu Segmen', '150% Segment Time')}</td>
                <td className="py-3.5 px-4 text-slate-400">{t('Dihitung dari estimasi waktu segmen yang dipotong', 'Calculated based on estimated time of bypassed segment')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">{t('Bantuan Kendaraan / Support Car Eksternal', 'Vehicle Assistance / Private Support Car')}</td>
                <td className="py-3.5 px-4 font-bold text-red-500">{t('DQ (Diskualifikasi Langsung)', 'DSQ (Immediate Disqualification)')}</td>
                <td className="py-3.5 px-4 text-slate-400">{t('Dilarang menerima pengawalan pribadi atau feeding dari kendaraan khusus', 'Strictly forbidden to receive private motor escort or vehicle feeding')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">{t('Melewatkan 1 Checkpoint (CP)', 'Missing 1 Checkpoint (CP)')}</td>
                <td className="py-3.5 px-4 font-bold text-amber-400">{t('+60 Menit Waktu Tambahan', '+60 Minutes Time Penalty')}</td>
                <td className="py-3.5 px-4 text-slate-400">{t('Tidak ada scan barcode atau log geofence di pos terkait', 'No barcode scan or geofence log recorded at the checkpoint')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">{t('Melewatkan > 1 Checkpoint', 'Missing > 1 Checkpoint')}</td>
                <td className="py-3.5 px-4 font-bold text-red-500">NC (Non-Competitive)</td>
                <td className="py-3.5 px-4 text-slate-400">{t('Kehilangan hak atas podium kompetisi', 'Forfeiture of competitive podium eligibility')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">{t('Penggunaan Sepeda E-Bike', 'E-Bike Usage')}</td>
                <td className="py-3.5 px-4 font-bold text-purple-400">{t('Kategori Khusus NC', 'Special NC Category')}</td>
                <td className="py-3.5 px-4 text-slate-400">{t('Boleh berpartisipasi tetapi tidak masuk klasifikasi podium', 'Permitted to participate but excluded from podium classification')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SYARAT PROLOG 30 KM & PRINSIP MANDIRI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="flex items-center gap-2 text-brand-orange font-bold text-base">
            <Clock className="w-5 h-5" />
            <span>{t('Prolog 30 KM (Khusus 150 & 200 KM)', '30 KM Prologue (150 & 200 KM Only)')}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              'Peserta kategori Grand Fondo 150 km & Ultra 200 km wajib menempuh ≥ 30 km gowes mandiri sebelum registrasi ulang di venue start resmi.',
              'Grand Fondo 150 km & Ultra 200 km riders must complete ≥ 30 km self-start riding prior to check-in at official start venue.'
            )}
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li>{t('Waktu tempuh prolog: Antara 03:00 – 05:00 WIB dini hari.', 'Prologue window: Between 03:00 – 05:00 WIB dawn.')}</li>
            <li>{t('Validasi dilakukan via track log GPS / Cyclocomp di meja scrutineering subuh.', 'Validation via GPS / Cyclocomp activity file at dawn Scrutineering Desk.')}</li>
            <li>{t('Gagal memenuhi jarak prolog → DENY START (tidak diizinkan flag off).', 'Failing to meet distance → DENY START (barred from wave flag off).')}</li>
          </ul>
        </div>

        <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="flex items-center gap-2 text-brand-gold font-bold text-base">
            <Navigation className="w-5 h-5" />
            <span>{t('Format Mandiri (Self-Supported Expedition)', 'Self-Supported Expedition Format')}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              'Seluruh peserta wajib mengandalkan navigasi mandiri dan logistik swadaya di sepanjang rute:',
              'All riders must rely on autonomous navigation and self-provisions across the course:'
            )}
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li>{t('Navigasi menggunakan file GPX resmi pada GPS bike computer atau ponsel.', 'Navigation via official GPX file loaded onto GPS bike computers or smartphones.')}</li>
            <li>{t('Perbekalan makanan/minuman diperoleh secara mandiri di warung UMKM lokal warga.', 'Food and hydration sourced independently from local roadside convenience stalls.')}</li>
            <li>{t('Dilarang keras membuang sampah sembarangan di sepanjang jalur hutan & perbukitan.', 'Strictly forbidden to litter anywhere along forested hills and gravel paths.')}</li>
          </ul>
        </div>
      </div>

      {/* 4. KELAYAKAN SEPEDA & PERLENGKAPAN WAJIB */}
      <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-sky/20 text-brand-sky flex items-center justify-center font-black">
            3
          </div>
          <h2 className="text-xl font-black text-white">{t('Standar Sepeda & Perlengkapan Wajib', 'Bicycle Standards & Mandatory Gear')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border space-y-2">
            <span className="font-bold text-white block flex items-center gap-1.5">
              <Bike className="w-4 h-4 text-brand-gold" /> {t('Spesifikasi Ban', 'Tire Specifications')}
            </span>
            <p className="text-slate-400 leading-relaxed">
              {t(
                'Minimal 28 mm untuk kategori Fun (60K). Minimal 35 mm (disarankan tubeless semi-slick/file tread) untuk 100K, 120K, 150K, dan 200K.',
                'Minimum 28 mm for Fun Ride (60K). Minimum 35 mm (tubeless semi-slick/file tread advised) for 100K, 120K, 150K, and 200K.'
              )}
            </p>
          </div>

          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border space-y-2">
            <span className="font-bold text-white block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" /> {t('Aerobar Dilarang', 'Aerobars Prohibited')}
            </span>
            <p className="text-slate-400 leading-relaxed">
              {t(
                'Penggunaan stang tambahan (aerobar / clip-on TT bar) dilarang keras di seluruh kategori demi keselamatan pengereman saat berkelompok.',
                'Clip-on handlebars (aerobars / TT bars) are strictly forbidden in all categories for group braking safety.'
              )}
            </p>
          </div>

          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border space-y-2">
            <span className="font-bold text-white block flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-orange" /> {t('Sistem Pencahayaan', 'Lighting Systems')}
            </span>
            <p className="text-slate-400 leading-relaxed">
              {t(
                'Lampu depan (putih) dan lampu belakang (merah) wajib aktif. Khusus kategori 120K, 150K, dan 200K wajib membawa minimal 2 lampu depan.',
                'Active front white lights and rear red lights mandatory. For 120K, 150K, and 200K, minimum 2 independent front headlamps required.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 5. MEDIS & RESPON GAWAT DARURAT */}
      <div className="bg-gradient-to-br from-brand-cardHover to-brand-card p-6 sm:p-8 rounded-3xl border border-red-500/40 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-black">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{t('Dukungan Medis & Ambulans SPGDT', 'Medical Support & SPGDT Ambulance')}</h2>
            <span className="text-xs text-slate-400">{t('Official Medical Partner: Jaringan RS Hermina', 'Official Medical Partner: RS Hermina Network')}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {t(
            'Ambulans mobile dan tim mobile medic sepeda motor siap bersiaga di sepanjang rute. Evakuasi darurat bagi peserta event adalah GRATIS.',
            'Mobile ambulances and paramedic motorcycle units are staged on-course. Emergency route evacuation for registered riders is completely FREE.'
          )}
        </p>

        <div className="bg-brand-dark/80 p-4 rounded-xl border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 block">{t('WhatsApp Siaga Medis 24 Jam:', '24-Hour Emergency Medical WhatsApp:')}</span>
            <span className="text-lg font-black text-red-400 font-sans tracking-wider">0815 1965 6133</span>
          </div>
          <a
            href="https://wa.me/6281519656133"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-xl font-bold text-xs bg-red-600 text-white hover:bg-red-500 transition-all"
          >
            {t('Hubungi Medis SPGDT', 'Call SPGDT Emergency')}
          </a>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-6">
        <Link
          href="/daftar"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow transition-all"
        >
          <span>{t('Paham Regulasi? Daftarkan Diri Anda Sekarang', 'Understood the Rules? Register Now')}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
