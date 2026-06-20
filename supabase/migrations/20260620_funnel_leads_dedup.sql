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
-- Implementation note: date_trunc(text, timestamptz) is STABLE, not IMMUTABLE,
-- so it can't sit in a generated column / index expression directly. We bucket
-- to a char(16) minute string via to_char(... AT TIME ZONE 'UTC'), which IS
-- immutable, and make the generated column on THAT.

ALTER TABLE funnel_leads
  ADD COLUMN IF NOT EXISTS dedup_minute text
  GENERATED ALWAYS AS (to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI')) STORED;

CREATE UNIQUE INDEX IF NOT EXISTS funnel_leads_dedup_uniq
  ON funnel_leads (lower(email), source, dedup_minute);
