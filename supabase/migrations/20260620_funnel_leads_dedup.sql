-- Idempotency hardening for funnel_leads (govcon-funnels lead intake).
-- The app-level guard (recentDuplicateExists, 120s window) catches the common
-- double-submit. This partial unique index closes the sub-second race where two
-- POSTs both pass the read-check before either writes. Same-MINUTE (email, source)
-- can only land once; a legitimate re-registration later (or on another funnel)
-- is unaffected.
--
-- Safe to run with historical duplicates: existing rows are marked outside the
-- partial index, then future inserts are enforced by default.
--
-- Implementation note: generated columns require immutable expressions, and
-- to_char(timestamptz) is not accepted in this context. Bucket created_at to a
-- UTC timestamp expression in the index instead.

ALTER TABLE funnel_leads
  ADD COLUMN IF NOT EXISTS dedup_enforced boolean NOT NULL DEFAULT false;

ALTER TABLE funnel_leads
  ALTER COLUMN dedup_enforced SET DEFAULT true;

ALTER TABLE funnel_leads
  DROP COLUMN IF EXISTS dedup_minute;

DROP INDEX IF EXISTS funnel_leads_dedup_uniq;

CREATE UNIQUE INDEX IF NOT EXISTS funnel_leads_dedup_uniq
  ON funnel_leads (
    lower(email),
    coalesce(source, ''),
    date_trunc('minute', created_at AT TIME ZONE 'UTC')
  )
  WHERE dedup_enforced;
