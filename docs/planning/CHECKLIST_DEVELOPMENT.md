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
- [x] **1.4 Halaman Konfirmasi & E-Ticket BIB:**
  - [x] Halaman ringkasan sukses dengan Nomor BIB & QR Code unik untuk hari-H.
  - [x] Pencarian mandiri e-Ticket & Plat BIB digital (`/cek-bib`).

---

### [x] FASE 2: World-Class Rider Roster & Start List (Bentang Jawa & Badlands Standard)
> *Tujuan:* Menyajikan data atlet secara elegan, transparan, dan berstandar internasional.

- [x] **2.1 Official Start List / Rider Roster (`/peserta`):**
  - [x] Filter multi-kategori (60K, 80K, 120K Single, 120K Pair Mix, 150K, 200K, Virtual).
  - [x] Real-time search by Nama, No. BIB, atau Chapter Regional GX-ID.
  - [x] Modal preview Plat Nomor Sepeda Digital (BIB Plate Voucher) dengan QR Check-in Hash.
  - [x] Ticker metrik atlet terdaftar, rasio gender, tim Pair Mix, dan status prolog.

---

### [x] FASE 3: Endurance Rules & Scrutineering Lapangan
> *Tujuan:* Mengakomodasi aturan khusus ultra-cycling (Prolog 30 km & Penalti Pitstop 300%).

- [x] **3.1 Modul Meja Scrutineering (`/scrutineering`):**
  - [x] Interface panitia ABEEY Coffee (03:00–05:00 WIB) untuk verifikasi rekaman GPS Prolog 30 km (Kategori 150 km & 200 km).
  - [x] Checklist keselamatan teknis: Helm CE/CPSC, Lampu Depan Ganda (>500lm), Lampu Belakang Ganda (merah steady), Rompi Reflektif (EN ISO 20471), Tool Kit, Rekomendasi Ban (min 38c, optimal 45c), Kontak Darurat SPGDT RS Hermina Cibubur.
  - [x] Terbitkan Izin Masuk Garis Start (*Wave Start Clearance*).
- [x] **3.2 Modul Pencatatan Pitstop & Penalti 300% (`/checkpoint`):**
  - [x] Kalkulasi waktu istirahat wajib minimal 30 menit di titik checkpoint pitstop resmi (TBA).
  - [x] Deteksi otomatis keberangkatan dini dan penalti 300% dari sisa waktu yang dilanggar.

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
