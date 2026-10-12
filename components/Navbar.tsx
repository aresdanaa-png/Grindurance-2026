'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Compass, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0D0E11]/90 border-b border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-[#15171C] border border-white/15 flex items-center justify-center font-bold text-[#F59E0B] group-hover:border-[#F59E0B] transition-colors">
              <Compass className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase italic">
                  GRINDURANCE
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold text-[#F59E0B] italic">
                  2026
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase block -mt-1">
                GX-ID // ANNIVERSARY EDITION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Sleek Proportional Sans) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/kategori" className="hover:text-white transition-colors">
              Courses & Route
            </Link>
            <Link href="/peserta" className="hover:text-[#F59E0B] transition-colors text-white font-bold">
              Start List
            </Link>
            <Link href="/peraturan" className="hover:text-white transition-colors">
              Manual & Rules
            </Link>
            <Link href="/cek-bib" className="hover:text-white transition-colors">
              Check BIB
            </Link>
            
            {/* Ops links */}
            <div className="h-4 w-px bg-white/10 mx-1" />
            <Link 
              href="/scrutineering" 
              className="text-[11px] text-slate-300 hover:text-white border border-white/15 hover:border-[#F59E0B]/50 px-2.5 py-1 rounded transition-colors"
            >
              Scrutineering
            </Link>
            <Link 
              href="/checkpoint" 
              className="text-[11px] text-slate-300 hover:text-white border border-white/15 hover:border-[#F59E0B]/50 px-2.5 py-1 rounded transition-colors"
            >
              Pitstop 300%
            </Link>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/daftar"
              className="px-6 py-2.5 rounded font-display uppercase tracking-wider text-sm font-bold bg-[#F59E0B] hover:bg-[#D97706] text-black shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Daftar Sekarang</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-300 hover:text-white hover:bg-[#15171C] border border-transparent hover:border-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0E11] border-b border-white/10 px-4 py-6 space-y-3 text-xs uppercase tracking-wider font-semibold">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded text-slate-300 hover:text-white hover:bg-[#15171C]"
          >
            Overview
          </Link>
          <Link
            href="/kategori"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded text-slate-300 hover:text-white hover:bg-[#15171C]"
          >
            Courses & Route
          </Link>
          <Link
            href="/peserta"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded text-[#F59E0B] hover:bg-[#15171C]"
          >
            Start List (Rider Roster)
          </Link>
          <Link
            href="/peraturan"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded text-slate-300 hover:text-white hover:bg-[#15171C]"
          >
            Manual & Rules
          </Link>
          <Link
            href="/cek-bib"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded text-slate-300 hover:text-white hover:bg-[#15171C]"
          >
            Check BIB Plate
          </Link>
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <Link
              href="/scrutineering"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 border border-white/10 rounded text-slate-300 hover:text-white"
            >
              Scrutineering
            </Link>
            <Link
              href="/checkpoint"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 border border-white/10 rounded text-slate-300 hover:text-white"
            >
              Pitstop
            </Link>
          </div>
          <div className="pt-4">
            <Link
              href="/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded font-display uppercase tracking-wider text-sm font-bold bg-[#F59E0B] text-black shadow-[0_0_25px_rgba(245,158,11,0.35)]"
            >
              Daftar Sekarang &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
