/**
 * The gated Document Library ("vault") — 10 downloads served from
 * public/downloads/vault/.
 *
 * ⚠️ `title` IS THE ATTRIBUTION KEY. The lead source recorded for every one of
 * these is `vault:${title}` — the TITLE, not the slug — matching the string the
 * podcast SPA submitted before the 2026-08-24 one-site consolidation. Real
 * signups already exist in funnel_leads under these exact strings
 * (`vault:Capability Statement Sample`, `vault:Sources Sought Response Template`,
 * …). CHANGING A TITLE ORPHANS ITS HISTORICAL ATTRIBUTION. If a display name
 * must change, add a separate display field — do not edit `title`.
 *
 * Corollary (Eric, 2026-08-24): a STABLE attribution key does not mean stale content. The
 * `title` on `SBA Size Standards (2022)` must stay verbatim so its historical leads still
 * reconcile, but nothing stops us refreshing the underlying document or showing a newer
 * display name. If that day comes, add `displayTitle` and render THAT — keep `title` as the
 * immutable identifier it already is.
 */

export interface VaultDoc {
  slug: string;
  title: string;
  description: string;
  /** Exact filename in public/downloads/vault/ */
  file: string;
  format: 'PDF' | 'DOCX' | 'DOC' | 'XLSX' | 'XLS' | 'PPTX' | 'PNG' | 'DOTX';
}

export const VAULT_DOCS: VaultDoc[] = [
  {
    slug: 'capability-statement-sample',
    title: 'Capability Statement Sample',
    description: 'A finished example you can model your own one-pager on.',
    file: 'capability-statement-sample.pdf',
    format: 'PDF',
  },
  {
    slug: 'capability-statement-checklist',
    title: 'Capability Statement Checklist',
    description: 'The fill-in template that keeps your capability statement complete.',
    file: 'capability-statement-checklist.dotx',
    format: 'DOTX',
  },
  {
    slug: 'teaming-agreement-sample',
    title: 'Teaming Agreement Sample',
    description: 'A real teaming agreement you can adapt before you chase a bid together.',
    file: 'teaming-agreement-sample.pdf',
    format: 'PDF',
  },
  {
    slug: 'sba-size-standards-2022',
    title: 'SBA Size Standards (2022)',
    description: 'The official table of small business size standards by NAICS code.',
    file: 'sba-size-standards-2022.pdf',
    format: 'PDF',
  },
  {
    slug: 'compliance-matrix-outline',
    title: 'Compliance Matrix Outline',
    description: 'Map every RFP requirement to a response so nothing gets missed.',
    file: 'compliance-matrix-outline.xlsx',
    format: 'XLSX',
  },
  {
    slug: 'sources-sought-template',
    title: 'Sources Sought Response Template',
    description: 'Answer sources sought notices in the format contracting officers expect.',
    file: 'sources-sought-template.pdf',
    format: 'PDF',
  },
  {
    slug: 'navfac-small-business-specialists',
    title: 'NAVFAC Small Business Specialists',
    description: 'Contact list for NAVFAC small business specialists by region.',
    file: 'navfac-small-business-specialists.pdf',
    format: 'PDF',
  },
  {
    slug: '10-subcontractor-clauses',
    title: '10 Subcontractor Clauses to Watch',
    description: 'The clauses that sink subs — know them before you sign.',
    file: '10-subcontractor-clauses.pdf',
    format: 'PDF',
  },
  {
    slug: 'cold-email-script-1',
    title: 'Cold Email Script #1',
    description: 'The opener email that gets contracting officers to reply.',
    file: 'cold-email-script-1.pdf',
    format: 'PDF',
  },
  {
    slug: 'renew-sam-registration',
    title: 'How to Renew Your SAM Registration',
    description: 'Step-by-step renewal so your registration never lapses.',
    file: 'renew-sam-registration.pdf',
    format: 'PDF',
  },
];

/** The lead `source` for a vault download. Must stay `vault:<title>` verbatim. */
export const vaultSource = (doc: VaultDoc) => `vault:${doc.title}`;

/** Public download path for a vault doc. */
export const vaultDownloadUrl = (doc: VaultDoc) => `/downloads/vault/${doc.file}`;

const VAULT_EMAIL_ORIGIN = 'https://govcongiants.com';

/**
 * Download link a vault confirmation email is allowed to contain.
 *
 * `/api/lead` accepts a client `redirectUrl`, but that value is not a source of
 * truth: the resources pages post a relative path (dead inside an email client),
 * and any caller can post an off-site URL. Only an exact catalog title produces
 * a link, and the link is always the file on govcongiants.com.
 */
export function resolveVaultDelivery(source: string): { title: string; downloadUrl: string } | null {
  if (!source.startsWith('vault:')) return null;
  const title = source.slice('vault:'.length);
  const doc = VAULT_DOCS.find((d) => d.title === title);
  if (!doc) return null;
  return { title: doc.title, downloadUrl: `${VAULT_EMAIL_ORIGIN}${vaultDownloadUrl(doc)}` };
}

export const getVaultDoc = (slug: string) => VAULT_DOCS.find((d) => d.slug === slug);
