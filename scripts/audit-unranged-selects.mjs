#!/usr/bin/env node
/**
 * Guard: find PostgREST/Supabase row-returning selects that have no explicit bound.
 *
 * WHY THIS EXISTS
 * ---------------
 * Supabase caps any select at `db-max-rows` (1,000) and does NOT error when it
 * truncates. A capped read is invisible: the query "succeeds", returns 1,000 rows,
 * and the caller believes that is the whole table. In this repo that shape shipped
 * three times in `src/lib/supabase-leads.ts` — the registrant readers behind the
 * webinar-link blasts. At 1,001 registrants the 1,001st person silently stops
 * receiving the link and the signup counter freezes while real people keep signing
 * up. Fixed in PR #170; `funnel_leads.source='mindy-launch'` reached 950 rows the
 * same day, so the margin was ~50 signups.
 *
 * A select is considered BOUND if it has any of:
 *   .range(...)                 explicit page window (the paged-read fix)
 *   .limit(...)                 caller-chosen ceiling
 *   .single() / .maybeSingle()  exactly one row
 *   { head: true }              returns a count, never rows — cannot truncate
 *   .csv() / .explain()         not a row array
 * ...or is inside a function this file marks as a pager (see PAGER_HINTS): the
 * helper itself calls .range(), so its callers are bound by construction.
 *
 * USAGE
 *   node scripts/audit-unranged-selects.mjs            # audit, exit 1 on findings
 *   node scripts/audit-unranged-selects.mjs --list     # list every site + verdict
 *   node scripts/audit-unranged-selects.mjs --self-test # negative control
 *
 * Exit 0 = clean, 1 = unbounded select found, 2 = the audit itself broke.
 *
 * DELIBERATELY a regex/text scanner, not a TS AST pass: it must run with plain
 * `node` and zero dependencies so CI can never skip it for an install failure.
 * That trade means it reasons over a bounded window of text after each `.select(`;
 * ALLOWLIST exists for the cases where that window can't see the whole story.
 */

import { readFileSync, readdirSync, statSync, writeFileSync, unlinkSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SCAN_DIRS = ['src'];
const EXTS = new Set(['.ts', '.tsx']);

/** How far after `.select(` to look for a bound. Chains here are <= ~8 lines. */
const WINDOW_CHARS = 600;

/**
 * Helpers that page internally (they call .range() themselves). A select passed
 * INTO one of these as a builder callback is bound by construction.
 * Keep this list tiny and justified — each entry is a promise that the helper pages.
 */
const PAGER_HINTS = [
  'fetchAllRows', // src/lib/supabase-leads.ts — module-private, pages via .range()
  'fetchAllLeadRows', // src/lib/supabase-paging.ts — shared, pages via .range()
];

/**
 * Known-and-accepted unbounded selects. Every entry needs a REASON that says why
 * truncation is harmless here. Reviewed whenever this guard fires.
 * Match is `file:line` after the symbol on that line is confirmed to still be a select.
 */
const ALLOWLIST = [
  {
    file: 'src/lib/sam/utils.ts',
    // .delete().lt(...).select('id') — the DELETE is not capped, only the returned
    // id list is. Worst case we under-REPORT how many rows were cleaned; no row is
    // left behind. Cosmetic log inaccuracy, not a data bug.
    match: ".select('id')",
    reason: 'delete().select() — returns deleted ids for a log line; delete itself is uncapped',
  },
];

// ---------------------------------------------------------------- scanning ---

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (name === 'node_modules' || name === '.next' || name.startsWith('.')) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full, out);
    else if (EXTS.has(full.slice(full.lastIndexOf('.')))) out.push(full);
  }
  return out;
}

/** Is this `.select(` a Supabase query rather than, say, a DOM/string method? */
function looksLikeSupabase(before) {
  // A PostgREST chain always has a .from('table') upstream in the same statement.
  // Look back a bounded distance for it.
  return /\.from\(\s*['"`]/.test(before.slice(-800));
}

function enclosingFunctionText(source, idx) {
  // Cheap: take a generous window backwards; enough to see a `function name(` or
  // `const name = ` and any pager helper wrapping this call.
  return source.slice(Math.max(0, idx - 1200), idx);
}

function isBound(windowText, beforeText) {
  if (/\.range\s*\(/.test(windowText)) return 'range';
  if (/\.limit\s*\(/.test(windowText)) return 'limit';
  if (/\.maybeSingle\s*\(/.test(windowText)) return 'maybeSingle';
  if (/\.single\s*\(/.test(windowText)) return 'single';
  if (/\.csv\s*\(|\.explain\s*\(/.test(windowText)) return 'non-row-format';
  // { count: 'exact', head: true } — head:true returns no rows at all.
  if (/head\s*:\s*true/.test(windowText)) return 'head:true count';
  for (const hint of PAGER_HINTS) {
    if (new RegExp(`${hint}\\s*[<(]`).test(beforeText)) return `paged via ${hint}()`;
  }
  return null;
}

function auditFile(absPath) {
  const rel = relative(ROOT, absPath);
  const src = readFileSync(absPath, 'utf8');
  const findings = [];
  const sites = [];

  const re = /\.select\s*\(/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const idx = m.index;
    const before = src.slice(0, idx);
    if (!looksLikeSupabase(before)) continue;

    const line = before.split('\n').length;
    const windowText = src.slice(idx, idx + WINDOW_CHARS);
    const enclosing = enclosingFunctionText(src, idx);
    const bound = isBound(windowText, enclosing);

    const lineText = src.split('\n')[line - 1].trim();
    const allow = ALLOWLIST.find(
      (a) => a.file === rel && lineText.includes(a.match)
    );

    sites.push({ rel, line, bound, allow: Boolean(allow), lineText });
    if (!bound && !allow) findings.push({ rel, line, lineText });
  }
  return { findings, sites };
}

function run() {
  const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
  const allFindings = [];
  const allSites = [];
  for (const f of files) {
    const { findings, sites } = auditFile(f);
    allFindings.push(...findings);
    allSites.push(...sites);
  }
  return { allFindings, allSites };
}

// ------------------------------------------------------------- self-test ---
// Negative control: the guard is worthless unless it FAILS on a bad input. This
// writes a temp file containing a genuinely unbounded select, asserts we flag it,
// then asserts we do NOT flag the bounded variants.
function selfTest() {
  const tmp = join(ROOT, 'src', '__unranged_guard_selftest__.ts');
  const cases = [
    { name: 'unranged select', code: `client.from('t').select('a').eq('x', 1);`, shouldFlag: true },
    { name: '.range()', code: `client.from('t').select('a').eq('x',1).range(0, 999);`, shouldFlag: false },
    { name: '.limit()', code: `client.from('t').select('a').limit(10);`, shouldFlag: false },
    { name: '.single()', code: `client.from('t').select('a').eq('id',1).single();`, shouldFlag: false },
    { name: 'head:true count', code: `client.from('t').select('id', { count: 'exact', head: true }).eq('x',1);`, shouldFlag: false },
    { name: 'multi-line unranged', code: `client\n  .from('t')\n  .select('a,b')\n  .in('s', S)\n  .order('created_at', { ascending: true });`, shouldFlag: true },
  ];

  let pass = 0;
  let fail = 0;
  for (const c of cases) {
    writeFileSync(tmp, c.code, 'utf8');
    const { findings } = auditFile(tmp);
    const flagged = findings.length > 0;
    if (flagged === c.shouldFlag) {
      pass++;
      console.log(`  ✓ ${c.name} → ${flagged ? 'flagged' : 'clean'} (expected)`);
    } else {
      fail++;
      console.log(`  ✗ ${c.name} → ${flagged ? 'flagged' : 'clean'}, expected ${c.shouldFlag ? 'flagged' : 'clean'}`);
    }
  }
  try {
    unlinkSync(tmp);
  } catch {}

  // Each PAGER_HINT is a PROMISE that the named helper actually pages. If someone
  // rewrites one of these helpers to a plain select, every call site it covers goes
  // silently unbounded again — the exact invisible-guard failure this script exists
  // to prevent. Assert the helper still calls .range().
  const HINT_SOURCES = {
    fetchAllRows: 'src/lib/supabase-leads.ts',
    fetchAllLeadRows: 'src/lib/supabase-paging.ts',
  };
  for (const hint of PAGER_HINTS) {
    const srcFile = HINT_SOURCES[hint];
    if (!srcFile) {
      fail++;
      console.log(`  ✗ PAGER_HINT "${hint}" has no source file registered in HINT_SOURCES`);
      continue;
    }
    let text;
    try {
      text = readFileSync(join(ROOT, srcFile), 'utf8');
    } catch {
      fail++;
      console.log(`  ✗ PAGER_HINT "${hint}" → ${srcFile} is unreadable`);
      continue;
    }
    const defined = new RegExp(`(function|const)\\s+${hint}\\b`).test(text);
    const pages = /\.range\s*\(/.test(text);
    if (defined && pages) {
      pass++;
      console.log(`  ✓ PAGER_HINT ${hint} still pages via .range() in ${srcFile}`);
    } else {
      fail++;
      console.log(
        `  ✗ PAGER_HINT ${hint} in ${srcFile}: defined=${defined} calls .range()=${pages}`
      );
    }
  }

  console.log(`\nself-test: ${pass} passed, ${fail} failed`);
  if (fail > 0) {
    console.error('\nThe guard does not behave as specified — fix it before trusting a clean run.');
    process.exit(1);
  }
  console.log('Negative control holds: the guard actually fails on an unbounded select.');
  process.exit(0);
}

// ------------------------------------------------------------------ main ---

const args = process.argv.slice(2);

if (args.includes('--self-test')) {
  console.log('Running negative control on the unranged-select guard:\n');
  selfTest();
}

let result;
try {
  result = run();
} catch (e) {
  // An audit that dies must be LOUD. The predecessor to this script failed with
  // MODULE_NOT_FOUND and was read as passing for weeks.
  console.error('audit-unranged-selects: the audit itself failed to run.');
  console.error(e instanceof Error ? e.stack : String(e));
  process.exit(2);
}

const { allFindings, allSites } = result;

if (args.includes('--list')) {
  console.log(`Supabase select sites (${allSites.length}):\n`);
  for (const s of allSites.sort((a, b) => (a.rel + a.line).localeCompare(b.rel + b.line))) {
    const verdict = s.bound
      ? `bound: ${s.bound}`
      : s.allow
        ? 'ALLOWLISTED'
        : 'UNBOUNDED';
    console.log(`  ${verdict.padEnd(24)} ${s.rel}:${s.line}`);
  }
  console.log('');
}

if (allFindings.length === 0) {
  console.log(
    `✓ audit-unranged-selects: ${allSites.length} Supabase select sites checked, all bounded.`
  );
  process.exit(0);
}

console.error(
  `\n✗ audit-unranged-selects: ${allFindings.length} unbounded select(s) found.\n`
);
for (const f of allFindings) {
  console.error(`  ${f.rel}:${f.line}`);
  console.error(`      ${f.lineText}`);
}
console.error(`
Supabase silently truncates any select at 1,000 rows — no error is raised. A reader
that returns rows must page (.range(...)), cap deliberately (.limit(...)), ask for a
single row (.single()/.maybeSingle()), or request a count (head: true).

If truncation is genuinely harmless here, add the site to ALLOWLIST in
scripts/audit-unranged-selects.mjs WITH A REASON — do not delete the check.
`);
process.exit(1);
