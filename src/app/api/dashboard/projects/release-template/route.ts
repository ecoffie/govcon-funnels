import { NextRequest, NextResponse } from 'next/server';
import { releaseProjectTemplate, type TaskContext } from '@/lib/db';
import {
  notifySlackTaskChange,
  formatTemplateReleaseSummary,
} from '@/lib/slackTasks';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }
    const template =
      typeof body.template === 'string' &&
      ['funnel_launch', 'content_update', 'crm_cleanup', 'bootcamp'].includes(body.template)
        ? body.template
        : 'funnel_launch';
    const context: TaskContext =
      body.context === 'delivery' ? 'delivery' : 'marketing';
    const result = await releaseProjectTemplate({
      name,
      template: template as 'funnel_launch' | 'content_update' | 'crm_cleanup' | 'bootcamp',
      context,
    });
    try {
      await notifySlackTaskChange(
        formatTemplateReleaseSummary({
          template,
          projectId: result.project.id,
          projectName: result.project.name,
          taskTitles: result.tasks.map((t) => t.title),
        })
      );
    } catch (notifyErr) {
      console.error('Preset summary Slack notify failed:', notifyErr);
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
    console.error('POST /api/dashboard/projects/release-template:', err);
    return NextResponse.json(
      { error: 'Failed to release project template' },
      { status: 500 }
    );
  }
}
