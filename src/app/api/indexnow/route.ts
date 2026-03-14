import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'ee86d2341492c65ffc9fcdb4cde80e41';
const SITE_HOST = 'govcongiants.org';

// All indexable URLs on the site
const SITE_URLS = [
  '/',
  '/guides',
  '/guides/government-contracting-for-beginners',
  '/guides/sam-gov-registration',
  '/guides/cage-code',
  '/guides/capability-statement',
  '/guides/sba-certifications',
  '/guides/8a-certification',
  '/guides/vosb-certification',
  '/guides/hubzone-certification',
  '/guides/wosb-certification',
  '/guides/finding-government-contracts',
  '/guides/proposal-writing',
  '/guides/subcontracting-and-teaming',
  '/guides/federal-market-research',
  '/guides/gsa-schedule',
  '/guides/ai-government-contracting',
  '/government-contract-help',
  '/proposal-writing-services',
  '/glossary',
  '/tools',
  '/consulting',
  '/free-course',
  '/blog',
  '/march-surge',
];

/**
 * POST /api/indexnow
 * Submits URLs to IndexNow (Bing, Yandex, and participating search engines)
 *
 * Body options:
 * - { "urls": ["/path1", "/path2"] } - Submit specific URLs
 * - { "all": true } - Submit all site URLs
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let urlsToSubmit: string[] = [];

    if (body.all) {
      urlsToSubmit = SITE_URLS;
    } else if (body.urls && Array.isArray(body.urls)) {
      urlsToSubmit = body.urls;
    } else {
      return NextResponse.json(
        { error: 'Provide "urls" array or "all": true' },
        { status: 400 }
      );
    }

    // Convert paths to full URLs
    const fullUrls = urlsToSubmit.map(path =>
      path.startsWith('http') ? path : `https://${SITE_HOST}${path}`
    );

    // IndexNow API payload
    const payload = {
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: fullUrls,
    };

    // Submit to IndexNow (Bing endpoint - shared with other engines)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        submitted: fullUrls.length,
        urls: fullUrls,
        status: response.status,
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: 'IndexNow submission failed',
          status: response.status,
          details: errorText
        },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 * Returns IndexNow configuration status
 */
export async function GET() {
  return NextResponse.json({
    enabled: true,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlCount: SITE_URLS.length,
    endpoints: {
      submitAll: 'POST /api/indexnow with { "all": true }',
      submitSpecific: 'POST /api/indexnow with { "urls": ["/path1", "/path2"] }',
    },
  });
}
