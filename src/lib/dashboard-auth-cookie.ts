/**
 * Browser session → server credential for /dashboard pages.
 *
 * The staff sign-in lives in a client component (sessionStorage). Server
 * Components still render on the anonymous request, and Next serializes that
 * output into the RSC payload even when the client gate does not display it.
 * A page that reads Supabase must refuse to render until this cookie is present
 * and matches the admin password.
 *
 * The value is base64url (no padding) so it is cookie-safe and stable whether
 * or not the framework percent-decodes the Cookie header.
 */
export const DASHBOARD_AUTH_COOKIE = 'dashboard_admin_pw';

export function encodeDashboardAuthCookie(password: string): string {
  const bytes = new TextEncoder().encode(password);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function decodeDashboardAuthCookie(value: string): string | null {
  try {
    const padLen = (4 - (value.length % 4)) % 4;
    const b64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLen);
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

/** document.cookie assignment that scopes the credential to /dashboard. */
export function dashboardAuthCookieWrite(password: string, secure: boolean): string {
  const secureAttr = secure ? '; Secure' : '';
  return `${DASHBOARD_AUTH_COOKIE}=${encodeDashboardAuthCookie(password)}; Path=/dashboard; SameSite=Lax${secureAttr}`;
}

export function dashboardAuthCookieClear(secure: boolean): string {
  const secureAttr = secure ? '; Secure' : '';
  return `${DASHBOARD_AUTH_COOKIE}=; Path=/dashboard; Max-Age=0; SameSite=Lax${secureAttr}`;
}
