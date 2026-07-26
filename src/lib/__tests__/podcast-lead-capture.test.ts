import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(process.cwd(), 'govcon-giants-site');

function read(rel: string) {
  return readFileSync(join(root, rel), 'utf8');
}

/**
 * Regression lock: the Jul 25 redesign reintroduced the launch-era stub that
 * wrote emails to localStorage and promised a phantom inbox delivery. Live
 * podcast.govcongiants.org was verified capturing zero leads.
 */
describe('podcast site lead capture', () => {
  it('posts newsletter/guide signups to govcongiants.com/api/lead', () => {
    const useSignup = read('src/lib/useSignup.ts');
    expect(useSignup).toContain('https://govcongiants.com/api/lead');
    expect(useSignup).toContain("source: 'podcast-site'");
    expect(useSignup).not.toContain('gg-signups');
    expect(useSignup).not.toContain('localStorage.getItem');
    expect(useSignup).not.toContain('localStorage.setItem');

    const newsletter = read('src/components/NewsletterCapture.tsx');
    expect(newsletter).toContain("from '@/lib/useSignup'");
    expect(newsletter).not.toContain('gg-signups');
    expect(newsletter).not.toMatch(/Check your inbox\. The Playbook is on its way/);

    const guideModal = read('src/components/resources/GuideSignupModal.tsx');
    expect(guideModal).toContain("from '@/lib/useSignup'");
    expect(guideModal).not.toContain('gg-signups');
    expect(guideModal).toContain('guide.href');

    const guides = read('src/components/resources/guides.ts');
    expect(guides).toContain('slug:');
    expect(guides).toContain('href:');
  });

  it('does not soft-404 unknown routes to Home', () => {
    const app = read('src/App.tsx');
    expect(app).toContain("path=\"*\" element={<NotFound />}");
    expect(app).not.toContain("path=\"*\" element={<Home />}");
  });
});
