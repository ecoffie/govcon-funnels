# TODO

## 🟢 AUTOMATED: Mindy Re-Ignite Drip (cron live)

Full state: `tasks/mindy-reignite-launch-state.md` | Engine: `src/lib/mindy-reignite.ts`

- [x] 2026-07-01: Shipped daily cron `/api/cron/mindy-reignite` (`0 14 * * *` = 9am ET). Auto-advances (2-day spacing) + seeds ramp (50→100→200→350→500/day) until ~4,323 enrolled. Posts a Slack summary each run to SLACK_LEAD_WEBHOOK_URL.
- [x] 2026-07-01: ClickFunnels/Brunson email restyle (now the standard — see CLAUDE.md).
- [ ] **First automated run: 2026-07-02 ~9am ET.** You'll get a Slack ✅ (or 🚨 if it failed). If NO Slack message arrives by ~9:15am ET, the cron didn't fire — check Vercel → Deployments → Crons.
- [ ] After a few ramp days, glance at GHL Email Analytics for open rate/complaints; if reputation dips, pause seeding (lower ramp or disable the cron in vercel.json).

### Other tabled work
- Homepage redesign (Apollo-style, light+dark mockups): `tasks/mindy-homepage-redesign.md`
- Briefing entitlement gap (466 orphans): `tasks/mindy-briefing-entitlement-gap.md`
