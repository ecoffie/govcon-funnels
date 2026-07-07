/**
 * Mindy Re-Ignite drip — daily cron tick.
 *
 * Runs the tag-based drip so Eric doesn't hand-run the CLI each day:
 *   1) ADVANCE already-enrolled contacts to their next email (2-day dwell enforced
 *      via date-stamp tags — safe to run daily).
 *   2) SEED the next warm-up batch into email 1 (ramp: 50→100→200→350→500/day,
 *      then steady, until the mindy-profile-incomplete audience is drained).
 *
 * Shared engine: src/lib/mindy-reignite.ts (same code the CLI uses).
 *
 * Auth: Vercel cron sends `Authorization: Bearer <CRON_SECRET>`. We accept that,
 * OR `?password=<ADMIN_PASSWORD>` for manual trigger / testing. `?dry=true` plans
 * without sending. `?seed=N` overrides the ramp quota for a manual run.
 *
 * Scheduled via MINDY'S DISPATCHER (cron_jobs row "mindy-reignite-drip",
 * daily 14:00 UTC) which fires this absolute URL cross-origin with
 * `Authorization: Bearer <CRON_SECRET>` (funnels CRON_SECRET == Mindy's).
 * Moved off funnels vercel.json 2026-07-02 — the raw vercel cron never fired
 * (dayIndex stuck at 0, 0 daily runs). The dispatcher is the reliable path.
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  runSeed, runSend, seedQuotaForDay,
  type DripConfig,
} from '@/lib/mindy-reignite';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Post a run summary (or failure) to Slack so Eric never has to check the dashboard.
async function notifySlack(payload: { ok: boolean; summary: string; detail?: string }) {
  const url = process.env.SLACK_LEAD_WEBHOOK_URL;
  if (!url) return;
  const icon = payload.ok ? ':white_check_mark:' : ':rotating_light:';
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `${icon} *Mindy Re-Ignite drip* — ${payload.summary}`,
        blocks: [
          { type: 'header', text: { type: 'plain_text', text: `${payload.ok ? '✅' : '🚨'} Mindy Re-Ignite drip`, emoji: true } },
          { type: 'section', text: { type: 'mrkdwn', text: payload.detail || payload.summary } },
        ],
      }),
    });
  } catch { /* never let Slack failure break the cron */ }
}

function authorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  if (req.headers.get('x-vercel-cron') === '1') return true;
  // Manual trigger / testing. This repo's admin secret is PURCHASES_ADMIN_PASSWORD
  // (there is no plain ADMIN_PASSWORD here); accept either if present.
  const pw = new URL(req.url).searchParams.get('password');
  const adminPw = process.env.PURCHASES_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  if (pw && adminPw && pw === adminPw) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const dry = url.searchParams.get('dry') === 'true';
  const seedOverride = Number(url.searchParams.get('seed')) || null;

  const token = (process.env.GHL_API_KEY || '').trim();
  const location = (process.env.GHL_LOCATION_ID || 'AMkIivLuREYwsX5GhAAL').trim();
  const profileUrl = (process.env.MINDY_PROFILE_URL || 'https://getmindy.ai/app').trim();
  if (!token) return NextResponse.json({ error: 'GHL_API_KEY not set' }, { status: 500 });

  const cfg: DripConfig = { token, location, profileUrl, fromName: 'Eric Coffie', dry };
  const now = new Date();
  const todayIso = now.toISOString().slice(0, 10);

  try {
    // 1) Advance the sequence first (frees people out of stages before we seed more).
    //    runSend enforces the 2-day dwell via date-stamps, so it's safe daily.
    const send = await runSend(cfg, now);

    // 2) Ramp math — CALENDAR-DRIVEN, not enrolled-count-driven.
    //    The old code summed 6 full-audience tag scans (43 pages each ≈ 40s of
    //    pure counting) AND inferred dayIndex from cumulative enrolled — which
    //    got STUCK at 2 when seeding stalled (enrolled never grew → dayIndex
    //    never advanced → a self-reinforcing stall). Drive the ramp off the
    //    calendar instead: one ramp step per real day since the campaign start.
    //    Deterministic, un-stuckable, and needs ZERO counting.
    const CAMPAIGN_START_MS = Date.UTC(2026, 6, 7); // 2026-07-07 = ramp day 0 (drain relaunch)
    const dayIndex = Math.max(0, Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - CAMPAIGN_START_MS) / 86400000));
    // Window cap: the dispatcher fully AWAITS this job (timeout_ms < 55s), and a
    // Vercel function's own budget is finite too. Each send is ~200ms, so cap the
    // per-tick seed so worst-case runSend + runSeed finishes well under ~50s.
    // The one-time bulk drain of the backlog runs via the LOCAL runner
    // (scripts/mindy-reignite-drip.mjs) per the bulk-job rule — the cron is the
    // steady-state handler, NOT the drainer. Ramp still ramps, just clamped here.
    const PER_TICK_SEED_CAP = 120;
    const quota = Math.min(seedOverride ?? seedQuotaForDay(dayIndex), PER_TICK_SEED_CAP);

    const seed = await runSeed(cfg, quota, todayIso);

    // Whether MORE fresh contacts remain to seed: runSeed overpulls the audience
    // (limit*3) and reports how many were eligible-and-new in that slice. If it
    // found more eligible-new than it enrolled this tick, the backlog isn't
    // drained yet. This avoids the old 6-tag full-audience sum (≈40s) entirely —
    // no extra GHL scan, so the route finishes inside the dispatcher's await.
    const moreToSeed = seed.eligibleNew > seed.enrolled;

    // Slack summary so Eric never has to check the dashboard.
    if (!dry) {
      await notifySlack({
        ok: true,
        summary: `ran ${todayIso} — advanced ${send.advanced}, seeded ${seed.enrolled}${moreToSeed ? ', backlog remains' : ', backlog drained'}`,
        detail:
          `*Ran:* ${now.toISOString()}\n` +
          `*Advanced:* ${send.advanced} to next email · *waiting:* ${send.waiting} · *exited (completed profile):* ${send.exited} · *finished:* ${send.finished}\n` +
          `*Seeded email 1:* ${seed.enrolled} new (quota ${quota}, ramp day ${dayIndex}) · *suppressed:* ${seed.failed}\n` +
          `*More fresh contacts to seed?* ${moreToSeed ? 'yes' : 'no — backlog drained'}`,
      });
    }

    return NextResponse.json({
      success: true, dry, at: now.toISOString(),
      advance: send,
      seed: { quota, dayIndex, ...seed },
      moreToSeed,
    });
  } catch (e) {
    const msg = (e as Error)?.message || 'unknown error';
    if (!dry) await notifySlack({ ok: false, summary: `FAILED ${todayIso}`, detail: `The drip cron errored:\n\`\`\`${msg}\`\`\`` });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
