# Sitemap redirect hops

**Date:** 2026-09-09
**Branch:** `fix/sitemap-redirect-hops`
**Scope:** SEO hygiene only. Two lines in `src/app/sitemap.ts`.
No routing, no redirects, no page content, no runtime behavior.

## Why

A sweep after the `/ericcoffie` 404 fix (`c02d179`) found that
`src/app/sitemap.ts` listed two URLs that immediately 308 elsewhere. Google
was being told to crawl a URL that bounces, which wastes crawl budget and
splits ranking signals between the listed URL and its destination.

Neither was broken. Both destinations return 200. This is self-inflicted
crawl friction, not an outage.

Verified on production 2026-09-09:

    /mi-free                    308 -> /mi          (200)
    /proposal-writing-services  308 -> /consulting  (200)

## What changed

Two entries, handled differently on purpose:

- `/mi-free` -> **repointed** to `/mi`. `/mi` was NOT already in the sitemap,
  so repointing preserves coverage of that page.
- `/proposal-writing-services` -> **removed**, not repointed. `/consulting`
  was ALREADY in the sitemap (line 187). Repointing would have produced a
  duplicate entry, which is worse than the redirect hop it fixes.

Net: sitemap goes from 427 to 426 URLs. One repointed (no count change),
one removed whose destination was already listed (-1). No page loses
coverage: /mi is now listed directly, and /consulting was already listed.

## Deliberately NOT changed

**The sub-app sitemap was left alone.** `govcon-giants-site/public/sitemap.xml`
lists 170 URLs on `https://govcongiants.com/`, and 159 of them reach their
destination only via a 308 (all 150 numeric `/podcast/N` ids,
`/podcast/featured/N`, and 3 renamed blog slugs). All 170 do return 200.

An earlier read of this suggested it was a latent risk worth suppressing.
That was wrong, and no change was made. On inspection:

- `govcon-giants-site/public/robots.txt` already points crawlers at the
  canonical `https://govcongiants.com/sitemap.xml` (the Next app's generated
  427-URL sitemap), NOT at its own stale file.
- Nothing in `govcon-giants-site/src`, `index.html`, or `vercel.json`
  references that sitemap.

The file is therefore orphaned: unreferenced, unadvertised, unreachable.
Even if that sub-app were deployed, its robots.txt would still send Google
to the correct sitemap. There is nothing to fix.

It was also not deleted. CLAUDE.md marks the podcast live-source question
unresolved, and deleting that file would be taking a position on it.

## Related known issue (NOT fixed, no change made)

`/podcast/150` returns 404. The numeric `/podcast/N` scheme only resolves for
episodes present in the redirect map, so that URL shape is fragile for any
episode outside it. Out of scope here, and not referenced by the live sitemap.

## How to undo

Whole change:

    git revert <commit-sha>

Or by hand, in `src/app/sitemap.ts`:

1. Change the `/mi` entry back to `/mi-free`:

       { url: `${SITE_URL}/mi-free`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

2. Re-add this line immediately after the `/government-contract-help` entry:

       { url: `${SITE_URL}/proposal-writing-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

## Verification performed

See the commit message for measured results.
