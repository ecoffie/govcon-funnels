import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'export-controls',
  title: 'Export Controls for Government Contractors: ITAR and EAR Compliance',
  metaTitle: 'Export Controls Guide — ITAR, EAR, Licensing Requirements & Compliance',
  metaDescription:
    'Complete guide to export controls for defense and technology contractors: ITAR vs EAR differences, jurisdiction determination, licensing requirements, and compliance programs.',
  keywords: [
    'export controls',
    'ITAR compliance',
    'EAR regulations',
    'export licensing',
    'defense articles',
    'dual-use technology',
    'DDTC',
    'BIS',
    'export compliance',
    'international traffic in arms',
  ],
  heroSubtitle:
    'Export controls regulate the transfer of defense articles, technical data, and dual-use technologies. Learn how to determine jurisdiction, obtain licenses, and build a compliant export control program.',
  sections: [
    {
      heading: 'Overview of U.S. Export Controls',
      content: `
        <p>U.S. export controls restrict the export, re-export, and transfer of certain goods, software, technology, and technical data to protect national security and foreign policy interests.</p>
        <p><strong>Why export controls matter for contractors:</strong></p>
        <ul>
          <li>Required for defense and dual-use technology contracts</li>
          <li>Violations carry severe civil and criminal penalties</li>
          <li>Non-compliance can result in debarment</li>
          <li>Due diligence demonstrates contractor responsibility</li>
          <li>Protects U.S. technological advantage</li>
        </ul>
        <p><strong>Two primary regimes:</strong></p>
        <ul>
          <li><strong>ITAR (International Traffic in Arms Regulations)</strong> — Defense articles, services, and technical data</li>
          <li><strong>EAR (Export Administration Regulations)</strong> — Dual-use items (commercial and military applications)</li>
        </ul>
        <p><strong>Regulatory agencies:</strong></p>
        <ul>
          <li><strong>State Department (DDTC)</strong> — Administers ITAR</li>
          <li><strong>Commerce Department (BIS)</strong> — Administers EAR</li>
          <li><strong>Treasury Department (OFAC)</strong> — Economic sanctions and embargoes</li>
        </ul>
        <p><strong>What constitutes an "export":</strong></p>
        <ul>
          <li>Physical shipment outside the U.S.</li>
          <li>Electronic transmission to foreign persons (email, cloud storage)</li>
          <li>Visual or oral disclosure to foreign nationals in the U.S. ("deemed export")</li>
          <li>Release of technology or source code abroad</li>
        </ul>
      `,
    },
    {
      heading: 'ITAR: International Traffic in Arms Regulations',
      content: `
        <p><strong>What is ITAR:</strong></p>
        <p>ITAR controls the export and temporary import of defense articles, defense services, and related technical data as defined in the United States Munitions List (USML).</p>
        <p><strong>USML categories (21 total):</strong></p>
        <ul>
          <li>Category I — Firearms, close assault weapons, combat shotguns</li>
          <li>Category II — Guns and armament</li>
          <li>Category III — Ammunition and ordnance</li>
          <li>Category IV — Launch vehicles, missiles, rockets</li>
          <li>Category V — Explosives and energetic materials</li>
          <li>Category VI — Vessels of war and special naval equipment</li>
          <li>Category VII — Tanks and military vehicles</li>
          <li>Category VIII — Aircraft and related articles</li>
          <li>Category IX — Military training equipment</li>
          <li>Category X — Protective personnel equipment</li>
          <li>Category XI — Military electronics</li>
          <li>Category XII — Fire control, range finder, optical, guidance and control equipment</li>
          <li>Category XIII — Auxiliary military equipment</li>
          <li>Category XIV — Toxicological agents</li>
          <li>Category XV — Spacecraft systems and associated equipment</li>
          <li>Category XVI — Nuclear weapons related articles</li>
          <li>Category XVII — Classified articles</li>
          <li>Category XVIII — Directed energy weapons</li>
          <li>Category XIX — Gas turbine engines and associated equipment</li>
          <li>Category XX — Submersible vessels and oceanographic equipment</li>
          <li>Category XXI — Miscellaneous articles</li>
        </ul>
        <p><strong>ITAR registration requirement:</strong></p>
        <p>Companies engaged in manufacturing, exporting, or brokering defense articles must register with DDTC:</p>
        <ul>
          <li>Annual registration fee: $3,000</li>
          <li>Registration valid for one year</li>
          <li>Must designate empowered official</li>
          <li>Update within 60 days of changes</li>
        </ul>
        <p><strong>Types of ITAR authorizations:</strong></p>
        <ul>
          <li><strong>License</strong> — Formal authorization for specific transaction</li>
          <li><strong>Agreement</strong> — Manufacturing license agreements, technical assistance agreements, warehouse distribution agreements</li>
          <li><strong>License exemptions</strong> — Canada exemption, limited exceptions for NATO allies</li>
        </ul>
        <p><strong>Technical data controls:</strong></p>
        <p>Technical data includes:</p>
        <ul>
          <li>Blueprints, drawings, plans, instructions</li>
          <li>Software directly related to defense articles</li>
          <li>Information required for design, development, production, operation, or maintenance</li>
        </ul>
        <p><strong>Deemed exports:</strong></p>
        <p>Release of ITAR-controlled technical data to foreign persons in the U.S. requires authorization:</p>
        <ul>
          <li>Includes foreign national employees, visitors, consultants</li>
          <li>Visual inspection of ITAR hardware</li>
          <li>Oral exchanges of technical information</li>
          <li>Use Technology Control Plans (TCP) to manage access</li>
        </ul>
      `,
    },
    {
      heading: 'EAR: Export Administration Regulations',
      content: `
        <p><strong>What is EAR:</strong></p>
        <p>EAR controls the export of dual-use items (commercial products with potential military applications) and purely commercial items. Administered by the Bureau of Industry and Security (BIS).</p>
        <p><strong>Commerce Control List (CCL):</strong></p>
        <p>Items subject to EAR are classified using Export Control Classification Numbers (ECCNs) organized into 10 categories:</p>
        <ul>
          <li>0 — Nuclear materials, facilities, equipment</li>
          <li>1 — Materials, chemicals, microorganisms, toxins</li>
          <li>2 — Materials processing</li>
          <li>3 — Electronics</li>
          <li>4 — Computers</li>
          <li>5 — Telecommunications and information security</li>
          <li>6 — Sensors and lasers</li>
          <li>7 — Navigation and avionics</li>
          <li>8 — Marine</li>
          <li>9 — Aerospace and propulsion</li>
        </ul>
        <p><strong>Determining ECCN:</strong></p>
        <ol>
          <li>Review product specifications and capabilities</li>
          <li>Compare to CCL descriptions</li>
          <li>Consider product group (A-E within each category)</li>
          <li>If no ECCN applies, item is designated EAR99 (lower control)</li>
          <li>Request classification from BIS if uncertain</li>
        </ol>
        <p><strong>EAR99 items:</strong></p>
        <ul>
          <li>Not specifically listed on CCL</li>
          <li>Generally low-level technology</li>
          <li>Most commercial products fall here</li>
          <li>Still subject to some EAR restrictions</li>
        </ul>
        <p><strong>License exceptions:</strong></p>
        <p>EAR provides numerous license exceptions allowing exports without individual licenses:</p>
        <ul>
          <li><strong>TMP</strong> — Temporary exports/re-exports</li>
          <li><strong>RPL</strong> — Replacement parts</li>
          <li><strong>GBS</strong> — Group B countries (favorable destinations)</li>
          <li><strong>CIV</strong> — Civil end-users</li>
          <li><strong>TSU</strong> — Technology and software unrestricted</li>
        </ul>
        <p><strong>Sanctioned destinations:</strong></p>
        <p>Special restrictions apply to certain countries (Country Groups D and E):</p>
        <ul>
          <li>Cuba, Iran, North Korea, Syria (comprehensive embargoes)</li>
          <li>Russia, Belarus, China (targeted restrictions)</li>
          <li>Venezuela, Burma/Myanmar (specific controls)</li>
          <li>Check BIS country chart for current restrictions</li>
        </ul>
        <p><strong>Entity List:</strong></p>
        <ul>
          <li>Companies, organizations, individuals subject to license requirements</li>
          <li>Parties of concern for national security or foreign policy</li>
          <li>Must screen against before any transaction</li>
          <li>Updated regularly on BIS website</li>
        </ul>
      `,
    },
    {
      heading: 'ITAR vs EAR: Determining Jurisdiction',
      content: `
        <p><strong>Key differences:</strong></p>
        <table>
          <tr>
            <th>Aspect</th>
            <th>ITAR</th>
            <th>EAR</th>
          </tr>
          <tr>
            <td>Agency</td>
            <td>State Department (DDTC)</td>
            <td>Commerce Department (BIS)</td>
          </tr>
          <tr>
            <td>Scope</td>
            <td>Defense articles and services</td>
            <td>Dual-use and commercial items</td>
          </tr>
          <tr>
            <td>Control list</td>
            <td>U.S. Munitions List (USML)</td>
            <td>Commerce Control List (CCL)</td>
          </tr>
          <tr>
            <td>Registration</td>
            <td>Required ($3,000/year)</td>
            <td>Not required</td>
          </tr>
          <tr>
            <td>Deemed exports</td>
            <td>Strictly controlled</td>
            <td>More flexible, license exceptions available</td>
          </tr>
          <tr>
            <td>Penalties</td>
            <td>More severe (willful violations criminal)</td>
            <td>Civil and criminal penalties</td>
          </tr>
        </table>
        <p><strong>Jurisdiction determination process:</strong></p>
        <ol>
          <li><strong>Check USML first</strong> — ITAR takes precedence if item is specifically designed or modified for military use</li>
          <li><strong>Apply "specifically designed" test</strong> — Was item developed or adapted for military application?</li>
          <li><strong>Review catchalls</strong> — USML Category XXI(a) catchall for items not elsewhere specified</li>
          <li><strong>If not ITAR, check CCL</strong> — Determine ECCN or EAR99 designation</li>
          <li><strong>Request CJ determination</strong> — Submit to DDTC for formal commodity jurisdiction ruling if uncertain</li>
        </ol>
        <p><strong>Commodity Jurisdiction (CJ) request:</strong></p>
        <p>When jurisdiction is unclear, request formal determination from DDTC:</p>
        <ul>
          <li>Submit detailed technical description</li>
          <li>Include drawings, specifications, end-use</li>
          <li>Processing time: 60-120 days typically</li>
          <li>Binding determination from State Department</li>
          <li>Can provide to customers as proof of jurisdiction</li>
        </ul>
        <p><strong>Special considerations:</strong></p>
        <ul>
          <li><strong>Software</strong> — Can be ITAR (defense-specific) or EAR (commercial/dual-use)</li>
          <li><strong>Encryption</strong> — Generally EAR, but defense-specific encryption may be ITAR</li>
          <li><strong>Parts and components</strong> — Depends on whether specifically designed for defense article</li>
          <li><strong>Technical services</strong> — ITAR if related to defense articles, EAR otherwise</li>
        </ul>
        <p><strong>Reform initiatives:</strong></p>
        <p>Export Control Reform (ECR) has moved many items from USML to CCL:</p>
        <ul>
          <li>Focus ITAR on most critical military technologies</li>
          <li>Move less sensitive items to EAR with strategic controls</li>
          <li>Ongoing — regularly check USML and CCL updates</li>
        </ul>
      `,
    },
    {
      heading: 'Export Licensing Process',
      content: `
        <p><strong>ITAR license application (DSP-5):</strong></p>
        <ol>
          <li><strong>Prepare application</strong> — Use D-Trade online system</li>
          <li><strong>Provide details:</strong>
            <ul>
              <li>Applicant and end-user information</li>
              <li>Detailed description of defense articles/services</li>
              <li>Quantity and value</li>
              <li>End-use statement</li>
              <li>Foreign consignees and parties</li>
            </ul>
          </li>
          <li><strong>Submit supporting documentation</strong> — Purchase order, contract, technical specifications</li>
          <li><strong>Pay processing fee</strong> — Varies by license type</li>
          <li><strong>DDTC review</strong> — 60-90 days typical, can take longer</li>
          <li><strong>Approval or denial</strong> — License valid for 4 years</li>
        </ol>
        <p><strong>EAR license application (BIS-748P):</strong></p>
        <ol>
          <li><strong>Determine need</strong> — Check if license required or exception applies</li>
          <li><strong>Submit via SNAP-R</strong> — BIS online system</li>
          <li><strong>Provide details:</strong>
            <ul>
              <li>ECCN and technical specifications</li>
              <li>End-user and end-use</li>
              <li>Destination</li>
              <li>Supporting documents</li>
            </ul>
          </li>
          <li><strong>Review process</strong> — Varies by item and destination (30-60 days average)</li>
          <li><strong>Approval or RWA</strong> — License valid for 2-4 years typically</li>
        </ol>
        <p><strong>Improving approval chances:</strong></p>
        <ul>
          <li>Complete and accurate applications</li>
          <li>Detailed technical descriptions</li>
          <li>Clear end-use statements</li>
          <li>Reliable end-users with track record</li>
          <li>Avoid red-flag destinations or parties</li>
          <li>Engage with licensing officer if questions arise</li>
        </ul>
        <p><strong>License conditions and provisos:</strong></p>
        <ul>
          <li>Follow all conditions and restrictions</li>
          <li>Report unauthorized disclosures or diversions</li>
          <li>Maintain records of shipments</li>
          <li>Notify if material changes occur</li>
        </ul>
        <p><strong>Amendments and extensions:</strong></p>
        <ul>
          <li>Amendment required for material changes</li>
          <li>Can request extension before expiration</li>
          <li>Timely submission improves approval odds</li>
        </ul>
      `,
    },
    {
      heading: 'Building an Export Compliance Program',
      content: `
        <p><strong>Core elements of compliance program:</strong></p>
        <p><strong>1. Management commitment</strong></p>
        <ul>
          <li>Senior leadership support and resources</li>
          <li>Compliance culture from the top</li>
          <li>Empowered official (for ITAR registration)</li>
        </ul>
        <p><strong>2. Risk assessment</strong></p>
        <ul>
          <li>Identify controlled items and technologies</li>
          <li>Map export activities and transactions</li>
          <li>Assess foreign person access (deemed exports)</li>
          <li>Evaluate customer and destination risks</li>
        </ul>
        <p><strong>3. Written policies and procedures</strong></p>
        <ul>
          <li>Export authorization procedures</li>
          <li>Classification and jurisdiction determination</li>
          <li>Technology control plan (deemed exports)</li>
          <li>Screening procedures (denied parties, sanctions)</li>
          <li>Recordkeeping requirements</li>
        </ul>
        <p><strong>4. Training</strong></p>
        <ul>
          <li>Initial training for employees with export responsibilities</li>
          <li>Annual refresher training</li>
          <li>Role-specific training (engineering, sales, shipping)</li>
          <li>Document completion and maintain records</li>
        </ul>
        <p><strong>5. Screening and due diligence</strong></p>
        <ul>
          <li>Screen all parties against denied/restricted lists</li>
          <li>Know-your-customer procedures</li>
          <li>Red flag indicators for diversion risk</li>
          <li>Document screening results</li>
        </ul>
        <p><strong>Technology Control Plan (TCP):</strong></p>
        <p>For ITAR technical data and deemed exports:</p>
        <ul>
          <li>Identify technical data requiring protection</li>
          <li>Control physical and electronic access</li>
          <li>Authorization procedures for foreign persons</li>
          <li>Visitor controls and escorts</li>
          <li>Training on TCP requirements</li>
        </ul>
        <p><strong>Recordkeeping requirements:</strong></p>
        <p><strong>ITAR records (5 years):</strong></p>
        <ul>
          <li>Export authorizations and correspondence</li>
          <li>DSP-5 and other license applications</li>
          <li>Manufacturing agreements and TAAs</li>
          <li>Shipping documents and invoices</li>
          <li>Records of foreign person access</li>
        </ul>
        <p><strong>EAR records (5 years from export):</strong></p>
        <ul>
          <li>Export and re-export documentation</li>
          <li>Supporting documents for license exceptions</li>
          <li>Classification determinations</li>
          <li>Destination control statements</li>
        </ul>
        <p><strong>Audits and monitoring:</strong></p>
        <ul>
          <li>Periodic internal audits of compliance</li>
          <li>Transaction reviews and testing</li>
          <li>Corrective action for violations</li>
          <li>Continuous improvement</li>
        </ul>
      `,
    },
    {
      heading: 'Red Flags and Violations',
      content: `
        <p><strong>Red flags indicating potential diversion or unauthorized use:</strong></p>
        <ul>
          <li>Customer reluctant to provide end-use information</li>
          <li>Customer has no clear need for product</li>
          <li>Delivery address differs from purchaser location</li>
          <li>Unusual payment terms (third-party, cash)</li>
          <li>Shipping route illogical for stated destination</li>
          <li>Product incompatible with customer's line of business</li>
          <li>Quantities inconsistent with stated use</li>
          <li>Customer requests unusual packaging or labeling</li>
        </ul>
        <p><strong>Common violations:</strong></p>
        <ul>
          <li>Exporting without required license</li>
          <li>Deemed export to foreign national without authorization</li>
          <li>Misclassification of items to avoid licensing</li>
          <li>Failure to screen denied parties lists</li>
          <li>Inadequate recordkeeping</li>
          <li>Failure to register under ITAR</li>
          <li>Unauthorized re-export or retransfer</li>
          <li>Providing technical assistance without agreement</li>
        </ul>
        <p><strong>Civil penalties:</strong></p>
        <ul>
          <li><strong>ITAR:</strong> Up to $1,270,334 per violation (adjusted annually)</li>
          <li><strong>EAR:</strong> Up to $364,992 per violation or twice transaction value</li>
          <li><strong>OFAC:</strong> Up to $346,759 per violation or twice transaction value</li>
        </ul>
        <p><strong>Criminal penalties:</strong></p>
        <ul>
          <li>Willful violations: up to $1M fine and 20 years imprisonment</li>
          <li>Arms Export Control Act violations: up to $1M fine and 20 years imprisonment</li>
          <li>International Emergency Economic Powers Act: up to $1M fine and 20 years imprisonment</li>
        </ul>
        <p><strong>Administrative actions:</strong></p>
        <ul>
          <li>Denial of export privileges</li>
          <li>Suspension or debarment from government contracting</li>
          <li>Entity List designation</li>
          <li>License revocation</li>
        </ul>
        <p><strong>Voluntary self-disclosure (VSD):</strong></p>
        <p>If you discover a violation, consider voluntary disclosure:</p>
        <ul>
          <li>Submit to appropriate agency (DDTC, BIS, OFAC)</li>
          <li>Describe violation, parties, items, circumstances</li>
          <li>Corrective actions taken</li>
          <li><strong>Benefits:</strong> Reduced penalties, demonstrates good faith, considered mitigating factor</li>
        </ul>
        <p><strong>Government investigations:</strong></p>
        <ul>
          <li>Cooperate fully with investigators</li>
          <li>Preserve all relevant documents and records</li>
          <li>Engage experienced export control counsel immediately</li>
          <li>Do not destroy evidence or obstruct investigation</li>
        </ul>
      `,
    },
  ],
  faqs: [
    {
      question: 'How do I know if my product is subject to ITAR or EAR?',
      answer:
        'Start by checking the U.S. Munitions List (USML) to see if your item is specifically designed or modified for military use (ITAR). If not on USML, check the Commerce Control List (CCL) for an ECCN (EAR). If uncertain, request a Commodity Jurisdiction (CJ) determination from DDTC.',
    },
    {
      question: 'Do I need to register under ITAR if I only provide engineering services?',
      answer:
        'Yes. If you provide defense services (technical assistance, training, engineering) related to defense articles on the USML, you must register with DDTC. Registration is required even if you don\'t manufacture or export physical goods.',
    },
    {
      question: 'What is a "deemed export" and why does it matter?',
      answer:
        'A deemed export is the release of controlled technology or technical data to a foreign person in the U.S. This includes foreign national employees, contractors, or visitors. It requires the same authorization as a physical export and is a common source of violations.',
    },
    {
      question: 'Can I send technical documents to foreign customers via email?',
      answer:
        'Only if you have proper authorization. Emailing ITAR technical data requires a license or agreement. EAR-controlled technical data may require a license depending on ECCN and destination. Use encryption and access controls for all controlled technical data.',
    },
    {
      question: 'How long does it take to get an export license?',
      answer:
        'ITAR licenses from DDTC typically take 60-90 days but can exceed 120 days for complex cases. EAR licenses from BIS average 30-60 days. Plan ahead and submit well in advance of planned export dates.',
    },
    {
      question: 'What are the penalties for export control violations?',
      answer:
        'Civil penalties can exceed $1M per violation. Criminal penalties for willful violations include fines up to $1M and 20 years imprisonment. Administrative actions include export privilege denial, debarment, and Entity List designation.',
    },
    {
      question: 'Do export controls apply to cloud storage and SaaS platforms?',
      answer:
        'Yes. Uploading controlled technical data to cloud servers constitutes an export to the country where servers are located. Use U.S.-based servers or obtain appropriate authorization for foreign servers. Cloud provider access by foreign nationals is a deemed export.',
    },
    {
      question: 'Should I voluntarily disclose an export violation we discovered?',
      answer:
        'Voluntary self-disclosure (VSD) is generally advisable. It demonstrates good faith, can significantly reduce penalties, and is viewed favorably in enforcement proceedings. Consult export control counsel to prepare a thorough VSD submission.',
    },
  ],
  cta: {
    heading: 'Need Help with Export Compliance?',
    description:
      'Export controls are complex and violations carry severe penalties. Our team helps contractors classify products, obtain licenses, and build effective export compliance programs.',
    buttonText: 'Get Export Control Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'compliance-program',
    'cybersecurity-requirements',
    'far-overview',
    'government-contract-law',
    'security-clearances',
  ],
  publishedDate: '2026-04-07',
};
