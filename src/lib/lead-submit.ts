export type LeadSubmitPayload = {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  redirectUrl?: string;
  tags?: string[];
  abTestId?: string | null;
  abVariant?: string | null;
};

export class LeadSubmitError extends Error {
  status?: number;
  retryAfter?: number;

  constructor(message: string, options: { status?: number; retryAfter?: number } = {}) {
    super(message);
    this.name = 'LeadSubmitError';
    this.status = options.status;
    this.retryAfter = options.retryAfter;
  }
}

async function errorFromResponse(response: Response): Promise<LeadSubmitError> {
  const retryAfter = Number(response.headers.get('Retry-After') || 0) || undefined;
  let message =
    response.status === 429
      ? 'Too many signup attempts. Please wait a minute and try again.'
      : 'We could not save your signup. Please try again.';

  try {
    const body = (await response.clone().json()) as { error?: unknown };
    if (typeof body.error === 'string' && body.error.trim()) {
      message = body.error.trim();
    }
  } catch {
    // Keep the status-specific fallback when the response body is not JSON.
  }

  return new LeadSubmitError(message, { status: response.status, retryAfter });
}

export async function submitLead(payload: LeadSubmitPayload): Promise<unknown> {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await errorFromResponse(response);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
