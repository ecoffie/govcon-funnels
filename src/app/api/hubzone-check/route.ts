import { NextRequest, NextResponse } from 'next/server';

/**
 * HUBZone address checker — proxies the SBA HUBZone map's own search endpoint
 * (maps.certify.sba.gov/hubzone/map/search) and returns clean JSON.
 *
 * The SBA endpoint answers as a jQuery payload for the map sidebar, but embeds
 * the full result as `var response = JSON.parse('{...}')` — we extract that
 * blob rather than scraping HTML. Requires the AJAX headers the map itself
 * sends plus `query_date`/`locale`, or it responds 406.
 *
 * GET /api/hubzone-check?q=<address>   (address string, geocoded by SBA)
 * GET /api/hubzone-check?latlng=<lat,lng>
 */

const SBA_BASE = 'https://maps.certify.sba.gov/hubzone/map/search';

// hz_type codes used by the SBA HUBZone API (USSBA/hubzone-api)
const HZ_TYPE_LABELS: Record<string, string> = {
  qct: 'Qualified Census Tract',
  qct_e: 'Qualified Census Tract',
  qct_r: 'Redesignated Census Tract',
  qnmc: 'Qualified Non-Metropolitan County',
  qnmc_e: 'Qualified Non-Metropolitan County',
  qnmc_r: 'Redesignated Non-Metropolitan County',
  indian_lands: 'Indian Lands',
  brac: 'Base Closure Area (BRAC)',
  qda: 'Qualified Disaster Area',
  qgda: 'Qualified Disaster Area',
  gov: 'Governor-Designated Covered Area',
};

interface SbaHubzoneEntry {
  county: string | null;
  state: string | null;
  current_status: string | null;
  prior_status: string | null;
  effective: string | null;
  expires: string | null;
  hz_type: string;
  tract_fips?: string | null;
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();
  const latlng = request.nextUrl.searchParams.get('latlng')?.trim();

  if (!q && !latlng) {
    return NextResponse.json({ error: 'Provide "q" (address) or "latlng" (lat,lng)' }, { status: 400 });
  }
  if (latlng && !/^-?\d{1,3}(\.\d+)?,\s*-?\d{1,3}(\.\d+)?$/.test(latlng)) {
    return NextResponse.json({ error: 'latlng must look like "38.8977,-77.0365"' }, { status: 400 });
  }

  const queryDate = new Date().toISOString().slice(0, 10);
  const params = latlng
    ? `latlng=${encodeURIComponent(latlng)}`
    : `search=${encodeURIComponent(q as string)}&jump=false`;
  const url = `${SBA_BASE}?${params}&query_date=${queryDate}&locale=en`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);

  try {
    const upstream = await fetch(url, {
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (compatible; GovConGiants HUBZone checker; +https://govcongiants.com)',
      },
      signal: controller.signal,
      // SBA designations change rarely (map refreshes are scheduled years apart)
      next: { revalidate: 86_400 },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `SBA map service responded ${upstream.status}. Try the official map instead.`, fallbackUrl: 'https://maps.certify.sba.gov/hubzone/map' },
        { status: 502 }
      );
    }

    const body = await upstream.text();
    const jsonMatch = body.match(/JSON\.parse\('([\s\S]*?)'\);/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Could not read the SBA map response. Try the official map instead.', fallbackUrl: 'https://maps.certify.sba.gov/hubzone/map' },
        { status: 502 }
      );
    }

    const data = JSON.parse(jsonMatch[1].replace(/\\'/g, "'"));

    // No geocode hit → the address wasn't found. Never report that as
    // "Not Qualified" — a typo must not read like a real negative result.
    if (!data.geometry?.location) {
      return NextResponse.json(
        { error: 'Could not find that address. Try adding the city, state, or ZIP code.' },
        { status: 404 }
      );
    }

    const entries: SbaHubzoneEntry[] = Array.isArray(data.hubzone) ? data.hubzone : [];

    // The human-readable verdict lives in the sidebar HTML — use it as the
    // authoritative label ("Qualified HUBZone" / "Not Qualified" / redesignated).
    const statusMatch = body.match(/id=\\"hubzone-status\\"[^>]*>([^<]+)</);
    const statusLabel = statusMatch ? statusMatch[1].trim() : entries.length > 0 ? 'Qualified HUBZone' : 'Not Qualified';
    const nextEvalMatch = body.match(/Next evaluation date\s*:\s*([0-9]{4})/);

    const designations = entries.map((e) => ({
      type: e.hz_type,
      label: HZ_TYPE_LABELS[e.hz_type] ?? e.hz_type,
      county: e.county,
      state: e.state,
      status: e.current_status,
      effective: e.effective,
      expires: e.expires,
    }));

    return NextResponse.json(
      {
        qualified: /qualified/i.test(statusLabel) && !/not qualified/i.test(statusLabel),
        statusLabel,
        formattedAddress: data.formatted_address ?? null,
        location: data.geometry?.location ?? null,
        designations,
        untilDate: data.until_date ?? null,
        nextEvaluationYear: nextEvalMatch ? nextEvalMatch[1] : null,
        queryDate: data.query_date ?? queryDate,
        source: 'SBA HUBZone Map (maps.certify.sba.gov)',
      },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } }
    );
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError';
    return NextResponse.json(
      { error: aborted ? 'SBA map service timed out. Try the official map instead.' : 'Lookup failed. Try the official map instead.', fallbackUrl: 'https://maps.certify.sba.gov/hubzone/map' },
      { status: 502 }
    );
  } finally {
    clearTimeout(timer);
  }
}
