import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

type VercelRedirect = {
  source: string;
  destination: string;
  permanent?: boolean;
};

const vercelConfig = JSON.parse(
  readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'),
) as { redirects?: VercelRedirect[] };

describe('Vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const proposalBootcampRedirects = (vercelConfig.redirects ?? []).filter((redirect) => (
      redirect.source === '/proposal-bootcamp'
      || redirect.source.startsWith('/proposal-bootcamp/')
    ));

    expect(existsSync(join(process.cwd(), 'public/proposal-bootcamp/index.html'))).toBe(true);
    expect(proposalBootcampRedirects).toEqual([]);
  });
});
