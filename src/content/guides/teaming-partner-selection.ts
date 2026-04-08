import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'teaming-partner-selection',
  title: 'Teaming Partner Selection: How to Choose Partners Who Help You Win Government Contracts',
  metaTitle: 'Teaming Partner Selection [Strategic Guide] — Choose the Right Partners & Win',
  metaDescription:
    'Learn how to select and manage teaming partners for government contracts: evaluation criteria, due diligence, teaming negotiations, relationship management, and when to walk away from partners.',
  keywords: [
    'teaming partner selection',
    'government contractor teaming',
    'subcontractor selection',
    'teaming agreement',
    'partner due diligence',
    'prime contractor selection',
    'joint venture partners',
    'teaming negotiations',
    'subcontracting',
    'mentor protege teaming',
  ],
  heroSubtitle:
    'Few companies win major government contracts alone. The right partners fill capability gaps, strengthen past performance, and increase win probability. The wrong partners create liability and drain resources. Learn how to choose wisely.',
  sections: [
    {
      heading: 'Why Teaming Matters in Government Contracting',
      content: `
        <p><strong>Teaming</strong>—partnering with other companies to pursue contracts—is fundamental to government contracting. Understanding when and how to team determines your competitive success.</p>
        <p><strong>Common reasons to team:</strong></p>
        <ul>
          <li><strong>Fill capability gaps</strong> — You lack technical skills, certifications, or domain expertise required by RFP</li>
          <li><strong>Strengthen past performance</strong> — Partner has directly relevant experience you lack</li>
          <li><strong>Meet socioeconomic requirements</strong> — Small business set-asides require specific certifications</li>
          <li><strong>Access customer relationships</strong> — Partner has established relationships with decision-makers</li>
          <li><strong>Scale to contract size</strong> — Contract exceeds your capacity, resources, or bonding limit</li>
          <li><strong>Geographic presence</strong> — Partner has local presence where work is performed</li>
          <li><strong>Security clearances</strong> — Partner has cleared personnel or facilities you lack</li>
        </ul>
        <p><strong>Teaming structures:</strong></p>
        <ul>
          <li><strong>Prime-subcontractor:</strong> One company leads as prime, others support as subs (most common)</li>
          <li><strong>Joint venture (JV):</strong> Formal entity created by two or more companies (see <a href="/guides/joint-venture-requirements">JV requirements</a>)</li>
          <li><strong>Mentor-protégé JV:</strong> SBA-approved partnership between large and small business</li>
          <li><strong>Contractor teaming arrangement (CTA):</strong> Informal agreement to team if opportunity is won</li>
        </ul>
        <p><strong>Benefits of strategic teaming:</strong></p>
        <ul>
          <li><strong>Increased Pwin:</strong> Right partners can increase win probability 10-20%+</li>
          <li><strong>Access to larger opportunities:</strong> Pursue contracts beyond your individual capacity</li>
          <li><strong>Risk sharing:</strong> Distribute performance risk and B&P investment</li>
          <li><strong>Capability expansion:</strong> Deliver more comprehensive solutions</li>
          <li><strong>Market entry:</strong> Partners can open doors to new customers or markets</li>
        </ul>
        <p><strong>Risks of poor teaming:</strong></p>
        <ul>
          <li><strong>Reduced margins:</strong> Partner takes share of profit</li>
          <li><strong>Performance liability:</strong> Partner's failure damages your reputation</li>
          <li><strong>Customer confusion:</strong> Unclear roles create friction with government</li>
          <li><strong>IP conflicts:</strong> Disputes over data rights and intellectual property</li>
          <li><strong>Strategic misalignment:</strong> Partners have different objectives or commitment levels</li>
        </ul>
        <p><strong>When NOT to team:</strong></p>
        <ul>
          <li>You have all required capabilities and strong competitive position</li>
          <li>Adding partners increases complexity without meaningful differentiation</li>
          <li>Available partners are weak or create liabilities</li>
          <li>Contract economics don't support additional partners</li>
          <li>Customer prefers single-source simplicity</li>
        </ul>
        <p><strong>Teaming as prime vs. sub:</strong></p>
        <p><strong>Priming advantages:</strong> Control strategy, direct customer relationship, higher revenue share, <a href="/guides/past-performance">past performance</a> credit as prime</p>
        <p><strong>Subbing advantages:</strong> Lower risk, less pursuit cost, access to opportunities you couldn't prime, steady work stream, relationship building with primes who can help you prime later</p>
        <p>Early in your growth, strategic subcontracting builds capabilities and relationships. As you mature, target prime positions increasingly.</p>
      `,
    },
    {
      heading: 'Partner Evaluation Criteria',
      content: `
        <p>Not all potential partners are created equal. <strong>Systematic evaluation</strong> prevents costly mistakes and identifies partners who genuinely increase your win probability.</p>
        <p><strong>Technical capability and domain expertise:</strong></p>
        <ul>
          <li><strong>Directly relevant experience:</strong> Have they done the specific work required by this opportunity?</li>
          <li><strong>Technical credentials:</strong> Certifications, licenses, specialized skills</li>
          <li><strong>Innovation capacity:</strong> Can they bring differentiated solutions or just commodity services?</li>
          <li><strong>Technology/tools:</strong> Do they own proprietary capabilities or just provide labor?</li>
          <li><strong>Subject matter experts:</strong> Depth of technical talent, not just warm bodies</li>
        </ul>
        <p><strong>Past performance strength:</strong></p>
        <ul>
          <li><strong>Relevance to opportunity:</strong> Direct matches to requirement > related experience > unrelated</li>
          <li><strong><a href="/guides/cpars">CPARS</a> ratings:</strong> Excellent ratings required, any "Marginal" or "Unsatisfactory" is disqualifying</li>
          <li><strong>Reference quality:</strong> Will their references actively advocate or just confirm dates?</li>
          <li><strong>Performance at this customer:</strong> History with target agency is especially valuable</li>
          <li><strong>Scale of experience:</strong> Have they performed at the scale/complexity this contract requires?</li>
        </ul>
        <p><strong>Customer relationships:</strong></p>
        <ul>
          <li><strong>Existing presence at customer:</strong> Current contracts create access and trust</li>
          <li><strong>Decision-maker relationships:</strong> Do they know program managers, CORs, technical evaluators?</li>
          <li><strong>Incumbent status:</strong> Are they the incumbent on this contract or adjacent programs?</li>
          <li><strong>Reputation:</strong> How is the partner viewed by customer—trusted advisor or problematic contractor?</li>
        </ul>
        <p><strong>Organizational capacity:</strong></p>
        <ul>
          <li><strong>Financial stability:</strong> Can they absorb start-up costs and cash flow gaps?</li>
          <li><strong>Available workforce:</strong> Do they have talent to staff this, or are they overcommitted?</li>
          <li><strong>Infrastructure:</strong> Facilities, cleared space, equipment, systems</li>
          <li><strong>Geographic presence:</strong> Local office where work is performed</li>
          <li><strong>Bonding capacity:</strong> Can they provide required bonds?</li>
        </ul>
        <p><strong>Socioeconomic status:</strong></p>
        <ul>
          <li><strong>Certifications:</strong> <a href="/guides/8a-certification">8(a)</a>, <a href="/guides/sdvosb-certification">SDVOSB</a>, <a href="/guides/wosb-certification">WOSB</a>, <a href="/guides/hubzone-certification">HUBZone</a></li>
          <li><strong>Set-aside alignment:</strong> Do their certifications match opportunity requirements?</li>
          <li><strong>Size standards:</strong> Do they meet <a href="/guides/sba-size-standards">size standards</a> for the NAICS?</li>
          <li><strong>Subcontracting credit:</strong> Will they count toward large prime's small business goals?</li>
        </ul>
        <p><strong>Cultural and strategic fit:</strong></p>
        <ul>
          <li><strong>Shared values:</strong> Do they approach business similarly (ethics, customer focus, quality)?</li>
          <li><strong>Compatible working styles:</strong> Can your teams actually work together?</li>
          <li><strong>Strategic alignment:</strong> Is this a priority opportunity for them or an afterthought?</li>
          <li><strong>Communication norms:</strong> Responsive, transparent, professional?</li>
          <li><strong>Risk tolerance:</strong> Willing to invest in pursuit or expecting you to carry all cost?</li>
        </ul>
        <p><strong>Reputation and track record:</strong></p>
        <ul>
          <li><strong>Industry reputation:</strong> What do others say about working with them?</li>
          <li><strong>Teaming history:</strong> Do their partners stay with them or flee after one contract?</li>
          <li><strong>Disputes and litigation:</strong> History of contractual disputes, protests, terminations?</li>
          <li><strong>Ethical standing:</strong> Any suspensions, debarments, or integrity issues?</li>
          <li><strong>Exclusion screening:</strong> Check SAM.gov for active exclusions or suspensions</li>
        </ul>
        <p><strong>Red flags to watch for:</strong></p>
        <ul>
          <li>Overpromising or vague about capabilities</li>
          <li>Unwilling to share past performance references</li>
          <li>No clear explanation of their value-add</li>
          <li>Demanding disproportionate share relative to contribution</li>
          <li>Pressuring for quick commitment without due diligence</li>
          <li>Key personnel "on loan" from another company</li>
          <li>Recent significant turnover in leadership or key staff</li>
          <li>Financial distress indicators (lawsuits, liens, late filings)</li>
        </ul>
        <p><strong>Scoring potential partners:</strong></p>
        <p>Create a simple scoring matrix (1-5 scale) across criteria:</p>
        <ul>
          <li>Technical capability: ___ / 5</li>
          <li>Past performance relevance: ___ / 5</li>
          <li>Customer relationships: ___ / 5</li>
          <li>Organizational capacity: ___ / 5</li>
          <li>Cultural fit: ___ / 5</li>
          <li>Total score: ___ / 25</li>
        </ul>
        <p>Partners scoring &lt;15 are probably not worth the effort. Partners scoring 20+ are strong candidates.</p>
      `,
    },
    {
      heading: 'Due Diligence Process',
      content: `
        <p><strong>Due diligence</strong> verifies that a potential partner is who they claim to be and can deliver on commitments. Skip this at your peril.</p>
        <p><strong>Phase 1: Initial screening (1-2 hours)</strong></p>
        <p><strong>Public record review:</strong></p>
        <ul>
          <li><strong>SAM.gov registration:</strong> Active, eligible for awards, no exclusions</li>
          <li><strong>CAGE code lookup:</strong> Use our <a href="/tools/cage-code-lookup">CAGE Code Lookup tool</a></li>
          <li><strong>Past awards:</strong> Search SAM.gov and USASpending for contract history</li>
          <li><strong>Company website:</strong> Professional presentation, clear capabilities, case studies</li>
          <li><strong>LinkedIn:</strong> Company page, employee count, key personnel profiles</li>
        </ul>
        <p><strong>Basic capability verification:</strong></p>
        <ul>
          <li>Review their capability statement or marketing materials</li>
          <li>Confirm they operate in relevant domain/geography</li>
          <li>Check certifications they claim (8(a), WOSB, etc.) in SAM.gov</li>
          <li>Verify size standards for relevant NAICS codes</li>
        </ul>
        <p><strong>Phase 2: Detailed assessment (4-8 hours)</strong></p>
        <p><strong>Past performance deep dive:</strong></p>
        <ul>
          <li>Request 3-5 relevant past performance references</li>
          <li>Call references directly (don't just accept written letters)</li>
          <li>Ask specific questions: quality, responsiveness, problem-solving, would they hire again?</li>
          <li>Request CPARS or PPIRS ratings if available (some agencies share with express consent)</li>
          <li>Check for contract terminations, cure notices, or performance issues</li>
        </ul>
        <p><strong>Financial stability review:</strong></p>
        <ul>
          <li>Request last 2 years of financial statements (audited if possible)</li>
          <li>Check D&B rating or credit report</li>
          <li>Search for liens, judgments, bankruptcies (PACER, state courts)</li>
          <li>Verify bonding capacity if required</li>
          <li>Assess cash flow capability for contract start-up costs</li>
        </ul>
        <p><strong>Organizational assessment:</strong></p>
        <ul>
          <li>Meet key personnel who would work on this contract</li>
          <li>Tour facilities if relevant (cleared space, labs, etc.)</li>
          <li>Review org chart and staffing plan</li>
          <li>Verify security clearances and clearance facility rating (FCL) if required</li>
          <li>Assess actual capacity vs. claimed capacity</li>
        </ul>
        <p><strong>Phase 3: Compliance verification (2-4 hours)</strong></p>
        <p><strong>Legal and regulatory standing:</strong></p>
        <ul>
          <li><strong>SAM.gov exclusions:</strong> Search System for Award Management for active exclusions</li>
          <li><strong>FAPIIS:</strong> Federal Awardee Performance and Integrity Information System (requires CAGE code)</li>
          <li><strong>State business records:</strong> Verify active incorporation, good standing</li>
          <li><strong>Litigation search:</strong> Federal and state court records for ongoing disputes</li>
          <li><strong>Ethics issues:</strong> News search for fraud, suspension, debarment mentions</li>
        </ul>
        <p><strong>Certification verification:</strong></p>
        <ul>
          <li>8(a) status: Confirm in SBA Dynamic Small Business Search</li>
          <li>SDVOSB/VOSB: Verify in Veteran Small Business Certification database</li>
          <li>WOSB/EDWOSB: Check SBA certification or approved certifier</li>
          <li>HUBZone: Verify in HUBZone registry</li>
          <li>ISO, CMMI, or other technical certifications: Request copies, verify with issuing body</li>
        </ul>
        <p><strong>Phase 4: Relationship testing (ongoing)</strong></p>
        <p><strong>Working sessions:</strong></p>
        <ul>
          <li>Collaborate on capture activities before formalizing teaming</li>
          <li>Jointly develop technical approach or solution</li>
          <li>Assess communication, responsiveness, follow-through</li>
          <li>Observe how they handle disagreements or challenges</li>
        </ul>
        <p><strong>Reference checks with industry:</strong></p>
        <ul>
          <li>Talk to others who've teamed with them (off the record)</li>
          <li>Ask about responsiveness, reliability, ethical behavior</li>
          <li>Inquire about contract performance and customer satisfaction</li>
          <li>Learn about any disputes or relationship breakdowns</li>
        </ul>
        <p><strong>Red flags during due diligence:</strong></p>
        <ul>
          <li>Reluctance to provide requested information</li>
          <li>Inconsistencies between claims and evidence</li>
          <li>Poor references or references that won't speak frankly</li>
          <li>Financial instability or pending legal issues</li>
          <li>High turnover in key positions</li>
          <li>Past performance issues not adequately explained</li>
        </ul>
        <p><strong>Documenting due diligence:</strong></p>
        <p>Create a due diligence file for each potential partner including:</p>
        <ul>
          <li>Capability statement and technical materials</li>
          <li>Past performance references and notes from calls</li>
          <li>Financial statements and credit reports</li>
          <li>SAM.gov and certification verification screenshots</li>
          <li>Summary assessment and recommendation (pursue or pass)</li>
        </ul>
        <p>This documentation proves you conducted reasonable due diligence if partner issues arise later.</p>
      `,
    },
    {
      heading: 'Teaming Negotiations',
      content: `
        <p>Once you've identified a qualified partner, <strong>negotiation</strong> establishes roles, responsibilities, and economics that work for both parties.</p>
        <p><strong>Key negotiation elements:</strong></p>
        <p><strong>1. Prime vs. sub determination:</strong></p>
        <ul>
          <li><strong>Who should prime?</strong> Usually the company with strongest customer relationship, most relevant past performance, or set-aside status if applicable</li>
          <li><strong>Co-prime considerations:</strong> Some RFPs allow multiple primes; usually creates complexity without benefit</li>
          <li><strong>JV vs. prime-sub:</strong> JVs offer more equal partnership but require formal entity creation (see <a href="/guides/joint-venture-requirements">JV guide</a>)</li>
        </ul>
        <p><strong>2. Work share and scope:</strong></p>
        <ul>
          <li><strong>Clear scope definition:</strong> Exactly what work does each party perform?</li>
          <li><strong>Percentage breakdown:</strong> 60/40 split? 80/20? Should align with capability contribution</li>
          <li><strong>Key personnel assignment:</strong> Who provides which key positions?</li>
          <li><strong>Subcontractor limitations:</strong> Is there a cap on sub's percentage (e.g., "no more than 30%")?</li>
          <li><strong>Flexibility clauses:</strong> How can work share be adjusted if scope changes?</li>
        </ul>
        <p><strong>3. Financial terms:</strong></p>
        <ul>
          <li><strong>Pricing basis:</strong> Cost-plus markup? Fixed rates? Pass-through costs?</li>
          <li><strong>Fee/profit split:</strong> How is profit allocated between prime and subs?</li>
          <li><strong>Pass-through considerations:</strong> Prime typically takes 5-15% on passed-through work</li>
          <li><strong>Payment terms:</strong> When does sub get paid? Net 30? After prime receives payment?</li>
          <li><strong>Pursuit cost sharing:</strong> Who pays for proposal development (B&P)?</li>
          <li><strong>Indirect rate treatment:</strong> How are <a href="/guides/indirect-rates">indirect costs</a> handled?</li>
        </ul>
        <p><strong>4. Roles and governance:</strong></p>
        <ul>
          <li><strong>Customer interface:</strong> Does prime control all customer communication or can sub engage directly?</li>
          <li><strong>Proposal responsibilities:</strong> Who writes which sections? Who reviews/approves?</li>
          <li><strong>Performance governance:</strong> How are issues escalated and resolved?</li>
          <li><strong>Reporting requirements:</strong> What reports does sub provide to prime?</li>
          <li><strong>Quality assurance:</strong> Who has final say on deliverables?</li>
        </ul>
        <p><strong>5. Intellectual property and data rights:</strong></p>
        <ul>
          <li><strong>Background IP:</strong> Each party retains rights to IP they bring</li>
          <li><strong>Foreground IP:</strong> Who owns IP created during contract performance?</li>
          <li><strong>Data rights:</strong> Government data rights vs. contractor rights (see <a href="/guides/contract-data-rights">data rights guide</a>)</li>
          <li><strong>Tool/platform rights:</strong> If partner provides proprietary tools, what are usage rights?</li>
        </ul>
        <p><strong>6. Exclusivity and duration:</strong></p>
        <ul>
          <li><strong>Exclusive vs. non-exclusive:</strong> Can each party pursue the opportunity with other partners?</li>
          <li><strong>Agreement duration:</strong> Until RFP release? Until award? For contract performance period?</li>
          <li><strong>Renewal/recompete:</strong> Does agreement cover follow-on or recompete opportunities?</li>
          <li><strong>Termination provisions:</strong> How can either party exit the agreement?</li>
        </ul>
        <p><strong>7. Risk allocation and liability:</strong></p>
        <ul>
          <li><strong>Performance risk:</strong> Prime typically bears ultimate customer risk, but sub may have performance guarantees</li>
          <li><strong>Insurance requirements:</strong> What coverage must each party maintain?</li>
          <li><strong>Indemnification:</strong> Who indemnifies whom for what?</li>
          <li><strong>Limitation of liability:</strong> Are there caps on liability?</li>
        </ul>
        <p><strong>Common negotiation sticking points:</strong></p>
        <ul>
          <li><strong>Work share disagreements:</strong> Each party wants more; resolve by objective assessment of capability contribution</li>
          <li><strong>Fee/profit split:</strong> Prime wants more for risk; sub wants fair value. Market norms: 60-70% prime, 30-40% sub on a 60/40 work split</li>
          <li><strong>Customer interface control:</strong> Subs want direct access; primes want control. Compromise: sub can interact but prime stays informed</li>
          <li><strong>IP ownership:</strong> Both want maximum rights. Clarify background vs. foreground IP; consider licensing arrangements</li>
        </ul>
        <p><strong>Negotiation best practices:</strong></p>
        <ul>
          <li><strong>Put it in writing:</strong> Formal <a href="/guides/teaming-agreements">teaming agreement</a>, not just handshake</li>
          <li><strong>Be transparent:</strong> Share assumptions, constraints, priorities</li>
          <li><strong>Focus on mutual benefit:</strong> Both parties should feel the deal is fair</li>
          <li><strong>Get legal review:</strong> Have contracts counsel review before signing</li>
          <li><strong>Plan for contingencies:</strong> What happens if scope changes, RFP is cancelled, or partner can't perform?</li>
          <li><strong>Document everything:</strong> Keep records of negotiation discussions and rationale</li>
        </ul>
        <p><strong>When to walk away from negotiations:</strong></p>
        <ul>
          <li>Partner demands unreasonable share relative to contribution</li>
          <li>Partner refuses transparency on pricing or capabilities</li>
          <li>Fundamental disagreement on roles or control that can't be resolved</li>
          <li>Partner is inflexible on terms that create unacceptable risk for you</li>
          <li>The deal economics don't support a viable competitive price</li>
        </ul>
      `,
    },
    {
      heading: 'Partner Relationship Management',
      content: `
        <p>Signing a teaming agreement is just the beginning. <strong>Active relationship management</strong> ensures partners stay aligned and perform as expected.</p>
        <p><strong>During capture and proposal:</strong></p>
        <p><strong>Communication protocols:</strong></p>
        <ul>
          <li>Weekly sync meetings during active capture</li>
          <li>Daily standups during proposal writing</li>
          <li>Single point of contact (SPOC) for each organization</li>
          <li>Shared collaboration tools (Slack, Teams, shared drives)</li>
          <li>Clear escalation path when issues arise</li>
        </ul>
        <p><strong>Work assignments and accountability:</strong></p>
        <ul>
          <li>Detailed proposal responsibility matrix (who writes what)</li>
          <li>Milestone deadlines for each partner's deliverables</li>
          <li>Quality review process before integration</li>
          <li>Consequences for missed deadlines (rare but important to define)</li>
        </ul>
        <p><strong>Solution development:</strong></p>
        <ul>
          <li>Joint technical solution sessions</li>
          <li>Integrated solution, not separate pieces duct-taped together</li>
          <li>Agree on discriminators and win themes</li>
          <li>Unified story in proposal (avoid "partner X will do this" seams)</li>
        </ul>
        <p><strong>Pricing coordination:</strong></p>
        <ul>
          <li>Partners provide pricing inputs on agreed schedule</li>
          <li>Validate assumptions (rates, labor mix, indirect rates)</li>
          <li>Ensure sub pricing supports overall <a href="/guides/price-to-win">price-to-win</a> target</li>
          <li>Reconcile any disconnects before final proposal</li>
        </ul>
        <p><strong>During contract performance (if you win):</strong></p>
        <p><strong>Transition and onboarding:</strong></p>
        <ul>
          <li>Joint kickoff meeting with government customer</li>
          <li>Confirm key personnel commitments (deliver who you proposed)</li>
          <li>Establish performance governance structure</li>
          <li>Set up regular status meetings and reporting</li>
        </ul>
        <p><strong>Performance monitoring:</strong></p>
        <ul>
          <li>Track deliverables, milestones, quality metrics</li>
          <li>Regular partner status reviews (monthly minimum)</li>
          <li>Early identification of issues before they impact customer</li>
          <li>Joint problem-solving when challenges arise</li>
        </ul>
        <p><strong>Customer relationship management:</strong></p>
        <ul>
          <li>Unified front to customer (one team, not prime vs. sub)</li>
          <li>Coordinated communications (customer doesn't see internal friction)</li>
          <li>Joint participation in customer meetings when appropriate</li>
          <li>Credit sharing for successes</li>
        </ul>
        <p><strong>Financial and administrative:</strong></p>
        <ul>
          <li>Timely payments per agreement terms</li>
          <li>Clear invoicing and backup documentation</li>
          <li>Prompt resolution of billing disputes</li>
          <li>Compliance with flow-down requirements (insurance, clearances, etc.)</li>
        </ul>
        <p><strong>Managing partner conflicts:</strong></p>
        <p><strong>Common sources of conflict:</strong></p>
        <ul>
          <li>Performance issues (missed deadlines, quality problems)</li>
          <li>Scope creep or scope disagreements</li>
          <li>Payment disputes</li>
          <li>Customer dissatisfaction with partner's work</li>
          <li>Key personnel changes</li>
          <li>Communication breakdowns</li>
        </ul>
        <p><strong>Conflict resolution approach:</strong></p>
        <ol>
          <li><strong>Address early:</strong> Don't let issues fester; raise concerns promptly</li>
          <li><strong>Start with working level:</strong> Let operational teams try to resolve before escalating</li>
          <li><strong>Escalate systematically:</strong> Move to leadership if working level can't resolve in 1-2 weeks</li>
          <li><strong>Document everything:</strong> Keep written record of issues, discussions, resolutions</li>
          <li><strong>Focus on solutions, not blame:</strong> What needs to happen to get back on track?</li>
          <li><strong>Involve customer when necessary:</strong> Don't hide significant issues from government</li>
        </ol>
        <p><strong>When to replace a partner:</strong></p>
        <p>Mid-contract partner replacement is painful but sometimes necessary:</p>
        <ul>
          <li><strong>Persistent performance issues</strong> despite multiple interventions</li>
          <li><strong>Ethical or integrity violations</strong></li>
          <li><strong>Financial instability</strong> threatening their ability to perform</li>
          <li><strong>Loss of required certifications or clearances</strong></li>
          <li><strong>Relationship breakdown</strong> that can't be repaired</li>
        </ul>
        <p>Process: Review teaming agreement termination provisions, consult legal counsel, notify government customer, identify replacement, execute transition.</p>
        <p><strong>Building long-term partnerships:</strong></p>
        <p>The best teaming relationships span multiple contracts over years:</p>
        <ul>
          <li>Perform excellently together on first contract</li>
          <li>Stay in touch between opportunities</li>
          <li>Proactively identify future opportunities to pursue together</li>
          <li>Invest in relationship beyond transactions (joint training, social events)</li>
          <li>Expand partnership into adjacent markets or capabilities</li>
          <li>Consider formal strategic alliance or preferred partner agreement</li>
        </ul>
      `,
    },
    {
      heading: 'Finding and Vetting Potential Partners',
      content: `
        <p>Building a <strong>partner network</strong> before you need it ensures you have qualified options when opportunities arise.</p>
        <p><strong>Where to find potential partners:</strong></p>
        <p><strong>1. Industry events and conferences:</strong></p>
        <ul>
          <li>Agency industry days and matchmaking events</li>
          <li>Trade association conferences (PSC, NDIA, AFCEA, etc.)</li>
          <li>Small business outreach events</li>
          <li>Teaming expos and networking sessions</li>
        </ul>
        <p><strong>2. Online databases and directories:</strong></p>
        <ul>
          <li><strong>SAM.gov:</strong> Search by NAICS, capabilities, set-aside status</li>
          <li><strong>SBA Dynamic Small Business Search:</strong> Find certified small businesses</li>
          <li><strong>APEX Accelerators (PTACs):</strong> Local matchmaking services</li>
          <li><strong>GovWin, Bloomberg Government:</strong> Contractor databases with detailed profiles</li>
          <li><strong>Trade association directories:</strong> Member lists often include capabilities</li>
        </ul>
        <p><strong>3. Current contracts and past awards:</strong></p>
        <ul>
          <li>Who's the incumbent on target opportunity? (potential prime or competitor)</li>
          <li>Who holds similar contracts at this customer?</li>
          <li>Who are successful primes subcontracting to?</li>
          <li>Search USASpending and SAM.gov for relevant awards</li>
        </ul>
        <p><strong>4. Customer and industry referrals:</strong></p>
        <ul>
          <li>Ask government small business specialists for recommendations</li>
          <li>Request referrals from other contractors (non-competing)</li>
          <li>Talk to customers about companies they respect</li>
          <li>Join LinkedIn groups and participate in discussions</li>
        </ul>
        <p><strong>5. Inbound partner inquiries:</strong></p>
        <ul>
          <li>Post teaming opportunities on your website</li>
          <li>Make it easy for potential partners to reach you</li>
          <li>Respond promptly and professionally to all inquiries</li>
          <li>Even if not right for current opportunity, may be good for future</li>
        </ul>
        <p><strong>Building your partner database:</strong></p>
        <p>Maintain a living database of potential partners:</p>
        <ul>
          <li><strong>Company profile:</strong> Capabilities, certifications, size, location</li>
          <li><strong>Key contacts:</strong> BD leads, technical leads, executives</li>
          <li><strong>Past performance:</strong> Notable contracts, customers, CPARS ratings</li>
          <li><strong>Relationship status:</strong> Have you teamed before? Worked with them? Just met?</li>
          <li><strong>Strengths and gaps:</strong> What they're great at, where they're weak</li>
          <li><strong>Teaming history:</strong> Notes from past pursuits together</li>
        </ul>
        <p><strong>Proactive relationship building:</strong></p>
        <p>Don't wait until you need a partner to start building relationships:</p>
        <ul>
          <li>Meet potential partners at industry events (coffee or lunch)</li>
          <li>Share market intelligence and opportunity information</li>
          <li>Make helpful introductions (to other partners or customers)</li>
          <li>Collaborate on low-stakes opportunities first (small task orders)</li>
          <li>Stay in touch quarterly even when not actively pursuing together</li>
        </ul>
        <p><strong>Partner capability mapping:</strong></p>
        <p>Map your network against common needs:</p>
        <ul>
          <li><strong>Technical domains:</strong> Cybersecurity, cloud migration, data analytics, etc.</li>
          <li><strong>Functional areas:</strong> Training, logistics, facilities, etc.</li>
          <li><strong>Socioeconomic:</strong> 8(a), SDVOSB, WOSB, HUBZone partners for each</li>
          <li><strong>Geographic:</strong> Partners with presence in key regions</li>
          <li><strong>Customer relationships:</strong> Partners with access to target agencies</li>
        </ul>
        <p>When opportunity arises, you can quickly identify 2-3 potential partners from your mapped network.</p>
        <p><strong>Vetting new partners systematically:</strong></p>
        <p>When approached by unfamiliar potential partners:</p>
        <ol>
          <li><strong>Initial screening call (30 min):</strong> Understand their capabilities, interest, and fit</li>
          <li><strong>Review public information:</strong> SAM.gov, website, LinkedIn (1 hour)</li>
          <li><strong>Capability briefing:</strong> Ask them to present relevant experience (1 hour)</li>
          <li><strong>Reference checks:</strong> Talk to 2-3 of their past customers or partners (30 min each)</li>
          <li><strong>Due diligence:</strong> Financial, legal, compliance verification (2-4 hours)</li>
          <li><strong>Trial collaboration:</strong> Work together on a small opportunity or capture activity before committing to major pursuit</li>
        </ol>
        <p><strong>Maintaining partner network:</strong></p>
        <ul>
          <li>Update partner profiles quarterly (new contracts, personnel, capabilities)</li>
          <li>Remove partners who've had serious issues or aren't responsive</li>
          <li>Rate partners based on past experience (A/B/C tier)</li>
          <li>Prioritize A-tier partners for future opportunities</li>
        </ul>
      `,
    },
    {
      heading: 'When to Walk Away from Partners',
      content: `
        <p>Knowing when to <strong>decline partnerships</strong> is as important as knowing how to form them. Bad partners are worse than no partners.</p>
        <p><strong>Clear disqualifiers (immediate no-go):</strong></p>
        <ul>
          <li><strong>Exclusions or debarments:</strong> Active suspension or debarment in SAM.gov</li>
          <li><strong>False certifications:</strong> Misrepresenting small business status or other qualifications</li>
          <li><strong>Ethical violations:</strong> History of fraud, procurement violations, or integrity issues</li>
          <li><strong>Poor CPARS ratings:</strong> "Marginal" or "Unsatisfactory" ratings without compelling explanation</li>
          <li><strong>Financial distress:</strong> Bankruptcy, significant liens, or inability to perform</li>
          <li><strong>Lack of required credentials:</strong> Don't have clearances, certifications, or technical capabilities they claim</li>
        </ul>
        <p><strong>Serious concerns (proceed with extreme caution or decline):</strong></p>
        <ul>
          <li><strong>Weak or no relevant past performance:</strong> Can't demonstrate they can actually do the work</li>
          <li><strong>Unresponsive or poor communication:</strong> During partner evaluation, communication is slow or unclear</li>
          <li><strong>Unreasonable demands:</strong> Want disproportionate work share, fee, or control</li>
          <li><strong>Capacity questions:</strong> Already overcommitted and can't clearly articulate how they'd staff this</li>
          <li><strong>Bad references:</strong> Past customers or partners won't vouch for them or provide lukewarm references</li>
          <li><strong>Cultural mismatch:</strong> Fundamental differences in values, ethics, or approach to business</li>
        </ul>
        <p><strong>Strategic misalignment (may be good company, wrong opportunity):</strong></p>
        <ul>
          <li><strong>Low commitment:</strong> This opportunity is low priority for them; unlikely to invest appropriately</li>
          <li><strong>Competing interests:</strong> They're also pursuing as prime with another team</li>
          <li><strong>Wrong capabilities:</strong> Their expertise doesn't match what this opportunity actually needs</li>
          <li><strong>Economics don't work:</strong> Adding them makes your price uncompetitive</li>
          <li><strong>Customer preference:</strong> Customer has indicated preference for different approach or team</li>
        </ul>
        <p><strong>Signs to walk away during negotiations:</strong></p>
        <ul>
          <li>Partner is inflexible on terms that create unacceptable risk</li>
          <li>Partner won't provide information needed for due diligence</li>
          <li>Material misrepresentations discovered (capabilities, past performance, financials)</li>
          <li>Fundamental disagreement on roles or control that can't be resolved</li>
          <li>Partner demands exclusive agreement without corresponding commitment</li>
          <li>Legal counsel advises the agreement creates unacceptable liability</li>
        </ul>
        <p><strong>Ending existing partnerships:</strong></p>
        <p>Sometimes you need to end an ongoing relationship:</p>
        <p><strong>During pursuit (before contract award):</strong></p>
        <ul>
          <li>Partner fails to deliver on commitments (proposal sections, pricing, etc.)</li>
          <li>Material change in partner status (loss of certification, clearances, key personnel)</li>
          <li>Discovery of disqualifying information during due diligence</li>
          <li>RFP requirements change and partner is no longer needed or qualified</li>
        </ul>
        <p><strong>Process:</strong> Review teaming agreement termination provisions, notify partner in writing, remove from proposal materials, find replacement if needed, don't disparage partner publicly.</p>
        <p><strong>During performance (after contract award):</strong></p>
        <ul>
          <li>Persistent performance failures despite intervention</li>
          <li>Ethical violations or integrity issues</li>
          <li>Loss of required qualifications (certifications, clearances)</li>
          <li>Financial failure threatening their ability to continue</li>
        </ul>
        <p><strong>Process:</strong> Review subcontract termination provisions, consult with legal counsel, notify government customer if required, document performance issues, execute termination, identify and onboard replacement.</p>
        <p><strong>How to decline partnership professionally:</strong></p>
        <p>When saying no to a potential partner:</p>
        <ol>
          <li><strong>Be prompt:</strong> Don't string them along; decide and communicate quickly</li>
          <li><strong>Be respectful:</strong> They took time to pursue this with you</li>
          <li><strong>Be honest but diplomatic:</strong> "After review, we've decided to pursue a different approach" is fine</li>
          <li><strong>Don't burn bridges:</strong> Might be right partner for different opportunity</li>
          <li><strong>Keep it brief:</strong> No need to over-explain or justify</li>
        </ol>
        <p><strong>Example language:</strong> "Thank you for your interest in teaming on [opportunity]. After careful consideration of our team composition and approach, we've decided to pursue a different structure for this opportunity. We appreciate your time and will certainly keep you in mind for future opportunities where there may be a better fit."</p>
        <p><strong>Trust your instincts:</strong></p>
        <p>If something feels wrong during partner evaluation or negotiation—unclear communication, evasiveness, pressure tactics, misaligned incentives—trust that instinct. It's better to compete without a partner or pass on an opportunity entirely than to team with the wrong company.</p>
        <p>The cost of a bad partner (performance failures, disputes, damaged reputation, customer dissatisfaction, lost recompete opportunities) far exceeds the short-term benefit of having a gap filled.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'How do I find partners with specific certifications (8(a), SDVOSB, etc.)?',
      answer:
        'Use the SBA Dynamic Small Business Search (dsbs.sba.gov) to search by certification type, NAICS code, and location. Also check SAM.gov advanced search, attend agency small business matchmaking events, and contact agency small business specialists who often maintain lists of certified contractors in various domains.',
    },
    {
      question: 'What\'s a fair work share split between prime and subcontractor?',
      answer:
        'Work share should reflect actual capability contribution, not negotiating power. If a sub is providing 40% of the technical capability and taking corresponding performance risk, a 60/40 work split is reasonable. Profit/fee is often split differently—primes typically take 60-70% of fee on a 60/40 work split to account for prime risk and overhead.',
    },
    {
      question: 'Should I sign exclusive teaming agreements?',
      answer:
        'Only if there\'s mutual commitment. Exclusive agreements prevent you from pursuing with others but protect you from your partner joining competitors. They make sense for high-priority opportunities where both parties are fully committed. For lower-priority or early-stage pursuits, non-exclusive agreements preserve flexibility.',
    },
    {
      question: 'How do I negotiate with a partner who has more market power?',
      answer:
        'Focus on the value you bring that they lack (customer relationship, technical capability, small business status, etc.). If they don\'t need you, why are they talking to you? Be willing to walk away if terms are unreasonable—desperation leads to bad deals. Consider alternative partners or alternative opportunities where your position is stronger.',
    },
    {
      question: 'What happens if my subcontractor fails to perform during contract execution?',
      answer:
        'As prime, you\'re ultimately responsible to the government customer. You must either fix the sub\'s performance (with their cooperation or by adding resources) or replace them. This is why sub selection and monitoring are critical. Your subcontract should include performance requirements and termination provisions. Document performance issues and notify the sub in writing before taking action.',
    },
    {
      question: 'Can I team with competitors?',
      answer:
        'Yes, if you bring complementary capabilities. Many companies compete on some contracts and team on others. However, be cautious: (1) Don\'t share competitively sensitive information, (2) Ensure the team structure creates real complementarity, not just market allocation, (3) Be aware that today\'s partner may be tomorrow\'s competitor on the recompete, (4) Consider whether the partnership might limit future competitive positioning.',
    },
    {
      question: 'How long does partner due diligence typically take?',
      answer:
        'For a thorough process: initial screening (1-2 hours), detailed assessment (4-8 hours over 1-2 weeks), compliance verification (2-4 hours), and relationship testing (ongoing). Total elapsed time: 2-4 weeks for a comprehensive evaluation. You can accelerate for low-risk situations but never skip due diligence entirely.',
    },
    {
      question: 'What should I do if I discover a problem with a partner after signing a teaming agreement?',
      answer:
        'Immediately consult legal counsel and review your teaming agreement\'s termination provisions. Assess the materiality of the issue—is it disqualifying (ethics violation, loss of required certification) or manageable (personnel change, temporary capacity issue)? If disqualifying, terminate per agreement terms and notify government if required. Document everything. The earlier you address problems, the less damage they cause.',
    },
  ],
  cta: {
    heading: 'Build Winning Teams',
    description:
      'Strategic teaming can make or break your competitive position. Our training covers partner selection, due diligence, teaming negotiations, and relationship management frameworks used by successful government contractors.',
    buttonText: 'View Training Options',
    buttonHref: '/training',
  },
  relatedGuides: [
    'teaming-agreements',
    'capture-management',
    'joint-venture-requirements',
    'small-business-teaming',
    'subcontracting-and-teaming',
  ],
  publishedDate: '2026-04-07',
};
