# TODO

## 📍 State as of 2026-10-27

origin/main = `d4a30ef` (merge of #216, 2026-10-10). Nothing merged since. **govcongiants.com is now the
only canonical public host** (#190/#191/#192, 2026-09-05); live check 2026-10-27: `/podcast` 200,
`/about` 200, `/encore` 307 → `/encore-funding`. Open work is mostly **unmerged PRs + held
Command Center actions + stale worktrees** — listed under OPEN below.

## ✅ Done since 2026-08-22 (merged PRs by theme)

**One site on .com / SEO canonicalization**
- #175 `/funding` destination 404 fixed (Encore reversed a domain migration)
- #176 Phase 2: blog, resources, podcast, /about on .com + legacy redirects
- #186 Consolidate GovCon production into the root app (brand homepage into Next)
- #187 Podcast URLs: positional identity removed from every public podcast URL
- #188 Disabled the looping app-host redirect (~10 route families)
- #189 Phase 3 apex cutover runbook (`tasks/PHASE3-apex-cutover-runbook.md`)
- #190 govcongiants.com the only canonical host; canonicalization lives in `vercel.json`; `runCanonicalHostChecks()` in `src/lib/synthetic.ts`
- #191 Retired hosts served indexable 200 at `/` → explicit root redirects
- #192 Dormant `podcast.govcongiants.org` → canonical .com redirects
- #193 Synthetic: `mi.govcongiants.com` is a redirect bridge, not a 200 URL
- direct commits: `338b327` `/encore` → `/encore-funding`; `c02d179` `/ericcoffie` 404 → speaker page in live app; `c609b43` two sitemap entries pointed at redirects (`docs/changes/2026-09-09-sitemap-redirect-hops.md`)

**Security / hygiene**
- #178 Cursor repository instruction foundation (`.cursor/rules/`, CLAUDE.md)
- #179 Retired the HUBZone registrations dashboard
- #204 Retired Pursuit Briefs from marketing copy

**Command Center + lead pipeline honesty (Oct)**
- #207 Retired the canary-lead probe; synthetic leads suppressed (route + both email paths)
- #208 Honest monitoring, fail-closed alerts, v2 migration (`supabase/rollback/20261004_command_center_v2.down.sql` is the guarded rollback)
- #209 Release record → `tasks/RELEASE-RECORD-command-center-2026-10-04.md`
- #212 Existing GHL contact gets tagged instead of failing on duplicate (`400 "does not allow duplicated contacts"`)
- #213 Pipeline-log write runs via `next/server` `after()` so it survives the response
- #214 Incident record → `tasks/INCIDENT-ghl-duplicate-contact-2026-10.md`
- #216 mindy-launch confirmation outcome recorded: accepted / failed / **pending (unconfirmed ≠ failed)**; closes issue #215

**Aug 22 post-Mindy-Day cleanup (condensed — durable rules kept)**
- #170 + #172: `funnel_leads` readers paged (were ~50 rows from the 1,000 PostgREST cap). Shared pager
  `fetchAllLeadRows()` in **`src/lib/supabase-paging.ts`**. Guard lives in **CI** (`.github/workflows/test.yml`,
  "Unranged Select Audit"); repo has **no pre-push hook**.
  **Using the guard:** `npm run audit:selects` (exit 1 findings, **exit 2 if the audit throws**) ·
  `npm run audit:selects:self-test` (negative control, CI runs first) · `node scripts/audit-unranged-selects.mjs --list`.
  Zero-dependency on purpose. `ALLOWLIST` needs a written reason. **It only recognises `.from('<literal>')`** —
  passing a table-name constant hides the site (found in #208).
- #174: **Any place that shows the Mindy Day date must import from `src/lib/mindy-day.ts`** — never retype it
  (SiteNav once rendered a stale "July 25" client-side, invisible to curl). `cron_jobs` rows are the only cron
  source of truth for those routes.
- Disabled `mindy-lifetime-finalclose` (`cron_jobs` `e49245b8-…`), which would have emailed **797** registrants
  June-29 copy. **Date-pinned cron rows re-arm yearly.** After any event sweep:
  `SELECT job_name, cron_expr, enabled FROM cron_jobs WHERE enabled = true AND cron_expr !~ '^\S+\s+\S+\s+\*\s+\*'`
  and disable the one-shots.
- **The Supabase service-role key in `market-assassin/.env.local` was STALE** ("Invalid API key") as of 2026-08-22.
  Both projects share DB `krpyelfrbicmvsmwovti`; the working key is in govcon-funnels prod env (`vercel env pull`).
- Site banner (raw rows) vs mailer (deduped, test addresses dropped) counts differ by design; the mailer's is accurate.

## 🟡 OPEN (as of 2026-10-27)

**In progress**
- [ ] **Site-wide brand refresh: PR #218 open** (`fix/about-brand-and-stale-content`). Shared SiteHeader/SiteFooter,
      Merriweather/Public Sans + brand tokens site-wide, SiteNav deleted, stale Mindy Day nav + wrong LinkedIn fixed.
      Needs: merge, then an approved deploy, then `POST /api/command-center/verify`.
- [ ] **Eric Coffie personal site → ericcoffie.com** (approved 2026-10-27). Standalone site built from
      `public/ericcoffie/index.html`; private preview first. Shopify no longer needed for ericcoffie.com.
      **Keep ALL email DNS (MX, SPF, DKIM, DMARC) at Namecheap.** No DNS change, Shopify billing change, or prod deploy
      without Eric's go-ahead. After launch: 301 `govcongiants.com/ericcoffie` → `https://ericcoffie.com`, and add a
      Speaking / Eric Coffie link on govcongiants.com (separate PR from #218).

**Open PRs needing a decision**
- [ ] **#217** docs: correct confirmation-evidence wording in the GHL incident record (2026-10-10) — docs only.
- [ ] **#210** fix(command-center): keep monitoring data out of anonymous responses (Cursor, 2026-10-05) —
      page reads a `/dashboard`-scoped cookie and returns a sign-in shell without querying Supabase. **Security fix; review first.**
- [ ] **#203** security(cron): header-only auth for the Mindy cron routes — `?password=` refused (2026-09-21).
      Only caller is Mindy's dispatcher (authenticates by header) per PR body.
- [ ] **#177** Phase 3 runbook "DO NOT EXECUTE" (2026-08-24) — likely superseded by merged #189 (same runbook file); status unverified → close or merge.
- [ ] **Cursor draft/bug PRs, possibly obsolete after the .com cutover:** #180 apex `/encore` serving SPA
      (live `/encore` now 307s to `/encore-funding` → looks obsolete), #181 leftover encoregov.com CTAs, #184 partner
      CTAs 404 on Calendly, drafts #152, #158, #159, #160. Status of #181/#184/#152/#158–#160 unverified.
- [ ] **Dependabot batch (19 open):** #211 undici, #206 nodemailer 10.0.9 (major), #205 ip-address, #201 js-yaml,
      #200 baseline-browser-mapping, **#199 sharp + next**, #196 vitest, #185 @humanfs/node, #173 brace-expansion,
      #154 nanoid, #151 postcss + next; sub-apps: #202/#157 (`govcon-giants-site`), #198/#183/#155 (`govcon-crm2`),
      #195/#194/#182 (`dashboard`).

**Command Center held / follow-ups** (from `tasks/RELEASE-RECORD-command-center-2026-10-04.md`)
- [ ] HELD (needs authorization): `POST /api/command-center/alert-selftest` — sends one real Slack message; Slack delivery + dedupe in prod **not tested**.
- [ ] HELD (needs authorization, bulk delete → rule #11): cleanup of **4,549** `canary+…@example.com` rows in `funnel_leads` (last 2026-10-04T02:45Z) + CRM/Slack/email side effects.
- [ ] Dashboard shows "—" for every zero; should only when unmeasured.
- [ ] Stale empty-state copy ("beacon ships with the next govcon-giants-site deploy", "logging starts with the next govcon-funnels deploy").
- [ ] Deploy panel says "Set VERCEL_API_TOKEN" but token is set and Vercel API returns **403** — check token scope; show real error.
- [ ] Residual: Slack post OK but `cc_alert_log` write fails → may re-post next run (reported, not prevented).
- [ ] No retention policy for `synthetic_checks` (~2,600 rows/day) or `site_events`.
- [ ] Vercel Preview env has no Supabase/admin creds; authenticated previews need an isolated test DB.

**Lead pipeline follow-ups** (from #213/#216 bodies)
- [ ] #213's live check "still pending a real submission" (per #216, 2026-10-10) — status unverified since.
- [ ] Work **before** the response in `/api/lead` (GHL, Slack, Supabase, SMTP) has no timeouts; >~100s could cut the `after()` sequence at the 120s limit.

**Domain / podcast loose ends**
- [ ] `tasks/REMOVAL-RECORD-app-govcongiants-com.md`: dead Vercel attachment `app.govcongiants.com` verified safe to remove 2026-09-05, **NOT removed**. (Do not confuse with `app.govcongiants.ORG`.)
- [ ] `tasks/CUTOVER-podcast-routes.md` still says "Not started", but `vercel.json` no longer has an unconditional `/podcast` → podcast host rule and live `/podcast` is 200 on .com → doc is likely stale; status unverified.
- [ ] Root `CLAUDE.md` "Unresolved (podcast live source)" still says `vercel.json` sends `/podcast` to `podcast.govcongiants.org`; that rule is now host-conditional only → CLAUDE.md likely stale.

**Unmerged worktree branches**
- [ ] `docs/speaker-calendar-2027` (worktree `speaker2027`, 2026-08-24): `tasks/SPEAKER-CALENDAR-2027.md`, 1 commit, **no PR**.
- [ ] `wip/ga4-handoff-notes` (worktree `wip-ga4-handoff`, 2026-10-08): GA4 property wiring notes in `tasks/ga4-dashboard-setup.md`, **no PR**; shared checkout also has uncommitted edits to that file.
- [ ] `hotfix-redirect-loop` worktree (#188 merged) has an untracked `tasks/PHASE3-apex-cutover-runbook.md` — superseded by #189's copy; check before pruning.
- [ ] **Prunable (merged or patch-equivalent):** `encore-redirect` (= `338b327`), `ericcoffie-links`, `ericcoffie-page`, `sitemap-cleanup`,
      `mi-synthetic-fix`, `phase4-canonical`, `podcast-host-retire`, `podcast-port`, `retire-hubzone-registrations`,
      `root-redirect-fix`, `runbook-doc`. `phase3` holds open #177.

## 🔴 PAUSED: Mindy Re-Ignite email drip → pivoted to META RETARGETING (2026-07-08)

**DO NOT re-enable the cron or "un-stick the ramp."** Two weeks of cron/ramp/seed plumbing never
fixed the real blocker: **sender reputation** (15% open / **0% click** / spam-foldering — flagged
day 1, gate never checked). Also a **seed-starvation bug**: `runSeed` overpulls only `quota*3`
(~300) but the 307 already-enrolled sit at the FRONT of GHL's order → fresh pool ≈ 0 → enrolls
nobody, worsening as you enroll more.

**Decision: abandon the email drip for these 4,298 alumni. Move them to Meta retargeting.**
- [x] Cron paused: `cron_jobs` row `8f7bca45-3d5a-42b7-bb2f-450e172d0833` `enabled=false` (verified 2026-07-09 01:37 UTC).
- [x] Meta audience exported: `scripts/export-reignite-audience-meta.mjs` → 4,297-row CSV (email 100% / phone 51% / name ~98%, ~65–80% expected match). PII file lives in session scratchpad — upload to Meta Business Manager → Audiences → Customer List, then delete.
- [ ] **You:** upload the CSV to Meta, build the reactivation campaign (Traffic → profile-completion landing).
- [ ] **Install Meta pixel on getmindy.ai** (like the GA/Google-Ads tag in layout.tsx) → measure cost-per-profile-completion + enable site-visitor retargeting.
- [ ] To EVER resume email: flip `enabled=true` AND fix `runSeed` starvation (NOT-contains tag filter) AND fix deliverability (from-name, subjects) first.

Full state: `tasks/mindy-reignite-launch-state.md` | Engine: `src/lib/mindy-reignite.ts`

## 🟡 OPEN: Enterprise data-privacy prospect → validates Data Trust Layer Phase 4 (2026-08-21)

**Trigger phrase to resume: "enterprise privacy" or "the North Star prospect."**

A prospect (partner: Sandeep, company: North Star) emailed asking for an "Enterprise connection"
so their queries — e.g. comparing North Star to a teaming partner — stay private, and **offered to
pay for it**. This is the first demand signal for Data Trust Layer **Phase 4**, which the PRD
deliberately deferred as *"later, contract-driven… only for the 1–2 who pay, never default."*

- [ ] **You:** send the reply → `tasks/drafts/reply-enterprise-data-privacy.md`
      (plain-letter, verified proof table, deliberately no price / no CUI claim / no ship date)
- [ ] Open items in that draft: name Sandeep directly? attach NDA now or after the call?
- [ ] **If the call goes well:** scope Phase 4. Smaller than the PRD assumed — `organizations` /
      `org_members` / `org_clients` already exist (`20260702_coach_org_rls.sql`). Net-new is
      `org_id` on the 5 vault tables + seats. Do NOT scope it before the call.

**Answer to "what do we already have?" (all verified in code 2026-08-21, safe to repeat to customers):**
Phases 1–3 of the Data Trust Layer shipped 2026-07-05. Vault deletion + self-serve export
(`src/lib/vault/vault-data.ts`), **RLS FORCE'd on all 5 vault tables** (`20260705_vault_rls_backstop.sql`
— pre-flight proved the anon key COULD read the vault; post: anon blocked 5/5), sensitive LLM calls
pinned to a no-training allow-list that **ignores the `LLM_CHAIN` env override** (5 tests),
RAG PII scrubbing (`src/lib/rag/scrub-pii.ts`), and the live trust page `/app/trust` (HTTP 200).
Chat is owner-checked twice (`chat-sessions/route.ts:64`); nothing writes user activity into the
RAG corpus (zero application writers to `mindy_rag_documents`).

**Do NOT claim CMMC/CUI/FedRAMP** — `docs/strategy/PRD-cmmc-cui-custody-strategy.md` (market-assassin)
is an exploration draft, not shipped.

PRD: `~/Market Assasin/market-assassin/docs/PRD-data-trust-layer.md` | Draft: `tasks/drafts/reply-enterprise-data-privacy.md`

### Other tabled work
- Homepage redesign (Apollo-style, light+dark mockups): `tasks/mindy-homepage-redesign.md`
- Briefing entitlement gap (466 orphans): `tasks/mindy-briefing-entitlement-gap.md`
