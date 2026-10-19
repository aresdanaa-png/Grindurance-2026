import { Category, Order, Participant } from '@/lib/types';

/**
 * Format nomor telepon Indonesia ke format internasional (contoh: 08123456789 -> 628123456789)
 */
export function formatToInternationalPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('62')) return cleaned;
  if (cleaned.startsWith('0')) return `62${cleaned.substring(1)}`;
  if (cleaned.startsWith('8')) return `62${cleaned}`;
  return cleaned;
}

/**
 * Format angka ke format mata uang Rupiah
 */
function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Buat template pesan WhatsApp resmi untuk Invoice Pendaftaran (Pending)
 */
export function generateInvoiceWhatsAppMessage({
  order,
  category,
  participant,
  directPaymentUrl,
}: {
  order: Order;
  category: Category;
  participant: Participant;
  directPaymentUrl: string;
}): string {
  const hasMealCoupon = participant.has_meal_coupon;

  return `🚴 *GRAVEL GRINDURANCE 2026 — GX-ID OFFICIAL*
// NOTIFIKASI REGISTRASI ATLET

Halo *${participant.full_name}*,
Pendaftaran Anda untuk *${category.name}* telah berhasil dicatat oleh sistem panitia!

📋 *DETAIL INVOICE & RESERVASI:*
• No. Order: *${order.order_id}*
• Kode Registrasi: *${participant.registration_code}*
• Kategori: *${category.name} (${category.distance_km} KM)*
• Paket: *${order.package_type === 'MEDAL_JERSEY' ? 'Medal + Jersey Finisher' : 'Medal Only'}*
• Total Transfer: *${formatRupiah(order.net_amount)}*
• Batas Waktu Bayar: *24 Jam dari sekarang (COT)*

${hasMealCoupon ? `🎁 *HAK BENEFIT ATLET (<17 THN & WANITA):*
Anda berhak mendapatkan *E-Voucher Kupon Makan Rp 50.000* yang akan otomatis aktif setelah pembayaran lunas untuk ditukarkan di venue ABEEY Coffee & Eatery LRT Harjamukti.\n` : ''}
💳 *LANJUTKAN PEMBAYARAN KAPAN SAJA:*
Anda dapat membuka kembali QRIS & rekening bank transfer melalui tautan resmi di bawah ini:
👉 ${directPaymentUrl}

_Pesan ini dikirim otomatis oleh sistem panitia Gravel Grindurance 2026._
*Salam Endurance!*`;
}

/**
 * Buat template pesan WhatsApp resmi untuk Konfirmasi Pembayaran Lunas & BIB
 */
export function generatePaymentSuccessWhatsAppMessage({
  order,
  category,
  participant,
  eticketUrl,
}: {
  order: Order;
  category: Category;
  participant: Participant;
  eticketUrl: string;
}): string {
  const hasMealCoupon = participant.has_meal_coupon;
  const voucherCode = `VCH-MEAL-${participant.bib_number || participant.registration_code.replace('GX26-', '')}`;

  return `🏁 *PEMBAYARAN TERVERIFIKASI — GRAVEL GRINDURANCE 2026*
// STATUS: LUNAS · NOMOR DADA RESMI TERBIT

Halo *${participant.full_name}*,
Selamat! Pembayaran biaya registrasi Anda telah TERVERIFIKASI LUNAS oleh sistem panitia.

🚴 *KARTU TIKET RESMI ATLET:*
• Nomor Dada (BIB): *#${participant.bib_number || 'TERJADWAL'}*
• Nama Atlet: *${participant.full_name}*
• Kategori: *${category.name}*
• Ukuran Jersey: *${participant.jersey_size}*
• Gol. Darah: *${participant.blood_type || 'O+'}*

${hasMealCoupon ? `🍔 *E-VOUCHER KUPON MAKAN RP 50.000 (AKTIF):*
Kode Voucher: *${voucherCode}*
(Tunjukkan kode ini saat pengambilan Race Pack di venue untuk konsumsi)\n` : ''}
🎫 *UNDUH E-TICKET & KARTU BIB DIGITAL:*
👉 ${eticketUrl}

📍 *STAGING ARENA & VENUE START:*
ABEEY Coffee & Eatery, Stasiun LRT Harjamukti, Cibubur.
Jadwal Race: Minggu, 13 Desember 2026

Sampai jumpa di arena balap!
*Komite Balap GX-ID (Gravel & Ultra Cycling Indonesia)*`;
}

/**
 * Generate Direct WhatsApp URL (wa.me scheme)
 */
export function createWhatsAppDirectUrl(phoneNumber: string, messageText: string): string {
  const intlPhone = formatToInternationalPhone(phoneNumber);
  const encodedText = encodeURIComponent(messageText);
  return `https://api.whatsapp.com/send?phone=${intlPhone}&text=${encodedText}`;
}
