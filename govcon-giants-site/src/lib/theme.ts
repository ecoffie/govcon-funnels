export type Theme = 'light';

/**
 * The site is light-mode only. The dark-mode toggle was removed; these helpers
 * remain as no-ops so existing imports keep working, and always report/apply
 * the light theme. index.html clears any legacy `gg-theme` localStorage value
 * before first paint.
 */
export function getTheme(): Theme {
  return 'light';
}

export function applyTheme(): void {
  document.documentElement.classList.remove('dark');
  try {
    localStorage.removeItem('gg-theme');
  } catch {
    /* storage unavailable */
  }
}
