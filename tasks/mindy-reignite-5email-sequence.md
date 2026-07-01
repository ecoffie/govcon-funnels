# Mindy Re-Ignite — 5-Email Fear-of-Loss Sequence

**Audience:** `mindy-profile-incomplete` tag — 4,324 contacts in GHL alumni location (`AMkIivLuREYwsX5GhAAL`)
**Rail:** GHL marketing/bulk (NOT Resend transactional)
**Goal:** Get them to finish their Mindy profile → unlocks **matched opportunities** by their NAICS/profile
**Voice model:** `/bootcamp` (proposal-bootcamp) fear-of-loss — "there's a hidden world of opps you're blind to while you fight over the wrong ones." World 1 (SAM.gov, 20–100 competitors, 2–5% win) vs World 2 (matched/task-order opps, 5–10 competitors, 15–30% win).
**Core mechanism:** Loss aversion — *opportunities are being matched right now and you're not seeing them because your profile is blank.*

> NOTE: Replace `{{first_name}}`, `{{profile_url}}`, and any [BRACKETED STAT] with verified values before send. Stats below are pulled from the live /bootcamp page copy — re-verify any number you keep.

---

## Cadence
| # | Send | Angle |
|---|------|-------|
| 1 | Day 0 | The opps you can't see |
| 2 | Day 2 | What "matched" actually means (World 1 vs World 2) |
| 3 | Day 4 | Social proof + the cost of the blank profile |
| 4 | Day 6 | Direct loss — "these matched while your profile sat empty" |
| 5 | Day 8 | Last call / soft deadline |

---

## Email 1 — Day 0
**Subject:** {{first_name}}, opportunities are matching to you right now (you just can't see them)
**Preview:** Your Mindy profile is blank — so the matches go to someone else.

{{first_name}},

Every day, federal opportunities get matched to contractors based on their profile — NAICS, set-asides, past work, agencies they serve.

Yours is blank.

So when an opportunity that fits you perfectly hits the system, Mindy can't surface it to you. It goes to the contractor who took 4 minutes to finish their profile.

That's the whole game. The matches are happening. You're just not in the room.

**Finish your profile → start seeing your matches:**
→ {{profile_url}}

— Eric

---

## Email 2 — Day 2
**Subject:** There are two worlds of federal contracting. You're stuck in the wrong one.
**Preview:** 20–100 competitors vs 5–10. Which side are you on?

{{first_name}},

Most contractors only ever see **World 1**:
- 20–100+ competitors per opportunity
- 2–5% win rate
- Everyone's fighting over the same SAM.gov postings

There's a **World 2** — matched opportunities tuned to *your* profile:
- 5–10 competitors
- 15–30% win rate
- Most contractors don't even know these exist

Mindy puts you in World 2 — but only once your profile tells it who you are.

Right now it can't. Two minutes fixes that:
→ {{profile_url}}

— Eric

---

## Email 3 — Day 4
**Subject:** The contractors winning aren't smarter. They just finished step one.
**Preview:** A blank profile costs you every match, every day.

{{first_name}},

The difference between the contractors getting matched opportunities and the ones who aren't usually isn't skill, capital, or connections.

It's that one group finished their profile and the other didn't.

A complete profile is what lets Mindy do the work for you — pulling the opportunities that fit *you* instead of making you dig through thousands that don't.

Every day it sits empty is a day of matches you'll never see.

→ {{profile_url}}

— Eric

---

## Email 4 — Day 6
**Subject:** {{first_name}}, here's what matched while your profile sat empty
**Preview:** Opportunities that fit your business — gone to someone else.

{{first_name}},

This is the uncomfortable one.

While your profile's been blank, opportunities that could have matched your business have come and gone. Other contractors saw them. Responded to them. Some won them.

You didn't see any of it — not because you weren't qualified, but because Mindy had nothing to match you against.

That's a fixable problem. It takes about two minutes:
→ {{profile_url}}

The next round of matches is coming. Be in it this time.

— Eric

---

## Email 5 — Day 8
**Subject:** Last one — then I'll stop emailing you about this
**Preview:** Finish your profile or we'll assume you're not contracting anymore.

{{first_name}},

I've sent a few of these because I genuinely don't want you missing matches that are sitting right there.

This is the last one.

If your profile's complete, Mindy works for you — surfacing the opportunities that fit your business so you stop fighting over the ones that don't.

If it stays blank, I'll assume you've stepped back from contracting and leave you be.

Two minutes. Then the matches start showing up:
→ {{profile_url}}

— Eric

---

## TODO before send
- [ ] Replace {{profile_url}} with the real Mindy profile-completion link (deep link if available so it drops them straight into the form)
- [ ] Verify/replace stats in Email 2 against current data (kept from /bootcamp page)
- [ ] Scrub segment: drop invalid emails, DND/unsub, and anyone who has SINCE completed their profile
- [ ] Confirm GHL marketing rail (not Resend) + sender domain/DMARC OK
- [ ] Tag-on-complete so a finisher exits the sequence mid-stream (don't email a completer Email 4/5)
