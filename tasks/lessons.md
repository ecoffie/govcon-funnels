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
