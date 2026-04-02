export type PremiumProduct = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  price: string;
  ctaUrl: string;
  ctaText: string;
  badge?: string;
  highlights: { icon: string; title: string; desc: string }[];
};

export const PREMIUM_PRODUCTS: PremiumProduct[] = [
  {
    slug: 'pro-member-group',
    title: 'Pro Member Group',
    shortTitle: 'Pro Member Group',
    description: 'Ongoing support, community resources, and regular updates and training materials. Join thousands of contractors getting guidance and accountability.',
    price: '$99/month',
    ctaUrl: 'https://federalhelpcenter.com/pro',
    ctaText: 'Join Pro →',
    badge: 'RECOMMENDED',
    highlights: [
      { icon: '👑', title: 'Ongoing Support', desc: 'Direct access to experts and community.' },
      { icon: '📚', title: 'Community Resources', desc: '4,000+ members and shared knowledge.' },
      { icon: '🔄', title: 'Regular Updates', desc: 'New training and materials included.' },
    ],
  },
  {
    slug: 'pro-member-plan',
    title: 'Pro Member Plan',
    shortTitle: 'Pro Member Plan',
    description: 'Lifetime Training License, access to the 4,000+ member community, Step-by-Step Success Guide, First Partner Bootcamp, and Proposal Bootcamp. One-time payment.',
    price: '$997 one-time',
    ctaUrl: 'https://buy.stripe.com/fZuaEYaKY4QWbBr26W',
    ctaText: 'Get Access →',
    highlights: [
      { icon: '🎓', title: 'Lifetime Training License', desc: 'Access all training for good.' },
      { icon: '👥', title: '4,000+ Community', desc: 'Connect with other contractors.' },
      { icon: '📋', title: 'Success Guide + Bootcamps', desc: 'First Partner and Proposal Bootcamps included.' },
    ],
  },
  {
    slug: 'accelerator',
    title: 'Accelerator Program',
    shortTitle: 'Accelerator Program',
    description: '90 days of intensive support: 12 one-on-one coaching sessions (one per week), access to the Lifetime Program, personalized guidance through the federal contracting process, and step-by-step implementation support. Goal: contract-ready by program completion.',
    price: '',
    ctaUrl: 'https://calendly.com/govconedumeet/discovery-call',
    ctaText: 'Schedule Discovery Call →',
    highlights: [
      { icon: '⚡', title: '12 Weekly 1:1 Sessions', desc: '90 days of dedicated coaching.' },
      { icon: '📋', title: 'Lifetime Program Access', desc: 'Full access included.' },
      { icon: '🎯', title: 'Contract-Ready Goal', desc: 'Step-by-step implementation support.' },
    ],
  },
  {
    slug: 'consulting-pack',
    title: 'Consulting Pack',
    shortTitle: 'Consulting Pack',
    description: 'Get 20 hours of one-on-one consulting focused on your federal growth strategy, target opportunities, and execution plan.',
    price: '',
    ctaUrl: 'mailto:hello@govconedu.com?subject=Consulting%20Pack%20Inquiry',
    ctaText: 'Book Consulting →',
    highlights: [
      { icon: '🧠', title: '20 Hours 1:1', desc: 'Dedicated consulting tailored to your business goals.' },
      { icon: '🗺️', title: 'Custom Strategy', desc: 'Clear federal growth roadmap and priority actions.' },
      { icon: '📝', title: 'Opportunity + Proposal Reviews', desc: 'Hands-on review and guidance to improve execution.' },
    ],
  },
  {
    slug: 'white-glove',
    title: 'White Glove Service',
    shortTitle: 'White Glove (Business Development Retainers)',
    description: 'Premium fractional business development services with dedicated consultant support tailored to your company. Monthly retainer options available.',
    price: '', // Premium service – no price displayed
    ctaUrl: 'mailto:hello@govconedu.com?subject=White%20Glove%20Inquiry',
    ctaText: 'Contact Us →',
    badge: 'RECOMMENDED',
    highlights: [
      { icon: '🤝', title: 'Dedicated Consultant', desc: 'Fractional BD support for your team.' },
      { icon: '📊', title: 'Tailored to You', desc: 'Strategy and execution for your company.' },
      { icon: '📅', title: 'Monthly Retainers', desc: 'Flexible retainer options available.' },
    ],
  },
];

export function getPremiumBySlug(slug: string): PremiumProduct | undefined {
  return PREMIUM_PRODUCTS.find((p) => p.slug === slug);
}

export const PREMIUM_SLUGS = PREMIUM_PRODUCTS.map((p) => p.slug);
