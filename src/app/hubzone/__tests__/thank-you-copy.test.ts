import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('HUBZone thank-you page copy', () => {
  it('matches the webinar schedule and email sequence', () => {
    const source = readFileSync(
      join(process.cwd(), 'src/app/hubzone/thank-you/page.tsx'),
      'utf8'
    );

    expect(source).toContain('confirmation email with the event details');
    expect(source).toContain('June 15, 2026 \u00b7 6 \u2013 8 PM EST');
    expect(source).not.toContain('8 AM \u2013 6 PM EST');
    expect(source).not.toContain('confirmation email with the webinar link');
  });
});
