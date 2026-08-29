export class LeadSubmissionError extends Error {
  status?: number;
  retryAfter?: string | null;

  constructor(message: string, options: { status?: number; retryAfter?: string | null } = {}) {
    super(message);
    this.name = 'LeadSubmissionError';
    this.status = options.status;
    this.retryAfter = options.retryAfter;
  }
}

const GENERIC_ERROR =
  'We could not process your signup. Please try again in a moment.';

function errorMessageForStatus(status: number, fallback?: string): string {
  if (status === 429) {
    return 'Too many signups from this network. Please wait a minute and try again.';
  }
  return fallback || GENERIC_ERROR;
}

export async function submitLead(payload: Record<string, unknown>): Promise<void> {
  let response: Response;

  try {
    response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new LeadSubmissionError(
      'Network error. Please check your connection and try again.'
    );
  }

  if (response.ok) return;

  let apiMessage: string | undefined;
  try {
    const data = await response.json();
    if (typeof data?.error === 'string') {
      apiMessage = data.error;
    }
  } catch {
    // Ignore malformed error bodies; status-specific copy below is enough.
  }

  throw new LeadSubmissionError(errorMessageForStatus(response.status, apiMessage), {
    status: response.status,
    retryAfter: response.headers.get('Retry-After'),
  });
}
