'use client';

import { useState } from 'react';
import { Search, Compass, AlertCircle, RefreshCw, QrCode } from 'lucide-react';
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
        throw new Error(data.error || t('Gagal mencari data.', 'Search request failed.'));
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 font-sans">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/30 text-brand-sky text-xs font-bold uppercase tracking-wider">
          <QrCode className="w-3.5 h-3.5" />
          Self-Service e-Ticket &amp; BIB
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {t('Cek e-Ticket & ', 'Check e-Ticket & ')}<span className="gradient-gold-text">{t('Nomor BIB', 'BIB Number')}</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          {t(
            'Temukan kartu nomor dada resmi Anda dan unduh berkas gambar HD untuk ditunjukkan saat pengambilan race pack di venue.',
            'Look up your official rider BIB number plate and download HD images to present during Race Pack Collection at the venue.'
          )}
        </p>
      </div>

      {/* Form Pencarian */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Ketik Nomor BIB (#6001), Kode Registrasi, atau Nama...', 'Enter BIB Number (#6001), Registration Code, or Name...')}
            className="w-full pl-5 pr-32 py-4 rounded-2xl bg-brand-card border border-brand-border text-white text-sm focus:border-brand-gold focus:outline-none shadow-2xl"
          />
          <button
            type="submit"
            disabled={searching || !query.trim()}
            className="absolute right-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-gold to-brand-orange text-brand-dark hover:brightness-110 shadow-glow flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {searching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{t('Cari', 'Search')}</span>
          </button>
        </div>
        <span className="text-[11px] text-slate-500 block text-center mt-2">
          {t('Tips: Masukkan nomor BIB (misal: 6001, 8001, 1201) atau nama lengkap pendaftar.', 'Tip: Enter BIB number (e.g. 6001, 8001, 1201) or full registered name.')}
        </span>
      </form>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3 max-w-xl mx-auto">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Hasil Pencarian */}
      {searched && (
        <div className="space-y-8 pt-4">
          {results.length === 0 ? (
            <div className="text-center py-12 bg-brand-card/50 rounded-2xl border border-brand-border/60 max-w-xl mx-auto space-y-3">
              <Compass className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
              <h4 className="text-base font-bold text-white">{t('Data Peserta Tidak Ditemukan', 'Participant Record Not Found')}</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {t(
                  'Pastikan nomor BIB, kode registrasi, atau nama yang Anda masukkan sudah sesuai saat mendaftar.',
                  'Please double check the BIB number, registration code, or full name as submitted during registration.'
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="text-center">
                <span className="text-xs text-brand-gold font-bold uppercase tracking-wider">
                  {t(`Ditemukan ${results.length} Data Peserta`, `Found ${results.length} Rider Record(s)`)}
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
                    <div className="max-w-md mx-auto bg-brand-card p-6 rounded-2xl border border-brand-orange/40 text-center space-y-3">
                      <div className="inline-block px-2.5 py-1 rounded bg-brand-orange/20 text-brand-orange font-bold text-xs uppercase">
                        {t('Menunggu Pembayaran', 'Awaiting Payment')}
                      </div>
                      <h4 className="text-lg font-bold text-white">{p.full_name}</h4>
                      <p className="text-xs text-slate-400">
                        {t('Kode:', 'Code:')} <span className="font-sans font-bold tracking-wider text-slate-300">{p.registration_code}</span> | {t('Kategori:', 'Category:')} {p.category?.name}
                      </p>
                      <p className="text-xs text-slate-400">
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
