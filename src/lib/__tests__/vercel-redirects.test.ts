import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

type VercelRedirect = {
  source: string;
  destination: string;
  permanent?: boolean;
};

async function readRedirects(): Promise<VercelRedirect[]> {
  const vercelConfig = JSON.parse(
    await readFile(path.join(process.cwd(), 'vercel.json'), 'utf8')
  ) as { redirects?: VercelRedirect[] };

  return vercelConfig.redirects ?? [];
}

describe('vercel redirects', () => {
  it('keeps the static proposal bootcamp funnel routable', async () => {
    const redirects = await readRedirects();
    const proposalRedirects = redirects.filter((redirect) =>
      redirect.source === '/proposal-bootcamp' ||
      redirect.source.startsWith('/proposal-bootcamp/')
    );

    expect(proposalRedirects).toEqual([]);
  });

  it('keeps the proposal bootcamp shortlink pointed at the funnel', async () => {
    const redirects = await readRedirects();
    const pbRedirect = redirects.find((redirect) => redirect.source === '/pb');

    expect(pbRedirect).toMatchObject({
      destination: '/proposal-bootcamp',
      permanent: false,
    });
  });
});
