import { NextRequest, NextResponse } from 'next/server';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Password-gated HUBZone registration summary.
 * Even though names are redacted (no emails/phones), they are still PII, so
 * the endpoint requires the shared admin password (?password=, x-admin-password
 * header, or Bearer token) — same gate as /api/admin/purchases.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(extractPassword(request))) {
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
