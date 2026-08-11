import type { LucideIcon } from 'lucide-react';
import { Podcast, Music } from 'lucide-react';

export interface Platform {
  name: string;
  url: string;
  icon: LucideIcon;
}

/** "Listen on" destinations for the GovCon Giants Podcast (verified URLs).
 *  Apple Podcasts + Spotify ONLY — listening happens there or on-site. */
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
];
