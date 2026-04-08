import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'unallowable-costs',
  title: 'Unallowable Costs: What You Cannot Charge to Government Contracts',
  metaTitle: 'Unallowable Costs [Guide] — FAR 31 Cost Principles for Contractors',
  metaDescription:
    'Learn which costs are unallowable under FAR Part 31, how to identify and track unallowable costs, the difference between expressly and mutually agreed unallowables, and how to prepare for DCAA audits.',
  keywords: [
    'unallowable costs',
    'FAR 31',
    'cost principles',
    'expressly unallowable costs',
    'mutually agreed unallowable costs',
    'unallowable cost accounting',
    'DCAA audit unallowable costs',
    'cost allowability',
    'government contract costs',
  ],
  heroSubtitle:
    'Not all business costs can be charged to government contracts. Understanding unallowable costs, tracking them properly, and avoiding common mistakes is essential for compliance and avoiding costly audit findings.',
  sections: [
    {
      heading: 'Understanding FAR Part 31 Cost Principles',
      content: `
        <p>Federal Acquisition Regulation (FAR) Part 31 establishes the principles for determining which costs are allowable and allocable to government contracts. These rules apply primarily to cost-reimbursement contracts but also influence fixed-price contract negotiations and pricing analysis.</p>
        <p><strong>The fundamental test for cost allowability:</strong></p>
        <p>For a cost to be allowable on a government contract, it must meet ALL of these criteria (FAR 31.201-2):</p>
        <ul>
          <li><strong>Reasonable:</strong> A prudent person would incur the cost in conducting competitive business. Not excessive in amount or purpose.</li>
          <li><strong>Allocable:</strong> The cost is assignable to the contract in accordance with the benefit received or causal relationship. Costs that benefit multiple contracts must be allocated equitably.</li>
          <li><strong>Consistent treatment:</strong> Costs are treated consistently across contracts and accounting periods. You cannot charge costs as direct on one contract and indirect on another without justification.</li>
          <li><strong>Conforms to limitations in the contract or FAR:</strong> Some costs have specific dollar caps or percentage limitations (e.g., executive compensation limits).</li>
          <li><strong>Generally Accepted Accounting Principles (GAAP):</strong> Costs must be recorded in accordance with GAAP, Cost Accounting Standards (where applicable), and the contractor's established accounting practices.</li>
          <li><strong>Not expressly unallowable:</strong> FAR Part 31 specifically identifies certain costs as unallowable regardless of whether they are otherwise reasonable and allocable.</li>
        </ul>
        <p><strong>Why unallowable costs matter:</strong></p>
        <p>On cost-reimbursement contracts, the government reimburses your actual allowable costs. Bill an unallowable cost and you must refund the payment when discovered. On all contract types, unallowable costs in indirect pools create overcharges. DCAA audits specifically target unallowable costs, and findings can result in significant repayments plus penalties for knowing violations.</p>
        <p><strong>Two categories of unallowable costs:</strong></p>
        <p><strong>Expressly unallowable:</strong> Costs that FAR Part 31 explicitly prohibits from billing to government contracts under any circumstances (e.g., entertainment, lobbying, certain legal costs).</p>
        <p><strong>Mutually agreed unallowable:</strong> Costs that are allowable under FAR but that you and the contracting officer have agreed to treat as unallowable for a specific contract (often negotiated during contract award).</p>
        <p>Understanding both categories and properly accounting for them is a core requirement for government contractors.</p>
      `,
    },
    {
      heading: 'Common Expressly Unallowable Costs',
      content: `
        <p>FAR 31.205 contains 52 subsections detailing specific cost allowability. Here are the most commonly encountered expressly unallowable costs:</p>
        <p><strong>1. Alcoholic Beverages (FAR 31.205-51)</strong></p>
        <p>All costs of alcoholic beverages are unallowable. This includes alcohol served at company events, client entertainment, holiday parties, or any other business purpose. No exceptions.</p>
        <p><strong>2. Entertainment (FAR 31.205-14)</strong></p>
        <p>Costs of amusement, diversion, and social activities are unallowable. Includes sporting events, concerts, shows, dinners (unless specifically business meals), golf outings, and similar activities. "Entertainment" is broadly interpreted — if the primary purpose is enjoyment rather than direct business discussion, it's likely unallowable.</p>
        <p><strong>3. Lobbying and Political Activity Costs (FAR 31.205-22)</strong></p>
        <p>Costs associated with influencing legislation, political campaigns, or lobbying activities are unallowable. Includes salaries of employees engaged in lobbying, membership in political organizations, and contributions to political candidates or parties.</p>
        <p><strong>4. Contributions and Donations (FAR 31.205-8)</strong></p>
        <p>Charitable contributions, gifts to non-employees, and donations are generally unallowable. There are narrow exceptions for donations of excess food or certain community relations activities, but the default is unallowable.</p>
        <p><strong>5. Fines and Penalties (FAR 31.205-15)</strong></p>
        <p>Costs of fines and penalties resulting from violations of law or contract terms are unallowable. Includes parking tickets, late fees, tax penalties, and regulatory fines. The government will not reimburse you for your legal violations.</p>
        <p><strong>6. Advertising Costs (FAR 31.205-1)</strong></p>
        <p>Most advertising is unallowable. Public relations, image enhancement, and brand advertising are unallowable. However, help-wanted advertising (recruiting), selling existing inventory, and certain required public notices are allowable. The distinction is whether the advertising supports contract performance (allowable) or promotes the company generally (unallowable).</p>
        <p><strong>7. Certain Legal Costs (FAR 31.205-47)</strong></p>
        <p>Legal costs for prosecution of claims against the government, defense of fraud proceedings, defense of certain regulatory violations, and patent infringement litigation can be unallowable depending on circumstances. Routine contract legal support is generally allowable.</p>
        <p><strong>8. Bad Debts (FAR 31.205-3)</strong></p>
        <p>Losses from uncollectible accounts receivable are unallowable. The government will not subsidize your credit losses on commercial or other government work.</p>
        <p><strong>9. Excessive Pass-Through Charges (FAR 31.205-38)</strong></p>
        <p>If you subcontract work but add no or negligible value, excessive profit on the subcontract costs is unallowable. You can charge for management and oversight but cannot simply mark up subcontractor costs without providing value.</p>
        <p><strong>10. Interest and Other Financial Costs (FAR 31.205-20)</strong></p>
        <p>Interest on borrowings (including mortgages, loans, and bonds), bond discounts, and finance charges are generally unallowable. However, "cost of money" representing facilities capital investment is allowable under specific CAS rules.</p>
        <p><strong>11. Certain Compensation Costs (FAR 31.205-6)</strong></p>
        <p>Executive compensation above statutory caps (currently around $490,000 for FY2024, adjusted annually) is unallowable. Severance pay beyond one year's salary can be unallowable. Stock-based compensation may have allowability limitations depending on structure.</p>
        <p><strong>12. Goodwill and Organization Costs (FAR 31.205-49, 31.205-27)</strong></p>
        <p>Amortization of goodwill from business acquisitions is unallowable. Original organization costs (legal fees to incorporate, stock issuance costs) are unallowable.</p>
        <p><strong>The impact of unallowable costs in indirect pools:</strong></p>
        <p>Even if a cost is small, it must be excluded from indirect cost pools that are allocated to government contracts. A $5,000 entertainment expense in a $1M overhead pool seems minor, but it creates an overcharge on every contract that receives overhead allocation. Multiply across multiple years and multiple contracts, and the impact is significant.</p>
      `,
    },
    {
      heading: 'Expressly vs. Mutually Agreed Unallowable Costs',
      content: `
        <p>Understanding the difference between expressly unallowable and mutually agreed unallowable costs is critical for proper accounting and compliance.</p>
        <p><strong>Expressly Unallowable Costs</strong></p>
        <p>Costs that FAR Part 31 explicitly prohibits from charging to government contracts under any circumstances. The prohibition is statutory — no negotiation or contracting officer discretion can make these costs allowable.</p>
        <p><strong>Characteristics:</strong></p>
        <ul>
          <li>Defined in FAR 31.205 subsections</li>
          <li>Cannot be waived or negotiated</li>
          <li>Must be excluded from all government contract billings</li>
          <li>Subject to penalty assessment if billed (see FAR 42.709)</li>
          <li>Contractor must track and segregate in accounting system</li>
        </ul>
        <p><strong>Examples:</strong> Entertainment, alcoholic beverages, lobbying, most advertising, goodwill amortization, excessive compensation.</p>
        <p><strong>Penalty provision (FAR 42.709):</strong></p>
        <p>If you include expressly unallowable costs in an indirect cost pool or claim them as direct costs on a cost-reimbursement contract, the government can assess a penalty equal to the amount of the unallowable cost if the inclusion was knowing or deliberate. "Knowing" means you had actual knowledge or should have known through reasonable diligence.</p>
        <p>Penalty = Unallowable costs included + penalty equal to unallowable amount (effectively doubles the cost).</p>
        <p>This is separate from and in addition to repaying the unallowable costs themselves.</p>
        <p><strong>Mutually Agreed Unallowable Costs</strong></p>
        <p>Costs that are allowable under FAR Part 31 general principles but that you and the contracting officer have agreed to exclude from a specific contract. This typically happens during contract negotiation when the government challenges certain costs as unreasonable, not allocable, or not in the government's interest.</p>
        <p><strong>Characteristics:</strong></p>
        <ul>
          <li>Allowable under FAR but excluded by negotiated agreement</li>
          <li>Applies only to specific contracts (not universally unallowable)</li>
          <li>Documented in contract terms or negotiation memorandum</li>
          <li>Examples: Certain IR&D costs, specific types of marketing, consulting fees, executive compensation below the FAR cap but above what the CO considers reasonable</li>
        </ul>
        <p><strong>Why contracting officers negotiate costs as unallowable:</strong></p>
        <p>Even if a cost is technically allowable under FAR, the contracting officer may determine it is unreasonable in amount, not beneficial to contract performance, or not competitive with industry norms. Rather than dispute every line item, contractors often agree to exclude certain costs from billing to expedite contract award.</p>
        <p><strong>Examples of mutually agreed unallowables:</strong></p>
        <ul>
          <li><strong>Independent Research and Development (IR&D):</strong> Allowable under FAR 31.205-18 but sometimes excluded if not relevant to government work</li>
          <li><strong>Bid and Proposal (B&P) costs:</strong> Allowable under FAR 31.205-18 but may be capped or excluded if deemed excessive</li>
          <li><strong>Certain consulting or professional fees:</strong> Allowable if reasonable but may be challenged if amounts are high relative to benefit</li>
          <li><strong>Relocation costs:</strong> Allowable under FAR 31.205-35 but often negotiated as unallowable if not essential to contract performance</li>
          <li><strong>Training costs:</strong> Allowable under FAR 31.205-44 but may be limited if unrelated to contract requirements</li>
        </ul>
        <p><strong>Accounting treatment differs:</strong></p>
        <p><strong>Expressly unallowable:</strong> Must be segregated in your accounting system and excluded from ALL government contracts and indirect pools. CAS 405 requires a system to identify and exclude these costs.</p>
        <p><strong>Mutually agreed unallowable:</strong> Excluded only from specific contracts where negotiated. May be charged to other contracts where allowable. Requires contract-specific tracking.</p>
      `,
    },
    {
      heading: 'Cost Accounting Practices for Unallowable Costs',
      content: `
        <p>Properly accounting for unallowable costs is not optional — it's a contractual and regulatory requirement. CAS 405 (applicable to CAS-covered contractors) and FAR cost principles require contractors to have an accounting system capable of identifying and excluding unallowable costs.</p>
        <p><strong>CAS 405 Requirements:</strong></p>
        <p>Cost Accounting Standard 405 requires that unallowable costs be:</p>
        <ul>
          <li>Identified and classified as unallowable in the contractor's records</li>
          <li>Excluded from any billing, claim, or proposal to the government</li>
          <li>Excluded from indirect cost pools that are allocated to government contracts</li>
          <li>Subject to the same allocation of indirect costs as allowable costs (the "penalty" for unallowable costs)</li>
        </ul>
        <p><strong>The penalty provision:</strong></p>
        <p>CAS 405 requires that indirect costs be allocated to unallowable costs using the same allocation base used for allowable costs. This means unallowable direct costs "absorb" their share of overhead and G&A, reducing the amount of indirect costs allocated to government contracts.</p>
        <p><strong>Example:</strong></p>
        <p>You have $100K in entertainment costs (unallowable). Your overhead rate is 60%. The entertainment costs must absorb $60K of overhead ($100K × 60%), meaning that $60K of overhead is allocated to unallowable costs and excluded from government billing. Total unallowable = $160K.</p>
        <p>This "penalty" ensures unallowable costs don't get subsidized through indirect rate mechanisms.</p>
        <p><strong>Setting up your accounting system:</strong></p>
        <p><strong>1. Chart of accounts structure</strong></p>
        <p>Create specific general ledger accounts for unallowable cost categories:</p>
        <ul>
          <li>Entertainment (unallowable)</li>
          <li>Alcoholic beverages (unallowable)</li>
          <li>Lobbying (unallowable)</li>
          <li>Advertising - promotional (unallowable)</li>
          <li>Advertising - recruiting (allowable)</li>
          <li>Contributions (unallowable)</li>
          <li>Fines and penalties (unallowable)</li>
        </ul>
        <p>This allows you to segregate unallowable costs at the point of recording rather than identifying them later.</p>
        <p><strong>2. Expense coding procedures</strong></p>
        <p>Train employees who code expenses (accountants, AP staff, expense report approvers) to correctly identify and code unallowable costs. Provide examples and decision trees:</p>
        <ul>
          <li>Business meal with client discussing contract? Allowable (if reasonable)</li>
          <li>Dinner with client at sports event? Entertainment = unallowable</li>
          <li>Help-wanted ad for contract staff? Recruiting = allowable</li>
          <li>Brand awareness ad in trade publication? Promotional = unallowable</li>
        </ul>
        <p><strong>3. Indirect rate calculations</strong></p>
        <p>When calculating provisional or actual indirect rates:</p>
        <ul>
          <li>Sum all unallowable costs by category</li>
          <li>Calculate the allocated indirect costs that must be applied to unallowables (using the same rates as allowable costs)</li>
          <li>Subtract unallowable costs + allocated indirects from indirect pools before calculating rates</li>
        </ul>
        <p><strong>4. Documentation and audit trail</strong></p>
        <p>Maintain documentation showing:</p>
        <ul>
          <li>How unallowable costs were identified and classified</li>
          <li>Total unallowable costs by category (for incurred cost submissions)</li>
          <li>Calculations showing allocation of indirect costs to unallowables</li>
          <li>Reconciliation between general ledger and incurred cost submissions</li>
        </ul>
        <p><strong>Common accounting mistakes:</strong></p>
        <ul>
          <li><strong>Failing to identify unallowables:</strong> Costs coded to generic expense accounts rather than specific unallowable accounts</li>
          <li><strong>Commingling allowable and unallowable costs:</strong> Using one account for both recruiting advertising (allowable) and brand advertising (unallowable)</li>
          <li><strong>Not calculating the penalty:</strong> Excluding unallowable direct costs but not allocating indirect costs to them</li>
          <li><strong>Inconsistent treatment:</strong> Coding similar costs as allowable in one period and unallowable in another</li>
          <li><strong>Lack of documentation:</strong> Unable to support why a cost was classified as allowable or unallowable</li>
        </ul>
        <p>See our <a href="/guides/cost-accounting-standards">Cost Accounting Standards guide</a> for broader CAS compliance.</p>
      `,
    },
    {
      heading: 'Audit Preparation: What DCAA Looks For',
      content: `
        <p>DCAA auditors specifically scrutinize unallowable costs because they represent a high risk of overcharging the government. Understanding what auditors look for helps you prepare and avoid findings.</p>
        <p><strong>DCAA audit objectives for unallowable costs:</strong></p>
        <ul>
          <li>Verify that expressly unallowable costs are properly identified and excluded from government billings</li>
          <li>Ensure unallowable costs are subject to the penalty (allocation of indirect costs)</li>
          <li>Determine whether the contractor has an adequate system for segregating unallowable costs</li>
          <li>Identify any unallowable costs hidden in indirect pools or charged as direct costs</li>
          <li>Assess whether unallowable costs were knowingly included (triggering penalty provisions)</li>
        </ul>
        <p><strong>High-risk areas auditors focus on:</strong></p>
        <p><strong>1. Expense reports and credit card statements</strong></p>
        <p>Auditors review samples of expense reports looking for entertainment, alcohol, personal expenses, or lavish/excessive costs. They scrutinize business meal expenses to determine if they're actually entertainment. Documentation is key — "client dinner" is not sufficient; you need to show business purpose and attendees.</p>
        <p><strong>2. Travel and conference costs</strong></p>
        <p>Conference attendance can include both allowable (registration, business sessions) and unallowable (entertainment events, social activities) costs. Auditors look for proper segregation. Attendance at sporting events or concerts associated with conferences is unallowable even if networking occurs.</p>
        <p><strong>3. Marketing and advertising expenses</strong></p>
        <p>Auditors challenge whether advertising is truly for recruiting, selling existing inventory, or required notices (allowable) versus brand promotion or image enhancement (unallowable). Trade show booth expenses, sponsorships, and promotional items often contain unallowable elements.</p>
        <p><strong>4. Contributions and donations</strong></p>
        <p>Charitable contributions, United Way campaigns, sponsorships of community events, and donations are scrutinized. These are generally unallowable even if they generate goodwill that indirectly benefits the business.</p>
        <p><strong>5. Legal expenses</strong></p>
        <p>Auditors review legal invoices to identify costs for patent litigation, claims against the government, or defense of fraud allegations (unallowable). Routine contract support and employment law costs are typically allowable.</p>
        <p><strong>6. Compensation costs</strong></p>
        <p>Auditors verify that executive compensation above the statutory cap is excluded. They scrutinize bonuses, stock-based compensation, and severance payments for allowability.</p>
        <p><strong>7. Indirect pool composition</strong></p>
        <p>Auditors review all costs in overhead, G&A, and fringe pools looking for unallowable costs that were not properly segregated. They test whether your chart of accounts and coding practices are adequate to identify unallowables.</p>
        <p><strong>How to prepare for an unallowable costs audit:</strong></p>
        <p><strong>Before the audit:</strong></p>
        <ul>
          <li>Conduct a self-audit of your indirect pools and direct charges looking for potential unallowables</li>
          <li>Review your chart of accounts and coding practices — are unallowable costs clearly segregated?</li>
          <li>Verify that your incurred cost submission properly excludes unallowable costs and shows penalty calculations</li>
          <li>Prepare supporting documentation for any costs that might be questioned (business meals, advertising, legal, consulting)</li>
          <li>Review expense reports for a sample period to identify any unallowable costs that were miscoded</li>
        </ul>
        <p><strong>During the audit:</strong></p>
        <ul>
          <li>Be transparent — if you discover an unallowable cost was miscoded, disclose it rather than hoping the auditor misses it</li>
          <li>Provide clear documentation showing how you identify and exclude unallowables</li>
          <li>Walk the auditor through your accounting system capabilities (chart of accounts, coding procedures, training)</li>
          <li>For questioned costs, provide documentation of business purpose and FAR allowability analysis</li>
        </ul>
        <p><strong>Common audit findings:</strong></p>
        <ul>
          <li><strong>Entertainment costs not identified:</strong> Business meals that were actually entertainment charged as allowable</li>
          <li><strong>Inadequate cost accounting system:</strong> No chart of accounts structure to segregate unallowables</li>
          <li><strong>Penalty not calculated:</strong> Unallowable costs excluded but indirect allocation to unallowables not calculated</li>
          <li><strong>Unallowable costs in indirect pools:</strong> Advertising, contributions, or other unallowables buried in overhead or G&A</li>
          <li><strong>Excessive or unreasonable costs:</strong> Lavish meals, first-class travel, or other costs that exceed reasonable business needs</li>
        </ul>
        <p>See our <a href="/guides/dcaa-audits">DCAA Audits guide</a> for comprehensive audit preparation.</p>
      `,
    },
    {
      heading: 'Gray Areas and Questionable Costs',
      content: `
        <p>Not every cost is clearly allowable or unallowable. Many fall into gray areas requiring judgment, documentation, and sometimes negotiation with the contracting officer.</p>
        <p><strong>Business meals vs. entertainment:</strong></p>
        <p>The line between allowable business meals and unallowable entertainment can be blurry. FAR looks at the primary purpose:</p>
        <p><strong>Allowable:</strong> Meal during a business meeting where substantive contract or business matters are discussed. Must be reasonable in cost and frequency. Documentation should include attendees, business purpose, and topics discussed.</p>
        <p><strong>Unallowable:</strong> Meal primarily for entertainment, recreation, or social purposes even if business is incidentally discussed. Meals at sporting events, concerts, or entertainment venues are presumed unallowable regardless of business discussion.</p>
        <p><strong>Best practice:</strong> Document business meals with attendees and business purpose. Avoid venues associated with entertainment. Keep meal costs reasonable (no $300 per person dinners).</p>
        <p><strong>Promotional items and company swag:</strong></p>
        <p>Coffee mugs, pens, t-shirts, and other items with your company logo are generally considered advertising (allowable or unallowable depending on purpose) or gifts (unallowable).</p>
        <p><strong>Allowable:</strong> Items provided as part of recruiting (job fair giveaways), required safety equipment with logo, or items given to employees as part of recognition programs (within reason).</p>
        <p><strong>Unallowable:</strong> Items provided to customers, potential customers, or government employees as gifts or for promotional purposes. Lavish or expensive items even if given to employees.</p>
        <p><strong>Trade shows and conferences:</strong></p>
        <p>Conference attendance involves both allowable and unallowable elements that must be segregated:</p>
        <p><strong>Allowable:</strong> Registration, airfare, hotel, meals (within per diem), attendance at business sessions, booth costs if selling existing products/services.</p>
        <p><strong>Unallowable:</strong> Social events (dinners, receptions, golf tournaments), entertainment tickets, excessive hospitality suite costs, brand promotion booth expenses.</p>
        <p><strong>Allocating mixed costs:</strong> If a conference package includes both business sessions and social events, you must allocate costs between allowable and unallowable elements. Many contractors use a conservative approach, treating any questionable elements as unallowable.</p>
        <p><strong>Public relations and corporate communications:</strong></p>
        <p>General public relations, corporate communications, and image enhancement are unallowable advertising. However, communications directly related to contract performance may be allowable.</p>
        <p><strong>Unallowable:</strong> Press releases about company achievements, corporate image advertising, general website development, annual reports to promote the company.</p>
        <p><strong>Potentially allowable:</strong> Communications required by the contract (reporting, notifications), website content directly supporting contract performance, recruiting communications.</p>
        <p><strong>Professional and consulting services:</strong></p>
        <p>Professional services are allowable if reasonable and necessary for contract performance. Auditors scrutinize high consulting fees, related-party transactions, and services that appear to duplicate internal capabilities.</p>
        <p><strong>Allowable if reasonable:</strong> Legal, accounting, technical consulting, specialized expertise not available internally, temporary augmentation during peak workload.</p>
        <p><strong>Questionable:</strong> Excessive fees (market-rate analysis required), payments to related parties above fair market value, services that duplicate internal staff capabilities without justification.</p>
        <p><strong>When in doubt:</strong></p>
        <ul>
          <li>Document the business purpose and contract relationship</li>
          <li>Research FAR Part 31 for the specific cost type</li>
          <li>Seek advance agreement with the contracting officer for large or unusual costs</li>
          <li>Take the conservative approach — if questionable, treat as unallowable</li>
          <li>Consult with a government contracts accountant or attorney</li>
        </ul>
      `,
    },
    {
      heading: 'Advance Agreements and Resolving Allowability Questions',
      content: `
        <p>When you have significant costs that may be questioned, you can negotiate advance agreements with the government to establish allowability before costs are incurred. This provides certainty and avoids disputes during audits.</p>
        <p><strong>What is an advance agreement?</strong></p>
        <p>An advance agreement is a written understanding between the contractor and the government regarding the treatment of special or unusual costs. Once agreed, the costs are treated as allowable (or unallowable) in accordance with the agreement, eliminating later disputes.</p>
        <p><strong>When to seek an advance agreement (FAR 31.109):</strong></p>
        <ul>
          <li><strong>IR&D and B&P costs:</strong> When your IR&D/B&P spending is high relative to your business base</li>
          <li><strong>Depreciation methods:</strong> When using accelerated depreciation or unusual useful life assumptions</li>
          <li><strong>Deferred compensation:</strong> For unusual deferred compensation arrangements</li>
          <li><strong>Precontract costs:</strong> Costs incurred before contract award (at government request)</li>
          <li><strong>Relocation costs:</strong> When relocating key personnel specifically for a contract</li>
          <li><strong>Severance payments:</strong> For unusual severance or early retirement costs</li>
          <li><strong>Restructuring costs:</strong> Business combination, disposition, or restructuring costs</li>
        </ul>
        <p><strong>How to request an advance agreement:</strong></p>
        <ol>
          <li><strong>Identify the cost:</strong> Describe the cost, why it may be questioned, and why you believe it should be allowable</li>
          <li><strong>Provide cost estimate:</strong> Estimate the total cost and the portion allocable to government contracts</li>
          <li><strong>Justify allowability:</strong> Explain how the cost is reasonable, allocable, and complies with FAR</li>
          <li><strong>Submit to contracting officer:</strong> Request is typically submitted to the cognizant contracting officer or ACO (Administrative Contracting Officer)</li>
          <li><strong>Negotiate terms:</strong> Government may accept, reject, or propose modified treatment</li>
          <li><strong>Formalize in writing:</strong> Agreement must be in writing and incorporated into contracts</li>
        </ol>
        <p><strong>Benefits of advance agreements:</strong></p>
        <ul>
          <li>Eliminates uncertainty about allowability</li>
          <li>Reduces audit risk and potential disallowances</li>
          <li>Demonstrates good faith and transparency</li>
          <li>Establishes treatment for all affected contracts</li>
          <li>Saves time and cost in resolving disputes later</li>
        </ul>
        <p><strong>Limitations:</strong></p>
        <p>Advance agreements cannot make expressly unallowable costs allowable. They address costs that are allowable under FAR but may be questioned as unreasonable or not allocable. You cannot get an advance agreement to bill entertainment or lobbying costs — those are unallowable by statute.</p>
        <p><strong>Alternative: Contracting officer review before incurring costs</strong></p>
        <p>For large or unusual costs on a specific contract, you can request contracting officer approval before incurring the cost. Obtain written confirmation that the cost will be considered allowable if incurred. This is less formal than an advance agreement but provides contract-specific protection.</p>
        <p><strong>Resolving allowability disputes during audits:</strong></p>
        <p>If DCAA questions a cost during an audit:</p>
        <ol>
          <li><strong>Provide documentation:</strong> Business purpose, FAR analysis, reasonableness justification</li>
          <li><strong>Cite precedent:</strong> Reference prior audits or decisions where similar costs were accepted</li>
          <li><strong>Negotiate with ACO:</strong> DCAA makes recommendations, but the contracting officer makes final allowability determinations</li>
          <li><strong>Request reconsideration:</strong> If a cost is disallowed, you can request reconsideration with additional documentation</li>
          <li><strong>Appeals process:</strong> Final disputes can be appealed through the Contracting Officer's final decision and to boards of contract appeals</li>
        </ol>
        <p>The earlier you address potential allowability questions (ideally before incurring costs), the better your outcome and the lower your risk.</p>
      `,
    },
    {
      heading: 'Best Practices for Managing Unallowable Costs',
      content: `
        <p>Proactive management of unallowable costs reduces audit risk, avoids costly findings, and demonstrates good stewardship of government funds. Here's how to build a compliant system:</p>
        <p><strong>1. Establish clear policies and procedures</strong></p>
        <p>Create written policies defining:</p>
        <ul>
          <li>What costs are expressly unallowable (reference FAR 31.205 subsections)</li>
          <li>How to identify and code unallowable costs in the accounting system</li>
          <li>Approval requirements for potentially unallowable costs</li>
          <li>Documentation standards for questionable costs</li>
          <li>Process for requesting advance agreements or contracting officer approval</li>
        </ul>
        <p><strong>2. Train employees who incur and approve costs</strong></p>
        <p>Everyone who submits expense reports or approves expenses needs basic unallowable costs training:</p>
        <ul>
          <li>What is entertainment (unallowable) vs. business meals (allowable)</li>
          <li>Alcohol is always unallowable, even at otherwise allowable business meals</li>
          <li>Promotional items and gifts are generally unallowable</li>
          <li>Documentation requirements for allowable costs</li>
          <li>When to seek guidance before incurring questionable costs</li>
        </ul>
        <p><strong>3. Implement chart of accounts segregation</strong></p>
        <p>Structure your chart of accounts to clearly identify unallowable costs:</p>
        <ul>
          <li>Create specific GL accounts for each category of unallowable costs</li>
          <li>Separate allowable and unallowable elements of mixed categories (e.g., recruiting ads vs. promotional ads)</li>
          <li>Use account codes or flags to mark unallowable accounts</li>
          <li>Configure accounting software to exclude unallowable accounts from indirect rate calculations</li>
        </ul>
        <p><strong>4. Conduct periodic self-audits</strong></p>
        <p>Review your indirect cost pools quarterly or semi-annually:</p>
        <ul>
          <li>Sample expense reports and invoices looking for unallowable costs</li>
          <li>Review all costs in overhead and G&A pools for proper classification</li>
          <li>Verify that unallowable costs are properly excluded from indirect rate calculations</li>
          <li>Calculate whether penalty (indirect allocation to unallowables) is being applied</li>
          <li>Identify and correct any miscoded costs before DCAA discovers them</li>
        </ul>
        <p><strong>5. Maintain robust documentation</strong></p>
        <p>For costs that might be questioned, maintain documentation showing:</p>
        <ul>
          <li>Business purpose and contract relationship</li>
          <li>Reasonableness (market comparisons for professional services, per diem compliance for travel)</li>
          <li>Approvals (who authorized the expenditure and why)</li>
          <li>FAR analysis (for gray-area costs, document why you believe they're allowable)</li>
        </ul>
        <p><strong>6. Use conservative judgment</strong></p>
        <p>When a cost is questionable, err on the side of treating it as unallowable. The cost of excluding a borderline cost is usually less than the cost of defending it in an audit, potentially losing, and dealing with disallowances and penalties.</p>
        <p><strong>7. Seek expert advice</strong></p>
        <p>Engage a government contracts accountant to:</p>
        <ul>
          <li>Review your chart of accounts and coding practices</li>
          <li>Conduct periodic allowability reviews</li>
          <li>Prepare incurred cost submissions with proper unallowable cost schedules</li>
          <li>Advise on gray-area costs and advance agreement opportunities</li>
          <li>Support you during DCAA audits</li>
        </ul>
        <p><strong>8. Prepare annual incurred cost submissions properly</strong></p>
        <p>Your incurred cost submission (required for cost-reimbursement contracts) must include:</p>
        <ul>
          <li>Schedule M: Listing of unallowable costs by category</li>
          <li>Penalty calculations showing indirect allocation to unallowables</li>
          <li>Reconciliation between financial statements and claimed costs</li>
          <li>Supporting documentation for any questioned or unusual costs</li>
        </ul>
        <p>A well-prepared incurred cost submission that transparently identifies and excludes unallowables demonstrates good faith and reduces audit scrutiny.</p>
        <p><strong>The cost of noncompliance:</strong></p>
        <p>Failing to properly identify and exclude unallowable costs can result in:</p>
        <ul>
          <li>Cost disallowances requiring repayment of billed amounts</li>
          <li>Penalties equal to the unallowable costs (doubling the impact)</li>
          <li>Increased DCAA audit frequency and intensity</li>
          <li>Suspension of payments until noncompliances are resolved</li>
          <li>Damage to contractor reputation and relationships</li>
          <li>False Claims Act liability if unallowables were knowingly billed (treble damages)</li>
        </ul>
        <p>The investment in proper unallowable cost management — accounting system setup, training, self-audits, professional support — is far less than the cost of findings and penalties.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'What is the penalty for billing unallowable costs to the government?',
      answer:
        'For expressly unallowable costs that are knowingly included in indirect cost pools or billed as direct costs, FAR 42.709 allows the government to assess a penalty equal to the amount of the unallowable costs (effectively doubling the repayment). This is in addition to repaying the unallowable costs themselves. "Knowingly" means you had actual knowledge or should have known through reasonable diligence. For fraudulent billing of unallowables, False Claims Act penalties (treble damages plus statutory penalties) may apply.',
    },
    {
      question: 'Are business meals allowable on government contracts?',
      answer:
        'Business meals can be allowable if they are reasonable in cost and the primary purpose is substantive business discussion related to contracts or business operations. However, meals that are primarily for entertainment, social, or recreational purposes are unallowable even if business is incidentally discussed. Documentation should include attendees, business purpose, and topics. Meals at sporting events, concerts, or entertainment venues are presumed unallowable. Alcohol is always unallowable.',
    },
    {
      question: 'How do I know if a cost is unallowable?',
      answer:
        'Review FAR Part 31, specifically FAR 31.205 which contains 52 subsections detailing allowability of specific cost types. A cost must be reasonable, allocable, consistently treated, compliant with GAAP/CAS, and not expressly unallowable. When in doubt, consult a government contracts accountant, seek an advance agreement with the contracting officer, or take the conservative approach and treat the cost as unallowable. FAR Part 31 is the authoritative source.',
    },
    {
      question: 'What is the difference between unallowable and unreasonable costs?',
      answer:
        'Unallowable costs are those that FAR Part 31 explicitly prohibits from billing to government contracts (entertainment, lobbying, etc.) regardless of amount. Unreasonable costs are those that may be allowable in principle but are excessive in amount relative to the benefit or market norms (e.g., a $500 business lunch, first-class airfare when not required). Unreasonable costs can be disallowed even if the cost category is generally allowable.',
    },
    {
      question: 'Do unallowable costs have to be excluded from fixed-price contracts?',
      answer:
        'For firm-fixed-price contracts, you can technically include unallowable costs in your pricing since the government is paying a lump sum, not reimbursing actual costs. However, if the government requests cost or pricing data during negotiations (contracts over $2M), unallowable costs must be identified and excluded from the cost buildup used for negotiation. Including unallowable costs in certified cost data can result in defective pricing liability. Best practice is to exclude unallowables from all government contract pricing.',
    },
    {
      question: 'Can I charge recruiting and help-wanted advertising to government contracts?',
      answer:
        'Yes. Advertising for recruiting employees (help-wanted ads, job fair costs, recruiting website expenses) is allowable under FAR 31.205-1 as long as the costs are reasonable. This is an exception to the general prohibition on advertising. However, brand promotion, corporate image advertising, and marketing are unallowable. Ensure recruiting advertising is coded separately from promotional advertising in your accounting system.',
    },
    {
      question: 'What happens if I discover unallowable costs were miscoded as allowable?',
      answer:
        'Conduct a self-audit to quantify the impact, correct your accounting records going forward, calculate the amount billed to government contracts (if any), notify your contracting officer and DCAA of the error, and propose a corrective action plan including repayment if costs were already billed. Voluntary disclosure demonstrates good faith and may avoid penalties. Waiting for DCAA to discover the issue results in harsher treatment. Engage a government contracts accountant to help with the correction and disclosure.',
    },
    {
      question: 'Are marketing and business development costs allowable?',
      answer:
        'It depends. Costs to sell your existing capabilities to potential customers (business development, proposal preparation, marketing specific to government opportunities) are generally allowable as Bid and Proposal (B&P) costs under FAR 31.205-18. However, general corporate image advertising, brand promotion, public relations, and marketing to enhance reputation are unallowable. The distinction is whether the cost is directly related to securing specific contracts (allowable) or promoting the company generally (unallowable).',
    },
  ],
  cta: {
    heading: 'Master Cost Principles and Unallowable Costs',
    description:
      'Understanding FAR Part 31 cost principles, identifying unallowable costs, and maintaining compliant accounting systems are essential for government contractors. Learn the fundamentals in our free course.',
    buttonText: 'Start the Free Course',
    buttonHref: '/free-course',
  },
  relatedGuides: [
    'cost-accounting-standards',
    'dcaa-audits',
    'indirect-rates',
    'cost-proposals',
    'rate-development',
    'cost-plus-contracts',
    'far-overview',
  ],
  publishedDate: '2026-04-07',
};
