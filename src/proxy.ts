import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

const JAN31_BASE = '/jan-31-bootcamp-paid';
const TEAM_AUTH_COOKIE = 'team_hub_admin';
const TEAM_AUTH_MAX_AGE_SECONDS = 60 * 60 * 8;

function protectTeamHub(request: NextRequest) {
  const provided = extractPassword(request);
  const cookie = request.cookies.get(TEAM_AUTH_COOKIE)?.value;
  const authorizedByRequest = isAuthorized(provided);

  if (!authorizedByRequest && !isAuthorized(cookie)) {
    // Do not confirm that internal static team packages exist.
    return new NextResponse('Not found', { status: 404 });
  }

  const response = NextResponse.next();
  if (authorizedByRequest && provided) {
    response.cookies.set(TEAM_AUTH_COOKIE, provided, {
      httpOnly: true,
      sameSite: 'strict',
      secure: request.nextUrl.protocol === 'https:',
      maxAge: TEAM_AUTH_MAX_AGE_SECONDS,
      path: '/team',
    });
  }
  return response;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/team' || pathname.startsWith('/team/')) {
    return protectTeamHub(request);
  }

  // Only apply when you want to run the site as "Jan 31 funnel only"
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
