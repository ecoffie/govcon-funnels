import { describe, expect, it, vi } from 'vitest';
import {
  LEAD_RATE_LIMIT_MESSAGE,
  LEAD_SUBMISSION_ERROR_MESSAGE,
  LeadSubmissionError,
  getLeadSubmissionErrorMessage,
  submitLead,
} from '../lead-submit';

const mockFetch = vi.mocked(global.fetch);

describe('submitLead', () => {
  it('resolves when /api/lead accepts the signup', async () => {
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 200 }));

    await expect(submitLead({ email: 'test@example.com' })).resolves.toBeUndefined();

    expect(mockFetch).toHaveBeenCalledWith('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });
  });

  it('throws a retry message when /api/lead rate-limits the signup', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Retry-After': '60' },
      })
    );

    await expect(submitLead({ email: 'test@example.com' })).rejects.toMatchObject({
      name: 'LeadSubmissionError',
      message: LEAD_RATE_LIMIT_MESSAGE,
      status: 429,
      retryAfter: '60',
    });
  });

  it('throws a generic message when /api/lead rejects for another reason', async () => {
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 500 }));

    await expect(submitLead({ email: 'test@example.com' })).rejects.toMatchObject({
      name: 'LeadSubmissionError',
      message: LEAD_SUBMISSION_ERROR_MESSAGE,
      status: 500,
    });
  });

  it('normalizes network failures into a lead submission error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network down'));

    await expect(submitLead({ email: 'test@example.com' })).rejects.toMatchObject({
      name: 'LeadSubmissionError',
      message: LEAD_SUBMISSION_ERROR_MESSAGE,
    });
  });
});

describe('getLeadSubmissionErrorMessage', () => {
  it('returns the user-facing message from lead submission errors', () => {
    expect(
      getLeadSubmissionErrorMessage(new LeadSubmissionError(LEAD_RATE_LIMIT_MESSAGE, 429))
    ).toBe(LEAD_RATE_LIMIT_MESSAGE);
  });

  it('returns the generic message for unexpected errors', () => {
    expect(getLeadSubmissionErrorMessage(new Error('boom'))).toBe(
      LEAD_SUBMISSION_ERROR_MESSAGE
    );
  });
});
