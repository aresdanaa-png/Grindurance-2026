import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { 
  getActivePricingPhase, 
  getPricesForCategory, 
  EARLY_BIRD_PRICES, 
  REGULAR_PRICES,
  REGISTRATION_GO_LIVE_DATE_ISO,
  EARLY_BIRD_END_DATE_ISO, 
  REGULAR_START_DATE_ISO,
  REGISTRATION_CLOSE_DATE_ISO,
  EVENT_DATE_ISO,
  PricingPhase
} from '@/lib/data/categories';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phaseParam = searchParams.get('phase') || searchParams.get('tier');
    const dateParam = searchParams.get('date');

    let activePhase: PricingPhase;
    if (phaseParam) {
      const p = phaseParam.toUpperCase();
      if (p === 'EARLY_BIRD' || p === 'EARLYBIRD' || p === 'EARLY') activePhase = 'EARLY_BIRD';
      else if (p === 'REGULAR' || p === 'REGULER') activePhase = 'REGULAR';
      else if (p === 'CLOSED' || p === 'TUTUP') activePhase = 'CLOSED';
      else activePhase = getActivePricingPhase(dateParam ? new Date(dateParam) : undefined);
    } else {
      activePhase = getActivePricingPhase(dateParam ? new Date(dateParam) : undefined);
    }

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
      '70': 7.0,
      '80': 9.5,
      '100': 9.5,
      '120': 11.0,
      '120_SINGLE': 11.0,
      '120_PAIR': 11.0,
      '150': 15.0,
      '200': 17.0,
    };

    const updatedCategories = (categories || []).map((cat) => {
      const activePrice = getPricesForCategory(cat.id, activePhase);
      const ebPrice = EARLY_BIRD_PRICES[cat.id] || activePrice;
      const regPrice = REGULAR_PRICES[cat.id] || activePrice;

      return {
        ...cat,
        price_medal_only: activePrice.medal,
        price_medal_jersey: activePrice.jersey,
        cot_hours: cotHoursMap[cat.id] ?? cat.cot_hours,
        early_bird: ebPrice,
        regular: regPrice,
      };
    });

    return NextResponse.json({
      success: true,
      active_phase: activePhase,
      is_registration_closed: activePhase === 'CLOSED',
      timeline: {
        registration_go_live: REGISTRATION_GO_LIVE_DATE_ISO,
        early_bird_end: EARLY_BIRD_END_DATE_ISO,
        regular_start: REGULAR_START_DATE_ISO,
        registration_close: REGISTRATION_CLOSE_DATE_ISO,
        event_date: EVENT_DATE_ISO,
      },
      categories: updatedCategories,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
