# TODO

## 🟢 AFTER MINDY DAY (2026-08-22 event ends 1 PM ET): merge PR #170

**[PR #170 — Page the funnel_leads readers so they stop capping at 1,000](https://github.com/ecoffie/govcon-funnels/pull/170)**
Built and green (tsc clean, production build exit 0), deliberately NOT merged during the event
because it touches `getMindyDayRegistrantsFromSupabase()` — the exact function the 8 AM and 10 AM
reminder routes call to build the recipient list. Merging mid-event risks a deploy for a bug that
cannot bite below 1,000 registrants (we were at 769).

- [ ] Merge #170 once the event is over
- [ ] **Then fix `scripts/audit-unranged-selects.mjs`** — the pre-push gate built for exactly this
      bug class dies with `MODULE_NOT_FOUND` before it checks anything, at the repo root and in a
      worktree alike, on code it never touched. **It has been silently passing**, which is why the
      three unranged selects survived in `src/lib/supabase-leads.ts`. A guard that fails invisibly
      is worse than no guard — it bought false confidence. Verify with a negative control after
      fixing (introduce an unranged select, confirm the script actually fails).

**Why this came up (don't re-derive):** the site banner showed **769** registrants while the email
dry-run showed **760**. That gap is CORRECT — the site counts raw `funnel_leads` rows; the mailer
dedupes by lowercased email and drops test/plus addresses via
`/\+|@example\.com$|\b(test|email-test)\b/i`. Nine were dupes or test entries. The mailer's number
is the more accurate one. The unranged-select hazard was found while checking that gap, not because
of it.

## 🟡 TOMORROW (2026-08-23+): stale header comment in the Mindy Day reminder route

**Do NOT do this on Aug 22** — the route fires at 8:00 AM and 10:00 AM ET that day, and editing it
means a deploy for zero runtime benefit. Documentation-only fix; do it after the event.

`src/app/api/cron/mindy-day-reminders/[type]/route.ts`, the block comment at lines ~6–24, still
describes the **July 25** schedule from before Mindy Day moved to **Aug 22**:

| Comment says | Actual (`cron_jobs` rows, verified 2026-08-22) |
|---|---|
| "Mindy Day (July 25, 2026 · 10:00 AM ET)" | Aug 22, 2026 · 10:00 AM ET |
| `heads-up` → `0 6 25 7 *` = 1:00 AM EST | `0 15 21 8 *` = 11:00 AM ET **Aug 21** |
| `morning` → `30 12 25 7 *` = 7:30 AM EST | `0 12 22 8 *` = **8:00 AM ET** |
| `live` → `55 14 25 7 *` = 9:55 AM EST | `0 14 22 8 *` = **10:00 AM ET** (class start) |

**Runtime is unaffected** — the schedule that actually fires lives in the `cron_jobs` table, not in
this comment. But this is the same half-migration shape that bit us before (Zoom URL updated to the
`MINDY_DAY` constant while the meeting ID and passcode stayed on June literals): someone updated the
DB rows and the constant, and left the comment. A reader in three months believes the wrong schedule.

- [ ] Rewrite the comment to match the live cron rows, and note that `cron_jobs` is the source of
      truth for scheduling — not the comment (there is no `vercel.json` cron; see rule #5).
- [ ] While in there: confirm no other July-25 literals survive (`grep -rn "25 7 \*\|July 25" src/`).

**Verified working on 2026-08-22 (for context, don't redo):** `?dry=1` on both `morning` and `live`
returned 760 recipients, real Zoom link `us06web.zoom.us/j/86152556791`, `usingFallbackLink: false`.
The prior day's `heads-up` sent 578. The route has a dry mode (`?dry=1`) and a safety gate that
refuses to send if only the registration-page fallback link is available — use the dry mode for any
future verification instead of firing a real send.

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
