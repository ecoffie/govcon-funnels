/**
 * Lightweight shared-secret gate for internal reporting endpoints.
 * Accepts the password via `?password=` query, `x-admin-password` header,
 * or `Authorization: Bearer <pw>`. Set PURCHASES_ADMIN_PASSWORD in the
 * environment. If no admin password is configured, auth fails closed.
 */
export function getAdminPassword(): string | null {
  const password = process.env.PURCHASES_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  return password?.trim() || null;
}

export function isAuthorized(provided: string | null | undefined): boolean {
  if (!provided) return false;
  const expected = getAdminPassword();
  if (!expected) return false;
  const candidate = provided.trim();
  if (candidate.length !== expected.length) return false;
  // Constant-time-ish compare to avoid trivial timing leaks.
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= candidate.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export function extractPassword(req: {
  headers: { get(name: string): string | null };
  nextUrl?: { searchParams: URLSearchParams };
}): string | null {
  const fromQuery = req.nextUrl?.searchParams.get("password");
  if (fromQuery) return fromQuery;

  const header = req.headers.get("x-admin-password");
  if (header) return header;

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);

  return null;
}
