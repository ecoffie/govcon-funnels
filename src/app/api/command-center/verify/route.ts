/**
 * POST /api/command-center/verify — on-demand run of the synthetic suite.
 * The AI assistant calls this after every site change/deploy and pastes the
 * JSON result as proof nothing broke (see CLAUDE.md).
 *
 * Auth: admin password (x-admin-password header, Bearer, or ?password=).
 * Unlike the cron, this does NOT send Slack alerts — it's a manual check.
 */
import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized, extractPassword } from '@/lib/admin-auth';
import { runSyntheticSuite } from '@/lib/synthetic';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  if (!isAuthorized(extractPassword(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await runSyntheticSuite();
  const failures = results.filter((r) => !r.ok);

  return NextResponse.json({
    ok: failures.length === 0,
    ranAt: new Date().toISOString(),
    checks: results.map((r) => ({
      check: r.check,
      target: r.target,
      ok: r.ok,
      status: r.status,
      duration_ms: r.duration_ms,
      detail: r.detail,
    })),
    failedCount: failures.length,
  });
}
