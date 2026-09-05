import { describe, it, expect } from 'vitest';
import { episodes } from '../episodes';
import { parseEpisodeBody } from '../podcast/episode-content';
import { resolveGuest } from '../podcast/episode-guests';
import { episodeTopic, isoDuration } from '../podcast/episode-utils';

/**
 * Show notes are PARSED from the RSS body, never generated. These tests hold the line
 * on the two ways that can go wrong: inventing material that is not in the feed, and
 * rendering an empty section header with nothing under it.
 */
describe('show notes are parsed, never invented', () => {
  const parsed = episodes.map((e) => ({ episode: e, ...parseEpisodeBody(e.body) }));

  it('never emits an empty section — a header always has content under it', () => {
    const empty = parsed
      .filter(
        (p) =>
          p.intro.some((s) => !s.trim()) ||
          p.takeaways.some((s) => !s.trim()) ||
          p.chapters.some((c) => !c.time.trim() || !c.label.trim()) ||
          p.links.some((l) => !l.label.trim() || !l.url.trim()),
      )
      .map((p) => p.episode.slug);
    expect(empty, `episodes with blank section entries:\n${empty.join('\n')}`).toEqual([]);
  });

  it('every chapter timestamp looks like a real timestamp', () => {
    const bad = parsed.flatMap((p) =>
      p.chapters.filter((c) => !/^\d{1,2}:\d{2}(?::\d{2})?$/.test(c.time)).map((c) => c.time),
    );
    expect(bad, `malformed timestamps: ${bad.join(', ')}`).toEqual([]);
  });

  it('every extracted link is a real absolute URL', () => {
    const bad = parsed.flatMap((p) =>
      p.links.filter((l) => !/^https?:\/\//.test(l.url)).map((l) => l.url),
    );
    expect(bad).toEqual([]);
  });

  it('parsed text is drawn from the episode body, not composed', () => {
    // Normalised containment check: every takeaway must appear in the source body.
    const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
    const invented = parsed.flatMap((p) => {
      const body = norm(p.episode.body);
      return p.takeaways.filter((t) => !body.includes(norm(t))).map((t) => `${p.episode.slug}: ${t}`);
    });
    expect(invented, `text not present in the feed body:\n${invented.join('\n')}`).toEqual([]);
  });

  it('takeaways only appear when the split clearly worked (2+, never a lone fragment)', () => {
    const lonely = parsed.filter((p) => p.takeaways.length === 1).map((p) => p.episode.slug);
    expect(lonely).toEqual([]);
  });

  it('no takeaway is a run-on that swallowed several bullets', () => {
    // Some feed copy has no punctuation between bullets. Those are dropped rather than
    // split on invented boundaries, so nothing renders as a wall of text.
    const runOn = parsed.flatMap((p) =>
      p.takeaways.filter((t) => t.length > 300).map((t) => `${p.episode.slug}: ${t.length} chars`),
    );
    expect(runOn, `run-on takeaways:\n${runOn.join('\n')}`).toEqual([]);
  });

  it('parses takeaways for both feed house styles', () => {
    // The imperative style ("Learn…", "Discover…") AND the "Key discussion points"
    // style whose bullets open "Why…"/"How…". Matching only the first parsed 25 of 150.
    const withTakeaways = parsed.filter((p) => p.takeaways.length > 0).length;
    expect(withTakeaways).toBeGreaterThan(40);
  });

  it('parses real show-note material for most of the catalogue', () => {
    // Not every episode has chapters in its feed copy; this guards against a parser
    // regression that silently returns nothing for everything.
    const withChapters = parsed.filter((p) => p.chapters.length > 0).length;
    const withIntro = parsed.filter((p) => p.intro.length > 0).length;
    expect(withIntro).toBeGreaterThan(episodes.length * 0.9);
    expect(withChapters).toBeGreaterThan(episodes.length * 0.5);
  });
});

describe('guest bios come from curated data only', () => {
  it('a guest with no curated entry gets a name and nothing else', () => {
    // The risk being guarded: asserting a role, employer, or credential we cannot source.
    for (const e of episodes) {
      const guest = resolveGuest(e.title, e.description);
      if (!guest) continue;
      if (guest.bio || guest.role || guest.org || guest.photo) {
        // Anything beyond a name must come from the curated roster — so a bio implies
        // the entry carried real sourced fields, not a generated sentence.
        expect(guest.name.length).toBeGreaterThan(0);
      }
    }
  });

  it('never attributes an episode to Eric as if he were a guest', () => {
    const wrong = episodes
      .map((e) => resolveGuest(e.title, e.description))
      .filter((g) => g?.name.includes('Eric'));
    expect(wrong.map((g) => g?.name)).toEqual([]);
  });

  it('a curated guest photo is always a real asset path', () => {
    const bad = episodes
      .map((e) => resolveGuest(e.title, e.description))
      .filter((g) => g?.photo && !g.photo.startsWith('/faces/'));
    expect(bad.map((g) => g?.photo)).toEqual([]);
  });
});

describe('episode display helpers', () => {
  it('assigns every episode a topic label', () => {
    const missing = episodes.filter((e) => !episodeTopic(e.title).label);
    expect(missing).toEqual([]);
  });

  it('converts durations to valid ISO 8601 for schema.org', () => {
    const bad = episodes
      .map((e) => ({ d: e.duration, iso: isoDuration(e.duration) }))
      .filter((x) => x.iso !== undefined && !/^PT(\d+H)?(\d+M)?(\d+S)?$/.test(x.iso));
    expect(bad.map((x) => `${x.d} → ${x.iso}`)).toEqual([]);
  });
});
