import { useEffect } from 'react';

function setMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const [attr, value] = Object.entries(attrs)[0];
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', attrs.content);
}

/** Per-route document title + description/OG/Twitter meta for the SPA. */
export function useMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    const desc = description ?? '';
    setMeta('meta[name="description"]', { name: 'description', content: desc });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: desc });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: window.location.href });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: desc });
  }, [title, description]);
}
