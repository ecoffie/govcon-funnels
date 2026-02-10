import crypto from 'crypto';

function getAccessSecret() {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error('Missing ACCESS_TOKEN_SECRET env var');
  return secret;
}

export function signAccessToken(payload: string) {
  const secret = getAccessSecret();
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

export function createAccessCookieValue(params: {
  scope: string;
  sessionId: string;
  issuedAtMs?: number;
}) {
  const issuedAtMs = params.issuedAtMs ?? Date.now();
  const payload = `${params.scope}.${params.sessionId}.${issuedAtMs}`;
  const sig = signAccessToken(payload);
  return `${payload}.${sig}`;
}

export function verifyAccessCookieValue(params: {
  value: string | undefined;
  scope: string;
  maxAgeMs: number;
}) {
  if (!params.value) return { ok: false as const, reason: 'missing' as const };

  const parts = params.value.split('.');
  if (parts.length < 4) return { ok: false as const, reason: 'malformed' as const };

  const sig = parts.pop()!;
  const [scope, sessionId, issuedAtStr] = parts;

  if (scope !== params.scope) return { ok: false as const, reason: 'scope' as const };

  const issuedAtMs = Number(issuedAtStr);
  if (!Number.isFinite(issuedAtMs)) return { ok: false as const, reason: 'malformed' as const };

  if (Date.now() - issuedAtMs > params.maxAgeMs) {
    return { ok: false as const, reason: 'expired' as const };
  }

  const payload = `${scope}.${sessionId}.${issuedAtMs}`;
  const expected = signAccessToken(payload);
  const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!ok) return { ok: false as const, reason: 'bad_sig' as const };

  return { ok: true as const, sessionId };
}

