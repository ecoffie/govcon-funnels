/**
 * Thin backend: proxies transcript analysis requests to Anthropic API.
 * Set env ANTHROPIC_API_KEY. Optional: PORT (default 3001).
 * Endpoints:
 *   POST /api/analyze  body: { type, transcripts[], options?: { stream?: boolean } }
 *   POST /api/analyze-stream  body: { type, transcripts[] }  -> SSE stream
 */

import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import crypto from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { fetchMeetingsHybrid } from './firefliesClient.js';
import {
  readStore,
  writeStore,
  upsertTranscripts,
  savePipeline,
  updateSyncState,
} from './storage.js';
import { scoreLeadsFromTranscripts, summarizeLeads } from './leadRules.js';

const app = express();
app.use(cors());
// Allow larger payloads when sending full transcripts (all pages) for analysis
app.use(
  express.json({
    limit: '10mb',
    verify: (req, _res, buf) => {
      req.rawBody = Buffer.from(buf);
    },
  })
);

const PORT = process.env.PORT || 3001;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const FIRELIES_SYNC_INTERVAL_MINUTES = Number(process.env.FIRELIES_SYNC_INTERVAL_MINUTES || 60);
const FIREFLIES_WEBHOOK_SECRET = process.env.FIREFLIES_WEBHOOK_SECRET || '';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/api/google/callback`;
const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

function verifyFirefliesSignature(req) {
  if (!FIREFLIES_WEBHOOK_SECRET) return { ok: true, mode: 'no-secret' };
  const sigHeader = req.get('x-fireflies-signature') || '';
  const ts = req.get('x-fireflies-timestamp') || '';
  if (!sigHeader) return { ok: false, reason: 'missing-signature' };

  const provided = sigHeader.replace(/^sha256=/i, '').trim();
  const raw = req.rawBody || Buffer.from(JSON.stringify(req.body || {}), 'utf8');

  // Support two common signing strategies:
  // 1) HMAC(secret, rawBody)
  // 2) HMAC(secret, `${timestamp}.${rawBody}`)
  const digestBodyOnly = crypto.createHmac('sha256', FIREFLIES_WEBHOOK_SECRET).update(raw).digest('hex');
  const digestWithTs = crypto
    .createHmac('sha256', FIREFLIES_WEBHOOK_SECRET)
    .update(ts ? `${ts}.` : '')
    .update(raw)
    .digest('hex');

  const a = Buffer.from(provided, 'hex');
  const b = Buffer.from(digestBodyOnly, 'hex');
  const c = Buffer.from(digestWithTs, 'hex');

  const valid =
    (a.length === b.length && crypto.timingSafeEqual(a, b)) ||
    (a.length === c.length && crypto.timingSafeEqual(a, c));

  return valid ? { ok: true, mode: 'verified' } : { ok: false, reason: 'invalid-signature' };
}

function buildSystemPrompt(type) {
  const base = `You are an expert meeting analyst. You receive meeting transcript data as JSON: each transcript has id, title, date, participants, and sentences (array of { speaker, timestamp, text }). Respond in valid JSON only unless the type is summary or stream.`;
  const prompts = {
    commitments: `${base} Extract all commitments, action items, and deadlines. Return JSON: { "items": [ { "who": string, "what": string, "deadline": string | null, "meetingId": string, "meetingTitle": string, "excerpt": string } ] }.`,
    decisions: `${base} Extract all decisions made. Return JSON: { "items": [ { "decision": string, "who": string, "context": string, "meetingId": string, "meetingTitle": string } ] }.`,
    summary: `${base} Write a concise executive summary (2-4 paragraphs). Use plain text, no JSON.`,
    topics: `${base} Identify recurring themes/topics across the meetings. Return JSON: { "topics": [ { "name": string, "count": number, "meetingIds": string[] } ] }.`,
    sentiment: `${base} For each meeting give an overall sentiment. Return JSON: { "meetings": [ { "meetingId": string, "title": string, "sentiment": "positive"|"neutral"|"negative", "summary": string } ] }.`,
    risks: `${base} Extract risks, blockers, and concerns. Return JSON: { "items": [ { "type": "risk"|"blocker"|"concern", "description": string, "meetingId": string, "meetingTitle": string } ] }.`,
    search: `${base} Answer the user's natural language question using only the provided transcript text. Be concise. Use plain text.`,
    notice: `${base} List 3-5 surprising or non-obvious patterns, insights, or recommendations that a human might miss. Use plain text, brief bullets.`,
    tags: `${base} Assign 2-5 discussion topic tags to each meeting based on its content. Return JSON: { "meetings": [ { "meetingId": string, "title": string, "tags": ["tag1", "tag2"] } ] }. Use short, descriptive tags (e.g. "Discovery", "Govcon", "Pricing", "Timeline").`,
    phrases: `${base} Extract the most frequently repeated PHRASES (2-5 word sequences) and significant single WORDS across all transcripts. Exclude generic stopwords (the, a, is, etc). Return JSON: { "phrases": [ { "text": string, "count": number } ], "words": [ { "word": string, "count": number } ] }. Sort by count descending. Return top 20 phrases and top 20 words.`,
    customer: `${base} These transcripts are govcon/federal-contract discovery and assessment calls. Extract: (1) Top pain points customers mention about doing federal contracts. (2) Top reasons prospects come to this company. (3) High-level customer insights. Return JSON: { "painPoints": [ { "description": string, "count": number } ], "reasonsForComing": [ { "reason": string, "count": number } ], "customerInsights": [ "insight1", "insight2", ... ] }. Sort pain points and reasons by count descending.`,
    lead_intent: `${base} These are govcon discovery/assessment calls. Classify each meeting as: "high_ticket" if the prospect agreed to or asked to schedule a second/follow-up/strategy call (indicating interest in the ~$5,997 offer); "low_ticket" if they only want the $99/mo plan or $997 program without scheduling a second call; "no_ticket" if no buying signal. Use BOTH the transcript sentences AND the meeting summary to determine intent. Return JSON: { "items": [ { "meetingId": string, "leadType": "high_ticket"|"low_ticket"|"no_ticket", "confidence": "low"|"medium"|"high", "reason": string, "scheduledSecondCall": boolean } ] }.`,
    lead_objections: `${base} Extract top lead objections and blockers. Return JSON: { "items": [ { "meetingId": string, "objection": string, "severity": "low"|"medium"|"high" } ] }.`,
    lead_budget_signals: `${base} Extract budget/pricing readiness signals. Return JSON: { "items": [ { "meetingId": string, "signal": string, "amount": string | null, "confidence": "low"|"medium"|"high" } ] }.`,
    next_best_action: `${base} Recommend next best action per meeting. Return JSON: { "items": [ { "meetingId": string, "action": string, "owner": string, "priority": "low"|"medium"|"high" } ] }.`,
  };
  return prompts[type] || base;
}

function transcriptToContext(transcripts) {
  return transcripts.map((t) => ({
    id: t.id,
    title: t.title,
    date: t.date,
    participants: t.participants,
    summary: t.summary || '',
    sentences: t.sentences,
  }));
}

function buildLeadFallback(type, transcripts = []) {
  const items = transcripts.map((t) => ({
    meetingId: t.id,
    title: t.title || t.id,
    confidence: 'low',
  }));
  if (type === 'lead_intent') {
    return {
      items: items.map((i) => ({
        meetingId: i.meetingId,
        leadType: 'beginner',
        confidence: i.confidence,
        reason: 'AI unavailable: using rules-based pipeline.',
      })),
      fallback: true,
    };
  }
  if (type === 'lead_objections') {
    return {
      items: items.map((i) => ({
        meetingId: i.meetingId,
        objection: 'AI unavailable: review transcript for objections.',
        severity: 'low',
      })),
      fallback: true,
    };
  }
  if (type === 'lead_budget_signals') {
    return {
      items: items.map((i) => ({
        meetingId: i.meetingId,
        signal: 'AI unavailable: inspect pricing/budget mentions manually.',
        amount: null,
        confidence: 'low',
      })),
      fallback: true,
    };
  }
  if (type === 'next_best_action') {
    return {
      items: items.map((i) => ({
        meetingId: i.meetingId,
        action: 'Send follow-up email with next meeting CTA.',
        owner: 'Sales',
        priority: 'medium',
      })),
      fallback: true,
    };
  }
  return null;
}

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function filterLeads(leads, query) {
  return leads.filter((l) => {
    if (query.leadType && l.lead_type !== query.leadType) return false;
    if (query.ticketType && l.lead_type !== query.ticketType) return false;
    if (query.stage && l.stage !== query.stage) return false;
    if (query.confidence && l.confidence !== query.confidence) return false;
    if (query.source && l.source !== query.source) return false;
    if (query.minScore && Number(l.score) < Number(query.minScore)) return false;
    if (query.startDate) {
      const d = parseDate(l.date);
      const start = parseDate(query.startDate);
      if (d && start && d < start) return false;
    }
    if (query.endDate) {
      const d = parseDate(l.date);
      const end = parseDate(query.endDate);
      if (d && end && d > end) return false;
    }
    if (query.q) {
      const quoteText = (l.evidence_quotes || [])
        .map((q) => (typeof q === 'string' ? q : q?.quote || ''))
        .join(' ');
      const hay = `${l.name || ''} ${l.company || ''} ${(l.reason_codes || []).join(' ')} ${quoteText}`.toLowerCase();
      if (!hay.includes(String(query.q).toLowerCase())) return false;
    }
    if (query.outreachStatus && (l.outreach_status || '') !== query.outreachStatus) return false;
    if (query.upcomingOnly === '1' && !l.upcoming_call_at) return false;
    if (query.needsFollowUp === '1' && !l.next_follow_up_at) return false;
    if (query.noOutreachLogged === '1' && l.last_contacted_at) return false;
    return true;
  });
}

function mergeCalendarIntoLeads(leads = [], events = []) {
  const now = Date.now();
  return leads.map((lead) => {
    const nameNeedle = String(lead.call_name || lead.name || '').toLowerCase().trim();
    if (!nameNeedle) return lead;
    const matched = events
      .filter((ev) => String(ev.summary || '').toLowerCase().includes(nameNeedle))
      .sort((a, b) => String(a.start || '').localeCompare(String(b.start || '')));
    const upcoming = matched.find((ev) => new Date(ev.start || 0).getTime() >= now);
    const past = [...matched].reverse().find((ev) => new Date(ev.start || 0).getTime() < now);
    return {
      ...lead,
      upcoming_call_at: upcoming?.start || lead.upcoming_call_at || null,
      upcoming_call_name: upcoming?.summary || lead.upcoming_call_name || null,
      last_meeting_at: past?.start || lead.last_meeting_at || null,
      calendar_match_count: matched.length,
    };
  });
}

async function refreshGoogleCalendarEvents(store) {
  if (!store.google_calendar?.token) return store;
  const token = store.google_calendar.token;
  const timeMin = new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString();
  const timeMax = new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString();
  const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
  url.searchParams.set('singleEvents', 'true');
  url.searchParams.set('orderBy', 'startTime');
  url.searchParams.set('timeMin', timeMin);
  url.searchParams.set('timeMax', timeMax);
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Google Calendar API error ${res.status}`);
  const data = await res.json();
  const events = Array.isArray(data.items)
    ? data.items.map((ev) => ({
        id: ev.id,
        summary: ev.summary || '',
        start: ev.start?.dateTime || ev.start?.date || '',
        end: ev.end?.dateTime || ev.end?.date || '',
      }))
    : [];
  store.google_calendar.events = events;
  store.google_calendar.last_sync_at = new Date().toISOString();
  store.google_calendar.last_error = null;
  store.lead_pipeline = mergeCalendarIntoLeads(store.lead_pipeline, events);
  return store;
}

async function performSync(opts = {}) {
  const nowIso = new Date().toISOString();
  const { source, meetings, apiError } = await fetchMeetingsHybrid(opts);

  let store = await upsertTranscripts(meetings, source);
  const leads = scoreLeadsFromTranscripts(store.transcripts);
  store = await savePipeline(leads);
  if (store.google_calendar?.connected && store.google_calendar?.token) {
    try {
      store = await refreshGoogleCalendarEvents(store);
    } catch (err) {
      store.google_calendar.last_error = err.message || 'Google Calendar sync failed';
    }
  }
  store.sync_state = {
    ...store.sync_state,
    last_sync_at: nowIso,
    source,
    last_error: apiError || null,
    total_transcripts: store.transcripts.length,
    total_leads: leads.length,
  };
  await writeStore(store);
  return store;
}

app.get('/api/fireflies/status', async (_req, res) => {
  try {
    const store = await readStore();
    return res.json({
      sync_state: store.sync_state,
      counts: {
        transcripts: store.transcripts.length,
        leads: store.lead_pipeline.length,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to load sync status' });
  }
});

app.post('/api/fireflies/webhook', async (req, res) => {
  try {
    const check = verifyFirefliesSignature(req);
    if (!check.ok) {
      return res.status(401).json({ error: `Webhook signature check failed: ${check.reason}` });
    }

    const event = req.body || {};
    const eventType =
      event.type ||
      event.event ||
      event.event_type ||
      event?.data?.type ||
      'unknown';

    // For transcript lifecycle events, run incremental sync.
    // We keep this safe/idempotent by relying on upsert behavior in storage.
    const shouldSync = /transcript|meeting|summary/i.test(String(eventType));
    if (shouldSync) {
      await performSync({ limit: 50, skip: 0 });
    }

    return res.json({
      ok: true,
      eventType,
      signatureMode: check.mode,
      synced: shouldSync,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Webhook handling failed' });
  }
});

app.post('/api/fireflies/sync', async (req, res) => {
  try {
    const { fromDate, toDate, limit = 50, skip = 0 } = req.body || {};
    const store = await performSync({ fromDate, toDate, limit, skip });
    return res.json({
      ok: true,
      sync_state: store.sync_state,
      counts: {
        transcripts: store.transcripts.length,
        leads: store.lead_pipeline.length,
      },
    });
  } catch (err) {
    const store = await updateSyncState({ last_error: err.message || 'Sync failed' });
    await writeStore(store);
    return res.status(500).json({ error: err.message || 'Sync failed' });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const store = await readStore();
    const leads = filterLeads(store.lead_pipeline, req.query);
    return res.json({ items: leads });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to fetch leads' });
  }
});

app.get('/api/leads/summary', async (req, res) => {
  try {
    const store = await readStore();
    const leads = filterLeads(store.lead_pipeline, req.query);
    return res.json(summarizeLeads(leads));
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to summarize leads' });
  }
});

app.patch('/api/leads/:leadId', async (req, res) => {
  try {
    const { leadId } = req.params;
    const allowed = [
      'last_contacted_at',
      'last_contact_method',
      'outreach_status',
      'owner',
      'notes',
      'next_follow_up_at',
    ];
    const store = await readStore();
    const idx = store.lead_pipeline.findIndex((l) => l.lead_id === leadId);
    if (idx < 0) return res.status(404).json({ error: 'Lead not found' });
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body || {}, key)) {
        store.lead_pipeline[idx][key] = req.body[key];
      }
    }
    await writeStore(store);
    return res.json({ item: store.lead_pipeline[idx] });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to update lead' });
  }
});

app.get('/api/google/auth-url', async (_req, res) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.status(500).json({ error: 'Google OAuth env vars missing' });
  }
  const state = Buffer.from(String(Date.now())).toString('base64url');
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', GOOGLE_REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', GOOGLE_CALENDAR_SCOPE);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');
  authUrl.searchParams.set('state', state);
  return res.json({ url: authUrl.toString(), state });
});

app.get('/api/google/callback', async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send('Missing code');
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(code),
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });
    if (!tokenRes.ok) throw new Error(`Google token exchange failed ${tokenRes.status}`);
    const tokenData = await tokenRes.json();
    const store = await readStore();
    store.google_calendar.connected = true;
    store.google_calendar.token = tokenData.access_token || null;
    store.google_calendar.refresh_token = tokenData.refresh_token || store.google_calendar.refresh_token || null;
    store.google_calendar.token_expires_at = tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString() : null;
    await writeStore(store);
    const appUrl = process.env.APP_URL || 'http://localhost:5173';
    res.redirect(`${appUrl}/?google_connected=1`);
  } catch (err) {
    res.status(500).send(err.message || 'Google callback failed');
  }
});

app.get('/api/google/status', async (_req, res) => {
  try {
    const store = await readStore();
    return res.json({
      connected: Boolean(store.google_calendar?.connected),
      last_sync_at: store.google_calendar?.last_sync_at || null,
      last_error: store.google_calendar?.last_error || null,
      events_count: Array.isArray(store.google_calendar?.events) ? store.google_calendar.events.length : 0,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to load Google status' });
  }
});

app.post('/api/google/sync', async (_req, res) => {
  try {
    const store = await readStore();
    if (!store.google_calendar?.connected || !store.google_calendar?.token) {
      return res.status(400).json({ error: 'Google Calendar not connected' });
    }
    const updated = await refreshGoogleCalendarEvents(store);
    await writeStore(updated);
    return res.json({
      ok: true,
      events_count: updated.google_calendar.events.length,
      last_sync_at: updated.google_calendar.last_sync_at,
    });
  } catch (err) {
    const store = await readStore();
    store.google_calendar.last_error = err.message || 'Google Calendar sync failed';
    await writeStore(store);
    return res.status(500).json({ error: err.message || 'Google Calendar sync failed' });
  }
});

app.post('/api/analyze', async (req, res) => {
  const { type, transcripts = [], options = {}, query } = req.body;
  if (!type || !Array.isArray(transcripts) || transcripts.length === 0) {
    return res.status(400).json({ error: 'type and transcripts[] required' });
  }
  if (!ANTHROPIC_API_KEY) {
    const fallback = buildLeadFallback(type, transcripts);
    if (fallback) return res.json(fallback);
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });
  }

  const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
  const context = transcriptToContext(transcripts);
  const stream = options.stream === true;

  let userContent = `Analyze these meeting transcripts:\n\n${JSON.stringify(context, null, 0)}`;
  if (query && type === 'search') userContent += `\n\nUser question: ${query}`;

  try {
    if (stream && ['summary', 'notice', 'search'].includes(type)) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      const streamResponse = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: buildSystemPrompt(type),
        messages: [{ role: 'user', content: userContent }],
        stream: true,
      });
      for await (const event of streamResponse) {
        if (event.type === 'content_block_delta' && event.delta?.text) {
          res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
        }
      }
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: buildSystemPrompt(type),
      messages: [{ role: 'user', content: userContent }],
    });
    const text = response.content?.[0]?.text ?? '';
    if (['commitments', 'decisions', 'topics', 'sentiment', 'risks', 'tags', 'phrases', 'customer', 'lead_intent', 'lead_objections', 'lead_budget_signals', 'next_best_action'].includes(type)) {
      try {
        const json = JSON.parse(text.replace(/^```json?\s*|\s*```$/g, '').trim());
        return res.json(json);
      } catch (_) {
        return res.json({ raw: text });
      }
    }
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Anthropic API error' });
  }
});

// Periodic sync — skipped in Vercel serverless (use manual /api/fireflies/sync instead)
if (FIRELIES_SYNC_INTERVAL_MINUTES > 0 && !process.env.VERCEL) {
  const ms = FIRELIES_SYNC_INTERVAL_MINUTES * 60 * 1000;
  setInterval(async () => {
    try {
      const store = await readStore();
      await performSync({
        fromDate: store.sync_state?.last_sync_at ? String(store.sync_state.last_sync_at).slice(0, 10) : undefined,
        limit: 50,
        skip: 0,
      });
      // eslint-disable-next-line no-console
      console.log(`[fireflies-sync] completed at ${new Date().toISOString()}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[fireflies-sync] failed', err.message || err);
    }
  }, ms);
}

// Serve built frontend in production — skipped on Vercel (Vercel serves dist/ as static)
if (!process.env.VERCEL) {
  const distPath = path.join(__dirname, 'dist');
  const { existsSync } = await import('node:fs');
  if (existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

// Export for Vercel serverless; only listen when running directly
export default app;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
}
