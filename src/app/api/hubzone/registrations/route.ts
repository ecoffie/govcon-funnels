import { NextResponse } from 'next/server';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Public, PII-safe HUBZone registration summary.
 * Returns count + redacted names (no emails/phones) — safe to share with the team.
 */
export async function GET() {
  try {
    const summary = await getHubzoneRegistrations(new Date());
    return NextResponse.json(summary, {
      headers: {
        // Cache for 1 min at the edge so a shared link doesn't hammer GHL,
        // while staying fresh enough for a live tracker.
        'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load registrations';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
