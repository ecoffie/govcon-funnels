/**
 * Parses a raw episode `body` string (from the RSS feed) into the structured
 * sections a tim.blog-style show-notes page needs: an intro, "what you'll
 * learn" takeaways, timestamped chapters (show notes), and the links/resources
 * mentioned. All sections are best-effort — callers render only what's present.
 */

export interface Chapter {
  time: string;
  label: string;
}
export interface EpisodeLink {
  label: string;
  url: string;
}
export interface ParsedEpisode {
  intro: string[];
  takeaways: string[];
  chapters: Chapter[];
  links: EpisodeLink[];
}

// Marks where the boilerplate sponsor/CTA tail begins.
const CTA = /(Mindy gives you|Sign up for|Get your free|Connect with|👉|🔗|https?:\/\/)/i;
// Timestamp separator, e.g. "0:48 - " / "12:03 — " / "1:02:33: "
const TS_SPLIT = /(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–—:]\s*/;
// Sentence-leading verbs that begin a takeaway bullet in the feed copy.
const LEAD =
  /(?<=[.\s])(Learn how|Learn|Discover|Use|Confirm|Build|Understand|Find out|Find|Get|Hear|Know|Master|Avoid|Uncover|Reveal|Explore|Steal|See how|See why)\b/g;

/** Friendlier labels for the handful of URLs that recur across episodes. */
function niceLink(label: string, url: string): EpisodeLink {
  const u = url.toLowerCase();
  if (u.includes('getmindy.ai'))
    return { label: 'Mindy — free daily federal contract alerts', url };
  if (u.includes('/funding') || u.includes('encore'))
    return { label: 'Encore Funding — government contractor financing', url };
  if (u.includes('gcgsummit')) return { label: 'GCG National Summit', url };
  if (u.includes('govcongiants')) return { label: 'GovCon Giants', url };
  const clean = label.replace(/^[\s:–—-]+|[\s:–—-]+$/g, '');
  return { label: clean.length > 3 ? clean : url.replace(/^https?:\/\//, ''), url };
}

function splitParagraphs(text: string): string[] {
  const sentences = text.match(/[^.?!]+[.?!]+(?:\s|$)|[^.?!]+$/g) ?? [text];
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    const p = sentences.slice(i, i + 3).join(' ').trim();
    if (p) out.push(p);
  }
  return out;
}

export function parseEpisodeBody(body: string): ParsedEpisode {
  // ---- chapters (everything after "EPISODE CHAPTERS") --------------------
  const chapters: Chapter[] = [];
  const lower = body.toLowerCase();
  const ci = lower.indexOf('episode chapters');
  let main = body;
  if (ci !== -1) {
    main = body.slice(0, ci);
    const chunk = body.slice(ci).replace(/^episode chapters:?/i, '').trim();
    const parts = chunk.split(TS_SPLIT); // [pre, ts, label, ts, label, ...]
    for (let i = 1; i + 1 < parts.length; i += 2) {
      const time = parts[i];
      const label = parts[i + 1].split(CTA)[0].replace(/[\s\-–—]+$/, '').trim();
      if (label) chapters.push({ time, label });
    }
  }

  // ---- links -------------------------------------------------------------
  const links: EpisodeLink[] = [];
  const seen = new Set<string>();
  const urlRe = /https?:\/\/[^\s)]+/g;
  let m: RegExpExecArray | null;
  while ((m = urlRe.exec(body))) {
    const url = m[0].replace(/[.,]+$/, '');
    if (seen.has(url)) continue;
    seen.add(url);
    const pre = body.slice(Math.max(0, m.index - 60), m.index).replace(/[🔗👉]/g, '');
    const raw = (pre.split(/[.!?]/).pop() ?? '').trim().slice(-48);
    links.push(niceLink(raw, url));
  }

  // ---- intro + takeaways (from the pre-chapters text, CTA stripped) ------
  const clean = main.split(CTA)[0].trim();
  let intro = clean;
  const takeaways: string[] = [];
  LEAD.lastIndex = 0;
  const first = LEAD.exec(clean);
  if (first) {
    intro = clean.slice(0, first.index).trim();
    const rest = clean.slice(first.index).trim();
    const idxs: number[] = [];
    LEAD.lastIndex = 0;
    let t: RegExpExecArray | null;
    while ((t = LEAD.exec(rest))) idxs.push(t.index);
    if (!idxs.length || idxs[0] !== 0) idxs.unshift(0);
    idxs.push(rest.length);
    for (let i = 0; i + 1 < idxs.length; i++) {
      const s = rest.slice(idxs[i], idxs[i + 1]).trim().replace(/[\s.]+$/, '');
      if (s.length > 15) takeaways.push(s);
    }
  }

  return {
    intro: splitParagraphs(intro),
    // only surface takeaways when the split clearly worked (2+ items)
    takeaways: takeaways.length >= 2 ? takeaways : [],
    chapters,
    links,
  };
}
