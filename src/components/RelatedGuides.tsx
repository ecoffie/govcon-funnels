import Link from 'next/link';

interface RelatedGuide {
  slug: string;
  title: string;
  description: string;
}

// Define relationships between guides for internal linking
const guideRelationships: Record<string, string[]> = {
  'cage-code': ['sam-gov-registration', 'government-contracting-for-beginners', 'capability-statement'],
  'sam-gov-registration': ['cage-code', 'government-contracting-for-beginners', 'sba-certifications'],
  'government-contracting-for-beginners': ['sam-gov-registration', 'cage-code', 'finding-government-contracts'],
  'sba-certifications': ['8a-certification', 'vosb-certification', 'hubzone-certification', 'wosb-certification'],
  '8a-certification': ['sba-certifications', 'hubzone-certification', 'vosb-certification'],
  'vosb-certification': ['sba-certifications', '8a-certification', 'wosb-certification'],
  'hubzone-certification': ['sba-certifications', '8a-certification', 'wosb-certification'],
  'wosb-certification': ['sba-certifications', '8a-certification', 'vosb-certification'],
  'capability-statement': ['cage-code', 'sam-gov-registration', 'proposal-writing'],
  'finding-government-contracts': ['government-contracting-for-beginners', 'federal-market-research', 'proposal-writing'],
  'proposal-writing': ['capability-statement', 'finding-government-contracts', 'subcontracting-and-teaming'],
  'subcontracting-and-teaming': ['proposal-writing', 'finding-government-contracts', 'sba-certifications'],
  'federal-market-research': ['finding-government-contracts', 'government-contracting-for-beginners', 'gsa-schedule'],
  'gsa-schedule': ['federal-market-research', 'sam-gov-registration', 'sba-certifications'],
  'ai-government-contracting': ['proposal-writing', 'federal-market-research', 'finding-government-contracts'],
};

const guideInfo: Record<string, { title: string; description: string }> = {
  'cage-code': { title: 'CAGE Code Guide', description: 'Get your 5-character federal contractor ID' },
  'sam-gov-registration': { title: 'SAM.gov Registration', description: 'Step-by-step registration walkthrough' },
  'government-contracting-for-beginners': { title: 'GovCon for Beginners', description: 'Start your federal contracting journey' },
  'sba-certifications': { title: 'SBA Certifications', description: 'Overview of all small business certifications' },
  '8a-certification': { title: '8(a) Certification', description: 'Socially disadvantaged business program' },
  'vosb-certification': { title: 'VOSB/SDVOSB Certification', description: 'Veteran-owned business programs' },
  'hubzone-certification': { title: 'HUBZone Certification', description: 'Historically underutilized business zones' },
  'wosb-certification': { title: 'WOSB/EDWOSB Certification', description: 'Women-owned business programs' },
  'capability-statement': { title: 'Capability Statement', description: 'Your one-page business resume' },
  'finding-government-contracts': { title: 'Finding Contracts', description: 'Where to find federal opportunities' },
  'proposal-writing': { title: 'Proposal Writing', description: 'Write winning government proposals' },
  'subcontracting-and-teaming': { title: 'Subcontracting & Teaming', description: 'Partner with prime contractors' },
  'federal-market-research': { title: 'Federal Market Research', description: 'Research agencies and spending' },
  'gsa-schedule': { title: 'GSA Schedule', description: 'Get on the GSA contract vehicle' },
  'ai-government-contracting': { title: 'AI in Government Contracting', description: 'Use AI tools for GovCon' },
};

export function getRelatedGuides(currentSlug: string): RelatedGuide[] {
  const relatedSlugs = guideRelationships[currentSlug] || [];
  return relatedSlugs.slice(0, 3).map(slug => ({
    slug,
    title: guideInfo[slug]?.title || slug,
    description: guideInfo[slug]?.description || '',
  }));
}

export default function RelatedGuides({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedGuides(currentSlug);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">Related Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-green-600/50 transition group"
          >
            <h3 className="text-white font-semibold group-hover:text-green-400 transition mb-1">
              {guide.title}
            </h3>
            <p className="text-slate-500 text-sm">{guide.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
