#!/usr/bin/env node
/**
 * export-agency-enrichment.js
 *
 * Bakes market-assassin's richer agency data into the funnels SEO pages
 * (/data/agencies/[slug]). The public pages were rendering hand-written static
 * content (5 pain points, 5 priorities, no contacts); the real databases now
 * carry far more. We export a static snapshot (decision: bake-in, not live-API —
 * fast + SEO-stable + no cross-project runtime dependency).
 *
 * Sources (read-only) from market-assassin/src/data:
 *   - agency-pain-points.json   → 307 agencies × {painPoints[10], priorities[10]}
 *   - agency-budget-data.json   → 47 toptier agencies × FY25/FY26 budget authority + trend
 *   - contractors.json          → 2,768 SBLO/prime subcontracting contacts, agency-tagged
 *
 * Output: src/content/agency-enrichment.json, keyed by EXACT agency name (matches
 * the `name` field in src/content/agencies/index.ts). The page merges by name.
 *
 * Re-run after the source databases refresh:
 *   node scripts/export-agency-enrichment.js
 *
 * Contacts policy: we export only a COUNT + sample agency tokens, never the PII.
 * The 125K live gov POCs stay members-only; even the semi-public SBLO file is
 * counted, not listed, on the public page (count + teaser → Mindy Pro CTA).
 */
const fs = require('fs');
const path = require('path');

const MA = '/Users/ericcoffie/Market Assasin/market-assassin/src/data';
const OUT = path.join(__dirname, '..', 'src', 'content', 'agency-enrichment.json');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// Normalize an agency string for fuzzy matching between datasets. The SBLO file
// uses tokens like "DEPT OF THE NAVY"; budget + pain-points use "Department of
// the Navy". Lowercase, strip punctuation, expand the common "DEPT" abbrev.
function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\bdept\b/g, 'department')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const painPointsData = readJson(path.join(MA, 'agency-pain-points.json')).agencies || {};
const budgetData = readJson(path.join(MA, 'agency-budget-data.json')).agencies || {};
const contractors = readJson(path.join(MA, 'contractors.json'));

// --- Contact counts per agency token (from the SBLO subcontracting file) ---
// These are prime contractors with subcontracting plans tagged to an agency —
// real subcontracting-opportunity leads. Count by normalized agency token.
const contactCountByNorm = {};
for (const r of contractors) {
  const ag = r.agencies;
  if (!ag) continue;
  const tokens = Array.isArray(ag) ? ag : String(ag).split(',');
  // The token may be a full "ENERGY, DEPARTMENT OF" that got split on the comma;
  // re-join handled below by counting the whole string once per record.
  const key = norm(Array.isArray(ag) ? ag.join(' ') : ag);
  if (key) contactCountByNorm[key] = (contactCountByNorm[key] || 0) + 1;
  // Also index by each significant token so "navy" matches "DEPT OF THE NAVY".
  void tokens;
}

// Build a normalized → count lookup that also matches on substring (so the page
// agency "Department of the Navy" finds the "dept of the navy" SBLO bucket).
function contactCountFor(agencyName) {
  const target = norm(agencyName);
  if (!target) return 0;
  let total = 0;
  for (const [k, n] of Object.entries(contactCountByNorm)) {
    // Match when either contains the other's distinctive words (navy, army, etc.)
    if (k === target || k.includes(target) || target.includes(k)) total += n;
  }
  return total;
}

// --- Merge into one enrichment object keyed by EXACT pain-points agency name ---
// (Those names match the funnels content `name` field for the 35 covered agencies,
// and cover 307 total so future agency pages get data too.)
const enrichment = {};
const allNames = new Set([...Object.keys(painPointsData), ...Object.keys(budgetData)]);

for (const name of allNames) {
  const pp = painPointsData[name] || {};
  const budget = budgetData[name] || null;
  const contactCount = contactCountFor(name);

  enrichment[name] = {
    painPoints: Array.isArray(pp.painPoints) ? pp.painPoints : [],
    priorities: Array.isArray(pp.priorities) ? pp.priorities : [],
    budget: budget
      ? {
          fy2025: budget.fy2025?.budgetAuthority ?? null,
          fy2026: budget.fy2026?.budgetAuthority ?? null,
          changePercent: budget.change?.percent ?? null,
          trend: budget.change?.trend ?? null,
        }
      : null,
    // Contacts: count only (PII gated to Mindy Pro). 0 = no teaser shown.
    subcontractingContacts: contactCount,
  };
}

const meta = {
  _generatedFrom: 'market-assassin/src/data {agency-pain-points, agency-budget-data, contractors}',
  _agenciesWithPainPoints: Object.values(enrichment).filter((e) => e.painPoints.length).length,
  _agenciesWithBudget: Object.values(enrichment).filter((e) => e.budget).length,
  _totalAgencies: Object.keys(enrichment).length,
};

fs.writeFileSync(OUT, JSON.stringify({ _meta: meta, agencies: enrichment }, null, 2));
console.log('Wrote', OUT);
console.log(meta);
