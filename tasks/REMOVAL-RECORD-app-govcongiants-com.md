# Removal record: `app.govcongiants.com` Vercel attachment

**Status:** ☑ Verified safe to remove · ☐ NOT removed
**Verified:** 2026-09-05, ~17:20 UTC / 13:20 EDT

> **Nothing was changed.** This is the pre-removal verification record only. No DNS
> record, Vercel domain attachment, or code reference was modified.

---

## What this is

`app.govcongiants.com` is a **dead Vercel domain attachment** on the `govcon-funnels`
project. It has no DNS, serves no traffic, and is referenced nowhere.

⚠️ **Do not confuse it with `app.govcongiants.ORG`**, which is live, load-bearing, and
must not be touched. The two differ by one TLD character.

| | `app.govcongiants.com` | `app.govcongiants.org` |
|---|---|---|
| DNS | **none** | `216.150.1.65`, `216.150.1.1` |
| HTTP | **`000`** (connection fails) | `308 → govcongiants.com/...` |
| Role | dead attachment | **active legacy entrance** — keep forever |

---

## Pre-removal verification

All six conditions checked immediately before writing this record.

### 1. DNS still does not resolve ✅

```
dig +short A     app.govcongiants.com  -> (empty)
dig +short CNAME app.govcongiants.com  -> (empty)
dig +short       app.govcongiants.com  -> (empty)
```

### 2. No A or CNAME record exists ✅

Confirmed above — neither record type returns a value. The hostname has never been
pointed anywhere, which is why Vercel shows it attached but it cannot be reached.

### 3. Absent from sitemaps, internal links, source, and synthetic deps ✅

| Surface | Occurrences |
|---|---|
| Live `govcongiants.com/sitemap.xml` (427 URLs) | **0** |
| Repo source (`*.ts`, `*.tsx`, `*.mjs`, `*.js`, `*.json`, `*.md`) | **0** |
| `src/lib/synthetic.ts` | **0** |
| `vercel.json` | **0** |
| `next.config.ts` | **0** |

Search excluded `node_modules`, `.next/`, and `.claude/worktrees` (checkouts, not
deployed surface).

### 4. No Vercel traffic evidence available ⚠️ UNVERIFIED

**Recorded as unavailable, not as zero.** Vercel Analytics and request logs were not
accessible from this environment. The DNS evidence makes traffic *impossible* — a
hostname that does not resolve cannot receive a request — but the analytics record
itself was not read. Treat "no traffic" as inferred from DNS, not measured.

### 5. Removal cannot affect `app.govcongiants.org` ✅

They are separate hostnames under **different registered domains**
(`govcongiants.com` vs `govcongiants.org`), attached as distinct entries. Verified
live during this check: `app.govcongiants.org/guides/8a-certification` returns
`308 → https://govcongiants.com/guides/8a-certification`.

The `.org` host's redirect is defined in `vercel.json` scoped to the exact hostname
`app.govcongiants.org`, so removing a `.com` attachment cannot match it.

### 6. Current attachment state ✅

```
govcon-funnels    govcongiants.com, app.govcongiants.com, www.govcongiants.com
market-assassin   mi.govcongiants.com
govcon-shop       shop.govcongiants.com
```

`app.govcongiants.com` sits on `govcon-funnels` alongside the two live hostnames.

---

## Removal procedure (when authorized)

Dashboard only — there is no repo change to make.

1. https://vercel.com/eric-coffies-projects/govcon-funnels/settings/domains
2. Find **`app.govcongiants.com`** — confirm the `.com` TLD before acting
3. **⋯ → Remove**
4. **Do not touch** `govcongiants.com`, `www.govcongiants.com`, or anything under
   `govcongiants.org`

### Post-removal verification

```bash
# the two live hostnames must be unchanged
curl -sS -o /dev/null -w "apex: %{http_code}\n" https://govcongiants.com/
curl -sSI https://www.govcongiants.com/ | grep -iE '^HTTP|^location'

# the .org app host must still redirect — this is the one to watch
curl -sSI https://app.govcongiants.org/guides/8a-certification | grep -iE '^HTTP|^location'
# expect: 308 -> https://govcongiants.com/guides/8a-certification
```

### Rollback

Re-add the domain in the same dashboard screen. Since it resolves nowhere, re-adding
restores the attachment without restoring any behaviour — there is no traffic state to
lose. **This removal is effectively risk-free**, which is why the only real caution is
selecting the correct TLD.

---

## Why it is being removed

It is dead configuration. A domain attached to a project but resolving nowhere is a
trap: it appears in `vercel domains inspect` output as though it were live, which is
exactly the kind of stale signal that made the 2026-09-05 topology audit slower than it
needed to be. Removing it makes the attachment list match reality.
