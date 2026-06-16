import { describe, expect, it } from 'vitest';
import {
  countDistinctLeadEmails,
  getDistinctSignupPosition,
  MINDY_LAUNCH_ZOOM_CAP,
} from '../supabase-leads';

describe('supabase lead helpers', () => {
  it('counts distinct lead emails case-insensitively', () => {
    expect(
      countDistinctLeadEmails([
        { email: 'A@example.com' },
        { email: ' a@example.com ' },
        { email: 'b@example.com' },
        { email: '' },
        { email: null },
      ])
    ).toBe(2);
  });

  it('keeps an early Mindy Launch registrant eligible after duplicate submission past the cap', () => {
    const rows = Array.from({ length: MINDY_LAUNCH_ZOOM_CAP + 25 }, (_, index) => ({
      email: `lead-${index + 1}@example.com`,
    }));
    rows.push({ email: 'lead-80@example.com' });

    expect(getDistinctSignupPosition(rows, 'lead-80@example.com')).toBe(80);
  });

  it('returns the submitted email position instead of the aggregate signup count', () => {
    const rows = Array.from({ length: MINDY_LAUNCH_ZOOM_CAP + 1 }, (_, index) => ({
      email: `lead-${index + 1}@example.com`,
    }));

    expect(getDistinctSignupPosition(rows, `lead-${MINDY_LAUNCH_ZOOM_CAP + 1}@example.com`)).toBe(
      MINDY_LAUNCH_ZOOM_CAP + 1
    );
  });

  it('returns null when the submitted email has not been persisted', () => {
    expect(
      getDistinctSignupPosition([{ email: 'lead-1@example.com' }], 'missing@example.com')
    ).toBeNull();
  });
});
