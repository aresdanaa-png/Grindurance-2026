'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import QRCode from 'qrcode';

interface ParticipantPlate {
  id: string;
  bibNumber: number | string;
  fullName: string;
  categoryName: string;
  categoryId: string;
  distanceKm: number;
  riderRole: string;
  bloodType: string;
  emergencyPhone: string;
  emergencyName: string;
  communityChapter: string;
  registrationCode: string;
  orderId: string;
  packageType: string;
  jerseySize: string;
}

export default function AdminPrintBibPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0D0E11] text-slate-400 font-mono text-xs flex items-center justify-center">
          MEMUAT PUSAT CETAK PELAT BIB...
        </div>
      }
    >
      <AdminPrintBibContent />
    </Suspense>
  );
}

function AdminPrintBibContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [plates, setPlates] = useState<ParticipantPlate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layoutMode, setLayoutMode] = useState<'A4_2_PLATES' | 'A5_SINGLE'>('A4_2_PLATES');
  const [qrCodeUrls, setQrCodeUrls] = useState<Record<string, string>>({});

  // 1. Validasi Sesi Admin & Ambil Data
  useEffect(() => {
    async function loadData() {
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

        // Ambil data orders lunas / verified
        const ordersRes = await fetch('/api/admin/orders?status=PAID');
        const ordersData = await ordersRes.json();

        if (ordersRes.ok && ordersData.success) {
          const extractedPlates: ParticipantPlate[] = [];

          (ordersData.orders || []).forEach((o: any) => {
            const catId = o.category_id;
            let catName = 'GRAVEL';
            let dist = 0;

            switch (catId) {
              case '70':
              case '60':
                catName = '70 KM FUN GRAVEL';
                dist = 70;
                break;
              case '100':
              case '80':
                catName = '100 KM FONDO';
                dist = 100;
                break;
              case '120':
              case '120_SINGLE':
                catName = '120 KM RACE (SINGLE)';
                dist = 120;
                break;
              case '120_PAIR':
                catName = '120 KM RACE (PAIR MIX)';
                dist = 120;
                break;
              case '150':
                catName = '150 KM GRAND FONDO';
                dist = 150;
                break;
              case '200':
                catName = '200 KM ULTRA';
                dist = 200;
                break;
              case 'VIRTUAL':
                catName = 'VIRTUAL RIDE';
                dist = 0;
                break;
              default:
                catName = o.category?.name || 'GRAVEL';
                dist = o.category?.distance_km || 0;
            }

            (o.participants || []).forEach((p: any) => {
              // Hanya ambil yang sudah terbit BIB
              if (p.bib_number) {
                extractedPlates.push({
                  id: p.id || p.registration_code,
                  bibNumber: p.bib_number,
                  fullName: p.full_name || 'RIDER',
                  categoryName: catName,
                  categoryId: catId,
                  distanceKm: dist,
                  riderRole: p.rider_role || 'SINGLE',
                  bloodType: p.blood_type || '-',
                  emergencyPhone: p.emergency_contact_phone || '-',
                  emergencyName: p.emergency_contact_name || '-',
                  communityChapter: p.community_chapter || 'Umum',
                  registrationCode: p.registration_code || '-',
                  orderId: o.order_id || '-',
                  packageType: o.package_type || 'MEDAL_ONLY',
                  jerseySize: p.jersey_size || '-',
                });
              }
            });
          });

          // Urutkan berdasarkan BIB number ascending
          extractedPlates.sort((a, b) => {
            const numA = Number(a.bibNumber) || 0;
            const numB = Number(b.bibNumber) || 0;
            return numA - numB;
          });

          setPlates(extractedPlates);
        }
      } catch (err) {
        console.error('Error loading print bib data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  // Handle URL category query param jika ada
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  // 2. Generate QR Code untuk semua plates yang ter-filter
  useEffect(() => {
    let isCancelled = false;

    async function generateAllQrs() {
      const urls: Record<string, string> = {};
      for (const plate of plates) {
        if (isCancelled) break;
        try {
          const qrText = `GX2026:${plate.bibNumber}:${plate.registrationCode}`;
          const url = await QRCode.toDataURL(qrText, {
            width: 160,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          });
          urls[plate.id] = url;
        } catch (err) {
          console.error('Gagal generate QR untuk BIB', plate.bibNumber);
        }
      }
      if (!isCancelled) {
        setQrCodeUrls(urls);
      }
    }

    if (plates.length > 0) {
      generateAllQrs();
    }

    return () => {
      isCancelled = true;
    };
  }, [plates]);

  // 3. Filter data
  const filteredPlates = useMemo(() => {
    return plates.filter((plate) => {
      const matchCat =
        selectedCategory === 'ALL' ||
        plate.categoryId === selectedCategory ||
        (selectedCategory === '70' && plate.categoryId === '60') ||
        (selectedCategory === '100' && plate.categoryId === '80') ||
        (selectedCategory === '120' && (plate.categoryId === '120_SINGLE' || plate.categoryId === '120_PAIR'));

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        String(plate.bibNumber).includes(q) ||
        plate.fullName.toLowerCase().includes(q) ||
        plate.registrationCode.toLowerCase().includes(q) ||
        plate.communityChapter.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });
  }, [plates, selectedCategory, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-slate-100 selection:bg-[#FA6D0B] selection:text-black font-sans">
      {/* CSS KHUSUS MEDIA PRINT & PAGE LAYOUT */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-plate-card {
            background-color: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            border: 3px solid #000000 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-page-break {
            page-break-after: always !important;
            break-after: page !important;
          }
        }
      `}</style>

      {/* SCREEN CONTROLS / TOOLBAR (TIDAK AKAN DICETAK) */}
      <div className="no-print border-b border-white/10 bg-[#0B0C0E]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              ← KEMBALI KE ADMIN
            </button>
            <div className="h-4 w-px bg-white/20" />
            <div>
              <h1 className="text-sm font-display italic uppercase tracking-wider font-bold text-white flex items-center gap-2">
                PRINT-READY BIB SHEETS
                <span className="text-[10px] font-mono font-black text-[#FA6D0B] bg-[#FA6D0B]/10 px-2 py-0.5 rounded">
                  {filteredPlates.length} PLAT
                </span>
              </h1>
              <p className="text-[11px] font-mono text-slate-400">
                Gravel Grindurance 2026 // Pelat Stang Sepeda Standar Cetak A4/A5
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Layout */}
            <div className="flex items-center bg-black/60 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setLayoutMode('A4_2_PLATES')}
                className={`text-[11px] font-mono font-bold uppercase px-3 py-1.5 rounded-lg transition-colors ${
                  layoutMode === 'A4_2_PLATES'
                    ? 'bg-[#FA6D0B] text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2 Pelat / Lembar A4
              </button>
              <button
                onClick={() => setLayoutMode('A5_SINGLE')}
                className={`text-[11px] font-mono font-bold uppercase px-3 py-1.5 rounded-lg transition-colors ${
                  layoutMode === 'A5_SINGLE'
                    ? 'bg-[#FA6D0B] text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1 Pelat / Lembar A5
              </button>
            </div>

            {/* Ekspor CSV Cepat */}
            <a
              href="/api/admin/export-roster?status=PAID"
              className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              UNDUH CSV ROSTER <ArrowUpRight className="w-3.5 h-3.5 text-[#FA6D0B]" />
            </a>

            {/* Tombol Cetak Utama */}
            <button
              onClick={handlePrint}
              disabled={filteredPlates.length === 0}
              className="text-xs font-mono font-black uppercase tracking-wider bg-[#FA6D0B] hover:bg-[#e05f06] disabled:opacity-50 text-black px-4 py-2 rounded-xl transition-colors shadow-lg flex items-center gap-2"
            >
              CETAK SEKARANG (CTRL + P) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Bar (No Print) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', label: 'SEMUA KATEGORI' },
              { id: '70', label: '70 KM FUN' },
              { id: '100', label: '100 KM FONDO' },
              { id: '120_SINGLE', label: '120 KM SINGLE' },
              { id: '120_PAIR', label: '120 KM PAIR' },
              { id: '150', label: '150 KM GRAND' },
              { id: '200', label: '200 KM ULTRA' },
              { id: 'VIRTUAL', label: 'VIRTUAL' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari BIB, Nama, atau Kode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#FA6D0B]"
            />
          </div>
        </div>
      </div>

      {/* LEMBAR CETAK UTAMA (PRINT CONTAINER) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 print-container">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 border-[#FA6D0B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Menyiapkan Roster & Pelat Cetak...
            </p>
          </div>
        ) : filteredPlates.length === 0 ? (
          <div className="py-20 text-center bg-[#0B0C0E] border border-white/10 rounded-2xl p-8">
            <p className="text-sm font-mono font-bold text-slate-300 uppercase mb-2">
              Tidak Ada Pelat BIB yang Cocok
            </p>
            <p className="text-xs font-mono text-slate-500 max-w-md mx-auto">
              Pastikan peserta telah diverifikasi lunas oleh panitia di dashboard admin agar nomor BIB terbit otomatis.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* RENDER PLATES DENGAN ATURAN BREAK PER LEMBAR */}
            {layoutMode === 'A4_2_PLATES' ? (
              // Mode 2 Pelat per Lembar A4
              chunkArray(filteredPlates, 2).map((chunk, sheetIdx) => (
                <div
                  key={`sheet-${sheetIdx}`}
                  className="print-page-break space-y-6 pb-6 print:pb-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-1 print:gap-6 gap-6">
                    {chunk.map((plate) => (
                      <BibPlateCard
                        key={plate.id}
                        plate={plate}
                        qrUrl={qrCodeUrls[plate.id]}
                      />
                    ))}
                  </div>

                  {/* Garis Potong Panduan Panitia (Hanya muncul saat print di antara 2 pelat) */}
                  <div className="hidden print:block border-b-2 border-dashed border-slate-400 my-4 text-center">
                    <span className="bg-white px-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest relative -bottom-2">
                      ✂ POTONG DI SINI (CUTTING GUIDE LINE) ✂
                    </span>
                  </div>
                </div>
              ))
            ) : (
              // Mode 1 Pelat per Lembar A5
              filteredPlates.map((plate) => (
                <div
                  key={plate.id}
                  className="print-page-break pb-6 print:pb-0 max-w-2xl mx-auto"
                >
                  <BibPlateCard
                    plate={plate}
                    qrUrl={qrCodeUrls[plate.id]}
                    isLarge
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Komponen Desain 1:1 Pelat Balap Sepeda Gravel GX-ID
 */
function BibPlateCard({
  plate,
  qrUrl,
  isLarge = false,
}: {
  plate: ParticipantPlate;
  qrUrl?: string;
  isLarge?: boolean;
}) {
  const isUltra = plate.distanceKm === 200;
  const isRace = plate.distanceKm === 120;
  const isFondo = plate.distanceKm === 100 || plate.distanceKm === 150;

  return (
    <div className="print-plate-card bg-white text-black rounded-2xl p-5 sm:p-6 relative border-4 border-black overflow-hidden font-sans select-none shadow-xl">
      {/* 4 LUBANG PENGAIT STANG (CABLE TIE MOUNTING HOLES) */}
      <div className="absolute top-3 left-4 w-3.5 h-3.5 rounded-full border-2 border-slate-500 bg-slate-200 print:bg-white print:border-black" />
      <div className="absolute top-3 right-4 w-3.5 h-3.5 rounded-full border-2 border-slate-500 bg-slate-200 print:bg-white print:border-black" />
      <div className="absolute bottom-3 left-4 w-3.5 h-3.5 rounded-full border-2 border-slate-500 bg-slate-200 print:bg-white print:border-black" />
      <div className="absolute bottom-3 right-4 w-3.5 h-3.5 rounded-full border-2 border-slate-500 bg-slate-200 print:bg-white print:border-black" />

      {/* HEADER PELAT */}
      <div className="border-b-2 border-black pb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-black text-[#FA6D0B] print:text-black print:bg-white print:border print:border-black flex items-center justify-center font-black font-mono text-sm leading-none">
            GX
          </div>
          <div>
            <span className="text-xs font-black tracking-tighter uppercase block leading-none font-display italic text-black">
              GRAVEL GRINDURANCE
            </span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-700 block">
              ANNIVERSARY EDITION · 2026
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black text-white print:bg-white print:text-black print:border print:border-black">
            OFFICIAL RACE PLATE
          </span>
        </div>
      </div>

      {/* MAIN DISPLAY: NOMOR BIB & BADGE KATEGORI */}
      <div className="py-3 text-center">
        {/* NOMOR BIB RAKSASA */}
        <div
          className={`font-black tracking-tighter text-black font-display italic leading-none my-1 ${
            isLarge ? 'text-8xl sm:text-9xl' : 'text-7xl sm:text-8xl'
          }`}
        >
          {plate.bibNumber}
        </div>

        {/* BADGE ETAPE */}
        <div className="mt-2">
          <span
            className={`inline-block px-3.5 py-1 text-xs font-mono font-black tracking-wider uppercase rounded ${
              isRace || isUltra
                ? 'bg-[#FA6D0B] text-black print:bg-black print:text-white'
                : 'bg-black text-white print:bg-white print:text-black print:border print:border-black'
            }`}
          >
            {plate.categoryName}
          </span>
        </div>
      </div>

      {/* FOOTER PELAT: DATA RIDER, MEDIS & QR CHECK-IN */}
      <div className="border-t-2 border-black pt-2.5 flex items-end justify-between gap-3">
        {/* Kolom Informasi Rider */}
        <div className="space-y-0.5 max-w-[260px]">
          <div className="text-base font-black uppercase text-black truncate font-sans tracking-tight">
            {plate.fullName}
          </div>
          <div className="text-[11px] font-mono font-bold text-slate-700 truncate">
            {plate.communityChapter}
          </div>

          {/* Baris Informasi Medis & Darurat */}
          <div className="flex flex-wrap items-center gap-1 pt-1 text-[10px] font-mono font-bold">
            <span className="bg-slate-100 border border-black px-1.5 py-0.2 text-black">
              GOL: {plate.bloodType}
            </span>
            <span className="bg-slate-100 border border-black px-1.5 py-0.2 text-black">
              ICE: {plate.emergencyPhone}
            </span>
            {plate.riderRole !== 'SINGLE' && (
              <span className="bg-black text-white px-1.5 py-0.2 text-[9px]">
                {plate.riderRole === 'PAIR_RIDER_1' ? 'PAIR 1' : 'PAIR 2'}
              </span>
            )}
          </div>
        </div>

        {/* QR Code Resmi Checkin */}
        <div className="shrink-0 text-center">
          {qrUrl ? (
            <img
              src={qrUrl}
              alt={`QR-${plate.bibNumber}`}
              className="w-14 h-14 rounded border-2 border-black p-0.5 bg-white mx-auto"
            />
          ) : (
            <div className="w-14 h-14 rounded border-2 border-slate-300 bg-slate-100 animate-pulse mx-auto" />
          )}
          <span className="text-[8px] font-mono font-bold uppercase block text-slate-600 mt-0.5">
            {plate.registrationCode}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper untuk membagi array menjadi potongan berukuran N
 */
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
