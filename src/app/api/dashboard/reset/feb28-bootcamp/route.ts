import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';
import {
  notifySlackTaskChange,
  formatTemplateReleaseSummary,
} from '@/lib/slackTasks';

function getResetSecret(): string {
  return process.env.DASHBOARD_RESET_SECRET || process.env.DASHBOARD_API_SECRET || '';
}

function isAuthorized(request: NextRequest): boolean {
  const secret = getResetSecret();
  if (!secret) return false;

  const authHeader = request.headers.get('authorization') || '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : '';
  const submittedSecret = bearerToken
    || request.headers.get('x-dashboard-reset-secret')
    || request.headers.get('x-api-key')
    || '';

  if (!submittedSecret) return false;

  const expected = Buffer.from(secret);
  const received = Buffer.from(submittedSecret);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function POST(request: NextRequest) {
  if (!getResetSecret()) {
    return NextResponse.json(
      { error: 'Dashboard reset secret is not configured' },
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
