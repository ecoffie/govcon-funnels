import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';

const ORIGINAL_GHL_API_KEY = process.env.GHL_API_KEY;
const ORIGINAL_GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

function makeContact(id: string, tag: string, dateAdded: string) {
  return {
    id,
    email: `${id}@customer.com`,
    firstName: id,
    lastName: 'Registrant',
    source: tag,
    dateAdded,
    tags: [tag],
  };
}

beforeEach(() => {
  process.env.GHL_API_KEY = 'test-key';
  process.env.GHL_LOCATION_ID = 'test-location';
});

afterEach(() => {
  vi.restoreAllMocks();

  if (ORIGINAL_GHL_API_KEY === undefined) {
    delete process.env.GHL_API_KEY;
  } else {
    process.env.GHL_API_KEY = ORIGINAL_GHL_API_KEY;
  }

  if (ORIGINAL_GHL_LOCATION_ID === undefined) {
    delete process.env.GHL_LOCATION_ID;
  } else {
    process.env.GHL_LOCATION_ID = ORIGINAL_GHL_LOCATION_ID;
  }
});

describe('getHubzoneRegistrations', () => {
  it('loads every GHL search page for each HUBZone tag', async () => {
    const topPage1 = Array.from({ length: 100 }, (_, i) =>
      makeContact(`top-${i}`, 'hubzone-webinar', '2026-06-01T12:00:00.000Z'),
    );
    const topPage2 = Array.from({ length: 25 }, (_, i) =>
      makeContact(`top-extra-${i}`, 'hubzone-webinar', '2026-06-02T12:00:00.000Z'),
    );
    const bottomPage1 = [makeContact('bottom-0', 'hubzone-webinar-bottom', '2026-06-03T12:00:00.000Z')];

    const fetchMock = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body));
      const tag = body.filters[0].value as string;
      const page = body.page as number;
      const contacts =
        tag === 'hubzone-webinar'
          ? page === 1
            ? topPage1
            : topPage2
          : bottomPage1;

      return new Response(JSON.stringify({ contacts, total: tag === 'hubzone-webinar' ? 125 : 1 }), {
        status: 200,
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const summary = await getHubzoneRegistrations(new Date('2026-06-10T00:00:00.000Z'));

    expect(summary.count).toBe(126);
    expect(summary.registrants).toHaveLength(126);
    expect(summary.registrants.some((r) => r.email === 'top-extra-24@customer.com')).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls.map(([, init]) => JSON.parse(String(init?.body)).page)).toEqual([1, 1, 2]);
  });
});
