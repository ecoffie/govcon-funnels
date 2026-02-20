import { Metadata } from 'next';
import InternalDashboardClient from './InternalDashboardClient';

export const metadata: Metadata = {
  title: 'Internal | GovCon Giants',
  description: 'Internal team dashboard: plans, funnels, and backend flow.',
  robots: 'noindex, nofollow',
};

const levels = [
  {
    id: 'beginner',
    label: 'Beginner',
    definition: 'New to government contracting. Structured training and a clear path to first opportunity.',
    planKeys: ['jan-31-replay', 'pro-member-group'],
  },
  {
    id: 'mid',
    label: 'Growing (Mid-Level)',
    definition: 'Past the basics. Lifetime access to materials, community, or structured program to get contract-ready.',
    planKeys: ['pro-member-plan', 'accelerator'],
  },
  {
    id: 'advanced',
    label: 'Scaling (Pro / Advanced)',
    definition: 'Intensive coaching or hands-on business development support.',
    planKeys: ['accelerator', 'white-glove'],
  },
];

const internalPlanNotes: Record<string, { whereSold: string; afterSignup: string }> = {
  'pro-member-group': {
    whereSold: 'shop.govcongiants.org',
    afterSignup: 'Shop handles subscription; GHL/Slack if lead captured on this site first.',
  },
  'pro-member-plan': {
    whereSold: 'govcongiants.org/premium/pro-member-plan/checkout (contact/email to complete)',
    afterSignup: 'Manual fulfillment; contact created via form or GHL.',
  },
  'accelerator': {
    whereSold: 'govcongiants.org/premium/accelerator/checkout (contact/email to complete)',
    afterSignup: 'Manual fulfillment; application flow then onboarding.',
  },
  'white-glove': {
    whereSold: 'mailto: hello@govconedu.com',
    afterSignup: 'Sales conversation; no automated flow.',
  },
  'jan-31-replay': {
    whereSold: 'Stripe checkout on this site (/jan-31-bootcamp-paid/checkout)',
    afterSignup: 'Stripe payment → success page → course access.',
  },
};

const funnels = [
  { path: '/', name: 'Homepage' },
  { path: '/resources', name: 'Free Resources Library' },
  { path: '/bootcamp', name: 'Bootcamp (Jan 31)' },
  { path: '/free-course', name: 'Free Course' },
  { path: '/opp', name: 'Opportunity Hunter' },
  { path: '/premium', name: 'Premium overview' },
  { path: '/jan-31-bootcamp-paid', name: 'Jan 31 Bootcamp (paid)' },
  { path: 'https://funnels.govcongiants.org/proposal-bootcamp', name: 'Proposal Bootcamp (funnels subdomain)', external: true },
];

const TOP_PRIORITY = {
  title: 'February Bootcamp',
  description: 'Feb 28 Specifics and Proposals bootcamp. Free proposal resources and live training.',
  link: 'https://funnels.govcongiants.org/proposal-bootcamp',
  rundown: 'We're pushing the Proposal Bootcamp funnel: free resources (IDIQ templates, Sources Sought template, task order checklist), then the 8-hour live bootcamp on February 28. All lead forms go to GHL + Slack; upsell/downsell live on the funnel.',
};

const quickLinks = [
  { href: TOP_PRIORITY.link, label: 'February bootcamp' },
  { href: TOP_PRIORITY.link, label: 'Main link' },
  { href: 'https://shop.govcongiants.org', label: 'Shop (GovCon)' },
  { href: 'https://dashboard.stripe.com', label: 'Stripe Dashboard' },
  { href: 'https://app.gohighlevel.com', label: 'GoHighLevel' },
  { href: '/', label: 'Homepage' },
  { href: '/premium', label: 'Premium overview' },
];

const glossary = [
  { term: 'Traffic', def: 'Where visitors come from: ads, organic search, social links, email.' },
  { term: 'Funnels', def: 'Landing pages and flows that capture leads or send them to upsell/downsell.' },
  { term: 'Upsell / Downsell', def: 'Post-signup offers (e.g. Pro Member Group upsell, downsell to thank-you).' },
  { term: 'Product / Download', def: 'What they get: product access, PDFs, handouts, course access.' },
  { term: 'Confirmation email / Follow-up sequence', def: 'Automated email after signup and any drip or follow-up sequence.' },
  { term: 'Email or phone reach out', def: 'Manual outreach (cold or warm) to book meetings.' },
  { term: 'First meeting', def: 'Initial call or meeting with a lead.' },
  { term: 'Sale / Schedule a second meeting', def: 'Outcomes of the first meeting: close the sale or book a follow-up.' },
];

export default function InternalPage() {
  return (
    <InternalDashboardClient
      topPriority={TOP_PRIORITY}
      quickLinks={quickLinks}
      funnels={funnels}
      glossary={glossary}
      levels={levels}
      internalPlanNotes={internalPlanNotes}
    />
  );
}
