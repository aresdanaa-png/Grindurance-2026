'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('panitia');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: password.trim(),
          username: username.trim() || 'panitia',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Kunci akses panitia tidak valid.');
      }

      router.push('/admin');
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal melakukan otorisasi login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-[#FA6D0B] selection:text-black relative overflow-hidden">
      {/* Ambient Radial Backlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10 animate-slide-up-fade">
        {/* Header Identitas Gatekeeper */}
        <div className="text-center space-y-2 font-mono">
          <span className="text-xs font-bold text-[#FA6D0B] tracking-widest uppercase block">
            // GX-ID COMMAND CENTER · 2026 EDITION
          </span>
          <h1 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            PANEL AUDIT & VERIFIKASI
          </h1>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Portal khusus panitia & bendahara untuk verifikasi bukti transfer, penerbitan nomor BIB resmi, dan rekap PO jersey.
          </p>
        </div>

        {/* Card Formulir Login */}
        <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-5 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[11px]">
            <span className="text-slate-400 uppercase tracking-wider">LEVEL AKSES:</span>
            <span className="text-white font-bold px-2 py-0.5 rounded bg-white/10 uppercase">
              KOMITE RESMI GX-ID
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                ID / USERNAME PANITIA:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="panitia"
                className="w-full bg-black/70 rounded-xl px-4 py-3 text-white text-xs sm:text-sm tracking-wider focus:outline-none focus:ring-1 focus:ring-[#FA6D0B] shadow-inner"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                KUNCI AKSES RAHASIA (PIN / PASSWORD):
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/70 rounded-xl px-4 py-3 text-white text-xs sm:text-sm tracking-wider focus:outline-none focus:ring-1 focus:ring-[#FA6D0B] shadow-inner"
                autoFocus
                required
              />
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-white/[0.04] text-[#FA6D0B] text-xs font-mono border border-[#FA6D0B]/30 space-y-0.5">
                <span className="font-bold block">// OTORISASI DITOLAK:</span>
                <span className="text-slate-300 block">{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full py-4 rounded-full bg-[#FA6D0B] text-black font-mono font-black text-xs uppercase tracking-wider hover:bg-[#DE5A00] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(250,109,11,0.4)] disabled:opacity-40 active:scale-95"
            >
              <span>{loading ? 'MEMVERIFIKASI AKSES...' : 'BUKA COMMAND CENTER'}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          <div className="pt-2 border-t border-white/5 text-center">
            <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block">
              DEFAULT DEV PIN: <strong className="text-slate-200">GX2026PANITIA</strong>
            </span>
          </div>
        </div>

        {/* Back Link to Home */}
        <div className="text-center">
          <a
            href="/"
            className="text-xs font-mono text-slate-400 hover:text-[#FA6D0B] uppercase tracking-wider transition-colors"
          >
            ← KEMBALI KE BERANDA UTAMA
          </a>
        </div>
      </div>
    </div>
  );
}
