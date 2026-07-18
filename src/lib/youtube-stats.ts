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
  views: number;
  date: string; // YYYY-MM-DD
  seconds: number;
  isShort: boolean;
}
export interface YtStats {
  channelTitle: string;
  subs: number;
  totalViews: number;
  videoCount: number;
  videos: YtVideo[]; // most-recent uploads, sorted by views desc
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

    const data: YtStats = {
      channelTitle: c.snippet?.title || 'GovCon Giants',
      subs: Number(c.statistics?.subscriberCount || 0),
      totalViews: Number(c.statistics?.viewCount || 0),
      videoCount: Number(c.statistics?.videoCount || 0),
      videos,
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

export function matchEpisodeViews(stats: YtStats): Record<string, { views: number; title: string; date: string }> {
  const byId = new Map(stats.videos.map((v) => [v.id, v]));
  const out: Record<string, { views: number; title: string; date: string }> = {};
  for (const [ep, id] of Object.entries(EPISODE_VIDEO_IDS)) {
    const v = id && byId.get(id);
    if (v) out[ep] = { views: v.views, title: v.title, date: v.date };
  }
  return out;
}
