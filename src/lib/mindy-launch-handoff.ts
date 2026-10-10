/**
 * Mindy Launch confirmation handoff (issue #215).
 *
 * govcongiants.com does not send the mindy-launch confirmation itself. It asks
 * getmindy.ai (market-assassin /api/mindy-launch/send-confirmation) to send it, so the
 * email goes through Mindy's guarded sender. This module makes that call and reports
 * what actually happened, in three states:
 *
 *   confirmed — getmindy.ai says a provider (Resend or Office365) ACCEPTED the message.
 *               Acceptance is not delivery; bounces arrive later on the Mindy side.
 *   failed    — definitely nothing was sent: not configured, refused (auth/validation),
 *               blocked by the send guard, or both providers failed.
 *   pending   — the request may have reached getmindy.ai but we never saw the outcome:
 *               timeout, network error, an unstructured 5xx, or a response that doesn't
 *               state provider acceptance. An HTTP 200 alone is NOT confirmation.
 *
 * NO RETRIES, deliberately. The endpoint sends one email per request and has no
 * idempotency store, so retrying a request whose outcome we didn't see (pending) is
 * exactly how a registrant would get two confirmations. One call per registration;
 * an unknown outcome is surfaced, never retried.
 *
 * Never throws.
 */

export type ConfirmationOutcome =
  | { state: 'confirmed'; provider: 'resend' | 'office365'; providerMessageId: string | null }
  | { state: 'failed'; reason: string }
  | { state: 'pending'; reason: string };

export const DEFAULT_HANDOFF_TIMEOUT_MS = 15_000;

function timeoutMs(): number {
  const n = Number(process.env.MINDY_LAUNCH_SEND_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_HANDOFF_TIMEOUT_MS;
}

export async function handOffMindyLaunchConfirmation(lead: { email: string; name: string }): Promise<ConfirmationOutcome> {
  const url = process.env.MINDY_LAUNCH_SEND_URL;
  const secret = process.env.MINDY_LAUNCH_SEND_SECRET;
  if (!url || !secret) {
    return { state: 'failed', reason: 'not configured (MINDY_LAUNCH_SEND_URL / MINDY_LAUNCH_SEND_SECRET missing); nothing sent' };
  }

  const limit = timeoutMs();
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${secret}` },
      body: JSON.stringify({ email: lead.email, name: lead.name }),
      signal: AbortSignal.timeout(limit),
    });
  } catch (e) {
    const name = e instanceof Error ? e.name : '';
    if (name === 'TimeoutError' || name === 'AbortError') {
      return { state: 'pending', reason: `no response after ${limit}ms; provider acceptance unknown` };
    }
    return { state: 'pending', reason: `request error (${e instanceof Error ? e.message : String(e)}); may have reached getmindy.ai, outcome unknown` };
  }

  let body: Record<string, unknown> | null = null;
  try {
    body = (await res.json()) as Record<string, unknown>;
  } catch {
    body = null;
  }
  const status = typeof body?.status === 'string' ? body.status : null;

  if (res.ok && status === 'accepted' && (body?.provider === 'resend' || body?.provider === 'office365')) {
    return {
      state: 'confirmed',
      provider: body.provider,
      providerMessageId: typeof body.providerMessageId === 'string' ? body.providerMessageId : null,
    };
  }
  if (status === 'failed') {
    return { state: 'failed', reason: `provider failed at getmindy.ai: ${String(body?.error ?? 'no detail')}` };
  }
  if (status === 'blocked') {
    return { state: 'failed', reason: `blocked by getmindy.ai send guard: ${String(body?.reason ?? 'no reason')}` };
  }
  // 400/401/403/404 are refused before any send is attempted.
  if (res.status >= 400 && res.status < 500) {
    return { state: 'failed', reason: `refused by getmindy.ai: HTTP ${res.status}; nothing sent` };
  }
  return {
    state: 'pending',
    reason: `HTTP ${res.status} without a stated provider acceptance${status ? ` (status=${status})` : ''}; outcome unknown`,
  };
}

/** Pipeline-log fields for a confirmation outcome. Only `confirmed` is success. */
export function confirmationLogFields(o: ConfirmationOutcome): { email_ok: boolean; email_error: string | undefined } {
  // email_error is always set, so spreading these over a base row replaces any placeholder.
  if (o.state === 'confirmed') return { email_ok: true, email_error: undefined };
  return { email_ok: false, email_error: `${o.state}: ${o.reason}` };
}
