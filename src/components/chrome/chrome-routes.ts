/*
 * Which routes get the shared site header and footer. Kept in one place so the
 * header and footer can never disagree about where they appear.
 */

/** App surfaces with their own chrome: no site header or footer. */
export function isAppSurface(pathname: string): boolean {
  return pathname.startsWith('/dashboard') || pathname.startsWith('/internal');
}

/** Encore Funding partner pages: minimal partner header, no GovCon Giants footer. */
export function isPartnerPage(pathname: string): boolean {
  return pathname.startsWith('/encore');
}

/**
 * Primary navigation. The homepage design defines this set.
 * Summit is held out until gcgsummit.com is reachable again (TLS fails, HTTP 409
 * Cloudflare 1001 as of 2026-10-27). Re-add it once a working destination is confirmed.
 */
export const NAV_LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: '/podcast', label: 'Podcast' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: 'https://ericcoffie.com', label: 'Eric Coffie', external: true },
  { href: '/mi', label: 'Mindy' },
];
