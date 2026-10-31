'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NewsletterForm from './NewsletterForm';
import { NAV_LINKS, isAppSurface, isPartnerPage } from './chrome-routes';
import styles from './Chrome.module.css';

export default function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = newsletterOpen || open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [newsletterOpen, open]);

  // Close the mobile menu on route change.
  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (isAppSurface(pathname)) return null;

  if (isPartnerPage(pathname)) {
    return (
      <header className={`${styles.chrome} ${styles.partnerNav}`}>
        <a href="https://gov.encore-funding.com/">Encore Funding</a>
      </header>
    );
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const headerClass = `${styles.chrome} ${styles.nav} ${pathname === '/' ? styles.overlay : ''}`;

  return (
    <>
      <header className={headerClass}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="GovCon Giants home">
            GovCon <span>Giants</span>
          </Link>
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener">{link.label} ↗</a>
              ) : (
                <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
                  {link.label}
                </Link>
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
        <nav className={`${styles.chrome} ${styles.mobileNav}`} aria-label="Mobile navigation">
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
        <div
          className={`${styles.chrome} ${styles.modalBackdrop}`}
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter signup"
          onClick={() => setNewsletterOpen(false)}
        >
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setNewsletterOpen(false)} aria-label="Close">×</button>
            <p className={styles.kicker}>FREE NEWSLETTER</p>
            <h2>The GovCon Giants <em>Newsletter</em></h2>
            <p>Weekly federal contracting tactics, buyer intel, and the exact plays behind $20M+ in government sales.</p>
            <NewsletterForm compact tone="light" onSuccess={() => window.setTimeout(() => setNewsletterOpen(false), 1200)} />
          </div>
        </div>
      )}
    </>
  );
}
