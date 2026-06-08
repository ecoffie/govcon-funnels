import { beforeEach, describe, expect, it, vi } from 'vitest';

const redisState = vi.hoisted(() => ({
  values: new Map<string, unknown>(),
  sets: new Map<string, Set<string>>(),
}));

vi.mock('@upstash/redis', () => ({
  Redis: class {
    async get<T>(key: string): Promise<T | null> {
      return (redisState.values.get(key) as T | undefined) ?? null;
    }

    async set(key: string, value: unknown): Promise<'OK'> {
      redisState.values.set(key, value);
      return 'OK';
    }

    async sadd(key: string, member: string): Promise<number> {
      const set = redisState.sets.get(key) ?? new Set<string>();
      const before = set.size;
      set.add(member);
      redisState.sets.set(key, set);
      return set.size - before;
    }

    async smembers(key: string): Promise<string[]> {
      return Array.from(redisState.sets.get(key) ?? []);
    }
  },
}));

const originalPurchaseSite = process.env.PURCHASE_SITE;
const originalKvUrl = process.env.KV_REST_API_URL;
const originalKvToken = process.env.KV_REST_API_TOKEN;

async function loadPurchaseAttribution(site: string) {
  vi.resetModules();
  process.env.PURCHASE_SITE = site;
  process.env.KV_REST_API_URL = 'https://redis.example.test';
  process.env.KV_REST_API_TOKEN = 'test-token';
  return import('@/lib/purchase-attribution');
}

beforeEach(() => {
  redisState.values.clear();
  redisState.sets.clear();

  if (originalPurchaseSite === undefined) {
    delete process.env.PURCHASE_SITE;
  } else {
    process.env.PURCHASE_SITE = originalPurchaseSite;
  }

  if (originalKvUrl === undefined) {
    delete process.env.KV_REST_API_URL;
  } else {
    process.env.KV_REST_API_URL = originalKvUrl;
  }

  if (originalKvToken === undefined) {
    delete process.env.KV_REST_API_TOKEN;
  } else {
    process.env.KV_REST_API_TOKEN = originalKvToken;
  }
});

describe('purchase attribution storage migration', () => {
  it('keeps pre-site-namespacing purchase records visible in reports', async () => {
    const legacyPurchase = {
      id: 'cs_legacy',
      event_id: 'evt_legacy',
      event_type: 'checkout.session.completed',
      status: 'paid' as const,
      product_id: 'pro-member-plan',
      product_name: 'Pro Member Plan',
      amount_cents: 99700,
      created_at: '2026-06-01T10:00:00.000Z',
    };
    const mindyPurchase = {
      id: 'cs_mindy',
      site: 'mindy',
      event_id: 'evt_mindy',
      event_type: 'checkout.session.completed',
      status: 'paid' as const,
      product_id: 'mindy-pro-monthly',
      product_name: 'Mindy Pro Monthly',
      amount_cents: 14900,
      created_at: '2026-06-02T10:00:00.000Z',
    };
    redisState.sets.set('gfd:purchase:purchases', new Set(['cs_legacy', 'mindy:cs_mindy']));
    redisState.values.set('gfd:purchase:purchase:cs_legacy', legacyPurchase);
    redisState.values.set('gfd:purchase:mindy:purchase:cs_mindy', mindyPurchase);

    const { buildPurchaseReport } = await loadPurchaseAttribution('gcg');
    const report = await buildPurchaseReport();

    expect(report.totals.paid_count).toBe(2);
    expect(report.totals.paid_revenue_cents).toBe(114600);
    expect(report.purchases.map((purchase) => purchase.id)).toEqual(['cs_mindy', 'cs_legacy']);
    expect(report.by_site).toEqual([
      { site: 'gcg', count: 1, paid_count: 1, paid_revenue_cents: 99700 },
      { site: 'mindy', count: 1, paid_count: 1, paid_revenue_cents: 14900 },
    ]);
  });

  it('deduplicates Stripe webhook events globally across sites', async () => {
    const gcg = await loadPurchaseAttribution('gcg');
    await gcg.markStripeEventProcessed('evt_shared');

    expect(redisState.values.has('gfd:purchase:stripe-event:evt_shared')).toBe(true);
    expect(redisState.values.has('gfd:purchase:gcg:stripe-event:evt_shared')).toBe(false);

    const mindy = await loadPurchaseAttribution('mindy');
    await expect(mindy.hasProcessedStripeEvent('evt_shared')).resolves.toBe(true);
  });

  it('recognizes site-scoped event markers written before global dedup was restored', async () => {
    redisState.values.set('gfd:purchase:mindy:stripe-event:evt_existing', '1');

    const { hasProcessedStripeEvent } = await loadPurchaseAttribution('gcg');

    await expect(hasProcessedStripeEvent('evt_existing')).resolves.toBe(true);
  });

  it('resolves checkout starts across sites and from legacy global keys', async () => {
    const mindy = await loadPurchaseAttribution('mindy');
    const checkoutStart = await mindy.createCheckoutStart({
      product: mindy.CHECKOUT_PRODUCTS['mindy-pro-monthly'],
      sourceUrl: 'https://getmindy.ai/mi',
      attribution: { last_touch: { utm_source: 'google' } },
    });

    const gcg = await loadPurchaseAttribution('gcg');
    await expect(gcg.getCheckoutStart(checkoutStart.id)).resolves.toMatchObject({
      id: checkoutStart.id,
      product_id: 'mindy-pro-monthly',
      attribution: { last_touch: { utm_source: 'google' } },
    });

    redisState.values.set('gfd:purchase:checkout:legacy_checkout', {
      ...checkoutStart,
      id: 'legacy_checkout',
      attribution: { last_touch: { utm_source: 'newsletter' } },
    });

    await expect(gcg.getCheckoutStart('legacy_checkout')).resolves.toMatchObject({
      id: 'legacy_checkout',
      attribution: { last_touch: { utm_source: 'newsletter' } },
    });
  });
});
