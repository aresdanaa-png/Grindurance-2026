import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('distance_km', { ascending: true });

    if (error) {
      console.error('Error fetching categories from Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const cotHoursMap: Record<string, number> = {
      '60': 7.0,
      '80': 9.0,
      '120_SINGLE': 11.0,
      '120_PAIR': 11.0,
      '150': 15.0,
      '200': 19.0,
    };

    const updatedCategories = (categories || []).map((cat) => ({
      ...cat,
      cot_hours: cotHoursMap[cat.id] ?? cat.cot_hours,
    }));

    return NextResponse.json({
      success: true,
      categories: updatedCategories,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
