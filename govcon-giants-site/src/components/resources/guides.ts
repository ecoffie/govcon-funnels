import type { LucideIcon } from 'lucide-react';
import { Globe, ClipboardCheck, Award, FileText, Mail, Target } from 'lucide-react';

export interface Guide {
  title: string;
  /** Stable id used as the CRM tag suffix (`guide-<slug>`). */
  slug: string;
  /** Instant-access URL on the main site after signup. */
  href: string;
  blurb: string;
  /** Body copy shown inside the signup modal for this guide. */
  modalCopy: string;
  icon: LucideIcon;
}

/**
 * Free guide library (resources.md §3). Topics track the real GovCon Giants
 * curriculum: SAM.gov registration, the 72 websites, set-aside certifications,
 * proposals, subcontracting outreach, and NAICS/PSC codes.
 */
export const guides: Guide[] = [
  {
    title: 'The 72-Website Starter Kit',
    slug: '72-website-starter-kit',
    href: 'https://govcongiants.com/guides/finding-government-contracts?utm_source=podcast-site&utm_content=guide',
    blurb: '5 of the 72 federal websites, with a walkthrough for each.',
    modalCopy:
      'Five of the 72 federal websites Eric uses to find buyers, partners, and contracts — with a walkthrough for each, free, with instant access.',
    icon: Globe,
  },
  {
    title: 'SAM.gov Registration Checklist',
    slug: 'sam-gov-checklist',
    href: 'https://govcongiants.com/blog/sam-gov-registration-checklist?utm_source=podcast-site&utm_content=guide',
    blurb: 'Every field, every gotcha, in order.',
    modalCopy:
      'The step-by-step SAM.gov registration checklist — every field, every gotcha, in the order you actually hit them. Free, with instant access.',
    icon: ClipboardCheck,
  },
  {
    title: '8(a), HUBZone & WOSB Certification Chooser',
    slug: 'certification-chooser',
    href: 'https://govcongiants.com/guides/which-sba-certification?utm_source=podcast-site&utm_content=guide',
    blurb: '10 questions that tell you which set-aside to pursue first.',
    modalCopy:
      'Answer 10 questions and know whether 8(a), HUBZone, or WOSB/EDWOSB is the certification to chase first — and whether you qualify today.',
    icon: Award,
  },
  {
    title: 'Federal Proposal Template',
    slug: 'proposal-template',
    href: 'https://govcongiants.com/guides/proposal-writing?utm_source=podcast-site&utm_content=guide',
    blurb: 'The skeleton Eric uses on every bid — sections, compliance matrix, pricing.',
    modalCopy:
      'The exact proposal skeleton Eric uses on every federal bid — section order, compliance matrix, and pricing structure included. Free, with instant access.',
    icon: FileText,
  },
  {
    title: 'Subcontracting Outreach Scripts',
    slug: 'subcontracting-scripts',
    href: 'https://govcongiants.com/guides/subcontracting-and-teaming?utm_source=podcast-site&utm_content=guide',
    blurb: 'The exact emails that get primes to reply.',
    modalCopy:
      'The exact outreach emails and follow-up scripts that get prime contractors to reply — word for word, ready to copy. Free, with instant access.',
    icon: Mail,
  },
  {
    title: 'NAICS & PSC Code Finder Worksheet',
    slug: 'naics-psc-finder',
    href: 'https://govcongiants.com/guides/naics-codes?utm_source=podcast-site&utm_content=guide',
    blurb: 'Pick the codes buyers actually search.',
    modalCopy:
      'A fill-in worksheet that walks you from what you sell to the NAICS and PSC codes federal buyers actually search. Free, with instant access.',
    icon: Target,
  },
];
