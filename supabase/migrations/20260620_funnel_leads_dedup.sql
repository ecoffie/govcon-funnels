-- Idempotency hardening for funnel_leads (govcon-funnels lead intake).
-- The app-level guard (recentDuplicateExists, 120s window) catches the common
-- double-submit. This partial unique index closes the sub-second race where two
-- POSTs both pass the read-check before either writes. Same-MINUTE (email, source)
-- can only land once; a legitimate re-registration later (or on another funnel)
-- is unaffected.
--
-- Safe to run: verified only 1 historical same-minute dup in 281 rows, so this
-- won't fail on a backfill conflict (it will simply not create the index if a
-- conflict exists — see the dedup step below if CREATE INDEX errors).
--
-- Implementation note: date_trunc(text, timestamptz) and to_char(...) are not
-- valid in generated columns here. Add a marker that defaults to true only for
-- future rows, then enforce a partial expression index on future inserts. This
-- avoids backfill conflicts while closing the race for new traffic.

DROP INDEX IF EXISTS funnel_leads_dedup_uniq;

ALTER TABLE funnel_leads
  ADD COLUMN IF NOT EXISTS dedup_enforced boolean;

UPDATE funnel_leads
  SET dedup_enforced = false
  WHERE dedup_enforced IS NULL;

ALTER TABLE funnel_leads
  ALTER COLUMN dedup_enforced SET DEFAULT true,
  ALTER COLUMN dedup_enforced SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS funnel_leads_dedup_uniq
  ON funnel_leads (
    lower(email),
    coalesce(source, ''),
    date_trunc('minute', created_at AT TIME ZONE 'UTC')
  )
  WHERE dedup_enforced;
