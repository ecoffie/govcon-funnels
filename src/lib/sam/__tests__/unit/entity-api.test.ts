import { describe, it, expect, vi, beforeEach } from 'vitest';
import { transformEntity, validateCAGECode } from '../../entity-api';

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
    it('transforms raw API response correctly', () => {
      const raw = {
        ueiSAM: 'ABC123XYZ789',
        cageCode: '17038',
        legalBusinessName: 'BOOZ ALLEN HAMILTON INC',
        registrationStatus: 'Active',
        registrationExpirationDate: '2027-01-15',
        sbaBusinessTypes: ['2X', 'XY'], // 8(a) and SDVOSB
        physicalAddress: {
          city: 'McLean',
          stateOrProvince: 'VA',
          zipCode: '22102',
          countryCode: 'USA',
        },
      };

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
      const raw = { ueiSAM: 'ABC123' };

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

      const raw = {
        ueiSAM: 'ABC123',
        registrationExpirationDate: futureDate.toISOString().split('T')[0],
      };

      const result = transformEntity(raw);

      // Should be approximately 100 days (allow 1 day variance for timing)
      expect(result.daysUntilExpiration).toBeGreaterThanOrEqual(99);
      expect(result.daysUntilExpiration).toBeLessThanOrEqual(101);
    });

    it('maps SBA business type codes to readable names', () => {
      const raw = {
        ueiSAM: 'ABC123',
        sbaBusinessTypes: ['2X', 'XX', 'XY', '23'],
      };

      const result = transformEntity(raw);

      expect(result.certifications?.sbaBusinessTypes).toContain('8(a)');
      expect(result.certifications?.sbaBusinessTypes).toContain('HUBZone');
      expect(result.certifications?.sbaBusinessTypes).toContain('SDVOSB');
      expect(result.certifications?.sbaBusinessTypes).toContain('WOSB');
    });

    it('parses NAICS list correctly', () => {
      const raw = {
        ueiSAM: 'ABC123',
        naicsList: [
          { naicsCode: '541512', naicsDescription: 'Computer Systems Design', isPrimary: true },
          { naicsCode: '541611', naicsDescription: 'Management Consulting', isPrimary: false },
        ],
      };

      const result = transformEntity(raw);

      expect(result.naicsList).toHaveLength(2);
      expect(result.naicsList?.[0].naicsCode).toBe('541512');
      expect(result.naicsList?.[0].isPrimary).toBe(true);
      expect(result.naicsList?.[1].naicsCode).toBe('541611');
      expect(result.naicsList?.[1].isPrimary).toBe(false);
    });

    it('parses points of contact correctly', () => {
      const raw = {
        ueiSAM: 'ABC123',
        pocList: [
          { name: 'John Doe', title: 'CEO', phone: '555-1234', email: 'john@example.com', type: 'Government' },
        ],
      };

      const result = transformEntity(raw);

      expect(result.pointsOfContact).toHaveLength(1);
      expect(result.pointsOfContact?.[0].name).toBe('John Doe');
      expect(result.pointsOfContact?.[0].email).toBe('john@example.com');
    });

    it('handles inactive registration status', () => {
      const raw = {
        ueiSAM: 'ABC123',
        registrationStatus: 'Inactive',
      };

      const result = transformEntity(raw);

      expect(result.isActive).toBe(false);
      expect(result.registrationStatus).toBe('Inactive');
    });

    it('handles expired registration status', () => {
      const raw = {
        ueiSAM: 'ABC123',
        registrationStatus: 'Expired',
      };

      const result = transformEntity(raw);

      expect(result.isActive).toBe(false);
      expect(result.registrationStatus).toBe('Expired');
    });

    it('handles DBA name when present', () => {
      const raw = {
        ueiSAM: 'ABC123',
        legalBusinessName: 'Main Company LLC',
        dbaName: 'Doing Business Name',
      };

      const result = transformEntity(raw);

      expect(result.legalBusinessName).toBe('Main Company LLC');
      expect(result.dbaName).toBe('Doing Business Name');
    });
  });
});
