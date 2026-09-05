'use client';

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

let queue: BeaconEvent[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;
let armed = false;
const scrollMarks = new Set<number>();

function sessionId() {
  try {
    let id = sessionStorage.getItem('gg-session-id');
    if (!id) {
      id = `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      sessionStorage.setItem('gg-session-id', id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

function flush() {
  if (!queue.length) return;
  const body = JSON.stringify({ events: queue.splice(0) });
  try {
    if (body.length < 60_000 && navigator.sendBeacon?.('/api/event', new Blob([body], { type: 'application/json' }))) return;
    void fetch('/api/event', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Analytics must never affect the visitor experience.
  }
}

function track(event: EventName, options: Omit<BeaconEvent, 'session_id' | 'page' | 'event'> = {}) {
  queue.push({
    session_id: sessionId(),
    page: window.location.pathname,
    event,
    ...options,
  });
  if (queue.length >= MAX_QUEUE) flush();
  else {
    clearTimeout(timer);
    timer = setTimeout(flush, FLUSH_INTERVAL_MS);
  }
}

export function trackPageview(path: string) {
  scrollMarks.clear();
  track('page_view', { label: path });
}

export function armEventTracking() {
  if (armed) return;
  armed = true;

  document.addEventListener('click', (event) => {
    const element = (event.target as HTMLElement).closest?.('a,button');
    if (!element) return;
    const label = (element.getAttribute('aria-label') || element.textContent || element.tagName).trim().slice(0, 120);
    const href = element instanceof HTMLAnchorElement ? element.href : undefined;
    const outbound = href ? new URL(href).host !== window.location.host : false;
    track(outbound ? 'outbound_click' : 'cta_click', { label, href });
  }, { capture: true, passive: true });

  document.addEventListener('submit', (event) => {
    const form = event.target as HTMLFormElement;
    const label = form.getAttribute('aria-label') || form.id || 'form';
    track('form_submit', { label });
  }, { capture: true, passive: true });

  window.addEventListener('error', (event) => {
    track('js_error', {
      label: String(event.message || 'error').slice(0, 200),
      meta: { url: event.filename, line: event.lineno },
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    track('js_error', {
      label: String((event.reason as Error)?.message || event.reason || 'unhandledrejection').slice(0, 200),
    });
  });

  window.addEventListener('scroll', () => {
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    if (maximum <= 0) return;
    const percent = Math.round((window.scrollY / maximum) * 100);
    for (const mark of [25, 50, 75, 100]) {
      if (percent >= mark && !scrollMarks.has(mark)) {
        scrollMarks.add(mark);
        track('scroll_depth', { label: `${mark}%`, meta: { depth: mark } });
      }
    }
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);
}
