type StripeCheckoutSession = {
  id: string;
  url?: string | null;
  payment_status?: 'paid' | 'unpaid' | 'no_payment_required';
  status?: 'open' | 'complete' | 'expired';
  customer_details?: {
    email?: string | null;
  } | null;
  amount_total?: number | null;
  currency?: string | null;
};

function getStripeSecretKey() {
  const key = process.env.STRIPE_SECRET_KEY?.replace(/\s+/g, '');
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY env var');
  return key;
}

async function stripeRequest<T>(
  path: string,
  init: RequestInit & { form?: URLSearchParams } = {}
): Promise<T> {
  const key = getStripeSecretKey();
  const url = `https://api.stripe.com${path}`;

  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${key}`);

  let body: BodyInit | undefined = init.body as BodyInit | undefined;
  if (init.form) {
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    body = init.form.toString();
  }

  const res = await fetch(url, {
    ...init,
    headers,
    body,
    cache: 'no-store',
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // Stripe errors should still be readable; fall back to raw text
  }

  if (!res.ok) {
    const msg =
      json?.error?.message ||
      json?.message ||
      `Stripe API error (${res.status})`;
    throw new Error(msg);
  }

  return json as T;
}

export async function createCheckoutSession(params: {
  priceId?: string;
  productId?: string;
  unitAmountCents?: number;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}): Promise<StripeCheckoutSession> {
  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('success_url', params.successUrl);
  form.set('cancel_url', params.cancelUrl);
  form.set('line_items[0][quantity]', '1');

  if (params.priceId) {
    form.set('line_items[0][price]', params.priceId);
  } else if (params.productId && params.unitAmountCents != null) {
    form.set('line_items[0][price_data][product]', params.productId);
    form.set('line_items[0][price_data][currency]', 'usd');
    form.set('line_items[0][price_data][unit_amount]', String(params.unitAmountCents));
  } else {
    throw new Error('Provide either priceId or (productId + unitAmountCents)');
  }

  form.set('billing_address_collection', 'auto');

  if (params.customerEmail) form.set('customer_email', params.customerEmail);
  if (params.metadata) {
    Object.entries(params.metadata).forEach(([k, v]) => {
      form.set(`metadata[${k}]`, v);
    });
  }

  return stripeRequest<StripeCheckoutSession>('/v1/checkout/sessions', {
    method: 'POST',
    form,
  });
}

export async function retrieveCheckoutSession(
  sessionId: string
): Promise<StripeCheckoutSession> {
  return stripeRequest<StripeCheckoutSession>(
    `/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { method: 'GET' }
  );
}

