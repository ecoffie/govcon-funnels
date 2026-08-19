import { describe, expect, it } from 'vitest';

import { escapeHtml, isSafeVaultDownloadUrl } from '@/lib/email';

describe('isSafeVaultDownloadUrl', () => {
  it('accepts the real vault download URLs the SPA sends', () => {
    expect(
      isSafeVaultDownloadUrl(
        'https://govcongiants.com/downloads/vault/capability-statement-sample.pdf'
      )
    ).toBe(true);
    expect(
      isSafeVaultDownloadUrl(
        'https://www.govcongiants.com/downloads/vault/10-subcontractor-clauses.pdf'
      )
    ).toBe(true);
    expect(
      isSafeVaultDownloadUrl(
        'https://govcongiants.com/downloads/vault/capability-statement-checklist.dotx'
      )
    ).toBe(true);
  });

  it('rejects attacker-controlled download links', () => {
    expect(isSafeVaultDownloadUrl('https://evil.example/malware.exe')).toBe(false);
    expect(
      isSafeVaultDownloadUrl('https://govcongiants.com.evil.example/downloads/vault/x.pdf')
    ).toBe(false);
    expect(
      isSafeVaultDownloadUrl('https://govcongiants.com/downloads/vault/../secrets.pdf')
    ).toBe(false);
    expect(
      isSafeVaultDownloadUrl('javascript:alert(1)')
    ).toBe(false);
    expect(
      isSafeVaultDownloadUrl(
        'https://govcongiants.com/downloads/vault/capability-statement-sample.pdf?next=https://evil.example'
      )
    ).toBe(false);
    expect(
      isSafeVaultDownloadUrl('https://govcongiants.com/guides/cage-code')
    ).toBe(false);
    expect(isSafeVaultDownloadUrl('')).toBe(false);
  });
});

describe('escapeHtml', () => {
  it('neutralizes markup in attacker-supplied vault titles', () => {
    expect(escapeHtml('</a><img src=x onerror=alert(1)>')).toBe(
      '&lt;/a&gt;&lt;img src=x onerror=alert(1)&gt;'
    );
    expect(escapeHtml('Q4 "Invoice" & more')).toBe('Q4 &quot;Invoice&quot; &amp; more');
  });
});
