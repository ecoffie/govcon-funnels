import { NextRequest, NextResponse } from 'next/server';

/**
 * Backwards-compatible redirect for legacy /dashboard.html links.
 * next.config rewrites /dashboard.html to this route.
 */
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/dashboard', request.url), 307);
}
