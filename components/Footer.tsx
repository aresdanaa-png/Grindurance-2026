import Link from 'next/link';
import { Compass, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-base border-t border-brand-border text-brand-muted mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent">
                <Compass className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white uppercase">
                GRAVEL GRINDURANCE <span className="text-brand-accent">2026</span>
              </span>
            </div>
            
            <p className="text-xs text-brand-muted max-w-sm leading-relaxed font-sans">
              Ekspedisi balap sepeda ultra-endurance dan gravel mandiri (*unsupported*) tahunan oleh 
              GX-ID (Gravel & Ultra Cycling Indonesia). Loop Jonggol–Sukamakmur–Sentul di musim hujan.
            </p>

            <div className="pt-2 font-mono text-[11px] text-brand-muted space-y-1">
              <div>HOST: ABEEY Coffee & Eatery • LRT Harjamukti, Cibubur</div>
              <div>DATE: Minggu, Minggu Ke-2 Desember 2026</div>
              <div>COMMUNITY: 80.000+ Pesepeda • 19 Chapter Regional</div>
            </div>
          </div>

          {/* Navigasi (3 Cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] border-b border-brand-border pb-2">
              Navigasi Resmi
            </h4>
            <ul className="space-y-2 uppercase tracking-wide">
              <li>
                <Link href="/kategori" className="hover:text-brand-accent transition-colors">
                  5 Kategori & Rute
                </Link>
              </li>
              <li>
                <Link href="/peserta" className="hover:text-brand-accent transition-colors text-white">
                  Rider Roster (Start List)
                </Link>
              </li>
              <li>
                <Link href="/peraturan" className="hover:text-brand-accent transition-colors">
                  Regulasi & Athlete Guide
                </Link>
              </li>
              <li>
                <Link href="/cek-bib" className="hover:text-brand-accent transition-colors">
                  Cek Nomor BIB Digital
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="hover:text-brand-accent transition-colors text-brand-accent">
                  Pendaftaran Peserta
                </Link>
              </li>
            </ul>
          </div>

          {/* Operasional & Kontak (4 Cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] border-b border-brand-border pb-2">
              Race Operations & Hotline
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/scrutineering" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Meja Scrutineering (Prolog 30 km)</span>
                  <span className="text-[10px] text-brand-accent border border-brand-border px-1.5 py-0.5">03:00 WIB</span>
                </Link>
              </li>
              <li>
                <Link href="/checkpoint" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Kalkulator Pitstop 300%</span>
                  <span className="text-[10px] text-brand-muted border border-brand-border px-1.5 py-0.5">CP#4 / CP#6</span>
                </Link>
              </li>
              <li className="pt-2 text-brand-muted">
                <span className="block text-[10px] text-slate-500 uppercase">Emergency Medical Partner:</span>
                <span className="text-white">SPGDT RS Hermina Cibubur (021-828-1234)</span>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/628562720141"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-accent hover:underline text-xs"
                >
                  <span>WhatsApp Panitia (+62 856-2720-141)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-brand-border mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-brand-muted gap-4">
          <p>© 2026 GX-ID (Gravel & Ultra Cycling Indonesia). All rights reserved.</p>
          <div className="flex items-center gap-4 uppercase tracking-wider">
            <span>Terrain: Makadam · Aspal Rusak · Tanah</span>
            <span>•</span>
            <span className="text-brand-accent">Rain Season Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
