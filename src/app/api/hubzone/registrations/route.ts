import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Retired HUBZone registration command-center API.
 * Always 404 — no auth, no env secret reads, no registrant data loader.
 */
function retired(): NextResponse {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function GET(): Promise<NextResponse> {
  return retired();
}
