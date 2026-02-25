// ═══════════════════════════════════════════════════════════════
// GOVCON CRM ENGINE — Powered by Claude + Fireflies + Gmail MCP
// ═══════════════════════════════════════════════════════════════

const API_URL = 'https://api.anthropic.com/v1/messages'
const API_KEY  = import.meta.env.VITE_ANTHROPIC_API_KEY

// ── Team emails to ALWAYS exclude from client view ─────────────
export const TEAM_EMAILS = new Set([
  'eric@govcongiants.com',
  'branden@govcongiants.com',
  'rward@govcongiants.com',
  'kashif6331@gmail.com',
  'agualimpiaannelle@gmail.com',
  'annelle_89@hotmail.com',
  'sikandarphulpoto35@gmail.com',
  'usamashraf0@gmail.com',
  'usamashraf2@gmail.com',
  'usamashraf2@gmail.com',
  'villanueva.kmp@gmail.com',
  'kay@govcongiants.com',
  'zach@govcongiants.com',
  'ryan@govcongiants.com',
  'michelle@govcongiants.com',
  'ena@govcongiants.com',
  'muneebamehmood07@gmail.com',
  'jawadshah7999@gmail.com',
  'data@govconedu.com',
  'hello@govconedu.com',
  'branden@govcongiants.com',
  'service@lc.govcongiants.com',
])

// ── System prompt ───────────────────────────────────────────────
const SYSTEM = `You are the data engine for a CRM dashboard for GovCon EDU / GovCon Giants.
Your job: pull ALL Fireflies meeting data + Gmail email history, filter and analyze it, return structured JSON.

TEAM EMAILS (exclude these people from the client list — they are internal staff):
${[...TEAM_EMAILS].join(', ')}

RULES:
1. Pull ALL meetings from Fireflies (paginate through all pages, not just first 50)
2. Only include meetings that have at least one EXTERNAL (non-team) participant  
3. For each unique external client contact across all meetings:
   - Find ALL their meetings (not just the most recent)
   - Find their most recent Gmail communication
   - Pull action items from the most recent meeting that had a summary
4. For insights, analyze the FULL dataset across all meetings
5. Status: Hot = contacted ≤7 days ago, Warm = 8–21 days, Cold = 22+ days

Return ONLY valid JSON with this exact shape (no markdown, no explanation):

{
  "clients": [
    {
      "id": "unique-slug",
      "name": "Full Name",
      "email": "email@example.com",
      "company": "Company if known",
      "meetingCount": 3,
      "meetings": [
        {
          "date": "YYYY-MM-DD",
          "title": "Meeting Title",
          "duration": 45,
          "hasSummary": true
        }
      ],
      "lastMeetingDate": "YYYY-MM-DD",
      "lastMeetingTitle": "Title",
      "lastMeetingType": "Discovery Call | Opportunity Meeting | Coaching | Follow Up | Other",
      "lastContactDate": "YYYY-MM-DD",
      "lastEmailSubject": "Subject",
      "lastEmailDirection": "Sent | Received | None",
      "theirActionSteps": ["step 1", "step 2"],
      "ourActionSteps": ["step 1", "step 2"],
      "status": "Hot | Warm | Cold",
      "daysSinceContact": 5,
      "tags": ["Discovery", "Active Client", "Follow-Up Needed", "Proposal Sent", "Coaching"]
    }
  ],
  "insights": {
    "totalMeetings": 150,
    "totalClients": 45,
    "totalClientMeetings": 90,
    "hotLeads": 8,
    "warmLeads": 15,
    "coldLeads": 22,
    "meetingsByType": {
      "Discovery Call": 60,
      "Opportunity Meeting": 20,
      "Coaching": 15,
      "Follow Up": 10,
      "Other": 5
    },
    "avgMeetingsPerClient": 2.1,
    "clientsNeedingFollowUp": ["Name1", "Name2"],
    "topEngagedClients": ["Name1", "Name2", "Name3"],
    "recentActivitySummary": "Brief narrative about overall pipeline health and recent trends",
    "weeklyMeetingTrend": [
      { "week": "Feb 16", "count": 8 },
      { "week": "Feb 23", "count": 12 }
    ]
  },
  "lastSynced": "ISO-timestamp"
}`

const USER_MSG = `Sync my full CRM data now:
1. Pull ALL meetings from my Fireflies account (paginate to get everything, not just 50)
2. Filter to only client meetings (exclude internal team-only meetings)
3. For each external client, find their Gmail email history
4. Compute all insights across the full dataset
5. Return the complete JSON`

// ── Main fetch function ─────────────────────────────────────────
export async function fetchCRMData() {
  if (!API_KEY) throw new Error('MISSING_KEY')

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'mcp-client-2025-04-04',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000,
      system: SYSTEM,
      messages: [{ role: 'user', content: USER_MSG }],
      mcp_servers: [
        { type: 'url', url: 'https://api.fireflies.ai/mcp',        name: 'fireflies' },
        { type: 'url', url: 'https://gmail.mcp.claude.com/mcp',    name: 'gmail'     },
      ],
    }),
  })

  if (!res.ok) {
    const e = await res.json().catch(() => ({}))
    throw new Error(e.error?.message || `HTTP ${res.status}`)
  }

  const data = await res.json()
  const text = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || ''
  if (!text) throw new Error('No response from Claude')

  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
