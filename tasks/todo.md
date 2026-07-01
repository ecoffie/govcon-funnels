# TODO

## 🔴 ACTIVE: Mindy Re-Ignite Drip (soft launch in progress)

Full state: `tasks/mindy-reignite-launch-state.md`

- [ ] **TONIGHT (2026-06-30, ~after 6pm):** Check the 43-contact soft-launch cohort in GHL → Email Services → Email Analytics (filter to today). Gate: open >15% baseline + complaints ~0 → scale; else fix from-name/subjects first.
- [ ] **2026-07-02:** Advance the 43 to email 2 → `node scripts/mindy-reignite-drip.mjs --send` (NOT before — 2-day spacing).
- [ ] **After metrics look healthy:** scale enrollment with warm-up ramp → `--seed --limit=200` → `--limit=500` → full `--seed` (4,323 total).

### Done
- [x] 2026-06-30: Resolved GHL token/location/scope (alumni `AMkIivLuREYwsX5GhAAL`, `conversations/message.write`). Smoke test sent all 5. Soft launch seeded 43 (7 expected suppression failures).
