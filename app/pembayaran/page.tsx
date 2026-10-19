'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import InvoiceCockpit from '@/components/payment/InvoiceCockpit';
import { Category, Order, Participant } from '@/lib/types';

// OPSI KATEGORI RESMI UNTUK PREVIEW INVOICE PEMBAYARAN
const PAYMENT_PRESET_CATEGORIES: Record<string, {
  name: string;
  distance: number;
  basePrice: number;
  isPair: boolean;
  bibNumber: number;
  bibNumberPartner?: number;
  badge: string;
}> = {
  '120_SINGLE': {
    name: '120 KM AMAZING RACE (SINGLE)',
    distance: 120,
    basePrice: 450000,
    isPair: false,
    bibNumber: 1201,
    badge: 'OFFICIAL RACE · SINGLE',
  },
  '120_PAIR': {
    name: '120 KM AMAZING RACE (PAIR MIX)',
    distance: 120,
    basePrice: 750000,
    isPair: true,
    bibNumber: 2201,
    bibNumberPartner: 2202,
    badge: 'OFFICIAL RACE · PAIR TANDEM',
  },
  '150': {
    name: '150 KM GRAND FONDO (+30 KM PROLOG MANDIRI)',
    distance: 150,
    basePrice: 450000,
    isPair: false,
    bibNumber: 1501,
    badge: 'GRAND FONDO · PROLOG 30K',
  },
  '200': {
    name: '200 KM ULTRA EXPEDITION (COT 17 JAM)',
    distance: 200,
    basePrice: 450000,
    isPair: false,
    bibNumber: 2001,
    badge: 'ULTRA EXPEDITION · PROLOG 30K',
  },
  '100': {
    name: '100 KM FONDO (MAKADAM SODONG)',
    distance: 101,
    basePrice: 350000,
    isPair: false,
    bibNumber: 8001,
    badge: 'FONDO · EKSPLORASI',
  },
  '60': {
    name: '60 KM FUN RIDE (REKREASI SUKAMAKMUR)',
    distance: 60,
    basePrice: 300000,
    isPair: false,
    bibNumber: 6001,
    badge: 'FUN RIDE · REKREASI',
  },
};

export default function PembayaranPage() {
  const { t } = useLanguage();

  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('120_SINGLE');
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'PAID'>('PENDING');
  const [simulating, setSimulating] = useState(false);

  const activePreset = PAYMENT_PRESET_CATEGORIES[selectedPresetKey] || PAYMENT_PRESET_CATEGORIES['120_SINGLE'];
  const rpcFee = 20000;
  const mealCouponDiscount = 50000;
  const promoDiscount = 50000;
  const totalAmount = Math.max(0, activePreset.basePrice + rpcFee - mealCouponDiscount - promoDiscount);

  const currentCategory: Category = {
    id: selectedPresetKey,
    name: activePreset.name,
    distance_km: activePreset.distance,
    category_type: selectedPresetKey.includes('200') ? 'ultra' : selectedPresetKey.includes('100') ? 'cross' : selectedPresetKey.includes('60') ? 'fun' : 'race',
    is_pair: activePreset.isPair,
    price_medal_only: activePreset.basePrice - 50000,
    price_medal_jersey: activePreset.basePrice,
    quota: 100,
    current_enrolled: 42,
    cot_hours: 11,
    wave_start_time: '06:00',
    prologue_required_km: selectedPresetKey.includes('150') || selectedPresetKey.includes('200') ? 30 : 0,
    mandatory_pitstop_cp: 4,
    tracking_required: true,
    is_active: true,
  };

  const currentOrder: Order = {
    id: `order-demo-${selectedPresetKey}`,
    order_id: 'GX-2026-PAY-8829',
    category_id: selectedPresetKey,
    package_type: 'MEDAL_JERSEY',
    gross_amount: activePreset.basePrice + rpcFee,
    discount_meal_coupon: mealCouponDiscount,
    discount_promo: promoDiscount,
    promo_code: 'GXID2026',
    net_amount: totalAmount,
    payment_status: paymentStatus,
    created_at: new Date().toISOString(),
  };

  const participants: Participant[] = [
    {
      id: 'part-1',
      order_id: currentOrder.id,
      registration_code: `GX26-PAY-${activePreset.bibNumber}`,
      bib_number: activePreset.bibNumber,
      rider_role: activePreset.isPair ? 'PAIR_RIDER_1' : 'SINGLE',
      full_name: 'ADITYA PRATAMA',
      gender: 'male',
      birth_date: '1995-04-12',
      email: 'aditya.pratama@grindurance.id',
      phone_number: '081234567890',
      emergency_contact_name: 'Budi Santoso',
      emergency_contact_phone: '081298765432',
      blood_type: 'O+',
      medical_notes: 'Alergi Penisilin ringan',
      community_chapter: 'GX-ID JABODETABEK',
      category_id: selectedPresetKey,
      jersey_size: 'L',
      has_meal_coupon: true,
      status: paymentStatus === 'PAID' ? 'PAID' : 'REGISTERED',
      prologue_status: 'NOT_REQUIRED',
      qr_checkin_hash: `GXID-${activePreset.bibNumber}-2026`,
      created_at: new Date().toISOString(),
    },
    ...(activePreset.isPair && activePreset.bibNumberPartner ? [{
      id: 'part-2',
      order_id: currentOrder.id,
      registration_code: `GX26-PAY-${activePreset.bibNumberPartner}`,
      bib_number: activePreset.bibNumberPartner,
      rider_role: 'PAIR_RIDER_2' as const,
      full_name: 'RATNA DEWI',
      gender: 'female' as const,
      birth_date: '1997-08-20',
      email: 'ratna.dewi@grindurance.id',
      phone_number: '081298765431',
      emergency_contact_name: 'Dewi Sartika',
      emergency_contact_phone: '081298765433',
      blood_type: 'B+',
      medical_notes: 'Tidak ada riwayat medis',
      community_chapter: 'GX-ID JABODETABEK',
      category_id: selectedPresetKey,
      jersey_size: 'M',
      has_meal_coupon: true,
      status: paymentStatus === 'PAID' ? 'PAID' as const : 'REGISTERED' as const,
      prologue_status: 'NOT_REQUIRED' as const,
      qr_checkin_hash: `GXID-${activePreset.bibNumberPartner}-2026`,
      created_at: new Date().toISOString(),
    }] : [])
  ];

  const handleSimulateSuccess = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      setPaymentStatus('PAID');
    }, 700);
  };

  const handleResetSimulate = () => {
    setPaymentStatus('PENDING');
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Dynamic Cinematic Video Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/perjalanan-siklis-di-jalur-oranye.webp"
          className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15] saturate-[1.1] scale-105"
        >
          <source src="/cta-background.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Vignette & Ambient Overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(10,11,14,0.45) 0%, rgba(10,11,14,0.85) 60%, #0A0B0E 100%)'
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0A0B0E] via-[#0A0B0E]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/90 to-transparent" />

        {/* Ambient Brand Orange Glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[650px] opacity-25"
          style={{
            background: 'radial-gradient(circle at 50% 10%, rgba(250,109,11,0.3) 0%, transparent 65%)'
          }}
        />

        {/* Subtle Horizontal Telemetry Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100%_48px]"
          aria-hidden="true" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <InvoiceCockpit
          order={currentOrder}
          category={currentCategory}
          participants={participants}
          onSimulateSuccess={handleSimulateSuccess}
          isSimulating={simulating}
          showCategoryPresetSwitcher={true}
          onSelectCategoryPreset={setSelectedPresetKey}
          selectedCategoryPresetKey={selectedPresetKey}
          presetCategories={PAYMENT_PRESET_CATEGORIES}
          onResetStatus={handleResetSimulate}
        />
      </div>

    </div>
  );
}
