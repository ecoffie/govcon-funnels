/**
 * SAM.gov Entity Management API
 *
 * Provides live SAM.gov registration data for contractors:
 * - SAM registration status (Active/Inactive/Expired)
 * - Certifications (8(a), SDVOSB, WOSB, HUBZone)
 * - UEI, CAGE code
 * - NAICS codes registered
 * - Points of contact
 */

import {
  SAM_API_CONFIGS,
  makeSAMRequest,
  validateCAGECode
} from './utils';

// Re-export validateCAGECode for convenience
export { validateCAGECode };

// Types
export interface SAMEntity {
  ueiSAM: string;
  cageCode: string;
  legalBusinessName: string;
  dbaName?: string;
  registrationStatus: 'Active' | 'Inactive' | 'Expired' | 'Unknown';
  registrationExpirationDate?: string;
  purposeOfRegistration?: string;
  entityStructure?: string;
  physicalAddress?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateOrProvince?: string;
    zipCode?: string;
    countryCode?: string;
  };
  mailingAddress?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateOrProvince?: string;
    zipCode?: string;
    countryCode?: string;
  };
  naicsList?: Array<{
    naicsCode: string;
    naicsDescription?: string;
    isPrimary?: boolean;
  }>;
  pscList?: Array<{
    pscCode: string;
    pscDescription?: string;
  }>;
  certifications?: {
    sbaBusinessTypes?: string[];
    certificationExpirations?: Array<{
      type: string;
      expirationDate: string;
    }>;
  };
  pointsOfContact?: Array<{
    name?: string;
    title?: string;
    phone?: string;
    email?: string;
    type?: string; // 'Government', 'Electronic', 'Alternate'
  }>;
  // Computed fields
  isActive: boolean;
  daysUntilExpiration?: number;
  has8a?: boolean;
  hasSDVOSB?: boolean;
  hasWOSB?: boolean;
  hasHUBZone?: boolean;
}

export interface EntitySearchParams {
  legalBusinessName?: string;
  uei?: string;
  cageCode?: string;
  naicsCode?: string;
  stateCode?: string;
  registrationStatus?: 'Active' | 'Inactive' | 'Expired';
  sbaBusinessTypes?: string; // 8a, SDVOSB, WOSB, HUBZone
  page?: number;
  size?: number;
}

export interface EntitySearchResult {
  entities: SAMEntity[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  fromCache: boolean;
  error?: {
    status: number;
    message: string;
    retryable: boolean;
    fallbackAvailable: boolean;
  };
}

// SBA Business Type Codes
const SBA_TYPE_MAP: Record<string, string> = {
  '2X': '8(a)',
  'XX': 'HUBZone',
  'XY': 'SDVOSB',
  '23': 'WOSB',
  'A2': 'EDWOSB',
  '27': 'Small Business'
};

/**
 * Transform raw API response to our SAMEntity type
 * SAM.gov API v3 returns deeply nested structure:
 * - entityRegistration: ueiSAM, cageCode, legalBusinessName, registrationStatus, etc.
 * - coreData: physicalAddress, mailingAddress, businessTypes
 * - assertions: goodsAndServices (naicsList, pscList)
 * - pointsOfContact: governmentBusinessPOC, electronicBusinessPOC, etc.
 */
export function transformEntity(raw: Record<string, unknown>): SAMEntity {
  // Extract nested objects
  const registration = (raw.entityRegistration || {}) as Record<string, unknown>;
  const coreData = (raw.coreData || {}) as Record<string, unknown>;
  const assertions = (raw.assertions || {}) as Record<string, unknown>;
  const pocs = (raw.pointsOfContact || {}) as Record<string, unknown>;

  // Registration data
  const expirationDate = registration.registrationExpirationDate as string;
  const daysUntilExpiration = expirationDate
    ? Math.ceil((new Date(expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : undefined;
  const status = registration.registrationStatus as string || 'Unknown';

  // Business types from coreData
  const businessTypes = (coreData.businessTypes || {}) as Record<string, unknown>;
  const sbaBusinessTypeList = (businessTypes.sbaBusinessTypeList || []) as Array<Record<string, unknown>>;
  const sbaTypes = sbaBusinessTypeList
    .map(t => t.sbaBusinessTypeCode as string)
    .filter(Boolean);

  // NAICS from assertions.goodsAndServices
  const goodsAndServices = (assertions.goodsAndServices || {}) as Record<string, unknown>;
  const naicsRaw = (goodsAndServices.naicsList || []) as Array<Record<string, unknown>>;
  const primaryNaics = goodsAndServices.primaryNaics as string;
  const naicsList = naicsRaw.map(n => ({
    naicsCode: String(n.naicsCode || ''),
    naicsDescription: String(n.naicsDescription || ''),
    isPrimary: String(n.naicsCode) === primaryNaics
  }));

  // PSC from assertions.goodsAndServices
  const pscRaw = (goodsAndServices.pscList || []) as Array<Record<string, unknown>>;
  const pscList = pscRaw
    .filter(p => p.pscCode) // Filter out empty entries
    .map(p => ({
      pscCode: String(p.pscCode || ''),
      pscDescription: String(p.pscDescription || '')
    }));

  // Addresses from coreData
  const physAddr = (coreData.physicalAddress || {}) as Record<string, unknown>;
  const mailAddr = (coreData.mailingAddress || {}) as Record<string, unknown>;

  // Points of contact
  const pointsOfContact: SAMEntity['pointsOfContact'] = [];
  const pocTypes = ['governmentBusinessPOC', 'electronicBusinessPOC', 'pastPerformancePOC'];
  for (const pocType of pocTypes) {
    const poc = pocs[pocType] as Record<string, unknown>;
    if (poc && (poc.firstName || poc.lastName)) {
      pointsOfContact.push({
        name: [poc.firstName, poc.lastName].filter(Boolean).join(' '),
        title: String(poc.title || ''),
        phone: '', // Not in v3 response at this level
        email: '', // Not in v3 response at this level
        type: pocType.replace('POC', '').replace(/([A-Z])/g, ' $1').trim()
      });
    }
  }

  // General info from coreData
  const generalInfo = (coreData.generalInformation || {}) as Record<string, unknown>;

  return {
    ueiSAM: String(registration.ueiSAM || ''),
    cageCode: String(registration.cageCode || ''),
    legalBusinessName: String(registration.legalBusinessName || ''),
    dbaName: registration.dbaName ? String(registration.dbaName) : undefined,
    registrationStatus: status as SAMEntity['registrationStatus'],
    registrationExpirationDate: expirationDate,
    purposeOfRegistration: registration.purposeOfRegistrationDesc ? String(registration.purposeOfRegistrationDesc) : undefined,
    entityStructure: generalInfo.entityStructureDesc ? String(generalInfo.entityStructureDesc) : undefined,
    physicalAddress: {
      addressLine1: physAddr.addressLine1 ? String(physAddr.addressLine1) : undefined,
      addressLine2: physAddr.addressLine2 ? String(physAddr.addressLine2) : undefined,
      city: physAddr.city ? String(physAddr.city) : undefined,
      stateOrProvince: physAddr.stateOrProvinceCode ? String(physAddr.stateOrProvinceCode) : undefined,
      zipCode: physAddr.zipCode ? String(physAddr.zipCode) : undefined,
      countryCode: physAddr.countryCode ? String(physAddr.countryCode) : undefined,
    },
    mailingAddress: {
      addressLine1: mailAddr.addressLine1 ? String(mailAddr.addressLine1) : undefined,
      addressLine2: mailAddr.addressLine2 ? String(mailAddr.addressLine2) : undefined,
      city: mailAddr.city ? String(mailAddr.city) : undefined,
      stateOrProvince: mailAddr.stateOrProvinceCode ? String(mailAddr.stateOrProvinceCode) : undefined,
      zipCode: mailAddr.zipCode ? String(mailAddr.zipCode) : undefined,
      countryCode: mailAddr.countryCode ? String(mailAddr.countryCode) : undefined,
    },
    naicsList,
    pscList,
    certifications: {
      sbaBusinessTypes: sbaTypes.map(t => SBA_TYPE_MAP[t] || t),
      certificationExpirations: [] // Would need additional parsing from sbaBusinessTypeList
    },
    pointsOfContact,
    // Computed fields
    isActive: status === 'Active',
    daysUntilExpiration,
    has8a: sbaTypes.includes('2X'),
    hasSDVOSB: sbaTypes.includes('XY'),
    hasWOSB: sbaTypes.includes('23') || sbaTypes.includes('A2'),
    hasHUBZone: sbaTypes.includes('XX')
  };
}

/**
 * Search for entities in SAM.gov
 */
export async function searchEntities(
  params: EntitySearchParams
): Promise<EntitySearchResult> {
  const config = SAM_API_CONFIGS.entity;

  // Build query parameters
  // CRITICAL: samRegistered=Yes is REQUIRED or API returns empty entityData array
  // CRITICAL: SAM.gov uses 0-indexed pagination! page=0 is the first page
  const queryParams: Record<string, string | number> = {
    samRegistered: 'Yes',  // DO NOT REMOVE - Required for API to return entity data
    page: params.page !== undefined ? params.page - 1 : 0,  // Convert 1-indexed to 0-indexed
    size: params.size || 25
  };

  if (params.legalBusinessName) {
    queryParams.legalBusinessName = params.legalBusinessName;
  }

  if (params.uei) {
    queryParams.ueiSAM = params.uei;
  }

  if (params.cageCode) {
    queryParams.cageCode = params.cageCode;
  }

  if (params.naicsCode) {
    queryParams.naicsCode = params.naicsCode;
  }

  if (params.stateCode) {
    queryParams.stateCode = params.stateCode;
  }

  if (params.registrationStatus) {
    queryParams.registrationStatus = params.registrationStatus;
  }

  if (params.sbaBusinessTypes) {
    queryParams.sbaBusinessTypes = params.sbaBusinessTypes;
  }

  const result = await makeSAMRequest<{
    entityData: Record<string, unknown>[];
    totalRecords: number;
  }>(config, '/entities', queryParams);

  if (result.error) {
    console.error('[Entity Search Error]', result.error);
    return {
      entities: [],
      totalCount: 0,
      page: params.page || 1,
      pageSize: params.size || 25,
      hasMore: false,
      fromCache: false,
      error: result.error,
    };
  }

  const data = result.data;
  const entities = (data?.entityData || []).map(transformEntity);

  return {
    entities,
    totalCount: data?.totalRecords || entities.length,
    page: params.page || 1,
    pageSize: params.size || 25,
    hasMore: entities.length === (params.size || 25),
    fromCache: result.fromCache
  };
}

/**
 * Get entity details by UEI
 */
export async function getEntityByUEI(uei: string): Promise<SAMEntity | null> {
  const result = await searchEntities({ uei, size: 1 });

  if (result.entities.length === 0) {
    return null;
  }

  return result.entities[0];
}

/**
 * Get entity details by CAGE code
 */
export async function getEntityByCAGE(cageCode: string): Promise<SAMEntity | null> {
  const result = await searchEntities({ cageCode, size: 1 });

  if (result.entities.length === 0) {
    return null;
  }

  return result.entities[0];
}

/**
 * Verify SAM.gov registration status
 */
export async function verifySAMStatus(uei: string): Promise<{
  isRegistered: boolean;
  isActive: boolean;
  status: string;
  expirationDate?: string;
  daysUntilExpiration?: number;
}> {
  const entity = await getEntityByUEI(uei);

  if (!entity) {
    return {
      isRegistered: false,
      isActive: false,
      status: 'Not Found'
    };
  }

  return {
    isRegistered: true,
    isActive: entity.isActive,
    status: entity.registrationStatus,
    expirationDate: entity.registrationExpirationDate,
    daysUntilExpiration: entity.daysUntilExpiration
  };
}

/**
 * Get all certifications for an entity
 */
export async function getCertifications(uei: string): Promise<{
  has8a: boolean;
  hasSDVOSB: boolean;
  hasWOSB: boolean;
  hasHUBZone: boolean;
  allCertifications: string[];
  expirations: Array<{ type: string; expirationDate: string }>;
} | null> {
  const entity = await getEntityByUEI(uei);

  if (!entity) {
    return null;
  }

  return {
    has8a: entity.has8a || false,
    hasSDVOSB: entity.hasSDVOSB || false,
    hasWOSB: entity.hasWOSB || false,
    hasHUBZone: entity.hasHUBZone || false,
    allCertifications: entity.certifications?.sbaBusinessTypes || [],
    expirations: entity.certifications?.certificationExpirations || []
  };
}

/**
 * Search for entities by certification type
 */
export async function searchByCertification(
  certType: '8a' | 'SDVOSB' | 'WOSB' | 'HUBZone',
  options: { naicsCode?: string; stateCode?: string; limit?: number } = {}
): Promise<SAMEntity[]> {
  const certMap: Record<string, string> = {
    '8a': '2X',
    'SDVOSB': 'XY',
    'WOSB': '23',
    'HUBZone': 'XX'
  };

  const result = await searchEntities({
    sbaBusinessTypes: certMap[certType],
    naicsCode: options.naicsCode,
    stateCode: options.stateCode,
    registrationStatus: 'Active',
    size: options.limit || 50
  });

  return result.entities;
}

/**
 * Get NAICS codes registered by an entity
 */
export async function getEntityNAICS(uei: string): Promise<Array<{
  naicsCode: string;
  naicsDescription: string;
  isPrimary: boolean;
}>> {
  const entity = await getEntityByUEI(uei);

  if (!entity || !entity.naicsList) {
    return [];
  }

  return entity.naicsList.map(n => ({
    naicsCode: n.naicsCode,
    naicsDescription: n.naicsDescription || '',
    isPrimary: n.isPrimary || false
  }));
}

/**
 * Find potential teaming partners by NAICS and certification
 */
export async function findTeamingPartners(
  naicsCode: string,
  certType?: '8a' | 'SDVOSB' | 'WOSB' | 'HUBZone',
  stateCode?: string,
  limit: number = 20
): Promise<SAMEntity[]> {
  const params: EntitySearchParams = {
    naicsCode,
    stateCode,
    registrationStatus: 'Active',
    size: limit
  };

  if (certType) {
    const certMap: Record<string, string> = {
      '8a': '2X',
      'SDVOSB': 'XY',
      'WOSB': '23',
      'HUBZone': 'XX'
    };
    params.sbaBusinessTypes = certMap[certType];
  }

  const result = await searchEntities(params);
  return result.entities;
}
