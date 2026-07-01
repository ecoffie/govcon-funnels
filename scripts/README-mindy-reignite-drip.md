# Mindy Re-Ignite Drip — Runbook

Code-driven 5-email fear-of-loss sequence to re-activate the **4,323** contacts tagged
`mindy-profile-incomplete` (alumni GHL location `AMkIivLuREYwsX5GhAAL`) so they finish
their Mindy profile and start getting **matched opportunities**.

**Why code, not a GHL Workflow:** GHL's API can't create Workflows (UI-only). This runner
*is* the automation — a tag-based state machine, idempotent and resumable.

## Files
- `mindy-reignite-emails.mjs` — the 5 email templates (subjects + branded HTML).
- `mindy-reignite-drip.mjs` — the runner (seed / send / test / dry).
- `../tasks/mindy-reignite-5email-sequence.md` — plain-text copy of all 5 emails.

## How state works (GHL tags)
```
mindy-profile-incomplete  (audience; auto-removed by Mindy when profile completed)
   │  --seed→ send email 1, tag reignite-d0
   ▼
reignite-d0 → reignite-d2 → reignite-d4 → reignite-d6 → reignite-d8 → reignite-done
```
Each `--send` run advances every enrolled contact **one stage**. A contact who completed
their profile (lost the `mindy-profile-incomplete` tag) is moved to `reignite-exited` and
gets no more emails — that's the auto-exit.

## ⚠️ Spacing is by RUN CADENCE, not timestamps
The runner does NOT read when a tag was applied (GHL search doesn't expose it cheaply).
**One `--send` run = one stage forward per contact.** To get the Day 0/2/4/6/8 spacing:
**run `--send` once every 2 days.** Run daily → 1-day spacing. Don't run `--send` twice
in one day or you'll skip a stage's delay.

## Required env (alumni location)
```
GHL_API_KEY=pit-...            # PIT scoped to AMkIivLuREYwsX5GhAAL with Contacts scope
GHL_LOCATION_ID=AMkIivLuREYwsX5GhAAL   # default if unset
MINDY_PROFILE_URL=https://...  # REAL profile-completion deep link (REQUIRED — CTA target)
DRIP_FROM_NAME=Eric Coffie     # optional sender name
```
NOTE: `.env.local`'s current `GHL_API_KEY` (`pit-a2654dff…`) is STALE (403). Pass the
rotated token inline or update `.env.local` before a real send.

## Run order (do these in sequence)
```bash
# 0. Dry plan — see audience size + scrub, send nothing
GHL_API_KEY=pit-... MINDY_PROFILE_URL=https://... node scripts/mindy-reignite-drip.mjs --dry --seed

# 1. Smoke test — send all 5 to yourself (must exist as a GHL contact in the location)
GHL_API_KEY=pit-... MINDY_PROFILE_URL=https://... node scripts/mindy-reignite-drip.mjs --test=you@yourdomain.com

# 2. Soft launch — enroll a small batch into stage 1 (sends email 1 + tags reignite-d0)
GHL_API_KEY=pit-... MINDY_PROFILE_URL=https://... node scripts/mindy-reignite-drip.mjs --seed --limit=50

# 3. Full enrollment — once batch looks good, enroll the rest into stage 1
GHL_API_KEY=pit-... MINDY_PROFILE_URL=https://... node scripts/mindy-reignite-drip.mjs --seed

# 4. Advance — run every 2 days to push everyone to their next stage
GHL_API_KEY=pit-... MINDY_PROFILE_URL=https://... node scripts/mindy-reignite-drip.mjs --send
```

## Before a real send — checklist
- [ ] `MINDY_PROFILE_URL` is the real completion link (ideally a deep link into the form).
- [ ] Working (rotated) GHL token — not the stale `.env.local` one.
- [ ] Smoke-tested (`--test=`) and the email renders + CTA works in an inbox.
- [ ] Soft-launched `--seed --limit=50`, watched for bounces/spam complaints, THEN full seed.
- [ ] Verify stats in email 2 (World 1 vs World 2) still match current data.

## Gotchas learned
- **Cloudflare error 1010** (not a GHL error) bans a request *signature*. Python `urllib`
  got banned during debugging; **curl and Node fetch are fine.** Use Node for any probing.
- GHL `/contacts/search` paginates with the `page` param (verified: page1/page2 zero overlap,
  total 4323). `pageLimit` max 100.
- GHL sends are **contact-scoped** (`/conversations/messages`) — you can only email a contact
  that exists in the location, by `contactId`.
- This runs on the GHL **marketing rail** (not Resend transactional), per the email-rails rule.
