-- Command Center tables, v2 (govcon-funnels internal observability).
--
-- Supersedes 20260817_command_center.sql, which NEVER applied and could not:
--   1. `check text NOT NULL` — CHECK is a reserved word in PostgreSQL, so the
--      statement is a syntax error unless the column name is quoted.
--   2. `CREATE TABLE IF NOT EXISTS alert_log` — this database already has an
--      `alert_log` (Mindy's per-user alert-email log: user_email, alert_date, ...).
--      The CREATE would silently no-op and the alert_key index would then fail.
--      Command Center's dedupe table is therefore `cc_alert_log`.
--   3. It enabled no row-level security. Tables in `public` are reachable through
--      PostgREST with the public anon key, so these must be locked down.
--
-- Access model: server code reads/writes with the service-role key, which bypasses
-- RLS. RLS is enabled with NO policies and anon/authenticated privileges are
-- revoked, so the public anon key can neither read nor write these tables.
--
-- Idempotent: safe to re-run. Runs in one transaction; the shape guard at the end
-- aborts the whole thing if a same-named table already exists with a different
-- shape (CREATE TABLE IF NOT EXISTS would otherwise silently accept it).
--
-- Does NOT restore history: no monitoring results were ever saved before this.
-- Rollback: supabase/rollback/20261004_command_center_v2.down.sql

BEGIN;

CREATE TABLE IF NOT EXISTS public.site_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts timestamptz NOT NULL DEFAULT now(),
  session_id text,
  page text,
  event text NOT NULL,
  label text,
  href text,
  meta jsonb DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS site_events_ts_idx ON public.site_events (ts DESC);
CREATE INDEX IF NOT EXISTS site_events_event_ts_idx ON public.site_events (event, ts DESC);

CREATE TABLE IF NOT EXISTS public.lead_pipeline_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts timestamptz NOT NULL DEFAULT now(),
  email text,          -- masked (j***@x.com) via maskEmail, never raw
  source text,
  duplicate boolean DEFAULT false,
  ghl_ok boolean,
  ghl_error text,
  supabase_ok boolean,
  supabase_error text,
  slack_ok boolean,
  email_ok boolean,
  email_error text,
  duration_ms integer
);
CREATE INDEX IF NOT EXISTS lead_pipeline_log_ts_idx ON public.lead_pipeline_log (ts DESC);
CREATE INDEX IF NOT EXISTS lead_pipeline_log_source_ts_idx ON public.lead_pipeline_log (source, ts DESC);

CREATE TABLE IF NOT EXISTS public.synthetic_checks (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts timestamptz NOT NULL DEFAULT now(),
  "check" text NOT NULL,  -- url | sitemap | robots | canonical-host | legacy-bridge (quoted: reserved word)
  target text,
  ok boolean NOT NULL,
  status integer,
  duration_ms integer,
  detail text
);
CREATE INDEX IF NOT EXISTS synthetic_checks_ts_idx ON public.synthetic_checks (ts DESC);
CREATE INDEX IF NOT EXISTS synthetic_checks_check_ts_idx ON public.synthetic_checks ("check", ts DESC);

CREATE TABLE IF NOT EXISTS public.cc_alert_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts timestamptz NOT NULL DEFAULT now(),
  alert_key text NOT NULL,
  message text
);
CREATE INDEX IF NOT EXISTS cc_alert_log_key_ts_idx ON public.cc_alert_log (alert_key, ts DESC);

-- Lock down: service role only.
ALTER TABLE public.site_events       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_pipeline_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.synthetic_checks  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_alert_log      ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.site_events, public.lead_pipeline_log, public.synthetic_checks, public.cc_alert_log
  FROM anon, authenticated;

-- Shape guard: every column the app writes must exist with the expected type.
DO $$
DECLARE
  expected text[][] := ARRAY[
    ['site_events','session_id','text'], ['site_events','event','text'], ['site_events','meta','jsonb'],
    ['lead_pipeline_log','email','text'], ['lead_pipeline_log','ghl_ok','boolean'], ['lead_pipeline_log','duration_ms','integer'],
    ['synthetic_checks','check','text'], ['synthetic_checks','ok','boolean'], ['synthetic_checks','detail','text'],
    ['cc_alert_log','alert_key','text'], ['cc_alert_log','message','text'], ['cc_alert_log','ts','timestamp with time zone']
  ];
  i int;
BEGIN
  FOR i IN 1 .. array_length(expected, 1) LOOP
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = expected[i][1]
        AND column_name = expected[i][2] AND data_type = expected[i][3]
    ) THEN
      RAISE EXCEPTION 'command_center_v2: public.%.% is missing or not %, refusing to continue',
        expected[i][1], expected[i][2], expected[i][3];
    END IF;
  END LOOP;
END $$;

COMMIT;
