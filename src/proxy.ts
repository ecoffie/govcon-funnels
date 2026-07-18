import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

const JAN31_BASE = '/jan-31-bootcamp-paid';

// Constant-time-ish string compare for the /team password gate.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Internal /team/* pages (YouTube Command Center + batch production hubs) are served
// from a PRIVATE dir via src/app/team/[[...slug]]/route.ts (not public/), so this proxy
// runs before the content is returned. Gate them behind a shared password (Basic Auth).
// `noindex` only hides from Google — anyone scanning the URL could read them otherwise
// (Eric, 2026-07-18). FAIL CLOSED: no TEAM_ACCESS_PASSWORD set → deny everyone.
function teamGate(request: NextRequest): NextResponse | null {
  const p = request.nextUrl.pathname;
  if (p !== '/team' && !p.startsWith('/team/')) return null;
  const expected = process.env.TEAM_ACCESS_PASSWORD || '';
  const deny = () =>
    new NextResponse('Authentication required - internal GovCon Giants team page.', {
      status: 401,
      headers: {
        // Header VALUES must be ASCII — no em-dash here or the response construction
        // throws (500). Body below can be UTF-8; this realm cannot.
        'WWW-Authenticate': 'Basic realm="GovCon Giants Team"',
        'Cache-Control': 'no-store',
      },
    });
  if (!expected) return deny();
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return deny();
  let decoded = '';
  try {
    decoded = atob(header.slice(6));
  } catch {
    return deny();
  }
  const password = decoded.slice(decoded.indexOf(':') + 1); // username ignored
  return safeEqual(password, expected) ? null : deny();
}

// Internal task/project/marketing dashboard APIs — gate hard, fail closed.
// These read/write internal task + project state and expose user rows; none of
// them should be reachable without the admin secret. The dashboard PAGES that
// consume them send `x-admin-password`, so gating here is transparent to them.
function isProtectedApi(pathname: string): boolean {
  return pathname.startsWith('/api/dashboard');
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Password-gate all internal /team/* pages (runs before any funnel logic).
  const teamDenied = teamGate(request);
  if (teamDenied) return teamDenied;

  // Auth gate runs first and independently of ONLY_JAN31_FUNNEL, so the
  // internal dashboard surface is never exposed regardless of funnel mode.
  if (isProtectedApi(pathname) && !isAuthorized(extractPassword(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Only apply funnel redirects when running the site as "Jan 31 funnel only"
  if (process.env.ONLY_JAN31_FUNNEL !== '1') {
    return NextResponse.next();
  }

  // Allow the funnel and API/static assets
  if (pathname.startsWith(JAN31_BASE) || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  // Allow static files (favicon, images, etc.)
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }

  // Map root and common paths to the funnel so links still work
  if (pathname === '/') return NextResponse.redirect(new URL(JAN31_BASE, request.url));
  if (pathname === '/checkout') return NextResponse.redirect(new URL(`${JAN31_BASE}/checkout`, request.url));
  if (pathname === '/success') return NextResponse.redirect(new URL(`${JAN31_BASE}/success`, request.url));
  if (pathname === '/course') return NextResponse.redirect(new URL(`${JAN31_BASE}/course`, request.url));

  // Everything else → funnel landing
  return NextResponse.redirect(new URL(JAN31_BASE, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
