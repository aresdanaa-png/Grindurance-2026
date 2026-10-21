'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';
import BibCard from '@/components/BibCard';
import { Category, Order, Participant } from '@/lib/types';
import {
  generateInvoiceWhatsAppMessage,
  generatePaymentSuccessWhatsAppMessage,
  createWhatsAppDirectUrl,
} from '@/lib/services/whatsapp';

interface InvoiceCockpitProps {
  order: Order;
  category: Category;
  participants: Participant[];
  onSimulateSuccess?: () => void;
  isSimulating?: boolean;
  showCategoryPresetSwitcher?: boolean;
  onSelectCategoryPreset?: (presetKey: string) => void;
  selectedCategoryPresetKey?: string;
  presetCategories?: Record<string, {
    name: string;
    distance: number;
    basePrice: number;
    isPair: boolean;
    bibNumber: number;
    bibNumberPartner?: number;
    badge: string;
  }>;
  onResetStatus?: () => void;
}

export default function InvoiceCockpit({
  order,
  category,
  participants,
  onSimulateSuccess,
  isSimulating = false,
  showCategoryPresetSwitcher = false,
  onSelectCategoryPreset,
  selectedCategoryPresetKey,
  presetCategories,
  onResetStatus,
}: InvoiceCockpitProps) {
  const { t } = useLanguage();
  const [paymentMethodTab, setPaymentMethodTab] = useState<'qris' | 'bank'>('qris');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const isPaid = order.payment_status === 'PAID';
  const primaryParticipant = participants[0];

  const directPaymentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/pembayaran?code=${primaryParticipant?.registration_code || order.order_id}`
    : `/pembayaran?code=${primaryParticipant?.registration_code || order.order_id}`;

  const eticketUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/cek-bib?query=${primaryParticipant?.bib_number || primaryParticipant?.registration_code || ''}`
    : `/cek-bib?query=${primaryParticipant?.bib_number || primaryParticipant?.registration_code || ''}`;

  const whatsappMessageText = primaryParticipant
    ? isPaid
      ? generatePaymentSuccessWhatsAppMessage({
          order,
          category,
          participant: primaryParticipant,
          eticketUrl,
        })
      : generateInvoiceWhatsAppMessage({
          order,
          category,
          participant: primaryParticipant,
          directPaymentUrl,
        })
    : '';

  const whatsappDirectUrl = primaryParticipant
    ? createWhatsAppDirectUrl(primaryParticipant.phone_number || '', whatsappMessageText)
    : '#';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-slide-up-fade relative">
      {/* Ambient Aurora Glow in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Preset Switcher (Optional for Standalone / Preview Mode) */}
      {showCategoryPresetSwitcher && presetCategories && onSelectCategoryPreset && (
        <div className="p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <span className="text-[#FA6D0B] font-bold uppercase tracking-widest">PREVIEW KATEGORI:</span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {Object.entries(presetCategories).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelectCategoryPreset(key)}
                  className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer font-bold ${
                    selectedCategoryPresetKey === key
                      ? 'bg-[#FA6D0B] text-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
                      : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.distance} KM {item.isPair ? '(PAIR)' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto justify-end">
            <Link
              href="/daftar"
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10 transition-colors uppercase font-bold flex items-center gap-1"
            >
              <span>{t('FORMULIR PENDAFTARAN', 'REGISTRATION FORM')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Header Konfirmasi Telemetri */}
      <div className="p-7 sm:p-10 rounded-2xl bg-black/60 backdrop-blur-2xl text-center space-y-4 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[220px] bg-[#FA6D0B]/15 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#FA6D0B]/20 transition-all duration-700" />

        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest relative z-10">
          <span className="text-slate-400">STATUS:</span>
          <span className={`px-3 py-1 rounded-full font-black text-xs ${
            isPaid
              ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
              : 'bg-[#FA6D0B]/20 text-[#FA6D0B] animate-pulse shadow-[0_0_15px_rgba(250,109,11,0.25)]'
          }`}>
            {isPaid ? t('LUNAS · TERDAFTAR RESMI', 'PAID · OFFICIALLY REGISTERED') : t('MENUNGGU PEMBAYARAN', 'PAYMENT PENDING')}
          </span>
          <span className="text-white/20 select-none hidden sm:inline">·</span>
          <span className="text-slate-400">
            {t('BATAS WAKTU: 24 JAM', 'EXPIRATION: 24 HOURS')}
          </span>
        </div>

        <h1 className="font-display italic text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white relative z-10 leading-tight">
          {t('INVOICE RESERVASI RESMI · RACE PASS', 'OFFICIAL RESERVATION INVOICE · RACE PASS')}
        </h1>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.07] font-mono text-xs sm:text-sm text-slate-200 relative z-10 shadow-inner">
          <span className="text-slate-400 font-bold uppercase">{t('BOOKING ID:', 'BOOKING ID:')}</span>
          <span className="text-[#FA6D0B] font-black tracking-widest text-sm sm:text-base">{order.order_id}</span>
          <button
            type="button"
            onClick={() => copyToClipboard(order.order_id, 'booking_id')}
            className="text-[10px] text-white hover:text-[#FA6D0B] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            {copiedField === 'booking_id' ? t('DISALIN', 'COPIED') : t('SALIN', 'COPY')}
          </button>
        </div>
      </div>

      {/* Rincian Tagihan Finansial */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-5 font-mono relative overflow-hidden">
        <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 flex flex-wrap justify-between items-center gap-2">
          <span>{t('RINCIAN TRANSAKSI RESMI', 'OFFICIAL TRANSACTION BREAKDOWN')}</span>
          <span className="text-[#FA6D0B] font-display italic text-base sm:text-lg font-bold">{category.name}</span>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm">
          <div className="flex justify-between text-slate-300">
            <span>{t('TIKET KATEGORI RESMI:', 'OFFICIAL CATEGORY TICKET:')}</span>
            <span className="font-bold text-white">{formatRupiah(order.gross_amount)}</span>
          </div>

          {participants.some((p) => p.has_meal_coupon) && (
            <div className="p-3.5 rounded-xl bg-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-[#FA6D0B] font-bold block">HAK BENEFIT: E-VOUCHER KUPON MAKAN RP 50.000</span>
                <span className="text-slate-400 text-[11px]">
                  {t(
                    'Khusus peserta berumur <17 tahun & wanita · Otomatis aktif saat lunas (bukan potongan tagihan)',
                    'For riders <17 yrs & women · Automatically issued upon payment confirmation (not deducted from total)'
                  )}
                </span>
              </div>
              <span className="text-white font-bold px-2.5 py-1 rounded bg-white/10 uppercase text-[10px] self-start sm:self-auto shrink-0">
                {t('VOUCHER TERMASUK', 'VOUCHER INCLUDED')}
              </span>
            </div>
          )}

          {(order.discount_promo || 0) > 0 && (
            <div className="flex justify-between text-[#FA6D0B] font-bold">
              <span>{t('DISKON KODE PROMO KOMUNITAS:', 'COMMUNITY PROMO CODE DISCOUNT:')}</span>
              <span>- {formatRupiah(order.discount_promo || 0)}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/15 pt-5 text-white gap-3">
            <div>
              <span className="text-xs sm:text-sm font-mono text-slate-300 uppercase tracking-widest block font-bold">
                {t('TOTAL TRANSFER WAJIB:', 'TOTAL AMOUNT DUE:')}
              </span>
              <span className="text-xs text-slate-400 font-sans">
                {t('Transfer sesuai nominal persis untuk verifikasi otomatis sistem.', 'Transfer the exact amount for automated system verification.')}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="font-display italic text-4xl sm:text-5xl font-black text-[#FA6D0B] block tracking-tight">
                {formatRupiah(order.net_amount)}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(order.net_amount.toString(), 'nominal')}
                className="text-xs font-mono text-slate-300 hover:text-white uppercase font-bold tracking-wider mt-1.5 transition-colors cursor-pointer"
              >
                {copiedField === 'nominal' ? t('NOMINAL DISALIN', 'AMOUNT COPIED') : t('SALIN NOMINAL', 'COPY AMOUNT')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tactical Dual Payment Channel (QRIS vs Transfer Bank) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-6 font-mono relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            {t('METODE PEMBAYARAN RESMI', 'OFFICIAL PAYMENT METHOD')}
          </span>
          
          {/* Method Switcher Tabs */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPaymentMethodTab('qris')}
              className={`px-4 py-2.5 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer ${
                paymentMethodTab === 'qris'
                  ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              01 · QRIS DINAMIS
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethodTab('bank')}
              className={`px-4 py-2.5 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer ${
                paymentMethodTab === 'bank'
                  ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              02 · TRANSFER BANK
            </button>
          </div>
        </div>

        {/* QRIS Channel View */}
        {paymentMethodTab === 'qris' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-black space-y-3 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              <span className="font-display italic text-lg font-black uppercase tracking-wider">QRIS STANDAR NASIONAL</span>
              {/* Simulated Clean Dynamic QRIS Matrix Box */}
              <div className="w-56 h-56 p-3 bg-slate-50 rounded-2xl flex flex-col items-center justify-center relative shadow-inner">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        (i % 2 === 0 || i % 5 === 0 || i === 0 || i === 5 || i === 30 || i === 35)
                          ? 'bg-black'
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <span className="absolute text-[11px] font-mono font-black uppercase tracking-widest bg-white px-2 py-0.5 border border-black rounded">
                  GX-ID 2026
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-700 tracking-wider">
                NMID: ID1026048192841 · GX-ID INDONESIA
              </span>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="space-y-2">
                <span className="text-xs text-[#FA6D0B] font-bold uppercase tracking-wider block">
                  PANDUAN SCAN QRIS INSTAN:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {t(
                    'Mendukung seluruh aplikasi mobile banking (BCA Mobile, Livin Mandiri, BRImo, BNI Mobile) serta e-wallet terdaftar (GoPay, OVO, Dana, ShopeePay, LinkAja). Buka aplikasi pilihan Anda, pilih scan QRIS, dan konfirmasi nominal tepat.',
                    'Compatible with all Indonesian mobile banking apps and digital wallets. Open your preferred app, scan the dynamic QR above, and confirm exact amount.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 space-y-1.5 text-xs shadow-sm">
                <div className="flex justify-between text-slate-400">
                  <span>MERCHANT RESMI:</span>
                  <strong className="text-white">GX-ID INDONESIA / GRINDURANCE 2026</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>NOMINAL VALIDASI:</span>
                  <strong className="text-[#FA6D0B] text-sm">{formatRupiah(order.net_amount)}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Channel View */}
        {paymentMethodTab === 'bank' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl hover:bg-black/75 transition-all space-y-3 shadow-lg relative overflow-hidden group">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-widest">BCA (BANK CENTRAL ASIA)</span>
                <span className="text-[10px] text-[#FA6D0B] font-bold px-2 py-0.5 rounded bg-[#FA6D0B]/10 border border-[#FA6D0B]/20">AUTO-CHECK</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-widest font-mono">8831 2948 20</div>
              <div className="text-xs text-slate-300 font-sans">A.N. GX-ID INDONESIA · GRINDURANCE</div>
              <button
                type="button"
                onClick={() => copyToClipboard('8831294820', 'bca')}
                className="text-xs text-[#FA6D0B] hover:text-white uppercase font-bold tracking-wider pt-2 block transition-colors cursor-pointer"
              >
                {copiedField === 'bca' ? t('REKENING DISALIN', 'ACCOUNT COPIED') : t('SALIN NO. REK BCA', 'COPY BCA ACCOUNT')}
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xl hover:bg-black/75 transition-all space-y-3 shadow-lg relative overflow-hidden group">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-widest">BANK MANDIRI</span>
                <span className="text-[10px] text-[#FA6D0B] font-bold px-2 py-0.5 rounded bg-[#FA6D0B]/10 border border-[#FA6D0B]/20">AUTO-CHECK</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-widest font-mono">133 00 2819 4021</div>
              <div className="text-xs text-slate-300 font-sans">A.N. PANITIA GRINDURANCE 2026</div>
              <button
                type="button"
                onClick={() => copyToClipboard('1330028194021', 'mandiri')}
                className="text-xs text-[#FA6D0B] hover:text-white uppercase font-bold tracking-wider pt-2 block transition-colors cursor-pointer"
              >
                {copiedField === 'mandiri' ? t('REKENING DISALIN', 'ACCOUNT COPIED') : t('SALIN NO. REK MANDIRI', 'COPY MANDIRI ACCOUNT')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 1-Click WhatsApp Direct Dispatch & Message Simulator Card */}
      {primaryParticipant && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121418]/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-5 font-mono relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest">
                WHATSAPP DIRECT DISPATCH · 1-KLIK SIMPAN CHAT
              </span>
            </div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">
              {t('GRATIS · TANPA PERLU AKUN GATEWAY', 'FREE · NO GATEWAY ACCOUNT NEEDED')}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="font-display italic text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {!isPaid
                ? t('SIMPAN & LANJUTKAN PEMBAYARAN VIA WHATSAPP', 'SAVE & RESUME PAYMENT VIA WHATSAPP')
                : t('BAGIKAN TIKET BIB & VOUCHER KE WHATSAPP', 'SHARE BIB TICKET & VOUCHER TO WHATSAPP')}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {!isPaid
                ? t(
                    `Pesan resmi panitia siap disimpan ke nomor WhatsApp Anda (${primaryParticipant.phone_number || '-'}). Klik tombol di bawah untuk langsung membuka chat WhatsApp yang sudah terisi otomatis tanpa perlu mengetik ulang.`,
                    `Official committee message is ready for your WhatsApp (${primaryParticipant.phone_number || '-'}). Click below to instantly launch WhatsApp with pre-filled invoice details.`
                  )
                : t(
                    `Nomor dada resmi BIB #${primaryParticipant.bib_number || ''} dan E-Voucher Kupon Makan Rp 50.000 Anda siap disimpan ke WhatsApp untuk ditunjukkan saat pengambilan race pack di venue.`,
                    `Your official rider BIB #${primaryParticipant.bib_number || ''} and IDR 50,000 Meal Voucher are ready to be saved to WhatsApp for venue check-in.`
                  )}
            </p>
          </div>

          {/* Live Message Preview Box (Dark Carbon Terminal Style) */}
          <div className="rounded-xl bg-black/70 p-4 sm:p-5 shadow-inner space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/5 pb-2">
              <span>{t('PREVIEW PESAN RESMI WHATSAPP:', 'OFFICIAL WHATSAPP MESSAGE PREVIEW:')}</span>
              <span className="text-[#FA6D0B] font-bold">TUJUAN: +{primaryParticipant.phone_number || ''}</span>
            </div>
            <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed select-all">
              {whatsappMessageText}
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FA6D0B] text-black font-mono font-black text-xs uppercase tracking-wider hover:bg-[#DE5A00] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,109,11,0.35)] cursor-pointer text-center active:scale-95"
            >
              <span>{t('BUKA DI WHATSAPP SEKARANG', 'OPEN IN WHATSAPP NOW')}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <button
              type="button"
              onClick={() => {
                copyToClipboard(whatsappMessageText, 'wa_message');
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center active:scale-95"
            >
              {copiedField === 'wa_message'
                ? t('TEKS PESAN TERSALIN', 'MESSAGE TEXT COPIED')
                : t('SALIN TEKS PESAN', 'COPY MESSAGE TEXT')}
            </button>
          </div>
        </div>
      )}

      {/* Digital BIB Voucher Preview */}
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-3 flex flex-wrap items-center justify-between gap-2 font-mono">
          <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            {t('KARTU BIB DIGITAL ATLET TERDAFTAR', 'OFFICIAL DIGITAL ATHLETE RACE BIB')}
          </span>
          <span className="text-xs text-[#FA6D0B] uppercase tracking-widest font-bold">
            {isPaid ? t('LUNAS · READY RPC', 'PAID · READY FOR RPC') : t('RESERVASI TERKUNCI', 'RESERVATION LOCKED')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {participants.map((p) => (
            <BibCard
              key={p.id || p.registration_code}
              bibNumber={p.bib_number || 'PENDING'}
              fullName={p.full_name}
              categoryName={category.name}
              distanceKm={category.distance_km}
              riderRole={p.rider_role}
              bloodType={p.blood_type}
              medicalNotes={p.medical_notes}
              communityChapter={p.community_chapter}
              registrationCode={p.registration_code}
            />
          ))}
        </div>
      </div>

      {/* Post-Payment Issued Meal Voucher Card (Khusus Peserta <17 Thn & Wanita) */}
      {isPaid && participants.some((p) => p.has_meal_coupon) && (
        <div className="rounded-2xl bg-[#121418]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-4 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest">
              E-VOUCHER BENEFIT RESMI · TERBIT PASCA-BAYAR
            </span>
            <span className="text-[11px] text-white px-3 py-1 rounded-full bg-[#FA6D0B]/20 font-bold uppercase">
              STATUS: VOUCHER AKTIF
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="font-display italic text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {t('KUPON MAKAN RP 50.000 (KHUSUS <17 THN & WANITA)', 'IDR 50,000 MEAL VOUCHER (<17 YRS & WOMEN)')}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {t(
                'Tunjukkan voucher ini beserta kartu BIB saat pengambilan Race Pack di ABEEY Coffee & Eatery / Staging Arena LRT Harjamukti untuk ditukarkan dengan kupon konsumsi makan di venue.',
                'Present this voucher along with your rider BIB during Race Pack Collection at ABEEY Coffee & Eatery / LRT Harjamukti Staging Arena to redeem your meal consumption ticket.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {participants.filter((p) => p.has_meal_coupon).map((p, idx) => (
              <div key={p.id || idx} className="rounded-xl bg-black/70 p-4 shadow-inner flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    KODE VOUCHER · {p.full_name}
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#FA6D0B] tracking-wider block">
                    VCH-MEAL-{p.bib_number || p.registration_code.replace('GX26-', '')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white font-display italic block">RP 50.000</span>
                  <span className="text-[10px] text-slate-400 font-mono block">1x KLAIM VENUE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action & Simulation Bar */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono relative overflow-hidden">
        {!isPaid ? (
          onSimulateSuccess && (
            <button
              type="button"
              disabled={isSimulating}
              onClick={onSimulateSuccess}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FA6D0B]/15 text-[#FA6D0B] hover:bg-[#FA6D0B] hover:text-black font-bold uppercase tracking-wider text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap shadow-[0_0_20px_rgba(250,109,11,0.2)] hover:shadow-[0_0_25px_rgba(250,109,11,0.5)]"
            >
              {isSimulating ? t('MEMPROSES VERIFIKASI...', 'PROCESSING...') : t('SIMULASI PEMBAYARAN BERHASIL (SANDBOX)', 'SIMULATE PAYMENT SUCCESS (SANDBOX)')}
            </button>
          )
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#FA6D0B] font-bold uppercase tracking-wider">
              ✓ {t('PEMBAYARAN TERVERIFIKASI SISTEM · TIKET VALID', 'PAYMENT CONFIRMED · VALID RACE PASS')}
            </span>
            {onResetStatus && (
              <button
                type="button"
                onClick={onResetStatus}
                className="text-[11px] text-slate-400 hover:text-white underline uppercase tracking-wider cursor-pointer"
              >
                ({t('Reset ke Pending', 'Reset to Pending')})
              </button>
            )}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto justify-end shrink-0">
          <Link
            href="/peserta"
            className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/20 bg-white/[0.04] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 text-center active:scale-95"
          >
            <span>{t('LIHAT START LIST', 'VIEW START LIST')}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          <Link
            href="/cek-bib"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-sans font-black uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_25px_rgba(250,109,11,0.4)] hover:bg-[#DE5A00] transition-all flex items-center justify-center gap-1.5 text-center active:scale-95"
          >
            <span>{t('CEK BIB DIGITAL', 'CHECK DIGITAL BIB')}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
