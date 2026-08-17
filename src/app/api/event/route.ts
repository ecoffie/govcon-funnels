/**
 * /api/event — first-party analytics beacon. The govcongiants.com SPA (and
 * same-origin pages) POST small event batches here (page_view, cta_click,
 * form_submit, outbound_click, scroll_depth, js_error). Stored in Supabase
 * site_events; read by /dashboard/command-center.
 *
 * Fire-and-forget by design: always 204 on well-formed input, never blocks
 * the client. No cookies, no PII beyond a random client session id.
 */
import { NextRequest, NextResponse } from 'next/server';
import { insertSiteEvents, type SiteEvent } from '@/lib/command-center';
import { enforceIpRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const CORS_ALLOWED_ORIGINS = new Set([
  'https://podcast.govcongiants.org',
  'https://govcongiants.com',
  'https://www.govcongiants.com',
]);

function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin') ?? '';
  if (!CORS_ALLOWED_ORIGINS.has(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: NextRequest) {
  const cors = corsHeaders(request);
  // Beacons are high-volume; generous limit, still blocks abuse. Fail-open
  // limiter behavior inherited from enforceIpRateLimit.
  const limited = await enforceIpRateLimit(request, 'event', 120, 60);
  if (limited) return limited;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 204, headers: cors });
  }

  const events: SiteEvent[] = Array.isArray((body as { events?: unknown[] })?.events)
    ? ((body as { events: SiteEvent[] }).events)
    : [];

  const { inserted } = await insertSiteEvents(events);
  return NextResponse.json({ ok: true, inserted }, { headers: cors });
}
