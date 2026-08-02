/**
 * Newsletter / lead capture submit.
 *
 * Posts to the main site's lead API (govcongiants.com/api/lead → GHL + Slack),
 * tagged so podcast-site leads are segmentable in the CRM.
 *
 * Why not a GHL inbound webhook env var: Vite inlines `VITE_*` at build time.
 * When `VITE_GHL_NEWSLETTER_WEBHOOK` is unset (current podcast Vercel project),
 * the fetch branch is dead-code-eliminated and forms silently "succeed" with
 * zero network calls — verified live on podcast.govcongiants.org (Jul 30 2026).
 * The main-site `/api/lead` path already has CORS allowlisted for this origin.
 */

const LEAD_API = 'https://govcongiants.com/api/lead';

export interface SignupPayload {
  email: string;
  /** Which form/CTA sent this — used for GHL tagging. */
  source?: string;
}

export async function submitSignup({ email, source }: SignupPayload): Promise<void> {
  const trimmed = email.trim();
  if (!trimmed) throw new Error('Email is required');

  const tagSource = source?.trim() || 'newsletter';
  const res = await fetch(LEAD_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: trimmed,
      name: '',
      source: 'podcast-site',
      tags: ['podcast-site', tagSource],
    }),
    keepalive: true,
  });

  if (!res.ok) {
    throw new Error(`Signup failed (${res.status})`);
  }
}
