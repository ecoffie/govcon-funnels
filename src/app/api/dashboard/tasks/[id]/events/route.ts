import { NextRequest, NextResponse } from 'next/server';
import { addTaskEvent, getTaskById, getTaskEvents } from '@/lib/db';

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
    const events = await getTaskEvents(id);
    return NextResponse.json(events);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Tasks database not configured' },
        { status: 503 }
      );
    }
    console.error('GET /api/dashboard/tasks/[id]/events:', err);
    return NextResponse.json(
      { error: 'Failed to get task events' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
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
    const body = await request.json();
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return NextResponse.json(
        { error: 'message is required' },
        { status: 400 }
      );
    }
    const actor_user_id =
      typeof body.actor_user_id === 'string'
        ? body.actor_user_id.trim() || null
        : null;
    const event_type =
      typeof body.event_type === 'string' ? body.event_type.trim() || 'note' : 'note';
    const event = await addTaskEvent({
      task_id: id,
      actor_user_id,
      event_type,
      message,
    });
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Tasks database not configured' },
        { status: 503 }
      );
    }
    console.error('POST /api/dashboard/tasks/[id]/events:', err);
    return NextResponse.json(
      { error: 'Failed to create task event' },
      { status: 500 }
    );
  }
}
