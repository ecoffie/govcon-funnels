import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { extractPassword, getAdminPassword, isAuthorized } from '../admin-auth';

const ORIGINAL_ENV = {
  PURCHASES_ADMIN_PASSWORD: process.env.PURCHASES_ADMIN_PASSWORD,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

function restoreEnv() {
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

describe('admin auth', () => {
  beforeEach(() => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
  });

  afterEach(() => {
    restoreEnv();
  });

  it('fails closed when no admin secret is configured', () => {
    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('accepts the configured admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';

    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('wrong-secret')).toBe(false);
  });

  it('extracts passwords from query, header, or bearer auth', () => {
    const req = {
      nextUrl: { searchParams: new URLSearchParams('password=from-query') },
      headers: { get: () => null },
    };
    expect(extractPassword(req)).toBe('from-query');

    expect(extractPassword({
      headers: { get: (name) => (name === 'x-admin-password' ? 'from-header' : null) },
    })).toBe('from-header');

    expect(extractPassword({
      headers: { get: (name) => (name === 'authorization' ? 'Bearer from-bearer' : null) },
    })).toBe('from-bearer');
  });
});
