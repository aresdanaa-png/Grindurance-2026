'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0D0E11] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Background accents */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #FA6D0B 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FA6D0B]/30 bg-[#FA6D0B]/10 text-[#FA6D0B] font-mono text-xs uppercase tracking-wider">
          <span>// SYSTEM TELEMETRY ERROR</span>
        </div>

        <h1 className="font-display italic text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          TERJADI KENDALA
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed">
          Terjadi kesalahan teknis saat memuat data rute atau telemetri sistem. Silakan muat ulang halaman ini atau coba beberapa saat lagi.
        </p>

        {error?.digest && (
          <p className="font-mono text-[11px] text-slate-500 bg-white/[0.03] p-2 rounded border border-white/5">
            DIGEST CODE: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-[#FA6D0B] hover:bg-[#ff7b1c] text-black font-display font-black uppercase text-sm tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(250,109,11,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            MUAT ULANG SISTEM
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 border border-white/20 hover:border-white/40 text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all hover:bg-white/[0.04]"
          >
            KEMBALI KE BERANDA
          </Link>
        </div>
      </div>
    </div>
  );
}
