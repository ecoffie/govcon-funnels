/*
 * Single source of truth for the Business Ownership Accelerator page.
 *
 * Program decisions that are still open are `null` (or empty), and the page
 * hides whatever depends on them. Settling a decision means editing this file,
 * not the page. Never fill a field with a guess: price, dates, capacity,
 * mentors and stories must come from an approved decision or a consenting person.
 */

export type ProgramFormat = 'cohort' | 'self-paced' | 'hybrid';
export type SupportFeature = 'live-sessions' | 'mentor-feedback' | 'community';

export interface AcceleratorWeek {
  week: number;
  stage: Stage;
  title: string;
  objective: string;
  topics: string[];
  deliverable: string;
  milestone: string;
}

export type Stage = 'Skill' | 'Offer' | 'Customer' | 'Business' | 'Growth';

export const STAGES: { name: Stage; line: string }[] = [
  { name: 'Skill', line: 'What you can already do, and what people would pay for.' },
  { name: 'Offer', line: 'One clear service, scoped and priced.' },
  { name: 'Customer', line: 'Who buys it, and a repeatable way to reach them.' },
  { name: 'Business', line: 'Set up properly, with systems that run.' },
  { name: 'Growth', line: 'The next 90 days, channel by channel.' },
];

export const PROGRAM = {
  name: 'Business Ownership Accelerator',
  applicationsOpen: false,
  weeks: 8,
  format: null as ProgramFormat | null,
  hoursPerWeek: null as string | null,
  price: null as string | null,
  nextStart: null as string | null,
  capacity: null as number | null,
  support: [] as SupportFeature[],
  certificate: null as boolean | null,
};

export const AUDIENCES = [
  { who: 'Barbers and cosmetologists', could: 'A shop, a mobile service, a product line' },
  { who: 'Chefs and caterers', could: 'Catering, meal prep, private events' },
  { who: 'Mechanics and technicians', could: 'A mobile repair or fleet service' },
  { who: 'Construction and the trades', could: 'Your own crew, your own contracts' },
  { who: 'Consultants', could: 'A firm with packaged services, not hourly favors' },
  { who: 'IT professionals', could: 'Managed services for local businesses' },
  { who: 'Veterans in transition', could: 'A business built on what the service taught you' },
  { who: '1099 contractors', could: 'Clients of your own instead of one platform' },
];

export const CURRICULUM: AcceleratorWeek[] = [
  {
    week: 1,
    stage: 'Skill',
    title: 'Identify your business opportunity',
    objective: 'Turn your skills and experience into candidate offers, then choose one.',
    topics: ['Skills inventory', 'What people already pay you for', 'Licensed vs. unlicensed work', 'Choosing one offer'],
    deliverable: 'Business Opportunity Profile',
    milestone: 'One offer chosen, and three people named who have paid or would pay for it.',
  },
  {
    week: 2,
    stage: 'Customer',
    title: 'Find your customer',
    objective: 'Define who buys, the problem you solve for them, and why they would pay.',
    topics: ['Customer types: consumers, local businesses, commercial, government', 'Framing the problem', 'Simple market evidence'],
    deliverable: 'Ideal Customer Profile and initial market evidence',
    milestone: 'Five conversations held with real prospective customers, with notes.',
  },
  {
    week: 3,
    stage: 'Offer',
    title: 'Build your offer',
    objective: 'Define the service, its scope, your pricing assumptions and your promise.',
    topics: ['Packaging a service', 'Pricing methods', 'Scope and exclusions', 'Value proposition'],
    deliverable: 'Offer and Pricing Sheet',
    milestone: 'Price and scope written down and tested with at least three prospects.',
  },
  {
    week: 4,
    stage: 'Business',
    title: 'Establish your business',
    objective: 'Set the business up properly, as it applies to you.',
    topics: ['Business structure', 'Registration', 'Separate finances', 'Insurance and licensing', 'Basic compliance'],
    deliverable: 'Business Setup Checklist',
    milestone: 'Business bank account opened (or a dated plan to open it), and required licenses identified.',
  },
  {
    week: 5,
    stage: 'Customer',
    title: 'Get your first customers',
    objective: 'Build a repeatable way to find buyers.',
    topics: ['Referrals', 'Partnerships', 'Local networking', 'Outreach scripts', 'A simple online presence'],
    deliverable: 'Customer Acquisition Plan',
    milestone: 'Twenty outreach touches logged in one week.',
  },
  {
    week: 6,
    stage: 'Customer',
    title: 'Learn to sell and deliver',
    objective: 'Run a sales conversation all the way through to delivery.',
    topics: ['Discovery conversations', 'Quotes and proposals', 'Negotiation', 'Fulfillment', 'Customer communication'],
    deliverable: 'Sales and Delivery Playbook',
    milestone: 'At least one quote or proposal sent to a real prospect.',
  },
  {
    week: 7,
    stage: 'Business',
    title: 'Build systems',
    objective: 'Make the business repeatable, so it does not depend on memory.',
    topics: ['Invoicing', 'Bookkeeping basics', 'Customer tracking', 'Operating procedures'],
    deliverable: 'Basic Business Operating System',
    milestone: 'Invoice template ready, bookkeeping method chosen, and three procedures written.',
  },
  {
    week: 8,
    stage: 'Growth',
    title: 'Build your 90-day growth plan',
    objective: 'Choose your next customer channels, milestones and weekly actions.',
    topics: ['Choosing channels', 'Commercial contracts and subcontracting', 'Government contracting, where it fits', 'Setting milestones'],
    deliverable: '90-Day Business Growth Plan',
    milestone: 'A written plan with three milestones and the weekly actions behind them.',
  },
];

export const CHANNELS = [
  { name: 'Local and direct customers', line: 'Households and neighborhood businesses that need what you do.' },
  { name: 'Commercial clients', line: 'Companies that buy your service on a schedule or a contract.' },
  { name: 'Subcontracting', line: 'Work alongside larger firms that need a reliable specialist.' },
  { name: 'Partnerships', line: 'Referral and teaming relationships with complementary businesses.' },
  { name: 'Government contracts', line: 'One channel among several, for businesses where it fits.' },
];

export interface Faq {
  question: string;
  /** null = undecided; the question is hidden until a decision is made. */
  answer: string | null;
}

export const FAQS: Faq[] = [
  {
    question: 'Do I need to have a business already?',
    answer: 'No. Week 1 starts from the skills you have. If you already run something small, the program helps you make it established.',
  },
  {
    question: 'Is this a government contracting course?',
    answer:
      'No. It is a business ownership program. Government contracts are one possible customer channel, covered in Week 8 for the businesses where they fit, alongside local, commercial, subcontracting and partnership work.',
  },
  {
    question: 'Do I need an LLC or a license before I start?',
    answer:
      'No. Week 4 walks through business setup as it applies to you. The program is general education, not individualized legal, tax or accounting advice, so you will be pointed to the right professional where you need one.',
  },
  {
    question: 'Will I make money from this?',
    answer:
      'We do not promise revenue, customers or contracts. You will finish with eight working deliverables and a 90-day plan. What happens next depends on your market and the work you put in.',
  },
  {
    question: 'What will I have at the end?',
    answer:
      'Eight deliverables that together form your business plan: an opportunity profile, a customer profile, an offer and pricing sheet, a setup checklist, an acquisition plan, a sales and delivery playbook, an operating system and a 90-day growth plan.',
  },
  { question: 'Who can apply?', answer: null },
  { question: 'How much time does it take each week?', answer: null },
  { question: 'Is it live or self-paced?', answer: null },
  { question: 'What does it cost?', answer: null },
  { question: 'When does the next cohort start?', answer: null },
  { question: 'Do I get a certificate?', answer: null },
];
