import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, 'data', 'fireflies_store.json');
const REDIS_KEY = 'mid:store';

const DEFAULT_STORE = {
  transcripts: [],
  lead_pipeline: [],
  google_calendar: {
    connected: false,
    token: null,
    refresh_token: null,
    token_expires_at: null,
    events: [],
    last_sync_at: null,
    last_error: null,
  },
  google_gmail: {
    connected: false,
    last_sync_at: null,
    last_error: null,
    messages: [],
  },
  sync_state: {
    last_sync_at: null,
    source: null,
    last_error: null,
    total_transcripts: 0,
    total_leads: 0,
  },
};

// --- Redis backend (Upstash REST API) ---

async function redisCmd(...args) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

async function redisReadStore() {
  const raw = await redisCmd('GET', REDIS_KEY);
  if (!raw) return structuredClone(DEFAULT_STORE);
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return { ...structuredClone(DEFAULT_STORE), ...parsed };
  } catch {
    return structuredClone(DEFAULT_STORE);
  }
}

async function redisWriteStore(store) {
  await redisCmd('SET', REDIS_KEY, JSON.stringify(store));
}

// --- Filesystem backend ---

async function ensureStore() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), 'utf8');
  }
}

async function fsReadStore() {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return structuredClone(DEFAULT_STORE);
  }
}

async function fsWriteStore(store) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

// --- Public API (auto-selects backend) ---

const useRedis = () => !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export function getStorageMode() {
  return useRedis() ? 'redis' : 'filesystem';
}

export async function readStore() {
  return useRedis() ? redisReadStore() : fsReadStore();
}

export async function writeStore(store) {
  return useRedis() ? redisWriteStore(store) : fsWriteStore(store);
}

export async function upsertTranscripts(meetings, source) {
  const store = await readStore();
  const byId = new Map(store.transcripts.map((t) => [t.id, t]));
  for (const m of meetings) {
    const prev = byId.get(m.id);
    byId.set(m.id, { ...prev, ...m, source, updated_at: new Date().toISOString() });
  }
  store.transcripts = [...byId.values()].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  store.sync_state.total_transcripts = store.transcripts.length;
  return store;
}

export async function savePipeline(leads) {
  const store = await readStore();
  const byPrevId = new Map(store.lead_pipeline.map((l) => [l.lead_id, l]));
  const outreachFields = [
    'last_contacted_at',
    'last_contact_method',
    'outreach_status',
    'owner',
    'notes',
    'next_follow_up_at',
    'upcoming_call_at',
    'upcoming_call_name',
    'last_meeting_at',
    'calendar_match_count',
    'last_email_at',
    'last_email_subject',
    'gmail_match_count',
    'last_contact_at',
  ];
  store.lead_pipeline = leads.map((lead) => {
    const prev = byPrevId.get(lead.lead_id);
    if (!prev) return lead;
    const preserved = {};
    for (const field of outreachFields) {
      if (prev[field] !== undefined) preserved[field] = prev[field];
    }
    return { ...lead, ...preserved };
  });
  store.sync_state.total_leads = leads.length;
  return store;
}

export async function updateSyncState(patch = {}) {
  const store = await readStore();
  store.sync_state = { ...store.sync_state, ...patch };
  return store;
}

export { STORE_PATH };
