# Phase 3: staged `.com` apex cutover runbook

**Status:** ☑ Step 1 route mapping complete (read-only) · ☐ Steps 2-7 not executed
**Prepared:** 2026-09-05
**Supersedes:** the `tasks/PHASE3-domain-flip-runbook.md` referenced by `next.config.ts`, which never existed.

> **Nothing in this document has been executed.** It is the mapping and sequence
> only. No domain, redirect, canonical, sitemap, or podcast route was changed while
> preparing it.

---

## Why staged, and why this order

The 2026-09-05 outage happened because the *last* step of a cutover shipped without
the *first*. `34c5ad5` enabled `app.govcongiants.org → .com` while `.com` was still
served by the Vite SPA, which 308s 39 path families back to `app.` — an immediate
infinite loop on ~10 customer-facing families.

The ordering rule that prevents a repeat:

> **`.com` must already be served by the Next deployment, and proven, BEFORE any
> host redirects to it.** Enabling the redirect first is what loops.

---

## Step 1 — Route mapping (COMPLETE, read-only)

**Question:** does every URL `.com` serves today have a real Next page or an exact
per-URL redirect?

**Answer: yes. All 170 live `.com` sitemap URLs resolve 200 on the Next app.**

Measured against `https://app.govcongiants.org` on 2026-09-05:

| Live `.com` URL group | Count | Result on Next |
|---|---|---|
| `/podcast/:index` (0-149) | 150 | **200** — 308 one-hop to the canonical slug |
| `/podcast/featured/:index` | 6 | **200** — 308 one-hop to the canonical episode |
| `/podcast` | 1 | **200** direct |
| `/blog/:slug` | 9 | **200** — 6 direct, 3 via exact per-URL redirect |
| `/blog` | 1 | **200** direct |
| `/about` | 1 | **200** direct |
| `/resources` | 1 | **200** direct |
| `/` | 1 | **200** direct |
| **Total** | **170** | **170 × 200, zero losses** |

### The three blog URLs that redirect (verified topically equivalent)

| SPA URL | Next destination | Equivalence |
|---|---|---|
| `/blog/cmmc-real-math` | `/blog/cmmc-2-compliance-guide` | CMMC → CMMC |
| `/blog/register-right-first-time` | `/blog/sam-gov-registration-checklist` | SAM registration → SAM registration |
| `/blog/start-govcon-no-experience` | `/blog/win-government-contracts-no-experience` | no-experience → no-experience |

### `/blog` and `/resources` conflicts — resolved, not outstanding

`PLAN-one-site-on-dotcom.md` §2 flagged these as blocking. They are not:

- **`/blog`** — the SPA's 10 articles were already migrated into Next (see the
  "Migrated from the podcast SPA" comment in `src/content/blog/index.ts`). Next
  serves 26 posts; all 10 SPA slugs resolve.
- **`/resources`** — Next serves "Free GovCon Resource Library"; the SPA's version
  is a client-rendered shell.
- **`/about`** — exists in Next ("About Eric Coffie — From Zero to $20M"). The plan
  doc's claim that the app 404s on `/about` is stale.
- **Historical podcast URLs** — all 156 resolve (150 numeric + 6 featured), each
  308ing one hop to a canonical slug. 155 canonical episode pages exist, including
  5 promoted from outside the RSS window.

### Why the SPA pages lose nothing

Every SPA page returns the **same generic title** — `GovCon Giants — Win Federal
Contracts Like a Giant` — because it is client-rendered with no server HTML. Google
sees an empty shell. The Next equivalents have real per-page titles. The migration
is a strict SEO improvement, not a trade.

### Known pre-existing 404s (NOT regressions, do not block)

Eight bare parent paths 404 on the Next app. They **already 404 on `.com` today**
(308 → the same 404) and **none appear in the live sitemap**:

`/compare` · `/for` · `/migration` · `/access` · `/checkout` · `/admin` · `/api` · `/team` (401)

Their children work (`/compare/deltek`, `/for/sbdc`, `/migration/govwin` all 200).
The cutover neither fixes nor worsens these. Worth an index page later; not a
prerequisite.

---

## Step 2 — Attach `.com` + `www` to the Next deployment

**With `app. → .com` still DISABLED.** It is currently disabled (`next.config.ts`,
the 2026-09-05 hotfix). Do not touch it in this step.

1. Vercel → `govcon-funnels` → Domains → add `govcongiants.com` and
   `www.govcongiants.com`
2. Remove those domains from the `govcon-giants-site` project (they cannot be
   assigned to two projects)
3. The SPA's 75 redirects stop mattering the moment it no longer serves `.com`

**Safety property:** because `app. → .com` stays disabled, the worst case is that
`.com` serves Next while `app.` also serves Next. No loop is possible — a loop
needs both directions live.

---

## Step 3 — Verify `.com` serves the full matrix directly

**Gate. Do not proceed to step 4 until every check passes.**

```bash
SITE=https://govcongiants.com

# a. .com is served by Next, not the SPA — no 'id="root"'
curl -s $SITE/ | grep -c 'id="root"'          # expect 0
curl -s $SITE/ | grep -c '_next/static'       # expect >0

# b. all 170 historical URLs still resolve
curl -sS https://app.govcongiants.org/sitemap.xml \
  | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g' \
  | xargs -P 8 -I{} sh -c 'printf "%s %s\n" "$(curl -sS -o /dev/null -w "%{http_code}" -L {})" "{}"' \
  | grep -v '^200' || echo "all 200"

# c. the 10 families that broke in the incident
for p in /guides /guides/8a-certification /features /compare/deltek /for/sbdc \
         /jobs /data/agencies /glossary /tools /consulting; do
  printf "%-30s %s\n" "$p" "$(curl -sS -o /dev/null -w '%{http_code}' -L --max-redirs 6 $SITE$p)"
done   # expect 200 ×10

# d. SPA-owned pages now served by Next, with REAL titles
for p in / /about /resources /blog /podcast; do
  printf "%-14s " "$p"; curl -sS -L $SITE$p | grep -oiE '<title>[^<]*</title>'
done   # expect distinct per-page titles, not the homepage shell ×5

# e. no path exceeds one hop, nothing cycles
for p in /podcast/0 /podcast/featured/0 /blog/cmmc-real-math; do
  printf "%-26s hops=%s final=%s\n" "$p" \
    "$(curl -sS -o /dev/null -w '%{num_redirects}' -L --max-redirs 6 $SITE$p)" \
    "$(curl -sS -o /dev/null -w '%{url_effective}' -L --max-redirs 6 $SITE$p)"
done   # expect hops=1, final on govcongiants.com
```

---

## Step 4 — Enable one-way redirects to `.com`

**Only after step 3 passes.** In one deploy:

- `next.config.ts`: re-enable the `app.govcongiants.org → .com` rule (currently
  commented at ~line 45 with the incident note)
- `podcast.govcongiants.org → .com` — already active, leave it
- `govcongiants.org` / `www.govcongiants.org` → `.com` — already active in
  `vercel.json`, leave them

All four legacy hosts then canonicalize one-way to `.com`.

---

## Step 5 — Verify one hop, no cycles

```bash
for host in https://app.govcongiants.org https://podcast.govcongiants.org \
            https://govcongiants.org https://www.govcongiants.com; do
  for p in / /guides/8a-certification /podcast/0 /blog; do
    hops=$(curl -sS -o /dev/null -w '%{num_redirects}' -L --max-redirs 6 --max-time 20 "$host$p")
    final=$(curl -sS -o /dev/null -w '%{url_effective}' -L --max-redirs 6 --max-time 20 "$host$p")
    code=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-redirs 6 --max-time 20 "$host$p")
    printf "%-56s hops=%-3s %s %s\n" "${host#https://}$p" "$hops" "$code" "${final#https://}"
  done
done
```

**Pass:** every final URL is on `govcongiants.com`, every `code` is 200, no `curl:
(47)`, and no chain exceeds the intended hop count (1 from a legacy host; 2 only
where a legacy host hits a legacy path that itself redirects — verify each such case
is intended, and prefer collapsing it to 1).

---

## Step 6 — Canonical signals

There is **no "preferred domain" setting in Search Console** — that control was
retired. Canonicalization is established by redirects, self-canonicals, internal
links, and sitemap URLs. Steps 4-5 do the redirects; this step does the rest.

- **Sitemap:** publish only `https://govcongiants.com/sitemap.xml` (427 URLs).
  Retire the SPA's 170-URL sitemap with the SPA deployment.
- **robots.txt:** one file on `.com`, referencing only the `.com` sitemap.
- **Canonicals:** already `.com` everywhere (`metadataBase` is `https://govcongiants.com`
  since `34c5ad5`; `SITE_URL` in `src/lib/seo.ts` is `.com`). Re-verify after cutover.
- **Internal links:** audit for any remaining `app.govcongiants.org` or `.org` hrefs.
- **Search Console:**
  - `.com` and `.org` are **different registered domains and need separate property
    coverage** — a Domain property for one does not cover the other.
  - A Domain property aggregates subdomains of the same registered domain, so a
    `govcongiants.com` Domain property covers `www.` and any other `.com` subdomain.
    `app.govcongiants.org` and `podcast.govcongiants.org` fall under a
    `govcongiants.org` property.
  - Submit the `.com` sitemap under the `.com` property.
  - Use the Change of Address tool only for a true cross-domain move
    (`.org` → `.com`), not for the `app.` subdomain, which the redirects handle.

---

## Step 7 — Retention and branding

- **Keep every old-host redirect live for at least one year.** The Libsyn RSS feed
  carries ~1,694 `.org` links inside already-distributed episode descriptions that
  cannot be edited retroactively. `podcast.govcongiants.org` has been shared
  directly for years.
- **Remove alternate hosts from branding and public navigation immediately** —
  emails, slides, social profiles, footers, docs. Redirects stay; promotion stops.

---

## Rollback

Tested against the same route matrix during the 2026-09-05 incident.

**After step 2 (domain attached, redirects still disabled):** reassign
`govcongiants.com` + `www` back to `govcon-giants-site`. `app. → .com` is still
disabled, so no loop can form in either direction. This is the safe stopping point.

**After step 4 (redirects enabled):** rollback is the reverse of steps 2+4 **together**:

1. Re-disable the `app. → .com` rule in `next.config.ts`, merge, deploy
2. Reassign `.com` + `www` back to `govcon-giants-site`
3. Re-verify with the step 5 matrix

⚠️ **Partial rollback recreates the loop.** Reassigning the domain while leaving the
redirect enabled is exactly the 2026-09-05 failure. If only one can be done first,
**always disable the redirect first.**

**Propagation:** redirects are edge config and change only when the new deployment
goes live. During the incident, recovery took roughly 15 minutes from merge. The
308s are also browser-cached, so a client that hit the loop may keep following the
cached redirect after rollback; it clears on cache expiry.

---

## Blocked until this is proven end-to-end

`tasks/CUTOVER-podcast-routes.md` (removing the `/podcast → podcast.govcongiants.org`
rules) depends on `.com` being served by Next. Those rules were already removed by
`34c5ad5`, so `/podcast` on `.com` is currently served by the SPA's own podcast
pages. The 155-episode Next migration is live and verified on
`app.govcongiants.org`; it becomes the `.com` podcast at step 2.
