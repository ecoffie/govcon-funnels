import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LeadForm from '@/components/LeadForm';
import {
  VAULT_DOCS,
  getVaultDoc,
  vaultSource,
  vaultDownloadUrl,
} from '@/lib/vault-docs';

/**
 * Indexable landing page for each gated Document Library download.
 *
 * Before the 2026-08-24 one-site consolidation these 10 resources had NO public
 * URLs at all — they opened in a modal on the podcast SPA's /resources page, and
 * the SPA had no /resources/:slug route (a request for one rendered the site
 * homepage). So there is no legacy URL to preserve here; these pages are net-new
 * indexable surface for 10 lead magnets that previously earned zero search
 * traffic.
 *
 * The shape is deliberate: everything describing the resource is above the gate
 * and crawlable, the file itself stays behind the lead form. Content indexes,
 * the download still converts.
 *
 * ⚠️ The lead `source` MUST remain `vault:<title>` verbatim — see src/lib/vault-docs.ts.
 */

export function generateStaticParams() {
  return VAULT_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getVaultDoc(slug);
  if (!doc) return { title: 'Resource Not Found' };

  const title = `${doc.title} — Free ${doc.format} Download`;
  return {
    title,
    description: doc.description,
    alternates: { canonical: `https://govcongiants.com/resources/${doc.slug}` },
    openGraph: {
      title,
      description: doc.description,
      url: `https://govcongiants.com/resources/${doc.slug}`,
      type: 'article',
    },
  };
}

export default async function VaultDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getVaultDoc(slug);
  if (!doc) notFound();

  const related = VAULT_DOCS.filter((d) => d.slug !== doc.slug).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: doc.title,
    description: doc.description,
    fileFormat: doc.format,
    url: `https://govcongiants.com/resources/${doc.slug}`,
    isAccessibleForFree: true,
    publisher: { '@type': 'Organization', name: 'GovCon Giants' },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <nav className="mb-8 text-sm text-slate-400">
          <Link href="/resources" className="hover:text-white">
            Resources
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{doc.title}</span>
        </nav>

        <span className="inline-block rounded border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
          Free {doc.format}
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{doc.title}</h1>

        <p className="mt-5 text-lg leading-relaxed text-slate-300">{doc.description}</p>

        <section className="mt-10 rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Get the {doc.format}</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter your email and we&apos;ll send the download link straight to your inbox.
          </p>
          <div className="mt-5">
            <LeadForm
              source={vaultSource(doc)}
              redirectUrl={vaultDownloadUrl(doc)}
              buttonText={`Send me the ${doc.format}`}
              hidePhone
            />
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-semibold text-slate-200">More from the library</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/resources/${r.slug}`}
                    className="block rounded-lg border border-slate-800 bg-slate-900/40 p-4 transition hover:border-violet-500/50 hover:bg-slate-900"
                  >
                    <span className="text-sm font-medium text-slate-100">{r.title}</span>
                    <span className="mt-1 block text-xs text-slate-500">{r.format}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/resources"
              className="mt-6 inline-block text-sm font-medium text-violet-300 hover:text-violet-200"
            >
              ← Browse all resources
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
