# Lead & Email Signup System

**Last Updated:** March 22, 2026

---

## Overview

All email signups and lead captures flow through `/api/lead` and save to **3 destinations** in parallel:

| Destination | Purpose | Required Env Var |
|-------------|---------|------------------|
| **GoHighLevel** | CRM contact storage | `GHL_API_KEY` + `GHL_LOCATION_ID` |
| **Slack** | Real-time notifications | `SLACK_LEAD_WEBHOOK_URL` |
| **Webhook** | Zapier/Make/n8n (optional) | `CRM_WEBHOOK_URL` |

---

## Where Leads Are Stored

### Primary: GoHighLevel CRM

**Access:** [app.gohighlevel.com](https://app.gohighlevel.com) → Contacts

Each contact includes:
- First name, last name
- Email address
- Phone number (if provided)
- Source (e.g., `bootcamp`, `free-course`, `opp-hunter`)
- Tags (e.g., `funnel-bootcamp`, `video-signup`)
- Timestamp

**Location ID:** `AMkIivLuREYwsX5GhAAL`

### Secondary: Slack Notifications

Real-time alerts in your Slack channel with:
- Name, email, phone
- Source/funnel they signed up from
- Timestamp

### Optional: Webhook

If `CRM_WEBHOOK_URL` is set, leads are also sent to Zapier, Make, or any webhook endpoint.

---

## Environment Variables

Add these to `.env.local` and Vercel:

```bash
# GoHighLevel (required)
GHL_API_KEY=pit_xxxxxxxxxxxxxxxx
GHL_LOCATION_ID=AMkIivLuREYwsX5GhAAL

# Slack notifications (recommended)
SLACK_LEAD_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx

# Optional webhook (Zapier, Make, etc.)
CRM_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxx/xxx
```

---

## Lead Sources (Tags)

| Source Tag | Funnel/Page |
|------------|-------------|
| `bootcamp` | `/bootcamp` registration |
| `surge` | `/surge` bootcamp |
| `free-course` | `/free-course` signup |
| `opp-hunter` | `/opp` Opportunity Hunter |
| `proposal-bootcamp` | `/proposal-bootcamp` funnel |
| `upskilling` | `/upskilling` BD program |
| `video-{slug}` | Video page email captures |
| `guide-{slug}` | Guide page email captures |

---

## API Endpoints

### `/api/lead` (POST)

Main lead capture endpoint. Used by all forms.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "source": "bootcamp",
  "redirectUrl": "/bootcamp/thank-you",
  "tags": ["vip", "webinar-attendee"]
}
```

**Response:**
```json
{
  "success": true,
  "ghl": { "ok": true, "contactId": "abc123" },
  "slack": { "ok": true },
  "webhook": { "ok": true }
}
```

### `/api/upskilling-signup` (POST)

Upskilling program signups. Same format, different default tags.

---

## Code Files

| File | Purpose |
|------|---------|
| `/src/lib/crm.ts` | CRM integration logic (GHL, Slack, webhook) |
| `/src/app/api/lead/route.ts` | Main lead API endpoint |
| `/src/app/api/upskilling-signup/route.ts` | Upskilling signup endpoint |
| `/src/components/LeadForm.tsx` | Reusable lead capture form |
| `/src/components/GuideEmailCapture.tsx` | Mid-article email capture |

---

## Testing Leads

1. **Submit test form** on any funnel page
2. **Check GHL:** Contacts → search for test email
3. **Check Slack:** Should see notification within seconds
4. **Check Vercel logs:** If issues, see `docs/setup/CHECK_VERCEL_LOGS.md`

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Lead not in GHL | Missing/invalid API key | Check `GHL_API_KEY` in Vercel env vars |
| No Slack notification | Webhook URL wrong | Verify `SLACK_LEAD_WEBHOOK_URL` |
| "GHL_API_KEY not set" error | Env var missing | Add to both `.env.local` and Vercel |
| Duplicate contacts | Same email submitted twice | GHL handles deduplication automatically |

---

## Adding New Lead Sources

1. Add form with `source` field set to new tag (e.g., `source="new-webinar"`)
2. Form submits to `/api/lead`
3. GHL contact created with tag `funnel-new-webinar`
4. No code changes needed - tags are dynamic
