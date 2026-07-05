import { describe, expect, it, afterEach } from 'vitest';
import { getAdminPassword, isAuthorized } from '@/lib/admin-auth';

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe('admin auth', () => {
  it('fails closed when no admin password is configured', () => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('authorizes the configured admin password only', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';
    delete process.env.ADMIN_PASSWORD;

    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });
});
