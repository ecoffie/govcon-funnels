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

/** Primary navigation. The homepage design defines this set. */
export const NAV_LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: '/podcast', label: 'Podcast' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://gcgsummit.com', label: 'Summit', external: true },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/mi', label: 'Mindy' },
];
