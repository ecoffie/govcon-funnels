/**
 * Lead capture endpoint for the signup forms.
 *
 * POSTs to the govcon-funnels (Next.js) lead API, which fans out to
 * GoHighLevel (contact create/update + tags), a Supabase backup row,
 * Slack notification, and the confirmation email. That app lives at
 * app.govcongiants.org since the Aug 2026 domain swap and allows
 * cross-origin POSTs from govcongiants.com / podcast.govcongiants.org
 * (see CORS_ALLOWED_ORIGINS in src/app/api/lead/route.ts there).
 *
 * Previously this held a GHL inbound-webhook URL and stayed a placeholder,
 * which silently dropped every signup to localStorage. Do NOT revert to the
 * placeholder — if the endpoint changes, update it here.
 */
export const GHL_WEBHOOK_URL: string = 'https://app.govcongiants.org/api/lead';
