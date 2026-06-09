import { NextResponse } from 'next/server';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** First-N Zoom seats offered as the scarcity incentive. */
const ZOOM_CAPACITY = 100;

/**
 * PUBLIC, count-only endpoint for the scarcity banner on /hubzone.
 * Returns ONLY aggregate numbers — no names, emails, or any PII — so it is
 * safe to call from the unauthenticated landing page. (The detailed
 * command-center endpoint stays password-gated.)
 */
export async function GET() {
  try {
    const { count } = await getHubzoneRegistrations(new Date());
    const remaining = Math.max(0, ZOOM_CAPACITY - count);
    return NextResponse.json(
      { registered: count, capacity: ZOOM_CAPACITY, remaining, full: remaining === 0 },
      {
        headers: {
          // Light edge cache so the banner doesn't hammer GHL on every visit.
          'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=120',
        },
      },
    );
  } catch {
    // Never break the landing page — fail soft with a null payload.
    return NextResponse.json({ registered: null, capacity: ZOOM_CAPACITY, remaining: null, full: false });
  }
}
