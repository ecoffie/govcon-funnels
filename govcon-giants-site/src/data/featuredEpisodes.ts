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
    "blurb": "In this very special episode of the GovCon Giants podcast, we have Jackie Robinson-Burnette, the Associate Administrator of Government Contracting at the SBA, a leader poised to revolutionize small business access to…"
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
    "blurb": "In this episode, we sit down with Mr. Wayne Berry, a Senior Procurement Analyst and Small Business Specialist at the National Institutes of Health (NIH), part of the Department of Health and Human Services. With over 15…"
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
    "blurb": "CMMC compliance is one of the most misunderstood requirements in government contracting, and the rumor that it costs small businesses $250,000 is simply not true. In this episode, Eric Coffie sits down with Katie…"
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
    "blurb": "In this Govcon Giants episode, I sat down with Erik Raven, former Under Secretary of the Navy (2022–2024) and longtime defense budget insider, to uncover how a $260B department with nearly 900,000 people actually buys…"
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
    "blurb": "Today's guest was gracious enough to take time out of his busy schedule as the newly-appointed SBA regional administrator, to talk with us. Ashley D. Bell was appointed Feb. 2018, by the White House, to serve as…"
  },
  {
    "guest": "Shelley Hall",
    "role": "Federal Contracting Officer, 32 years",
    "agency": "U.S. Federal Government",
    "photo": "/faces/shelley-hall.jpg",
    "title": "307: After 32 Years as a CONTRACTING OFFICER, Here's Why Most Small Businesses LOSE with Shelley Hall",
    "date": "2025-12-24",
    "duration": "01:03:46",
    "link": "https://govcongiants.libsyn.com/307-after-32-years-as-a-contracting-officer-heres-why-most-small-businesses-lose-with-shelley-hall",
    "audioUrl": "https://traffic.libsyn.com/secure/govcongiants/EP307_-_Encore_1_-_FULL_AUdio.mp3?dest-id=1224122",
    "blurb": "In this episode of the GovCon Giants Podcast, Eric Coffie sits down with Shelley Hall, a former warranted contracting officer with 32 years inside the federal government and now VP of Client Services at Skyway…"
  }
];
