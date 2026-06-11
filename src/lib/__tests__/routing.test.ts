import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import nextConfig from '../../../next.config';
import { CHECKOUT_PRODUCTS } from '@/lib/purchase-attribution';

describe('critical marketing funnel routing', () => {
  it('does not redirect proposal bootcamp static funnel paths away from public files', () => {
    const vercelConfig = JSON.parse(readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')) as {
      redirects?: Array<{ source: string; destination: string }>;
    };

    const proposalRedirects = vercelConfig.redirects?.filter((redirect) =>
      redirect.source === '/proposal-bootcamp' || redirect.source.startsWith('/proposal-bootcamp/')
    );

    expect(proposalRedirects).toEqual([]);
  });

  it('rewrites the clean proposal bootcamp path to the static landing page', async () => {
    const rewrites = await nextConfig.rewrites?.();
    expect(Array.isArray(rewrites)).toBe(false);
    if (!rewrites || Array.isArray(rewrites)) throw new Error('Expected grouped rewrites');

    expect(rewrites.beforeFiles).toContainEqual({
      source: '/proposal-bootcamp',
      destination: '/proposal-bootcamp/index.html',
    });
  });

  it('keeps the Jan 31 paid bootcamp routes available for linked paid funnel traffic', () => {
    for (const routeFile of [
      'src/app/jan-31-bootcamp-paid/page.tsx',
      'src/app/jan-31-bootcamp-paid/checkout/page.tsx',
      'src/app/jan-31-bootcamp-paid/success/page.tsx',
      'src/app/jan-31-bootcamp-paid/course/page.tsx',
    ]) {
      expect(existsSync(path.join(process.cwd(), routeFile))).toBe(true);
    }

    expect(CHECKOUT_PRODUCTS['jan-31-bootcamp-paid']?.checkoutUrl).toBe('/jan-31-bootcamp-paid/checkout');
  });
});
