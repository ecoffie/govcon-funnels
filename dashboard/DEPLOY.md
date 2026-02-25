# Deploy Meeting Intelligence Dashboard

When the user asks to deploy the dashboard or make it live, do the following.

## Render.com deployment

1. **Create a Render Web Service** (render.com → New → Web Service).
2. **Connect** the GitHub repo `ecoffie/govcon-funnels`.
3. **Set deployment:**
   - Root Directory: `dashboard`
   - Build Command: `npm install && npm run build`
   - Start Command: `node server.js`
4. **Add env vars (Render):**
   - `ANTHROPIC_API_KEY`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI` = `https://<live-url>/api/google/callback`
   - `APP_URL` = `https://<live-url>`
   - `FIREFLIES_API_KEY` (optional)
   - `FIREFLIES_WEBHOOK_SECRET` (optional)
   - `FIREFLIES_SYNC_INTERVAL_MINUTES` (optional; e.g. `60`)
5. **Deploy** and get the live URL.
6. **Configure Google Cloud Console** before testing connect:
   - APIs & Services → Library: enable **Google Calendar API** and **Gmail API**.
   - APIs & Services → OAuth consent screen: configure app; add test users if app is in Testing.
   - APIs & Services → Credentials → OAuth client (Web application):
     - Authorized redirect URI: `https://<live-url>/api/google/callback`
7. **Verify in app:**
   - Click **Connect Google** (Calendar + Gmail permission prompt should appear).
   - Click **Sync Workspace** and confirm Calendar event count updates.
   - Click **Sync Gmail** and confirm Gmail message count updates.
   - Confirm lead table “Last Contact” updates from latest calendar/email activity.
8. **Return the live URL** and tell the user exactly where to paste redirect URI:
   - Google Cloud Console → Credentials → OAuth client → Authorized redirect URIs.
