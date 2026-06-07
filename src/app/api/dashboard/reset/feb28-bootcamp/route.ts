import { NextRequest, NextResponse } from 'next/server';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';
import {
  notifySlackTaskChange,
  formatTemplateReleaseSummary,
} from '@/lib/slackTasks';

function getResetSecret(): string | null {
  return process.env.DASHBOARD_RESET_SECRET || process.env.DASHBOARD_API_SECRET || null;
}

function extractResetSecret(request: NextRequest): string | null {
  const header = request.headers.get('x-dashboard-reset-secret');
  if (header) return header;

  const auth = request.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);

  return null;
}

function isAuthorizedReset(request: NextRequest): boolean {
  const expected = getResetSecret();
  const provided = extractResetSecret(request);
  if (!expected || !provided || provided.length !== expected.length) return false;

  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(request: NextRequest) {
  if (!getResetSecret()) {
    return NextResponse.json(
      { error: 'Dashboard reset secret is not configured' },
      { status: 503 }
    );
  }

  if (!isAuthorizedReset(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await resetTasksAndProjectsToFeb28Bootcamp();
    try {
      await notifySlackTaskChange(
        formatTemplateReleaseSummary({
          template: 'bootcamp-reset',
          projectId: result.project.id,
          projectName: result.project.name,
          taskTitles: result.tasks.map((t) => t.title),
        })
      );
    } catch (notifyErr) {
      console.error('Feb28 reset Slack notify failed:', notifyErr);
    }
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Projects database not configured' },
        { status: 503 }
      );
    }
    console.error('POST /api/dashboard/reset/feb28-bootcamp:', err);
    return NextResponse.json(
      { error: 'Failed to reset to Feb 28th bootcamp preset' },
      { status: 500 }
    );
  }
}
