import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PARTNERSHIP_CALL_URL } from '../booking';

const BROKEN_PARTNER_CALENDLY_URLS = [
  'https://calendly.com/govconedumeet/partnership',
  'https://calendly.com/govconedumeet/apex-partnership',
  'https://calendly.com/govconedumeet/sbdc-partnership',
  'https://calendly.com/govconedumeet/chamber-partnership',
];

const PARTNER_CTA_FILES = [
  'src/app/partners/page.tsx',
  'src/app/for/apex-accelerators/page.tsx',
  'src/app/for/sbdc/page.tsx',
  'src/app/for/chambers/page.tsx',
  'src/components/ExitIntentPopup.tsx',
];

describe('partnership booking links', () => {
  it('uses the known-live partnership call endpoint', () => {
    expect(PARTNERSHIP_CALL_URL).toBe('https://calendly.com/govconedumeet/gcg-bd-discovery');
  });

  it('does not use missing segment-specific Calendly events', () => {
    for (const file of PARTNER_CTA_FILES) {
      const source = readFileSync(join(process.cwd(), file), 'utf8');

      for (const url of BROKEN_PARTNER_CALENDLY_URLS) {
        expect(source).not.toContain(url);
      }
    }
  });
});
