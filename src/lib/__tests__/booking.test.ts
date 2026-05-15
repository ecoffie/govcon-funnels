import { describe, expect, it } from 'vitest';
import { PARTNERSHIP_CALL_URL } from '../booking';

describe('booking links', () => {
  it('uses the known-live Calendly endpoint for partner calls', () => {
    expect(PARTNERSHIP_CALL_URL).toBe('https://calendly.com/govconedumeet/gcg-bd-discovery');
  });

  it('does not use the broken partner-specific Calendly slugs', () => {
    expect(PARTNERSHIP_CALL_URL).not.toMatch(/\/(?:partnership|apex-partnership|sbdc-partnership|chamber-partnership)$/);
  });
});
