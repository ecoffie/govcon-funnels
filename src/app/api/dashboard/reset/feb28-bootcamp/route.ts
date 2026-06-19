import { NextRequest, NextResponse } from 'next/server';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';
import {
  notifySlackTaskChange,
  formatTemplateReleaseSummary,
} from '@/lib/slackTasks';

function getResetSecret(): string | null {
  return process.env.DASHBOARD_RESET_SECRET || process.env.DASHBOARD_API_SECRET || null;
}

function isAuthorized(request: NextRequest): boolean {
  const secret = getResetSecret();
  if (!secret) return false;

  const auth = request.headers.get('authorization') || '';
  return auth === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
  if (!getResetSecret()) {
    return NextResponse.json(
      { error: 'Dashboard reset secret not configured' },
      { status: 503 }
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
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
