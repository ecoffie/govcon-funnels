import { NextRequest, NextResponse } from 'next/server';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

const TEAM_AUTH_COOKIE = 'team_hub_admin';
const TEAM_AUTH_MAX_AGE_SECONDS = 60 * 60 * 8;

export function middleware(request: NextRequest) {
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

export const config = {
  matcher: ['/team/:path*'],
};
