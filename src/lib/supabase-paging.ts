/**
 * Paged reads for Supabase/PostgREST.
 *
 * PostgREST returns at most `db-max-rows` (1,000 on Supabase) for ANY select
 * without an explicit .range() — and it does NOT error when it truncates. A
 * capped read is invisible and wrong in the worst way: a registrant list simply
 * stops growing at 1,000, so the 1,001st signup never gets the webinar link
 * while the signup counter freezes and real people keep registering.
 *
 * `src/lib/supabase-leads.ts` has its own module-private copy of this helper for
 * its shared client. This module exists for the readers that construct their own
 * client (hubzone-registrations, mindy-bootcamp-registrations) so they page
 * through the same proven logic instead of re-deriving it.
 *
 * Enforced by `scripts/audit-unranged-selects.mjs` (CI). Callers of this helper
 * are recognized as bound; see PAGER_HINTS there.
 */

const PAGE_SIZE = 1000;

/** Safety valve: funnel_leads is event-signup scale. Paging far past this means
 *  the filter is wrong — stop rather than loop forever against production. */
const MAX_ROWS = 50_000;

/** Minimal shape we need from a PostgREST query builder: just .range(). */
type RangeableQuery<T> = {
  range: (
    from: number,
    to: number
  ) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>;
};

/**
 * Page through every row matching a query.
 *
 * Pass a BUILDER (not a query) — it is re-invoked once per page, because a
 * PostgREST query builder cannot be re-ranged after it has been awaited.
 *
 * The builder's ordering must be stable or pages can overlap or skip rows; every
 * caller orders by created_at.
 *
 * Returns null on error so callers can distinguish "query failed" from "no rows",
 * which is the distinction that hides silent-empty bugs.
 */
export async function fetchAllLeadRows<T>(
  build: () => RangeableQuery<T>,
  label = 'fetchAllLeadRows'
): Promise<T[] | null> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await build().range(from, from + PAGE_SIZE - 1);
    if (error) {
      console.error(`${label} failed:`, error.message);
      return null;
    }
    const rows = (data ?? []) as T[];
    out.push(...rows);
    if (rows.length < PAGE_SIZE) return out;
    if (out.length >= MAX_ROWS) {
      console.error(`${label}: stopped at ${out.length} rows (unexpected volume)`);
      return out;
    }
  }
}
