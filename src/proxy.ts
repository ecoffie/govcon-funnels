import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

const JAN31_BASE = '/jan-31-bootcamp-paid';

// Internal task/project/marketing dashboard APIs — gate hard, fail closed.
// These read/write internal task + project state and expose user rows; none of
// them should be reachable without the admin secret. The dashboard PAGES that
// consume them send `x-admin-password`, so gating here is transparent to them.
function isProtectedApi(pathname: string): boolean {
  return pathname.startsWith('/api/dashboard');
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

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
