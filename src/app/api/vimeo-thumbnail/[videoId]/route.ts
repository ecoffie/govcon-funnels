import { NextRequest, NextResponse } from 'next/server';

/**
 * Fetches Vimeo video thumbnail via oEmbed API.
 * Replaces vumbnail.com which returns HTTP 500.
 * Usage: <img src="/api/vimeo-thumbnail/763400851" alt="..." />
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;
  if (!videoId) {
    return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`,
      { next: { revalidate: 86400 } } // Cache 24 hours
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: `Vimeo oEmbed failed: ${res.status}` },
        { status: res.status }
      );
    }
    const data = (await res.json()) as { thumbnail_url?: string };
    const thumbnailUrl = data?.thumbnail_url;
    if (!thumbnailUrl) {
      return NextResponse.json(
        { error: 'No thumbnail in oEmbed response' },
        { status: 404 }
      );
    }
    return NextResponse.redirect(thumbnailUrl, 302);
  } catch (err) {
    console.error('[vimeo-thumbnail]', err);
    return NextResponse.json(
      { error: 'Failed to fetch thumbnail' },
      { status: 500 }
    );
  }
}
