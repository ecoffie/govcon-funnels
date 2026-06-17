# HUBZone Webinar — Day-Of Reminder Comms (June 17, 2026)

**Webinar:** From Interested To Procurement Ready
**Date/Time:** Wednesday, June 17, 2026 · 6:00–8:00 PM EST (incl. ½-hr Q&A)
**Hosts:** Eric Coffie + Tim Hagerty (TeamingPro), Chad Eberly (Encore Funding), Todd Rogers (LTR)

## Zoom Details (source of truth)
- **Join link:** https://us06web.zoom.us/j/87112164591?pwd=bakXu7g8fbSUVCjEKpDcIRxPUH5XwH.1
- **Meeting ID:** 871 1216 4591
- **Passcode:** 467983
- **One-tap mobile:** +13052241968,,87112164591#,,,,*467983# US
- **Dial-in (NY):** +19292056099,,87112164591#,,,,*467983# US

## Send schedule (day-of)
| When | Channel | Audience | Draft |
|---|---|---|---|
| NOW | Email | Speakers | #1 below |
| NOW (or ~3:00 PM) | Email | All registrants | #2 below |
| ~5:15–5:30 PM | SMS | All registrants | #3 below |
| 5:55 PM (optional) | SMS | All registrants | #4 "we're live" below |

Send via **GoHighLevel** bulk email + SMS to tags `hubzone-webinar` + `hubzone-webinar-bottom`.

---

## DRAFT #1 — SPEAKER EMAIL (send now)

**To:** Tim Hagerty, Chad Eberly, Todd Rogers (cc Eric)
**Subject:** Tonight 6 PM ET — your host link + run of show (HUBZone roundtable)

Team —

Quick logistics for tonight's roundtable. We go live at **6:00 PM ET**.

**Green room / soundcheck: 5:30 PM ET** — please join 30 min early so we can test audio/video and set the order.

**Join (panelist — same link):**
https://us06web.zoom.us/j/87112164591?pwd=bakXu7g8fbSUVCjEKpDcIRxPUH5XwH.1
Meeting ID: 871 1216 4591 · Passcode: 467983

**Run of show (~2 hrs):**
- 5:30 — Green room, soundcheck, confirm order
- 6:00 — Eric opens + frames the session (5 min)
- 6:05 — Teaming Pillar · Tim Hagerty (TeamingPro)
- 6:30 — Funding Pillar · Chad Eberly (Encore Funding)
- 6:55 — Agency Pillar · Todd Rogers (LTR / USACE perspective)
- 7:20 — Open roundtable / cross-talk
- 7:30 — Live audience Q&A (½ hr)
- 8:00 — Close + next steps

Notes: have your camera on a clean background, mute when not speaking, keep segments tight to ~20–25 min so we protect the Q&A. Bring one concrete takeaway each.

See you at 5:30.
— Eric

---

## DRAFT #2 — ATTENDEE "TONIGHT" EMAIL (send now / by 3 PM)

**Subject:** Tonight at 6 PM ET — your Zoom link is inside 🔗
**Preview text:** From Interested To Procurement Ready — join link + dial-in below.

Hi {{first_name}},

Tonight's the night. **From Interested To Procurement Ready** goes live at **6:00 PM ET** — and here's the join link we promised.

👉 **JOIN THE WEBINAR:**
https://us06web.zoom.us/j/87112164591?pwd=bakXu7g8fbSUVCjEKpDcIRxPUH5XwH.1

**Wednesday, June 17 · 6:00–8:00 PM EST** (incl. ½-hour live Q&A)
Meeting ID: 871 1216 4591 · Passcode: 467983

This is a **live working session** — the part you can't get from a replay is the **Q&A**, where you can put your situation in front of four people who've actually done this:
- **Teaming** — Tim Hagerty (TeamingPro): find + secure partners without the 12–18 month wait
- **Funding** — Chad Eberly (Encore Funding): capital built for federal contractors
- **Agency** — Todd Rogers (LTR): what USACE actually looks for in small-business partners

Bring your toughest question. We'll be there to answer it live.

**Two tips before 6 PM:**
1. Update your Zoom app so you join in one click.
2. Add it to your calendar so you don't lose the link: [+ Add to Calendar]

Can't make the start? Join late — we run the full two hours.

See you tonight,
Eric Coffie & the GovCon Giants team

> Joining by phone? Dial +1 305 224 1968, then enter 871 1216 4591 # and passcode 467983 #.

---

## DRAFT #3 — ATTENDEE SMS (send ~5:15–5:30 PM ET)

> GovCon Giants: Your HUBZone webinar "From Interested to Procurement Ready" starts at 6 PM ET (in ~30 min). Join here: https://us06web.zoom.us/j/87112164591?pwd=bakXu7g8fbSUVCjEKpDcIRxPUH5XwH.1 — Reply STOP to opt out.

*(SMS best practice: keep it one link, one time, under 160 chars where possible. The pwd link auto-fills the passcode so no manual entry.)*

---

## DRAFT #4 — "WE'RE LIVE" SMS (optional, ~5:58 PM ET)

> We're going live now! Join the GovCon Giants HUBZone roundtable: https://us06web.zoom.us/j/87112164591?pwd=bakXu7g8fbSUVCjEKpDcIRxPUH5XwH.1

---

## Notes
- The original confirmation email said "link will be sent before the event" — this is the first time the actual Zoom link goes out. It MUST be in tonight's email + SMS.
- Source-of-truth template for branded HTML: `sendHubzoneWebinarEmail()` in `src/lib/email.ts` (orange/white). If sending branded HTML instead of GHL plain, reuse that header/date block and swap the body to the "tonight" copy above + replace the "link sent before event" line with the live JOIN button.
