# Release record — canary retirement + Command Center monitoring (2026-10-03/04)

No secrets in this file. Passwords, service keys and env values were pulled only into a temporary scratch file during verification and deleted afterwards.

## Summary

| Item | Status |
|---|---|
| Fake canary signups (every 15 min through the real `/api/lead`) | **Stopped** — PR #207, merge `186aa1a` |
| Synthetic-lead protection at `/api/lead`, CRM senders, `funnel_leads` write, email sender | **Live** — #207 + #208 |
| Command Center tables (`site_events`, `lead_pipeline_log`, `synthetic_checks`, `cc_alert_log`) | **Created** — v2 migration applied 2026-10-04 ~10:05 ET |
| Check results persisted and displayed | **Verified** in production |
| Alert dedupe moved off Mindy's `alert_log` to `cc_alert_log`; fails closed | **Live** — PR #208, merge `5d73bb7` (reviewed head `edef9a8`) |
| End-to-end Slack delivery + dedupe in production | **NOT tested** — self-test held |
| Cleanup of existing fake records / sent emails | **NOT done** — held |

## Code

| PR | Merge | Reviewed head | What |
|---|---|---|---|
| #207 | `186aa1a` | `5426e9a` | Retired the `canary-lead` probe; synthetic-lead guard in `/api/lead` + email sender |
| #208 | `5d73bb7` | `edef9a8` | Honest monitoring states, fail-closed alerting with explicit status + bounded dedupe read, boundary guards in CRM/`funnel_leads`, v2 migration + guarded rollback, alert self-test endpoint |

## Migration

| File | sha256 (first 16) |
|---|---|
| `supabase/migrations/20261004_command_center_v2.sql` | `ad815b84e0dd6ae0` |
| `supabase/rollback/20261004_command_center_v2.down.sql` | `af95ff79f9cc7128` |

- Byte-identical at `750a1c3` (where PGlite verification ran, 27/27), `edef9a8` (reviewed head) and `main`.
- Applied by pasting into the Supabase SQL editor of project `krpyelfrbicmvsmwovti` ("Market Assasin", production). This database is **shared with Mindy**. The clipboard content was hash-checked against `ad815b84…` before the paste.
- The editor reported "Success. No rows returned". That message proves nothing on its own; the verification below is the evidence.
- The four tables are absent from market-assassin's own migration ledger, which only tracks that repo's files. market-assassin source, scripts and migrations reference none of the four names (checked before applying).
- The original `20260817_command_center.sql` never applied: the unquoted reserved column `check` is a syntax error, and `alert_log` collided with Mindy's table. That file is now commented out.

## Before / after evidence

### Mindy's `alert_log`

| | Before (2026-10-04 ~10:04 ET) | After (~10:07 ET) |
|---|---|---|
| RLS | true | true |
| Table comment (tag) | null | null |
| ACL | `postgres=arwdDxtm/postgres`, `service_role=arwdDxtm/postgres` | same |
| ACL md5 | `e4425b6978962d6aa486d041d6e0fa5c` | `e4425b6978962d6aa486d041d6e0fa5c` |
| Columns | alert_date, alert_type, clicked_at, created_at, delivery_status, error_message, id, opened_at, opportunities_count, opportunities_data, retry_count, sent_at, upgraded_to_briefings, user_email | identical |
| Row count | 201,484 (11:25Z) | 201,511 (14:05Z) — Mindy's own writes |

**Limit of this evidence:** it shows the table's settings and shape are unchanged and the row count didn't drop. It does **not** prove every existing row is untouched, because Mindy updates rows itself. That guarantee rests on the migration text: outside comments, it contains no statement that names `alert_log`. It is also supported by the PGlite runs, where `alert_log`'s rows stayed intact in every scenario.

### Command Center tables (after)

| Table | Data API (before → after) | RLS | Tag | anon / authenticated access | ACL md5 |
|---|---|---|---|---|---|
| `cc_alert_log` | 404 → 200 | true | command-center-v2 | none / none | `e4425b69…` |
| `lead_pipeline_log` | 404 → 200 | true | command-center-v2 | none / none | `e4425b69…` |
| `site_events` | 404 → 200 | true | command-center-v2 | none / none | `e4425b69…` |
| `synthetic_checks` | 404 → 200 | true | command-center-v2 | none / none | `e4425b69…` |

### Behaviour

| Check | Result |
|---|---|
| Post-merge, pre-migration (`5d73bb7`) | verify `ok:false`, `checksOk:true`, saved 0/27; dashboard banner + ALERTING PAUSED; cron 200 with no alert activity |
| Post-migration verify | `ok:true`, saved **27/27** |
| Scheduled cron 14:15Z | +27 rows (54 total) |
| Dashboard | Uptime **10/10 UP**, no unavailable banner, no ALERTING PAUSED |
| `site_events` | 16 beacon rows within ~10 minutes (page_view, scroll_depth) |
| `lead_pipeline_log` | 0 at close — no real lead submitted during the window |
| `cc_alert_log` | 0 — **no operational alerts recorded**. Slack delivery is untested, so this does not show that nothing was sent. |
| `/api/lead` with the old canary payload | `{suppressed:true, delivered:false}` |

## Rollback guidance

- **Do not revert code.** Reverting #208 brings back the `alert_log` collision and misleading statuses. Reverting #207 brings back the fake signups. Stop and diagnose first.
- To remove the tables only: `supabase/rollback/20261004_command_center_v2.down.sql`. It drops only tables tagged `command-center-v2`, refuses untagged same-named tables, and refuses tables holding monitoring history unless its confirmation line is uncommented. This is **destructive** once history exists. It never touches `alert_log`.

## Still held (need explicit authorization)

1. `POST /api/command-center/alert-selftest`. It sends **one real Slack message** and proves end-to-end delivery and dedupe.
2. Cleanup of existing fake records: 4,549 `canary+…@example.com` rows in `funnel_leads` (last at 2026-10-04T02:45Z), plus their CRM/Slack/email side effects.

## Open follow-ups (not done)

- **Dashboard zero vs "—":** a successful count of zero is a valid value. Show "—" only when a measurement is unavailable or not yet established (for example, the window began before collection started on 2026-10-04), not for every zero.
- **Stale empty-state copy:** "beacon ships with the next govcon-giants-site deploy" and "logging starts with the next govcon-funnels deploy" are no longer true.
- **Deploy panel:** it shows "Set VERCEL_API_TOKEN", but the token is set and the Vercel API returns **403**. Check the token's permissions and team/project scope; the 403 alone doesn't prove the token needs replacing. Also show the real error instead of the config hint.
- **Known residual:** if a Slack post succeeds but recording it in `cc_alert_log` fails, the next run may post it again. This is reported (`status: sent` plus a reason) but not prevented.
- No retention policy yet for `synthetic_checks` (~2,600 rows/day) or `site_events`.
- The Vercel Preview environment has no Supabase or admin credentials. Authenticated previews would need an isolated test database with separate credentials; never production values.
