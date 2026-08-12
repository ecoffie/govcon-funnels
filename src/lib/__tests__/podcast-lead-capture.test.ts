import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(process.cwd(), 'govcon-giants-site');

function read(rel: string) {
  return readFileSync(join(root, rel), 'utf8');
}

/**
 * Regression lock: Jul 25 redesign reintroduced localStorage stubs; Jul 29
 * "GHL webhook" wiring silently no-oped in production when
 * VITE_GHL_NEWSLETTER_WEBHOOK was unset (Vite dead-code-eliminated the fetch).
 * Aug 10 rewired NewsletterCapture to a source-level
 * PASTE_GHL_WEBHOOK_URL_HERE placeholder that again fell back to localStorage.
 * Live podcast.govcongiants.org was verified capturing zero leads.
 */
describe('podcast site lead capture', () => {
  it('posts newsletter/guide signups to govcongiants.com/api/lead', () => {
    const signup = read('src/lib/signup.ts');
    expect(signup).toContain('https://govcongiants.com/api/lead');
    expect(signup).toContain("source: 'podcast-site'");
    expect(signup).not.toContain('gg-signups');
    expect(signup).not.toMatch(/import\.meta\.env\.VITE_GHL/);
    expect(signup).not.toContain('localStorage');
    expect(signup).not.toContain('PASTE_GHL_WEBHOOK_URL_HERE');

    const newsletter = read('src/components/NewsletterCapture.tsx');
    expect(newsletter).toContain("from '@/lib/signup'");
    expect(newsletter).toContain('submitSignup');
    expect(newsletter).not.toContain('gg-signups');
    expect(newsletter).not.toContain('PASTE_GHL_WEBHOOK_URL_HERE');
    expect(newsletter).not.toContain("from '@/lib/config'");

    const guideModal = read('src/components/resources/GuideSignupModal.tsx');
    expect(guideModal).toContain("from '@/lib/signup'");
    expect(guideModal).toContain('submitSignup');
    expect(guideModal).not.toContain('gg-signups');
  });

  it('does not soft-404 unknown routes to Home', () => {
    const app = read('src/App.tsx');
    expect(app).toContain('path="*" element={<NotFound />}');
    expect(app).not.toContain('path="*" element={<Home />}');
  });

  it('ships real robots.txt and sitemap.xml (not the SPA shell)', () => {
    const robots = read('public/robots.txt');
    expect(robots).toContain('Sitemap: https://podcast.govcongiants.org/sitemap.xml');
    expect(robots).not.toContain('<!doctype html>');

    const sitemap = read('public/sitemap.xml');
    expect(sitemap).toContain('https://podcast.govcongiants.org/');
    expect(sitemap).toContain('https://podcast.govcongiants.org/podcast');
  });

  it('links Apple Podcasts to the real show id, not a search URL', () => {
    const platforms = read('src/data/platforms.ts');
    expect(platforms).toContain('id1463074357');
    expect(platforms).not.toContain('search?term=');
  });
});
