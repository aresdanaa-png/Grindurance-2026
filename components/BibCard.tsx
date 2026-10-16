'use client';

import { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { toPng } from 'html-to-image';
import { Download, Compass, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

interface BibCardProps {
  bibNumber: number | string;
  fullName: string;
  categoryName: string;
  distanceKm: number;
  riderRole?: string;
  bloodType?: string;
  medicalNotes?: string;
  communityChapter?: string;
  qrHash?: string;
  registrationCode: string;
}

export default function BibCard({
  bibNumber,
  fullName,
  categoryName,
  distanceKm,
  riderRole = 'SINGLE',
  bloodType = '-',
  medicalNotes,
  communityChapter = 'Umum',
  qrHash,
  registrationCode,
}: BibCardProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    async function generateQR() {
      try {
        const qrContent = qrHash || registrationCode;
        const url = await QRCode.toDataURL(qrContent, {
          width: 250,
          margin: 1,
          color: {
            dark: '#0A0F1D',
            light: '#FFFFFF',
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Gagal generate QR Code:', err);
      }
    }
    generateQR();
  }, [qrHash, registrationCode]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 3, // High Resolution 300 DPI
      });
      const link = document.createElement('a');
      link.download = `BIB-${bibNumber}-${fullName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal mengunduh kartu BIB:', err);
    } finally {
      setDownloading(false);
    }
  };

  // Tentukan warna badge kategori
  const getCategoryColor = () => {
    if (distanceKm === 60 || distanceKm === 80) return 'bg-[#15171C] text-slate-200 border border-white/20';
    if (distanceKm === 120) return 'bg-[#FA6D0B] text-black font-black';
    if (distanceKm === 150) return 'bg-white text-black font-black';
    if (distanceKm === 200) return 'bg-[#DE5A00] text-white font-black';
    return 'bg-[#FA6D0B] text-black font-black';
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {/* KARTU NOMOR BIB BALAP */}
      <div
        ref={cardRef}
        className="bg-white text-brand-dark rounded-3xl p-6 sm:p-7 shadow-2xl relative border-4 border-slate-900 overflow-hidden font-sans select-none"
      >
        {/* 4 Lubang Pengait Plat Sepeda (Simulasi Mounting Holes) */}
        <div className="absolute top-3 left-4 w-3.5 h-3.5 rounded-full border-2 border-slate-400 bg-slate-200" />
        <div className="absolute top-3 right-4 w-3.5 h-3.5 rounded-full border-2 border-slate-400 bg-slate-200" />
        <div className="absolute bottom-3 left-4 w-3.5 h-3.5 rounded-full border-2 border-slate-400 bg-slate-200" />
        <div className="absolute bottom-3 right-4 w-3.5 h-3.5 rounded-full border-2 border-slate-400 bg-slate-200" />

        {/* HEADER KARTU */}
        <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-brand-gold flex items-center justify-center font-black">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black tracking-tighter uppercase block leading-none text-slate-900">
                GRAVEL GRINDURANCE
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block">
                ANNIVERSARY EDITION · 2026
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
              GX-ID OFFICIAL
            </span>
          </div>
        </div>

        {/* NOMOR DADA BESAR (MAIN BIB DISPLAY) */}
        <div className="py-4 text-center">
          <div className="text-7xl sm:text-8xl font-black tracking-tighter text-slate-950 font-display italic">
            {bibNumber}
          </div>

          {/* Badge Kategori Jarak */}
          <div className="mt-1">
            <span
              className={`inline-block px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-sm ${getCategoryColor()}`}
            >
              {categoryName} {distanceKm > 0 ? `· ${distanceKm} KM` : ''}
            </span>
          </div>
        </div>

        {/* IDENTITAS RIDER & DETAIL */}
        <div className="border-t-2 border-slate-900 pt-3 flex items-center justify-between gap-3">
          <div className="space-y-0.5 max-w-[240px]">
            <div className="text-base font-black uppercase text-slate-950 truncate">
              {fullName}
            </div>
            <div className="text-[11px] font-bold text-slate-600 truncate">
              {communityChapter}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-semibold text-slate-500">
              <span className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded">
                {t('GOL', 'BLOOD')}: {bloodType}
              </span>
              {medicalNotes && medicalNotes !== 'Tidak Ada' && medicalNotes !== 'None' && (
                <span className="bg-red-50 text-red-700 border border-red-300 px-1.5 py-0.5 rounded font-bold truncate max-w-[120px]" title={medicalNotes}>
                  {t('MEDIS', 'ALERT')}: {medicalNotes}
                </span>
              )}
              {riderRole !== 'SINGLE' && (
                <span className="bg-purple-100 text-purple-700 border border-purple-300 px-1.5 py-0.5 rounded font-bold">
                  {riderRole === 'PAIR_RIDER_1' ? 'PAIR 1' : 'PAIR 2'}
                </span>
              )}
            </div>
          </div>

          {/* QR CODE CHECK-IN RESMI */}
          <div className="shrink-0 text-center">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Check-in QR"
                className="w-16 h-16 rounded-lg border-2 border-slate-900 p-0.5 bg-white"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-slate-200 animate-pulse" />
            )}
            <span className="text-[8px] font-extrabold text-slate-500 tracking-tighter block mt-0.5">
              OFFICIAL SCAN
            </span>
          </div>
        </div>

        {/* FOOTER KARTU MEDIS */}
        <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <span className="font-sans font-semibold tracking-wider">ID: {registrationCode}</span>
          <span className="flex items-center gap-1 font-bold text-slate-700">
            <ShieldAlert className="w-3 h-3 text-red-600" />
            SPGDT HERMINA: 0815-1965-6133
          </span>
        </div>
      </div>

      {/* TOMBOL UNDUH GAMBAR HIGH-RESOLUTION */}
      <button
        type="button"
        disabled={downloading}
        onClick={handleDownload}
        className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow transition-all flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        <span>{downloading ? t('Menyiapkan Gambar HD...', 'Preparing HD Image...') : t('Unduh Kartu BIB (Gambar PNG)', 'Download BIB Card (PNG Image)')}</span>
      </button>
    </div>
  );
}
