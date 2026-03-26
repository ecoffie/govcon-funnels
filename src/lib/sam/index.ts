/**
 * SAM.gov API Integration
 *
 * Unified export for all SAM.gov API wrappers
 *
 * For govcon-funnels (lead magnets):
 * - Entity API: CAGE code lookup tool
 * - Contract Awards API: Expiring contracts finder
 */

// Shared utilities
export {
  SAM_API_CONFIGS,
  makeSAMRequest,
  checkCache,
  storeInCache,
  checkRateLimit,
  getRateLimitStatus,
  cleanExpiredCache,
  withRetry,
  generateCacheKey,
  validateCAGECode
} from './utils';

export type {
  SAMAPIConfig,
  CacheEntry,
  SAMError
} from './utils';

// Contract Awards API
export {
  searchContractAwards,
  getExpiringContracts,
  getContractFamily,
  getContractsByIncumbent,
  getLowCompetitionContracts,
  getTroubledContracts,
  aggregateContractIntelligence
} from './contract-awards';

export type {
  ContractAward,
  ContractAwardSearchParams,
  ContractAwardSearchResult,
  ContractFamily,
  ContractIntelligence
} from './contract-awards';

// Entity Management API
export {
  searchEntities,
  getEntityByUEI,
  getEntityByCAGE,
  verifySAMStatus,
  getCertifications,
  searchByCertification,
  getEntityNAICS,
  findTeamingPartners,
  transformEntity
} from './entity-api';

export type {
  SAMEntity,
  EntitySearchParams,
  EntitySearchResult
} from './entity-api';
