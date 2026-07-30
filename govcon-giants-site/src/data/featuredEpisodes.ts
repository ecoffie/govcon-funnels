export interface FeaturedEpisode {
  guest: string;
  role: string;
  agency: string;
  /** Headshot in /public/faces */
  photo: string;
  title: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  duration: string;
  /** Libsyn episode page URL */
  link: string;
  /** Direct MP3 URL (streamable on-site) */
  audioUrl: string;
  blurb: string;
  /** Full untruncated description (HTML-stripped) for the detail page. */
  body: string;
}

/** Curated featured episodes — conversations with government officials.
 *  Data pulled from the Libsyn RSS feed (see scripts/rss-to-episodes.py). */
export const featuredEpisodes: FeaturedEpisode[] = [
  {
    "guest": "Jackie Robinson-Burnette",
    "role": "Former Associate Administrator, Office of Government Contracting & Business Development",
    "agency": "U.S. Small Business Administration",
    "photo": "/faces/jackie-robinson-burnett.jpg",
    "title": "Simplifying Federal Certifications: A Game-Changer for Small Businesses",
    "date": "2024-10-30",
    "duration": "01:15:03",
    "link": "https://govcongiants.libsyn.com/simplifying-federal-certifications-a-game-changer-for-small-businesses",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/8_-_Jackie_-_New_Intro_Ad.mp3?dest-id=1224122",
    "blurb": "In this very special episode of the GovCon Giants podcast, we have Jackie Robinson-Burnette, the Associate Administrator of Government Contracting at the SBA, a leader poised to revolutionize small business access to…",
    "body": "In this very special episode of the GovCon Giants podcast, we have Jackie Robinson Burnett, the Associate Administrator of Government Contracting at the SBA, a leader poised to revolutionize small business access to federal contracts. Jackie unveils a groundbreaking SBA platform that cuts certification approval times by up to 70%, offering small businesses a streamlined process to secure multiple certifications with one application. She dives into the inner workings of federal set-aside programs and shares essential strategies for getting noticed in the contracting world. This episode is packed with insights and reveals opportunities that could transform your approach to federal contracting. Plus, meet Jackie live at the upcoming Miami Federal Contracting Summit on November 14-15. Don't miss this chance to learn from an industry insider ready to reshape the game for small businesses. Website: https://certifications.sba.gov/"
  },
  {
    "guest": "Wayne Berry",
    "role": "Senior Procurement Analyst & Small Business Specialist, NIH",
    "agency": "Dept. of Health & Human Services",
    "photo": "/faces/wayne-berry.jpg",
    "title": "STOP! 70,000 Contracts & You're Still Losing? Here's Why HHS Might Be Ignoring You!",
    "date": "2025-07-31",
    "duration": "07:58",
    "link": "https://govcongiants.libsyn.com/stop-70000-contracts-youre-still-losing-heres-why-hhs-might-be-ignoring-you",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP206_-_Ad_1_-_FULL_Audio.mp3?dest-id=1224122",
    "blurb": "In this episode, we sit down with Mr. Wayne Berry, a Senior Procurement Analyst and Small Business Specialist at the National Institutes of Health (NIH), part of the Department of Health and Human Services. With over 15…",
    "body": "In this episode, we sit down with Mr. Wayne Berry, a Senior Procurement Analyst and Small Business Specialist at the National Institutes of Health (NIH), part of the Department of Health and Human Services. With over 15 years of experience in federal contracting, Wayne provides valuable insights into how small businesses can navigate the complex landscape of government procurement. He breaks down the differences between agencies, highlighting the contrast between Veteran Affairs and HHS, shedding light on how each agency's unique mission shapes their purchasing strategies. Wayne emphasizes that understanding not just what an agency buys, but how they buy it, is crucial for success. From GSA schedules to the nuances of the small business program, Wayne's expertise shines through as he simplifies intricate concepts for newcomers to the world of federal contracting. Join us as Wayne Berry guides us through the intricate world of government contracts, offering practical advice for small businesses seeking to make their mark. Remember, government contracts might seem like one big entity, but it's a landscape made up of diverse agencies with distinct approaches to procurement. Tune in to this episode to learn how to navigate the system and position your small business for success!"
  },
  {
    "guest": "Katie Arrington",
    "role": "Architect of CMMC, former DoD CIO/CISO",
    "agency": "U.S. Department of Defense",
    "photo": "/faces/katie-arrington.jpg",
    "title": "The Woman Who Wrote CMMC: The $250K \"Compliance Cost\" Is a Lie | EP: 334",
    "date": "2026-07-22",
    "duration": "27:10",
    "link": "https://govcongiants.libsyn.com/the-woman-who-wrote-cmmc-the-250k-compliance-cost-is-a-lie-ep-334",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/Audio_2_Katie_Eric_part_2.mp3?dest-id=1224122",
    "blurb": "CMMC compliance is one of the most misunderstood requirements in government contracting, and the rumor that it costs small businesses $250,000 is simply not true. In this episode, Eric Coffie sits down with Katie…",
    "body": "CMMC compliance is one of the most misunderstood requirements in government contracting, and the rumor that it costs small businesses $250,000 is simply not true. In this episode, Eric Coffie sits down with Katie Arrington, the architect behind CMMC, to break down what the real audit actually costs, why the rule was just paused for 60 days, and what small businesses need to know before making any decisions. If you have ever felt confused or priced out by CMMC headlines, this conversation sets the record straight. Key discussion points from this episode: Why the real CMMC audit costs around $20,000, not the $250,000 number circulating online How 75 percent of small businesses have already completed their compliance work without government funding Why the False Claims Act creates serious risk for companies that claim compliance they have not actually achieved How the level two maturity model was designed to give small businesses a roadmap from unclassified work to handling CUI Why the 60 day pause is meant for public comment and not a rollback of the CMMC rule itself Mindy gives you the federal opportunities, agency signals, recompete intel, and pursuit briefs that tell you not just what contracts exist, but which ones to chase and how to win them. Sign up for free Daily Alerts and get opportunities delivered to your inbox before the day starts. 👉 Get your free Daily Alerts here 🔗 https://getmindy.ai Connect with Encore Funding: http://govcongiants.org/funding EPISODE CHAPTERS: 0:00 - Introducing Mindy your federal contract research assistant 0:55 - Debunking the 250K CMMC cost myth 1:45 - Understanding the difference between audit and compliance costs 4:08 - Why CMMC has always been a net positive 5:34 - How the False Claims Act protects taxpayers 6:29 - Two changes Katie Arrington would make to CMMC 9:46 - Why small businesses fund their own compliance already 12:07 - The driver's license analogy for cybersecurity standards 15:27 - Comparing CMMC to banking and healthcare security systems 19:20 - Please stop confusing compliance with an audit 21:40 - Why this is not the time to lower cyber standards 25:49 - Closing thoughts and where to find Mindy"
  },
  {
    "guest": "Erik Raven",
    "role": "Former Under Secretary of the Navy",
    "agency": "U.S. Navy",
    "photo": "/faces/erik-raven.jpg",
    "title": "296: $260B Navy, 100,000 Jobs: The Government Contract Gold Rush (Before It's Gone) with Erik Raven",
    "date": "2025-10-08",
    "duration": "01:02:48",
    "link": "https://govcongiants.libsyn.com/296-260b-navy-100000-jobs-the-government-contract-gold-rush-before-its-gone-with-erik-raven",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP296_-_FULL_Audio_updated_-_Encore_3.mp3?dest-id=1224122",
    "blurb": "In this GovCon Giants episode, I sat down with Erik Raven, former Under Secretary of the Navy (2022–2024) and longtime defense budget insider, to uncover how a $260B department with nearly 900,000 people actually buys…",
    "body": "In this Govcon Giants episode, I sat down with Eric Raven, former Under Secretary of the Navy (2022–2024) and longtime defense budget insider, to uncover how a $260B department with nearly 900,000 people actually buys from tens of thousands of small businesses—and where the next wave of Government contracting dollars is headed. From small-business access through Gold Coast ( Navy Gold Coast Conference ) and buying commands like NAVAIR and NAVSEA, to workforce demands in the submarine industrial base, to the administration's ambitious \"Golden Dome\" missile-defense program, this episode is packed with insights you can act on now. Access & Wins: How to engage Navy buying commands (BSOs), why responding to RFIs/Sources Sought matters, and how to leverage events like Gold Coast . Scale & Policy: The shift toward \"teeth > tail,\" OTAs, and commercial practices that scale pilots from a handful of units to 10,000+. Where the Money's Going: Submarine base supply chain (17k suppliers, 100k workers needed), the U.S. shipbuilding gap (0.1% vs. China's ~50%), and the $175B–$500B Golden Dome initiative. Learn more: https://govcongiants.org/ Erik's Linkedin: https://www.linkedin.com/in/ erik-raven-7359a6324/"
  },
  {
    "guest": "Ashley D. Bell",
    "role": "Former Region IV Administrator",
    "agency": "U.S. Small Business Administration",
    "photo": "/faces/ashley-bell.jpg",
    "title": "012: Ashley D. Bell - Region IV Administrator, U.S. Small Business Administration",
    "date": "2019-07-16",
    "duration": "41:37",
    "link": "https://govcongiants.libsyn.com/012-ashley-d-bell-region-iv-administrator-us-small-business-administration",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/podcast_012.mp3?dest-id=1224122",
    "blurb": "Today's guest was gracious enough to take time out of his busy schedule as the newly-appointed SBA regional administrator, to talk with us. Ashley D. Bell was appointed Feb. 2018, by the White House, to serve as…",
    "body": "Today's guest was gracious enough to take time out of his busy schedule as the newly-appointed SBA regional administrator, to talk with us. Ashley D. Bell was appointed Feb. 2018, by the White House, to serve as regional administrator for the US Small Business Administration, Region IV, serving nine district locations and eight southeastern states, including Alabama, Florida, Georgia, Kentucky, Mississippi, North Carolina, South Carolina, and Tennessee. In today's interview, we discuss the decline of the 8a program, the new measures him and his team are putting together to curb that decline, and we briefly talk about the Opportunity Zones and funds instituted last year, and how small business owners should be taking advantage of them. For show notes visit: www.govcongiants.com/podcast/"
  },
  {
    "guest": "Shalaya Morissette",
    "role": "Chief, Minority Business & Workforce Division",
    "agency": "U.S. Department of Energy",
    "photo": "",
    "title": "Scoring Major Bid Opportunities in the Department of Energy",
    "date": "2024-02-21",
    "duration": "01:36:41",
    "link": "https://govcongiants.libsyn.com/209-scoring-major-bid-opportunities-in-the-department-of-energy-with-shalaya-morissette",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP209_-_FULL_Audio_-_Shalaya_Morissette.mp3?dest-id=1224122",
    "blurb": "In this episode, we are honored to have a powerhouse guest, Shalaya Morissette, who is making waves as the Chief of the Minority Business and Workforce Division in the…",
    "body": "In this episode, we are honored to have a powerhouse guest, Shalaya Morissette, who is making waves as the Chief of the Minority Business and Workforce Division in the U.S. Department of Energy (DOE), stationed within the Office of Energy Justice and Equity. Shalaya is a highly sought-after collaborator in the clean technology space, bringing a wealth of experience from her recent role in the utility sector, focusing on safety and compliance. We talked about remarkable opportunities in clean energy manufacturing, where eight winners stand to receive $250,000. We also highlighted the importance of a clear and concise roadmap over lengthy proposals and recommend checking out the user-friendly website for all the details. We delve into the topic of unsolicited proposals and touch on an exciting future prize for nonprofits involved in community outreach. As we expand our scope internationally, we engage listeners toward USAID and the Minority Business Development Agency for global initiatives. Lastly, we delve into practical advice on strategic plays and making the most of the opportunities available, emphasizing the significance of networking and collaboration within the Govcon community. Tune in for a dynamic discussion on elevating minorities in the energy sector and navigating the evolving landscape of clean technology. You don't want to miss this episode with a true giant in the industry! Linkedin: https://www.linkedin.com/in/shalayam/ US Department of Energy Linkedin: https://www.linkedin.com/company/energy/ Website: https://www.energy.gov/ Facebook: https://www.facebook.com/energy Instagram: https://www.instagram.com/energy/ Twitter: https://twitter.com/energy Youtube: https://www.youtube.com/user/USdepartmentofenergy Solve it Prize: https://www.herox.com/SOLVEIT MAKE IT Prize: https://www.herox.com/make-it-strategies Ask Us Anything Series: https://energy.gov/justice/ask-us-anything-series EERE Funding Opportunity Exchange: https://eere-exchange.energy.gov/ Advanced Research Projects Agency-Energy (ARPA-E) https://arpa-e.energy.gov/ Federal Help Center: https://federalhelpcenter.com/"
  }
];
