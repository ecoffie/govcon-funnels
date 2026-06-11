import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';

const originalGhlApiKey = process.env.GHL_API_KEY;
const originalGhlLocationId = process.env.GHL_LOCATION_ID;

function contact(id: string, email: string, dateAdded = '2026-06-10T12:00:00.000Z') {
  return {
    id,
    email,
    firstName: 'Gov',
    lastName: 'Con',
    source: 'hubzone-webinar',
    dateAdded,
    tags: ['hubzone-webinar'],
  };
}

beforeEach(() => {
  process.env.GHL_API_KEY = 'ghl-test-key';
  process.env.GHL_LOCATION_ID = 'ghl-location';
});

afterEach(() => {
  vi.unstubAllGlobals();

  if (originalGhlApiKey === undefined) {
    delete process.env.GHL_API_KEY;
  } else {
    process.env.GHL_API_KEY = originalGhlApiKey;
  }

  if (originalGhlLocationId === undefined) {
    delete process.env.GHL_LOCATION_ID;
  } else {
    process.env.GHL_LOCATION_ID = originalGhlLocationId;
  }
});

describe('getHubzoneRegistrations', () => {
  it('paginates GHL tag searches and keeps real plus-addressed registrants', async () => {
    const firstPage = Array.from({ length: 100 }, (_, i) => contact(`contact-${i}`, `person${i}@gmail.com`));
    const secondPage = [
      contact('contact-plus', 'real+hubzone@gmail.com'),
      contact('contact-test', 'test+qa@gmail.com'),
    ];
    const requests: Array<{ tag: string; page: number; pageLimit: number }> = [];

    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body ?? '{}'));
      const tag = body.filters?.[0]?.value;
      const page = body.page;
      requests.push({ tag, page, pageLimit: body.pageLimit });

      const contacts = tag === 'hubzone-webinar'
        ? page === 1
          ? firstPage
          : page === 2
            ? secondPage
            : []
        : [];

      return {
        ok: true,
        json: async () => ({ contacts, total: tag === 'hubzone-webinar' ? 102 : 0 }),
      } as Response;
    });
    vi.stubGlobal('fetch', fetchMock);

    const summary = await getHubzoneRegistrations(new Date('2026-06-11T12:00:00.000Z'));

    expect(summary.count).toBe(101);
    expect(summary.registrants.some((r) => r.email === 'real+hubzone@gmail.com')).toBe(true);
    expect(summary.registrants.some((r) => r.email === 'test+qa@gmail.com')).toBe(false);
    expect(requests).toContainEqual({ tag: 'hubzone-webinar', page: 2, pageLimit: 100 });
  });
});
