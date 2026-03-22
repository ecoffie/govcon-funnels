# Slack Integration Setup Guide

## 🎯 Overview

Get real-time Slack notifications whenever someone fills out a lead form on your site. Each notification includes:
- 👤 Name
- 📧 Email
- 📋 Which form they filled out (source)
- 📞 Phone number
- ⏰ Timestamp

---

## 📋 Step 1: Create Slack Webhook

### Option A: Using Slack's Interface

1. **Go to Slack API:** https://api.slack.com/apps
2. **Click "Create New App"**
3. **Select "From scratch"**
4. **Name your app:** "GovCon Lead Notifications" (or any name)
5. **Choose your workspace**

### After Creating the App:

6. **Click "Incoming Webhooks"** (in the left sidebar)
7. **Toggle "Activate Incoming Webhooks"** to ON
8. **Click "Add New Webhook to Workspace"**
9. **Select the channel** where you want notifications (e.g., #leads, #sales)
10. **Click "Allow"**
11. **Copy the Webhook URL** (looks like: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`)

---

## 🔧 Step 2: Add to Vercel

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Select your project:** `govcon-funnels`
3. **Go to Settings** → **Environment Variables**
4. **Click "Add New"**

### Add this variable:

```
Name: SLACK_LEAD_WEBHOOK_URL
Value: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
Environment: Production, Preview, Development (select all)
```

5. **Click "Save"**

---

## 🚀 Step 3: Redeploy

After adding the environment variable, you need to trigger a new deployment:

**Option 1: Automatic (Recommended)**
- The next git push will automatically redeploy with the new variable

**Option 2: Manual**
1. Go to your project in Vercel
2. Click on the latest deployment
3. Click "Redeploy" → "Use existing Build Cache"

---

## ✅ Step 4: Test It

Once redeployed, submit a test lead on any form:

**Test on:** https://govcongiants.org/bootcamp

Fill out the form with:
- Name: Slack Test User
- Email: test-slack@yourdomain.com
- Phone: (555) 999-9999

**Check Slack:** You should see a notification in your chosen channel within seconds!

---

## 🎨 What the Notification Looks Like

```
🎉 New Lead Magnet Signup

Name:              Email:
Slack Test User    test-slack@yourdomain.com

Signed up for:     Phone:
Bootcamp          (555) 999-9999

Source: bootcamp · 2026-02-16T20:30:00.000Z
```

---

## 🔍 Troubleshooting

### "No notification in Slack"

**Check these:**
1. ✅ Environment variable is set in Vercel
2. ✅ New deployment happened after adding the variable
3. ✅ Webhook URL is correct (starts with `https://hooks.slack.com/`)
4. ✅ Slack channel exists and bot has permission
5. ✅ Check Vercel Function Logs for any errors

### "Invalid webhook URL"

- Make sure you copied the full URL from Slack
- URL should look like: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXX`
- No trailing slashes or extra characters

### "Webhook revoked"

- Slack webhooks can be revoked if regenerated
- Create a new webhook and update Vercel environment variable

---

## 📊 Testing All Forms

Once set up, test each form to verify Slack notifications work:

- [ ] Bootcamp: https://govcongiants.org/bootcamp
- [ ] Surge: https://govcongiants.org/surge
- [ ] Free Course: https://govcongiants.org/free-course
- [ ] Opportunity Hunter: https://govcongiants.org/opp
- [ ] Feb 28 Bootcamp: https://govcongiants.org/feb-28-bootcamp
- [ ] Resources: https://govcongiants.org/resources/handouts

You should get a Slack notification for each one!

---

## 🎯 Current Status

**Code:** ✅ Already implemented
**Webhook URL:** ✅ Configured
**Environment Variable:** ✅ Added to Vercel (Feb 16, 2026)
**Testing:** 🚀 Deploying now - Ready to test!

---

## 📝 Quick Reference

**Environment Variable Name:**
```
SLACK_LEAD_WEBHOOK_URL
```

**Where to get webhook:**
```
https://api.slack.com/apps → Your App → Incoming Webhooks
```

**Where to add in Vercel:**
```
Vercel Dashboard → Project → Settings → Environment Variables
```

---

## 💡 Pro Tips

1. **Use a dedicated #leads channel** for better organization
2. **Set up channel notifications** so you don't miss leads
3. **Test with unique emails** so you can track which form submitted
4. **Monitor during launch** to ensure everything works

---

**Ready to set up?** Follow Step 1 to create your Slack webhook! 🚀
