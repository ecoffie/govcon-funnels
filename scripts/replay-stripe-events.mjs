#!/usr/bin/env node
/**
 * Replay Stripe webhook events that were never delivered.
 *
 * WHY THIS EXISTS
 * From 2026-08-14 to 2026-08-21 the webhook rejected 402 of 413 deliveries with
 * "Invalid Stripe signature". The secret was correct; the header PARSER dropped a
 * duplicate v1 key (fixed in #165). Stripe does not re-send events once it has given
 * up, so every purchase in that window is missing from the attribution store: no
 * savePurchase record, no Slack notification.
 *
 * WHAT IT DOES
 * Pulls the events from the Stripe Events API, re-signs each with the real webhook
 * secret, and POSTs to the LIVE endpoint — so replay runs the exact production code
 * path (verification, dedup, savePurchase, Slack) rather than a parallel one that could
 * drift.
 *
 * SAFETY
 *  - DRY RUN BY DEFAULT. Pass --go to actually send.
 *  - Idempotent twice over: it skips any event already marked processed in KV, and the
 *    route itself re-checks hasProcessedStripeEvent() before writing.
 *  - Sends serially with a small delay — this is a replay, not a load test, and Slack
 *    notifications fire per paid purchase.
 *  - Never widens the window silently: --since/--until are explicit and echoed.
 *
 * USAGE
 *   node scripts/replay-stripe-events.mjs                 # dry run, default window
 *   node scripts/replay-stripe-events.mjs --go            # actually replay
 *   node scripts/replay-stripe-events.mjs --paid-only --go
 *
 * ENV (all required for --go):
 *   STRIPE_SECRET_KEY        read the events
 *   STRIPE_WEBHOOK_SECRET    sign them so the endpoint accepts them
 *   REPLAY_ENDPOINT          defaults to the live funnels webhook
 *   STORAGE_KV_REST_API_URL / _TOKEN  (or KV_REST_API_*) to skip already-processed
 */
import crypto from 'crypto';

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1]; };

const GO = has('--go');
const PAID_ONLY = has('--paid-only');
const SINCE = val('--since', '2026-08-14T00:00:00Z');
const UNTIL = val('--until', new Date().toISOString());
const ENDPOINT = process.env.REPLAY_ENDPOINT || 'https://app.govcongiants.org/api/stripe/webhook';
const DELAY_MS = Number(val('--delay', '400'));

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const KV_URL = process.env.STORAGE_KV_REST_API_URL || process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.STORAGE_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN;

const TYPES = [
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
  'checkout.session.expired',
  'payment_intent.payment_failed',
];

function die(msg) { console.error(`✗ ${msg}`); process.exit(1); }
if (!STRIPE_KEY) die('STRIPE_SECRET_KEY is required');
if (GO && !WEBHOOK_SECRET) die('STRIPE_WEBHOOK_SECRET is required to sign replayed events');

/** Pull every matching event in the window (paginated). */
async function fetchEvents() {
  const since = Math.floor(new Date(SINCE).getTime() / 1000);
  const until = Math.floor(new Date(UNTIL).getTime() / 1000);
  let base = `https://api.stripe.com/v1/events?limit=100&created[gte]=${since}&created[lte]=${until}`;
  for (const t of TYPES) base += `&types[]=${encodeURIComponent(t)}`;
  const out = [];
  let cursor = null, pages = 0;
  do {
    const url = cursor ? `${base}&starting_after=${cursor}` : base;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${STRIPE_KEY}` } });
    if (!r.ok) die(`Stripe events API ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const j = await r.json();
    out.push(...j.data);
    cursor = j.has_more ? j.data[j.data.length - 1].id : null;
    pages++;
  } while (cursor && pages < 50);
  return out;
}

/** Already recorded? Checked against the SAME key the route writes. */
async function alreadyProcessed(eventId) {
  if (!KV_URL || !KV_TOKEN) return false; // unknown → let the route's own dedup decide
  const r = await fetch(KV_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['GET', `stripe:event:${eventId}`]),
  });
  if (!r.ok) return false;
  return !!(await r.json()).result;
}

/** Re-sign exactly as Stripe does so the live endpoint verifies it. */
function signedHeaders(payload) {
  const ts = Math.floor(Date.now() / 1000).toString();
  const sig = crypto.createHmac('sha256', WEBHOOK_SECRET).update(`${ts}.${payload}`).digest('hex');
  return { 'Content-Type': 'application/json', 'stripe-signature': `t=${ts},v1=${sig}` };
}

const money = (c) => `$${((c || 0) / 100).toFixed(2)}`;
const isPaid = (e) =>
  e.type === 'checkout.session.completed' && e.data?.object?.payment_status === 'paid';

(async () => {
  console.log(`Window   : ${SINCE} → ${UNTIL}`);
  console.log(`Endpoint : ${ENDPOINT}`);
  console.log(`Mode     : ${GO ? 'LIVE (--go)' : 'DRY RUN (pass --go to send)'}${PAID_ONLY ? ' [paid-only]' : ''}\n`);

  const events = await fetchEvents();
  const scoped = PAID_ONLY ? events.filter(isPaid) : events;

  const pending = [];
  for (const e of scoped) {
    if (await alreadyProcessed(e.id)) continue;
    pending.push(e);
  }

  const paid = pending.filter(isPaid);
  const revenue = paid.reduce((s, e) => s + (e.data.object.amount_total || 0), 0);
  console.log(`fetched ${events.length} event(s); ${scoped.length} in scope; ${pending.length} not yet processed`);
  console.log(`  paid checkouts to replay: ${paid.length} (${money(revenue)})`);
  for (const e of paid) {
    const o = e.data.object;
    console.log(`    ${new Date(e.created * 1000).toISOString().slice(0, 16)}  ${money(o.amount_total).padStart(9)}  ${o.customer_details?.email || '(no email)'}`);
  }

  if (!GO) {
    console.log(`\nDRY RUN — nothing sent. Re-run with --go to replay ${pending.length} event(s).`);
    return;
  }
  if (!pending.length) { console.log('\nNothing to replay.'); return; }

  console.log('');
  let ok = 0, dup = 0, fail = 0;
  for (const e of pending) {
    const payload = JSON.stringify(e);
    let status = 0, body = '';
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: signedHeaders(payload), body: payload });
      status = r.status; body = (await r.text()).slice(0, 120);
    } catch (err) {
      body = err instanceof Error ? err.message : String(err);
    }
    if (status === 200 && /duplicate/.test(body)) { dup++; }
    else if (status === 200) { ok++; }
    else { fail++; console.error(`  ✗ ${e.id} ${e.type} → ${status} ${body}`); }
    await new Promise((r) => setTimeout(r, DELAY_MS));
  }
  console.log(`\nreplayed: ${ok} | already-duplicate: ${dup} | failed: ${fail}`);
  if (fail) process.exitCode = 1;
})();
