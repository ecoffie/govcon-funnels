import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

import { FUNDING_DEST } from '../funding-dest';

const SRC = join(__dirname, '../..');

/**
 * encoregov.com origin (no path, optional query) still 307s to a live homepage.
 * Any path under that host 404s on gov.encore-funding.com after Encore reversed
 * the SEO-site migration (#175). This regex flags those dead deep links.
 */
const DEAD_ENCOREGOV_PATH = /https:\/\/encoregov\.com\/[^\s"'`?#]+/g;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      out.push(...walk(p));
    } else if (/\.(ts|tsx|js|mjs|html)$/.test(name)) {
      out.push(p);
    }
  }
  return out;
}

describe('Encore Funding outbound links', () => {
  it('uses the curled partner page, not encoregov.com paths that 404', () => {
    expect(FUNDING_DEST).toContain(
      'gov.encore-funding.com/govcon-giants-partner-government-contractor-funding/',
    );

    const hits: string[] = [];
    for (const file of walk(SRC)) {
      const text = readFileSync(file, 'utf8');
      for (const match of text.matchAll(DEAD_ENCOREGOV_PATH)) {
        hits.push(`${relative(SRC, file)}: ${match[0]}`);
      }
    }
    expect(hits, hits.join('\n')).toEqual([]);
  });
});
