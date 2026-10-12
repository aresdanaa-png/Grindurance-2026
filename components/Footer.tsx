import Link from 'next/link';
import { Compass, Instagram, MessageCircle, MapPin, Calendar, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-brand-border text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold to-brand-orange flex items-center justify-center font-bold text-brand-dark shadow-glow">
                <Compass className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                GRAVEL GRINDURANCE <span className="text-brand-gold">2026</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Event sepeda gravel & ultra-endurance tahunan oleh GX-ID (Gravel & Ultra Cycling Indonesia). Menjelajahi tantangan musim hujan rute Jonggol – Sukamakmur – Sentul secara mandiri (*self-supported*).
            </p>
            <div className="flex items-center gap-4 text-xs text-brand-gold pt-2">
              <span className="flex items-center gap-1.5 bg-brand-card px-3 py-1.5 rounded-lg border border-brand-border">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                Desember 2026
              </span>
              <span className="flex items-center gap-1.5 bg-brand-card px-3 py-1.5 rounded-lg border border-brand-border">
                <MapPin className="w-3.5 h-3.5 text-brand-sky" />
                Cibubur, Jabodetabek
              </span>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kategori" className="hover:text-brand-gold transition-colors">
                  Kategori Jarak (60 - 200 KM)
                </Link>
              </li>
              <li>
                <Link href="/peraturan" className="hover:text-brand-gold transition-colors">
                  Aturan Balap & Pitstop Wajib
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="hover:text-brand-gold transition-colors">
                  Pendaftaran Peserta
                </Link>
              </li>
              <li>
                <Link href="/cek-bib" className="hover:text-brand-gold transition-colors">
                  Cek e-Ticket & Nomor BIB
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Media */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Official Channels</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://instagram.com/gxid.official"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-brand-gold transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  @gxid.official
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/628562720141"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-brand-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  WA Panitia (+62 856-2720-141)
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-500">
                Penyelenggara: GX-ID & WGX-ID Nusantara
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 GX-ID (Gravel & Ultra Cycling Indonesia). All rights reserved.</p>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-brand-gold" />
            <span>Built with Endurance Spirits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
