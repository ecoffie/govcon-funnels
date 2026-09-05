/**
 * Episode display helpers, ported from the podcast SPA
 * (`govcon-giants-site/src/lib/episode-utils.ts`) during the one-site
 * consolidation. The classification rules and accent colors are carried over
 * unchanged; the SPA's lucide icon component is dropped, since the Next app
 * does not depend on lucide-react and the badge reads fine as a text kicker.
 */

export interface EpisodeTopic {
  /** Short uppercase kicker label (e.g. "CMMC"). */
  label: string;
  /** Accent hex — greens/teals/ambers, readable on the dark theme. */
  accent: string;
}

const TOPIC_RULES: { keywords: string[]; topic: EpisodeTopic }[] = [
  { keywords: ['cmmc'], topic: { label: 'CMMC', accent: '#2DD4BF' } },
  { keywords: ['8(a)', '8a'], topic: { label: '8(A)', accent: '#FBBF24' } },
  { keywords: ['sam.gov', 'samgov'], topic: { label: 'SAM.GOV', accent: '#4ADE80' } },
  {
    keywords: ['subcontract', 'teaming', 'joint venture'],
    topic: { label: 'TEAMING', accent: '#34D399' },
  },
  {
    keywords: ['proposal', 'rfp', 'rfq', 'sources sought'],
    topic: { label: 'PROPOSALS', accent: '#FBBF24' },
  },
  {
    keywords: ['hubzone', 'wosb', 'set-aside', 'set aside'],
    topic: { label: 'SET-ASIDES', accent: '#2DD4BF' },
  },
  { keywords: ['construction'], topic: { label: 'CONSTRUCTION', accent: '#FBBF24' } },
  {
    keywords: ['funding', 'invoice', 'payment', 'paid', 'billing'],
    topic: { label: 'FUNDING', accent: '#34D399' },
  },
];

const DEFAULT_TOPIC: EpisodeTopic = { label: 'GOVCON', accent: '#4ADE80' };

/** Topic badge (accent + label) derived from the episode title. */
export function episodeTopic(title: string): EpisodeTopic {
  const lower = title.toLowerCase();
  for (const rule of TOPIC_RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.topic;
  }
  return DEFAULT_TOPIC;
}

/** Format an ISO date like "Jul 23, 2026". */
export function formatEpisodeDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** "09:34" / "1:02:33" → ISO 8601 duration for schema.org (PT9M34S). */
export function isoDuration(duration: string): string | undefined {
  const parts = duration.split(':').map(Number);
  if (parts.some(Number.isNaN)) return undefined;
  const [h, m, s] = parts.length === 3 ? parts : [0, parts[0] ?? 0, parts[1] ?? 0];
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}` || 'PT0S';
}
