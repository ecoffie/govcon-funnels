import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'contract-data-rights',
  title: 'Data Rights in Government Contracts: Protecting Your IP',
  metaTitle: 'Government Contract Data Rights Guide — IP Protection & Licensing',
  metaDescription:
    'Learn about data rights in government contracts: protecting intellectual property, license types, technical data and software rights, and negotiating data rights clauses.',
  keywords: [
    'data rights',
    'government contract ip',
    'technical data',
    'software rights',
    'unlimited rights',
    'limited rights',
    'restricted rights',
    'intellectual property',
    'far data rights',
    'dfars data rights',
  ],
  heroSubtitle:
    'Your intellectual property is a valuable asset. Understanding data rights in government contracts protects your competitive advantage while meeting contract requirements.',
  sections: [
    {
      heading: 'What Are Data Rights?',
      content: `
        <p><strong>Data rights</strong> in government contracts refer to the government's license to use, modify, reproduce, and distribute technical data and software delivered under a contract.</p>
        <p><strong>Key concepts:</strong></p>
        <ul>
          <li><strong>Technical data</strong> — Documentation, drawings, specifications</li>
          <li><strong>Computer software</strong> — Code, programs, databases</li>
          <li><strong>License rights</strong> — What government can do with your data</li>
          <li><strong>Intellectual property</strong> — Your underlying IP rights</li>
        </ul>
        <p><strong>Why data rights matter:</strong></p>
        <ul>
          <li>Protects your competitive advantage</li>
          <li>Determines who can use your work</li>
          <li>Affects recompete dynamics</li>
          <li>Impacts commercialization opportunities</li>
        </ul>
        <p><strong>Governing regulations:</strong></p>
        <ul>
          <li>FAR 27.4 — Rights in data (civilian)</li>
          <li>DFARS 227.71 — Technical data (DoD)</li>
          <li>DFARS 227.72 — Computer software (DoD)</li>
        </ul>
      `,
    },
    {
      heading: 'Types of Government License Rights',
      content: `
        <p><strong>Unlimited rights:</strong></p>
        <ul>
          <li>Government can use, modify, reproduce, disclose</li>
          <li>Can share with anyone for any purpose</li>
          <li>Applies to data developed entirely at government expense</li>
          <li>No restrictions on government use</li>
        </ul>
        <p><strong>Limited rights (technical data):</strong></p>
        <ul>
          <li>For data developed at private expense</li>
          <li>Government can use within government only</li>
          <li>Cannot release outside government without permission</li>
          <li>Protects your commercial advantage</li>
        </ul>
        <p><strong>Restricted rights (software):</strong></p>
        <ul>
          <li>Commercial software equivalent of limited rights</li>
          <li>Government use only for specified purposes</li>
          <li>Cannot modify or reverse engineer (typically)</li>
          <li>Protects your software investment</li>
        </ul>
        <p><strong>Government purpose rights:</strong></p>
        <ul>
          <li>DoD concept for mixed funding</li>
          <li>Government can use for government purposes</li>
          <li>Can share with other contractors for government work</li>
          <li>Converts to unlimited rights after 5 years (typically)</li>
        </ul>
        <p><strong>SBIR data rights:</strong></p>
        <ul>
          <li>Special protection for SBIR/STTR-funded data</li>
          <li>Protection period of up to 20 years</li>
          <li>Encourages small business innovation</li>
        </ul>
      `,
    },
    {
      heading: 'What Determines Data Rights?',
      content: `
        <p><strong>Funding source is key:</strong></p>
        <p>The primary factor determining data rights is who paid for development:</p>
        <p><strong>Government-funded development:</strong></p>
        <ul>
          <li>Government typically gets unlimited rights</li>
          <li>Developed with contract funds</li>
          <li>Created specifically for the contract</li>
        </ul>
        <p><strong>Contractor-funded development:</strong></p>
        <ul>
          <li>Contractor retains limited/restricted rights</li>
          <li>Developed with your own IR&D or commercial investment</li>
          <li>Pre-existing before the contract</li>
        </ul>
        <p><strong>Mixed funding:</strong></p>
        <ul>
          <li>Government purpose rights (DoD)</li>
          <li>Negotiated allocation (civilian)</li>
          <li>Document funding sources carefully</li>
        </ul>
        <p><strong>Commercial items:</strong></p>
        <ul>
          <li>Commercial technical data — license rights only</li>
          <li>Commercial software — license per commercial terms</li>
          <li>Preserved commercial value</li>
        </ul>
      `,
    },
    {
      heading: 'Protecting Your Data Rights',
      content: `
        <p><strong>Before the contract:</strong></p>
        <ul>
          <li>Identify pre-existing IP you'll use</li>
          <li>Document development history</li>
          <li>Understand contract data rights clauses</li>
          <li>Negotiate favorable terms where possible</li>
        </ul>
        <p><strong>Marking requirements:</strong></p>
        <p>Proper marking is essential:</p>
        <ul>
          <li>Mark limited rights data appropriately</li>
          <li>Use required legends and notices</li>
          <li>Apply markings at delivery</li>
          <li>Maintain marking records</li>
        </ul>
        <p><strong>During performance:</strong></p>
        <ul>
          <li>Track funding sources for all development</li>
          <li>Segregate government-funded from private-funded work</li>
          <li>Document your investments</li>
          <li>Apply appropriate markings to deliverables</li>
        </ul>
        <p><strong>Assertion process (DFARS):</strong></p>
        <ul>
          <li>Identify and assert restrictions before award</li>
          <li>List items in contract schedule</li>
          <li>Justify the basis for restrictions</li>
        </ul>
      `,
    },
    {
      heading: 'DoD-Specific Rules (DFARS)',
      content: `
        <p><strong>DFARS data rights framework:</strong></p>
        <p>DoD has detailed rules in DFARS 252.227-7013 (technical data) and 252.227-7014 (software).</p>
        <p><strong>Pre-award assertions:</strong></p>
        <ul>
          <li>Must identify restrictions in proposal</li>
          <li>List specific items with restrictions</li>
          <li>Cite basis for restriction</li>
          <li>Failure to assert may forfeit rights</li>
        </ul>
        <p><strong>Challenge process:</strong></p>
        <ul>
          <li>Government can challenge assertions</li>
          <li>Contractor must justify restrictions</li>
          <li>Burden on contractor to prove basis</li>
          <li>Potential loss of restrictions if unsupported</li>
        </ul>
        <p><strong>Deferred ordering:</strong></p>
        <ul>
          <li>Government can order data later</li>
          <li>Must pay fair compensation</li>
          <li>Can require delivery of previously undelivered data</li>
        </ul>
        <p><strong>Validation:</strong></p>
        <ul>
          <li>Government can validate markings</li>
          <li>3-year window after delivery (typically)</li>
          <li>You must provide evidence of basis</li>
        </ul>
      `,
    },
    {
      heading: 'Software Data Rights',
      content: `
        <p><strong>Computer software documentation:</strong></p>
        <ul>
          <li>Follows technical data rules</li>
          <li>Same unlimited/limited rights framework</li>
          <li>Documentation separate from code</li>
        </ul>
        <p><strong>Computer software:</strong></p>
        <ul>
          <li>Code, programs, databases, documentation</li>
          <li>Restricted rights = limited rights equivalent</li>
          <li>Source code vs. object code considerations</li>
        </ul>
        <p><strong>Commercial software:</strong></p>
        <ul>
          <li>License per commercial terms</li>
          <li>Government accepts standard license</li>
          <li>May negotiate government-specific terms</li>
        </ul>
        <p><strong>Open source considerations:</strong></p>
        <ul>
          <li>Open source components retain their licenses</li>
          <li>May affect your ability to restrict</li>
          <li>Disclose open source usage</li>
        </ul>
        <p><strong>Source code escrow:</strong></p>
        <ul>
          <li>Government may require escrow</li>
          <li>Released only under specific conditions</li>
          <li>Protects government access if contractor fails</li>
        </ul>
      `,
    },
    {
      heading: 'Recompete and Data Rights',
      content: `
        <p><strong>Incumbency advantage:</strong></p>
        <p>Your data rights can provide competitive advantage:</p>
        <ul>
          <li>Competitors may need access to your data</li>
          <li>Limited rights data may not be shared</li>
          <li>Reduces competition in some cases</li>
        </ul>
        <p><strong>Government's response:</strong></p>
        <ul>
          <li>May require unlimited rights</li>
          <li>May negotiate broader licenses</li>
          <li>May work around restricted data</li>
          <li>Leveling provisions in recompete</li>
        </ul>
        <p><strong>Technical data packages:</strong></p>
        <ul>
          <li>Government may share TDPs with competitors</li>
          <li>Restricted data excluded</li>
          <li>Can affect competitive landscape</li>
        </ul>
        <p><strong>Protecting your position:</strong></p>
        <ul>
          <li>Assert restrictions properly</li>
          <li>Mark data correctly</li>
          <li>Document your investments</li>
          <li>Understand what government can share</li>
        </ul>
      `,
    },
    {
      heading: 'Negotiating Data Rights',
      content: `
        <p><strong>Areas for negotiation:</strong></p>
        <ul>
          <li>Scope of government license</li>
          <li>Duration of restrictions</li>
          <li>Specific items covered</li>
          <li>Marking procedures</li>
        </ul>
        <p><strong>Leverage points:</strong></p>
        <ul>
          <li>Pre-existing IP you're bringing</li>
          <li>Commercial items</li>
          <li>SBIR/STTR protections</li>
          <li>Your investment level</li>
        </ul>
        <p><strong>Common negotiated terms:</strong></p>
        <ul>
          <li>Specific restricted items list</li>
          <li>Extended protection periods</li>
          <li>Narrower government purpose scope</li>
          <li>Clearer commercialization rights</li>
        </ul>
        <p><strong>Proposal strategy:</strong></p>
        <ul>
          <li>Identify IP early</li>
          <li>Make assertions in proposal</li>
          <li>Be prepared to justify</li>
          <li>Know what you can't concede</li>
        </ul>
        <p><strong>Red flags:</strong></p>
        <ul>
          <li>Broad unlimited rights requirements</li>
          <li>No recognition of pre-existing IP</li>
          <li>Unreasonable challenge provisions</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'What happens if I don\'t mark my data properly?',
      answer:
        'Unmarked data may be treated as unlimited rights data. The government can challenge unmarked restrictions, and you may lose protections. Always mark data with appropriate legends before delivery.',
    },
    {
      question: 'Can the government share my limited rights data with competitors?',
      answer:
        'Generally no. Limited rights data can only be used within the government. However, data may be shared for emergency repair/overhaul, or if you give permission. Read your specific clause carefully.',
    },
    {
      question: 'What are SBIR data rights?',
      answer:
        'SBIR/STTR data rights provide extended protection (up to 20 years) for data developed under SBIR/STTR contracts. This encourages small business innovation by protecting commercial potential.',
    },
    {
      question: 'Can I use my own software on a government contract?',
      answer:
        'Yes, and you can protect it. Pre-existing software developed at private expense qualifies for restricted rights or commercial software treatment. Assert and mark appropriately.',
    },
    {
      question: 'What\'s the difference between ownership and data rights?',
      answer:
        'Data rights are license rights — what the government can do with deliverables. You typically retain ownership of underlying IP. The government gets a license, not ownership, unless specifically negotiated otherwise.',
    },
    {
      question: 'How do I prove I developed something at private expense?',
      answer:
        'Document funding sources from the beginning. Keep records of IR&D investments, commercial development history, and segregated accounting. If challenged, you\'ll need to substantiate your assertions.',
    },
    {
      question: 'What are government purpose rights?',
      answer:
        'A DoD concept for mixed-funding situations. Government can use data for government purposes and share with other contractors for government work, but not for commercial purposes. Often converts to unlimited rights after 5 years.',
    },
    {
      question: 'Can I commercialize technology developed under government contract?',
      answer:
        'Usually yes. Even when government gets unlimited rights, you typically retain ownership and can commercialize. Your license to use your own IP isn\'t affected by government\'s license. Confirm with specific contract terms.',
    },
  ],
  cta: {
    heading: 'Protect Your Intellectual Property',
    description:
      'Data rights can determine the future value of your innovations. Our team helps you understand and negotiate data rights provisions to protect your competitive advantage.',
    buttonText: 'Get IP Guidance',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'government-contract-law',
    'far-overview',
    'contract-modifications',
    'firm-fixed-price-contracts',
    'organizational-conflicts-interest',
  ],
  publishedDate: '2026-04-07',
};
