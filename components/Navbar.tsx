'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Overview' },
  { href: '/kategori', label: 'Courses & Route' },
  { href: '/peserta', label: 'Start List' },
  { href: '/peraturan', label: 'Rules' },
  { href: '/cek-bib', label: 'Check BIB' },
];

const opsLinks = [
  { href: '/scrutineering', label: 'Scrutineering' },
  { href: '/checkpoint', label: 'Pitstop 300%' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [opsOpen, setOpsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-nacelle ${
        scrolled
          ? 'backdrop-blur-xl bg-[#0D0E11]/90 shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-none'
      }`}
    >
      {/* Top accent line — only visible when scrolled */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FA6D0B]/40 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">

          {/* ── Left: Logo ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-[76px] h-[76px] sm:w-[83px] sm:h-[83px] overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo-gx-id.webp"
                alt="GX-ID Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* ── Center: Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-2 text-[13px] font-medium text-white hover:text-[#FA6D0B] tracking-wide transition-colors duration-200 rounded-lg hover:bg-white/[0.04] group"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-[2px] bg-[#FA6D0B] rounded-full transition-all duration-300" />
              </Link>
            ))}

            {/* Ops Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpsOpen(!opsOpen)}
                onBlur={() => setTimeout(() => setOpsOpen(false), 150)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-white hover:text-[#FA6D0B] tracking-wide transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
              >
                Ops
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${opsOpen ? 'rotate-180' : ''}`} />
              </button>
              {opsOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-[#15171C] border border-white/10 rounded-xl shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-200">
                  {opsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpsOpen(false)}
                      className="block px-4 py-2.5 text-[13px] text-white hover:text-[#FA6D0B] hover:bg-white/[0.05] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* ── Right: CTA Button ── */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/daftar"
              className="group relative px-6 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-wider text-white border border-[#FA6D0B]/60 hover:border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,109,11,0.3)] overflow-hidden flex items-center gap-2"
            >
              {/* Hover background fill */}
              <span className="absolute inset-0 bg-[#FA6D0B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Join Now
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
          </div>

          {/* ── Mobile: Hamburger ── */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              aria-label="Toggle Menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0D0E11]/98 backdrop-blur-xl border-t border-white/[0.06] px-4 py-5 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-[14px] font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200 active:scale-[0.98]"
            >
              {link.label}
            </Link>
          ))}

          {/* Ops Section */}
          <div className="pt-2 mt-2 border-t border-white/[0.06]">
            <span className="block px-4 py-2 text-[10px] text-slate-600 uppercase tracking-[0.2em] font-semibold">
              Operations
            </span>
            <div className="flex gap-2 px-2">
              {opsLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 border border-white/[0.08] rounded-xl text-[13px] text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 px-2">
            <Link
              href="/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-[14px] font-bold uppercase tracking-wider bg-[#F59E0B] text-black shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:bg-[#D97706] transition-all duration-300 active:scale-[0.98]"
            >
              Join Now
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
