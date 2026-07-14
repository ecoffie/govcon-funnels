export const LEAD_RATE_LIMIT_MESSAGE =
  'Too many signups were sent from this network. Please wait a minute and try again so we can finish your registration.';

export const LEAD_SUBMISSION_ERROR_MESSAGE =
  'We could not process your signup. Please try again in a moment.';

export type LeadSubmissionPayload = Record<string, unknown>;

export class LeadSubmissionError extends Error {
  status?: number;
  retryAfter?: string | null;

  constructor(message: string, status?: number, retryAfter?: string | null) {
    super(message);
    this.name = 'LeadSubmissionError';
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

export async function submitLead(payload: LeadSubmissionPayload): Promise<void> {
  let response: Response;

  try {
    response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new LeadSubmissionError(LEAD_SUBMISSION_ERROR_MESSAGE);
  }

  if (response.ok) return;

  const retryAfter = response.headers.get('Retry-After');
  throw new LeadSubmissionError(
    response.status === 429 ? LEAD_RATE_LIMIT_MESSAGE : LEAD_SUBMISSION_ERROR_MESSAGE,
    response.status,
    retryAfter
  );
}

export function getLeadSubmissionErrorMessage(error: unknown): string {
  if (error instanceof LeadSubmissionError) return error.message;
  return LEAD_SUBMISSION_ERROR_MESSAGE;
}
