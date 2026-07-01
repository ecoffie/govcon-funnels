# Mindy Re-Ignite Drip — Launch State

**Script:** `scripts/mindy-reignite-drip.mjs` (5-email drip over GHL marketing rail)
**Audience:** `mindy-profile-incomplete` tag in alumni location `AMkIivLuREYwsX5GhAAL` ("Govcon EDU (Mindy)") — **4,323 contacts**
**Profile CTA:** https://getmindy.ai/app
**Token:** in `.env.local` as `GHL_API_KEY` (PIT "Cursor Mindy Reactivation", has `conversations/message.write`)

---

## Status: SOFT LAUNCH (measuring)

### 2026-06-30 ~1:51 PM — smoke test
- Sent all 5 to evankoffdev@gmail.com → delivered but landed in SPAM, from "Govcon EDU"
- Diagnosed: NOT a domain-auth bug. `mail.govconedu.com` is properly authed (SPF include:mailgun.org, MX mailgun, tracking CNAME).
- Real cause: **sender reputation** (account 7d metrics: 86,481 sent / 100% delivered / **15% open** / **0% click**) + the 5-in-5-sec self-send is worst-case for spam filters.

### 2026-06-30 ~2:00 PM — soft launch `--seed --limit=50`
- **43 enrolled** (sent email 1 [d0] + tagged `reignite-d0`)
- **7 failed (expected, GHL suppression working):** 2 unsubscribed, 5 invalid emails (typos like yahoo.con). These are skipped, not tagged.

---

## NEXT STEPS

### 1. Measure this cohort (~4h after seed, i.e. evening 2026-06-30)
- GHL → Email Services → **Email Analytics**, filter to today
- Decision gate:
  - Open rate clearly > 15% baseline + complaints ~0 → scale up
  - Still low / spam complaints → fix engagement first (from-name "Govcon EDU" → "Eric Coffie", subject lines) before any blast

### 2. Advance the 43 to email 2 — run `--send` on **2026-07-02** (NOT sooner; 2-day spacing protects deliverability)
```
node scripts/mindy-reignite-drip.mjs --send
```

### 3. Scale enrollment (only after step-1 metrics look healthy)
- Warm-up ramp recommended: `--seed --limit=200` → `--limit=500` → full `--seed`
- Each `--seed` only enrolls NEW contacts (those with no reignite-* tag), so it's safe to re-run.

---

## Cadence rules
- `--seed` = enroll new contacts into stage 1 (email 1)
- `--send` = advance already-enrolled contacts one stage. Run **every 2 days**.
- Auto-exit: anyone who completes their profile loses `mindy-profile-incomplete` → dropped from future stages automatically.

See memory: `reference_ghl_mindy_reignite_token_setup.md`
