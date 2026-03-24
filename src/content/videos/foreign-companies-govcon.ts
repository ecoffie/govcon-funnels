import type { VideoData } from './index';

export const video: VideoData = {
  slug: 'foreign-companies-govcon',
  title: 'Foreign-Based Companies in US Government Contracting: Complete Guide',
  metaTitle: 'Foreign Companies in GovCon | How to Participate in US Contracts',
  metaDescription:
    'Learn how foreign-owned businesses can participate in US government contracting. Eligibility requirements, US entity options, and compliance considerations.',
  keywords: [
    'foreign companies government contracts',
    'international govcon',
    'foreign owned small business',
    'us entity requirements',
    'cfius requirements',
    'foreign investment govcon',
    'non-us companies federal contracts',
    'international contractors',
  ],
  youtubeUrl: 'https://youtu.be/XvWaAownrZU',
  youtubeId: 'XvWaAownrZU',
  thumbnail: '/images/videos/supporting small business.jpg',
  duration: '38:00',
  publishedDate: '2025-12-01',
  category: 'business-growth',
  heroSubtitle:
    'Navigate the complex requirements for foreign-owned businesses seeking US government contracts.',

  content: `
    <p>Can foreign-owned companies win US government contracts? <strong>Yes — but with significant restrictions and requirements.</strong> This video explains exactly how international businesses can participate in federal contracting legally and effectively.</p>

    <p>Whether you're a foreign company looking to enter the US market or a US business with foreign ownership, understanding these requirements is critical to your eligibility.</p>

    <h3>What You Will Learn</h3>

    <ul>
      <li><strong>Eligibility Basics</strong> — When foreign companies can and cannot compete</li>
      <li><strong>US Entity Requirements</strong> — Options for establishing US presence</li>
      <li><strong>Ownership Thresholds</strong> — How much foreign ownership is allowed</li>
      <li><strong>Security Considerations</strong> — CFIUS, ITAR, and classified work restrictions</li>
      <li><strong>Practical Strategies</strong> — How to structure your business for success</li>
    </ul>

    <h3>The Basic Rules</h3>

    <p>Foreign companies face several restrictions in US government contracting:</p>

    <ul>
      <li><strong>SAM.gov registration</strong> requires a US address (physical or registered agent)</li>
      <li><strong>Small business set-asides</strong> require the business to be organized under US law</li>
      <li><strong>Many contracts</strong> restrict competition to US-owned businesses</li>
      <li><strong>Defense and security work</strong> has strict citizenship and clearance requirements</li>
    </ul>

    <h3>US Entity Options</h3>

    <p>Foreign companies typically establish a US presence through:</p>

    <p><strong>Option 1: US Subsidiary</strong></p>
    <p>Form a new LLC or Corporation under US state law. Can be 100% foreign-owned but is a separate legal entity. Best for companies committed to the US market long-term.</p>

    <p><strong>Option 2: US Branch Office</strong></p>
    <p>Establish a branch rather than separate entity. Simpler setup but the foreign parent remains liable. Limited eligibility for certain contracts.</p>

    <p><strong>Option 3: Joint Venture</strong></p>
    <p>Partner with a US company on specific contracts. Allows participation without full US establishment. Common for large international defense contractors.</p>

    <h3>Small Business Eligibility</h3>

    <p>To qualify as a small business for set-aside contracts:</p>

    <ul>
      <li>Business must be <strong>organized under US federal, state, or tribal law</strong></li>
      <li>Principal place of business must be in the <strong>United States</strong></li>
      <li>More than 50% owned by <strong>US citizens or permanent residents</strong> for most certifications</li>
      <li><strong>8(a), HUBZone, WOSB, SDVOSB</strong> have specific citizenship requirements</li>
    </ul>

    <h3>Security and Compliance Restrictions</h3>

    <p><strong>CFIUS (Committee on Foreign Investment)</strong></p>
    <p>Reviews foreign investments for national security implications. Can block or unwind acquisitions that threaten US security interests.</p>

    <p><strong>ITAR (International Traffic in Arms Regulations)</strong></p>
    <p>Restricts export of defense articles and services. Foreign-owned companies face significant restrictions on ITAR-controlled work.</p>

    <p><strong>Security Clearances</strong></p>
    <p>Most classified work requires Facility Security Clearance (FCL). Foreign ownership creates complications that may disqualify companies from classified contracts.</p>

    <h3>Practical Strategies</h3>

    <ol>
      <li><strong>Start with commercial contracts</strong> — Less restrictive than defense/security work</li>
      <li><strong>Establish genuine US presence</strong> — Not just a mailbox; real operations, employees, management</li>
      <li><strong>Consider strategic partnerships</strong> — Team with established US contractors as subcontractor</li>
      <li><strong>Focus on open competition</strong> — Avoid set-asides requiring US ownership</li>
      <li><strong>Consult legal expertise</strong> — International trade and government contracts attorneys</li>
    </ol>

    <h3>Which Contracts Are Available?</h3>

    <p>Foreign-owned companies can generally compete for:</p>

    <ul>
      <li>Full and open competition contracts (not set-aside for small business)</li>
      <li>Commercial item acquisitions</li>
      <li>Contracts without citizenship restrictions in the solicitation</li>
      <li>Subcontracts under large prime contractors</li>
    </ul>

    <p>Restrictions increase significantly for defense, intelligence, and security-related work.</p>
  `,

  takeaways: [
    'Foreign companies can compete but face significant restrictions and requirements',
    'US subsidiary (LLC or Corp) is typically required for meaningful participation',
    'Small business certifications generally require US ownership and control',
    'Defense and classified work has strict citizenship and security requirements',
    'Start with commercial contracts and subcontracting to build US presence',
  ],

  relatedGuides: [
    'government-contracting-for-beginners',
    'sam-gov-registration',
    'finding-government-contracts',
  ],

  relatedJobs: ['bd-manager', 'contracts-administrator'],

  cta: {
    heading: 'Start Your US Registration',
    description:
      'SAM.gov registration is the first step for any company seeking US government contracts. Learn the complete process.',
    buttonText: 'Read SAM.gov Guide',
    buttonHref: '/guides/sam-gov-registration',
  },
};
