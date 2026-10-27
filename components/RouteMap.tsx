'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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

interface ParsedPoint {
  lat: number;
  lon: number;
  ele: number;
  x: number;
  y: number;
  distKm: number;
}

interface RouteVectorData {
  points: ParsedPoint[];
  pathD: string;
  startPoint: ParsedPoint;
  finishPoint: ParsedPoint;
  summitPoint: ParsedPoint;
  minAlt: number;
  maxAlt: number;
  totalGain: number;
  viewBox: { width: number; height: number };
}

export default function RouteMap({
  gpxFile,
  categoryKm,
  categoryId,
  gpxTotalKm,
  prologKm = 0,
  gpxFileName,
  accentColor = '#FA6D0B',
}: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isLocked, setIsLocked] = useState(true);
  const [showLockModal, setShowLockModal] = useState(false);
  const [routeData, setRouteData] = useState<RouteVectorData | null>(null);

  // Zoom and Pan interaction state (Mobile defaults to a wider, distant overview)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const { t } = useLanguage();

  // Evaluate GPX download lock state on mount
  useEffect(() => {
    setIsLocked(isGpxDownloadLocked());
  }, []);

  // Initialize and reset zoom & pan (Mobile defaults to 0.75 for a spacious, distant aerial view)
  useEffect(() => {
    const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    setZoom(isMobileScreen ? 0.75 : 1);
    setPan({ x: 0, y: 0 });
  }, [gpxFile, categoryId]);

  // Parse GPX trackpoints and calculate projected SVG coordinates
  useEffect(() => {
    if (!gpxFile) {
      setRouteData(null);
      setStatus('idle');
      return;
    }

    let isCancelled = false;
    setStatus('loading');

    const fetchAndParseGpx = async () => {
      try {
        const res = await fetch(gpxFile);
        if (isCancelled) return;
        if (!res.ok) throw new Error('GPX file could not be loaded');
        const gpxText = await res.text();
        if (isCancelled) return;

        const parser = new DOMParser();
        const xml = parser.parseFromString(gpxText, 'text/xml');
        const trkpts = xml.querySelectorAll('trkpt');

        if (trkpts.length === 0) throw new Error('No track points found in GPX');

        const rawPoints: { lat: number; lon: number; ele: number }[] = [];
        let minLat = Infinity;
        let maxLat = -Infinity;
        let minLon = Infinity;
        let maxLon = -Infinity;
        let minAlt = Infinity;
        let maxAlt = -Infinity;
        let totalGain = 0;
        let prevAlt: number | null = null;

        trkpts.forEach((pt) => {
          const lat = parseFloat(pt.getAttribute('lat') || '0');
          const lon = parseFloat(pt.getAttribute('lon') || '0');
          const eleText = pt.querySelector('ele')?.textContent;
          const ele = eleText ? parseFloat(eleText) : 0;

          if (lat && lon) {
            rawPoints.push({ lat, lon, ele });
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
            if (lon < minLon) minLon = lon;
            if (lon > maxLon) maxLon = lon;

            if (!isNaN(ele)) {
              if (ele < minAlt) minAlt = ele;
              if (ele > maxAlt) maxAlt = ele;
              if (prevAlt !== null && ele > prevAlt) {
                totalGain += ele - prevAlt;
              }
              prevAlt = ele;
            }
          }
        });

        if (rawPoints.length === 0) throw new Error('No valid coordinate points');
        if (isCancelled) return;

        // Virtual SVG ViewBox specifications (Spacious margins give an expansive aerial bird's-eye overview)
        const WIDTH = 960;
        const HEIGHT = 620;
        const PADDING_X = 180;
        const PADDING_Y = 135;

        // Geographic Mercator aspect ratio correction based on mean latitude
        const midLatRad = ((minLat + maxLat) / 2) * (Math.PI / 180);
        const cosMidLat = Math.cos(midLatRad);

        const latSpan = maxLat - minLat || 0.0001;
        const lonSpan = (maxLon - minLon) * cosMidLat || 0.0001;

        const usableW = WIDTH - PADDING_X * 2;
        const usableH = HEIGHT - PADDING_Y * 2;

        // Scale factor preserving real-world geographical proportions
        const scale = Math.min(usableW / lonSpan, usableH / latSpan);

        const renderedW = lonSpan * scale;
        const renderedH = latSpan * scale;

        // Center vector route within the canvas
        const offsetX = PADDING_X + (usableW - renderedW) / 2;
        const offsetY = PADDING_Y + (usableH - renderedH) / 2;

        let accumulatedDist = 0;
        let summitIndex = 0;
        let summitEle = -Infinity;

        // Haversine distance helper
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
          const R = 6371;
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c;
        };

        const projectedPoints: ParsedPoint[] = rawPoints.map((pt, i) => {
          const x = offsetX + (pt.lon - minLon) * cosMidLat * scale;
          // SVG Y axis is inverted (north is top, latitude goes down)
          const y = offsetY + (maxLat - pt.lat) * scale;

          if (i > 0) {
            accumulatedDist += haversine(rawPoints[i - 1].lat, rawPoints[i - 1].lon, pt.lat, pt.lon);
          }

          if (pt.ele > summitEle) {
            summitEle = pt.ele;
            summitIndex = i;
          }

          return {
            lat: pt.lat,
            lon: pt.lon,
            ele: Math.round(pt.ele),
            x: Math.round(x * 10) / 10,
            y: Math.round(y * 10) / 10,
            distKm: Math.round(accumulatedDist * 10) / 10,
          };
        });

        // Generate SVG Path Definition (M x y L x y ...)
        const pathD = projectedPoints.reduce((acc, pt, idx) => {
          return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
        }, '');

        if (!isCancelled) {
          setRouteData({
            points: projectedPoints,
            pathD,
            startPoint: projectedPoints[0],
            finishPoint: projectedPoints[projectedPoints.length - 1],
            summitPoint: projectedPoints[summitIndex],
            minAlt: Math.round(minAlt),
            maxAlt: Math.round(maxAlt),
            totalGain: Math.round(totalGain),
            viewBox: { width: WIDTH, height: HEIGHT },
          });
          setStatus('success');
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Vector HUD route parse error:', err);
          setStatus('error');
        }
      }
    };

    fetchAndParseGpx();

    return () => {
      isCancelled = true;
    };
  }, [gpxFile]);

  // Zoom handlers (Supports deep zoom-out down to 0.35 for expansive bird's-eye route view)
  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(3.5, Math.round((z + 0.2) * 100) / 100));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(0.35, Math.round((z - 0.2) * 100) / 100));
  }, []);

  const handleResetView = useCallback(() => {
    const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    setZoom(isMobileScreen ? 0.75 : 1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Mouse drag pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile touch drag pan interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((z) => Math.max(0.35, Math.min(3.5, Math.round((z + delta) * 100) / 100)));
  };

  // Calculate dynamic transform string
  const transformStyle = useMemo(() => {
    return `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
  }, [pan, zoom]);

  // Virtual route display fallback
  if (!gpxFile) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500 bg-[#0B0C0E] p-6 text-center select-none">
        <span className="font-mono text-xs uppercase tracking-widest text-[#FA6D0B] font-bold">
          {t('RUTE VIRTUAL LOKAL · 19 CHAPTER', 'LOCAL VIRTUAL ROUTE · 19 CHAPTERS')}
        </span>
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 max-w-xs">
          {t('Rute ditentukan mandiri oleh masing-masing regional chapter', 'Route is determined independently by each regional chapter')}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onWheel={handleWheel}
      className={`relative w-full h-full min-h-0 flex flex-col bg-[#0B0C0E] overflow-hidden select-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* 1. Tactical Telemetry Grid Background (Strictly GX-ID Dark UI DNA) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(250, 109, 11, 0.11) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(250, 109, 11, 0.11) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Ambient Radial Backlight in Center */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.08)_0%,transparent_75%)] z-0" />

      {/* 2. Top-Left Floating Controls: Zoom + Reset + GPX Lock Action (Pure Typography, No SaaS Clutter) */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2 pointer-events-auto touch-auto">
        <div className="flex items-center bg-black/85 backdrop-blur-md border border-white/10 rounded-lg p-0.5 font-mono text-[9px] shadow-lg">
          <button
            type="button"
            onClick={handleZoomIn}
            className="px-2 py-0.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-all font-bold cursor-pointer"
            title={t('Perbesar peta', 'Zoom in')}
          >
            +
          </button>
          <span className="text-white/20 select-none">|</span>
          <button
            type="button"
            onClick={handleZoomOut}
            className="px-2 py-0.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-all font-bold cursor-pointer"
            title={t('Perkecil peta', 'Zoom out')}
          >
            −
          </button>
          <span className="text-white/20 select-none">|</span>
          <button
            type="button"
            onClick={handleResetView}
            className="px-2 py-0.5 text-[#FA6D0B] hover:text-white hover:bg-[#FA6D0B]/20 rounded transition-all font-black cursor-pointer"
            title={t('Reset posisi peta', 'Reset view')}
          >
            RESET
          </button>
        </div>

        {isLocked ? (
          <button
            type="button"
            onClick={() => setShowLockModal(true)}
            className="px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300 bg-black/85 hover:bg-white/10 border border-white/10 hover:border-[#FA6D0B] backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95 whitespace-nowrap"
            title={t('File GPX dikunci hingga H-2 (17 Des 2026, 00:00 WIB)', 'GPX file locked until D-2 (17 Dec 2026, 00:00 WIB)')}
          >
            {t('TERKUNCI · H-2 (17 DES)', 'LOCKED · D-2 (17 DEC)')}
          </button>
        ) : (
          <a
            href={`/api/gpx/download?category=${categoryId}`}
            download={gpxFileName}
            className="px-3 py-1 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all shadow-[0_0_12px_rgba(250,109,11,0.45)] whitespace-nowrap"
          >
            DOWNLOAD GPX
          </a>
        )}
      </div>

      {/* 3. Top-Right Orientation HUD (Compass Rose & Sector) */}
      <div className="absolute top-3 right-3 z-30 pointer-events-none bg-black/85 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1 font-mono text-[9px] text-slate-400 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="text-[#FA6D0B] font-black">[N]</span>
          <span className="text-white font-bold tracking-widest">GRID 000°</span>
          <span className="text-white/20">·</span>
          <span className="text-slate-400">JONGGOL CORRIDOR</span>
        </div>
      </div>

      {/* 4. Loading Status Indicator */}
      {(status === 'loading' || status === 'idle') && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-[#090A0D]/90 backdrop-blur-sm">
          <div className="w-5 h-5 border-2 border-[#FA6D0B] border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            {t('MEMUAT RUTE VECTOR GPX...', 'LOADING GPX VECTOR ROUTE...')}
          </span>
        </div>
      )}

      {/* 5. Error Status Indicator */}
      {status === 'error' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-[#090A0D]/95 px-4 text-center">
          <span className="text-xs font-mono font-black text-[#FA6D0B] uppercase tracking-wider">
            {t('STATUS · GAGAL MEMUAT PETA VECTOR', 'STATUS · FAILED TO LOAD VECTOR MAP')}
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            {t('PERIKSA KONEKSI INTERNET ATAU BERKAS GPX', 'PLEASE CHECK CONNECTION OR GPX FILE')}
          </span>
        </div>
      )}

      {/* 6. Pure SVG Vector Route Radar Canvas (100% Contained, Never Cropped) */}
      {routeData && status === 'success' && (
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
          style={{ transform: transformStyle, transformOrigin: 'center center' }}
        >
          <svg
            viewBox={`0 0 ${routeData.viewBox.width} ${routeData.viewBox.height}`}
            className="w-full h-full max-w-full max-h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Neon Glow Filter */}
              <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur1" />
                <feGaussianBlur stdDeviation="12" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* A. Ambient Outer Halo (Neon Orange Atmosphere) */}
            <path
              d={routeData.pathD}
              fill="none"
              stroke={accentColor}
              strokeWidth="10"
              strokeOpacity="0.22"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#vectorGlow)"
            />

            {/* B. Core High-Vis Vector Route Line */}
            <path
              d={routeData.pathD}
              fill="none"
              stroke={accentColor}
              strokeWidth="3.2"
              strokeOpacity="0.95"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* C. Razor Sharp Center Track Line */}
            <path
              d={routeData.pathD}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.1"
              strokeOpacity="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* D. Summit Elevation Apex Marker */}
            <g
              transform={`translate(${routeData.summitPoint.x}, ${routeData.summitPoint.y})`}
              className="select-none pointer-events-none"
            >
              <circle r="4" fill="#FA6D0B" stroke="#0D0E11" strokeWidth="1.5" />
              <rect
                x="-38"
                y="-24"
                width="76"
                height="15"
                rx="3"
                fill="rgba(13, 14, 17, 0.92)"
                stroke="rgba(250, 109, 11, 0.45)"
                strokeWidth="1"
              />
              <text
                x="0"
                y="-13"
                fill="#FA6D0B"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                ▲ {routeData.maxAlt}M MDPL
              </text>
            </g>

            {/* E. Start Beacon (KM 0 · Pure White Radar Node) */}
            <g
              transform={`translate(${routeData.startPoint.x}, ${routeData.startPoint.y})`}
              className="select-none pointer-events-none"
            >
              <circle
                r="13"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                className="animate-ping"
                style={{ animationDuration: '2.5s' }}
              />
              <circle r="5" fill="#FFFFFF" stroke="#0D0E11" strokeWidth="2" />
              <rect
                x="-34"
                y="10"
                width="68"
                height="15"
                rx="3"
                fill="rgba(13, 14, 17, 0.95)"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="1"
              />
              <text
                x="0"
                y="21"
                fill="#FFFFFF"
                fontSize="7.5"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                START · KM 0
              </text>
            </g>

            {/* F. Finish Beacon (LRT Harjamukti · Electric Orange Radar Node) */}
            <g
              transform={`translate(${routeData.finishPoint.x}, ${routeData.finishPoint.y})`}
              className="select-none pointer-events-none"
            >
              <circle
                r="13"
                fill="none"
                stroke={accentColor}
                strokeWidth="1.5"
                strokeOpacity="0.45"
                className="animate-ping"
                style={{ animationDuration: '2.5s', animationDelay: '0.8s' }}
              />
              <circle r="5" fill={accentColor} stroke="#FFFFFF" strokeWidth="2" />
              <rect
                x="-36"
                y="-25"
                width="72"
                height="15"
                rx="3"
                fill="rgba(13, 14, 17, 0.95)"
                stroke="rgba(250, 109, 11, 0.55)"
                strokeWidth="1"
              />
              <text
                x="0"
                y="-14"
                fill={accentColor}
                fontSize="7.5"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                FINISH · ABBEY
              </text>
            </g>
          </svg>
        </div>
      )}

      {/* 7. Bottom-Left Live Telemetry HUD Chip (Strictly RULES.md Section 7.4) */}
      {routeData && status === 'success' && (
        <div className="absolute bottom-3 left-3 z-30 pointer-events-auto bg-black/85 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1.5 font-mono text-[9px] text-slate-300 shadow-xl flex flex-wrap items-center gap-1.5 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] shadow-[0_0_8px_#FA6D0B]" />
          <span className="font-bold text-white tracking-wider uppercase">
            GPX LIVE · {categoryKm} ({gpxTotalKm})
          </span>
          <span className="text-white/20">·</span>
          <span>{routeData.points.length.toLocaleString()} PTS</span>
          <span className="text-white/20">·</span>
          <span>ALT {routeData.minAlt}M — {routeData.maxAlt}M</span>
          <span className="text-white/20">·</span>
          <span className="text-[#FA6D0B] font-bold">GAIN +{routeData.totalGain}M</span>
          {prologKm > 0 && (
            <>
              <span className="text-white/20">·</span>
              <span className="text-[#FA6D0B] font-bold">+{prologKm}KM PROLOG</span>
            </>
          )}
        </div>
      )}

      {/* 8. Modal Protokol Rilis GPX (Strictly Pure Typography & No Decorative Icons) */}
      {showLockModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowLockModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#0D0E11] rounded-2xl p-6 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#FA6D0B] shadow-[0_0_20px_#FA6D0B]" />

            {/* Header */}
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block mb-1">
                {t('PROTOKOL NAVIGASI · GRINDURANCE 2026', 'NAVIGATION PROTOCOL · GRINDURANCE 2026')}
              </span>
              <h3 className="font-display italic text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                {t('FILE GPX DIKUNCI HINGGA H-2', 'GPX FILE LOCKED UNTIL D-2')}
              </h3>
            </div>

            {/* Telemetry specs box */}
            <div className="my-5 p-4 rounded-xl bg-white/[0.04] space-y-2 font-mono text-xs shadow-sm">
              <div className="flex justify-between items-center text-slate-400">
                <span>{t('STATUS FILE:', 'FILE STATUS:')}</span>
                <span className="text-[#FA6D0B] font-bold">
                  {isLocked
                    ? t('TERKUNCI (SAFETY CLEARANCE)', 'LOCKED (SAFETY CLEARANCE)')
                    : t('TERSEDIA UNTUK DIUNDUH', 'READY FOR DOWNLOAD')}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>{t('JADWAL RILIS:', 'RELEASE SCHEDULE:')}</span>
                <span className="text-white font-bold">KAMIS, 17 DESEMBER 2026 · 00:00 WIB</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>{t('RACE DAY:', 'RACE DAY:')}</span>
                <span className="text-white font-bold">SABTU, 19 DESEMBER 2026</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>{t('KATEGORI:', 'CATEGORY:')}</span>
                <span className="text-slate-300 font-bold">
                  {categoryKm} ({gpxTotalKm})
                </span>
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
                  'CATATAN: Peta live vector HUD di layar tetap aktif 100% dan dapat dijelajahi untuk mempelajari profil lintasan.',
                  'NOTE: Live vector HUD map remains fully interactive for reconnaissance and contour inspection.'
                )}
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={() => setShowLockModal(false)}
              className="w-full py-3.5 rounded-full bg-[#FA6D0B] hover:bg-[#DE5A00] text-black font-mono font-black uppercase tracking-wider text-xs transition-all active:scale-95 shadow-[0_0_20px_rgba(250,109,11,0.35)] cursor-pointer"
            >
              {t('MENGERTI · KEMBALI KE PETA VECTOR', 'UNDERSTOOD · RETURN TO VECTOR MAP')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
