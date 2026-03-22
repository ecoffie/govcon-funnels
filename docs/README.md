# GovCon Funnels Documentation

## Folder Structure

```
docs/
├── seo/                    # SEO strategy & tracking
│   ├── SEO-3-MONTH-PLAN.md    # 12-week SEO roadmap
│   ├── VIDEO-SEO-MAPPING.md   # YouTube → website page strategy
│   └── JOBS-SEO-PLAN.md       # Jobs board SEO optimization
│
├── integrations/           # CRM & third-party integrations
│   ├── LEADS.md               # Lead/email signup system (where emails save)
│   ├── CRM_SETUP.md           # GoHighLevel setup guide
│   ├── SLACK_SETUP_GUIDE.md   # Slack webhook setup
│   └── TEST_INTEGRATION.md    # Testing integrations
│
├── setup/                  # Deployment & troubleshooting
│   ├── CHECK_VERCEL_LOGS.md   # Debugging Vercel deployments
│   ├── REDEPLOY_FIX.md        # Fixing deployment issues
│   └── OPT_IN_TEST_GUIDE.md   # Testing opt-in forms
│
└── framer/                 # Framer export/import guides
    ├── FRAMER_SETUP.md        # Initial Framer setup
    ├── FRAMER_EXPORT_GUIDE.md # Exporting from Framer
    ├── FRAMER_REBUILD_GUIDE.md# Rebuilding Framer components
    └── UPLOAD_TO_FRAMER.md    # Uploading to Framer
```

## Quick Links

### Most Common Tasks

| Task | Documentation |
|------|---------------|
| Where do email signups save? | [integrations/LEADS.md](integrations/LEADS.md) |
| SEO strategy & progress | [seo/SEO-3-MONTH-PLAN.md](seo/SEO-3-MONTH-PLAN.md) |
| Video page mapping | [seo/VIDEO-SEO-MAPPING.md](seo/VIDEO-SEO-MAPPING.md) |
| Jobs board SEO | [seo/JOBS-SEO-PLAN.md](seo/JOBS-SEO-PLAN.md) |
| GoHighLevel setup | [integrations/CRM_SETUP.md](integrations/CRM_SETUP.md) |
| Debugging deploys | [setup/CHECK_VERCEL_LOGS.md](setup/CHECK_VERCEL_LOGS.md) |

### Key Environment Variables

| Variable | Purpose | Docs |
|----------|---------|------|
| `GHL_API_KEY` | GoHighLevel CRM | [CRM_SETUP.md](integrations/CRM_SETUP.md) |
| `SLACK_LEAD_WEBHOOK_URL` | Lead notifications | [SLACK_SETUP_GUIDE.md](integrations/SLACK_SETUP_GUIDE.md) |
| `STRIPE_SECRET_KEY` | Payments | See root README.md |

## Project Files (Root)

| File | Purpose |
|------|---------|
| `README.md` | Project overview & getting started |
| `CLAUDE.md` | Claude Code context (routes, files, history) |
