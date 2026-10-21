'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

const navLinks = [
  { href: '/', labelId: 'Beranda', labelEng: 'Overview' },
  { href: '/#kategori', labelId: 'Rute & Kategori', labelEng: 'Courses & Route' },
  { href: '/#daftar-harga', labelId: 'Daftar Biaya', labelEng: 'Price List' },
  { href: '/#jadwal', labelId: 'Jadwal', labelEng: 'Timeline' },
  { href: '/peraturan', labelId: 'Regulasi', labelEng: 'Rules' },
  { href: '/peserta', labelId: 'Daftar Peserta', labelEng: 'Start List' },
  { href: '/pembayaran', labelId: 'Cek Tagihan', labelEng: 'Payment' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  const handleCtaClick = (e: React.MouseEvent) => {
    if (pathname === '/daftar') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('reset-daftar-flow'));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        scrolled
          ? 'backdrop-blur-xl bg-[#0D0E11]/92 border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_2px_15px_rgba(250,109,11,0.08)]'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      {/* Bottom accent glow line when scrolled */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FA6D0B]/35 to-transparent transition-opacity duration-300 pointer-events-none ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

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
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-2.5 lg:px-3 py-2 text-[12px] lg:text-[13px] font-medium text-white hover:text-[#FA6D0B] tracking-wide transition-colors duration-200 rounded-lg hover:bg-white/[0.04] group"
              >
                {t(link.labelId, link.labelEng)}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-[2px] bg-[#FA6D0B] rounded-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* ── Right: Language Switcher (ID | ENG) & CTA Button ── */}
          <div className="hidden md:flex items-center gap-3 lg:gap-3.5 shrink-0">
            {/* Pure Typographic Language Switcher */}
            <div className="flex items-center text-xs font-mono font-bold tracking-wider rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-sm select-none shadow-inner">
              <button
                id="btn-lang-id"
                type="button"
                onClick={() => setLanguage('ID')}
                className={`transition-all duration-200 uppercase cursor-pointer ${
                  language === 'ID'
                    ? 'text-[#FA6D0B] font-black drop-shadow-[0_0_10px_rgba(250,109,11,0.7)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <span className="mx-2 text-white/20 select-none font-normal">|</span>
              <button
                id="btn-lang-eng"
                type="button"
                onClick={() => setLanguage('ENG')}
                className={`transition-all duration-200 uppercase cursor-pointer ${
                  language === 'ENG'
                    ? 'text-[#FA6D0B] font-black drop-shadow-[0_0_10px_rgba(250,109,11,0.7)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="English Language"
              >
                ENG
              </button>
            </div>

            {/* CTA Join Now */}
            <Link
              href="/daftar"
              onClick={handleCtaClick}
              className={`group relative px-5 lg:px-6 py-2.5 rounded-full text-[12px] lg:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden flex items-center gap-2 shrink-0 cursor-pointer ${
                pathname === '/daftar'
                  ? 'bg-[#FA6D0B] text-black shadow-[0_0_20px_rgba(250,109,11,0.5)] border border-[#FA6D0B]'
                  : 'text-white border border-[#FA6D0B]/60 hover:border-[#FA6D0B] hover:shadow-[0_0_20px_rgba(250,109,11,0.3)]'
              }`}
            >
              <span className="absolute inset-0 bg-[#FA6D0B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none" />
              <span className={`relative z-10 font-bold transition-colors duration-300 ${pathname === '/daftar' ? 'text-black' : 'group-hover:text-black'}`}>
                {t('DAFTAR', 'JOIN NOW')}
              </span>
              <ArrowUpRight className={`relative z-10 w-4 h-4 stroke-[2.5] transition-all duration-300 ${pathname === '/daftar' ? 'text-black' : 'group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
            </Link>
          </div>

          {/* ── Mobile: Lang Switcher & Hamburger ── */}
          <div className="flex md:hidden items-center gap-2.5">
            {/* Mobile Language Toggle (Clean Borderless Pill) */}
            <div className="flex items-center text-[11px] font-mono font-bold tracking-wider rounded-full bg-black/60 backdrop-blur-md px-3 py-1 select-none shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
              <button
                id="btn-lang-id-mobile"
                type="button"
                onClick={() => setLanguage('ID')}
                className={`transition-colors uppercase cursor-pointer ${
                  language === 'ID' ? 'text-[#FA6D0B] font-black' : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <span className="mx-1.5 text-white/20 select-none font-normal">|</span>
              <button
                id="btn-lang-eng-mobile"
                type="button"
                onClick={() => setLanguage('ENG')}
                className={`transition-colors uppercase cursor-pointer ${
                  language === 'ENG' ? 'text-[#FA6D0B] font-black' : 'text-slate-400 hover:text-white'
                }`}
                aria-label="English Language"
              >
                ENG
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2.5 rounded-full text-slate-300 hover:text-white bg-black/50 hover:bg-black/70 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-5">
                <Menu className={`w-5 h-5 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`w-5 h-5 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
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
              {t(link.labelId, link.labelEng)}
            </Link>
          ))}

          {/* CTA */}
          <div className="pt-4 px-2">
            <Link
              href="/daftar"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleCtaClick(e);
              }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-[14px] font-bold uppercase tracking-wider bg-[#FA6D0B] text-black shadow-[0_0_30px_rgba(250,109,11,0.35)] hover:bg-[#DE5A00] transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              {t('DAFTAR SEKARANG', 'JOIN NOW')}
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
