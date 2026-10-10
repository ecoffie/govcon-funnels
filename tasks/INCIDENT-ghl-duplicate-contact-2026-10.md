# Incident record — GHL duplicate-contact failures at `/api/lead` (2026-10)

No secrets or customer identities in this file; this repo is public. Leads are labelled A–C. Names, emails and GHL contact ids are held privately by the operator.

## Trigger

Command Center alert: *"Lead pipeline destination ghl failing at 18.2% over the last 11 leads."* The alert was correct: two signups did not finish CRM processing.

## Cause

This GHL location rejects creating a contact whose email already exists (`400 "This location does not allow duplicated contacts."`, with the existing id in `meta.contactId`). `/api/lead` only ever created contacts, so a repeat signup failed in GHL and the funnel tag was never applied. Code defect, not credentials, rate limiting or bad data.

Fixed in PR #212 (merge `ec81df5`, deployed 2026-10-08 ~16:50 UTC): on that specific error the route adds the tags to the existing contact through `POST /contacts/:id/tags`. The request body carries only tags, so it cannot change name, phone or existing tags.

## Affected leads

| Lead | When (UTC) | Path | Evidence | Status |
|---|---|---|---|---|
| A | 2026-10-05 13:48 | free-handouts | `lead_pipeline_log` id 3, duplicate-contact error recorded | **Confirmed** failure |
| B | 2026-10-07 16:59 | newsletter | `lead_pipeline_log` id 9, duplicate-contact error recorded | **Confirmed** failure |
| C | 2026-10-05 19:08 | mindy-launch | No `lead_pipeline_log` row; see below | **Suspected duplicate-contact failure; exact error unavailable** |

All three are real people, not synthetic submissions. Each has a `funnel_leads` row, so the registration was saved. It does **not** show that every signup action completed: each contact is still missing the tag the signup should have applied.

**Confirmations:** No confirmation failures were found in the available independent evidence. That is not proof of delivery:

- Historical `email_ok = true` values from the old mindy-launch path are **not** delivery evidence. That path recorded `true` without sending anything; the real send happened on getmindy.ai and its outcome was never reported back.
- For C, the only independent record is Mindy's `email_provider_sends` row for the confirmation. It shows a provider accepted the message, not that it reached the inbox.
- For A and B, the record is the email step's own provider result, which also shows acceptance, not inbox delivery.

### Lead C — why it is suspected, not confirmed

- C was already a GHL contact before this signup (since 2024), and the contact lacks the three tags this signup requested. That is the pattern the duplicate-contact defect produces.
- There is no `lead_pipeline_log` row for the request, so the GHL result was never recorded. Vercel runtime logs (about 24 h retention) had expired before the investigation. The exact error cannot be recovered.
- C is therefore **not** counted as a third confirmed failure, and the alert's 2-of-11 figure stands as measured.
- The missing log row is most likely the unawaited log write being lost after the response was sent. The code path does not skip logging for mindy-launch. Fix in a separate PR: the write now runs through `next/server` `after()`.

## Confirmation handoff fix (issue #215)

Released 2026-10-10: ecoffie/market-assassin#1869 (merge `29fcef09`) first, then #216 (merge `d4a30efa`). The pipeline log now records each mindy-launch confirmation as `confirmed` (getmindy.ai reports a provider accepted it), `failed` (an explicit rejection) or `pending` (outcome unknown). Provider acceptance is not inbox delivery.

- **Unverified: how a Resend quota response is classified.** Rejections with a 4xx status are treated as explicit (`failed`, with the Office365 fallback allowed). The tests prove that for a 429 rate-limit response only. A tested rate-limit response doesn't prove a quota response carries the same status or meaning; no real quota response has been observed.
- **Still open:** issue #215 stays open until a real mindy-launch registration shows its handoff outcome correctly recorded.

## Held (not done, awaiting approval)

- Tag replays for A (`free-handouts`), B (`newsletter`) and C (the three mindy-launch tags), adding only tags not already present.
- Name and phone fill-in for A, whose GHL record holds a placeholder name and no phone.
- No test signups, contact edits or customer messages were made during the investigation.

## Live verification of #212

Read-only check of production records from deploy to 2026-10-10 ~07:30 UTC: 7 real signups, all `ghl_ok = true`. Two were already GHL contacts:

- **Contact created 2023:** the GHL record was updated 105 ms after the signup row, `free-handouts` is now present, and an older tag (`federalhelpcenter`) is still there. The lead typed a phone number and it was not written onto the contact, which is what a tag-only update should produce. Gap: GHL does not expose a tag history, so it cannot be shown that `free-handouts` was absent before this signup.
- **Contact created 2026-09-17 by an earlier free-handouts signup:** it already had the tag, so the call added nothing new. Earlier tags remain.

Before #212, a repeat signup to an existing contact logged `ghl_ok = false`. `ghl_ok = true` on these two means the duplicate-handling path ran and succeeded.

The monitoring alert stays enabled.
