/**
 * The Mindy Launch (a.k.a. "Mindy Day") registration page.
 *
 * WHY AN ABSOLUTE .org URL AND NOT '/mindy-launch':
 * This SPA has no /mindy-launch route. Its catch-all `path="*"` renders <Home />,
 * so a relative link resolves to a page that returns HTTP 200 while displaying the
 * generic GovCon Giants homepage — a broken link that looks healthy to any status-code
 * check. Verified 2026-08-20 by rendering the page, not by curling it.
 *
 * The real page is served by the Next app on app.govcongiants.org. Linking there is
 * deliberate: govcongiants.com/mindy-launch 308-redirects to exactly this URL anyway
 * (govcon-giants-site/vercel.json), so pointing straight at it removes a redirect hop
 * rather than adding one.
 *
 * WHEN .com SERVES THIS PAGE NATIVELY, change this one constant.
 */
export const MINDY_LAUNCH_URL = 'https://app.govcongiants.org/mindy-launch';

/** Event date — used by the banner. Kept beside the URL so they cannot drift apart. */
export const MINDY_LAUNCH_DATE = 'Saturday, August 22';
export const MINDY_LAUNCH_TIME = '10am–1pm ET';
/** After this instant the banner stops rendering (event over). ET = UTC-4 in August. */
export const MINDY_LAUNCH_ENDS_AT = new Date('2026-08-22T17:00:00Z');
