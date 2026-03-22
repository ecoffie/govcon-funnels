# Upload HTML to Framer - Simple Guide

## 🎯 Your Setup Strategy

**Homepage (Marketing):**
- Host on Framer as static HTML
- URL: `yourdomain.com` or `yoursite.framer.website`

**Funnels (with Go High Level forms):**
- Stay on Next.js / Vercel
- URLs: `yourdomain.com/bootcamp`, `/free-course`, `/surge`, etc.

**User Journey:**
1. User visits homepage on Framer
2. Clicks "Get Started" button
3. Goes to Next.js funnel page
4. Fills form → Goes to Go High Level ✅

---

## 🚀 Quick Setup (5 Minutes)

### Option 1: Upload HTML File to Framer

1. **Go to Framer:**
   - framer.com
   - Create new project
   - Name it: "GovCon Giants"

2. **Add Code Component:**
   - Click "+" in left sidebar
   - Select "Code"
   - Name it: "Homepage"

3. **Paste HTML:**
   - Copy your `preview.html` content
   - Paste into code component
   - Or upload as custom code

4. **Update Links:**
   Make sure all buttons link to your Next.js site:
   ```html
   <a href="https://yourdomain.com/bootcamp">Get Started Free</a>
   <a href="https://yourdomain.com/free-course">Free Course</a>
   <a href="https://yourdomain.com/surge">Download Resources</a>
   ```

5. **Publish:**
   - Click "Publish" in top right
   - Choose your domain
   - Done!

---

### Option 2: Custom Code (Full Control)

1. **In Framer:**
   - Create new project
   - Go to Settings → Custom Code
   - Add in `<head>` section

2. **Paste CSS:**
   ```html
   <style>
   /* Copy all styles from preview.html */
   </style>
   ```

3. **Create page:**
   - Paste HTML body content
   - Format and adjust

---

### Option 3: Host HTML Separately, Iframe in Framer

1. **Deploy your HTML:**
   - Vercel, Netlify, or GitHub Pages
   - Upload `preview.html`

2. **In Framer:**
   - Add iframe component
   - Point to your HTML URL
   - Set full width/height

---

## 🔗 Setting Up Links Between Sites

### Update Your Preview HTML Links:

All buttons should point to your Next.js deployment:

```html
<!-- Hero CTA -->
<a href="https://govcongiants.org/bootcamp" class="btn-green">
  Get Started Free
</a>

<!-- Resource Cards -->
<a href="https://govcongiants.org/bootcamp">January Bootcamp</a>
<a href="https://govcongiants.org/surge">SURGE Bootcamp</a>
<a href="https://govcongiants.org/free-course">Free Course</a>
<a href="https://govcongiants.org/opp">Opportunity Hunter</a>
<a href="https://govcongiants.org/resources">Free Resources</a>
```

---

## 🌐 Domain Setup

### Option A: Both on Same Domain

**Best for SEO and user experience**

1. **Framer:** `govcongiants.org` (homepage)
2. **Next.js:** `govcongiants.org/bootcamp`, `/free-course`, etc.

**How:**
- Point domain to Framer
- Use Framer's redirect rules for `/bootcamp/*` → Next.js
- Or use reverse proxy

### Option B: Subdomain

1. **Framer:** `govcongiants.org` (homepage)
2. **Next.js:** `app.govcongiants.org` (funnels)

**How:**
- Main domain → Framer
- Subdomain → Next.js on Vercel

### Option C: Separate Domains (Simplest)

1. **Framer:** `govcongiants.org` (homepage)
2. **Next.js:** Keep on Vercel's URL or use different domain

**How:**
- Just update links
- No DNS changes needed

---

## 📝 What You Need to Do:

### Step 1: Update preview.html Links

I'll create an updated version with proper links...

### Step 2: Choose Hosting

**Where is your Next.js site currently deployed?**
- Vercel?
- Netlify?
- Other?

### Step 3: Upload to Framer

Follow Option 1, 2, or 3 above

### Step 4: Connect Domains

Based on which option you choose

---

## ✅ Advantages of This Approach:

1. **Simple:** Homepage is just HTML
2. **Fast:** Static HTML loads instantly
3. **Reliable:** Forms still work with Go High Level
4. **Flexible:** Can update each independently
5. **Easy:** No complex integration needed

---

## 🎯 Final Structure:

```
govcongiants.org (Framer)
├── Homepage (HTML)
└── Links to Next.js:
    ├── /bootcamp (Next.js + GHL)
    ├── /free-course (Next.js + GHL)
    ├── /surge (Next.js + GHL)
    ├── /opp (Next.js + GHL)
    └── /resources (Next.js + GHL)
```

---

## 🚀 Next Steps:

1. **Tell me:** Where is your Next.js site deployed?
2. **I'll update** `preview.html` with correct links
3. **You upload** to Framer
4. **Done!** ✅

---

**What's the URL of your Next.js site?** (So I can update the links correctly)
