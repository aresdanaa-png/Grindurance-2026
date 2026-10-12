# 📋 ROADMAP & CATATAN PENGEMBANGAN SISTEM WEB EVENT
## Dari Event Komunitas Menuju Event Skala Nasional

> **Catatan Evaluasi Pasca-Event Tour de Gunung Batu 2026**  
> Disiapkan sebagai panduan teknis dan operasional untuk kolaborasi event sepeda / olahraga skala nasional mendatang.

---

## 🌟 1. Modal Kuat yang Sudah Terbukti Berhasil (Pertahankan!)

Fitur-fitur ini sudah terbukti mempermudah operasional lapangan dan menjadi nilai jual utama sistem Anda di mata komunitas/klien:

- [x] **Generator Imposisi Cetak A3 Otomatis:** Sekali klik langsung menghasilkan file PDF tata letak A3 siap setor ke vendor percetakan (menghemat biaya dan waktu desainer grafis).
- [x] **Label Pengiriman Paket A3:** Otomatisasi pembuatan label kirim paket jersey beserta alamat dan nomor resi.
- [x] **Self-Service BIB High-Resolution (HTML5 Canvas):** Peserta bisa mengecek dan mengunduh nomor dada mereka sendiri dalam format gambar tajam tanpa membebani server hosting.
- [x] **Wall of Heroes & Transparansi Donasi/Kas:** Meningkatkan *social proof* dan kepercayaan (*trust*) peserta secara masif.
- [x] **Manajemen Batch Produksi:** Panitia dapat membagi urutan produksi jersey secara bertahap (Batch 1, Batch 2, dst.).

---

## 🚨 2. Upgrade Krusial & Wajib (Sebelum Rilis Event Nasional)

Jika jumlah peserta melonjak dari ratusan menjadi ribuan orang, hal-hal berikut wajib diselesaikan terlebih dahulu:

### A. Keamanan (Security) & Privasi Data
- [ ] **Gembok Semua Endpoint Admin (`/api/admin/*`):**
  - Pasang verifikasi sesi/token (JWT atau Supabase Auth session) di sisi server.
  - Jangan biarkan API bisa diakses publik hanya karena proteksinya berada di `localStorage` frontend.
- [ ] **Hapus Password Plaintext di Kode Sumber:**
  - Hapus array akun admin hardcoded di `lib/db.ts`.
  - Gunakan tabel `admins` di database dengan kata sandi terenkripsi (*hash bcrypt/argon2*).
- [ ] **Masking Data Sensitif di Endpoint Publik:**
  - Samarkan nomor telepon pendaftar saat dicek publik (contoh: `0812-****-7890`).
  - Jangan kirim alamat rumah lengkap dan nomor kontak darurat ke endpoint pencarian umum.

### B. Otomatisasi Pembayaran (Payment Gateway)
- [ ] **Integrasi Payment Gateway Otomatis (Midtrans / Xendit / Duitku):**
  - **Masalah:** Verifikasi transfer manual lewat QRIS statis akan membuat panitia kewalahan jika ada 1.000–5.000 peserta.
  - **Solusi:** Sistem QRIS dinamis & Virtual Account otomatis. Begitu peserta membayar via m-banking:
    1. Status pendaftaran otomatis berubah jadi **"LUNAS"** dalam hitungan detik.
    2. Nomor BIB langsung diterbitkan otomatis.
    3. Admin tidak perlu lagi mengecek mutasi bank secara manual.

### C. Fondasi Database & Skalabilitas (High Concurrency)
- [ ] **Tinggalkan File JSON Lokal (`db.json`):**
  - Pastikan sistem berjalan 100% di **Database PostgreSQL (Supabase)**.
  - Gunakan *Connection Pooling* (seperti Supabase PgBouncer) agar database tidak tumbang saat "war tiket" pembukaan pendaftaran serentak.

### D. Perbaikan Pengalaman Pengguna di HP (Mobile UX)
- [ ] **Formulir Pendaftaran Multi-Step (Wizard 3 Langkah):**
  - *Langkah 1:* Pilih Kategori Event & Ukuran Jersey (jika ada).
  - *Langkah 2:* Data Diri Singkat & Kontak Darurat.
  - *Langkah 3:* Review & Pilih Metode Pembayaran.
  - *Tujuan:* Mencegah peserta membatalkan pendaftaran (*drop-off*) akibat form yang terlalu panjang dalam satu layar handphone.

---

## 💎 3. Fitur Nilai Jual Tambahan (Enterprise / Fitur "Wah")

Fitur-fitur ini akan membuat proposal kerja sama Anda terlihat sangat profesional di mata penyelenggara event nasional dan sponsor:

### 1. Notifikasi WhatsApp Otomatis (WA Gateway)
- Hubungkan sistem dengan layanan API WhatsApp (misal: Fonnte atau Wablas).
- **Triggers Otomatis:**
  - Saat pendaftaran dibuat: *"Halo [Nama], silakan selesaikan pembayaran sebelum batas waktu..."*
  - Saat pembayaran lunas: *"Selamat! Pembayaran kamu berhasil. Ini nomor BIB kamu: #1234."*
  - H-3 sebelum event: Pengingat jadwal pengambilan race pack dan rute GPX.

### 2. Scanner Check-in QR Code Hari-H (Meja Registrasi Ulang)
- Tambahkan QR Code unik pada e-ticket atau kartu BIB peserta.
- Panitia di lapangan cukup membuka kamera HP/web panitia untuk memindai QR Code:
  - Layar HP langsung berbunyi hijau & menampilkan status: **"Race Pack Sudah Diambil"**.
  - Menghilangkan antrean panjang dan pencatatan manual di kertas.

### 3. E-Sertifikat Finisher Otomatis
- Setelah acara selesai, peserta cukup memasukkan nomor BIB mereka.
- Sistem langsung mencetak file PDF E-Sertifikat Finisher resmi lengkap dengan nama peserta, kategori jarak tempuh, dan catatan waktu (jika ada catatan waktu/timing).

### 4. Manajemen Kuota Kategori & Early Bird Pricing
- Pengaturan kuota otomatis per kategori jarak (contoh: Kategori 100 KM maksimal 500 orang, Kategori 50 KM maksimal 500 orang).
- Fitur harga bertingkat: *Early Bird*, *Normal*, dan *Late Entry* yang berganti otomatis berdasarkan tanggal atau jumlah pendaftar.

---

## 🛠️ 4. Kerapian Arsitektur Kode (Maintainability)

- [ ] **Refaktor File Admin Raksasa (`app/admin/page.tsx`):**
  - File saat ini memiliki 5.700+ baris kode.
  - Pecah menjadi modul-modul komponen yang terorganisir di `components/admin/`:
    - `PesertaTable.tsx`
    - `VerifikasiPembayaran.tsx`
    - `BatchProduksi.tsx`
    - `KeuanganKas.tsx`
    - `ToolsPercetakan.tsx`
  - *Manfaat:* Memudahkan kerja tim jika ada programmer lain yang ikut membantu pengembangan sistem.

---

## 📅 Rencana Tahapan Eksekusi (Action Plan)

| Tahap | Fokus Utama | Target Luaran |
| :--- | :--- | :--- |
| **Fase 1: Keamanan & Basis Data** | Proteksi API Admin, Supabase Auth, Hapus plaintext password | Data peserta aman & database stabil |
| **Fase 2: Otomatisasi Transaksi** | Integrasi Payment Gateway (Midtrans/Xendit) + Notifikasi WA | Bebas verifikasi manual, 100% otomatis |
| **Fase 3: Pembenahan UX Pendaftar** | Multi-step Form Wizard + Optimasi Mobile | Pendaftaran cepat & anti-ribet di HP |
| **Fase 4: Operasional Hari-H** | QR Scanner Check-in + E-Certificate Finisher | Panitia lapangan kerja cepat & modern |

---
*Dokumen ini dibuat otomatis sebagai panduan evaluasi sistem web pendaftaran event.*
