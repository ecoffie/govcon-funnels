import { NextRequest, NextResponse } from 'next/server';
import { createProject, queryProjects, type TaskContext } from '@/lib/db';
import {
  notifySlackTaskChange,
  formatProjectSlackMessage,
} from '@/lib/slackTasks';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contextParam = searchParams.get('context');
    const context: TaskContext | undefined =
      contextParam === 'delivery' || contextParam === 'marketing'
        ? contextParam
        : undefined;
    const projects = await queryProjects(context);
    return NextResponse.json(projects);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Projects database not configured' },
        { status: 503 }
      );
    }
    console.error('GET /api/dashboard/projects:', err);
    return NextResponse.json(
      { error: 'Failed to list projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }
    const status =
      typeof body.status === 'string' &&
      ['active', 'paused', 'archived'].includes(body.status)
        ? body.status
        : 'active';
    const context: TaskContext =
      body.context === 'delivery' ? 'delivery' : 'marketing';
    const project = await createProject({ name, status, context });
    await notifySlackTaskChange(
      formatProjectSlackMessage({
        action: 'created',
        projectId: project.id,
        name: project.name,
        status: project.status,
      })
    );
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Projects database not configured' },
        { status: 503 }
      );
    }
    console.error('POST /api/dashboard/projects:', err);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
