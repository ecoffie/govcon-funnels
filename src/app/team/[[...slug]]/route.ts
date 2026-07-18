import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getYtStats, matchEpisodeViews, getYoutubeSignups, type YtStats } from '@/lib/youtube-stats';

/**
 * Serves the internal /team/* pages (YouTube Command Center + batch production hubs)
 * from a PRIVATE dir (private-team/) that is NOT under public/, so Vercel can't serve
 * them statically and bypass the gate. Access is enforced by src/proxy.ts (Basic Auth
 * on /team/*) — this handler only runs once the request is authorized.
 *
 * For yt/index.html we inject LIVE YouTube stats (views per video) so the scoreboard
 * fills itself. The HTML lives as plain, editable .html files in private-team/, bundled
 * into this function via `outputFileTracingIncludes` in next.config.ts.
 */

const ROOT = path.join(process.cwd(), 'private-team');

const fmt = (n: number) => Number(n).toLocaleString('en-US');

/** The live "auto-pulled from YouTube" panel injected into the command center. */
function renderLivePanel(s: YtStats): string {
  const A = s.hasAnalytics;
  const rows = s.videos
    .filter((v) => !v.isShort)
    .slice(0, 12)
    .map((v, i) => {
      const ret = v.retention != null ? `${v.retention.toFixed(0)}%` : '—';
      const v28 = v.views28d != null ? fmt(v.views28d) : '—';
      return `<tr><td>${i + 1}</td><td class="ti"><a href="https://youtu.be/${v.id}">${v.title.replace(/</g, '&lt;')}</a></td><td>${v.date}</td><td style="text-align:right"><b>${fmt(v.views)}</b></td>${A ? `<td style="text-align:right">${v28}</td><td style="text-align:right">${ret}</td>` : ''}</tr>`;
    })
    .join('');
  const synced = new Date(s.syncedAt).toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
  const extraHead = A ? '<th style="text-align:right">28-day views</th><th style="text-align:right">Retention</th>' : '';
  const note = A
    ? 'Lifetime totals (Data API) + 28-day views &amp; retention (Analytics API). Retention = average % of each video watched — the content-quality signal; &gt;100% on Shorts means they loop. The <b>Peak views</b> column above auto-fills once each episode\'s video ID is mapped.'
    : 'Lifetime totals (Data API). 28-day + retention (Analytics API) not resolving right now.';
  return `
  <div class="rule" style="border-left-color:var(--good)">
    <h3 style="color:var(--good)">Live from YouTube · auto-pulled</h3>
    <p style="color:var(--paper-dim);font-size:14px;margin:0 0 14px"><b style="color:#fff">${s.channelTitle}</b> — ${fmt(s.subs)} subscribers · ${fmt(s.totalViews)} lifetime views · ${fmt(s.videoCount)} videos. Top long-form uploads by lifetime views (Shorts excluded). Synced ${synced}; refreshes hourly.</p>
    <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Video</th><th>Published</th><th style="text-align:right">Lifetime views</th>${extraHead}</tr></thead><tbody>${rows}</tbody></table></div>
    <p style="font-size:12px;color:var(--paper-faint);margin-top:10px">${note}</p>
  </div>`;
}

async function serveCommandCenter(html: string): Promise<string> {
  const [stats, signups] = await Promise.all([getYtStats(), getYoutubeSignups()]);
  // Signups: null = query failed (show "—"); a map = query ran (show the count, incl. 0).
  html = html.replace(/\{\{s:(ep\d\d)\}\}/g, (_m, ep) => (signups ? String(signups[ep] ?? 0) : '—'));
  if (!stats) {
    return html.replace(/\{\{v:ep\d\d\}\}/g, '—').replace('<!--YT_LIVE_PANEL-->', '');
  }
  const matched = matchEpisodeViews(stats);
  return html
    .replace(/\{\{v:(ep\d\d)\}\}/g, (_m, ep) => (matched[ep] ? fmt(matched[ep].views) : '—'))
    .replace('<!--YT_LIVE_PANEL-->', renderLivePanel(stats));
}

function contentType(p: string): string {
  if (p.endsWith('.html')) return 'text/html; charset=utf-8';
  if (p.endsWith('.css')) return 'text/css; charset=utf-8';
  if (p.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (p.endsWith('.json')) return 'application/json; charset=utf-8';
  if (p.endsWith('.png')) return 'image/png';
  if (p.endsWith('.jpg') || p.endsWith('.jpeg')) return 'image/jpeg';
  if (p.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await ctx.params;

  // Reject any traversal segments; only simple names allowed.
  const parts = slug.filter((s) => s && s !== '.' && s !== '..' && !s.includes('/') && !s.includes('\\'));
  let rel = parts.join('/');
  // A directory (or bare /team) resolves to its index.html.
  if (!rel || !path.extname(rel)) rel = path.posix.join(rel, 'index.html');

  const full = path.join(ROOT, rel);
  if (full !== ROOT && !full.startsWith(ROOT + path.sep)) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const buf = await readFile(full);
    // The command center gets live YouTube stats injected; everything else served as-is.
    if (rel === 'yt/index.html') {
      const html = await serveCommandCenter(buf.toString('utf8'));
      return new Response(html, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
      });
    }
    return new Response(buf, {
      status: 200,
      headers: { 'content-type': contentType(full), 'cache-control': 'no-store' },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
