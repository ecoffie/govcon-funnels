import Link from 'next/link';
import { generateSeo } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { glossaryTerms } from '@/content/glossary';

export const metadata = generateSeo({
  title: 'GovCon Glossary: 50+ Terms Explained (CAGE, NAICS, FAR, IDIQ...)',
  description:
    'Plain-English definitions of every government contracting term. What is a CAGE code? NAICS? RFP? FAR? Search 50+ terms instantly. Bookmark this.',
  path: '/glossary',
  keywords: [
    'government contracting glossary',
    'govcon terms',
    'federal contracting definitions',
    'what is a cage code',
    'what is naics code',
    'what is an rfp',
    'government contracting terminology',
    'federal acquisition terms',
  ],
});

function definedTermSetJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Government Contracting Glossary',
    description:
      'Comprehensive glossary of terms used in U.S. federal government contracting.',
    url: 'https://govcongiants.org/glossary',
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
    })),
  };
}

export default function GlossaryPage() {
  // Group terms by first letter
  const grouped = glossaryTerms.reduce(
    (acc, term) => {
      const letter = term.term[0].toUpperCase();
      // Use '#' for terms starting with numbers
      const key = /[A-Z]/.test(letter) ? letter : '#';
      if (!acc[key]) acc[key] = [];
      acc[key].push(term);
      return acc;
    },
    {} as Record<string, typeof glossaryTerms>,
  );

  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    if (a === '#') return -1;
    if (b === '#') return 1;
    return a.localeCompare(b);
  });

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={definedTermSetJsonLd()} />

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Government Contracting{' '}
            <span className="text-green-500">Glossary</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {glossaryTerms.length}+ essential terms every government contractor
            needs to know. Click any term to jump to its definition.
          </p>
        </div>
      </section>

      {/* Letter Navigation */}
      <section className="px-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <nav className="flex flex-wrap gap-2 justify-center">
            {sortedKeys.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-9 h-9 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg text-green-500 hover:bg-slate-800 hover:text-green-400 transition text-sm font-bold"
              >
                {letter}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Terms */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-12">
          {sortedKeys.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-green-500 mb-4 border-b border-slate-800 pb-2">
                {letter}
              </h2>
              <div className="space-y-6">
                {grouped[letter].map((term) => (
                  <div key={term.slug} id={term.slug}>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {term.term}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-2">
                      {term.definition}
                    </p>
                    {term.relatedGuide && (
                      <Link
                        href={`/guides/${term.relatedGuide}`}
                        className="text-green-500 hover:text-green-400 text-sm font-medium transition"
                      >
                        Read the full guide →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-green-600/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            New to Government Contracting?
          </h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Knowing the terms is the first step. Our free course walks you
            through the entire process from registration to winning your first
            contract.
          </p>
          <Link
            href="/free-course"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Start the Free Course
          </Link>
        </div>
      </section>
    </main>
  );
}
