import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Serves the internal /team/* pages (YouTube Command Center + batch production hubs)
 * from a PRIVATE dir (private-team/) that is NOT under public/, so Vercel can't serve
 * them statically and bypass the gate. Access is enforced by src/middleware.ts
 * (Basic Auth on /team/:path*) — this handler only runs once the request is authorized.
 *
 * The HTML lives as plain, editable .html files in private-team/; they're bundled into
 * this function via `outputFileTracingIncludes` in next.config.ts.
 */

const ROOT = path.join(process.cwd(), 'private-team');

function contentType(p: string): string {
  if (p.endsWith('.html')) return 'text/html; charset=utf-8';
  if (p.endsWith('.css')) return 'text/css; charset=utf-8';
  if (p.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (p.endsWith('.json')) return 'application/json; charset=utf-8';
  if (p.endsWith('.png')) return 'image/png';
  if (p.endsWith('.jpg') || p.endsWith('.jpeg')) return 'image/jpeg';
  if (p.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await ctx.params;

  // Reject any traversal segments; only simple names allowed.
  const parts = slug.filter((s) => s && s !== '.' && s !== '..' && !s.includes('/') && !s.includes('\\'));
  let rel = parts.join('/');
  // A directory (or bare /team) resolves to its index.html.
  if (!rel || !path.extname(rel)) rel = path.posix.join(rel, 'index.html');

  const full = path.join(ROOT, rel);
  if (full !== ROOT && !full.startsWith(ROOT + path.sep)) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const buf = await readFile(full);
    return new Response(buf, {
      status: 200,
      headers: { 'content-type': contentType(full), 'cache-control': 'no-store' },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
