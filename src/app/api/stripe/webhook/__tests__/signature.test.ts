import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import crypto from 'crypto';

// The route's purchase-attribution layer needs KV at import time. These tests are about
// SIGNATURE PARSING only, so stub it — otherwise a verified request fails on missing KV
// env and an acceptance test would look like a signature rejection.
vi.mock('@/lib/purchase-attribution', () => ({
  CHECKOUT_PRODUCTS: {},
  getCheckoutStart: vi.fn(async () => null),
  hasProcessedStripeEvent: vi.fn(async () => false),
  markStripeEventProcessed: vi.fn(async () => {}),
  markCheckoutStatus: vi.fn(async () => {}),
  savePurchase: vi.fn(async () => {}),
  sendPurchaseSlackNotification: vi.fn(async () => {}),
}));

const SECRET = 'whsec_test_secret_for_unit_tests';
const OTHER = 'whsec_a_different_rotating_secret';

function sign(payload: string, ts: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(`${ts}.${payload}`).digest('hex');
}

/** Import POST fresh so it picks up the env var set in beforeEach. */
async function loadPost() {
  vi.resetModules();
  return (await import('../route')).POST;
}

function req(payload: string, sigHeader: string | null) {
  return new Request('https://example.com/api/stripe/webhook', {
    method: 'POST',
    headers: sigHeader
      ? { 'content-type': 'application/json', 'stripe-signature': sigHeader }
      : { 'content-type': 'application/json' },
    body: payload,
  }) as never;
}

describe('stripe webhook signature verification', () => {
  const payload = JSON.stringify({ id: 'evt_x', type: 'checkout.session.expired', data: { object: { object: 'checkout.session', id: 'cs_x' } } });
  const ts = '1787000000';
  let good: string;
  let other: string;

  beforeEach(() => {
    process.env.STRIPE_WEBHOOK_SECRET = SECRET;
    good = sign(payload, ts, SECRET);
    other = sign(payload, ts, OTHER);
  });
  afterEach(() => { vi.restoreAllMocks(); });

  it('accepts a single valid v1', async () => {
    const POST = await loadPost();
    expect((await POST(req(payload, `t=${ts},v1=${good}`))).status).not.toBe(400);
  });

  it('THE BUG: accepts when the valid v1 comes FIRST of two (secret rotation)', async () => {
    // Object.fromEntries kept only the LAST duplicate key, discarding our match.
    // This is the shape that failed 402 of 413 real deliveries.
    const POST = await loadPost();
    expect((await POST(req(payload, `t=${ts},v1=${good},v1=${other}`))).status).not.toBe(400);
  });

  it('accepts when the valid v1 comes SECOND of two', async () => {
    const POST = await loadPost();
    expect((await POST(req(payload, `t=${ts},v1=${other},v1=${good}`))).status).not.toBe(400);
  });

  it('THE OTHER BUG: tolerates whitespace after commas', async () => {
    const POST = await loadPost();
    expect((await POST(req(payload, `t=${ts}, v1=${good}`))).status).not.toBe(400);
  });

  it('ignores a v0 scheme entry and still verifies v1', async () => {
    const POST = await loadPost();
    expect((await POST(req(payload, `t=${ts},v0=deadbeef,v1=${good}`))).status).not.toBe(400);
  });

  it('REJECTS when no v1 matches', async () => {
    const POST = await loadPost();
    expect((await POST(req(payload, `t=${ts},v1=${other}`))).status).toBe(400);
  });

  it('REJECTS a truncated signature without throwing (length mismatch)', async () => {
    const POST = await loadPost();
    expect((await POST(req(payload, `t=${ts},v1=${good.slice(0, 10)}`))).status).toBe(400);
  });

  it('REJECTS a missing signature header', async () => {
    const POST = await loadPost();
    expect((await POST(req(payload, null))).status).toBe(400);
  });

  it('REJECTS when the timestamp is absent', async () => {
    const POST = await loadPost();
    expect((await POST(req(payload, `v1=${good}`))).status).toBe(400);
  });

  it('REJECTS when the secret is unset', async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const POST = await loadPost();
    expect((await POST(req(payload, `t=${ts},v1=${good}`))).status).toBe(400);
  });
});
