/**
 * Header-only authentication for SCHEDULED routes (/api/cron/*).
 *
 * WHY this exists separately from `admin-auth`:
 * `extractPassword()` reads `?password=` FIRST, which makes a URL-borne secret
 * the easiest thing to write. For an interactively-called admin endpoint that is
 * a convenience. For a *scheduled* route it is a durable leak, because the
 * scheduler has to STORE the URL it calls:
 *
 *   - govcongiants.com's Mindy cron routes are fired by market-assassin's
 *     dispatcher, which keeps each job's absolute URL in its `cron_jobs.route`
 *     column. A `?password=` there is a plaintext secret AT REST in another
 *     application's database, readable by anyone with read access to it.
 *   - It also rides in the HTTP request line of every single fire, which is the
 *     part proxies, CDNs, error reporters and access logs record verbatim —
 *     unlike a header, which they generally do not.
 *
 * And it was never needed: the dispatcher already sends
 * `Authorization: Bearer <CRON_SECRET>` on every job it fires (as does Vercel's
 * own cron), and these routes already accepted that first. The query-string
 * credential was pure redundant exposure — five `cron_jobs` rows carried one for
 * months while authenticating via the bearer header anyway.
 *
 * So this helper accepts the header forms and deliberately REFUSES to read a
 * query parameter. Manual/diagnostic calls keep working via `x-admin-password`.
 *
 * Accepted:
 *   Authorization: Bearer <CRON_SECRET>        ← scheduler (dispatcher / Vercel cron)
 *   x-admin-password: <admin password>         ← manual run
 *   Authorization: Bearer <admin password>     ← manual run
 * Never accepted:
 *   ?password=<anything>
 */

/** Timing-safe-ish compare; length-checked first so it can't be used as an oracle. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** The manual-run secret for this repo. There is no plain ADMIN_PASSWORD here. */
function adminPassword(): string | null {
  return process.env.PURCHASES_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || null;
}

type HeaderBag = { headers: { get(name: string): string | null } };

/**
 * Read a credential from HEADERS ONLY. Returns null when none is present.
 * Deliberately takes only the header bag so a query string is not even in scope.
 */
export function extractCronCredential(req: HeaderBag): {
  bearer: string | null;
  adminHeader: string | null;
} {
  const auth = req.headers.get('authorization');
  const bearer = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  return { bearer, adminHeader: req.headers.get('x-admin-password') };
}

/**
 * Is this request allowed to run a scheduled route?
 *
 * Fails CLOSED: if neither CRON_SECRET nor an admin password is configured,
 * nobody gets in. There is deliberately no hardcoded fallback.
 */
export function cronAuthorized(req: HeaderBag): boolean {
  const { bearer, adminHeader } = extractCronCredential(req);

  // 1) The scheduler's shared cron secret (the normal path in production).
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && bearer && safeEqual(bearer, cronSecret)) return true;

  // 2) Manual run with the admin secret, header-borne only.
  const admin = adminPassword();
  if (!admin) return false;
  if (adminHeader && safeEqual(adminHeader, admin)) return true;
  if (bearer && safeEqual(bearer, admin)) return true;

  return false;
}

/**
 * Shape guard for a stored scheduler URL: does it carry a credential in the URL
 * itself? Asserts on SHAPE — it never needs to know any secret's value.
 *
 * Use it to keep a `cron_jobs.route`-style value honest. A route value should
 * name the endpoint and nothing that authenticates it.
 */
export function urlCarriesCredential(routeValue: string): boolean {
  return /[?&](password|secret|token|key|api_key|apikey|auth)=/i.test(routeValue);
}
