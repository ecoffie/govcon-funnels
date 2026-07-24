import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description?: string;
  /** Set true on pages that duplicate govcongiants.com's job (blog, resources,
   *  start-here) so this subdomain never competes with the main site in search. */
  noindex?: boolean;
  /** Canonical path on this subdomain, e.g. "/podcast". Defaults to pathname. */
  canonicalPath?: string;
}

const ORIGIN = 'https://podcast.govcongiants.org';

function upsert(selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  set(el);
  return el;
}

/** Per-route <title>/<meta>/<link rel=canonical> — the SPA shipped one generic
 *  set of tags for every URL, which made each page compete for the same brand
 *  query. Call once at the top of every page component. */
export function useMeta({ title, description, noindex, canonicalPath }: MetaOptions) {
  useEffect(() => {
    document.title = title;

    if (description) {
      upsert(
        'meta[name="description"]',
        () => Object.assign(document.createElement('meta'), { name: 'description' }),
        (el) => el.setAttribute('content', description)
      );
    }

    upsert(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      (el) => el.setAttribute('href', ORIGIN + (canonicalPath ?? window.location.pathname))
    );

    const robots = upsert(
      'meta[name="robots"]',
      () => Object.assign(document.createElement('meta'), { name: 'robots' }),
      (el) => el.setAttribute('content', noindex ? 'noindex, follow' : 'index, follow')
    );

    return () => {
      // Reset robots on unmount so a noindex page never leaks its directive
      // into the next route (title/canonical are overwritten by the next page).
      robots.setAttribute('content', 'index, follow');
    };
  }, [title, description, noindex, canonicalPath]);
}
