import type { LucideIcon } from 'lucide-react';
import {
  Award,
  DollarSign,
  FileText,
  Globe,
  HardHat,
  MapPin,
  Mic,
  Shield,
  Users,
} from 'lucide-react';
import type { Episode } from '@/data/episodes';
import { episodes } from '@/data/episodes';

/**
 * Episode display/playback helpers. These lived in src/data/episodes.ts until
 * the dataset became script-generated (python3 scripts/rss-to-episodes.py) —
 * they now live here so regeneration never clobbers them.
 */

/** Latest N episodes (dataset is newest-first). */
export const latestEpisodes = (n: number): Episode[] => episodes.slice(0, n);

export interface EpisodeTopic {
  /** Short uppercase kicker label (e.g. "CMMC"). */
  label: string;
  Icon: LucideIcon;
  /** Accent hex — greens/teals/ambers, light-theme readable. */
  accent: string;
}

const TOPIC_RULES: { keywords: string[]; topic: EpisodeTopic }[] = [
  { keywords: ['cmmc'], topic: { label: 'CMMC', Icon: Shield, accent: '#0D9488' } },
  { keywords: ['8(a)', '8a'], topic: { label: '8(A)', Icon: Award, accent: '#D97706' } },
  {
    keywords: ['sam.gov', 'samgov'],
    topic: { label: 'SAM.GOV', Icon: Globe, accent: '#16A34A' },
  },
  {
    keywords: ['subcontract', 'teaming', 'joint venture'],
    topic: { label: 'TEAMING', Icon: Users, accent: '#059669' },
  },
  {
    keywords: ['proposal', 'rfp', 'rfq', 'sources sought'],
    topic: { label: 'PROPOSALS', Icon: FileText, accent: '#D97706' },
  },
  {
    keywords: ['hubzone', 'wosb', 'set-aside', 'set aside'],
    topic: { label: 'SET-ASIDES', Icon: MapPin, accent: '#0D9488' },
  },
  {
    keywords: ['construction'],
    topic: { label: 'CONSTRUCTION', Icon: HardHat, accent: '#D97706' },
  },
  {
    keywords: ['funding', 'invoice', 'payment', 'paid', 'billing'],
    topic: { label: 'FUNDING', Icon: DollarSign, accent: '#059669' },
  },
];

const DEFAULT_TOPIC: EpisodeTopic = { label: 'GOVCON', Icon: Mic, accent: '#16A34A' };

/** Topic badge (icon + accent + label) derived from the episode title. */
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
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
