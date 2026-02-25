# Deploy Meeting Intelligence Dashboard

## Render.com (recommended)

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo (`ecoffie/govcon-funnels`)
3. **Root Directory**: `dashboard`
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `node server.js`
6. Add **Environment Variables** (Settings → Environment):
   - `ANTHROPIC_API_KEY` (required for AI analysis)
   - `GOOGLE_CLIENT_ID` (for Calendar sync)
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI` = `https://YOUR-RENDER-URL.onrender.com/api/google/callback` (set after first deploy)
   - `FIREFLIES_API_KEY` (optional, for Fireflies transcript sync)
   - `FIREFLIES_WEBHOOK_SECRET` (optional)

7. Deploy → your live URL will be `https://meeting-intelligence-dashboard-xxx.onrender.com`
8. Update `GOOGLE_REDIRECT_URI` with that URL + `/api/google/callback`
9. In [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → your OAuth client:
   - Add `https://YOUR-RENDER-URL.onrender.com/api/google/callback` to **Authorized redirect URIs**
