'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  Users, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  Compass, 
  Coffee,
  CheckCircle2,
  ChevronDown,
  Mountain,
  Gauge,
  TrendingUp,
  Award,
  Zap,
  Activity,
  Calendar,
  Check,
  AlertTriangle,
  Flag,
  Layers,
  Timer,
  Radio,
  FileText
} from 'lucide-react';

interface StationItem {
  km: string;
  name: string;
  type: 'START' | 'WS' | 'CP' | 'KOM' | 'PITSTOP' | 'FINISH';
  desc?: string;
}

interface PriceTier {
  medal: string;
  jersey: string;
  pairMedal?: string;
  pairJersey?: string;
}

interface CategoryData {
  id: string;
  tabLabel: string;
  km: string;
  watermark: string;
  subtitle: string;
  title: string;
  titleNote?: string;
  elevation: string;
  elevationMeters: number;
  cot: string;
  wave: string;
  quota: string;
  tag: string;
  format: string;
  specialRules: string;
  photo: string;
  // Legacy fields kept for compatibility
  priceMedal: string;
  priceJersey: string;
  pairPriceMedal?: string;
  pairPriceJersey?: string;
  // New tiered pricing
  earlyBird: PriceTier;
  regular: PriceTier;
  desc: string;
  routeHighlights: string;
  terrain: string;
  gearTip: string;
  isRace?: boolean;
  maxAlt: string;
  avgGradient: string;
  maxGradient: string;
  surfaceBreakdown: { asphalt: string; gravel: string; unpaved: string };
  routeSvgPath: string;
  pinCoord: { x: number; y: number };
  elevationProfilePath: string;
  elevationFillPath: string;
  yAxisTicks: [string, string, string];
  xAxisTicks: string[];
  stations: StationItem[];
}

export default function HomePage() {
  const [selectedId, setSelectedId] = useState<string>('120_PAIR');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeScheduleTab, setActiveScheduleTab] = useState<'raceday' | 'praevent' | 'matrix'>('raceday');

  // Early Bird deadline: 15 November 2025 23:59:59 WIB (UTC+7)
  const EARLY_BIRD_DEADLINE = new Date('2025-11-15T16:59:59Z'); // UTC equivalent
  const [earlyBirdCountdown, setEarlyBirdCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, active: false });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = EARLY_BIRD_DEADLINE.getTime() - now.getTime();
      if (diff <= 0) {
        setEarlyBirdCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, active: false });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setEarlyBirdCountdown({ days, hours, minutes, seconds, active: true });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCategorySelect = (id: string) => {
    if (id === selectedId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedId(id);
      setIsTransitioning(false);
    }, 150);
  };

  const categories: CategoryData[] = [
    {
      id: '60',
      tabLabel: '60 KM',
      km: '60 KM',
      watermark: '60K',
      subtitle: 'FUN GRAVEL',
      title: 'Fun Gravel 60',
      elevation: '+450 m',
      elevationMeters: 450,
      cot: '7 Jam',
      wave: '07:00 WIB',
      quota: '150 Peserta',
      tag: 'REKREASI & PEMULA',
      format: 'Fun Gravel / Non-Kompetitif',
      specialRules: 'Ramah Sepeda Lipat (Seli), Hybrid & Pemula',
      photo: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 225.000',
      priceJersey: 'Rp 275.000',
      earlyBird: { medal: 'Rp 225.000', jersey: 'Rp 275.000' },
      regular: { medal: 'Rp 250.000', jersey: 'Rp 300.000' },
      desc: 'Lintasan tanah pedesaan Jonggol & aspal halus Cibubur. Sangat ideal bagi pesepeda yang baru pertama kali mencicipi gravel serta pengguna sepeda lipat.',
      routeHighlights: 'Cibubur Basecamp → Pasir Angin → Jonggol Lowland → ABEEY Coffee Finish',
      terrain: 'Aspal Pinggiran Kota & Makadam Halus Pasir Angin',
      gearTip: 'Ramah Sepeda Lipat (Seli 20"), Hybrid, & Gravel Pemula',
      maxAlt: '380 m MDPL',
      avgGradient: '3.2% Rata-rata',
      maxGradient: '11% Maksimum',
      surfaceBreakdown: { asphalt: '65%', gravel: '25%', unpaved: '10%' },
      routeSvgPath: 'M 305 60 L 325 78 L 348 108 L 342 145 L 358 185 L 332 232 L 288 268 L 242 278 L 202 258 L 160 274 L 126 238 L 102 195 L 118 150 L 148 122 L 132 88 L 172 58 L 216 64 L 262 48 Z',
      pinCoord: { x: 305, y: 60 },
      elevationProfilePath: 'M 20 86 L 35 84 L 55 80 L 75 82 L 95 72 L 115 76 L 140 65 L 165 70 L 190 60 L 220 54 L 250 62 L 280 70 L 310 76 L 340 80 L 365 84 L 380 86',
      elevationFillPath: 'M 20 86 L 35 84 L 55 80 L 75 82 L 95 72 L 115 76 L 140 65 L 165 70 L 190 60 L 220 54 L 250 62 L 280 70 L 310 76 L 340 80 L 365 84 L 380 86 L 380 94 L 20 94 Z',
      yAxisTicks: ['380m', '250m', '120m'],
      xAxisTicks: ['0.0km', '15.0km', '30.0km', '45.0km', '60.0km'],
      stations: [
        { km: 'KM 0', name: 'Start ABEEY Coffee & LRT', type: 'START', desc: 'Pelepasan 07:00 WIB' },
        { km: 'KM 28', name: 'WS#1 Pasir Angin (Refill Air)', type: 'WS', desc: 'Water station mandiri' },
        { km: 'KM 45', name: 'CP#2 Jonggol Lowland', type: 'CP', desc: 'Pemeriksaan rute' },
        { km: 'KM 60', name: 'Finish Lounge ABEEY', type: 'FINISH', desc: 'Pengambilan medali' },
      ],
    },
    {
      id: '80',
      tabLabel: '80 KM',
      km: '80 KM',
      watermark: '80K',
      subtitle: 'FUN GRAVEL',
      title: 'Fun Gravel 80',
      elevation: '+750 m',
      elevationMeters: 750,
      cot: '9 Jam',
      wave: '07:00 WIB',
      quota: '150 Peserta',
      tag: 'EKSPLORASI SCENIC',
      format: 'Fun Gravel / Non-Kompetitif',
      specialRules: 'Rolling Terrain · Ban Rekomendasi 38c+',
      photo: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 275.000',
      priceJersey: 'Rp 325.000',
      earlyBird: { medal: 'Rp 275.000', jersey: 'Rp 325.000' },
      regular: { medal: 'Rp 300.000', jersey: 'Rp 350.000' },
      desc: 'Menjelajahi persawahan Cileungsi dan makadam khas Pemandian Sodong. Etape peningkatan jarak ideal dengan rolling hills berirama dinamis.',
      routeHighlights: 'Cileungsi → Sodong Makadam → Klapanunggal Ridge → ABEEY Coffee Finish',
      terrain: 'Rolling Hills, Persawahan Cileungsi & Makadam Pemandian Sodong',
      gearTip: 'Rekomendasi Ban 38c+ · Joy of Riding & Scenic Gravel',
      maxAlt: '620 m MDPL',
      avgGradient: '4.5% Rata-rata',
      maxGradient: '14% Maksimum',
      surfaceBreakdown: { asphalt: '50%', gravel: '35%', unpaved: '15%' },
      routeSvgPath: 'M 312 55 L 338 68 L 358 102 L 368 145 L 348 186 L 360 224 L 330 268 L 290 292 L 250 285 L 220 305 L 175 278 L 150 240 L 110 215 L 122 165 L 105 128 L 138 95 L 176 78 L 222 90 L 270 65 Z',
      pinCoord: { x: 312, y: 55 },
      elevationProfilePath: 'M 20 88 L 35 85 L 50 82 L 70 78 L 90 72 L 115 76 L 140 60 L 165 66 L 195 50 L 225 55 L 250 48 L 280 62 L 310 70 L 335 78 L 360 84 L 380 88',
      elevationFillPath: 'M 20 88 L 35 85 L 50 82 L 70 78 L 90 72 L 115 76 L 140 60 L 165 66 L 195 50 L 225 55 L 250 48 L 280 62 L 310 70 L 335 78 L 360 84 L 380 88 L 380 94 L 20 94 Z',
      yAxisTicks: ['620m', '370m', '120m'],
      xAxisTicks: ['0.0km', '20.0km', '40.0km', '60.0km', '80.0km'],
      stations: [
        { km: 'KM 0', name: 'Start ABEEY Coffee', type: 'START', desc: 'Pelepasan 07:00 WIB' },
        { km: 'KM 32', name: 'WS#1 Persawahan Cileungsi', type: 'WS', desc: 'Water station mandiri' },
        { km: 'KM 56', name: 'CP#2 Pemandian Sodong', type: 'CP', desc: 'Makadam berbatu' },
        { km: 'KM 68', name: 'WS#2 Klapanunggal Ridge', type: 'WS', desc: 'Titik hidrasi bukit' },
        { km: 'KM 80', name: 'Finish Lounge ABEEY', type: 'FINISH', desc: 'Finisher celebration' },
      ],
    },
    {
      id: '120_PAIR',
      tabLabel: '120 KM',
      km: '120 KM',
      watermark: '120K',
      subtitle: 'RACE (PODIUM)',
      title: 'Race 120',
      titleNote: '(Single & Pair Mix)',
      elevation: '+1,450 m',
      elevationMeters: 1450,
      cot: '11 Jam',
      wave: '06:00 WIB',
      quota: '100 Single / 30 Tim',
      tag: 'OFFICIAL RACE // PODIUM TOP 3',
      format: 'Official Race (Top 3 Podium)',
      specialRules: 'Mendukung Tim PAIR Mix 2 Pax · Handicap Waktu · Live Tracking GPS',
      photo: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 350.000',
      priceJersey: 'Rp 400.000',
      pairPriceMedal: 'Rp 600.000',
      pairPriceJersey: 'Rp 650.000',
      earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000', pairMedal: 'Rp 600.000', pairJersey: 'Rp 650.000' },
      regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000', pairMedal: 'Rp 700.000', pairJersey: 'Rp 750.000' },
      desc: 'Satu-satunya kategori balap kompetitif resmi dengan perebutan podium Top 3. Menaklukkan tanjakan koridor Jonggol–Sukamakmur dengan opsi tandem 2 pesepeda (Pair Mix).',
      routeHighlights: 'Cibubur → Jonggol Ridge → Tanjakan Sukamakmur → Sentul Descent → ABEEY Coffee Finish',
      terrain: 'Koridor Jonggol Ridge & Tanjakan Sukamakmur (+1.450 m)',
      gearTip: 'Live Tracking RaceRoute.id Wajib · Perebutan Podium Top 3 · Opsi Tandem PAIR MIX',
      isRace: true,
      maxAlt: '980 m MDPL',
      avgGradient: '6.8% Rata-rata',
      maxGradient: '19% Maksimum',
      surfaceBreakdown: { asphalt: '45%', gravel: '40%', unpaved: '15%' },
      routeSvgPath: 'M 315 65 L 326 50 L 334 58 L 322 75 L 312 82 L 322 92 L 340 98 L 354 104 L 366 100 L 352 118 L 342 128 L 350 148 L 346 160 L 352 178 L 346 195 L 338 212 L 320 230 L 324 246 L 312 258 L 305 272 L 290 285 L 272 296 L 276 308 L 260 324 L 244 332 L 236 328 L 246 312 L 258 304 L 250 288 L 262 270 L 274 252 L 258 245 L 246 230 L 242 212 L 252 198 L 246 182 L 236 172 L 248 158 L 232 152 L 218 165 L 202 175 L 188 185 L 178 178 L 184 165 L 172 158 L 164 168 L 152 155 L 158 140 L 148 132 L 156 118 L 148 108 L 158 92 L 152 82 L 162 70 L 176 68 L 184 80 L 195 72 L 192 58 L 204 46 L 214 44 L 216 58 L 228 50 L 238 60 L 248 54 L 256 68 L 270 70 L 280 82 L 295 76 L 304 84 Z',
      pinCoord: { x: 322, y: 75 },
      elevationProfilePath: 'M 20 86 L 26 82 L 34 84 L 42 78 L 48 88 L 54 84 L 62 90 L 68 76 L 74 86 L 82 66 L 90 74 L 96 64 L 104 60 L 112 52 L 118 64 L 124 58 L 132 62 L 140 68 L 148 68 L 156 72 L 164 68 L 172 74 L 180 66 L 188 70 L 196 64 L 204 60 L 210 52 L 216 66 L 222 58 L 228 54 L 234 68 L 240 56 L 246 64 L 252 68 L 260 76 L 268 72 L 276 74 L 284 78 L 292 80 L 300 82 L 308 84 L 316 80 L 324 86 L 332 82 L 340 84 L 348 82 L 356 86 L 364 82 L 372 84 L 380 84',
      elevationFillPath: 'M 20 86 L 26 82 L 34 84 L 42 78 L 48 88 L 54 84 L 62 90 L 68 76 L 74 86 L 82 66 L 90 74 L 96 64 L 104 60 L 112 52 L 118 64 L 124 58 L 132 62 L 140 68 L 148 68 L 156 72 L 164 68 L 172 74 L 180 66 L 188 70 L 196 64 L 204 60 L 210 52 L 216 66 L 222 58 L 228 54 L 234 68 L 240 56 L 246 64 L 252 68 L 260 76 L 268 72 L 276 74 L 284 78 L 292 80 L 300 82 L 308 84 L 316 80 L 324 86 L 332 82 L 340 84 L 348 82 L 356 86 L 364 82 L 372 84 L 380 84 L 380 94 L 20 94 Z',
      yAxisTicks: ['125m', '75m', '24m'],
      xAxisTicks: ['0.0km', '24.1km', '46.9km', '67.0km', '89.7km', '111.3km'],
      stations: [
        { km: 'KM 0', name: 'Start Wave 1 (06:00 WIB)', type: 'START', desc: 'Timing gate aktivasi' },
        { km: 'KM 42', name: 'CP#1 Jonggol Ridge', type: 'CP', desc: 'Geofencing check' },
        { km: 'KM 78', name: 'KOM Tanjakan Sukamakmur', type: 'KOM', desc: 'Puncak tanjakan +1.450m' },
        { km: 'KM 102', name: 'CP#4 Pitstop Wajib 30 Menit', type: 'PITSTOP', desc: 'Wajib jeda rest & nutrisi' },
        { km: 'KM 120', name: 'Podium Gate ABEEY', type: 'FINISH', desc: 'Awarding podium Top 3' },
      ],
    },
    {
      id: '150',
      tabLabel: '150 KM',
      km: '150 KM',
      watermark: '150K',
      subtitle: 'CROSS GRAVEL',
      title: 'Cross Gravel 150',
      elevation: '+2,100 m',
      elevationMeters: 2100,
      cot: '15 Jam',
      wave: '05:30 WIB',
      quota: '75 Peserta',
      tag: 'WAJIB PROLOG 30 KM',
      format: 'Cross Gravel Endurance',
      specialRules: 'Wajib Prolog 30 km (03:00–05:00 WIB) · Pitstop Wajib 30 Menit',
      photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 350.000',
      priceJersey: 'Rp 400.000',
      earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000' },
      regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000' },
      desc: 'Tantangan klasik veteran endurance menembus tanjakan ganda Sukamakmur dan turunan teknis berbatu di tengah guyuran musim hujan khas Jawa Barat.',
      routeHighlights: 'Prolog 30 km Subuh → Sukamakmur → Jonggol Loop → Puncak Dua → ABEEY Coffee Finish',
      terrain: 'Tanjakan Ganda Sukamakmur, Jalur Batu Puncak Dua & Sentul Loop',
      gearTip: 'Wajib Prolog 30 km (03:00–05:00 WIB) · Ban Min 38–40mm & Wet Lube',
      maxAlt: '1.240 m MDPL',
      avgGradient: '8.1% Rata-rata',
      maxGradient: '23% Maksimum',
      surfaceBreakdown: { asphalt: '35%', gravel: '45%', unpaved: '20%' },
      routeSvgPath: 'M 310 60 L 335 68 L 355 95 L 365 130 L 350 165 L 360 200 L 340 235 L 350 265 L 320 295 L 280 315 L 245 320 L 225 295 L 235 260 L 210 240 L 180 250 L 150 230 L 135 190 L 145 155 L 125 125 L 145 95 L 175 80 L 205 90 L 240 65 L 275 75 Z',
      pinCoord: { x: 310, y: 60 },
      elevationProfilePath: 'M 20 88 L 35 86 L 50 84 L 70 78 L 90 70 L 110 74 L 135 58 L 160 52 L 185 40 L 210 44 L 235 34 L 260 48 L 290 60 L 315 68 L 345 76 L 380 88',
      elevationFillPath: 'M 20 88 L 35 86 L 50 84 L 70 78 L 90 70 L 110 74 L 135 58 L 160 52 L 185 40 L 210 44 L 235 34 L 260 48 L 290 60 L 315 68 L 345 76 L 380 88 L 380 94 L 20 94 Z',
      yAxisTicks: ['1.240m', '680m', '120m'],
      xAxisTicks: ['0.0km', '30.0km', '65.0km', '105.0km', '150.0km'],
      stations: [
        { km: '03:00 WIB', name: 'Prolog 30 km Mandiri Subuh', type: 'START', desc: 'Validasi GPS scrutineering' },
        { km: 'KM 0', name: 'Wave Start ABEEY (05:30 WIB)', type: 'START', desc: 'Pelepasan fajar' },
        { km: 'KM 50', name: 'CP#1 Jonggol Rural', type: 'CP', desc: 'Pos verifikasi' },
        { km: 'KM 88', name: 'KOM Sukamakmur Summit', type: 'KOM', desc: 'Puncak elevasi ganda' },
        { km: 'KM 122', name: 'CP#4 Pitstop Wajib 30 Menit', type: 'PITSTOP', desc: 'Penalti 300% jika dilewati' },
        { km: 'KM 150', name: 'Finisher Gate ABEEY', type: 'FINISH', desc: 'Penyerahan medali' },
      ],
    },
    {
      id: '200',
      tabLabel: '200 KM',
      km: '200 KM',
      watermark: '200K',
      subtitle: 'ULTRA GRAVEL',
      title: 'Ultra Gravel 200',
      elevation: '+3,180 m',
      elevationMeters: 3180,
      cot: '19 Jam',
      wave: '05:30 WIB',
      quota: '50 Peserta',
      tag: 'ULTRA GRAVEL // NIGHT NAV',
      format: 'Ultra Gravel Endurance',
      specialRules: 'Prolog 30 km · Night Navigation · Lampu Depan Ganda >500lm & Rompi Reflektif',
      photo: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 350.000',
      priceJersey: 'Rp 400.000',
      earlyBird: { medal: 'Rp 350.000', jersey: 'Rp 400.000' },
      regular: { medal: 'Rp 400.000', jersey: 'Rp 450.000' },
      desc: 'Kategori puncak ketahanan fisik, mental, dan navigasi malam mandiri. Loop penuh Jonggol–Sukamakmur–Babakan Madang–Sentul dengan total elevasi tembus +3.180 meter.',
      routeHighlights: 'Prolog 30 km → Jonggol → Sukamakmur Monster Pass → Sentul Loop → Malam ABEEY Coffee',
      terrain: 'Loop Penuh 4 Wilayah · Monster Pass Sukamakmur · Sentul Extreme',
      gearTip: 'Wajib Prolog 30 km · Night Nav: Lampu Depan >500lm & Rompi Reflektif',
      maxAlt: '1.480 m MDPL',
      avgGradient: '9.4% Rata-rata',
      maxGradient: '26% Maksimum',
      surfaceBreakdown: { asphalt: '30%', gravel: '45%', unpaved: '25%' },
      routeSvgPath: 'M 318 55 L 345 65 L 368 100 L 375 140 L 358 178 L 368 215 L 345 255 L 355 285 L 330 320 L 290 338 L 240 342 L 215 315 L 225 275 L 195 250 L 160 262 L 130 238 L 115 195 L 125 150 L 105 115 L 130 82 L 165 70 L 200 80 L 240 52 L 280 62 Z',
      pinCoord: { x: 318, y: 55 },
      elevationProfilePath: 'M 20 90 L 35 88 L 50 84 L 70 76 L 95 68 L 120 58 L 145 48 L 170 36 L 195 24 L 220 30 L 245 42 L 270 54 L 300 66 L 330 76 L 355 82 L 380 90',
      elevationFillPath: 'M 20 90 L 35 88 L 50 84 L 70 76 L 95 68 L 120 58 L 145 48 L 170 36 L 195 24 L 220 30 L 245 42 L 270 54 L 300 66 L 330 76 L 355 82 L 380 90 L 380 94 L 20 94 Z',
      yAxisTicks: ['1.480m', '800m', '120m'],
      xAxisTicks: ['0.0km', '40.0km', '80.0km', '120.0km', '160.0km', '200.0km'],
      stations: [
        { km: '03:00 WIB', name: 'Prolog 30 km Mandiri Subuh', type: 'START', desc: 'Validasi GPS scrutineering' },
        { km: 'KM 0', name: 'Wave Start ABEEY (05:30 WIB)', type: 'START', desc: 'Pelepasan fajar ultra' },
        { km: 'KM 62', name: 'CP#2 Jonggol Cimenyan', type: 'CP', desc: 'Pos verifikasi' },
        { km: 'KM 110', name: 'MONSTER PASS Sukamakmur', type: 'KOM', desc: 'Tanjakan monster +3.180m' },
        { km: 'KM 145', name: 'CP#4 Pitstop Wajib 30 Menit', type: 'PITSTOP', desc: 'Jeda istirahat & nutrisi' },
        { km: 'KM 175', name: 'CP#6 Night Navigation', type: 'CP', desc: 'Cek lampu & reflektif' },
        { km: 'KM 200', name: 'Legend Finisher Gate ABEEY', type: 'FINISH', desc: 'Gelar finisher ultra' },
      ],
    },
    {
      id: 'VIRTUAL',
      tabLabel: 'VIRTUAL RIDE',
      km: 'BEBAS',
      watermark: 'GPS',
      subtitle: 'VIRTUAL RIDE',
      title: 'Virtual Ride',
      titleNote: '(19 Chapters)',
      elevation: 'Rute Lokal',
      elevationMeters: 0,
      cot: 'Fleksibel',
      wave: 'Mandiri H-Event',
      quota: '1.000 Peserta',
      tag: 'VALIDASI STRAVA / KOMOOT',
      format: 'Virtual Ride Mandiri',
      specialRules: 'Khusus Luar Jabodetabek · Outdoor Only · Medali Dikirim DHS Logistik',
      photo: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop',
      priceMedal: 'Rp 175.000',
      priceJersey: 'Rp 225.000',
      earlyBird: { medal: 'Rp 175.000', jersey: 'Rp 225.000' },
      regular: { medal: 'Rp 200.000', jersey: 'Rp 250.000' },
      desc: 'Bagi 80.000+ anggota GX-ID di 19 Chapter se-Indonesia. Selesaikan jarak tantangan di kota domisili Anda, validasi via Strava Webhook, dan medali resmi dikirim ke rumah.',
      routeHighlights: '19 Chapter: Bandung, Surabaya, Medan, Bali, Jogja, Makassar, Semarang, Solo & Nasional',
      terrain: 'Rute Domisili Lokal di 19 Regional Chapter GX-ID se-Indonesia',
      gearTip: 'Outdoor GPS Validasi Otomatis via Strava Webhook · Medali via DHS Logistik',
      maxAlt: 'Rute Lokal',
      avgGradient: 'Variatif',
      maxGradient: 'Variatif',
      surfaceBreakdown: { asphalt: '50%', gravel: '40%', unpaved: '10%' },
      routeSvgPath: 'M 300 90 L 330 110 L 340 145 L 325 180 L 335 215 L 310 245 L 270 260 L 235 250 L 205 265 L 175 240 L 160 205 L 175 170 L 155 135 L 180 105 L 215 95 L 255 105 Z',
      pinCoord: { x: 300, y: 90 },
      elevationProfilePath: 'M 20 84 L 45 80 L 70 74 L 100 68 L 130 72 L 165 60 L 200 64 L 235 56 L 270 66 L 305 72 L 340 78 L 380 84',
      elevationFillPath: 'M 20 84 L 45 80 L 70 74 L 100 68 L 130 72 L 165 60 L 200 64 L 235 56 L 270 66 L 305 72 L 340 78 L 380 84 L 380 94 L 20 94 Z',
      yAxisTicks: ['Outdoor', 'GPS Log', 'Strava'],
      xAxisTicks: ['0.0km', '25.0km', '50.0km', '75.0km', '100.0km'],
      stations: [
        { km: 'STEP 1', name: 'Tikum Chapter Kota Anda', type: 'START', desc: '19 Regional Chapter' },
        { km: 'STEP 2', name: 'Rekam GPS Luar Ruang', type: 'CP', desc: 'Garmin, Wahoo, atau HP' },
        { km: 'STEP 3', name: 'Strava Webhook Auto-Validation', type: 'WS', desc: 'Sertifikasi otomatis awan' },
        { km: 'STEP 4', name: 'Medali Dikirim DHS Logistik', type: 'FINISH', desc: 'Langsung tiba ke rumah' },
      ],
    },
  ];

  const currentCategory = categories.find((c) => c.id === selectedId) || categories[2];

  return (
    <div className="bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC ATHLETIC HERO SECTION (NIKE TRAIL / CANYON STYLE) */}
      {/* ========================================================================= */}
      <section className="relative flex flex-col justify-start overflow-hidden">
        
        {/* Cinematic Action Photography Background with soft dissolve at the bottom */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
          }}
        >
          <img
            src="/hero.webp"
            alt="Gravel Grindurance Cyclist Action"
            className="w-full h-full object-cover object-center scale-[1.15] filter brightness-[0.78] contrast-[1.1] saturate-[1.2]"
            style={{ transformOrigin: 'center center' }}
          />
          {/* Soft dark gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11]/60 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-3 sm:pb-4 w-full flex flex-col items-center sm:items-start space-y-4 sm:space-y-5">
          
          {/* 1. Event Graphic Title with Radial Fire Backlight & Kinetic Glow */}
          <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[1150px] group">
            {/* Ambient Radial Backlight Glow in exact logo orange */}
            <div className="absolute -inset-4 sm:-inset-10 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.35)_0%,rgba(250,109,11,0.12)_45%,transparent_70%)] blur-2xl sm:blur-3xl opacity-90 -z-10 animate-pulse pointer-events-none" />
            
            <img
              src="/nama_event.webp"
              alt="Gravel Grindurance"
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_55px_rgba(250,109,11,0.45)] transition-all duration-700 group-hover:scale-[1.015] group-hover:drop-shadow-[0_0_80px_rgba(250,109,11,0.7)]"
            />
          </div>

          {/* 2. Tagline (Guaranteed 1 Line) & Subtext */}
          <div className="space-y-2 max-w-4xl text-center sm:text-left w-full">
            <h2 className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-extrabold uppercase tracking-wider italic whitespace-nowrap overflow-hidden text-ellipsis">
              UN-SUPPORTED RAIN SEASON EXPEDITION <span className="text-[#FA6D0B] font-black">·</span> 60–200 KM
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
              Tantangan ketahanan mandiri musim hujan edisi perayaan komunitas GX-ID. Hadir dengan 5 kategori offline serta Virtual Ride nasional terintegrasi.
            </p>
          </div>

          {/* 3. Action Buttons (Styled Exactly Like Header CTA Pill) */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Primary Action Button (REGISTER NOW — Solid Orange Pill) */}
            <Link
              href="/daftar"
              className="group relative px-8 sm:px-9 py-3 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] border border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,109,11,0.55)] flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>REGISTER NOW · JOIN THE EXPEDITION</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>

            {/* Secondary Action Button (PANDUAN LOMBA & PERATURAN) */}
            <Link
              href="/peraturan"
              className="group relative px-7 sm:px-8 py-3 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wider text-white border border-[#FA6D0B]/60 hover:border-[#FA6D0B] transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,109,11,0.3)] overflow-hidden flex items-center justify-center gap-2.5"
            >
              {/* Hover background fill */}
              <span className="absolute inset-0 bg-[#FA6D0B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                PANDUAN LOMBA &amp; PERATURAN
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
          </div>

          {/* 4. Running Text Ticker — Directly Under Buttons */}
          <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[1150px] mt-3.5 sm:mt-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden py-3 px-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="animate-marquee flex items-center whitespace-nowrap text-xs sm:text-[13px] font-semibold tracking-widest uppercase text-slate-300">
              {/* Set 1 */}
              <div className="flex items-center">
                <span>MINGGU, 13 DESEMBER 2026 (MINGGU KE-2)</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>START &amp; FINISH: ABEEY COFFEE &amp; LRT HARJAMUKTI CIBUBUR</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>RUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>FORMAT: SELF-SUPPORTED · RAIN SEASON EXPEDITION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>KATEGORI: 60 KM · 80 KM · 120 KM RACE · 150 KM CROSS · 200 KM ULTRA</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>VIRTUAL RIDE NASIONAL: STRAVA GPS AUTO-VALIDATION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span className="text-[#FA6D0B] font-bold">INSENTIF MEAL COUPON RP 50.000: WANITA, USIA ≤ 17 TAHUN &amp; TIM PAIR MIX</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>80.000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>
              </div>

              {/* Set 2 */}
              <div className="flex items-center" aria-hidden="true">
                <span>MINGGU, 13 DESEMBER 2026 (MINGGU KE-2)</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>START &amp; FINISH: ABEEY COFFEE &amp; LRT HARJAMUKTI CIBUBUR</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>RUTE: CIBUBUR — JONGGOL — SUKAMAKMUR — SENTUL LOOP</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>FORMAT: SELF-SUPPORTED · RAIN SEASON EXPEDITION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>KATEGORI: 60 KM · 80 KM · 120 KM RACE · 150 KM CROSS · 200 KM ULTRA</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>VIRTUAL RIDE NASIONAL: STRAVA GPS AUTO-VALIDATION</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span className="text-[#FA6D0B] font-bold">INSENTIF MEAL COUPON RP 50.000: WANITA, USIA ≤ 17 TAHUN &amp; TIM PAIR MIX</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>

                <span>80.000+ RIDERS · 19 REGIONAL CHAPTERS GX-ID</span>
                <span className="mx-8 lg:mx-12 text-[#FA6D0B] font-bold select-none">//</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 1.5 FULL-BLEED OFFICIAL EVENT TELEMETRY STRIP (PURE TYPOGRAPHY - DATE & VENUE FOCUS) */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full border-y border-white/10 bg-black/60 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 py-4 sm:py-5">
            
            {/* Segment 1: Waktu & Tanggal Gelaran Resmi */}
            <div className="py-2.5 md:py-0 md:pr-10 lg:pr-14 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block leading-none mb-1.5">
                OFFICIAL RACE DATE · MINGGU KE-2
              </span>
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white italic tracking-wider leading-none block">
                MINGGU, 13 DESEMBER 2026
              </span>
            </div>

            {/* Segment 2: Lokasi Start & Finish Staging Arena */}
            <div className="py-2.5 md:py-0 md:pl-10 lg:pl-14 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1.5">
                START &amp; FINISH ARENA
              </span>
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white italic tracking-wide leading-none block">
                ABEEY COFFEE &amp; EATERY, CIBUBUR
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-mono mt-1 block">
                Akses Terintegrasi Stasiun LRT Harjamukti
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HYBRID COCKPIT TELEMETRY & ATHLETIC MONOLITHS (NIKE TRAIL X GARMIN HUD) */}
      {/* ========================================================================= */}
      <section id="kategori" className="relative pt-8 pb-0">
        
        {/* Cinematic Action Cyclist Motion Background (pesepeda.webp) - MIDDLE IMAGE: Solo Aero Cyclist */}
        <div 
          className="absolute -top-96 sm:-top-[420px] -bottom-72 inset-x-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 8%, black 22%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 8%, black 22%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/pesepeda.webp"
            alt="Grindurance Gravel Cyclist Solo In Motion"
            className="w-full h-full object-cover object-[center_20%] lg:object-[70%_12%] opacity-90 filter contrast-120 saturate-125 brightness-100"
          />
          {/* Seamless gradient overlays for extreme typographic legibility without cutting off the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E11] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11]/90 via-[#0D0E11]/55 to-[#0D0E11]/25" />
        </div>

        {/* Seamless Horizontal Motion Blur Transition Seam between Hero and Categories */}
        <div 
          className="absolute -top-36 inset-x-0 h-48 z-[2] pointer-events-none opacity-70 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)'
          }}
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.25)_0%,transparent_70%)] blur-2xl" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-3">
              <span className="text-sm sm:text-base md:text-lg font-black text-[#FA6D0B] uppercase tracking-widest block font-mono pl-7 sm:pl-9 md:pl-11">
                60 — 200 KM EXPEDITION
              </span>
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] group">
                {/* Subtle ambient backlight glow in brand orange */}
                <div className="absolute -inset-3 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.28)_0%,transparent_70%)] blur-2xl opacity-80 pointer-events-none" />
                <img
                  src="/text official categories.webp"
                  alt="Official Categories"
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
            <div className="border-l-2 border-[#FA6D0B] pl-4 py-0.5 max-w-md">
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                Tanpa mobil pengawal. Menembus guyuran hujan lebat, bebatuan makadam, dan tanjakan brutal hingga <span className="text-[#FA6D0B] font-bold font-mono">+3.180 meter</span> di koridor liar Jonggol–Sukamakmur.
              </p>
            </div>
          </div>
        </div>

        {/* SVG Definition for the Custom Grindurance Speed/Velocity Pattern (Orange Brand Tone) */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="grinduranceSpeedPattern" width="30" height="48" patternUnits="userSpaceOnUse">
              {/* Continuous baseline thin tracks */}
              {[4, 12, 20, 28, 36, 44].map((y) => (
                <line
                  key={`line-${y}`}
                  x1="0"
                  y1={y}
                  x2="30"
                  y2={y}
                  stroke="#FA6D0B"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />
              ))}

              {/* Diagonal velocity bars (shift 5px per line, width 16px, height 3.5px) */}
              {[
                { y: 2.25, x: 0 },
                { y: 10.25, x: 5 },
                { y: 18.25, x: 10 },
                { y: 26.25, x: 15 },
                { y: 34.25, x: 20 },
                { y: 42.25, x: 25 },
              ].map((bar, i) => (
                <g key={`bar-${i}`}>
                  <rect
                    x={bar.x}
                    y={bar.y}
                    width="16"
                    height="3.5"
                    rx="1.75"
                    fill="#FA6D0B"
                  />
                  <rect
                    x={bar.x - 30}
                    y={bar.y}
                    width="16"
                    height="3.5"
                    rx="1.75"
                    fill="#FA6D0B"
                  />
                </g>
              ))}
            </pattern>
          </defs>
        </svg>

        {/* Full-Bleed Edge-to-Edge Category Stage Bar (Translucent Glass to Let BG Glow Through) */}
        <div className="relative z-10 w-full border-y border-white/10 bg-black/40 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="flex lg:grid lg:grid-cols-6 divide-x divide-white/10 overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map((c) => {
              const isActive = c.id === selectedId;
              const isRace = c.isRace || c.id === '120_PAIR';
              return (
                <button
                  key={c.id}
                  onClick={() => handleCategorySelect(c.id)}
                  className={`group relative text-left py-4 sm:py-5 px-4 sm:px-5 lg:px-6 transition-all duration-300 flex flex-col justify-between overflow-hidden focus:outline-none min-w-[175px] sm:min-w-[195px] lg:min-w-0 flex-shrink-0 lg:flex-shrink ${
                    isRace
                      ? isActive
                        ? 'bg-gradient-to-b from-[#FA6D0B]/20 via-[#FA6D0B]/10 to-transparent text-white shadow-[inset_0_0_24px_rgba(250,109,11,0.2)] border-x border-[#FA6D0B]/40 z-20'
                        : 'bg-gradient-to-b from-[#FA6D0B]/[0.06] via-white/[0.02] to-transparent hover:from-[#FA6D0B]/[0.12] hover:via-white/[0.03] hover:to-transparent text-slate-300 border-x border-[#FA6D0B]/20'
                      : isActive
                        ? 'bg-gradient-to-b from-[#FA6D0B]/25 via-[#FA6D0B]/10 to-transparent text-white'
                        : 'bg-transparent hover:bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  {/* Unified Aerodynamic Speed Pattern Layer across the column */}
                  {isRace && (
                    <div 
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 overflow-hidden ${
                        isActive ? 'opacity-40 group-hover:opacity-55' : 'opacity-20 group-hover:opacity-35'
                      }`}
                      style={{
                        maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)',
                      }}
                    >
                      <div 
                        className="absolute inset-x-0 -top-12 -bottom-12 animate-race-flow group-hover:animate-race-flow-fast"
                      >
                        <svg className="w-full h-full">
                          <rect width="100%" height="100%" fill="url(#grinduranceSpeedPattern)" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Top Glowing Indicator Bar */}
                  <div
                    className={`absolute top-0 inset-x-0 transition-all duration-300 ${
                      isRace
                        ? isActive
                          ? 'bg-[#FA6D0B] shadow-[0_0_24px_#FA6D0B] h-[3px]'
                          : 'bg-[#FA6D0B]/40 group-hover:bg-[#FA6D0B] h-[2px]'
                        : isActive
                          ? 'bg-[#FA6D0B] shadow-[0_0_18px_#FA6D0B] h-1'
                          : 'bg-transparent group-hover:bg-white/20 h-1'
                    }`}
                  />

                  {/* Micro Racing Pill Badge */}
                  {isRace ? (
                    <div className="relative z-10 flex items-center justify-between gap-1 mb-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                        isActive
                          ? 'bg-[#FA6D0B] text-black shadow-[0_0_14px_rgba(250,109,11,0.6)]'
                          : 'bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/40 group-hover:border-[#FA6D0B]'
                      }`}>
                        PODIUM TOP 3
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-wider text-[#FA6D0B] uppercase">
                        PAIR MIX // DUAL
                      </span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[9px] font-mono text-slate-500 font-semibold uppercase">
                        KUOTA: {c.quota.split(' ')[0]}
                      </span>
                    </div>
                  )}

                  {/* Header Row: Big Bold Distance + Telemetry Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`font-display text-2xl sm:text-3xl font-black italic tracking-tight uppercase transition-all leading-none inline-block pr-1.5 ${
                        isRace
                          ? isActive
                            ? 'text-white drop-shadow-[0_0_24px_rgba(250,109,11,0.75)]'
                            : 'text-white/90 group-hover:text-white drop-shadow-[0_0_12px_rgba(250,109,11,0.3)]'
                          : isActive
                            ? 'text-white drop-shadow-[0_0_20px_rgba(250,109,11,0.65)]'
                            : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {c.km === 'BEBAS' ? 'VIRTUAL' : c.km}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight shrink-0 transition-all duration-300 ${
                        isRace
                          ? isActive
                            ? 'text-white drop-shadow-[0_0_14px_rgba(250,109,11,0.9)] font-black'
                            : 'text-[#FA6D0B] group-hover:text-white'
                          : isActive
                            ? 'text-[#FA6D0B] drop-shadow-[0_0_14px_rgba(250,109,11,0.9)] font-black'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {c.elevation === 'Rute Lokal' ? 'GPS LOG' : c.elevation}
                    </span>
                  </div>

                  {/* Subtitle & Telemetry Meta */}
                  <div className="relative z-10 space-y-0.5">
                    <div
                      className={`text-xs font-bold uppercase tracking-wider truncate ${
                        isRace
                          ? isActive
                            ? 'text-[#FA6D0B] font-black'
                            : 'text-[#FA6D0B]/90 group-hover:text-[#FA6D0B]'
                          : isActive
                            ? 'text-[#FA6D0B]'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {isRace ? 'OFFICIAL RACE // PODIUM' : c.subtitle}
                    </div>
                    <div className={`text-[10px] truncate font-mono ${
                      isRace
                        ? isActive 
                          ? 'text-white/90 font-medium' 
                          : 'text-slate-300 group-hover:text-white'
                        : 'text-slate-300'
                    }`}>
                      {c.cot !== 'Fleksibel' ? `COT ${c.cot} // ${c.wave}` : '19 CHAPTER NASIONAL'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* THE CENTERPIECE: OPEN ATHLETIC SHOWCASE */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          
          {/* Smooth Cross-Fade Transition Container */}
          <div className={`transition-all duration-300 transform ${
            isTransitioning ? 'opacity-25 scale-[0.99] translate-y-1 blur-[1px]' : 'opacity-100 scale-100 translate-y-0 blur-0'
          }`}>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch pt-1 pb-2">
            
              {/* KOLOM KIRI (5 COLS): STRICT SQUARE UNIFIED BOX (ASPECT-SQUARE 1:1) HARMONIZED WITH TOP SECTIONS */}
              <div className="lg:col-span-5 select-none">
                
                {/* 1 STRICT SQUARE BOX (ASPECT-SQUARE 1:1) IN MATCHING TRANSLUCENT GLASS & BORDER WHITE/10 */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.5)] p-4 sm:p-5 flex flex-col justify-between">
                  
                  {/* Subtle Dot Grid Background */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* HEADER JUDUL TEGAS (PURE TYPOGRAPHY) */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5 shrink-0">
                    <h4 className="font-display text-lg sm:text-xl lg:text-2xl font-black uppercase text-white italic tracking-wider leading-none">
                      {currentCategory.id === 'VIRTUAL' ? 'VIRTUAL RIDE ROUTE' : `${currentCategory.km} ROUTE`}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-[#FA6D0B] uppercase tracking-wider">
                      GPS &amp; ELEVATION
                    </span>
                  </div>

                  {/* 1. ROUTE MAP SVG CANVAS (PRECISION WAYPOINT DOT, TANPA ICON P) */}
                  <div className="relative z-10 w-full flex-1 min-h-0 flex items-center justify-center py-1">
                    <svg viewBox="0 0 400 350" className="w-full h-full max-h-full">
                      <defs>
                        <filter id="routeOrangeGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FA6D0B" floodOpacity="0.9" />
                          <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#FA6D0B" floodOpacity="0.5" />
                        </filter>
                      </defs>

                      {/* Outer Neon Orange Trail */}
                      <path
                        d={currentCategory.routeSvgPath}
                        fill="none"
                        stroke="#FA6D0B"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#routeOrangeGlow)"
                      />

                      {/* Inner Bright White Core Line */}
                      <path
                        d={currentCategory.routeSvgPath}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                      />

                      {/* Start Waypoint Marker (Precision Radar Target Dot, Clean & Icon-free) */}
                      <g transform={`translate(${currentCategory.pinCoord.x}, ${currentCategory.pinCoord.y})`}>
                        <circle cx="0" cy="0" r="10" fill="none" stroke="#FA6D0B" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
                        <circle cx="0" cy="0" r="5" fill="#FA6D0B" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                      </g>
                    </svg>
                  </div>

                  {/* 2. ELEVATION PROFILE CHART (MONOSPACE HUD) */}
                  <div className="relative z-10 w-full border-t border-white/10 pt-2 shrink-0">
                    <svg viewBox="0 0 400 88" className="w-full h-auto max-h-[85px]">
                      <defs>
                        <linearGradient id="elevationOrangeFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FA6D0B" stopOpacity="0.35" />
                          <stop offset="60%" stopColor="#FA6D0B" stopOpacity="0.08" />
                          <stop offset="100%" stopColor="#FA6D0B" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Title: ELEVATION PROFILE */}
                      <text x="24" y="12" fill="#FA6D0B" fontSize="8" fontWeight="900" fontFamily="monospace" letterSpacing="0.06em">
                        ELEVATION PROFILE
                      </text>

                      {/* Y-Axis Labels on Left in Monospace Muted Slate */}
                      <text x="10" y="26" fill="#94A3B8" fontSize="6.5" fontFamily="monospace" textAnchor="start">
                        {currentCategory.yAxisTicks[0]}
                      </text>
                      <text x="10" y="48" fill="#94A3B8" fontSize="6.5" fontFamily="monospace" textAnchor="start">
                        {currentCategory.yAxisTicks[1]}
                      </text>
                      <text x="10" y="70" fill="#94A3B8" fontSize="6.5" fontFamily="monospace" textAnchor="start">
                        {currentCategory.yAxisTicks[2]}
                      </text>

                      {/* Vertical Divider Grid Lines */}
                      {[80, 140, 200, 260, 320].map((xPos, idx) => (
                        <line
                          key={idx}
                          x1={xPos}
                          y1="16"
                          x2={xPos}
                          y2="72"
                          stroke="rgba(255,255,255,0.06)"
                          strokeDasharray="2 2"
                        />
                      ))}

                      {/* Orange Gradient Fill under Curve */}
                      <path
                        d={currentCategory.elevationFillPath}
                        fill="url(#elevationOrangeFill)"
                      />

                      {/* Jagged Elevation Curve in Vibrant Orange */}
                      <path
                        d={currentCategory.elevationProfilePath}
                        fill="none"
                        stroke="#FA6D0B"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* X-Axis Distance Labels along Bottom */}
                      {currentCategory.xAxisTicks.map((tick, tIdx) => {
                        const total = currentCategory.xAxisTicks.length - 1;
                        const xCoord = 24 + (tIdx / total) * 350;
                        const anchor = tIdx === 0 ? 'start' : tIdx === total ? 'end' : 'middle';
                        return (
                          <text
                            key={tIdx}
                            x={xCoord}
                            y="82"
                            fill="#64748B"
                            fontSize="6.5"
                            fontFamily="monospace"
                            textAnchor={anchor}
                          >
                            {tick}
                          </text>
                        );
                      })}
                    </svg>
                  </div>

                </div>

              </div>

              {/* KOLOM KANAN (7 COLS): TATA LETAK DATA & TELEMETRI DENGAN FROSTED CARD ELEGAN */}
              <div className="lg:col-span-7 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 p-5 sm:p-6 flex flex-col justify-between shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-4">
                
                {/* 1. Header Etape */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase text-white italic tracking-tight leading-none drop-shadow-sm flex items-baseline gap-x-2.5 whitespace-nowrap">
                    <span>{currentCategory.title}</span>
                    {currentCategory.titleNote && (
                      <span className="text-xs sm:text-sm lg:text-base font-mono font-bold text-slate-400 not-italic uppercase tracking-wider inline-block">
                        {currentCategory.titleNote}
                      </span>
                    )}
                  </h3>
                </div>
                
                {/* 2. BARIS SPESIFIKASI KUNCI (OPEN TELEMETRY BAR) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/10 py-3.5 border-y border-white/10">
                  {/* Jarak */}
                  <div className="space-y-1 sm:pr-4">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">JARAK</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      <span className={`font-display font-black text-white italic leading-none ${currentCategory.id === 'VIRTUAL' ? 'text-xl sm:text-2xl xl:text-3xl' : 'text-2xl sm:text-3xl xl:text-4xl'}`}>
                        {currentCategory.km.split(' ')[0]}
                      </span>
                      {currentCategory.km.split(' ')[1] && (
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                          {currentCategory.km.split(' ')[1]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Total Elev */}
                  <div className="space-y-1 sm:px-4">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">TOTAL ELEV</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      {currentCategory.id === 'VIRTUAL' ? (
                        <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-[#FA6D0B] italic leading-none">
                          Rute Lokal
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-[#FA6D0B] italic leading-none">
                            {currentCategory.elevation.split(' ')[0]}
                          </span>
                          {currentCategory.elevation.split(' ')[1] && (
                            <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B]/80 uppercase not-italic">
                              {currentCategory.elevation.split(' ')[1]}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Wave Start */}
                  <div className="space-y-1 sm:px-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">WAVE START</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      {currentCategory.id === 'VIRTUAL' ? (
                        <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-white italic leading-none">
                          Mandiri
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                            {currentCategory.wave.split(' ')[0]}
                          </span>
                          {currentCategory.wave.split(' ')[1] && (
                            <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                              {currentCategory.wave.split(' ')[1]}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Batas Waktu */}
                  <div className="space-y-1 sm:pl-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">BATAS WAKTU (COT)</span>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      {currentCategory.id === 'VIRTUAL' ? (
                        <span className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-white italic leading-none">
                          Fleksibel
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white italic leading-none">
                            {currentCategory.cot.split(' ')[0]}
                          </span>
                          {currentCategory.cot.split(' ')[1] && (
                            <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase not-italic">
                              {currentCategory.cot.split(' ')[1]}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Narasi Deskripsi Jalur & Karakteristik Etape */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                    KARAKTERISTIK ETAPE
                  </span>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                    {currentCategory.desc}
                  </p>
                </div>

                {/* 4. Surface Breakdown (Komposisi Permukaan Jalur) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase tracking-wider font-semibold">KOMPOSISI MEDAN</span>
                    <span className="text-slate-300">
                      <span className="text-[#FA6D0B] font-bold">{currentCategory.surfaceBreakdown.asphalt}</span> Aspal ·{' '}
                      <span className="text-white font-bold">{currentCategory.surfaceBreakdown.gravel}</span> Makadam ·{' '}
                      <span className="text-slate-400 font-bold">{currentCategory.surfaceBreakdown.unpaved}</span> Tanah/Batu
                    </span>
                  </div>
                  {/* Progress multi-segment bar */}
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                    <div style={{ width: currentCategory.surfaceBreakdown.asphalt }} className="h-full bg-slate-400" title="Aspal" />
                    <div style={{ width: currentCategory.surfaceBreakdown.gravel }} className="h-full bg-[#FA6D0B]" title="Makadam" />
                    <div style={{ width: currentCategory.surfaceBreakdown.unpaved }} className="h-full bg-white/30" title="Tanah/Batu" />
                  </div>
                </div>

                {/* 5. TIERED PRICING — Matching Hero/Header Design Language */}
                <div className="pt-3.5 border-t border-white/10">

                  {/* Row 1: Section label + status/countdown */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-3">
                    <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#FA6D0B]">
                      BIAYA PENDAFTARAN
                    </span>
                    {earlyBirdCountdown.active ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">EARLY BIRD TUTUP DALAM</span>
                        <div className="flex items-center gap-1">
                          {[
                            { val: earlyBirdCountdown.days, label: 'H' },
                            { val: earlyBirdCountdown.hours, label: 'J' },
                            { val: earlyBirdCountdown.minutes, label: 'M' },
                            { val: earlyBirdCountdown.seconds, label: 'D' },
                          ].map(({ val, label }, i) => (
                            <span key={i} className="flex items-center gap-0.5">
                              <span className="font-mono font-black text-xs text-white bg-[#FA6D0B]/15 border border-[#FA6D0B]/30 rounded px-1.5 py-0.5 min-w-[24px] text-center tabular-nums leading-none">
                                {String(val).padStart(2, '0')}
                              </span>
                              <span className="text-[8px] text-[#FA6D0B] font-mono font-bold">{label}</span>
                              {i < 3 && <span className="text-white/20 text-[9px] mx-0.5">/</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[9px] font-mono font-bold text-[#FA6D0B] uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                        PERIODE REGULER DIBUKA
                      </span>
                    )}
                  </div>

                  {/* Row 2: Two tiers side by side + CTA */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-0">

                    {/* EARLY BIRD TIER */}
                    <div className={`flex-1 py-3 pr-5 border-r border-white/10 ${!earlyBirdCountdown.active ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${earlyBirdCountdown.active ? 'text-[#FA6D0B]' : 'text-slate-400'}`}>
                          EARLY BIRD
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">s/d 15 Nov 2025</span>
                        {earlyBirdCountdown.active ? (
                          <span className="text-[9px] font-mono font-bold uppercase text-[#FA6D0B] tracking-wider ml-auto flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                            AKTIF
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono font-bold uppercase text-slate-500 tracking-wider ml-auto">
                            SELESAI
                          </span>
                        )}
                      </div>

                      {currentCategory.isRace ? (
                        <div className="space-y-2">
                          <div>
                            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">SINGLE RIDER</div>
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className={`font-display font-black italic text-xl leading-none ${earlyBirdCountdown.active ? 'text-white' : 'text-slate-400'}`}>
                                {currentCategory.earlyBird.medal}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">/ {currentCategory.earlyBird.jersey} +Jersey</span>
                            </div>
                          </div>
                          {currentCategory.earlyBird.pairMedal && (
                            <div className="pt-1.5 border-t border-white/[0.06]">
                              <div className="text-[9px] font-mono text-[#FA6D0B] uppercase tracking-wider mb-0.5">PAIR MIX (2 PAX)</div>
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <span className={`font-display font-black italic text-xl leading-none ${earlyBirdCountdown.active ? 'text-[#FA6D0B]' : 'text-slate-400'}`}>
                                  {currentCategory.earlyBird.pairMedal}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">/ {currentCategory.earlyBird.pairJersey} +Jersey</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">PAKET MEDAL</div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className={`font-display font-black italic text-2xl leading-none ${earlyBirdCountdown.active ? 'text-white' : 'text-slate-400'}`}>
                              {currentCategory.earlyBird.medal}
                            </span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 mt-1">+Jersey: {currentCategory.earlyBird.jersey}</div>
                        </div>
                      )}
                    </div>

                    {/* SEPARATOR */}
                    <div className="hidden sm:block w-[1px] bg-white/10 my-2 self-stretch" />

                    {/* REGULAR TIER */}
                    <div className={`flex-1 py-3 sm:pl-4 sm:pr-5 border-t sm:border-t-0 border-white/10 sm:border-r border-white/10 ${earlyBirdCountdown.active ? 'opacity-60 hover:opacity-90 transition-opacity' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${!earlyBirdCountdown.active ? 'text-[#FA6D0B]' : 'text-white'}`}>
                          REGULAR
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">16 Nov – H-Event</span>
                        {!earlyBirdCountdown.active && (
                          <span className="text-[9px] font-mono font-bold uppercase text-[#FA6D0B] tracking-wider ml-auto flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse" />
                            AKTIF
                          </span>
                        )}
                      </div>

                      {currentCategory.isRace ? (
                        <div className="space-y-2">
                          <div>
                            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">SINGLE RIDER</div>
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="font-display font-black text-white italic text-xl leading-none">{currentCategory.regular.medal}</span>
                              <span className="text-[10px] font-mono text-slate-400">/ {currentCategory.regular.jersey} +Jersey</span>
                            </div>
                          </div>
                          {currentCategory.regular.pairMedal && (
                            <div className="pt-1.5 border-t border-white/[0.06]">
                              <div className="text-[9px] font-mono text-[#FA6D0B] uppercase tracking-wider mb-0.5">PAIR MIX (2 PAX)</div>
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="font-display font-black text-[#FA6D0B] italic text-xl leading-none">{currentCategory.regular.pairMedal}</span>
                                <span className="text-[10px] font-mono text-slate-400">/ {currentCategory.regular.pairJersey} +Jersey</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">PAKET MEDAL</div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-display font-black text-white italic text-2xl leading-none">{currentCategory.regular.medal}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 mt-1">+Jersey: {currentCategory.regular.jersey}</div>
                        </div>
                      )}
                    </div>

                    {/* CTA + VOUCHER */}
                    <div className="flex flex-col justify-between gap-3 sm:pl-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10 sm:w-[175px] shrink-0">
                      <div>
                        <div className="text-[9px] font-mono font-black uppercase tracking-widest text-[#FA6D0B] mb-1">VOUCHER SUBSIDI</div>
                        <p className="text-[10px] font-mono text-slate-300 leading-relaxed">
                          Hemat <strong className="text-white font-bold">Rp 50.000</strong> untuk Wanita · ≤17 Th · Pair Mix.<br />
                          <span className="text-slate-400 text-[9px]">Gunakan kupon saat checkout.</span>
                        </p>
                      </div>
                      <Link
                        href={`/daftar?category=${currentCategory.id}`}
                        className="group w-full px-4 py-3 rounded-full text-[11px] font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-[#DE5A00] transition-all duration-300 hover:shadow-[0_0_24px_rgba(250,109,11,0.5)] flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap text-center"
                      >
                        DAFTAR SEKARANG
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                      </Link>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* ROW 2: TECHNICAL DETAILS, CHECKPOINTS & PROTOCOLS (TIGHTENED & HARMONIZED) */}
            <div className="mt-3 pt-3 border-t border-white/10 space-y-3.5">
              
              {/* Checkpoint & Pitstop Grid (Full Width, Compact & Icon-free) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 uppercase tracking-wider font-semibold">
                    CHECKPOINT &amp; PITSTOP ETAPE ({currentCategory.km})
                  </span>
                  <span className="text-[10px] text-[#FA6D0B] font-bold uppercase tracking-wider">
                    {currentCategory.id === '150' || currentCategory.id === '200' ? 'WAJIB PITSTOP 30 MENIT' : 'SMART GEOFENCING'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                  {currentCategory.stations.map((st, sIdx) => {
                    const isPitstop = st.type === 'PITSTOP';
                    const isKOM = st.type === 'KOM';
                    return (
                      <div 
                        key={sIdx}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between backdrop-blur-sm shadow-sm ${
                          isPitstop 
                            ? 'bg-[#FA6D0B]/10 border-[#FA6D0B]/50' 
                            : isKOM
                            ? 'bg-[#FA6D0B]/10 border-[#FA6D0B]/50'
                            : 'bg-black/50 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold text-[#FA6D0B]">{st.km}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                            isPitstop || isKOM ? 'bg-[#FA6D0B] text-black' : 'bg-white/10 text-white'
                          }`}>
                            {st.type}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-white uppercase leading-snug block line-clamp-2">{st.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate mt-1">{st.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety & Protocol Box (Pure Typography, Icon-free) */}
              <div className="p-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 space-y-1.5 text-xs">
                <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block">
                  REGULASI TEKNIS &amp; PROTOKOL
                </span>
                <div className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                  {currentCategory.isRace ? (
                    <span>Wajib mengaktifkan Live Tracking via <strong>RaceRoute.id / Traccar</strong>. Perebutan Podium Resmi Top 3 (Putra, Putri &amp; Tim Tandem Pair Mix). Format balap kompetitif tercepat.</span>
                  ) : (currentCategory.id === '150' || currentCategory.id === '200') ? (
                    <span>Wajib menyelesaikan <strong>Prolog 30 km mandiri (03:00–05:00 WIB)</strong> sebelum registrasi start. Wajib istirahat <strong>Pitstop 30 Menit di CP#4</strong> (penalti 300% jika melanggar). Wajib wet lube &amp; ban 35–40mm.</span>
                  ) : currentCategory.id === 'VIRTUAL' ? (
                    <span>Khusus domisili luar Jabodetabek. Wajib rekaman outdoor satelit murni via <strong>Strava / Komoot</strong>. Sinkronisasi otomatis Strava Webhook, medali resmi dikirim via DHS Logistik.</span>
                  ) : (
                    <span>Kategori rekreasional mandiri (*un-supported joy of riding*). Ramah bagi pengguna sepeda lipat (Seli 20"), sepeda hybrid, dan pemula. Wajib helm &amp; lampu sepeda.</span>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================================================= */}
      {/* 2.5 PAKET PESERTA & MERCHANDISE (RAD RACE INSPIRED - EDITORIAL & ELEGAN) */}
      <section id="racepack" className="pt-12 sm:pt-16 pb-20 text-white relative">
        
        {/* Dynamic Action Tandem Cyclists Background (pesepeda2.webp) - 3RD BOTTOM IMAGE */}
        <div 
          className="absolute top-8 sm:top-12 bottom-0 inset-x-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 35%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 35%, black 85%, transparent 100%)'
          }}
        >
          <img
            src="/pesepeda2.webp"
            alt="Grindurance Gravel Cyclists Tandem In Motion"
            className="w-full h-full object-cover object-[center_10%] lg:object-[75%_8%] opacity-90 filter contrast-120 saturate-125 brightness-100"
          />
          {/* Seamless dark gradient overlays - smooth top fade-in from dark pause and bottom dissolve */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#090A0D] via-[#090A0D]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/90 via-[#090A0D]/55 to-[#090A0D]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Section Header: Alternating Right-Aligned Layout (Kiri-Kanan Rhythm) with Custom Text Graphic */}
          <div className="flex flex-col md:flex-row-reverse md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col items-start md:items-end space-y-3">
              <span className="text-sm sm:text-base md:text-lg font-black text-[#FA6D0B] uppercase tracking-widest block font-sans pr-0 md:pr-7 lg:pr-9">
                PARTICIPANT PACKAGES · 2026 EDITION
              </span>
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[560px] group">
                {/* Ambient Radial Backlight Glow in exact brand orange */}
                <div className="absolute -inset-3 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.28)_0%,transparent_70%)] blur-2xl opacity-80 pointer-events-none" />
                <img
                  src="/text race pack.webp"
                  alt="Race Pack & Merchandise"
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(250,109,11,0.35)] transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

            <div className="border-l-2 md:border-l-0 md:border-r-2 border-[#FA6D0B] pl-4 md:pl-0 md:pr-4 py-0.5 max-w-md md:text-right">
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                Sistem pendaftaran dua opsi: pilih paket <strong className="text-white">Medal Saja</strong> untuk esensi tantangan mandiri, atau upgrade ke paket <strong className="text-white">Medal &amp; Jersey</strong> resmi GX-ID buatan Pollride (+Rp 50.000). Seluruh paket mencakup perlengkapan hari-H.
              </p>
            </div>
          </div>

          {/* DUAL PACKAGE COMPARISON (Clean Side-by-Side Split) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tier 1: Medal Only */}
            <div className="relative overflow-hidden p-6 sm:p-7 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-white/20 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              {/* Top hairline accent bar */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-white/15" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-widest">
                      OPSI 01
                    </span>
                    <span className="text-white/20 font-black">·</span>
                    <span className="text-xs font-sans font-bold text-white uppercase tracking-wider">
                      ESENSIAL
                    </span>
                  </div>
                  <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                    STANDAR FINISHER
                  </span>
                </div>
                
                <div>
                  <h3 className="font-display italic text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-none">
                    PAKET MEDAL ONLY
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    Pilihan tepat bagi pesepeda yang fokus pada esensi jarak, tantangan mandiri, dan koleksi medali resmi finisher.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3 text-xs sm:text-[13px] text-slate-300 font-sans">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Nomor Plat Sepeda Tahan Air #1000+ &amp; QR Check-in</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Asuransi Kecelakaan Resmi 1 Hari Event</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Nutrisi NDR Energy Gel + Isotonic Drink</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Akses Finisher Lounge &amp; Voucher Pemulihan ABEEY Coffee</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-end justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest block leading-none">
                    TARIF DASAR
                  </span>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-[11px] font-sans font-bold text-slate-400 leading-none">MULAI</span>
                    <span className="font-display italic font-black text-2xl sm:text-3xl text-white leading-none">
                      RP 200.000
                    </span>
                  </div>
                </div>
                <div className="text-right pb-0.5">
                  <span className="text-xs font-sans font-bold text-slate-300 uppercase tracking-wider block">
                    TERMASUK FASILITAS HARI-H
                  </span>
                  <span className="text-[10px] font-sans text-slate-500 uppercase tracking-wider block mt-0.5">
                    STANDAR FINISHER RESMI
                  </span>
                </div>
              </div>
            </div>

            {/* Tier 2: Medal & Jersey */}
            <div className="relative overflow-hidden p-6 sm:p-7 rounded-xl border-2 border-[#FA6D0B] bg-gradient-to-b from-black/85 via-black/75 to-[#160e07]/90 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-[0_0_50px_rgba(250,109,11,0.22)] transition-all duration-300">
              {/* Glowing Top Indicator Bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-[#FA6D0B] shadow-[0_0_24px_#FA6D0B]" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#FA6D0B] text-black text-[10px] font-sans font-black uppercase tracking-widest shadow-[0_0_12px_rgba(250,109,11,0.5)]">
                      OPSI 02
                    </span>
                    <span className="text-[#FA6D0B] font-black">·</span>
                    <span className="text-xs font-sans font-black text-white uppercase tracking-wider">
                      REKOMENDASI LENGKAP
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-bold text-[#FA6D0B] uppercase tracking-wider">
                    HEMAT RP 300.000
                  </span>
                </div>
                
                <div>
                  <h3 className="font-display italic text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-none">
                    PAKET MEDAL &amp; JERSEY RESMI
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Paket lengkap terfavorit. Mendapatkan seluruh fasilitas Paket Medal Only ditambah Official Anniversary Aero Jersey buatan Pollride.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3 text-xs sm:text-[13px] text-slate-300 font-sans">
                  <div className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-lg bg-[#FA6D0B]/10 border border-[#FA6D0B]/30 font-bold text-white">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span>Official Anniversary Aero Jersey by Pollride</span>
                      <span className="text-[10px] font-sans font-extrabold uppercase px-2 py-0.5 rounded bg-[#FA6D0B] text-black self-start sm:self-auto">
                        SENILAI RP 350.000
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Heavy Finisher Metal Medal (Zinc Alloy 3D Relief)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Nomor Plat Sepeda Tahan Air #1000+ &amp; QR Check-in</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Asuransi Kecelakaan Resmi 1 Hari Event</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FA6D0B] shrink-0 mt-0.5" />
                    <span>Nutrisi NDR Energy Gel + Isotonic + Voucher ABEEY Coffee</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-end justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-sans font-bold text-[#FA6D0B] uppercase tracking-widest block leading-none">
                    UPGRADE RESMI
                  </span>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="font-display italic font-black text-2xl sm:text-3xl text-[#FA6D0B] leading-none">
                      +RP 50.000
                    </span>
                    <span className="text-xs font-sans font-bold text-slate-400 uppercase leading-none">
                      / PAX
                    </span>
                  </div>
                </div>
                <div className="text-right pb-0.5">
                  <span className="text-xs font-sans font-black text-[#FA6D0B] uppercase tracking-wider block">
                    BEST SELLER EDITION
                  </span>
                  <span className="text-[10px] font-sans text-slate-400 uppercase tracking-wider block mt-0.5">
                    SUBSIDI KOMUNITAS GX-ID
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* EDITORIAL PRODUCT SHOWCASE (Lookbook Grid) */}
          <div className="space-y-6 pt-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">
                RINCIAN ITEM RESMI · LOOKBOOK
              </span>
              <span className="text-xs font-sans text-slate-500 uppercase">3 CORE ITEMS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* ITEM 1: JERSEY */}
              <div className="space-y-4 group">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-[#FA6D0B]/50 transition-colors">
                  <Image
                    src="/merchandise/jersey.webp"
                    alt="Official Anniversary Jersey"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-sans font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FA6D0B] text-black">
                      POLLRIDE AERO FIT
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wider">01 · APPAREL RESMI</div>
                  <h3 className="font-display text-xl font-black uppercase text-white tracking-tight">
                    OFFICIAL ANNIVERSARY JERSEY
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Material mesh bernapas berteknologi quick-dry dengan grafis kontur topografi Jonggol–Sukamakmur. Dirancang khusus untuk cuaca basah dan lembap.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-sans text-slate-400">
                  <div>· Quick-Dry Mesh</div>
                  <div>· 3 Saku Belakang</div>
                  <div>· Zipper YKK Lock</div>
                  <div>· Garis Reflektif</div>
                </div>
              </div>

              {/* ITEM 2: MEDAL */}
              <div className="space-y-4 group">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-[#FA6D0B]/50 transition-colors">
                  <Image
                    src="/merchandise/medal.webp"
                    alt="Finisher Metal Medal"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-sm">
                      SEMUA KATEGORI
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wider">02 · MEDALI SAH</div>
                  <h3 className="font-display text-xl font-black uppercase text-white tracking-tight">
                    HEAVY FINISHER METAL MEDAL
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Medali berbobot tebal dari paduan zinc alloy antique bronze dengan ukiran timbul 3D topografi puncak pegunungan dan lanyard tenun edisi peringatan.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-sans text-slate-400">
                  <div>· Paduan Solid Zinc</div>
                  <div>· Relief Timbul 3D</div>
                  <div>· Lanyard Woven Tebal</div>
                  <div>· Finisher Luring &amp; Virtual</div>
                </div>
              </div>

              {/* ITEM 3: RACE PACK KIT */}
              <div className="space-y-4 group">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-[#FA6D0B]/50 transition-colors">
                  <Image
                    src="/merchandise/racepack.webp"
                    alt="Race Pack Items & Inclusions"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-sm">
                      HARI-H READY
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wider">03 · ESENSIAL ATLET</div>
                  <h3 className="font-display text-xl font-black uppercase text-white tracking-tight">
                    PERLENGKAPAN &amp; LAYANAN HARI-H
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Plat nomor sepeda tahan air, nutrisi gel energi NDR, minuman elektrolit, asuransi kecelakaan resmi, serta voucher hidangan pemulihan di ABEEY.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-sans text-slate-400">
                  <div>· Plat BIB Waterproof</div>
                  <div>· NDR Energy Gel</div>
                  <div>· Asuransi Resmi</div>
                  <div>· Voucher ABEEY Lounge</div>
                </div>
              </div>

            </div>
          </div>

          {/* Minimalist Bottom CTA Strip */}
          <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-sans font-bold text-[#FA6D0B] uppercase tracking-widest block">
                KUOTA TERBATAS · AMANKAN BIB ANDA
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                PILIH KATEGORI &amp; DAPATKAN PAKET ANDA
              </h4>
              <p className="text-xs text-slate-400">
                Pendaftaran ditutup saat kuota per kategori terpenuhi atau batas akhir pendaftaran tercapai.
              </p>
            </div>
            <Link
              href="/daftar"
              className="px-8 py-3.5 rounded-full text-xs font-sans font-black uppercase tracking-wider text-black bg-[#FA6D0B] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_25px_rgba(250,109,11,0.35)]"
            >
              <span>PILIH PAKET &amp; DAFTAR</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EVENT TIMELINE & WAVE DISPATCH RUNDOWN (POIN 2) */}
      {/* ========================================================================= */}
      <section id="jadwal" className="py-24 border-t border-white/10 bg-[#0B0C0E] relative overflow-hidden">
        {/* Subtle orange accent glow atmosphere */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(250,109,11,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <span className="text-sm sm:text-base font-black text-[#FA6D0B] uppercase tracking-widest block font-mono">
                RUNDOWN RESMI // OPERASIONAL BALAPAN
              </span>
              <h2 className="font-nacelle text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                EVENT TIMELINE &amp; WAVE DISPATCH
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Manajemen waktu presisi untuk menjamin keselamatan dan kelancaran 5 kategori balap. Mulai dari sesi Race Pack Collection (RPC), verifikasi Scrutineering fajar, pelepasan gelombang start teratur, hingga panggung podium perayaan di ABEEY Coffee &amp; Eatery.
              </p>
            </div>

            {/* Quick Action / Reference */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/peraturan"
                className="px-5 py-2.5 rounded-full border border-white/15 hover:border-[#FA6D0B]/50 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all flex items-center gap-2"
              >
                <span>ATHLETE GUIDE PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FA6D0B]" />
              </Link>
            </div>
          </div>

          {/* Interactive Tab Switcher: Using Brand Pill Shape rounded-full */}
          <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
            <button
              onClick={() => setActiveScheduleTab('raceday')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 ${
                activeScheduleTab === 'raceday'
                  ? 'bg-[#FA6D0B] text-black'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Flag className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>RACE DAY (HARI-H) // MINGGU, 13 DES 2026</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeScheduleTab === 'raceday' ? 'bg-black/20 text-black font-black' : 'bg-white/10 text-slate-400'
              }`}>
                03:00–21:00 WIB
              </span>
            </button>

            <button
              onClick={() => setActiveScheduleTab('praevent')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 ${
                activeScheduleTab === 'praevent'
                  ? 'bg-[#FA6D0B] text-black'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>PRA-EVENT (H-1) // SABTU, 12 DES 2026</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeScheduleTab === 'praevent' ? 'bg-black/20 text-black font-black' : 'bg-white/10 text-slate-400'
              }`}>
                RPC &amp; BRIEFING
              </span>
            </button>

            <button
              onClick={() => setActiveScheduleTab('matrix')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 ${
                activeScheduleTab === 'matrix'
                  ? 'bg-[#FA6D0B] text-black'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>MATRIKS GELOMBANG (5 KATEGORI)</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeScheduleTab === 'matrix' ? 'bg-black/20 text-black font-black' : 'bg-white/10 text-slate-400'
              }`}>
                WAVE &amp; COT
              </span>
            </button>
          </div>

          {/* TAB 1: RACE DAY ITINERARY */}
          {activeScheduleTab === 'raceday' && (
            <div className="space-y-6">
              
              {/* Context Summary Bar */}
              <div className="rounded-2xl border border-white/10 bg-black/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FA6D0B] shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                      VENUE UTAMA: ABEEY COFFEE &amp; EATERY, HARJAMUKTI — MINGGU, 13 DESEMBER 2026
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Titik Kumpul Start &amp; Finish Terintegrasi Stasiun LRT Harjamukti Cibubur
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400 shrink-0">
                  <span>FLAG OFF: <strong className="text-[#FA6D0B]">05:30 WIB</strong></span>
                  <span className="text-[#FA6D0B]">//</span>
                  <span>FINAL COT: <strong className="text-white">21:00 WIB</strong></span>
                </div>
              </div>

              {/* Vertical Timeline Container */}
              <div className="relative border-l border-white/15 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">

                {/* ITEM 1: PROLOG 30 KM */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-black group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4 hover:border-[#FA6D0B]/40 transition-colors">
                    
                    {/* Header: Pure Typography with Slashes (Zero generic template boxes) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          03:00 — 05:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FA6D0B]">
                          WAJIB KHUSUS 150 &amp; 200 KM
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">RUTE MANDIRI SUBUH</span>
                    </div>

                    <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                      MANDIRI PROLOG 30 KM // REKAMAN GPS MANDIRI
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Peserta kategori 150 km dan 200 km wajib menuntaskan minimal 30 km mandiri dari titik asal masing-masing menuju venue atau di rute sekitar Cibubur sebelum pukul 05:00 WIB. File aktivitas rekam jejak GPS (Garmin, Wahoo, atau Strava GPX/FIT) diverifikasi panitia di Meja Scrutineering fajar.
                    </p>

                    <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-300 space-y-0.5">
                      <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">Mitigasi Keselamatan Mutlak:</strong>
                      <span className="text-slate-400">Peserta yang gagal melampirkan log prolog 30 km atau tiba lewat pukul 05:15 WIB tidak diizinkan masuk starting grid demi mencegah kelelahan berlebih dan risiko medis.</span>
                    </div>
                  </div>
                </div>

                {/* ITEM 2: VENUE OPEN & SCRUTINEERING */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/40 bg-black group-hover:border-white group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4 hover:border-white/25 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          04:30 — 05:15 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                          SEMUA PESERTA LURING
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">ABEEY COFFEE LOUNGE</span>
                    </div>

                    <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                      VENUE OPEN &amp; MEJA SCRUTINEERING AKHIR
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Pintu registrasi ulang dan inspeksi teknis dibuka. Peserta melakukan scan QR e-ticket nomor BIB, verifikasi kelayakan sepeda (rem, ban, drivetrain), serta inspeksi perlengkapan keselamatan wajib.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] font-mono text-slate-300">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FA6D0B] shrink-0" />
                        <span>2 Lampu Depan (400+ lm) &amp; Lampu Belakang</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FA6D0B] shrink-0" />
                        <span>Rompi Reflektif EN ISO 20471 &amp; Helm CE</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FA6D0B] shrink-0" />
                        <span>Plat Nomor Sepeda &amp; Botol Hidrasi Penuh</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ITEM 3: WAVE 1 DISPATCH */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-[#FA6D0B] group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border-2 border-[#FA6D0B]/50 bg-[#0E0F13] space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          05:30 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FA6D0B] text-black font-black">
                          WAVE 1 DISPATCH
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#FA6D0B] font-bold uppercase">FAJAR PERDANA</span>
                    </div>

                    <h3 className="font-nacelle text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      FLAG OFF WAVE 1: ULTRA 200 KM &amp; CROSS 150 KM
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Pelepasan fajar awal untuk memaksimalkan jam cahaya matahari (*daylight hours*) sebelum transisi navigasi malam hari. Mengarungi jalur aspal awal Cibubur–Cileungsi yang steril menuju perbukitan pedalaman Jonggol, Sukamakmur, dan Cariu.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-300">
                      <span>COT 200 KM: <strong className="text-white">19 JAM (00:30 WIB H+1)</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>COT 150 KM: <strong className="text-white">15 JAM (20:30 WIB)</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>MODE: <strong className="text-[#FA6D0B]">EKSPEDISI MANDIRI PENUH</strong></span>
                    </div>
                  </div>
                </div>

                {/* ITEM 4: WAVE 2 DISPATCH */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-[#FA6D0B] group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-[#FA6D0B]/40 bg-[#0E0F13] space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          06:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FA6D0B] text-black font-black">
                          WAVE 2 DISPATCH
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#FA6D0B] font-bold uppercase">KOMPETITIF RESMI</span>
                    </div>

                    <h3 className="font-nacelle text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      FLAG OFF WAVE 2: 120 KM AMAZING RACE (SINGLE &amp; PAIR MIX)
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Pelepasan kategori balap berintensitas tinggi perebutan Top 3 Podium &amp; Jersey Juara Pollride. Jalur steril dari rombongan rekreasi agar dinamika peloton cepat dan formasi aerodinamis dapat terbentuk secara aman.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-300">
                      <span>COT 120 KM: <strong className="text-white">11 JAM (17:00 WIB)</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>LIVE TRACKING: <strong className="text-white">WAJIB AKTIF TERUS</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>PITSTOP: <strong className="text-white">WAJIB 30 MENIT (CP#4)</strong></span>
                    </div>
                  </div>
                </div>

                {/* ITEM 5: WAVE 3 DISPATCH */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/60 bg-white group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4 hover:border-white/20 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          07:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-white/20 text-white font-bold">
                          WAVE 3 DISPATCH
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">CAHAYA MATAHARI PENUH</span>
                    </div>

                    <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                      FLAG OFF WAVE 3: FUN GRAVEL 80 KM &amp; KOMUNITAS 60 KM
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Pelepasan di bawah sinar matahari pagi penuh dengan atmosfer festival dan kebersamaan komunitas. Sangat ramah untuk sepeda lipat (*folding bike*), sepeda hybrid, dan pemula gravel tanpa tekanan persaingan podium.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-300">
                      <span>COT 80 KM: <strong className="text-white">9 JAM (16:00 WIB)</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>COT 60 KM: <strong className="text-white">7 JAM (14:00 WIB)</strong></span>
                      <span className="text-[#FA6D0B] select-none">//</span>
                      <span>ATMOSFER: <strong className="text-white">FESTIVAL &amp; PARADE KOMUNITAS</strong></span>
                    </div>
                  </div>
                </div>

                {/* ITEM 6: PITSTOP 30-MIN REST */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-black group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4 hover:border-[#FA6D0B]/40 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          10:00 — 16:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-[#FA6D0B] text-[#FA6D0B] font-bold">
                          PENALTI 300%
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">CP#4 / CP#6 JONGGOL</span>
                    </div>

                    <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                      MANDATORY 30-MIN NEUTRALIZED PITSTOP // SMART GEOFENCING
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Seluruh peserta 120, 150, dan 200 km wajib mengambil jeda istirahat minimal 30 menit tanpa bergerak yang terverifikasi sensor smart geofencing dan scan barcode check-in/check-out.
                    </p>

                    <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-300 space-y-0.5">
                      <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">Regulasi Waktu Netral:</strong>
                      <span className="text-slate-400">Waktu istirahat 30 menit tidak dihitung dalam race time bersih. Peserta yang keluar pos di bawah 30 menit otomatis diganjar penalti waktu 300% (penambahan 90 menit ke catatan waktu).</span>
                    </div>
                  </div>
                </div>

                {/* ITEM 7: FINISHER ARRIVAL & RECOVERY */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/40 bg-black group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4 hover:border-white/20 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          11:00 — 21:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-white/20 text-white font-bold">
                          SEMUA FINISHER SAH
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">FINISHER GATE ABEEY</span>
                    </div>

                    <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                      FINISHER ARRIVAL, MEDAL CLAIM &amp; ATHLETE RECOVERY LOUNGE
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Penyambutan finisher di ABEEY Coffee &amp; Eatery. Pengalungan Heavy Metal Finisher Medal, verifikasi log GPS akhir, penukaran voucher hidangan hangat, hidrasi isotonik NDR, dan sajian fermented kombucha artisan (Candala, Palapa, Mantra).
                    </p>
                  </div>
                </div>

                {/* ITEM 8: PODIUM CEREMONY */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FA6D0B] bg-[#FA6D0B] group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-[#FA6D0B]/40 bg-[#0E0F13] space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          17:00 — 18:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FA6D0B] text-black font-black">
                          STAGE CEREMONY
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#FA6D0B] font-bold uppercase">PANGGUNG UTAMA</span>
                    </div>

                    <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                      PODIUM CEREMONY 120 KM &amp; COMMUNITY AWARDS
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Penganugerahan piala dan hadiah sponsor bagi Top 3 120 KM Kategori Pria, Wanita, dan Pair Mix. Penyerahan sertifikat Best Spirit Community untuk chapter teraktif, serta pengundian hadiah doorprize utama.
                    </p>
                  </div>
                </div>

                {/* ITEM 9: OFFICIAL COT CLOSING */}
                <div className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/60 bg-white group-hover:scale-125 transition-transform" />
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wider">
                          21:00 WIB
                        </span>
                        <span className="text-[#FA6D0B] font-bold select-none">//</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-white/30 text-white font-bold">
                          BATAS AKHIR MUTLAK
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">VENUE CLOSED</span>
                    </div>

                    <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                      OFFICIAL CUT-OFF TIME (COT) &amp; PENUTUPAN VENUE
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Batas akhir penyelesaian seluruh rute event. Tim sweeper dan paramedis ambulans RS Hermina Cibubur menyelesaikan sapuan jalur terakhir. Operasional panggung resmi selesai.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PRA-EVENT (H-1) */}
          {activeScheduleTab === 'praevent' && (
            <div className="space-y-6">
              
              <div className="rounded-2xl border border-white/10 bg-black/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FA6D0B] shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                      H-1: SABTU, DESEMBER 2026 // ABEEY COFFEE CIBUBUR
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Pengambilan Race Pack, Pengecekan Awal Sepeda &amp; Workshop Keselamatan Rute
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#FA6D0B] shrink-0 font-bold uppercase">
                  WAJIB E-TICKET &amp; IDENTITAS RESMI (KTP/SIM)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Pra-Event Card 1 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4 hover:border-[#FA6D0B]/40 transition-colors">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm font-black text-white">
                      10:00 — 17:00 WIB
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">OFFICIAL RPC DESK</span>
                  </div>

                  <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                    RACE PACK COLLECTION (RPC) &amp; PRE-CHECK
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pengambilan perlengkapan atlet: Jersey Pollride, nomor plat sepeda waterproof, goodie bag, suplemen gel NDR, serta kartu asuransi 1 hari. Pemeriksaan awal fungsi sepeda dapat dilakukan bersama tim mekanik rekanan.
                  </p>

                  <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-400 space-y-0.5">
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">Dokumen Wajib:</strong>
                    <span>E-ticket QR Code pendaftaran &amp; Kartu Identitas Fisik (KTP/SIM/Paspor). Pengambilan diwakilkan wajib menyertakan surat kuasa resmi.</span>
                  </div>
                </div>

                {/* Pra-Event Card 2 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm font-black text-white">
                      11:00 — 12:30 WIB
                    </span>
                    <span className="text-[10px] font-mono text-[#FA6D0B] uppercase font-bold tracking-wider">LIVE INSTAGRAM</span>
                  </div>

                  <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                    COACHING CLINIC: GRAVEL NAVIGATION &amp; GEAR
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sesi edukasi praktis bersama pelatih ketahanan GX-ID. Membedah strategi tekanan angin ban (tire pressure) untuk makadam Jonggol, sinkronisasi rute GPX di head unit Garmin/Wahoo, dan manajemen cairan saat hujan tropis.
                  </p>

                  <div className="border-l-2 border-white/20 pl-4 py-1 text-xs text-slate-400 space-y-0.5">
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">Format Sesi:</strong>
                    <span>Tersedia tatap muka di area outdoor ABEEY Coffee serta siaran langsung di Instagram <strong>@gxid.official</strong>.</span>
                  </div>
                </div>

                {/* Pra-Event Card 3 */}
                <div className="p-8 rounded-2xl border-2 border-[#FA6D0B]/50 bg-[#0E0F13] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm font-black text-white">
                      14:00 — 15:30 WIB
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FA6D0B] text-black font-black">
                      BRIEFING WAJIB
                    </span>
                  </div>

                  <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                    TECHNICAL MEETING &amp; SAFETY WORKSHOP
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pengarahan teknis rute final: pengumuman titik kritis tanjakan Sukamakmur &amp; Cariu, koordinat penempatan ambulans SPGDT RS Hermina Cibubur, tata kelola smart geofencing pitstop 30 menit, dan sistem darurat evakuasi.
                  </p>

                  <div className="border-l-2 border-[#FA6D0B] pl-4 py-1 text-xs text-slate-300 space-y-0.5">
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">Wajib Hadir / Menyimak:</strong>
                    <span className="text-slate-400">Seluruh kapten squad, peserta solo, dan pair mix sangat disarankan hadir atau menyimak rekaman sesi ini sebelum flag off esok paginya.</span>
                  </div>
                </div>

                {/* Pra-Event Card 4 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-[#0E0F13] space-y-4 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm font-black text-white">
                      15:30 — 17:30 WIB
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">COMMUNITY LOUNGE</span>
                  </div>

                  <h3 className="font-nacelle text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                    COMMUNITY GATHERING &amp; BARISTA SOCIAL HOUR
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Temu kangen antar-pesepeda dari 19 chapter GX-ID se-Indonesia. Saling bertukar cerita petualangan ekspedisi mandiri sambil mencicipi racikan kopi dan kombucha khas ABEEY Eatery sebelum kembali istirahat persiapan dini hari.
                  </p>

                  <div className="border-l-2 border-white/20 pl-4 py-1 text-xs text-slate-400 space-y-0.5">
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] block">Akses Lokasi:</strong>
                    <span>Terhubung langsung ke akomodasi sekitar Cibubur Junction dan Stasiun LRT Harjamukti.</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: WAVE DISPATCH MATRIX (TABLE) */}
          {activeScheduleTab === 'matrix' && (
            <div className="space-y-6">
              
              <div className="rounded-2xl border border-white/10 bg-black/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    MATRIKS PERBANDINGAN OPERASIONAL 5 KATEGORI
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Rincian gelombang flag off, syarat prolog, batas waktu Cut-Off Time (COT), dan regulasi lampu wajib.
                  </span>
                </div>
                <span className="text-xs font-mono text-[#FA6D0B] font-bold uppercase">INTERVAL PELEPASAN: 15–30 MENIT</span>
              </div>

              {/* Responsive Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0E0F12]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[11px] uppercase text-slate-400 tracking-wider">
                      <th className="py-4 px-4 sm:px-6">Kategori &amp; Jarak</th>
                      <th className="py-4 px-4">Gelombang &amp; Start</th>
                      <th className="py-4 px-4">Prolog Subuh</th>
                      <th className="py-4 px-4">Cut-Off Time (COT)</th>
                      <th className="py-4 px-4">Pitstop Wajib</th>
                      <th className="py-4 px-4">Standar Lampu</th>
                      <th className="py-4 px-4">Sifat Kategori</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] font-mono">
                    
                    {/* Row 200 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <strong className="text-white text-sm font-nacelle uppercase tracking-tight block">200 KM ULTRA</strong>
                        <span className="text-[11px] text-[#FA6D0B]">Ultra Gravel Grind</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/30 font-bold block w-fit">
                          WAVE 1 (05:30 WIB)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[#FA6D0B] font-bold">
                        Wajib 30 KM (03:00–05:00)
                      </td>
                      <td className="py-4 px-4 text-white font-bold">
                        19 Jam (00:30 WIB H+1)
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        Wajib 30 Min (CP#4)
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        2 Depan (400+ lm) + Rompi EN ISO
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full border border-white/20 text-slate-300 text-[10px]">
                          Ekspedisi Mandiri Ultra
                        </span>
                      </td>
                    </tr>

                    {/* Row 150 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <strong className="text-white text-sm font-nacelle uppercase tracking-tight block">150 KM CROSS</strong>
                        <span className="text-[11px] text-[#FA6D0B]">Cross Endurance</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-[#FA6D0B]/15 text-[#FA6D0B] border border-[#FA6D0B]/30 font-bold block w-fit">
                          WAVE 1 (05:30 WIB)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[#FA6D0B] font-bold">
                        Wajib 30 KM (03:00–05:00)
                      </td>
                      <td className="py-4 px-4 text-white font-bold">
                        15 Jam (20:30 WIB)
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        Wajib 30 Min (CP#4)
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        2 Depan (400+ lm) + Rompi EN ISO
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full border border-white/20 text-slate-300 text-[10px]">
                          Cross Gran Fondo
                        </span>
                      </td>
                    </tr>

                    {/* Row 120 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors bg-[#FA6D0B]/[0.03]">
                      <td className="py-4 px-4 sm:px-6">
                        <strong className="text-white text-sm font-nacelle uppercase tracking-tight block">120 KM AMAZING RACE</strong>
                        <span className="text-[11px] text-[#FA6D0B]">Single &amp; Pair Mix</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-[#FA6D0B] text-black font-black block w-fit">
                          WAVE 2 (06:00 WIB)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        Tidak Ada
                      </td>
                      <td className="py-4 px-4 text-white font-bold">
                        11 Jam (17:00 WIB)
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        Wajib 30 Min (CP#4)
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        Min 1 Depan + Belakang Aktif
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-[#FA6D0B]/20 text-[#FA6D0B] border border-[#FA6D0B]/40 text-[10px] font-bold">
                          KOMPETITIF (PODIUM TOP 3)
                        </span>
                      </td>
                    </tr>

                    {/* Row 80 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <strong className="text-white text-sm font-nacelle uppercase tracking-tight block">80 KM FUN GRAVEL</strong>
                        <span className="text-[11px] text-slate-400">Jonggol Explorer</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full border border-white/20 text-white font-bold block w-fit">
                          WAVE 3 (07:00 WIB)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        Tidak Ada
                      </td>
                      <td className="py-4 px-4 text-white font-bold">
                        9 Jam (16:00 WIB)
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        Fleksibel (Water Station)
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        Rekomendasi Senja/Siang
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full border border-white/10 text-slate-300 text-[10px]">
                          Rekreasi Gravel
                        </span>
                      </td>
                    </tr>

                    {/* Row 60 KM */}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <strong className="text-white text-sm font-nacelle uppercase tracking-tight block">60 KM KOMUNITAS</strong>
                        <span className="text-[11px] text-slate-400">Ramah Seli &amp; Pemula</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full border border-white/20 text-white font-bold block w-fit">
                          WAVE 3 (07:00 WIB)
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        Tidak Ada
                      </td>
                      <td className="py-4 px-4 text-white font-bold">
                        7 Jam (14:00 WIB)
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        Fleksibel (Water Station)
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        Standar Reflektor/Lampu
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full border border-white/10 text-slate-300 text-[10px]">
                          Parade Festival
                        </span>
                      </td>
                    </tr>

                    {/* Row Virtual Ride */}
                    <tr className="hover:bg-white/[0.02] transition-colors bg-white/[0.01]">
                      <td className="py-4 px-4 sm:px-6">
                        <strong className="text-white text-sm font-nacelle uppercase tracking-tight block">VIRTUAL RIDE</strong>
                        <span className="text-[11px] text-white">19 Chapter Nasional</span>
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        Mandiri H-Event
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        Rute Lokal Domisili
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        Sesuai Jarak Pilihan
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        Mandiri
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        Standar Jalan Raya Lokal
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full border border-[#FA6D0B]/40 text-[#FA6D0B] text-[10px] font-bold">
                          Validasi Strava Webhook
                        </span>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Bottom Rule Highlight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-1">
                  <span className="text-[#FA6D0B] font-bold block uppercase">// DISIPLIN JADWAL FLAG OFF</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Peserta yang terlambat pada wave kategorinya akan dilepas di gelombang berikutnya. Namun, catatan waktu resmi (official race time) tetap dihitung sejak gelombang aslinya dilepas (*chasing time penalty*).
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-1">
                  <span className="text-[#FA6D0B] font-bold block uppercase">// LIVE TRACKING AKTIF (120, 150, 200 KM)</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Kategori kompetitif dan ultra wajib menyerahkan tautan pelacakan langsung (Garmin LiveTrack, Strava Beacon, atau WhatsApp Live Location) pada saat Scrutineering fajar untuk pengawasan panitia dan paramedis.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </section>
      <section className="py-20 border-t border-b border-white/10 bg-[#111216]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Image Collage */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop"
                  alt="Gravel Adventure"
                  className="w-full h-52 object-cover rounded-lg filter contrast-105"
                />
                <img
                  src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop"
                  alt="Cyclist Sweat"
                  className="w-full h-40 object-cover rounded-lg filter contrast-105"
                />
              </div>
              <div className="space-y-4 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop"
                  alt="Gravel Bicycle"
                  className="w-full h-40 object-cover rounded-lg filter contrast-105"
                />
                <img
                  src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop"
                  alt="Scenic Forest Trail"
                  className="w-full h-52 object-cover rounded-lg filter contrast-105"
                />
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block">
                BASECAMP & KOMUNITAS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic">
                DIBANGUN OLEH KOMUNITAS, UNTUK KEBERSAMAAN
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Gravel Grindurance bukan sekadar angka kilometer di atas kertas. Ini adalah perayaan 
                persahabatan 80.000 pesepeda dari 19 Chapter se-Indonesia. 
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-[#FA6D0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">ABEEY Coffee & Eatery (Basecamp & Lounge)</strong>
                    <span className="text-slate-400">Titik start dan pemulihan finisher. Nikmati hidangan lokal, kombucha sehat, dan sharing rute bersama teman satu komunitas.</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FA6D0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Akses Ramah Sepeda: Stasiun LRT Harjamukti</strong>
                    <span className="text-slate-400">Hanya beberapa langkah dari venue start. Sepeda lipat maupun road/gravel bike diizinkan masuk gerbong kereta LRT Jabodebek.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/peserta"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#FA6D0B] hover:underline"
                >
                  <span>Cek Rider Roster & Teman Skuad Anda &rarr;</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. RACE OPS & CRITICAL RULES */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold text-[#FA6D0B] uppercase tracking-widest block mb-1">
              REGULASI & KESELAMATAN
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic">
              ATURAN KESELAMATAN & PROLOG
            </h2>
          </div>
          <Link
            href="/peraturan"
            className="text-xs font-bold text-[#FA6D0B] hover:underline flex items-center gap-1"
          >
            <span>Baca Regulasi Lengkap Athlete Guide &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#FA6D0B] font-bold block text-sm">01 / PROLOG 30 KM SUBUH</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">Wajib Untuk 150 & 200 KM</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Peserta kategori 150 km dan 200 km wajib menempuh minimal 30 km mandiri antara pukul 03:00–05:00 WIB. 
              Track GPS diverifikasi panitia di Meja Scrutineering sebelum wave start dilepas.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#FA6D0B] font-bold block text-sm">02 / UN-SUPPORTED EXPEDITION</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">Prinsip Mandiri Penuh</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dilarang membawa mobil pengawal (support car) atau bantuan feeding eksternal pribadi. 
              Peserta mengandalkan logistik mandiri dan warung lokal di sepanjang rute untuk perbekalan.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#15171C] border border-white/10 space-y-3">
            <span className="text-[#FA6D0B] font-bold block text-sm">03 / EMERGENCY MEDICAL BACKUP</span>
            <h4 className="font-display text-lg font-bold text-white uppercase">SPGDT RS Hermina Cibubur</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dukungan ambulans gawat darurat dan tim medis siaga. Nomor darurat SPGDT RS Hermina Cibubur (021-828-1234) 
              wajib disimpan di telepon genggam setiap atlet.
            </p>
          </div>

        </div>

      </section>


      {/* ========================================================================= */}
      {/* 5. FINAL HIGH-ENERGY CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-[#0D0E11] to-black text-center space-y-6">
        <span className="text-xs font-mono font-black text-[#FA6D0B] uppercase tracking-widest block">
          KUOTA TERBATAS // AMBIL NOMOR BIB ANDA SEKARANG
        </span>
        <h2 className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tight text-white italic drop-shadow-md">
          BERANI TAKLUKKAN MEDAN JONGGOL?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Pilih paket Medal Saja atau Medal & Jersey resmi GX-ID Anniversary Edition. 
          Pendaftaran ditutup saat kuota gelombang terpenuhi.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/daftar"
            className="px-10 py-4 sm:px-12 sm:py-5 rounded-full font-display uppercase tracking-wider text-base sm:text-lg font-black bg-[#FA6D0B] hover:bg-[#DE5A00] text-black shadow-[0_0_35px_rgba(250,109,11,0.5)] inline-flex items-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <span>DAFTAR SEKARANG — PILIH KATEGORI</span>
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
          </Link>
        </div>
      </section>

    </div>
  );
}
