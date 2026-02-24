import { NextRequest, NextResponse } from 'next/server';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';
import {
  notifySlackTaskChange,
  formatTemplateReleaseSummary,
} from '@/lib/slackTasks';

export async function POST(_request: NextRequest) {
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
