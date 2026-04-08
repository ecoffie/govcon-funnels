import type { GuideData } from './index';

export const guide: GuideData = {
  slug: 'earned-value-management',
  title: 'Earned Value Management (EVM): Tracking Cost and Schedule Performance',
  metaTitle: 'EVM Guide — Earned Value Management, CPI, SPI & EVMS Compliance',
  metaDescription:
    'Learn Earned Value Management (EVM): when it\'s required, key metrics (CPI, SPI, EAC), EVMS certification, reporting requirements, and how to implement EVM on government contracts.',
  keywords: [
    'earned value management',
    'EVM',
    'EVMS',
    'CPI',
    'SPI',
    'earned value',
    'cost performance index',
    'schedule performance index',
    'EVMS certification',
    'contract performance report',
  ],
  heroSubtitle:
    'Earned Value Management (EVM) integrates cost, schedule, and technical performance into a single measurement system. Required on major DoD contracts, it provides early warning of cost overruns and schedule delays.',
  sections: [
    {
      heading: 'What Is Earned Value Management?',
      content: `
        <p><strong>Earned Value Management (EVM)</strong> is a project management technique that measures performance by comparing planned work (budget) against work completed (earned value) and actual costs incurred.</p>
        <p><strong>Why EVM exists:</strong></p>
        <p>Traditional metrics are misleading. You can be on budget but behind schedule, or on schedule but over budget. EVM integrates both dimensions to show true project health.</p>
        <p><strong>The three key values:</strong></p>
        <ul>
          <li><strong>Planned Value (PV)</strong> — Budgeted cost of work scheduled to be completed by a certain date</li>
          <li><strong>Earned Value (EV)</strong> — Budgeted cost of work actually completed by that date</li>
          <li><strong>Actual Cost (AC)</strong> — Actual cost incurred for work completed by that date</li>
        </ul>
        <p><strong>Simple example:</strong></p>
        <p>You planned to spend $100K by end of month to complete 10 tasks (PV = $100K). You actually completed 8 tasks, which were budgeted at $80K (EV = $80K). But you spent $90K to complete them (AC = $90K).</p>
        <ul>
          <li>You're behind schedule (only 8 of 10 tasks done)</li>
          <li>You're over budget ($90K spent for $80K of work)</li>
        </ul>
        <p><strong>EVM vs. EVMS:</strong></p>
        <ul>
          <li><strong>EVM</strong> — The methodology/technique</li>
          <li><strong>EVMS</strong> — Earned Value Management System: the processes, tools, and organization to implement EVM, certified to meet 32 guidelines in ANSI/EIA-748</li>
        </ul>
      `,
    },
    {
      heading: 'When EVM Is Required',
      content: `
        <p><strong>DoD contracts:</strong></p>
        <ul>
          <li><strong>$20M+</strong> — EVM required</li>
          <li><strong>$50M+</strong> — EVMS compliance required (DoDI 5000.91)</li>
          <li>Applies to development, modernization, major modifications</li>
        </ul>
        <p><strong>Other federal agencies:</strong></p>
        <ul>
          <li>Varies by agency (NASA, DOE, DHS have their own thresholds)</li>
          <li>Typically $20M+ for major programs</li>
          <li>Check agency-specific acquisition regulations</li>
        </ul>
        <p><strong>EVMS compliance requirement:</strong></p>
        <p>If your contract requires EVMS compliance, your system must be certified. This involves:</p>
        <ul>
          <li>Integrated Baseline Review (IBR)</li>
          <li>EVMS compliance review by DCMA or customer</li>
          <li>Meeting all 32 ANSI/EIA-748 guidelines</li>
          <li>Ongoing surveillance to maintain certification</li>
        </ul>
        <p><strong>Subcontractor flowdown:</strong></p>
        <p>If you're a prime with EVMS requirement, you must flow it down to major subs (typically subs with $50M+ effort or critical path work).</p>
        <p><strong>Voluntary EVM:</strong></p>
        <p>Some contractors use EVM on smaller contracts for better visibility, even when not required. Good practice for complex programs.</p>
      `,
    },
    {
      heading: 'Key EVM Metrics and Formulas',
      content: `
        <p><strong>Variance metrics:</strong></p>
        <p><strong>Schedule Variance (SV):</strong></p>
        <ul>
          <li><strong>Formula:</strong> SV = EV - PV</li>
          <li><strong>Meaning:</strong> Difference between work completed and work planned</li>
          <li><strong>Positive SV:</strong> Ahead of schedule</li>
          <li><strong>Negative SV:</strong> Behind schedule</li>
        </ul>
        <p><strong>Cost Variance (CV):</strong></p>
        <ul>
          <li><strong>Formula:</strong> CV = EV - AC</li>
          <li><strong>Meaning:</strong> Difference between value earned and actual cost</li>
          <li><strong>Positive CV:</strong> Under budget</li>
          <li><strong>Negative CV:</strong> Over budget</li>
        </ul>
        <p><strong>Performance indices:</strong></p>
        <p><strong>Schedule Performance Index (SPI):</strong></p>
        <ul>
          <li><strong>Formula:</strong> SPI = EV / PV</li>
          <li><strong>Interpretation:</strong></li>
          <li>SPI > 1.0: Ahead of schedule</li>
          <li>SPI = 1.0: On schedule</li>
          <li>SPI < 1.0: Behind schedule</li>
          <li><strong>Example:</strong> SPI = 0.85 means you're completing work at 85% of planned rate</li>
        </ul>
        <p><strong>Cost Performance Index (CPI):</strong></p>
        <ul>
          <li><strong>Formula:</strong> CPI = EV / AC</li>
          <li><strong>Interpretation:</strong></li>
          <li>CPI > 1.0: Under budget (good efficiency)</li>
          <li>CPI = 1.0: On budget</li>
          <li>CPI < 1.0: Over budget</li>
          <li><strong>Example:</strong> CPI = 0.90 means you're getting $0.90 of value for every $1.00 spent</li>
        </ul>
        <p><strong>Forecasting metrics:</strong></p>
        <p><strong>Estimate at Completion (EAC):</strong></p>
        <ul>
          <li><strong>Formula:</strong> EAC = BAC / CPI (most common)</li>
          <li><strong>Meaning:</strong> Projected final cost based on current performance</li>
          <li><strong>BAC:</strong> Budget at Completion (original budget)</li>
          <li><strong>Example:</strong> $10M contract, CPI = 0.85 → EAC = $11.76M (overrun)</li>
        </ul>
        <p><strong>Estimate to Complete (ETC):</strong></p>
        <ul>
          <li><strong>Formula:</strong> ETC = EAC - AC</li>
          <li><strong>Meaning:</strong> How much more money is needed to finish</li>
        </ul>
        <p><strong>Variance at Completion (VAC):</strong></p>
        <ul>
          <li><strong>Formula:</strong> VAC = BAC - EAC</li>
          <li><strong>Meaning:</strong> Projected final overrun or underrun</li>
          <li><strong>Negative VAC:</strong> Overrun expected</li>
        </ul>
        <p><strong>To-Complete Performance Index (TCPI):</strong></p>
        <ul>
          <li><strong>Formula:</strong> TCPI = (BAC - EV) / (BAC - AC)</li>
          <li><strong>Meaning:</strong> CPI needed on remaining work to stay on budget</li>
          <li><strong>Example:</strong> TCPI = 1.15 means you need 15% better efficiency than original plan to finish on budget</li>
        </ul>
      `,
    },
    {
      heading: 'EVMS Compliance and Certification',
      content: `
        <p><strong>The 32 ANSI/EIA-748 guidelines:</strong></p>
        <p>Organized into 5 categories:</p>
        <p><strong>1. Organization (5 guidelines):</strong></p>
        <ul>
          <li>Define work scope</li>
          <li>Identify organization responsible for work</li>
          <li>Integrate planning, budgeting, scheduling, and cost accumulation</li>
        </ul>
        <p><strong>2. Planning, Scheduling, and Budgeting (10 guidelines):</strong></p>
        <ul>
          <li>Schedule work with defined start/finish dates</li>
          <li>Identify products, milestones, technical performance</li>
          <li>Establish time-phased budgets</li>
          <li>Establish overhead budgets</li>
          <li>Identify management reserves</li>
        </ul>
        <p><strong>3. Accounting Considerations (6 guidelines):</strong></p>
        <ul>
          <li>Record direct costs at lowest WBS level</li>
          <li>Summarize costs to WBS and organizational elements</li>
          <li>Record overhead on consistent basis</li>
          <li>Identify unit costs/equivalent units</li>
        </ul>
        <p><strong>4. Analysis and Management Reports (7 guidelines):</strong></p>
        <ul>
          <li>Use data for internal management</li>
          <li>Provide data to customer at WBS/organizational levels</li>
          <li>Implement managerial actions based on data</li>
          <li>Reconcile original and current budgets</li>
        </ul>
        <p><strong>5. Revisions and Data Maintenance (4 guidelines):</strong></p>
        <ul>
          <li>Incorporate authorized changes promptly</li>
          <li>Reconcile budgets to authorized changes</li>
          <li>Control retroactive changes</li>
          <li>Prevent unauthorized revisions to records</li>
        </ul>
        <p><strong>Getting certified:</strong></p>
        <p><strong>1. Integrated Baseline Review (IBR):</strong></p>
        <ul>
          <li>Joint government-contractor review of performance measurement baseline</li>
          <li>Typically within 6 months of contract award</li>
          <li>Validates baseline is realistic and complete</li>
        </ul>
        <p><strong>2. Compliance review:</strong></p>
        <ul>
          <li>DCMA or customer evaluates your EVMS</li>
          <li>Reviews policies, procedures, tools, data</li>
          <li>Interviews staff to verify implementation</li>
          <li>Issues compliance determination</li>
        </ul>
        <p><strong>3. Ongoing surveillance:</strong></p>
        <ul>
          <li>Periodic DCMA reviews to maintain certification</li>
          <li>Typically annual or biennial</li>
          <li>Can lose certification if system degrades</li>
        </ul>
        <p><strong>Cost of EVMS:</strong></p>
        <p>Implementing compliant EVMS costs $500K-$2M+ for initial setup (software, training, staff, processes). Annual operating cost: 1-3% of contract value. Only worthwhile on large programs.</p>
      `,
    },
    {
      heading: 'EVM Reporting Requirements',
      content: `
        <p><strong>Contract Performance Report (CPR):</strong></p>
        <p>Standard DoD EVM report format, submitted monthly or as specified in contract.</p>
        <p><strong>CPR Formats:</strong></p>
        <ul>
          <li><strong>Format 1:</strong> Work Breakdown Structure (WBS) summary</li>
          <li><strong>Format 2:</strong> Organizational category summary</li>
          <li><strong>Format 3:</strong> Baseline information</li>
          <li><strong>Format 4:</strong> Staffing information</li>
          <li><strong>Format 5:</strong> Narrative analysis</li>
        </ul>
        <p><strong>Integrated Program Management Report (IPMR):</strong></p>
        <p>Replaced CPR in 2012. Similar content, different format. More integrated view of cost/schedule/technical performance.</p>
        <p><strong>IPMR formats:</strong></p>
        <ul>
          <li><strong>Format 1:</strong> WBS summary</li>
          <li><strong>Format 2:</strong> Organizational category summary</li>
          <li><strong>Format 3:</strong> Baseline summary</li>
          <li><strong>Format 4:</strong> Staffing summary</li>
          <li><strong>Format 5:</strong> Narrative</li>
          <li><strong>Format 6:</strong> Subcontractor summary (if applicable)</li>
          <li><strong>Format 7:</strong> Supplemental info (optional)</li>
        </ul>
        <p><strong>Submission frequency:</strong></p>
        <ul>
          <li>Typically monthly, due 15-20 days after month-end</li>
          <li>Some contracts require quarterly</li>
          <li>Check CDRL (Contract Data Requirements List) for specifics</li>
        </ul>
        <p><strong>Common EVM reporting challenges:</strong></p>
        <ul>
          <li>Data collection from multiple systems (accounting, project management, timekeeping)</li>
          <li>Ensuring consistency across formats</li>
          <li>Meeting tight deadlines after month close</li>
          <li>Explaining variances in Format 5 narrative</li>
          <li>Reconciling subcontractor data</li>
        </ul>
      `,
    },
    {
      heading: 'Interpreting EVM Data',
      content: `
        <p><strong>Healthy project indicators:</strong></p>
        <ul>
          <li>CPI > 0.95 (preferably > 1.0)</li>
          <li>SPI > 0.95 (preferably > 1.0)</li>
          <li>Variances are small and explained</li>
          <li>Trends are stable or improving</li>
          <li>EAC is at or below BAC</li>
        </ul>
        <p><strong>Warning signs:</strong></p>
        <ul>
          <li><strong>CPI < 0.90:</strong> Significant cost inefficiency, unlikely to recover</li>
          <li><strong>SPI < 0.90:</strong> Seriously behind schedule</li>
          <li><strong>Declining trend:</strong> CPI/SPI getting worse each month</li>
          <li><strong>TCPI > 1.10:</strong> Need unrealistic efficiency improvement to finish on budget</li>
        </ul>
        <p><strong>The "CPI is king" rule:</strong></p>
        <p>Industry data shows CPI stabilizes early (around 20% complete) and rarely improves. If your CPI is 0.85 at 20% complete, you'll likely finish at 0.85. Don't assume you'll "make it up later."</p>
        <p><strong>Schedule vs. cost tradeoffs:</strong></p>
        <ul>
          <li><strong>High SPI, low CPI:</strong> Accelerating schedule at cost of efficiency (throwing money at problem)</li>
          <li><strong>Low SPI, high CPI:</strong> Going slow but efficiently (may miss deadlines to save money)</li>
        </ul>
        <p><strong>Common misinterpretations:</strong></p>
        <ul>
          <li><strong>Mistake:</strong> "We're 50% through the timeline, so 50% done."</li>
          <li><strong>Reality:</strong> Check SPI. You might be 40% done (SPI = 0.80) or 60% done (SPI = 1.20).</li>
        </ul>
        <ul>
          <li><strong>Mistake:</strong> "We've spent $5M of $10M, so we're on budget."</li>
          <li><strong>Reality:</strong> Check CPI. If CPI = 0.85, you got $4.25M of work for $5M spent (overrunning).</li>
        </ul>
      `,
    },
    {
      heading: 'Implementing EVM',
      content: `
        <p><strong>Step 1: Define the Work Breakdown Structure (WBS):</strong></p>
        <ul>
          <li>Decompose program into manageable pieces</li>
          <li>Align with contract SOW and deliverables</li>
          <li>Typical levels: Program → System → Subsystem → Work Package</li>
        </ul>
        <p><strong>Step 2: Create the schedule:</strong></p>
        <ul>
          <li>Integrated Master Schedule (IMS) with all tasks</li>
          <li>Define dependencies and critical path</li>
          <li>Schedule must be resource-loaded</li>
        </ul>
        <p><strong>Step 3: Develop the budget:</strong></p>
        <ul>
          <li>Allocate budget to WBS elements (Performance Measurement Baseline)</li>
          <li>Time-phase budget based on schedule</li>
          <li>Establish management reserve (unallocated budget for unknowns)</li>
        </ul>
        <p><strong>Step 4: Set up accounting:</strong></p>
        <ul>
          <li>Collect actual costs by WBS element</li>
          <li>Typically requires project accounting system or ERP integration</li>
          <li>Must track direct labor, materials, ODCs, overhead</li>
        </ul>
        <p><strong>Step 5: Measure earned value:</strong></p>
        <ul>
          <li>Determine what work was completed</li>
          <li>Apply earned value technique (% complete, milestones, units, etc.)</li>
          <li>Calculate EV based on completed work</li>
        </ul>
        <p><strong>Earned value techniques:</strong></p>
        <ul>
          <li><strong>Discrete effort:</strong> Specific tasks with measurable output (use % complete, milestones, or units)</li>
          <li><strong>Apportioned effort:</strong> Work tied to discrete effort (e.g., QA is 10% of development)</li>
          <li><strong>Level of effort (LOE):</strong> Work without measurable output (EV = PV by definition, e.g., program management)</li>
        </ul>
        <p><strong>Step 6: Analyze and report:</strong></p>
        <ul>
          <li>Calculate variances and indices</li>
          <li>Identify unfavorable trends</li>
          <li>Develop corrective action plans</li>
          <li>Submit required reports (CPR/IPMR)</li>
        </ul>
        <p><strong>Tools:</strong></p>
        <ul>
          <li><strong>Dedicated EVMS software:</strong> Deltek Cobra, Winsight, Acumen Fuse</li>
          <li><strong>ERP integration:</strong> Costpoint, Deltek, SAP</li>
          <li><strong>Project management tools:</strong> MS Project, Primavera can do basic EVM</li>
        </ul>
      `,
    },
    {
      heading: 'Best Practices and Common Pitfalls',
      content: `
        <p><strong>Best practices:</strong></p>
        <ul>
          <li><strong>Realistic baseline:</strong> Don't lowball or pad excessively. Use historical data.</li>
          <li><strong>Objective earned value:</strong> Use measurable completion criteria, not subjective estimates</li>
          <li><strong>Timely data:</strong> Close financial books quickly to meet reporting deadlines</li>
          <li><strong>Root cause analysis:</strong> Don't just report variances, explain them and fix them</li>
          <li><strong>Forward focus:</strong> EVM shows problems early — act on them, don't just report</li>
          <li><strong>Training:</strong> Ensure all project staff understand EVM basics</li>
        </ul>
        <p><strong>Common pitfalls:</strong></p>
        <p><strong>1. Subjective progress assessment:</strong></p>
        <ul>
          <li>"I'm 70% done" (based on gut feel)</li>
          <li>Leads to inaccurate EV and false confidence</li>
        </ul>
        <p><strong>Fix:</strong> Use objective measures — lines of code, drawings completed, tests passed.</p>
        <p><strong>2. Rear-loading the schedule:</strong></p>
        <ul>
          <li>Putting most budget late in schedule</li>
          <li>SPI looks good early, then crashes at the end</li>
        </ul>
        <p><strong>Fix:</strong> Load budget based on realistic work flow, not desired cash flow.</p>
        <p><strong>3. Ignoring LOE creep:</strong></p>
        <ul>
          <li>Too much Level of Effort work (EV = PV always, masks problems)</li>
          <li>Should be <20% of total work</li>
        </ul>
        <p><strong>Fix:</strong> Minimize LOE. Make work measurable wherever possible.</p>
        <p><strong>4. Not updating the baseline:</strong></p>
        <ul>
          <li>Baseline becomes obsolete after changes</li>
          <li>Variances reflect outdated plan, not real performance</li>
        </ul>
        <p><strong>Fix:</strong> Incorporate authorized changes promptly (with government approval).</p>
        <p><strong>5. Gaming the metrics:</strong></p>
        <ul>
          <li>Claiming more progress than earned</li>
          <li>Moving budget between tasks to hide overruns</li>
          <li>Government sees through this quickly</li>
        </ul>
        <p><strong>Fix:</strong> Be honest. Bad news early is better than disaster late.</p>
      `,
    },
  ],
  faqs: [
    {
      question: 'Is EVM the same as project management?',
      answer:
        'No. EVM is a measurement technique within project management. It integrates cost, schedule, and scope data to measure performance objectively. You still need traditional PM disciplines (planning, execution, risk management).',
    },
    {
      question: 'Can I use MS Project for EVM?',
      answer:
        'For basic EVM on small contracts, yes. MS Project can track PV, EV, AC and calculate variances. For EVMS compliance on large contracts, you need dedicated EVM software integrated with accounting.',
    },
    {
      question: 'What\'s a good CPI and SPI?',
      answer:
        'Target: CPI and SPI both > 1.0. Acceptable: 0.95-1.05. Concerning: 0.90-0.95. Red flag: <0.90. Government starts asking hard questions below 0.95.',
    },
    {
      question: 'How much does EVMS certification cost?',
      answer:
        'Initial implementation: $500K-$2M+ (software, training, processes, staff). Annual operating cost: 1-3% of contract value. Only cost-effective on contracts $50M+.',
    },
    {
      question: 'Can I improve a bad CPI?',
      answer:
        'Difficult. Industry data shows CPI stabilizes around 20% complete and rarely improves significantly. If CPI is 0.85 early, expect to finish around 0.85. Focus on preventing further degradation.',
    },
    {
      question: 'What if my subcontractors don\'t use EVM?',
      answer:
        'Major subs (>$50M or critical path) must have compliant EVMS. Smaller subs can report simplified EVM data (PV, EV, AC at summary level). You integrate sub data into your reporting.',
    },
    {
      question: 'Does EVM apply to FFP contracts?',
      answer:
        'Yes, if over the threshold. Contract type (FFP, cost-plus, T&M) doesn\'t exempt you from EVM. The government wants visibility into schedule/cost performance regardless of contract type.',
    },
    {
      question: 'What happens if I fail EVMS compliance review?',
      answer:
        'Government issues corrective action requests. You must fix deficiencies and demonstrate compliance. Failure to achieve compliance can result in withholds, lower fee, or even termination on egregious cases.',
    },
  ],
  cta: {
    heading: 'Master Earned Value Management',
    description:
      'EVM provides early warning of cost and schedule problems, but implementing it correctly is complex. Our team helps you set up EVMS, achieve certification, and use EVM data for better program management.',
    buttonText: 'Get Expert Help',
    buttonHref: '/consulting',
  },
  relatedGuides: [
    'status-reporting',
    'cost-plus-contracts',
    'contract-modifications',
    'dcaa-audits',
    'quality-assurance',
  ],
  publishedDate: '2026-04-07',
};
