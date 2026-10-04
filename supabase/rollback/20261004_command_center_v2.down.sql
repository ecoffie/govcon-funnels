-- Rollback for 20261004_command_center_v2.sql. NOT a migration — run by hand only.
--
-- Prefer a CODE rollback first (revert the PR): the tables are inert without the
-- code, so dropping them is rarely needed. Run this only if the tables themselves
-- must go. It deletes all Command Center monitoring data collected since the
-- migration (site_events, lead_pipeline_log, synthetic_checks, cc_alert_log).
--
-- NEVER drop `alert_log` — that is Mindy's production table, not ours.

BEGIN;
DROP TABLE IF EXISTS public.cc_alert_log;
DROP TABLE IF EXISTS public.synthetic_checks;
DROP TABLE IF EXISTS public.lead_pipeline_log;
DROP TABLE IF EXISTS public.site_events;
COMMIT;
