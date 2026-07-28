import type { LucideIcon } from 'lucide-react';
import { Podcast, Music, Youtube, Radio, Rss } from 'lucide-react';

export interface Platform {
  name: string;
  url: string;
  icon: LucideIcon;
}

/** "Listen on" destinations for the GovCon Giants Podcast (verified URLs). */
export const platforms: Platform[] = [
  {
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/us/podcast/govcon-giants/id1463074357',
    icon: Podcast,
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/show/1XZCaN0VDP9zQSNYS1syoC',
    icon: Music,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/ericcoffie',
    icon: Youtube,
  },
  {
    name: 'iHeartRadio',
    url: 'https://www.iheart.com/podcast/269-govcon-giants-46805480/',
    icon: Radio,
  },
  {
    name: 'Libsyn',
    url: 'https://govcongiants.libsyn.com/',
    icon: Rss,
  },
];
