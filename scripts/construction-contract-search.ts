/**
 * Construction Contracts Intelligence Search
 *
 * Searches SAM.gov for expiring construction contracts across:
 * - NAICS 236220 (Commercial Building)
 * - NAICS 237xxx (Heavy Construction)
 * - NAICS 541330 (Engineering Services)
 *
 * Filters for USACE, NAVFAC, VA, and Air Force
 *
 * Run after SAM.gov API quota resets (March 31, 2026 00:00 UTC)
 */

import { getExpiringContracts, ContractAward } from '../src/lib/sam/contract-awards';

// Target NAICS codes
const NAICS_CODES = [
  '236220', // Commercial/Institutional Building
  '237110', // Water and Sewer Line Construction
  '237120', // Oil and Gas Pipeline Construction
  '237130', // Power and Communication Line Construction
  '237210', // Land Subdivision
  '237310', // Highway, Street, and Bridge Construction
  '237990', // Other Heavy Construction
  '541330', // Engineering Services
];

// Target agency keywords
const TARGET_AGENCIES = [
  'USACE',
  'Army Corps of Engineers',
  'NAVFAC',
  'Naval Facilities',
  'Veterans Affairs',
  'VA ',
  'Air Force',
  'AFCEC',
];

interface ContractIntelligence extends ContractAward {
  score: number;
  recompeteIndicators: string[];
  sourcesSeekExpected?: string;
  rfpExpected?: string;
}

/**
 * Score contract for re-compete opportunity
 */
function scoreContract(contract: ContractAward): { score: number; indicators: string[] } {
  let score = 0;
  const indicators: string[] = [];

  // High value (>$10M)
  if (contract.currentTotalValueOfAward >= 10_000_000) {
    score += 2;
    indicators.push(`High value: ${formatCurrency(contract.currentTotalValueOfAward)}`);
  }

  // Low competition (1-2 bidders)
  if (contract.numberOfOffersReceived <= 2) {
    score += 3;
    indicators.push(`Low competition: ${contract.numberOfOffersReceived} bidders`);
  }

  // Sole source
  if (contract.competitionLevel === 'sole_source') {
    score += 4;
    indicators.push('Sole source award (must re-compete)');
  }

  // Optimal expiration window (6-12 months)
  if (contract.daysUntilExpiration && contract.daysUntilExpiration >= 180 && contract.daysUntilExpiration <= 365) {
    score += 3;
    indicators.push(`Expires in ${Math.round(contract.daysUntilExpiration / 30)} months`);
  }

  // Urgent expiration (<6 months)
  if (contract.daysUntilExpiration && contract.daysUntilExpiration < 180) {
    score += 1;
    indicators.push('URGENT: Expires within 6 months');
  }

  return { score, indicators };
}

/**
 * Check if agency matches target list
 */
function isTargetAgency(agencyName: string): boolean {
  return TARGET_AGENCIES.some(target =>
    agencyName.toUpperCase().includes(target.toUpperCase())
  );
}

/**
 * Format currency
 */
function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return `$${(value / 1_000).toFixed(0)}K`;
}

/**
 * Format date to human-readable
 */
function formatDate(dateStr: string): string {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Estimate Sources Sought and RFP dates
 */
function estimateMilestones(daysUntilExpiration: number): { sourcesSeek: string; rfp: string } {
  // Sources Sought typically 6-9 months before expiration
  // RFP typically 3-6 months before expiration
  const today = new Date();

  const sourcesSeekStart = new Date(today.getTime() + (daysUntilExpiration - 270) * 24 * 60 * 60 * 1000);
  const sourcesSeekEnd = new Date(today.getTime() + (daysUntilExpiration - 180) * 24 * 60 * 60 * 1000);

  const rfpStart = new Date(today.getTime() + (daysUntilExpiration - 180) * 24 * 60 * 60 * 1000);
  const rfpEnd = new Date(today.getTime() + (daysUntilExpiration - 90) * 24 * 60 * 60 * 1000);

  const formatMonthYear = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return {
    sourcesSeek: `${formatMonthYear(sourcesSeekStart)} - ${formatMonthYear(sourcesSeekEnd)}`,
    rfp: `${formatMonthYear(rfpStart)} - ${formatMonthYear(rfpEnd)}`
  };
}

/**
 * Main search function
 */
async function searchConstructionContracts() {
  console.log('🔍 Searching for expiring construction contracts...\n');
  console.log(`Target NAICS: ${NAICS_CODES.join(', ')}`);
  console.log(`Target Agencies: USACE, NAVFAC, VA, Air Force\n`);
  console.log('=' .repeat(80));

  const allContracts: ContractIntelligence[] = [];

  // Search each NAICS code
  for (const naics of NAICS_CODES) {
    console.log(`\nSearching NAICS ${naics}...`);

    try {
      const contracts = await getExpiringContracts(naics, 12); // 12 months

      // Filter for target agencies and 6-12 month window
      const filtered = contracts.filter(c =>
        isTargetAgency(c.awardingAgencyName) &&
        c.daysUntilExpiration &&
        c.daysUntilExpiration >= 180 &&
        c.daysUntilExpiration <= 365
      );

      // Score each contract
      for (const contract of filtered) {
        const { score, indicators } = scoreContract(contract);
        const milestones = contract.daysUntilExpiration
          ? estimateMilestones(contract.daysUntilExpiration)
          : { sourcesSeek: 'TBD', rfp: 'TBD' };

        allContracts.push({
          ...contract,
          score,
          recompeteIndicators: indicators,
          sourcesSeekExpected: milestones.sourcesSeek,
          rfpExpected: milestones.rfp
        });
      }

      console.log(`  Found ${filtered.length} contracts in target window`);
    } catch (error) {
      console.error(`  Error searching NAICS ${naics}:`, error);
    }
  }

  // Sort by score (highest first)
  allContracts.sort((a, b) => b.score - a.score);

  // Display top 10
  console.log('\n' + '='.repeat(80));
  console.log('📊 TOP 10 EXPIRING CONSTRUCTION CONTRACTS');
  console.log('='.repeat(80));

  const top10 = allContracts.slice(0, 10);

  for (let i = 0; i < top10.length; i++) {
    const c = top10[i];
    console.log(`\n${i + 1}. ${c.contractDescription.substring(0, 60)}...`);
    console.log('─'.repeat(80));
    console.log(`   Contract ID:        ${c.piid}`);
    console.log(`   Incumbent:          ${c.recipientName}`);
    console.log(`   Agency:             ${c.awardingAgencyName}`);
    console.log(`   Sub-Agency:         ${c.awardingSubAgencyName}`);
    console.log(`   Value:              ${formatCurrency(c.currentTotalValueOfAward)}`);
    console.log(`   Expiration Date:    ${formatDate(c.periodOfPerformanceCurrentEndDate)} (${c.daysUntilExpiration} days)`);
    console.log(`   NAICS:              ${c.naicsCode} - ${c.naicsDescription}`);
    console.log(`   Competition:        ${c.competitionLevel} (${c.numberOfOffersReceived} bidders)`);
    console.log(`   State:              ${c.placeOfPerformanceState}`);
    console.log(`   Opportunity Score:  ${'⭐'.repeat(Math.min(c.score, 5))} (${c.score}/10)`);
    console.log(`\n   Re-compete Indicators:`);
    c.recompeteIndicators.forEach(indicator => console.log(`     • ${indicator}`));
    console.log(`\n   Expected Milestones:`);
    console.log(`     • Sources Sought:   ${c.sourcesSeekExpected}`);
    console.log(`     • RFP Release:      ${c.rfpExpected}`);
  }

  // Summary statistics
  console.log('\n' + '='.repeat(80));
  console.log('📈 SUMMARY STATISTICS');
  console.log('='.repeat(80));

  const totalValue = allContracts.reduce((sum, c) => sum + c.currentTotalValueOfAward, 0);
  const soleSourceCount = allContracts.filter(c => c.competitionLevel === 'sole_source').length;
  const lowCompCount = allContracts.filter(c => c.competitionLevel === 'low').length;
  const avgValue = totalValue / allContracts.length;

  console.log(`Total Contracts Found:       ${allContracts.length}`);
  console.log(`Total Contract Value:        ${formatCurrency(totalValue)}`);
  console.log(`Average Contract Value:      ${formatCurrency(avgValue)}`);
  console.log(`Sole Source Contracts:       ${soleSourceCount}`);
  console.log(`Low Competition Contracts:   ${lowCompCount}`);
  console.log(`High-Priority (Score ≥5):    ${allContracts.filter(c => c.score >= 5).length}`);

  // Agency breakdown
  console.log('\n📍 By Agency:');
  const agencyMap = new Map<string, number>();
  allContracts.forEach(c => {
    const count = agencyMap.get(c.awardingAgencyName) || 0;
    agencyMap.set(c.awardingAgencyName, count + 1);
  });

  Array.from(agencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([agency, count]) => {
      console.log(`   ${agency}: ${count} contracts`);
    });

  // NAICS breakdown
  console.log('\n🏗️  By NAICS:');
  const naicsMap = new Map<string, number>();
  allContracts.forEach(c => {
    const count = naicsMap.get(c.naicsCode) || 0;
    naicsMap.set(c.naicsCode, count + 1);
  });

  Array.from(naicsMap.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([naics, count]) => {
      const description = allContracts.find(c => c.naicsCode === naics)?.naicsDescription || '';
      console.log(`   ${naics} (${description}): ${count} contracts`);
    });

  console.log('\n' + '='.repeat(80));
  console.log('✅ Search complete!');
  console.log('=' .repeat(80));
}

// Run the search
searchConstructionContracts().catch(error => {
  console.error('❌ Search failed:', error);
  process.exit(1);
});
