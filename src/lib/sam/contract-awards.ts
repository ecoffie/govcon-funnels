/**
 * SAM.gov Contract Awards API
 *
 * FPDS replacement - fetches contract award data including:
 * - Bid counts (numberOfOffersReceived)
 * - Incumbent contractors
 * - Modification history
 * - Competition type
 */

import {
  SAM_API_CONFIGS,
  makeSAMRequest,
  withRetry
} from './utils';

// Date formatting helpers for SAM.gov API (MM/DD/YYYY format)
function formatDateMMDDYYYY(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function formatDate(dateStr: string): string {
  // Convert YYYY-MM-DD to MM/DD/YYYY
  const [year, month, day] = dateStr.split('-');
  return `${month}/${day}/${year}`;
}

// Types
export interface ContractAward {
  piid: string;
  contractAwardUniqueKey: string;
  recipientName: string;
  recipientUei: string;
  awardingAgencyName: string;
  awardingSubAgencyName: string;
  naicsCode: string;
  naicsDescription: string;
  pscCode: string;
  totalObligation: number;
  currentTotalValueOfAward: number;
  baseAndExercisedOptionsValue: number;
  potentialTotalValueOfAward: number;
  periodOfPerformanceStartDate: string;
  periodOfPerformanceCurrentEndDate: string;
  periodOfPerformancePotentialEndDate: string;
  numberOfOffersReceived: number;
  extentCompeted: string;
  extentCompetedDescription: string;
  typeOfContractPricing: string;
  contractDescription: string;
  placeOfPerformanceCity: string;
  placeOfPerformanceState: string;
  placeOfPerformanceZip: string;
  modificationNumber: string;
  actionDate: string;
  // Computed fields
  isBaseAward: boolean;
  modificationCount?: number;
  competitionLevel?: 'sole_source' | 'low' | 'medium' | 'high';
  daysUntilExpiration?: number;
}

export interface ContractAwardSearchParams {
  naicsCode?: string;
  agencyCode?: string;
  vendorUei?: string;
  dateSignedFrom?: string;
  dateSignedTo?: string;
  expiresWithinDays?: number;
  extentCompeted?: string;
  page?: number;
  size?: number;
}

export interface ContractAwardSearchResult {
  contracts: ContractAward[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  fromCache: boolean;
}

export interface ContractFamily {
  baseAward: ContractAward;
  modifications: ContractAward[];
  totalModifications: number;
  totalObligated: number;
  latestEndDate: string;
}

// Competition level mapping
const EXTENT_COMPETED_MAP: Record<string, string> = {
  'A': 'Full and Open Competition',
  'B': 'Not Available for Competition',
  'C': 'Not Competed',
  'D': 'Full and Open (Excl. Sources)',
  'E': 'Follow-On to Competed',
  'F': 'Competed under SAP',
  'G': 'Not Competed under SAP',
  'CDO': 'Competed under BPA',
  'NDO': 'Not Competed under BPA'
};

/**
 * Get competition level from bid count
 */
function getCompetitionLevel(numberOfOffers: number, extentCompeted: string): ContractAward['competitionLevel'] {
  if (extentCompeted === 'C' || extentCompeted === 'B') {
    return 'sole_source';
  }
  if (numberOfOffers <= 2) return 'low';
  if (numberOfOffers <= 5) return 'medium';
  return 'high';
}

/**
 * Safely get nested property from object
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined;
  }, obj as unknown);
}

/**
 * Transform raw SAM.gov Contract Awards API response to our ContractAward type
 *
 * SAM.gov response structure:
 * - contractId.piid
 * - awardDetails.awardeeData.awardeeHeader.awardeeName
 * - awardDetails.awardeeData.awardeeUEIInformation.uniqueEntityId
 * - awardDetails.competitionInformation.numberOfOffersReceived
 * - awardDetails.dollars.baseAndAllOptionsValue
 * - awardDetails.dates.ultimateCompletionDate
 * - coreData.productOrServiceInformation.principalNaics.code
 * - coreData.competitionInformation.extentCompeted.name
 */
function transformAward(raw: Record<string, unknown>): ContractAward {
  // Handle SAM.gov nested structure
  const contractId = raw.contractId as Record<string, unknown> || {};
  const coreData = raw.coreData as Record<string, unknown> || {};
  const awardDetails = raw.awardDetails as Record<string, unknown> || {};

  // Extract nested values
  const piid = (contractId.piid as string) || '';
  const modNumber = (contractId.modNumber as string) || '0';

  // Awardee info
  const awardeeName = getNestedValue(awardDetails, 'awardeeData.awardeeHeader.awardeeName') as string || '';
  const awardeeUei = getNestedValue(awardDetails, 'awardeeData.awardeeUEIInformation.uniqueEntityId') as string || '';

  // Competition info - numberOfOffersReceived is in awardDetails.competitionInformation
  const numberOfOffersStr = getNestedValue(awardDetails, 'competitionInformation.numberOfOffersReceived') as string || '0';
  const numberOfOffers = parseInt(numberOfOffersStr, 10) || 0;
  const extentCompeted = getNestedValue(coreData, 'competitionInformation.extentCompeted.code') as string || '';
  const extentCompetedName = getNestedValue(coreData, 'competitionInformation.extentCompeted.name') as string || '';

  // Dates
  const ultimateCompletionDate = getNestedValue(awardDetails, 'dates.ultimateCompletionDate') as string || '';
  const effectiveDate = getNestedValue(awardDetails, 'dates.effectiveDate') as string || '';

  // Parse date and calculate days until expiration
  let daysUntilExpiration: number | undefined;
  if (ultimateCompletionDate) {
    const expDate = new Date(ultimateCompletionDate);
    if (!isNaN(expDate.getTime())) {
      daysUntilExpiration = Math.ceil((expDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    }
  }

  // NAICS - principalNaics is an array, get first element
  const principalNaicsArray = getNestedValue(coreData, 'productOrServiceInformation.principalNaics') as Array<{code?: string; name?: string}> || [];
  const primaryNaics = principalNaicsArray[0] || {};
  const naicsCode = primaryNaics.code || '';
  const naicsDescription = primaryNaics.name || '';

  // PSC
  const pscCode = getNestedValue(coreData, 'productOrServiceInformation.productOrServiceCode.code') as string || '';

  // Dollars
  const dollars = awardDetails.dollars as Record<string, unknown> || {};
  const baseAndAllOptionsValue = Number(dollars.baseAndAllOptionsValue) || 0;
  const totalDollarsObligated = Number(dollars.totalDollarsObligated) || 0;

  // Agency
  const contractingDept = getNestedValue(coreData, 'organizationInformation.contractingDepartment.name') as string || '';
  const contractingSubtier = getNestedValue(coreData, 'organizationInformation.contractingSubtier.name') as string || '';

  // Place of performance
  const popCity = getNestedValue(coreData, 'placeOfPerformance.city') as string || '';
  const popState = getNestedValue(coreData, 'placeOfPerformance.state.code') as string || '';
  const popZip = getNestedValue(coreData, 'placeOfPerformance.zip') as string || '';

  // Description
  const description = getNestedValue(coreData, 'descriptionOfContractRequirement') as string || '';

  // Contract pricing
  const contractPricing = getNestedValue(coreData, 'contractTermsAndConditions.typeOfContractPricing.code') as string || '';

  return {
    piid,
    contractAwardUniqueKey: `${piid}-${modNumber}`,
    recipientName: awardeeName,
    recipientUei: awardeeUei,
    awardingAgencyName: contractingDept,
    awardingSubAgencyName: contractingSubtier,
    naicsCode,
    naicsDescription,
    pscCode,
    totalObligation: totalDollarsObligated,
    currentTotalValueOfAward: baseAndAllOptionsValue,
    baseAndExercisedOptionsValue: baseAndAllOptionsValue,
    potentialTotalValueOfAward: baseAndAllOptionsValue,
    periodOfPerformanceStartDate: effectiveDate,
    periodOfPerformanceCurrentEndDate: ultimateCompletionDate,
    periodOfPerformancePotentialEndDate: ultimateCompletionDate,
    numberOfOffersReceived: numberOfOffers,
    extentCompeted,
    extentCompetedDescription: extentCompetedName || EXTENT_COMPETED_MAP[extentCompeted] || extentCompeted,
    typeOfContractPricing: contractPricing,
    contractDescription: description,
    placeOfPerformanceCity: popCity,
    placeOfPerformanceState: popState,
    placeOfPerformanceZip: popZip,
    modificationNumber: modNumber,
    actionDate: effectiveDate,
    isBaseAward: modNumber === '0' || modNumber === '',
    competitionLevel: getCompetitionLevel(numberOfOffers, extentCompeted),
    daysUntilExpiration
  };
}

/**
 * Search for contract awards
 *
 * Uses the SAM.gov Contract Awards API:
 * https://api.sam.gov/contract-awards/v1/search
 */
export async function searchContractAwards(
  params: ContractAwardSearchParams
): Promise<ContractAwardSearchResult> {
  const config = SAM_API_CONFIGS.awards;

  // Build query parameters using SAM.gov Contract Awards API format
  const queryParams: Record<string, string | number> = {
    limit: params.size || 50,
    offset: ((params.page || 1) - 1) * (params.size || 50)
  };

  // REQUIRED: lastModifiedDate must always be present for the API to work
  // Default to last 2 years if no date filters provided
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  queryParams.lastModifiedDate = `[${formatDateMMDDYYYY(twoYearsAgo)},]`;

  if (params.naicsCode) {
    queryParams.naicsCode = params.naicsCode;
  }

  if (params.agencyCode) {
    queryParams.contractingDepartmentCode = params.agencyCode;
  }

  if (params.vendorUei) {
    queryParams.awardeeUniqueEntityId = params.vendorUei;
  }

  // Date format: [MM/DD/YYYY,MM/DD/YYYY] for ranges
  if (params.dateSignedFrom || params.dateSignedTo) {
    const from = params.dateSignedFrom ? formatDate(params.dateSignedFrom) : '';
    const to = params.dateSignedTo ? formatDate(params.dateSignedTo) : '';
    queryParams.dateSigned = `[${from},${to}]`;
  }

  // Handle expiration filtering - use ultimate completion date
  if (params.expiresWithinDays) {
    const today = new Date();
    const future = new Date(today.getTime() + params.expiresWithinDays * 24 * 60 * 60 * 1000);
    const fromStr = formatDateMMDDYYYY(today);
    const toStr = formatDateMMDDYYYY(future);
    queryParams.ultimateCompletionDate = `[${fromStr},${toStr}]`;
  }

  if (params.extentCompeted) {
    queryParams.extentCompeted = params.extentCompeted;
  }

  // Only get base awards (mod 0) by default for cleaner results
  queryParams.modificationNumber = '0';

  const result = await makeSAMRequest<{
    awardSummary?: Record<string, unknown>[];
    totalRecords?: number;
    limit?: number;
    offset?: number;
  }>(config, '/search', queryParams);

  if (result.error) {
    console.error('[Contract Awards Search Error]', result.error);
    return {
      contracts: [],
      totalCount: 0,
      page: params.page || 1,
      pageSize: params.size || 50,
      hasMore: false,
      fromCache: false
    };
  }

  const data = result.data;
  // SAM.gov uses 'awardSummary' array for results
  const contracts = (data?.awardSummary || []).map(transformAward);
  const totalRecords = data?.totalRecords || contracts.length;
  const limit = data?.limit || params.size || 50;
  const offset = data?.offset || 0;

  return {
    contracts,
    totalCount: totalRecords,
    page: Math.floor(offset / limit) + 1,
    pageSize: limit,
    hasMore: (offset + contracts.length) < totalRecords,
    fromCache: result.fromCache
  };
}

/**
 * Get all contracts for a specific NAICS expiring within N months
 */
export async function getExpiringContracts(
  naicsCode: string,
  expiringMonths: number = 18
): Promise<ContractAward[]> {
  // SAM.gov's Contract Awards API requires a provisioned System Account key
  // (SAM_CONTRACT_AWARDS_API_KEY) that isn't available here, so it silently
  // returned []. USASpending's spending_by_award is public, no auth, and is
  // FPDS's official successor — the same source market-assassin uses. Query it
  // by NAICS, then keep awards whose period-of-performance End Date falls inside
  // the [today, today+N months] window (USASpending can't filter end-date
  // server-side, so we over-fetch recent active awards and filter in-process).
  return getExpiringContractsFromUSASpending(naicsCode, expiringMonths);
}

const USASPENDING_AWARD_SEARCH = 'https://api.usaspending.gov/api/v2/search/spending_by_award/';

/**
 * USASpending-backed expiring-contracts query (FPDS successor, no auth).
 */
async function getExpiringContractsFromUSASpending(
  naicsCode: string,
  expiringMonths: number
): Promise<ContractAward[]> {
  const today = new Date();
  const windowEnd = new Date(today.getTime() + expiringMonths * 30 * 24 * 60 * 60 * 1000);

  // Over-fetch the most recently-active awards for this NAICS (action date in
  // the last ~3 years), sorted so the soonest-ending surface first, then filter
  // by End Date in-window. 3 years of action-date coverage catches multi-year
  // base awards that are only now approaching expiration.
  const actionFrom = new Date(today);
  actionFrom.setFullYear(actionFrom.getFullYear() - 3);

  const requestBody = {
    filters: {
      naics_codes: [naicsCode],
      time_period: [{ start_date: ymd(actionFrom), end_date: ymd(windowEnd) }],
      award_type_codes: ['A', 'B', 'C', 'D'],
    },
    fields: [
      'Award ID', 'Recipient Name', 'Awarding Agency', 'Awarding Sub Agency',
      'Award Amount', 'Total Outlays', 'Start Date', 'End Date', 'NAICS',
      'Place of Performance State Code', 'recipient_id', 'generated_internal_id',
    ],
    page: 1,
    limit: 100,
    sort: 'End Date',
    order: 'asc',
  };

  let results: Record<string, unknown>[] = [];
  try {
    const res = await fetch(USASPENDING_AWARD_SEARCH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      console.error('[Expiring Contracts] USASpending error', res.status, await res.text());
      return [];
    }
    const data = await res.json();
    results = data.results || [];
  } catch (err) {
    console.error('[Expiring Contracts] USASpending fetch failed', err);
    return [];
  }

  const todayMs = today.getTime();
  const windowEndMs = windowEnd.getTime();

  const mapped = results.map((r): ContractAward | null => {
    const endDateStr = (r['End Date'] as string) || '';
    if (!endDateStr) return null;
    const endMs = new Date(endDateStr).getTime();
    if (Number.isNaN(endMs)) return null;
    // Keep only awards expiring between now and the window end (the "expiring"
    // promise). Already-expired awards are dropped.
    if (endMs < todayMs || endMs > windowEndMs) return null;

    const daysUntilExpiration = Math.round((endMs - todayMs) / (24 * 60 * 60 * 1000));
    const amount = Number(r['Award Amount']) || 0;
    const naicsRaw = r['NAICS'];
    const { code: nCode, desc: nDesc } = parseNaicsField(naicsRaw, naicsCode);

    return {
      piid: (r['Award ID'] as string) || (r['generated_internal_id'] as string) || '',
      contractAwardUniqueKey: (r['generated_internal_id'] as string) || (r['Award ID'] as string) || '',
      recipientName: (r['Recipient Name'] as string) || 'Unknown',
      recipientUei: (r['recipient_id'] as string) || '',
      awardingAgencyName: (r['Awarding Agency'] as string) || '',
      awardingSubAgencyName: (r['Awarding Sub Agency'] as string) || '',
      naicsCode: nCode,
      naicsDescription: nDesc,
      pscCode: '',
      totalObligation: Number(r['Total Outlays']) || amount,
      currentTotalValueOfAward: amount,
      baseAndExercisedOptionsValue: amount,
      potentialTotalValueOfAward: amount,
      periodOfPerformanceStartDate: (r['Start Date'] as string) || '',
      periodOfPerformanceCurrentEndDate: endDateStr,
      periodOfPerformancePotentialEndDate: endDateStr,
      // USASpending's award-search doesn't return bid counts; leave neutral so
      // the UI doesn't falsely flag everything as "low competition".
      numberOfOffersReceived: 0,
      extentCompeted: '',
      extentCompetedDescription: '',
      typeOfContractPricing: '',
      contractDescription: '',
      placeOfPerformanceCity: '',
      placeOfPerformanceState: (r['Place of Performance State Code'] as string) || '',
      placeOfPerformanceZip: '',
      modificationNumber: '0',
      actionDate: (r['Start Date'] as string) || '',
      isBaseAward: true,
      competitionLevel: undefined,
      daysUntilExpiration,
    };
  });

  return (mapped.filter(Boolean) as ContractAward[]).sort(
    (a, b) => (a.daysUntilExpiration || 999) - (b.daysUntilExpiration || 999)
  );
}

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// USASpending returns NAICS as "236220 — Commercial and Institutional Building
// Construction" (or sometimes an object). Split into code + description.
function parseNaicsField(raw: unknown, fallbackCode: string): { code: string; desc: string } {
  if (raw && typeof raw === 'object') {
    const o = raw as Record<string, unknown>;
    return { code: String(o.code || fallbackCode), desc: String(o.description || '') };
  }
  if (typeof raw === 'string' && raw.trim()) {
    const m = raw.match(/^(\d{2,6})\s*[—-]?\s*(.*)$/);
    if (m) return { code: m[1], desc: (m[2] || '').trim() };
    return { code: fallbackCode, desc: raw.trim() };
  }
  return { code: fallbackCode, desc: '' };
}

/**
 * Get contract family (base award + all modifications)
 */
export async function getContractFamily(piid: string): Promise<ContractFamily | null> {
  const config = SAM_API_CONFIGS.awards;

  const result = await makeSAMRequest<{
    results: Record<string, unknown>[];
  }>(config, `/contracts/${encodeURIComponent(piid)}/family`, {});

  if (result.error || !result.data?.results?.length) {
    return null;
  }

  const awards = result.data.results.map(transformAward);
  const baseAward = awards.find(a => a.isBaseAward) || awards[0];
  const modifications = awards.filter(a => !a.isBaseAward);

  // Calculate totals
  const totalObligated = awards.reduce((sum, a) => sum + a.totalObligation, 0);
  const latestEndDate = awards.reduce((latest, a) => {
    if (!a.periodOfPerformanceCurrentEndDate) return latest;
    return a.periodOfPerformanceCurrentEndDate > latest ? a.periodOfPerformanceCurrentEndDate : latest;
  }, '');

  return {
    baseAward,
    modifications: modifications.sort((a, b) =>
      (a.modificationNumber || '').localeCompare(b.modificationNumber || '')
    ),
    totalModifications: modifications.length,
    totalObligated,
    latestEndDate
  };
}

/**
 * Search contracts by incumbent (competitor tracking)
 */
export async function getContractsByIncumbent(uei: string): Promise<ContractAward[]> {
  const result = await searchContractAwards({
    vendorUei: uei,
    size: 100
  });

  return result.contracts;
}

/**
 * Get low-competition contracts (1-2 bidders or sole source)
 */
export async function getLowCompetitionContracts(
  naicsCode: string,
  expiringMonths: number = 12
): Promise<ContractAward[]> {
  const allContracts = await getExpiringContracts(naicsCode, expiringMonths);

  return allContracts.filter(c =>
    c.competitionLevel === 'sole_source' || c.competitionLevel === 'low'
  );
}

/**
 * Get contracts with high modification count (trouble indicators)
 */
export async function getTroubledContracts(
  naicsCode: string,
  minModifications: number = 4
): Promise<ContractFamily[]> {
  const expiring = await getExpiringContracts(naicsCode, 18);

  const families: ContractFamily[] = [];

  // Get family for each contract (with retry for rate limiting)
  for (const contract of expiring.slice(0, 20)) { // Limit to avoid rate limits
    try {
      const family = await withRetry(() => getContractFamily(contract.piid));
      if (family && family.totalModifications >= minModifications) {
        families.push(family);
      }
    } catch (err) {
      console.warn(`Failed to get family for ${contract.piid}:`, err);
    }
  }

  return families.sort((a, b) => b.totalModifications - a.totalModifications);
}

/**
 * Aggregate contract intelligence for briefings
 */
export interface ContractIntelligence {
  expiringCount: number;
  lowCompetitionCount: number;
  soleSourceCount: number;
  totalValue: number;
  topIncumbents: Array<{ name: string; uei: string; contractCount: number; totalValue: number }>;
  urgentOpportunities: ContractAward[];
  troubledContracts: ContractFamily[];
}

export async function aggregateContractIntelligence(
  naicsCodes: string[]
): Promise<ContractIntelligence> {
  const intelligence: ContractIntelligence = {
    expiringCount: 0,
    lowCompetitionCount: 0,
    soleSourceCount: 0,
    totalValue: 0,
    topIncumbents: [],
    urgentOpportunities: [],
    troubledContracts: []
  };

  const incumbentMap = new Map<string, { name: string; uei: string; contractCount: number; totalValue: number }>();

  // Process each NAICS code
  for (const naics of naicsCodes.slice(0, 5)) { // Limit to avoid rate limits
    try {
      const contracts = await getExpiringContracts(naics, 12);

      for (const contract of contracts) {
        intelligence.expiringCount++;
        intelligence.totalValue += contract.currentTotalValueOfAward;

        // Competition tracking
        if (contract.competitionLevel === 'sole_source') {
          intelligence.soleSourceCount++;
        } else if (contract.competitionLevel === 'low') {
          intelligence.lowCompetitionCount++;
        }

        // Urgent (within 90 days)
        if (contract.daysUntilExpiration && contract.daysUntilExpiration <= 90) {
          intelligence.urgentOpportunities.push(contract);
        }

        // Track incumbents
        if (contract.recipientUei) {
          const existing = incumbentMap.get(contract.recipientUei);
          if (existing) {
            existing.contractCount++;
            existing.totalValue += contract.currentTotalValueOfAward;
          } else {
            incumbentMap.set(contract.recipientUei, {
              name: contract.recipientName,
              uei: contract.recipientUei,
              contractCount: 1,
              totalValue: contract.currentTotalValueOfAward
            });
          }
        }
      }
    } catch (err) {
      console.warn(`Failed to process NAICS ${naics}:`, err);
    }
  }

  // Sort incumbents by total value
  intelligence.topIncumbents = Array.from(incumbentMap.values())
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 10);

  // Sort urgent by days until expiration
  intelligence.urgentOpportunities.sort((a, b) =>
    (a.daysUntilExpiration || 999) - (b.daysUntilExpiration || 999)
  );

  return intelligence;
}
