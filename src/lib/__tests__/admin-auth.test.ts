import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { extractPassword, isAuthorized } from '../admin-auth';

describe('admin-auth', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('fails closed when no admin password is configured', () => {
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('authorizes the configured purchases admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';

    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('wrong-secret')).toBe(false);
  });

  it('falls back to ADMIN_PASSWORD when the purchases password is unset', () => {
    process.env.ADMIN_PASSWORD = 'ecosystem-secret';

    expect(isAuthorized('ecosystem-secret')).toBe(true);
  });

  it('extracts passwords from query, header, and bearer auth', () => {
    const queryReq = {
      nextUrl: { searchParams: new URLSearchParams('password=query-secret') },
      headers: { get: () => null },
    };
    expect(extractPassword(queryReq)).toBe('query-secret');

    const headerReq = {
      headers: { get: (name: string) => (name === 'x-admin-password' ? 'header-secret' : null) },
    };
    expect(extractPassword(headerReq)).toBe('header-secret');

    const bearerReq = {
      headers: { get: (name: string) => (name === 'authorization' ? 'Bearer bearer-secret' : null) },
    };
    expect(extractPassword(bearerReq)).toBe('bearer-secret');
  });
});
