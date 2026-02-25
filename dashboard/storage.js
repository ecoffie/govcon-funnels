import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, 'data', 'fireflies_store.json');

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
  sync_state: {
    last_sync_at: null,
    source: null,
    last_error: null,
    total_transcripts: 0,
    total_leads: 0,
  },
};

async function ensureStore() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), 'utf8');
  }
}

export async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return structuredClone(DEFAULT_STORE);
  }
}

export async function writeStore(store) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
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
