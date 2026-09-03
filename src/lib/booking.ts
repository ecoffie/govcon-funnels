/**
 * Shared booking destinations.
 *
 * Partner pages originally guessed segment-specific Calendly slugs
 * (`/partnership`, `/apex-partnership`, `/sbdc-partnership`,
 * `/chamber-partnership`). Those events were never created — they return
 * HTTP 404. Use the known-live discovery call for every partner CTA.
 */
export const PARTNERSHIP_CALL_URL =
  'https://calendly.com/govconedumeet/gcg-bd-discovery';
