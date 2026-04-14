# Lessons Learned

## March 26, 2026

### Always verify fixes before reporting done
**Rule:** Always test the deployed API/feature BEFORE telling the user it's fixed, not after.

**Pattern:**
1. Make the fix
2. Run unit tests locally
3. Push to git
4. Wait for Vercel deploy (~60-90 seconds)
5. Test the live endpoint with curl/browser
6. ONLY THEN report "verified working"

**Why:** Twice reported SAM API was fixed when it wasn't - unit tests passed but actual API structure was different. User rightfully called this out.

**Bad:** "Fixed and pushed. Should work now."
**Good:** "Fixed and pushed. Waiting 60s for deploy... [tests live endpoint] Verified working - search for 'booz' returns 56 results."

---

### SAM.gov Entity API v3 quirks
**Rule:** When using SAM.gov Entity API v3, always include these parameters:

1. **`samRegistered=Yes`** - REQUIRED or API returns empty `entityData` array
2. **`page=0`** - API uses 0-indexed pagination (not 1-indexed!)

**Why:**
- Without `samRegistered=Yes`, you get `totalRecords: 3, entityData: []`
- With `page=1`, you skip the first page of results (empty for small result sets)

**Correct API call:**
```
/entities?api_key=***&samRegistered=Yes&page=0&size=25&cageCode=1T4Z9
```

**Wrong (returns empty):**
```
/entities?api_key=***&page=1&size=25&cageCode=1T4Z9
```

---

### Debug production issues systematically
**Rule:** When production API returns unexpected results, add debug endpoints to expose internal state.

**Pattern:**
1. Add `?debug=true` query param support
2. Return raw internal values (counts, URLs, config)
3. Deploy and test
4. Compare debug output to working local tests
5. Remove debug code after fix

**Why:** The SAM API pagination bug was only found by exposing the actual URL being called (`page=1` instead of `page=0`).

---

## March 29, 2026

### GSC "Not Indexed" categories are mostly fine
**Rule:** Don't panic at high numbers in GSC indexing reports. Analyze before acting.

**Pattern:**
- "Not found (404)" - Usually legacy URLs needing redirects
- "Crawled - not indexed" - Often JS/CSS chunks (expected for Next.js)
- "Excluded by noindex" - Old CMS content that no longer exists

**Why:** 254 "noindex" pages looked alarming but were all old WordPress posts that don't exist on the new Next.js site. No action needed.

---

### Differentiate page titles by search intent
**Rule:** When two pages compete for similar keywords, differentiate by intent:
- Educational pages: "What is X", "How to", "(2026 Guide)"
- Tool pages: "[Free]", "Search", "Lookup", action verbs

**Example:**
- Guide: "CAGE Code: What It Is & How to Get One (2026 Guide)"
- Tool: "CAGE Code Lookup [Free] — Search 600K+ Contractors"

**Why:** Reduces cannibalization and matches user intent better, improving CTR.

---

### Fix duplicate site name in Next.js metadata
**Rule:** When using layout.tsx metadata, don't include "| Site Name" if the root layout already appends it.

**Bad:** `title: "Page Title | GovCon Giants"` → renders as "Page Title | GovCon Giants | GovCon Giants"
**Good:** `title: "Page Title"` → root layout appends site name once

---

## March 31, 2026

### Typst layout: use #image not #figure to prevent floating
**Rule:** In Typst, `#figure()` auto-floats content which can push images to next page leaving blank space. Use `#image()` directly with `#block(breakable: false)` wrapper for precise control.

**Pattern:**
```typst
// Bad - image may float to next page
#figure(
  image("screenshot.png"),
  caption: [Description]
)

// Good - keeps image exactly where you place it
#block(breakable: false)[
  #image("screenshot.png", width: 100%, height: 7.5in)
  #v(0.1in)
  #text(size: 9pt)[*Caption.* Description text...]
]
```

**Why:** Spent multiple iterations fixing "blank page 16" issue because `#figure` kept floating images away from their headers.

---

### PDF layout fundamentals
**Rule:** Professional PDF documents follow these conventions:
1. **Grid system** - 6 or 12 column grid for consistent alignment
2. **Figure conventions** - Captions below images, consistent spacing (1em gap)
3. **Typography hierarchy** - Perfect Fourth ratio (1.333) for heading sizes
4. **Keep together** - Use `breakable: false` to keep related content on same page

**Why:** User feedback: "you're just throwing stuff on a page with no proper training or instruction"

---

## April 2, 2026

### SAM.gov API returns HTTP 429 for throttling, not HTTP 200
**Rule:** SAM.gov can return rate limit errors with EITHER HTTP 200 or HTTP 429. Check for error code `900804` in the response body regardless of HTTP status.

**Pattern:**
```javascript
const responseText = await response.text();
const data = JSON.parse(responseText);

// Check for throttle BEFORE checking response.ok
if (data?.code === '900804') {
  // Key is throttled - try backup key
  markKeyThrottled(apiKey, parseNextAccessTime(data.nextAccessTime));
  return { throttled: true };
}
```

**Why:** Initially checked for `response.ok` first, which returned `false` for HTTP 429 and went to generic error handling instead of backup key rotation.

---

### Implement API key rotation for rate-limited services
**Rule:** For APIs with daily rate limits (like SAM.gov's 1,000/day), implement automatic key rotation with backup keys.

**Pattern:**
1. Store multiple keys: `SAM_API_KEY` (primary) and `SAM_API_KEY_BACKUP`
2. Track throttled keys in memory with expiration timestamps
3. Try primary key first, fall back to backup if throttled
4. Mark keys as throttled when error code 900804 received
5. Keys auto-reset at midnight UTC (or per API's reset schedule)

**Code structure:**
```javascript
const throttledKeys: Record<string, number> = {}; // key -> throttle expiry timestamp

function getAvailableKey(): string | null {
  for (const key of [primaryKey, backupKey]) {
    if (!throttledKeys[key] || throttledKeys[key] < Date.now()) {
      return key;
    }
  }
  return null;
}
```

**Why:** Single key exhausted at midday left CAGE lookup tool broken until midnight. Backup key provides 2x capacity.

---

### Update stale dates immediately after events pass
**Rule:** When live events pass (bootcamps, webinars), immediately update pages to "Replay Available" or the next scheduled date.

**Pattern:**
1. Change badge from "LIVE EVENT - [DATE]" → "BOOTCAMP REPLAY AVAILABLE"
2. Change date-specific text to "On-Demand" / "Lifetime Access" / "Watch Anytime"
3. Update details grid from Date/Time/Location → Format/Duration/Access

**Why:** Contract Vehicles Bootcamp showed "March 28, 2026" for 5 days after the event passed. Stale dates hurt credibility.

---

### Premium/high-ticket products: use Calendly, not Stripe direct
**Rule:** For products requiring consultation (Accelerator, White Glove), link to Calendly discovery call, not direct checkout.

**Pattern:**
- **Low-ticket (under $1,000):** Direct Stripe payment link (`buy.stripe.com/...`)
- **High-ticket (over $1,000):** Calendly discovery call (`calendly.com/govconedumeet/discovery-call`)

**Why:** Accelerator at $5,997 requires a conversation. Direct checkout creates friction and reduces conversions.

---

## April 3, 2026

### GHL API creates messages but doesn't deliver email
**Rule:** GoHighLevel Conversations API creates messages in the conversation thread but doesn't actually send email unless the location has a connected mailbox (Gmail, Outlook, or LC Email enabled).

**Symptom:** API returns success (`200`), message appears in GHL Conversations tab, but recipient never receives email.

**Workaround:** Use direct SMTP instead:
```javascript
// GHL credentials are in project: ~/Bootcamp/market-assassin-temp/.env.local
SMTP_USER="hello@govconedu.com"
SMTP_PASSWORD="pehiyeegbahxsinc"

// Send via Gmail SMTP
const server = smtplib.SMTP('smtp.gmail.com', 587);
server.starttls();
server.login(SMTP_USER, SMTP_PASSWORD);
```

**Why:** Spent 20 minutes debugging GHL "email sent" that never arrived. GHL needs mailbox configuration, which isn't set up.

---

### Use shared-content.ts for homepage content, not page.tsx
**Rule:** Homepage content (free resources, premium levels) is sourced from `/src/lib/shared-content.ts`, not hardcoded in `page.tsx`.

**Pattern:**
- `sharedHomepageContent.freeResources` → "Free Resources to Get Started" section
- `sharedHomepageContent.premiumLevels` → "Premium Resources" section
- Edit shared-content.ts to update homepage cards

**Why:** Spent time searching page.tsx for stale "January Bootcamp" text. It was in shared-content.ts.

---

### Eric's LinkedIn is /in/ecoffie (not /in/ericcoffie)
**Rule:** When including Eric's contact info in emails or content:
- LinkedIn: `https://www.linkedin.com/in/ecoffie/`
- Email: `eric@govcongiants.com`
- Calendly: `https://calendly.com/govconedumeet/discovery-call`

**Why:** Wrong LinkedIn URL in email signature. Always verify personal URLs before sending.

---

### Search existing code before recommending new features
**Rule:** Before recommending building new tools, agents, or features, ALWAYS search the codebase first to see what already exists.

**Pattern:**
1. Search `~/.claude/commands/` for existing slash commands
2. Search `~/.mcp.json` for existing MCP servers
3. Search `~/docs/` for existing documentation
4. Compare findings to recommendations

**Why:** Analysis recommended building 3 agents that already existed as comprehensive slash commands (`/deploy`, `/sync-access`, `/yt-live-package`). Wasted planning time on things already built.

---

### MCP servers location and enabling pattern
**Rule:** All MCP servers are in `~/mcp-servers/`. Configuration is in `~/.mcp.json`.

**To enable a new MCP server:**
```json
// Add to ~/.mcp.json mcpServers object:
"servername": {
  "command": "node",
  "args": ["/Users/ericcoffie/mcp-servers/servername/index.js"],
  "env": {
    "API_KEY": "your-key-here"
  }
}
```

**Currently enabled:** samgov, stripe, grantsgov, perplexity, framer, vimeo
**Ready but disabled:** usaspending (has bid count data SAM.gov lacks)

---

### Reference docs exist but weren't in CLAUDE.md
**Rule:** When creating documentation, immediately add it to CLAUDE.md Reference Docs section.

**Pattern:** Check `~/docs/` folder periodically for orphaned docs not referenced in CLAUDE.md.

**Found orphaned (now added):**
- `testing-checklist.md` - Page verification, deployment QA
- `email-templates.md` - HTML components, sequence templates
- `slide-components.md` - Reusable slide layouts
- `briefing-format.md` - Daily/Weekly/Pursuit briefing specs
- `briefing-data-sources.md` - Agency pain points, pipeline
- `briefing-examples.md` - Real examples of all 3 formats

**Why:** Had comprehensive docs that weren't being used because they weren't discoverable via CLAUDE.md.

---

## April 14, 2026

### Use permanent redirects (301/308) for link equity
**Rule:** When redirecting URLs that should always point to the new destination, use `permanent: true` in next.config.ts.

**Pattern:**
- **Temporary (307):** `permanent: false` - URL might change back, don't update caches
- **Permanent (308):** `permanent: true` - URL is permanently moved, cache it

**When to use permanent:**
- `/opp` → external tool URL (always goes there)
- `/checkout` → payment/booking URL (canonical destination)
- `/blog/old-slug` → `/guides/new-slug` (canonical redirect)

**When to use temporary:**
- Maintenance redirects (will restore original)
- A/B testing redirects (might change)
- Feature flag redirects (conditional)

**Why:** Temporary redirects (307) don't pass link equity to the destination. Every internal/external link to `/opp` was losing SEO value instead of passing it to the tool.

---

### Misleading URLs hurt user trust
**Rule:** If a URL says "checkout" but goes to a booking page, fix the URL.

**Pattern:**
1. Add explicit redirect in next.config.ts to bypass the page
2. Or rename the route to match its actual destination

**Example:**
- `/premium/accelerator/checkout` → Calendly (not Stripe)
- Fix: Redirect to Calendly directly, skipping the checkout page logic

**Why:** Users clicking "checkout" expect to pay. Showing a booking form instead creates confusion and reduces conversions.
