// Mindy Re-Ignite — code-driven 5-email drip over the GHL marketing rail.
//
// WHY code, not a GHL Workflow: GHL's API can't build Workflows (UI-only).
// This runner IS the automation — a tag-based state machine you run daily
// (cron or by hand). It's idempotent + resumable: each contact carries a
// stage tag, and a run advances them exactly one step.
//
// Audience: tag `mindy-profile-incomplete` (alumni location AMkIivLuREYwsX5GhAAL).
// Auto-exit: a contact who completes their profile loses `mindy-profile-incomplete`
//   (Mindy's tag-sync swaps it for `mindy-configured`) -> they drop out of every
//   subsequent stage automatically. We re-check the tag before each send.
//
// State machine (GHL tags, all prefixed reignite-):
//   (no tag) --d0--> reignite-d0 --(wait 2d)--> reignite-d2 --> reignite-d4
//   --> reignite-d6 --> reignite-d8 --(after d8)--> reignite-done
//   Completed mid-drip -> reignite-exited (we stop emailing them).
//
// Usage:
//   GHL_API_KEY=pit-... node scripts/mindy-reignite-drip.mjs --dry           # show what each stage would do, send nothing
//   GHL_API_KEY=pit-... node scripts/mindy-reignite-drip.mjs --test=you@email # send the FULL 5 to one test address, ignoring delays
//   GHL_API_KEY=pit-... node scripts/mindy-reignite-drip.mjs --seed --limit=50 # enroll first 50 (tag reignite-d0 + send email 1)
//   GHL_API_KEY=pit-... node scripts/mindy-reignite-drip.mjs --send          # advance every contact due for their next stage
//
// Flags:
//   --dry            don't send/tag; print plan
//   --seed           enrollment pass: tag+send stage 1 to NEW contacts (those with mindy-profile-incomplete and NO reignite-* tag)
//   --send           advancement pass: move already-enrolled contacts to their next due stage
//   --limit=N        cap how many contacts processed this run (default no cap on --send; required-ish for --seed ramp)
//   --test=email     send all 5 emails to one address now (smoke test of copy/rendering); no tagging
//
// Env: GHL_API_KEY (PIT, alumni location), GHL_LOCATION_ID (default alumni),
//      MINDY_PROFILE_URL (the profile-completion link), DRIP_FROM_NAME (optional).
import dotenv from 'dotenv';
import { STAGES, renderStage } from '../src/lib/mindy-reignite-emails.mjs';
dotenv.config({ path: '.env.local' });

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const TOKEN = (process.env.GHL_API_KEY || '').trim();
const LOCATION = (process.env.GHL_LOCATION_ID || 'AMkIivLuREYwsX5GhAAL').trim();
const PROFILE_URL = (process.env.MINDY_PROFILE_URL || '').trim();
const FROM_NAME = (process.env.DRIP_FROM_NAME || 'Eric Coffie').trim();

const AUDIENCE_TAG = 'mindy-profile-incomplete';
const STAGE_TAGS = STAGES.map((s) => `reignite-${s.key}`); // reignite-d0..d8
const DONE_TAG = 'reignite-done';
const TEST_RE = /\+|@example\.com$|(^|\b)(test|email-test)\b/i;

const DRY = process.argv.includes('--dry');
const SEED = process.argv.includes('--seed');
const SEND = process.argv.includes('--send');
const TEST = process.argv.find((a) => a.startsWith('--test='))?.split('=')[1];
const LIMIT = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1]) || 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function headers() {
  return { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', Version: GHL_VERSION };
}

async function ghl(method, path, body) {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${method} ${path}: ${text.slice(0, 200)}`);
  return json;
}

// One page of the tag search, with a bounded retry. GHL's /contacts/search
// intermittently returns a transient 400 ("Error occurred while searching for
// contact") or a 429/5xx under load — a single blip mid-pagination must NOT
// abort a full drain. Retry the SAME page up to 4x with exponential backoff;
// only give up (throw) if it keeps failing. Non-transient auth errors (401/403)
// fail fast — no point retrying a bad token.
async function searchPage(tag, page) {
  const body = {
    locationId: LOCATION,
    page,
    pageLimit: 100,
    filters: [{ field: 'tags', operator: 'contains', value: tag }],
  };
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      return await ghl('POST', '/contacts/search', body);
    } catch (e) {
      lastErr = e;
      const m = /HTTP (\d{3})/.exec(e.message);
      const code = m ? Number(m[1]) : 0;
      if (code === 401 || code === 403) throw e; // auth: retrying won't help
      const wait = 500 * 2 ** (attempt - 1); // 0.5s, 1s, 2s, 4s
      console.error(`  search page ${page} attempt ${attempt} failed (${code || 'net'}) — retrying in ${wait}ms`);
      await sleep(wait);
    }
  }
  throw new Error(`search page ${page} for "${tag}" failed after 4 attempts: ${lastErr?.message}`);
}

// Page through ALL contacts carrying a tag (search API caps at 100/page).
async function pullByTag(tag, cap = 0) {
  const out = [];
  let page = 1;
  while (true) {
    const data = await searchPage(tag, page);
    const batch = data.contacts || [];
    out.push(...batch);
    if (batch.length < 100) break;
    if (cap && out.length >= cap) break;
    page++;
    await sleep(150); // be gentle with the search API
  }
  return cap ? out.slice(0, cap) : out;
}

function firstNameOf(c) {
  return (c.firstName || c.firstNameLowerCase || (c.contactName || '').split(/\s+/)[0] || (c.name || '').split(/\s+/)[0] || '').trim();
}

// Is this contact safe + eligible to email right now?
function eligible(c) {
  const email = (c.email || '').toLowerCase().trim();
  if (!email || TEST_RE.test(email)) return false;
  if (c.dnd === true) return false;
  // GHL stores per-channel DND under dndSettings; treat email DND as a hard skip.
  if (c.dndSettings?.Email?.status === 'active') return false;
  const tags = (c.tags || []).map((t) => String(t).toLowerCase());
  if (tags.includes('unsubscribed') || tags.includes('do-not-email')) return false;
  // Auto-exit: must STILL be profile-incomplete (completers lose this tag).
  if (!tags.includes(AUDIENCE_TAG)) return false;
  return true;
}

async function sendStage(contact, stageIdx) {
  const stage = STAGES[stageIdx];
  const { subject, html } = renderStage(stage, firstNameOf(contact), PROFILE_URL);
  if (DRY) return { dry: true };
  return ghl('POST', '/conversations/messages', {
    type: 'Email',
    contactId: contact.id,
    locationId: LOCATION,
    subject,
    html,
    emailFrom: FROM_NAME,
  });
}

async function addTag(contactId, tag) {
  if (DRY) return;
  await ghl('POST', `/contacts/${contactId}/tags`, { tags: [tag] });
}
async function removeTag(contactId, tag) {
  if (DRY) return;
  await ghl('DELETE', `/contacts/${contactId}/tags`, { tags: [tag] });
}

function preflight() {
  const problems = [];
  if (!TOKEN || !TOKEN.startsWith('pit-')) problems.push('GHL_API_KEY missing or not a pit- token');
  if (!PROFILE_URL) problems.push('MINDY_PROFILE_URL not set (the profile-completion link) — emails would ship a broken CTA');
  if (!(DRY || SEED || SEND || TEST)) problems.push('Pick a mode: --dry | --seed | --send | --test=email');
  if (problems.length) {
    console.error('Preflight failed:\n - ' + problems.join('\n - '));
    process.exit(1);
  }
}

// ---- TEST: send all 5 to one address (no tagging, ignores delays) ----
async function runTest() {
  console.log(`TEST -> sending all ${STAGES.length} emails to ${TEST} (location ${LOCATION})`);
  // Find or skip: we need a contactId to send via GHL conversations.
  const data = await ghl('POST', '/contacts/search', { locationId: LOCATION, pageLimit: 5, query: TEST });
  const want = TEST.toLowerCase().trim();
  const match = (data.contacts || []).find((c) => (c.email || '').toLowerCase().trim() === want);
  if (!match) {
    console.error(`No GHL contact with email ${TEST} in location ${LOCATION}. GHL sends are contact-scoped — add the contact first.`);
    process.exit(1);
  }
  for (let i = 0; i < STAGES.length; i++) {
    const { subject } = renderStage(STAGES[i], firstNameOf(match) || 'there', PROFILE_URL);
    if (DRY) { console.log(`  [dry] stage ${STAGES[i].key}: "${subject}"`); continue; }
    await sendStage(match, i);
    console.log(`  sent stage ${STAGES[i].key}: "${subject}"`);
    await sleep(400);
  }
  console.log('TEST done.');
}

// ---- SEED: enroll NEW contacts into stage 1 ----
async function runSeed() {
  const audience = await pullByTag(AUDIENCE_TAG, LIMIT ? LIMIT * 3 : 0); // overpull; many may already be enrolled
  const fresh = audience.filter((c) => {
    const tags = (c.tags || []).map((t) => String(t).toLowerCase());
    const alreadyInDrip = STAGE_TAGS.some((st) => tags.includes(st.toLowerCase())) || tags.includes(DONE_TAG);
    return eligible(c) && !alreadyInDrip;
  });
  const todo = LIMIT ? fresh.slice(0, LIMIT) : fresh;
  console.log(`SEED: audience ${audience.length} | eligible+new ${fresh.length} | enrolling ${todo.length}${DRY ? ' (DRY)' : ''}`);
  let sent = 0, failed = 0;
  for (const c of todo) {
    try {
      await sendStage(c, 0);
      await addTag(c.id, STAGE_TAGS[0]);
      sent++;
    } catch (e) { failed++; console.error(`  fail ${c.email}: ${e.message}`); }
    await sleep(200);
    if ((sent + failed) % 25 === 0) console.log(`  progress ${sent + failed}/${todo.length}`);
  }
  console.log(`SEED done — enrolled ${sent}, failed ${failed}`);
}

// ---- SEND: advance enrolled contacts to their next due stage ----
async function runSend() {
  // Walk stages from the LAST inbound (d6->d8) backward so a contact can't be
  // advanced twice in one run. For stage i (i>=1) we look at contacts tagged
  // reignite-<stage i-1>, due by delay, still eligible -> send stage i.
  let advanced = 0, exited = 0, finished = 0, skipped = 0;
  for (let i = STAGES.length - 1; i >= 1; i--) {
    const prevTag = STAGE_TAGS[i - 1];
    const thisStage = STAGES[i];
    const cohort = await pullByTag(prevTag, 0);
    const due = LIMIT ? cohort.slice(0, LIMIT) : cohort;
    console.log(`SEND stage ${thisStage.key} (from ${prevTag}): cohort ${cohort.length}`);
    for (const c of due) {
      // NOTE: delay enforcement is by run cadence — run this daily and each
      // contact advances one stage/run. (GHL search doesn't expose per-tag
      // application time cheaply; the daily-run cadence IS the 2-day spacing
      // when you run every other day, or 1/day if you run daily. See README.)
      if (!eligible(c)) {
        // No longer eligible: either completed (auto-exit) or unsub/DND.
        const tags = (c.tags || []).map((t) => String(t).toLowerCase());
        if (!tags.includes(AUDIENCE_TAG)) {
          await removeTag(c.id, prevTag);
          await addTag(c.id, 'reignite-exited');
          exited++;
        } else { skipped++; }
        continue;
      }
      try {
        await sendStage(c, i);
        await addTag(c.id, STAGE_TAGS[i]);
        await removeTag(c.id, prevTag);
        advanced++;
      } catch (e) { console.error(`  fail ${c.email}: ${e.message}`); }
      await sleep(200);
    }
  }
  // Retire contacts who finished the last stage (d8 -> done).
  const lastTag = STAGE_TAGS[STAGE_TAGS.length - 1];
  const finishers = await pullByTag(lastTag, 0);
  for (const c of finishers) {
    await addTag(c.id, DONE_TAG);
    await removeTag(c.id, lastTag);
    finished++;
  }
  console.log(`SEND done — advanced ${advanced}, exited(completed) ${exited}, retired ${finished}, skipped ${skipped}`);
}

async function main() {
  preflight();
  console.log(`Mindy re-ignite drip | location ${LOCATION} | profileUrl ${PROFILE_URL || '(MISSING)'} | ${DRY ? 'DRY ' : ''}${SEED ? 'SEED ' : ''}${SEND ? 'SEND ' : ''}${TEST ? 'TEST' : ''}`);
  if (TEST) return runTest();
  if (SEED) return runSeed();
  if (SEND) return runSend();
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
