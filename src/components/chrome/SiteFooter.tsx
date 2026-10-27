'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NewsletterForm from './NewsletterForm';
import { isAppSurface, isPartnerPage } from './chrome-routes';
import styles from './Chrome.module.css';

/*
 * The footer is also the site's internal-link map: the header is deliberately
 * short, so the learning, data, and Mindy pages the old dropdown nav linked to
 * are kept reachable from every page here.
 */
export default function SiteFooter() {
  const pathname = usePathname() ?? '/';
  if (isAppSurface(pathname) || isPartnerPage(pathname)) return null;

  return (
    <footer className={`${styles.chrome} ${styles.footer}`}>
      <div className={styles.container}>
        <div className={styles.footerSignup}>
          <p className={styles.kicker}>THE FREE ACTION PLAN</p>
          <h2>Your step-by-step plan to win federal contracts — free.</h2>
          <NewsletterForm compact />
        </div>
        <div className={styles.footerGrid}>
          <div>
            <p className={styles.logo}>GovCon <span>Giants</span></p>
            <p>Government contracting education with one rule: give away 99.9% for free.</p>
          </div>
          <nav aria-label="Listen">
            <b>LISTEN</b>
            <Link href="/podcast">Podcast</Link>
            <a href="https://podcasts.apple.com/us/podcast/govcon-giants/id1463074357" target="_blank" rel="noopener">Apple Podcasts</a>
            <a href="https://open.spotify.com/show/0lrErW5lY6VHqskkQH4WMk" target="_blank" rel="noopener">Spotify</a>
            <Link href="/videos">Videos</Link>
          </nav>
          <nav aria-label="Learn">
            <b>LEARN</b>
            <Link href="/blog">Blog</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/glossary">Glossary</Link>
            <Link href="/jobs">GovCon Jobs</Link>
          </nav>
          <nav aria-label="Mindy and data">
            <b>MINDY</b>
            <Link href="/mi">Meet Mindy</Link>
            <Link href="/premium">Pricing</Link>
            <Link href="/data/agencies">Agency Profiles</Link>
            <Link href="/data/contractors">Contractor Database</Link>
            <Link href="/data/forecasts">Forecasts</Link>
            <Link href="/tools/expiring-contracts">Expiring Contracts</Link>
          </nav>
          <nav aria-label="Company">
            <b>COMPANY</b>
            <Link href="/about">About</Link>
            <a href="https://ericcoffie.com" target="_blank" rel="noopener">Eric Coffie · Speaking ↗</a>
          </nav>
        </div>
        <div className={styles.legal}>
          <div>
            <a href="https://www.youtube.com/@ericcoffie">YouTube</a>
            <a href="https://x.com/ericcoffie">X</a>
            <a href="https://www.linkedin.com/in/ecoffie/">LinkedIn</a>
            <a href="https://www.instagram.com/ericcoffie/">Instagram</a>
          </div>
          <p>© {new Date().getFullYear()} GOVCON GIANTS · MIAMI, FL · <Link href="/privacy-policy">PRIVACY</Link> · <Link href="/terms">TERMS</Link></p>
        </div>
      </div>
    </footer>
  );
}
