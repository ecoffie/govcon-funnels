export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'gg-theme';

/**
 * Theme state: 'light' | 'dark', persisted to localStorage, falling back to
 * prefers-color-scheme. Applied as `class="dark"` on <html>; index.html
 * carries an inline script that applies the same logic before first paint.
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable */
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
