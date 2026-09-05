'use client';

/* The source site uses editorial photography at responsive, CSS-controlled
 * dimensions. Keeping native images preserves that behavior during the port. */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
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

const NAV_LINKS = [
  { href: '/podcast', label: 'Podcast' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://gcgsummit.com', label: 'Summit', external: true },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/mindy-launch', label: 'Mindy Day' },
];

function NewsletterForm({
  compact = false,
  onSuccess,
}: {
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || status === 'submitting') return;
    setStatus('submitting');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'newsletter' }),
      });
      if (!response.ok) throw new Error(`Lead request failed: ${response.status}`);
      setStatus('done');
      onSuccess?.();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <p className={styles.success}>✓ You&apos;re on the list — check your inbox.</p>;
  }

  return (
    <form className={compact ? styles.compactForm : styles.heroForm} onSubmit={submit} aria-label="Newsletter signup">
      <input
        type="email"
        required
        value={email}
        disabled={status === 'submitting'}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
        aria-label="Email address"
      />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Joining…' : compact ? 'Send Me the Action Plan →' : 'Join the Newsletter →'}
      </button>
      {status === 'error' && <span className={styles.formError}>Something went wrong — try again.</span>}
    </form>
  );
}

function HomeNav() {
  const [open, setOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = newsletterOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [newsletterOpen]);

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="GovCon Giants home">
            GovCon <span>Giants</span>
          </Link>
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener">{link.label} ↗</a>
              ) : (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ),
            )}
          </nav>
          <div className={styles.navActions}>
            <button className={styles.newsletterButton} onClick={() => setNewsletterOpen(true)}>
              Free Newsletter
            </button>
            <button
              className={styles.menuButton}
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? '×' : '☰'}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {[{ href: '/', label: 'Home' }, ...NAV_LINKS].map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
                {link.label} ↗
              </a>
            ) : (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
            ),
          )}
          <button onClick={() => { setOpen(false); setNewsletterOpen(true); }}>Free Newsletter</button>
        </nav>
      )}
      {newsletterOpen && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-label="Newsletter signup" onClick={() => setNewsletterOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setNewsletterOpen(false)} aria-label="Close">×</button>
            <p className={styles.kicker}>FREE NEWSLETTER</p>
            <h2>The GovCon Giants <em>Newsletter</em></h2>
            <p>Weekly federal contracting tactics, buyer intel, and the exact plays behind $20M+ in government sales.</p>
            <NewsletterForm compact onSuccess={() => window.setTimeout(() => setNewsletterOpen(false), 1200)} />
          </div>
        </div>
      )}
    </>
  );
}

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

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerSignup}>
          <p className={styles.kicker}>THE FREE ACTION PLAN</p>
          <h2>Your step-by-step plan to win federal contracts — free.</h2>
          <NewsletterForm compact />
        </div>
        <div className={styles.footerGrid}>
          <div><p className={styles.logo}>GovCon <span>Giants</span></p><p>Government contracting education with one rule: give away 99.9% for free.</p></div>
          <nav><b>LISTEN</b><a href="https://podcasts.apple.com/us/podcast/govcon-giants/id1463074357" target="_blank" rel="noopener">Apple Podcasts</a><a href="https://open.spotify.com/show/0lrErW5lY6VHqskkQH4WMk" target="_blank" rel="noopener">Spotify</a></nav>
          <nav><b>LEARN</b><Link href="/blog">Blog</Link><Link href="/resources">Resources</Link></nav>
          <nav><b>COMPANY</b><Link href="/about">About</Link><Link href="/about#contact">Contact</Link><Link href="/about#press">Press</Link><a href="https://gcgsummit.com" target="_blank" rel="noopener">GCG Summit ↗</a></nav>
        </div>
        <div className={styles.legal}>
          <div><a href="https://www.youtube.com/@ericcoffie">YouTube</a><a href="https://x.com/ericcoffie">X</a><a href="https://www.linkedin.com/in/ericcoffie/">LinkedIn</a><a href="https://www.instagram.com/ericcoffie/">Instagram</a></div>
          <p>© {new Date().getFullYear()} GOVCON GIANTS · MIAMI, FL · <Link href="/privacy-policy">PRIVACY</Link> · <Link href="/terms">TERMS</Link></p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HomeNav />
      <main>
        <Hero />
        <LogoMarquee />
        <FeaturedEpisodes />
        <Summit />
        <Experiences />
        <PopularArticles />
      </main>
      <Footer />
    </div>
  );
}
