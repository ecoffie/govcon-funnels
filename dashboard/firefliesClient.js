/**
 * Fireflies hybrid connector:
 * - Primary: Fireflies GraphQL API
 * - Fallback: Fireflies MCP tool endpoint (JSON-RPC style)
 */

const FIREFLIES_GRAPHQL_URL = process.env.FIREFLIES_GRAPHQL_URL || 'https://api.fireflies.ai/graphql';
const FIREFLIES_MCP_URL = process.env.FIREFLIES_MCP_URL || 'https://api.fireflies.ai/mcp';
const FIREFLIES_API_KEY = process.env.FIREFLIES_API_KEY || '';

function toIsoDate(value) {
  const d = new Date(value || '');
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

function normalizeParticipants(participants) {
  if (!Array.isArray(participants)) return [];
  return participants
    .map((p) => {
      if (typeof p === 'string') return p.trim();
      if (p && typeof p === 'object') {
        return String(p.name || p.full_name || p.email || p.user_name || '').trim();
      }
      return '';
    })
    .filter(Boolean);
}

function authHeaders() {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (FIREFLIES_API_KEY) {
    headers.Authorization = `Bearer ${FIREFLIES_API_KEY}`;
    headers['x-api-key'] = FIREFLIES_API_KEY;
  }
  return headers;
}

function normalizeMeeting(raw, source = 'api') {
  const id = raw.id || raw.transcriptId || raw.meetingId || '';
  const title = raw.title || raw.name || 'Untitled Meeting';
  const date = toIsoDate(raw.dateString || raw.date || raw.meetingDate || raw.createdAt || raw.start_time);
  const participants = normalizeParticipants(raw.participants || raw.fireflies_users || raw.workspace_users || raw.attendees || []);

  // Fireflies payloads may use `sentence`, `sentences`, or nested transcript blocks.
  const sentenceCandidates = raw.sentences || raw.sentence || raw.transcript?.sentences || raw.transcript?.sentence || [];
  const sentences = Array.isArray(sentenceCandidates)
    ? sentenceCandidates.map((s) => ({
        speaker: s.speaker_name || s.speaker || s.speakerName || 'Unknown',
        timestamp: s.start_time || s.timestamp || '',
        text: s.raw_text || s.text || s.content || '',
      }))
    : [];

  // Summary field: Fireflies may return it as summary, meeting_summary, or nested.
  const summary = raw.summary || raw.meeting_summary || raw.transcript?.summary || '';

  return {
    id,
    title,
    date,
    dateTime: raw.dateString || raw.date || raw.meetingDate || null,
    participants,
    durationMinutes: raw.duration || null,
    sentences,
    summary,
    source,
  };
}

async function callFirefliesGraphQL(query, variables = {}) {
  const res = await fetch(FIREFLIES_GRAPHQL_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`Fireflies API error ${res.status}`);
  }
  const data = await res.json();
  if (data.errors?.length) {
    throw new Error(data.errors[0].message || 'Fireflies GraphQL error');
  }
  return data.data;
}

async function callMcpTool(name, args = {}) {
  const payload = {
    jsonrpc: '2.0',
    id: `${Date.now()}`,
    method: 'tools/call',
    params: { name, arguments: args },
  };
  const res = await fetch(FIREFLIES_MCP_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Fireflies MCP error ${res.status}`);
  }
  const out = await res.json();
  if (out.error) throw new Error(out.error.message || 'Fireflies MCP call failed');
  return out.result || {};
}

export async function fetchMeetingsFromFirefliesApi({ fromDate, toDate, limit = 50, skip = 0 } = {}) {
  const query = `
    query Transcripts($fromDate: String, $toDate: String, $limit: Int, $skip: Int) {
      transcripts(fromDate: $fromDate, toDate: $toDate, limit: $limit, skip: $skip) {
        id
        title
        dateString
        participants
        duration
        summary
        sentence {
          speaker_name
          start_time
          raw_text
        }
      }
    }
  `;

  const data = await callFirefliesGraphQL(query, { fromDate, toDate, limit, skip });
  const items = Array.isArray(data?.transcripts) ? data.transcripts : [];
  return items.map((m) => normalizeMeeting(m, 'api')).filter((m) => m.id);
}

export async function fetchMeetingsFromFirefliesMcp({ fromDate, toDate, limit = 50, skip = 0 } = {}) {
  // 1) fetch list 2) optionally fetch complete details for each id
  const listResult = await callMcpTool('fireflies_get_transcripts', {
    fromDate,
    toDate,
    limit,
    skip,
    format: 'json',
  });

  const list = Array.isArray(listResult?.transcripts)
    ? listResult.transcripts
    : Array.isArray(listResult?.items)
      ? listResult.items
      : Array.isArray(listResult)
        ? listResult
        : [];

  const normalized = [];
  for (const item of list) {
    const id = item.id || item.transcriptId;
    if (!id) continue;
    try {
      const full = await callMcpTool('fireflies_fetch', { id });
      normalized.push(normalizeMeeting(full, 'mcp'));
    } catch {
      normalized.push(normalizeMeeting(item, 'mcp'));
    }
  }
  return normalized.filter((m) => m.id);
}

export async function fetchMeetingsHybrid(opts = {}) {
  try {
    const meetings = await fetchMeetingsFromFirefliesApi(opts);
    return { source: 'api', meetings };
  } catch (apiErr) {
    const meetings = await fetchMeetingsFromFirefliesMcp(opts);
    return { source: 'mcp', meetings, apiError: apiErr.message };
  }
}
