import type { LucideIcon } from 'lucide-react';
import { Globe, ClipboardCheck, Award, FileText, Mail, Target, Compass, CalendarDays } from 'lucide-react';

export interface Guide {
  title: string;
  blurb: string;
  /** Body copy shown inside the signup modal for this guide. */
  modalCopy: string;
  icon: LucideIcon;
  /** Optional cover/thumbnail shown on the card instead of the icon badge. */
  photo?: string;
  /** When set, the card links directly to this URL (new tab) and skips the
   *  signup modal — used for free PDF downloads. */
  directUrl?: string;
}

/**
 * Free guide library (resources.md §3). Topics track the real GovCon Giants
 * curriculum: SAM.gov registration, the 72 websites, set-aside certifications,
 * proposals, subcontracting outreach, and NAICS/PSC codes.
 */
export const guides: Guide[] = [
  {
    title: 'The 72-Website Starter Kit',
    blurb: '5 of the 72 federal websites, with a walkthrough for each.',
    modalCopy:
      'Five of the 72 federal websites Eric uses to find buyers, partners, and contracts — with a walkthrough for each, delivered instantly, free.',
    icon: Globe,
  },
  {
    title: 'SAM.gov Registration Checklist',
    blurb: 'Every field, every gotcha, in order.',
    modalCopy:
      'The step-by-step SAM.gov registration checklist — every field, every gotcha, in the order you actually hit them. Free, straight to your inbox.',
    icon: ClipboardCheck,
  },
  {
    title: '8(a), HUBZone & WOSB Certification Chooser',
    blurb: '10 questions that tell you which set-aside to pursue first.',
    modalCopy:
      'Answer 10 questions and know whether 8(a), HUBZone, or WOSB/EDWOSB is the certification to chase first — and whether you qualify today.',
    icon: Award,
  },
  {
    title: 'Federal Proposal Template',
    blurb: 'The skeleton Eric uses on every bid — sections, compliance matrix, pricing.',
    modalCopy:
      'The exact proposal skeleton Eric uses on every federal bid — section order, compliance matrix, and pricing structure included. Free, by email.',
    icon: FileText,
  },
  {
    title: 'Subcontracting Outreach Scripts',
    blurb: 'The exact emails that get primes to reply.',
    modalCopy:
      'The exact outreach emails and follow-up scripts that get prime contractors to reply — word for word, ready to copy. Free, in your inbox.',
    icon: Mail,
  },
  {
    title: 'NAICS & PSC Code Finder Worksheet',
    blurb: 'Pick the codes buyers actually search.',
    modalCopy:
      'A fill-in worksheet that walks you from what you sell to the NAICS and PSC codes federal buyers actually search. Free, delivered instantly.',
    icon: Target,
  },
  {
    title: 'The Federal Contracting Action Plan',
    blurb: 'Your step-by-step plan from registration to first bid.',
    modalCopy:
      'The Federal Contracting Action Plan — the exact sequence Eric walks students through, from SAM.gov registration to your first submitted bid. Free, delivered instantly.',
    icon: Compass,
    photo: '/books/action-plan.png',
  },
  {
    title: 'The 5-Day Consulting Challenge',
    blurb: 'Five days to your first govcon consulting offer — free PDF checklist.',
    modalCopy: '',
    icon: CalendarDays,
    photo: '/books/consulting-challenge.png',
    directUrl: '/downloads/5-day-consulting-challenge-checklist.pdf',
  },
];
