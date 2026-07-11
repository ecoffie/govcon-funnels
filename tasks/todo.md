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

### Other tabled work
- Homepage redesign (Apollo-style, light+dark mockups): `tasks/mindy-homepage-redesign.md`
- Briefing entitlement gap (466 orphans): `tasks/mindy-briefing-entitlement-gap.md`
