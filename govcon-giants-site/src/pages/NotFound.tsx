import { Link } from 'react-router';
import { useMeta } from '@/lib/useMeta';

/** Real 404 — the SPA used to render Home for every unknown URL, which made
 *  any typo a 200 duplicate of the homepage (soft-404s at scale). */
export default function NotFound() {
  useMeta({ title: 'Page not found — GovCon Giants Podcast', noindex: true });
  return (
    <div className="container-gg py-28 text-center">
      <p className="kicker mb-3">404</p>
      <h1 className="mb-4 font-display text-4xl font-bold text-white">That page doesn&apos;t exist.</h1>
      <p className="mx-auto mb-8 max-w-md text-[16px] leading-relaxed text-slate-400">
        The episode archive, guides, and everything else are one click away.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="font-semibold text-brand hover:underline">← Home</Link>
        <Link to="/podcast" className="font-semibold text-brand hover:underline">All episodes</Link>
        <a href="https://govcongiants.com/guides" className="font-semibold text-brand hover:underline">Free guides</a>
      </div>
    </div>
  );
}
