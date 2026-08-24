# Plan: one public site on govcongiants.com

**Status:** ☑ Route inventory complete · ☐ Conflicts resolved (needs Eric) · ☐ Approved to build
**Written:** 2026-08-24

## The required end state

One site: **`govcongiants.com`**, serving every route directly.
`govcongiants.org/path` and `app.govcongiants.org/path` become **permanent, path-preserving
301/308 redirects** to the `.com` equivalent. All internal links, canonicals, sitemaps, emails,
podcast descriptions, and checkout return URLs use `.com`. Users, Google, cookies, and checkout
never operate across domains.

**Cross-domain rewrites are a migration mechanism only — never the final architecture.**
(An earlier draft of this plan proposed flipping the 75 SPA redirects into permanent proxy
rewrites. That was wrong: it puts two deployments behind one address and calls it one site.
Rejected.)

---

## 1. Route inventory — who owns what today

Two Vercel projects, two codebases:

| Project | Repo path | Serves today |
|---|---|---|
| `govcon-giants-site` | `govcon-giants-site/` (Vite SPA) | **govcongiants.com** |
| `govcon-funnels` | repo root (Next.js) | **app.govcongiants.org**, govcongiants.org |

### SPA-owned routes (6 families + catch-all)
`/` · `/about` · `/blog` · `/blog/:slug` · `/podcast` · `/podcast/:index` ·
`/podcast/featured/:index` · `/resources` · `*` (catch-all → index.html)

### Next-app-owned routes (38 top-level)
`admin` · `best-government-contracting-software` · `blog` · `bootcamp` · `case-studies` ·
`checkout` · `compare` · `consulting` · `dashboard` · `data` · `demo` · `done-for-you` ·
`encore-funding` · `features` · `federal-contractor` · `for` · `funding` · `glossary` ·
`government-contract-help` · `guides` · `hubzone` · `internal` · `jobs` · `mi` · `mi-free` ·
`migration` · `mindy` · `partners` · `platform` · `premium` · `premium-page` · `pricing` ·
`privacy-policy` · `resources` · `team` · `terms` · `tools` · `videos`

### How .com currently delegates
`govcon-giants-site/vercel.json` holds **75 redirects** forwarding ~35 path families to
`app.govcongiants.org`, plus the catch-all rewrite `/(.*) → /index.html` that makes any
unlisted path render the SPA homepage. That catch-all is why `/funding` silently served the
podcast homepage until 2026-08-24 (PR #175).

---

## 2. ⚠️ PATH CONFLICTS — both codebases claim these

**This is what the no-merge gate exists to surface. Two real collisions.**

### `/blog`
| | SPA | Next app |
|---|---|---|
| Content | 10 articles (`src/data/articles.ts`) | 20 posts (`src/content/blog/*.ts`) |
| Live title | "GovCon Giants — Win Federal Contracts…" (homepage shell, client-rendered) | "Government Contracting Blog \| GovCon Giants" |
| Indexed | **Yes** — the July noindex has been removed | Yes |

### `/resources`
| | SPA | Next app |
|---|---|---|
| Content | Guides/books/Playbook page | `src/app/resources/` + `/resources/handouts` |
| Live title | homepage shell | "Free GovCon Resource Library \| GovCon Giants" |
| Indexed | **Yes** | Yes |

**Not a conflict:** `/about` is SPA-only (the app 404s on it). `/podcast` is SPA-only.

**⛔ BLOCKING — Eric decides, per path:**
1. `/blog` — which set of posts wins? Options: (a) app wins, migrate the 10 SPA articles in;
   (b) SPA wins, move 20 app posts out; (c) split — SPA content moves to `/podcast/blog`.
2. `/resources` — same question. The app's version looks like the fuller one.
3. Whichever loses needs **301s per URL**, not a bulk redirect, or the indexed slugs die.

Do not write code against this section until both are answered.

---

## 3. Migration sequence (after conflicts are resolved)

**Phase 0 — freeze.** Snapshot every indexed URL on all three hosts (GSC export) so the
redirect map can be diffed against reality afterward, not guessed.

**Phase 1 — one deployment owns .com.** Consolidate: the 8 SPA routes move into the Next app
(they are static content pages — About, Podcast list/detail, Blog, Resources), OR the SPA is
retired and its pages rebuilt as Next routes. Either way **one codebase serves every `.com`
path.** No catch-all rewrite to a second project.

**Phase 2 — flip the domain.** `govcongiants.com` (and `www`) point at the consolidated
deployment. `app.govcongiants.org` keeps serving during the cutover only.

**Phase 3 — internal URLs.** Update in this order, verifying each:
- `metadataBase` — already `https://www.govcongiants.com` ✅ (canonicals/OG already correct)
- `src/lib/synthetic.ts` — 3 refs to `app.govcongiants.org` (LEAD_API + 2 monitored URLs)
- `src/app/api/lead/route.ts` + `api/event/route.ts` — CORS allowlist (`podcast.govcongiants.org`)
- sitemap + robots
- Stripe checkout success/cancel return URLs ⚠️ **verify in the Stripe dashboard too**
- email templates + GHL links
- podcast episode descriptions — **many link `govcongiants.org/funding`** (see §5)

**Phase 4 — retire .org publicly.** Both `.org` hosts become path-preserving 308s to `.com`.
`app.govcongiants.org/:path*` → `govcongiants.com/:path*`. Keep these **forever** — they are
legacy entrances, not a fallback the site depends on.

**Phase 5 — verify.** Every route in §1 returns 200 on `.com`; every `.org` equivalent 308s to
it; canonical tags all `.com`; a real checkout completes; the attribution cookie survives.

---

## 4. What is already correct (don't redo)

- **SEO is already `.com`.** `metadataBase = https://www.govcongiants.com`, so canonicals,
  sitemap entries, and OG tags already point at `.com`. Google indexes `.com`, not the app
  subdomain. The `.org` exposure is what a **user** sees in the address bar, not what Google
  ranks.
- **`.org` apex already 301s to `.com`.** Verified 2026-08-24.
- **Code is already 143 `.com` refs vs 5 `.org`.**
- **The attribution cookie is host-scoped with no `Domain` attribute** (`AttributionTracker.tsx:93`),
  set client-side and read by `checkout/[product]/route.ts`. Consolidating onto one host makes
  this *more* reliable — today a visitor bouncing `.com` → `.org` can lose attribution entirely.

---

## 5. Known external references to fix

- **Podcast episode descriptions** (`govcon-giants-site/src/data/episodes.ts`) link
  `http://govcongiants.org/funding`. These are published in the Libsyn RSS feed and on every
  podcast platform — the `.org` 308 must survive indefinitely; we cannot edit already-distributed
  episode text everywhere.
- `podcast.govcongiants.org` is a **separate deployment** (`~/Projects/govcon-giants-podcast`)
  and is in the CORS allowlist of `/api/lead` and `/api/event`. Decide whether it also moves to
  `.com` or stays a legitimate subdomain.

---

## 6. Risks

| Risk | Mitigation |
|---|---|
| Indexed `/blog` + `/resources` URLs die in the conflict resolution | Per-URL 301 map from a GSC export, not a bulk rule |
| Stripe return URLs still point at `.org` → checkout breaks | Change in the Stripe dashboard as part of Phase 3, verify with a real transaction |
| Podcast RSS links rot | `.org` 308s are permanent, never removed |
| Next 16 type-check walks subdirs | A TS app subdir at repo root once broke deploys for ~18h (see CLAUDE.md). If SPA pages move into the Next app, move the *content*, not the Vite project |
| Auth-gated routes behind a host change | `/admin`, `/dashboard`, `/team` use password gates; verify each after the flip |

---

## 7. Definition of done

- [ ] `/blog` and `/resources` conflicts resolved by Eric (§2)
- [ ] One deployment serves every `.com` route in §1
- [ ] `govcongiants.org/:path*` → 308 → `govcongiants.com/:path*`
- [ ] `app.govcongiants.org/:path*` → 308 → `govcongiants.com/:path*`
- [ ] No `.com` route proxies to `.org`
- [ ] Canonicals, sitemap, Stripe returns, emails, CORS all `.com`
- [ ] Full route sweep: 200 on `.com`, 308 from both `.org` hosts
- [ ] A real checkout completes with attribution intact
