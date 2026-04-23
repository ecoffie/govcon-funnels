import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getExpiringContracts } from '../../contract-awards';

function createAwardSummary(piid: string, daysUntilExpiration: number) {
  const expirationDate = new Date(Date.now() + daysUntilExpiration * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  return {
    contractId: {
      piid,
      modNumber: '0',
    },
    coreData: {
      productOrServiceInformation: {
        principalNaics: [{ code: '541512', name: 'Computer Systems Design' }],
      },
      competitionInformation: {
        extentCompeted: { code: 'A', name: 'Full and Open Competition' },
      },
      organizationInformation: {
        contractingDepartment: { name: 'Department of Defense' },
        contractingSubtier: { name: 'Air Force' },
      },
      placeOfPerformance: {
        city: 'Tampa',
        state: { code: 'FL' },
        zip: '33621',
      },
    },
    awardDetails: {
      awardeeData: {
        awardeeHeader: { awardeeName: `Vendor ${piid}` },
        awardeeUEIInformation: { uniqueEntityId: `UEI-${piid}` },
      },
      competitionInformation: {
        numberOfOffersReceived: '3',
      },
      dates: {
        effectiveDate: '2025-01-01',
        ultimateCompletionDate: expirationDate,
      },
      dollars: {
        baseAndAllOptionsValue: 1000000,
        totalDollarsObligated: 250000,
      },
    },
  };
}

describe('Contract Awards - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('paginates through all SAM awards pages for expiring contracts', async () => {
    const firstPage = Array.from({ length: 100 }, (_, i) =>
      createAwardSummary(`PIID-${i + 1}`, 400 - i)
    );
    const secondPage = Array.from({ length: 100 }, (_, i) =>
      createAwardSummary(`PIID-${i + 101}`, 300 - i)
    );
    const thirdPage = Array.from({ length: 5 }, (_, i) =>
      createAwardSummary(`PIID-${i + 201}`, 50 - i)
    );

    vi.mocked(global.fetch)
      .mockResolvedValueOnce(new Response(JSON.stringify({
        awardSummary: firstPage,
        totalRecords: 205,
        limit: 100,
        offset: 0,
      }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        awardSummary: secondPage,
        totalRecords: 205,
        limit: 100,
        offset: 100,
      }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        awardSummary: thirdPage,
        totalRecords: 205,
        limit: 100,
        offset: 200,
      }), { status: 200 }));

    const contracts = await getExpiringContracts('541512', 12);

    expect(contracts).toHaveLength(205);
    expect(global.fetch).toHaveBeenCalledTimes(3);

    const firstRequestUrl = String(vi.mocked(global.fetch).mock.calls[0][0]);
    const secondRequestUrl = String(vi.mocked(global.fetch).mock.calls[1][0]);
    const thirdRequestUrl = String(vi.mocked(global.fetch).mock.calls[2][0]);

    expect(firstRequestUrl).toContain('offset=0');
    expect(secondRequestUrl).toContain('offset=100');
    expect(thirdRequestUrl).toContain('offset=200');

    for (let i = 1; i < contracts.length; i++) {
      const prev = contracts[i - 1].daysUntilExpiration ?? 999;
      const curr = contracts[i].daysUntilExpiration ?? 999;
      expect(prev).toBeLessThanOrEqual(curr);
    }
  });
});
