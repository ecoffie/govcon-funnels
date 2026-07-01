# Mindy Briefings — Missing-Entitlement Gap (why users "stopped getting alerts")

**Found 2026-06-30** while investigating `info@csexclusive.org` ("stopped getting alerts").

## Root cause
The daily-briefing audience (`resolveBriefingAudience` → `fetchBriefingAudienceCandidates`,
`src/lib/briefings/delivery/rollout.ts`) is built from `user_notification_settings`
(`is_active=true` AND `briefings_enabled=true`) but then **hard-filtered** by an entitlement set
(rollout.ts:386-387: `.filter(user => entitledEmails.has(user.email))`).

`entitledEmails` comes ONLY from `customer_classifications` where
`briefings_access ∈ {lifetime, 1_year, 6_month, subscription, beta_preview}` AND
`briefings_expiry > now` (rollout.ts:270-284).

→ A user with perfect notification settings but **no customer_classifications row** (or an expired one)
is silently dropped from every run. No error, no briefing_log row.

`user_profiles.access_daily_briefings=true` is NOT what the sender checks — that's a red herring.

## Population (2026-06-30)
- **293** users currently PASS the gate (283 active beta_preview + 7 lifetime + 2 subscription + 1 1_year) — these still get briefings.
- **131** EXPIRED entitlements (117 beta_preview + 14 1_year) — a beta_preview cohort expired ~2026-06-28. Anyone reporting "stopped this week" likely fell here.
- **466** ORPHANS: briefings_enabled in notification settings but NO classification row at all (her case).

## Fix applied (single user only)
Upserted `customer_classifications` for `info@csexclusive.org`:
`briefings_access='beta_preview'`, `briefings_expiry='2026-12-31'`, `classification='free'`.
Verified she now passes the gate. She lands in the next scheduled daily run (briefing_log row appears then).

## TABLED — decide later (business/deliverability call, NOT code)
- [ ] Are the 466 orphans + 131 expired SUPPOSED to get briefings? If yes, it's a real bug affecting ~600 people.
- [ ] Mass-enabling = emailing hundreds who haven't received mail recently → risky given the current sender-reputation issue (86K sent / 15% open / 0% click on mail.govconedu.com). Warm up, don't blast.
- [ ] Trace WHAT creates customer_classifications rows (which cron/script) to find why 466 never got one — likely a classification job that doesn't cover notification-settings signups.

## Verify-a-user recipe (from ~/Market Assasin/market-assassin, uses .env.local service-role)
1. `user_profiles` — sanity only (access_* flags are NOT the gate)
2. `user_notification_settings` — is_active + briefings_enabled + naics_codes (the opt-in)
3. `customer_classifications` — briefings_access + briefings_expiry (THE GATE)
4. `briefing_log` — sent/skipped/failed history (empty = never in a run)
