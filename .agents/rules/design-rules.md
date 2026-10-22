# UI/UX Design System & Rules — Gravel Grindurance 2026

Refer to the primary rules file at [RULES.md](file:///c:/Users/ILHAM/Downloads/GRINDURANCE/RULES.md).

## Critical Directives:
1. **ICON-FREE MANDATE**: Never add decorative Lucide/FontAwesome icons to labels, badges, headers, or buttons. The ONLY allowed icon is `<ArrowUpRight>` on primary navigation CTAs.
2. **NO MICRO-GIMMICKS / DUPLICATE DOTS**: Never stack pulsating orange dots. Never create SaaS-style pill badges with outline icons.
3. **TYPOGRAPHY-FIRST**: Use `font-display` (bold italic uppercase) for headings/distance, `font-mono` with double slashes `//` for telemetry/status/micro-buttons, and `font-sans` for narrative.
4. **STRICT TRI-COLOR PALETTE ONLY (BLACK, WHITE, ORANGE)**:
   - Only 3 colors are permitted: Deep Carbon Black (`#0D0E11`, `#0B0C0E`), Pure White / Slate grays, and Electric High-Vis Orange (`#FA6D0B`).
   - ABSOLUTELY NO other colors in UI/UX: NO red, NO green/emerald, NO blue/indigo/cyan, NO yellow/amber, NO purple/pink.
   - Alerts, warnings, cleared checks, and penalties must be rendered in high-contrast white, dark carbon badges (`bg-white/10 text-white`), or tactical `#FA6D0B` accents with bold monospace typography.
   - NOT EXCESSIVE: Orange is a tactical accent, never over-saturated or flooding the screen. Keep the atmospheric dark carbon masculine and restrained.
5. **ABSOLUTELY NO OUTER BORDERS / NO OUTER STROKES (NATURAL BORDERLESS DESIGN)**:
   - Dilarang keras menambahkan border luar / garis stroke pada kolom, card, panel filter, tabel, atau kontainer (`border`, `border-white/*`, `border-slate/*`, dsb), baik tipis maupun tebal.
   - Kolom dan kartu wajib borderless (`border-none`), mengandalkan kontras latar belakang gelap (`bg-[#121418]`, `bg-black/50`, `bg-[#0B0C0E]`), bayangan atmosfer (`shadow-[0_20px_50px_rgba(0,0,0,0.6)]`), dan spacing untuk membentuk pemisahan visual yang natural.
6. **ABSOLUTELY NO BADGES (PURE TYPOGRAPHY OVER PILL BOXES)**:
   - Dilarang keras membuat elemen "badge" atau "pill box" (kotak/lonjong mini dengan background rounded pembungkus teks seperti `[ADMIN]`, `[PAID]`, `[L]`, `[4 PLAT]`).
   - Semua informasi status, peran, ukuran, dan metadata wajib disajikan secara **natural via Tipografi Murni (Pure Typography)**: menggunakan font monospace/display, pemisah telemetri (`//` dan `·`), serta warna teks (putih, slate, oranye `#FA6D0B`) tanpa kotak pembungkus.
