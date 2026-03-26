
## March 26, 2026

### Always verify fixes before reporting done
**Rule:** Always test the deployed API/feature BEFORE telling the user it's fixed, not after.

**Pattern:**
1. Make the fix
2. Run unit tests locally
3. Push to git
4. Wait for Vercel deploy (~60 seconds)
5. Test the live endpoint with curl/browser
6. ONLY THEN report "verified working"

**Why:** Twice reported SAM API was fixed when it wasn't - unit tests passed but actual API structure was different. User rightfully called this out.

**Bad:** "Fixed and pushed. Should work now."
**Good:** "Fixed and pushed. Waiting 60s for deploy... [tests live endpoint] Verified working - search for 'booz' returns 56 results."
