# Cutover: make the Next podcast routes reachable

**Status:** ☐ Not started — prepared, not executed
**Prepared:** 2026-09-05
**Depends on:** the slug migration (this branch) being merged and deployed first

> **This is a separate change from the slug migration.** The migration ships the
> routes; this cutover makes them the ones the public reaches. Nothing in the slug
> migration PR alters live traffic.

---

## Why this is needed

The podcast is already ported into the Next app and builds 155 static episode pages.
Almost nobody reaches them: `vercel.json` sends `/podcast` and `/podcast/:path*` to
`podcast.govcongiants.org` — a third deployment — before the App Router ever sees the
request.

```
vercel.json:295   /podcast          → https://podcast.govcongiants.org/podcast
vercel.json:~299  /podcast/:path+   → https://podcast.govcongiants.org/podcast/:path+
```

So today: Next's `/podcast/*` routes exist, build, and are unreachable in production.

**Verified 2026-09-05:**

| URL | Result |
|---|---|
| `app.govcongiants.org/podcast` | `308 → podcast.govcongiants.org/podcast` |
| `app.govcongiants.org/podcast/0` | `308 → podcast.govcongiants.org/podcast/0` |
| `govcongiants.com/podcast/150` | **`200`** — soft-404 from the SPA shell |
| `govcongiants.com/podcast/156` | **`200`** — soft-404 from the SPA shell |

That last pair is the SEO defect this cutover closes: the SPA answers *any* index with
its homepage shell, so out-of-range URLs look like real pages to Google. After cutover
they are genuine 404s (already verified against the built app — see §5).

---

## What changes

**One file, two redirect rules removed.**

```diff
  // vercel.json
- { "source": "/podcast",        "destination": "https://podcast.govcongiants.org/podcast",        "permanent": true },
- { "source": "/podcast/:path+", "destination": "https://podcast.govcongiants.org/podcast/:path+", "permanent": true },
```

Removing them lets `/podcast` and `/podcast/:slug` fall through to the App Router.

⚠️ **Do not touch any rule matching a Libsyn hostname.** Podcast *distribution*
(`govcongiants.libsyn.com/rss`, `traffic.libsyn.com/*`, `static.libsyn.com/*`) is
outside this consolidation. Audio and artwork keep loading from Libsyn; a guard test
asserts every `audioUrl` is still on `traffic.libsyn.com`.

⚠️ **`podcast.govcongiants.org` keeps resolving.** It has been shared directly for
years and `next.config.ts` already 308s it to `.com`. This cutover does not
decommission that host — it stops `.com` from *delegating to* it.

---

## Redirect status: 308 is the approved contract

**The 150 legacy `/podcast/:index` URLs and 6 `/podcast/featured/:index` aliases
redirect with 308, deliberately.**

The migration was originally specified as 301. It was reviewed and changed to 308 on
2026-09-05, on these grounds:

- **Google treats 301 and 308 identically** for indexing and signal transfer. There is
  no ranking difference; 308 is the HTTP/1.1-era 301's method-preserving equivalent.
- **Next's App Router cannot emit 301.** `RedirectStatusCode` offers only 303/307/308,
  and `permanentRedirect()` hardcodes 308 with no override.
- **A literal 301 would split the redirect map.** It would mean generating all 150
  mappings into `next.config.ts`, away from the frozen slug data in
  `src/data/episode-slugs.json` that they derive from. Two sources that must agree
  forever is a worse failure mode than a status code with equivalent semantics.

Enforced by `src/lib/__tests__/episode-redirect-contract.unit.test.ts` and recorded in
the route comment. **Do not "fix" this to 301** by relocating the redirects without
revisiting this decision — the colocation is the point.

---

## Prerequisites

- [ ] Slug migration merged and deployed (155 slug routes live; 150 legacy indices and
      6 featured aliases 308)
- [ ] `govcongiants.com` served by the `govcon-funnels` project — **verify first**:
      `curl -s https://govcongiants.com/ | grep -o 'id="root"'` returning a match means
      the Vite SPA still serves apex and this cutover will 404 the podcast. Stop.
- [ ] A GSC export of currently-indexed `/podcast/*` URLs, for the post-cutover diff

---

## Sequence

1. **Snapshot.** Record current status + `Location` for `/podcast`, `/podcast/0`,
   `/podcast/149`, `/podcast/150`, `/podcast/featured/0`, `/podcast/featured/6`. Keep
   the output — it is the rollback comparison.
2. **Remove the two rules** from `vercel.json`.
3. **Deploy.**
4. **Verify** (§5). If anything in the "must" table fails, roll back (§6) before
   investigating.
5. **Resubmit** `https://govcongiants.com/sitemap.xml` in GSC. It now carries 155
   canonical slug URLs and no numeric or featured ones.
6. **Watch** GSC Coverage for ~2 weeks: "Page with redirect" should rise (expected —
   the legacy indices), and the soft-404s at `/podcast/150-156` should drop out.

---

## 5. Verification

Run against production after deploying. **Every "must" has to pass.**

```bash
SITE=https://govcongiants.com

# must: index serves from Next, not a redirect to the podcast host
curl -sSI $SITE/podcast | grep -iE '^HTTP|^location'
# expect: HTTP 200, no Location

# must: a slug URL is 200 and self-canonical
SLUG=the-woman-who-wrote-cmmc-the-250k-compliance-cost-is-a-lie-ep-334
curl -sS $SITE/podcast/$SLUG | grep -o '<link rel="canonical" href="[^"]*"'
# expect: href="https://govcongiants.com/podcast/<SLUG>"

# must: legacy index 308s to its slug in ONE hop
curl -sSI $SITE/podcast/1 | grep -iE '^HTTP|^location'
# expect: 308 → /podcast/the-woman-who-wrote-cmmc-...

# must: out-of-range indices are REAL 404s (this is the soft-404 fix)
for i in 150 156 999; do curl -sS -o /dev/null -w "$i: %{http_code}\n" $SITE/podcast/$i; done
# expect: 404, 404, 404

# must: audio still streams from Libsyn
curl -sS $SITE/podcast/$SLUG | grep -o 'traffic\.libsyn\.com' | head -1
# expect: a match

# must: the old podcast host still resolves (legacy entrance, never removed)
curl -sS -o /dev/null -w "podcast host: %{http_code}\n" https://podcast.govcongiants.org/podcast
# expect: 200 or 308 — NOT a connection error

# must: featured aliases 308 to their canonical episode
for i in 0 1 2 3 4 5; do curl -sS -o /dev/null -w "featured/$i: %{http_code}\n" $SITE/podcast/featured/$i; done
# expect: 308 x6

# must: out-of-range featured indices are REAL 404s
for i in 6 99 007; do curl -sS -o /dev/null -w "featured/$i: %{http_code}\n" $SITE/podcast/featured/$i; done
# expect: 404, 404, 404

# must: the five archived episodes (outside the RSS window) serve real pages
for s in 012-ashley-d-bell-region-iv-administrator-us-small-business-administration \
         simplifying-federal-certifications-a-game-changer-for-small-businesses; do
  curl -sS -o /dev/null -w "$s: %{http_code}\n" $SITE/podcast/$s
done
# expect: 200, 200

# should: all 155 slugs are 200
curl -sS $SITE/sitemap.xml | grep -o '<loc>[^<]*/podcast/[^<]*</loc>' | sed 's/<[^>]*>//g' \
  | xargs -P 8 -I{} sh -c 'printf "%s %s\n" "$(curl -sS -o /dev/null -w "%{http_code}" {})" "{}"' \
  | grep -v '^200' || echo "all 200"
```

| Check | Must | Why it matters |
|---|---|---|
| `/podcast` returns 200 from Next | ✅ | the cutover's whole purpose |
| slug URL 200 + self-canonical | ✅ | canonical must equal the URL, or indexing stalls |
| legacy index → 308 → slug, one hop | ✅ | chains leak crawl budget and dilute signals |
| `/podcast/150,156,999` → 404 | ✅ | removes the indexed soft-404s |
| audio on `traffic.libsyn.com` | ✅ | distribution must not move |
| `podcast.govcongiants.org` resolves | ✅ | years of shared links point at it |
| featured aliases → 308 → episode | ✅ | closes the same positional-identity defect |
| featured out-of-range → 404 | ✅ | no soft-404s from the alias route either |
| archived episodes serve 200 | ✅ | 5 episodes predate the RSS window; they must not 404 |
| all 155 slugs 200 | ⬜ | catches a partial deploy |

---

## 6. Rollback

Fully reversible — the change is two lines in one file.

1. **Restore** the two rules in `vercel.json`:

```json
{ "source": "/podcast",        "destination": "https://podcast.govcongiants.org/podcast",        "permanent": true },
{ "source": "/podcast/:path+", "destination": "https://podcast.govcongiants.org/podcast/:path+", "permanent": true }
```

2. **Redeploy**, or promote the previous deployment in Vercel (faster).
3. **Confirm** `/podcast` 308s to `podcast.govcongiants.org` again — matching the §1
   snapshot.

**Rollback caveat.** These are `permanent: true` (308) redirects, which browsers and
crawlers cache aggressively. A user who hit `/podcast` during the window may keep
following the cached redirect after rollback. It resolves on cache expiry; it is not
data loss. If a longer bake is wanted, switch both rules to `"permanent": false` (307)
a deploy *before* the cutover, then remove them — 307s are not cached the same way.

**What rollback does NOT undo:** the sitemap already resubmitted to GSC. Harmless —
those URLs go back to redirecting, and Google re-crawls. Do not re-resubmit the old
sitemap; let it settle.

---

## 7. Out of scope

- Retiring the Vite SPA or `podcast.govcongiants.org` — both keep resolving
- The `app.govcongiants.org → .com` redirect in `next.config.ts` (commented out at
  line ~50); re-enabling it belongs to the domain flip, and doing it before `.com`
  moves to this project recreates the documented infinite loop
- Retiring `featured-episodes.json` itself — the curated set still drives the featured
  gallery data; only its positional URLs were retired
