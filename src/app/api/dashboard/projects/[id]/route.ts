import { NextRequest, NextResponse } from 'next/server';
import { updateProject, type TaskContext } from '@/lib/db';
import {
  notifySlackTaskChange,
  formatProjectSlackMessage,
} from '@/lib/slackTasks';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Project id required' }, { status: 400 });
    }
    const body = await request.json();
    const updates: {
      name?: string;
      status?: 'active' | 'paused' | 'archived';
      context?: TaskContext;
    } = {};
    if (typeof body.name === 'string') updates.name = body.name.trim();
    if (
      typeof body.status === 'string' &&
      ['active', 'paused', 'archived'].includes(body.status)
    ) {
      updates.status = body.status;
    }
    if (body.context !== undefined) {
      updates.context = body.context === 'delivery' ? 'delivery' : 'marketing';
    }
    const project = await updateProject(id, updates);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    await notifySlackTaskChange(
      formatProjectSlackMessage({
        action: 'updated',
        projectId: project.id,
        name: project.name,
        status: project.status,
      })
    );
    return NextResponse.json(project);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Projects database not configured' },
        { status: 503 }
      );
    }
    console.error('PATCH /api/dashboard/projects/[id]:', err);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}
