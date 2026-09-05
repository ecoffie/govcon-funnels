import featuredJson from '@/data/featured-episodes.json';

/**
 * Resolves the person featured in an episode to a REAL, VERIFIED bio — never an
 * invented one. Ported from the podcast SPA (`src/lib/episode-guests.ts`).
 *
 * The only bio source is `featured-episodes.json`, the curated set of guest
 * interviews, which carries a real name, role, agency, blurb, and a headshot that
 * exists in /public/faces. The SPA additionally read a Summit speaker roster; that
 * dataset was not carried into this app (public/speakers is empty), so it is not
 * referenced here rather than being half-ported against missing images.
 *
 * When an episode's guest is not in the curated set, a name may still be pulled out
 * of the episode copy — a NAME ONLY, with no role, org, bio, or photo. We would
 * rather show nothing than assert a credential we cannot source. Episodes with no
 * identifiable guest resolve to null and render the host bio instead.
 */

export interface ResolvedGuest {
  name: string;
  role?: string;
  org?: string;
  /** A real one-line bio — from curated data only, never generated. */
  bio?: string;
  /** Real headshot, only when the curated entry has one. */
  photo?: string;
}

interface FeaturedEpisode {
  guest: string;
  role: string;
  agency: string;
  photo: string;
  blurb: string;
}

/** Curated roster, longest names first so a short name cannot shadow a longer one. */
const ROSTER: ResolvedGuest[] = (featuredJson as FeaturedEpisode[])
  .map((f) => ({
    name: f.guest,
    role: f.role,
    org: f.agency,
    bio: f.blurb?.replace(/\s*…?\s*$/, '').trim() || undefined,
    photo: f.photo,
  }))
  .sort((a, b) => b.name.length - a.name.length);

/** Spelling drift seen between the episode copy and the curated roster. */
const ALIASES: Record<string, string[]> = {
  'Jackie Robinson-Burnett': ['Jackie Robinson-Burnette', 'Jackie Robinson Burnette'],
};

const NAME = "([A-Z][a-z]+(?:\\s[A-Z][a-z.'\\-]+){1,2})";
const NAME_PATTERNS = [
  new RegExp('sits? down with ' + NAME),
  new RegExp('sat down with ' + NAME),
  new RegExp('with guest ' + NAME),
  new RegExp('interviews? (?:with )?' + NAME),
  new RegExp('Eric (?:talks|speaks|chats) (?:to|with) ' + NAME),
  new RegExp(NAME + ' (?:breaks down|explains|reveals|shares|joins|walks us)'),
];

/** Capitalised phrases that look like names but are not people. */
const NOT_A_NAME = new Set([
  'In This',
  'This Episode',
  'Eric Coffie',
  'Daily Alerts',
  'Small Business',
  'United States',
  'New Intro',
]);

function extractName(title: string, description: string): string | null {
  const hay = `${description} ${title}`;
  for (const re of NAME_PATTERNS) {
    const m = hay.match(re);
    if (m) {
      const n = m[1].trim();
      if (!NOT_A_NAME.has(n) && !n.includes('Eric') && n.split(/\s+/).length <= 3) return n;
    }
  }
  return null;
}

function lookup(name: string): ResolvedGuest {
  const hit = ROSTER.find(
    (r) => r.name === name || (ALIASES[r.name] ?? []).includes(name),
  );
  // No curated entry → the NAME ONLY. Never a fabricated role or bio.
  return hit ?? { name };
}

/**
 * The featured guest for an episode, or null when it is Eric solo / no identifiable
 * guest. Matches the curated roster against the title and description first, then
 * falls back to a name pulled from the copy.
 */
export function resolveGuest(title: string, description: string): ResolvedGuest | null {
  const haystack = `${title} ${description}`;
  for (const r of ROSTER) {
    const names = [r.name, ...(ALIASES[r.name] ?? [])];
    if (names.some((n) => haystack.includes(n))) return r;
  }
  const extracted = extractName(title, description);
  return extracted ? lookup(extracted) : null;
}
