import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { searchEntities, SAMEntity } from '@/lib/sam/entity-api';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { ContractorFundingChart } from '@/components/ContractorFundingChart';

interface PageProps {
  params: Promise<{ uei: string }>;
}

// Fetch entity data
async function getContractor(uei: string): Promise<SAMEntity | null> {
  try {
    const result = await searchEntities({ uei, size: 1 });
    return result.entities[0] || null;
  } catch (error) {
    console.error('Error fetching contractor:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uei } = await params;
  const contractor = await getContractor(uei);

  if (!contractor) {
    return generateSeo({
      title: 'Contractor Not Found',
      description: 'This contractor profile could not be found.',
      path: `/data/contractors/${uei}`,
    });
  }

  const certList = [];
  if (contractor.has8a) certList.push('8(a)');
  if (contractor.hasSDVOSB) certList.push('SDVOSB');
  if (contractor.hasWOSB) certList.push('WOSB');
  if (contractor.hasHUBZone) certList.push('HUBZone');
  const certText = certList.length > 0 ? ` Certified: ${certList.join(', ')}.` : '';

  return generateSeo({
    title: `${contractor.legalBusinessName} — SAM Registration & Contract History`,
    description: `${contractor.legalBusinessName} (${contractor.cageCode || 'CAGE pending'}) federal contractor profile. SAM status: ${contractor.registrationStatus}.${certText} NAICS codes, contract history, and more.`,
    path: `/data/contractors/${uei}`,
    keywords: [
      contractor.legalBusinessName,
      contractor.cageCode || '',
      uei,
      'SAM registration',
      'federal contractor',
      ...certList,
    ].filter(Boolean),
  });
}

export default async function ContractorProfilePage({ params }: PageProps) {
  const { uei } = await params;
  const contractor = await getContractor(uei);

  if (!contractor) {
    notFound();
  }

  const certifications = [];
  if (contractor.has8a) certifications.push({ code: '8a', label: '8(a)', bgClass: 'bg-amber-500/20', textClass: 'text-amber-400' });
  if (contractor.hasSDVOSB) certifications.push({ code: 'sdvosb', label: 'SDVOSB', bgClass: 'bg-blue-500/20', textClass: 'text-blue-400' });
  if (contractor.hasWOSB) certifications.push({ code: 'wosb', label: 'WOSB', bgClass: 'bg-pink-500/20', textClass: 'text-pink-400' });
  if (contractor.hasHUBZone) certifications.push({ code: 'hubzone', label: 'HUBZone', bgClass: 'bg-green-500/20', textClass: 'text-green-400' });

  const statusBgClass = contractor.isActive ? 'bg-green-500/20' : contractor.registrationStatus === 'Expired' ? 'bg-red-500/20' : 'bg-amber-500/20';
  const statusTextClass = contractor.isActive ? 'text-green-400' : contractor.registrationStatus === 'Expired' ? 'text-red-400' : 'text-amber-400';
  const primaryNaics = contractor.naicsList?.find(n => n.isPrimary);

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: contractor.legalBusinessName,
        alternateName: contractor.dbaName || undefined,
        description: `Federal government contractor. SAM Status: ${contractor.registrationStatus}`,
        url: `${SITE_URL}/data/contractors/${uei}`,
        address: contractor.physicalAddress ? {
          '@type': 'PostalAddress',
          streetAddress: contractor.physicalAddress.addressLine1,
          addressLocality: contractor.physicalAddress.city,
          addressRegion: contractor.physicalAddress.stateOrProvince,
          postalCode: contractor.physicalAddress.zipCode,
          addressCountry: contractor.physicalAddress.countryCode || 'US',
        } : undefined,
      }} />

      {/* Breadcrumb */}
      <div className="py-4 px-6 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/data/contractors" className="hover:text-white transition">Contractors</Link>
            <span>/</span>
            <span className="text-white">{contractor.cageCode || uei}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - PUBLIC */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center text-3xl font-bold text-green-400 flex-shrink-0">
              {contractor.legalBusinessName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusBgClass} ${statusTextClass}`}>
                  {contractor.registrationStatus}
                </span>
                {certifications.map(cert => (
                  <span
                    key={cert.code}
                    className={`px-2 py-1 rounded text-xs font-medium ${cert.bgClass} ${cert.textClass}`}
                  >
                    {cert.label}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {contractor.legalBusinessName}
              </h1>
              {contractor.dbaName && (
                <p className="text-lg text-slate-400 mb-2">DBA: {contractor.dbaName}</p>
              )}
              <p className="text-slate-400">
                {contractor.physicalAddress?.city && contractor.physicalAddress?.stateOrProvince && (
                  <span>{contractor.physicalAddress.city}, {contractor.physicalAddress.stateOrProvince}</span>
                )}
                {primaryNaics && (
                  <span className="ml-4 text-slate-500">
                    Primary NAICS: {primaryNaics.naicsCode}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Public Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-sm text-slate-500 mb-1">CAGE Code</div>
              <div className="text-xl font-bold text-white font-mono">{contractor.cageCode || 'Pending'}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-sm text-slate-500 mb-1">UEI</div>
              <div className="text-xl font-bold text-white font-mono">{contractor.ueiSAM}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-sm text-slate-500 mb-1">SAM Status</div>
              <div className={`text-xl font-bold ${statusTextClass}`}>{contractor.registrationStatus}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-sm text-slate-500 mb-1">Certifications</div>
              <div className="text-xl font-bold text-amber-400">{certifications.length || 'None'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gated Content */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          {/* NAICS Codes - GATED */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🏷️</span> NAICS Codes ({contractor.naicsList?.length || 0} registered)
            </h2>

            {/* Blurred preview */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3, 4, 5].slice(0, contractor.naicsList?.length || 3).map((num) => (
                <span key={num} className="px-3 py-1.5 bg-slate-800 text-slate-500 rounded-lg text-sm font-mono blur-[3px] select-none pointer-events-none">
                  XXXXXX
                </span>
              ))}
            </div>

            {/* Gate overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/98 to-transparent flex items-end justify-center pb-6">
              <div className="text-center">
                <p className="text-slate-400 mb-3 text-sm">See all {contractor.naicsList?.length || 0} NAICS codes</p>
                <Link
                  href="https://getmindy.ai/market-intelligence"
                  className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
                >
                  Get Mindy Pro — $149/mo
                </Link>
              </div>
            </div>
          </div>

          {/* Contract History - GATED (with real funding chart) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span> Federal Funding History
            </h2>
            <ContractorFundingChart
              uei={contractor.ueiSAM}
              companyName={contractor.legalBusinessName}
              isGated={true}
            />
          </div>

          {/* Certifications Detail - GATED */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🏆</span> Certification Details
            </h2>

            {/* Blurred preview */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {certifications.length > 0 ? certifications.map((cert) => (
                <div key={cert.code} className="p-4 bg-slate-800/50 rounded-xl opacity-50 blur-[3px] select-none pointer-events-none">
                  <div className="text-white font-medium">{cert.label}</div>
                  <div className="text-sm text-slate-400">Expiration: ██/██/████</div>
                  <div className="text-xs text-slate-500">Status: ██████</div>
                </div>
              )) : (
                <div className="p-4 bg-slate-800/50 rounded-xl text-slate-500 text-sm">
                  No SBA certifications found
                </div>
              )}
            </div>

            {certifications.length > 0 && (
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/98 to-transparent flex items-end justify-center pb-6">
                <Link
                  href="https://getmindy.ai/market-intelligence"
                  className="text-sm text-green-400 hover:text-green-300 font-medium"
                >
                  View certification expiration dates →
                </Link>
              </div>
            )}
          </div>

          {/* Points of Contact - GATED */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">👤</span> Points of Contact
            </h2>

            {/* Blurred preview */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[1, 2].map((num) => (
                <div key={num} className="p-4 bg-slate-800/50 rounded-xl opacity-50 blur-[3px] select-none pointer-events-none">
                  <div className="text-white font-medium">████ ██████</div>
                  <div className="text-sm text-slate-400">████████@███████.com</div>
                  <div className="text-xs text-slate-500">████████ Business POC</div>
                </div>
              ))}
            </div>

            {/* Gate overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/98 to-transparent flex items-end justify-center pb-6">
              <Link
                href="https://getmindy.ai/market-intelligence"
                className="text-sm text-green-400 hover:text-green-300 font-medium"
              >
                Unlock contact information →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                Get Full Contractor Intelligence
              </h2>
              <p className="text-slate-400">
                Stop guessing. Get the data you need to evaluate {contractor.legalBusinessName} as a competitor or teaming partner.
              </p>
            </div>

            <div className="bg-slate-900/50 border-2 border-green-500 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-green-400 font-semibold mb-2">MI CORE</div>
                <div className="text-4xl font-bold text-white mb-2">$149<span className="text-lg text-slate-400">/mo</span></div>
                <p className="text-slate-400 text-sm mb-6">Full contractor intelligence</p>
                <ul className="space-y-2 mb-6 text-left">
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> All {contractor.naicsList?.length || 0} NAICS codes
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> 5-year contract history
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> Bid counts & competition analysis
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> Points of contact
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> Teaming partner recommendations
                  </li>
                </ul>
                <Link
                  href="https://getmindy.ai/market-intelligence"
                  className="block w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-center transition"
                >
                  Get Mindy Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-8 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/cage-code-lookup" className="text-sm text-slate-400 hover:text-white transition">
              CAGE Code Lookup →
            </Link>
            <Link href="/guides/sam-gov-registration" className="text-sm text-slate-400 hover:text-white transition">
              SAM.gov Registration Guide →
            </Link>
            <Link href="/guides/sba-certifications" className="text-sm text-slate-400 hover:text-white transition">
              SBA Certifications Guide →
            </Link>
            <Link href="/tools/expiring-contracts" className="text-sm text-slate-400 hover:text-white transition">
              Expiring Contracts Finder →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
