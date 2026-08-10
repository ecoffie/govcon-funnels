/**
 * Long-form article bodies for /blog/:slug.
 * Structured block schema rendered by src/pages/BlogPost.tsx.
 * Written in Eric Coffie's direct, no-fluff voice.
 */

export type ArticleBlock =
  | { type: 'lead'; text: string }
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'takeaways'; items: string[] };

export const articleBodies: Record<string, ArticleBlock[]> = {
  'sam-gov-is-not-a-strategy': [
    {
      type: 'lead',
      text: 'Let me be blunt: if your entire federal sales strategy is "register on SAM.gov and wait for the phone to ring," you do not have a strategy. You have a lottery ticket. SAM.gov is the public bulletin board — and by the time an opportunity is pinned to a public bulletin board, you are already late to a conversation that started six months ago.',
    },
    {
      type: 'p',
      text: 'I say this as someone who has won federal contracts both ways. The bids I won cold off SAM.gov were knife fights against thirty other companies who found the same notice the same day. The bids I won consistently — the ones that built my business — came from relationships and intelligence I gathered long before anything was posted. This article is about where those deals actually come from, and how you get upstream of the posting.',
    },
    { type: 'h2', text: 'Understand what SAM.gov actually is' },
    {
      type: 'p',
      text: 'SAM.gov is a compliance artifact, not a marketplace. Contracting officers are required by the Federal Acquisition Regulation (FAR) to synopsize most opportunities above $25,000 there. That posting is the government checking a legal box — it is not the beginning of their buying process. By posting day, the requirement has usually been through market research, budget approval, and often informal conversations with incumbent contractors or firms that responded to earlier requests for information.',
    },
    {
      type: 'p',
      text: 'Does that mean you ignore SAM.gov? No. It means you use it correctly: as a research database and an early-warning system, not a vending machine. The notice types that matter most to a new contractor are not the solicitations — they are the Sources Sought and Request for Information (RFI) notices, where the government is openly asking "who out there can do this?"',
    },
    { type: 'h2', text: 'The pre-solicitation pipeline is where deals are born' },
    {
      type: 'p',
      text: 'Every contract starts as a problem inside a program office. Before it becomes an RFP, it typically passes through four visible stages, and each stage is a chance for you to get in the room:',
    },
    {
      type: 'list',
      items: [
        'Sources Sought notices — the agency is mapping the market. Respond to every one that fits your lane. This is literally an invitation to introduce yourself to the program office.',
        'Requests for Information — they are writing the requirement. A sharp RFI response can shape the specs toward your strengths. This is legal and encouraged.',
        'Draft RFPs — comment on them. Ask clarifying questions. Your questions signal competence and get your company name in front of the contracting officer before evaluation begins.',
        'Industry days and pre-proposal conferences — attend, even virtually. The attendee list is sometimes published. That list is a goldmine for teaming partners and competitors to study.',
      ],
    },
    {
      type: 'callout',
      text: 'Set a saved search in SAM.gov filtered by your top three NAICS codes and the notice types "Sources Sought" and "RFI" — not just solicitations. Check it every Monday morning. Ten minutes a week puts you upstream of 90% of your competition.',
    },
    { type: 'h2', text: 'Forecast data tells you what is coming next year' },
    {
      type: 'p',
      text: 'Here is the part almost nobody uses: agencies publish procurement forecasts. The Department of Defense, DHS, HHS, the VA — most of them maintain public forecasts of anticipated opportunities months before those requirements hit SAM.gov. Army, Navy, and Air Force small business offices each publish their own. These forecasts tell you the agency, the estimated value, the likely NAICS code, and often the name and email of the point of contact managing the requirement.',
    },
    {
      type: 'p',
      text: 'When I coach students, this is the assignment that changes their business: pull the forecast for your target agency, find five opportunities scheduled for the next two quarters, and email the listed POC. Not a pitch — a capability statement and a short question about the requirement. You are now in the conversation before there is anything to bid on.',
    },
    { type: 'h2', text: 'Small business offices work for you' },
    {
      type: 'p',
      text: 'Every major agency has an Office of Small and Disadvantaged Business Utilization (OSDBU) or equivalent. Their job — their measured, reported-to-Congress job — is to get more small businesses into the agency\u2019s contracting pipeline. They host matchmaking events, run vendor outreach sessions, and will sit down with you to explain how their agency buys. Most small businesses never contact them once. Request a meeting. Bring a one-page capability statement. Ask which program offices buy what you sell, and ask for an introduction.',
    },
    {
      type: 'quote',
      text: 'The contract is won in the year before the RFP drops. SAM.gov just tells you who showed up to the formalities.',
    },
    { type: 'h2', text: 'A weekly routine that actually produces pipeline' },
    {
      type: 'p',
      text: 'Stop doom-scrolling solicitations and run this cadence instead: Monday, review your saved Sources Sought searches and respond to anything relevant. Wednesday, work the forecast — five outreach emails to POCs on upcoming requirements. Friday, one relationship touch: a small business office, a prime contractor\u2019s supplier diversity lead, or an agency industry day registration. Ninety days of this and you will have live conversations that never appear on any public board. That is where contracts come from.',
    },
    {
      type: 'takeaways',
      items: [
        'SAM.gov is a compliance bulletin board, not a marketplace — treat it as research, not your sales funnel.',
        'Respond to Sources Sought and RFI notices; that is where requirements are shaped and relationships start.',
        'Mine agency procurement forecasts for opportunities 6–12 months out and contact the listed POCs directly.',
        'Book meetings with agency small business offices (OSDBUs) — they are paid to connect you.',
        'Run a Monday/Wednesday/Friday outreach cadence instead of refreshing solicitation listings.',
      ],
    },
  ],

  '8a-program-explained': [
    {
      type: 'lead',
      text: 'The 8(a) Business Development Program is the single most powerful small business certification in federal contracting — and the most misunderstood. Nine years of eligibility. Access to sole-source contracts worth up to $4.5 million each ($7 million for manufacturing) without full competition. A dedicated SBA Business Opportunity Specialist. And yet most eligible owners either never apply or stall their own application for years with preventable mistakes.',
    },
    {
      type: 'p',
      text: 'I am going to explain it the way I would to a friend who has a business, a full calendar, and no patience for bureaucratic fog. What it is, who actually qualifies, what it really gets you, and where applications go to die.',
    },
    { type: 'h2', text: 'What the 8(a) program actually is' },
    {
      type: 'p',
      text: 'Run by the Small Business Administration, 8(a) is a nine-year business development program for small businesses owned by socially and economically disadvantaged individuals. During those nine years — a four-year developmental stage and a five-year transitional stage — your firm can receive sole-source (direct-award) contracts, compete in 8(a)-only set-aside pools, get mentoring through the SBA\u2019s Mentor-Prot\u00e9g\u00e9 program, and receive one-on-one guidance from a Business Opportunity Specialist whose job is to help you win work.',
    },
    {
      type: 'p',
      text: 'Read that again: sole-source. A contracting officer can walk a requirement directly to your firm and award it without a public competition. No thirty-competitor knife fight. That is the closest thing to a cheat code the federal market offers, and it is why getting certified is worth the paperwork pain.',
    },
    { type: 'h2', text: 'Who qualifies — the real checklist' },
    {
      type: 'p',
      text: 'The eligibility rules live in 13 CFR 124, but here is the plain-English version. Your business must be at least 51% owned and controlled by one or more U.S. citizens who are both socially and economically disadvantaged. Certain groups are presumed socially disadvantaged — Black Americans, Hispanic Americans, Native Americans, Asian Pacific Americans, and Subcontinent Asian Americans — and after the 2023 court decisions, everyone else can still qualify by writing a narrative that proves social disadvantage through specific, documented experiences.',
    },
    {
      type: 'list',
      items: [
        'Personal net worth under $850,000 (excluding your primary home and your ownership stake in the business).',
        'Adjusted gross income averaging $400,000 or less over the past three years.',
        'Total assets of $6.5 million or less.',
        'The business must be small under your primary NAICS code, in business at least two years (waivers exist), and the disadvantaged owner must manage day-to-day operations and hold the highest officer position.',
        'Good character, demonstrated potential for success, and no prior 8(a) participation by you or the firm.',
      ],
    },
    {
      type: 'callout',
      text: 'The social disadvantage narrative is now the heart of most applications. Write it like a deposition: specific incidents, dates, decisions you were excluded from, and the business consequences. Vague statements about "facing challenges" get returned. Documented specifics get approved.',
    },
    { type: 'h2', text: 'What it gets you — and what it does not' },
    {
      type: 'p',
      text: 'Let me kill two myths. Myth one: "8(a) means free contracts." No. It means a shorter path to the contracting officer — you still have to convince a program office you can perform. Myth two: "8(a) is only for construction." Wrong. IT services, staffing, training, logistics, janitorial — agencies sole-source across every category.',
    },
    {
      type: 'p',
      text: 'What it actually gets you: access to the 8(a) sole-source ceiling, set-aside competitions with only other 8(a) firms, eligibility for SBA\u2019s Mentor-Prot\u00e9g\u00e9 joint ventures with large primes, and nine years of structured development. Firms that treat certification as a hunting license and build agency relationships during year one tend to exit the program transformed. Firms that wait for SBA to hand them work tend to graduate with nothing.',
    },
    { type: 'h2', text: 'The mistakes that stall applications' },
    {
      type: 'p',
      text: 'Applications are filed through certify.sba.gov, and the review clock only runs when your file is complete. These are the stall points I see over and over: tax returns that do not match the financial statements, an owner whose spouse\u2019s income quietly breaks the economic thresholds, a corporate structure where a non-disadvantaged investor holds veto power over ordinary business decisions (that kills "control"), and narratives so generic the reviewer cannot evaluate them. Fix the documents before you submit, not after the SBA kicks the file back. Every return letter costs you two to four months.',
    },
    {
      type: 'quote',
      text: '8(a) does not win you contracts. It buys you a seat at tables your competitors cannot get into. What you do at the table is still on you.',
    },
    { type: 'h2', text: 'Your first 12 months in the program' },
    {
      type: 'p',
      text: 'The clock starts the day you are certified, so act like it. Month one: meet your Business Opportunity Specialist and write your business development plan. Months two through six: brief every target agency\u2019s small business office on your 8(a) status and ask specifically about sole-source candidates under the $4.5 million threshold. Months six through twelve: pursue one Mentor-Prot\u00e9g\u00e9 relationship with a prime that already sells to your target agency. The firms that win treat year one as a sprint, not a warm-up.',
    },
    {
      type: 'takeaways',
      items: [
        '8(a) gives nine years of sole-source eligibility up to $4.5M per award — the strongest small business lever in GovCon.',
        'Check the economic thresholds first: $850K net worth, $400K average AGI, $6.5M assets.',
        'Write the social disadvantage narrative with documented specifics, not generalities.',
        'Submit a complete, internally consistent file — mismatched taxes and control issues cause most delays.',
        'Treat certification day as a starting gun, not a finish line: brief agencies on your sole-source eligibility immediately.',
      ],
    },
  ],

  'cmmc-real-math': [
    {
      type: 'lead',
      text: 'A consultant just quoted you $250,000 for CMMC compliance and now you are wondering whether defense work is worth it. Take a breath. That number is real for a 500-person manufacturer with CUI scattered across forty systems. It is not your number. For most small contractors, the honest cost of CMMC Level 2 lands between $40,000 and $90,000 all-in — and a meaningful chunk of that is labor you can self-perform if you are willing to learn.',
    },
    {
      type: 'p',
      text: 'Fear sells gap assessments, so let me give you the math instead. Where the money actually goes, what drives it up or down, and how to scope the work so you are not paying enterprise prices for a small-business problem.',
    },
    { type: 'h2', text: 'First, figure out which level you actually need' },
    {
      type: 'p',
      text: 'CMMC 2.0 has three levels, and the requirement flows from the data you touch, not your company size. Level 1 covers Federal Contract Information (FCI) — basic contract data — and requires 17 practices with an annual self-assessment. Level 2 covers Controlled Unclassified Information (CUI) and maps to all 110 practices in NIST SP 800-171, with triennial third-party assessments for most programs. Level 3 is for the most critical programs and is assessed by the government itself.',
    },
    {
      type: 'p',
      text: 'If your contracts only involve FCI, your CMMC bill might be a few thousand dollars of policy writing and basic hygiene — nobody tells you that because there is no consulting engagement in it. Level 2 is where the real conversation starts, and that is what the rest of this article prices.',
    },
    { type: 'h2', text: 'The four cost buckets, line by line' },
    {
      type: 'list',
      items: [
        'Gap assessment and scoping: $5K–$15K. Someone maps your environment against the 110 practices. Self-perform option: the DoD publishes free assessment guides — a disciplined internal review can cut this to near zero if you have competent IT.',
        'Remediation (the big one): $20K–$60K. This is new tooling — typically a GCC High or equivalent enclave ($50–$150 per user per month), multifactor authentication, endpoint detection, logging, and encryption — plus the labor to configure and document it. Scope is everything: a 10-person enclave costs a fraction of a 200-person one.',
        'Documentation: $5K–$20K. The System Security Plan (SSP) and Plans of Action & Milestones (POA&Ms). Templates from the DoD and the CMMC Accreditation Body are free; you are paying for someone to fill them in accurately.',
        'The C3PAO assessment itself: $30K–$60K. The third-party assessment organization fee, recurring every three years. This is the line item nobody can waive — budget for it like a license to operate.',
      ],
    },
    {
      type: 'callout',
      text: 'Your CUI boundary is your budget. Every system, user, and office that touches CUI is in scope. The cheapest CMMC strategy is not better tools — it is a smaller enclave. Isolate CUI to a dedicated cloud environment and keep the rest of your business out of scope.',
    },
    { type: 'h2', text: 'What inflates the bill (and how to avoid it)' },
    {
      type: 'p',
      text: 'Three things blow up CMMC budgets. First, sprawl: CUI living in personal laptops, shared drives, personal email, and the office file server means everything must be remediated. Second, DIY assessments that miss objective evidence — assessors do not grade intentions, they grade artifacts, so undocumented controls score as absent. Third, starting the year your contract requires certification. Remediation plus documentation plus scheduling a C3PAO comfortably takes 12 to 18 months; compressed timelines mean premium rates.',
    },
    {
      type: 'p',
      text: 'The avoidance playbook is boring and cheap: inventory where CUI actually enters your business, wall it into an enclave, buy the enclave tooling as a subscription instead of building infrastructure, and start your SSP the day you decide to pursue defense work — not the day the RFP demands it.',
    },
    { type: 'h2', text: 'The math on doing nothing' },
    {
      type: 'quote',
      text: 'CMMC is not an IT project. It is a market-access decision. The question is not "what does it cost?" but "what is the revenue on the other side of it?"',
    },
    {
      type: 'p',
      text: 'Since the DFARS 7012 clause already requires NIST 800-171 compliance today — with CMMC adding the verification — the real comparison is not $60K versus zero. It is $60K versus the defense revenue you cannot bid without it. One mid-five-figure task order pays for the entire program. Most of my students who balk at the price have never run that arithmetic. Run it.',
    },
    { type: 'h2', text: 'A sensible sequence for small businesses' },
    {
      type: 'p',
      text: 'Confirm your required level from the contracts you are targeting. Self-assess against the 110 practices and submit your score to SPRS — you are already required to. Design the smallest defensible CUI enclave. Remediate inside the enclave only. Write the SSP as you go, not after. Then engage a C3PAO early, because assessment calendars fill months out. Total realistic spend for a focused 5–15 person enclave: $40K–$90K over 12–18 months, roughly a third of it recurring subscription costs you would have spent on IT anyway.',
    },
    {
      type: 'takeaways',
      items: [
        'Most small contractors land at $40K–$90K all-in for Level 2 — not $250K.',
        'Confirm your level from the data you handle: FCI means Level 1 self-assessment, CUI means Level 2.',
        'Shrink the CUI enclave first — scope, not tooling, is the biggest cost lever.',
        'The C3PAO assessment fee ($30K–$60K every three years) is fixed; plan around it.',
        'Start 12–18 months before you need certification; compressed timelines triple costs.',
      ],
    },
  ],

  'first-proposal-checklist': [
    {
      type: 'lead',
      text: 'Here is a truth that will save you months of grief: most first federal proposals do not lose on price or even on technical merit. They lose on compliance. A missing form, the wrong font, a page that runs one line over the limit — and the contracting officer drops your forty hours of work into the rejection pile without reading your brilliant solution. Compliance is the entry fee, and it is entirely within your control.',
    },
    {
      type: 'p',
      text: 'This checklist is the one I wish someone had handed me before my first bid. Twelve points, in order, from the moment the solicitation drops to the moment you hit submit. Run every proposal through it — no exceptions, no "we will remember next time."',
    },
    { type: 'h2', text: 'Before you write a single word' },
    {
      type: 'p',
      text: 'Points one through four happen in the first 48 hours after you decide to bid. They determine whether the next three weeks produce a winner or an expensive lesson.',
    },
    {
      type: 'list',
      items: [
        '1. Read Section L twice. Section L is the instruction manual — every volume, every page limit, every formatting rule. Build a compliance matrix from it before writing anything. If it says 12-point Times New Roman, one-inch margins, 25 pages, that is law.',
        '2. Build the compliance matrix. A spreadsheet mapping every Section L instruction and Section M evaluation factor to the exact page of your proposal where it is answered. Evaluators use Section M to score you; write to their scorecard.',
        '3. Confirm the submission logistics. Deadline in what time zone? Portal or email? File size limits? Do you need a completed SF-33 or SF-1449? Portal submissions fail — upload 48 hours early.',
        '4. Make the real bid/no-bid call. Can you meet every requirement? Do you have or can you team for the past performance? If the honest answer is no, walk away. Losing proposals cost the same labor as winning ones.',
      ],
    },
    { type: 'h2', text: 'Building the volumes' },
    {
      type: 'list',
      items: [
        '5. Answer the evaluation factors, not your own talking points. Every paragraph should map to a Section M factor. If a paragraph does not move your score, delete it — it is spending page count you need elsewhere.',
        '6. Write past performance like evidence, not biography. For each reference: the contract, the scope, the dollar value, the customer, and the measurable outcome. Name a point of contact who will actually answer the phone when the government calls.',
        '7. Staff with real people or real contingencies. Naming "TBD" for key personnel on a firm-fixed-price staffing bid tells the evaluator you cannot start. Use letters of commitment from named candidates.',
        '8. Price to win, not to cover. Your pricing volume must be internally consistent — labor categories, rates, and hours matching the technical volume — and it must survive a realism check. A price 40% below the field without explanation scores as risk, not value.',
        '9. Fill out every form. Every amendment must be acknowledged, every representation and certification completed in SAM.gov, every required attachment signed. An unacknowledged amendment is the single most common self-inflicted rejection in federal bidding.',
      ],
    },
    {
      type: 'callout',
      text: 'Amendment discipline: check the solicitation posting daily until submission. Agencies drop amendments that change requirements, dates, and forms — sometimes three days before the deadline. Each one must be acknowledged, and each one can invalidate work you already did.',
    },
    { type: 'h2', text: 'The final 72 hours' },
    {
      type: 'list',
      items: [
        '10. Run a compliance review with fresh eyes. Someone who did not write the proposal checks it against the matrix, line by line. Writers go blind to their own omissions by draft two.',
        '11. Do a full dress-rehearsal of the submission. Compile the final PDF, verify every volume, check file naming conventions against Section L, and confirm the total package opens correctly. Corrupted uploads are unforgivable losses.',
        '12. Submit 24–48 hours early and confirm receipt. Get the confirmation email or portal receipt and save it. If the portal crashes at 11:58 PM, "my internet went down" is not a legal argument.',
      ],
    },
    {
      type: 'quote',
      text: 'The government is not looking for the most impressive proposal. It is looking for the lowest-risk award. Compliance is how you prove you are the safe choice before they read a word of your solution.',
    },
    { type: 'h2', text: 'After the loss (there will be losses)' },
    {
      type: 'p',
      text: 'You will lose your first bids. Fine — but never lose for free. Within days of a loss, request a debrief in writing. The contracting officer owes you an explanation of your strengths, weaknesses, and the winning price. Every debrief is market intelligence your competitors paid full price for and you get at the cost of an email. I have students whose fifth proposal won because debriefs one through four taught them exactly how that agency scores.',
    },
    {
      type: 'takeaways',
      items: [
        'First proposals die on compliance, not quality — treat Section L as law.',
        'Build a compliance matrix mapping every instruction and evaluation factor before writing.',
        'Write to Section M: if a paragraph does not move a score, cut it.',
        'Acknowledge every amendment — the #1 self-inflicted rejection.',
        'Always request a debrief after a loss; it is free competitive intelligence.',
      ],
    },
  ],

  'subcontracting-side-door': [
    {
      type: 'lead',
      text: 'Everyone obsesses over winning prime contracts, and everyone ignores the side door that is standing wide open: subcontracting to the primes who already won. On any large federal contract, the prime is often legally required to give a chunk of the work to small businesses — and they are actively, sometimes desperately, looking for reliable small firms to fill those quotas. You can build a seven-figure federal revenue stream without ever winning a prime award.',
    },
    {
      type: 'p',
      text: 'This is not theory. Some of the strongest firms I know spent their first three years almost entirely as subcontractors, banking past performance, learning agency culture, and getting paid on someone else\u2019s contract vehicle. Here is how the side door works and how to walk through it.',
    },
    { type: 'h2', text: 'Why primes need you (it is the law)' },
    {
      type: 'p',
      text: 'Federal contracts over $750,000 ($1.5 million for construction) awarded to large businesses require a small business subcontracting plan under FAR 52.219-9. The prime commits to percentage goals — small business, small disadvantaged business, HUBZone, women-owned, service-disabled veteran-owned — and reports performance against those goals. Missing them has real consequences: negative past performance ratings, liquidated damages in egregious cases, and a harder time winning the next recompete.',
    },
    {
      type: 'p',
      text: 'Translation: a large prime\u2019s subcontracting goals are not charity. They are a compliance obligation the prime is measured on. When you walk in with the right socioeconomic status, the right NAICS, and a reputation for showing up, you are solving their problem, not asking for a favor.',
    },
    { type: 'h2', text: 'Finding the primes that buy what you sell' },
    {
      type: 'p',
      text: 'Start with the data. The SBA\u2019s SubNet database is a public board where primes post subcontracting opportunities — clunky, but real. More powerful: pull the top twenty primes in your NAICS code and target agency from USASpending.gov or FPDS. That list tells you exactly who holds the money in your lane. Every one of them has a supplier diversity or small business liaison office — usually findable with one search for "[prime name] supplier diversity."',
    },
    {
      type: 'list',
      items: [
        'SBA SubNet — posted subcontracting opportunities from primes with active plans.',
        'USASpending.gov / FPDS — identify who actually wins in your NAICS and agency, then target the top ten.',
        'Prime supplier-diversity portals — Lockheed, Boeing, RTX, Leidos, Booz Allen and nearly every large defense prime run registration portals for small business suppliers.',
        'Agency small business events and matchmaking sessions — primes attend specifically to find subs for upcoming pursuits.',
        'Incumbent teaming on recompetes — find contracts expiring in 18–24 months; the incumbent prime needs subs for the bid, and challengers need them even more.',
      ],
    },
    {
      type: 'callout',
      text: 'The recompete window is the sweet spot. A prime chasing a recompete must show a credible small business team in the proposal. Offer yourself 12–18 months before the RFP and you can get your company name written into a winning bid — workshare included.',
    },
    { type: 'h2', text: 'The pitch that gets a callback' },
    {
      type: 'p',
      text: 'Primes delete 95% of the capability emails they receive because they are generic. Yours survives if it answers their three questions in the first screen: what do you do (in their contract language, not yours), where is your differentiator or socioeconomic status, and can you perform without supervision. Attach a one-page capability statement built for subcontracting: core competencies, NAICS codes, UEI and CAGE, socioeconomic statuses, past performance with dollar values, and a named human contact.',
    },
    {
      type: 'quote',
      text: 'A prime does not want another vendor. A prime wants a subcontractor who makes the government happy, hits the small business numbers, and never becomes a problem in a program review.',
    },
    { type: 'h2', text: 'Protect yourself in the agreement' },
    {
      type: 'p',
      text: 'Subcontracting is not all upside. Watch three clauses. First, payment terms: "paid-when-paid" language means you eat the prime\u2019s cash-flow delays — negotiate prompt payment terms or milestone billing where you can. Second, workshare: get your scope defined in the teaming agreement before the proposal is submitted, because post-award renegotiation from zero leverage goes badly. Third, non-solicitation and exclusivity clauses that are so broad you cannot work the agency for anyone else — that is your future being signed away.',
    },
    { type: 'h2', text: 'Convert subcontracting into a prime past performance base' },
    {
      type: 'p',
      text: 'Play the long game. Document everything you deliver as a sub: scope, dollar value, performance ratings, and a government POC willing to vouch for the work. CPARS ratings on subcontracts count toward your record. Two or three strong subcontract engagements give you the past performance citations, agency relationships, and customer references to bid your own prime work — with revenue funding the whole climb. That is the side door, and it leads to the front of the building.',
    },
    {
      type: 'takeaways',
      items: [
        'Primes over $750K are legally required to subcontract to small businesses — you are solving their compliance problem.',
        'Use SubNet, USASpending, and supplier-diversity portals to find primes in your NAICS and agency.',
        'Target recompetes 12–18 months out, when primes must name their small business team in proposals.',
        'Pitch with a subcontractor-specific one-page capability statement that answers their three questions fast.',
        'Negotiate payment terms, defined workshare, and sane non-solicitation clauses before signing.',
      ],
    },
  ],

  'teaming-agreements-101': [
    {
      type: 'lead',
      text: 'A teaming agreement can double your capacity overnight — or quietly hand your customer, your pricing, and your people to a competitor with better lawyers. I have seen both outcomes, and the difference is never the relationship. It is the paper. The companies that get burned are the ones who treated a teaming agreement like a handshake with formatting instead of what it is: the entire legal definition of your partnership.',
    },
    {
      type: 'p',
      text: 'This is the guide I give every student before their first joint bid. What a teaming agreement actually does, the clauses that decide whether you get paid, when to sign one, and the red flags that mean you walk away no matter how good the opportunity looks.',
    },
    { type: 'h2', text: 'What a teaming agreement is (and is not)' },
    {
      type: 'p',
      text: 'A teaming agreement is a pre-award contract between companies pursuing a specific solicitation together: one as prime, the others as subcontractors. It governs the pursuit — who writes what, who prices what, who gets which work if you win. Critically, courts have repeatedly held that a teaming agreement is generally NOT an enforceable promise of a subcontract after award unless the workshare is defined with enough specificity. "Team member will receive a substantial portion of the work" has been ruled an unenforceable agreement to agree. That single legal fact is responsible for most of the horror stories.',
    },
    { type: 'h2', text: 'The clauses that decide your fate' },
    {
      type: 'list',
      items: [
        'Workshare definition — the heart of the deal. Define it as specific tasks, labor categories, or a percentage of contract value with a floor ("not less than 30% of total labor hours"). Vague language is how teammates end up with 3% of the work they helped win.',
        'Exclusivity — does the agreement lock you to this team for this pursuit only, or does it bar you from the entire agency? Only accept pursuit-specific exclusivity.',
        'Non-solicitation of employees and customers — reasonable in narrow form (your shared pursuit), dangerous in broad form (any contact with the customer ever). Push the scope back to the specific contract.',
        'Proposal responsibilities and cost — who writes which volumes, who owns the content afterward, and whether you can reuse your own material if the team dissolves.',
        'Duration and termination — the agreement should die automatically on award, loss, or a defined date. Perpetual teaming agreements are cages.',
        'Subcontract obligation language — at minimum, a clause committing both parties to negotiate a subcontract in good faith upon award, attached to the defined workshare.',
      ],
    },
    {
      type: 'callout',
      text: 'Write the workshare as an exhibit: a table of labor categories, hours, and dollar estimates mapped to your company. Attach it to the teaming agreement. If it is specific enough to price, it is specific enough to enforce.',
    },
    { type: 'h2', text: 'Prime or sub — pick your position deliberately' },
    {
      type: 'p',
      text: 'The prime owns the customer relationship, the CPARS rating, and the invoicing. The sub owns less risk and less paperwork but also less control and thinner margins. Size rules matter here: on a set-aside, the prime must be small under the contract\u2019s NAICS code, and limitations on subcontracting generally require the prime to self-perform at least 50% of services work (similar rules apply to other categories). A "mentor" who proposes you prime a deal while they take 70% of the work is not mentoring you — they are using your status and exposing you to a false-certification problem.',
    },
    {
      type: 'quote',
      text: 'In teaming, loyalty is a rounding error. The agreement is the relationship. If it is not in the document, it does not exist.',
    },
    { type: 'h2', text: 'When to sign — and when to walk' },
    {
      type: 'p',
      text: 'Sign when the pursuit is real (a forecast or draft RFP exists), the teammate fills a gap you genuinely cannot fill (past performance, clearances, a vehicle), and the workshare can be written down in numbers. Walk away when the other side refuses to define workshare before submission, demands exclusivity broader than the pursuit, wants your rate card and customer contacts before signing anything, or is simultaneously teaming with your direct competitor on the same bid. Yes, that last one happens constantly. Ask.',
    },
    { type: 'h2', text: 'The joint venture alternative' },
    {
      type: 'p',
      text: 'For set-aside work, also consider an SBA-approved joint venture — a separate legal entity the partners form to prime the contract together, with profits split by agreement. Under the Mentor-Prot\u00e9g\u00e9 program, a small business can joint venture with a large mentor and still bid small business set-asides. It is more structure and more paperwork, but it gives you prime-level CPARS and direct customer access that teaming as a sub never will. Know both tools; pick per deal.',
    },
    {
      type: 'takeaways',
      items: [
        'Teaming agreements govern the pursuit — enforceable subcontract promises require specific, numeric workshare.',
        'Define workshare in an attached exhibit with labor categories, hours, and dollars.',
        'Keep exclusivity and non-solicitation scoped to the single pursuit, never the whole agency.',
        'Mind size and self-performance rules: the prime on a set-aside must be small and self-perform ~50%.',
        'Consider an SBA Mentor-Prot\u00e9g\u00e9 joint venture when you want prime-level CPARS and customer access.',
      ],
    },
  ],

  'register-right-first-time': [
    {
      type: 'lead',
      text: 'SAM.gov registration is free, takes a few focused hours, and blocks 100% of your federal revenue until it is done. It is also where new contractors burn six weeks because one field — one NAICS code, one date, one entity name that does not match a tax record — sends the whole file into review purgatory. I have watched students lose bid deadlines over a typo. This walkthrough gets you active in days, not months.',
    },
    {
      type: 'p',
      text: 'Before you touch the website, gather your documents. Registration is a data-entry exercise, and the people who stall are the ones improvising answers at the keyboard. Get everything in one folder first: IRS EIN letter, business bank account details, articles of incorporation or LLC formation, and your business\u2019s physical address history.',
    },
    { type: 'h2', text: 'Step one: your legal name must match everywhere' },
    {
      type: 'p',
      text: 'The number-one cause of rejected registrations is an entity name mismatch. SAM.gov validates your legal business name and physical address against IRS records and third-party databases. If your IRS paperwork says "Smith Logistics LLC" but you register as "Smith Logistics, LLC" with a comma — or you use a trade name instead of the legal name — you can trigger a manual review. Pull your IRS EIN assignment letter (CP-575) and copy the name character for character. Same for the address: use the physical address on file with the IRS and your state registration, not a virtual office you set up last week.',
    },
    { type: 'h2', text: 'Step two: get the UEI and start the entity registration' },
    {
      type: 'p',
      text: 'The Unique Entity ID (UEI) replaced the DUNS number and is issued inside SAM.gov itself — free, usually instant. You then begin the full entity registration, which produces your CAGE code (for domestic entities, assigned automatically during review). One warning: dozens of lookalike websites will charge you $500 to $1,500 to "handle" this. They are filling out a free government form with your data. SAM.gov is free. Help desk support is free. Anyone charging you is a middleman.',
    },
    {
      type: 'callout',
      text: 'Entity validation reviews are the current bottleneck. If SAM.gov flags your record for manual validation, respond to the ticket immediately with formation documents and IRS letters in PDF. Tickets left sitting for a week restart queues that were already three weeks long.',
    },
    { type: 'h2', text: 'Step three: reps, certs, and the fields people fumble' },
    {
      type: 'p',
      text: 'The Representations and Certifications section is where you legally declare your size and socioeconomic status. Work through FAR 52.212-3 carefully — these are certifications to the federal government, and wrong answers are not typos, they are false statements. The fields that trip people up:',
    },
    {
      type: 'list',
      items: [
        'NAICS codes — pick a primary NAICS that matches what you actually sell, then add every secondary code you could credibly perform. Your size standard (small or not) is measured against the primary code. Wrong NAICS, wrong size determination.',
        'PSC/FSC codes — these describe products and services in federal data. They feed the search filters contracting officers use. Choose them as deliberately as NAICS.',
        'Small business self-certification — check your receipts and employees against the SBA size table for your NAICS before you certify small. Revenue-based standards usually average your last five fiscal years.',
        'Electronic funds transfer — enter your business banking details precisely; this is how you get paid. A mistyped routing number found after your first invoice is a special kind of pain.',
        'Points of contact — list a monitored inbox. Government emails about your registration status, and later about bids, go here.',
      ],
    },
    { type: 'h2', text: 'Step four: what to do while you wait' },
    {
      type: 'p',
      text: 'A clean registration activates in about ten business days; a flagged one can take a month. Do not sit idle. While the review runs, complete your DSBS profile (the Dynamic Small Business Search — the database contracting officers actually query), draft your capability statement, and set up your SAM.gov saved searches. The day your status flips to "Active," you should be submitting Sources Sought responses, not starting your homework.',
    },
    {
      type: 'quote',
      text: 'Registration is not the beginning of your GovCon journey. It is the ticket booth. Have your marketing built before the gate opens.',
    },
    { type: 'h2', text: 'Step five: keep it alive forever' },
    {
      type: 'p',
      text: 'Your registration expires every 12 months, and an expired registration at the wrong moment can cost you an award — contracting officers have rejected bids from firms whose SAM status lapsed during evaluation. Set a calendar reminder for 90 days before expiration, update your reps and certs annually, and re-verify after any change of address, ownership, or banking. Ten minutes a year protects everything you build on top of this record.',
    },
    {
      type: 'takeaways',
      items: [
        'Copy your legal name and address character-for-character from IRS records — mismatches cause most delays.',
        'UEI and CAGE are free through SAM.gov; never pay a third-party "registration service."',
        'Choose your primary NAICS deliberately — it sets your size standard.',
        'Respond to entity-validation tickets immediately with formation and IRS documents in PDF.',
        'Renew annually: an expired SAM registration can void a bid you already won.',
      ],
    },
  ],

  'progress-payments-guide': [
    {
      type: 'lead',
      text: 'The myth that kills small businesses in federal contracting is not that the government does not pay — it is that you have to wait until the job is done to get paid. Wrong. Federal acquisition rules give you tools to invoice as you perform: progress payments, milestone billing, performance-based payments, and a Prompt Payment Act that forces agencies to pay on time or pay you interest. Cash flow is a contract-design problem, and you solve it before you sign, not after you starve.',
    },
    {
      type: 'p',
      text: 'I have watched profitable companies die on federal work because they financed ninety days of payroll while waiting on one invoice. I have also watched tiny firms run multi-million-dollar contracts with almost no outside capital because they structured payment terms correctly on day one. This is how the second group does it.',
    },
    { type: 'h2', text: 'Progress payments: the government funds your work' },
    {
      type: 'p',
      text: 'Under FAR 32.5, on fixed-price contracts the government can pay you a percentage of your incurred costs as you go — traditionally up to 80%, and up to 90% for small businesses. That is not a loan; it is the government financing its own contract so you do not have to. Progress payments typically apply to larger, longer fixed-price efforts (generally six months or more of performance), and you request them by asking for the clause during negotiation — many contracting officers will not volunteer it, but it is standard, allowable, and especially favorable to small firms.',
    },
    {
      type: 'p',
      text: 'The trade-off: paperwork. You will submit Standard Form 1443 with supporting cost data, your accounting system must track costs by contract, and the government retains title to work-in-progress. For a small business staring down monthly payroll on a year-long build, that paperwork is the cheapest financing you will ever get.',
    },
    { type: 'h2', text: 'Milestone and performance-based payments' },
    {
      type: 'list',
      items: [
        'Milestone billing — split the work into defined deliverables with dollar values (design complete: $40K; prototype delivered: $60K; final acceptance: $50K). Invoice at each milestone instead of one lump sum at the end. Negotiate the milestones into Section B of the contract before award.',
        'Performance-based payments — the more modern cousin: payments tied to objective, measurable events rather than incurred costs, with less administrative burden than classic progress payments.',
        'Monthly invoicing on cost-reimbursement and T&M contracts — if your contract is cost-plus or time-and-materials, you can usually invoice monthly as a matter of course. Bill every month without fail; your contract literally funds itself if you keep the invoicing cadence.',
        'Advance payments — rare and hard to get, but they exist for certain small business situations. Ask your contracting officer; the worst answer is no.',
      ],
    },
    {
      type: 'callout',
      text: 'Read the payment clause in your solicitation before you propose. If a fixed-price, twelve-month effort is silent on progress payments, that is a negotiation point — raise it in questions or discussions. After award, the answer is almost always no.',
    },
    { type: 'h2', text: 'The Prompt Payment Act is your enforcer' },
    {
      type: 'p',
      text: 'Once you invoice properly, the clock starts. The Prompt Payment Act (31 U.S.C. chapter 39, implemented at FAR 32.9) generally requires agencies to pay a proper invoice within 30 days of receipt or acceptance. Pay late and the government owes you interest automatically — you usually do not even have to ask. But "proper invoice" is doing heavy lifting: invoices get rejected for missing CLIN numbers, wrong remit-to details, or missing receiving reports, and a rejected invoice restarts the clock at zero.',
    },
    {
      type: 'p',
      text: 'Learn the invoicing system your contract specifies — for DoD that is usually PIEE (Procurement Integrated Enterprise Environment, formerly WAWF). Set it up in week one, not when your first invoice is due. A surprising amount of "the government pays slow" is actually "the vendor never learned the portal."',
    },
    { type: 'h2', text: 'Assignment of claims and invoice financing' },
    {
      type: 'quote',
      text: 'Federal receivables are the best collateral a small business can own. The customer is the United States Treasury. Act like it when you talk to your bank.',
    },
    {
      type: 'p',
      text: 'If you still need working capital, the Assignment of Claims Act lets you assign your federal payments to a bank or factor as loan security — something nearly impossible in commercial work. Lenders understand government receivables; many community banks and SBA lenders will extend a line of credit against them. Combine a small line of credit for the first payroll cycle with progress payments or milestone billing, and a well-structured federal contract can fund itself end to end.',
    },
    { type: 'h2', text: 'Your pre-signature checklist' },
    {
      type: 'p',
      text: 'Before you sign any federal contract: identify the payment clause and invoicing portal, ask for progress payments or milestone structure if performance exceeds a few months, confirm the 30-day Prompt Payment terms, and map your first payroll against your first realistic payment date. Cash flow problems in GovCon are almost always born at signature. Solve them there.',
    },
    {
      type: 'takeaways',
      items: [
        'You do not have to wait until completion — progress payments let small businesses invoice up to 90% of costs as they perform.',
        'Ask for the clause during negotiation; post-award requests almost never succeed.',
        'Milestone billing turns one year-end lump sum into a self-funding contract.',
        'The Prompt Payment Act forces payment within ~30 days of a proper invoice — with automatic interest on late payments.',
        'Set up PIEE/WAWF in week one and invoice on a relentless monthly cadence.',
      ],
    },
  ],

  'start-govcon-no-experience': [
    {
      type: 'lead',
      text: 'No past performance. No network. No certifications. No idea what a NAICS code is. That is exactly where I started, and it is where most of my students start — and ninety days from now you can be registered, visible to buyers, and submitting your first bid, using nothing but free government resources and focused weekly effort. Not theory: a calendar.',
    },
    {
      type: 'p',
      text: 'The plan below assumes a few hours a week and zero budget. It front-loads the boring infrastructure (because everything else waits on it), then pivots to visibility and a first bid that is chosen to teach you the process — win or lose. Follow the weeks in order. Skipping ahead is how people end up "six months in" with nothing but a half-finished SAM registration.',
    },
    { type: 'h2', text: 'Weeks 1–2: Pick your lane and learn the vocabulary' },
    {
      type: 'p',
      text: 'Week one, answer one question honestly: what can you deliver today with the people and skills you already have? Janitorial services, IT support, training, staffing, landscaping, consulting — the federal government buys all of it. Then find the NAICS codes for that work using the Census Bureau\u2019s NAICS search, and the PSC codes using FPDS reports. These codes are how the entire system files you.',
    },
    {
      type: 'p',
      text: 'Week two, study the market you are entering. Pull USASpending.gov data for your NAICS: which agencies spend the most, which contractors win it, and what the average award size is. This is free, public, and most of your future competitors have never looked at it. You are not researching for a report — you are picking your target agency.',
    },
    { type: 'h2', text: 'Weeks 3–4: Registration and infrastructure' },
    {
      type: 'list',
      items: [
        'Register in SAM.gov (free): get your UEI, complete the entity registration and reps & certs, and receive your CAGE code. Budget two to four weeks for activation — which is why this starts in week three, not week ten.',
        'Set up your DSBS profile the day SAM activates — it is the database contracting officers search for small businesses.',
        'Create a dedicated business email and a simple capability statement template. One page, four blocks: core competencies, differentiators, past performance (commercial counts), and company data with your codes.',
        'Set up SAM.gov saved searches for your NAICS codes filtered to Sources Sought and RFI notices.',
      ],
    },
    {
      type: 'callout',
      text: 'No past performance? Commercial work counts in your capability statement and in many proposals. Your restaurant supply contracts, your IT work for a local school, your consulting engagements — documented with outcomes and references, that is past performance. "Zero experience" usually means zero federal experience. Fix the framing, not just the resume.',
    },
    { type: 'h2', text: 'Weeks 5–8: Visibility and first relationships' },
    {
      type: 'p',
      text: 'This is the phase everyone skips, and the phase that decides everything. While your registration processes, you build the human layer: schedule a free counseling session with your local APEX Accelerator (formerly PTAC — they exist specifically to help new firms, at no cost), request a meeting with the small business office (OSDBU) at your target agency, and respond to your first Sources Sought notice. The Sources Sought response matters more than any document you have written so far — it is your first touch with a real program office, and it takes one afternoon.',
    },
    {
      type: 'p',
      text: 'Also in these weeks: register in the supplier diversity portals of the top three primes in your NAICS, and attend one virtual industry day or agency outreach event. By week eight you should have had at least three live conversations with humans inside the federal buying ecosystem. That number is your real progress metric — not documents produced.',
    },
    { type: 'h2', text: 'Weeks 9–12: Your first bid' },
    {
      type: 'p',
      text: 'Now you bid — and you choose the bid for its teaching value. Ideal first targets: simplified acquisitions under $250K, small business set-asides with a short performance period, or RFQs (quotes, not full proposals) on SAM.gov. The evaluation on these is often lowest-price technically acceptable, the writing burden is manageable, and the cycle is fast enough that you get feedback in weeks, not seasons.',
    },
    {
      type: 'p',
      text: 'Run the bid through a compliance checklist, submit 48 hours early, and then — win or lose — request a debrief. A debrief on a $100K loss is worth more than a year of YouTube videos. Meanwhile, keep the cadence alive: weekly Sources Sought responses, one new agency contact per week, one prime outreach per week.',
    },
    {
      type: 'quote',
      text: 'Your first bid is tuition. Your second bid is practice. Your fifth bid is a business. The only losing move is never submitting the first one.',
    },
    { type: 'h2', text: 'Day 90 and beyond' },
    {
      type: 'p',
      text: 'Ninety days in, the honest scoreboard looks like this: active SAM registration, a finished capability statement, a target agency picked from spending data, three-plus buyer conversations, at least one bid submitted, and a debrief scheduled or received. That is a real GovCon business in formation — built with free tools. From here, the game is repetition: more responses, more relationships, more bids. Consider your first certification (8(a), HUBZone, WOSB, SDVOSB — whichever fits) in quarter two, and revisit subcontracting as paid on-the-job training. The giants in this industry all started exactly where you are standing. The difference is they started.',
    },
    {
      type: 'takeaways',
      items: [
        'Ninety days is enough to go from zero to your first submitted bid — if you follow the sequence.',
        'Weeks 1–2: pick your lane, find your NAICS/PSC codes, and study USASpending data.',
        'Weeks 3–4: SAM.gov registration (start early — validation takes weeks) plus DSBS and a capability statement.',
        'Weeks 5–8: APEX Accelerator, OSDBU meetings, Sources Sought responses — measure progress in conversations.',
        'Weeks 9–12: bid a small simplified acquisition or RFQ for the learning value, then request the debrief.',
      ],
    },
  ],
};

/** Fetch the body blocks for an article slug. */
export function getArticleBody(slug: string): ArticleBlock[] | undefined {
  return articleBodies[slug];
}
