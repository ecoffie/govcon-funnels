export type SpeakerTier = 'summit' | 'podcast';

export interface Speaker {
  name: string;
  role: string;
  org: string;
  /** One-line credential shown on the card */
  credential: string;
  /** Headshot in /public/speakers — drop a same-named file in to swap */
  photo: string;
  /** Episode or summit profile link */
  link: string;
  tier: SpeakerTier;
}

const SUMMIT_SPEAKERS_URL = 'https://gcgsummit.com/speakers/';

/**
 * Industry Experts & Featured Speakers.
 * To add a speaker after each summit: add an entry here and drop a
 * 700x700 headshot into /public/speakers/<slug>.jpg — no markup changes.
 */
export const speakers: Speaker[] = [
  // ——— Tier 1: GCG National Summit speakers (Miami) ———
  {
    name: 'Jackie Robinson-Burnett',
    role: 'Associate Administrator, OGC&BD',
    org: 'U.S. Small Business Administration',
    credential: "Led the nation's small business contracting & certification programs",
    photo: '/speakers/jackie-robinson-burnett.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },
  {
    name: 'Donna Bennett',
    role: 'Chief Information Security Officer',
    org: 'U.S. Department of State',
    credential: "CISO of the U.S. Department of State",
    photo: '/speakers/donna-bennett.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },
  {
    name: 'Shannon Jackson',
    role: 'Executive Director (SES), OSDBU',
    org: 'Dept. of Health & Human Services',
    credential: 'Leads small business utilization across HHS',
    photo: '/speakers/shannon-jackson.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },
  {
    name: 'Vonna Ordaz',
    role: 'Director, Office of Small Business',
    org: 'Nuclear Regulatory Commission',
    credential: 'Directs small business programs at the NRC',
    photo: '/speakers/vonna-ordaz.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },
  {
    name: 'Katelyn Rigle',
    role: 'Small Business Liaison',
    org: 'Defense Contract Audit Agency',
    credential: 'Small business liaison at the DCAA',
    photo: '/speakers/katelyn-rigle.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },
  {
    name: 'Ben Amaba',
    role: 'Former Global Chief Technology Officer',
    org: 'IBM',
    credential: 'Former Global CTO at IBM',
    photo: '/speakers/ben-amaba.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },
  {
    name: 'Teresa Moon',
    role: 'Leader',
    org: 'Women Impacting Public Policy (WIPP)',
    credential: 'Champion for women-owned businesses in federal policy',
    photo: '/speakers/teresa-moon.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },
  {
    name: 'John Cook',
    role: 'CEO',
    org: 'Strategic Growth Advisors',
    credential: 'CEO of Strategic Growth Advisors',
    photo: '/speakers/john-cook.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },
  {
    name: 'Joel Adelman',
    role: 'CEO',
    org: 'Encore Funding',
    credential: 'CEO of Encore Funding — GCG National Summit sponsor',
    photo: '/speakers/joel-adelman.jpg',
    link: SUMMIT_SPEAKERS_URL,
    tier: 'summit',
  },

  // ——— Tier 2: Podcast guests & advisors ———
  {
    name: 'Katie Arrington',
    role: 'Architect of CMMC',
    org: 'Former DoD acquisition cybersecurity lead',
    credential: 'Wrote the CMMC rule every defense contractor now follows',
    photo: '/speakers/katie-arrington.jpg',
    link: 'https://govcongiants.libsyn.com/the-woman-who-wrote-cmmc-the-250k-compliance-cost-is-a-lie-ep-334',
    tier: 'podcast',
  },
  {
    name: 'Wayne Berry',
    role: 'Senior Procurement Analyst',
    org: 'NIH · Dept. of Health & Human Services',
    credential: '15+ years guiding small businesses through federal procurement',
    photo: '/speakers/wayne-berry.jpg',
    link: 'https://govcongiants.libsyn.com/stop-70000-contracts-youre-still-losing-heres-why-hhs-might-be-ignoring-you',
    tier: 'podcast',
  },
  {
    name: 'Alice Williams',
    role: 'Former DoD Executive',
    org: 'U.S. Department of Defense',
    credential: '40 years inside federal contracting',
    photo: '/speakers/alice-williams.jpg',
    link: 'https://govcongiants.libsyn.com/238-avoid-these-costly-mistakes-in-government-contracts-expert-alice-williams-shares-insider-knowledge',
    tier: 'podcast',
  },
  {
    name: 'Ed Tuorinsky',
    role: 'CEO',
    org: 'DTS · Army Veteran · NVSBC Leader',
    credential: 'Army veteran building cybersecurity firms for federal agencies',
    photo: '/speakers/ed-tuorinsky.jpg',
    link: 'https://govcongiants.libsyn.com/how-to-lead-win-and-thrive-in-federal-contracts-ed-torensky-tells-all',
    tier: 'podcast',
  },
  {
    name: 'Kizzy Parks',
    role: 'Founder',
    org: 'GovCon Winners',
    credential: 'GovCon educator teaching small businesses to win federal work',
    photo: '/speakers/kizzy-parks.jpg',
    link: 'https://govcongiants.libsyn.com/227-redefining-federal-contracting-innovative-government-contracting-and-digital-nomad-life-with-kizzy-parks',
    tier: 'podcast',
  },
  {
    name: 'Kevie Hendrix',
    role: 'Founder',
    org: 'National Materials Supply Company',
    credential: '"The DLA Guru" — Defense Logistics Agency specialist',
    photo: '/speakers/kevie-hendrix.jpg',
    link: 'https://govcongiants.libsyn.com/246-dla-secrets-how-to-win-big-in-federal-contracting-with-kevie-hendrix',
    tier: 'podcast',
  },
];

export const summitSpeakers = speakers.filter((s) => s.tier === 'summit');
export const podcastExperts = speakers.filter((s) => s.tier === 'podcast');
