'use client';

import { useState } from 'react';
import BibCard from '@/components/BibCard';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CekBibPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setErrorMsg('');
    setSearched(true);

    try {
      const res = await fetch('/api/bib/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || t('Gagal mencari data peserta.', 'Search request failed.'));
      }
      setResults(data.results || []);
    } catch (err: any) {
      setErrorMsg(err.message || t('Terjadi kesalahan saat mencari.', 'An error occurred during search.'));
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 font-sans selection:bg-[#FA6D0B] selection:text-black animate-slide-up-fade">
      {/* Header */}
      <div className="border-b border-white/10 pb-8 text-center space-y-3">
        <span className="font-mono font-bold text-xs sm:text-sm text-[#FA6D0B] uppercase tracking-widest block">
          GX-ID OFFICIAL SELF-SERVICE // 2026 EDITION
        </span>
        <h1 className="font-display italic text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          {t('CEK E-TICKET & NOMOR BIB', 'CHECK E-TICKET & BIB NUMBER')}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
          {t(
            'Temukan kartu nomor dada resmi Anda dan unduh berkas gambar HD untuk ditunjukkan saat pengambilan race pack di venue.',
            'Look up your official rider BIB number plate and download HD images to present during Race Pack Collection at the venue.'
          )}
        </p>
      </div>

      {/* Form Pencarian */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-2">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Nomor BIB (misal 1001), Kode Registrasi, atau Nama...', 'BIB number (e.g. 1001), Registration Code, or Name...')}
            className="w-full pl-5 pr-32 py-4 rounded-xl bg-black/60 border border-white/20 text-white font-mono text-sm sm:text-base focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B] focus:outline-none placeholder:text-slate-500 shadow-2xl transition-all"
          />
          <button
            type="submit"
            disabled={searching || !query.trim()}
            className="absolute right-2 px-5 py-2.5 rounded-lg font-mono font-black text-xs uppercase tracking-wider bg-[#FA6D0B] text-black hover:bg-[#DE5A00] transition-all disabled:opacity-40 cursor-pointer shadow-[0_0_15px_rgba(250,109,11,0.3)]"
          >
            {searching ? t('MENCARI...', 'SEARCHING...') : t('CARI // BIB', 'SEARCH // BIB')}
          </button>
        </div>
        <span className="text-[11px] font-mono text-slate-400 block text-center">
          {t('Format pencarian: Nomor BIB (1001, 2001), kode registrasi, atau nama lengkap pendaftar.', 'Search tip: BIB number (1001, 2001), registration code, or full registered athlete name.')}
        </span>
      </form>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-black/80 text-[#FA6D0B] text-xs sm:text-sm font-mono max-w-xl mx-auto text-center font-bold shadow-md">
          // {errorMsg}
        </div>
      )}

      {/* Hasil Pencarian */}
      {searched && (
        <div className="space-y-8 pt-4">
          {results.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-black/60 backdrop-blur-xl max-w-xl mx-auto space-y-3 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-wider block">
                STATUS // NOT FOUND
              </span>
              <h4 className="font-display italic text-2xl font-black text-white uppercase tracking-tight">
                {t('DATA PESERTA TIDAK DITEMUKAN', 'ATHLETE RECORD NOT FOUND')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                {t(
                  'Pastikan nomor BIB, kode registrasi, atau nama yang Anda masukkan sudah persis sesuai saat pendaftaran.',
                  'Please double-check the BIB number, registration code, or full name as submitted during registration.'
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="text-center">
                <span className="text-xs sm:text-sm font-mono text-[#FA6D0B] font-bold uppercase tracking-wider block">
                  {t(`// DITEMUKAN ${results.length} DATA PESERTA RESMI`, `// FOUND ${results.length} OFFICIAL RIDER RECORD(S)`)}
                </span>
              </div>

              {results.map((p) => (
                <div key={p.id} className="space-y-4">
                  {p.status === 'PAID' ? (
                    <BibCard
                      bibNumber={p.bib_number || 'PENDING'}
                      fullName={p.full_name}
                      categoryName={p.category?.name || 'Gravel Grindurance'}
                      distanceKm={p.category?.distance_km || 0}
                      riderRole={p.rider_role}
                      bloodType={p.blood_type}
                      communityChapter={p.community_chapter}
                      qrHash={p.qr_checkin_hash || undefined}
                      registrationCode={p.registration_code}
                    />
                  ) : (
                    <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-br from-[#FA6D0B]/10 via-black/70 to-black/85 backdrop-blur-xl p-6 sm:p-7 text-center space-y-3 shadow-[0_20px_60px_rgba(250,109,11,0.2)] font-mono">
                      <span className="font-mono text-xs font-bold text-[#FA6D0B] uppercase tracking-wider block">
                        // {t('MENUNGGU PEMBAYARAN', 'PAYMENT PENDING')}
                      </span>
                      <h4 className="font-display italic text-2xl font-black text-white uppercase tracking-tight">{p.full_name}</h4>
                      <p className="text-xs text-slate-300">
                        {t('Kode:', 'Code:')} <span className="font-bold text-white">{p.registration_code}</span> | {t('Kategori:', 'Category:')} <span className="text-white font-bold">{p.category?.name}</span>
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                        {t(
                          `Tagihan sebesar Rp ${Number(p.order?.net_amount || 0).toLocaleString('id-ID')} belum terverifikasi lunas sehingga nomor BIB belum diterbitkan.`,
                          `Invoice of IDR ${Number(p.order?.net_amount || 0).toLocaleString('id-ID')} is not yet confirmed, so BIB number has not been generated.`
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
