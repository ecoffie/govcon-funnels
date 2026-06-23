-- Idempotency hardening for funnel_leads (govcon-funnels lead intake).
-- The app-level guard (recentDuplicateExists, 120s window) catches the common
-- double-submit. This partial unique index closes the sub-second race where two
-- POSTs both pass the read-check before either writes. Same-MINUTE (email, source)
-- can only land once; a legitimate re-registration later (or on another funnel)
-- is unaffected.
--
-- Historical rows may contain same-minute duplicates, so the guard is opt-in:
-- existing rows are stamped dedup_enforced=false, then future inserts default
-- to true and participate in the unique index.

ALTER TABLE funnel_leads
  ADD COLUMN IF NOT EXISTS dedup_enforced boolean NOT NULL DEFAULT false;

ALTER TABLE funnel_leads
  ALTER COLUMN dedup_enforced SET DEFAULT true;

CREATE UNIQUE INDEX IF NOT EXISTS funnel_leads_dedup_uniq
  ON funnel_leads (
    lower(email),
    coalesce(source, ''),
    date_trunc('minute', created_at AT TIME ZONE 'UTC')
  )
  WHERE dedup_enforced;
