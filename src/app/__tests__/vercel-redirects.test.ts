import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type VercelRedirect = {
  source: string;
  destination: string;
};

const vercelConfig = JSON.parse(
  readFileSync(join(process.cwd(), 'vercel.json'), 'utf8')
) as { redirects?: VercelRedirect[] };

describe('vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const proposalBootcampRedirect = vercelConfig.redirects?.find((redirect) =>
      redirect.source === '/proposal-bootcamp' ||
      redirect.source.startsWith('/proposal-bootcamp/')
    );

    expect(proposalBootcampRedirect).toBeUndefined();
  });
});
