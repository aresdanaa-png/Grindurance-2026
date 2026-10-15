'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-[#0D0E11] to-black text-center space-y-4 relative overflow-hidden">
      {/* Ambient Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-mono font-black text-[#FA6D0B] uppercase tracking-widest block">
          {t('KUOTA TERBATAS // AMBIL NOMOR BIB ANDA SEKARANG', 'LIMITED SLOTS // SECURE YOUR BIB NUMBER NOW')}
        </span>
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white italic drop-shadow-md">
          {t('BERANI TAKLUKKAN MEDAN JONGGOL?', 'DARE TO CONQUER JONGGOL CORRIDORS?')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          {t(
            'Pilih paket Medal Saja atau Medal & Jersey resmi GX-ID Anniversary Edition. Tantangan ketahanan musim hujan mandiri edisi perayaan 8 tahun komunitas GX-ID. Pendaftaran ditutup saat kuota terpenuhi.',
            'Choose between Medal Only or Official Medal & Jersey GX-ID Anniversary Edition. An unsupported rainy-season endurance test marking 8 years of GX-ID community pride. Registration closes upon quota fulfillment.'
          )}
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/daftar"
            className="px-10 py-4 sm:px-12 sm:py-4.5 rounded-full font-sans font-black uppercase tracking-wider text-sm sm:text-base bg-[#FA6D0B] hover:bg-[#DE5A00] text-black shadow-[0_0_35px_rgba(250,109,11,0.55)] inline-flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>{t('DAFTAR SEKARANG — PILIH KATEGORI', 'REGISTER NOW — SELECT CATEGORY')}</span>
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
