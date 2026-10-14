import './globals.css';
import type { Metadata } from 'next';
import { Oswald, Plus_Jakarta_Sans, Special_Elite } from 'next/font/google';
import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-typewriter',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const nacelle = localFont({
  src: [
    {
      path: '../public/fonts/Nacelle-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Nacelle-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Nacelle-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Nacelle-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Nacelle-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-nacelle',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GRAVEL GRINDURANCE 2026 — Anniversary Edition (GX-ID)',
  description: 'Ekspedisi balap sepeda ultra-endurance & gravel mandiri (unsupported) musim hujan. Melintasi loop Jonggol, Sukamakmur, dan Sentul.',
  keywords: ['gravel grindurance', 'gx-id', 'ultra cycling indonesia', 'gravel race', 'jonggol ultra'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${oswald.variable} ${nacelle.variable} ${specialElite.variable} font-sans min-h-screen flex flex-col bg-[#0D0E11] text-[#F3F4F6] antialiased selection:bg-[#FA6D0B] selection:text-black`}
      >
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
