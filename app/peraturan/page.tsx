import { Shield, AlertTriangle, Clock, Navigation, Bike, HeartPulse, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PeraturanPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          GX-ID Official Athlete Guide
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Regulasi & <span className="gradient-gold-text">Aturan Balap</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Panduan teknis keselamatan, etika kemandirian (*unsupported*), spesifikasi sepeda, dan sistem penalti resmi Gravel Grindurance 2026.
        </p>
      </div>

      {/* 1. PRINSIP UTAMA: UNSUPPORTED */}
      <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center font-black">
            1
          </div>
          <h2 className="text-xl font-black text-white">Prinsip Mandiri (*Self-Supported*)</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Gravel Grindurance menganut filosofi kemandirian penuh pesepeda. Seluruh kebutuhan navigasi, hidrasi, nutrisi, dan perbaikan mekanik wajib dipersiapkan dan dibawa sendiri oleh peserta.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border text-xs text-slate-400 space-y-1.5">
            <span className="font-bold text-red-400 block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Dilarang Keras:
            </span>
            <span>Membawa mobil atau kru pendukung pribadi (*support car/crew*). Peserta yang kedapatan menerima bantuan kendaraan pribadi akan didiskualifikasi (DSQ).</span>
          </div>
          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border text-xs text-slate-400 space-y-1.5">
            <span className="font-bold text-emerald-400 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Diperbolehkan:
            </span>
            <span>Memanfaatkan fasilitas umum di sepanjang rute (warung warga, minimarket, bengkel lokal) serta saling membantu antar sesama peserta di lintasan.</span>
          </div>
        </div>
      </div>

      {/* 2. TABEL PENALTI WAKTU RESMI */}
      <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/20 text-brand-gold flex items-center justify-center font-black">
            2
          </div>
          <h2 className="text-xl font-black text-white">Sistem Penalti Waktu & Diskualifikasi</h2>
        </div>
        <p className="text-xs text-slate-400">
          Penalti dihitung oleh panitia melalui verifikasi data GPX, checkpoint geofencing, dan LiveTracking.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-brand-border text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Jenis Pelanggaran</th>
                <th className="py-3 px-4">Sanksi / Penalti Waktu</th>
                <th className="py-3 px-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Keluar Rute / Ambil Jalan Pintas</td>
                <td className="py-3.5 px-4 font-bold text-brand-orange">150% Waktu Segmen</td>
                <td className="py-3.5 px-4 text-slate-400">Dihitung dari estimasi waktu segmen yang dipotong</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Istirahat Pitstop &lt; 30 Menit</td>
                <td className="py-3.5 px-4 font-bold text-red-400">3x Lipat Defisit Waktu (300%)</td>
                <td className="py-3.5 px-4 text-slate-400">Setiap 1 menit kekurangan istirahat diganjar penalti 3 menit</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Melewatkan 1 Checkpoint (CP)</td>
                <td className="py-3.5 px-4 font-bold text-amber-400">+60 Menit Waktu Tambahan</td>
                <td className="py-3.5 px-4 text-slate-400">Tidak ada scan barcode atau log geofence di pos terkait</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Melewatkan &gt; 1 Checkpoint</td>
                <td className="py-3.5 px-4 font-bold text-red-500">NC (Non-Competitive)</td>
                <td className="py-3.5 px-4 text-slate-400">Kehilangan hak atas podium kompetisi</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Penggunaan Sepeda E-Bike</td>
                <td className="py-3.5 px-4 font-bold text-purple-400">Kategori Khusus NC</td>
                <td className="py-3.5 px-4 text-slate-400">Boleh berpartisipasi tetapi tidak masuk klasifikasi podium</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SYARAT PROLOG 30 KM & PITSTOP WAJIB */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="flex items-center gap-2 text-brand-orange font-bold text-base">
            <Clock className="w-5 h-5" />
            <span>Prolog 30 KM (Khusus 150 & 200 KM)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Peserta kategori Cross 150 km & Ultra 200 km **wajib menempuh $\ge$ 30 km gowes mandiri** sebelum registrasi ulang di venue start resmi.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li>Waktu tempuh prolog: Antara 03:00 – 05:00 WIB dini hari.</li>
            <li>Validasi dilakukan via track log GPS / Cyclocomp di meja scrutineering subuh.</li>
            <li>Gagal memenuhi jarak prolog $\rightarrow$ **DENY START** (tidak diizinkan flag off).</li>
          </ul>
        </div>

        <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="flex items-center gap-2 text-brand-gold font-bold text-base">
            <Navigation className="w-5 h-5" />
            <span>Pitstop Wajib 30 Menit (Semua Kategori)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Untuk menjaga keselamatan dan pemulihan stamina di medan berat, peserta wajib berhenti (*dwell time*) minimal 30 menit di pos pitstop resmi:
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li>Kategori 50 km, 60 km, 80 km: **Pitstop Wajib di CP#6**.</li>
            <li>Kategori 100 km, 120 km, 150 km, 200 km: **Pitstop Wajib di CP#4**.</li>
            <li>Scan barcode fisik tersedia di lokasi pos sebagai bukti validasi waktu singgah.</li>
          </ul>
        </div>
      </div>

      {/* 4. KELAYAKAN SEPEDA & PERLENGKAPAN WAJIB */}
      <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-sky/20 text-brand-sky flex items-center justify-center font-black">
            3
          </div>
          <h2 className="text-xl font-black text-white">Standar Sepeda & Perlengkapan Wajib</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border space-y-2">
            <span className="font-bold text-white block flex items-center gap-1.5">
              <Bike className="w-4 h-4 text-brand-gold" /> Spesifikasi Ban
            </span>
            <p className="text-slate-400 leading-relaxed">
              Minimal **28 mm** untuk kategori Fun (60/80K). Minimal **35 mm** (disarankan tubeless semi-slick/file tread) untuk 120K, 150K, dan 200K.
            </p>
          </div>

          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border space-y-2">
            <span className="font-bold text-white block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" /> Aerobar Dilarang
            </span>
            <p className="text-slate-400 leading-relaxed">
              Penggunaan stang tambahan (aerobar / clip-on TT bar) **dilarang keras** di seluruh kategori demi keselamatan pengereman saat berkelompok.
            </p>
          </div>

          <div className="bg-brand-dark/70 p-4 rounded-xl border border-brand-border space-y-2">
            <span className="font-bold text-white block flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-orange" /> Sistem Pencahayaan
            </span>
            <p className="text-slate-400 leading-relaxed">
              Lampu depan (putih) dan lampu belakang (merah) wajib aktif. Khusus kategori 120K, 150K, dan 200K wajib membawa **minimal 2 lampu depan**.
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
            <h2 className="text-xl font-black text-white">Dukungan Medis & Ambulans SPGDT</h2>
            <span className="text-xs text-slate-400">Official Medical Partner: Jaringan RS Hermina</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Ambulans mobile dan tim mobile medic sepeda motor siap bersiaga di sepanjang rute. Evakuasi darurat bagi peserta event adalah **GRATIS**.
        </p>

        <div className="bg-brand-dark/80 p-4 rounded-xl border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 block">WhatsApp Siaga Medis 24 Jam:</span>
            <span className="text-lg font-black text-red-400 font-mono">0815 1965 6133</span>
          </div>
          <a
            href="https://wa.me/6281519656133"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-xl font-bold text-xs bg-red-600 text-white hover:bg-red-500 transition-all"
          >
            Hubungi Medis SPGDT
          </a>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-6">
        <Link
          href="/daftar"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow transition-all"
        >
          <span>Paham Regulasi? Daftarkan Diri Anda Sekarang</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
