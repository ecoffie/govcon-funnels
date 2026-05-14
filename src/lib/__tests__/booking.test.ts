import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { PARTNERSHIP_CALL_URL } from '@/lib/booking';

const partnerCtaFiles = [
  'src/app/partners/page.tsx',
  'src/app/for/apex-accelerators/page.tsx',
  'src/app/for/sbdc/page.tsx',
  'src/app/for/chambers/page.tsx',
  'src/components/ExitIntentPopup.tsx',
];

describe('partner booking CTAs', () => {
  it('uses the known live Calendly discovery endpoint for partnership calls', () => {
    expect(PARTNERSHIP_CALL_URL).toBe('https://calendly.com/govconedumeet/gcg-bd-discovery');
  });

  it('keeps partner UI files on the shared booking URL constant', () => {
    for (const file of partnerCtaFiles) {
      const source = readFileSync(path.join(process.cwd(), file), 'utf8');
      expect(source).not.toMatch(/https:\/\/calendly\.com\/govconedumeet\/(?:partnership|apex-partnership|sbdc-partnership|chamber-partnership)/);
    }
  });
});
