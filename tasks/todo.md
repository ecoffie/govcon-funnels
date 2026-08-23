# TODO

## ✅ DONE (2026-08-22, after the event) — PR #170 merged + the guard actually built

**[PR #170 — Page the funnel_leads readers](https://github.com/ecoffie/govcon-funnels/pull/170)** — MERGED.
**[PR #172 — Build the unranged-select guard for real](https://github.com/ecoffie/govcon-funnels/pull/172)** — MERGED.

**The guard was never broken — it never existed.** The note below said
`scripts/audit-unranged-selects.mjs` died with `MODULE_NOT_FOUND` and had been "silently passing."
The truth was worse: no file, no git history of one, no npm script, no CI step, no git hook. The
only mention of that filename in the entire repo was this todo entry. Nothing ran. This repo has
**no pre-push hook at all**, so the guard now lives in **CI** (`.github/workflows/test.yml` job
"Unranged Select Audit") where it runs for every agent and machine.

**It immediately found 2 MORE live instances of the same bug that #170 did not touch:**
- `src/lib/hubzone-registrations.ts` → feeds `/api/cron/hubzone-reminders` — **a send path**
- `src/lib/mindy-bootcamp-registrations.ts` → reads `source='mindy-launch'`

Both now page via shared `fetchAllLeadRows()` in **`src/lib/supabase-paging.ts`** (these files build
their own Supabase client, so they can't use the module-private helper in `supabase-leads.ts`).

**Live sizing (2026-08-22, don't re-derive):** `funnel_leads` had **950** `mindy-launch` rows —
that source was **~50 signups from the 1,000 cap**, thinner than the 769 figure below suggested.
HUBZone was at 226 (187 + 39), so those two readers had not yet begun truncating.

**Using the guard:**
- `npm run audit:selects` — audit (exit 1 on findings, **exit 2 if the audit itself throws**)
- `npm run audit:selects:self-test` — negative control; CI runs this FIRST
- `node scripts/audit-unranged-selects.mjs --list` — every site + verdict
- Deliberately **zero-dependency**; the CI job does NOT run `npm ci` so an install failure can never
  silently skip it. `PAGER_HINTS` entries are asserted to still call `.range()`, so a hint cannot
  outlive its paging. `ALLOWLIST` requires a written reason (one entry: `sam/utils.ts`
  `delete().select('id')` — the DELETE is uncapped, only the returned id list truncates).
- Verified: self-test 8/8 · 15/15 sites bounded · tsc 0 · build 0 · 33 unit tests pass.

**Why this came up (don't re-derive):** the site banner showed **769** registrants while the email
dry-run showed **760**. That gap is CORRECT — the site counts raw `funnel_leads` rows; the mailer
dedupes by lowercased email and drops test/plus addresses via
`/\+|@example\.com$|\b(test|email-test)\b/i`. Nine were dupes or test entries. The mailer's number
is the more accurate one. The unranged-select hazard was found while checking that gap, not because
of it.

## ✅ DONE (2026-08-22) — stale July-25 date fixed (PR #174), and one was USER-FACING

Scoped as a documentation-only comment fix. It wasn't: the date was stale in **7 files**, and
`src/components/SiteNav.tsx` rendered the literal text **"Mindy Day — July 25"** in the mobile nav.
Client component → never in server HTML → curl couldn't catch it; only visible when the menu opens.

**Root cause = the half-migration predicted here.** `MINDY_DAY_SHORT_DATE = 'August 22'` already
existed in `mindy-bootcamp-registrations.ts` and its comment claimed "SiteNav… read from here" —
but SiteNav *couldn't*: that module dynamically imports `@supabase/supabase-js`, so no client
component can import it. Aspirational comment, hardcoded date, silent drift.

**Fix:** dates now live in **`src/lib/mindy-day.ts`** (dependency-free, server+client safe).
`mindy-bootcamp-registrations.ts` re-exports from it. **Any new place that shows the Mindy Day date
must import from `src/lib/mindy-day.ts`** — never retype it.

The route header was also wrong beyond the schedule: it cited a "vercel.json note" for cron timing,
but there is no vercel.json cron (rule #5). It now names `cron_jobs` as the only source of truth,
lists the live rows, and warns that **date-pinned rows stay enabled and re-arm on the same calendar
date next year**.

Verified: zero July-25 literals in `src/` · live prod nav chunk serves "Mindy Day — " + "August 22",
no "July 25" in any served chunk · tsc 0 · build 0 · 33 tests · guard 15/15.

## ✅ DONE (2026-08-22) — disabled a cron that would have emailed 797 people

**`mindy-lifetime-finalclose`** (`cron_jobs` id `e49245b8-7f29-40b0-aaf7-697d3be018d8`) was still
`enabled=true` with `cron_expr = 0 0 25 8 *` → **Sun Aug 24, 8 PM ET**, and would have sent the
lifetime "final close" offer email to **797 Mindy Day registrants** using copy written for a
**June 29** deadline. Its sibling `mindy-lifetime-extension` had already been disabled; this row
was missed. **Idempotency would NOT have stopped it** — the guard key TTL is 48h and the job last
ran Jun 30, so the key was long expired. Disabled on Eric's go-ahead; reason recorded in the row's
`notes`. Verified `enabled=false` via a separate read-only connection.

**Two things worth remembering:**
- **Date-pinned cron rows are a recurring hazard.** `0 0 25 8 *` has no year — it re-arms every
  Aug 25. After any event, sweep: `SELECT job_name, cron_expr, enabled FROM cron_jobs WHERE
  enabled = true AND cron_expr !~ '^\S+\s+\S+\s+\*\s+\*'` and disable the one-shots.
- **The stored Supabase service-role key in `market-assassin/.env.local` is STALE** ("Invalid API
  key"). Both projects share one database (`krpyelfrbicmvsmwovti`); the working key is in
  **govcon-funnels** production env — `vercel env pull`. Anything running locally against the
  market-assassin copy is silently failing.

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
