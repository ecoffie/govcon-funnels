#!/usr/bin/env node
/**
 * Test script for Go High Level integration
 * This simulates what happens when a form is submitted
 */

const testLead = {
  name: "Test User",
  email: "test@example.com",
  phone: "555-0100",
  source: "bootcamp",
};

console.log("\n🧪 TESTING GO HIGH LEVEL INTEGRATION\n");
console.log("=" .repeat(60));

// Check environment variables
console.log("\n📋 Step 1: Checking Environment Variables\n");

const hasApiKey = process.env.GHL_API_KEY && process.env.GHL_API_KEY.trim() !== '';
const hasLocationId = process.env.GHL_LOCATION_ID && process.env.GHL_LOCATION_ID.trim() !== '';

console.log(`GHL_API_KEY: ${hasApiKey ? '✅ Set' : '❌ Not set'}`);
console.log(`GHL_LOCATION_ID: ${hasLocationId ? '✅ Set' : '❌ Not set'}`);

if (!hasApiKey || !hasLocationId) {
  console.log("\n⚠️  CREDENTIALS MISSING");
  console.log("\nTo get your credentials:");
  console.log("1. Login to https://app.gohighlevel.com");
  console.log("2. Go to Settings → Company → API Keys");
  console.log("3. Create a new API key with 'Contacts' permissions");
  console.log("4. Get your Location ID from Settings → Business Profile");
  console.log("5. Add them to .env.local:\n");
  console.log("   GHL_API_KEY=your_api_key_here");
  console.log("   GHL_LOCATION_ID=your_location_id_here");
  console.log("\n" + "=".repeat(60) + "\n");

  // Still show what WOULD be sent
  console.log("📦 This is what WOULD be sent to Go High Level:\n");
  showPayload(testLead);
  process.exit(0);
}

// If credentials are set, test the actual API
console.log("\n✅ Credentials found! Testing actual API call...\n");

async function testGoHighLevel() {
  const [firstName, ...lastParts] = testLead.name.trim().split(/\s+/);
  const lastName = lastParts.join(' ') || '';

  const payload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName: firstName || 'Unknown',
    lastName,
    email: testLead.email,
    phone: testLead.phone || '',
    source: testLead.source,
    tags: [`funnel-${testLead.source}`, testLead.source],
  };

  console.log("📦 Payload being sent to Go High Level:\n");
  console.log(JSON.stringify(payload, null, 2));
  console.log("\n" + "=".repeat(60));

  try {
    console.log("\n🚀 Sending request to Go High Level API...\n");

    const res = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log(`Status: ${res.status} ${res.statusText}`);

    if (!res.ok) {
      const text = await res.text();
      console.log("\n❌ ERROR Response:");
      console.log(text);

      if (res.status === 401) {
        console.log("\n💡 TIP: Your API key is invalid or expired.");
        console.log("   Generate a new one in Go High Level Settings → API Keys");
      } else if (res.status === 403) {
        console.log("\n💡 TIP: Your API key doesn't have 'Contacts' permissions.");
        console.log("   Edit your API key and enable Contacts read/write.");
      }

      process.exit(1);
    }

    const data = await res.json();
    console.log("\n✅ SUCCESS! Contact created/updated in Go High Level\n");
    console.log("Response data:");
    console.log(JSON.stringify(data, null, 2));

    console.log("\n" + "=".repeat(60));
    console.log("\n🎉 Integration is working correctly!");
    console.log("\n✅ Next steps:");
    console.log("   1. Check Go High Level contacts for: " + testLead.email);
    console.log("   2. Verify the contact has tags: funnel-bootcamp, bootcamp");
    console.log("   3. Test a real form submission on your site");
    console.log("\n" + "=".repeat(60) + "\n");

  } catch (error) {
    console.log("\n❌ REQUEST FAILED");
    console.log(error.message);
    process.exit(1);
  }
}

function showPayload(lead) {
  const [firstName, ...lastParts] = lead.name.trim().split(/\s+/);
  const lastName = lastParts.join(' ') || '';

  const payload = {
    locationId: "YOUR_LOCATION_ID",
    firstName: firstName || 'Unknown',
    lastName,
    email: lead.email,
    phone: lead.phone || '',
    source: lead.source,
    tags: [`funnel-${lead.source}`, lead.source],
  };

  console.log(JSON.stringify(payload, null, 2));
  console.log("\n" + "=".repeat(60) + "\n");
}

// Run the test
if (hasApiKey && hasLocationId) {
  testGoHighLevel();
}
