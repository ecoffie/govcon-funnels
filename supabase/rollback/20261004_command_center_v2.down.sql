-- Rollback for 20261004_command_center_v2.sql. NOT a migration — run by hand only.
--
-- DESTRUCTIVE once monitoring history exists: it deletes every row in site_events,
-- lead_pipeline_log, synthetic_checks and cc_alert_log. Prefer a CODE rollback first
-- (revert the PR): the tables are inert without the code, so dropping them is
-- rarely needed.
--
-- Safety rails (the whole file is one transaction; any refusal changes nothing):
--   1. Drops a table ONLY if it carries the 'command-center-v2' table comment set
--      by the migration. A same-named table someone else created is never dropped.
--   2. If any of those tables holds rows, it refuses unless you deliberately
--      uncomment the confirmation line below.
--
-- NEVER touches `alert_log` — that is Mindy's production table, not ours.

BEGIN;

-- To drop tables that contain monitoring history, uncomment this line:
-- SET LOCAL command_center.confirm_rollback = 'DELETE MONITORING HISTORY';

DO $$
DECLARE
  t text;
  n bigint;
  ours text[] := ARRAY[]::text[];
  with_rows text := '';
BEGIN
  FOREACH t IN ARRAY ARRAY['cc_alert_log', 'synthetic_checks', 'lead_pipeline_log', 'site_events'] LOOP
    IF to_regclass('public.' || t) IS NULL THEN
      CONTINUE;
    END IF;
    IF coalesce(obj_description(('public.' || t)::regclass, 'pg_class'), '') <> 'command-center-v2' THEN
      RAISE EXCEPTION 'rollback: public.% is not tagged command-center-v2 — not created by this migration, refusing to drop it', t;
    END IF;
    EXECUTE format('SELECT count(*) FROM public.%I', t) INTO n;
    IF n > 0 THEN
      with_rows := with_rows || format(' %s=%s', t, n);
    END IF;
    ours := ours || t;
  END LOOP;

  IF with_rows <> ''
     AND coalesce(current_setting('command_center.confirm_rollback', true), '') <> 'DELETE MONITORING HISTORY' THEN
    RAISE EXCEPTION 'rollback: these tables hold monitoring history (%) — uncomment the confirm_rollback line to delete it', with_rows;
  END IF;

  FOREACH t IN ARRAY ours LOOP
    EXECUTE format('DROP TABLE public.%I', t);
  END LOOP;
END $$;

COMMIT;
