'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState('panitia');
  const [orders, setOrders] = useState<any[]>([]);
  const [kpis, setKpis] = useState<any>({
    total_orders: 0,
    paid_orders: 0,
    pending_verification: 0,
    total_revenue: 0,
    total_participants: 0,
    total_jersey_po: 0,
    jersey_size_breakdown: {},
  });

  // Filter State
  const [activeTab, setActiveTab] = useState<'table' | 'jersey_po'>('table');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Action State
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Lightbox Modal for Receipt
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxOrder, setLightboxOrder] = useState<any | null>(null);

  // Reject Modal
  const [rejectModalOrder, setRejectModalOrder] = useState<any | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('Bukti transfer tidak terbaca / nominal tidak sesuai.');

  // Copy State
  const [copiedWaText, setCopiedWaText] = useState(false);

  // 1. Validasi Sesi Admin & Ambil Data
  useEffect(() => {
    checkSessionAndFetchData();
  }, [statusFilter, categoryFilter]);

  const checkSessionAndFetchData = async () => {
    setLoading(true);
    try {
      const sessRes = await fetch('/api/admin/session');
      if (!sessRes.ok) {
        router.push('/admin/login');
        return;
      }
      const sessData = await sessRes.json();
      if (!sessData.authenticated) {
        router.push('/admin/login');
        return;
      }
      setAdminUser(sessData.username || 'panitia');

      // Ambil data orders
      await fetchOrdersData();
    } catch (err) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersData = async () => {
    try {
      const url = new URL('/api/admin/orders', window.location.origin);
      if (statusFilter !== 'ALL') url.searchParams.set('status', statusFilter);
      if (categoryFilter !== 'ALL') url.searchParams.set('category_id', categoryFilter);
      if (searchQuery.trim()) url.searchParams.set('search', searchQuery.trim());

      const res = await fetch(url.toString());
      const data = await res.json();

      if (res.ok && data.success) {
        setOrders(data.orders || []);
        if (data.kpis) setKpis(data.kpis);
      }
    } catch (err) {
      console.error('Gagal mengambil data admin orders:', err);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrdersData();
  };

  // 2. Action: Verifikasi Pembayaran (Assign Sequential BIB)
  const handleVerifyOrder = async (orderId: string) => {
    setProcessingOrderId(orderId);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/verify-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal memverifikasi pesanan.');
      }

      setNotification({
        type: 'success',
        message: data.message || `Pesanan ${orderId} terverifikasi lunas!`,
      });

      // Tutup lightbox jika sedang terbuka
      if (lightboxOrder?.order_id === orderId) {
        setLightboxImage(null);
        setLightboxOrder(null);
      }

      // Refresh data orders
      await fetchOrdersData();
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err.message || 'Terjadi kesalahan sistem saat memverifikasi.',
      });
    } finally {
      setProcessingOrderId(null);
    }
  };

  // 3. Action: Tolak Pembayaran
  const handleRejectOrder = async () => {
    if (!rejectModalOrder) return;
    setProcessingOrderId(rejectModalOrder.order_id);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/reject-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: rejectModalOrder.order_id,
          reason: rejectReason.trim() || 'Bukti transfer tidak valid.',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal menolak pesanan.');
      }

      setNotification({
        type: 'success',
        message: data.message || `Pesanan ${rejectModalOrder.order_id} ditolak.`,
      });

      setRejectModalOrder(null);
      await fetchOrdersData();
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err.message || 'Gagal menolak order.',
      });
    } finally {
      setProcessingOrderId(null);
    }
  };

  // 4. Action: Logout Admin
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (_) {}
    router.push('/admin/login');
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Generator Teks WhatsApp Rekap PO Jersey Vendor
  const generateJerseyPoWhatsAppText = () => {
    const b = kpis.jersey_size_breakdown || {};
    let text = `*REKAP PESANAN PO JERSEY GRAVEL GRINDURANCE 2026*\n`;
    text += `*VENDOR RESMI: POLLRIDE APPAREL*\n`;
    text += `Tanggal Rekap: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}\n`;
    text += `Total Pesanan Jersey: *${kpis.total_jersey_po || 0} PCS*\n\n`;
    text += `*RINCIAN UKURAN (SIZE BREAKDOWN):*\n`;

    const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
    sizes.forEach((s) => {
      const item = b[s] || { total: 0, male: 0, female: 0 };
      if (item.total > 0) {
        text += `• Size ${s}: *${item.total} Pcs* (Pria: ${item.male}, Wanita: ${item.female})\n`;
      }
    });

    text += `\n_Catatan: Data diekspor langsung dari Database Command Center GX-ID._`;
    return text;
  };

  const handleCopyJerseyWhatsApp = () => {
    const text = generateJerseyPoWhatsAppText();
    navigator.clipboard.writeText(text);
    setCopiedWaText(true);
    setTimeout(() => setCopiedWaText(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-slide-up-fade">

        {/* Ambient Glow */}
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* TOP COMMAND BAR (NATURAL BORDERLESS DESIGN) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121418] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono relative overflow-hidden">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#FA6D0B] uppercase tracking-widest">// COMMAND CENTER</span>
              <span className="text-slate-400">· GX-ID OFFICIAL 2026</span>
              <span className="text-white/20">·</span>
              <span className="text-slate-300 font-bold uppercase text-xs">
                ADMIN: {adminUser.toUpperCase()}
              </span>
            </div>
            <h1 className="font-display italic text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              MEJA VERIFIKASI & LOGISTIK
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto justify-end">
            <a
              href="/admin/print-bib"
              className="px-5 py-2.5 rounded-xl bg-[#FA6D0B] text-black hover:bg-[#e05f06] text-xs font-mono font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg"
            >
              <span>CETAK PLAT BIB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/api/admin/export-roster?status=PAID"
              className="px-4 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>EKSPOR ROSTER CSV</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FA6D0B]" />
            </a>

            <a
              href="/peserta"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.1] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>ROSTER PUBLIK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* NOTIFICATION TOAST */}
        {notification && (
          <div
            className={`p-4 rounded-2xl font-mono text-xs flex items-center justify-between gap-3 shadow-xl animate-fade-in-area ${
              notification.type === 'success'
                ? 'bg-[#121418] text-white'
                : 'bg-[#181310] text-[#FA6D0B]'
            }`}
          >
            <span>{notification.message}</span>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white text-[11px] font-bold uppercase px-2 py-0.5"
            >
              ✕ TUTUP
            </button>
          </div>
        )}

        {/* 4 HERO KPI METRICS CARDS (NATURAL BORDERLESS CARDS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {/* Card 1: Total Orders */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#121418] shadow-xl space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block">
              TOTAL TRANSAKSI
            </span>
            <span className="font-display italic text-3xl sm:text-4xl font-black text-white block">
              {kpis.total_orders || 0}
            </span>
            <span className="text-[11px] text-slate-400 font-sans block">
              {kpis.total_participants || 0} atlet terdaftar di sistem
            </span>
          </div>

          {/* Card 2: Antrean Verifikasi */}
          <div className={`p-5 sm:p-6 rounded-2xl shadow-xl space-y-1 transition-all ${
            (kpis.pending_verification || 0) > 0
              ? 'bg-[#181512] shadow-[0_0_30px_rgba(250,109,11,0.15)]'
              : 'bg-[#121418]'
          }`}>
            <span className="text-[10px] sm:text-xs text-[#FA6D0B] uppercase tracking-widest font-bold block">
              ANTREAN STRUK (VERIF)
            </span>
            <span className="font-display italic text-3xl sm:text-4xl font-black text-white block">
              {kpis.pending_verification || 0}
            </span>
            <span className="text-[11px] text-slate-400 font-sans block">
              Menunggu pencocokan mutasi
            </span>
          </div>

          {/* Card 3: Omset Terverifikasi */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#121418] shadow-xl space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block">
              OMSET LUNAS RESMI
            </span>
            <span className="font-display italic text-2xl sm:text-3xl font-black text-[#FA6D0B] block truncate">
              {formatRupiah(kpis.total_revenue || 0)}
            </span>
            <span className="text-[11px] text-slate-400 font-sans block">
              {kpis.paid_orders || 0} pesanan terverifikasi
            </span>
          </div>

          {/* Card 4: Total PO Jersey */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#121418] shadow-xl space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest block">
              TOTAL PO JERSEY
            </span>
            <span className="font-display italic text-3xl sm:text-4xl font-black text-white block">
              {kpis.total_jersey_po || 0} <span className="text-sm font-sans font-bold text-slate-400">PCS</span>
            </span>
            <span className="text-[11px] text-slate-400 font-sans block">
              Vendor resmi: Pollride Apparel
            </span>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex items-center gap-2 pb-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`px-5 py-3 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'table'
                ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
                : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            01 // TABEL DATA LENGKAP & VERIFIKASI
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jersey_po')}
            className={`px-5 py-3 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'jersey_po'
                ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
                : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            02 // REKAP PO JERSEY VENDOR (POLLRIDE)
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: TABEL DATA LENGKAP & VERIFIKASI PEMBAYARAN */}
        {/* ========================================================================= */}
        {activeTab === 'table' && (
          <div className="space-y-6">

            {/* Filter Bar & Telemetry Controls (Natural Borderless) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#121418] shadow-xl space-y-4 font-mono text-xs">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="CARI NAMA ATLET, NO HP, ORDER ID, KODE REG, ATAU BIB..."
                  className="flex-1 bg-black/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-xs border-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#FA6D0B] text-black font-black uppercase tracking-wider hover:bg-[#DE5A00] transition-colors cursor-pointer shrink-0"
                >
                  CARI DATA
                </button>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setTimeout(() => fetchOrdersData(), 50);
                    }}
                    className="px-4 py-3 rounded-xl bg-white/10 text-slate-300 hover:text-white uppercase font-bold cursor-pointer"
                  >
                    RESET
                  </button>
                )}
              </form>

              {/* Status Filters */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-slate-400 font-bold uppercase text-[11px] mr-1">STATUS:</span>
                {[
                  { key: 'ALL', label: 'SEMUA' },
                  { key: 'PENDING_VERIFICATION', label: 'MENUNGGU VERIFIKASI STRUK' },
                  { key: 'PAID', label: 'LUNAS (TERBIT BIB)' },
                  { key: 'PENDING', label: 'MENUNGGU TRANSFER' },
                  { key: 'REJECTED', label: 'DITOLAK' },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStatusFilter(s.key)}
                    className={`px-3 py-1.5 rounded-lg uppercase tracking-wider font-bold text-[10px] sm:text-xs transition-all cursor-pointer ${
                      statusFilter === s.key
                        ? 'bg-white text-black font-black'
                        : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-slate-400 font-bold uppercase text-[11px] mr-1">ETAPE:</span>
                {[
                  { key: 'ALL', label: 'SEMUA ETAPE' },
                  { key: '60', label: '70 KM' },
                  { key: '100', label: '100 KM' },
                  { key: '120_SINGLE', label: '120 KM SINGLE' },
                  { key: '120_PAIR', label: '120 KM PAIR' },
                  { key: '150', label: '150 KM' },
                  { key: '200', label: '200 KM ULTRA' },
                  { key: 'VIRTUAL', label: 'VIRTUAL' },
                ].map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCategoryFilter(c.key)}
                    className={`px-2.5 py-1 rounded-lg uppercase tracking-wider font-bold text-[10px] transition-all cursor-pointer ${
                      categoryFilter === c.key
                        ? 'bg-[#FA6D0B] text-black font-black'
                        : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Contextual Filter Actions (Export CSV & Print BIB) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-[11px]">
                <div className="text-slate-400">
                  Menampilkan <span className="text-white font-bold">{orders.length}</span> transaksi{' '}
                  {statusFilter !== 'ALL' && <span className="text-[#FA6D0B]">({statusFilter})</span>}{' '}
                  {categoryFilter !== 'ALL' && <span className="text-white">· Etape {categoryFilter}</span>}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`/api/admin/export-roster?category_id=${categoryFilter}&status=${statusFilter}`}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white uppercase font-bold text-[10px] tracking-wider transition-colors flex items-center gap-1"
                  >
                    <span>UNDUH CSV FILTER INI</span>
                    <ArrowUpRight className="w-3 h-3 text-[#FA6D0B]" />
                  </a>

                  <a
                    href={`/admin/print-bib${categoryFilter !== 'ALL' ? `?category=${categoryFilter}` : ''}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FA6D0B]/10 hover:bg-[#FA6D0B]/20 text-[#FA6D0B] uppercase font-bold text-[10px] tracking-wider transition-colors flex items-center gap-1"
                  >
                    <span>BUKA PRINT SHEET BIB</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* DATA TABLE CONTAINER (NATURAL BORDERLESS TABLE) */}
            <div className="rounded-2xl bg-[#121418] shadow-2xl overflow-hidden font-mono">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B0C0E] text-slate-400 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-4 px-4">ORDER & TANGGAL</th>
                      <th className="py-4 px-4">ATLET & KONTAK</th>
                      <th className="py-4 px-4">ETAPE</th>
                      <th className="py-4 px-4">SIZE JERSEY (PO)</th>
                      <th className="py-4 px-4">NOMINAL</th>
                      <th className="py-4 px-4 text-center">STRUK BUKTI</th>
                      <th className="py-4 px-4 text-center">NO. BIB</th>
                      <th className="py-4 px-4 text-center">STATUS & AKSI</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5 text-slate-200">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400 font-sans">
                          Tidak ada data pendaftaran yang sesuai dengan filter yang dipilih.
                        </td>
                      </tr>
                    ) : (
                      orders.map((o) => {
                        const isPaid = o.payment_status === 'PAID';
                        const isPendingVerif = o.payment_status === 'PENDING_VERIFICATION';
                        const isRejected = o.payment_status === 'REJECTED';
                        const participants = o.participants || [];

                        return (
                          <tr
                            key={o.id}
                            className={`hover:bg-white/[0.02] transition-colors ${
                              isPendingVerif ? 'bg-[#FA6D0B]/[0.03]' : ''
                            }`}
                          >
                            {/* Kolom 1: Order ID */}
                            <td className="py-4 px-4 align-top space-y-1">
                              <span className="font-bold text-white block">{o.order_id}</span>
                              <span className="text-[10px] text-slate-400 block">
                                {new Date(o.created_at).toLocaleDateString('id-ID', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono block uppercase">
                                // {o.package_type === 'MEDAL_JERSEY' ? 'MEDALI + JERSEY' : 'MEDALI SAJA'}
                              </span>
                            </td>

                            {/* Kolom 2: Atlet & Kontak */}
                            <td className="py-4 px-4 align-top space-y-1">
                              {participants.map((p: any, idx: number) => (
                                <div key={p.id || idx} className="space-y-0.5 pb-1">
                                  <span className="font-bold text-white block uppercase">
                                    {p.full_name}
                                  </span>
                                  <span className="text-[11px] text-slate-400 block">
                                    WA: {p.phone_number || '-'} · {p.blood_type || 'O+'}
                                  </span>
                                  <span className="text-[10px] text-slate-400 block truncate max-w-[180px]">
                                    {p.community_chapter || 'Umum'} · {p.registration_code}
                                  </span>
                                </div>
                              ))}
                            </td>

                            {/* Kolom 3: Etape */}
                            <td className="py-4 px-4 align-top space-y-1">
                              <span className="text-white font-bold block">
                                {o.category?.name || o.category_id}
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                {o.category?.distance_km} KM
                              </span>
                            </td>

                            {/* Kolom 4: Size Jersey PO (POLLRIDE) - Pure Typography, No Badges */}
                            <td className="py-4 px-4 align-top space-y-1">
                              {o.package_type === 'MEDAL_JERSEY' ? (
                                participants.map((p: any, idx: number) => (
                                  <div key={p.id || idx} className="space-y-0.5">
                                    <span className="text-[11px] font-mono font-bold text-white block">
                                      SIZE {p.jersey_size || '-'} <span className="text-slate-400 font-normal">({p.gender === 'female' ? 'W' : 'M'})</span>
                                    </span>
                                    <span className="text-[9px] text-[#FA6D0B] block font-mono uppercase">
                                      // POLLRIDE PO
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <span className="text-slate-400 text-[11px] font-mono">// MEDAL ONLY</span>
                              )}
                            </td>

                            {/* Kolom 5: Nominal Transfer */}
                            <td className="py-4 px-4 align-top">
                              <span className="font-bold text-white block">
                                {formatRupiah(o.net_amount)}
                              </span>
                              {o.discount_promo > 0 && (
                                <span className="text-[10px] text-slate-400 block">
                                  Disc: -{formatRupiah(o.discount_promo)}
                                </span>
                              )}
                            </td>

                            {/* Kolom 6: Struk Bukti Transfer */}
                            <td className="py-4 px-4 align-top text-center">
                              {o.proof_of_payment_url ? (
                                <div
                                  onClick={() => {
                                    setLightboxImage(o.proof_of_payment_url);
                                    setLightboxOrder(o);
                                  }}
                                  className="w-12 h-12 mx-auto rounded-xl overflow-hidden bg-black cursor-pointer group relative shadow-md hover:ring-1 hover:ring-[#FA6D0B] transition-all"
                                >
                                  <img
                                    src={o.proof_of_payment_url}
                                    alt="Thumbnail Struk"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                  />
                                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent flex items-center justify-center text-[8px] font-bold text-white uppercase">
                                    ZOOM
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                                  // BELUM UPLOAD
                                </span>
                              )}
                            </td>

                            {/* Kolom 7: Nomor BIB Resmi */}
                            <td className="py-4 px-4 align-top text-center">
                              {participants.map((p: any, idx: number) => (
                                <div key={p.id || idx}>
                                  {isPaid && p.bib_number ? (
                                    <span className="font-display italic font-black text-lg text-[#FA6D0B] block">
                                      #{p.bib_number}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-slate-400 block font-mono uppercase">
                                      // BELUM TERBIT
                                    </span>
                                  )}
                                </div>
                              ))}
                            </td>

                            {/* Kolom 8: Status & Tombol Aksi - Pure Typography, No Badges */}
                            <td className="py-4 px-4 align-top text-center space-y-2">
                              {isPaid ? (
                                <div className="space-y-0.5">
                                  <span className="text-white font-mono font-black text-xs uppercase tracking-wider block">
                                    // LUNAS RESMI
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-mono block">
                                    {o.raw_payload?.verified_by || 'panitia'}
                                  </span>
                                </div>
                              ) : isPendingVerif ? (
                                <div className="space-y-2 flex flex-col items-center">
                                  <span className="text-[#FA6D0B] font-mono font-bold text-xs uppercase tracking-wider block animate-pulse">
                                    // VERIFIKASI STRUK
                                  </span>

                                  <button
                                    type="button"
                                    disabled={processingOrderId === o.order_id}
                                    onClick={() => handleVerifyOrder(o.order_id)}
                                    className="w-full px-4 py-2 rounded-xl bg-[#FA6D0B] text-black font-black text-xs uppercase tracking-wider hover:bg-[#DE5A00] transition-colors cursor-pointer shadow-[0_0_15px_rgba(250,109,11,0.35)] disabled:opacity-50"
                                  >
                                    {processingOrderId === o.order_id ? 'PROSES...' : 'VERIFIKASI'}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setRejectModalOrder(o)}
                                    className="text-[10px] text-slate-400 hover:text-white underline uppercase cursor-pointer"
                                  >
                                    Tolak Struk
                                  </button>
                                </div>
                              ) : isRejected ? (
                                <div className="space-y-0.5">
                                  <span className="text-slate-400 font-mono font-bold text-xs uppercase tracking-wider block">
                                    // DITOLAK
                                  </span>
                                  {o.admin_notes && (
                                    <span className="text-[9px] text-slate-400 block truncate max-w-[120px]" title={o.admin_notes}>
                                      {o.admin_notes}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-mono uppercase block">
                                  // MENUNGGU
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: REKAPITULASI PO JERSEY VENDOR (POLLRIDE APPAREL) - NATURAL BORDERLESS */}
        {/* ========================================================================= */}
        {activeTab === 'jersey_po' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#121418] shadow-2xl space-y-6 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
              <div>
                <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block">
                  // LOGISTIK VENDOR · PRODUKSI OFFICIAL RACE JERSEY
                </span>
                <h3 className="font-display italic text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  REKAP PO JERSEY POLLRIDE APPAREL
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCopyJerseyWhatsApp}
                className="px-6 py-3.5 rounded-full bg-[#FA6D0B] text-black font-black text-xs uppercase tracking-wider hover:bg-[#DE5A00] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(250,109,11,0.35)] active:scale-95 shrink-0"
              >
                <span>{copiedWaText ? '✓ REKAP TERSALIN KE CLIPBOARD' : 'SALIN REKAP FORMAT WA KE VENDOR'}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Kolom Kiri: Tabel Matriks Ukuran */}
              <div className="md:col-span-8 rounded-2xl bg-[#0B0C0E] overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/90 text-slate-400 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">UKURAN (SIZE)</th>
                      <th className="py-3 px-4 text-center">PRIA (MALE)</th>
                      <th className="py-3 px-4 text-center">WANITA (FEMALE)</th>
                      <th className="py-3 px-4 text-right">TOTAL (PCS)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'].map((size) => {
                      const item = kpis.jersey_size_breakdown?.[size] || { total: 0, male: 0, female: 0 };
                      return (
                        <tr key={size} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-bold text-white">
                            SIZE {size}
                          </td>
                          <td className="py-3 px-4 text-center text-slate-300">
                            {item.male || 0} pcs
                          </td>
                          <td className="py-3 px-4 text-center text-slate-300">
                            {item.female || 0} pcs
                          </td>
                          <td className="py-3 px-4 text-right font-display italic font-black text-sm text-[#FA6D0B]">
                            {item.total || 0} PCS
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-white/[0.04] font-black">
                      <td className="py-4 px-4 text-white uppercase tracking-wider">
                        TOTAL KESELURUHAN PO
                      </td>
                      <td className="py-4 px-4 text-center text-white">
                        {Object.values(kpis.jersey_size_breakdown || {}).reduce((acc: number, curr: any) => acc + (curr.male || 0), 0)} pcs
                      </td>
                      <td className="py-4 px-4 text-center text-white">
                        {Object.values(kpis.jersey_size_breakdown || {}).reduce((acc: number, curr: any) => acc + (curr.female || 0), 0)} pcs
                      </td>
                      <td className="py-4 px-4 text-right text-base text-[#FA6D0B] font-display italic">
                        {kpis.total_jersey_po || 0} PCS
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Kolom Kanan: Panduan Regulasi Vendor */}
              <div className="md:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-[#0B0C0E] space-y-2 text-xs shadow-xl">
                  <span className="text-[#FA6D0B] font-bold uppercase tracking-wider block">
                    BATAS WAKTU PO VENDOR (H-30):
                  </span>
                  <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
                    Sesuai dokumen teknis panitia, pemotongan pesanan jersey untuk vendor Pollride ditutup pada <strong>10 November 2026</strong> guna memastikan seluruh race pack siap sortir pada H-7 sebelum race day 19 Desember 2026.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B0C0E] space-y-2 text-xs shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold uppercase tracking-wider block">
                      SIZE CHART RESMI POLLRIDE:
                    </span>
                    <a
                      href="/size-chart.jpeg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FA6D0B] hover:text-white uppercase font-bold text-[10px] flex items-center gap-1"
                    >
                      <span>BUKA GAMBAR</span>
                      <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                    </a>
                  </div>
                  <div className="rounded-xl overflow-hidden bg-black/60 p-2">
                    <img
                      src="/size-chart.jpeg"
                      alt="Size Chart Pollride"
                      className="w-full h-auto max-h-36 object-contain rounded-lg"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B0C0E] space-y-2 text-xs shadow-xl">
                  <span className="text-white font-bold uppercase tracking-wider block">
                    PREVIEW TEKS WHATSAPP:
                  </span>
                  <pre className="text-[10px] text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-auto p-3 bg-black/50 rounded-xl">
                    {generateJerseyPoWhatsAppText()}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL UNTUK PREVIEW & VERIFIKASI STRUK LANGSUNG */}
      {lightboxImage && lightboxOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-md animate-fade-in-area"
          onClick={() => {
            setLightboxImage(null);
            setLightboxOrder(null);
          }}
        >
          <div
            className="w-full max-w-2xl bg-[#121418] rounded-3xl p-5 sm:p-6 space-y-4 shadow-[0_25px_70px_rgba(0,0,0,0.95)] font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 text-xs">
              <div>
                <span className="font-bold text-white uppercase block">
                  AUDIT MUTASI STRUK // {lightboxOrder.order_id}
                </span>
                <span className="text-[10px] text-slate-400">
                  {lightboxOrder.participants?.[0]?.full_name} · NOMINAL WAJIB: {formatRupiah(lightboxOrder.net_amount)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLightboxImage(null);
                  setLightboxOrder(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                ✕ TUTUP
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto flex items-center justify-center bg-black/80 rounded-2xl p-2">
              <img
                src={lightboxImage}
                alt="Bukti Transfer Struk"
                className="max-h-[55vh] max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Tombol Aksi di Dalam Lightbox */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400">
                Pastikan nominal, jam transfer, dan nomor rekening panitia sesuai sebelum verifikasi.
              </span>

              {lightboxOrder.payment_status === 'PENDING_VERIFICATION' && (
                <button
                  type="button"
                  disabled={processingOrderId === lightboxOrder.order_id}
                  onClick={() => handleVerifyOrder(lightboxOrder.order_id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FA6D0B] text-black font-black text-xs uppercase tracking-wider hover:bg-[#DE5A00] transition-colors cursor-pointer shadow-[0_0_20px_rgba(250,109,11,0.4)] disabled:opacity-50"
                >
                  {processingOrderId === lightboxOrder.order_id ? 'MEMVERIFIKASI...' : 'SETUJUI & TERBITKAN BIB SEKARANG'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL PENOLAKAN STRUK */}
      {rejectModalOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fade-in-area"
          onClick={() => setRejectModalOrder(null)}
        >
          <div
            className="w-full max-w-md bg-[#121418] rounded-3xl p-6 space-y-4 shadow-[0_25px_70px_rgba(0,0,0,0.95)] font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1 pb-2">
              <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-wider block">
                // TOLAK BUKTI PEMBAYARAN
              </span>
              <span className="text-sm font-bold text-white block">
                ORDER ID: {rejectModalOrder.order_id}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-300 font-bold uppercase block">ALASAN PENOLAKAN:</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="w-full bg-black/60 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-xs border-none"
                placeholder="Tuliskan catatan alasan penolakan..."
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectModalOrder(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white text-xs uppercase font-bold"
              >
                BATAL
              </button>
              <button
                type="button"
                disabled={processingOrderId === rejectModalOrder.order_id}
                onClick={handleRejectOrder}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-black text-xs uppercase hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {processingOrderId === rejectModalOrder.order_id ? 'MEMPROSES...' : 'KONFIRMASI TOLAK'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
