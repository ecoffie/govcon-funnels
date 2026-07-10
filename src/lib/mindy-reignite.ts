// Mindy Re-Ignite drip — shared engine used by BOTH the local CLI
// (scripts/mindy-reignite-drip.mjs) and the daily cron route
// (src/app/api/cron/mindy-reignite/route.ts).
//
// The drip is a tag-based state machine over GHL contacts:
//   (no tag) --seed--> reignite-d0 --(2d)--> reignite-d2 --> d4 --> d6 --> d8 --(2d)--> reignite-done
//   Completed the profile mid-drip -> reignite-exited (they lose mindy-profile-incomplete).
//
// 2-day spacing is enforced by a DATE STAMP tag applied alongside each stage
// tag: `reignite-<key>@<YYYY-MM-DD>`. A contact only advances once >=2 days have
// elapsed since their current stage stamp — so the cron can run DAILY and still
// respect the every-2-days cadence (and it's resumable / idempotent).
//
// Seeding follows a warm-up RAMP (protect sender reputation): small daily
// batches that step up over time, then steady until the audience is drained.

import { STAGES, renderStage } from './mindy-reignite-emails.mjs';
import { maskEmail } from './redact';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

export const AUDIENCE_TAG = 'mindy-profile-incomplete';
export const STAGE_KEYS = STAGES.map((s: { key: string }) => s.key); // ['d0','d2','d4','d6','d8']
export const STAGE_TAGS = STAGE_KEYS.map((k: string) => `reignite-${k}`);
export const DONE_TAG = 'reignite-done';
export const EXITED_TAG = 'reignite-exited';
const STAMP_PREFIX = 'reignite-stamp:'; // reignite-stamp:d0:2026-07-01
const TEST_RE = /\+|@example\.com$|(^|\b)(test|email-test)\b/i;

// Warm-up ramp: how many NEW contacts to seed on the Nth day of the campaign.
// Ramps 50→100→200→350→500→750→1000, then steady 1000/day until drained.
// The sender is already warmed (first 307 sent clean, 0 suppressions), so the
// tail steps up past 500 to drain the ~3,800 remaining in ~5 days instead of ~8,
// while keeping each step ≤2× the prior (reputation-safe).
const SEED_RAMP = [50, 100, 200, 350, 500, 750, 1000];
export function seedQuotaForDay(dayIndex: number): number {
  return SEED_RAMP[Math.min(dayIndex, SEED_RAMP.length - 1)];
}

const ADVANCE_AFTER_DAYS = 2;

export interface DripConfig {
  token: string;
  location: string;
  profileUrl: string;
  fromName?: string;
  dry?: boolean;
}

interface GhlContact {
  id: string;
  email?: string;
  firstName?: string;
  firstNameLowerCase?: string;
  contactName?: string;
  name?: string;
  dnd?: boolean;
  dndSettings?: { Email?: { status?: string } };
  tags?: string[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function headers(token: string) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Version: GHL_VERSION };
}

async function ghl(cfg: DripConfig, method: string, path: string, body?: unknown) {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method,
    headers: headers(cfg.token),
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json: Record<string, unknown>;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${method} ${path}: ${text.slice(0, 200)}`);
  return json;
}

// One page of the tag search, with a bounded retry. GHL's /contacts/search
// intermittently returns a transient 400/429/5xx under load; a single blip
// mid-pagination must not abort the whole cron tick. Retry the same page up to
// 4x with exponential backoff; auth errors (401/403) fail fast.
async function searchPage(cfg: DripConfig, tag: string, page: number): Promise<Record<string, unknown>> {
  const body = {
    locationId: cfg.location, page, pageLimit: 100,
    filters: [{ field: 'tags', operator: 'contains', value: tag }],
  };
  let lastErr: Error | undefined;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      return await ghl(cfg, 'POST', '/contacts/search', body);
    } catch (e) {
      lastErr = e as Error;
      const m = /HTTP (\d{3})/.exec(lastErr.message);
      const code = m ? Number(m[1]) : 0;
      if (code === 401 || code === 403) throw e;
      await sleep(500 * 2 ** (attempt - 1)); // 0.5s, 1s, 2s, 4s
    }
  }
  throw new Error(`search page ${page} for "${tag}" failed after 4 attempts: ${lastErr?.message}`);
}

async function pullByTag(cfg: DripConfig, tag: string, cap = 0): Promise<GhlContact[]> {
  const out: GhlContact[] = [];
  let page = 1;
  while (true) {
    const data = await searchPage(cfg, tag, page);
    const batch = (data.contacts || []) as GhlContact[];
    out.push(...batch);
    if (batch.length < 100) break;
    if (cap && out.length >= cap) break;
    page++;
    await sleep(150);
  }
  return cap ? out.slice(0, cap) : out;
}

function firstNameOf(c: GhlContact): string {
  return (c.firstName || c.firstNameLowerCase || (c.contactName || '').split(/\s+/)[0] || (c.name || '').split(/\s+/)[0] || '').trim();
}

// Safe + eligible to email right now?
function eligible(c: GhlContact): boolean {
  const email = (c.email || '').toLowerCase().trim();
  if (!email || TEST_RE.test(email)) return false;
  if (c.dnd === true) return false;
  if (c.dndSettings?.Email?.status === 'active') return false;
  const tags = (c.tags || []).map((t) => String(t).toLowerCase());
  if (tags.includes('unsubscribed') || tags.includes('do-not-email')) return false;
  if (!tags.includes(AUDIENCE_TAG)) return false; // completers auto-exit
  return true;
}

function lower(c: GhlContact): string[] {
  return (c.tags || []).map((t) => String(t).toLowerCase());
}
function stampFor(c: GhlContact, stageKey: string): string | null {
  const pre = `${STAMP_PREFIX}${stageKey}:`.toLowerCase();
  const hit = lower(c).find((t) => t.startsWith(pre));
  return hit ? hit.slice(pre.length) : null;
}
function daysSince(dateStr: string, now: Date): number {
  const then = new Date(dateStr + 'T00:00:00Z').getTime();
  return (now.getTime() - then) / 86400000;
}

async function sendStage(cfg: DripConfig, contact: GhlContact, stageIdx: number) {
  const stage = STAGES[stageIdx];
  const { subject, html } = renderStage(stage, firstNameOf(contact), cfg.profileUrl);
  if (cfg.dry) return { dry: true };
  return ghl(cfg, 'POST', '/conversations/messages', {
    type: 'Email', contactId: contact.id, locationId: cfg.location,
    subject, html, emailFrom: cfg.fromName || 'Eric Coffie',
  });
}
async function addTag(cfg: DripConfig, id: string, tag: string) { if (!cfg.dry) await ghl(cfg, 'POST', `/contacts/${id}/tags`, { tags: [tag] }); }
async function removeTag(cfg: DripConfig, id: string, tag: string) { if (!cfg.dry) await ghl(cfg, 'DELETE', `/contacts/${id}/tags`, { tags: [tag] }); }

// Enroll up to `limit` NEW contacts (mindy-profile-incomplete, no reignite tag) into stage 1.
export async function runSeed(cfg: DripConfig, limit: number, todayIso: string) {
  const audience = await pullByTag(cfg, AUDIENCE_TAG, limit ? limit * 3 : 0);
  const fresh = audience.filter((c) => {
    const tags = lower(c);
    const inDrip = STAGE_TAGS.some((st: string) => tags.includes(st.toLowerCase())) || tags.includes(DONE_TAG) || tags.includes(EXITED_TAG);
    return eligible(c) && !inDrip;
  });
  const todo = limit ? fresh.slice(0, limit) : fresh;
  let sent = 0, failed = 0;
  for (const c of todo) {
    try {
      await sendStage(cfg, c, 0);
      await addTag(cfg, c.id, STAGE_TAGS[0]);
      await addTag(cfg, c.id, `${STAMP_PREFIX}${STAGE_KEYS[0]}:${todayIso}`);
      sent++;
    } catch (e) { failed++; console.error(`  seed fail ${maskEmail(c.email)}: ${(e as Error).message}`); }
    await sleep(200);
  }
  return { audience: audience.length, eligibleNew: fresh.length, enrolled: sent, failed };
}

// Advance enrolled contacts to their next stage IF >=ADVANCE_AFTER_DAYS since their stamp.
export async function runSend(cfg: DripConfig, now: Date) {
  let advanced = 0, exited = 0, finished = 0, waiting = 0;
  for (let i = STAGES.length - 1; i >= 1; i--) {
    const prevTag = STAGE_TAGS[i - 1];
    const prevKey = STAGE_KEYS[i - 1];
    const cohort = await pullByTag(cfg, prevTag, 0);
    for (const c of cohort) {
      if (!eligible(c)) {
        if (!lower(c).includes(AUDIENCE_TAG)) { // completed profile -> exit
          await removeTag(cfg, c.id, prevTag);
          await addTag(cfg, c.id, EXITED_TAG);
          exited++;
        }
        continue;
      }
      const stamp = stampFor(c, prevKey);
      // Legacy contacts (seeded by the old CLI) have a stage tag but NO stamp.
      // Back-stamp them as "today" so they wait the full dwell instead of
      // advancing instantly on the first cron run.
      if (!stamp) {
        await addTag(cfg, c.id, `${STAMP_PREFIX}${prevKey}:${now.toISOString().slice(0, 10)}`);
        waiting++;
        continue;
      }
      if (daysSince(stamp, now) < ADVANCE_AFTER_DAYS) { waiting++; continue; } // not due yet
      try {
        await sendStage(cfg, c, i);
        await addTag(cfg, c.id, STAGE_TAGS[i]);
        await addTag(cfg, c.id, `${STAMP_PREFIX}${STAGE_KEYS[i]}:${now.toISOString().slice(0, 10)}`);
        await removeTag(cfg, c.id, prevTag);
        advanced++;
      } catch (e) { console.error(`  send fail ${maskEmail(c.email)}: ${(e as Error).message}`); }
      await sleep(200);
    }
  }
  // Retire finishers (last stage -> done), gated by the same 2-day dwell.
  const lastTag = STAGE_TAGS[STAGE_TAGS.length - 1];
  const lastKey = STAGE_KEYS[STAGE_KEYS.length - 1];
  const finishers = await pullByTag(cfg, lastTag, 0);
  for (const c of finishers) {
    const stamp = stampFor(c, lastKey);
    if (!stamp) { await addTag(cfg, c.id, `${STAMP_PREFIX}${lastKey}:${now.toISOString().slice(0, 10)}`); waiting++; continue; }
    if (daysSince(stamp, now) < ADVANCE_AFTER_DAYS) { waiting++; continue; }
    await addTag(cfg, c.id, DONE_TAG);
    await removeTag(cfg, c.id, lastTag);
    finished++;
  }
  return { advanced, exited, finished, waiting };
}
