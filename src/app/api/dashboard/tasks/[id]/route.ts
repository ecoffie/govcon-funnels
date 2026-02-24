import { NextRequest, NextResponse } from 'next/server';
import { updateTask, getTaskById, addTaskEvent, type TaskContext } from '@/lib/db';
import {
  notifySlackTaskChange,
  formatTaskSlackMessage,
} from '@/lib/slackTasks';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Task id required' }, { status: 400 });
    }
    const body = await request.json();
    const updates: {
      title?: string;
      description?: string | null;
      attachment_url?: string | null;
      assignee?: string | null;
      assignee_user_id?: string | null;
      project_id?: string | null;
      due_date?: string | null;
      priority?: string | null;
      estimate?: string | null;
      tags?: string[] | null;
      status?: string;
      context?: TaskContext;
    } = {};
    if (typeof body.title === 'string') updates.title = body.title.trim();
    if (body.description !== undefined)
      updates.description =
        typeof body.description === 'string' ? body.description.trim() : null;
    if (body.attachment_url !== undefined)
      updates.attachment_url =
        typeof body.attachment_url === 'string' ? body.attachment_url.trim() || null : null;
    if (body.assignee !== undefined)
      updates.assignee =
        typeof body.assignee === 'string' ? body.assignee.trim() || null : null;
    if (body.assignee_user_id !== undefined)
      updates.assignee_user_id =
        typeof body.assignee_user_id === 'string'
          ? body.assignee_user_id.trim() || null
          : null;
    if (body.project_id !== undefined)
      updates.project_id =
        typeof body.project_id === 'string' ? body.project_id.trim() || null : null;
    if (body.due_date !== undefined)
      updates.due_date =
        typeof body.due_date === 'string' && body.due_date
          ? body.due_date.trim()
          : null;
    if (
      typeof body.priority === 'string' &&
      ['high', 'medium', 'low'].includes(body.priority)
    ) {
      updates.priority = body.priority;
    }
    if (body.estimate !== undefined) {
      updates.estimate =
        typeof body.estimate === 'string' ? body.estimate.trim() || null : null;
    }
    if (body.tags !== undefined) {
      updates.tags = Array.isArray(body.tags)
        ? body.tags.filter((t: unknown) => typeof t === 'string')
        : [];
    }
    if (
      typeof body.status === 'string' &&
      ['open', 'in_progress', 'review', 'done'].includes(body.status)
    ) {
      updates.status = body.status;
    }
    if (body.context !== undefined) {
      updates.context = body.context === 'delivery' ? 'delivery' : 'marketing';
    }
    const task = await updateTask(id, updates);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    await addTaskEvent({
      task_id: task.id,
      event_type: 'updated',
      message: 'Task updated',
    });
    await notifySlackTaskChange(
      formatTaskSlackMessage({
        action: 'updated',
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
    return NextResponse.json(task);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Tasks database not configured' },
        { status: 503 }
      );
    }
    console.error('PATCH /api/dashboard/tasks/[id]:', err);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Task id required' }, { status: 400 });
    }
    const task = await getTaskById(id);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Tasks database not configured' },
        { status: 503 }
      );
    }
    console.error('GET /api/dashboard/tasks/[id]:', err);
    return NextResponse.json(
      { error: 'Failed to get task' },
      { status: 500 }
    );
  }
}
