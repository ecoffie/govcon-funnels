# GovCon CRM v2 — Powered by Claude AI

A live CRM dashboard that pulls **ALL** your Fireflies meetings and Gmail history through Claude AI, with smart filtering, insights, and a full pipeline view.

---

## What's Inside

- **Insights Dashboard** — meeting volume, pipeline breakdown, weekly trends, top clients, follow-up alerts
- **Client Tracker** — every external client across all your meetings, with expandable action steps and meeting history
- **Table + Grid Views** — switch between dense table view and card grid
- **Smart Filters** — filter by status (Hot/Warm/Cold), meeting type (Discovery/Coaching/Follow Up etc.), and sort by last contact, last meeting, most meetings, or name
- **Real-time Sync** — one click pulls fresh data from Fireflies + Gmail through Claude

---

## How It Works

```
Fireflies (ALL meetings) ─┐
                           ├──► Claude AI Engine ──► React Dashboard
Gmail (email history) ─────┘
```

Claude is wired directly into your Fireflies and Gmail accounts via MCP. Every sync, it:
1. Pulls **all** meetings (not just 50 — all of them)
2. Filters out internal team meetings
3. Groups all meetings per client
4. Finds last email for each client
5. Generates pipeline insights across your full history

---

## Setup in Cursor

### 1. Open folder in Cursor
```
File → Open Folder → select this folder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your API key
Create `.env` in the project root:
```
VITE_ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
```
Get your key: https://console.anthropic.com/settings/keys

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:5173

---

## Deploy to GitHub + Vercel

### Push to GitHub
```bash
git init
git add .
git commit -m "GovCon CRM v2"
git remote add origin https://github.com/YOUR_USERNAME/govcon-crm.git
git branch -M main
git push -u origin main
```

### Deploy on Vercel
1. Go to https://vercel.com → Import from GitHub
2. Select your `govcon-crm` repo
3. Add environment variable:
   - **Key:** `VITE_ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-YOUR_KEY_HERE`
4. Deploy — Vercel gives you a live URL instantly

Every `git push` auto-redeploys.

---

## Customizing Team Emails

To add/remove team members from the exclusion list, edit `src/lib/claude.js` → `TEAM_EMAILS` set at the top of the file.

---

## Tech Stack

- React + Vite (frontend)
- Claude AI with Fireflies + Gmail MCP (data engine)
- Vercel (hosting)
