import { JerseySize } from '@/lib/types';

export type SizeTier = 'STANDARD' | 'UP_SIZE';

export interface SizeChartItem {
  size: JerseySize;
  chestSizeCm: number; // Lingkar Dada dalam sentimeter
  lengthCm: number;    // Tinggi/Panjang Baju dalam sentimeter
  tier: SizeTier;
  note: 'Standard' | 'Up Size';
  label: string;
}

/**
 * Data Resmi Panduan Ukuran (Size Chart) Jersey Gravel Grindurance 2026
 * Konveksi & Manufaktur: Pollride Apparel
 * Spesifikasi: Short Sleeve without back pocket
 * Sumber: NEW/SIZE CHART.jpeg (Official Reference)
 */
export const OFFICIAL_SIZE_CHART: SizeChartItem[] = [
  { size: 'XS',  chestSizeCm: 86,  lengthCm: 60, tier: 'STANDARD', note: 'Standard', label: 'Extra Small' },
  { size: 'S',   chestSizeCm: 90,  lengthCm: 62, tier: 'STANDARD', note: 'Standard', label: 'Small' },
  { size: 'M',   chestSizeCm: 96,  lengthCm: 64, tier: 'STANDARD', note: 'Standard', label: 'Medium' },
  { size: 'L',   chestSizeCm: 100, lengthCm: 66, tier: 'STANDARD', note: 'Standard', label: 'Large' },
  { size: 'XL',  chestSizeCm: 104, lengthCm: 68, tier: 'STANDARD', note: 'Standard', label: 'Extra Large' },
  { size: '2XL', chestSizeCm: 108, lengthCm: 70, tier: 'UP_SIZE',  note: 'Up Size',  label: 'Double Large (Up Size)' },
  { size: '3XL', chestSizeCm: 112, lengthCm: 72, tier: 'UP_SIZE',  note: 'Up Size',  label: 'Triple Large (Up Size)' },
  { size: '4XL', chestSizeCm: 116, lengthCm: 74, tier: 'UP_SIZE',  note: 'Up Size',  label: '4X Large (Up Size)' },
  { size: '5XL', chestSizeCm: 120, lengthCm: 76, tier: 'UP_SIZE',  note: 'Up Size',  label: '5X Large (Up Size)' },
];

export const STANDARD_SIZES = OFFICIAL_SIZE_CHART.filter((item) => item.tier === 'STANDARD');
export const UP_SIZES = OFFICIAL_SIZE_CHART.filter((item) => item.tier === 'UP_SIZE');

export function getSizeDetails(size: JerseySize): SizeChartItem | undefined {
  return OFFICIAL_SIZE_CHART.find((item) => item.size === size);
}
