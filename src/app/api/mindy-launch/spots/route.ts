import { NextResponse } from 'next/server';
import { countLeadsBySource, MINDY_LAUNCH_ZOOM_CAP } from '@/lib/supabase-leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * PUBLIC, count-only endpoint for the Mindy Launch (June 27) scarcity banner.
 * Returns ONLY aggregate numbers — no names/emails/PII — so it is safe to call
 * from the unauthenticated static landing page (served from the funnels-one
 * project, proxied to govcongiants.com/mindy-launch).
 *
 * Scarcity: first MINDY_LAUNCH_ZOOM_CAP signups get the live Zoom link;
 * everyone after watches on YouTube.
 */
export async function GET() {
  const count = await countLeadsBySource('mindy-launch');
  if (count === null) {
    // Fail soft — never break the landing page. Banner hides on null.
    return NextResponse.json({
      registered: null,
      zoomCap: MINDY_LAUNCH_ZOOM_CAP,
      remaining: null,
      full: false,
    });
  }
  const remaining = Math.max(0, MINDY_LAUNCH_ZOOM_CAP - count);
  return NextResponse.json(
    {
      registered: count,
      zoomCap: MINDY_LAUNCH_ZOOM_CAP,
      remaining,
      full: remaining === 0,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=120',
      },
    }
  );
}
