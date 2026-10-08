import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendToGoHighLevel, duplicateContactId } from '@/lib/crm';

/**
 * GHL duplicate-contact handling (2026-10-08).
 *
 * The GovCon Giants GHL location rejects a create for an email it already holds:
 *   400 {"message":"This location does not allow duplicated contacts.","meta":{"contactId":…}}
 * Both alerted failures (2026-10-05 free-handouts, 2026-10-07 newsletter) were this: a
 * real person who was already a contact signed up again, the create was refused, and
 * the new funnel tag was never applied. The fix adds the tags to the existing contact
 * (additive) and never rewrites its name/phone/tags.
 */

// Verbatim shape of the production error bodies (contact ids redacted).
const DUP_BODY = JSON.stringify({
  statusCode: 400,
  message: 'This location does not allow duplicated contacts.',
  meta: { contactName: 'Unknown', contactId: 'existing123', matchingField: 'email' },
  traceId: 't',
});

const lead = { name: 'Real Person', email: 'person@gmail.com', source: 'free-handouts' };

let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  process.env.GHL_API_KEY = 'pit-test';
  process.env.GHL_LOCATION_ID = 'loc-test';
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

const resp = (status: number, body: string) =>
  ({ ok: status >= 200 && status < 300, status, text: async () => body, json: async () => JSON.parse(body) }) as Response;

describe('duplicateContactId', () => {
  it('extracts the existing contact id from the duplicate error', () => {
    expect(duplicateContactId(DUP_BODY)).toBe('existing123');
  });
  it('ignores other 400s, non-JSON and bodies without a contact id', () => {
    expect(duplicateContactId(JSON.stringify({ message: 'email is invalid' }))).toBeNull();
    expect(duplicateContactId(JSON.stringify({ message: 'This location does not allow duplicated contacts.' }))).toBeNull();
    expect(duplicateContactId(JSON.stringify({ message: 'other', meta: { contactId: 'x' } }))).toBeNull();
    expect(duplicateContactId('<html>bad gateway</html>')).toBeNull();
  });
});

describe('sendToGoHighLevel on an existing contact', () => {
  it('adds the funnel tag to the existing contact and reports success', async () => {
    fetchMock.mockResolvedValueOnce(resp(400, DUP_BODY)).mockResolvedValueOnce(resp(201, '{"tags":["free-handouts"]}'));
    const r = await sendToGoHighLevel(lead);
    expect(r).toEqual({ ok: true, contactId: 'existing123' });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [url, init] = fetchMock.mock.calls[1];
    expect(url).toBe('https://services.leadconnectorhq.com/contacts/existing123/tags');
    expect(init.method).toBe('POST');
    // Tags only — the existing contact's name/phone are never sent.
    expect(JSON.parse(init.body)).toEqual({ tags: ['free-handouts'] });
  });

  it('carries the A/B tag through to the existing contact', async () => {
    fetchMock.mockResolvedValueOnce(resp(400, DUP_BODY)).mockResolvedValueOnce(resp(201, '{}'));
    await sendToGoHighLevel({ ...lead, source: 'newsletter', abTestId: 'cta', abVariant: 'b' });
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({ tags: ['newsletter', 'ab-cta-b'] });
  });

  it('still fails honestly when the tag add itself fails', async () => {
    fetchMock.mockResolvedValueOnce(resp(400, DUP_BODY)).mockResolvedValueOnce(resp(401, 'Unauthorized'));
    const r = await sendToGoHighLevel(lead);
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/existing contact existing123, tag add 401/);
  });

  it('does not retry any other 400', async () => {
    fetchMock.mockResolvedValueOnce(resp(400, JSON.stringify({ message: 'email is invalid' })));
    const r = await sendToGoHighLevel(lead);
    expect(r.ok).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('a new contact is unchanged: one create call', async () => {
    fetchMock.mockResolvedValueOnce(resp(201, JSON.stringify({ contact: { id: 'new1' } })));
    expect(await sendToGoHighLevel(lead)).toEqual({ ok: true, contactId: 'new1' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
