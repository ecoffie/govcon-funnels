import { NextRequest, NextResponse } from 'next/server';
import { getMindyBootcampRegistrations } from '@/lib/mindy-bootcamp-registrations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Constant-time-ish compare so the tracker password check doesn't leak length/timing. */
function matches(provided: string, expected: string): boolean {
  const candidate = provided.trim();
  if (candidate.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= candidate.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

function extractHeaderPassword(request: NextRequest): string | null {
  const header = request.headers.get('x-admin-password');
  if (header) return header;

  const auth = request.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);

  return null;
}

/**
 * Password-gated Mindy bootcamp registration summary.
 * Returns real contact detail (PII), so the endpoint requires the dedicated
 * MINDY_BOOTCAMP_TRACKER_PASSWORD via header or Bearer token. Do not accept
 * query-string credentials or the shared admin password for this PII export.
 */
export async function GET(request: NextRequest) {
  const provided = extractHeaderPassword(request);
  const trackerPw = process.env.MINDY_BOOTCAMP_TRACKER_PASSWORD?.trim();

  if (!trackerPw) {
    return NextResponse.json({ error: 'MINDY_BOOTCAMP_TRACKER_PASSWORD is not configured' }, { status: 503 });
  }

  if (!provided || !matches(provided, trackerPw)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const summary = await getMindyBootcampRegistrations(new Date());
    return NextResponse.json(summary, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load registrations';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
