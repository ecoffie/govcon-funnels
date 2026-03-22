# Opt-In Form Testing Guide

## ✅ All Lead Capture Forms - Ready to Test

All forms are connected to **Go High Level CRM** and ready for verification.

---

## 📋 Forms to Test

### 1. **Bootcamp Page**
- **URL:** https://govcongiants.org/bootcamp
- **Source Tag:** `bootcamp`
- **Redirect:** `/bootcamp/upsell`
- **Button Text:** "Get Free Access"

### 2. **Surge Bootcamp**
- **URL:** https://govcongiants.org/surge
- **Source Tag:** `surge`
- **Redirect:** `/surge/upsell`
- **Button Text:** "Get Free Access"

### 3. **Free Course**
- **URL:** https://govcongiants.org/free-course
- **Source Tag:** `free-course`
- **Redirect:** `/free-course/upsell`
- **Button Text:** "Get Free Access"

### 4. **Opportunity Hunter**
- **URL:** https://govcongiants.org/opp
- **Source Tag:** `opp`
- **Redirect:** `/opp/upsell`
- **Button Text:** "Get Free Access"

### 5. **Feb 28 Bootcamp**
- **URL:** https://govcongiants.org/feb-28-bootcamp
- **Source Tag:** `feb28-bootcamp`
- **Redirect:** `/feb-28-bootcamp/upsell`
- **Button Text:** "Get My Bid Forms"

### 6. **Resources Handouts**
- **URL:** https://govcongiants.org/resources/handouts
- **Source Tag:** `handouts`
- **Redirect:** `/resources/handouts/upsell`
- **Button Text:** "Get Free Downloads"

---

## 🧪 Testing Instructions

### Step 1: Prepare Test Data
Use unique email addresses for each form to track which page the lead came from:

```
Name: Test User
Email: test+bootcamp@youremail.com (change for each page)
Phone: (555) 123-4567
```

**Email Format for Each Page:**
- Bootcamp: `test+bootcamp@youremail.com`
- Surge: `test+surge@youremail.com`
- Free Course: `test+freecourse@youremail.com`
- Opp Hunter: `test+opp@youremail.com`
- Feb 28: `test+feb28@youremail.com`
- Handouts: `test+handouts@youremail.com`

### Step 2: Submit Each Form
1. Visit each URL above
2. Fill in the form with test data
3. Click submit
4. Verify you're redirected to the correct page

### Step 3: Verify in Go High Level
1. Log into Go High Level dashboard
2. Go to Contacts
3. Check for the 6 test contacts
4. Verify each contact has the correct:
   - Name
   - Email
   - Phone
   - **Source tag** (bootcamp, surge, free-course, etc.)

---

## ✅ What to Look For

### In the Browser:
- ✅ Form submits without errors
- ✅ "Processing..." button appears briefly
- ✅ Redirects to the correct upsell/thank-you page

### In Go High Level:
- ✅ Contact appears in dashboard
- ✅ Correct name, email, phone
- ✅ **Source tag** matches the page (this is key!)
- ✅ Timestamp shows recent submission

---

## 🔧 Technical Details

**API Endpoint:** `/api/lead`
**CRM:** Go High Level
**Integration Type:** Private Integration (API Key)

**Environment Variables (Configured):**
- `GHL_API_KEY` ✅
- `GHL_LOCATION_ID` ✅

**Form Flow:**
1. User submits form
2. Data saved to localStorage (backup)
3. POST request to `/api/lead`
4. API sends to Go High Level
5. User redirected to next page

---

## 🚨 Troubleshooting

**If a contact doesn't appear in GHL:**
1. Check the browser console for errors (F12)
2. Verify the API endpoint is working: `/api/lead`
3. Check Vercel logs for any API errors
4. Ensure environment variables are set in Vercel

**Common Issues:**
- **Missing source tag:** Check that each LeadForm has correct `source` prop
- **Wrong redirect:** Check that `redirectUrl` prop is correct
- **API timeout:** Check Vercel function logs

---

## 📊 Expected Results

After testing all 6 forms, you should see:

**In Go High Level Contacts:**
- 6 new contacts
- Each with unique email (`test+[page]@...`)
- Each with correct source tag
- All created within the last few minutes

**Tags in GHL:**
- `funnel-bootcamp`, `bootcamp`
- `funnel-surge`, `surge`
- `funnel-free-course`, `free-course`
- `funnel-opp`, `opp`
- `funnel-feb28-bootcamp`, `feb28-bootcamp`
- `funnel-handouts`, `handouts`

---

## ✨ Quick Test Checklist

- [ ] Test Bootcamp form
- [ ] Test Surge form
- [ ] Test Free Course form
- [ ] Test Opportunity Hunter form
- [ ] Test Feb 28 Bootcamp form
- [ ] Test Resources Handouts form
- [ ] Verify all 6 contacts in GHL
- [ ] Verify all source tags are correct

---

**Last Updated:** February 16, 2026
**Status:** ✅ All forms ready for testing
