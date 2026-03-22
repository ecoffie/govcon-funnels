# 🧪 Test Go High Level Integration

## Quick Start (Choose One Method)

### Method 1: Visual Test Page (Recommended)

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Open test page in browser:**
   ```
   http://localhost:3000/test-form.html
   ```

3. **Click the test button** and see real-time results!

---

### Method 2: Command Line Test (cURL)

**Step 1: Start your dev server**
```bash
npm run dev
```

**Step 2: In a new terminal, run this command:**
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-0100",
    "source": "bootcamp",
    "redirectUrl": "/test"
  }'
```

**Expected Response (without credentials):**
```json
{
  "success": true,
  "crm": {
    "ghl": {
      "ok": false,
      "error": "GHL_API_KEY or GHL_LOCATION_ID not set"
    }
  }
}
```

**Expected Response (with credentials):**
```json
{
  "success": true,
  "crm": {
    "ghl": {
      "ok": true
    }
  }
}
```

---

### Method 3: Test a Real Form

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit any funnel page:**
   - http://localhost:3000/bootcamp
   - http://localhost:3000/free-course
   - http://localhost:3000/surge
   - http://localhost:3000/resources/handouts

3. **Fill out and submit the form**

4. **Check your Go High Level contacts**

---

## ✅ Before Testing: Add Your Credentials

Edit `.env.local` and add:

```env
GHL_API_KEY=your_actual_api_key_here
GHL_LOCATION_ID=your_actual_location_id_here
```

### How to Get Your Credentials:

1. **API Key:**
   - Login to https://app.gohighlevel.com
   - Go to: **Settings** → **Company** → **API Keys**
   - Click **"Create API Key"**
   - Name: "GovCon Funnels"
   - Permissions: ✅ **Contacts** (read & write)
   - Copy the generated key

2. **Location ID:**
   - Go to: **Settings** → **Business Profile**
   - Copy the Location ID shown at the top
   - Or check the URL: `app.gohighlevel.com/location/{LOCATION_ID}/...`

---

## 🔍 What to Check in Go High Level

After submitting a test, verify in Go High Level:

1. **Navigate to Contacts**
2. **Search for:** test@example.com (or your test email)
3. **Verify the contact has:**
   - ✅ First Name: Test
   - ✅ Last Name: User
   - ✅ Email: test@example.com
   - ✅ Phone: 555-0100
   - ✅ Source: bootcamp
   - ✅ Tags: `funnel-bootcamp`, `bootcamp`

---

## 🚨 Troubleshooting

### Error: "GHL_API_KEY or GHL_LOCATION_ID not set"

**Fix:** Add credentials to `.env.local` and restart the dev server

### Error: 401 Unauthorized

**Fix:** Your API key is invalid or expired
- Generate a new API key in Go High Level
- Update `.env.local`
- Restart dev server

### Error: 403 Forbidden

**Fix:** API key missing permissions
- Edit your API key in Go High Level
- Enable "Contacts" read/write permissions
- Save changes

### Error: 422 Unprocessable Entity

**Fix:** Invalid data format or wrong Location ID
- Verify Location ID is correct
- Check that email is valid

### Contact not showing up in Go High Level?

**Check:**
- API credentials are correct in `.env.local`
- Dev server was restarted after adding credentials
- No error messages in server logs
- You're looking in the correct Location

---

## 📊 Testing Different Funnels

Test each funnel to ensure they all work:

| Funnel | URL | Expected Tags |
|--------|-----|---------------|
| Bootcamp | /bootcamp | `funnel-bootcamp`, `bootcamp` |
| Free Course | /free-course | `funnel-free-course`, `free-course` |
| SURGE | /surge | `funnel-surge`, `surge` |
| Handouts | /resources/handouts | `funnel-free-handouts`, `free-handouts` |

---

## 💡 Tips

- Use a test email like `test+bootcamp@example.com` so you can identify test contacts
- Check the browser DevTools Console for any errors
- Check the terminal where `npm run dev` is running for server logs
- In development mode, the API logs lead submissions to the console

---

## ✅ Success Checklist

- [ ] Added GHL_API_KEY to .env.local
- [ ] Added GHL_LOCATION_ID to .env.local
- [ ] Restarted dev server after adding credentials
- [ ] Submitted test form
- [ ] Received success response
- [ ] Found contact in Go High Level
- [ ] Verified tags are applied correctly
- [ ] Tested at least one funnel page

---

🎉 **Once all checkboxes are complete, your integration is working!**
