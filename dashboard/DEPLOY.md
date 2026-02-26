# Deploy Meeting Intelligence Dashboard

When the user asks to deploy the dashboard or make it live, do the following.

## Vercel deployment

1. **Create a Vercel Project** (Vercel → Add New Project).
2. **Connect** the GitHub repo `ecoffie/govcon-funnels` and set Root Directory to `dashboard`.
3. **Set deployment:**
   - Root Directory: `dashboard`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
4. **Disable Deployment Protection for production** (required for OAuth/API callbacks):
   - Vercel Project Settings → Deployment Protection → disable Vercel Authentication/password protection for production URL.
5. **Add env vars (Vercel):**
   - `ANTHROPIC_API_KEY`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI` = `https://<live-url>/api/google/callback`
   - `APP_URL` = `https://<live-url>`
   - `KV_REST_API_URL` (required on Vercel for persistent sync/OAuth state)
   - `KV_REST_API_TOKEN` (required on Vercel for persistent sync/OAuth state)
   - `FIREFLIES_API_KEY` (required for Fireflies sync)
   - `FIREFLIES_WEBHOOK_SECRET` (optional)
   - `FIREFLIES_SYNC_INTERVAL_MINUTES` (optional; e.g. `60`)
6. **Deploy** and get the live URL.
7. **Configure Google Cloud Console** before testing connect:
   - APIs & Services → Library: enable **Google Calendar API** and **Gmail API**.
   - APIs & Services → OAuth consent screen: configure app; add test users if app is in Testing.
   - APIs & Services → Credentials → OAuth client (Web application):
     - Authorized redirect URI: `https://<live-url>/api/google/callback`
8. **Verify in app:**
   - Visit `/api/readiness` and confirm `google.ready`, `fireflies.ready`, and `kv.ready` are all true.
   - Click **Connect Google** (Calendar + Gmail permission prompt should appear).
   - Click **Sync Workspace** and confirm Calendar event count updates.
   - Click **Sync Gmail** and confirm Gmail message count updates.
   - Click **Sync Fireflies** and confirm transcript/lead counts update.
   - Confirm lead table “Last Contact” updates from latest calendar/email activity.
9. **Return the live URL** and tell the user exactly where to paste redirect URI:
   - Google Cloud Console → Credentials → OAuth client → Authorized redirect URIs.
