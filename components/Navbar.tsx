'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Compass, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-base/90 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Technical Coordinate Stamp */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-brand-surface border border-brand-border flex items-center justify-center font-bold text-brand-accent group-hover:border-brand-accent transition-colors">
              <Compass className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                  GRINDURANCE
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold text-brand-accent">
                  2026
                </span>
              </div>
              <span className="text-[10px] text-brand-muted font-mono tracking-widest uppercase block -mt-1">
                GX-ID // ANNIVERSARY EDITION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-brand-muted">
            <Link href="/" className="hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/kategori" className="hover:text-white transition-colors">
              Courses & Route
            </Link>
            <Link href="/peserta" className="hover:text-brand-accent transition-colors">
              Start List
            </Link>
            <Link href="/peraturan" className="hover:text-white transition-colors">
              Manual & Rules
            </Link>
            <Link href="/cek-bib" className="hover:text-white transition-colors">
              Check BIB
            </Link>
            
            {/* Ops quick links */}
            <div className="h-4 w-px bg-white/10 mx-1" />
            <Link 
              href="/scrutineering" 
              className="text-[11px] text-brand-muted hover:text-white border border-brand-border hover:border-brand-accent/40 px-2.5 py-1 rounded-sm transition-colors"
            >
              Scrutineering
            </Link>
            <Link 
              href="/checkpoint" 
              className="text-[11px] text-brand-muted hover:text-white border border-brand-border hover:border-brand-accent/40 px-2.5 py-1 rounded-sm transition-colors"
            >
              Pitstop 300%
            </Link>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/daftar"
              className="px-6 py-2.5 rounded-sm font-display uppercase tracking-wider text-sm font-bold bg-brand-accent hover:bg-brand-accentDark text-brand-base shadow-solar transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Daftar Sekarang</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-brand-muted hover:text-white hover:bg-brand-surface border border-transparent hover:border-brand-border transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-base border-b border-brand-border px-4 py-6 space-y-3 font-mono text-xs uppercase tracking-wider">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-sm text-brand-muted hover:text-white hover:bg-brand-surface"
          >
            Overview
          </Link>
          <Link
            href="/kategori"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-sm text-brand-muted hover:text-white hover:bg-brand-surface"
          >
            Courses & Route
          </Link>
          <Link
            href="/peserta"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-sm text-brand-accent hover:bg-brand-surface"
          >
            Start List (Rider Roster)
          </Link>
          <Link
            href="/peraturan"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-sm text-brand-muted hover:text-white hover:bg-brand-surface"
          >
            Manual & Rules
          </Link>
          <Link
            href="/cek-bib"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-sm text-brand-muted hover:text-white hover:bg-brand-surface"
          >
            Check BIB Plate
          </Link>
          <div className="pt-2 border-t border-brand-border flex gap-2">
            <Link
              href="/scrutineering"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 border border-brand-border rounded-sm text-brand-muted hover:text-white"
            >
              Scrutineering
            </Link>
            <Link
              href="/checkpoint"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 border border-brand-border rounded-sm text-brand-muted hover:text-white"
            >
              Pitstop
            </Link>
          </div>
          <div className="pt-4">
            <Link
              href="/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-sm font-display uppercase tracking-wider text-sm font-bold bg-brand-accent text-brand-base shadow-solar"
            >
              Daftar Sekarang &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
