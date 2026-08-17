-- Command Center tables (govcon-funnels internal observability).
-- site_events: first-party beacon events from the SPA (page views, clicks,
--   form submits, scroll depth, JS errors). No cookies, no PII beyond a
--   random session id.
-- lead_pipeline_log: one row per /api/lead attempt with per-destination
--   results (GHL / Supabase backup / Slack / confirmation email) so we can
--   see exactly where a lead died.
-- synthetic_checks: results from the 15-minute cron probe (canary lead,
--   URL uptime, sitemap/robots validity).
-- alert_log: Slack alerts sent, used to dedupe identical alerts for 4h.

CREATE TABLE IF NOT EXISTS site_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts timestamptz NOT NULL DEFAULT now(),
  session_id text,
  page text,
  event text NOT NULL,
  label text,
  href text,
  meta jsonb DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS site_events_ts_idx ON site_events (ts DESC);
CREATE INDEX IF NOT EXISTS site_events_event_ts_idx ON site_events (event, ts DESC);

CREATE TABLE IF NOT EXISTS lead_pipeline_log (
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
CREATE INDEX IF NOT EXISTS lead_pipeline_log_ts_idx ON lead_pipeline_log (ts DESC);
CREATE INDEX IF NOT EXISTS lead_pipeline_log_source_ts_idx ON lead_pipeline_log (source, ts DESC);

CREATE TABLE IF NOT EXISTS synthetic_checks (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts timestamptz NOT NULL DEFAULT now(),
  check text NOT NULL,   -- canary-lead | url | sitemap | robots
  target text,           -- URL or check-specific target
  ok boolean NOT NULL,
  status integer,
  duration_ms integer,
  detail text
);
CREATE INDEX IF NOT EXISTS synthetic_checks_ts_idx ON synthetic_checks (ts DESC);
CREATE INDEX IF NOT EXISTS synthetic_checks_check_ts_idx ON synthetic_checks (check, ts DESC);

CREATE TABLE IF NOT EXISTS alert_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts timestamptz NOT NULL DEFAULT now(),
  alert_key text NOT NULL,
  message text
);
CREATE INDEX IF NOT EXISTS alert_log_key_ts_idx ON alert_log (alert_key, ts DESC);
