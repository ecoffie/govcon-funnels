# How to Get Your Homepage on Framer

## Quick Guide: Next.js → Framer

### Option 1: Rebuild in Framer (Recommended ⭐)

**Why this is best:**
- Native Framer features
- Easy to edit and maintain
- Better performance
- Full SEO control

**Steps:**

1. **Open Framer**
   - Go to framer.com
   - Create new project

2. **Use Your HTML Preview as Reference**
   - Open `preview.html` in your browser
   - Take screenshots of each section

3. **Recreate Section by Section:**

   **Hero Section:**
   - Text: "$82 BILLION UNSPENT FEDERAL MONEY"
   - Badge: "LIVE NOW" with red pulse animation
   - Buttons: "Get Started Free" + "Watch Free Training"

   **Stats Bar:**
   - 4 stat cards in a grid
   - Background: dark slate
   - Green accent numbers

   **Resources Cards:**
   - 6 cards in 3x2 grid
   - Hover effects
   - Icons/emojis

4. **Copy All Text Content:**
   - Headlines
   - Descriptions
   - Button text
   - Stats

5. **Add Animations:**
   - Pulse effect on "LIVE NOW" badge
   - Hover effects on cards
   - Button hover states

---

### Option 2: Use Code Component in Framer

**Steps:**

1. **Create New Framer Project**

2. **Insert Code Component:**
   - Click "+" → "Code"
   - Name it "Homepage"

3. **Copy HTML from `preview.html`:**
   ```javascript
   export default function Homepage() {
     return (
       <div style={{
         fontFamily: 'system-ui, sans-serif',
         background: '#0f172a',
         color: '#f8fafc',
         minHeight: '100vh',
         padding: '2rem'
       }}>
         {/* Paste your HTML content here */}
         <div className="container">
           <h1>$82 BILLION UNSPENT FEDERAL MONEY</h1>
           {/* ... rest of content ... */}
         </div>
       </div>
     )
   }
   ```

4. **Add CSS as styled-components or inline styles**

---

### Option 3: Export Static Files from Next.js

**Steps:**

1. **Update `next.config.js`:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }

   module.exports = nextConfig
   ```

2. **Build static export:**
   ```bash
   npm run build
   ```

3. **Find your exported files:**
   - Look in `/out` folder
   - Find `index.html` (your homepage)

4. **Upload to Framer:**
   - Go to Framer project
   - Use code component to embed
   - Or host separately and iframe it

---

### Option 4: Keep Next.js, Link from Framer

**Best if you want to keep the Next.js site:**

1. **Deploy your Next.js site:**
   - Vercel (recommended)
   - Netlify
   - GitHub Pages

2. **In Framer:**
   - Create a simple landing page
   - Add a button/link to your Next.js site
   - Or use iframe to embed it

---

## 🎯 Recommended Approach for You

Since your homepage has:
- Complex forms (LeadForm component)
- API integrations (Go High Level)
- Dynamic functionality

**I recommend:**

1. **Keep Next.js for functionality pages** (forms, funnels)
2. **Use Framer for marketing pages** (about, blog, etc.)
3. **Link between them seamlessly**

**OR**

**Rebuild in Framer and:**
- Use Framer Forms → Go High Level integration
- Keep it simpler
- Easier to maintain

---

## 📋 Content to Copy to Framer

### Hero Section:
```
Headline: $82 BILLION UNSPENT FEDERAL MONEY
Subtext: Most agencies must spend remaining budget by Sept 30th
Badge: LIVE NOW (red, pulsing)
Buttons: Get Started Free | Watch Free Training
```

### Stats:
```
$750B+ Annual Federal Spending
23% Set Aside for Small Biz
5,000+ Members Trained
$2B+ Contracts Won
```

### Resource Cards:
```
1. January Bootcamp
2. SURGE Bootcamp
3. Free Course
4. Opportunity Hunter
5. Free Resources
6. GovCon Pro
```

---

## 🚀 Quick Start: Rebuild in Framer (Step-by-Step)

1. **Create Framer project:** framer.com/new
2. **Set canvas:** Desktop (1440px)
3. **Background:** #0f172a (dark slate)
4. **Add sections:**
   - Header (sticky)
   - Hero
   - Stats bar
   - Resources grid
   - CTA sections
   - Footer

5. **Use Framer's:**
   - Text layers for content
   - Frames for cards
   - Variants for hover states
   - Components for reusable elements

6. **Add forms:**
   - Use Framer Forms
   - Connect to Go High Level via Zapier/Make
   - Or use custom code component with your API

---

## 💡 Tips for Framer

- Use Framer's built-in animations instead of custom CSS
- Create components for repeated elements (cards, buttons)
- Use variables for colors (green: #22c55e, red: #ef4444)
- Set up responsive breakpoints for mobile
- Use Framer's CMS if you want to update content easily

---

## ⚠️ Important Notes

**If you rebuild in Framer:**
- You'll need to recreate the Go High Level form integration
- Use Framer Forms + Zapier/Make to connect to GHL
- Or use a code component with your existing API endpoint

**Keeping forms working:**
- Option A: Keep forms on Next.js, link from Framer
- Option B: Use Framer Forms + webhook to your API
- Option C: Embed Next.js forms in Framer via iframe

---

## 🔗 Resources

- [Framer Docs](https://www.framer.com/docs/)
- [Framer Forms](https://www.framer.com/docs/forms/)
- [Code Components](https://www.framer.com/docs/code/)
- [Framer + Zapier](https://www.framer.com/learn/integrations/)

---

**Need help deciding which approach? Let me know your priorities:**
- Speed (rebuild vs port)
- Maintenance (who will update it)
- Functionality (forms, integrations)
- Budget (hosting costs)
