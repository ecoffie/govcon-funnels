import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Vault confirmation emails must not trust the client-supplied redirectUrl.
 *
 * /api/lead is unauthenticated. Before this guard, source `vault:<anything>` plus
 * redirectUrl `https://evil.example/...` was written into the official download
 * button. The resources pages also post a relative `/downloads/vault/...` path,
 * which an email client cannot open. The link now comes only from the catalog.
 */

const sent = vi.hoisted(() => ({
  sendMail: vi.fn(async () => ({
    messageId: 'id',
    response: 'ok',
    accepted: ['person@gmail.com'],
    rejected: [],
  })),
}));

vi.hoisted(() => {
  delete process.env.RESEND_API_KEY;
});

vi.mock('nodemailer', () => ({
  default: {
    createTransport: () => ({
      verify: vi.fn(async () => true),
      sendMail: sent.sendMail,
    }),
  },
}));

import { sendConfirmationEmail, sendVaultDocumentEmail } from '@/lib/email';
import { VAULT_DOCS, resolveVaultDelivery } from '@/lib/vault-docs';

beforeEach(() => {
  process.env.SMTP_USER = 'alerts@govcongiants.com';
  process.env.SMTP_PASSWORD = 'test-password';
  sent.sendMail.mockClear();
});

function sentHtml(): string {
  const opts = sent.sendMail.mock.calls.at(-1)?.[0] as { html?: string; subject?: string } | undefined;
  return `${opts?.subject ?? ''}\n${opts?.html ?? ''}`;
}

describe('resolveVaultDelivery', () => {
  it('maps every catalog title to an absolute govcongiants.com file URL', () => {
    for (const doc of VAULT_DOCS) {
      expect(resolveVaultDelivery(`vault:${doc.title}`)).toEqual({
        title: doc.title,
        downloadUrl: `https://govcongiants.com/downloads/vault/${doc.file}`,
      });
    }
  });

  it('returns null for an unknown title or a non-vault source', () => {
    expect(resolveVaultDelivery('vault:Invoice')).toBeNull();
    expect(resolveVaultDelivery('newsletter')).toBeNull();
    expect(resolveVaultDelivery('vault:Capability Statement Sample ')).toBeNull();
  });
});

describe('sendConfirmationEmail vault links', () => {
  it('ignores an off-site redirectUrl and links the catalog file', async () => {
    const result = await sendConfirmationEmail({
      to: 'person@gmail.com',
      name: 'Alex',
      source: 'vault:Capability Statement Sample',
      redirectUrl: 'https://evil.example/login',
    });

    expect(result.ok).toBe(true);
    const body = sentHtml();
    expect(body).toContain('https://govcongiants.com/downloads/vault/capability-statement-sample.pdf');
    expect(body).not.toContain('evil.example');
  });

  it('turns the relative resources-page path into the absolute catalog URL', async () => {
    await sendConfirmationEmail({
      to: 'person@gmail.com',
      name: 'Alex',
      source: 'vault:Capability Statement Sample',
      redirectUrl: '/downloads/vault/capability-statement-sample.pdf',
    });

    const body = sentHtml();
    expect(body).toContain('href="https://govcongiants.com/downloads/vault/capability-statement-sample.pdf"');
    expect(body).not.toContain('href="/downloads/vault/');
  });

  it('does not send a made-up vault title or its URL', async () => {
    const result = await sendConfirmationEmail({
      to: 'person@gmail.com',
      name: '<a href=https://evil.example/login>click</a>',
      source: 'vault:Wire instructions',
      redirectUrl: 'https://evil.example/login',
    });

    expect(result.ok).toBe(true);
    const body = sentHtml();
    expect(body).not.toContain('evil.example');
    expect(body).not.toContain('<a href=https://evil.example');
    expect(body).toContain('Welcome to GovCon Giants');
  });

  it('refuses a direct vault send whose URL is not a library file', async () => {
    const result = await sendVaultDocumentEmail({
      to: 'person@gmail.com',
      name: 'Alex',
      docTitle: 'Capability Statement Sample',
      downloadUrl: 'https://evil.example/capability-statement-sample.pdf',
    });

    expect(result).toEqual({
      ok: false,
      error: 'refusing vault email: download URL is not a library file on govcongiants.com',
    });
    expect(sent.sendMail).not.toHaveBeenCalled();
  });
});
