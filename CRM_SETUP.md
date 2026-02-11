# Go High Level CRM Setup Guide

## ✅ Good News!
Your lead forms are already fully integrated with Go High Level! You just need to add your API credentials.

---

## 📋 All Connected Lead Forms

All of these forms are already sending leads to Go High Level:

| Page | Form Source | Redirect After Submit |
|------|-------------|----------------------|
| `/free-course` | `free-course` | `/free-course/upsell` |
| `/bootcamp` | `bootcamp` | `/bootcamp/upsell` |
| `/surge` | `surge` | `/surge/upsell` |
| `/resources/handouts` | `free-handouts` | `/resources/handouts/upsell` |

---

## 🔧 Setup Instructions

### Step 1: Get Your Go High Level API Credentials

1. **Login to Go High Level**
   - Go to [app.gohighlevel.com](https://app.gohighlevel.com)

2. **Get Your API Key**
   - Navigate to: **Settings** → **Company** → **API Keys**
   - Click **"Create API Key"**
   - Name it: `GovCon Funnels Production`
   - Permissions needed: ✅ **Contacts** (Read & Write)
   - Copy the generated API key

3. **Get Your Location ID**
   - Navigate to: **Settings** → **Business Profile**
   - Your Location ID is shown at the top
   - Or check the URL - it's in: `app.gohighlevel.com/location/{LOCATION_ID}/...`
   - Copy this ID

### Step 2: Add Credentials to Your Project

1. **Open the `.env.local` file** (already created in your project root)

2. **Fill in your credentials:**
   ```env
   GHL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   GHL_LOCATION_ID=3jK8sL9mN2pQ4rT6vX8zA1bC
   ```

3. **Save the file**

### Step 3: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Restart it
npm run dev
```

---

## 🎯 What Happens When Someone Submits a Form

1. **Lead Form Submitted** → User fills out name, email, phone
2. **Stored Locally** → Saved to localStorage as backup
3. **Sent to Go High Level** → Creates/updates contact via API
4. **Tagged Automatically** → Contact gets tagged with source (e.g., `funnel-bootcamp`)
5. **User Redirected** → Sent to upsell/thank-you page

---

## 📊 Data Sent to Go High Level

For each lead, the following data is sent:

```json
{
  "locationId": "your_location_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "source": "bootcamp",
  "tags": ["funnel-bootcamp", "bootcamp"]
}
```

---

## 🏷️ Tag System

Each funnel automatically tags contacts:

| Funnel Source | Tags Applied |
|---------------|--------------|
| Free Course | `funnel-free-course`, `free-course` |
| Bootcamp | `funnel-bootcamp`, `bootcamp` |
| Surge | `funnel-surge`, `surge` |
| Free Handouts | `funnel-free-handouts`, `free-handouts` |

You can use these tags in Go High Level to:
- Create automated workflows
- Segment your audience
- Track conversion sources

---

## 🔍 Testing Your Integration

### Test Form Submission:

1. **Run your dev server:**
   ```bash
   npm run dev
   ```

2. **Visit a funnel page:**
   ```
   http://localhost:3000/bootcamp
   ```

3. **Submit the form with test data**

4. **Check Go High Level:**
   - Navigate to **Contacts**
   - Search for the email you entered
   - Verify the contact was created
   - Check that tags were applied

5. **Check your terminal:**
   - In development mode, you'll see console logs like:
   ```
   New lead: {
     name: 'Test User',
     email: 'test@example.com',
     phone: '555-0100',
     source: 'bootcamp',
     timestamp: '2026-02-11T...',
     crmResults: { ghl: { ok: true } }
   }
   ```

---

## ⚙️ Optional: Add Webhook Integration

If you want to also send leads to Zapier, Make, or another service:

1. **Get your webhook URL** from your automation tool

2. **Add to `.env.local`:**
   ```env
   CRM_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/12345/abcde/
   ```

3. **Restart your server**

Now leads will be sent to BOTH Go High Level AND your webhook!

---

## 🚨 Troubleshooting

### Form submits but no contact in Go High Level

**Check:**
1. API credentials are correct in `.env.local`
2. API key has "Contacts" permissions enabled
3. Location ID matches your actual location
4. Check server logs for error messages

### API Error: 401 Unauthorized

**Fix:** Your API key is invalid or expired
- Generate a new API key in Go High Level
- Update `.env.local`
- Restart dev server

### API Error: 403 Forbidden

**Fix:** API key doesn't have required permissions
- Go to Settings → API Keys
- Edit your key
- Enable "Contacts" read/write permissions

### API Error: 422 Unprocessable Entity

**Fix:** Data format issue (rare - already handled in code)
- Check that email is valid
- Check that location ID is correct

---

## 📝 Code Structure

**Key Files:**

- `/src/components/LeadForm.tsx` - The form component used on all pages
- `/src/app/api/lead/route.ts` - API endpoint that receives form submissions
- `/src/lib/crm.ts` - Go High Level integration logic

**Integration Flow:**

```
User fills form
    ↓
LeadForm.tsx submits to /api/lead
    ↓
/api/lead/route.ts calls sendLeadToCrm()
    ↓
crm.ts sends POST to GoHighLevel API
    ↓
Contact created/updated in GHL
    ↓
User redirected to next page
```

---

## 🎉 You're All Set!

Once you add your API credentials, all your lead magnets will automatically sync to Go High Level.

**Need Help?**
- [Go High Level API Docs](https://highlevel.stoplight.io/docs/integrations/)
- [GHL API v1 Contacts](https://highlevel.stoplight.io/docs/integrations/docs/contacts/create-contact.md)
