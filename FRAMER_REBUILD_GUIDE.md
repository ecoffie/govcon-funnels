# Rebuild Your Homepage in Framer - Step by Step

## 🎯 Complete Guide to Recreating Your $82 Billion Homepage

---

## 📋 Before You Start

**Have ready:**
- Framer account (framer.com)
- This guide open
- Your `preview.html` open for reference

**Time needed:** 1-2 hours for full rebuild

---

## 🎨 Design Specifications

### Colors
```
Background (Dark): #0f172a
Card Background: #1e293b
Border: #334155
Text Primary: #f8fafc
Text Muted: #94a3b8
Green Accent: #22c55e
Green Dark: #16a34a
Red Accent: #ef4444
```

### Typography
```
Font: System UI / Inter
Hero Headline: 56px, Bold
Section Titles: 36px, Bold
Card Titles: 20px, Semibold
Body Text: 16px, Regular
Small Text: 14px, Regular
```

### Spacing
```
Container Max Width: 1152px (72rem)
Section Padding: 96px top/bottom
Card Padding: 32px
Card Gap: 24px
Border Radius (Cards): 12px
Border Radius (Buttons): 12px
```

---

## 🚀 Step-by-Step Build Process

### Step 1: Create New Framer Project

1. Go to **framer.com**
2. Click **"New Project"**
3. Name it: **"GovCon Giants Homepage"**
4. Set canvas size: **Desktop (1440px)**

---

### Step 2: Set Up Canvas

1. **Background:**
   - Select canvas
   - Fill: `#0f172a` (dark slate)

2. **Create container frame:**
   - Width: 1152px
   - Center align
   - This will hold all your content

---

### Step 3: Build Header (Sticky Nav)

**Create a frame:**
- Width: 100% (full width)
- Height: 80px
- Background: `rgba(15, 23, 42, 0.95)` (semi-transparent)
- Blur: 8px backdrop
- Border bottom: 1px, `#1e293b`
- Position: Sticky (top: 0)
- Z-index: 50

**Add logo text:**
```
GovCon Giants
Font: Bold, 24px
Colors: "GovCon" white, "Giants" #22c55e
```

**Add nav links:**
```
Resources | About | Contact
Font: 16px, Regular
Color: #94a3b8
Hover: #f8fafc
```

**Add CTA button:**
```
Text: "Get Started Free"
Style: Green button (#16a34a)
Padding: 12px 24px
Border radius: 8px
Hover: #22c55e with glow
```

---

### Step 4: Hero Section

**Create hero frame:**
- Width: 1152px (container)
- Padding: 96px top, 48px bottom
- Background: Gradient (from #0f172a to #1e293b)

**Left side (text):**

1. **Live badge:**
   ```
   Text: "🔴 LIVE NOW"
   Background: #ef444410 (red with transparency)
   Text color: #ef4444
   Padding: 8px 16px
   Border radius: 20px
   Add pulse animation (Framer's built-in)
   ```

2. **Headline:**
   ```
   Text: "$82 BILLION UNSPENT FEDERAL MONEY"
   Font: 56px, Bold
   Color: White
   Line height: 1.1
   Max width: 600px
   ```

3. **Subheadline:**
   ```
   Text: "Most agencies must spend their remaining budget by September 30th.
          Your business could capture this urgent government spending."
   Font: 20px, Regular
   Color: #94a3b8
   Max width: 600px
   Margin top: 24px
   ```

4. **CTA buttons (horizontal stack):**

   **Primary button:**
   ```
   Text: "Get Started Free"
   Background: #16a34a
   Color: White
   Padding: 16px 32px
   Border radius: 12px
   Font: 16px, Bold
   Hover: #22c55e + glow effect (0 0 30px rgba(34,197,94,0.4))
   ```

   **Secondary button:**
   ```
   Text: "Watch Free Training"
   Background: #1e293b
   Border: 1px solid #475569
   Color: White
   Padding: 16px 32px
   Border radius: 12px
   Font: 16px, Bold
   Hover: #334155
   ```

**Right side (form card):**

Create a card frame with **green glow**:
```
Background: #1e293b
Border: 1px solid #334155
Border radius: 16px
Padding: 40px
Box shadow: 0 0 30px rgba(34,197,94,0.4)
```

**Form title:**
```
Text: "Start Your Free Course"
Font: 24px, Bold
Center aligned
Margin bottom: 24px
```

**Form fields:**
*(We'll connect these to Go High Level later)*

For now, create 3 input fields:
1. Name field
2. Email field
3. Phone field (optional)

**Submit button:**
```
Text: "Get Free Access"
Full width
Green button style (same as hero button)
```

---

### Step 5: Stats Bar

**Create stats frame:**
- Width: 1152px
- Background: #1e293b
- Border: 1px solid #334155
- Border radius: 12px
- Padding: 48px
- Grid: 4 columns

**4 stat cards (identical styling):**

```
Card 1:
Number: "$750B+" (36px, Bold, #22c55e)
Label: "Annual Federal Spending" (16px, White)
Sublabel: "Your market opportunity" (14px, #94a3b8)

Card 2:
Number: "23%" (36px, Bold, #22c55e)
Label: "Set Aside for Small Biz" (16px, White)
Sublabel: "Mandated by law" (14px, #94a3b8)

Card 3:
Number: "5,000+" (36px, Bold, #22c55e)
Label: "Members Trained" (16px, White)
Sublabel: "Join the community" (14px, #94a3b8)

Card 4:
Number: "$2B+" (36px, Bold, #22c55e)
Label: "Contracts Won" (16px, White)
Sublabel: "By our members" (14px, #94a3b8)
```

---

### Step 6: Resources Section

**Section header:**
```
Title: "Start Your GovCon Journey"
Font: 36px, Bold, White
Subtitle: "Choose your path to winning federal contracts"
Font: 20px, #94a3b8
Center aligned
Margin bottom: 48px
```

**6 Resource cards (3x2 grid):**

**Card styling (reusable component):**
```
Background: #1e293b
Border: 1px solid #334155
Border radius: 12px
Padding: 32px
Hover: Border changes to #475569, slight lift (-4px)
Transition: 200ms
```

**Card 1: January Bootcamp**
```
Icon: 🎯
Title: "January Bootcamp"
Description: "Full-Day Intensive: Win Federal Contracts in Q1 2026"
Badge: "LIVE EVENT" (red)
Button: "Get Free Handouts"
```

**Card 2: SURGE Bootcamp**
```
Icon: ⚡
Title: "SURGE Bootcamp"
Description: "10 Free Resources to Win Federal Contracts"
Badge: "FREE" (green)
Button: "Download Resources"
```

**Card 3: Free Course**
```
Icon: 📚
Title: "Free 12-Day Course"
Description: "Learn government contracting from scratch"
Badge: "100% FREE" (green)
Button: "Start Free Course"
```

**Card 4: Opportunity Hunter**
```
Icon: 🔍
Title: "Opportunity Hunter"
Description: "Find contracts perfect for your business"
Badge: "TOOL" (blue)
Button: "Start Hunting"
```

**Card 5: Free Resources**
```
Icon: 📹
Title: "Free Resources"
Description: "Training videos, templates, and contact lists"
Badge: "FREE" (green)
Button: "Browse Resources"
```

**Card 6: GovCon Pro**
```
Icon: 👑
Title: "GovCon Pro"
Description: "Premium training and 1-on-1 support"
Badge: "PREMIUM" (gold)
Button: "Learn More"
```

---

### Step 7: Urgency CTA Section

**Full-width frame:**
```
Background: Gradient (red tint)
  from: rgba(239, 68, 68, 0.1)
  to: rgba(239, 68, 68, 0.05)
Border: 1px solid rgba(239, 68, 68, 0.3)
Border radius: 16px
Padding: 64px
Text align: center
```

**Content:**
```
Badge: "⚠️ URGENT"
Title: "$82 Billion Must Be Spent by September 30th"
Font: 48px, Bold
Subtitle: "Don't let this opportunity pass. Start your journey today."
Font: 20px, #94a3b8
```

**CTA button:**
```
Text: "Get Started Now"
Large green button
Padding: 20px 40px
Font: 18px, Bold
```

---

### Step 8: Final CTA Section

**Frame:**
```
Max width: 600px
Center aligned
Padding: 96px vertical
```

**Content:**
```
Title: "Ready to Win Federal Contracts?"
Font: 36px, Bold, Center
Subtitle: "Join 5,000+ entrepreneurs winning government contracts"
Font: 18px, #94a3b8, Center
Margin bottom: 32px
```

**Button:**
```
Text: "Start Your Free Course"
Full width green button
Padding: 20px
Font: 18px, Bold
```

---

### Step 9: Footer

**Frame:**
```
Width: 100%
Background: #0f172a
Border top: 1px solid #1e293b
Padding: 64px 0
```

**Content (3 columns):**

**Column 1: Logo + Tagline**
```
Logo: "GovCon Giants"
Tagline: "Win Federal Contracts"
Color: #94a3b8
```

**Column 2: Quick Links**
```
Resources
Free Course
Bootcamp
Contact
```

**Column 3: Contact**
```
Phone: 786-477-0477
Email: hello@govconedu.com
```

**Bottom row:**
```
Text: "© 2026 GovCon Giants. All rights reserved."
Font: 14px, #64748b
Center aligned
```

---

## 🔗 Connecting Forms to Go High Level

### Option A: Link to Your Next.js Forms (Easiest)

Instead of building forms in Framer, link buttons to your Next.js pages:

```
Button "Get Started" → https://yourdomain.com/bootcamp
Button "Free Course" → https://yourdomain.com/free-course
Button "Download" → https://yourdomain.com/surge
```

**Your forms keep working with Go High Level!** ✅

---

### Option B: Use Framer Forms + Webhook

1. **In Framer:**
   - Add form component
   - Set fields: name, email, phone

2. **Form submission:**
   - Go to Form Settings
   - Add webhook URL: `https://yourdomain.com/api/lead`
   - Or use Zapier/Make.com to connect to Go High Level

3. **Webhook payload:**
   ```json
   {
     "name": "{{name}}",
     "email": "{{email}}",
     "phone": "{{phone}}",
     "source": "framer-homepage"
   }
   ```

---

### Option C: Custom Code Component

Create a code component in Framer that calls your API:

```javascript
export default function LeadForm({ source }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch('https://yourdomain.com/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, source })
    })

    window.location.href = '/thank-you'
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

---

## ✨ Animation Tips

**Add these Framer animations:**

1. **Hero badge pulse:**
   - Select badge
   - Add animation: Scale + Opacity
   - Loop: Infinite
   - Duration: 1.5s

2. **Card hover effects:**
   - Add hover variant
   - Scale: 1.02
   - Y position: -4px
   - Border color: #475569
   - Transition: Spring (gentle)

3. **Button hovers:**
   - Scale: 1.05
   - Add glow effect
   - Transition: 200ms ease

4. **Scroll animations:**
   - Cards: Fade in + slide up
   - Stagger: 100ms
   - Trigger: When entering viewport

---

## 📱 Make It Responsive

1. **Add breakpoint: Tablet (768px)**
   - Stack cards vertically
   - Reduce hero text size: 40px
   - Single column layout

2. **Add breakpoint: Mobile (375px)**
   - Hero text: 32px
   - Stack everything
   - Full-width buttons
   - Reduce padding

---

## ✅ Checklist

- [ ] Canvas background set (#0f172a)
- [ ] Header built and sticky
- [ ] Hero section with headline + CTA
- [ ] Stats bar with 4 stats
- [ ] 6 resource cards in grid
- [ ] Urgency CTA section
- [ ] Final CTA section
- [ ] Footer with contact info
- [ ] Forms linked to Next.js or connected
- [ ] Hover animations added
- [ ] Scroll animations added
- [ ] Mobile responsive
- [ ] Published and live

---

## 🚀 Publishing

1. **Test everything:**
   - Click all buttons
   - Test forms
   - Check on mobile

2. **Publish:**
   - Click "Publish" in top right
   - Choose domain or custom domain
   - Hit publish!

3. **Connect domain (optional):**
   - Settings → Domain
   - Add custom domain
   - Update DNS records

---

## 💡 Pro Tips

- **Create components** for reusable elements (cards, buttons)
- **Use variables** for colors so you can change them globally
- **Test forms** before publishing
- **Check performance** (keep under 1MB images)
- **Add meta tags** for SEO in project settings

---

## 🆘 Need Help?

Common issues:
- **Form not submitting?** Check webhook URL
- **Animations janky?** Reduce complexity
- **Text blurry?** Check font rendering settings
- **Cards not aligned?** Use auto-layout/grid

---

**Ready to start building?** Open Framer and follow this guide step by step! 🎨
