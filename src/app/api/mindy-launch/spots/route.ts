import { NextResponse } from 'next/server';
import { countLeadsBySource } from '@/lib/supabase-leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * PUBLIC, count-only endpoint for the Mindy Launch (June 27) scarcity banner.
 * Returns ONLY aggregate numbers — no names/emails/PII — so it is safe to call
 * from the unauthenticated static landing page (served from the funnels-one
 * project, proxied to govcongiants.com/mindy-launch).
 *
 * Everyone who registers gets the live Zoom link (emailed before the event);
 * this count powers the "X already registered" social-proof banner.
 */
export async function GET() {
  const count = await countLeadsBySource('mindy-launch');
  if (count === null) {
    // Fail soft — never break the landing page. Banner hides on null.
    return NextResponse.json({ registered: null });
  }
  return NextResponse.json(
    { registered: count },
    {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=120',
      },
    }
  );
}
