import { NextRequest, NextResponse } from 'next/server';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Constant-time-ish compare so the tracker password check doesn't leak length/timing. */
function matches(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Password-gated HUBZone registration summary.
 * Even though names are redacted (no emails/phones), they are still PII, so
 * the endpoint requires a password (?password=, x-admin-password header, or
 * Bearer token). Accepts EITHER the dedicated, shareable HUBZONE_TRACKER_PASSWORD
 * (safe to give the team) OR the shared admin password used by /api/admin/purchases.
 */
export async function GET(request: NextRequest) {
  const provided = extractPassword(request);
  const trackerPw = process.env.HUBZONE_TRACKER_PASSWORD;
  const trackerOk = !!provided && !!trackerPw && matches(provided, trackerPw);

  if (!trackerOk && !isAuthorized(provided)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const summary = await getHubzoneRegistrations(new Date());
    return NextResponse.json(summary, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load registrations';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
