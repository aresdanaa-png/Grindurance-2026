import './globals.css';
import type { Metadata } from 'next';
import { Oswald, Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
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
        className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-brand-base text-brand-light antialiased selection:bg-brand-accent selection:text-brand-base`}
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
