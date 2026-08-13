/**
 * Newsletter / lead capture submit.
 *
 * Posts the email to the govcon-funnels lead API (see src/lib/config.ts),
 * which creates/updates the GHL contact, writes a Supabase backup, pings
 * Slack, and sends the welcome email. No API keys ever touch the browser.
 *
 * The Vite env var `VITE_GHL_NEWSLETTER_WEBHOOK` overrides the default
 * endpoint (set it in the Vercel project env, then redeploy). If neither is
 * set, submit() resolves successfully without a network call so the form UX
 * still works in preview — it just doesn't create a lead yet.
 */
import { GHL_WEBHOOK_URL } from './config';

const WEBHOOK_URL =
  (import.meta.env.VITE_GHL_NEWSLETTER_WEBHOOK as string | undefined) || GHL_WEBHOOK_URL;

export interface SignupPayload {
  email: string;
  /** Which form/CTA sent this — used for GHL tagging. */
  source?: string;
}

export async function submitSignup({ email, source }: SignupPayload): Promise<void> {
  const trimmed = email.trim();
  if (!trimmed) throw new Error('Email is required');

  // No webhook configured yet — succeed locally so the UX works in preview.
  if (!WEBHOOK_URL) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[signup] VITE_GHL_NEWSLETTER_WEBHOOK not set — skipping POST.', {
        email: trimmed,
        source,
      });
    }
    return;
  }

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: trimmed,
      source: source ?? 'newsletter',
      site: 'podcast.govcongiants.org',
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error(`Signup failed (${res.status})`);
  }
}
