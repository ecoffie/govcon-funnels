import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitLead } from '@/lib/lead-submit';

describe('submitLead', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts lead payloads to the lead API', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(
      submitLead({ email: 'person@example.com', source: 'homepage' })
    ).resolves.toEqual({ success: true });

    expect(fetchMock).toHaveBeenCalledWith('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'person@example.com', source: 'homepage' }),
    });
  });

  it('throws on rate limits so callers do not redirect or track conversions', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: 'Too many requests. Please slow down.' }), {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        })
      )
    );

    await expect(
      submitLead({ email: 'person@example.com', source: 'homepage' })
    ).rejects.toMatchObject({
      name: 'LeadSubmitError',
      message: 'Too many requests. Please slow down.',
      status: 429,
      retryAfter: 60,
    });
  });

  it('throws a safe fallback message for non-JSON server errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('Bad gateway', { status: 502 }))
    );

    await expect(
      submitLead({ email: 'person@example.com', source: 'homepage' })
    ).rejects.toMatchObject({
      name: 'LeadSubmitError',
      message: 'We could not save your signup. Please try again.',
      status: 502,
    });
  });
});
