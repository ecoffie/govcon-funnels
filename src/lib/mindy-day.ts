/**
 * Mindy Day date — the single source of truth for the DISPLAYED date.
 *
 * Lives in its own dependency-free module so both server and client code can
 * import it. `mindy-bootcamp-registrations.ts` (which owns the pace/countdown
 * math) dynamically imports @supabase/supabase-js, so a client component like
 * SiteNav cannot import from there — which is exactly how SiteNav ended up
 * hardcoding "July 25" and still displaying it a month after the date moved to
 * August 22.
 *
 * ⚠️ This does NOT drive scheduling. The reminder CRON schedule lives in
 * `cron_jobs` rows in Supabase (there is no vercel.json cron). Changing the date
 * here changes only what humans READ; the cron rows must be updated separately.
 */

/** ISO date — drives countdown / pace math. */
export const MINDY_DAY_DATE_ISO = '2026-08-22';

/** Full label, e.g. for headings and email copy. */
export const MINDY_DAY_DATE_LABEL = 'Saturday, August 22, 2026';

/** Short label for nav items and tight UI, e.g. "August 22". */
export const MINDY_DAY_SHORT_DATE = 'August 22';
