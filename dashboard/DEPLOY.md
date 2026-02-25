# Deploy Meeting Intelligence Dashboard

When the user asks to deploy the dashboard or make it live, do the following.

## Render.com deployment

1. **Create a Render Web Service** (render.com → New → Web Service).
2. **Connect** the GitHub repo `ecoffie/govcon-funnels`.
3. **Set deployment:**
   - Root Directory: `dashboard`
   - Build Command: `npm install && npm run build`
   - Start Command: `node server.js`
4. **Add env vars:** `ANTHROPIC_API_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FIREFLIES_API_KEY` (optional), `FIREFLIES_WEBHOOK_SECRET` (optional).
5. **Deploy** and get the live URL.
6. **Set** `GOOGLE_REDIRECT_URI` = `https://<live-url>/api/google/callback`.
7. **Tell the user** to add that same URL to Google Cloud Console → Credentials → OAuth client → Authorized redirect URIs.
8. **Return the live URL** so they can open the dashboard and connect Google.
