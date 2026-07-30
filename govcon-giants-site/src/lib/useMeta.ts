import { useEffect } from 'react';

export interface MetaOptions {
  title: string;
  description?: string;
  /** Canonical URL path on this host, e.g. "/podcast". */
  canonicalPath?: string;
  noindex?: boolean;
}

const HOST = 'https://podcast.govcongiants.org';

/**
 * Per-route document title / description / robots. The SPA shell ships a
 * single generic brand title; without this every URL competed with
 * govcongiants.com for the brand query.
 */
export function useMeta({ title, description, canonicalPath, noindex }: MetaOptions) {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (description) {
      ensureMeta('name', 'description', description);
    }

    ensureMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    if (canonicalPath) {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = `${HOST}${canonicalPath}`;
    }
  }, [title, description, canonicalPath, noindex]);
}
