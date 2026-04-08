import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'bpa-agreements',
  title: 'Blanket Purchase Agreements: How BPAs Work and How to Win Them',
  metaTitle: 'Blanket Purchase Agreement (BPA) [Guide] — Win & Manage Federal BPAs',
  metaDescription:
    'Learn how blanket purchase agreements work in government contracting: BPA types, how to get one, competing for calls, and maximizing your BPA revenue.',
  keywords: [
    'blanket purchase agreement',
    'bpa government',
    'federal bpa',
    'bpa contract',
    'bpa call',
    'gsa bpa',
    'single award bpa',
    'multiple award bpa',
    'bpa ordering',
    'simplified acquisition',
  ],
  heroSubtitle:
    'BPAs are the government\'s way to establish preferred suppliers for repeat purchases. Win a BPA, and you get a direct line to recurring orders without full competition each time.',
  sections: [
    {
      heading: 'What Is a Blanket Purchase Agreement?',
      content: `
        <p>A <strong>Blanket Purchase Agreement (BPA)</strong> is a simplified method of filling anticipated repetitive needs for supplies or services. BPAs establish a "charge account" with qualified suppliers, allowing the government to place orders quickly without conducting a new procurement each time.</p>
        <p><strong>How BPAs work:</strong></p>
        <ul>
          <li><strong>Establishment</strong> — Government selects one or more vendors through competition</li>
          <li><strong>Terms</strong> — Agreement specifies pricing, delivery terms, and ordering procedures</li>
          <li><strong>Calls</strong> — Government places individual orders ("calls") against the BPA</li>
          <li><strong>Payment</strong> — Vendor invoices for each call; government pays per order</li>
        </ul>
        <p><strong>BPA characteristics:</strong></p>
        <ul>
          <li><strong>Not a contract</strong> — BPAs are agreements to order; no work guarantee</li>
          <li><strong>Simplified ordering</strong> — Calls can be placed quickly, often by purchase card</li>
          <li><strong>Pre-negotiated terms</strong> — Pricing established at BPA award</li>
          <li><strong>Recurring needs</strong> — Best for supplies/services ordered frequently</li>
        </ul>
        <p><strong>BPA vs. IDIQ:</strong></p>
        <p><a href="/guides/idiq-contracts">IDIQs</a> are formal contracts with binding terms. BPAs are simpler agreements — often established against existing contracts like <a href="/guides/gsa-schedule">GSA Schedule</a>. IDIQs suit larger, complex requirements; BPAs work for routine, repeat purchases.</p>
      `,
    },
    {
      heading: 'Types of BPAs',
      content: `
        <p><strong>Single Award BPA:</strong></p>
        <p>One vendor receives all orders under the BPA. Used when:</p>
        <ul>
          <li>Volume doesn't justify multiple awards</li>
          <li>Only one source can meet requirements</li>
          <li>Administrative simplicity outweighs competition benefits</li>
        </ul>
        <p><strong>Multiple Award BPA:</strong></p>
        <p>Several vendors receive BPA positions. Orders compete among BPA holders (or rotate). Provides:</p>
        <ul>
          <li>Competition at the order level</li>
          <li>Backup if primary vendor can't perform</li>
          <li>Better pricing through ongoing competition</li>
        </ul>
        <p><strong>By underlying contract:</strong></p>
        <p><strong>GSA Schedule BPA:</strong></p>
        <p>Established against a vendor's GSA Schedule contract. Terms inherit from the Schedule. Most common type — allows agencies to further streamline GSA ordering.</p>
        <p><strong>Open Market BPA:</strong></p>
        <p>Established through competitive process without an underlying contract. Less common; requires full competition to establish.</p>
        <p><strong>Federal Supply Schedule BPA (FSS BPA):</strong></p>
        <p>Specifically established against FSS contracts for specific agency needs. Provides additional discounts beyond standard GSA pricing.</p>
        <p><strong>By duration:</strong></p>
        <ul>
          <li><strong>1 year</strong> — Most common, reviewed annually</li>
          <li><strong>Up to 5 years</strong> — For larger requirements with market certainty</li>
          <li><strong>Indefinite</strong> — Rare; must be reviewed periodically</li>
        </ul>
      `,
    },
    {
      heading: 'Winning a BPA',
      content: `
        <p><strong>How agencies select BPA vendors:</strong></p>
        <p>For GSA Schedule BPAs, agencies issue an RFQ to Schedule holders. Selection based on:</p>
        <ul>
          <li><strong>Price</strong> — Often the primary factor for commodity items</li>
          <li><strong>Technical capability</strong> — Can you meet requirements?</li>
          <li><strong>Past performance</strong> — Delivery reliability, quality</li>
          <li><strong>Small business status</strong> — Many BPAs set aside for small business</li>
          <li><strong>Geographic location</strong> — For services requiring local presence</li>
        </ul>
        <p><strong>Proposal tips:</strong></p>
        <ul>
          <li><strong>Competitive pricing</strong> — BPAs often go to lowest price for commodities</li>
          <li><strong>Demonstrate reliability</strong> — Show you can fulfill orders consistently</li>
          <li><strong>Highlight responsiveness</strong> — Fast turnaround matters for BPAs</li>
          <li><strong>Small business advantages</strong> — Many agency BPAs are set aside</li>
        </ul>
        <p><strong>Prerequisites:</strong></p>
        <p>For GSA Schedule BPAs: Must have active <a href="/guides/gsa-schedule">GSA Schedule</a> contract with applicable SINs.</p>
        <p>For open market BPAs: Must be registered in <a href="/guides/sam-gov-registration">SAM.gov</a> and meet any solicitation requirements.</p>
        <p><strong>Finding BPA opportunities:</strong></p>
        <ul>
          <li>SAM.gov (solicitations for new BPAs)</li>
          <li>GSA eBuy (GSA Schedule BPA competitions)</li>
          <li>Agency forecasts</li>
          <li>Direct outreach to contracting offices</li>
        </ul>
      `,
    },
    {
      heading: 'BPA Ordering Procedures',
      content: `
        <p><strong>How orders are placed:</strong></p>
        <p>The government can place BPA calls through:</p>
        <ul>
          <li><strong>Purchase card</strong> — For micro-purchases (under $10,000)</li>
          <li><strong>Written orders</strong> — Standard purchase orders referencing the BPA</li>
          <li><strong>Electronic ordering</strong> — Through agency procurement systems</li>
        </ul>
        <p><strong>For single award BPAs:</strong></p>
        <p>Orders go directly to the BPA holder without further competition. Simple, fast ordering.</p>
        <p><strong>For multiple award BPAs:</strong></p>
        <p>Competition among BPA holders for each order:</p>
        <ul>
          <li><strong>Orders over $10,000</strong> — Must provide fair opportunity to all holders</li>
          <li><strong>Micro-purchases</strong> — May go to any holder; often rotated</li>
          <li><strong>Price competition</strong> — Government may request quotes from all holders</li>
        </ul>
        <p><strong>Order limitations:</strong></p>
        <ul>
          <li>Individual orders must stay within BPA scope</li>
          <li>Simplified acquisition threshold limits may apply</li>
          <li>Cumulative spending tracked against any BPA ceiling</li>
        </ul>
        <p><strong>Your responsibilities:</strong></p>
        <ul>
          <li>Monitor for order requests (check email, eBuy)</li>
          <li>Respond quickly to quote requests</li>
          <li>Fulfill orders per agreed terms</li>
          <li>Invoice promptly and accurately</li>
        </ul>
      `,
    },
    {
      heading: 'Managing Your BPA',
      content: `
        <p><strong>Order tracking:</strong></p>
        <ul>
          <li>Track all calls received and their status</li>
          <li>Monitor cumulative spending against any ceiling</li>
          <li>Maintain records for each order (required for audits)</li>
          <li>Flag approaching expiration dates for renewal</li>
        </ul>
        <p><strong>Performance requirements:</strong></p>
        <ul>
          <li><strong>Delivery reliability</strong> — Meet promised delivery times</li>
          <li><strong>Quality consistency</strong> — Maintain standards across all orders</li>
          <li><strong>Responsiveness</strong> — Answer inquiries, resolve issues quickly</li>
          <li><strong>Invoicing accuracy</strong> — Correct pricing, proper documentation</li>
        </ul>
        <p><strong>Relationship management:</strong></p>
        <p>BPAs are relationship-driven. Even with a BPA, you need active engagement:</p>
        <ul>
          <li>Regular check-ins with ordering office</li>
          <li>Understand upcoming needs</li>
          <li>Resolve problems before they escalate</li>
          <li>Request feedback on performance</li>
        </ul>
        <p><strong>BPA reviews:</strong></p>
        <p>Agencies review BPAs at least annually. Be prepared to:</p>
        <ul>
          <li>Demonstrate value delivered</li>
          <li>Show competitive pricing</li>
          <li>Document on-time delivery rates</li>
          <li>Address any performance concerns</li>
        </ul>
        <p>Poor performance can result in BPA termination or non-renewal.</p>
      `,
    },
    {
      heading: 'Maximizing BPA Revenue',
      content: `
        <p><strong>Active pursuit required:</strong></p>
        <p>Having a BPA doesn't guarantee orders. You must actively compete (for multiple award) or stay visible (for single award).</p>
        <p><strong>For multiple award BPAs:</strong></p>
        <ul>
          <li><strong>Respond to every RFQ</strong> — Even if you don't win, shows engagement</li>
          <li><strong>Price competitively</strong> — Balance margin with order volume</li>
          <li><strong>Be the easy choice</strong> — Fastest response, best service</li>
          <li><strong>Track competitors</strong> — Know who wins and why</li>
        </ul>
        <p><strong>For single award BPAs:</strong></p>
        <ul>
          <li><strong>Remind customers</strong> — They have options; keep your BPA top of mind</li>
          <li><strong>Make ordering easy</strong> — Streamlined process, flexible payment</li>
          <li><strong>Add value</strong> — Beyond minimum requirements</li>
          <li><strong>Avoid complacency</strong> — Competition happens at renewal</li>
        </ul>
        <p><strong>Expanding BPA scope:</strong></p>
        <ul>
          <li>Propose additional products/services that fit customer needs</li>
          <li>Negotiate BPA modifications to expand scope</li>
          <li>Use existing relationship to pursue new BPAs with same customer</li>
        </ul>
        <p><strong>Using BPAs as stepping stones:</strong></p>
        <p>BPA success builds past performance for larger opportunities. Strong BPA delivery can lead to:</p>
        <ul>
          <li>IDIQ positions</li>
          <li>Direct prime contracts</li>
          <li>Expanded work with the agency</li>
        </ul>
      `,
    },
    {
      heading: 'BPA Compliance and Regulations',
      content: `
        <p><strong>Regulatory framework:</strong></p>
        <p>BPAs are governed by FAR Subpart 8.4 (for FSS) and FAR 13.303 (simplified acquisition BPAs).</p>
        <p><strong>Key compliance requirements:</strong></p>
        <ul>
          <li><strong>Price consistency</strong> — Honor agreed pricing; can't exceed contract maximums</li>
          <li><strong>Scope compliance</strong> — Orders must fit within BPA terms</li>
          <li><strong>Reporting</strong> — Track and report sales as required</li>
          <li><strong>Contract flow-down</strong> — Terms from underlying contract apply</li>
        </ul>
        <p><strong>For GSA Schedule BPAs:</strong></p>
        <ul>
          <li>Pricing cannot exceed your GSA Schedule rates</li>
          <li>Must report BPA sales in GSA systems</li>
          <li>Industrial Funding Fee (IFF) still applies</li>
          <li>Subject to GSA compliance reviews</li>
        </ul>
        <p><strong>Documentation requirements:</strong></p>
        <ul>
          <li>Maintain records of all orders and deliveries</li>
          <li>Keep copies of quotes provided</li>
          <li>Document any modifications or changes</li>
          <li>Retain records for required period (typically 6 years)</li>
        </ul>
        <p><strong>Common compliance issues:</strong></p>
        <ul>
          <li>Accepting orders outside BPA scope</li>
          <li>Pricing inconsistencies across orders</li>
          <li>Late or incomplete reporting</li>
          <li>Missing documentation for audit</li>
        </ul>
      `,
    },
    {
      heading: 'BPA Strategy for Small Businesses',
      content: `
        <p><strong>Why BPAs favor small businesses:</strong></p>
        <ul>
          <li>Many agencies set aside BPAs for small business</li>
          <li>Smaller order sizes fit small business capacity</li>
          <li>Less proposal burden than full contracts</li>
          <li>Build relationships with minimal risk</li>
        </ul>
        <p><strong>Getting started with BPAs:</strong></p>
        <ol>
          <li><strong>Get your GSA Schedule</strong> — Foundation for most BPA opportunities</li>
          <li><strong>Identify target agencies</strong> — Who buys what you sell?</li>
          <li><strong>Find existing BPA opportunities</strong> — Check eBuy, SAM.gov</li>
          <li><strong>Propose to establish BPAs</strong> — Suggest BPA to customers with repeat needs</li>
        </ol>
        <p><strong>Building a BPA portfolio:</strong></p>
        <p>One BPA won't transform your business. Build a portfolio:</p>
        <ul>
          <li>Multiple BPAs across different agencies</li>
          <li>Mix of single and multiple award</li>
          <li>Different product/service lines covered</li>
          <li>Geographic diversity</li>
        </ul>
        <p><strong>Leveraging BPA past performance:</strong></p>
        <p>BPA performance counts as past performance. Document:</p>
        <ul>
          <li>Number of orders fulfilled</li>
          <li>On-time delivery rate</li>
          <li>Customer satisfaction</li>
          <li>Value delivered to government</li>
        </ul>
        <p>Use BPA success stories in proposals for larger opportunities.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Is a BPA a contract?',
      answer:
        'No. A BPA is an agreement to facilitate future orders, not a contract itself. Each call (order) placed against the BPA creates a contract for that specific order. You have no guarantee of any orders under a BPA.',
    },
    {
      question: 'Do I need a GSA Schedule to get a BPA?',
      answer:
        'Not always, but most agency BPAs are established against GSA Schedule contracts. Open market BPAs exist but are less common. Having a GSA Schedule dramatically increases BPA opportunities.',
    },
    {
      question: 'How long does a BPA last?',
      answer:
        'BPAs typically last 1-5 years. GSA Schedule BPAs cannot exceed the period of the underlying Schedule contract. BPAs should be reviewed at least annually and can be terminated at any time.',
    },
    {
      question: 'Can I protest a BPA award?',
      answer:
        'Yes, you can protest the establishment of a BPA. However, individual orders placed under existing BPAs have limited protest rights — similar to task orders under IDIQs. Timing and dollar thresholds apply.',
    },
    {
      question: 'What\'s the difference between a BPA and a requirements contract?',
      answer:
        'A requirements contract obligates the government to buy ALL its requirements from you (for specific items). A BPA has no minimum guarantee — the government can buy elsewhere even if they have a BPA with you.',
    },
    {
      question: 'How do I know when a BPA call is posted?',
      answer:
        'For GSA Schedule BPAs, opportunities appear on eBuy. For other BPAs, the ordering process varies by agreement — some send direct emails, others use agency systems. Clarify the process when the BPA is established.',
    },
    {
      question: 'Can prices change during a BPA?',
      answer:
        'It depends on the BPA terms. Some have fixed pricing; others allow adjustments per the underlying contract. GSA Schedule BPAs inherit Schedule price escalation provisions. Review your specific BPA terms.',
    },
    {
      question: 'How many BPAs should a small business pursue?',
      answer:
        'Depends on capacity. Each BPA requires active monitoring and responsive ordering. Start with 2-3 in your strongest markets, then expand as you build systems. Quality service beats quantity of agreements.',
    },
  ],
  cta: {
    heading: 'Build Your BPA Portfolio',
    description:
      'BPAs provide steady revenue streams with repeat customers. We help you identify the right opportunities, win BPA positions, and maximize order flow.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'gsa-schedule',
    'idiq-contracts',
    'simplified-acquisition',
    'contract-vehicles',
    'sam-gov-registration',
  ],
  publishedDate: '2026-04-07',
};
