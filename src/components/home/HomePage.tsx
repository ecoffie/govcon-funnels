'use client';

/* The source site uses editorial photography at responsive, CSS-controlled
 * dimensions. Keeping native images preserves that behavior during the port. */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NewsletterForm from '@/components/chrome/NewsletterForm';
import featuredEpisodes from '@/data/featured-episodes.json';
import styles from './HomePage.module.css';

const HERO_PHOTOS = [
  'stage-2',
  'summit-ballroom',
  'stage-1',
  'candid-session',
  'stage-6',
  'candid-photo',
  'stage-3',
  'candid-table',
  'stage-4',
  'candid-selfie',
  'stage-5',
  'candid-chat',
  'stage-8',
  'candid-boat',
  'candid-night',
];

const TOPICS = ['RFPs', 'SAM.gov', '8(a)', 'HUBZone', 'CMMC', 'Subcontracting', 'Proposals', 'Teaming'];
const SPONSORS = [
  'athari', 'cbf', 'cypherintel', 'deiner', 'dts', 'encore', 'fob', 'goh',
  'huihuliau', 'kaiva', 'mobilization', 'pilieromazza', 'procas', 'sga', 'swain', 'xcorp',
];

const ARTICLES = [
  {
    slug: 'sam-gov-is-not-a-strategy',
    title: 'SAM.gov Is Not a Strategy: Where Contracts Actually Come From',
    category: 'Strategy',
    readTime: '9 min',
    image: '/articles/sam-gov-is-not-a-strategy.jpg',
  },
  {
    slug: '8a-program-explained',
    title: "The 8(a) Program, Explained Like You're Busy",
    category: 'Certifications',
    readTime: '7 min',
  },
  {
    slug: 'cmmc-real-math',
    title: "CMMC Won't Cost You $250K. Here's the Real Math.",
    category: 'Certifications',
    readTime: '6 min',
  },
  {
    slug: 'first-proposal-checklist',
    title: 'Your First Federal Proposal: The 12-Point Checklist',
    category: 'Proposals',
    readTime: '11 min',
  },
  {
    slug: 'subcontracting-side-door',
    title: 'The Side Door: Winning Subcontracts With Defense Primes',
    category: 'Strategy',
    readTime: '8 min',
  },
];

function Hero() {
  const [slide, setSlide] = useState(0);
  const [topic, setTopic] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const slideTimer = window.setInterval(() => setSlide((value) => (value + 1) % HERO_PHOTOS.length), 3000);
    const topicTimer = window.setInterval(() => setTopic((value) => (value + 1) % TOPICS.length), 2500);
    return () => {
      window.clearInterval(slideTimer);
      window.clearInterval(topicTimer);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <img
        key={HERO_PHOTOS[slide]}
        src={`/summit/${HERO_PHOTOS[slide]}.jpg`}
        alt=""
        aria-hidden="true"
        className={`${styles.heroImage} ${styles.activeImage}`}
      />
      <div className={styles.heroScrim} />
      <div className={`${styles.container} ${styles.heroContent}`}>
        <p className={styles.heroKicker}>GOVERNMENT CONTRACTING, WITHOUT THE FLUFF</p>
        <h1>Everyday people.<em>extraordinary federal contracts.</em></h1>
        <svg className={styles.squiggle} viewBox="0 0 220 14" fill="none" aria-hidden="true">
          <path d="M4 9 C 40 2, 80 12, 118 7 C 150 3, 190 10, 216 6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <div className={styles.heroGrid}>
          <p>
            Every year, the federal government awards hundreds of billions in contracts — and everyday small
            businesses never get a shot, because nobody shows them how the system actually works. GovCon Giants
            closes that gap: free education, real playbooks, and a community that turns new businesses into federal contractors.
          </p>
          <div>
            <p className={styles.master}>Master <em>{TOPICS[topic]}</em></p>
            <NewsletterForm />
            <small>FREE · NO SPAM · UNSUBSCRIBE ANYTIME</small>
          </div>
        </div>
      </div>
      <div className={styles.dots}>
        {HERO_PHOTOS.map((photo, index) => (
          <button
            key={photo}
            aria-label={`Show photo ${index + 1} of ${HERO_PHOTOS.length}`}
            aria-pressed={index === slide}
            onClick={() => setSlide(index)}
            className={index === slide ? styles.activeDot : ''}
          />
        ))}
      </div>
    </section>
  );
}

function SectionHeading({
  kicker,
  children,
  href,
}: {
  kicker: string;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <p className={styles.kicker}>{kicker}</p>
        <h2>{children}</h2>
      </div>
      {href && <Link href={href}>View all →</Link>}
    </div>
  );
}

function LogoMarquee() {
  return (
    <section className={styles.logoSection} aria-label="Past summit sponsors and partners">
      <p>PAST SPONSORS &amp; PARTNERS</p>
      <div className={styles.logoViewport}>
        <div className={styles.logoTrack}>
          {[...SPONSORS, ...SPONSORS].map((name, index) => (
            <img key={`${name}-${index}`} src={`/logos/${name}.png`} alt={index < SPONSORS.length ? `${name} logo` : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedEpisodes() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading kicker="CONVERSATIONS WITH GOVERNMENT INSIDERS" href="/podcast">
          Featured <em>episodes</em>
        </SectionHeading>
        <div className={styles.episodeStrip} ref={stripRef}>
          {featuredEpisodes.map((episode, index) => (
            <article className={styles.episodeCard} key={episode.link}>
              <Link href={`/podcast/featured/${index}`}>
                <img src={episode.photo} alt={episode.guest} loading="lazy" />
                <div className={styles.cardBody}>
                  <span className={styles.kicker}>{episode.agency}</span>
                  <h3>{episode.guest}</h3>
                  <small>{episode.role}</small>
                  <p>{episode.title}</p>
                </div>
              </Link>
              <div className={styles.playRow}>
                <button
                  onClick={() => setActive(active === index ? null : index)}
                  aria-label={active === index ? `Stop ${episode.title}` : `Play ${episode.title}`}
                >
                  {active === index ? 'Ⅱ' : '▶'}
                </button>
                <span>{episode.duration}</span>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.stripControls}>
          <button aria-label="Scroll back" onClick={() => stripRef.current?.scrollBy({ left: -340, behavior: 'smooth' })}>←</button>
          <button aria-label="Scroll forward" onClick={() => stripRef.current?.scrollBy({ left: 340, behavior: 'smooth' })}>→</button>
        </div>
        {active !== null && (
          <div className={styles.player}>
            <p>NOW PLAYING · {featuredEpisodes[active].guest}</p>
            <audio key={featuredEpisodes[active].audioUrl} src={featuredEpisodes[active].audioUrl} controls autoPlay />
          </div>
        )}
      </div>
    </section>
  );
}

function Summit() {
  return (
    <section className={`${styles.section} ${styles.summit}`}>
      <img className={styles.starPattern} src="/pattern-stars.svg" alt="" aria-hidden="true" />
      <div className={styles.container}>
        <SectionHeading kicker="THE ANNUAL EVENT">GCG National <em>Summit</em></SectionHeading>
        <div className={styles.summitGrid}>
          <div>
            <p className={styles.lead}>
              The Contracting Connections + Technology Summit, held annually in Miami, FL. One room full of
              government leaders, prime contractors, small business owners, and industry experts — built for
              making the connections that turn into contracts.
            </p>
            <div className={styles.chips}>
              {['Small Business', 'Cybersecurity', 'Mergers & Acquisitions', 'Supply Chain', 'Access to Capital', 'Compliance', 'Defense Technologies', 'Artificial Intelligence'].map((topic) => <span key={topic}>{topic}</span>)}
            </div>
            <p className={styles.speakerLabel}>PAST SPEAKERS INCLUDE</p>
            <div className={styles.speakers}>
              <p><b>Jackie Robinson-Burnette</b><small>Associate Administrator, SBA</small></p>
              <p><b>Donna Bennett</b><small>CISO, U.S. Dept. of State</small></p>
              <p><b>Shannon Jackson</b><small>Executive Director (SES), HHS OSDBU</small></p>
              <p><b>Vonna Ordaz</b><small>Director, NRC Office of Small Business</small></p>
            </div>
            <div className={styles.summitLinks}>
              <a href="https://gcgsummit.com" target="_blank" rel="noopener">Visit gcgsummit.com ↗</a>
              <a href="https://gcgsummit.com/speakers/" target="_blank" rel="noopener">Meet the speakers →</a>
            </div>
          </div>
          <div className={styles.summitVisual}>
            <img src="/summit/moment-01.jpg" alt="Attendees networking at the GCG National Summit" loading="lazy" />
            <img src="/summit/moment-09.jpg" alt="GCG National Summit VIP reception" loading="lazy" />
            <div className={styles.stats}>
              <p><b>700+</b><span>Attendees</span></p>
              <p><b>75+</b><span>Industry speakers</span></p>
              <p><b>50+</b><span>Learning sessions</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  const tiles = [
    { title: 'Listen to the Podcast', desc: '250K+ listens — near-daily plays and long-form interviews.', image: '/summit/moment-06.jpg', href: '/podcast' },
    { title: 'Attend the Summit', desc: 'The annual Contracting Connections + Technology Summit in Miami.', image: '/summit/candid-laugh.jpg', href: 'https://gcgsummit.com', external: true },
    { title: 'Get the Playbook', desc: 'The exact federal websites behind $20M+ in government sales.', image: '/articles/playbook-tile.jpg', href: '/resources' },
  ];
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading kicker="PODCAST · EVENTS · EDUCATION">Experience <em>GovCon Giants</em></SectionHeading>
        <div className={styles.tileGrid}>
          {tiles.map((tile) => {
            const content = (
              <>
                <img src={tile.image} alt="" loading="lazy" />
                <div><h3>{tile.title}</h3><p>{tile.desc}</p><span>EXPLORE →</span></div>
              </>
            );
            return tile.external
              ? <a className={styles.tile} href={tile.href} target="_blank" rel="noopener" key={tile.title}>{content}</a>
              : <Link className={styles.tile} href={tile.href} key={tile.title}>{content}</Link>;
          })}
        </div>
      </div>
    </section>
  );
}

function PopularArticles() {
  return (
    <section className={`${styles.section} ${styles.articles}`}>
      <div className={styles.container}>
        <SectionHeading kicker="READER FAVORITES" href="/blog">Popular <em>articles</em></SectionHeading>
        <div className={styles.articleGrid}>
          <Link href={`/blog/${ARTICLES[0].slug}`} className={styles.featuredArticle}>
            <img src={ARTICLES[0].image} alt="" loading="lazy" />
            <span className={styles.kicker}>{ARTICLES[0].category} · {ARTICLES[0].readTime} READ</span>
            <h3>{ARTICLES[0].title}</h3>
          </Link>
          <ol>
            {ARTICLES.slice(1).map((article, index) => (
              <li key={article.slug}>
                <Link href={`/blog/${article.slug}`}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <span><small>{article.category} · {article.readTime} READ</small>{article.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className={styles.home}>
      <main>
        <Hero />
        <LogoMarquee />
        <FeaturedEpisodes />
        <Summit />
        <Experiences />
        <PopularArticles />
      </main>
    </div>
  );
}
