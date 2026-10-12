# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## GRAVEL GRINDURANCE 2026 — ANNIVERSARY EDITION
**Platform Registrasi Multi-Kategori, Dual-Package, Pair Mix & Hybrid Payment**

*Penyelenggara: GX-ID (Gravel & Ultra Cycling Indonesia)*  
*Tanggal Dokumen: Oktober 2026 | Versi: 1.1 (Final Architecture Alignment)*

---

## 1. Executive Summary & Visi Produk

### 1.1 Latar Belakang
GX-ID (komunitas dengan 80.000+ anggota di 19 chapter regional) menyelenggarakan event *Gravel Grindurance 2026 Anniversary Edition* pada minggu ke-2 Desember 2026 berpusat di ABEEY Coffee & Eatery / LRT Harjamukti, Cibubur. Event ini berformat *self-supported*, menguji ketahanan di musim hujan dengan loop Jonggol–Sukamakmur–Sentul, serta membuka partisipasi daring (*Virtual Ride*) nasional.

### 1.2 Pilar Fitur Utama
1. **Multi-Category & Dual-Package Option:** Mendukung 5 kategori jarak offline + 1 virtual, masing-masing dengan opsi **Medal Saja** atau **Medal & Jersey**.
2. **Pendaftaran Tim PAIR (2 Pax):** Mendukung pendaftaran 2 pesepeda sekaligus dalam 1 invoice di kategori 120 km Race.
3. **Hybrid Payment Engine:** Otomatisasi pembayaran via Midtrans (QRIS dinamis & VA) dengan fallback transfer manual + Dev Simulator untuk pengujian.
4. **Insentif Meal Coupon Rp 50.000:** Diskon/kupon makan otomatis untuk wanita, remaja $\le 17$ tahun, dan tim Pair Mix.
5. **Ultra-Endurance Rules:** Scrutineering syarat wajib "Prolog 30 km" (kategori 150 & 200 km) dan etika balap mandiri tanpa support car eksternal (un-supported expedition).
6. **Ops Logistics & Print Engine A3+:** Otomatisasi cetak imposisi A3 untuk nomor BIB, sertifikat finisher, nametag panitia, dan label kurir DHS Logistik.
7. **Virtual Ride Strava Integration:** Validasi otomatis aktivitas outdoor melalui Strava Webhooks.

---

## 2. Kategori, Paket & Struktur Harga Resmi (GX-ID Standard)

| ID | Kategori | Jarak | Sifat / Tipe | Harga Medal Saja | Harga Medal & Jersey | Kuota | COT | Wave Start | Aturan Khusus |
|---|---|---|---|---|---|---|---|---|---|
| `60` | Urban Gravel 60 | 60++ km | Fun Ride | Rp 250.000 | Rp 300.000 | 150 | 7 jam | 07:00 | Standard Fun Ride |
| `80` | Urban Gravel 80 | 80++ km | Fun Ride | Rp 300.000 | Rp 350.000 | 150 | 9 jam | 07:00 | Standard Fun Ride |
| `120_SINGLE` | Amazing Race 120 | 120++ km | **Race (Kompetisi)** | Rp 400.000 | Rp 450.000 | 100 | 11 jam | 06:00 | Awarding Top 3 |
| `120_PAIR` | Amazing Race Pair Mix | 120++ km | **Race (2 Peserta)** | Rp 700.000 | Rp 750.000 | 30 tim | 11 jam | 06:00 | 2 Pax, Handicap Waktu |
| `150` | Cross Gravel 150 | 150++ km | Cross / Grand Fondo | Rp 400.000 | Rp 450.000 | 75 | 15 jam | 05:30 | **Prolog 30 km** |
| `200` | Ultra Gravel 200 | 200++ km | Ultra Gravel | Rp 400.000 | Rp 450.000 | 50 | 19 jam | 05:30 | **Prolog 30 km** |
| `VIRTUAL` | Virtual Ride Nasional | Sesuai Pilihan | Virtual (Nasional) | Rp 200.000 | Rp 250.000 | 1.000 | Fleksibel | H-Event | Strava Webhook, Medali via DHS |

### Ketentuan Insentif Kupon Makan (Meal Coupon Rp 50.000):
* Otomatis diberikan untuk peserta:
  * Wanita.
  * Remaja usia $\le 17$ tahun.
  * Tim PAIR Mix (Pria & Wanita) atau PAIR Wanita & Wanita (1 kupon per tim).
  * *Tidak berlaku untuk PAIR Pria & Pria.*

---

## 3. Alur Registrasi & Pembayaran (User Flow)

```
[ PENGUNJUNG ]
      │
      ▼
1. Pilih Kategori & Paket
   - Pilih Jarak (60, 80, 120 Single/Pair, 150, 200, Virtual)
   - Pilih Paket: [Medal Saja] ATAU [Medal & Jersey]
      │
      ▼
2. Formulir Data Pendaftar (Wizard)
   - Data Identitas: Nama KTP, **NIK (16 Digit)**, **Agama/Kepercayaan**, Jenis Kelamin, Tanggal Lahir
   - **Alamat Lengkap (Cascading API Wilayah Indonesia)**: Provinsi, Kab/Kota, Kecamatan, Desa/Kelurahan, Kode Pos, Alamat Detail
   - Kesehatan & Keselamatan: Golongan Darah, **Alergi / Medic Alert (SPGDT RS Hermina)**, Kontak Darurat (Nama & HP)
   - Komunitas/Chapter & Ukuran Jersey (jika paket jersey)
   - Jika Pair (2 Pax): Data lengkap Rider 1 (Kapten) + Rider 2 (Partner)
   - Cek kualifikasi Meal Coupon (otomatis jika wanita / <= 17 th / Pair Mix)
   - Centang Waiver Risiko & Persetujuan Data Pribadi
      │
      ▼
3. Invoice & Checkout (Hybrid Payment)
   - Opsi A: Bayar Otomatis (QRIS Dinamis / Virtual Account BCA/Mandiri/BRI) via Midtrans
   - Opsi B: Transfer Rekening Manual Panitia
   - Opsi C (Mode Testing / Dev): Tombol Simulasi Lunas Sekali Klik
      │
      ▼
4. Pembayaran Terkonfirmasi (Status: LUNAS)
   - Auto-generate Nomor BIB Unik (Mulai 1000)
   - Auto-generate QR Code Hash untuk Check-in Hari-H
   - Kuota kategori otomatis terpotong di database
   - Peserta diarahkan ke Halaman E-Ticket & Kartu BIB Digital
```

---

## 4. Desain Skema Database (Supabase PostgreSQL)

```sql
-- Sequence Nomor BIB (Mulai 1000)
CREATE SEQUENCE IF NOT EXISTS bib_number_seq START 1000;

-- Tabel Kategori & Paket
CREATE TABLE categories (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    distance_km INT NOT NULL,
    category_type VARCHAR(20) NOT NULL, -- 'fun', 'race', 'cross', 'ultra', 'virtual'
    is_pair BOOLEAN DEFAULT FALSE,
    price_medal_only DECIMAL(12,2) NOT NULL,
    price_medal_jersey DECIMAL(12,2) NOT NULL,
    quota INT NOT NULL DEFAULT 100,
    current_enrolled INT NOT NULL DEFAULT 0,
    cot_hours DECIMAL(4,1),
    wave_start_time TIME,
    prologue_required_km INT DEFAULT 0,
    mandatory_pitstop_cp INT DEFAULT 4,
    tracking_required BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Tabel Pendaftaran / Transaksi (1 Order bisa memuat 1 atau 2 peserta)
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) UNIQUE NOT NULL, -- Format: GG26-ORD-XXXXX
    category_id VARCHAR(30) REFERENCES categories(id),
    package_type VARCHAR(20) NOT NULL, -- 'MEDAL_ONLY' atau 'MEDAL_JERSEY'
    total_amount DECIMAL(12,2) NOT NULL,
    discount_meal_coupon DECIMAL(12,2) DEFAULT 0,
    payment_status VARCHAR(30) DEFAULT 'PENDING', -- 'PENDING', 'PAID', 'EXPIRED', 'FAILED'
    payment_method VARCHAR(50), -- 'MIDTRANS_QRIS', 'MIDTRANS_VA', 'MANUAL_TRANSFER', 'SIMULATOR'
    payment_url TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Peserta (Jika order adalah PAIR, ada 2 baris terhubung ke 1 order_id)
CREATE TABLE participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    registration_code VARCHAR(30) UNIQUE NOT NULL, -- Format: GG26-XXXXX
    bib_number INT UNIQUE DEFAULT NULL, -- Diterbitkan saat status order = PAID
    rider_role VARCHAR(20) DEFAULT 'SINGLE', -- 'SINGLE', 'PAIR_RIDER_1', 'PAIR_RIDER_2'
    full_name VARCHAR(150) NOT NULL,
    gender VARCHAR(10) NOT NULL, -- 'male', 'female'
    birth_date DATE,
    email VARCHAR(150) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    emergency_contact_name VARCHAR(100) NOT NULL,
    emergency_contact_phone VARCHAR(30) NOT NULL,
    blood_type VARCHAR(5) DEFAULT '-',
    community_chapter VARCHAR(100) DEFAULT 'Umum',
    category_id VARCHAR(30) REFERENCES categories(id),
    jersey_size VARCHAR(10) DEFAULT '-',
    has_meal_coupon BOOLEAN DEFAULT FALSE,
    
    -- Status Endurance
    status VARCHAR(30) DEFAULT 'REGISTERED', -- 'REGISTERED', 'PAID', 'CHECKED_IN', 'FINISHER'
    prologue_status VARCHAR(20) DEFAULT 'NOT_REQUIRED', -- 'NOT_REQUIRED', 'WAITING', 'PASSED', 'REJECTED'
    qr_checkin_hash VARCHAR(64) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 5. Rencana Tahapan Eksekusi 4 Fase

* **FASE 1: Core Registration & Hybrid Payment Engine (Fondasi)**
  * Skema Database Supabase lengkap (Categories, Orders, Participants).
  * Form registrasi wizard interaktif (Single & Pair, pilihan Medal/Jersey, Meal coupon calculator).
  * Halaman checkout & pembayaran (Midtrans Sandbox + Manual Fallback + Dev Simulator).
  * Halaman E-Ticket & Kartu BIB Digital (Canvas download).
* **FASE 2: Operational Logistics & Print Engine A3+**
  * Generator imposisi cetak A3 nomor BIB, sertifikat finisher, label paket DHS Logistik, nametag panitia.
  * QR Code Check-in meja registrasi hari-H.
* **FASE 3: Endurance Scrutineering Lapangan**
  * Modul verifikasi Prolog 30 km (150 & 200 km) jam 03:00–05:00 WIB.
  * Modul pencatatan pitstop & penalti 300%.
* **FASE 4: Virtual Ride Nationwide (Strava Webhook)**
  * Integrasi Strava API, auto-validasi rute outdoor, auto e-certificate.
