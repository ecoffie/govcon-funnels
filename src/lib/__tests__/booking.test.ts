import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { PARTNERSHIP_CALL_URL } from '../booking';

const BROKEN_PARTNER_SLUGS = [
  '/partnership',
  '/apex-partnership',
  '/sbdc-partnership',
  '/chamber-partnership',
];

function walkTsx(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTsx(full));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

describe('partner booking destinations', () => {
  it('points partnership CTAs at the known-live discovery event', () => {
    expect(PARTNERSHIP_CALL_URL).toBe(
      'https://calendly.com/govconedumeet/gcg-bd-discovery'
    );
  });

  it('does not reintroduce the Calendly slugs that 404', () => {
    const srcRoot = path.join(__dirname, '..', '..');
    const hits: string[] = [];
    for (const file of walkTsx(srcRoot)) {
      const source = readFileSync(file, 'utf8');
      for (const slug of BROKEN_PARTNER_SLUGS) {
        if (source.includes(`calendly.com/govconedumeet${slug}`)) {
          hits.push(`${path.relative(srcRoot, file)} → ${slug}`);
        }
      }
    }
    expect(hits, `dead Calendly partnership slugs:\n${hits.join('\n')}`).toEqual([]);
  });
});
