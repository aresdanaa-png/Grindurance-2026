---
title: Contribution Package (Paket Kontribusi / Registrasi)
language: id + en (dokumen asli dwibahasa)
currency: IDR
price_type: Reguler
registration_deadline_jersey_medal: 2026-09-10
source: gambar tabel "CONTRIBUTION PACKAGE"
---

# Contribution Package

> Tabel paket kontribusi (harga registrasi) per opsi A-M. Semua harga dalam **Rupiah (IDR)** dan berlabel **REGULER**.
> Catatan sumber: di gambar, kolom harga **REGULER muncul dua kali** dengan angka identik di setiap baris, dan kolom pertama terpotong di tepi gambar ("300,00"). Angka lengkap dibaca dari kolom kedua.

## 1. Tabel Paket (Opsi A-L)

| Opsi | Kategori | Jarak | Tipe | Paket | Harga Reguler (IDR) |
|---|---|---|---|---|---|
| A | Urban Gravel | 60++ km | Non Race | Medal & Jersey | 300.000 |
| B | Urban Gravel | 60++ km | Non Race | Medal | 250.000 |
| C | Urban Gravel | 80++ km | Non Race | Medal & Jersey | 350.000 |
| D | Urban Gravel | 80++ km | Non Race | Medal | 300.000 |
| E | Amazing Race | 120++ km | **Race** | Medal & Jersey | 450.000 |
| F | Amazing Race | 120++ km | **Race** | Medal | 400.000 |
| G | Amazing Race | 120++ km, **Pair Mix (2 pax)** | **Race** | Medal & Jersey | 750.000 |
| H | Amazing Race | 120++ km, **Pair Mix (2 pax)** | **Race** | Medal | 700.000 |
| I | Grand Fondo | 150++ km | Non Race | Medal & Jersey | 450.000 |
| J | Grand Fondo | 150++ km | Non Race | Medal | 400.000 |
| K | Ultra Gravel | 200++ km | Non Race | Medal & Jersey | 450.000 |
| L | Ultra Gravel | 200++ km | Non Race | Medal | 400.000 |

Pengelompokan di tabel asli (sel yang digabung): A-B = Urban Gravel 60++ km; C-D = Urban Gravel 80++ km; E-F = Amazing Race 120++ km; G-H = Amazing Race 120++ km Pair Mix; I-J = Grand Fondo 150++ km; K-L = Ultra Gravel 200++ km.

Pola harga: paket **Medal & Jersey** selalu lebih mahal **Rp 50.000** dari paket **Medal** saja di semua pasangan opsi (A/B, C/D, E/F, G/H, I/J, K/L).

## 2. Opsi M: Foreigner & Expatriate

Pilih opsi jersey mana saja dengan biaya kontribusi:

| Peserta | USD | IDR |
|---|---|---|
| Single (1 peserta) | US$ 50 | Rp 890.000 |
| Pair (2 pax) | US$ 80 | Rp 1.424.000 |

Teks asli: "Select any jersey option with a contribution fee of US$50 (IDR 890,000) for a single participant, or US$80 (IDR 1,424,000) for a pair (2 pax)."

## 3. Yang Sudah Termasuk

| Hal | ID | EN |
|---|---|---|
| Medali | Semua pilihan sudah termasuk Medali | All options include Medal |
| Tiket Ancol | Untuk **Grand Fondo & Ultra** sudah termasuk Tiket Masuk Ancol | For Grand Fondo & Ultra option include Ancol Entrance Admission |
| Asuransi | Semua pilihan sudah termasuk Asuransi Kecelakaan terbatas yang berlaku pada hari Event | All options include limited insurance coverage for incident risks during the one-day event |

## 4. Batas Akhir Pendaftaran Jersey/Medali

- **Batas akhir: 10 September 2026.**
- Alasan: jadwal produksi dan pengiriman.
- Konsekuensi: semua pendaftaran yang masuk **setelah tanggal tersebut**, baik Jersey maupun Medali, **baru dikirimkan setelah event**.

Teks asli ID: "Hari terakhir untuk Pendaftaran Paket Jersey/Medali Anda adalah 10 September 2026. Karena jadwal Produksi dan Pengiriman, semua Pendaftaran yang masuk setelah tanggal ini, baik Jersey / Medali baru akan dikirimkan setelah event."

Teks asli EN: "The last day to Register your Jersey/Medal Package is September 10, 2026. Any Registration placed after this date Jersey/Medal will be delivered after the event due to production schedules. Don't miss out!"

## 5. Meal Coupon (Rp 50.000)

Nilai kupon: **Rp 50.000**.

| Berhak mendapat kupon | Aturan |
|---|---|
| Wanita | Berlaku |
| Remaja usia 17 tahun ke bawah | Berlaku |
| PAIR Mix (Men & Women) | **Satu kupon per PAIR** |
| PAIR (Women & Women) | **Satu kupon per PAIR** |
| PAIR (Men & Men) | **Tidak berlaku** |

- Berlaku untuk **WNI, WNA (Foreigners), dan Ekspatriat**, di **seluruh kategori**.
- Satu-satunya pengecualian: **PAIR (Men & Men)**.

Teks asli ID: "Dapatkan MEAL COUPON senilai Rp 50.000 untuk wanita, remaja usia 17 tahun ke bawah, PAIR Mix (Men & Women), atau PAIR Mix (Women & Women)—satu kupon per PAIR. Penawaran ini berlaku untuk WNI, WNA (Foreigners), dan Ekspatriat di seluruh kategori, namun tidak berlaku untuk PAIR (Men & Men)."

Teks asli EN: "Get a MEAL COUPON worth Rp 50,000 for women, youth aged 17 and under, PAIR Mix (Men & Women), or PAIR (Women & Women)—one coupon per PAIR. This offer applies to Indonesian citizens, Foreigners, and Expatriates across all categories, but does not apply to PAIR (Men & Men)."

## 6. Data Terstruktur (siap pakai untuk kode)

```json
{
  "currency": "IDR",
  "price_type": "regular",
  "registration_deadline_jersey_medal": "2026-09-10",
  "late_registration_policy": "Jersey/Medal delivered after the event",
  "options": [
    { "id": "A", "category": "Urban Gravel",  "distance": "60++ km",  "race": false, "pair": false, "package": "Medal & Jersey", "price": 300000 },
    { "id": "B", "category": "Urban Gravel",  "distance": "60++ km",  "race": false, "pair": false, "package": "Medal",          "price": 250000 },
    { "id": "C", "category": "Urban Gravel",  "distance": "80++ km",  "race": false, "pair": false, "package": "Medal & Jersey", "price": 350000 },
    { "id": "D", "category": "Urban Gravel",  "distance": "80++ km",  "race": false, "pair": false, "package": "Medal",          "price": 300000 },
    { "id": "E", "category": "Amazing Race",  "distance": "120++ km", "race": true,  "pair": false, "package": "Medal & Jersey", "price": 450000 },
    { "id": "F", "category": "Amazing Race",  "distance": "120++ km", "race": true,  "pair": false, "package": "Medal",          "price": 400000 },
    { "id": "G", "category": "Amazing Race",  "distance": "120++ km", "race": true,  "pair": true,  "pair_type": "Mix", "pax": 2, "package": "Medal & Jersey", "price": 750000 },
    { "id": "H", "category": "Amazing Race",  "distance": "120++ km", "race": true,  "pair": true,  "pair_type": "Mix", "pax": 2, "package": "Medal",          "price": 700000 },
    { "id": "I", "category": "Grand Fondo",   "distance": "150++ km", "race": false, "pair": false, "package": "Medal & Jersey", "price": 450000, "includes": ["Ancol Entrance Admission"] },
    { "id": "J", "category": "Grand Fondo",   "distance": "150++ km", "race": false, "pair": false, "package": "Medal",          "price": 400000, "includes": ["Ancol Entrance Admission"] },
    { "id": "K", "category": "Ultra Gravel",  "distance": "200++ km", "race": false, "pair": false, "package": "Medal & Jersey", "price": 450000, "includes": ["Ancol Entrance Admission"] },
    { "id": "L", "category": "Ultra Gravel",  "distance": "200++ km", "race": false, "pair": false, "package": "Medal",          "price": 400000, "includes": ["Ancol Entrance Admission"] }
  ],
  "foreigner_expatriate": {
    "id": "M",
    "note": "Select any jersey option",
    "single": { "usd": 50, "idr": 890000 },
    "pair":   { "usd": 80, "idr": 1424000, "pax": 2 }
  },
  "included_in_all_options": ["Medal", "Limited accident insurance (valid on event day)"],
  "meal_coupon": {
    "value_idr": 50000,
    "eligible": ["Women", "Youth aged 17 and under", "PAIR Mix (Men & Women)", "PAIR (Women & Women)"],
    "per_pair_single_coupon": true,
    "not_eligible": ["PAIR (Men & Men)"],
    "applies_to": ["Indonesian citizens (WNI)", "Foreigners (WNA)", "Expatriates"],
    "categories": "all"
  }
}
```

## 7. Hal yang Perlu Diperhatikan

1. **Kolom harga ganda:** tabel asli punya dua kolom "REGULER Price" dengan nilai sama. Tidak ada kolom harga lain (misalnya Early Bird atau Late), jadi semua harga di atas dianggap harga reguler tunggal.
2. **Deadline 10 September 2026 sudah lewat** per 12 Oktober 2026. Pendaftaran Jersey/Medali setelah tanggal itu dikirim setelah event.
3. **Konteks event berbeda:** kategori di tabel ini (60++/80++/120++/150++/200++ km, Amazing Race, Grand Fondo, Ultra Gravel, tiket Ancol) **tidak sama** dengan Athlete Guide Bekasi Coastal Gravel (50+/80+/100+/150+ km). Tabel ini tampaknya milik event lain, dan nama event tidak tertulis di gambar.
4. **Opsi pair:** hanya Amazing Race (G dan H) yang punya varian Pair Mix (2 pax) dengan harga terpisah. Tabel tidak menyebut eksplisit apakah harga itu per pasangan, tetapi karena baris ditandai "2 pax" dan harganya lebih dari satu peserta, kemungkinan besar harga per pasangan. Ini inferensi, sebaiknya dikonfirmasi ke panitia.
5. **Kupon makan:** teks Indonesia menulis "PAIR Mix (Women & Women)" sedangkan teks Inggris menulis "PAIR (Women & Women)". Keduanya dibaca sebagai pasangan perempuan-perempuan. Satu-satunya kombinasi pair yang dikecualikan adalah Men & Men.
