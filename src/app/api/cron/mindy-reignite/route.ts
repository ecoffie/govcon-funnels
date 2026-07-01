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
 * Scheduled via vercel.json (funnels has no dispatcher; only ~1 other cron, well
 * under the 100 cap — a dedicated vercel cron is correct here).
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  runSeed, runSend, seedQuotaForDay,
  AUDIENCE_TAG, STAGE_TAGS, DONE_TAG, EXITED_TAG,
  type DripConfig,
} from '@/lib/mindy-reignite';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const GHL_BASE = 'https://services.leadconnectorhq.com';

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

// Count contacts carrying a tag (HEAD-style: we only need totals for ramp math).
async function countTag(cfg: DripConfig, tag: string): Promise<number> {
  let page = 1, total = 0;
  while (true) {
    const res = await fetch(`${GHL_BASE}/contacts/search`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json', Version: '2021-07-28' },
      body: JSON.stringify({ locationId: cfg.location, page, pageLimit: 100, filters: [{ field: 'tags', operator: 'contains', value: tag }] }),
    });
    if (!res.ok) break;
    const d = await res.json();
    const n = (d.contacts || []).length;
    total += n;
    if (n < 100) break;
    page++;
  }
  return total;
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
    const send = await runSend(cfg, now);

    // 2) Ramp math: dayIndex ~ how many warm-up batches already went out.
    //    Approximate from total enrolled (d0..done + exited) / the smallest batch.
    const enrolledTags = [...STAGE_TAGS, DONE_TAG, EXITED_TAG];
    let enrolled = 0;
    for (const t of enrolledTags) enrolled += await countTag(cfg, t);
    // Each ramp day adds a batch; infer which ramp step we're on from cumulative enrolled.
    // (50,150,350,700 cumulative → dayIndex 0..4+)
    const CUMULATIVE = [0, 50, 150, 350, 700];
    let dayIndex = CUMULATIVE.filter((c) => enrolled >= c).length - 1;
    if (dayIndex < 0) dayIndex = 0;
    const quota = seedOverride ?? seedQuotaForDay(dayIndex);

    const seed = await runSeed(cfg, quota, todayIso);

    const remaining = Math.max(0, (await countTag(cfg, AUDIENCE_TAG)) - enrolled - seed.enrolled);

    // Slack summary so Eric never has to check the dashboard.
    if (!dry) {
      await notifySlack({
        ok: true,
        summary: `ran ${todayIso} — advanced ${send.advanced}, seeded ${seed.enrolled}, ${remaining} left`,
        detail:
          `*Ran:* ${now.toISOString()}\n` +
          `*Advanced:* ${send.advanced} to next email · *waiting:* ${send.waiting} · *exited (completed profile):* ${send.exited} · *finished:* ${send.finished}\n` +
          `*Seeded email 1:* ${seed.enrolled} new (quota ${quota}, ramp day ${dayIndex}) · *suppressed:* ${seed.failed}\n` +
          `*Audience remaining:* ${remaining} of ~4,323`,
      });
    }

    return NextResponse.json({
      success: true, dry, at: now.toISOString(),
      advance: send,
      seed: { quota, dayIndex, ...seed },
      enrolledBefore: enrolled,
      audienceRemaining: remaining,
    });
  } catch (e) {
    const msg = (e as Error)?.message || 'unknown error';
    if (!dry) await notifySlack({ ok: false, summary: `FAILED ${todayIso}`, detail: `The drip cron errored:\n\`\`\`${msg}\`\`\`` });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
