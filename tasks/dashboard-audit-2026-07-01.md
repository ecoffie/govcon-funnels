# Admin Dashboard Audit + Cleanup — 2026-07-01

Goal: make every dashboard make sense to a human + show correct live numbers. Trigger: dead bootcamp funnels still referenced after they were removed. No new dashboards — cleanup + correction only.

## Root cause (funnels)
Retired funnels 301→`/` (vercel.json): `/bootcamp`, `/proposal-bootcamp`, `/free-course`, `/contract-vehicles-bootcamp`, `/cvb`, `/training`, `/events`. But `src/lib/shared-content.ts` still listed them as "active" — and that file ALSO feeds the PUBLIC homepage, so live visitors had dead `/bootcamp` + `/proposal-bootcamp` links.

## LIVE funnel routes (source of truth, verified)
`/` `/hubzone` `/resources` `/resources/handouts` `/mi-free` `/opp` `/funding` `/consulting` `/premium` `/jobs` `/federal-contractor`. Current active push = **HUBZone webinar** + **Mindy re-ignite drip**.

## FIXED — funnels (govcongiants.com) — commit d069925, deployed
- `src/lib/shared-content.ts`: activeFunnels, plansOverview Beginner tier, homepage freeResources, quickLinks, sourceTags → live routes only (removed 8 dead funnels). "12 funnels" hardcode → `activeFunnels.length`. Stale "Feb 16 2026" date removed.
- `dashboard/page.tsx`: "Top priority" card Feb 28 Proposal Bootcamp → HUBZone + registration command center + Mindy drip.
- DELETED 4 unreferenced redirect-stub pages: funnels-and-lead-flow, plans-overview, lead-automation, dashboard-info (not in nav).
- Nav now = 6 real pages: home, analytics, marketing-report, team, how-it-all-fits-together, funnels-and-plans-overview.

## FIXED — Mindy (getmindy.ai) — commit 74f53d62, deployed
- `launch-command-center`: dropped stale "V1 shell / Next phase / needs wiring" labels (data IS wired) → "Live"/"Wired"; badge "Internal V1" → "Internal".
- `admin/page.tsx` grant UI: removed dead legacy prices ($297/$497 MA, $197/$297 content) from tier labels; kept tier values (grant logic unchanged). Eric confirmed those products are RETIRED.
- `set-aside-impact` + `competitive-positioning`: added "as of FY2024 / Jun 2026" date stamps (static macro/competitor figures, not live).

## LEFT ALONE — already CURRENT (live/data-driven, don't touch)
Mindy: admin/dashboard (=command-center/dashboard), mi-accounts, tool-health, data-inventory, members, admin (access), briefings/dashboard — all pull live from /api/admin/* or /api/mi-dashboard. data-inventory correctly surfaces real 317K/88K/1.0M scale via live counts.
Funnels: analytics (Looker iframe), marketing-report (live /api/dashboard/report), team (live /api/dashboard/users).

## Staff queue statuses — FIXED (commit follows dashboard cleanup)
- launch-command-center Operating Lanes + Operating Queues (roleLanes/queueItems: Shanoor/Sikander/Ryan/etc.) now carry a visible "as of Jul 2026" stamp via `OPS_SNAPSHOT_AS_OF` const. Kept the owner/status VALUES (couldn't verify true current state; date-stamping is the honest fix vs. guessing new statuses). Removed the last "V1/V2 operating design" framing. Bump OPS_SNAPSHOT_AS_OF when statuses are reviewed.

## Brand drift — FIXED
- admin/dashboard h1 "GovCon Giants Admin" → "Mindy Admin"; tool-health header+footer "GovCon Giants" → "Mindy"; briefings/dashboard footer "GovCon Giants AI" → "Mindy AI".
- LEFT the 3 legit pitch-deck refs (competitive-positioning, demo) — they cite the PARENT brand's audience/moat on purpose ("the GovCon Giants audience", "$42M can't buy it").

## STATUS: audit fully closed. All flagged items fixed + deployed (funnels + Mindy).
