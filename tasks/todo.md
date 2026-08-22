# TODO

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
