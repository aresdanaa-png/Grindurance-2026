'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="id">
      <body className="bg-[#0D0E11] text-white font-sans antialiased m-0 p-0">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
          <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-black/70 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FA6D0B] block">
              // CRITICAL TELEMETRY ERROR
            </span>
            <h1 className="font-sans text-3xl font-black uppercase tracking-tight text-white">
              KESALAHAN SISTEM UTAMA
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Terjadi kegagalan kritis pada tata letak aplikasi. Silakan klik tombol di bawah untuk menyegarkan sistem.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-[#FA6D0B] text-black font-black uppercase text-xs tracking-wider rounded-xl hover:bg-[#DE5A00] transition-all cursor-pointer"
            >
              RESET APLIKASI
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
