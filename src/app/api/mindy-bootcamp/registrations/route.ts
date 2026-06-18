import { NextRequest, NextResponse } from 'next/server';
import { getMindyBootcampRegistrations } from '@/lib/mindy-bootcamp-registrations';
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
 * Password-gated Mindy bootcamp registration summary.
 * Returns real contact detail (PII), so the endpoint requires a password
 * (?password=, x-admin-password header, or Bearer token). Accepts EITHER the
 * dedicated, shareable MINDY_BOOTCAMP_TRACKER_PASSWORD (safe to give the team)
 * OR the shared admin password.
 */
export async function GET(request: NextRequest) {
  const provided = extractPassword(request);
  const trackerPw = process.env.MINDY_BOOTCAMP_TRACKER_PASSWORD;
  const trackerOk = !!provided && !!trackerPw && matches(provided, trackerPw);

  if (!trackerOk && !isAuthorized(provided)) {
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
