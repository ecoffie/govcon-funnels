import { GoogleAuth } from 'google-auth-library';

/**
 * Live YouTube stats for the GovCon Giants channel, for the /team/yt scoreboard.
 * Uses the existing GCP_SA_JSON service account (YouTube Data API v3 must be enabled
 * on that project) — PUBLIC data only (lifetime view counts per video), no OAuth.
 * Cached in-process ~1h so the internal page never burns quota or blocks on a load.
 */

const CHANNEL_ID = 'UC9iC4ASAgGm_Z3b77PZGqIw'; // Eric Coffie / GovCon Giants Podcast
const TTL_MS = 60 * 60 * 1000;

export interface YtVideo {
  id: string;
  title: string;
  views: number;       // lifetime (Data API)
  date: string;        // YYYY-MM-DD
  seconds: number;
  isShort: boolean;
  views28d?: number;   // last-28-day views (Analytics API, needs OAuth)
  retention?: number;  // averageViewPercentage 0-100 (Analytics API)
}
export interface YtStats {
  channelTitle: string;
  subs: number;
  totalViews: number;
  videoCount: number;
  videos: YtVideo[]; // most-recent uploads, sorted by views desc
  hasAnalytics: boolean; // true when the 28d/retention layer resolved
  syncedAt: string;
}

let cache: { at: number; data: YtStats } | null = null;

function loadServiceAccount(): Record<string, unknown> | null {
  const raw = process.env.GCP_SA_JSON;
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { /* not plain JSON */ }
  try { return JSON.parse(Buffer.from(raw, 'base64').toString('utf8')); } catch { /* not base64 */ }
  try { return JSON.parse(raw.replace(/\\n/g, '\n')); } catch { return null; }
}

function parseISODuration(d: string): number {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(d || '');
  if (!m) return 0;
  return (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + (+(m[3] || 0));
}

/** Mint an OAuth access token from the stored refresh token (channel-owner grant). */
async function getOauthToken(): Promise<string | null> {
  const id = process.env.YT_OAUTH_CLIENT_ID;
  const secret = process.env.YT_OAUTH_CLIENT_SECRET;
  const refresh = process.env.YT_OAUTH_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;
  try {
    const r = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: 'refresh_token' }),
    });
    const j = await r.json();
    return j.access_token || null;
  } catch { return null; }
}

/** Last-28-day views + retention (averageViewPercentage) per videoId, via YouTube Analytics. */
async function fetchAnalytics28d(): Promise<Map<string, { views28d: number; retention: number }> | null> {
  const token = await getOauthToken();
  if (!token) return null;
  try {
    const end = new Date();
    const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    const u = new URL('https://youtubeanalytics.googleapis.com/v2/reports');
    u.searchParams.set('ids', 'channel==MINE');
    u.searchParams.set('startDate', iso(start));
    u.searchParams.set('endDate', iso(end));
    u.searchParams.set('metrics', 'views,averageViewPercentage');
    u.searchParams.set('dimensions', 'video');
    u.searchParams.set('sort', '-views');
    u.searchParams.set('maxResults', '200');
    const r = await fetch(u, { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    if (!Array.isArray(j.rows)) return null;
    const m = new Map<string, { views28d: number; retention: number }>();
    for (const row of j.rows) m.set(row[0], { views28d: Number(row[1] || 0), retention: Number(row[2] || 0) });
    return m;
  } catch { return null; }
}

/** Fetch live stats, cached ~1h. Returns null (or stale cache) on any failure — never throws. */
export async function getYtStats(): Promise<YtStats | null> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  try {
    const creds = loadServiceAccount();
    if (!creds) return cache?.data ?? null;
    const auth = new GoogleAuth({ credentials: creds, scopes: ['https://www.googleapis.com/auth/youtube.readonly'] });
    const token = (await (await auth.getClient()).getAccessToken()).token;
    const H = { Authorization: `Bearer ${token}` } as Record<string, string>;
    const api = 'https://www.googleapis.com/youtube/v3';

    const chRes = await fetch(`${api}/channels?part=statistics,contentDetails,snippet&id=${CHANNEL_ID}`, { headers: H });
    const ch = await chRes.json();
    const c = ch?.items?.[0];
    if (!c) return cache?.data ?? null;
    const uploads = c.contentDetails?.relatedPlaylists?.uploads;

    // Most-recent 50 uploads (Batch-1 videos are all recent).
    const plRes = await fetch(`${api}/playlistItems?part=contentDetails&maxResults=50&playlistId=${uploads}`, { headers: H });
    const pl = await plRes.json();
    const ids: string[] = (pl?.items || []).map((i: { contentDetails: { videoId: string } }) => i.contentDetails.videoId);

    const videos: YtVideo[] = [];
    for (let i = 0; i < ids.length; i += 50) {
      const vRes = await fetch(`${api}/videos?part=statistics,snippet,contentDetails&id=${ids.slice(i, i + 50).join(',')}`, { headers: H });
      const v = await vRes.json();
      for (const x of (v?.items || [])) {
        const seconds = parseISODuration(x.contentDetails?.duration);
        videos.push({
          id: x.id,
          title: x.snippet?.title || '',
          views: Number(x.statistics?.viewCount || 0),
          date: (x.snippet?.publishedAt || '').slice(0, 10),
          seconds,
          isShort: seconds > 0 && seconds <= 60,
        });
      }
    }
    videos.sort((a, b) => b.views - a.views);

    // Enrich with 28-day views + retention (Analytics API, OAuth). Best-effort: if the
    // OAuth layer isn't configured or fails, lifetime views still work.
    const analytics = await fetchAnalytics28d();
    if (analytics) {
      for (const v of videos) {
        const a = analytics.get(v.id);
        if (a) { v.views28d = a.views28d; v.retention = a.retention; }
      }
    }

    const data: YtStats = {
      channelTitle: c.snippet?.title || 'GovCon Giants',
      subs: Number(c.statistics?.subscriberCount || 0),
      totalViews: Number(c.statistics?.viewCount || 0),
      videoCount: Number(c.statistics?.videoCount || 0),
      videos,
      hasAnalytics: !!analytics,
      syncedAt: new Date().toISOString(),
    };
    cache = { at: Date.now(), data };
    return data;
  } catch (err) {
    console.warn('[yt-stats] fetch failed:', (err as Error).message);
    return cache?.data ?? null;
  }
}

/**
 * EXPLICIT episode → YouTube video ID map — the source of truth for the scoreboard
 * rows. Title-guessing was removed: it mis-attributed non-Batch-1 videos to episodes
 * (e.g. an "unused funding" video got tagged Ep03), which would corrupt the Batch-2
 * "double down on the winner" signal. As each Batch-1 episode publishes, paste its
 * 11-char YouTube video ID here (from youtu.be/<ID> or watch?v=<ID>). Empty = row
 * shows "—" until mapped. The live panel below always shows real data, unmapped.
 */
const EPISODE_VIDEO_IDS: Record<string, string> = {
  // ep02: '', ep03: '', ep04: '', ep05: '', ep06: '',
  // ep07: '', ep08: '', ep09: '', ep10: '',
};

/**
 * Count /youtube lead-magnet signups per episode, from getmindy.ai's `leads` table
 * (utm_content = ep02..ep10, set by the per-video tracking links). Cross-project read
 * (funnels → getmindy Supabase) via GETMINDY_SUPABASE_* env. Returns null on failure
 * (→ show "—"). Uses PostgREST's exact count headers instead of reading matching rows,
 * because Supabase truncates row responses at the project's API max (1,000 by default).
 */
const SIGNUP_EPISODES = ['ep01', 'ep02', 'ep03', 'ep04', 'ep05', 'ep06', 'ep07', 'ep08', 'ep09', 'ep10'];

export async function getYoutubeSignups(): Promise<Record<string, number> | null> {
  const url = process.env.GETMINDY_SUPABASE_URL;
  const key = process.env.GETMINDY_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    const counts = await Promise.all(SIGNUP_EPISODES.map(async (ep) => {
      const endpoint = new URL(`${url.replace(/\/$/, '')}/rest/v1/leads`);
      endpoint.searchParams.set('utm_content', `eq.${ep}`);
      endpoint.searchParams.set('select', 'utm_content');
      const r = await fetch(endpoint, {
        method: 'HEAD',
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: 'count=exact',
          Range: '0-0',
        },
      });
      if (!r.ok) throw new Error(`Signup count failed for ${ep}`);
      const total = r.headers.get('content-range')?.match(/\/(\d+)$/)?.[1];
      if (total == null) throw new Error(`Signup count missing for ${ep}`);
      return [ep, Number(total)] as const;
    }));
    return Object.fromEntries(counts);
  } catch {
    return null;
  }
}

export function matchEpisodeViews(stats: YtStats): Record<string, { views: number; title: string; date: string }> {
  const byId = new Map(stats.videos.map((v) => [v.id, v]));
  const out: Record<string, { views: number; title: string; date: string }> = {};
  for (const [ep, id] of Object.entries(EPISODE_VIDEO_IDS)) {
    const v = id && byId.get(id);
    if (v) out[ep] = { views: v.views, title: v.title, date: v.date };
  }
  return out;
}
