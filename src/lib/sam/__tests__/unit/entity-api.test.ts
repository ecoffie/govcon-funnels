import { beforeEach, describe, it, expect, vi } from 'vitest';
import { searchEntities, transformEntity, validateCAGECode } from '../../entity-api';

describe('Entity API - Unit Tests', () => {
  describe('validateCAGECode', () => {
    it('accepts valid 5-char alphanumeric', () => {
      expect(validateCAGECode('1ABC2')).toBe(true);
      expect(validateCAGECode('ABCDE')).toBe(true);
      expect(validateCAGECode('17038')).toBe(true);
    });

    it('rejects invalid formats', () => {
      expect(validateCAGECode('ABC')).toBe(false);    // Too short
      expect(validateCAGECode('ABCDEF')).toBe(false); // Too long
      expect(validateCAGECode('ABC-E')).toBe(false);  // Special char
    });
  });

  describe('transformEntity', () => {
    // Helper to create SAM.gov API v3 nested structure
    function createRawEntity(overrides: {
      registration?: Record<string, unknown>;
      coreData?: Record<string, unknown>;
      assertions?: Record<string, unknown>;
      pointsOfContact?: Record<string, unknown>;
    } = {}) {
      return {
        entityRegistration: {
          ueiSAM: 'ABC123XYZ789',
          cageCode: '17038',
          legalBusinessName: 'BOOZ ALLEN HAMILTON INC',
          dbaName: null,
          registrationStatus: 'Active',
          registrationExpirationDate: '2027-01-15',
          ...overrides.registration,
        },
        coreData: {
          physicalAddress: {
            city: 'McLean',
            stateOrProvinceCode: 'VA',
            zipCode: '22102',
            countryCode: 'USA',
          },
          mailingAddress: {},
          businessTypes: {
            sbaBusinessTypeList: [],
          },
          generalInformation: {},
          ...overrides.coreData,
        },
        assertions: {
          goodsAndServices: {
            primaryNaics: '541512',
            naicsList: [],
            pscList: [],
          },
          ...overrides.assertions,
        },
        pointsOfContact: {
          ...overrides.pointsOfContact,
        },
      };
    }

    it('transforms raw API response correctly', () => {
      const raw = createRawEntity({
        coreData: {
          physicalAddress: {
            city: 'McLean',
            stateOrProvinceCode: 'VA',
            zipCode: '22102',
            countryCode: 'USA',
          },
          businessTypes: {
            sbaBusinessTypeList: [
              { sbaBusinessTypeCode: '2X' }, // 8(a)
              { sbaBusinessTypeCode: 'XY' }, // SDVOSB
            ],
          },
        },
      });

      const result = transformEntity(raw);

      expect(result.ueiSAM).toBe('ABC123XYZ789');
      expect(result.cageCode).toBe('17038');
      expect(result.legalBusinessName).toBe('BOOZ ALLEN HAMILTON INC');
      expect(result.isActive).toBe(true);
      expect(result.has8a).toBe(true);
      expect(result.hasSDVOSB).toBe(true);
      expect(result.physicalAddress?.city).toBe('McLean');
      expect(result.physicalAddress?.stateOrProvince).toBe('VA');
    });

    it('handles missing fields gracefully', () => {
      const raw = {
        entityRegistration: { ueiSAM: 'ABC123' },
      };

      const result = transformEntity(raw);

      expect(result.ueiSAM).toBe('ABC123');
      expect(result.cageCode).toBe('');
      expect(result.legalBusinessName).toBe('');
      expect(result.isActive).toBe(false);
      expect(result.has8a).toBe(false);
      expect(result.hasSDVOSB).toBe(false);
      expect(result.hasWOSB).toBe(false);
      expect(result.hasHUBZone).toBe(false);
    });

    it('calculates daysUntilExpiration correctly', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 100);

      const raw = createRawEntity({
        registration: {
          registrationExpirationDate: futureDate.toISOString().split('T')[0],
        },
      });

      const result = transformEntity(raw);

      // Should be approximately 100 days (allow 1 day variance for timing)
      expect(result.daysUntilExpiration).toBeGreaterThanOrEqual(99);
      expect(result.daysUntilExpiration).toBeLessThanOrEqual(101);
    });

    it('maps SBA business type codes to readable names', () => {
      const raw = createRawEntity({
        coreData: {
          businessTypes: {
            sbaBusinessTypeList: [
              { sbaBusinessTypeCode: '2X' }, // 8(a)
              { sbaBusinessTypeCode: 'XX' }, // HUBZone
              { sbaBusinessTypeCode: 'XY' }, // SDVOSB
              { sbaBusinessTypeCode: '23' }, // WOSB
            ],
          },
        },
      });

      const result = transformEntity(raw);

      expect(result.certifications?.sbaBusinessTypes).toContain('8(a)');
      expect(result.certifications?.sbaBusinessTypes).toContain('HUBZone');
      expect(result.certifications?.sbaBusinessTypes).toContain('SDVOSB');
      expect(result.certifications?.sbaBusinessTypes).toContain('WOSB');
    });

    it('parses NAICS list correctly', () => {
      const raw = createRawEntity({
        assertions: {
          goodsAndServices: {
            primaryNaics: '541512',
            naicsList: [
              { naicsCode: '541512', naicsDescription: 'Computer Systems Design' },
              { naicsCode: '541611', naicsDescription: 'Management Consulting' },
            ],
          },
        },
      });

      const result = transformEntity(raw);

      expect(result.naicsList).toHaveLength(2);
      expect(result.naicsList?.[0].naicsCode).toBe('541512');
      expect(result.naicsList?.[0].isPrimary).toBe(true); // Matches primaryNaics
      expect(result.naicsList?.[1].naicsCode).toBe('541611');
      expect(result.naicsList?.[1].isPrimary).toBe(false);
    });

    it('parses points of contact correctly', () => {
      const raw = createRawEntity({
        pointsOfContact: {
          governmentBusinessPOC: {
            firstName: 'John',
            lastName: 'Doe',
            title: 'CEO',
          },
          electronicBusinessPOC: {
            firstName: 'Jane',
            lastName: 'Smith',
          },
        },
      });

      const result = transformEntity(raw);

      expect(result.pointsOfContact).toHaveLength(2);
      expect(result.pointsOfContact?.[0].name).toBe('John Doe');
      expect(result.pointsOfContact?.[1].name).toBe('Jane Smith');
    });

    it('handles inactive registration status', () => {
      const raw = createRawEntity({
        registration: { registrationStatus: 'Inactive' },
      });

      const result = transformEntity(raw);

      expect(result.isActive).toBe(false);
      expect(result.registrationStatus).toBe('Inactive');
    });

    it('handles expired registration status', () => {
      const raw = createRawEntity({
        registration: { registrationStatus: 'Expired' },
      });

      const result = transformEntity(raw);

      expect(result.isActive).toBe(false);
      expect(result.registrationStatus).toBe('Expired');
    });

    it('handles DBA name when present', () => {
      const raw = createRawEntity({
        registration: {
          legalBusinessName: 'Main Company LLC',
          dbaName: 'Doing Business Name',
        },
      });

      const result = transformEntity(raw);

      expect(result.legalBusinessName).toBe('Main Company LLC');
      expect(result.dbaName).toBe('Doing Business Name');
    });
  });

  describe('searchEntities', () => {
    beforeEach(() => {
      process.env.SAM_ENTITY_API_KEY = 'entity-error-key';
      delete process.env.SAM_API_KEY_BACKUP;
    });

    it('propagates SAM.gov request errors to callers', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'SAM outage' }), { status: 503 })
      );

      const result = await searchEntities({ cageCode: '1ABC2', size: 1 });

      expect(result.entities).toEqual([]);
      expect(result.totalCount).toBe(0);
      expect(result.error?.status).toBe(503);
      expect(result.error?.message).toBe('SAM outage');
    });
  });
});
