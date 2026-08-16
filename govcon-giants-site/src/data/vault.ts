/**
 * Document Library (Resources page): the top 10 gated downloads, served from
 * public/downloads/vault/ at https://govcongiants.com/downloads/vault/<file>.
 * Each doc opens VaultSignupModal; the lead API emails the direct link.
 * (The other ~49 mirrored vault files stay on disk but are intentionally
 * unlisted — re-add them to VAULT_CATEGORIES to surface them.)
 */
import { FileImage, FileSpreadsheet, FileText, Presentation } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type VaultFormat = 'PDF' | 'DOCX' | 'DOC' | 'XLSX' | 'XLS' | 'PPTX' | 'PNG' | 'DOTX';

export interface VaultDoc {
  slug: string;
  title: string;
  description: string;
  /** Exact filename in public/downloads/vault/ */
  file: string;
  format: VaultFormat;
}

export interface VaultCategory {
  name: string;
  blurb: string;
  docs: VaultDoc[];
}

export const VAULT_CATEGORIES: VaultCategory[] = [
  {
    name: 'Top 10 Downloads',
    blurb: 'The 10 most-requested documents from the GovCon Giants vault — the exact templates, checklists, and samples Eric uses in training.',
    docs: [
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
    ],
  },
];


/** File-type icon for a vault doc format. */
export function vaultFormatIcon(format: VaultFormat): LucideIcon {
  switch (format) {
    case 'XLS':
    case 'XLSX':
      return FileSpreadsheet;
    case 'PPTX':
      return Presentation;
    case 'PNG':
      return FileImage;
    default:
      return FileText;
  }
}
