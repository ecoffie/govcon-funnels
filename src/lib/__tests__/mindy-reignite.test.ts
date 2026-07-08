import { afterEach, describe, expect, it, vi } from 'vitest';
import { runSend } from '../mindy-reignite';

const OLD_STAMP = 'reignite-stamp:d0:2026-07-01';

describe('mindy re-ignite drip engine', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('caps serverless send work so a large due cohort is deferred cleanly', async () => {
    const contacts = [
      { id: 'c1', email: 'one@govcongiants.co', tags: ['mindy-profile-incomplete', 'reignite-d0', OLD_STAMP] },
      { id: 'c2', email: 'two@govcongiants.co', tags: ['mindy-profile-incomplete', 'reignite-d0', OLD_STAMP] },
    ];

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (_input, init) => {
      const body = init?.body ? JSON.parse(String(init.body)) : {};
      if (body.filters) {
        const tag = body.filters[0].value;
        return new Response(JSON.stringify({ contacts: tag === 'reignite-d0' ? contacts : [] }), { status: 200 });
      }
      return new Response('{}', { status: 200 });
    });

    const result = await runSend(
      { token: 'pit-test', location: 'loc', profileUrl: 'https://getmindy.ai/app' },
      new Date('2026-07-08T12:00:00Z'),
      { workLimit: 1 }
    );

    const messageCalls = fetchMock.mock.calls.filter(([input]) =>
      String(input).includes('/conversations/messages')
    );
    expect(messageCalls).toHaveLength(1);
    expect(result).toMatchObject({ advanced: 1, workDone: 1, limitReached: true });
  });
});
