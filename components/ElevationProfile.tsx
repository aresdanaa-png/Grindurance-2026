'use client';

import { useState, useRef, useMemo } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { CategoryData } from '@/lib/data/categories';
import { ELEVATION_PROFILES, ElevationPoint } from '@/lib/data/elevationProfiles';

interface ElevationProfileProps {
  category: CategoryData;
  accentColor?: string;
  onHoverPoint?: (pt: ElevationPoint | null) => void;
}

export default function ElevationProfile({
  category,
  accentColor = '#FA6D0B',
  onHoverPoint,
}: ElevationProfileProps) {
  const { t } = useLanguage();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const rawPoints = ELEVATION_PROFILES[category.id] || [];

  // SVG dimensions
  const viewBoxWidth = 600;
  const viewBoxHeight = 150;
  const padding = { top: 22, right: 16, bottom: 26, left: 38 };

  const plotWidth = viewBoxWidth - padding.left - padding.right;
  const plotHeight = viewBoxHeight - padding.top - padding.bottom;

  // Compute elevation domain
  const { minEle, maxEle, maxDist, points } = useMemo(() => {
    if (rawPoints.length === 0) {
      return { minEle: 0, maxEle: 100, maxDist: 100, points: [] };
    }

    let min = Infinity;
    let max = -Infinity;
    let maxD = rawPoints[rawPoints.length - 1].d || 1;

    rawPoints.forEach((p) => {
      if (p.e < min) min = p.e;
      if (p.e > max) max = p.e;
    });

    // Add 10% breathing room to max
    const elevationSpan = max - min;
    const paddedMax = Math.ceil((max + Math.max(elevationSpan * 0.15, 30)) / 50) * 50;
    const paddedMin = Math.max(0, Math.floor((min - Math.max(elevationSpan * 0.1, 10)) / 20) * 20);

    return {
      minEle: paddedMin,
      maxEle: paddedMax,
      maxDist: maxD,
      points: rawPoints,
    };
  }, [rawPoints]);

  // Coordinates mapping
  const getX = (dist: number) => {
    if (maxDist <= 0) return padding.left;
    return padding.left + (dist / maxDist) * plotWidth;
  };

  const getY = (ele: number) => {
    const range = maxEle - minEle || 1;
    return padding.top + plotHeight - ((ele - minEle) / range) * plotHeight;
  };

  // SVG Paths
  const { areaPath, linePath } = useMemo(() => {
    if (points.length < 2) return { areaPath: '', linePath: '' };

    const firstX = getX(points[0].d);
    const firstY = getY(points[0].e);
    const bottomY = padding.top + plotHeight;

    let pathD = `M ${firstX} ${firstY}`;

    for (let i = 1; i < points.length; i++) {
      const x = getX(points[i].d);
      const y = getY(points[i].e);
      pathD += ` L ${x} ${y}`;
    }

    const lastX = getX(points[points.length - 1].d);
    const areaD = `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    return { areaPath: areaD, linePath: pathD };
  }, [points, minEle, maxEle, maxDist]);

  // Horizontal Grid Lines
  const gridLines = useMemo(() => {
    const lines = [];
    const step = (maxEle - minEle) / 3;
    for (let i = 0; i <= 3; i++) {
      const ele = Math.round(minEle + step * i);
      const y = getY(ele);
      lines.push({ ele, y });
    }
    return lines;
  }, [minEle, maxEle]);

  // X Axis Ticks (0%, 25%, 50%, 75%, 100%)
  const xTicks = useMemo(() => {
    if (maxDist <= 0) return [];
    return [0, 0.25, 0.5, 0.75, 1].map((pct) => {
      const d = Math.round(maxDist * pct);
      return { dist: d, x: getX(d) };
    });
  }, [maxDist]);

  // Handle Scrubbing
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || points.length === 0) return;

    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * viewBoxWidth;

    // Constrain to plot area
    const clampedX = Math.max(padding.left, Math.min(padding.left + plotWidth, svgX));
    const targetDist = ((clampedX - padding.left) / plotWidth) * maxDist;

    // Find nearest point
    let closestIdx = 0;
    let closestDiff = Infinity;
    points.forEach((p, idx) => {
      const diff = Math.abs(p.d - targetDist);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIdx = idx;
      }
    });

    setHoverIndex(closestIdx);
    onHoverPoint?.(points[closestIdx]);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    onHoverPoint?.(null);
  };

  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  if (category.id === 'VIRTUAL' || points.length === 0) {
    return (
      <div className="w-full rounded-xl bg-black/45 backdrop-blur-md border border-white/10 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#FA6D0B] uppercase">
            {t('PROFIL ELEVASI · MANDIRI', 'ELEVATION PROFILE · SELF-PLANNED')}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            19 CHAPTER NASIONAL
          </span>
        </div>
        <div className="py-6 text-center space-y-1">
          <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            {t('RUTE MANDIRI REGIONAL', 'REGIONAL SELF-PLANNED ROUTE')}
          </div>
          <p className="text-[11px] font-sans text-slate-400 max-w-sm mx-auto leading-relaxed">
            {t(
              'Profil elevasi dan kontur tanjakan ditentukan secara mandiri oleh masing-masing regional chapter di luar Jabodetabek.',
              'Elevation profiles and climbing contours are designed independently by respective GX-ID regional chapters.'
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 p-4 sm:p-5 shadow-[0_15px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between select-none">
      
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <h4 className="font-display italic text-sm sm:text-base font-black uppercase text-white tracking-wide">
            {t('PROFIL ELEVASI RESMI', 'OFFICIAL ELEVATION PROFILE')} · {category.km}
          </h4>
        </div>

        {/* Telemetry Stats Pill */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          <span className="text-white font-bold">{category.elevation} {t('GAIN', 'GAIN')}</span>
          <span className="text-white/20">·</span>
          <span>MAX <strong className="text-[#FA6D0B]">{maxEle}M</strong></span>
          <span className="text-white/20">·</span>
          <span>MIN <strong className="text-slate-300">{minEle}M</strong></span>
        </div>
      </div>

      {/* Interactive SVG Chart Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-auto cursor-crosshair block overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={(e) => {
            if (!svgRef.current || points.length === 0) return;
            const touch = e.touches[0];
            const rect = svgRef.current.getBoundingClientRect();
            const mouseX = touch.clientX - rect.left;
            const svgX = (mouseX / rect.width) * viewBoxWidth;
            const clampedX = Math.max(padding.left, Math.min(padding.left + plotWidth, svgX));
            const targetDist = ((clampedX - padding.left) / plotWidth) * maxDist;
            let closestIdx = 0;
            let closestDiff = Infinity;
            points.forEach((p, idx) => {
              const diff = Math.abs(p.d - targetDist);
              if (diff < closestDiff) {
                closestDiff = diff;
                closestIdx = idx;
              }
            });
            setHoverIndex(closestIdx);
            onHoverPoint?.(points[closestIdx]);
          }}
          onTouchEnd={() => {
            setHoverIndex(null);
            onHoverPoint?.(null);
          }}
        >
          <defs>
            {/* Athletic High-Contrast Gradient Fill */}
            <linearGradient id={`elevGradient-${category.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
              <stop offset="45%" stopColor={accentColor} stopOpacity="0.22" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.01" />
            </linearGradient>

            {/* Glowing Stroke Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid Lines & Y-Axis Labels */}
          {gridLines.map((line, idx) => (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={line.y}
                x2={padding.left + plotWidth}
                y2={line.y}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={padding.left - 6}
                y={line.y + 3}
                textAnchor="end"
                className="fill-slate-500 font-mono text-[8px] sm:text-[9px]"
              >
                {line.ele}m
              </text>
            </g>
          ))}

          {/* Area Fill */}
          {areaPath && (
            <path
              key={`area-${category.id}`}
              d={areaPath}
              fill={`url(#elevGradient-${category.id})`}
              className="animate-fade-in-area transition-all duration-300"
            />
          )}

          {/* Main Ridge Line (Kinetically self-drawing on category change) */}
          {linePath && (
            <path
              key={`ridge-${category.id}`}
              d={linePath}
              fill="none"
              stroke={accentColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              className="animate-draw-ridge transition-all duration-300"
            />
          )}

          {/* Station Pins along the route */}
          {category.stations?.map((station, sIdx) => {
            const kmMatch = station.km.match(/\d+(\.\d+)?/);
            if (!kmMatch) return null;
            const stationKm = parseFloat(kmMatch[0]);
            if (stationKm < 0 || stationKm > maxDist) return null;

            const sx = getX(stationKm);
            const isFinish = station.type === 'FINISH';
            const isKom = station.type === 'KOM';
            const pinColor = isKom ? '#EAB308' : isFinish ? accentColor : '#94A3B8';

            return (
              <g key={sIdx} className="pointer-events-none">
                <line
                  x1={sx}
                  y1={padding.top}
                  x2={sx}
                  y2={padding.top + plotHeight}
                  stroke={pinColor}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity={0.4}
                />
                <circle cx={sx} cy={padding.top + 2} r="2.5" fill={pinColor} />
                <text
                  x={sx}
                  y={padding.top - 5}
                  textAnchor="middle"
                  className="font-mono text-[7px] uppercase font-bold"
                  fill={pinColor}
                >
                  {station.type === 'START' ? 'START' : station.type === 'FINISH' ? 'FINISH' : station.type}
                </text>
              </g>
            );
          })}

          {/* Interactive Crosshair & Dot with Radar Pulse */}
          {activePoint && (
            <g className="pointer-events-none">
              {/* Vertical Crosshair Line */}
              <line
                x1={getX(activePoint.d)}
                y1={padding.top}
                x2={getX(activePoint.d)}
                y2={padding.top + plotHeight}
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                opacity={0.8}
              />

              {/* Radar Ping Ripple */}
              <circle
                cx={getX(activePoint.d)}
                cy={getY(activePoint.e)}
                r="10"
                fill={accentColor}
                opacity={0.25}
                className="animate-ping"
              />
              <circle
                cx={getX(activePoint.d)}
                cy={getY(activePoint.e)}
                r="5.5"
                fill={accentColor}
                opacity={0.4}
              />
              <circle
                cx={getX(activePoint.d)}
                cy={getY(activePoint.e)}
                r="3.5"
                fill="#FFFFFF"
                stroke={accentColor}
                strokeWidth="2"
              />
            </g>
          )}

          {/* X Axis Bottom Line & Ticks */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={padding.left + plotWidth}
            y2={padding.top + plotHeight}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />

          {xTicks.map((tick, idx) => (
            <g key={idx}>
              <line
                x1={tick.x}
                y1={padding.top + plotHeight}
                x2={tick.x}
                y2={padding.top + plotHeight + 4}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
              />
              <text
                x={tick.x}
                y={padding.top + plotHeight + 14}
                textAnchor={idx === 0 ? 'start' : idx === xTicks.length - 1 ? 'end' : 'middle'}
                className="fill-slate-500 font-mono text-[8px] sm:text-[9px]"
              >
                {tick.dist} km
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Telemetry Box on Hover */}
        {activePoint && (
          <div
            className="absolute top-2 pointer-events-none z-20 transition-all duration-75 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/90 border border-[#FA6D0B]/60 shadow-[0_0_15px_rgba(250,109,11,0.35)]"
            style={{
              left: Math.max(10, Math.min(viewBoxWidth - 140, (getX(activePoint.d) / viewBoxWidth) * 100)) + '%',
              transform: 'translateX(-50%)',
            }}
          >
            <span className="text-[10px] font-mono font-black text-white">
              KM {activePoint.d}
            </span>
            <span className="text-white/30 text-[9px]">·</span>
            <span className="text-[10px] font-mono font-bold text-[#FA6D0B]">
              {activePoint.e}M MDPL
            </span>
          </div>
        )}
      </div>

      {/* Footer Scrubber Hint */}
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest pt-1 border-t border-white/[0.06] mt-1">
        <span>{t('GESER KURSOR UNTUK INSPEKSI ELEVASI', 'HOVER / DRAG TO INSPECT ELEVATION')}</span>
        <span className="text-slate-400 font-bold">{category.maxAlt}</span>
      </div>

    </div>
  );
}
