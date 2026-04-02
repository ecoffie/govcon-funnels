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
