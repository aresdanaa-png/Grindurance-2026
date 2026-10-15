# 🚴 GRAVEL GRINDURANCE 2026 — UI/UX DESIGN SYSTEM & RULES

> **DOKUMEN HUKUM DESAIN RESMI (DNA DESIGN SYSTEM)**  
> File ini mengatur seluruh kaidah visual, estetika, dan implementasi antarmuka untuk website **Gravel Grindurance 2026 (GX-ID)**.  
> **SEMUA perubahan UI wajib tunduk dan patuh 100% pada aturan di dokumen ini.** Tidak boleh ada elemen liar yang melanggar standar ini.

---

## 1. Core Visual DNA & Philosophy

* **Genre**: *Dark Gritty Athleticism* (terinspirasi dari *Canyon, Nike Trail, Rapha Custom, Pas Normal Studios, Strava Dark*).
* **Karakter**: Garang, presisi, berkarakter ekspedisi musim hujan (*un-supported rain season expedition*), industrial, dan berorientasi telemetri balap sepeda.
* **Bukan SaaS / Dashboard**: Website ini adalah **poster editorial atletik premium**, **BUKAN** dashboard admin, aplikasi SaaS, atau blog korporat yang penuh hiasan ikon generik.

---

## 2. 🚫 ATURAN MUTLAK #1: ICON POLICY (ICON-FREE AESTHETIC)

> **"SAYA TIDAK SUKA ADA ICON-ICON"**

1. **Dilarang Keras Menambahkan Ikon Lucide/FontAwesome Dekoratif**:
   - ❌ **DILARANG**: Memasang ikon seperti `<Map>`, `<Calendar>`, `<Clock>`, `<Flag>`, `<Download>`, `<AlertCircle>`, `<Sparkles>`, `<Layers>`, `<Coffee>`, `<CheckCircle2>`, dll. di samping label teks, tombol, header, atau card.
   - ❌ **DILARANG**: Badge model SaaS seperti `[icon 🗺️] GPX LIVE` atau `[icon ⏱️] COT 07:00`.
   - ✅ **GUNAKAN**: **Tipografi murni** (*Pure Typography*), garis miring ganda (`//`), titik pemisah (`·`), dan kode telemetri monospace.

2. **Satu-satunya Pengecualian Ikon yang Diizinkan**:
   - Hanya icon penunjuk arah **`<ArrowUpRight>`** pada tombol CTA utama (misalnya: `REGISTER NOW`, `DAFTAR SEKARANG`, `ATHLETE GUIDE PDF`) untuk menandakan aksi navigasi keluar/halaman pendaftaran.
   - Selain itu, seluruh elemen antarmuka wajib berbentuk **tipografi teks murni**.

---

## 3. 🚫 ATURAN MUTLAK #2: NO REDUNDANT MICRO-GIMMICKS

1. **Titik Pulsating Oranye (Pulsing Dot)**:
   - ❌ **DILARANG MENUMPUK TITIK ORANYE**: Jangan pernah meletakkan dua titik oranye berdekatan (misalnya di header box satu titik, lalu di bar konten di bawahnya titik lagi). Ini terlihat berantakan dan amatir.
   - ✅ Titik indikator hanya boleh muncul paling banyak **1 buah** per modul utama jika memang menandakan status aktif (*live*), atau tidak sama sekali.

2. **Dilarang Meniru Komponen SaaS Generik**:
   - Hindari tombol/pill bulat mini dengan outline tipis dan icon garis di dalamnya yang biasa ditemukan di template Tailwind SaaS gratisan.
   - Semua badge harus berbasis blok warna solid berani (*high-contrast*) atau teks monospaced industrial.

---

## 4. Sistem Tipografi (Typography Hierarchy)

Website menggunakan 3 pilar font yang memiliki fungsi tegas:

| Jenis Font | Class Tailwind | Penggunaan Wajib | Gaya Khas |
|---|---|---|---|
| **Display Font** | `font-display` | Judul hero, nama section, angka jarak utama (60KM, 120KM), nominal harga, status rute | Huruf kapital (*uppercase*), tebal (*font-black*), miring (*italic*), *tracking-tight/wider* |
| **Monospace** | `font-mono` | Data telemetri balap, elevasi, COT, jam jadwal, koordinat, sub-label status, tombol micro | Huruf kapital (*uppercase*), *tracking-widest*, tegas, ala komputer balap Garmin/Wahoo |
| **Sans Serif** | `font-sans` | Paragraf narasi cerita, detail regulasi, syarat pendaftaran, info fasilitas | Bersih, nyaman dibaca (*leading-relaxed*), warna slate |

### Format Penulisan Subtitle & Telemetri
Gunakan pembatas teknis balap:
* **Garis miring ganda**: `RUNDOWN RESMI // OPERASIONAL BALAPAN`, `STAGE // PRODUKSI`, `ETAPE // 120 KM`
* **Titik tengah**: `UN-SUPPORTED · 60–200 KM`, `WAVE 1 · 05:30 WIB`

---

## 5. Palet Warna Resmi (Brand Color Tokens)

* **Deep Carbon Background**: `#0D0E11` (Hero & Primary Body) dan `#0B0C0E` (Timeline & Dark Sections).
* **Grindurance Electric Orange**: `#FA6D0B` (Accent primer, glowing borders, active tabs, route track line).
* **Orange Hover State**: `#DE5A00` (Hover effect untuk tombol solid).
* **Text High-Contrast**:
  * Heading / Primary: `#FFFFFF` (Putih murni).
  * Sub-accent / Telemetry: `#FA6D0B` (Oranye brand).
  * Body text: `#CBD5E1` (`text-slate-300`) atau `#94A3B8` (`text-slate-400`).
* **Borders & Dividers**:
  * Standar: `border-white/10` (transparan elegan).
  * Aksen aktif: `border-[#FA6D0B]/40` atau `border-[#FA6D0B]`.
* **Glassmorphism**: `bg-black/40 backdrop-blur-md` atau `bg-black/50 backdrop-blur-xl`.

---

## 6. Bentuk Tombol & Komponen (Shapes & Buttons)

1. **Tombol CTA Utama**:
   - Bentuk kapsul penuh: `rounded-full`.
   - Warna latar: `#FA6D0B` solid dengan teks hitam pekat `text-black font-bold uppercase tracking-wider`.
   - Hover: Bayangan oranye menyala `hover:shadow-[0_0_24px_rgba(250,109,11,0.55)]` dan transisi `active:scale-95`.

2. **Tombol Kontrol Micro (Peta / Switcher)**:
   - Teks murni, tanpa icon.
   - Contoh: `GELAP`, `SATELIT`, `RESET`, `DOWNLOAD GPX`.
   - Menggunakan `font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider`.

3. **Card & Panel Box**:
   - Sudut membulat modern: `rounded-xl` atau `rounded-2xl`.
   - Border halus `border border-white/10`.
   - Bayangan dalam atmosfer: `shadow-[0_15px_50px_rgba(0,0,0,0.5)]`.

---

## 7. Aset Grafis & Fotografi

1. **Judul Utama Berbasis Grafis WebP**:
   - Judul-judul section utama menggunakan grafis webp beresolusi tinggi dengan *ambient backlight glow* oranye di belakangnya:
     - `nama_event.webp`
     - `official_categories.webp`
     - `text race pack.webp`
     - `text event timeline.webp`
2. **Fotografi Bertekstur**:
   - `hero.webp`
   - `pesepeda2.png`
   - `perjalanan-siklis-di-jalur-oranye.png`
   - Setiap foto wajib diberi *fade dissolve gradient* lembut di bagian atas/bawah agar menyatu tanpa garis batas kaku (*seamless blend*) ke warna latar `#0D0E11` / `#0B0C0E`.

---

## 8. Checklist Verifikasi Sebelum Selesai Mengubah UI

Sebelum mengajukan perubahan antarmuka ke user, pastikan:
- [ ] **Tidak ada ikon Lucide baru yang ditambahkan** untuk hiasan label atau tombol.
- [ ] **Tidak ada titik oranye ganda/menumpuk** dalam satu area pandang.
- [ ] **Tipografi konsisten**: Header = `font-display uppercase italic`, Data/Status = `font-mono uppercase //`, Body = `font-sans`.
- [ ] **Tidak ada badge SaaS generik** dengan border garis tipis dan ikon mini.
- [ ] **Nuansa hitam-oranye pekat** tetap dominan dan terjaga elegan.
