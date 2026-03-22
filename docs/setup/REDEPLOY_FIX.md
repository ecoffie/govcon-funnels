# Quick Fix: Redeploy to Vercel

## Option 1: Trigger Redeploy from Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on the failed deployment
3. Click "Redeploy" button
4. Select "Use existing Build Cache" or try without cache

## Option 2: Push an Empty Commit
```bash
git commit --allow-empty -m "Trigger rebuild"
git push
```

## Option 3: Check Environment Variables
1. Go to Vercel Dashboard > Project Settings > Environment Variables
2. Verify these are set (for Production):
   - GHL_API_KEY
   - GHL_LOCATION_ID
   - STRIPE_SECRET_KEY (if using Stripe)
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (if using Stripe)

Note: Missing env vars shouldn't fail the build, but it's worth checking.
