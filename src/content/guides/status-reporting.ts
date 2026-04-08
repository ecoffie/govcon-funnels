import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'status-reporting',
  title: 'Contract Status Reporting: Keeping Government Customers Informed',
  metaTitle: 'Status Reporting Guide — Monthly Reports, Metrics & CDRL Requirements',
  metaDescription:
    'Learn how to create effective contract status reports: report types, required content, KPIs and metrics, common mistakes, and best practices for government contract reporting.',
  keywords: [
    'status reporting',
    'contract reporting',
    'monthly status report',
    'CDRL reporting',
    'progress reports',
    'government contract reports',
    'project status',
    'performance reporting',
    'contract metrics',
    'status update',
  ],
  heroSubtitle:
    'Status reporting keeps your government customer informed, demonstrates progress, and provides early warning of issues. Good reporting builds trust; poor reporting triggers surveillance.',
  sections: [
    {
      heading: 'Why Status Reporting Matters',
      content: `
        <p><strong>Status reporting</strong> provides regular updates on contract performance, progress toward milestones, and issues requiring attention. It's required by most contracts and critical for relationship management.</p>
        <p><strong>Purpose of status reports:</strong></p>
        <ul>
          <li><strong>Demonstrate progress</strong> — Show you're on track and delivering value</li>
          <li><strong>Build confidence</strong> — Regular updates prevent government surprises</li>
          <li><strong>Early problem identification</strong> — Surface issues while solutions are still available</li>
          <li><strong>Document performance</strong> — Creates record for <a href="/guides/cpars">CPARS</a> and future competitions</li>
          <li><strong>Meet contractual obligations</strong> — Often a required <a href="/guides/deliverables-management">deliverable</a></li>
        </ul>
        <p><strong>What happens without good reporting:</strong></p>
        <ul>
          <li>Government assumes the worst</li>
          <li>Increased <a href="/guides/contract-surveillance">surveillance</a> and oversight</li>
          <li>Relationship deteriorates</li>
          <li>Lower CPARS ratings</li>
          <li>Option year at risk</li>
        </ul>
        <p><strong>The reporting paradox:</strong></p>
        <p>When things are going well, reporting feels like busywork. When things go poorly, you avoid reporting. Both are mistakes. Consistent reporting in good times builds credibility for when you need to report problems.</p>
      `,
    },
    {
      heading: 'Types of Status Reports',
      content: `
        <p><strong>1. Monthly Status Reports (MSR):</strong></p>
        <p>Most common format. Summary of progress, metrics, accomplishments, issues, and next month's plans.</p>
        <ul>
          <li><strong>Frequency:</strong> Monthly, typically due 5-10 days after month-end</li>
          <li><strong>Length:</strong> 3-8 pages</li>
          <li><strong>Format:</strong> Usually specified in contract (Word, PDF, slide deck)</li>
        </ul>
        <p><strong>2. Quarterly Progress Reports (QPR):</strong></p>
        <p>More detailed than monthly, with trend analysis and forward-looking strategy.</p>
        <ul>
          <li><strong>Frequency:</strong> Quarterly</li>
          <li><strong>Length:</strong> 8-15 pages</li>
          <li><strong>Focus:</strong> Accomplishments, metrics trends, risks, strategic direction</li>
        </ul>
        <p><strong>3. CDRL Data Items:</strong></p>
        <p>Contract Data Requirements List items — formal <a href="/guides/deliverables-management">deliverables</a> with specific formats defined in DD Form 1423.</p>
        <ul>
          <li>Exact content, format, and submission specified</li>
          <li>May include technical reports, test results, documentation</li>
          <li>Late or non-conforming submission can trigger cure notices</li>
        </ul>
        <p><strong>4. Earned Value Management (EVM) Reports:</strong></p>
        <p>Required for large contracts ($20M+ for DoD). Detailed cost and schedule performance analysis using <a href="/guides/earned-value-management">EVM</a> methodology.</p>
        <ul>
          <li>CPR (Contract Performance Report) — Integrated cost/schedule data</li>
          <li>IPMR (Integrated Program Management Report) — Format 1-5 reports</li>
          <li>Requires certified EVMS (Earned Value Management System)</li>
        </ul>
        <p><strong>5. Financial/Cost Reports:</strong></p>
        <p>Budget vs. actual, burn rate, cost variance. Required for cost-type contracts.</p>
        <ul>
          <li>Shows funds expended vs. remaining</li>
          <li>Projects completion within budget</li>
          <li>Supports <a href="/guides/invoice-processing">invoicing</a> and funding decisions</li>
        </ul>
        <p><strong>6. Technical Progress Reports:</strong></p>
        <p>Deep dives into technical work — research findings, test results, development status.</p>
        <ul>
          <li>Common in R&D contracts and <a href="/guides/sbir-sttr">SBIR/STTR</a></li>
          <li>May include data, charts, analysis</li>
          <li>Often peer-reviewed or published</li>
        </ul>
      `,
    },
    {
      heading: 'What to Include in Status Reports',
      content: `
        <p><strong>Standard monthly status report sections:</strong></p>
        <p><strong>1. Executive Summary (1 paragraph)</strong></p>
        <ul>
          <li>Overall status: Green/Yellow/Red</li>
          <li>Top accomplishments this period</li>
          <li>Critical issues requiring attention</li>
        </ul>
        <p><strong>2. Progress Summary</strong></p>
        <ul>
          <li>Work completed this period</li>
          <li>Milestones achieved</li>
          <li>Deliverables submitted</li>
          <li>Percentage complete overall</li>
        </ul>
        <p><strong>3. Key Metrics and KPIs</strong></p>
        <ul>
          <li>Schedule performance (on time, ahead, behind)</li>
          <li>Cost performance (budget status, burn rate)</li>
          <li>Quality metrics (defect rates, rework, acceptance rates)</li>
          <li>Customer satisfaction indicators</li>
        </ul>
        <p><strong>4. Issues and Risks</strong></p>
        <ul>
          <li>Problems encountered</li>
          <li>Potential risks to schedule/budget/quality</li>
          <li>Mitigation actions taken or planned</li>
          <li>Government support needed</li>
        </ul>
        <p><strong>5. Upcoming Activities</strong></p>
        <ul>
          <li>Next month's planned work</li>
          <li>Upcoming milestones and deliverables</li>
          <li>Decisions needed from government</li>
        </ul>
        <p><strong>6. Staffing/Personnel</strong></p>
        <ul>
          <li>Key personnel changes</li>
          <li>Staffing levels vs. plan</li>
          <li>Hiring in progress</li>
        </ul>
        <p><strong>7. Subcontractor Status</strong></p>
        <ul>
          <li>Major sub accomplishments</li>
          <li>Sub performance issues</li>
          <li>Sub invoicing status</li>
        </ul>
        <p><strong>Optional sections (contract-specific):</strong></p>
        <ul>
          <li>Customer feedback or survey results</li>
          <li>Lessons learned</li>
          <li>Process improvements implemented</li>
          <li>Safety incidents/near misses</li>
          <li>Security incidents</li>
        </ul>
      `,
    },
    {
      heading: 'Metrics and KPIs to Track',
      content: `
        <p><strong>Schedule metrics:</strong></p>
        <ul>
          <li><strong>On-time delivery rate</strong> — % of deliverables submitted on time</li>
          <li><strong>Milestone completion</strong> — Planned vs. actual milestone dates</li>
          <li><strong>Schedule variance (SV)</strong> — Difference between planned and actual progress</li>
          <li><strong>Critical path status</strong> — Are critical tasks on track?</li>
        </ul>
        <p><strong>Cost metrics:</strong></p>
        <ul>
          <li><strong>Budget variance</strong> — Actual cost vs. planned cost</li>
          <li><strong>Burn rate</strong> — Monthly spending rate vs. budget allocation</li>
          <li><strong>Cost performance index (CPI)</strong> — EVM metric: earned value / actual cost</li>
          <li><strong>Estimate at completion (EAC)</strong> — Projected final cost</li>
        </ul>
        <p><strong>Quality metrics:</strong></p>
        <ul>
          <li><strong>First-time acceptance rate</strong> — % of deliverables accepted without rework</li>
          <li><strong>Defect rate</strong> — Bugs, errors, deficiencies per deliverable</li>
          <li><strong>Rework hours</strong> — Time spent fixing rejected work</li>
          <li><strong>Customer satisfaction scores</strong> — Survey results or feedback ratings</li>
        </ul>
        <p><strong>Service-specific metrics:</strong></p>
        <ul>
          <li><strong>Service level agreement (SLA) compliance</strong> — % of SLAs met</li>
          <li><strong>Response time</strong> — Average time to respond to requests</li>
          <li><strong>Resolution time</strong> — Average time to close tickets/issues</li>
          <li><strong>Availability/uptime</strong> — System or service availability percentage</li>
        </ul>
        <p><strong>Staffing metrics:</strong></p>
        <ul>
          <li><strong>Labor hours</strong> — Actual vs. planned hours</li>
          <li><strong>Staffing levels</strong> — FTEs vs. authorized staffing plan</li>
          <li><strong>Key personnel turnover</strong> — Changes in critical roles</li>
          <li><strong>Clearance status</strong> — % of staff with required clearances</li>
        </ul>
        <p><strong>Choosing the right metrics:</strong></p>
        <p>Don't report 30 metrics. Choose 5-8 that matter most for your contract. Align with government priorities and contract incentives.</p>
      `,
    },
    {
      heading: 'Report Format and Presentation',
      content: `
        <p><strong>Follow contract specifications:</strong></p>
        <p>If the contract specifies format (Word, Excel, slide deck, specific template), use it. Deviating triggers compliance issues.</p>
        <p><strong>Use visual elements:</strong></p>
        <ul>
          <li><strong>Status indicators</strong> — Green/Yellow/Red (or ✓/⚠/✗)</li>
          <li><strong>Charts and graphs</strong> — Trends over time, before/after comparisons</li>
          <li><strong>Dashboards</strong> — At-a-glance summary of key metrics</li>
          <li><strong>Gantt charts</strong> — Schedule status and upcoming milestones</li>
        </ul>
        <p><strong>Write clearly and concisely:</strong></p>
        <ul>
          <li>Use active voice</li>
          <li>Avoid jargon unless contract-specific</li>
          <li>Be specific: "Completed 3 of 4 milestones" not "Made good progress"</li>
          <li>Front-load key information (busy readers skim)</li>
        </ul>
        <p><strong>Balance detail and brevity:</strong></p>
        <ul>
          <li>Executive summary: 1 paragraph</li>
          <li>Section summaries: 2-3 sentences</li>
          <li>Supporting detail: Appendices or attachments</li>
        </ul>
        <p><strong>Standard color coding:</strong></p>
        <ul>
          <li><strong>Green:</strong> On track, no issues</li>
          <li><strong>Yellow:</strong> Caution, minor issues, watching closely</li>
          <li><strong>Red:</strong> At risk, major issues, government action needed</li>
        </ul>
        <p><strong>Template consistency:</strong></p>
        <p>Use the same template every month. Consistency makes it easy for government readers to find information quickly. Don't reinvent the wheel monthly.</p>
        <p><strong>Branding (optional):</strong></p>
        <p>Light branding (logo, color scheme) is fine, but don't make it look like marketing. This is a contract deliverable, not a sales pitch.</p>
      `,
    },
    {
      heading: 'Reporting on Problems',
      content: `
        <p><strong>The trust equation:</strong></p>
        <p>Government customers trust contractors who surface problems early, not contractors who pretend everything is fine until it's a crisis.</p>
        <p><strong>How to report bad news:</strong></p>
        <p><strong>1. Be transparent and timely:</strong></p>
        <ul>
          <li>Report problems when discovered, not when convenient</li>
          <li>Don't bury bad news in page 8 of the report</li>
          <li>For critical issues, notify before the monthly report</li>
        </ul>
        <p><strong>2. Provide context:</strong></p>
        <ul>
          <li>What happened and when</li>
          <li>Root cause (if known)</li>
          <li>Impact on schedule, cost, quality</li>
        </ul>
        <p><strong>3. Present solutions, not just problems:</strong></p>
        <ul>
          <li>Mitigation actions already taken</li>
          <li>Proposed path forward</li>
          <li>Government support needed (if any)</li>
          <li>Contingency plans if initial solution fails</li>
        </ul>
        <p><strong>4. Show accountability:</strong></p>
        <ul>
          <li>Own contractor-caused issues (don't blame subs or government)</li>
          <li>Be honest about what you don't yet know</li>
          <li>Commit to follow-up timeline</li>
        </ul>
        <p><strong>Example — Bad way to report:</strong></p>
        <blockquote class="border-l-4 border-red-600 pl-4 italic my-4">
          "We're experiencing some delays on Task 3 due to unforeseen challenges."
        </blockquote>
        <p><strong>Example — Good way to report:</strong></p>
        <blockquote class="border-l-4 border-blue-600 pl-4 my-4">
          "Task 3 milestone will be 2 weeks late (from May 15 to May 29) due to database integration complexity not identified during planning. We've added a senior architect to the team, revised the technical approach, and de-risked the remaining work. Downstream milestones are unaffected because we're absorbing the delay during internal testing. We'll provide a detailed lessons-learned in next month's report."
        </blockquote>
        <p><strong>When to escalate beyond the report:</strong></p>
        <ul>
          <li>Major milestone at risk</li>
          <li>Budget overrun likely</li>
          <li>Safety or security incident</li>
          <li>Need for <a href="/guides/contract-modifications">contract modification</a></li>
        </ul>
        <p>Don't let the COR learn about major problems from your monthly report. Call first, then document in writing.</p>
      `,
    },
    {
      heading: 'Common Reporting Mistakes',
      content: `
        <p><strong>1. Late submission:</strong></p>
        <ul>
          <li>Damages credibility immediately</li>
          <li>Violates contract terms</li>
          <li>Sets pattern of unreliability</li>
        </ul>
        <p><strong>Fix:</strong> Build reporting into your monthly calendar. Set internal deadline 3 days before contract due date.</p>
        <p><strong>2. Vague or generic content:</strong></p>
        <ul>
          <li>"Progress continues as planned"</li>
          <li>"All tasks on schedule"</li>
          <li>No specific accomplishments listed</li>
        </ul>
        <p><strong>Fix:</strong> Use numbers and specifics. "Completed 47 user interviews across 8 agencies."</p>
        <p><strong>3. All green, all the time:</strong></p>
        <ul>
          <li>Government doesn't believe it</li>
          <li>When real problems arise, you've lost credibility</li>
          <li>Suggests lack of insight or honesty</li>
        </ul>
        <p><strong>Fix:</strong> Show yellow status on minor issues you're addressing. Demonstrates vigilance.</p>
        <p><strong>4. Too much detail:</strong></p>
        <ul>
          <li>15-page reports no one reads</li>
          <li>Obscures key information in minutiae</li>
          <li>Wastes everyone's time</li>
        </ul>
        <p><strong>Fix:</strong> Executive summary + moderate detail + appendices for deep dives.</p>
        <p><strong>5. No forward look:</strong></p>
        <ul>
          <li>Only reports past activity</li>
          <li>Doesn't preview upcoming work</li>
          <li>Misses chance to set expectations</li>
        </ul>
        <p><strong>Fix:</strong> Always include "Next Month" or "Upcoming" section with planned work.</p>
        <p><strong>6. Inconsistent metrics:</strong></p>
        <ul>
          <li>Different metrics each month</li>
          <li>Can't see trends or progress</li>
          <li>Looks disorganized</li>
        </ul>
        <p><strong>Fix:</strong> Track same core metrics every month. Add ad-hoc metrics as needed, but keep core consistent.</p>
        <p><strong>7. Ignoring feedback:</strong></p>
        <ul>
          <li>Government asks for specific information</li>
          <li>You don't add it to next report</li>
          <li>Forces them to keep asking</li>
        </ul>
        <p><strong>Fix:</strong> When government requests additional info, incorporate it into your standard template.</p>
      `,
    },
    {
      heading: 'Best Practices for Effective Reporting',
      content: `
        <p><strong>1. Establish a reporting rhythm:</strong></p>
        <ul>
          <li>Same day each month (e.g., 5th business day)</li>
          <li>Internal draft review before submission</li>
          <li>PM and contracts both review before sending</li>
        </ul>
        <p><strong>2. Maintain a running log:</strong></p>
        <ul>
          <li>Track accomplishments as they happen</li>
          <li>Note issues when they arise</li>
          <li>Don't try to remember a month's worth of work at deadline</li>
        </ul>
        <p><strong>3. Use data, not adjectives:</strong></p>
        <ul>
          <li>"Completed 12 of 15 tasks (80%)" not "Made excellent progress"</li>
          <li>"Reduced response time from 4 hours to 2 hours" not "Improved significantly"</li>
          <li>"3 deliverables accepted first submission" not "High quality work"</li>
        </ul>
        <p><strong>4. Align with government priorities:</strong></p>
        <ul>
          <li>What does the COR/PM care about most?</li>
          <li>Lead with those topics</li>
          <li>Show progress on their hot buttons</li>
        </ul>
        <p><strong>5. Tell a story:</strong></p>
        <ul>
          <li>Connect monthly progress to long-term goals</li>
          <li>Show how this month's work enables next month's</li>
          <li>Demonstrate cumulative value delivery</li>
        </ul>
        <p><strong>6. Proofread:</strong></p>
        <ul>
          <li>Typos undermine credibility</li>
          <li>Wrong contract number or period is embarrassing</li>
          <li>Have someone else review before submission</li>
        </ul>
        <p><strong>7. Archive systematically:</strong></p>
        <ul>
          <li>Keep all reports in organized folder structure</li>
          <li>Useful for <a href="/guides/cpars">CPARS</a> self-assessment</li>
          <li>Reference for future <a href="/guides/past-performance">past performance</a> proposals</li>
          <li>Required for record retention</li>
        </ul>
        <p><strong>8. Solicit feedback:</strong></p>
        <p>Periodically ask the COR: "Is our reporting format working for you? Anything you'd like to see added or changed?"</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'What if my contract doesn\'t specify a reporting requirement?',
      answer:
        'Provide monthly updates anyway, even if informal. Regular communication builds relationships and prevents problems. A brief email summary is better than silence.',
    },
    {
      question: 'How detailed should status reports be?',
      answer:
        '3-8 pages for monthly reports is typical. Enough detail to show progress and identify issues, but concise enough that busy government readers will actually read it. Match detail level to contract size and complexity.',
    },
    {
      question: 'Can I automate status reporting?',
      answer:
        'You can automate data collection (pulling metrics from project management tools), but narrative sections require human judgment. Automated reports often feel generic and miss nuance.',
    },
    {
      question: 'What happens if I submit a report late?',
      answer:
        'First offense may get a warning. Repeated lateness can trigger cure notice, impact CPARS, or even default proceedings. Late deliverables are a compliance failure, not an administrative hiccup.',
    },
    {
      question: 'Should I send reports to anyone beyond the COR?',
      answer:
        'Check contract — it may specify distribution list. Typically COR + PM, sometimes CO. Don\'t spam a dozen people unless instructed. Follow government preferences.',
    },
    {
      question: 'What if nothing significant happened this month?',
      answer:
        'Still report. Note routine activities, steady progress, upcoming work. "Steady as planned" is a valid status. Silence creates vacuum that government fills with assumptions (usually negative).',
    },
    {
      question: 'How do I report bad news without panicking the government?',
      answer:
        'Be honest about the problem, its impact, and your mitigation plan. Show you\'re in control and solving it. Context and solutions prevent panic. Hiding problems until they\'re crises causes panic.',
    },
    {
      question: 'Do status reports affect CPARS ratings?',
      answer:
        'Absolutely. Quality of reporting demonstrates professionalism and communication. Government reviews your reports when writing CPARS. Poor reporting = lower quality/management ratings.',
    },
  ],
  cta: {
    heading: 'Master Contract Reporting',
    description:
      'Effective status reporting builds trust, demonstrates progress, and protects your reputation. Our team helps you develop reporting processes and templates that work.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'deliverables-management',
    'earned-value-management',
    'kick-off-meetings',
    'contract-surveillance',
    'cpars',
  ],
  publishedDate: '2026-04-07',
};
