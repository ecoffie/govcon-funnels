import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { PARTNERSHIP_CALL_URL } from '../booking';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

const partnerSourceFiles = [
  'src/app/partners/page.tsx',
  'src/app/for/apex-accelerators/page.tsx',
  'src/app/for/sbdc/page.tsx',
  'src/app/for/chambers/page.tsx',
  'src/components/ExitIntentPopup.tsx',
];

const brokenPartnerCalendlyUrls = [
  'https://calendly.com/govconedumeet/partnership',
  'https://calendly.com/govconedumeet/apex-partnership',
  'https://calendly.com/govconedumeet/sbdc-partnership',
  'https://calendly.com/govconedumeet/chamber-partnership',
];

describe('partner booking URLs', () => {
  it('uses the known-live Calendly endpoint for partnership calls', () => {
    expect(PARTNERSHIP_CALL_URL).toBe('https://calendly.com/govconedumeet/gcg-bd-discovery');
  });

  it('does not reintroduce broken partner Calendly slugs', () => {
    for (const sourceFile of partnerSourceFiles) {
      const contents = fs.readFileSync(path.join(repoRoot, sourceFile), 'utf8');

      expect(contents).toContain('PARTNERSHIP_CALL_URL');
      for (const brokenUrl of brokenPartnerCalendlyUrls) {
        expect(contents).not.toContain(brokenUrl);
      }
    }
  });
});
