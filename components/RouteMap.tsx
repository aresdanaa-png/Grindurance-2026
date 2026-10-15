'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

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

        // Fetch GPX
        const res = await fetch(gpxFile);
        if (!res.ok) throw new Error('GPX file not found');
        const gpxText = await res.text();

        const parser = new DOMParser();
        const gpxDoc = parser.parseFromString(gpxText, 'text/xml');
        const trkpts = gpxDoc.querySelectorAll('trkpt');

        if (trkpts.length === 0) throw new Error('No track points found in GPX');

        const latLngs: [number, number][] = [];
        trkpts.forEach((pt) => {
          const lat = parseFloat(pt.getAttribute('lat') || '0');
          const lon = parseFloat(pt.getAttribute('lon') || '0');
          if (lat && lon) latLngs.push([lat, lon]);
        });

        if (latLngs.length === 0) throw new Error('No valid coordinates');

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

        // Start marker (green dot)
        const startIcon = L.divIcon({
          html: `<div style="width:13px;height:13px;background:#22C55E;border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 8px rgba(34,197,94,0.95);"></div>`,
          className: '',
          iconAnchor: [6, 6],
        });

        // Finish marker (orange dot)
        const finishIcon = L.divIcon({
          html: `<div style="width:13px;height:13px;background:${accentColor};border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 8px rgba(250,109,11,0.95);"></div>`,
          className: '',
          iconAnchor: [6, 6],
        });

        L.marker(latLngs[0], { icon: startIcon })
          .bindTooltip('START (ABEEY)', { permanent: false, direction: 'top' })
          .addTo(map);

        L.marker(latLngs[latLngs.length - 1], { icon: finishIcon })
          .bindTooltip('FINISH (ABEEY)', { permanent: false, direction: 'top' })
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
          RUTE VIRTUAL LOKAL // 19 CHAPTER
        </span>
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-600 max-w-xs">
          Rute ditentukan mandiri oleh masing-masing regional chapter
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Top info bar: Pure Typography & Controls (Zero Icons, Zero Redundant Dots) */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-black/70 border-b border-white/10 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest truncate">
            ETAPE // {gpxTotalKm}
            {prologKm > 0 && (
              <span className="text-[#FA6D0B] ml-2 font-black">+{prologKm}KM PROLOG</span>
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
              GELAP
            </button>
            <button
              onClick={() => setLayerType('satellite')}
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wider transition-all duration-150 ${
                layerType === 'satellite'
                  ? 'bg-[#FA6D0B] text-black font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SATELIT
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
              title="Reset view peta"
            >
              RESET
            </button>
          )}

          <a
            href={gpxFile}
            download={gpxFileName}
            className="px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-200 hover:shadow-[0_0_14px_rgba(250,109,11,0.55)] active:scale-95"
          >
            DOWNLOAD GPX
          </a>
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 min-h-0">
        {(status === 'loading' || status === 'idle') && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#090A0D]/95">
            <div className="w-5 h-5 border-2 border-[#FA6D0B] border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              MEMUAT RUTE GPX...
            </span>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#090A0D]/95 px-4 text-center">
            <span className="text-xs font-mono font-black text-[#FA6D0B] uppercase tracking-wider">
              STATUS // GAGAL MEMUAT PETA
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              PERIKSA KONEKSI INTERNET ANDA
            </span>
            <a
              href={gpxFile}
              download={gpxFileName}
              className="px-4 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all mt-2"
            >
              DOWNLOAD GPX
            </a>
          </div>
        )}

        <div key={mapKey} ref={mapRef} className="w-full h-full" />
      </div>

      {/* Prolog notice footer */}
      {prologKm > 0 && (
        <div className="px-3.5 py-2 bg-[#FA6D0B]/10 border-t border-[#FA6D0B]/25 flex-shrink-0">
          <p className="text-[9px] sm:text-[10px] font-mono text-[#FA6D0B] leading-relaxed uppercase tracking-wide">
            <strong>// PERINGATAN PROLOG:</strong> Rute resmi {gpxTotalKm} dari Start ABEEY. Peserta wajib menambah <strong>prolog mandiri {prologKm} km</strong> dari kediaman (03:00–05:00 WIB).
          </p>
        </div>
      )}
    </div>
  );
}
