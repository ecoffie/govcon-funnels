import { Link } from 'react-router';
import { Youtube, Twitter, Linkedin, Instagram } from 'lucide-react';
import NewsletterCapture from '@/components/NewsletterCapture';
import { platforms } from '@/data/platforms';

const learnLinks = [
  { to: '/blog', label: 'Blog' },
  { to: '/start-here', label: 'Start Here' },
  { to: '/resources', label: 'Resources' },
];

const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/about#contact', label: 'Contact' },
  { to: '/about#press', label: 'Press' },
];

const moreLinks = [
  { href: 'https://govcongiants.com?utm_source=podcast-site', label: 'Main Site & 140+ Guides' },
  { href: 'https://govcongiants.com/tools/cage-code-lookup?utm_source=podcast-site', label: 'Free CAGE Lookup Tool' },
  { href: 'https://getmindy.ai?utm_source=podcast-site', label: 'Mindy — Market Intel AI' },
  { href: 'https://shop.govcongiants.org?utm_source=podcast-site', label: 'Shop' },
];

const socials = [
  { href: 'https://www.youtube.com/@ericcoffie', label: 'YouTube', Icon: Youtube },
  { href: 'https://x.com/govcongiants', label: 'X / Twitter', Icon: Twitter },
  { href: 'https://www.linkedin.com/in/ericcoffie/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://www.instagram.com/ericcoffie/', label: 'Instagram', Icon: Instagram },
];

/** Global footer (design.md §6.2): newsletter band, link columns, socials, legal bar. */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-inset">
      <div className="container-gg py-16 md:py-20">
        <NewsletterCapture
          variant="compact"
          kicker="THE FREE PLAYBOOK STARTER KIT"
          heading="Five websites that find federal buyers — free, today."
          className="mb-16"
        />

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <img src="/logo.svg" alt="GovCon Giants" className="mb-4 h-7 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Government contracting education with one rule: give away 99.9% for free.
            </p>
          </div>

          <nav aria-label="Listen">
            <h4 className="kicker mb-4">Listen</h4>
            <ul className="space-y-2.5">
              {platforms.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 transition-colors hover:text-brand"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Learn">
            <h4 className="kicker mb-4">Learn</h4>
            <ul className="space-y-2.5">
              {learnLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-400 transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="More from GovCon Giants">
            <h4 className="kicker mb-4">More</h4>
            <ul className="space-y-2.5">
              {moreLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-brand">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h4 className="kicker mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <div className="flex gap-4">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-500 transition-colors hover:text-brand"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="font-mono text-xs text-slate-500">
            © {new Date().getFullYear()} GOVCON GIANTS · MIAMI, FL ·{' '}
            <a href="https://govcongiants.com/privacy" className="hover:text-brand">PRIVACY</a> ·{' '}
            <a href="https://govcongiants.com/terms" className="hover:text-brand">TERMS</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
