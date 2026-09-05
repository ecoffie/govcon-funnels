import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * THE LEGACY BRIDGE CONTRACT: mi.govcongiants.com -> getmindy.ai.
 *
 * mi.govcongiants.com is a redirect-only entrance to Mindy, which is a DISTINCT PRODUCT
 * on getmindy.ai. It is deliberately NOT part of the govcongiants.com consolidation:
 * pointing it at the canonical marketing site would send users and link equity to the
 * wrong product.
 *
 * WHY THIS TEST EXISTS
 * --------------------
 * mi.govcongiants.com was listed in IMPORTANT_URLS, whose `url` check requires "200,
 * no redirect chain, <3s TTFB". A redirect-only bridge can never satisfy that, so the
 * synthetic suite was reporting a failure for a host behaving exactly as intended.
 * A permanently-red check is worse than no check: it trains people to scroll past CI.
 *
 * These assertions pin the SHAPE of the contract in source. Live behaviour is asserted
 * by runLegacyBridgeChecks() in src/lib/synthetic.ts, which runs on the 15-minute cron
 * and on /api/command-center/verify.
 */

const source = readFileSync(join(process.cwd(), 'src/lib/synthetic.ts'), 'utf8');

describe('mi.govcongiants.com is not treated as a 200-serving URL', () => {
  it('is absent from IMPORTANT_URLS', () => {
    // IMPORTANT_URLS entries are asserted to be 200 with no redirect chain. A
    // redirect-only bridge listed there is a guaranteed false failure.
    //
    // Match a quoted URL ENTRY, not any mention — the block also carries a comment
    // explaining why mi was removed, and that comment naming the host is correct.
    const block = source.slice(
      source.indexOf('const IMPORTANT_URLS'),
      source.indexOf('];', source.indexOf('const IMPORTANT_URLS')),
    );
    const entries = block.match(/^\s*['"`][^'"`]+['"`],/gm) ?? [];
    const miEntries = entries.filter((e) => e.includes('mi.govcongiants.com'));
    expect(miEntries, 'mi must not be a URL entry in IMPORTANT_URLS').toEqual([]);
  });

  it('records why it was removed, so it is not re-added', () => {
    expect(source).toMatch(/mi\.govcongiants\.com is NOT listed here/);
  });
});

describe('legacy bridge contract shape', () => {
  it('declares mi.govcongiants.com as a bridge', () => {
    expect(source).toMatch(/const LEGACY_BRIDGES/);
    expect(source).toMatch(/host: 'https:\/\/mi\.govcongiants\.com'/);
  });

  it('approves getmindy.ai as the destination — NOT govcongiants.com', () => {
    const block = source.slice(
      source.indexOf('const LEGACY_BRIDGES'),
      source.indexOf('];', source.indexOf('const LEGACY_BRIDGES')),
    );
    expect(block).toMatch(/destination: 'https:\/\/getmindy\.ai'/);
    // Mindy is a distinct product. Folding mi into the marketing site would send
    // users and link equity to the wrong place.
    expect(block.includes('govcongiants.com')).toBe(true); // the host itself
    expect(block).not.toMatch(/destination: 'https:\/\/govcongiants\.com'/);
  });

  it('probes both the root and a deep path', () => {
    const block = source.slice(
      source.indexOf('const LEGACY_BRIDGES'),
      source.indexOf('];', source.indexOf('const LEGACY_BRIDGES')),
    );
    expect(block).toMatch(/paths: \['\/', '\/pricing'\]/);
  });

  it('requires a PERMANENT redirect', () => {
    expect(source).toMatch(/res\.status === 301 \|\| res\.status === 308/);
  });

  it('requires the EXACT approved destination, not merely the right host', () => {
    expect(source).toMatch(/exactDestination = location === target/);
  });

  it('treats a 200 as a failure — no independent indexable content', () => {
    expect(source).toMatch(/SERVING 200 — a legacy bridge must not serve indexable content/);
  });

  it('rejects a cycle back to the bridge host', () => {
    expect(source).toMatch(/noCycle = !location\.startsWith\(bridge\.host\)/);
  });

  it('rejects unexpected intermediate hostnames', () => {
    expect(source).toMatch(/const UNEXPECTED_INTERMEDIATES/);
    for (const host of [
      'govcongiants.com',
      'app.govcongiants.org',
      'podcast.govcongiants.org',
      'shop.govcongiants.com',
    ]) {
      expect(source.includes(`'${host}'`), `${host} should be an unexpected intermediate`).toBe(
        true,
      );
    }
  });

  it('asserts query strings survive the hop', () => {
    // Tracked and paginated links break silently if the query is dropped.
    expect(source).toMatch(/utm_source=synthetic&page=2/);
    expect(source).toMatch(/query preserved/);
  });

  it('does not follow redirects when asserting — the FIRST response is the contract', () => {
    const block = source.slice(source.indexOf('runLegacyBridgeChecks'));
    expect(block).toMatch(/redirect: 'manual'/);
  });

  it('is wired into the synthetic suite', () => {
    expect(source).toMatch(/runLegacyBridgeChecks\(\),/);
    expect(source).toMatch(/\.\.\.bridges/);
  });
});
