'use client';

import { Order, Participant, Category } from '@/lib/types';
import InvoiceCockpit from '@/components/payment/InvoiceCockpit';

interface DaftarInvoiceStepProps {
  createdOrder: Order;
  createdParticipants: Participant[];
  selectedCategory: Category;
  simulatingPayment: boolean;
  copiedField: string | null;
  setCopiedField: (field: string | null) => void;
  handleSimulatePayment: () => void;
  t: (id: string, eng: string) => string;
}

export default function DaftarInvoiceStep({
  createdOrder,
  createdParticipants,
  selectedCategory,
  simulatingPayment,
  copiedField,
  setCopiedField,
  handleSimulatePayment,
  t,
}: DaftarInvoiceStepProps) {
  const directUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/pembayaran?code=${createdParticipants[0]?.registration_code || createdOrder.order_id}`
    : `/pembayaran?code=${createdParticipants[0]?.registration_code || createdOrder.order_id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directUrl);
    setCopiedField('magic_link');
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="space-y-8 animate-slide-up-fade">
      {/* WhatsApp Notification & Direct Resume Magic Link Card */}
      <div className="rounded-2xl bg-[#121418]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/5">
          <span className="font-mono text-xs font-bold text-[#FA6D0B] tracking-widest uppercase">
            // NOTIFIKASI OTOMATIS TERSIMPAN · WHATSAPP RESMI PANITIA
          </span>
          <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
            SELF-SERVICE RESUME · COT 24 JAM
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-display italic text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            {t('Pendaftaran Tersimpan — Lanjutkan Bayar Kapan Saja', 'Registration Saved — Resume Payment Anytime')}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {t(
              'Pesan resmi dan tautan langsung tagihan telah disiapkan untuk WhatsApp Anda. Anda dapat menunda dan melanjutkan pembayaran esok hari melalui tautan di bawah ini atau melalui menu "Cek Tagihan" di website.',
              'An official notification and direct invoice link have been generated for your WhatsApp. You may defer and resume payment tomorrow via the direct link below or via the "Check Bill" menu on the website.'
            )}
          </p>

          <div className="pt-2">
            <div className="rounded-xl bg-black/70 p-4 font-mono text-xs text-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[#FA6D0B] font-bold shrink-0 select-none">// LINK:</span>
                <span className="truncate text-slate-200 select-all">
                  {directUrl}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-[#FA6D0B] text-black font-mono font-black text-xs uppercase tracking-wider hover:bg-[#DE5A00] transition-all shrink-0 cursor-pointer text-center shadow-[0_0_15px_rgba(250,109,11,0.35)]"
              >
                {copiedField === 'magic_link'
                  ? t('TAUTAN TERSALIN!', 'LINK COPIED!')
                  : t('SALIN TAUTAN PEMBAYARAN', 'COPY PAYMENT LINK')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <InvoiceCockpit
        order={createdOrder}
        category={selectedCategory}
        participants={createdParticipants}
        onSimulateSuccess={handleSimulatePayment}
        isSimulating={simulatingPayment}
      />
    </div>
  );
}
