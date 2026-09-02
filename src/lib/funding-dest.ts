/**
 * Clickthrough is counted before forwarding. Update FUNDING_DEST in one place
 * if the destination ever changes; /funding, /encore-funding, homepage, hubzone,
 * and guide CTAs all import it.
 *
 * ⚠️ VERIFY THE DESTINATION RETURNS 200 BEFORE CHANGING THIS. It has broken once
 * already: in June 2026 we repointed from gov.encore-funding.com to Encore's then-new
 * SEO site (encoregov.com + /government-contractor-financing). By 2026-08-24 Encore
 * had reversed that migration — encoregov.com now 307s straight back to
 * gov.encore-funding.com, and the old SEO paths do NOT exist there, so every
 * referral we sent landed on a 404. A partner's redirect is not ours to control;
 * the only safe destination is one we have curled.
 *
 * Now pointed at Encore's own GovCon Giants partner page — purpose-built for our
 * referrals (title: "GovCon Giants Partner: Government Contractor Funding"), on
 * the host they actually serve. Verified 2026-08-24 and re-verified 2026-09-02:
 * HTTP 200, and the UTM query string passes through intact.
 *
 * encoregov.com origin (no path) still 200s after the 307 and is fine for emails.
 */
export const FUNDING_DEST =
  'https://gov.encore-funding.com/govcon-giants-partner-government-contractor-funding/?utm_source=Eric+Coffie&utm_medium=Referral';
