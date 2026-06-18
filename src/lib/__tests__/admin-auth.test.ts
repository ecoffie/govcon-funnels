import { afterEach, describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '@/lib/admin-auth';

const ORIGINAL_PURCHASES_PASSWORD = process.env.PURCHASES_ADMIN_PASSWORD;
const ORIGINAL_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

afterEach(() => {
  if (ORIGINAL_PURCHASES_PASSWORD === undefined) {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
  } else {
    process.env.PURCHASES_ADMIN_PASSWORD = ORIGINAL_PURCHASES_PASSWORD;
  }

  if (ORIGINAL_ADMIN_PASSWORD === undefined) {
    delete process.env.ADMIN_PASSWORD;
  } else {
    process.env.ADMIN_PASSWORD = ORIGINAL_ADMIN_PASSWORD;
  }
});

describe('admin auth', () => {
  it('fails closed when no admin password is configured', () => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('accepts the configured admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBe('configured-secret');
    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('wrong-secret')).toBe(false);
  });
});
