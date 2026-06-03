import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { PARTNERSHIP_CALL_URL } from '../booking';

const brokenPartnershipSlugs = [
  'https://calendly.com/govconedumeet/partnership',
  'https://calendly.com/govconedumeet/apex-partnership',
  'https://calendly.com/govconedumeet/sbdc-partnership',
  'https://calendly.com/govconedumeet/chamber-partnership',
];

const partnerCtaFiles = [
  'src/components/ExitIntentPopup.tsx',
  'src/app/partners/page.tsx',
  'src/app/for/apex-accelerators/page.tsx',
  'src/app/for/sbdc/page.tsx',
  'src/app/for/chambers/page.tsx',
];

describe('booking URLs', () => {
  it('uses the known-live Calendly endpoint for partnership calls', () => {
    expect(PARTNERSHIP_CALL_URL).toBe('https://calendly.com/govconedumeet/gcg-bd-discovery');
  });

  it.each(partnerCtaFiles)('does not use broken partnership Calendly slugs in %s', (filePath) => {
    const source = readFileSync(path.join(process.cwd(), filePath), 'utf8');

    for (const slug of brokenPartnershipSlugs) {
      expect(source).not.toContain(slug);
    }
  });
});
