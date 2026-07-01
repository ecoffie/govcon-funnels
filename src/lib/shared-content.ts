export interface SharedLinkItem {
  label: string;
  url: string;
}

export interface SharedDashboardCard {
  title: string;
  value: string;
  detail: string;
}

export interface SharedPlanCard {
  title: string;
  link: string;
  price: string;
  whereSold: string;
  afterSignup: string;
}

export interface SharedPlanLevel {
  title: string;
  description: string;
  cards: SharedPlanCard[];
}

export interface SharedHomepageResourceCard {
  icon: string;
  title: string;
  desc: string;
  link: string;
  cta: string;
}

export interface SharedHomepagePremiumCard {
  icon: string;
  title: string;
  href: string;
  description: string;
  cta: string;
  badge?: string;
}

export interface SharedHomepagePremiumLevel {
  title: string;
  cards: SharedHomepagePremiumCard[];
}

// Active funnels = only routes that are actually live (not redirected to /).
// The bootcamp/free-course/training funnels were retired and now 301 to /
// (see vercel.json) — they were removed from this list 2026-07-01.
const activeFunnels: SharedLinkItem[] = [
  { label: 'Homepage', url: 'https://govcongiants.com/' },
  { label: 'HUBZone Webinar (hubzone)', url: 'https://govcongiants.com/hubzone' },
  { label: 'Free Resources Library', url: 'https://govcongiants.com/resources' },
  { label: 'Resource Handouts (handouts)', url: 'https://govcongiants.com/resources/handouts' },
  { label: 'Mindy Tool (mi-free)', url: 'https://govcongiants.com/mi-free' },
  { label: 'Opportunity Hunter (opp)', url: 'https://govcongiants.com/opp' },
  { label: 'Contractor Financing (funding)', url: 'https://govcongiants.com/funding' },
  { label: 'Consulting', url: 'https://govcongiants.com/consulting' },
  { label: 'Premium Plans Overview', url: 'https://govcongiants.com/premium' },
];

const plansOverviewLevels: SharedPlanLevel[] = [
  {
    title: 'Beginner',
    description:
      'New to government contracting. Structured training and a clear path to first opportunity.',
    cards: [
      {
        title: 'HUBZone Webinar',
        link: 'https://govcongiants.com/hubzone',
        price: 'Free live webinar',
        whereSold: 'govcongiants.com/hubzone',
        afterSignup:
          'Register -> confirmation + scarcity (first 100 get Zoom) -> follow-up sequence -> GHL + Slack.',
      },
      {
        title: 'Free Resources Library',
        link: 'https://govcongiants.com/resources',
        price: 'Free',
        whereSold: 'govcongiants.com/resources (+ /resources/handouts)',
        afterSignup: 'Lead captured with source tag; GHL contact created; Slack notification.',
      },
      {
        title: 'Pro Member Group',
        link: '/shop',
        price: '$99/month',
        whereSold: 'shop.govcongiants.com',
        afterSignup:
          'Shop handles subscription; GHL/Slack if lead captured on this site first.',
      },
    ],
  },
  {
    title: 'Growing (Mid-Level)',
    description:
      'Past the basics. Lifetime access to materials, community, or structured program to get contract-ready.',
    cards: [
      {
        title: 'Pro Member Plan',
        link: 'https://govcongiants.com/premium/pro-member-plan/checkout',
        price: '$997 one-time',
        whereSold:
          'govcongiants.com/premium/pro-member-plan/checkout (contact/email to complete)',
        afterSignup: 'Manual fulfillment; contact created via form or GHL.',
      },
      {
        title: 'Accelerator Program',
        link: 'https://govcongiants.com/premium/accelerator/checkout',
        price: '$5,997 one-time',
        whereSold: 'govcongiants.com/premium/accelerator/checkout (contact/email to complete)',
        afterSignup: 'Manual fulfillment; application flow then onboarding.',
      },
    ],
  },
  {
    title: 'Scaling (Pro / Advanced)',
    description: 'Intensive coaching or hands-on business development support.',
    cards: [
      {
        title: 'Accelerator Program',
        link: 'https://govcongiants.com/premium/accelerator/checkout',
        price: '$5,997 one-time',
        whereSold: 'govcongiants.com/premium/accelerator/checkout (contact/email to complete)',
        afterSignup: 'Manual fulfillment; application flow then onboarding.',
      },
      {
        title: 'White Glove Service',
        link: 'mailto:hello@govconedu.com?subject=White%20Glove%20Inquiry',
        price: 'Sales-led engagement',
        whereSold: 'mailto: hello@govconedu.com',
        afterSignup: 'Sales conversation; no automated flow.',
      },
    ],
  },
];

export const sharedHomepageContent = {
  freeResources: [
    {
      icon: '🎓',
      title: 'HUBZone Webinar',
      desc: 'Free live webinar on winning HUBZone set-aside contracts, with Q&A.',
      link: '/hubzone',
      cta: 'Register Now ->',
    },
    {
      icon: '🔍',
      title: 'Mindy',
      desc: 'Find agencies that buy what you sell using our free AI-powered research tool.',
      link: '/mi-free',
      cta: 'Try It Free ->',
    },
    {
      icon: '📅',
      title: 'Proposal Resources',
      desc: 'Free templates and guides to help you write winning federal proposals.',
      link: '/resources',
      cta: 'Get Resources ->',
    },
  ] as SharedHomepageResourceCard[],
  premiumLevels: [
    {
      title: 'Training',
      cards: [
        {
          icon: '📹',
          title: 'Pro Member Plan',
          href: '/premium/pro-member-plan',
          description: 'Lifetime training license, community, and handouts.',
          cta: 'Get Access ->',
        },
        {
          icon: '👑',
          title: 'Pro Member Group',
          href: '/premium/pro-member-group',
          description:
            '$99/month. Ongoing support, community, updates and training.',
          cta: 'Learn More ->',
        },
        {
          icon: '🎓',
          title: 'Pro Member Plan',
          href: '/premium/pro-member-plan',
          description:
            '$997 one-time. Lifetime Training License, 4,000+ community, Success Guide, bootcamps.',
          cta: 'Learn More ->',
        },
      ],
    },
    {
      title: 'Consulting (101)',
      cards: [
        {
          icon: '🧠',
          title: 'Consulting Pack',
          href: '/premium/consulting-pack',
          description: '20 hours of one-on-one consulting to build and execute your federal growth plan.',
          cta: 'Learn More ->',
        },
        {
          icon: '⚡',
          title: 'Accelerator Program',
          href: '/premium/accelerator',
          description:
            '90 days, 12 weekly 1:1 coaching sessions, access to Lifetime Program.',
          cta: 'Learn More ->',
        },
      ],
    },
    {
      title: 'Fractional BD (Done for You)',
      cards: [
        {
          icon: '🤝',
          title: 'White Glove Service',
          href: '/premium/white-glove',
          description:
            'Premium fractional business development and dedicated consultant support.',
          cta: 'Learn More ->',
          badge: 'Premium Service',
        },
      ],
    },
  ] as SharedHomepagePremiumLevel[],
};

export const sharedDashboardContent = {
  dashboardInfo: {
    snapshotCards: [
      { title: 'Active Funnels', value: `${activeFunnels.length}`, detail: 'Live lead-capture pages' },
      { title: 'Integrations', value: '3', detail: 'GHL, Slack, Email' },
      { title: 'Top Funnel', value: 'HUBZone', detail: 'Current webinar push' },
      { title: 'Status', value: '●', detail: 'All systems operational' },
    ] as SharedDashboardCard[],
    quickLinks: [
      { label: '🎯 HUBZone Webinar', url: 'https://govcongiants.com/hubzone' },
      { label: '🏠 Homepage', url: 'https://govcongiants.com/' },
      { label: '📚 Resources Library', url: 'https://govcongiants.com/resources' },
      { label: '🔍 Mindy (mi-free)', url: 'https://govcongiants.com/mi-free' },
      { label: '💎 Premium Plans', url: 'https://govcongiants.com/premium' },
      { label: '🛒 Shop (Pro Membership)', url: '/shop' },
      { label: '💳 Stripe Dashboard', url: 'https://dashboard.stripe.com' },
      { label: '💼 GoHighLevel CRM', url: 'https://app.gohighlevel.com' },
      { label: '🔔 Slack App Settings', url: 'https://api.slack.com/apps' },
      { label: '🚀 Vercel Dashboard', url: 'https://vercel.com/dashboard' },
    ] as SharedLinkItem[],
    activeFunnels,
  },
  plansOverview: {
    intro:
      "How we position each product by level (beginner / growing / scaling) and where it's sold.",
    levels: plansOverviewLevels,
  },
  howItFits: {
    definitions: [
      { term: 'Traffic', def: 'Where visitors come from: ads, organic search, social links, email.' },
      { term: 'Funnels', def: 'Landing pages and flows that capture leads or send them to upsell/downsell.' },
      { term: 'Upsell / Downsell', def: 'Post-signup offers (e.g. Pro Member Group upsell, downsell to thank-you).' },
      { term: 'Product / Download', def: 'What they get: product access, PDFs, handouts, course access.' },
      { term: 'Confirmation email / Follow-up sequence', def: 'Automated email after signup and any drip or follow-up sequence.' },
      { term: 'Email or phone reach out', def: 'Manual outreach (cold or warm) to book meetings.' },
      { term: 'First meeting', def: 'Initial call or meeting with a lead.' },
      { term: 'Sale / Schedule a second meeting', def: 'Outcomes of the first meeting: close the sale or book a follow-up.' },
    ],
  },
  leadAutomation: {
    integrations: [
      {
        title: 'Go High Level CRM',
        status: '✅ Connected',
        detail: 'Creates/updates contacts with source tags',
        note: 'Location ID: AMkIivLuREYwsX5GhAAL',
      },
      {
        title: 'Slack Notifications',
        status: '✅ Connected',
        detail: 'Real-time lead notifications with name, email, phone, source',
        note: 'Env var: SLACK_LEAD_WEBHOOK_URL',
      },
      {
        title: 'Email Confirmation',
        status: '✅ Configured via Resend',
        detail: 'Sends welcome emails with resource links',
        note: 'Env var: RESEND_API_KEY',
      },
    ],
    sourceTags: [
      'hubzone-webinar',
      'hubzone-webinar-bottom',
      'mi-free',
      'opp',
      'handouts',
      'funding',
      'resources',
    ],
    envVars: [
      'GHL_API_KEY - Go High Level API key',
      'GHL_LOCATION_ID - Go High Level location ID',
      'SLACK_LEAD_WEBHOOK_URL - Slack webhook for notifications',
      'RESEND_API_KEY - Email service API key',
      'STRIPE_SECRET_KEY - Stripe payments (premium plans)',
    ],
  },
  funnelsLeadFlow: {
    leadCaptureSteps: [
      'User fills out form (name, email, phone)',
      'Form posts to /api/lead with source tag',
      'API creates/updates contact in Go High Level CRM',
      'API sends Slack notification to team channel',
      'API sends confirmation email (if configured)',
      'User redirects to thank you/upsell page',
    ],
    testingSteps: [
      'Fill out any form with test data (use unique email like test-{source}@example.com)',
      'Check Slack channel for notification (should appear within seconds)',
      'Check Go High Level for new contact with correct source tag',
      'Check email inbox for confirmation (if email configured for that source)',
    ],
    activeFunnels,
  },
};
