'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { isGpxDownloadLocked } from '@/lib/data/categories';

interface RouteMapProps {
  gpxFile: string | null;
  categoryKm: string;
  categoryId: string;
  gpxTotalKm: string;
  prologKm?: number;
  gpxFileName: string;
  accentColor?: string;
}

export default function RouteMap({
  gpxFile,
  categoryKm,
  categoryId,
  gpxTotalKm,
  prologKm = 0,
  gpxFileName,
  accentColor = '#FA6D0B'
}: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentTileLayersRef = useRef<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mapKey, setMapKey] = useState(0);
  const [layerType, setLayerType] = useState<'dark' | 'satellite'>('satellite');
  const [isLocked, setIsLocked] = useState(true);
  const [showLockModal, setShowLockModal] = useState(false);
  const [routeTelemetry, setRouteTelemetry] = useState<{
    points: number;
    minAlt: number;
    maxAlt: number;
    gain: number;
  } | null>(null);

  const { t } = useLanguage();

  // Evaluate GPX download lock state on mount
  useEffect(() => {
    setIsLocked(isGpxDownloadLocked());
  }, []);

  // Apply tile layers dynamically without re-parsing GPX
  const applyTileLayers = useCallback(async (type: 'dark' | 'satellite') => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapInstanceRef.current as any;
    if (!map) return;

    try {
      const L = (await import('leaflet')).default;

      // Remove existing tile layers
      currentTileLayersRef.current.forEach((layer) => {
        try {
          map.removeLayer(layer);
        } catch {
          // ignore
        }
      });
      currentTileLayersRef.current = [];

      if (type === 'dark') {
        const base = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          {
            maxNativeZoom: 16,
            maxZoom: 19,
            attribution: '&copy; Esri',
          }
        ).addTo(map);

        const ref = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
          {
            maxNativeZoom: 16,
            maxZoom: 19,
            opacity: 0.85,
          }
        ).addTo(map);

        base.bringToBack();
        currentTileLayersRef.current = [base, ref];
      } else {
        const sat = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            maxZoom: 19,
            attribution: '&copy; Esri',
          }
        ).addTo(map);

        const ref = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
          {
            maxZoom: 19,
            opacity: 0.9,
          }
        ).addTo(map);

        sat.bringToBack();
        currentTileLayersRef.current = [sat, ref];
      }
    } catch (e) {
      console.error('Failed to switch tile layer:', e);
    }
  }, []);

  // Update tiles when layerType toggles
  useEffect(() => {
    if (mapInstanceRef.current && status === 'success') {
      applyTileLayers(layerType);
    }
  }, [layerType, status, applyTileLayers]);

  // Main map initialization
  useEffect(() => {
    if (!gpxFile || !mapRef.current) return;

    setStatus('loading');

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default;

        // Fix leaflet marker asset paths
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        if (mapInstanceRef.current) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (mapInstanceRef.current as any).remove();
          mapInstanceRef.current = null;
        }

        if (!mapRef.current) return;

        const map = L.map(mapRef.current, {
          zoomControl: true,
          scrollWheelZoom: false,
          attributionControl: false,
        });

        L.control.attribution({ position: 'bottomright', prefix: '' })
          .addAttribution('&copy; <a href="https://www.esri.com" target="_blank" rel="noreferrer">Esri</a>')
          .addTo(map);

        mapInstanceRef.current = map;

        // Apply chosen tile layers (Default: Satellite)
        await applyTileLayers(layerType);

        // Fetch GPX for live rendering
        const res = await fetch(gpxFile);
        if (!res.ok) throw new Error('GPX file not found');
        const gpxText = await res.text();

        const parser = new DOMParser();
        const gpxDoc = parser.parseFromString(gpxText, 'text/xml');
        const trkpts = gpxDoc.querySelectorAll('trkpt');

        if (trkpts.length === 0) throw new Error('No track points found in GPX');

        const latLngs: [number, number][] = [];
        let minAlt = Infinity;
        let maxAlt = -Infinity;
        let totalGain = 0;
        let prevAlt: number | null = null;

        trkpts.forEach((pt) => {
          const lat = parseFloat(pt.getAttribute('lat') || '0');
          const lon = parseFloat(pt.getAttribute('lon') || '0');
          const eleText = pt.querySelector('ele')?.textContent;

          if (lat && lon) {
            latLngs.push([lat, lon]);
            if (eleText) {
              const alt = parseFloat(eleText);
              if (!isNaN(alt)) {
                if (alt < minAlt) minAlt = alt;
                if (alt > maxAlt) maxAlt = alt;
                if (prevAlt !== null && alt > prevAlt) {
                  totalGain += (alt - prevAlt);
                }
                prevAlt = alt;
              }
            }
          }
        });

        if (latLngs.length === 0) throw new Error('No valid coordinates');

        if (minAlt !== Infinity && maxAlt !== -Infinity) {
          setRouteTelemetry({
            points: latLngs.length,
            minAlt: Math.round(minAlt),
            maxAlt: Math.round(maxAlt),
            gain: Math.round(totalGain),
          });
        }

        // Glow underlay
        L.polyline(latLngs, {
          color: accentColor,
          weight: 10,
          opacity: 0.22,
          lineJoin: 'round',
          lineCap: 'round',
        }).addTo(map);

        // Main route line
        const routeLine = L.polyline(latLngs, {
          color: accentColor,
          weight: 3.5,
          opacity: 0.98,
          lineJoin: 'round',
          lineCap: 'round',
        }).addTo(map);

        routeLine.bindTooltip(`GRINDURANCE ${categoryKm} // RUTE AKTIF`, {
          sticky: true,
          direction: 'top',
        });

        // Start marker (green dot)
        const startIcon = L.divIcon({
          html: `<div style="width:13px;height:13px;background:#22C55E;border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 10px rgba(34,197,94,0.95);"></div>`,
          className: '',
          iconAnchor: [6, 6],
        });

        // Finish marker (orange dot)
        const finishIcon = L.divIcon({
          html: `<div style="width:13px;height:13px;background:${accentColor};border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 10px rgba(250,109,11,0.95);"></div>`,
          className: '',
          iconAnchor: [6, 6],
        });

        L.marker(latLngs[0], { icon: startIcon })
          .bindTooltip('START // KM 0 · ABEEY COFFEE', { permanent: false, direction: 'top' })
          .addTo(map);

        L.marker(latLngs[latLngs.length - 1], { icon: finishIcon })
          .bindTooltip('FINISH // ABEEY COFFEE', { permanent: false, direction: 'top' })
          .addTo(map);

        map.fitBounds(routeLine.getBounds(), { padding: [30, 30] });

        setStatus('success');
      } catch (err) {
        console.error('Map init error:', err);
        setStatus('error');
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gpxFile, mapKey]);

  if (!gpxFile) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500 bg-black/20 p-6 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold">
          {t('RUTE VIRTUAL LOKAL // 19 CHAPTER', 'LOCAL VIRTUAL ROUTE // 19 CHAPTERS')}
        </span>
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-600 max-w-xs">
          {t('Rute ditentukan mandiri oleh masing-masing regional chapter', 'Route is determined independently by each regional chapter')}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Top info bar: Pure Typography & Controls (Zero Icons, Strictly Adhering to RULES.md) */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-black/70 border-b border-white/10 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest truncate">
            {t('ETAPE //', 'STAGE //')} {gpxTotalKm}
            {prologKm > 0 && (
              <span className="text-[#FA6D0B] ml-2 font-black">+{prologKm}KM {t('PROLOG', 'PROLOGUE')}</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Layer switcher: Gelap vs Satelit */}
          <div className="flex items-center bg-black/80 border border-white/15 rounded-full p-0.5">
            <button
              onClick={() => setLayerType('dark')}
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wider transition-all duration-150 ${
                layerType === 'dark'
                  ? 'bg-white/20 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('GELAP', 'DARK')}
            </button>
            <button
              onClick={() => setLayerType('satellite')}
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wider transition-all duration-150 ${
                layerType === 'satellite'
                  ? 'bg-[#FA6D0B] text-black font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('SATELIT', 'SATELLITE')}
            </button>
          </div>

          {status === 'success' && (
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (mapInstanceRef.current as any).remove();
                  mapInstanceRef.current = null;
                }
                setStatus('idle');
                setMapKey((k) => k + 1);
              }}
              className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-slate-400 hover:text-white hover:bg-white/10 uppercase tracking-wider transition-all"
              title={t('Reset view peta', 'Reset map view')}
            >
              RESET
            </button>
          )}

          {isLocked ? (
            <button
              type="button"
              onClick={() => setShowLockModal(true)}
              className="px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-[#FA6D0B] transition-all cursor-pointer active:scale-95"
              title={t('File GPX dikunci hingga H-2 (11 Des 2026, 00:00 WIB)', 'GPX file locked until D-2 (11 Dec 2026, 00:00 WIB)')}
            >
              {t('TERKUNCI // H-2 (11 DES)', 'LOCKED // D-2 (11 DEC)')}
            </button>
          ) : (
            <a
              href={`/api/gpx/download?category=${categoryId}`}
              download={gpxFileName}
              className="px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-200 hover:shadow-[0_0_14px_rgba(250,109,11,0.55)] active:scale-95"
            >
              DOWNLOAD GPX
            </a>
          )}
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 min-h-0">
        {(status === 'loading' || status === 'idle') && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#090A0D]/95">
            <div className="w-5 h-5 border-2 border-[#FA6D0B] border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {t('MEMUAT RUTE GPX...', 'LOADING GPX ROUTE...')}
            </span>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#090A0D]/95 px-4 text-center">
            <span className="text-xs font-mono font-black text-[#FA6D0B] uppercase tracking-wider">
              {t('STATUS // GAGAL MEMUAT PETA', 'STATUS // FAILED TO LOAD MAP')}
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              {t('PERIKSA KONEKSI INTERNET ANDA', 'PLEASE CHECK YOUR INTERNET CONNECTION')}
            </span>
            {isLocked ? (
              <button
                type="button"
                onClick={() => setShowLockModal(true)}
                className="px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-[#FA6D0B] transition-all mt-2 cursor-pointer"
              >
                {t('FILE DIKUNCI H-2', 'FILE LOCKED D-2')}
              </button>
            ) : (
              <a
                href={`/api/gpx/download?category=${categoryId}`}
                download={gpxFileName}
                className="px-4 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all mt-2"
              >
                DOWNLOAD GPX
              </a>
            )}
          </div>
        )}

        {/* Live Map Telemetry HUD (Bottom-left overlay) */}
        {status === 'success' && (
          <div className="absolute bottom-3 left-3 z-[400] pointer-events-auto bg-black/85 backdrop-blur-md border border-white/15 rounded-lg px-3 py-2 shadow-lg select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                GPX LIVE // {categoryKm}
              </span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-0.5 flex items-center gap-2">
              {routeTelemetry && (
                <>
                  <span>{routeTelemetry.points.toLocaleString()} PTS</span>
                  <span>·</span>
                  <span>ALT {routeTelemetry.minAlt}M - {routeTelemetry.maxAlt}M</span>
                  <span>·</span>
                </>
              )}
              <button
                type="button"
                onClick={() => setShowLockModal(true)}
                className="text-[#FA6D0B] hover:underline cursor-pointer font-bold"
              >
                {isLocked ? t('FILE: TERKUNCI H-2', 'FILE: LOCKED D-2') : t('FILE: TERSEDIA', 'FILE: READY')}
              </button>
            </div>
          </div>
        )}

        <div key={mapKey} ref={mapRef} className="w-full h-full" />
      </div>

      {/* Prolog notice footer */}
      {prologKm > 0 && (
        <div className="px-3.5 py-2 bg-[#FA6D0B]/10 border-t border-[#FA6D0B]/25 flex-shrink-0">
          <p className="text-[9px] sm:text-[10px] font-mono text-[#FA6D0B] leading-relaxed uppercase tracking-wide">
            <strong>{t('// PERINGATAN PROLOG:', '// PROLOGUE NOTICE:')}</strong>{' '}
            {t(
              `Rute resmi ${gpxTotalKm} dari Start ABEEY. Peserta wajib menambah prolog mandiri ${prologKm} km dari kediaman (03:00–05:00 WIB).`,
              `Official route ${gpxTotalKm} starting from ABEEY. Riders must add independent prologue ${prologKm} km from residence (03:00–05:00 WIB).`
            )}
          </p>
        </div>
      )}

      {/* Modal Protokol Rilis GPX (Strictly Pure Typography & No Decorative Icons) */}
      {showLockModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowLockModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#0D0E11] border border-white/20 rounded-2xl p-6 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#FA6D0B] shadow-[0_0_20px_#FA6D0B]" />

            {/* Header */}
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block mb-1">
                {t('PROTOKOL NAVIGASI // GRINDURANCE 2026', 'NAVIGATION PROTOCOL // GRINDURANCE 2026')}
              </span>
              <h3 className="font-display italic text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                {t('FILE GPX DIKUNCI HINGGA H-2', 'GPX FILE LOCKED UNTIL D-2')}
              </h3>
            </div>

            {/* Telemetry specs box */}
            <div className="my-5 p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>{t('STATUS FILE:', 'FILE STATUS:')}</span>
                <span className="text-[#FA6D0B] font-bold">
                  {isLocked ? t('TERKUNCI (SAFETY CLEARANCE)', 'LOCKED (SAFETY CLEARANCE)') : t('TERSEDIA UNTUK DIUNDUH', 'READY FOR DOWNLOAD')}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>{t('JADWAL RILIS:', 'RELEASE SCHEDULE:')}</span>
                <span className="text-white font-bold">JUMAT, 11 DESEMBER 2026 · 00:00 WIB</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>{t('RACE DAY:', 'RACE DAY:')}</span>
                <span className="text-white font-bold">MINGGU, 13 DESEMBER 2026</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>{t('KATEGORI:', 'CATEGORY:')}</span>
                <span className="text-slate-300 font-bold">{categoryKm} ({gpxTotalKm})</span>
              </div>
            </div>

            {/* Body rationale */}
            <div className="space-y-3 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed mb-6">
              <p>
                {t(
                  'Untuk menjamin keselamatan navigasi seluruh peserta di zona pedesaan & makadam perbukitan Jonggol, berkas digital resmi (.GPX) untuk cyclocomputer (Garmin, Wahoo, Hammerhead, Bryton, Komoot) baru akan dibuka tepat pada H-2.',
                  'To ensure the navigation safety of all athletes through Jonggol rural and macadam hill sectors, the official digital (.GPX) files for GPS head units (Garmin, Wahoo, Hammerhead, Bryton, Komoot) will be unlocked exactly on D-2.'
                )}
              </p>
              <p className="text-slate-400 text-xs">
                {t(
                  'Langkah ini mencegah peserta memakai draft rute non-final sebelum tim marshal menyelesaikan safety reconnaissance terakhir dan pembersihan jalur cuaca basah.',
                  'This policy prevents athletes from loading unverified pre-release drafts prior to final safety reconnaissance and wet-season course clearance by marshals.'
                )}
              </p>
              <div className="p-3 rounded-lg bg-[#FA6D0B]/10 border border-[#FA6D0B]/20 text-[11px] font-mono text-[#FA6D0B]">
                {t(
                  '// CATATAN: Peta live satelit di layar tetap aktif dan dapat dijelajahi untuk mempelajari profil lintasan.',
                  '// NOTE: Live satellite map remains fully interactive for reconnaissance and contour inspection.'
                )}
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={() => setShowLockModal(false)}
              className="w-full py-3.5 rounded-full bg-[#FA6D0B] hover:bg-[#DE5A00] text-black font-mono font-black uppercase tracking-wider text-xs transition-all active:scale-95 shadow-[0_0_20px_rgba(250,109,11,0.35)] cursor-pointer"
            >
              {t('MENGERTI // KEMBALI KE PETA LIVE', 'UNDERSTOOD // RETURN TO LIVE MAP')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
