import { readFileSync } from 'node:fs';
import path from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const notFound = vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});

vi.mock('next/navigation', () => ({
  notFound: () => notFound(),
}));

describe('retired HUBZone registrations UI', () => {
  beforeEach(() => {
    notFound.mockClear();
  });

  it('invokes notFound and never renders a password form or worklist', async () => {
    const { default: Page } = await import('@/app/hubzone/registrations/page');

    expect(() => Page()).toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it('contains no client auth or registrant-display surface in source', () => {
    const source = readFileSync(
      path.join(__dirname, '..', 'page.tsx'),
      'utf8'
    );

    expect(source).not.toMatch(/sessionStorage/);
    expect(source).not.toMatch(/hubzone-tracker-pw/);
    expect(source).not.toMatch(/x-admin-password/);
    expect(source).not.toMatch(/use client/);
    expect(source).not.toMatch(/Password/);
    expect(source).not.toMatch(/registrants/);
    expect(source).not.toMatch(/Command Center/);
    expect(source).not.toMatch(/\/api\/hubzone\/registrations/);
    expect(source).toMatch(/notFound/);
  });
});
