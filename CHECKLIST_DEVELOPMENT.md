# 📌 CHECKLIST PENGEMBANGAN — GRAVEL GRINDURANCE 2026

Dokumen ini berfungsi sebagai **penjaga konteks (guardrails)** agar pengerjaan tetap fokus pada roadmap bertahap tanpa melenceng (*out-of-scope*).

---

## 🚦 STATUS PROYEK SAAT INI
* **Fase Aktif:** Persiapan & Spesifikasi (Pre-Flight)
* **Dokumen Acuan:** `PRD_Gravel_Grindurance_2026.md` & `gravel-grindurance-2026.md`
* **Status Build/Kode:** Belum dimulai (menunggu persetujuan skema & setup env)

---

## 📋 TAHAPAN EKSEKUSI

### [ ] FASE 1: Core Registration, Quota & Payment Engine (Fondasi)
> *Tujuan:* Peserta bisa mendaftar multi-kategori, kuota terhitung aman, bayar via Midtrans/Xendit Sandbox, dan otomatis dapat Nomor BIB saat lunas.

- [x] **1.1 Basis Data (Supabase):**
  - [x] Eksekusi DDL Skema (`categories`, `participants`, `orders`, `event_settings`, `bib_number_seq`, `checkpoint_logs`, `virtual_submissions`).
  - [x] Seed data awal 7 kategori resmi GX-ID (Dual-package: Medal vs Jersey) beserta kuota & COT.
  - [x] Trigger otomatis `handle_order_paid` untuk terbitkan BIB & potong kuota atomic.
  - [x] Row Level Security (RLS) & view publik aman `public_participants_view`.
- [x] **1.2 Multi-Step Form Pendaftaran (Mobile-Optimized):**
  - [x] Langkah 1: Pilih Kategori Jarak + Dual Package (Medal vs Jersey) + Cek Kuota Real-time.
  - [x] Langkah 2: Data Diri Rider (Mendukung Single & Tim Pair Mix 2 Pax) + Auto-detect Meal Coupon Rp 50.000.
  - [x] Langkah 3: Review Invoice, Rincian Tagihan, & Waiver Persetujuan Risiko.
  - [x] Simulator Pembayaran Instan (Dev Mode) untuk pengujian auto-BIB & auto-quota tanpa uang asli.
- [ ] **1.3 Integrasi Payment Gateway (Midtrans Sandbox):**
  - [ ] Endpoint pembuatan transaksi (`/api/payment/create`).
  - [ ] Tampilan bayar (QRIS Dinamis & Virtual Account BCA/Mandiri/BRI/BNI).
  - [ ] Webhook Listener (`/api/payment/webhook`): Update status peserta `PAID` & terbitkan `bib_number`.
- [ ] **1.4 Halaman Konfirmasi & E-Ticket BIB:**
  - [ ] Halaman ringkasan sukses dengan Nomor BIB & QR Code unik untuk hari-H.

---

### [ ] FASE 2: Operational Logistics & Print Engine (A3+ Imposition)
> *Tujuan:* Memanfaatkan aset unggulan Tour de Gunung Batu untuk kebutuhan operasional GX-ID skala nasional.

- [ ] **2.1 Imposisi A3+ Nomor BIB Peserta:**
  - [ ] Generator layout cetak A3 (beberapa nomor BIB per lembar) siap setor ke percetakan.
- [ ] **2.2 Imposisi A3+ Label Pengiriman Paket (DHS Logistik):**
  - [ ] Cetak massal label pengiriman jersey & medali virtual (21 label/lembar A3).
- [ ] **2.3 Generator Nametag Panitia & Marshall A3+:**
  - [ ] ID card panitia per divisi (Medis, Sweeper, Marshall, Scrutineer).
- [ ] **2.4 Scanner Check-in Hari-H:**
  - [ ] Scanner kamera web panitia untuk memindai QR Code di meja registrasi ulang.

---

### [ ] FASE 3: Endurance Rules & Scrutineering Lapangan
> *Tujuan:* Mengakomodasi aturan khusus ultra-cycling (Prolog & Pitstop).

- [ ] **3.1 Modul Meja Scrutineering (Prolog 30 km):**
  - [ ] Interface panitia untuk memverifikasi track GPS peserta 150 km & 200 km (03:00–05:00 WIB).
  - [ ] Flag status `PROLOG_PASSED` atau `PROLOG_REJECTED` (Deny Start).
- [ ] **3.2 Modul Pencatatan Pitstop & Penalti 300%:**
  - [ ] Input/sync timestamp kedatangan & keberangkatan di CP wajib (CP#4 / CP#6).
  - [ ] Kalkulasi otomatis waktu istirahat minimal 30 menit & kalkulasi penalti.

---

### [ ] FASE 4: Virtual Ride Nationwide Engine (Strava API)
> *Tujuan:* Melayani ribuan anggota GX-ID dari 19 Chapter di luar Jabodetabek.

- [ ] **4.1 OAuth & Webhook Strava:**
  - [ ] Peserta menghubungkan akun Strava mereka.
  - [ ] Webhook menerima notifikasi aktivitas gowes peserta.
- [ ] **4.2 Engine Validasi & Anti-Curang:**
  - [ ] Tolak otomatis aktivitas indoor / smart trainer.
  - [ ] Validasi syarat jarak minimal, total elevasi, dan rata-rata kecepatan.
- [ ] **4.3 E-Sertifikat Finisher Otomatis:**
  - [ ] Auto-generate PDF sertifikat finisher saat aktivitas lolos verifikasi.
  - [ ] Push data alamat ke antrean pengiriman medali (DHS Logistik).

---

## 🔒 ATURAN PENGERJAAN (GUARDRAILS)
1. **Fokus Tunggal:** Tidak boleh menulis kode untuk Fase 2, 3, atau 4 sebelum Fase 1 selesai dan diuji fungsionalitasnya.
2. **Kerahasiaan Kunci:** Jangan menaruh API Key asli di file contoh (`.env.example`).
3. **Konfirmasi Setiap Sub-Task:** Setiap poin checklist yang selesai akan dicentang `[x]` untuk transparansi progres.
