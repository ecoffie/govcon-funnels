/**
 * SAM.gov Entity Management API wrapper
 * Docs: https://open.gsa.gov/api/entity-api/
 *
 * Rate limits:
 * - No API key: 10 requests/day
 * - With API key: 1,000 requests/day
 */

const SAM_ENTITY_API_BASE = 'https://api.sam.gov/entity-information/v3/entities';

export interface SamEntity {
  ueiSAM: string;
  cageCode: string | null;
  legalBusinessName: string;
  dbaName: string | null;
  physicalAddress: {
    city: string;
    stateOrProvinceCode: string;
    countryCode: string;
  } | null;
  registrationStatus: string;
  registrationExpirationDate: string | null;
  naicsCode: string[];
  pscCode: string[];
  businessTypes: string[];
  sbaBusinessTypes: string[];
}

export interface SamSearchResult {
  entities: SamEntity[];
  totalRecords: number;
  error?: string;
}

/**
 * Search SAM.gov entities by CAGE code or company name
 */
export async function searchSamEntities(params: {
  cageCode?: string;
  companyName?: string;
  limit?: number;
}): Promise<SamSearchResult> {
  const apiKey = process.env.SAM_API_KEY;

  if (!apiKey) {
    console.error('SAM_API_KEY not configured');
    return { entities: [], totalRecords: 0, error: 'SAM.gov API not configured' };
  }

  const { cageCode, companyName, limit = 10 } = params;

  if (!cageCode && !companyName) {
    return { entities: [], totalRecords: 0, error: 'Must provide cageCode or companyName' };
  }

  try {
    // Build query params
    const queryParams = new URLSearchParams({
      api_key: apiKey,
      registrationStatus: 'A', // Active registrations only
      // Request specific fields to minimize response size
      includeSections: 'entityRegistration,coreData',
    });

    if (cageCode) {
      // Exact CAGE code search
      queryParams.set('cageCode', cageCode.toUpperCase().trim());
    } else if (companyName) {
      // Partial company name search
      queryParams.set('legalBusinessName', companyName.trim());
    }

    // Limit results
    queryParams.set('page', '0');
    queryParams.set('size', String(Math.min(limit, 100)));

    const url = `${SAM_ENTITY_API_BASE}?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SAM.gov API error:', response.status, errorText);

      if (response.status === 429) {
        // SAM.gov has strict daily limits: 10/day for personal keys, 1,000/day with federal role
        return { entities: [], totalRecords: 0, error: 'SAM.gov daily limit reached. Try again tomorrow.' };
      }
      if (response.status === 403) {
        return { entities: [], totalRecords: 0, error: 'API key invalid or expired.' };
      }

      return { entities: [], totalRecords: 0, error: `SAM.gov API error: ${response.status}` };
    }

    const data = await response.json();

    // Transform response to our simplified format
    const entities: SamEntity[] = (data.entityData || []).map((entity: Record<string, unknown>) => {
      const registration = entity.entityRegistration as Record<string, unknown> || {};
      const coreData = entity.coreData as Record<string, unknown> || {};
      const physicalAddress = (coreData.physicalAddress as Record<string, unknown>) || null;
      const generalInfo = (coreData.generalInformation as Record<string, unknown>) || {};
      const businessTypes = (coreData.businessTypes as Record<string, unknown>) || {};

      return {
        ueiSAM: registration.ueiSAM as string || '',
        cageCode: registration.cageCode as string || null,
        legalBusinessName: registration.legalBusinessName as string || '',
        dbaName: registration.dbaName as string || null,
        physicalAddress: physicalAddress ? {
          city: physicalAddress.city as string || '',
          stateOrProvinceCode: physicalAddress.stateOrProvinceCode as string || '',
          countryCode: physicalAddress.countryCode as string || 'USA',
        } : null,
        registrationStatus: registration.registrationStatus as string || 'Unknown',
        registrationExpirationDate: registration.registrationExpirationDate as string || null,
        naicsCode: extractNaicsCodes(generalInfo),
        pscCode: extractPscCodes(generalInfo),
        businessTypes: extractBusinessTypes(businessTypes),
        sbaBusinessTypes: extractSbaTypes(businessTypes),
      };
    });

    return {
      entities,
      totalRecords: data.totalRecords || entities.length,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('SAM.gov API request failed:', message);
    return { entities: [], totalRecords: 0, error: `Request failed: ${message}` };
  }
}

/**
 * Extract NAICS codes from SAM response
 */
function extractNaicsCodes(generalInfo: Record<string, unknown>): string[] {
  const naicsList = generalInfo.naicsCodeList as Array<Record<string, unknown>> | undefined;
  if (!naicsList || !Array.isArray(naicsList)) return [];

  return naicsList
    .map(n => n.naicsCode as string)
    .filter(Boolean)
    .slice(0, 5); // Limit to first 5 for display
}

/**
 * Extract PSC codes from SAM response
 */
function extractPscCodes(generalInfo: Record<string, unknown>): string[] {
  const pscList = generalInfo.pscCodeList as Array<Record<string, unknown>> | undefined;
  if (!pscList || !Array.isArray(pscList)) return [];

  return pscList
    .map(p => p.pscCode as string)
    .filter(Boolean)
    .slice(0, 5);
}

/**
 * Extract business types from SAM response
 */
function extractBusinessTypes(businessTypes: Record<string, unknown>): string[] {
  const types: string[] = [];

  const typeList = businessTypes.businessTypeList as Array<Record<string, unknown>> | undefined;
  if (typeList && Array.isArray(typeList)) {
    typeList.forEach(t => {
      const name = t.businessTypeName as string;
      if (name) types.push(name);
    });
  }

  return types.slice(0, 5);
}

/**
 * Extract SBA business types (certifications) from SAM response
 */
function extractSbaTypes(businessTypes: Record<string, unknown>): string[] {
  const types: string[] = [];

  const sbaList = businessTypes.sbaBusinessTypeList as Array<Record<string, unknown>> | undefined;
  if (sbaList && Array.isArray(sbaList)) {
    sbaList.forEach(t => {
      const name = t.sbaBusinessTypeName as string;
      if (name) types.push(name);
    });
  }

  return types.slice(0, 5);
}
