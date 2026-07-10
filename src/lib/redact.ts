/**
 * PII redaction helpers for logs.
 *
 * We log signup/email activity for debugging, but Vercel retains stdout/stderr,
 * so full email addresses (and phone numbers) shouldn't sit there in plaintext.
 * These helpers keep just enough to correlate/debug — first char + domain for
 * emails, last 4 for phones — without storing the raw PII.
 */

/** `john.doe@example.com` -> `j***@example.com`; empty/invalid -> `<none>`. */
export function maskEmail(email: string | null | undefined): string {
  if (!email) return '<none>';
  const trimmed = String(email).trim();
  const at = trimmed.indexOf('@');
  if (at <= 0) {
    // No local part / not an email shape — mask everything but the first char.
    return trimmed ? `${trimmed[0]}***` : '<none>';
  }
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  const head = local[0] ?? '';
  return `${head}***@${domain}`;
}

/** Keep only the last 4 digits: `+1 (508) 290-6692` -> `***6692`. */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return '<none>';
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return '<none>';
  return `***${digits.slice(-4)}`;
}

/** First name + last-initial only: `Jane Smith` -> `Jane S.`. */
export function maskName(name: string | null | undefined): string {
  if (!name) return '<none>';
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '<none>';
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}
