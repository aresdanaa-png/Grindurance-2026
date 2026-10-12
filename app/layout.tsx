import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Gravel Grindurance 2026 | Anniversary Edition (GX-ID)',
  description: 'Event sepeda gravel dan ultra-endurance tahunan oleh GX-ID. Registrasi 5 kategori jarak (60, 80, 120, 150, 200 km) dan Virtual Ride Nasional.',
  keywords: ['gravel grindurance', 'gx-id', 'ultra cycling indonesia', 'gravel cycling', 'cibubur jonggol sukamakmur'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-brand-dark text-slate-100 antialiased selection:bg-brand-gold selection:text-brand-dark">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
