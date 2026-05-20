import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';
import { PARTNERSHIP_CALL_URL } from '../booking';

const root = process.cwd();
const brokenPartnerSlugs = [
  'https://calendly.com/govconedumeet/partnership',
  'https://calendly.com/govconedumeet/apex-partnership',
  'https://calendly.com/govconedumeet/sbdc-partnership',
  'https://calendly.com/govconedumeet/chamber-partnership',
];

describe('booking URLs', () => {
  it('uses the known-live Calendly event for partnership calls', () => {
    expect(PARTNERSHIP_CALL_URL).toBe('https://calendly.com/govconedumeet/gcg-bd-discovery');
  });

  it('does not reintroduce broken partner Calendly slugs', () => {
    const files = [
      'src/components/ExitIntentPopup.tsx',
      'src/app/partners/page.tsx',
      'src/app/for/apex-accelerators/page.tsx',
      'src/app/for/sbdc/page.tsx',
      'src/app/for/chambers/page.tsx',
    ];

    const source = files
      .map((file) => readFileSync(path.join(root, file), 'utf8'))
      .join('\n');

    for (const slug of brokenPartnerSlugs) {
      expect(source).not.toContain(slug);
    }
  });
});
