import { describe, it, expect } from 'vitest';
import { searchContractAwards, getExpiringContracts, getLowCompetitionContracts } from '../../contract-awards';

// Skip if no API key (CI environment)
const runIntegration = !!process.env.SAM_CONTRACT_AWARDS_API_KEY &&
  process.env.SAM_CONTRACT_AWARDS_API_KEY !== 'test-awards-key';

describe.skipIf(!runIntegration)('Contract Awards API - Integration Tests', () => {
  // Use a common NAICS code for testing
  const TEST_NAICS = '541512'; // Computer Systems Design

  it('searches contract awards by NAICS code', async () => {
    const result = await searchContractAwards({ naicsCode: TEST_NAICS, size: 10 });

    expect(result).not.toBeNull();
    expect(Array.isArray(result.contracts)).toBe(true);
    // May or may not have results depending on API data
    expect(typeof result.totalCount).toBe('number');
    expect(typeof result.fromCache).toBe('boolean');
  });

  it('respects size parameter', async () => {
    const result = await searchContractAwards({ naicsCode: TEST_NAICS, size: 5 });

    expect(result.contracts.length).toBeLessThanOrEqual(5);
    expect(result.pageSize).toBe(5);
  });

  it('includes required contract fields', async () => {
    const result = await searchContractAwards({ naicsCode: TEST_NAICS, size: 1 });

    if (result.contracts.length > 0) {
      const contract = result.contracts[0];

      // Check required fields exist
      expect(contract.piid).toBeDefined();
      expect(contract.recipientName).toBeDefined();
      expect(contract.awardingAgencyName).toBeDefined();
      expect(typeof contract.currentTotalValueOfAward).toBe('number');
      expect(typeof contract.isBaseAward).toBe('boolean');
      expect(contract.competitionLevel).toBeDefined();
    }
  });

  it('includes competition level classification', async () => {
    const result = await searchContractAwards({ naicsCode: TEST_NAICS, size: 10 });

    if (result.contracts.length > 0) {
      const contract = result.contracts[0];
      expect(['sole_source', 'low', 'medium', 'high']).toContain(contract.competitionLevel);
    }
  });

  it('calculates days until expiration', async () => {
    const result = await searchContractAwards({
      naicsCode: TEST_NAICS,
      expiresWithinDays: 365,
      size: 10
    });

    if (result.contracts.length > 0) {
      const contract = result.contracts[0];
      if (contract.daysUntilExpiration !== undefined) {
        expect(typeof contract.daysUntilExpiration).toBe('number');
        expect(contract.daysUntilExpiration).toBeLessThanOrEqual(365);
      }
    }
  });
});

describe.skipIf(!runIntegration)('getExpiringContracts - Integration Tests', () => {
  it('returns contracts sorted by expiration date', async () => {
    const contracts = await getExpiringContracts('541512', 12);

    if (contracts.length > 1) {
      for (let i = 1; i < contracts.length; i++) {
        const prev = contracts[i - 1].daysUntilExpiration ?? 999;
        const curr = contracts[i].daysUntilExpiration ?? 999;
        expect(prev).toBeLessThanOrEqual(curr);
      }
    }
  });
});

describe.skipIf(!runIntegration)('getLowCompetitionContracts - Integration Tests', () => {
  it('filters to low competition and sole source only', async () => {
    const contracts = await getLowCompetitionContracts('541512', 12);

    contracts.forEach(contract => {
      expect(['sole_source', 'low']).toContain(contract.competitionLevel);
    });
  });
});
