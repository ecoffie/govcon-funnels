import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JAN31_BASE = '/jan-31-bootcamp-paid';

export function middleware(request: NextRequest) {
  // Only apply when you want to run the site as "Jan 31 funnel only"
  if (process.env.ONLY_JAN31_FUNNEL !== '1') {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

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
