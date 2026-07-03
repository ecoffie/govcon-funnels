import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/supabase-leads', () => ({
  getMindyDayRegistrantsFromSupabase: vi.fn(),
}));

vi.mock('@/lib/purchase-attribution', () => ({
  listPurchases: vi.fn(),
}));

import { GET } from '../route';
import { listPurchases } from '@/lib/purchase-attribution';
import { getMindyDayRegistrantsFromSupabase } from '@/lib/supabase-leads';

const ORIGINAL_ENV = { ...process.env };

function authedRequest() {
  return new NextRequest('https://govcongiants.com/api/admin/apex-offer?dry=1', {
    headers: { 'x-admin-password': 'admin-secret' },
  });
}

describe('/api/admin/apex-offer', () => {
  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      PURCHASES_ADMIN_PASSWORD: 'admin-secret',
    };
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('suppresses GovCon-hosted Mindy product buyers', async () => {
    vi.mocked(getMindyDayRegistrantsFromSupabase).mockResolvedValue([
      { email: 'buyer@example.com', name: 'Buyer' },
      { email: 'lead@example.com', name: 'Lead' },
      { email: 'mindy-site@example.com', name: 'Mindy Site Buyer' },
    ]);
    vi.mocked(listPurchases).mockResolvedValue([
      {
        id: 'cs_mindy_product',
        site: 'gcg',
        event_id: 'evt_1',
        event_type: 'checkout.session.completed',
        status: 'paid',
        product_id: 'mindy-pro-monthly',
        product_name: 'Mindy Pro Monthly',
        customer_email: 'buyer@example.com',
        created_at: '2026-06-28T16:00:00.000Z',
      },
      {
        id: 'cs_gcg_product',
        site: 'gcg',
        event_id: 'evt_2',
        event_type: 'checkout.session.completed',
        status: 'paid',
        product_id: 'pro-member-plan',
        product_name: 'Pro Member Plan',
        customer_email: 'lead@example.com',
        created_at: '2026-06-28T16:00:00.000Z',
      },
      {
        id: 'cs_mindy_site',
        site: 'mindy',
        event_id: 'evt_3',
        event_type: 'checkout.session.completed',
        status: 'paid',
        product_id: 'unknown',
        product_name: 'Mindy Checkout',
        customer_email: 'mindy-site@example.com',
        created_at: '2026-06-28T16:00:00.000Z',
      },
    ]);

    const response = await GET(authedRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.weekendMindyBuyers).toBe(2);
    expect(body.suppressedFromThisList).toBe(2);
    expect(body.recipientCount).toBe(1);
    expect(body.sampleRecipients).toEqual([{ name: 'Lead', email: 'lead@example.com' }]);
  });
});
