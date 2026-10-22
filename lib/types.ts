export type CategoryType = 'fun' | 'race' | 'cross' | 'ultra' | 'virtual';

export interface Category {
  id: string; // '60', '80', '120_SINGLE', '120_PAIR', '150', '200', 'VIRTUAL'
  name: string;
  distance_km: number;
  category_type: CategoryType;
  is_pair: boolean;
  price_medal_only: number;
  price_medal_jersey: number;
  quota: number;
  current_enrolled: number;
  cot_hours: number | null;
  wave_start_time: string | null;
  prologue_required_km: number;
  mandatory_pitstop_cp: number | null;
  tracking_required: boolean;
  is_active: boolean;
}

export type PackageType = 'MEDAL_ONLY' | 'MEDAL_JERSEY';
export type PaymentStatus = 'PENDING' | 'PENDING_VERIFICATION' | 'PAID' | 'EXPIRED' | 'FAILED' | 'CANCELLED' | 'REJECTED';
export type RiderRole = 'SINGLE' | 'PAIR_RIDER_1' | 'PAIR_RIDER_2';
export type JerseySize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | '4XL' | '5XL';
export type Gender = 'male' | 'female';

export interface Order {
  id: string;
  order_id: string;
  category_id: string;
  package_type: PackageType;
  gross_amount: number;
  discount_meal_coupon: number;
  discount_promo?: number;
  promo_code?: string | null;
  net_amount: number;
  payment_status: PaymentStatus;
  payment_channel?: string | null;
  va_number?: string | null;
  bank_name?: string | null;
  qris_url?: string | null;
  snap_token?: string | null;
  payment_url?: string | null;
  proof_of_payment_url?: string | null;
  paid_at?: string | null;
  verified_at?: string | null;
  verified_by?: string | null;
  admin_notes?: string | null;
  raw_payload?: any;
  created_at: string;
  updated_at?: string;
}

export interface Participant {
  id: string;
  order_id: string;
  registration_code: string;
  bib_number?: number | null;
  rider_role: RiderRole;
  full_name: string;
  gender: Gender;
  birth_date?: string | null;
  email: string;
  phone_number: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  blood_type: string;
  community_chapter: string;
  category_id: string;
  jersey_size: string;
  has_meal_coupon: boolean;
  nik?: string;
  address_detail?: string;
  province_id?: string;
  province_name?: string;
  regency_id?: string;
  regency_name?: string;
  district_id?: string;
  district_name?: string;
  village_id?: string;
  village_name?: string;
  postal_code?: string;
  medical_notes?: string;
  religion?: string;
  status: 'REGISTERED' | 'PAID' | 'PROLOG_VERIFIED' | 'CHECKED_IN' | 'DNF' | 'FINISHER';
  prologue_status: 'NOT_REQUIRED' | 'WAITING_VERIFICATION' | 'PASSED' | 'REJECTED';
  qr_checkin_hash?: string | null;
  checked_in_at?: string | null;
  created_at: string;
}

// Data input formulir pendaftaran
export interface RiderFormData {
  full_name: string;
  nik: string;
  gender: Gender;
  birth_date: string;
  religion: string;
  email: string;
  phone_number: string;
  address_detail: string;
  province_id: string;
  province_name: string;
  regency_id: string;
  regency_name: string;
  district_id: string;
  district_name: string;
  village_id: string;
  village_name: string;
  postal_code: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  blood_type: string;
  medical_notes: string;
  community_chapter: string;
  jersey_size: JerseySize;
}

export interface RegistrationPayload {
  category_id: string;
  package_type: PackageType;
  rpc_method?: 'PICKUP' | 'HANDLING';
  promo_code?: string;
  rider_1: RiderFormData;
  rider_2?: RiderFormData; // Wajib jika category_id === '120_PAIR'
  waiver_agreed: boolean;
}
