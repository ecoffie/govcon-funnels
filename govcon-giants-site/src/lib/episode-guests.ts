/**
 * Resolves the person featured in an episode to a real, verified bio — never
 * invented. Sources, in order: an explicit episode→name map, then a scan of
 * the title/description against the Summit speaker roster and the featured
 * guest list (both carry real roles, orgs, and credentials).
 */
import { speakers } from '@/data/speakers';
import { featuredEpisodes } from '@/data/featuredEpisodes';

export interface ResolvedGuest {
  name: string;
  role?: string;
  org?: string;
  /** A real one-line bio/credential — from curated data only. */
  bio?: string;
  /** Real headshot from the roster, if we have one. */
  photo?: string;
}

/** Interview episodes whose thumb is a real guest (not Eric). */
const KNOWN: Record<number, string> = {
  1: 'Katie Arrington',
  50: 'Julien Harris',
  92: 'Lee Rossey',
  113: 'Judy Bradt',
  143: 'Sam Le',
};

interface RosterEntry {
  name: string;
  role?: string;
  org?: string;
  bio?: string;
  photo?: string;
  /** Extra spellings that appear in episode copy. */
  aliases?: string[];
}

/** Build a de-duped roster of people we have real data for. */
function buildRoster(): RosterEntry[] {
  const byName = new Map<string, RosterEntry>();
  for (const s of speakers) {
    byName.set(s.name, {
      name: s.name,
      role: s.role,
      org: s.org,
      bio: s.credential,
      photo: s.photo,
    });
  }
  for (const f of featuredEpisodes) {
    if (!byName.has(f.guest)) {
      const bio = f.blurb?.replace(/\s*…?\s*$/, '').trim();
      byName.set(f.guest, { name: f.guest, role: f.role, org: f.agency, bio, photo: f.photo });
    }
  }
  const roster = [...byName.values()];
  // Common spelling drift between the two data sources.
  const jackie = roster.find((r) => r.name.startsWith('Jackie Robinson'));
  if (jackie) jackie.aliases = ['Jackie Robinson-Burnette', 'Jackie Robinson-Burnett'];
  // Match longer names first so "John Cook" can't shadow a longer name.
  return roster.sort((a, b) => b.name.length - a.name.length);
}

const ROSTER = buildRoster();

// Pull a guest name straight from the episode copy when we have no roster
// entry — name only, never a fabricated bio.
const NAME = "([A-Z][a-z]+(?:\\s[A-Z][a-z.'\\-]+){1,2})";
const NAME_PATTERNS = [
  new RegExp('sits? down with ' + NAME),
  new RegExp('sat down with ' + NAME),
  new RegExp('with guest ' + NAME),
  new RegExp('interviews? (?:with )?' + NAME),
  new RegExp('Eric (?:talks|speaks|chats) (?:to|with) ' + NAME),
  new RegExp(NAME + ' (?:breaks down|explains|reveals|shares|joins|walks us)'),
];
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
    (r) => r.name === name || r.aliases?.includes(name),
  );
  return hit
    ? { name: hit.name, role: hit.role, org: hit.org, bio: hit.bio, photo: hit.photo }
    : { name };
}

/**
 * Returns the featured guest for an episode, or null when it's Eric solo /
 * no identifiable guest. `index` keys the explicit map; title+description are
 * scanned against the roster otherwise.
 */
export function resolveGuest(
  index: number,
  title: string,
  description: string,
): ResolvedGuest | null {
  if (KNOWN[index]) return lookup(KNOWN[index]);
  const haystack = `${title} ${description}`;
  for (const r of ROSTER) {
    const names = [r.name, ...(r.aliases ?? [])];
    if (names.some((n) => haystack.includes(n))) {
      return { name: r.name, role: r.role, org: r.org, bio: r.bio, photo: r.photo };
    }
  }
  // Fall back to a name pulled from the episode copy (no bio unless the name
  // happens to be in the roster).
  const extracted = extractName(title, description);
  return extracted ? lookup(extracted) : null;
}
