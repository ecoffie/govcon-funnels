import { readFileSync } from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { JSDOM } from 'jsdom';

const funnelFiles = [
  'public/proposal-bootcamp/index.html',
  'public/proposal-bootcamp/1-landing.html',
];

async function flushPromises() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('proposal bootcamp static lead form', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(funnelFiles)('does not redirect after a rate-limited lead submission in %s', async (file) => {
    const html = readFileSync(path.join(process.cwd(), file), 'utf8');
    const dom = new JSDOM(html, {
      runScripts: 'dangerously',
      url: 'https://govcongiants.org/proposal-bootcamp/',
    });
    const { document } = dom.window;
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: 'Too many requests.' }), { status: 429 })
    );
    dom.window.fetch = fetchMock;

    (document.querySelector('input[name="firstName"]') as HTMLInputElement).value = 'Test';
    (document.querySelector('input[name="lastName"]') as HTMLInputElement).value = 'Lead';
    (document.querySelector('input[name="email"]') as HTMLInputElement).value = 'test@example.com';
    (document.querySelector('input[name="phone"]') as HTMLInputElement).value = '555-1234';

    document.getElementById('leadForm')?.dispatchEvent(
      new dom.window.Event('submit', { bubbles: true, cancelable: true })
    );
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(dom.window.location.href).toBe('https://govcongiants.org/proposal-bootcamp/');
    expect(document.getElementById('leadFormError')?.textContent).toBe(
      'Too many signups from this network. Please wait a minute and try again.'
    );
    expect((document.querySelector('button[type="submit"]') as HTMLButtonElement).disabled).toBe(
      false
    );
  });
});
