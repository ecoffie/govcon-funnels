export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  relatedGuide?: string; // slug of related guide
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: '8(a) Program',
    slug: '8a-program',
    definition:
      'The SBA\'s 8(a) Business Development Program for socially and economically disadvantaged small businesses. Provides access to sole-source contracts up to $4.5M (services) or $8M (manufacturing), mentoring, and a nine-year development period.',
    relatedGuide: '8a-certification',
  },
  {
    term: 'APEX Accelerator',
    slug: 'apex-accelerator',
    definition:
      'Formerly known as PTACs (Procurement Technical Assistance Centers). Free DoD-funded consulting programs that help businesses understand and compete for government contracts. Services include registration assistance, bid matching, proposal review, and training. Find your local APEX at apexaccelerators.us.',
    relatedGuide: 'government-contracting-for-beginners',
  },
  {
    term: 'Best Value',
    slug: 'best-value',
    definition:
      'An evaluation approach where the government considers factors in addition to price when making an award decision. The government selects the proposal that offers the greatest overall benefit, which may not be the lowest-priced offer.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'Bid/No-Bid Decision',
    slug: 'bid-no-bid',
    definition:
      'The strategic analysis a contractor performs to decide whether to pursue a specific contract opportunity. Considers factors like competitive landscape, past performance fit, resource availability, and probability of win.',
    relatedGuide: 'finding-government-contracts',
  },
  {
    term: 'CAGE Code',
    slug: 'cage-code',
    definition:
      'Commercial and Government Entity code — a unique five-character alphanumeric identifier assigned by the Defense Logistics Agency (DLA) to entities doing business with the federal government. Obtained automatically through SAM.gov registration.',
    relatedGuide: 'cage-code',
  },
  {
    term: 'Capability Statement',
    slug: 'capability-statement',
    definition:
      'A one- to two-page document that serves as a business resume for government buyers. Includes core competencies, past performance, differentiators, and company data (UEI, CAGE code, NAICS codes, certifications).',
    relatedGuide: 'capability-statement',
  },
  {
    term: 'CO (Contracting Officer)',
    slug: 'contracting-officer',
    definition:
      'The government official with legal authority to enter into, administer, and terminate contracts on behalf of the government. Only COs can bind the government to a contractual agreement.',
  },
  {
    term: 'Compliance Matrix',
    slug: 'compliance-matrix',
    definition:
      'A document that maps every requirement in a solicitation to the corresponding section of your proposal. Ensures no requirements are missed and demonstrates full responsiveness to evaluators.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'COR (Contracting Officer Representative)',
    slug: 'cor',
    definition:
      'A government employee designated by the Contracting Officer to assist in managing contract performance. CORs monitor day-to-day work, review deliverables, and report to the CO, but cannot modify contract terms.',
  },
  {
    term: 'CPARS',
    slug: 'cpars',
    definition:
      'Contractor Performance Assessment Reporting System — the government\'s database for recording contractor performance evaluations. Past performance ratings in CPARS directly affect your ability to win future contracts.',
  },
  {
    term: 'EDWOSB',
    slug: 'edwosb',
    definition:
      'Economically Disadvantaged Women-Owned Small Business — an SBA certification for women-owned businesses whose owners meet additional economic disadvantage thresholds. Provides access to set-asides in a broader range of NAICS codes than standard WOSB certification.',
    relatedGuide: 'wosb-certification',
  },
  {
    term: 'EFT (Electronic Funds Transfer)',
    slug: 'eft',
    definition:
      'The method by which the government pays contractors. Banking information for EFT must be provided during SAM.gov registration. All federal contract payments are made electronically.',
    relatedGuide: 'sam-gov-registration',
  },
  {
    term: 'FAR (Federal Acquisition Regulation)',
    slug: 'far',
    definition:
      'The primary set of rules governing how the federal government purchases goods and services. The FAR covers everything from competition requirements and contract types to payment terms and dispute resolution. Available at acquisition.gov.',
  },
  {
    term: 'Full and Open Competition',
    slug: 'full-and-open',
    definition:
      'A procurement where any responsible business — large or small — can submit a proposal. This is the default method for federal acquisitions above the simplified acquisition threshold, unless a set-aside or exception applies.',
  },
  {
    term: 'GSA Schedule',
    slug: 'gsa-schedule',
    definition:
      'A long-term, government-wide contract with pre-negotiated pricing administered by the General Services Administration. Also called MAS (Multiple Award Schedule). Gives agencies a streamlined way to buy from pre-approved vendors.',
    relatedGuide: 'gsa-schedule',
  },
  {
    term: 'GWAC',
    slug: 'gwac',
    definition:
      'Government-Wide Acquisition Contract — a pre-competed contract vehicle available to multiple federal agencies, typically for IT services. Examples include Alliant 2 and 8(a) STARS III.',
  },
  {
    term: 'HUBZone',
    slug: 'hubzone',
    definition:
      'Historically Underutilized Business Zone — an SBA program for businesses with principal offices and 35%+ employees in designated economically distressed areas. Benefits include set-asides, sole-source contracts, and a 10% price evaluation preference.',
    relatedGuide: 'hubzone-certification',
  },
  {
    term: 'IDIQ',
    slug: 'idiq',
    definition:
      'Indefinite Delivery/Indefinite Quantity — a contract type that provides for an indefinite quantity of services or supplies during a fixed period. Work is ordered through individual task orders or delivery orders, each competed among IDIQ holders.',
  },
  {
    term: 'IDV (Indefinite Delivery Vehicle)',
    slug: 'idv',
    definition:
      'A contract that allows the government to acquire supplies or services by issuing individual orders. Includes IDIQ contracts, requirements contracts, definite-quantity contracts, and GSA Schedules.',
  },
  {
    term: 'IFF (Industrial Funding Fee)',
    slug: 'iff',
    definition:
      'A fee paid by GSA Schedule holders on their schedule sales, currently 0.75%. This fee funds GSA\'s Federal Acquisition Service operations. Paid quarterly based on reported sales.',
    relatedGuide: 'gsa-schedule',
  },
  {
    term: 'LPTA',
    slug: 'lpta',
    definition:
      'Lowest Price Technically Acceptable — an evaluation method where the government awards to the lowest-priced proposal that meets all technical requirements. Price is the deciding factor once technical acceptability is established.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'Mentor-Protege Program',
    slug: 'mentor-protege',
    definition:
      'SBA program that pairs experienced government contractors (mentors) with small businesses (proteges). Enables joint ventures on contracts, with the mentor providing business development, technical, and financial assistance.',
    relatedGuide: '8a-certification',
  },
  {
    term: 'Micro-Purchase Threshold',
    slug: 'micro-purchase',
    definition:
      'The dollar amount below which the government can make purchases without formal solicitation procedures — currently $10,000 for most agencies. Government purchase card (credit card) transactions typically fall under this threshold.',
  },
  {
    term: 'NAICS Code',
    slug: 'naics-code',
    definition:
      'North American Industry Classification System code — a six-digit code that classifies every type of business activity. Used to categorize solicitations and determine small business size standards. Each NAICS code has a specific revenue or employee count threshold.',
    relatedGuide: 'government-contracting-for-beginners',
  },
  {
    term: 'NCAGE Code',
    slug: 'ncage-code',
    definition:
      'NATO Commercial and Government Entity code — the international equivalent of a CAGE code, assigned to non-U.S. entities through their country\'s national codification bureau. Required before foreign entities can register on SAM.gov.',
    relatedGuide: 'cage-code',
  },
  {
    term: 'OSDBU',
    slug: 'osdbu',
    definition:
      'Office of Small and Disadvantaged Business Utilization — every major federal agency has one. OSDBUs help small businesses connect with procurement opportunities and advocate for small business participation within their agency.',
    relatedGuide: 'finding-government-contracts',
  },
  {
    term: 'Past Performance',
    slug: 'past-performance',
    definition:
      'A contractor\'s track record of delivering quality work on previous contracts. Evaluated as part of most federal proposals. Includes relevance, quality, schedule adherence, and customer satisfaction. Documented in CPARS for federal contracts.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'PPQ (Past Performance Questionnaire)',
    slug: 'ppq',
    definition:
      'A form sent to your references during proposal evaluation asking them to rate your performance on previous contracts. The government uses PPQ responses to assess the risk of awarding you a new contract.',
  },
  {
    term: 'Prime Contract',
    slug: 'prime-contract',
    definition:
      'A contract awarded directly by a government agency to a business. The prime contractor is responsible for overall contract performance and may use subcontractors to perform portions of the work.',
    relatedGuide: 'subcontracting-and-teaming',
  },
  {
    term: 'PSC (Product Service Code)',
    slug: 'psc',
    definition:
      'A four-character code used by the government to categorize the type of product or service being purchased. Similar to NAICS codes but used specifically for federal procurement classification.',
  },
  {
    term: 'RFI (Request for Information)',
    slug: 'rfi',
    definition:
      'A pre-solicitation document where an agency asks industry for information to help plan a future procurement. Not a solicitation — no contract will be awarded from an RFI. Responding demonstrates interest and helps shape the eventual requirement.',
    relatedGuide: 'finding-government-contracts',
  },
  {
    term: 'RFP (Request for Proposal)',
    slug: 'rfp',
    definition:
      'A formal solicitation asking contractors to submit detailed proposals including technical approach, management plan, past performance, and pricing. Evaluated based on stated criteria in the solicitation.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'RFQ (Request for Quote)',
    slug: 'rfq',
    definition:
      'A solicitation asking contractors to submit price quotes for specific goods or services. Typically used for simplified acquisitions or orders under existing contract vehicles like GSA Schedules.',
  },
  {
    term: 'Rule of Two',
    slug: 'rule-of-two',
    definition:
      'The FAR requirement that a contracting officer must set aside a procurement for small businesses if there is a reasonable expectation that at least two qualified small businesses will submit competitive offers at fair market prices.',
    relatedGuide: 'government-contracting-for-beginners',
  },
  {
    term: 'SAM.gov',
    slug: 'sam-gov',
    definition:
      'System for Award Management — the official U.S. government website for entity registration, contract opportunities, contract data, and wage determinations. Registration is free and mandatory for any business seeking federal contracts.',
    relatedGuide: 'sam-gov-registration',
  },
  {
    term: 'SBA',
    slug: 'sba',
    definition:
      'Small Business Administration — the federal agency that supports small businesses through programs including 8(a), SDVOSB, HUBZone, and WOSB certifications, lending programs, counseling, and advocacy.',
    relatedGuide: 'sba-certifications',
  },
  {
    term: 'SDVOSB',
    slug: 'sdvosb',
    definition:
      'Service-Disabled Veteran-Owned Small Business — an SBA certification for businesses 51%+ owned and controlled by veterans with service-connected disabilities. Provides access to set-asides, sole-source contracts, and VA Veterans First priority.',
    relatedGuide: 'vosb-certification',
  },
  {
    term: 'Set-Aside',
    slug: 'set-aside',
    definition:
      'A procurement restricted to specific categories of small businesses. Types include small business set-asides, 8(a), SDVOSB, HUBZone, and WOSB set-asides. Large businesses are excluded from competing on set-aside contracts.',
    relatedGuide: 'government-contracting-for-beginners',
  },
  {
    term: 'Simplified Acquisition Threshold',
    slug: 'simplified-acquisition-threshold',
    definition:
      'The dollar amount below which agencies can use streamlined purchasing procedures — currently $250,000. Procurements below this threshold have less paperwork, faster timelines, and are generally reserved for small businesses.',
  },
  {
    term: 'SIN (Special Item Number)',
    slug: 'sin',
    definition:
      'A category code within the GSA Multiple Award Schedule that identifies specific products or services. Contractors must be approved under the relevant SIN(s) to offer those items through their GSA Schedule.',
    relatedGuide: 'gsa-schedule',
  },
  {
    term: 'Sole-Source Contract',
    slug: 'sole-source',
    definition:
      'A contract awarded to a single contractor without competition. Available to certified 8(a), SDVOSB, HUBZone, and WOSB businesses up to $4.5M for services and $8M for manufacturing, at the contracting officer\'s discretion.',
    relatedGuide: 'sba-certifications',
  },
  {
    term: 'Sources Sought',
    slug: 'sources-sought',
    definition:
      'A pre-solicitation notice where an agency asks industry to express interest and capability for a planned procurement. Used to determine whether a set-aside is appropriate (Rule of Two). Responding is critical for shaping set-aside decisions.',
    relatedGuide: 'finding-government-contracts',
  },
  {
    term: 'Subcontracting Plan',
    slug: 'subcontracting-plan',
    definition:
      'A plan required of large business prime contractors on contracts over $750,000 detailing how they will use small business subcontractors. Creates a pipeline of subcontracting opportunities for small businesses.',
    relatedGuide: 'subcontracting-and-teaming',
  },
  {
    term: 'Task Order',
    slug: 'task-order',
    definition:
      'An individual order for services issued under an IDIQ or other indefinite delivery contract. Task orders define specific work requirements, period of performance, and funding for a portion of the overall contract.',
  },
  {
    term: 'Teaming Agreement',
    slug: 'teaming-agreement',
    definition:
      'A formal agreement between two or more businesses to pursue a specific contract opportunity together. Defines roles, responsibilities, and work share. Can be structured as prime/subcontractor or joint venture.',
    relatedGuide: 'subcontracting-and-teaming',
  },
  {
    term: 'UEI (Unique Entity Identifier)',
    slug: 'uei',
    definition:
      'A 12-character alphanumeric identifier that replaced the DUNS number in April 2022 as the primary entity identifier for federal contracting. Generated automatically during SAM.gov registration.',
    relatedGuide: 'sam-gov-registration',
  },
  {
    term: 'VOSB',
    slug: 'vosb',
    definition:
      'Veteran-Owned Small Business — an SBA certification for businesses 51%+ owned and controlled by veterans. Provides access to VA Veterans First contracting priority. Distinct from SDVOSB, which requires a service-connected disability.',
    relatedGuide: 'vosb-certification',
  },
  {
    term: 'WOSB',
    slug: 'wosb',
    definition:
      'Women-Owned Small Business — an SBA certification for businesses 51%+ owned and controlled by women who are U.S. citizens. Provides access to set-aside contracts in designated NAICS codes where women-owned businesses are underrepresented.',
    relatedGuide: 'wosb-certification',
  },
  {
    term: 'BPA (Blanket Purchase Agreement)',
    slug: 'bpa',
    definition:
      'A simplified acquisition method that establishes "charge accounts" with qualified vendors. Allows agencies to make recurring purchases without issuing new solicitations for each transaction. Often used for supplies or repetitive services under the micro-purchase threshold.',
  },
  {
    term: 'Capture Manager',
    slug: 'capture-manager',
    definition:
      'The business development professional responsible for leading the pursuit of a specific contract opportunity. Develops win strategy, builds customer relationships, shapes the opportunity, and assembles the proposal team. Typically earns $150K-$220K.',
  },
  {
    term: 'Proposal Manager',
    slug: 'proposal-manager',
    definition:
      'The professional responsible for managing the proposal development process from RFP release to submission. Creates the proposal schedule, assigns writers, ensures compliance with all requirements, and manages production. Typically earns $160K-$240K.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'DCAA (Defense Contract Audit Agency)',
    slug: 'dcaa',
    definition:
      'The DoD agency that audits defense contractor accounting systems, incurred costs, and pricing proposals. DCAA-compliant accounting systems are required for cost-reimbursement contracts and may be required for fixed-price contracts.',
  },
  {
    term: 'T&M (Time and Materials)',
    slug: 'time-and-materials',
    definition:
      'A contract type where the government pays a fixed hourly rate for labor plus actual costs for materials. Used when the scope of work cannot be clearly defined. Riskier for the government than fixed-price, so used sparingly.',
  },
  {
    term: 'FFP (Firm Fixed Price)',
    slug: 'firm-fixed-price',
    definition:
      'A contract type where the contractor agrees to perform work for a set price regardless of actual costs. The contractor bears all risk of cost overruns but keeps any savings. The most common contract type in federal procurement.',
  },
  {
    term: 'CPFF (Cost Plus Fixed Fee)',
    slug: 'cost-plus-fixed-fee',
    definition:
      'A cost-reimbursement contract type where the government pays allowable incurred costs plus a negotiated fixed fee (profit). The contractor has less risk than FFP since costs are reimbursed, but must have a DCAA-compliant accounting system.',
  },
  {
    term: 'J&A (Justification and Approval)',
    slug: 'justification-and-approval',
    definition:
      'A document required when an agency uses other than full and open competition. Explains why competition is limited (sole-source, set-aside, brand-name) and must be approved at appropriate levels based on contract value.',
  },
  {
    term: 'POC (Point of Contact)',
    slug: 'point-of-contact',
    definition:
      'The designated person at an agency or contractor organization who handles inquiries about a specific matter. In SAM.gov profiles, contractors list government business POCs, electronic business POCs, and past performance POCs.',
    relatedGuide: 'sam-gov-registration',
  },
  {
    term: 'PWS (Performance Work Statement)',
    slug: 'pws',
    definition:
      'A document in a solicitation that describes required outcomes and performance standards rather than how the work must be done. Allows contractors flexibility in their approach while holding them accountable for results.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'SOW (Statement of Work)',
    slug: 'statement-of-work',
    definition:
      'A document that describes the specific tasks, deliverables, and timelines required under a contract. More prescriptive than a PWS, telling the contractor exactly how work must be performed.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'OCI (Organizational Conflict of Interest)',
    slug: 'organizational-conflict-of-interest',
    definition:
      'A situation where a contractor\'s other activities or relationships may give it an unfair competitive advantage or impair its objectivity. Must be disclosed and may disqualify contractors from certain opportunities.',
  },
  {
    term: 'Debriefing',
    slug: 'debriefing',
    definition:
      'A post-award meeting where the government explains to unsuccessful offerors why their proposal was not selected. Provides valuable feedback on evaluation scores, strengths, weaknesses, and how the winning proposal compared.',
    relatedGuide: 'proposal-writing',
  },
  {
    term: 'Protest',
    slug: 'protest',
    definition:
      'A formal challenge to a contract award decision, typically filed with the GAO (Government Accountability Office) or Court of Federal Claims. Contractors may protest if they believe the solicitation or award violated procurement law.',
  },
];
