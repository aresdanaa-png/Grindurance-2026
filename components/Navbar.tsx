'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Compass, Menu, X, Shield, Award, Users, ShieldCheck, Timer } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-dark/80 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold to-brand-orange flex items-center justify-center font-bold text-brand-dark shadow-glow group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight block text-white">
                GRINDURANCE <span className="text-brand-gold">2026</span>
              </span>
              <span className="text-[10px] text-brand-muted tracking-widest font-semibold uppercase block -mt-1">
                GX-ID Anniversary Edition
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Beranda
            </Link>
            <Link href="/kategori" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-gold" />
              Kategori & Rute
            </Link>
            <Link href="/peserta" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              Start List
            </Link>
            <Link href="/peraturan" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-orange" />
              Regulasi
            </Link>
            <Link href="/cek-bib" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <span>Cek BIB</span>
            </Link>
            <Link href="/scrutineering" className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-xs font-mono bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Scrutineering
            </Link>
            <Link href="/checkpoint" className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-xs font-mono bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700">
              <Timer className="w-3.5 h-3.5 text-brand-sky" />
              Pitstop 300%
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/daftar"
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow transition-all active:scale-95"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-brand-card transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-card/95 border-b border-brand-border px-4 py-4 space-y-3 backdrop-blur-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-brand-cardHover font-medium"
          >
            Beranda
          </Link>
          <Link
            href="/kategori"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-brand-cardHover font-medium"
          >
            Kategori & Rute
          </Link>
          <Link
            href="/peserta"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-brand-cardHover font-medium text-brand-gold"
          >
            Start List (Rider Roster)
          </Link>
          <Link
            href="/peraturan"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-brand-cardHover font-medium"
          >
            Regulasi & Panduan
          </Link>
          <Link
            href="/cek-bib"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-brand-cardHover font-medium"
          >
            Cek Nomor BIB
          </Link>
          <Link
            href="/scrutineering"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-brand-cardHover font-medium font-mono text-xs"
          >
            Scrutineering Desk (Panitia)
          </Link>
          <Link
            href="/checkpoint"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-brand-cardHover font-medium font-mono text-xs"
          >
            Pitstop 300% Calculator
          </Link>
          <div className="pt-2">
            <Link
              href="/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-xl font-bold bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark shadow-glow"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
