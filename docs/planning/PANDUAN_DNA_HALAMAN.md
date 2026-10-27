# 📋 CHEATSHEET & PANDUAN PENGEMBANGAN HALAMAN LAIN (GRINDURANCE 2026)

Dokumen ini adalah **panduan praktis cepat (cheatsheet)** saat mengerjakan, merefaktor, atau menambah fitur pada halaman-halaman website:
- `/kategori` (Panduan Kategori & Spec Sheet)
- `/daftar` (Formulir Pendaftaran Resmi)
- `/cek-bib` (Lookup Nomor Dada & Unduh Kartu Digital)
- `/peraturan` (Handbook Regulasi & Aturan Musim Hujan)
- `/peserta` & `/checkpoint` (Roster Atlet & Log Pos)

---

## 1. Import Standar yang Selalu Digunakan

```tsx
'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react'; // SATU-SATUNYA IKON YANG DIIZINKAN (untuk tombol navigasi)
import { useLanguage } from '@/lib/context/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { CATEGORIES, EVENT_DATE_ISO, isGpxDownloadLocked } from '@/lib/data/categories';
```

---

## 2. Struktur Header Halaman Standar

Setiap halaman sub (selain homepage) wajib menggunakan format header editorial atletik berikut:

```tsx
<div className="border-b border-white/10 pb-6 sm:pb-8 mb-8 sm:mb-12">
  {/* Sub-label Telemetri Emas/Oranye */}
  <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-2">
    GX-ID OFFICIAL SPEC SHEET // 2026 EDITION
  </span>
  
  {/* Judul Utama Display Italic Uppercase */}
  <h1 className="font-display italic text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
    {t('PANDUAN KATEGORI & RUTE', 'CATEGORY & ROUTE GUIDE')}
  </h1>
  
  {/* Paragraf Pengantar Sans Bersih */}
  <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-400 max-w-3xl leading-relaxed font-sans">
    {t(
      'Deskripsi penjelasan halaman dalam bahasa Indonesia yang lugas dan informatif.',
      'Page explanation in clear English.'
    )}
  </p>
</div>
```

---

## 3. Format Card & Kontainer Data

Semua card dan panel box harus menggunakan styling glassmorphism atletik:

```tsx
{/* Standard Dark Athletic Card */}
<div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4 hover:border-[#FA6D0B]/40 transition-all duration-300">
  ...
</div>

{/* Premier / Featured Card (misal kategori 200 Ultra / Amazing Race) */}
<div className="rounded-xl sm:rounded-2xl border border-[#FA6D0B]/50 bg-gradient-to-b from-black/60 via-black/40 to-black/80 backdrop-blur-md p-5 sm:p-6 shadow-[0_15px_50px_rgba(250,109,11,0.15)] space-y-4">
  ...
</div>
```

---

## 4. Format Tombol Standar (Buttons)

### A. Tombol CTA Utama (Pendaftaran / Checkout)
```tsx
<Link
  href="/daftar"
  className="group relative px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-300 hover:shadow-[0_0_35px_rgba(250,109,11,0.65)] flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden"
>
  <span className="absolute inset-0 w-1/3 bg-white/20 blur-sm -skew-x-12 animate-sheen-sweep pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
  <span className="relative z-10">{t('DAFTAR SEKARANG', 'REGISTER NOW')}</span>
  <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
</Link>
```

### B. Tombol Sekunder / Outline
```tsx
<Link
  href="/peraturan"
  className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white border border-[#FA6D0B]/60 hover:border-[#FA6D0B] bg-white/[0.03] hover:bg-[#FA6D0B]/10 transition-all duration-300 flex items-center justify-center"
>
  <span>{t('BACA REGULASI', 'READ RULES')}</span>
</Link>
```

### C. Tombol Micro Telemetri / Switcher
```tsx
<button
  type="button"
  className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 hover:border-[#FA6D0B] transition-all active:scale-95"
>
  RESET // 01
</button>
```

---

## 5. Format Formulir & Input Data (`/daftar`, `/cek-bib`)

Semua input text, select, dan radio harus berkarakter industrial:

```tsx
{/* Label Input */}
<label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
  NOMOR IDENTITAS (NIK / PASSPORT) <span className="text-[#FA6D0B]">*</span>
</label>

{/* Input Field */}
<input
  type="text"
  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
  placeholder="Contoh: 3201..."
/>
```

---

## 6. Format Baris Data & Tabel Telemetri (`/kategori`, `/peserta`, `/checkpoint`)

```tsx
<div className="border-t border-white/10 pt-3 space-y-2 font-mono text-xs">
  <div className="flex justify-between items-center">
    <span className="text-slate-400">{t('Batas Waktu (COT):', 'Cut-Off Time (COT):')}</span>
    <span className="text-white font-bold">11.0 JAM // WAVE 2</span>
  </div>
  <div className="flex justify-between items-center">
    <span className="text-slate-400">{t('Total Elevasi:', 'Total Elevation:')}</span>
    <span className="text-[#FA6D0B] font-bold">+1,450 M GAIN</span>
  </div>
  <div className="flex justify-between items-center">
    <span className="text-slate-400">{t('Status Live Tracking:', 'Live Tracking Status:')}</span>
    <span className="text-white font-semibold">WAJIB AKTIF (LIVE TRACKING)</span>
  </div>
</div>
```

---

## 7. Prinsip Utama: Jangan Langgar Aturan Ini!
1. ❌ **JANGAN memasang icon Lucide dekoratif** (seperti `<Map>`, `<Calendar>`, `<Clock>`, `<CheckCircle2>`, `<Download>`, `<Shield>`, dll.).
2. ❌ **JANGAN membuat badge model SaaS** seperti `[LIVE]` atau `[PRO]`.
3. ❌ **JANGAN memakai warna neon liar** (hijau stabilo, ungu gradien, biru muda). Gunakan hanya Deep Carbon (`#0D0E11`), Electric Orange (`#FA6D0B`), Putih (`#FFFFFF`), dan Slate.
4. ✅ **BUNGKUS** section dengan `<ScrollReveal>` agar masuk dengan transisi halus saat di-scroll.
