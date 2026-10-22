# 🚴 GRAVEL GRINDURANCE 2026 — UI/UX DESIGN SYSTEM & RULES (DNA MASTER BIBLE)

> **DOKUMEN HUKUM DESAIN & IMPLEMENTASI RESMI (DESIGN & MOTION DNA BIBLE)**  
> File ini mengatur seluruh kaidah visual, estetika, interaksi kinetik, dan standar implementasi antarmuka untuk seluruh halaman website **Gravel Grindurance 2026 (GX-ID)**.  
> **SEMUA halaman (`/`, `/kategori`, `/daftar`, `/cek-bib`, `/peraturan`, `/peserta`, `/checkpoint`, `/scrutineering`) WAJIB tunduk dan patuh 100% pada aturan di dokumen ini.** Tidak boleh ada elemen liar, inkonsistensi layout, maupun komponen asal-asalan yang melanggar standar ini.

---

## 1. Core Visual DNA & Philosophy

* **Genre**: *Dark Gritty Athleticism* (terinspirasi dari *Canyon, Nike Trail, Rapha Custom, Pas Normal Studios, Strava Dark*).
* **Karakter**: Garang, presisi, berkarakter tantangan musim hujan (*un-supported rain season challenge*), industrial, dan berorientasi telemetri balap sepeda.
* **Bukan SaaS / Dashboard**: Website ini adalah **poster editorial atletik premium**, **BUKAN** dashboard admin software, aplikasi SaaS, atau blog korporat yang penuh hiasan ikon generik.
* **Konsistensi Antar-Halaman**: Setiap halaman harus terasa seperti bab dari buku panduan ekspedisi yang sama—menggunakan palet warna, tipografi, ritme border, dan mikro-interaksi yang seragam.

---

## 2. 🚫 ATURAN MUTLAK #1: ICON POLICY (ICON-FREE AESTHETIC)

> **"SAYA TIDAK SUKA ADA ICON-ICON"**

1. **Dilarang Keras Menambahkan Ikon Lucide/FontAwesome Dekoratif**:
   - ❌ **DILARANG**: Memasang ikon seperti `<Map>`, `<Calendar>`, `<Clock>`, `<Flag>`, `<Download>`, `<AlertCircle>`, `<Sparkles>`, `<Layers>`, `<Coffee>`, `<CheckCircle2>`, `<Mountain>`, `<TrendingUp>`, `<Lock>`, dll. di samping label teks, tombol, header, atau card.
   - ❌ **DILARANG**: Badge model SaaS seperti `[icon 🗺️] GPX LIVE` atau `[icon ⏱️] COT 07:00` atau `[icon 🔒] TERKUNCI`.
   - ✅ **GUNAKAN**: **Tipografi murni** (*Pure Typography*), garis miring ganda (`//`), titik pemisah (`·`), dan kode telemetri monospace.

2. **Satu-satunya Pengecualian Ikon yang Diizinkan**:
   - Hanya icon penunjuk arah **`<ArrowUpRight>`** pada tombol CTA utama (misalnya: `REGISTER NOW`, `DAFTAR SEKARANG`, `ATHLETE GUIDE PDF`, `PILIH KATEGORI INI`) untuk menandakan aksi navigasi keluar atau ke halaman pendaftaran.
   - Selain itu, seluruh elemen antarmuka wajib berbentuk **tipografi teks murni**.

---

## 3. 🚫 ATURAN MUTLAK #2: NO REDUNDANT MICRO-GIMMICKS

1. **Titik Pulsating Oranye (Pulsing Dot)**:
   - ❌ **DILARANG MENUMPUK TITIK ORANYE**: Jangan pernah meletakkan dua titik oranye berdekatan dalam satu area pandang (misalnya di header box satu titik, lalu di bar konten di bawahnya titik lagi). Ini terlihat amatir dan berantakan.
   - ✅ Titik indikator hanya boleh muncul paling banyak **1 buah** per modul utama jika memang menandakan status aktif (*live*), atau tidak sama sekali.

2. **Dilarang Meniru Komponen SaaS Generik**:
   - Hindari tombol/pill bulat mini dengan outline tipis dan icon garis di dalamnya yang biasa ditemukan di template Tailwind SaaS gratisan.
   - Dilarang membuat badge status bertuliskan `[LIVE]` model software.
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
* **Garis miring ganda**: `RUNDOWN RESMI // OPERASIONAL BALAPAN`, `STAGE // PRODUKSI`, `ETAPE // 120 KM`, `PROTOKOL NAVIGASI // GRINDURANCE 2026`
* **Titik tengah**: `UN-SUPPORTED · 60–200 KM`, `WAVE 1 · 05:30 WIB`, `MEDAL · JERSEY`

---

## 5. 🚫 ATURAN MUTLAK #3: STRICT TRI-COLOR PALETTE (ONLY BLACK, WHITE, & ORANGE)

> **"SAYA TIDAK SUKA ADA WARNA LAIN SELAIN PUTIH, HITAM, DAN ORANGE. MAU ITU BIRU, HIJAU, ATAU MERAH — SAYA TIDAK SUKA (UNTUK UI/UX). TIDAK BOLEH BERLEBIHAN."**

1. **Hanya 3 Warna Utama yang Diizinkan di Seluruh Antarmuka (Tri-Color Master Canon)**:
   - **Deep Carbon / Hitam**: `#0D0E11` (Hero & Primary Canvas), `#0B0C0E` (Sections & Footer), dan `bg-black/60` – `bg-black/80` untuk card/container.
   - **Putih / Slate Monokrom**: `#FFFFFF` (Heading utama, kontras tinggi), `#E2E8F0` / `#CBD5E1` (`text-slate-200..300` untuk body text), dan `#94A3B8` (`text-slate-400` untuk sub-telemetri).
   - **Grindurance Electric High-Vis Orange**: `#FA6D0B` (Aksen primer, garis rute, tombol CTA utama, active tab/selection, glowing indicator).
   - **Orange Hover State**: `#DE5A00` (Hover effect untuk tombol solid).

2. **Dilarang Keras Menggunakan Warna Lain di Seluruh UI/UX**:
   - ❌ **DILARANG MERAH / ROSE (`red-*`, `rose-*`)**: Untuk status error, peringatan, diskualifikasi, penalti, atau emergency, **JANGAN** gunakan merah. Gunakan tipografi bold putih, badge `bg-white/10 text-white`, atau aksen `#FA6D0B` dengan label tegas `// PERINGATAN`.
   - ❌ **DILARANG HIJAU / EMERALD (`green-*`, `emerald-*`)**: Untuk status lolos, sukses, checklist, stempel cleared, atau marker start, **JANGAN** gunakan hijau. Gunakan putih bersih atau aksen oranye `#FA6D0B`.
   - ❌ **DILARANG BIRU / INDIGO / CYAN (`blue-*`, `indigo-*`, `cyan-*`)**: Dilarang total dalam gradien, latar belakang, maupun badge.
   - ❌ **DILARANG KUNING / AMBER / UNGU / PINK**: Dilarang total. Komposisi makadam/tanah harus menggunakan nuansa monokromatik putih/slate (`bg-white/40`), bukan kuning/amber.

3. **Prinsip "Tidak Boleh Berlebihan" (Tactical Balance)**:
   - Oranye `#FA6D0B` adalah **warna aksen taktis**, bukan cat dinding. Dominasi visual tetap pada atmosfer gelap Deep Carbon yang tenang dan maskulin.
   - Jangan menyalakan semua tombol/border dengan warna oranye bersamaan. Oranye hanya untuk titik fokus interaksi utama (Primary CTA, tab yang sedang aktif, dan data metrik kunci).

---

## 6. Bentuk Tombol & Komponen (Shapes & Buttons)

1. **Tombol CTA Utama**:
   - Bentuk kapsul penuh: `rounded-full`.
   - Warna latar: `#FA6D0B` solid dengan teks hitam pekat `text-black font-bold uppercase tracking-wider`.
   - Hover: Bayangan oranye menyala `hover:shadow-[0_0_35px_rgba(250,109,11,0.65)]`, sedikit terangkat `hover:-translate-y-0.5`, dan transisi klik taktil `active:scale-95`.
   - Animasi Sheen: Kilatan halus `animate-sheen-sweep` melintas di permukaan tombol.
   - Ikon panah: `<ArrowUpRight>` meluncur 3px diagonal saat hover (`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out`).

2. **Tombol Kontrol Micro (Peta / Switcher)**:
   - Teks murni, tanpa icon.
   - Contoh: `GELAP`, `SATELIT`, `RESET`, `DOWNLOAD GPX`, `TERKUNCI // H-2 (11 DES)`.
   - Menggunakan `font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider`.

3. **Card & Panel Box (Natural Borderless Aesthetic)**:
   - **TIDAK BOLEH ADA OUTER BORDER / STROKE**: Dilarang keras menggunakan border luar (baik tipis maupun tebal, seperti `border`, `border-white/10`, dsb). Kotak dan kolom harus tampak menyatu secara alami tanpa garis tepi.
   - Sudut membulat modern: `rounded-2xl` atau `rounded-3xl`.
   - Kedalaman & Kontras Gelap: Latar belakang gelap bertingkat (`bg-[#121418]`, `bg-black/50`, `bg-[#0D0E11]`).
   - Bayangan atmosfer: `shadow-[0_20px_50px_rgba(0,0,0,0.6)]`.
   - **DILARANG MENGGUNAKAN BADGE / PILL BOX**: Jangan membungkus teks status, peran, atau metadata ke dalam kotak rounded badge. Gunakan **Tipografi Murni** dengan pemisah telemetri (`//` dan `·`) serta aksen warna teks.

---

## 7. Standar GPX Live & Route Map

1. **Dual Layer Leaflet**:
   - Mendukung toggle cepat antara `GELAP` (Esri Dark Canvas) dan `SATELIT` (Esri World Imagery + Labels).
2. **Polyline Berpendar**:
   - Garis rute utama menggunakan Electric Orange (`#FA6D0B`, `weight: 3.5, opacity: 0.98`) dengan *glow underlay* (`weight: 10, opacity: 0.22`).
   - Tooltip mengikuti kursor saat menelusuri lintasan: `GRINDURANCE [KM] // RUTE AKTIF`.
3. **Marker Start & Finish dengan Radar Halo**:
   - Titik **START** (hijau `#22C55E`) dengan *radar halo beacon* berdenyut periodik (`animate-radar-halo`). Tooltip: `START // KM 0 · ABEEY COFFEE`.
   - Titik **FINISH** (oranye `#FA6D0B`) dengan *radar halo beacon* berdenyut periodik. Tooltip: `FINISH // ABEEY COFFEE`.
   - Dilarang keras memakai ikon pin Lucide generik.
4. **HUD Telemetry Overlay Peta**:
   - Di sudut kiri-bawah peta, tampil chip status telemetri berlatar glassmorphism:
     - Indikator aktif: `GPX LIVE // [KM]`
     - Detail poin: `[X] PTS · ALT [MIN]M - [MAX]M · FILE: TERKUNCI H-2`

---

## 8. Protokol Rilis & Penguncian Berkas GPX (H-2 Lock Protocol)

1. **Jadwal Penguncian Resmi**:
   - Tanggal Event: **Minggu, 13 Desember 2026**.
   - Waktu Buka Kunci: **Jumat, 11 Desember 2026, 00:00 WIB (H-2)**.
   - Konstanta terpusat di `lib/data/categories.ts`:
     - `EVENT_DATE_ISO = '2026-12-13T00:00:00+07:00'`
     - `GPX_UNLOCK_DATE_ISO = '2026-12-11T00:00:00+07:00'`
     - Helper: `isGpxDownloadLocked(): boolean` (mendukung override URL pengujian `?unlock_gpx=1`).
2. **Aturan UI Tombol GPX**:
   - Sebelum H-2: Tombol bertuliskan `TERKUNCI // H-2 (11 DES)` (pill berlatar `bg-white/[0.08]` border `border-white/20`).
   - Mengklik tombol membuka **Modal Dialog Protokol Navigasi**:
     - 100% *pure typography*, tanpa icon gembok/alert.
     - Penjelasan alasan keselamatan: Finalisasi survei keselamatan rute (*safety reconnaissance*) oleh tim marshal, pemeriksaan kondisi makadam musim hujan, dan izin sterilisasi lintasan.
     - Penegasan bahwa peta satelit GPX Live di layar tetap aktif 100% untuk dipelajari konturnya.
   - Tepat H-2 (atau mode pengujian): Tombol otomatis beralih menjadi tombol oranye solid `DOWNLOAD GPX`.
3. **Proteksi Server API**:
   - Endpoint `/api/gpx/download?category=[id]` memvalidasi waktu server.
   - Sebelum H-2: Merespons `HTTP 423 Locked` dengan JSON penjelasan protokol.
   - Setelah H-2 (atau `?unlock_gpx=1`): Mengalirkan file berkas resmi `.gpx` dengan `Content-Disposition: attachment`.

---

## 9. Standar Diagram Profil Elevasi SVG (Elevation Profile)

1. **Penempatan Layout**:
   - Diletakkan **tepat di bawah kotak peta GPX Live** pada kolom kiri Cockpit Rute untuk menyeimbangkan tinggi kolom kiri dan kanan secara presisi.
2. **Visual Kinetik (Self-Drawing Ridge)**:
   - Area chart berbasis SVG dengan gradien oranye atletik (`#FA6D0B` fill transparan).
   - Saat kategori berganti, garis kontur tanjakan **menggambar dirinya sendiri dari kiri ke kanan** menggunakan class `.animate-draw-ridge` (0.85s `cubic-bezier(0.16, 1, 0.3, 1)`).
   - Arsiran gradien memudar masuk dengan `.animate-fade-in-area`.
3. **Interactive Scrubbing Telemetri**:
   - Pengunjung dapat mengarahkan kursor/jari menyusuri grafik kontur:
     - Garis *crosshair* vertikal mengikuti posisi kursor.
     - Titik koordinat aktif menampilkan cincin gelombang radar ganda (`animate-ping`).
     - Badge telemetri melayang muncul dengan akselerasi pegas (`animate-pop-in-spring`): `KM [X] · [Y]M MDPL`.
4. **Pin Stasiun Jalur**:
   - Menampilkan garis putus-putus vertikal untuk penanda kilometer stasiun resmi: `START`, `WS`, `CP`, `KOM`, dan `FINISH`.

---

## 10. Motion & Animation DNA (Ultra-Fluid 60 FPS Standards)

Seluruh animasi wajib berbasis **akselerasi perangkat keras (GPU)** dan tidak boleh menyebabkan pergeseran tata letak (*zero cumulative layout shift*):

1. **Keyframes Resmi di `app/globals.css`**:
   - `drawRidge`: Kinetik pena GPS menggambar rute elevasi (`stroke-dasharray: 1400`).
   - `fadeInArea`: Transisi lembut arsiran gradien SVG.
   - `radarHalo`: Pendaran cincin radar pada titik GPS satelit.
   - `breathingGlow`: Denyut halus pendar oranye pada jalur balap.
   - `sheenSweep`: Kilatan cahaya miring tipis di permukaan tombol CTA.
   - `popInSpring`: Transisi modal dan tooltip dialog elastis.
2. **Morphing Bar Komposisi Medan**:
   - Batang pembagian lintasan (Aspal, Makadam, Tanah) wajib menggunakan `transition-all duration-700 ease-out` agar bergerak melar dan menyusut luwes saat berganti etape.
3. **Scroll-Driven Viewport Reveal**:
   - Setiap modul/section dibungkus komponen `ScrollReveal` (`components/ui/ScrollReveal.tsx`) dengan animasi `.reveal-on-scroll` (`opacity: 0, translateY: 22px` -> `opacity: 1, translateY: 0` menggunakan easing `cubic-bezier(0.16, 1, 0.3, 1)`).
4. **Aksesibilitas Gerak**:
   - Wajib menyertakan `@media (prefers-reduced-motion: reduce)` agar pengguna dengan sensitivitas gerak tetap aman dan nyaman.

---

## 11. Standar Footer Website

1. **Watermark Logo Full-Bleed**:
   - Latar belakang footer menggunakan watermark logo custom `gravel-grindurance.png` putih transparan (`opacity-[0.045]`) yang diperbesar hingga melampaui lebar layar (`w-[135vw] max-w-none -bottom-10 pointer-events-none`).
2. **Tipografi Footer**:
   - Menggunakan tipografi monospace atletik yang bersih.
   - Menyajikan informasi legalitas GX-ID, nomor kontak darurat panitia, tautan halaman regulasi, dan hak cipta resmi.
   - ❌ **Dilarang keras**: Menambahkan badge mini model SaaS seperti `[LIVE]` di footer.

---

## 12. Panduan Standar untuk Halaman Lain (Page-by-Page DNA Rules)

Saat membangun atau merevisi halaman lain, terapkan aturan spesifik berikut:

### A. Halaman Panduan Kategori & Spec Sheet (`/kategori`)
- Header: Display italic uppercase dengan sub-label emas `GX-ID OFFICIAL SPEC SHEET // 2026 EDITION`.
- Grid: Kartu kategori per etape dengan tiering jelas (`Tier 01 // Ultra`, `Tier 02 // Grand Fondo`, `Tier 03 // Race Podium`, dst.).
- Tabel Telemetri: Baris data COT, Elevasi, Aturan Prolog, dan Live Tracking dalam tipografi monospace/sans bergaris pemisah halus `border-zinc-800`.
- Tombol: CTA mengarah langsung ke pendaftaran per kategori (`/daftar?category=[id]`) menggunakan tombol kapsul atletik dengan ikon `<ArrowUpRight>`.

### B. Halaman Registrasi & Checkout (`/daftar`)
- Multi-step flow yang minim friksi:
  1. Seleksi Kategori Etape.
  2. Opsi Paket (Medal Saja vs Medal & Jersey).
  3. Formulir Data Diri Atlet (Nama lengkap, No. KTP/Passport, Golongan Darah, Kontak Darurat).
  4. Perhitungan Diskon Otomatis (Youth ≤ 17 tahun, Peserta Wanita, Tim Pair Mix).
  5. Instruksi Pembayaran & Verifikasi.
- Panel ringkasan biaya bergaya telemetri balap transparan.

### C. Halaman Cek Nomor BIB Atlet (`/cek-bib`)
- Input pencarian langsung (live search) berdasarkan nama lengkap atau NIK/Email.
- Tampilan Kartu BIB Digital Resmi:
  - Nomor BIB besar tebal italic (misal: `GR-200-042`).
  - Latar pola grafis atletik resmi Grindurance.
  - Opsi unduh kartu beresolusi tinggi (PNG) untuk ditunjukkan saat Race Pack Collection (RPC).

### D. Halaman Buku Panduan & Regulasi (`/peraturan`)
- Format editorial berwibawa (*Official Technical Handbook*).
- Checklist kelayakan sepeda musim hujan:
  - Lebar ban minimum 35mm (rekomendasi 38–45c).
  - Lampu depan ganda & lampu belakang merah non-flashing.
  - Kit tubeless plug / ban dalam cadangan & pelumas rantai basah (*wet lube*).
- Sistem penalti waktu, aturan pitstop netral wajib (CP#6), dan geofencing tracking.

### E. Halaman Peserta & Checkpoint Tracking (`/peserta`, `/checkpoint`)
- Tabel data telemetri atlet resmi terverifikasi.
- Tampilan status checkpoint per stasiun (Start, WS, CP, KOM, Finish).

---

## 13. Aset Grafis & Fotografi Resmi

1. **Judul Utama Berbasis Grafis WebP**:
   - `nama_event.webp`
   - `official_categories.webp`
   - `text race pack.webp`
   - `text event timeline.webp`
   - Setiap judul grafis wajib diberi *ambient radial backlight glow* oranye tipis di belakangnya.
2. **Fotografi Bertekstur**:
   - `bg-hero.webp`
   - `bg-racepack.webp`
   - `perjalanan-siklis-di-jalur-oranye.webp`
   - Setiap foto wajib diberi *fade dissolve gradient* lembut di bagian atas/bawah agar menyatu tanpa garis batas kaku (*seamless blend*) ke warna latar `#0D0E11` / `#0B0C0E`.

---

## 14. Checklist Verifikasi Pra-Commit (Pre-Delivery Checklist)

Sebelum menyelesaikan pekerjaan pada halaman mana pun, verifikasi:
- [ ] **Zero Ikon Dekoratif**: Tidak ada ikon Lucide generik (`<Map>`, `<Calendar>`, `<Clock>`, `<Lock>`, `<AlertCircle>`, dll.) yang dipasang di samping teks/label/button.
- [ ] **Maksimal 1 Titik Oranye**: Tidak ada tumpukan titik indikator oranye berdekatan dalam satu modul.
- [ ] **Tipografi Konsisten**: Header = `font-display uppercase italic`, Data/Status = `font-mono uppercase //`, Body = `font-sans`.
- [ ] **GPX Lock Terjaga**: Berkas download `.gpx` terkunci hingga H-2 (11 Des 2026, 00:00 WIB), dengan modal dialog pure typography.
- [ ] **Animasi Halus & Ringan**: Elemen bergerak 60 FPS tanpa pergeseran layout (*zero layout shift*).
- [ ] **Nuansa Hitam-Oranye Gritty**: Karakter *Dark Gritty Athleticism* tetap terjaga kuat di setiap halaman.
