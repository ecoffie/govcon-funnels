import { NextRequest, NextResponse } from 'next/server';

/**
 * Access gate for internal /team/* pages (the YouTube Command Center + the batch
 * production hubs). `noindex` only hides a page from Google — anyone who scans or
 * guesses the URL still sees it (Eric, 2026-07-18). This puts a real shared-password
 * gate in front of the whole /team area.
 *
 * Basic Auth (not a login form) on purpose: these pages are STATIC files under
 * public/team/, which an app-route password form can't protect — middleware runs
 * before the static file is served, so it can.
 *
 * FAIL CLOSED: if TEAM_ACCESS_PASSWORD is unset/misloaded, everyone is denied — a
 * missing env var can never silently expose /team. Set it in Vercel Prod with
 * `printf 'pw' | vercel env add TEAM_ACCESS_PASSWORD production` (printf, not echo —
 * a trailing \n breaks the length-exact compare).
 */

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const expected = process.env.TEAM_ACCESS_PASSWORD || '';

  const deny = () =>
    new NextResponse('Authentication required — internal GovCon Giants team page.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="GovCon Giants — Team", charset="UTF-8"',
        'Cache-Control': 'no-store',
      },
    });

  if (!expected) return deny(); // fail closed — no password configured

  const header = req.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return deny();

  let decoded = '';
  try {
    decoded = atob(header.slice(6));
  } catch {
    return deny();
  }
  // "username:password" — username is ignored, only the password must match.
  const password = decoded.slice(decoded.indexOf(':') + 1);
  if (!safeEqual(password, expected)) return deny();

  return NextResponse.next();
}

export const config = {
  matcher: ['/team/:path*'],
};
