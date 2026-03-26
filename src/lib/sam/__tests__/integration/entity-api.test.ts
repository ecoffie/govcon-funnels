import { describe, it, expect, beforeAll } from 'vitest';
import { searchEntities, getEntityByCAGE, getEntityByUEI } from '../../entity-api';

// Skip if no API key (CI environment)
const runIntegration = !!process.env.SAM_API_KEY && process.env.SAM_API_KEY !== 'test-api-key';

describe.skipIf(!runIntegration)('Entity API - Integration Tests', () => {
  // Use Booz Allen Hamilton as a known test entity
  const KNOWN_CAGE = '17038';
  const KNOWN_COMPANY = 'BOOZ ALLEN';

  it('searches by CAGE code - known company', async () => {
    const result = await searchEntities({ cageCode: KNOWN_CAGE, size: 1 });

    expect(result).not.toBeNull();
    expect(result.entities.length).toBeGreaterThan(0);
    expect(result.entities[0].legalBusinessName.toUpperCase()).toContain('BOOZ');
    expect(result.entities[0].cageCode).toBe(KNOWN_CAGE);
  });

  it('searches by company name - partial match', async () => {
    const result = await searchEntities({ legalBusinessName: KNOWN_COMPANY, size: 10 });

    expect(result.entities.length).toBeGreaterThan(0);
    expect(result.totalCount).toBeGreaterThan(0);
    expect(result.entities.some(e => e.legalBusinessName.toUpperCase().includes('BOOZ'))).toBe(true);
  });

  it('returns empty for non-existent CAGE', async () => {
    const result = await searchEntities({ cageCode: 'ZZZZZ', size: 1 });

    expect(result.entities.length).toBe(0);
    expect(result.totalCount).toBe(0);
  });

  it('returns fromCache flag', async () => {
    // First call - should not be from cache
    const first = await searchEntities({ cageCode: KNOWN_CAGE, size: 1 });
    expect(typeof first.fromCache).toBe('boolean');

    // Note: Second call may or may not be from cache depending on Supabase config
  });

  it('includes required entity fields', async () => {
    const result = await searchEntities({ cageCode: KNOWN_CAGE, size: 1 });

    expect(result.entities.length).toBeGreaterThan(0);
    const entity = result.entities[0];

    // Check required fields exist
    expect(entity.ueiSAM).toBeDefined();
    expect(entity.cageCode).toBeDefined();
    expect(entity.legalBusinessName).toBeDefined();
    expect(entity.registrationStatus).toBeDefined();
    expect(typeof entity.isActive).toBe('boolean');
  });

  it('includes certification flags', async () => {
    const result = await searchEntities({ cageCode: KNOWN_CAGE, size: 1 });
    const entity = result.entities[0];

    expect(typeof entity.has8a).toBe('boolean');
    expect(typeof entity.hasSDVOSB).toBe('boolean');
    expect(typeof entity.hasWOSB).toBe('boolean');
    expect(typeof entity.hasHUBZone).toBe('boolean');
  });

  it('respects size parameter', async () => {
    const result = await searchEntities({ legalBusinessName: 'technology', size: 5 });

    expect(result.entities.length).toBeLessThanOrEqual(5);
    expect(result.pageSize).toBe(5);
  });
});

describe.skipIf(!runIntegration)('getEntityByCAGE - Integration Tests', () => {
  it('returns entity for valid CAGE code', async () => {
    const entity = await getEntityByCAGE('17038');

    expect(entity).not.toBeNull();
    expect(entity?.cageCode).toBe('17038');
  });

  it('returns null for invalid CAGE code', async () => {
    const entity = await getEntityByCAGE('ZZZZZ');

    expect(entity).toBeNull();
  });
});
