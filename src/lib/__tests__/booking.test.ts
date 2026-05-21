import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PARTNERSHIP_CALL_URL } from '../booking';

const partnerFiles = [
  'src/app/partners/page.tsx',
  'src/app/for/apex-accelerators/page.tsx',
  'src/app/for/sbdc/page.tsx',
  'src/app/for/chambers/page.tsx',
  'src/components/ExitIntentPopup.tsx',
];

const brokenSlugs = [
  'https://calendly.com/govconedumeet/partnership',
  'https://calendly.com/govconedumeet/apex-partnership',
  'https://calendly.com/govconedumeet/sbdc-partnership',
  'https://calendly.com/govconedumeet/chamber-partnership',
];

describe('partner booking links', () => {
  it('uses the known-live partnership booking URL', () => {
    expect(PARTNERSHIP_CALL_URL).toBe('https://calendly.com/govconedumeet/gcg-bd-discovery');
  });

  it('does not reintroduce nonexistent partner Calendly slugs', async () => {
    const contents = await Promise.all(
      partnerFiles.map((file) => readFile(path.join(process.cwd(), file), 'utf8'))
    );
    const combined = contents.join('\n');

    for (const slug of brokenSlugs) {
      expect(combined).not.toContain(slug);
    }
  });
});
