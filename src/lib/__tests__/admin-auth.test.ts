import { describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '@/lib/admin-auth';

describe('admin auth', () => {
  it('fails closed when no admin password env is configured', () => {
    const previousPurchasesPassword = process.env.PURCHASES_ADMIN_PASSWORD;
    const previousAdminPassword = process.env.ADMIN_PASSWORD;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    try {
      expect(getAdminPassword()).toBeNull();
      expect(isAuthorized('galata-assassin-2026')).toBe(false);
    } finally {
      if (previousPurchasesPassword === undefined) delete process.env.PURCHASES_ADMIN_PASSWORD;
      else process.env.PURCHASES_ADMIN_PASSWORD = previousPurchasesPassword;
      if (previousAdminPassword === undefined) delete process.env.ADMIN_PASSWORD;
      else process.env.ADMIN_PASSWORD = previousAdminPassword;
    }
  });

  it('accepts the configured admin password after trimming env newlines', () => {
    const previousPurchasesPassword = process.env.PURCHASES_ADMIN_PASSWORD;
    const previousAdminPassword = process.env.ADMIN_PASSWORD;
    process.env.PURCHASES_ADMIN_PASSWORD = 'secret-password\n';
    delete process.env.ADMIN_PASSWORD;

    try {
      expect(getAdminPassword()).toBe('secret-password');
      expect(isAuthorized('secret-password')).toBe(true);
      expect(isAuthorized('wrong-password')).toBe(false);
    } finally {
      if (previousPurchasesPassword === undefined) delete process.env.PURCHASES_ADMIN_PASSWORD;
      else process.env.PURCHASES_ADMIN_PASSWORD = previousPurchasesPassword;
      if (previousAdminPassword === undefined) delete process.env.ADMIN_PASSWORD;
      else process.env.ADMIN_PASSWORD = previousAdminPassword;
    }
  });
});
