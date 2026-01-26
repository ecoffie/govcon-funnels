import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, source } = body;

    // Log the lead (in production, integrate with GoHighLevel or your CRM)
    console.log('New lead:', { name, email, phone, source, timestamp: new Date().toISOString() });

    // Optional: Send to GoHighLevel
    if (process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID) {
      try {
        await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: name?.split(' ')[0] || '',
            lastName: name?.split(' ').slice(1).join(' ') || '',
            email,
            phone,
            source,
            locationId: process.env.GHL_LOCATION_ID,
            tags: [`funnel-${source}`]
          })
        });
      } catch (ghlError) {
        console.error('GHL API error:', ghlError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
