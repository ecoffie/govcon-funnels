import { NextRequest, NextResponse } from 'next/server';
import {
  queryTasks,
  createTask,
  addTaskEvent,
} from '@/lib/db';
import {
  notifySlackTaskChange,
  formatTaskSlackMessage,
} from '@/lib/slackTasks';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 1),
      100
    );
    const status = searchParams.get('status') ?? undefined;
    const project_id = searchParams.get('project_id') ?? undefined;
    const includeDone = searchParams.get('include_done') === 'true';
    const tasks = await queryTasks({ limit, status, project_id, includeDone });
    return NextResponse.json(tasks);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Tasks database not configured' },
        { status: 503 }
      );
    }
    console.error('GET /api/dashboard/tasks:', err);
    return NextResponse.json(
      { error: 'Failed to list tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const title =
      typeof body.title === 'string' ? body.title.trim() : '';
    if (!title) {
      return NextResponse.json(
        { error: 'title is required' },
        { status: 400 }
      );
    }
    const description =
      typeof body.description === 'string' ? body.description.trim() : null;
    const attachment_url =
      typeof body.attachment_url === 'string' ? body.attachment_url.trim() || null : null;
    const assignee =
      typeof body.assignee === 'string' ? body.assignee.trim() || null : null;
    const assignee_user_id =
      typeof body.assignee_user_id === 'string' ? body.assignee_user_id.trim() || null : null;
    const project_id =
      typeof body.project_id === 'string' ? body.project_id.trim() || null : null;
    const due_date =
      typeof body.due_date === 'string' && body.due_date
        ? body.due_date.trim()
        : null;
    const priority =
      typeof body.priority === 'string' &&
      ['high', 'medium', 'low'].includes(body.priority)
        ? body.priority
        : null;
    const status =
      typeof body.status === 'string' &&
      ['open', 'in_progress', 'review', 'done'].includes(body.status)
        ? body.status
        : null;
    const estimate =
      typeof body.estimate === 'string' ? body.estimate.trim() || null : null;
    const tags =
      Array.isArray(body.tags) ? body.tags.filter((t: unknown) => typeof t === 'string') : [];
    const task = await createTask({
      title,
      description: description || null,
      attachment_url,
      assignee,
      assignee_user_id,
      project_id,
      due_date,
      priority,
      status,
      estimate,
      tags,
    });
    await addTaskEvent({
      task_id: task.id,
      event_type: 'created',
      message: 'Task created',
    });
    await notifySlackTaskChange(
      formatTaskSlackMessage({
        action: 'created',
        taskId: task.task_id,
        title: task.title,
        status: task.status,
        assignee: task.assignee,
        dueDate: task.due_date,
        priority: task.priority,
        projectId: task.project_id,
        attachmentUrl: task.attachment_url,
      })
    );
    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Tasks database not configured' },
        { status: 503 }
      );
    }
    console.error('POST /api/dashboard/tasks:', err);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
