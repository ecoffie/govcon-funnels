/**
 * First-party analytics beacon for the Command Center
 * (app.govcongiants.org/dashboard/command-center).
 *
 * Queues events and flushes them in batches to app.govcongiants.org/api/event
 * via fetch keepalive / sendBeacon. No cookies, no PII beyond a random
 * session id held in sessionStorage. Degrades silently: if the API is down
 * or unreachable, events are dropped and nothing breaks.
 */

const ENDPOINT = 'https://app.govcongiants.org/api/event';
const FLUSH_INTERVAL_MS = 5000;
const MAX_QUEUE = 25;

type EventName =
  | 'page_view'
  | 'cta_click'
  | 'form_submit'
  | 'outbound_click'
  | 'scroll_depth'
  | 'js_error';

interface BeaconEvent {
  session_id: string;
  page: string;
  event: EventName;
  label?: string;
  href?: string;
  meta?: Record<string, unknown>;
}

const sessionId = (() => {
  try {
    let id = sessionStorage.getItem('gg-session-id');
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('gg-session-id', id);
    }
    return id;
  } catch {
    return 'anon';
  }
})();

let queue: BeaconEvent[] = [];
let timer: number | undefined;

function flush() {
  if (queue.length === 0) return;
  const batch = queue;
  queue = [];
  const body = JSON.stringify({ events: batch });
  try {
    if (body.length < 60_000 && navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'application/json' }))) {
      return;
    }
    void fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      /* degrade silently */
    });
  } catch {
    /* degrade silently */
  }
}

export function track(event: EventName, opts: { label?: string; href?: string; meta?: Record<string, unknown> } = {}) {
  try {
    queue.push({
      session_id: sessionId,
      page: window.location.pathname,
      event,
      label: opts.label,
      href: opts.href,
      meta: opts.meta,
    });
    if (queue.length >= MAX_QUEUE) flush();
    else {
      window.clearTimeout(timer);
      timer = window.setTimeout(flush, FLUSH_INTERVAL_MS);
    }
  } catch {
    /* never break the page */
  }
}

// ---------------------------------------------------------- auto tracking ---

let armed = false;

/** Arm the automatic trackers once (called from Layout). Page views are
 *  tracked separately via trackPageview() on route change. */
export function armAutoTracking() {
  if (armed) return;
  armed = true;

  // Clicks: delegate — nearest <a>/<button> becomes a cta_click (internal)
  // or outbound_click (external host).
  document.addEventListener(
    'click',
    (e) => {
      try {
        const el = (e.target as HTMLElement).closest?.('a,button');
        if (!el) return;
        const label =
          (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 120) ||
          el.tagName.toLowerCase();
        const href = el instanceof HTMLAnchorElement ? el.href : undefined;
        const outbound = !!href && new URL(href).host !== window.location.host;
        track(outbound ? 'outbound_click' : 'cta_click', { label, href });
      } catch {
        /* ignore */
      }
    },
    { capture: true, passive: true },
  );

  // Form submits (attempt; delivery outcomes live in lead_pipeline_log).
  document.addEventListener(
    'submit',
    (e) => {
      try {
        const form = e.target as HTMLFormElement;
        const label =
          form.getAttribute('aria-label') ||
          form.id ||
          (form.querySelector('button[type="submit"],button')?.textContent ?? '').trim().slice(0, 80) ||
          'form';
        track('form_submit', { label });
      } catch {
        /* ignore */
      }
    },
    { capture: true, passive: true },
  );

  // JS errors.
  window.addEventListener('error', (e) => {
    track('js_error', {
      label: String(e.message ?? 'error').slice(0, 200),
      meta: { url: e.filename, line: e.lineno },
    });
  });
  window.addEventListener('unhandledrejection', (e) => {
    track('js_error', {
      label: String((e.reason as Error)?.message ?? e.reason ?? 'unhandledrejection').slice(0, 200),
      meta: { kind: 'unhandledrejection' },
    });
  });

  // Flush on page hide.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);
}

const scrollMarks = new Set<number>();

/** Track a page view and reset scroll-depth marks for the new route. */
export function trackPageview(path: string) {
  scrollMarks.clear();
  track('page_view', { label: path });
  armScrollDepth();
}

let scrollArmed = false;
function armScrollDepth() {
  if (scrollArmed) return;
  scrollArmed = true;
  window.addEventListener(
    'scroll',
    () => {
      try {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        const pct = Math.round((window.scrollY / max) * 100);
        for (const mark of [25, 50, 75, 100]) {
          if (pct >= mark && !scrollMarks.has(mark)) {
            scrollMarks.add(mark);
            track('scroll_depth', { label: `${mark}%`, meta: { depth: mark } });
          }
        }
      } catch {
        /* ignore */
      }
    },
    { passive: true },
  );
}
