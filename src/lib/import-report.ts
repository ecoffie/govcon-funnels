/**
 * Shared logic to import report data from an Excel buffer.
 * Used by both the upload API and the seed script.
 */

import * as XLSX from 'xlsx';
import {
  upsertWeekMetrics,
  upsertSection,
  mapDashboardRowToMetrics,
} from './report-db';

const SHEET_TO_SECTION: Record<string, string> = {
  Dashboard: '__skip__',
  YouTube: 'YouTube',
  'Instagram (GCG)': 'Instagram (GCG)',
  'Instagram (Eric Coffie)': 'Instagram (Eric Coffie)',
  'LinkedIn (GCG)': 'LinkedIn (GCG)',
  'LinkedIn (Eric Coffie)': 'LinkedIn (Eric Coffie)',
  Podcast_Bookings: 'Podcast_Bookings',
  Podcast: 'Podcast',
  Cold_Emails: 'Cold_Emails',
  Free_Course: 'Free_Course',
  Discovery_Calls: 'Discovery_Calls',
  FHC_Calls: 'FHC_Calls',
  SEO: 'SEO',
  Warm_Emails: 'Warm_Emails',
  Sales: 'Sales',
};

function formatWeekStart(val: unknown): string | null {
  if (val === null || val === undefined) return null;
  if (typeof val === 'string') {
    const m = val.match(/^\d{4}-\d{2}-\d{2}/);
    return m ? m[0] : null;
  }
  if (typeof val === 'number' && val > 0) {
    const d = XLSX.SSF.parse_date_code(val);
    if (d) {
      const y = d.y;
      const m = String(d.m).padStart(2, '0');
      const day = String(d.d).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
  }
  return null;
}

export interface ImportResult {
  weeksImported: number;
  message: string;
  sectionsUpdated: string[];
}

export async function importReportFromBuffer(buf: Buffer): Promise<ImportResult> {
  const wb = XLSX.read(buf, { type: 'buffer' });
  let weeksImported = 0;
  const sectionsUpdated: string[] = [];

  if (wb.SheetNames.includes('Dashboard')) {
    const sheet = wb.Sheets['Dashboard'];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
    for (const row of rows) {
      const weekStart = formatWeekStart(row.Week_Start ?? row.week_start);
      if (!weekStart) continue;
      const metrics = mapDashboardRowToMetrics(row);
      if (Object.keys(metrics).length > 1 || metrics.week_start) {
        await upsertWeekMetrics({ ...metrics, week_start: weekStart });
        weeksImported++;
      }
    }
  }

  for (const sheetName of wb.SheetNames) {
    const sectionKey = SHEET_TO_SECTION[sheetName];
    if (!sectionKey || sectionKey === '__skip__') continue;

    const sheet = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', header: 1 }) as unknown as unknown[][];
    if (rows.length < 2) continue;

    const headers = (rows[0] as unknown[]).map((h) => String(h ?? ''));
    const weekColIdx = headers.findIndex((h) => /week|date|start/i.test(String(h)));
    const weekCol = weekColIdx >= 0 ? weekColIdx : 0;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i] as unknown[];
      if (!row?.length) continue;
      const weekVal = row[weekCol] ?? row[0];
      const weekStart = formatWeekStart(weekVal);
      if (!weekStart) continue;

      const parts: string[] = [];
      for (let j = 0; j < Math.min(row.length, headers.length); j++) {
        const v = row[j];
        if (v !== null && v !== undefined && v !== '') {
          parts.push(`${headers[j]}: ${String(v)}`);
        }
      }
      const content = parts.join('\n');
      if (content) {
        await upsertSection(weekStart, sectionKey, content);
        if (!sectionsUpdated.includes(sectionKey)) sectionsUpdated.push(sectionKey);
      }
    }
  }

  const message = weeksImported > 0 ? `Updated ${weeksImported} week(s).` : 'No dashboard rows found.';
  return { weeksImported, message, sectionsUpdated };
}
