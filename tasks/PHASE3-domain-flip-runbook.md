# Phase 3 — domain flip runbook (`.com` → the Next app)

**Status:** ☐ Preflight not run · ☐ Reviewed · ☐ **DO NOT EXECUTE**
**Written:** 2026-08-24
**Depends on:** PR #176 (merged 2026-08-24) — content consolidation, deliberately excluded the flip.

> **Separation of concerns:** #176 moved *content*. This moves *domain ownership*. If the flip
> goes wrong it must roll back **without undoing any of #176's migration work**. That is the whole
> reason these are two changes.

---

## 0. ⚠️ BLOCKER FOUND POST-MERGE — read before anything else

Verifying #176 on the existing host surfaced a rule that **shadows every podcast page we built**.

`vercel.json` in THIS repo contains three redirects, and `vercel.json` is evaluated **before**
Next's routing:

```json
{ "source": "/podcast",       "destination": "https://podcast.govcongiants.org/podcast" }
{ "source": "/podcast/:path+","destination": "https://podcast.govcongiants.org/podcast/:path+" }
{ "source": "/podcast/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:ep", "destination": "…" }
```

**Live evidence (2026-08-24):**

| Request | Actual response |
|---|---|
| `app.govcongiants.org/podcast/149` | **308 → `podcast.govcongiants.org/podcast/149`** |
| `app.govcongiants.org/podcast/150` | **308** (should be 404) |
| `app.govcongiants.org/podcast/99999` | **308** (should be 404) |

So `/podcast/*` never reaches the 150 pages in the build. These rules were *correct* when the SPA
owned the podcast; they are now backwards.

**This is a domain-routing change, so it belongs here — not retrofitted into the merged PR.**

**Step 0 of execution: delete those three `/podcast*` rules from `vercel.json`.** Keep
`/podcast-1` (a legacy alias) but repoint it to `/podcast` locally. Re-verify `/podcast/150`
returns **404**, not 308 — that is the tell that Next is serving the route.

### Also confirmed: nothing from #176 is publicly reachable yet

`govcongiants.com/about`, `/blog/teaming-agreements-101`, `/resources/cold-email-script-1` all
currently return the **SPA shell**, because the `.com` catch-all still intercepts. That is the
correct pre-flip state. It also means **#176 is safe in production and changing nothing for users
until this runbook executes.**

---

## 1. Preflight — verify EVERYTHING, not samples

Eric's requirement: all routes, not a representative subset. Nothing below is optional.

### 1.1 Route coverage — expect exact counts

| Set | Count | Assertion |
|---|---:|---|
| Podcast episodes | **150** | `/podcast/0`–`/podcast/149` all 200 |
| Podcast boundary | — | `/podcast/150` and `/podcast/99999` return **404** |
| Featured episodes | **6** | `/podcast/featured/0`–`5` all 200 |
| Migrated articles | **6** | slugs unchanged, 200 |
| Merged articles | **3** | 308 → the stronger post |
| Resource pages | **10** | `/resources/<slug>` 200 |
| Preserved assets | **69** | every file 200 with the right MIME type |
| Existing app routes | 38 top-level | no regression |

Script it. A sampled pass is how `/podcast/*` looked healthy while being shadowed.

### 1.2 Payments — Stripe

- [ ] **Success / cancel / return URLs** — check the **Stripe dashboard**, not only code
- [ ] Checkout Session `success_url` + `cancel_url`
- [ ] Customer Portal return URL
- [ ] Webhook endpoints still resolve (`/api/stripe/webhook`)
- [ ] A **real test transaction** end-to-end after the flip
- [ ] `gca_attr` attribution cookie survives the checkout hop

### 1.3 Auth, cookies, CORS

- [ ] OAuth callback allowlists accept **both** hosts during transition
- [ ] Supabase Auth site URL + redirect allowlist
- [ ] Cookie domain: the attribution cookie is set **client-side with no `Domain` attribute**
      (`AttributionTracker.tsx:93`), so it is host-scoped. Consolidating **improves** this — today
      a `.com` → `.org` bounce can lose attribution entirely.
- [ ] CORS allowlists in `/api/lead` and `/api/event` — keep `podcast.govcongiants.org`
      **until** its redirect is verified, or in-flight forms break
- [ ] CSP / `Content-Security-Policy` host allowances
- [ ] Password-gated areas still gate: `/admin`, `/dashboard`, `/team`

### 1.4 Infrastructure

- [ ] `cron_jobs` rows whose `route` column contains a `.org` host (**check the DB, not the repo**)
- [ ] Env base URLs: `MINDY_LAUNCH_SEND_URL`, webhook targets, anything `*_URL`
- [ ] `NEXT_PUBLIC_*` values baked at build time — a redeploy is needed after any change

### 1.5 SEO surface

- [ ] `sitemap.xml` — includes the 10 new resource URLs + 150 podcast URLs; **no `.org`**
- [ ] `robots.txt`
- [ ] Canonicals — all `.com` (verified in #176)
- [ ] Open Graph `url` fields
- [ ] Structured data: `PodcastSeries`, `PodcastEpisode`, `DigitalDocument`, `Person`, article schema

### 1.6 Redirect correctness

- [ ] **Path preserved:** `/a/b/c` → `.com/a/b/c`
- [ ] **Query preserved:** `?utm_source=x&utm_medium=y` survives
- [ ] **HTTP and HTTPS** both reach HTTPS `.com`
- [ ] **`www` variants** of both hosts
- [ ] Status is **308/301**, never 302
- [ ] ⚠️ **NO rule may match a Libsyn hostname.** `govcongiants.libsyn.com`,
      `traffic.libsyn.com`, `static.libsyn.com` must resolve untouched. Asserted by a unit test.

### 1.7 Email + automation

- [ ] Every template in `src/lib/email.ts` — grep for `.org`
- [ ] GHL automated messages and workflows
- [ ] Any `.org` link in a scheduled send

---

## 2. Rollout order

**1. Merge + validate #176 on the existing deployment.** ☑ Done 2026-08-24. Blocker in §0 found.

**2. Remove the `/podcast*` shadow rules** from `vercel.json`; verify `/podcast/150` → 404.

**3. Widen external allowlists to accept BOTH hosts** — Stripe, OAuth, Supabase, CORS. Additive
only, no removals. Verify the old host still works.

**4. Attach `govcongiants.com` (+ `www`) to the `govcon-funnels` project.** The actual flip.

**5. Verify live on `.com`:** critical routes, login, a real checkout, lead forms with exact
`vault:<Title>` attribution, downloads, canonicals.

**6. Convert `.org` hosts to permanent path-preserving redirects.** The `next.config.ts` rules for
`app.govcongiants.org` and `podcast.govcongiants.org` shipped in #176 and are already live.

**7. Remove old-host allowlist entries ONLY after logs confirm no legitimate traffic depends on
them.** Not on a timer — on evidence.

---

## 3. Rollback

**Trigger:** any of — checkout fails, auth breaks, >5% of routes 404, attribution stops recording.

**The flip is a domain attachment, so rollback is a domain re-attachment:**

1. **Detach `govcongiants.com` + `www` from `govcon-funnels`.**
2. **Re-attach both to `govcon-giants-site`** (the SPA project) — restoring the prior owner.
3. Restore the SPA's previous `vercel.json` if step 2 changed it (`git revert` the flip commit).
4. Leave external allowlists **wide** (both hosts) — they are additive and harmless.
5. Verify: `govcongiants.com/` serves the SPA; `/guides/*` still forward to the app.

**Rollback does NOT touch anything from #176.** The content migration lives in the Next app on its
own host and stays correct either way. That is the point of splitting the PRs.

**Expected rollback time:** minutes — it is a dashboard domain re-assignment, not a redeploy.

**What rollback does NOT undo:** the three `/blog/*` merge redirects. They are within-app and
correct regardless of which project owns `.com`.

---

## 4. Known gaps

- **No GSC access to `sc-domain:govcongiants.org`** (403). Grant it for a before/after comparison.
- **Vercel deployment protection** gates preview URLs behind SSO. Validation for #176 was run
  against the local production build (identical compiled output) plus the live host. A browser
  pass on a protected preview needs an interactive login.
- **`podcast.govcongiants.org` is a separate repo** (`~/Projects/govcon-giants-podcast`). It keeps
  serving until step 6; nothing in this repo deploys it.
