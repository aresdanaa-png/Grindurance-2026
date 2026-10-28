import { Category, PackageType, JerseySize, Gender } from '@/lib/types';
import { PricingPhase, CategoryData } from '@/lib/data/categories';

export interface CategoryVisual {
  image: string;
  headline: string;
  subtitle: string;
  elevation: string;
  badge: string;
  terrain: string;
  callToAction: string;
  prologueNote?: string;
}

export interface RiderState {
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
  jersey_sleeve?: 'SHORT' | 'LONG';
}

export interface PromoState {
  code: string;
  discount: number;
  label: string;
}

export interface PromoFeedback {
  status: 'idle' | 'success' | 'error';
  message: string;
}
