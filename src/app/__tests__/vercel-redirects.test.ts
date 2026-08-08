import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

type VercelRedirect = {
  source: string;
  destination: string;
};

describe('vercel redirects', () => {
  it('does not shadow the static proposal bootcamp funnel', () => {
    const config = JSON.parse(
      readFileSync(join(process.cwd(), 'vercel.json'), 'utf8')
    ) as { redirects?: VercelRedirect[] };

    const proposalBootcampRedirects = (config.redirects ?? []).filter((redirect) =>
      redirect.source.startsWith('/proposal-bootcamp')
    );

    expect(proposalBootcampRedirects).toEqual([]);
  });
});
