import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cronAuthorized, urlCarriesCredential } from '../cron-auth';

const ORIGINAL_ENV = { ...process.env };

/**
 * These tests assert on SHAPE, never on any real secret value. The literals
 * below are fixtures invented for the test.
 */
const CRON = 'test-cron-secret-value';
const ADMIN = 'test-admin-secret-value';

function req(headers: Record<string, string> = {}) {
  return { headers: new Headers(headers) };
}

describe('cronAuthorized', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.CRON_SECRET;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
  });
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('fails closed when nothing is configured', () => {
    expect(cronAuthorized(req({ authorization: `Bearer ${CRON}` }))).toBe(false);
    expect(cronAuthorized(req({ 'x-admin-password': ADMIN }))).toBe(false);
  });

  it('accepts the scheduler bearer secret', () => {
    process.env.CRON_SECRET = CRON;
    expect(cronAuthorized(req({ authorization: `Bearer ${CRON}` }))).toBe(true);
  });

  it('rejects a wrong bearer secret', () => {
    process.env.CRON_SECRET = CRON;
    expect(cronAuthorized(req({ authorization: 'Bearer wrong-value-here-xxxxx' }))).toBe(false);
    expect(cronAuthorized(req({ authorization: `Bearer ${CRON}x` }))).toBe(false);
  });

  it('rejects an unauthenticated request', () => {
    process.env.CRON_SECRET = CRON;
    process.env.PURCHASES_ADMIN_PASSWORD = ADMIN;
    expect(cronAuthorized(req())).toBe(false);
  });

  it('rejects a spoofed x-vercel-cron header with no secret', () => {
    process.env.CRON_SECRET = CRON;
    expect(cronAuthorized(req({ 'x-vercel-cron': '1' }))).toBe(false);
  });

  it('accepts the admin secret via the x-admin-password header', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = ADMIN;
    expect(cronAuthorized(req({ 'x-admin-password': ADMIN }))).toBe(true);
  });

  it('accepts the admin secret via a bearer header', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = ADMIN;
    expect(cronAuthorized(req({ authorization: `Bearer ${ADMIN}` }))).toBe(true);
  });

  it('honours ADMIN_PASSWORD as a fallback name', () => {
    process.env.ADMIN_PASSWORD = ADMIN;
    expect(cronAuthorized(req({ 'x-admin-password': ADMIN }))).toBe(true);
  });

  it('cannot be reached through a query string: the helper only reads headers', () => {
    process.env.CRON_SECRET = CRON;
    process.env.PURCHASES_ADMIN_PASSWORD = ADMIN;
    // A caller that puts the credential in the URL has no header, so it is
    // unauthenticated no matter what the URL says.
    expect(cronAuthorized(req())).toBe(false);
  });
});

describe('urlCarriesCredential (shape guard)', () => {
  it('flags a credential carried in the URL', () => {
    expect(urlCarriesCredential('https://example.com/api/cron/x?password=anything')).toBe(true);
    expect(urlCarriesCredential('https://example.com/api/cron/x?type=a&secret=anything')).toBe(true);
    expect(urlCarriesCredential('https://example.com/api/cron/x?token=anything')).toBe(true);
    expect(urlCarriesCredential('https://example.com/api/cron/x?API_KEY=anything')).toBe(true);
  });

  it('passes a clean scheduler route value', () => {
    expect(urlCarriesCredential('https://govcongiants.com/api/cron/mindy-day-reminders/live')).toBe(false);
    expect(urlCarriesCredential('https://govcongiants.com/api/cron/mindy-reignite')).toBe(false);
    // Non-credential query params are fine.
    expect(urlCarriesCredential('https://govcongiants.com/api/cron/x?dry=1&limit=40')).toBe(false);
  });
});
