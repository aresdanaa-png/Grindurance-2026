'use client';

import { useState, useEffect } from 'react';
import { 
  Category, 
  PackageType, 
  JerseySize, 
  Gender, 
  Order, 
  Participant, 
  RegistrationPayload 
} from '@/lib/types';
import { useLanguage } from '@/lib/context/LanguageContext';
import { getActivePricingPhase, PricingPhase } from '@/lib/data/categories';
import { RiderState, PromoState, PromoFeedback } from './_components/types';
import { 
  JERSEY_SIZES, 
  PROMO_REGISTRY, 
  buildCategoryConfigs, 
  getCategoryVisual, 
  getCategoryDetail, 
  formatRupiah 
} from './_components/configs';
import DaftarCategorySelect from './_components/DaftarCategorySelect';
import DaftarCategoryDetail from './_components/DaftarCategoryDetail';
import DaftarFormStep from './_components/DaftarFormStep';
import DaftarInvoiceStep from './_components/DaftarInvoiceStep';

const DEFAULT_CATEGORY_CONFIGS = buildCategoryConfigs('EARLY_BIRD');
const RACE_120_SINGLE_CONFIG = DEFAULT_CATEGORY_CONFIGS.race120Single;
const RACE_120_PAIR_CONFIG = DEFAULT_CATEGORY_CONFIGS.race120Pair;
const OFFICIAL_CATEGORIES = DEFAULT_CATEGORY_CONFIGS.officialCategories;

export default function RegistrationPage() {
  const { language, t } = useLanguage();

  // Step state: 'select' -> 'detail' -> 'form' -> 'invoice'
  const [currentStep, setCurrentStep] = useState<'select' | 'detail' | 'form' | 'invoice'>('select');
  const [activePhase, setActivePhase] = useState<PricingPhase>('EARLY_BIRD');
  const [categories, setCategories] = useState<Category[]>(OFFICIAL_CATEGORIES);
  const [race120SingleConfig, setRace120SingleConfig] = useState<Category>(RACE_120_SINGLE_CONFIG);
  const [race120PairConfig, setRace120PairConfig] = useState<Category>(RACE_120_PAIR_CONFIG);
  const [selectedCategory, setSelectedCategory] = useState<Category>(RACE_120_SINGLE_CONFIG);
  const [packageType, setPackageType] = useState<PackageType>('MEDAL_JERSEY');
  const [rpcMethod, setRpcMethod] = useState<'PICKUP' | 'HANDLING'>('PICKUP');

  // Pair Active Tab
  const [pairActiveTab, setPairActiveTab] = useState<'rider1' | 'rider2'>('rider1');

  // Input Rider 1
  const [rider1, setRider1] = useState<RiderState>({
    full_name: '',
    nik: '',
    gender: 'male' as Gender,
    birth_date: '',
    religion: 'Islam',
    email: '',
    phone_number: '',
    address_detail: '',
    province_id: '',
    province_name: '',
    regency_id: '',
    regency_name: '',
    district_id: '',
    district_name: '',
    village_id: '',
    village_name: '',
    postal_code: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    blood_type: 'O',
    medical_notes: '',
    community_chapter: 'GX-ID Jabodetabek',
    jersey_size: 'L' as JerseySize,
  });

  // Input Rider 2 (Jika Pair)
  const [rider2, setRider2] = useState<RiderState>({
    full_name: '',
    nik: '',
    gender: 'female' as Gender,
    birth_date: '',
    religion: 'Islam',
    email: '',
    phone_number: '',
    address_detail: '',
    province_id: '',
    province_name: '',
    regency_id: '',
    regency_name: '',
    district_id: '',
    district_name: '',
    village_id: '',
    village_name: '',
    postal_code: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    blood_type: 'B',
    medical_notes: '',
    community_chapter: 'GX-ID Jabodetabek',
    jersey_size: 'M' as JerseySize,
  });

  // Waiver & Submission State
  const [waiverAgreed, setWaiverAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Order Result
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [createdParticipants, setCreatedParticipants] = useState<Participant[]>([]);
  const [simulatingPayment, setSimulatingPayment] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Promo Code State
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoState | null>(null);
  const [promoFeedback, setPromoFeedback] = useState<PromoFeedback>({
    status: 'idle',
    message: '',
  });

  const handleApplyPromo = () => {
    const clean = promoCodeInput.trim().toUpperCase();
    if (!clean) {
      setPromoFeedback({
        status: 'error',
        message: t('Silakan masukkan kode promo.', 'Please enter a promo code.'),
      });
      return;
    }

    const match = PROMO_REGISTRY[clean];
    if (match) {
      if (clean === 'SPECIALPAIR' && !selectedCategory.is_pair) {
        setPromoFeedback({
          status: 'error',
          message: t('Voucher SPECIALPAIR hanya berlaku untuk kategori Pair / Tandem.', 'SPECIALPAIR voucher is only valid for Pair category.'),
        });
        return;
      }
      setAppliedPromo({
        code: clean,
        discount: match.discount,
        label: match.label,
      });
      setPromoFeedback({
        status: 'success',
        message: t(`Kode promo ${clean} aktif! Hemat ${formatRupiah(match.discount)}.`, `Promo code ${clean} applied! Saved ${formatRupiah(match.discount)}.`),
      });
    } else {
      setPromoFeedback({
        status: 'error',
        message: t('Kode promo tidak valid atau kuota telah habis.', 'Invalid promo code or voucher expired.'),
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoFeedback({ status: 'idle', message: '' });
  };

  useEffect(() => {
    const phase = getActivePricingPhase();
    setActivePhase(phase);
    const configs = buildCategoryConfigs(phase);
    setRace120SingleConfig(configs.race120Single);
    setRace120PairConfig(configs.race120Pair);
    setCategories(configs.officialCategories);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        const p = catParam.toLowerCase();
        if (p === '120_pair') {
          setSelectedCategory(configs.race120Pair);
          setCurrentStep('detail');
        } else if (p === '120' || p === '120_single') {
          setSelectedCategory(configs.race120Single);
          setCurrentStep('detail');
        } else {
          const found = configs.officialCategories.find(
            (c) => c.id.toLowerCase() === p || (p === '70' && c.id === '60') || (p === '60' && c.id === '70')
          );
          if (found) {
            setSelectedCategory(found);
            setCurrentStep('detail');
          }
        }
      } else {
        setSelectedCategory(configs.race120Single);
      }

      const stepParam = params.get('step') || params.get('preview');
      if (stepParam === 'invoice' || stepParam === 'payment' || params.get('demo') === '1' || params.get('demo') === 'true') {
        const demoOrder: Order = {
          id: 'demo-order-uuid-8829',
          order_id: 'GX-2026-DEMO-8829',
          category_id: '120_SINGLE',
          package_type: 'MEDAL_JERSEY',
          gross_amount: 450000,
          discount_meal_coupon: 50000,
          discount_promo: 50000,
          promo_code: 'GXID2026',
          net_amount: 350000,
          payment_status: 'PENDING',
          created_at: new Date().toISOString(),
        };
        const demoParticipant: Participant = {
          id: 'demo-part-uuid-1',
          order_id: 'demo-order-uuid-8829',
          registration_code: 'GX26-DEMO-1201',
          bib_number: 1201,
          rider_role: 'SINGLE',
          full_name: 'ADITYA PRATAMA',
          gender: 'male',
          birth_date: '1995-04-12',
          email: 'aditya.pratama@grindurance.id',
          phone_number: '081234567890',
          emergency_contact_name: 'Budi Santoso',
          emergency_contact_phone: '081298765432',
          blood_type: 'O+',
          community_chapter: 'GX-ID Jabodetabek',
          category_id: '120_SINGLE',
          jersey_size: 'L',
          has_meal_coupon: true,
          status: 'REGISTERED',
          prologue_status: 'NOT_REQUIRED',
          qr_checkin_hash: 'GXID-1201-DEMO-2026',
          created_at: new Date().toISOString(),
        };
        setSelectedCategory(RACE_120_SINGLE_CONFIG);
        setCreatedOrder(demoOrder);
        setCreatedParticipants([demoParticipant]);
        setCurrentStep('invoice');
      }
    }

    async function fetchCategories() {
      try {
        const phaseParam = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('phase') || '') : '';
        const res = await fetch(`/api/categories${phaseParam ? `?phase=${phaseParam}` : ''}`);
        const data = await res.json();
        if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          const matched = configs.officialCategories.map((off) => {
            const live = data.categories.find((c: Category) => c.id === off.id || (off.id === '120' && c.id === '120_SINGLE'));
            return live ? {
              ...off,
              current_enrolled: live.current_enrolled,
              quota: live.quota,
              price_medal_only: live.price_medal_only ?? off.price_medal_only,
              price_medal_jersey: live.price_medal_jersey ?? off.price_medal_jersey,
            } : off;
          });
          setCategories(matched);
        }
      } catch (err) {
        console.error('Menggunakan data kategori default resmi:', err);
      }
    }
    fetchCategories();

    const handleResetFlow = () => {
      setCurrentStep('select');
      setErrorMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('reset-daftar-flow', handleResetFlow);
    return () => {
      window.removeEventListener('reset-daftar-flow', handleResetFlow);
    };
  }, []);

  const getAge = (birthDateString: string) => {
    if (!birthDateString) return 25;
    const today = new Date();
    const birth = new Date(birthDateString);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const isEligibleForMealCoupon = () => {
    if (!selectedCategory) return false;
    if (['120', '120_SINGLE', '120_PAIR', '150', '200'].includes(selectedCategory.id)) {
      return true;
    }
    const r1Eligible = rider1.gender === 'female' || (Boolean(rider1.birth_date) && getAge(rider1.birth_date) <= 17);
    if (!selectedCategory.is_pair) {
      return r1Eligible;
    } else {
      const r2Eligible = rider2.gender === 'female' || (Boolean(rider2.birth_date) && getAge(rider2.birth_date) <= 17);
      return r1Eligible || r2Eligible;
    }
  };

  const basePrice = selectedCategory
    ? packageType === 'MEDAL_JERSEY'
      ? selectedCategory.price_medal_jersey
      : selectedCategory.price_medal_only
    : 0;

  const rpcHandlingFee = (rpcMethod === 'HANDLING' && selectedCategory?.id !== 'VIRTUAL') ? 20000 : 0;
  const promoDiscount = appliedPromo ? appliedPromo.discount : 0;
  const hasMealCouponPerk = isEligibleForMealCoupon();
  const netPrice = Math.max(0, basePrice + rpcHandlingFee - promoDiscount);

  const handleSelectToDetail = (cat: Category) => {
    if (cat.id === '120') {
      setSelectedCategory(race120SingleConfig);
    } else {
      setSelectedCategory(cat);
    }
    setCurrentStep('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToForm = () => {
    setCurrentStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!rider1.full_name || !rider1.nik || !rider1.email || !rider1.phone_number || !rider1.emergency_contact_phone) {
      setErrorMessage(t('MOHON LENGKAPI SELURUH DATA WAJIB RIDER 1 (TERMASUK NIK DAN KONTAK DARURAT).', 'PLEASE COMPLETE ALL REQUIRED FIELDS FOR RIDER 1 (INCLUDING ID & EMERGENCY CONTACT).'));
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }
    if (rider1.nik.trim().length !== 16) {
      setErrorMessage(t('NOMOR NIK RIDER 1 WAJIB 16 DIGIT SESUAI KTP.', 'RIDER 1 ID NUMBER MUST BE EXACTLY 16 DIGITS.'));
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }
    if (!rider1.province_id || !rider1.regency_id || !rider1.district_id || !rider1.address_detail) {
      setErrorMessage(t('MOHON LENGKAPI ALAMAT DOMISILI RIDER 1.', 'PLEASE COMPLETE RESIDENTIAL ADDRESS FOR RIDER 1.'));
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    if (selectedCategory.is_pair) {
      if (!rider2.full_name || !rider2.nik || !rider2.email || !rider2.phone_number || !rider2.emergency_contact_phone) {
        setErrorMessage(t('MOHON LENGKAPI SELURUH DATA WAJIB RIDER 2 (PARTNER).', 'PLEASE COMPLETE ALL REQUIRED FIELDS FOR RIDER 2 (PARTNER).'));
        window.scrollTo({ top: 250, behavior: 'smooth' });
        return;
      }
      if (rider2.nik.trim().length !== 16) {
        setErrorMessage(t('NOMOR NIK RIDER 2 WAJIB 16 DIGIT SESUAI KTP.', 'RIDER 2 ID NUMBER MUST BE EXACTLY 16 DIGITS.'));
        window.scrollTo({ top: 250, behavior: 'smooth' });
        return;
      }
      if (!rider2.province_id || !rider2.regency_id || !rider2.district_id || !rider2.address_detail) {
        setErrorMessage(t('MOHON LENGKAPI ALAMAT DOMISILI RIDER 2.', 'PLEASE COMPLETE RESIDENTIAL ADDRESS FOR RIDER 2.'));
        window.scrollTo({ top: 250, behavior: 'smooth' });
        return;
      }
    }

    if (!waiverAgreed) {
      setErrorMessage(t('ANDA WAJIB MENYETUJUI SURAT PERNYATAAN KESELAMATAN (WAIVER) SEBELUM MELANJUTKAN.', 'YOU MUST AGREE TO THE SAFETY WAIVER BEFORE PROCEEDING.'));
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    try {
      const payload: RegistrationPayload = {
        category_id: selectedCategory.id,
        package_type: packageType,
        rpc_method: rpcMethod,
        promo_code: appliedPromo?.code,
        rider_1: rider1,
        rider_2: selectedCategory.is_pair ? rider2 : undefined,
        waiver_agreed: waiverAgreed,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || t('Gagal memproses pendaftaran.', 'Failed to process registration.'));
      }

      setCreatedOrder(result.order);
      setCreatedParticipants(result.participants);
      setCurrentStep('invoice');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || t('Terjadi kesalahan sistem saat menghubungi server.', 'A system error occurred while contacting the server.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!createdOrder) return;
    setSimulatingPayment(true);
    try {
      const res = await fetch('/api/payment/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: createdOrder.order_id }),
      });
      const data = await res.json();
      if (data.success) {
        setCreatedOrder(data.order);
        setCreatedParticipants(data.participants);
      }
    } catch (err) {
      console.error('Gagal simulasi pembayaran:', err);
    } finally {
      setSimulatingPayment(false);
    }
  };

  const detailCategoryData = getCategoryDetail(selectedCategory.id);
  const detailVisual = getCategoryVisual(selectedCategory.id, t);

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F3F4F6] font-sans selection:bg-[#FA6D0B] selection:text-black pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(13,14,17,0.45) 0%, rgba(13,14,17,0.85) 60%, #0D0E11 100%)'
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0D0E11] via-[#0D0E11]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/90 to-transparent" />

        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[650px] opacity-25"
          style={{
            background: 'radial-gradient(circle at 50% 10%, rgba(250,109,11,0.3) 0%, transparent 65%)'
          }}
        />

        <div 
          className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100%_48px]"
          aria-hidden="true" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* STEP 1: PILIH KATEGORI */}
        {currentStep === 'select' && (
          <DaftarCategorySelect
            categories={categories}
            activePhase={activePhase}
            onSelectCategory={handleSelectToDetail}
            formatRupiah={formatRupiah}
            getCategoryVisual={getCategoryVisual}
            t={t}
          />
        )}

        {/* STEP 2: DETAIL KATEGORI */}
        {currentStep === 'detail' && (
          <DaftarCategoryDetail
            selectedCategory={selectedCategory}
            detailCategoryData={detailCategoryData}
            detailVisual={detailVisual}
            activePhase={activePhase}
            language={language}
            race120SingleConfig={race120SingleConfig}
            race120PairConfig={race120PairConfig}
            setSelectedCategory={setSelectedCategory}
            onBack={() => {
              setCurrentStep('select');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onProceed={handleProceedToForm}
            formatRupiah={formatRupiah}
            t={t}
          />
        )}

        {/* STEP 3: FORMULIR PENDAFTARAN ATLET & WAIVER */}
        {currentStep === 'form' && (
          <DaftarFormStep
            selectedCategory={selectedCategory}
            packageType={packageType}
            setPackageType={setPackageType}
            rpcMethod={rpcMethod}
            setRpcMethod={setRpcMethod}
            pairActiveTab={pairActiveTab}
            setPairActiveTab={setPairActiveTab}
            rider1={rider1}
            setRider1={setRider1}
            rider2={rider2}
            setRider2={setRider2}
            promoCodeInput={promoCodeInput}
            setPromoCodeInput={setPromoCodeInput}
            appliedPromo={appliedPromo}
            promoFeedback={promoFeedback}
            handleApplyPromo={handleApplyPromo}
            handleRemovePromo={handleRemovePromo}
            waiverAgreed={waiverAgreed}
            setWaiverAgreed={setWaiverAgreed}
            submitting={submitting}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            activePhase={activePhase}
            hasMealCouponPerk={hasMealCouponPerk}
            netPrice={netPrice}
            promoDiscount={promoDiscount}
            rpcHandlingFee={rpcHandlingFee}
            jerseySizes={JERSEY_SIZES}
            race120SingleConfig={race120SingleConfig}
            race120PairConfig={race120PairConfig}
            setSelectedCategory={setSelectedCategory}
            onBackToDetail={() => {
              setCurrentStep('detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToSelect={() => {
              setCurrentStep('select');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmit={handleFinalSubmit}
            formatRupiah={formatRupiah}
            t={t}
          />
        )}

        {/* STEP 4: INVOICE RESMI & PEMBAYARAN */}
        {currentStep === 'invoice' && createdOrder && (
          <DaftarInvoiceStep
            createdOrder={createdOrder}
            createdParticipants={createdParticipants}
            selectedCategory={selectedCategory}
            simulatingPayment={simulatingPayment}
            copiedField={copiedField}
            setCopiedField={setCopiedField}
            handleSimulatePayment={handleSimulatePayment}
            t={t}
          />
        )}
      </div>
    </div>
  );
}
