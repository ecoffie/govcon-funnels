# HUBZone Webinar — Day-Of Reminder Comms (June 17, 2026)

**Webinar:** From Interested To Procurement Ready
**Date/Time:** Wednesday, June 17, 2026 · 6:00–8:00 PM EST (incl. ½-hr Q&A)
**Hosts:** Eric Coffie + Tim Hagerty (TeamingPro), Chad Eberly (Encore Funding), Todd Rogers (LTR)

## Zoom Details (source of truth)
- **Join link:** `<HUBZONE_ZOOM_URL>`
- **Meeting ID:** `<HUBZONE_ZOOM_MEETING_ID>`
- **Passcode:** `<HUBZONE_ZOOM_PASSCODE>`
- **One-tap mobile:** `<HUBZONE_ZOOM_ONE_TAP>`
- **Dial-in (NY):** `<HUBZONE_ZOOM_DIAL_IN>`

## Send schedule (day-of)
| When | Channel | Audience | How |
|---|---|---|---|
| NOW | Email | Speakers | App route `&speakers=` param |
| NOW (or ~3:00 PM) | Email | All registrants | App route `?send=1` |
| ~5:15–5:30 PM | SMS | All registrants | GoHighLevel (draft #3) |
| 5:55 PM (optional) | SMS | All registrants | GoHighLevel (draft #4) |

### Email = sent from the app (no GHL needed)
Branded emails fire from our own Nodemailer/Gmail transport via a password-gated route.
Pulls the live registrant list straight from GoHighLevel (`getHubzoneRegistrations`).

**Route:** `GET /api/admin/hubzone-reminder`  ·  auth: `?password=<ADMIN_PASSWORD>`

| Step | URL |
|---|---|
| 1. Dry run (count only, sends nothing) | `?dry=1` |
| 2. Test to yourself | `?test=evankoffdev@gmail.com` |
| 3. Real attendee blast | `?send=1` |
| 4. Blast + speaker emails | `?send=1&speakers=tim@…,chad@…,todd@…` |

Functions: `sendHubzoneReminderEmail()` (attendee) + `sendHubzoneSpeakerEmail()` in `src/lib/email.ts`.
Gmail-throttled ~120ms/send. Todd Rogers bio corrected: industry technical expert, IDVs & buyer side.

**SMS still goes through GoHighLevel** (we don't have an SMS transport) — drafts #3/#4 below.

---

## DRAFT #1 — SPEAKER EMAIL (send now)

**To:** Tim Hagerty, Chad Eberly, Todd Rogers (cc Eric)
**Subject:** Tonight 6 PM ET — your host link + run of show (HUBZone roundtable)

Team —

Quick logistics for tonight's roundtable. We go live at **6:00 PM ET**.

**Green room / soundcheck: 5:30 PM ET** — please join 30 min early so we can test audio/video and set the order.

**Join (panelist — same link):**
`<HUBZONE_ZOOM_URL>`
Meeting ID: `<HUBZONE_ZOOM_MEETING_ID>` · Passcode: `<HUBZONE_ZOOM_PASSCODE>`

**Run of show (~2 hrs):**
- 5:30 — Green room, soundcheck, confirm order
- 6:00 — Eric opens + frames the session (5 min)
- 6:05 — Intros, 5 min each: Todd Rogers (Agency) → Chad Eberly (Funding) → Tim Hagerty (Teaming). Todd hands the layup to Chad.
- 6:20 — Moderated round-robin (Eric drives 3–4 themes; each panelist weighs in)
- 7:15 — Rapid-fire / cross-talk
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
`<HUBZONE_ZOOM_URL>`

**Wednesday, June 17 · 6:00–8:00 PM EST** (incl. ½-hour live Q&A)
Meeting ID: `<HUBZONE_ZOOM_MEETING_ID>` · Passcode: `<HUBZONE_ZOOM_PASSCODE>`

This is a **live working session** — the part you can't get from a replay is the **Q&A**, where you can put your situation in front of four people who've actually done this:
- **Agency** — Todd Rogers: industry technical expert on IDVs & the government buyer side
- **Funding** — Chad Eberly (Encore Funding): capital built for federal contractors
- **Teaming** — Tim Hagerty (TeamingPro): find + secure partners without the 12–18 month wait

Bring your toughest question. We'll be there to answer it live.

**Two tips before 6 PM:**
1. Update your Zoom app so you join in one click.
2. Add it to your calendar so you don't lose the link: [+ Add to Calendar]

Can't make the start? Join late — we run the full two hours.

See you tonight,
Eric Coffie & the GovCon Giants team

> Joining by phone? Dial `<HUBZONE_ZOOM_DIAL_IN>`, then enter `<HUBZONE_ZOOM_MEETING_ID>` # and passcode `<HUBZONE_ZOOM_PASSCODE>` #.

---

## DRAFT #3 — ATTENDEE SMS (send ~5:15–5:30 PM ET)

> GovCon Giants: Your HUBZone webinar "From Interested to Procurement Ready" starts at 6 PM ET (in ~30 min). Join here: `<HUBZONE_ZOOM_URL>` — Reply STOP to opt out.

*(SMS best practice: keep it one link, one time, under 160 chars where possible. The pwd link auto-fills the passcode so no manual entry.)*

---

## DRAFT #4 — "WE'RE LIVE" SMS (optional, ~5:58 PM ET)

> We're going live now! Join the GovCon Giants HUBZone roundtable: `<HUBZONE_ZOOM_URL>`

---

## Notes
- The original confirmation email said "link will be sent before the event" — this is the first time the actual Zoom link goes out. It MUST be in tonight's email + SMS.
- Source-of-truth template for branded HTML: `sendHubzoneWebinarEmail()` in `src/lib/email.ts` (orange/white). If sending branded HTML instead of GHL plain, reuse that header/date block and swap the body to the "tonight" copy above + replace the "link sent before event" line with the live JOIN button.
