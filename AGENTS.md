# 🚨 AGENTS.MD — MANDATORY WORKSPACE INSTRUCTIONS & SOURCE OF TRUTH

> **CRITICAL PRE-FLIGHT MANDATE FOR ALL AI AGENTS & BUILD PROCESSES:**  
> Before generating code, proposing architectural plans, modifying UI components, or writing content for **Gravel Grindurance 2026 (GX-ID)**, you **MUST** read and adhere to the canonical files below.

---

## 1. 📖 MANDATORY PRE-FLIGHT READING LIST

1. **`GRINDURANCE_Terbaru.md` (SUPREME TRUTH / HUKUM TERTINGGI DATA EVENT)**
   - Sintesis resmi dari 3 dokumen teknis utama panitia:
     - *GRINDURANCE 100 K .pdf*
     - *GRINDURANCE 2026 - 120-150 K.pdf*
     - *GRINDURANCE 2026 - 200 K.pdf*
   - Jika terdapat perbedaan antara file draf lama (`Konsep_Event_Gravel_Grindurance_2026.md`, `event_sebelumnya_1.md`, `PRD_Gravel_Grindurance_2026.md`) dengan `GRINDURANCE_Terbaru.md`, maka **`GRINDURANCE_Terbaru.md` WAJIB DIMENANGKAN TANPA PENGECUALIAN**.

2. **`RULES.md` & `.agents/rules/design-rules.md` (HUKUM TERTINGGI DESAIN UI/UX)**
   - **Icon-Free Mandate**: Dilarang menggunakan ikon dekoratif (Lucide, react-icons, dsb). Satu-satunya ikon yang diizinkan adalah `<ArrowUpRight>` untuk tombol CTA navigasi utama.
   - **Typography-First**: Hirarki visual wajib dibangun dengan tipografi kuat (`font-display` italic uppercase, `font-mono` dengan aksen `//` dan `·`, `font-sans` clean untuk deskripsi naratif).
   - **Atmospheric Container**: Semua halaman wajib berwadah (`max-w-7xl` atau boxed container), tidak boleh stretched full-bleed melayang tanpa struktur.
   - **Color Identity (Strict Tri-Color Mandate)**: HANYA BOLEH menggunakan 3 warna: Dark Carbon (`#0D0E11`, `#0B0C0E`), Pure White/Slate, dan Electric High-Vis Orange (`#FA6D0B`). DILARANG KERAS menggunakan warna lain (TIDAK BOLEH merah, hijau, biru, kuning, dsb). Tidak boleh berlebihan.
   - **Clean Borderless Cards**: Kartu wajib borderless rounded (`rounded-xl`/`rounded-2xl`) dengan bayangan halus, tanpa stroke border putih di luarnya.

---

## 2. 📊 CANONICAL EVENT SPECIFICATION (DATA KUNCI TERBARU)

| Kategori | ID Kode | Jarak Nyata | Komposisi Rute | Elevasi Gain | Titik Tertinggi | Format & Regulasi Kunci |
|---|---|---|---|---|---|---|
| **70 Km Fun Gravel** | `60` / `70` | 70 km | 70 km rute panitia | Sesuai rute | Sesuai rute | Rekreasi pemula tanpa tekanan berlebih. |
| **100 Km Fondo** | `100` | **101 km** | 101 km rute panitia | **+1.070 m** | **310 m MDPL** | *Endurance ride*, 3 tanjakan utama (2.88 km @ 5%, 2.89 km @ 6%, 3.16 km @ 4.5%), segmen path 3.02 km & off-grid 5.11 km. |
| **120 Km Race** | `120` | **120 km** | 120 km rute panitia | **+1.760 m** | **680 m MDPL** | **Official Race Kompetitif**: 7 tanjakan (tanjakan ke-4: 4.07 km @ 7%, 271 m ascent), unpaved 16.5 km, off-grid 3.77 km, podium Top 3. Mendukung Single & Pair Mix. |
| **150 Km Grand Fondo** | `150` | **150 km** | **120 km rute utama + 30 km prolog mandiri** | +1.760 m (rute utama) | **680 m MDPL** | **Wajib Prolog 30 km**: Peserta merancang & menuntaskan 30 km mandiri sebelum start LRT Harjamukti. |
| **200 Km Ultra** | `200` | **200 km** | **170 km rute utama + 30 km prolog mandiri** | **+2.530 m** | **1.110 m MDPL** | **Batas Waktu (COT) Resmi: 17 Jam dari start**. 8 tanjakan (tanjakan utama 8.87 km @ 7% vertikal 628 m), tantangan malam (*Night cycling*). Wajib selesaikan punggungan berbahaya saat terang. |
| **Virtual Ride** | `VIRTUAL` | Sesuai Pilihan | Rute mandiri di 19 Chapter | Sesuai rute | Sesuai rute | 19 Chapter se-Indonesia, Strava Webhook, Medali dikirim via DHS Logistik. |

---

## 3. 🚨 PROTOKOL EKSEKUSI SETIAP MEMULAI FITUR BARU

1. **Selalu verifikasi data** di [GRINDURANCE_Terbaru.md](file:///c:/Users/ILHAM/Downloads/GRINDURANCE/GRINDURANCE_Terbaru.md) sebelum mengubah halaman atau endpoint API.
2. **Jangan pernah mengarang** data fiktif (jarak, tanjakan, elevasi, jam start, atau nama checkpoint).
3. **Terapkan Persona Senior Software Architect**: Jelaskan Analisa Dampak, Rencana Solusi, dan Deteksi Edge Cases sebelum implementasi.
