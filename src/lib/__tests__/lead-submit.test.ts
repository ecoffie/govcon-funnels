import { afterEach, describe, expect, it, vi } from 'vitest';
import { LeadSubmissionError, submitLead } from '../lead-submit';

describe('submitLead', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('posts lead payloads to the lead API', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));

    await submitLead({ email: 'test@example.com', source: 'unit-test' });

    expect(fetchMock).toHaveBeenCalledWith('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', source: 'unit-test' }),
    });
  });

  it('rejects rate-limited responses so callers do not show false success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Too many requests.' }), {
        status: 429,
        headers: { 'Retry-After': '45' },
      })
    );

    await expect(submitLead({ email: 'test@example.com' })).rejects.toMatchObject({
      name: 'LeadSubmissionError',
      status: 429,
      retryAfter: '45',
      message: 'Too many signups from this network. Please wait a minute and try again.',
    } satisfies Partial<LeadSubmissionError>);
  });

  it('uses API error messages for non-rate-limit failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 })
    );

    await expect(submitLead({ source: 'unit-test' })).rejects.toMatchObject({
      name: 'LeadSubmissionError',
      status: 400,
      message: 'Email is required',
    } satisfies Partial<LeadSubmissionError>);
  });

  it('rejects network failures so users can retry the signup', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('socket closed'));

    await expect(submitLead({ email: 'test@example.com' })).rejects.toMatchObject({
      name: 'LeadSubmissionError',
      message: 'Network error. Please check your connection and try again.',
    } satisfies Partial<LeadSubmissionError>);
  });
});
