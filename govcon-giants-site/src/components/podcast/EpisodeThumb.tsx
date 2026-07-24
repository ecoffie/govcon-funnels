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
import { cn } from '@/lib/utils';

export interface EpisodeTopic {
  /** Short uppercase kicker label (e.g. "CMMC"). */
  label: string;
  Icon: LucideIcon;
  /** Accent hex — greens/teals/ambers on navy only, no purple/blue. */
  accent: string;
}

const TOPIC_RULES: { keywords: string[]; topic: EpisodeTopic }[] = [
  { keywords: ['cmmc'], topic: { label: 'CMMC', Icon: Shield, accent: '#2DD4BF' } },
  { keywords: ['8(a)', '8a'], topic: { label: '8(A)', Icon: Award, accent: '#FBBF24' } },
  {
    keywords: ['sam.gov', 'samgov'],
    topic: { label: 'SAM.GOV', Icon: Globe, accent: '#22C55E' },
  },
  {
    keywords: ['subcontract', 'teaming', 'joint venture'],
    topic: { label: 'TEAMING', Icon: Users, accent: '#34D399' },
  },
  {
    keywords: ['proposal', 'rfp', 'rfq', 'sources sought'],
    topic: { label: 'PROPOSALS', Icon: FileText, accent: '#FBBF24' },
  },
  {
    keywords: ['hubzone', 'wosb', 'set-aside', 'set aside'],
    topic: { label: 'SET-ASIDES', Icon: MapPin, accent: '#2DD4BF' },
  },
  {
    keywords: ['construction'],
    topic: { label: 'CONSTRUCTION', Icon: HardHat, accent: '#FBBF24' },
  },
  {
    keywords: ['funding', 'invoice', 'payment', 'paid', 'billing'],
    topic: { label: 'FUNDING', Icon: DollarSign, accent: '#34D399' },
  },
];

const DEFAULT_TOPIC: EpisodeTopic = { label: 'GOVCON', Icon: Mic, accent: '#22C55E' };

/** Topic badge (icon + accent + label) derived from the episode title. */
export function episodeTopic(title: string): EpisodeTopic {
  const lower = title.toLowerCase();
  for (const rule of TOPIC_RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.topic;
  }
  return DEFAULT_TOPIC;
}

/** "EP 334" when a number is detectable in the title, otherwise "DAILY". */
export function episodeTag(title: string): string {
  const match = /\bEP:\s*(\d+)/i.exec(title) ?? /^(\d{2,3}):/.exec(title);
  return match ? `EP ${match[1]}` : 'DAILY';
}

interface EpisodeThumbProps {
  title: string;
  className?: string;
}

/**
 * Branded episode thumbnail in pure CSS/SVG — replaces RSS artwork (which has
 * guest names/text baked in). Navy inset background, faint star-pattern tile,
 * topic icon with a per-topic accent, and a small mic mark + episode tag
 * along the bottom. Fills its parent; the parent sets aspect ratio and size.
 */
export default function EpisodeThumb({ title, className }: EpisodeThumbProps) {
  const { Icon, accent } = episodeTopic(title);
  return (
    <div className={cn('relative overflow-hidden bg-inset', className)} aria-hidden>
      {/* faint brand star pattern */}
      <div
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: 'url(/pattern-stars.svg)', backgroundSize: '160px' }}
      />
      {/* soft accent glow */}
      <div
        className="absolute -right-[15%] -top-[15%] h-1/2 w-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: accent, opacity: 0.14 }}
      />
      {/* center topic icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-[42%] w-[42%] items-center justify-center rounded-full border"
          style={{ borderColor: `${accent}59`, backgroundColor: `${accent}1f` }}
        >
          <Icon className="h-1/2 w-1/2" strokeWidth={1.5} style={{ color: accent }} />
        </div>
      </div>
      {/* bottom row: show mic mark + episode tag */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-2.5 pb-2">
        <Mic className="h-3 w-3 text-slate-500" />
        <span className="font-mono text-[10px] font-medium tracking-[0.14em]" style={{ color: accent }}>
          {episodeTag(title)}
        </span>
      </div>
    </div>
  );
}
