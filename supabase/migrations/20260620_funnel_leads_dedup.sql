-- Idempotency hardening for funnel_leads (govcon-funnels lead intake).
-- The app-level guard (recentDuplicateExists, 120s window) catches the common
-- double-submit. This partial unique index closes the sub-second race where two
-- POSTs both pass the read-check before either writes. Same-MINUTE (email, source)
-- can only land once for new rows; a legitimate re-registration later (or on
-- another funnel) is unaffected.
--
-- Existing rows are excluded from the index so historical duplicates cannot make
-- this migration fail. New inserts get dedup_enforced=true by default.

ALTER TABLE funnel_leads
  ADD COLUMN IF NOT EXISTS dedup_enforced boolean NOT NULL DEFAULT false;

ALTER TABLE funnel_leads
  ALTER COLUMN dedup_enforced SET DEFAULT true;

CREATE UNIQUE INDEX IF NOT EXISTS funnel_leads_dedup_uniq
  ON funnel_leads (
    lower(email),
    source,
    date_trunc('minute', created_at AT TIME ZONE 'UTC')
  )
  WHERE dedup_enforced;
