import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/context/LanguageContext';

const neueHaas = localFont({
  src: [
    {
      path: '../public/fonts/NeueHaasDisplay-Roman.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueHaasDisplay-RomanItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/NeueHaasDisplay-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueHaasDisplay-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/NeueHaasDisplay-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueHaasDisplay-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/NeueHaasDisplay-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueHaasDisplay-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-neue-haas',
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
        className={`${neueHaas.variable} font-sans min-h-screen flex flex-col bg-[#0D0E11] text-[#F3F4F6] subpixel-antialiased selection:bg-[#FA6D0B] selection:text-black`}
      >
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
