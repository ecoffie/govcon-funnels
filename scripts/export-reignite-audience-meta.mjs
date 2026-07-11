/**
 * Export the mindy-profile-incomplete alumni as a Meta Custom Audience CSV.
 *
 * READ-ONLY on GHL (paginated /contacts/search). Writes a local CSV of PII for
 * upload to Meta Business Manager → Audiences → Customer List. Meta hashes the
 * fields client-side on upload; we send them in the column names Meta expects.
 *
 * Why retargeting (not more email): these 4,308 are cold, never-activated bootcamp
 * alumni on a 15%-open / 0%-click / spam-foldering sender. Two weeks of drip
 * plumbing didn't move them. Ads sidestep the inbox entirely. (See
 * tasks/mindy-reignite-launch-state.md + the channel-rethink 2026-07-08.)
 *
 * Usage:
 *   GHL_API_KEY=pit-...  node scripts/export-reignite-audience-meta.mjs
 *   → writes ./reignite-meta-audience.csv (move it somewhere safe; it's PII)
 */
import fs from 'node:fs';

const TOKEN = process.env.GHL_API_KEY;
const LOCATION = process.env.GHL_LOCATION_ID || 'AMkIivLuREYwsX5GhAAL';
const TAG = 'mindy-profile-incomplete';
const OUT = process.env.OUT || './reignite-meta-audience.csv';
if (!TOKEN) { console.error('❌ set GHL_API_KEY'); process.exit(1); }

const BASE = 'https://services.leadconnectorhq.com';
const H = { Authorization: `Bearer ${TOKEN}`, Version: '2021-07-28', 'Content-Type': 'application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Meta Customer List column headers (Meta normalizes + hashes these on upload).
const HEADERS = ['email', 'phone', 'fn', 'ln', 'ct', 'st', 'zip', 'country'];

const csvCell = (v) => {
  const s = (v ?? '').toString().trim();
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// Meta wants E.164-ish phones (digits, leading country code). Best-effort.
const normPhone = (p) => {
  if (!p) return '';
  const d = p.replace(/[^\d]/g, '');
  if (!d) return '';
  return d.length === 10 ? `1${d}` : d; // assume US if 10 digits
};

async function searchPage(searchAfter) {
  const body = { locationId: LOCATION, pageLimit: 100, filters: [{ field: 'tags', operator: 'contains', value: TAG }] };
  if (searchAfter) body.searchAfter = searchAfter;
  for (let attempt = 0; attempt < 4; attempt++) {
    const r = await fetch(`${BASE}/contacts/search`, { method: 'POST', headers: H, body: JSON.stringify(body) });
    if (r.ok) return r.json();
    if (r.status === 401 || r.status === 403) throw new Error(`GHL auth ${r.status}: ${(await r.text()).slice(0, 120)}`);
    await sleep(500 * 2 ** attempt);
  }
  throw new Error('search failed after retries');
}

async function main() {
  const rows = [HEADERS.join(',')];
  const seen = new Set();
  let searchAfter = null, page = 0, exported = 0, skippedNoContact = 0, dnd = 0;

  while (true) {
    const j = await searchPage(searchAfter);
    const contacts = j.contacts || [];
    if (!contacts.length) break;
    page++;
    for (const c of contacts) {
      if (seen.has(c.id)) continue; // dedupe across pages
      seen.add(c.id);
      // Skip email-DND (already opted out of email; don't re-target the annoyed).
      const emailDnd = c.dnd || c.dndSettings?.Email?.status === 'active';
      if (emailDnd) { dnd++; continue; }
      const email = (c.email || '').trim().toLowerCase();
      const phone = normPhone(c.phone);
      if (!email && !phone) { skippedNoContact++; continue; } // Meta needs at least one identifier
      rows.push([
        csvCell(email), csvCell(phone), csvCell((c.firstName || '').toLowerCase()),
        csvCell((c.lastName || '').toLowerCase()), csvCell((c.city || '').toLowerCase()),
        csvCell((c.state || '').toLowerCase()), csvCell(c.postalCode || ''),
        csvCell((c.country || 'US').toLowerCase()),
      ].join(','));
      exported++;
    }
    // GHL keyset pagination: the last contact's searchAfter cursor.
    searchAfter = contacts[contacts.length - 1]?.searchAfter;
    if (!searchAfter || contacts.length < 100) break;
    if (page % 5 === 0) console.log(`  …page ${page}, ${exported} exported`);
    await sleep(150);
  }

  fs.writeFileSync(OUT, rows.join('\n'));
  console.log(`\n✅ ${exported} contacts → ${OUT}`);
  console.log(`   skipped: ${dnd} email-DND (opted out), ${skippedNoContact} no email/phone`);
  console.log(`\n⚠️  ${OUT} contains PII. Upload to Meta Business Manager → Audiences → Customer List, then delete the local file.`);
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
