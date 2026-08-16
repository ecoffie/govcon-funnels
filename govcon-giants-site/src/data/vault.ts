/**
 * Document Library (Resources page): 59 gated downloads, all served from
 * public/downloads/vault/ at https://govcongiants.com/downloads/vault/<file>.
 * Each doc opens VaultSignupModal; the lead API emails the direct link.
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
    name: 'Templates & Agreements',
    blurb: 'The legal paperwork that protects you when you team, subcontract, and partner.',
    docs: [
      {
        slug: 'teaming-agreement-sample',
        title: 'Teaming Agreement Sample',
        description: 'A real teaming agreement you can adapt before you chase a bid together.',
        file: 'teaming-agreement-sample.pdf',
        format: 'PDF',
      },
      {
        slug: 'consultant-agreement',
        title: 'Consultant Agreement Template',
        description: 'Lock in scope, pay, and terms before your consultant starts work.',
        file: 'consultant-agreement.docx',
        format: 'DOCX',
      },
      {
        slug: 'nda-confidentiality-template',
        title: 'NDA / Confidentiality Template',
        description: 'Protect your past performance and pricing intel when you talk shop.',
        file: 'nda-confidentiality-template.docx',
        format: 'DOCX',
      },
      {
        slug: 'jv-checklist',
        title: 'Joint Venture Checklist',
        description: 'Every box to check before you form a compliant joint venture.',
        file: 'jv-checklist.docx',
        format: 'DOCX',
      },
      {
        slug: 'jv-sop',
        title: 'Joint Venture SOP',
        description: 'Standard operating procedures for running a JV the right way.',
        file: 'jv-sop.pdf',
        format: 'PDF',
      },
      {
        slug: 'jv-agreement-sample',
        title: 'Joint Venture Agreement Sample',
        description: 'A sample JV agreement covering roles, splits, and responsibilities.',
        file: 'jv-agreement-sample.docx',
        format: 'DOCX',
      },
      {
        slug: '10-subcontractor-clauses',
        title: '10 Subcontractor Clauses to Watch',
        description: 'The clauses that sink subs — know them before you sign.',
        file: '10-subcontractor-clauses.pdf',
        format: 'PDF',
      },
    ],
  },
  {
    name: 'Capability Statements & Marketing',
    blurb: 'Make your one-pager and profiles say exactly what buyers want to hear.',
    docs: [
      {
        slug: 'capability-statement-checklist',
        title: 'Capability Statement Checklist',
        description: 'The fill-in template that keeps your capability statement complete.',
        file: 'capability-statement-checklist.dotx',
        format: 'DOTX',
      },
      {
        slug: 'sba-profile-checklist',
        title: 'SBA Profile Checklist',
        description: 'Optimize your SBA Dynamic Small Business Search profile so primes find you.',
        file: 'sba-profile-checklist.docx',
        format: 'DOCX',
      },
      {
        slug: 'capability-statement-sample',
        title: 'Capability Statement Sample',
        description: 'A finished example you can model your own one-pager on.',
        file: 'capability-statement-sample.pdf',
        format: 'PDF',
      },
      {
        slug: 'capabilities-briefing-checklist-osdbu',
        title: 'Capabilities Briefing Checklist (OSDBU)',
        description: 'How to prep and present a capabilities briefing for OSDBU offices.',
        file: 'capabilities-briefing-checklist-osdbu.pdf',
        format: 'PDF',
      },
    ],
  },
  {
    name: 'Proposal Writing',
    blurb: 'Structure, compliance, and schedules for proposals that score.',
    docs: [
      {
        slug: 'proposal-kickoff-template',
        title: 'Proposal Kickoff Template',
        description: 'Run a kickoff meeting that gets every contributor on the same page.',
        file: 'proposal-kickoff-template.pptx',
        format: 'PPTX',
      },
      {
        slug: 'compliance-matrix-outline',
        title: 'Compliance Matrix Outline',
        description: 'Map every RFP requirement to a response so nothing gets missed.',
        file: 'compliance-matrix-outline.xlsx',
        format: 'XLSX',
      },
      {
        slug: 'sample-loi',
        title: 'Sample Letter of Intent',
        description: 'A model LOI for responding to sources sought and pre-solicitation notices.',
        file: 'sample-loi.pdf',
        format: 'PDF',
      },
      {
        slug: 'sources-sought-template',
        title: 'Sources Sought Response Template',
        description: 'Answer sources sought notices in the format contracting officers expect.',
        file: 'sources-sought-template.pdf',
        format: 'PDF',
      },
      {
        slug: 'technical-approach-sample',
        title: 'Technical Approach Sample',
        description: 'A sample technical volume section to guide your own approach write-up.',
        file: 'technical-approach-sample.docx',
        format: 'DOCX',
      },
      {
        slug: 'quality-plan-sample',
        title: 'Quality Plan Sample',
        description: 'A quality assurance plan sample for proposal and contract use.',
        file: 'quality-plan-sample.pdf',
        format: 'PDF',
      },
      {
        slug: 'sanitized-technical-proposal',
        title: 'Sanitized Technical Proposal',
        description: 'A real winning proposal, sanitized — see how the pieces fit together.',
        file: 'sanitized-technical-proposal.pdf',
        format: 'PDF',
      },
      {
        slug: 'proposal-development-schedule',
        title: 'Proposal Development Schedule',
        description: 'A color-team timeline spreadsheet that keeps your proposal on track.',
        file: 'proposal-development-schedule.xls',
        format: 'XLS',
      },
      {
        slug: 'sample-bid-pricing',
        title: 'Sample Bid Pricing Worksheet',
        description: 'A pricing spreadsheet sample to structure your cost volume.',
        file: 'sample-bid-pricing.xlsx',
        format: 'XLSX',
      },
    ],
  },
  {
    name: 'Certifications & Small Business',
    blurb: '8(a), HUBZone, SDVOSB and more — get certified and get found.',
    docs: [
      {
        slug: 'sba-size-standards-2022',
        title: 'SBA Size Standards (2022)',
        description: 'The official table of small business size standards by NAICS code.',
        file: 'sba-size-standards-2022.pdf',
        format: 'PDF',
      },
      {
        slug: 'how-i-found-an-8a-company',
        title: 'How I Found an 8(a) Company',
        description: 'A real-world walkthrough of finding and vetting an 8(a) partner.',
        file: 'how-i-found-an-8a-company.pdf',
        format: 'PDF',
      },
      {
        slug: '15-questions-apex-counselor',
        title: '15 Questions for Your APEX Counselor',
        description: 'What to ask your APEX Accelerator counselor to get real answers.',
        file: '15-questions-apex-counselor.pdf',
        format: 'PDF',
      },
      {
        slug: 'va-entrepreneurship-training',
        title: 'VA Entrepreneurship Training Guide',
        description: 'Free VA training programs for veteran entrepreneurs, explained.',
        file: 'va-entrepreneurship-training.pdf',
        format: 'PDF',
      },
      {
        slug: 'mastering-small-business-webinar',
        title: 'Mastering Small Business Webinar',
        description: 'Slide deck covering the small business playbook from the live webinar.',
        file: 'mastering-small-business-webinar.pdf',
        format: 'PDF',
      },
      {
        slug: '8a-phone-script',
        title: '8(a) Phone Script',
        description: 'Word-for-word script for calling 8(a) firms about teaming up.',
        file: '8a-phone-script.docx',
        format: 'DOCX',
      },
    ],
  },
  {
    name: 'SAM.gov & Bid Sites',
    blurb: 'Navigate the portals where federal opportunities actually live.',
    docs: [
      {
        slug: 'reading-sam-gov',
        title: 'How to Read a SAM.gov Listing',
        description: 'Decode every field in a SAM.gov opportunity notice.',
        file: 'reading-sam-gov.pdf',
        format: 'PDF',
      },
      {
        slug: 'sam-gov-navigation',
        title: 'SAM.gov Navigation Guide',
        description: 'Find your way around SAM.gov without the frustration.',
        file: 'sam-gov-navigation.pdf',
        format: 'PDF',
      },
      {
        slug: 'renew-sam-registration',
        title: 'How to Renew Your SAM Registration',
        description: 'Step-by-step renewal so your registration never lapses.',
        file: 'renew-sam-registration.pdf',
        format: 'PDF',
      },
      {
        slug: 'dibbs-solicitations',
        title: 'Finding DIBBS Solicitations',
        description: 'How to search DLA\'s DIBBS portal for solicitations you can win.',
        file: 'dibbs-solicitations.pptx',
        format: 'PPTX',
      },
      {
        slug: 'dibbs-quoting',
        title: 'Quoting on DIBBS',
        description: 'Submit quotes on DIBBS the right way, step by step.',
        file: 'dibbs-quoting.pptx',
        format: 'PPTX',
      },
    ],
  },
  {
    name: 'Construction Plans (Samples)',
    blurb: 'Safety, QC, and environmental plans the government expects from construction contractors.',
    docs: [
      {
        slug: 'safety-plan-generic',
        title: 'Generic Safety Plan',
        description: 'A general-purpose safety plan you can adapt to any site.',
        file: 'safety-plan-generic.docx',
        format: 'DOCX',
      },
      {
        slug: 'construction-qc-plan-sample',
        title: 'Construction QC Plan Sample',
        description: 'A quality control plan sample built for federal construction contracts.',
        file: 'construction-qc-plan-sample.docx',
        format: 'DOCX',
      },
      {
        slug: 'hazardous-waste-management-plan',
        title: 'Hazardous Waste Management Plan',
        description: 'A hazwaste plan sample that meets federal project requirements.',
        file: 'hazardous-waste-management-plan.docx',
        format: 'DOCX',
      },
      {
        slug: 'covid-control-plan-sample',
        title: 'COVID Control Plan Sample',
        description: 'A site control plan sample for health and safety compliance.',
        file: 'covid-control-plan-sample.docx',
        format: 'DOCX',
      },
      {
        slug: 'safety-plan-sample',
        title: 'Site Safety Plan Sample',
        description: 'A completed site-specific safety plan to model yours on.',
        file: 'safety-plan-sample.docx',
        format: 'DOCX',
      },
      {
        slug: 'shoring-plan-sample',
        title: 'Shoring Plan Sample',
        description: 'A shoring and excavation plan sample for federal projects.',
        file: 'shoring-plan-sample.docx',
        format: 'DOCX',
      },
      {
        slug: 'environmental-management-plan',
        title: 'Environmental Management Plan',
        description: 'An EMP sample covering environmental compliance on federal sites.',
        file: 'environmental-management-plan.doc',
        format: 'DOC',
      },
      {
        slug: 'health-safety-plan-sample',
        title: 'Health & Safety Plan Sample',
        description: 'A full health and safety plan sample for construction contracts.',
        file: 'health-safety-plan-sample.docx',
        format: 'DOCX',
      },
    ],
  },
  {
    name: 'NAVFAC & OSBP Contacts',
    blurb: 'Names, offices, and handouts for the Navy\'s small business gatekeepers.',
    docs: [
      {
        slug: 'navfac-small-business-specialists',
        title: 'NAVFAC Small Business Specialists',
        description: 'Contact list for NAVFAC small business specialists by region.',
        file: 'navfac-small-business-specialists.pdf',
        format: 'PDF',
      },
      {
        slug: 'fpds-ng-handout',
        title: 'FPDS-NG Handout',
        description: 'Quick-reference handout for pulling data from FPDS-NG.',
        file: 'fpds-ng-handout.pdf',
        format: 'PDF',
      },
      {
        slug: 'hampton-roads-sb-professionals',
        title: 'Hampton Roads SB Professionals',
        description: 'Small business professional contacts in the Hampton Roads region.',
        file: 'hampton-roads-sb-professionals.pdf',
        format: 'PDF',
      },
      {
        slug: 'midlant-sb-brochure',
        title: 'NAVFAC Mid-Atlantic SB Brochure',
        description: 'Official Mid-Atlantic small business office brochure and contacts.',
        file: 'midlant-sb-brochure.pdf',
        format: 'PDF',
      },
      {
        slug: 'navfac-osbp-trifold',
        title: 'NAVFAC OSBP Trifold',
        description: 'The NAVFAC Office of Small Business Programs trifold, in full.',
        file: 'navfac-osbp-trifold.pdf',
        format: 'PDF',
      },
    ],
  },
  {
    name: 'Scripts & Outreach',
    blurb: 'What to say when you email, call, or interview your way to a contract.',
    docs: [
      {
        slug: 'cold-email-script-1',
        title: 'Cold Email Script #1',
        description: 'The opener email that gets contracting officers to reply.',
        file: 'cold-email-script-1.pdf',
        format: 'PDF',
      },
      {
        slug: 'cold-email-script-2',
        title: 'Cold Email Script #2',
        description: 'A follow-up angle for buyers who didn\'t bite the first time.',
        file: 'cold-email-script-2.pdf',
        format: 'PDF',
      },
      {
        slug: 'comfort-challenge-script',
        title: 'Comfort Challenge Script',
        description: 'Push past the awkward ask with this outreach challenge script.',
        file: 'comfort-challenge-script.pdf',
        format: 'PDF',
      },
      {
        slug: 'client-questionnaire',
        title: 'Client Questionnaire',
        description: 'Qualify prospects and gather requirements before the proposal.',
        file: 'client-questionnaire.docx',
        format: 'DOCX',
      },
    ],
  },
  {
    name: 'Business Development',
    blurb: 'Find buyers, forecast awards, and decide which bids are worth your time.',
    docs: [
      {
        slug: 'prime-contractor-checklist',
        title: 'Prime Contractor Checklist',
        description: 'Everything you need ready before you approach a prime.',
        file: 'prime-contractor-checklist.docx',
        format: 'DOCX',
      },
      {
        slug: 'bd-progress-task-list',
        title: 'BD Progress Task List',
        description: 'A tracker spreadsheet to keep your pipeline moving every week.',
        file: 'bd-progress-task-list.xlsx',
        format: 'XLSX',
      },
      {
        slug: 'capture-management-osdbu-activities',
        title: 'Capture Management & OSDBU Activities',
        description: 'The capture activities that position you before the RFP drops.',
        file: 'capture-management-osdbu-activities.docx',
        format: 'DOCX',
      },
      {
        slug: 'find-your-buyer-fpds-guide',
        title: 'Find Your Buyer: FPDS Guide',
        description: 'Use FPDS data to identify which agencies buy what you sell.',
        file: 'find-your-buyer-fpds-guide.docx',
        format: 'DOCX',
      },
      {
        slug: 'bid-no-bid-framework',
        title: 'Bid / No-Bid Framework',
        description: 'A one-page decision framework for which opportunities to chase.',
        file: 'bid-no-bid-framework.png',
        format: 'PNG',
      },
      {
        slug: 'milcon-award-forecast',
        title: 'MILCON Award Forecast',
        description: 'Forecasted military construction awards worth tracking.',
        file: 'milcon-award-forecast.pdf',
        format: 'PDF',
      },
      {
        slug: 'nsin-overview-deck',
        title: 'NSIN Overview Deck',
        description: 'Overview of the National Security Innovation Network and how to engage.',
        file: 'nsin-overview-deck.pdf',
        format: 'PDF',
      },
    ],
  },
  {
    name: 'Government Forms (Samples)',
    blurb: 'SF18 and SF30 forms, filled out — see what the paperwork looks like done right.',
    docs: [
      {
        slug: 'sf18-dla',
        title: 'SF-18 Sample (DLA)',
        description: 'A completed SF-18 request for quotation from the Defense Logistics Agency.',
        file: 'sf18-dla.pdf',
        format: 'PDF',
      },
      {
        slug: 'sf18-doi',
        title: 'SF-18 Sample (DOI)',
        description: 'A completed SF-18 request for quotation from the Department of the Interior.',
        file: 'sf18-doi.pdf',
        format: 'PDF',
      },
      {
        slug: 'sf30-solicitation-sample',
        title: 'SF-30 Solicitation Sample',
        description: 'A Standard Form 30 used in a solicitation, filled out.',
        file: 'sf30-solicitation-sample.pdf',
        format: 'PDF',
      },
      {
        slug: 'sf30-amendment-sample',
        title: 'SF-30 Amendment Sample',
        description: 'A Standard Form 30 amendment of solicitation, filled out.',
        file: 'sf30-amendment-sample.pdf',
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
