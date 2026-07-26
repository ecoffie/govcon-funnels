export interface Episode {
  title: string;
  /** ISO date string (YYYY-MM-DD), parsed from the RSS pubDate */
  date: string;
  description: string;
  /** e.g. "09:34" */
  duration: string;
  /** Libsyn episode page URL */
  link: string;
  /** Direct MP3 URL from the RSS enclosure (streamable on-site) */
  audioUrl: string;
  /** Per-episode artwork from the RSS feed, if present */
  image: string | null;
  /** Processed face thumbnail (guest or host) in /public/episodes */
  thumb: string;
}

/** 150 most recent GovCon Giants Podcast episodes, newest first.
 *  Regenerate with: python3 scripts/rss-to-episodes.py [limit] */
export const episodes: Episode[] = [
  {
    "title": "5 Ways To Find Your Federal Program Manager Before Everyone Else Does",
    "date": "2026-07-23",
    "description": "Finding federal decision makers before the RFP drops is the real edge in government contracting, and most contractors are looking in the wrong place entirely. In this episode, Randie Ward breaks down the exact hierarchy of people behind every solicitation, from the contracting officer down to the program manager and end user, and reveals a sloppy habit contracting officers don't even realize gives away who's really calling the shots. If you've been submitting proposals into the void with no…",
    "duration": "09:34",
    "link": "https://govcongiants.libsyn.com/5-ways-to-find-your-federal-program-manager-before-everyone-else-does",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/16-12__Clip_1__Find_the_Decision_Maker_Before_They_Post_the_RFP_-_Randie_Ward_121625_.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/1/f/9/31f954c8492f28b216c3140a3186d450/FHC_Mindy_Media_podcast-20260713-cfprlauhsn.jpg",
    "thumb": "/episodes/ep-000.jpg"
  },
  {
    "title": "The Woman Who Wrote CMMC: The $250K \"Compliance Cost\" Is a Lie | EP: 334",
    "date": "2026-07-22",
    "description": "CMMC compliance is one of the most misunderstood requirements in government contracting, and the rumor that it costs small businesses $250,000 is simply not true. In this episode, Eric Coffie sits down with Katie Arrington, the architect behind CMMC, to break down what the real audit actually costs, why the rule was just paused for 60 days, and what small businesses need to know before making any decisions. If you have ever felt confused or priced out by CMMC headlines, this conversation sets…",
    "duration": "27:10",
    "link": "https://govcongiants.libsyn.com/the-woman-who-wrote-cmmc-the-250k-compliance-cost-is-a-lie-ep-334",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Audio_2_Katie_Eric_part_2.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/c/c/c/9ccc6383bf76a23a16c3140a3186d450/ep._334.png",
    "thumb": "/episodes/ep-001.jpg"
  },
  {
    "title": "The Side Door Strategy For Winning Subcontracts With Defense Primes",
    "date": "2026-07-21",
    "description": "Landing subcontracts with prime contractors like Boeing, Lockheed Martin, and L3Harris starts long before you ever pick up the phone, and most small businesses skip the steps that actually get them noticed. In this clip, a govcon entrepreneur breaks down the exact sequence he used to move from cold outreach to a signed, ongoing contract with a major defense prime. If you've been stuck trying to get a capability briefing to turn into real work, this is the roadmap. How to register on a prime…",
    "duration": "09:29",
    "link": "https://govcongiants.libsyn.com/the-side-door-strategy-for-winning-subcontracts-with-defense-primes",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Zack_Audio_Clip_1__Why_Your_Proposal_Lost_AI_Knows_Zack_Golden111325_.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/a/4/0/1a405bdc4b45a667d959afa2a1bf1c87/FHC_Mindy_Media_podcast-20260714-cffxzg3z7m.jpg",
    "thumb": "/episodes/ep-002.jpg"
  },
  {
    "title": "How to Find Federal Contracts Before They Hit SAM.gov With No Experience",
    "date": "2026-07-20",
    "description": "Capture management in government contracting means getting ahead of a solicitation months before it ever hits SAM.gov, and this episode breaks down exactly how to do it using FPDS data, NAICS and PSC codes, and direct outreach to program offices. Whether you're an aspiring entrepreneur trying to land your first federal contract or an active contractor looking to sharpen your business development process, this walkthrough gives you a real, repeatable framework. You'll learn how to research…",
    "duration": "11:04",
    "link": "https://govcongiants.libsyn.com/how-to-find-federal-contracts-before-they-hit-samgov-with-no-experience",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_1_Capture_500K_Deals_Before_the_RFP_Drops__Ryan_110725_.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/0/2/b/802b632028d1a0add959afa2a1bf1c87/FHC_Mindy_Media_podcast-20260712-ltyfdt3tu4.jpg",
    "thumb": "/episodes/ep-003.jpg"
  },
  {
    "title": "3 Subcontracting Mistakes That Can Bankrupt a Small Government Contractor Fast",
    "date": "2026-07-19",
    "description": "Government contracting subcontracting rules can make or break your first federal deal, and this episode breaks down exactly what small business owners need to know before signing with a large prime. Eric Coffie walks through real lessons learned from being subcontracted, being burned by big companies, and eventually building his own subcontracting strategy from the ground up. Whether you are new to govcon or already chasing your next teaming agreement, this conversation covers the details most…",
    "duration": "08:09",
    "link": "https://govcongiants.libsyn.com/how-one-subcontractor-turned-a-40000-dispute-into-a-federal-contracting-lesson",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2-12__Clip_2__0_to_100K_Subcontract_Secrets_-_Eric_Coffie_120225_.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/a/8/a/8a8a0365d11401ff16c3140a3186d450/FHC_Mindy_Media_podcast-20260712-b1vicke0ep.jpg",
    "thumb": "/episodes/ep-004.jpg"
  },
  {
    "title": "How To Build A Business Foundation When You Have No Experience At All",
    "date": "2026-07-18",
    "description": "What does hitting a target 500 yards away with iron sights have to do with building a business from nothing? In this episode, David Rambhajan breaks down the sharpshooter strategy he learned in Marine Corps boot camp and how mastering short range goals before chasing the big win changed how he approaches business, career, and opportunity. How a $5 lawn mowing job at age 14 sparked a lifelong entrepreneurial mindset Why applying for a job with zero experience and no degree still worked out How…",
    "duration": "10:55",
    "link": "https://govcongiants.libsyn.com/how-to-build-a-business-foundation-when-you-have-no-experience-at-all",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/7-8_Clip_1__Sharpshooter_Strategy_Building_a_Foundation_for_Success_-_David_Rambhajan_080725_.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/b/e/5/6/be56882bdf1651f7d959afa2a1bf1c87/FHC_Mindy_Media_podcast-20260712-aje7luuglj.jpg",
    "thumb": "/episodes/ep-005.jpg"
  },
  {
    "title": "How to Turn a $50K Line Item Into Steady Progress Payments",
    "date": "2026-07-17",
    "description": "Getting paid on a government construction contract is where most new contractors get stuck, and it usually is not about the work, it is about how you structure your billing. In this episode, Eric Coffie walks through the schedule of values line by line and shows exactly how to break a project into phases so cash flows in before the job is done. If you have ever wondered how you actually invoice the government without waiting a full year to see a dollar, this one solves it. How the schedule of…",
    "duration": "11:23",
    "link": "https://govcongiants.libsyn.com/how-to-turn-a-50k-line-item-into-steady-progress-payments",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Clip_1__2-6_Give_me_my_MONEY_-_Eric_Coffie_060226_.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/0/7/8/e078bea4d4e84e10d959afa2a1bf1c87/FHC_Mindy_Media_podcast-20260711-04nm62slnx.jpg",
    "thumb": "/episodes/ep-006.jpg"
  },
  {
    "title": "Why Smart Contractors Use Government Work to Survive Recessions and Storm Slowdowns",
    "date": "2026-07-16",
    "description": "Recession proofing your business starts with diversifying beyond a single revenue stream, and this episode shows exactly how one roofing contractor did it by adding government subcontracting to his private sector work. After surviving a brutal recession and watching third-generation roofing companies disappear after storm cycles dried up, West Edwards turned to federal and government contract work as a hedge, and breaks down the patience, timing, and relationship strategy it took to make it pay…",
    "duration": "09:58",
    "link": "https://govcongiants.libsyn.com/why-smart-contractors-use-government-work-to-survive-recessions-and-storm-slowdowns",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/12-6_Clip_1__Be_Patient_Protect_Yourself_FHC_Training_-_West_Edwards_061225_.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/5/9/2/65927c2a680e00b916c3140a3186d450/FHC_Mindy_Media_podcast-20260712-irwu7ooqua.jpg",
    "thumb": "/episodes/ep-007.jpg"
  },
  {
    "title": "How to Use NAICS and PSC Codes to Find Government Buyers for Your Products | EP: 333",
    "date": "2026-07-15",
    "description": "Learning how to win a government contract starts with something most small businesses overlook entirely: making sure the government can actually find you. In this live GovCon Giants Q&A, Eric Coffie and co-host Maria Martinez bring real audience members on stage to troubleshoot their SAM.gov profiles, pricing strategy, and search for buyers in real time, live on air. Learn why an incomplete Dynamic Small Business Search (DSBS) profile makes you invisible to contracting officers searching by…",
    "duration": "01:19:53",
    "link": "https://govcongiants.libsyn.com/how-to-use-naics-and-psc-codes-to-find-government-buyers-for-your-products-ep-333",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/333_July-15_How_To_Win_Your_First_Government_Contract___Step_By_Step_Guide_To_Start_Government_Contracts.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/a/b/0/2/ab023373ad76792816c3140a3186d450/ep._333.png",
    "thumb": "/episodes/ep-008.jpg"
  },
  {
    "title": "2 Red Flags That Mean You Should Skip That Government Contract Bid",
    "date": "2026-07-14",
    "description": "Government contracting bids aren't all created equal, and knowing which ones to walk away from can save you hours of wasted proposal work. In this clip, Ryan Atencio a government contracting expert breaks down the two clearest warning signs that a solicitation is already wired for someone else, so you can stop chasing bids you were never going to win and focus your energy where you actually have a shot. Learn why a seven day RFP deadline usually means the government already has someone lined…",
    "duration": "10:00",
    "link": "https://govcongiants.libsyn.com/2-red-flags-that-mean-you-should-skip-that-government-contract-bid",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/5-12__Clip_1_Kill__90_of_Bad_Bids_in_48_Hours_with_Ryan_Atencio_120525_.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/c/9/1/f/c91ffb1ab27a6213d959afa2a1bf1c87/FHC_Mindy_Media_podcast-20260712-g6mpdgalzv.jpg",
    "thumb": "/episodes/ep-009.jpg"
  },
  {
    "title": "How Small Business Owners Can Use Subcontracting to Land Their First Federal Contract",
    "date": "2026-07-13",
    "description": "Government subcontracting is the fastest way to break into federal contracting when you have no money, no team, and no resources, and in this episode Eric Coffie shares the exact path he took the two times he was most broke in his career. Before he ever won a prime contract, Eric built his business by subcontracting for someone else, and he breaks down why that pathway still works for small business owners and aspiring entrepreneurs today. If you feel stuck trying to figure out how to break in…",
    "duration": "09:44",
    "link": "https://govcongiants.libsyn.com/how-small-business-owners-can-use-subcontracting-to-land-their-first-federal-contract",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2-12__Clip_1__0_to_100K_Subcontract_Secrets_-_Eric_Coffie_120225_.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/c/8/8/9/c889ef868f3f7a83d959afa2a1bf1c87/FHC_Mindy_Media_podcast-20260711-eez5g5khyg.jpg",
    "thumb": "/episodes/ep-010.jpg"
  },
  {
    "title": "What It Really Takes to Land Your First Federal Subcontract With No Money",
    "date": "2026-07-12",
    "description": "Government contracting subcontracts might be the fastest path to your first six-figure win, and Eric Coffie proves it with his own story. In this episode, Randie Ward opens up about the two lowest points in his federal contracting journey, and how subcontracting pulled him out both times. If you're stuck trying to figure out how to break into govcon with no money and no track record, this is the roadmap. How Eric landed his first $1.2 million contract as a subcontractor with zero capital of his…",
    "duration": "15:34",
    "link": "https://govcongiants.libsyn.com/what-it-really-takes-to-land-your-first-federal-subcontract-with-no-money",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Clip_1_1-11_Small_Moves_Big_GovCon_Wins_-_Randie_Ward_110125_.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/d/a/e/8/dae84b4f2986b2fed959afa2a1bf1c87/FHC_Mindy_Media_podcast-20260711-egtt77nbru.jpg",
    "thumb": "/episodes/ep-011.jpg"
  },
  {
    "title": "How to Choose the Right Small Business Certification for Federal Contracting Success",
    "date": "2026-07-11",
    "description": "Government contracting certifications like MBE, DBE, veteran-owned, and 8(a) can open doors, but holding a certification does not guarantee work. In this episode, David Rambhajan breaks down why so many small business owners get certified and then wait for contracts that never come, and shares the framework he used to turn certifications into a profitable, sellable government contracting business. Learn why certification alone does not equal contract wins, and what you actually need to do with…",
    "duration": "10:37",
    "link": "https://govcongiants.libsyn.com/how-to-choose-the-right-small-business-certification-for-federal-contracting-success",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/3-10__Clip_1__Leveraging_Government_Small_Business_Programs_-_David_Rambhajan_100325_.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/4/9/0/c/490c580ef819276316c3140a3186d450/FHC_Mindy_Media_podcast.jpg",
    "thumb": "/episodes/ep-012.jpg"
  },
  {
    "title": "Why Full and Open Competition Is Rigged and 8a Contracts Are Actually Fairer",
    "date": "2026-07-10",
    "description": "The 8a sole source process is one of the most misunderstood tools in federal contracting, and this episode breaks down exactly why most certified firms never use it correctly. Eric Coffie walks through real sole source award data, dispels the misinformation circulating about the program's future, and explains why understanding this process puts you ahead of the 4,000 plus 8a companies still confused about how it works. If you're sitting on a certification you haven't leveraged, this is the…",
    "duration": "08:25",
    "link": "https://govcongiants.libsyn.com/why-full-and-open-competition-is-rigged-and-8a-contracts-are-actually-fairer",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/21-1_Sources_Sought_Free_Marketing_-_Eric_Coffie_012126_1.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/2/6/8/0268dde1073b417416c3140a3186d450/1_FHC_Podcast_Artwork-20260628-5ap2cmzq8z.png",
    "thumb": "/episodes/ep-013.jpg"
  },
  {
    "title": "How to Draft a Winning Sources Sought Response Step by Step",
    "date": "2026-07-09",
    "description": "Sources sought responses can make or break your shot at a federal contract, and most small businesses are leaving money on the table by treating every requirement the same way. In this episode, Ryan Atencio sits down for a candid, in-the-weeds conversation on how to use AI to draft sources sought responses, build proposals from your past performance, and turn casual conversations with government customers into real task orders. If you've ever stared at a blank cover page wondering where to…",
    "duration": "07:30",
    "link": "https://govcongiants.libsyn.com/how-to-draft-a-winning-sources-sought-response-step-by-step",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/22-1_Find_Your_Competitors_Secret_Contracts_in_60_Seconds_with_Ryan_Atencio_012226-2.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/6/5/6/0656ec091e718fd216c3140a3186d450/1_FHC_Podcast_Artwork-20260628-lm5ow0b6sr.png",
    "thumb": "/episodes/ep-014.jpg"
  },
  {
    "title": "How She Won $5 Million In Federal Contracts With No Past Performance | EP: 332",
    "date": "2026-07-08",
    "description": "Winning your first government contract with no past performance and no capital sounds impossible, but Randy Ward did exactly that and scaled it into millions. In this episode, host Eric Coffie sits down with the President of AlchemyGov to break down how strategic partnerships and teaming let small businesses bid on contracts far bigger than they could ever chase alone. If you have been sitting on the sidelines watching the government spend more while you win nothing, this is the alternative…",
    "duration": "47:53",
    "link": "https://govcongiants.libsyn.com/how-she-won-5-million-in-federal-contracts-with-no-past-performance-ep-332",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/332_July-8_How_She_Landed_Her_First_Government_Contract_As_A_Beginner.mp4?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/2/3/c/e23c35f5795ed15216c3140a3186d450/ep._332-20260709-fgjpty5jbx.png",
    "thumb": "/episodes/ep-015.jpg"
  },
  {
    "title": "What a 20 Million Dollar Proposal Rejection Taught This Govcon Consultant About AI",
    "date": "2026-07-07",
    "description": "Government proposal writing can fall apart over a single missed sentence, and that's exactly what happened on a $20 million, five-year federal contract that proposal strategist Zach Golden still calls his \"nightmare.\" In this episode, Zach breaks down his stage-by-stage proposal process, from building a bid/no-bid matrix to using AI for compliance checks, and explains the costly lesson that changed how he reviews every requirement before submission. Key takeaways from this episode: How to build…",
    "duration": "08:20",
    "link": "https://govcongiants.libsyn.com/what-a-20-million-dollar-proposal-rejection-taught-this-govcon-consultant-about-ai",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/22-1_Why_Your_Proposal_Lost_AI_Knows_-_Zach_Golden_12226_2.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/4/d/8/34d8374eed27921a16c3140a3186d450/1_FHC_Podcast_Artwork-20260628-gtt7va813f.png",
    "thumb": "/episodes/ep-016.jpg"
  },
  {
    "title": "How Subcontractors Can Build Prime Relationships by Showing Up at Federal Site Visits",
    "date": "2026-07-06",
    "description": "If you're losing federal opportunities because you keep finding solicitations after the site visit already happened or the deadline is five days out, this episode breaks down the exact saved-search workflow that fixes it. Ryan Atencio walks through how to manage SAM.gov saved searches, flag sole-source listings before wasting time on them, and turn a same-day catch into a real shot at the award. This is a hands-on, practical look at the habits that separate contractors who consistently win from…",
    "duration": "08:49",
    "link": "https://govcongiants.libsyn.com/how-subcontractors-can-build-prime-relationships-by-showing-up-at-federal-site-visits",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/16-1_Federal_Business_101_Cracking_the_Code_of_How_the_Government_Buys_with_Ryan_Atencio_011626_1.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/f/d/a/8/fda863bb58010b5016c3140a3186d450/1_FHC_Podcast_Artwork-20260628-rwh7qweaf2.png",
    "thumb": "/episodes/ep-017.jpg"
  },
  {
    "title": "The Free Government Tool Most Small Business Owners Never Knew Existed",
    "date": "2026-07-05",
    "description": "If your 8(a) application has been sitting in the SBA queue with no movement, there's a free, legal escalation tool most small business owners have never heard of: the congressional privacy release form. In this episode, Eric Coffie breaks down exactly how he used a simple digital form to trigger a congressional inquiry into a stalled SBA application, and what happened within hours of submitting it. If you're stuck waiting on certification and don't know who to call, this is the playbook. Learn…",
    "duration": "07:29",
    "link": "https://govcongiants.libsyn.com/the-free-government-tool-most-small-business-owners-never-knew-existed",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/13-1_Sources_Sought_Free_Marketing_-_Eric_Coffie_011326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/d/b/1/3/db135439dc4ab6f716c3140a3186d450/1_FHC_Podcast_Artwork-20260628-4196tad06u.png",
    "thumb": "/episodes/ep-018.jpg"
  },
  {
    "title": "How To Build Relationships With Contracting Officers Before The RFP Even Drops",
    "date": "2026-07-04",
    "description": "Building relationships with contracting officers before a solicitation ever drops is one of the most overlooked strategies in federal contracting, and it's exactly what separates small businesses who win from those who just show up to bid. In this clip from the Federal Help Center podcast, Randie Ward breaks down how one small business turned years of relationship building into a $2 million job order contract win, plus a federal opportunity that got shortlisted simply because the right people…",
    "duration": "07:49",
    "link": "https://govcongiants.libsyn.com/how-to-build-relationships-with-contracting-officers-before-the-rfp-even-drops",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/20-1_Be_Found_Before_You_Bid_-_Randie_Ward_012026.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/d/d/d/5/ddd518fdcbfd3e3d16c3140a3186d450/1_FHC_Podcast_Artwork-20260628-djxjwgrmc6.png",
    "thumb": "/episodes/ep-019.jpg"
  },
  {
    "title": "What It Takes to Form an 8a Joint Venture With a Tribal Company",
    "date": "2026-07-03",
    "description": "If you're trying to win federal contracts with no past performance, this episode breaks down exactly how 8(a) joint ventures solve that problem. A govcon consultant walks through how he used JV partnerships and tribal 8(a) entities to win sole source work before his own company had a track record, and why relationships built over decades still beat any cold outreach strategy. Whether you're new to federal contracting or scaling an 8(a) firm, this is a real-world playbook for bridging the past…",
    "duration": "10:21",
    "link": "https://govcongiants.libsyn.com/what-it-takes-to-form-an-8a-joint-venture-with-a-tribal-company",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/12-5_Learn_How_to_Estimate_Properly_-_Eric_Coffie_051226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/c/c/4/8cc49751b7402f3e16c3140a3186d450/1_FHC_Podcast_Artwork-20260628-sgyv5zosem.png",
    "thumb": "/episodes/ep-020.jpg"
  },
  {
    "title": "How To Know If Your Government Contract Proposal Pricing Is Actually Competitive",
    "date": "2026-07-02",
    "description": "Wondering how to price a government contract proposal so it actually wins? In this episode, Ryan Atencio breaks down the exact pricing logic he's used for nearly a decade selling directly to the government and helping other businesses do the same. If you've ever felt unsure whether your bid is too high, too low, or just right, this episode gives you a real framework to check your work. Learn how to reverse engineer a competitor's winning award price after you lose a bid, so your next proposal…",
    "duration": "07:55",
    "link": "https://govcongiants.libsyn.com/how-to-know-if-your-government-contract-proposal-pricing-is-actually-competitive",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/9-1_Make_the_RFP_Beg_for_YOU_with_Ryan_Atencio_010926.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/4/9/7/7/497765f9ea0abd8916c3140a3186d450/1_FHC_Podcast_Artwork-20260628-dz63ymyglj.png",
    "thumb": "/episodes/ep-021.jpg"
  },
  {
    "title": "Three Ways to Turn Your Existing Skills Into Real Income Right Now | EP: 331",
    "date": "2026-07-01",
    "description": "Making your first 10000 dollars doesn't require an LLC, a business plan, or any startup capital — just skills you already have and the willingness to use them differently. In this episode, Eric Coffie breaks down three real strategies he's personally used to help people generate $5,000 to $10,000 quickly, even with zero business infrastructure in place. If you've ever felt like you don't have enough resources to get started, this episode will show you exactly what's already in your hands. Learn…",
    "duration": "32:28",
    "link": "https://govcongiants.libsyn.com/three-ways-to-turn-your-existing-skills-into-real-income-right-now-ep-331",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/331_July_1_No_Business__No_Problem__3_Ways_to_Make_10K_Fast_with_What_You_Already_Know_1.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/1/0/f/e10f527a46fb657316c3140a3186d450/ep._331.png",
    "thumb": "/episodes/ep-022.jpg"
  },
  {
    "title": "How small business owners can use capability statements as a follow up marketing tool",
    "date": "2026-06-30",
    "description": "Most capability statements get sent once and never updated, which is exactly why government reps forget who you are. In this episode, Zach Golden walks through a live capability statement grading session, showing exactly what scores high, what gets flagged, and why trying to list too many services actually hurts your chances. If you've ever wondered whether your capability statement is actually working for you, this breakdown will show you what to fix first. Why doing 12 things instead of one…",
    "duration": "08:36",
    "link": "https://govcongiants.libsyn.com/how-small-business-owners-can-use-capability-statements-as-a-follow-up-marketing-tool",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/8-1_AI_Builds_Your_100K_Capability_Statement_-_Zach_Golden_010826_1.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/f/9/2/0f9208e75a8b0a18d959afa2a1bf1c87/1_FHC_Podcast_Artwork-20260628-bd6yokhyy6.png",
    "thumb": "/episodes/ep-023.jpg"
  },
  {
    "title": "What every small business needs to know about CMMC compliance before working with DOD",
    "date": "2026-06-29",
    "description": "If you're trying to win Department of Defense contracts, understanding PIEE, CMMC, and your SPRS score isn't optional, it's the baseline. In this episode, Randie Ward breaks down exactly how to register inside PIEE, why CMMC compliance levels matter more than ever, and why a negative SPRS score doesn't mean you're disqualified. This is the practical, no-fluff walkthrough every small business needs before bidding on DOD work. How to register inside PIEE and navigate the training tiles for SBIRS…",
    "duration": "08:18",
    "link": "https://govcongiants.libsyn.com/what-every-small-business-needs-to-know-about-cmmc-compliance-before-working-with-dod",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/6-1_Ready_Set_Go-_Procurement_Readiness_-_Randie_Ward_010626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/4/1/f/141fd427e5d9d07216c3140a3186d450/1_FHC_Podcast_Artwork-20260628-r77od1a441.png",
    "thumb": "/episodes/ep-024.jpg"
  },
  {
    "title": "The exact letter format that gets business opportunity specialists to respond fast",
    "date": "2026-06-28",
    "description": "Most 8(a) business opportunity specialists won't lift a finger for you, and it's not because the program is broken, it's because nobody taught you how to ask. In this episode, Eric Coffie breaks down the exact package he uses to turn an unresponsive SBA contact into an advocate who writes letters straight to federal agencies on his behalf. If you've ever been told \"that's not our job\" by your BOS, this episode hands you the fix. Why most 8(a) firms get ignored by their business opportunity…",
    "duration": "08:55",
    "link": "https://govcongiants.libsyn.com/the-exact-letter-format-that-gets-business-opportunity-specialists-to-respond-fast",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/6-1_GSA_Schedule_388K_Air_Handler_Hack_-_Eric_Coffie_010626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/3/1/0/0310048358661e4ad959afa2a1bf1c87/1_FHC_Podcast_Artwork.png",
    "thumb": "/episodes/ep-025.jpg"
  },
  {
    "title": "How Small Businesses Use Set-Asides and Joint Ventures to Beat Large Incumbent Contractors",
    "date": "2026-06-27",
    "description": "Shaping a government solicitation before the RFP drops is one of the most powerful competitive moves a small business can make and in this episode, Ryan Atencio walks through a live sources sought response strategy designed to nudge an active DoD training requirement toward a small business set-aside on Seaport Next Generation. This is real BD strategy in action, not theory. How to structure a sources sought response that recommends minimum requirements, acquisition strategy, and contract type…",
    "duration": "11:07",
    "link": "https://govcongiants.libsyn.com/how-small-businesses-use-set-asides-and-joint-ventures-to-beat-large-incumbent-contractors",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_30-1_How_to_Get_Into_the_Room_Before_the_RFP_Drops_Legally_with_Ryan_Atencio_013026.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/4/6/d/1/46d17d3f1ae145f1d959afa2a1bf1c87/FHC_Podcast_Artwork-20260606-q0v8y414vx.png",
    "thumb": "/episodes/ep-026.jpg"
  },
  {
    "title": "Why HUBZone Price Preference Rarely Works in Practice and What to Do on an IDIQ Instead",
    "date": "2026-06-26",
    "description": "IDIQ contract strategy is one of the most underused paths to scaling federal revenue fast, especially when you have no past performance and no certifications to lean on. In this clip from the Federal Help Center, Eric Coffie breaks down exactly how IDIQ vehicles work in the real world, how he leveraged a single contract across multiple Navy bases, and why you do not need to be certified to get on one as a subcontractor. What you will learn in this episode: How to sub onto an IDIQ without any…",
    "duration": "09:31",
    "link": "https://govcongiants.libsyn.com/why-hubzone-price-preference-rarely-works-in-practice-and-what-to-do-on-an-idiq-instead",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_2_3-2_500K_Scale_No_Experience_Needed_-_Eric_Coffie_020326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/4/e/0/5/4e05b94d791a2764d959afa2a1bf1c87/FHC_Podcast_Artwork-20260614-cvvlclxqa1.png",
    "thumb": "/episodes/ep-027.jpg"
  },
  {
    "title": "What to Do When Someone Claims They Can Get You Guaranteed Government Contracts",
    "date": "2026-06-25",
    "description": "If you've ever wondered how to verify government contract outreach is legitimate, this episode breaks down exactly what to look for before you respond to that surprise DOD or Air Force email. A small business owner shares a message he received from a self-described government partner asking to \"share his account list,\" and Colin and the Federal Help Center community walk through how to separate a real opportunity from a setup. Key takeaways from this episode: How to cross-reference a contact's…",
    "duration": "10:57",
    "link": "https://govcongiants.libsyn.com/what-to-do-when-someone-claims-they-can-get-you-guaranteed-government-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_2_7-4_Tuesday_Night_Q__A_-_Colin_Nchako_040726.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/e/0/2/6e02c66517ffaf5116c3140a3186d450/FHC_Podcast_Artwork-20260614-j6xex79dbt.png",
    "thumb": "/episodes/ep-028.jpg"
  },
  {
    "title": "How to make your first $20K in government contracting with no experience or money | EP: 330",
    "date": "2026-06-24",
    "description": "Making your first $20K in government contracting with no experience, no past performance, and no capital is not just possible Eric Coffie has done it with complete beginners, including a kindergarten teacher who went on to earn six figures in the federal market. In this episode, Eric pulls a module directly out of GovCon Giants' consulting program and teaches it live, completely free, walking you through the exact five-step process he used to train Maria Martinez and his son Brandon to land…",
    "duration": "37:46",
    "link": "https://govcongiants.libsyn.com/how-to-make-your-first-20k-in-government-contracting-with-no-experience-or-money-ep-330",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/330_June_24_How_to_make_your_first_20K_if_youre_broke__Government_Contracting.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/4/9/8/3/4983757d94a48924d959afa2a1bf1c87/ep._330.png",
    "thumb": "/episodes/ep-029.jpg"
  },
  {
    "title": "Why Submitting a Sources Sought Response Can Cut 80 Percent of Your Competition",
    "date": "2026-06-23",
    "description": "Learning how to write a sources sought response could be the single highest-leverage move you make in federal contracting this year. In this episode, Ryan Atencio walks through a real sources sought response he just submitted, line by line, showing exactly how to nudge a solicitation's set-aside, evaluation criteria, and contract vehicle before it ever goes live. If you've ever felt like the government writes RFPs for someone else and you're just hoping to qualify, this episode shows you how to…",
    "duration": "09:54",
    "link": "https://govcongiants.libsyn.com/why-submitting-a-sources-sought-response-can-cut-80-percent-of-your-competition",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_1_9-1_Make_the_RFP_Beg_for_YOU_with_Ryan_Atencio_010926.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/2/7/b/3/27b3ddb7fea712efd959afa2a1bf1c87/FHC_Podcast_Artwork-20260614-xhnb0ycd09.png",
    "thumb": "/episodes/ep-030.jpg"
  },
  {
    "title": "Why Most 8(a) Businesses Never Get Sole Source Contracts and How to Fix That",
    "date": "2026-06-22",
    "description": "If you've ever read a sources sought notice and had no idea what to do with it, this episode is your roadmap. Eric Coffie breaks down exactly how 8(a) companies are supposed to \"self-market,\" why most contractors never get the sole source work they were promised, and how a single email to your SBA Business Opportunity Specialist can put your name in front of a contracting officer. Whether you're already certified, working toward 8(a), or just starting to explore federal contracting as a…",
    "duration": "14:18",
    "link": "https://govcongiants.libsyn.com/why-most-8a-businesses-never-get-sole-source-contracts-and-how-to-fix-that",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_eting_-_Eric_Coffie_011326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/f/3/b/b/f3bbec81582f7bcbd959afa2a1bf1c87/FHC_Podcast_Artwork-20260614-gx0bqj3spk.png",
    "thumb": "/episodes/ep-031.jpg"
  },
  {
    "title": "How to Use PSC Codes to Find More Government Contract Opportunities Fast",
    "date": "2026-06-21",
    "description": "If you're trying to figure out NAICS code size standards before registering for federal contracts, this episode breaks down exactly how those numbers determine whether your business stays small or gets bumped into the large category. Randie Ward walks through real examples using janitorial and construction codes so you can see how to pick a primary NAICS code that lets your business grow without losing small business status. Whether you're brand new to govcon or already holding contracts, this…",
    "duration": "08:45",
    "link": "https://govcongiants.libsyn.com/how-to-use-psc-codes-to-find-more-government-contract-opportunities-fast",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_1_12-1_Turn_1_NAICS_Code_Into_Contract_Opportunities_-_Randie_Ward_11226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/b/c/2/c/bc2c71bd79088f8e16c3140a3186d450/FHC_Podcast_Artwork-20260614-9jp0spqiv9.png",
    "thumb": "/episodes/ep-032.jpg"
  },
  {
    "title": "What Government Representatives Look for When They Read Your Capability Statement",
    "date": "2026-06-20",
    "description": "If you've been putting off writing your capability statement because you don't know where to start, this episode shows you exactly how to use AI to build one from scratch. Zack Golden walks through a real example with a small construction firm, turning basic business details into a polished, professional capability statement in real time. Whether you're brand new to government contracting or just need to clean up your existing document, this step-by-step walkthrough gives you a template you can…",
    "duration": "09:26",
    "link": "https://govcongiants.libsyn.com/what-government-representatives-look-for-when-they-read-your-capability-statement",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_1_8-1_AI_Builds_Your_100K_Capability_Statement_-_Zach_Golden_010826.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/d/2/e/9/d2e95ef5c1b44e5ed959afa2a1bf1c87/FHC_Podcast_Artwork-20260614-du9x7av3we.png",
    "thumb": "/episodes/ep-033.jpg"
  },
  {
    "title": "Why Sole Source Contracts Disappear After You Graduate From the 8a Program",
    "date": "2026-06-19",
    "description": "8a program graduation can completely change a small business's pipeline overnight, and most contractors don't see it coming until it's too late. In this episode, a construction company owner walks through how he built a $16 billion backlog of IDIQ contracts before hitting the $250 million 8a cap, what happened to his sole source work once he graduated, and how he later sold the company entirely. If you're a government contractor watching your 8a clock run out, this episode shows you exactly how…",
    "duration": "10:35",
    "link": "https://govcongiants.libsyn.com/why-sole-source-contracts-disappear-after-you-graduate-from-the-8a-program",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_1_12-5_Learn_How_to_Estimate_Properly_-_Eric_Coffie_-_Cecil_051226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/a/2/5/3a25fd05df3934a016c3140a3186d450/FHC_Podcast_Artwork-20260614-r29wljt3sb.png",
    "thumb": "/episodes/ep-034.jpg"
  },
  {
    "title": "What Aspiring GovCon Consultants Can Learn From This AI Proposal Workflow",
    "date": "2026-06-18",
    "description": "If you're searching for how to find government contract opportunities and actually keep up with them, this episode is a real-time, screen-share walkthrough of exactly how it's done. Ryan Atencio shows the entire process of spotting an opportunity, evaluating it, and moving it through a pipeline, no theory, just the actual workflow. Whether you're already bidding or just trying to understand how serious contractors stay organized, this episode breaks down a system you can copy today. In this…",
    "duration": "10:22",
    "link": "https://govcongiants.libsyn.com/what-aspiring-govcon-consultants-can-learn-from-this-ai-proposal-workflow",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_2_7-5_What_the_Gurus_Dont_Teach_The_DoW_End-User_Direct_Strategy_with_Ryan_Atencio_050726_1.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/2/4/5/b/245bb93572d13c1316c3140a3186d450/FHC_Podcast_Artwork-20260614-lq9mvflacf.png",
    "thumb": "/episodes/ep-035.jpg"
  },
  {
    "title": "How to Win Government Contracts With Zero Experience Using Strategic Networking | Ep: 329",
    "date": "2026-06-17",
    "description": "Winning government contracts with zero experience is possible and it starts with one thing most beginners overlook entirely: building intentional relationships before you ever submit a bid. In this episode, Eric Coffie breaks down why your network is your most powerful procurement tool and shares real stories of small business owners who landed multimillion dollar opportunities simply by showing up, talking to people, and making strategic connections. Here is what you will take away from this…",
    "duration": "43:47",
    "link": "https://govcongiants.libsyn.com/how-to-win-government-contracts-with-zero-experience-using-strategic-networking-ep-329",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_2_329_June_17_How_to_Win_Government_Contracts_with_Zero_Experience.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/1/d/f/11dfafa6eac991b1d959afa2a1bf1c87/ep._329.png",
    "thumb": "/episodes/ep-036.jpg"
  },
  {
    "title": "What to Do If You Have No Past Performance for Government Contracts Yet",
    "date": "2026-06-16",
    "description": "If you're trying to build a capability statement for government contracts that actually gets noticed, this episode is exactly what you need. Randie Ward breaks down the real, behind-the-scenes details of what makes a capability statement work, from the documents agencies actually read to the small details that get your company remembered. Whether you're brand new to procurement or refreshing your materials before your next pursuit, this conversation gives you a practical roadmap. Inside this…",
    "duration": "10:12",
    "link": "https://govcongiants.libsyn.com/how-to-write-a-capability-statement-that-actually-wins-federal-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/New_Clip_1_6-1_Ready_Set_Go-_Procurement_Readiness_-_Randie_Ward_010626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/a/d/1/4/ad14c3b41001103116c3140a3186d450/FHC_Podcast_Artwork-20260614-uuzy75vnxp.png",
    "thumb": "/episodes/ep-037.jpg"
  },
  {
    "title": "How to Avoid the 8(a) Application Mistakes That Get Your Paperwork Rejected",
    "date": "2026-06-15",
    "description": "If you've been on the fence about pursuing 8a certification, this episode of the Federal Help Center podcast lays out exactly why 2026 is the year to apply. Eric Coffie breaks down how record-high federal spending, a shrinking industrial base, and a looming SBA audit are creating a narrow window for small businesses to lock in one of govcon's most powerful set-asides. Whether you're an active contractor weighing your next move or just starting to explore government contracting, this…",
    "duration": "01:20:30",
    "link": "https://govcongiants.libsyn.com/how-to-avoid-the-8a-application-mistakes-that-get-your-paperwork-rejected",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Clip_1_6-1_GSA_Schedule_388K_Air_Handler_Hack_-_Eric_Coffie_010626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/2/8/f/b/28fb67937290e36b16c3140a3186d450/FHC_Podcast_Artwork-20260614-9gdqgvguwi.png",
    "thumb": "/episodes/ep-038.jpg"
  },
  {
    "title": "Find Your Competitor's Contracts in 60 Seconds and Use That Intel to Win",
    "date": "2026-06-14",
    "description": "Capture management is the govcon skill most small businesses ignore, and it's exactly why they keep losing to companies that start working the opportunity before the RFP ever drops. In this episode, Ryan Atencio pulls back the curtain on his live source-sought response process, showing exactly how he shapes solicitations to scope toward his company, knock out low-price competitors, and signal to the government that his firm is the obvious choice before evaluation even begins. What you'll learn…",
    "duration": "10:57",
    "link": "https://govcongiants.libsyn.com/find-your-competitors-contracts-in-60-seconds-and-use-that-intel-to-win",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/22-1_Find_Your_Competitors_Secret_Contracts_in_60_Seconds_with_Ryan_Atencio_012226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/5/7/b/0/57b05849a216f56e16c3140a3186d450/FHC_Podcast_Artwork-20260606-6khpg1tr1v.png",
    "thumb": "/episodes/ep-039.jpg"
  },
  {
    "title": "How to Find the Proposal Errors That Get Small Businesses Disqualified Every Time",
    "date": "2026-06-13",
    "description": "Government proposal mistakes are quietly disqualifying small businesses before the government ever looks at their price — and most contractors never know exactly why they lost. In this episode, Zach Golden break down real-world examples of how contradictions in solicitations and missed documentation requirements are sinking bids, and exactly how AI tools can catch those errors before you submit. What you'll learn in this episode: How to handle contradictory solicitation documents when two…",
    "duration": "09:35",
    "link": "https://govcongiants.libsyn.com/how-to-find-the-proposal-errors-that-get-small-businesses-disqualified-every-time",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/22-1_Why_Your_Proposal_Lost_AI_Knows_-_Zach_Golden_12226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/6/b/2/86b2c3cc004e557d16c3140a3186d450/FHC_Podcast_Artwork-20260606-okcac0pknv.png",
    "thumb": "/episodes/ep-040.jpg"
  },
  {
    "title": "Sources Sought Notices Are Free Marketing and Most Small Businesses Never Respond",
    "date": "2026-06-12",
    "description": "Sources Sought notices on SAM.gov are one of the most underused free marketing tools in federal contracting, and most small businesses scroll right past them. In this episode, Eric Coffie breaks down exactly what happens during the government's market research phase and why your SBA profile could have contracting officers reaching out to you with contract opportunities before a solicitation ever hits the street. What you'll take away from this episode: Sources Sought and RFIs are market…",
    "duration": "06:00",
    "link": "https://govcongiants.libsyn.com/sources-sought-notices-are-free-marketing-and-most-small-businesses-never-respond",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/21-1_Sources_Sought_Free_Marketing_-_Eric_Coffie_012126.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/4/a/3/a/4a3a3eea787b58bad959afa2a1bf1c87/FHC_Podcast_Artwork-20260606-f5a9cwafqy.png",
    "thumb": "/episodes/ep-041.jpg"
  },
  {
    "title": "Government Procurement Decoded | How to Read Solicitations Before Your Competition Does",
    "date": "2026-06-11",
    "description": "Understanding how the government buys is the single biggest unlock for small businesses trying to break into federal contracting. In this episode, govcon expert Ryan Atencio breaks down the mechanics of federal procurement, from the difference between a Statement of Work, Performance Work Statement, and Statement of Objectives, to why submitting proposals consistently is the fastest path to your first contract win. Why submitting proposals even when you're unsure is the repetition strategy that…",
    "duration": "09:55",
    "link": "https://govcongiants.libsyn.com/government-procurement-decoded-how-to-read-solicitations-before-your-competition-does",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/16-1_Federal_Business_101_Cracking_the_Code_of_How_the_Government_Buys_with_Ryan_Atencio_011626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/1/c/3/61c37438b95cff8b16c3140a3186d450/FHC_Podcast_Artwork-20260606-xs47vod295.png",
    "thumb": "/episodes/ep-042.jpg"
  },
  {
    "title": "How to Find a GovCon Consulting Client Without Any Past Performance or Capital | EP: 328",
    "date": "2026-06-10",
    "description": "Govcon consulting is the fastest path into federal contracting for people who don't have past performance, capital, or a lengthy client roster and in 2024, it may also be your fastest path to a life-changing exit. Eric Coffie breaks down exactly how aspiring consultants can identify successful small businesses that are already doing five, seven, or ten million a year but have no one focused on growing them and turn that into a full consulting practice that leads to real federal contracts…",
    "duration": "22:56",
    "link": "https://govcongiants.libsyn.com/how-to-find-a-govcon-consulting-client-without-any-past-performance-or-capital-ep-328",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/328_Win_Your_First_Government_Contract_with_no_Past_Performance.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/d/1/4/ed140171de8c3c87d959afa2a1bf1c87/ep._328.png",
    "thumb": "/episodes/ep-043.jpg"
  },
  {
    "title": "Federal Subcontracting Strategy That Gets You in Front of Project Managers Who Actually Pay",
    "date": "2026-06-09",
    "description": "Federal subcontracting opportunities on SBA's SubNet are one of the most underused tools in govcon, and most small businesses walk right past them. In this episode, Zack Golden breaks down a systematic, research-first approach to identifying large primes with subcontracting plans, getting in front of the right people, and positioning your business as the dependable boots-on-the-ground partner primes actually need. What you'll learn in this episode: How to use SBA's SubNet and the Directory of…",
    "duration": "13:37",
    "link": "https://govcongiants.libsyn.com/federal-subcontracting-strategy-that-gets-you-in-front-of-project-managers-who-actually-pay",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/15-1_Follow_the_Money_Find_Your_Next_Subcontract_-_Zach_Golden_11526_1.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/f/f/5/7/ff57f9a3fb191dcad959afa2a1bf1c87/FHC_Podcast_Artwork-20260606-axmw5ed9iv.png",
    "thumb": "/episodes/ep-044.jpg"
  },
  {
    "title": "Why Building Relationships Gets You Federal Contracts Before the Competition Even Knows",
    "date": "2026-06-08",
    "description": "Government contracting business development is about more than watching SAM.gov every day it's about positioning your company so the right opportunities find you first. In this episode, govcon BD strategist Randie Ward walks through how she helped a small business client become the prime contractor on a $5 million university construction project without ever scrambling for an RFQ. What you'll learn in this episode: Why the tactical vs. strategic split in govcon BD determines whether you're…",
    "duration": "14:20",
    "link": "https://govcongiants.libsyn.com/why-building-relationships-gets-you-federal-contracts-before-the-competition-even-knows",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/20-1_Be_Found_Before_You_Bid_-_Randie_Ward_012026.mp4.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/a/b/a/7/aba7e2e103c40968d959afa2a1bf1c87/FHC_Podcast_Artwork-20260606-luw3fg41bw.png",
    "thumb": "/episodes/ep-045.jpg"
  },
  {
    "title": "How Joint Ventures and Teaming Agreements Work Without Losing Your Small Business Status",
    "date": "2026-06-07",
    "description": "Government contract joint ventures and teaming agreements can unlock multi-million dollar opportunities — but one compliance mistake can cost you your small business status before you ever perform a day of work. In this episode, govcon veteran David Rambhajan breaks down exactly how to structure partnerships the right way so you win bids, stay compliant, and never get blindsided by an affiliation ruling. Affiliation risk in prime-sub relationships — Learn why subcontracting too much work to a…",
    "duration": "13:33",
    "link": "https://govcongiants.libsyn.com/how-joint-ventures-and-teaming-agreements-work-without-losing-your-small-business-status",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Clip_2_27-3_Joint_Ventures_Partnering__Teaming_David_Rambhajan_32727.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/9/8/c/198ccbdf60964cebd959afa2a1bf1c87/FHC_Podcast_Artwork-20260602-prc3bnvvad.png",
    "thumb": "/episodes/ep-046.jpg"
  },
  {
    "title": "The Real Reason Small Businesses Lose Government Contracts After Winning Them",
    "date": "2026-06-06",
    "description": "Government contract communication failures are silently killing small business revenue, and most contractors don't even realize it until the calls stop coming. In this episode, Eric Coffie breaks down the costly lesson behind losing three separate federal contracts, not because the work was bad, but because the team failed to respond to the contracting officer. If you've ever worried that one mistake will end your govcon career, this episode reframes everything. Why Eric's team lost a $5…",
    "duration": "12:35",
    "link": "https://govcongiants.libsyn.com/the-real-reason-small-businesses-lose-government-contracts-after-winning-them",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/3-2_500K_Scale_No_Experience_Needed_-_Eric_Coffie_020326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/c/3/e/3c3e9b1c845648d3d959afa2a1bf1c87/FHC_Podcast_Artwork-20260531-bvtj35uelv.png",
    "thumb": "/episodes/ep-047.jpg"
  },
  {
    "title": "What the Gurus Never Teach About End User Direct Strategy and Winning Federal Contracts",
    "date": "2026-06-05",
    "description": "SAM.gov contracting strategy is more powerful than most gurus admit, and Ryan Atencio has the insider data to prove it. Ryan spent years in the military writing the statements of work that became DOD solicitations, and he reveals that the vast majority of those requirements were completely unforecasted or unforeseen at the start of the fiscal year. If you have been told that by the time an opportunity hits SAM you have already lost, this episode delivers the reality check that could be costing…",
    "duration": "10:22",
    "link": "https://govcongiants.libsyn.com/what-the-gurus-never-teach-about-end-user-direct-strategy-and-winning-federal-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Clip_1_7-5_What_the_Gurus_Dont_Teach_The_DoW_End-User_Direct_Strategy_with_Ryan_Atencio_050726.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/d/4/b/0d4bf61d9d1ff07116c3140a3186d450/FHC_Podcast_Artwork-20260602-51dc4r191r.png",
    "thumb": "/episodes/ep-048.jpg"
  },
  {
    "title": "How Smart Govcon Contractors Use BD and Capture to Build a Consistent Winning Pipeline",
    "date": "2026-06-04",
    "description": "BD vs capture management is one of the most misunderstood distinctions in government contracting, and it may be costing your business real opportunities. In this episode, Zach Golden breaks down exactly how business development and capture management function as two separate but connected disciplines, why confusing them leads to the feast-or-famine cash flow cycle, and how structuring both correctly gives your small business a competitive edge on federal bids. Here is what you will learn in…",
    "duration": "09:58",
    "link": "https://govcongiants.libsyn.com/how-smart-govcon-contractors-use-bd-and-capture-to-build-a-consistent-winning-pipeline",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/29-4_BD_vs_Capture_Management_Framework_That_Wins_Million-Dollar_Bids_-_Zach_Golden_042926.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/5/c/4/e5c4241c747a206516c3140a3186d450/FHC_Podcast_Artwork-20260531-piipv9fbyz.png",
    "thumb": "/episodes/ep-049.jpg"
  },
  {
    "title": "He Went From Street Life to Government Contracts With Zero Connections | EP: 327",
    "date": "2026-06-03",
    "description": "Government contracting partnerships don't start in a boardroom. They start at a security staffing shift, a golf cart shuttle at a congressional event, or a conversation with the building janitor who already knows which contracts are about to drop. Eric Coffie sits down with Washington DC business development consultant Julien Harris, who built his entire govcon practice using the network he already had, a street-level awareness most people overlook, and one idea that changes everything for…",
    "duration": "01:32:46",
    "link": "https://govcongiants.libsyn.com/he-went-from-street-life-to-government-contracts-with-zero-connections-ep-327",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Homeless_to_1M_GovCon__Julien_Harris_SPILLS_Master_Ps_LIVE.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/5/5/4/8554f22a9d5abdd216c3140a3186d450/327.png",
    "thumb": "/episodes/ep-050.jpg"
  },
  {
    "title": "How Govcon Consultants Track Decision Makers Across Agencies Before Contracts Hit SAM.gov",
    "date": "2026-06-02",
    "description": "Finding the government contracting decision maker before an RFP is posted is the difference between a reactive bid and a winning pursuit. In this episode, Randie Ward walks you through the exact research process she uses to identify program managers, contracting officers, and end users at target agencies long before a solicitation ever hits SAM.gov. If you've been waiting for the RFP to drop before you start your outreach, this episode will change how you run your pipeline. How to use…",
    "duration": "08:24",
    "link": "https://govcongiants.libsyn.com/how-govcon-consultants-track-decision-makers-across-agencies-before-contracts-hit-samgov",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/27-1_Find_the_Decision_Maker_Before_They_Post_the_RFP_-_Randie_Ward_012726.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/f/c/8/0fc8ef89c1062e86d959afa2a1bf1c87/FHC_Podcast_Artwork-20260531-ht0pdxn4d3.png",
    "thumb": "/episodes/ep-051.jpg"
  },
  {
    "title": "Why Subcontracting First Is the Smartest Move Before You Pursue a Prime Government Contract",
    "date": "2026-06-01",
    "description": "Subcontracting is not a fallback plan in government contracting — it is the fastest way to learn how federal agencies operate, who the key players are, and how to position yourself to win as a prime. In this Tuesday Night Q&A session, govcon practitioner Colin Nchako breaks down his five-year subcontracting journey and the mindset shift that turned it into a prime-winning career. Sub to prime is a proven roadmap: Colin shares how spending five years as a subcontractor gave him inside access to…",
    "duration": "07:21",
    "link": "https://govcongiants.libsyn.com/why-subcontracting-first-is-the-smartest-move-before-you-pursue-a-prime-government-contract",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/7-4_Tuesday_Night_Q__A_-_Colin_Nchako_040726.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/b/0/c/d/b0cd5a360ba28a3816c3140a3186d450/FHC_Podcast_Artwork-20260531-1mn2t0ksaz.png",
    "thumb": "/episodes/ep-052.jpg"
  },
  {
    "title": "Government Contracting Tools That Help Small Businesses Win More Federal Contracts Faster",
    "date": "2026-05-31",
    "description": "Government contracting tools can either accelerate your business or waste hours of your week clicking between SAM.gov, FPDS, USAspending, and Google Sheets. In this episode Eric Coffie breaks down why most small business contractors are still piecing together free platforms when an all in one system already exists. If you want to know what tools you should be using to grow your federal business, this conversation lays out the new direction and what it means for you. Why piecing together…",
    "duration": "10:02",
    "link": "https://govcongiants.libsyn.com/government-contracting-tools-that-help-small-businesses-win-more-federal-contracts-faster",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/5-5_What_tools_should_I_be_using_that_can_help_me_grow_-_Eric_Coffie_050526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/9/e/2/89e28773889179e6d959afa2a1bf1c87/FHC_Podcast_Artwork-20260526-cvy31e4m5x.png",
    "thumb": "/episodes/ep-053.jpg"
  },
  {
    "title": "Starting a Government Contracting Consulting Business Around AI Companies in 2026",
    "date": "2026-05-30",
    "description": "Marketing a GSA schedule the right way can completely change how a small business grows inside federal contracting, especially when AI and cybersecurity are reshaping every RFI and RFP hitting the street. In this episode Zack Golden and the GovCon Giants team break down how active contractors, aspiring consultants, and entrepreneurs can position themselves around the hottest demand signals in the federal market right now, including AI governance, autonomous systems, and the massive Air Force…",
    "duration": "08:30",
    "link": "https://govcongiants.libsyn.com/starting-a-government-contracting-consulting-business-around-ai-companies-in-2026",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1___29-1_Decode_Million-Dollar_Proposals_in_3_Minutes_-_Zach_Golden.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/7/0/b/670b3dbebdaaa08916c3140a3186d450/FHC_Podcast_Artwork-20260526-iio39xkdtt.png",
    "thumb": "/episodes/ep-054.jpg"
  },
  {
    "title": "How Overhead Costs Will Kill Your Small Business if You Don't Watch Them Carefully",
    "date": "2026-05-29",
    "description": "Small business overhead costs are the silent killer that takes down more government contractors than slow sales ever could. In this episode, West Edwards breaks down exactly how to separate cost of goods from G&A expenses, calculate your real net profit, and spot the moment your overhead starts eating your business alive. If you have ever wondered why your revenue keeps climbing but your bank account does not, this conversation gives you the math to fix it. Learn how to properly split cost of…",
    "duration": "09:32",
    "link": "https://govcongiants.libsyn.com/how-overhead-costs-will-kill-your-small-business-if-you-dont-watch-them-carefully",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/29-1_Profit_Smart__Mastering_Cash_Flow.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/5/0/4/3/5043db5960115087d959afa2a1bf1c87/FHC_Podcast_Artwork-20260526-y7h1isd7h4.png",
    "thumb": "/episodes/ep-055.jpg"
  },
  {
    "title": "Why Most Small Businesses Lose Federal Contracts Before They Even Submit a Bid",
    "date": "2026-05-28",
    "description": "Go no go decision speed is the single biggest reason small businesses lose federal contracts they should have won. In this episode Ryan Atencio breaks down how to shred a solicitation in 48 hours, why teaming partnerships burn another week you don't have, and the exact reason scatterbrained companies keep watching opportunities expire while their competitors submit. If you're stuck in slow bid cycles during the fiscal year end rush, this is the playbook. How to make a fast bid or no bid…",
    "duration": "08:20",
    "link": "https://govcongiants.libsyn.com/why-most-small-businesses-lose-federal-contracts-before-they-even-submit-a-bid",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/30-4_Kill_90_of_Bad_Bids_in_48_Hours_with_Ryan_Atencio_043026.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/1/c/4/e1c40f23c0b7a858d959afa2a1bf1c87/FHC_Podcast_Artwork-20260526-m5sje3oqjf.png",
    "thumb": "/episodes/ep-056.jpg"
  },
  {
    "title": "8 Brutal Truths About Government Subcontracting That No One Tells Small Businesses | Ep: 326",
    "date": "2026-05-27",
    "description": "Government subcontracting is where most small businesses leave millions on the table, and in this episode Eric Coffie breaks down the 8 brutal truths he learned the hard way about working under prime contractors. From going broke in 2015 with a $550 payday loan to closing a $4.2 million subcontract four months later, this is the unfiltered playbook on how subcontracting actually works in the federal market. Here is what you will learn: Why confusing prime contractor rules with subcontractor…",
    "duration": "50:50",
    "link": "https://govcongiants.libsyn.com/8-brutal-truths-about-government-subcontracting-that-no-one-tells-small-businesses-ep-326",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/May_27_GCG_I_Went_From_a_Payday_Loan_to_a_4.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/2/9/4/72946e277842df0bd959afa2a1bf1c87/ep._326.png",
    "thumb": "/episodes/ep-057.jpg"
  },
  {
    "title": "What Procurement Readiness Really Looks Like Before You Walk Into Any Agency",
    "date": "2026-05-26",
    "description": "Government contracting procurement readiness is the difference between being treated like a serious prime and being talked down to by a small business rep who thinks you don't know what you're doing. In this episode of the Federal Help Center Podcast, Randie Ward breaks down exactly how to show up to agency meetings, capabilities briefings, and DOD opportunities with your homework already done. If you've ever wasted a 25-minute meeting because you weren't prepped, this one is for you. Here's…",
    "duration": "08:51",
    "link": "https://govcongiants.libsyn.com/what-procurement-readiness-really-looks-like-before-you-walk-into-any-agency",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/5-5_Ready_Set_Go_-_Procurement_Readiness_-_Randie_Ward_050526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/c/0/a/6c0a3ebe5e8cb8d1d959afa2a1bf1c87/FHC_Podcast_Artwork-20260524-tqv93n49lx.png",
    "thumb": "/episodes/ep-058.jpg"
  },
  {
    "title": "How to Find Prime Contractors and Pitch Tribal 8a Firms for Subcontracts",
    "date": "2026-05-25",
    "description": "How to find prime contractors and pitch them for real subcontracting work is one of the most overlooked skills in federal contracting, and most small businesses get it completely wrong. In this episode of the Federal Help Center podcast, Eric Coffie sits down with Zach Golden to break down a step-by-step research method for stalking primes, profiling tribal 8(a) firms, and writing outreach that actually gets a response. If you've been chasing contracts you can't win solo, this is the workflow…",
    "duration": "10:27",
    "link": "https://govcongiants.libsyn.com/how-to-find-prime-contractors-and-pitch-tribal-8a-firms-for-subcontracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/15_4_Prime_Contractor_Stalking_Method_-_5_Minutes_to_Success_-_Zach_Golden_041526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/6/4/1/06419190d7ba0f5f16c3140a3186d450/FHC_Podcast_Artwork-20260524-jgt1aef11v.png",
    "thumb": "/episodes/ep-059.jpg"
  },
  {
    "title": "The Real Reason Big Primes Run Small Business Cohorts and It Is Not to Help You",
    "date": "2026-05-24",
    "description": "Subcontractor networking is one of the most misunderstood strategies in government contracting, and large GC cohort programs are the biggest reason why. In this episode, Eric Coffie breaks down what programs like the Turner Construction cohort are actually designed to do, and why expecting contracts from them sets small business owners up for disappointment. What you will learn in this episode: Why large general contractors run small business cohort programs and what their real incentive is How…",
    "duration": "06:24",
    "link": "https://govcongiants.libsyn.com/the-real-reason-big-primes-run-small-business-cohorts-and-it-is-not-to-help-you",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/21_4_Get_Ready_for_Next_Quarter_-_Eric_Coffie_042126.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/f/4/8/9/f48952e2c5c047dd16c3140a3186d450/FHC_Podcast_Artwork-20260518-j4p0agb8b9.png",
    "thumb": "/episodes/ep-060.jpg"
  },
  {
    "title": "How to build your first capability statement and get noticed by federal agencies",
    "date": "2026-05-23",
    "description": "Your capability statement is the first document a federal contracting officer sees, and if it does not immediately communicate who you are, what you do, and why you are trustworthy, you lose the opportunity before the conversation even starts. In this episode, govcon consultant Randie Ward walks through every section of a capability statement from company summary to contact information and shows you exactly what agencies are evaluating when they pick it up. Whether you are brand new to…",
    "duration": "11:35",
    "link": "https://govcongiants.libsyn.com/how-to-build-your-first-capability-statement-and-get-noticed-by-federal-agencies",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/27_4_From_Paperwork_to_Profit_Build_Your_First_Capability_Statement_-_Randie_Ward_042726.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/c/a/a/8caa1606fdf1a7f116c3140a3186d450/FHC_Podcast_Artwork-20260518-txi9uzth59.png",
    "thumb": "/episodes/ep-061.jpg"
  },
  {
    "title": "What a Federal Construction CEO Wants You to Know Before You Bid Your First Contract",
    "date": "2026-05-22",
    "description": "Government construction contracting rewards business owners who build the right foundation before they ever swing a hammer. In this episode, David Rambhajan, founder of Industria Construction Services, break down the exact mindset, positioning, and operational systems that took him from $500K in bonding capacity to prime contractor on multi-million-dollar federal projects. Whether you are brand new to construction or already bidding federal work, this episode gives you a repeatable framework…",
    "duration": "14:05",
    "link": "https://govcongiants.libsyn.com/how-to-grow-bonding-capacity-and-win-bigger-federal-construction-contracts-step-by-step",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/23-1_Sharpshooter_Strategy_Building_a_Foundation_for_Success_-_David_Rambhajan_012326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/c/b/c/d/cbcd64f25eea68ab16c3140a3186d450/FHC_Podcast_Artwork-20260518-srrokiy6h3.png",
    "thumb": "/episodes/ep-062.jpg"
  },
  {
    "title": "The Industry Secret to Selling High Value Supplies to the Federal Government Revealed",
    "date": "2026-05-21",
    "description": "Government supply kitting is one of the most overlooked strategies for small businesses trying to win federal contracts without manufacturer agreements, large teams, or complex proposal processes. In this episode, Ryan Atencio breaks down exactly how kitting works on SAM.gov and why the businesses who get to the end user first are the ones who control the award. Why roughly 65-70% of combined synopsis and solicitations fall under the simplified acquisition threshold and what that means for how…",
    "duration": "08:52",
    "link": "https://govcongiants.libsyn.com/the-industry-secret-to-selling-high-value-supplies-to-the-federal-government-revealed",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/23_4_Build_a_Proposal_Dream_Team_Without_Begging_with_Ryan_Atencio_042326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/d/2/7/7d27be3cba44a60c16c3140a3186d450/FHC_Podcast_Artwork-20260518-rs0ippsfmt.png",
    "thumb": "/episodes/ep-063.jpg"
  },
  {
    "title": "Government Contracting Is an Inflation Hedge and Here Is Where to Find the Opportunities | EP: 325",
    "date": "2026-05-20",
    "description": "Government contract bid opportunities on SAM.gov refresh every single week with 500 or more new sources sought notices spanning every industry imaginable, and most small businesses never see them. In this live session, Eric Coffie logs directly into SAM.gov, downloads the latest opportunities into Excel, and walks through dozens of real contracts available right now in fields from locksmith services and paper shredding to nursing staffing, call center support, cloud infrastructure, and…",
    "duration": "01:26:42",
    "link": "https://govcongiants.libsyn.com/government-contracting-is-an-inflation-hedge-and-here-is-where-to-find-the-opportunities-ep-325",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/324_Government_Contract_Bid_Opportunities_For_Small_Businesses_June___SAM.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/a/8/0/8/a808d14aa0a4539616c3140a3186d450/ep._325-20260518-5bx23vss1v.png",
    "thumb": "/episodes/ep-064.jpg"
  },
  {
    "title": "Why your existing expertise is the fastest path to your next government contract win",
    "date": "2026-05-19",
    "description": "Identifying the right skills for government contracting could be the difference between chasing contracts you can't win and building a pipeline around what you already do well. In this episode, Eric Coffie walks through exactly how he parlayed his training expertise into a five-year federal contract and how you can apply the same framework to your own service offerings. Here is what you will learn in this episode: How Eric landed an $8,500 project management training contract as a…",
    "duration": "13:25",
    "link": "https://govcongiants.libsyn.com/why-your-existing-expertise-is-the-fastest-path-to-your-next-government-contract-win",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/6-4_Identifying_Skills__Building_Expertise_-_Colin_Nchako_2_040626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/c/c/e/3cce176c0ca50b86d959afa2a1bf1c87/FHC_Podcast_Artwork-20260518-syngvsqwg6.png",
    "thumb": "/episodes/ep-065.jpg"
  },
  {
    "title": "Bid or No Bid? How to Choose the Right Government Contracts",
    "date": "2026-05-18",
    "description": "If you want to know how to find government contract opportunities that are actually worth pursuing, this episode breaks down a practical strategy you can use right away. Instead of chasing every solicitation, you'll learn how to evaluate opportunities, decide when to bid, and position your business to win more federal contracts. We dive into the importance of having a solid bid/no-bid framework and how to approach sources sought notices as a low-risk way to market your business. You'll also…",
    "duration": "06:36",
    "link": "https://govcongiants.libsyn.com/bid-or-no-bid-how-to-choose-the-right-government-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/24-4_BD_vs_Capture_Management_Framework_That_Wins_Million-Dollar_Bids_-_Zach_Golden_031126.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/f/2/f/a/f2fae0bff1c42436d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260324-e0lo9tfopj.png",
    "thumb": "/episodes/ep-066.jpg"
  },
  {
    "title": "What Is a Contracting Officer Warrant & Why It Matters",
    "date": "2026-05-17",
    "description": "Looking to understand what a contracting officer warrant is and why it matters in government contracting? In this episode, we break down one of the most overlooked concepts that can directly impact your ability to win federal contracts. You'll learn what a warrant actually means, how it defines a contracting officer's authority, and why knowing warrant levels can help you make smarter decisions about who to build relationships with. We also explore how warrant limits affect contract size…",
    "duration": "09:12",
    "link": "https://govcongiants.libsyn.com/what-is-a-contracting-officer-warrant-why-it-matters",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/3_How_much_do_you_know_-_Eric_Coffie.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/a/e/0/c/ae0c0e3ea846e85a16c3140a3186d450/FHC_Podcast_Thumbnail-20260318-pief5dcovt.png",
    "thumb": "/episodes/ep-067.jpg"
  },
  {
    "title": "What It Really Takes to Win a Government Contract When You Have No Past Performance",
    "date": "2026-05-16",
    "description": "Government contracting business development is not about luck, it is about following a repeatable process, and in this episode Randie Ward breaks down exactly how she won her very first client contract using the same BD framework she learned from the govcon community. From cold introductions at non-GovCon events to teaming with a $685 million prime, this is a real case study that every aspiring consultant and new contractor needs to hear. In this episode you will learn: How to find teaming…",
    "duration": "13:39",
    "link": "https://govcongiants.libsyn.com/what-it-really-takes-to-win-a-government-contract-when-you-have-no-past-performance",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/20_4_Be_Found_Before_You_Bid_-_Randie_Ward_042026.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/4/2/3/7423fe9677ba4e98d959afa2a1bf1c87/FHC_Podcast_Artwork-20260504-xuz1xfcmu7.png",
    "thumb": "/episodes/ep-068.jpg"
  },
  {
    "title": "How Federal Contractors Use Community Networks to Land Teaming Partners and Win Bids",
    "date": "2026-05-15",
    "description": "Agency outreach for government contractors is less about what you do and more about what you know before you walk in the room. In this episode, Eric Coffie breaks down exactly how to prepare for virtual agency meetings, which federal vendor portals you cannot afford to skip, and how the Federal Help Center community is actively teaming up to pursue and win real contracts together. What you will learn in this episode: How to structure a 10 to 15 minute virtual agency meeting so you lead with…",
    "duration": "08:48",
    "link": "https://govcongiants.libsyn.com/how-federal-contractors-use-community-networks-to-land-teaming-partners-and-win-bids",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/8-4_Decode_Million-Dollar_Proposals_in_3_Minutes_-_Zach_Golden_040826.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/d/9/c/9d9c8ea32331125816c3140a3186d450/FHC_Podcast_Artwork-20260511-uz085bm8nj.png",
    "thumb": "/episodes/ep-069.jpg"
  },
  {
    "title": "The Custom Kit Strategy That Makes You the Only Vendor a Government Customer Can Call",
    "date": "2026-05-14",
    "description": "Government supply contracts don't always go to the biggest vendor; they go to the one who got there first with a quote. In this episode, Eric Coffie breaks down the custom kit strategy that small businesses use to become the sole-source manufacturer of record before a requirement ever hits the open market. If you've been wondering how to position yourself as the go-to government supplier in your backyard, this episode gives you the exact playbook. What you'll learn in this episode: How to…",
    "duration": "08:46",
    "link": "https://govcongiants.libsyn.com/the-custom-kit-strategy-that-makes-you-the-only-vendor-a-government-customer-can-call",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/16_4_The_Micro-Purchase_Loophole_Why_Selling_Supplies_is_the_Fastest_Way_to_Fire_Your_Boss_with_Ryan_Atencio_041626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/4/a/4/84a4d98cd49ac1bfd959afa2a1bf1c87/FHC_Podcast_Artwork-20260511-2k4u70ws10.png",
    "thumb": "/episodes/ep-070.jpg"
  },
  {
    "title": "How GovCon Giants Market Intelligence Replaces 11 Tools for Small Business Federal Contractors | EP: 324",
    "date": "2026-05-13",
    "description": "A unified federal market intelligence platform built specifically for small business government contractors just changed how GovCon Giants operates — and it could change how you find and win federal contracts too. Eric Coffie pulls back the curtain on Market Intelligence, the platform six months in the making that consolidates SAM.gov, recompete tracking, forecast data, teaming intelligence, and BD pipeline tools into a single dashboard built for solopreneurs and small teams. In this episode…",
    "duration": "01:03:41",
    "link": "https://govcongiants.libsyn.com/how-govcon-giants-market-intelligence-replaces-11-tools-for-small-business-federal-contractors-ep-324",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/324_-_LIVE__Introducing_Daily_Market_Intelligence_Briefings.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/e/2/d/0e2dee9252f2fcc2d959afa2a1bf1c87/ep._324-20260511-eba9xoki13.png",
    "thumb": "/episodes/ep-071.jpg"
  },
  {
    "title": "Why Knowing How Agencies Buy Is More Powerful Than Having Any Certification",
    "date": "2026-05-12",
    "description": "Understanding how federal agencies and primes actually buy is the competitive edge that most small business owners never develop — and in this episode, seasoned contractor David Hernandez breaks down exactly why your certification alone will not get you in the door. If you have been chasing work without understanding the procurement chain, this conversation will reframe your entire BD approach. Know your real buyer before you pitch: The insulation subcontractor story reveals why targeting the…",
    "duration": "11:01",
    "link": "https://govcongiants.libsyn.com/why-knowing-how-agencies-buy-is-more-powerful-than-having-any-certification",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/22_4_Leveraging_Government_Small_Business_Programs_-_David_Rambhajan_042226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/1/4/2/1142d0d0b358fa09d959afa2a1bf1c87/FHC_Podcast_Artwork-20260511-ij641u6nt5.png",
    "thumb": "/episodes/ep-072.jpg"
  },
  {
    "title": "8a Certification Stalled: How Congress Can Escalate Your SBA Case",
    "date": "2026-05-11",
    "description": "If your 8(a) SBA application has stalled with no response, there's a little-known move that can force action and it runs directly through your elected officials' offices. In this episode of the Federal Help Center Podcast, community member Obi breaks down exactly how he used a congressional inquiry to get his 8(a) application escalated all the way to the SBA, and Eric unpacks the privacy release form every small business owner needs to know about. We also get into the explosive SBA audit that…",
    "duration": "10:09",
    "link": "https://govcongiants.libsyn.com/8a-certification-stalled-how-congress-can-escalate-your-sba-case",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_24_Mar_What_is_happening_in_March_2026_that_I_need_to_know__-_Eric_Coffie_032426.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/5/0/7/6/5076a87dc9ef9786d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260410-vqxxb08xsl.png",
    "thumb": "/episodes/ep-073.jpg"
  },
  {
    "title": "What Every Aspiring Federal Contractor Should Know Before Bidding on Their First Solicitation",
    "date": "2026-05-10",
    "description": "Government contracting partnerships are the fastest way for small businesses to win federal work without burning out trying to do it alone. In this episode of the Federal Help Center podcast, Colin breaks down how to team up with other contractors, divide responsibilities by strength, and turn small wins into a repeatable bidding system that scales. Discover why winning your first federal contract solo is the wrong long-term strategy and how to bring partners in on responses, project…",
    "duration": "09:18",
    "link": "https://govcongiants.libsyn.com/what-every-aspiring-federal-contractor-should-know-before-bidding-on-their-first-solicitation",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/6-4_Identifying_Skills__Building_Expertise_-_Colin_Nchako_040626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/3/3/d/933dcc5ba946069d16c3140a3186d450/FHC_Podcast_Artwork-20260506-rekuum71xp.png",
    "thumb": "/episodes/ep-074.jpg"
  },
  {
    "title": "New to DOD Contracting? Master PIE and CMMC Before You Bid",
    "date": "2026-05-09",
    "description": "Department of Defense contracting comes with a unique set of systems and compliance requirements — and not knowing them can cost you the contract before you even submit a bid. In this episode of the Federal Help Center Podcast, host Eric Coffey breaks down the essential platforms and certifications every small business owner must have in place before pursuing DOD work. Key takeaways from this episode: 🔹 What is PIE? The Procurement Integrated Enterprise Environment is the central hub for all…",
    "duration": "07:04",
    "link": "https://govcongiants.libsyn.com/new-to-dod-contracting-master-pie-and-cmmc-before-you-bid",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/3_6_Ready_Set_Go_-_Procurement_Readiness_-_Randie_Ward_030526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/b/b/5/2/bb52e80f04e81debd959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260329-v9phdrvviq.png",
    "thumb": "/episodes/ep-075.jpg"
  },
  {
    "title": "Why Now Is the Best Time to Win Government Contracts While Everyone Else Is Scared",
    "date": "2026-05-08",
    "description": "The prime integrator government contracting strategy is one of the most overlooked plays in federal contracting, and this episode breaks down exactly how a small business used it to build a billion dollar pipeline. Eric Coffie sits down with Sherry and Sylvia to unpack a real IDIQ task order story, a propane contract win, and why right now is the most underrated window of opportunity small business owners have seen in years. Discover how a contractor became the exclusive distributor on an IDIQ…",
    "duration": "09:58",
    "link": "https://govcongiants.libsyn.com/why-now-is-the-best-time-to-win-government-contracts-while-everyone-else-is-scared",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/14_4_Watch_Your_Back__-_Eric_Coffie_041426.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/c/8/0/5/c8054bd0de0501ec16c3140a3186d450/FHC_Podcast_Artwork-20260506-nt7cretp1d.png",
    "thumb": "/episodes/ep-076.jpg"
  },
  {
    "title": "Three Proposal Red Flags That Tell Contracting Officers You Used AI to Write It",
    "date": "2026-05-07",
    "description": "Government proposal writing mistakes are costing small businesses millions in contracts they should be winning — and most don't even know they're making them. In this episode, procurement expert Zack Golden breaks down the three most common red flags that tell a contracting officer your proposal was AI-generated, generic, or just not written by a real person who wants the work. If you've submitted technically compliant proposals and still lost, this episode explains exactly why. What you'll…",
    "duration": "08:41",
    "link": "https://govcongiants.libsyn.com/three-proposal-red-flags-that-tell-contracting-officers-you-used-ai-to-write-it",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_Apr_Proposal_Red_Flags_Exposed_-_Zach_Golden_040126.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/a/7/7/5/a7752b83b5412a0dd959afa2a1bf1c87/FHC_Podcast_Artwork-20260504-zptli27j8u.png",
    "thumb": "/episodes/ep-077.jpg"
  },
  {
    "title": "Sources Sought Responses That Actually Get Noticed | EP: 323",
    "date": "2026-05-06",
    "description": "Sources sought responses are one of the most underused tools in federal contracting — and in this episode, Eric Coffey breaks down exactly how to use them to get your company noticed by the government decision makers who issue the contracts you want. If you've been ignoring sources sought notices because they're \"not a real bid,\" this episode will change how you think about market research forever. In this power-packed session, Eric covers: Why sources sought is better than bidding — Responding…",
    "duration": "46:28",
    "link": "https://govcongiants.libsyn.com/sources-sought-responses-that-actually-get-noticed-ep-324",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/8_Encore_2_Sources_Sought_Responses_That_Actually_Get_Noticed.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/6/5/f/765fcd61a8e77e53d959afa2a1bf1c87/ep._320-20260502-pdxiw21m77.png",
    "thumb": "/episodes/ep-078.jpg"
  },
  {
    "title": "What Large Defense Primes Know About Kitting That Small Businesses Miss",
    "date": "2026-05-05",
    "description": "Understanding how government contracting market research really works is the edge that separates small businesses who win from those who wonder why they keep losing. In this episode, Eric Coffie sits down with a former Special Operations soldier who spent years inside the acquisition process, writing statements of work, managing COR responsibilities, and watching the biggest defense primes in the country run the playbook right in front of him. If you've ever submitted a bid and had no idea why…",
    "duration": "09:12",
    "link": "https://govcongiants.libsyn.com/what-large-defense-primes-know-about-kitting-that-small-businesses-miss",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/9-4_What_Large_Defense_Primes_Know_About_Kitting_That_Small_Businesses_Miss_040926.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/d/7/9/e/d79eeaa0a14baf58d959afa2a1bf1c87/FHC_Podcast_Artwork.png",
    "thumb": "/episodes/ep-079.jpg"
  },
  {
    "title": "Sources Sought: The Legal Way to Shape Government Contracts in Your Favor",
    "date": "2026-05-04",
    "description": "Most small business owners ignore sources sought notices — and that's exactly why they keep losing contracts to the same competitors. In this video, I'm walking you through the SAM.gov sources sought strategy that most contractors never use: ghosting and influencing the requirement before the RFP even drops. This is 100% legal, used by savvy federal contractors every day, and it's one of the most powerful government contracting tips you'll find anywhere. Here's what you'll learn: - How to…",
    "duration": "08:11",
    "link": "https://govcongiants.libsyn.com/sources-sought-the-legal-way-to-shape-government-contracts-in-your-favor",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_3_Find_Work_Before_You_Bid-_How_to_Read_Sources_Sought__RFIs_-_Randie_Ward_02-23-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/1/c/c/31ccc39d6b41fe56d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260403-l97rg4we40.png",
    "thumb": "/episodes/ep-080.jpg"
  },
  {
    "title": "IDIQ Contracts Explained: Capture Strategy That Actually Works",
    "date": "2026-05-03",
    "description": "If you want to know how to win more task orders on IDIQ contracts, this episode breaks down what most contractors get wrong—and how to fix it. Many businesses assume that once they're awarded an IDIQ, the hard work is done. But when task orders drop with short response times, it often reveals a deeper issue: lack of ongoing capture strategy. In this episode, we dive into how IDIQ contracts really work and why building relationships with program managers is the key to staying ahead. You'll learn…",
    "duration": "09:23",
    "link": "https://govcongiants.libsyn.com/idiq-contracts-explained-capture-strategy-that-actually-works",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/4_How_much_do_you_know_-_Eric_Coffie.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/f/c/8/7fc8ebcf2fdfee65d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260318-43xkbbvo7z.png",
    "thumb": "/episodes/ep-081.jpg"
  },
  {
    "title": "Why Your Capability Statement Is Costing You Federal Contracts (And How to Fix It With AI)",
    "date": "2026-05-02",
    "description": "Capability statements for federal contracting can make or break your shot at landing government contracts — and in this episode, Zach Golden shows you how to build a powerful one in just 15 minutes using AI. Whether you're starting from scratch or upgrading an outdated Word doc, Zach breaks down exactly what federal agencies are looking for and how to make your company stand out before the first conversation even begins. In this episode, you'll discover: Why your capability statement must come…",
    "duration": "09:09",
    "link": "https://govcongiants.libsyn.com/why-your-capability-statement-is-costing-you-federal-contracts-and-how-to-fix-it-with-ai",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_2_100k_Capability_Statement_in_15_Mins_using_AI_-_Zach_Golden_02-18-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/5/a/e/75ae714c759dd24616c3140a3186d450/FHC_Podcast_Thumbnail-20260331-ky1ubk1nm0.png",
    "thumb": "/episodes/ep-082.jpg"
  },
  {
    "title": "How Small Businesses Can Consult Their Way Into $47M Federal Deals",
    "date": "2026-05-01",
    "description": "Federal contracting consultant strategies are unlocking million-dollar opportunities for small businesses — and this episode proves it with a real $47 million deal. Eric Coffey and guest Ronnie pull back the curtain on how a small business team navigated a complex teaming arrangement with a $400 million company to compete for a massive Corps of Engineers contract. If you think federal consulting is only for the big players, this conversation will completely change your mindset. What you'll…",
    "duration": "10:06",
    "link": "https://govcongiants.libsyn.com/how-small-businesses-can-consult-their-way-into-47m-federal-deals",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_1_Consulting_Pivot-_2M_Pipeline_-_Eric_Coffie_02-24-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/4/7/0/5/4705da5ca860420b16c3140a3186d450/FHC_Podcast_Thumbnail-20260331-4fw3821zmr.png",
    "thumb": "/episodes/ep-083.jpg"
  },
  {
    "title": "Scared to Bid? How Small Businesses Win Federal Contracts Anyway",
    "date": "2026-04-30",
    "description": "Government contract bidding doesn't have to feel impossible — even when you've never done it before. In this raw and real episode of the Federal Help Center Podcast, host Eric Coffey walks a first-time bidder through the fears, the paperwork, and the mental blocks standing between her and her very first federal landscaping contract. This is the conversation every small business owner needs to hear before they talk themselves out of submitting a bid. What you'll take away from this episode: Fear…",
    "duration": "09:09",
    "link": "https://govcongiants.libsyn.com/scared-to-bid-how-small-businesses-win-federal-contracts-anyway",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_8_Identifying_Skills__Building_Expertise_-_Colin_Nchako_030226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/9/3/d/993d704ecd74d4e8d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260325-rnchel2cd9.png",
    "thumb": "/episodes/ep-084.jpg"
  },
  {
    "title": "How to Find and Respond to SAM.gov Sources Sought Opportunities | EP: 322",
    "date": "2026-04-29",
    "description": "Learning how to respond to a SAM.gov sources sought notice is one of the most overlooked skills in government contracting — and in this live session, Eric Coffie does it right in front of you. No theory, no fluff — just a real opportunity pulled from SAM.gov, broken down and filled out from scratch so you can see exactly how it works. Whether you are brand new to govcon or trying to get your first contract, this episode shows you the process that most gurus skip. How to pull SAM.gov…",
    "duration": "45:23",
    "link": "https://govcongiants.libsyn.com/how-to-fund-govcon-growth-without-killing-cash-flow-ep-322",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/7_Encore_1_How_to_Fund_GovCon_Growth_Without_Killing_Cash_Flow.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/9/c/5/09c59399681993d8d959afa2a1bf1c87/ep._320-20260429-clbyn6rpjx.png",
    "thumb": "/episodes/ep-085.jpg"
  },
  {
    "title": "How to Build a Capability Statement That Wins Federal Contracts",
    "date": "2026-04-28",
    "description": "Capability statements and project sheets are the foundation of winning federal contracts — and most small businesses are getting them wrong. In this episode of the Federal Help Center Podcast, Eric Coffey breaks down exactly what goes into a standout capability statement and why documenting your past performance immediately after completing a project could be the difference between landing a government contract or losing it to a competitor. 📄 Project Sheets Done Right — Learn why you should…",
    "duration": "08:25",
    "link": "https://govcongiants.libsyn.com/how-to-build-a-capability-statement-that-wins-federal-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_6_Ready_Set_Go_-_Procurement_Readiness_-_Randie_Ward_030526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/1/1/9/1119dd74eac0ea3716c3140a3186d450/FHC_Podcast_Thumbnail-20260329-db270gazpt.png",
    "thumb": "/episodes/ep-086.jpg"
  },
  {
    "title": "How to Review Proposals Fast and Avoid Costly Bidding Mistakes",
    "date": "2026-04-27",
    "description": "If you want to know how to evaluate government contract proposals and decide whether to bid, this episode breaks down a powerful framework to help you move faster and smarter. In federal contracting, time is money—and knowing how to quickly assess an RFP, identify red flags, and understand pricing expectations can be the difference between winning and wasting resources. This episode dives into how experienced contractors \"decode\" proposals in minutes instead of hours. You'll learn how to…",
    "duration": "06:57",
    "link": "https://govcongiants.libsyn.com/how-to-review-proposals-fast-and-avoid-costly-bidding-mistakes",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_7_Decode_Million-Dollar_Proposals_in_3_Minutes_-_Zach_Golden_030426.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/8/3/0/6830d31a6e74f11cd959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260331-e7wkqhhzsq.png",
    "thumb": "/episodes/ep-087.jpg"
  },
  {
    "title": "Federal Contract Protests Explained: When to Fight Back and When Not To",
    "date": "2026-04-26",
    "description": "Government contract bidding strategy separates the contractors who consistently win from those who consistently underprice and lose money performing. In this episode, Ryan Atencio breaks down exactly how to price multi-year federal contracts for inflation, how to research an incumbent before you decide to bid, and what your real options are when you lose an award you know you deserved. What you'll learn in this episode: How to compound option year pricing for inflation — Ryan walks through the…",
    "duration": "09:40",
    "link": "https://govcongiants.libsyn.com/federal-contract-protests-explained-when-to-fight-back-and-when-not-to",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_20_Mar_Rescheduled_Find_Your_Competitors_Secret_Contracts_in_60_Seconds_with_Ryan_Atencio_032026_1.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/6/e/9/36e96172ae957bcfd959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260425-pj4pkgb7rs.png",
    "thumb": "/episodes/ep-088.jpg"
  },
  {
    "title": "What Federal Buyers Actually Look at Before They Decide to Call You",
    "date": "2026-04-25",
    "description": "Procurement readiness is the difference between a company that's ready when opportunity knocks and one scrambling to pull documents together at the last minute. In this episode, govcon consultant Randie Ward walks through the exact assets every contractor needs to have built, polished, and ready before they ever respond to an RFP or walk into an agency meeting. If you've been winning work but your profile still looks like you started your business yesterday, this episode will fix that. What…",
    "duration": "09:54",
    "link": "https://govcongiants.libsyn.com/what-federal-buyers-actually-look-at-before-they-decide-to-call-you",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_3_Ready_Set_Go_-_Procurement_Readiness_-_Randie_Ward_040626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/1/0/c/e10cf91513cf8ef116c3140a3186d450/FHC_Podcast_Thumbnail-20260421-m76wc90x8g.png",
    "thumb": "/episodes/ep-089.jpg"
  },
  {
    "title": "How Bid Bonds Work & When You Actually Need Them",
    "date": "2026-04-24",
    "description": "Ever wondered about bid bond requirements in government construction contracts and when they actually apply? In this episode, we break down the real-world rules behind bid bonds, performance bonds, and subcontractor bonding—and why the answer isn't always as straightforward as the regulations suggest. You'll learn how federal agencies interpret bonding thresholds differently, why some projects over $100,000 require bonds while others don't, and how recent changes and exceptions can impact your…",
    "duration": "08:52",
    "link": "https://govcongiants.libsyn.com/how-bid-bonds-work-when-you-actually-need-them",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/24-4_Bonding_Subcontractor_Bonds__Payment_Rules.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/4/3/9/74393c3395273eadd959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260322-85tx8j365j.png",
    "thumb": "/episodes/ep-090.jpg"
  },
  {
    "title": "How to Sell More Contracts While Staying CMMC Compliant",
    "date": "2026-04-23",
    "description": "Looking to understand how CMMC compliance impacts your government contracting strategy? In this episode, we break down what CMMC Level 2 really means for small businesses and how upcoming third-party audits could affect your ability to win federal contracts. We dive into the real cost of compliance, why many contractors may struggle with implementation, and how government overclassification could drive up expenses across the board. You'll also learn why starting early with proper systems in…",
    "duration": "10:02",
    "link": "https://govcongiants.libsyn.com/how-to-sell-more-contracts-while-staying-cmmc-compliant",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_5_What_the_Gurus_Dont_Teach_The_DoW_End-User_Direct_Strategy_with_Ryan_Atencio_030526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/5/a/c/9/5ac96bbcf64f75fe16c3140a3186d450/FHC_Podcast_Thumbnail-20260324-06b06tj8dc.png",
    "thumb": "/episodes/ep-091.jpg"
  },
  {
    "title": "How to Build a Cyber Defense Strategy That Meets CMMC Without Overspending | EP: 321",
    "date": "2026-04-22",
    "description": "Cybersecurity is no longer a nice-to-have for government contractors — CMMC compliance is now a pre-award requirement, and if you haven't addressed it, your proposal may be dead before anyone reads it. In this episode, Eric sits down with a 15-year MIT Lincoln Laboratory veteran whose company now trains US Cyber Command to break down exactly what small and mid-size contractors need to know about cyber readiness in a rapidly shifting AI-driven threat landscape. Here's what you'll learn in this…",
    "duration": "43:35",
    "link": "https://govcongiants.libsyn.com/how-to-build-a-cyber-defense-strategy-that-meets-cmmc-without-overspending",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/How_to_Build_a_Cyber_Defense_Strategy_That_Meets_CMMC_Without_Overspending.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/7/b/6/97b6b772b99db553d959afa2a1bf1c87/GovCon_5-20260416-bka47fa0km.png",
    "thumb": "/episodes/ep-092.jpg"
  },
  {
    "title": "How to Get Better Clients in Government Contracting (BD Tips)",
    "date": "2026-04-21",
    "description": "If you want to know how to get better clients in government contracting, this episode breaks down the real challenges behind finding—and keeping—the right partners. It's not just about getting clients… it's about getting quality clients who understand the process and are ready to win. In this episode, we dive into the realities of business development (BD) and capture strategy, including how to set realistic expectations with new clients and avoid common frustrations. You'll also learn…",
    "duration": "07:30",
    "link": "https://govcongiants.libsyn.com/how-to-get-better-clients-in-government-contracting-bd-tips",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_BD_vs_Capture_Management_Framework_That_Wins_Million-Dollar_Bids_-_Zach_Golden_031126.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/3/5/8/63581a3951176a0816c3140a3186d450/FHC_Podcast_Thumbnail-20260324-zh8vocr5pp.png",
    "thumb": "/episodes/ep-093.jpg"
  },
  {
    "title": "Turn Your Hidden Skills Into a Federal Government Contract",
    "date": "2026-04-20",
    "description": "Your hidden skills might already qualify you for a federal government contract. In this episode of the Federal Help Center Podcast, Eric Coffey breaks down how small business owners can identify the expertise they already have — from training to IT to SOP writing — and start marketing those skills directly to government agencies, quasi-government entities, and beyond. Here's what you'll take away from this episode: Your private-sector skills are government-ready — Eric shares how his background…",
    "duration": "09:16",
    "link": "https://govcongiants.libsyn.com/turn-your-hidden-skills-into-a-federal-government-contract",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_1_Identifying_Skills__Building_Expertise_-_Colin_Nchako_02-03-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/5/a/4/c/5a4c90486dede579d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260418-jwzhht0jk9.png",
    "thumb": "/episodes/ep-094.jpg"
  },
  {
    "title": "What to Do When Agencies Keep Requesting Quotes Without Buying",
    "date": "2026-04-19",
    "description": "Ever wondered about why the government keeps asking for updated quotes but never actually awards the contract? In this episode, we break down a frustrating—but very common—part of federal contracting that many small businesses face. You'll learn why agencies repeatedly request updated pricing, how budget uncertainty and internal changes impact procurement timelines, and what it really means when opportunities drag on for months (or even years). We also dive into the role of protests and delays…",
    "duration": "09:40",
    "link": "https://govcongiants.libsyn.com/what-to-do-when-agencies-keep-requesting-quotes-without-buying",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_How_much_do_you_know_-_Eric_Coffie.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/e/6/a/1e6ae8519024f380d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260318-u3adlow3xg.png",
    "thumb": "/episodes/ep-095.jpg"
  },
  {
    "title": "How to Win Federal Contracts When You Have No Past Performance Yet",
    "date": "2026-04-18",
    "description": "Breaking into federal contracting as a prime contractor means confronting the brutal truth about past performance — agencies won't give you a shot without it, and you can't get it without a shot. This episode features a raw, real conversation with a seasoned 8(a) contractor who spent years traveling the country doing capability presentations with no takers, until one contracting officer changed everything. In this episode you'll learn: Why the transition from subcontractor to prime contractor…",
    "duration": "08:07",
    "link": "https://govcongiants.libsyn.com/how-to-win-federal-contracts-when-you-have-no-past-performance-yet",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/3_23_Mar_Why_Dont_You_Quit_-_Frank_Spencer_032326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/d/e/c/7/dec78c6bcbd898ca16c3140a3186d450/FHC_Podcast_Thumbnail-20260415-eebmebvms6.png",
    "thumb": "/episodes/ep-096.jpg"
  },
  {
    "title": "What Firm Fixed Price and Cost Plus Contracts Mean for Your Bid Strategy",
    "date": "2026-04-17",
    "description": "Learn how to shape a solicitation before the government even releases the final RFP. In this episode, Eric Coffie walks through a real example where his sources sought suggestions were added directly to an SDVOSB set aside solicitation on Seaport. The government added his recommended minimum past performance requirements and an organic small UAS capability, dramatically increasing his win probability from maybe to definitely. How adding minimum past performance requirements raises the standard…",
    "duration": "10:28",
    "link": "https://govcongiants.libsyn.com/how-to-shape-a-solicitation-and-increase-your-probability-of-winning-federal-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_2_Apr_Federal_Business_101_Cracking_the_Code_of_How_the_Government_Buys_with_Ryan_Atencio_040226_new.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/f/2/a/9/f2a99d387ac536ffd959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260415-xr7hxgqrwh.png",
    "thumb": "/episodes/ep-097.jpg"
  },
  {
    "title": "How to show federal agencies you are ready before the capabilities briefing",
    "date": "2026-04-16",
    "description": "Procurement readiness is the foundation every small business needs before stepping in front of a federal agency — and most contractors skip it entirely. In this episode of the Federal Help Center Podcast, Eric Coffey walks you through exactly what it means to show up prepared, why agencies respond differently when you do, and the specific tools and profiles that signal you're a serious contender before the conversation even starts. Here's what you'll learn in this episode: Why research wins the…",
    "duration": "09:41",
    "link": "https://govcongiants.libsyn.com/how-to-show-federal-agencies-you-are-ready-before-the-capabilities-briefing",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_3_Ready_Set_Go_-_Procurement_Readiness_-_Randie_Ward_040626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/4/8/7/0487cd9a0494e104d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260412-d4o6lo6j3k.png",
    "thumb": "/episodes/ep-098.jpg"
  },
  {
    "title": "Break Into Government Construction Without Prime Experience | EP: 320",
    "date": "2026-04-15",
    "description": "Government contracts construction is one of the most overlooked wealth-building opportunities available to minority and small business owners today — and host Eric Coffey is laying out the entire blueprint to break in with zero experience. In this episode of the GovCon Giants podcast, Eric reveals why construction is his top recommendation for anyone looking to start over, build generational wealth, and tap into a marketplace that has never — not once — met its diversity goals. Here's what…",
    "duration": "02:01:04",
    "link": "https://govcongiants.libsyn.com/break-into-government-construction-without-prime-experience-ep-325",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/9_Encore_3_How_to_Get_Government_Contracts_For_Construction_with_no_Experience.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/f/3/1/6f31e2790bef4a4416c3140a3186d450/ep._320.png",
    "thumb": "/episodes/ep-099.jpg"
  },
  {
    "title": "Government Subcontracting Strategy to Land Contracts and Scale Fast",
    "date": "2026-04-14",
    "description": "Government contracting certifications like CMMC, ISO, and CMMI are no longer optional — they're the difference between standing out and getting buried in a pile of minimum-qualified vendors. In this episode, a seasoned IT govcon professional breaks down the exact moves small businesses need to make to get their foot in the door and grow once they're in. You'll learn: Why niche certifications win contracts — With CMMC Level 2 deadlines approaching, the shortage of certified companies is your…",
    "duration": "11:24",
    "link": "https://govcongiants.libsyn.com/government-subcontracting-strategy-to-land-contracts-and-scale-fast",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_25_Mar_Building_A_Lasting_Presence_in_the_Federal_Space_-_Andre_Jerry_032526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/c/4/7/f/c47fcfcd61bb48a916c3140a3186d450/FHC_Podcast_Thumbnail-20260410-tdkocdd02o.png",
    "thumb": "/episodes/ep-100.jpg"
  },
  {
    "title": "How to Get Government Contracting Clients Using Market Data Strategy",
    "date": "2026-04-13",
    "description": "Government contracting consultants who struggle to sign new clients are often missing one thing: proof. In this episode of the Federal Help Center Podcast, Eric Coffey breaks down the exact presentation strategy he uses to walk small businesses through the federal market data they never knew existed — and turn skeptics into signed clients. In this episode you'll learn: How to build a market data pitch using NAICS codes and SAM.gov spending reports — Eric walks through a real Arizona-based…",
    "duration": "09:11",
    "link": "https://govcongiants.libsyn.com/how-to-get-government-contracting-clients-using-market-data-strategy",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_25_Mar_Discovery_Calls_That_Actually_Sign_Clients_-_Zach_Golden_032526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/f/9/f/9/f9f97d78bb20f5ecd959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260410-9025m6v5ki.png",
    "thumb": "/episodes/ep-101.jpg"
  },
  {
    "title": "How Small Businesses Win Federal Contracts Through Relationship Networking",
    "date": "2026-04-12",
    "description": "Government contracting networking is the strategy most small businesses overlook — and it's exactly how sole source contracts get awarded before an opportunity ever hits SAM.gov. In this episode of the Federal Help Center Podcast, Eric Coffey breaks down how real relationships built at events like NCMA and SAME have led directly to sole source awards, subcontracting invitations, and speaking opportunities that open doors no cold outreach ever could. What you'll learn in this episode: How sole…",
    "duration": "09:08",
    "link": "https://govcongiants.libsyn.com/how-small-businesses-win-federal-contracts-through-relationship-networking",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_24_Mar_What_is_happening_in_March_2026_that_I_need_to_know__-_Eric_Coffie_032426.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/3/a/7/83a79b1c6505b80616c3140a3186d450/FHC_Podcast_Thumbnail-20260410-smw7ycf4wf.png",
    "thumb": "/episodes/ep-102.jpg"
  },
  {
    "title": "How to Find Government Contracting Points of Contact Using Free Tools",
    "date": "2026-04-11",
    "description": "Finding government contracting points of contact before the RFP drops is one of the most powerful moves a small business can make in federal BD. In this episode, host Eric Coffey walks through his exact process for identifying and reaching the right people inside federal agencies — using free, publicly available tools — so you're building relationships during the planning phase, not scrambling when the solicitation hits. What you'll learn in this episode: How to use Acquisition Gateway to…",
    "duration": "08:32",
    "link": "https://govcongiants.libsyn.com/how-to-find-government-contracting-points-of-contact-using-free-tools",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_23_Mar_Find_the_Decision_Maker_Before_They_Post_the_RFP_-_Randie_Ward_032326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/e/0/d/1e0dbcdedd9263dd16c3140a3186d450/FHC_Podcast_Thumbnail-20260408-oihjiuepoj.png",
    "thumb": "/episodes/ep-103.jpg"
  },
  {
    "title": "Why I Started My Government Contracting Business and Why It Keeps Me From Quitting",
    "date": "2026-04-10",
    "description": "Small business owner mindset is the foundation every federal contractor must build before strategy, certifications, or capital — and this episode goes straight to the root. In this session, Eric Coffey challenges contractors and aspiring entrepreneurs to get brutally honest about why they started their business, because when the hard moments come, your \"why\" is the only anchor that keeps you from walking away. Here's what this episode covers: Why your purpose matters more than your profit goal…",
    "duration": "09:25",
    "link": "https://govcongiants.libsyn.com/why-i-started-my-government-contracting-business-and-why-it-keeps-me-from-quitting",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_23_Mar_Why_Dont_You_Quit_-_Frank_Spencer_032326.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/0/8/8/e088f4e13795811c16c3140a3186d450/FHC_Podcast_Thumbnail-20260408-9sbcy8x7n7.png",
    "thumb": "/episodes/ep-104.jpg"
  },
  {
    "title": "Government Contract Competitor Intelligence Using SAM.gov Free Tools",
    "date": "2026-04-09",
    "description": "Government contract competitor research doesn't require a $500-a-month bid matching platform — it requires the right SAM.gov setup and the right AI prompt. In this episode, Eric Coffey breaks down exactly how he conducts deep competitive intelligence on active solicitations, including a live walkthrough of a real $60M Army recompete he is currently pursuing for a client. If you are a contractor, consultant, or aspiring govcon entrepreneur trying to build a smarter capture process, this episode…",
    "duration": "07:56",
    "link": "https://govcongiants.libsyn.com/government-contract-competitor-intelligence-using-samgov-free-tools",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_20_Mar_Rescheduled_Find_Your_Competitors_Secret_Contracts_in_60_Seconds_with_Ryan_Atencio_032026_1.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/9/1/9/691934f3a268d279d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260404-b4wmjgqeig.png",
    "thumb": "/episodes/ep-105.jpg"
  },
  {
    "title": "SAM.gov Search Strategy That Finds Real Opportunities | EP: 319",
    "date": "2026-04-08",
    "description": "Ever wondered how some small businesses seem to win government contracts before they are even publicly advertised? If you want to know how to get a competitive edge in federal contracting, you need to understand the power of Sources Sought notices on SAM.gov . In this episode of GovCon Giants, your host Eric Coffee breaks down a live walkthrough of finding and analyzing these critical market research documents. Most small businesses make the mistake of only looking at active bids, completely…",
    "duration": "46:22",
    "link": "https://govcongiants.libsyn.com/7-questions-that-can-land-you-a-government-contract-without-a-bid-ep-319",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/3_SAM.gov_Search_Strategy_That_Finds_Real_Opportunities.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/4/b/f/64bfd388706a8d5f16c3140a3186d450/GovCon_1.png",
    "thumb": "/episodes/ep-106.jpg"
  },
  {
    "title": "Prime Contractor Teaming Strategy to Win More Government Contracts",
    "date": "2026-04-07",
    "description": "Prime contractor teaming is one of the fastest paths into federal contracting — but only if you know how to find the right primes and reach out the right way. In this episode, Eric Coffey walks through the exact outreach framework he uses with a real cybersecurity and AI startup to get in front of prime contractors, book capability briefings, and position the company as a teaming partner or subcontractor on active government contracts. What you'll learn in this episode: How to use federal…",
    "duration": "08:31",
    "link": "https://govcongiants.libsyn.com/prime-contractor-teaming-strategy-to-win-more-government-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_3_Prime_Contractor_Stalking_Method_-_5_Minutes_to_Success_-_Zach_Golden_02-25-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/5/6/0/c/560ca4276de058a5d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260403-xhgu5f89vj.png",
    "thumb": "/episodes/ep-107.jpg"
  },
  {
    "title": "Government Contracting Skills: How to Identify and Win With What You Know",
    "date": "2026-04-06",
    "description": "Government contracting skills are the foundation of every federal award — and you probably already have more than you think. In this episode of the Federal Help Center Podcast, host Eric Coffey breaks down how small business owners can identify the skills they already possess, build real expertise around them, and position that expertise to win government contracts at every level — from local agency awards to major vehicles like GSA OASIS+. What you'll learn in this episode: 🔍 How to research…",
    "duration": "08:47",
    "link": "https://govcongiants.libsyn.com/government-contracting-skills-how-to-identify-and-win-with-what-you-know",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_2_Identifying_Skills__Building_Expertise_-_Colin_Nchako_02-03-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/a/b/b/9abb07c102f220d316c3140a3186d450/FHC_Podcast_Thumbnail-20260403-b8jfdw9ysg.png",
    "thumb": "/episodes/ep-108.jpg"
  },
  {
    "title": "Sources Sought Strategy: How Small Businesses Win Before the RFP",
    "date": "2026-04-05",
    "description": "Sources Sought notices are one of the most powerful — and most overlooked — tools in a small business government contractor's arsenal. In this episode, Eric Coffey breaks down exactly what sources sought, market research, and RFIs are, why they're critical to your govcon strategy, and how to use them to get your name in front of contracting officers before the competition even knows an opportunity exists. What you'll learn in this episode: 🔍 What Sources Sought really is — and why the terms…",
    "duration": "07:42",
    "link": "https://govcongiants.libsyn.com/sources-sought-strategy-how-small-businesses-win-before-the-rfp",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_3_Find_Work_Before_You_Bid-_How_to_Read_Sources_Sought__RFIs_-_Randie_Ward_02-23-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/d/c/2/edc29328e196602d16c3140a3186d450/FHC_Podcast_Thumbnail-20260403-s1cjb8x3v5.png",
    "thumb": "/episodes/ep-109.jpg"
  },
  {
    "title": "How to Start & Grow a Government Contracting Business: Certifications, Funding & Getting Your First Contract",
    "date": "2026-04-04",
    "description": "Breaking into government contracting isn't just about paperwork — it's about building a business that can survive the long game. In this episode, Eric Coffie walks you through the exact mindset and practical steps to start and grow a federal contracting business from scratch. You'll learn: • Why most small businesses approach primes and agencies the wrong way — and what actually gets you in the door • How to identify agency pain points and position yourself as the solution (not just another…",
    "duration": "08:46",
    "link": "https://govcongiants.libsyn.com/how-to-start-grow-a-government-contracting-business-certifications-funding-getting-your-first-contract",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_2_Building_A_Lasting_Presence_in_the_Federal_Space_-_Andre_Jerry_02-25-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/d/b/e/8/dbe8041b4f41cf62d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260401-hy3keot6z5.png",
    "thumb": "/episodes/ep-110.jpg"
  },
  {
    "title": "What Federal Contractors Must Know About Background Checks & Base Access",
    "date": "2026-04-03",
    "description": "Federal contracting background checks can make or break your ability to win and perform government work — and most small business owners don't know what they're actually signing up for. In this live Q&A episode, Eric Coffie and the Federal Help Center community tackle one of the most misunderstood topics in the space: what vetting actually looks like when you're doing work on federal facilities like VA Medical Centers and military bases. Here's what gets covered in this straight-talk session…",
    "duration": "11:23",
    "link": "https://govcongiants.libsyn.com/what-federal-contractors-must-know-about-background-checks-base-access",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_2_Live_QA_-_Bring_Your_Hard_Questions_-_Eric_Coffie_03-03-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/0/3/f/303fff565610ca27d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260331-e1y7tuu861.png",
    "thumb": "/episodes/ep-111.jpg"
  },
  {
    "title": "Build a $100K Capability Statement in 15 Minutes Using AI Tools",
    "date": "2026-04-02",
    "description": "Government contracting capability statements can make or break your federal business — and AI is changing how fast small businesses can build a winning one. In this episode, host Eric Coffey sits down with Zach Golden to walk through a live demo of creating a professional, high-scoring capability statement in under 15 minutes using AI tools, specifically OpenGovIQ, a platform built on a library of over 100 successful capability statements. Here's what you'll learn in this episode: Why most…",
    "duration": "08:28",
    "link": "https://govcongiants.libsyn.com/build-a-100k-capability-statement-in-15-minutes-using-ai-tools",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_2_100k_Capability_Statement_in_15_Mins_using_AI_-_Zach_Golden_02-18-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/f/5/5/7f551f1802476eb5d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260331-gmqrom59dp.png",
    "thumb": "/episodes/ep-112.jpg"
  },
  {
    "title": "Micro-Purchase Strategy: Fastest Way to Get Federal Revenue | EP: 318",
    "date": "2026-04-01",
    "description": "If you want to know how to win government contracts without chasing massive RFPs, this episode breaks down a smarter, more effective strategy for small businesses entering federal contracting. Many entrepreneurs believe that landing large contracts is the fastest path to growth—but in reality, bidding on big RFPs can slow you down, drain resources, and reduce your chances of winning. Instead, this episode highlights how micro purchases and relationship-based contracting can help you build…",
    "duration": "01:22:06",
    "link": "https://govcongiants.libsyn.com/why-small-businesses-should-avoid-large-rfps-and-win-micro-purchases-ep-318",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Why_Bidding_on_Huge_RFPs_is_Slowing_Down_Your_Government_Business_Judy_Bradt.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/b/2/a/a/b2aa95d15e7c7c59d959afa2a1bf1c87/GovCon_3.png",
    "thumb": "/episodes/ep-113.jpg"
  },
  {
    "title": "Building a Capability Statement That Gets You in the Room Fast",
    "date": "2026-03-31",
    "description": "Government contracting opportunities don't wait — and if you're not watching SAM.gov, you're already behind. In this episode of the Federal Help Center Podcast, Eric Coffey breaks down a real client strategy session, showing exactly how he helps businesses stop missing federal bids and start positioning themselves to win in some of the most competitive — and lucrative — niches in defense contracting. From sewing up the holes in your opportunity net to crafting a laser-focused capability…",
    "duration": "08:45",
    "link": "https://govcongiants.libsyn.com/building-a-capability-statement-that-gets-you-in-the-room-fast",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_3_From_Average_to_Elite_Supplier-_Why_Most_People_Fail_to_Enter_the_DoW_Inner_Circle_with_Ryan_Atencio_02-26-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/7/d/9/e7d932914090ae7316c3140a3186d450/FHC_Podcast_Thumbnail-20260327-4nph7frz2q.png",
    "thumb": "/episodes/ep-114.jpg"
  },
  {
    "title": "How Federal Contracting Consulting Is the Fastest Path to Big Wins",
    "date": "2026-03-30",
    "description": "Federal contracting consulting is still one of the most powerful entry points for small businesses — and in today's shifting landscape, it may be more accessible than ever. In this episode, Eric Coffey breaks down why consulting remains the fastest route to landing bigger government contracts, even as federal rules and market dynamics continue to evolve. What you'll take away from this episode: The overseas recompete story — How a social media contractor in Pakistan used the recompete tracker…",
    "duration": "07:42",
    "link": "https://govcongiants.libsyn.com/how-federal-contracting-consulting-is-the-fastest-path-to-big-wins",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_1_Consulting_Pivot-_2M_Pipeline_-_Eric_Coffie_02-24-26.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/2/3/6/c/236c06bb514c34e516c3140a3186d450/FHC_Podcast_Thumbnail-20260327-yfsso7szoe.png",
    "thumb": "/episodes/ep-115.jpg"
  },
  {
    "title": "How to Identify Hidden Skills That Win You Federal Contracts Today",
    "date": "2026-03-29",
    "description": "Government contracting skills are the foundation of every winning federal contract — and you may already have more than you think. In this episode of the Federal Help Center Podcast, host Eric Coffey walks entrepreneurs through the critical process of identifying hidden expertise, translating everyday abilities into government-ready services, and building the past performance that sets your business apart. Key takeaways from this episode: Translate your civilian skills into government language…",
    "duration": "09:37",
    "link": "https://govcongiants.libsyn.com/how-to-identify-hidden-skills-that-win-you-federal-contracts-today",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/8_Identifying_Skills__Building_Expertise_-_Colin_Nchako_030226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/d/1/f/b/d1fb12748ccf889ad959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260324-qyv636viub.png",
    "thumb": "/episodes/ep-116.jpg"
  },
  {
    "title": "How to Get Noticed by Agencies in Federal Contracting (Beginner Guide)",
    "date": "2026-03-28",
    "description": "If you want to know how to build credibility in government contracting and get noticed by federal agencies, this episode breaks down exactly what it takes to stand out—even as a beginner. In this conversation, we dive into how small business owners can successfully position themselves in front of contracting officers, program managers, and decision-makers. From understanding agency needs to showing up professionally, this episode highlights the importance of preparation, branding, and…",
    "duration": "09:27",
    "link": "https://govcongiants.libsyn.com/how-to-get-noticed-by-agencies-in-federal-contracting-beginner-guide",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_6_Ready_Set_Go_-_Procurement_Readiness_-_Randie_Ward_030526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/b/1/1/1/b111a07d003999bcd959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260324-0rt447kkj4.png",
    "thumb": "/episodes/ep-117.jpg"
  },
  {
    "title": "Decode Million-Dollar Proposals in 3 Minutes Using AI Tools",
    "date": "2026-03-27",
    "description": "Federal contract proposals don't have to take days to decode — AI tools are changing the game for small business owners competing for government work. In this episode of the Federal Help Center Podcast, Eric Coffey walks through his exact process for using AI-powered platforms to analyze solicitations, identify compliance gaps, and determine whether a contract is even worth pursuing — all in under three minutes. 🔍 Know before you go: Learn why asking \"what might prevent me from winning this…",
    "duration": "07:45",
    "link": "https://govcongiants.libsyn.com/using-ai-to-break-down-federal-proposals-in-minutes",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_7_Decode_Million-Dollar_Proposals_in_3_Minutes_-_Zach_Golden_030426.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/d/d/2/3dd270d838619d1016c3140a3186d450/FHC_Podcast_Thumbnail-20260324-0g6l9o9e9l.png",
    "thumb": "/episodes/ep-118.jpg"
  },
  {
    "title": "How to Capture Government Contracts Before They Go to Bid",
    "date": "2026-03-26",
    "description": "If you want to know how to win government contracts without always competing on price, this episode breaks down a powerful strategy most contractors overlook—selling directly to government end users. Learn how understanding the buyer's internal process can give you a major advantage before a contract ever goes out to bid. In this episode, we dive into how successful contractors position themselves by guiding end users through the purchasing process, making it easier for them to buy. You'll hear…",
    "duration": "09:51",
    "link": "https://govcongiants.libsyn.com/how-to-capture-government-contracts-before-they-go-to-bid",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_5_What_the_Gurus_Dont_Teach_The_DoW_End-User_Direct_Strategy_with_Ryan_Atencio_030526.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/6/7/2/06724d84bdeef79016c3140a3186d450/FHC_Podcast_Thumbnail-20260324-2xpoacwmqq.png",
    "thumb": "/episodes/ep-119.jpg"
  },
  {
    "title": "No Past Performance? Here's How You Still Win Federal Contracts | EP: 317",
    "date": "2026-03-25",
    "description": "If you want to know how to start government contracting without past performance or capital, this episode breaks down a powerful consulting-first strategy that can fast-track your entry into GovCon. Instead of struggling to win contracts from scratch, you'll learn how to partner with established businesses and leverage their existing capabilities to unlock opportunities. In this episode, we explore why most business owners are stuck working in their business instead of growing it—and how that…",
    "duration": "22:44",
    "link": "https://govcongiants.libsyn.com/why-consulting-is-the-easiest-way-to-start-government-contracting-ep-317",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/2_No_Past_Performance_Heres_How_You_Still_Win_Federal_Contracts.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/e/d/5/5/ed55f7990e05346616c3140a3186d450/GovCon.png",
    "thumb": "/episodes/ep-120.jpg"
  },
  {
    "title": "Why No New 8(a) Approvals & How to Win Contracts Anyway",
    "date": "2026-03-24",
    "description": "Ever wondered why no new 8(a) companies are being approved—and what that means for your government contracting strategy? In this episode, we break down the current 8(a) program freeze and what it means for small businesses trying to break into federal contracting. Despite the slowdown in approvals, opportunities are still flowing—and in some cases, increasing. We dive into how experienced contractors are navigating this challenge, including creative strategies like joint ventures, partnerships…",
    "duration": "12:12",
    "link": "https://govcongiants.libsyn.com/why-no-new-8a-approvals-how-to-win-contracts-anyway",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/24-3_Why_No_New_8a_Approvals__How_to_Win_Contracts_Anyway.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/c/f/3/9cf3708aa550448616c3140a3186d450/FHC_Podcast_Thumbnail-20260322-zhbe2y89fk.png",
    "thumb": "/episodes/ep-121.jpg"
  },
  {
    "title": "The Goal Setting Strategy That Helped Me Win My First Big Opportunity",
    "date": "2026-03-23",
    "description": "If you want to know how to break into government contracting without experience, this episode reveals a powerful mindset and strategy that can change everything. Learn how to set clear targets, focus your efforts, and take strategic action to turn rejection into real opportunities. In this episode, Eric Coffey shares a personal story about landing his first job despite having zero qualifications—and how that same \"target-based\" approach applies directly to winning contracts and growing a…",
    "duration": "11:54",
    "link": "https://govcongiants.libsyn.com/the-goal-setting-strategy-that-helped-me-win-my-first-big-opportunity",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_Sharpshooter_030626.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/a/5/4/0/a540997ead9b9684d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260319-p2z6lj0cij.png",
    "thumb": "/episodes/ep-122.jpg"
  },
  {
    "title": "NAICS vs PSC Codes: What GovCon Beginners Must Know",
    "date": "2026-03-22",
    "description": "If you want to know how to choose the right NAICS code for government contracts, this episode breaks it down in a simple, practical way. Selecting the wrong NAICS code can limit your growth, reduce opportunities, or push you out of small business status faster than expected. In this episode, we cover how NAICS codes work, how size standards impact your eligibility, and why choosing the right primary code matters for long-term success in government contracting. You'll also learn how to use PSC…",
    "duration": "09:43",
    "link": "https://govcongiants.libsyn.com/naics-vs-psc-codes-what-govcon-beginners-must-know",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_-_Randie_Ward.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/f/0/7/0/f07059fb0992ac5016c3140a3186d450/FHC_Podcast_Thumbnail-20260318-e6x6v9ipfp.png",
    "thumb": "/episodes/ep-123.jpg"
  },
  {
    "title": "BD vs. Capture Management: What's the Difference in Federal Contracting?",
    "date": "2026-03-21",
    "description": "If you want to know how to get ahead of your competition in federal contracting, you need to understand the difference between Business Development (BD) and Capture Management. Are you just building relationships, or are you strategically positioning your company to win contracts years before they are even posted? In this episode of the Federal Help Center podcast, host Eric Coffey breaks down these two critical but often confused concepts. He explains that while BD is about identifying…",
    "duration": "08:43",
    "link": "https://govcongiants.libsyn.com/bd-vs-capture-management-whats-the-difference-in-federal-contracting",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1-_Zach_Golden_031126.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/6/f/7/96f7b25a2b89003c16c3140a3186d450/FHC_Podcast_Thumbnail-20260318-tba70ejbns.png",
    "thumb": "/episodes/ep-124.jpg"
  },
  {
    "title": "How to Use Sources Sought & RFIs to Win Government Contracts",
    "date": "2026-03-20",
    "description": "If you want to know how to win government contracts before the RFP is even released, this episode breaks down one of the most powerful (and overlooked) strategies in federal contracting: shaping the requirement during the pre-solicitation phase. You'll learn how to leverage sources sought notices and RFIs to position your business for success by influencing contract requirements early. Instead of competing blindly when the solicitation drops, discover how to align opportunities with your…",
    "duration": "11:13",
    "link": "https://govcongiants.libsyn.com/how-to-use-sources-sought-rfis-to-win-government-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_Make_the_RFP_Beg_for_YOU_with_Ryan_Atencio_031226.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/f/9/2/1f92103c6196ecb7d959afa2a1bf1c87/FHC_Podcast_Thumbnail-20260318-h6mfvkjox9.png",
    "thumb": "/episodes/ep-125.jpg"
  },
  {
    "title": "How to Avoid Costly Mistakes with Wage Determinations in Federal Bids",
    "date": "2026-03-19",
    "description": "If you want to know how to understand Service Contract Act (SCA) wage determinations and apply them correctly in federal contracts, this episode breaks it down in a practical, easy-to-follow way. Navigating the SCA can be confusing—especially when solicitations don't clearly state whether it applies or how to interpret wage determinations. In this conversation, we unpack how to identify whether a contract falls under SCA, where to find the right wage determinations, and what to do when…",
    "duration": "08:44",
    "link": "https://govcongiants.libsyn.com/how-to-avoid-costly-mistakes-with-wage-determinations-in-federal-bids",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_How_much_do_you_know_-_Eric_Coffie.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/f/d/3/0fd39fde2ba3684e16c3140a3186d450/FHC_Podcast_Thumbnail.png",
    "thumb": "/episodes/ep-126.jpg"
  },
  {
    "title": "316: Win Your First Government Contract in 2026 (Step-by-Step)",
    "date": "2026-03-18",
    "description": "Are you ready to stop dreaming about government contracts and start winning them? In this powerful Q&A session, Eric Coffie and Maria Martinez deliver the ultimate FIRST CONTRACT BLUEPRINT for 2026. Whether you're a complete beginner or have been struggling to get your foot in the door, this episode is packed with the real-world strategies you need to navigate the federal marketplace. Forget the theory. This is a live, unfiltered conversation where we tackle your biggest questions head-on. We…",
    "duration": "01:20:41",
    "link": "https://govcongiants.libsyn.com/316-win-your-first-government-contract-in-2026-step-by-step",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/1_Win_Your_First_Government_Contract_in_2026_New.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/a/6/3/9a634190e99155afd959afa2a1bf1c87/GovCon_4.png",
    "thumb": "/episodes/ep-127.jpg"
  },
  {
    "title": "How UNKNOWN Contractors Make Billions Without Big Contracts",
    "date": "2026-03-06",
    "description": "Most contractors think winning in government contracting means being the biggest, loudest, or cheapest. In this episode of the Federal Help Center Podcast , Ryan Atencio explains why some of the most successful federal suppliers are companies you've never heard of—and how they quietly generate billions by staying close to the customer. You'll learn why integrators and solution providers win by being physically present, saying \"yes\" more often, and making it easy for government buyers to get…",
    "duration": "07:17",
    "link": "https://govcongiants.libsyn.com/how-unknown-contractors-make-billions-without-big-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP46_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/b/3/f/8b3f75e0cdb78f4a16c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-128.jpg"
  },
  {
    "title": "The $15K to $350K Path Most Government Contractors NEVER See",
    "date": "2026-03-05",
    "description": "Most contractors are told to niche down—and then wonder why opportunities pass them by. In this episode of the Federal Help Center Podcast, Ryan Atencio explains why once you're in front of the government, a narrow scope becomes a liability, not a strength, and how contractors who position themselves as solution providers win more work. You'll learn why everything starts with a quote, how offering a wide range of high-frequency supplies and services keeps you top of mind, and why speed and…",
    "duration": "08:01",
    "link": "https://govcongiants.libsyn.com/the-15k-to-350k-path-most-government-contractors-never-see",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP45_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/2/6/d/1/26d1a389442eba2016c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-129.jpg"
  },
  {
    "title": "HARSH GovCon Truth: The LOUDEST Contractor Gets the Call",
    "date": "2026-03-03",
    "description": "Most contractors fail in government contracting not because they lack capability—but because they disappear too soon. In this episode of the Federal Help Center Podcast , Ryan Atencio breaks down why Air Force bases are some of the hardest customers to break into, yet the most valuable once you do, and how consistent visibility beats waiting on solicitations. You'll learn how to use SAM.gov searches, site visits, and repeated outreach to contract officers to stay top of mind, why everything…",
    "duration": "07:57",
    "link": "https://govcongiants.libsyn.com/harsh-govcon-truth-the-loudest-contractor-gets-the-call",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP44_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/2/6/8/9/2689c21d6f0bc55e16c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-130.jpg"
  },
  {
    "title": "Why Federal Buying Is Not Fair—and That's Good for Smart Contractors",
    "date": "2026-03-02",
    "description": "Most contractors assume federal buying works the same everywhere—but it doesn't. In this episode of the Federal Help Center Podcast , Ryan Atencio breaks down how purchasing behavior differs across the Army, Navy, Air Force, and other branches, and why understanding those differences can directly impact your win rate. You'll learn how government purchase cards are recognized by banks, why some branches operate loose while others are highly structured, and how contracting officers, end users…",
    "duration": "08:01",
    "link": "https://govcongiants.libsyn.com/why-federal-buying-is-not-fairand-thats-good-for-smart-contractors",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP43_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/e/1/c/8e1c641eb733a18b16c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-131.jpg"
  },
  {
    "title": "How Contractors WIN FASTER Using Unison Marketplace (Up To $350K GovCon Deals!)",
    "date": "2026-02-27",
    "description": "Most contractors lose opportunities not because they're unqualified—but because they don't understand how buyers actually want to purchase. In this episode of the Federal Help Center Podcast , Ryan Atencio breaks down how Unison Marketplace works, why agencies love it, and how simplified acquisitions under $350,000 create some of the fastest paths to revenue in government contracting. You'll learn how shaping requirements with custom kits and part numbers keeps you in control, why crossing the…",
    "duration": "07:10",
    "link": "https://govcongiants.libsyn.com/how-contractors-win-faster-using-unison-marketplace-up-to-350k-govcon-deals",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP42_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/1/6/5/8165caae2b46ba6ad959afa2a1bf1c87/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-132.jpg"
  },
  {
    "title": "The $15,000 GovCon SHORTCUT Nobody Explains Clearly!",
    "date": "2026-02-26",
    "description": "Most contractors chase solicitations without understanding how federal agencies actually buy. In this episode of the Federal Help Center Podcast, Ryan Atencio break down micro-purchase thresholds, government card swipes, and why agencies will always choose the fastest, least complicated buying path whenever they can. You'll learn how the $15,000 micro-purchase limit for supplies really works, why quotes magically come in just under the threshold, and how understanding micro-purchases and the…",
    "duration": "07:17",
    "link": "https://govcongiants.libsyn.com/the-15000-govcon-shortcut-nobody-explains-clearly",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP41_-_No_ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/2/3/2/f/232f20bc41675979d959afa2a1bf1c87/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-133.jpg"
  },
  {
    "title": "How to Choose SKILLS That Actually WIN Government Contracts",
    "date": "2026-02-24",
    "description": "In this episode of the Federal Help Center Podcast , Colin Nchako delivers a hard truth most small business owners don't want to hear: adding skills you don't plan to master is one of the fastest ways to stall your growth in government contracting. Colin explains why skills must connect , not just exist—and how mismatched offerings confuse buyers, weaken proposals, and slow your path to larger contracts. Using real examples from his own journey, Colin breaks down how marketing and training…",
    "duration": "08:23",
    "link": "https://govcongiants.libsyn.com/how-to-choose-skills-that-actually-win-government-contracts",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP40_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/a/c/4/6/ac461f3b2c386aab16c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-134.jpg"
  },
  {
    "title": "You're Sitting on SKILLS That Could Be Paying You Right Now",
    "date": "2026-02-23",
    "description": "In this episode of the Federal Help Center Podcast , Colin Nchako challenges small business owners to stop hiding their skills and start monetizing them—now. From programming language courses and AI content to trade training and workforce development, Colin explains why the fastest path to new contracts isn't always chasing something new, but packaging what you already know in a way the government and private sector will pay for. If you've been waiting for the \"perfect\" contract, this episode…",
    "duration": "06:28",
    "link": "https://govcongiants.libsyn.com/youre-sitting-on-skills-that-could-be-paying-you-right-now",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP39_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/a/0/a/0a0a7bd06b60824e16c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-135.jpg"
  },
  {
    "title": "You're LOSING Contracts Because You're Looking in the WRONG Places",
    "date": "2026-02-20",
    "description": "",
    "duration": "07:25",
    "link": "https://govcongiants.libsyn.com/youre-losing-contracts-because-youre-looking-in-the-wrong-places",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP38_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/f/8/2/1f82e10a4bca861716c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-136.jpg"
  },
  {
    "title": "You're NOT Missing Skills, You're Under-Selling Your Expertise!",
    "date": "2026-02-19",
    "description": "In this episode of the Federal Help Center Podcast , Colin Nchako breaks down one of the most common mistakes small businesses make in government contracting: confusing talent with expertise. Colin shares how he recently restructured his own capability statement, shortened his positioning language, and redefined his business around what the government actually buys — not what sounds impressive. The key lesson? You can add new skills to your business, but if you don't intentionally build and…",
    "duration": "07:31",
    "link": "https://govcongiants.libsyn.com/youre-not-missing-skills-youre-under-selling-your-expertise",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP37_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/0/1/d/c/01dc82ce562bed26d959afa2a1bf1c87/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-137.jpg"
  },
  {
    "title": "315: 5 Moves That Win Government Contracts in 2026 (FREE $1,500 Bootcamp Secrets)",
    "date": "2026-02-18",
    "description": "Most small businesses are doing government contracting completely wrong—and it's costing them months of time, thousands of dollars, and contracts they should already have. In this live recap, Eric breaks down the 5 moves that separate winners from everyone else in 2026—without the \"spray and pray\" approach, without waiting on RFPs, and without wasting your life refreshing SAM.gov. This episode is a condensed bootcamp breakdown of what Eric taught during an 8-hour training—compressed into a…",
    "duration": "01:36:58",
    "link": "https://govcongiants.libsyn.com/315-5-moves-that-win-government-contracts-in-2026-free-1500-bootcamp-secrets",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/315_-_Encore_1_-_1500_Bootcamp_Secrets_FREE__5_Moves_That_Win_Contracts_in_2026_LIVE.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/b/7/d/a/b7da8916396f5dc516c3140a3186d450/315_-_5_Moves_That_Win_Contracts_in_2026.png",
    "thumb": "/episodes/ep-138.jpg"
  },
  {
    "title": "MOST New GovCon Businesses FAIL at This One SIMPLE Step!",
    "date": "2026-02-17",
    "description": "Most people think they're \"new to government contracting.\" They're not. They're new to how the government does business—and that's a massive difference. In this episode, Colin Nchako breaks down how to help someone who wants to pivot (like a general contractor moving into the product game) without wasting months guessing what the Army buys. The play is simple: stop speaking in vague terms like \"Army supplies\" and start doing real research using USAspending and FPDS, then match yourself to the…",
    "duration": "06:50",
    "link": "https://govcongiants.libsyn.com/most-new-govcon-businesses-fail-at-this-one-simple-step",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP36_-_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/8/f/f/c/8ffc98d0403127ded959afa2a1bf1c87/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-139.jpg"
  },
  {
    "title": "How a $2.2M Contract Was WON With ZERO Past Performance — Just One Bold Move",
    "date": "2026-02-16",
    "description": "In this episode of the Federal Help Center Podcast, Ryan Atencio breaks down a critical truth most contractors overlook: the incumbent wasn't always experienced either. Before winning their first contract, many companies had no federal past performance—they simply put their name in the hat and refused to disqualify themselves early. Ryan walks through how to research recompetes properly by digging into parent awards, task orders, and spending patterns to uncover the real contract value—often…",
    "duration": "08:30",
    "link": "https://govcongiants.libsyn.com/how-a-22m-contract-was-won-with-zero-past-performance-just-one-bold-move",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP36_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/9/5/d/2/95d2759aa190794f16c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-140.jpg"
  },
  {
    "title": "How to WIN a $16M Federal RECOMPETE by Outsmarting the Incumbent",
    "date": "2026-02-13",
    "description": "In this episode of the Federal Help Center Podcast, Ryan Atencio breaks down one of the most important moves in federal contracting: identifying the incumbent and controlling the recompete strategy before the bid even drops. By uncovering that the current contract holder (T3I) is now considered a large business, Ryan explains how small businesses can leverage sources sought responses to push an opportunity back into a service-disabled veteran-owned small business set-aside , forcing the…",
    "duration": "08:42",
    "link": "https://govcongiants.libsyn.com/how-to-win-a-16m-federal-recompete-by-outsmarting-the-incumbent-0",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP34_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/9/1/5/1915cbc8348d0b7416c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-141.jpg"
  },
  {
    "title": "From COR to Contractor: Winning High-Stakes SOCOM Contracts the Smart Way With Ryan Atencio",
    "date": "2026-02-12",
    "description": "In this episode of the Federal Help Center Podcast, Ryan Atencio shares his experience as someone who has worked both sides of the table — first as a government customer developing performance work statements, cost estimates, and source selections for tens of millions of dollars in contracts, and later as a contractor selling directly to Special Operations units after leaving the military in 2021. He shares how capturing end-user requirements and building custom \"kits\" can create a powerful…",
    "duration": "08:26",
    "link": "https://govcongiants.libsyn.com/from-cor-to-contractor-winning-high-stakes-socom-contracts-the-smart-way-with-ryan-atencio",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP33_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/5/b/5/5/5b556b0c6c87a4fc16c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-142.jpg"
  },
  {
    "title": "314: 8 Agency Pain Points That Can TRIPLE Your Win Rate in 2026!",
    "date": "2026-02-11",
    "description": "Are you spending time chasing agencies that don't have money—or don't have a reason to buy from you? In this episode, Eric Coffie breaks down how federal spending actually works (appropriations + continuing resolutions) and why understanding where funding is flowing matters more than ever for small businesses. He explains the reality behind \"fast\" solicitations (2–3 week turnarounds), how Q1 spending pressure creates urgency, and why positioning before opportunities drop is the real advantage…",
    "duration": "01:13:59",
    "link": "https://govcongiants.libsyn.com/314-8-agency-pain-points-that-can-triple-your-win-rate-in-2026",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/314_-_Encore_3_-_Agencies_Are_Under_Pressure_to_Buy__8_Problems_Smart_Small_Businesses_Solve.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/4/0/7/d/407d750baece5dd8d959afa2a1bf1c87/EP314_-__YT_Live_-_8_Pain_Points.png",
    "thumb": "/episodes/ep-143.jpg"
  },
  {
    "title": "OpnGovIQ's 2-Part System Contractors NEED Before AI Contracts EXPLODE!",
    "date": "2026-02-10",
    "description": "In this episode, Zach Golden breaks down what OpnGovIQ really is — and why contractors who don't understand the difference between basic AI tools and a full federal CRM pipeline are already falling behind. Zach explains how OpnGovIQ's built-in agents can handle everything from capability statements to proposal timelines, FAR-based compliance questions, and even SAM.gov guidance, making it an all-in-one advantage for federal contractors moving fast. The conversation then shifts into one of the…",
    "duration": "05:42",
    "link": "https://govcongiants.libsyn.com/opngoviqs-2-part-system-contractors-need-before-ai-contracts-explode",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP32_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/3/6/6/e/366ef062da73ebf3d959afa2a1bf1c87/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-144.jpg"
  },
  {
    "title": "How to Review 6 Federal OPPORTUNITIES in 30 Minutes Using OpnGovIQ",
    "date": "2026-02-09",
    "description": "In this episode, Zach Golden walks through one of the most critical skills in federal contracting: making fast, confident bid/no-bid decisions before you waste weeks chasing the wrong opportunity. Using OpnGovIQ, Zach shows how contractors can decode an RFP in under five minutes, identify hidden requirements, and immediately spot what could prevent them from winning — especially in complex VA janitorial and medical-adjacent contracts. Zach also explains how this rapid breakdown process scales…",
    "duration": "06:45",
    "link": "https://govcongiants.libsyn.com/how-to-review-6-federal-opportunities-in-30-minutes-using-opngoviq",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP31_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/1/8/4/6184cf80f9b12156d959afa2a1bf1c87/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-145.jpg"
  },
  {
    "title": "Avoid VA Proposal DISQUALIFICATION with OpnGovIQ!",
    "date": "2026-02-06",
    "description": "In this episode of the Federal Help Center Podcast, Zach Golden walks through how contractors can use OpnGovIQ to break down an RFP quickly and avoid falling behind as opportunities begin dropping faster and deadlines shrink. He explains how uploading key documents like the PWS and price schedule can instantly generate a compliance matrix, helping businesses identify exactly what the government is asking for before wasting weeks on the wrong bid. Zach also highlights the importance of spotting…",
    "duration": "06:55",
    "link": "https://govcongiants.libsyn.com/avoid-va-proposal-disqualification-with-opngoviq",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP30_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/6/8/f/a/68fae2a3fc107fa616c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-146.jpg"
  },
  {
    "title": "The 5-Minute RFP Skim EVERY GovCon Business NEEDS using OpnGovIQ!",
    "date": "2026-02-05",
    "description": "In this episode of the Federal Help Center Podcast, Zach Golden sets the tone for entrepreneurs who refuse to navigate federal contracting alone—then the session shifts into a practical, real-time working breakdown of an actual VA Janitorial Services RFP. The focus is speed and decision-making: how to do a quick bid/no-bid review now, because once contract volume ramps up in April–June, you'll need a repeatable process to keep up with SAM.gov opportunities and everything else on your plate…",
    "duration": "07:35",
    "link": "https://govcongiants.libsyn.com/the-5-minute-rfp-skim-every-govcon-business-needs-using-opengoviq",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP29_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/7/a/e/8/7ae85d7d0f8011b016c3140a3186d450/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-147.jpg"
  },
  {
    "title": "313: $26B in 8A Contracts + 1,100 Firms Suspended: Why Opportunity Is Bigger Than Ever With Sam Le",
    "date": "2026-02-04",
    "description": "In this episode of the Govcon Giants Podcast, Eric Coffie sits down with Sam Le, founder of GovCon Intelligence and former SBA procurement policy leader with 17 years in federal contracting. Together, they break down the latest turbulence surrounding the 8A Program — including SBA's massive data call, the suspension of 1,100 firms, and heightened scrutiny on sole source awards above $20M. But despite the headlines, Sam explains why this may actually be the strongest moment in 8A history: the…",
    "duration": "50:52",
    "link": "https://govcongiants.libsyn.com/313-26b-in-8a-contracts-1100-firms-suspended-why-opportunity-is-bigger-than-ever-with-sam-le",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP213_-_Encore_2_-_Same_Le_FULL_Audio.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/5/3/0/b/530bca89f48693e5d959afa2a1bf1c87/EP313_-__Sam_Le.png",
    "thumb": "/episodes/ep-148.jpg"
  },
  {
    "title": "Why YOUR NETWORK Matters More Than Your Next Bid!",
    "date": "2026-02-03",
    "description": "In this episode of the Federal Help Center Podcast , Randie Ward reminds contractors that getting found isn't just about proposals — it's about proximity to the right people. Randie highlights how conferences, industry days, and LinkedIn connections help small businesses stay visible long before opportunities drop. She also shares an important invitation: learning directly from seasoned experts who have already built, scaled, and exited successful federal businesses. Randie previews upcoming…",
    "duration": "06:56",
    "link": "https://govcongiants.libsyn.com/why-your-network-matters-more-than-your-next-bid",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP28_-_No_Ad_FHC.mp3?dest-id=1224122",
    "image": "https://static.libsyn.com/p/assets/1/d/4/5/1d45708e301caba6d959afa2a1bf1c87/The_Federal_Help_Center_Podcast_5.jpg",
    "thumb": "/episodes/ep-149.jpg"
  }
];
