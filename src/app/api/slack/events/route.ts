import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  getTaskByTaskId,
  updateTask,
  createTask,
  addTaskEvent,
  queryUsers,
  queryProjects,
  createProject,
  normalizeTaskId,
} from '@/lib/db';

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

/** Slack docs: basestring = v0:timestamp:raw_body (timestamp from X-Slack-Request-Timestamp). */
function verifySlackSignatureCorrect(
  rawBody: string,
  signatureHeader: string | null,
  timestampHeader: string | null
): boolean {
  if (!SLACK_SIGNING_SECRET || !signatureHeader || !rawBody) return false;
  const ts = timestampHeader || '0';
  const sigBasestring = `v0:${ts}:${rawBody}`;
  const hmac = crypto.createHmac('sha256', SLACK_SIGNING_SECRET);
  hmac.update(sigBasestring);
  const expected = 'v0=' + hmac.digest('hex');
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'utf8'),
      Buffer.from(signatureHeader, 'utf8')
    );
  } catch {
    return false;
  }
}

interface SlackMessageEvent {
  type: string;
  text?: string;
  user?: string;
  channel?: string;
  bot_id?: string;
  ts?: string;
}

interface SlackEventPayload {
  type: string;
  challenge?: string;
  event?: SlackMessageEvent;
}

type ParsedSlackCommand =
  | { kind: 'help' }
  | { kind: 'update'; taskId: string; action: 'done' | 'assign' | 'due' | 'in_progress'; value?: string }
  | {
      kind: 'create';
      title: string;
      assignee?: string;
      due?: string;
      priority?: 'high' | 'medium' | 'low';
      project?: string;
      description?: string;
    };

function normalizeDateInput(input: string): string {
  const raw = (input || '').trim();
  if (!raw) return '';
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return raw;
}

function parseTaskCommand(text: string): ParsedSlackCommand | null {
  const source = (text || '').trim();
  const lower = source.toLowerCase();
  if (!lower.startsWith('task ')) return null;
  if (/^task\s+help$/i.test(source)) return { kind: 'help' };

  const createMatch = source.match(/^task\s+(create|new|add)\s+(.+)$/i);
  if (createMatch) {
    const body = createMatch[2].trim();
    const segs = body.split(/\s+\|\s+/).map(s => s.trim()).filter(Boolean);
    let title = '';
    let assignee = '';
    let due = '';
    let project = '';
    let description = '';
    let priority: 'high' | 'medium' | 'low' | '' = '';

    function parseSegment(segment: string): boolean {
      const assignMatch = segment.match(/^assign\s+to\s+(.+)$/i);
      if (assignMatch) {
        assignee = assignMatch[1].trim();
        return true;
      }
      const dueMatch = segment.match(/^due\s+(.+)$/i);
      if (dueMatch) {
        due = dueMatch[1].trim();
        return true;
      }
      const priorityMatch = segment.match(/^priority\s+(high|medium|low)$/i);
      if (priorityMatch) {
        priority = priorityMatch[1].toLowerCase() as 'high' | 'medium' | 'low';
        return true;
      }
      const projectMatch = segment.match(/^project\s+(.+)$/i);
      if (projectMatch) {
        project = projectMatch[1].trim();
        return true;
      }
      const descMatch = segment.match(/^(desc|description)\s+(.+)$/i);
      if (descMatch) {
        description = descMatch[2].trim();
        return true;
      }
      return false;
    }

    if (segs.length > 1) {
      segs.forEach((segment, idx) => {
        if (idx === 0 && !parseSegment(segment)) {
          title = segment.replace(/^title:\s*/i, '').trim();
          return;
        }
        if (!parseSegment(segment) && !title) {
          title = segment;
        }
      });
    } else {
      let rest = body;
      const assignMatch = rest.match(/\bassign\s+to\s+(.+?)(?=\s+\b(due|priority|project|desc|description)\b|$)/i);
      if (assignMatch) {
        assignee = assignMatch[1].trim();
        rest = rest.replace(assignMatch[0], ' ').trim();
      }
      const dueMatch = rest.match(/\bdue\s+(.+?)(?=\s+\b(assign|priority|project|desc|description)\b|$)/i);
      if (dueMatch) {
        due = dueMatch[1].trim();
        rest = rest.replace(dueMatch[0], ' ').trim();
      }
      const priorityMatch = rest.match(/\bpriority\s+(high|medium|low)\b/i);
      if (priorityMatch) {
        priority = priorityMatch[1].toLowerCase() as 'high' | 'medium' | 'low';
        rest = rest.replace(priorityMatch[0], ' ').trim();
      }
      const projectMatch = rest.match(/\bproject\s+(.+?)(?=\s+\b(assign|due|priority|desc|description)\b|$)/i);
      if (projectMatch) {
        project = projectMatch[1].trim();
        rest = rest.replace(projectMatch[0], ' ').trim();
      }
      const descMatch = rest.match(/\b(?:desc|description)\s+(.+)$/i);
      if (descMatch) {
        description = descMatch[1].trim();
        rest = rest.replace(descMatch[0], ' ').trim();
      }
      title = rest.replace(/^title:\s*/i, '').trim();
    }

    if (!title) return { kind: 'help' };
    return {
      kind: 'create',
      title,
      assignee: assignee || undefined,
      due: due || undefined,
      priority: priority || undefined,
      project: project || undefined,
      description: description || undefined,
    };
  }

  const taskMatch = source.match(/^task\s+([a-z0-9\-]+)\s+(.+)$/i);
  if (!taskMatch) return null;
  const taskId = normalizeTaskId(taskMatch[1]);
  const rest = taskMatch[2].trim();
  if (/^(done|complete|completed|finished)$/i.test(rest)) {
    return { kind: 'update', taskId, action: 'done' };
  }
  const assignMatch = rest.match(/^assign\s+(?:to\s+)?(.+)$/i);
  if (assignMatch) {
    return { kind: 'update', taskId, action: 'assign', value: assignMatch[1].trim() };
  }
  const dueMatch = rest.match(/^due\s+(.+)$/i);
  if (dueMatch) {
    return { kind: 'update', taskId, action: 'due', value: dueMatch[1].trim() };
  }
  if (/^(in\s*progress|started|wip)$/i.test(rest)) {
    return { kind: 'update', taskId, action: 'in_progress' };
  }
  return null;
}

function helpText(): string {
  return [
    'Slack task commands:',
    '- task T-001 done',
    '- task T-001 in progress',
    '- task T-001 assign to Percy',
    '- task T-001 due 3/01',
    '- task create Draft outreach script | assign to Percy | due 3/05 | priority high | project Internal Ops',
  ].join('\n');
}

async function resolveAssigneeUserId(name?: string): Promise<string | undefined> {
  if (!name) return undefined;
  const users = await queryUsers();
  const normalized = name.trim().toLowerCase();
  const user = users.find(
    (u) =>
      u.display_name.toLowerCase() === normalized ||
      u.username.toLowerCase() === normalized.replace(/[^a-z0-9]+/g, '.')
  );
  return user?.id;
}

async function resolveProjectId(name?: string): Promise<string | undefined> {
  if (!name) return undefined;
  const projects = await queryProjects();
  const normalized = name.trim().toLowerCase();
  const existing = projects.find((p) => p.name.trim().toLowerCase() === normalized);
  if (existing) return existing.id;
  const created = await createProject({ name: name.trim(), status: 'active' });
  return created.id;
}

async function postSlackReply(channel: string, text: string, threadTs?: string): Promise<void> {
  if (!SLACK_BOT_TOKEN) return;
  try {
    await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        channel,
        text,
        ...(threadTs && { thread_ts: threadTs }),
      }),
    });
  } catch (e) {
    console.error('Slack postMessage error:', e);
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  let payload: SlackEventPayload;
  try {
    payload = JSON.parse(rawBody) as SlackEventPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (payload.type === 'url_verification') {
    return NextResponse.json({ challenge: payload.challenge || '' });
  }

  const signature = request.headers.get('x-slack-signature');
  const timestamp = request.headers.get('x-slack-request-timestamp');

  if (!verifySlackSignatureCorrect(rawBody, signature, timestamp)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  if (payload.type !== 'event_callback' || !payload.event) {
    return NextResponse.json({ ok: true });
  }

  const event = payload.event as SlackMessageEvent;
  if (event.type !== 'message' || event.bot_id || !event.text?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseTaskCommand(event.text);
  if (!parsed) {
    return NextResponse.json({ ok: true });
  }

  try {
    if (parsed.kind === 'help') {
      await postSlackReply(
        event.channel!,
        helpText(),
        event.ts
      );
      return NextResponse.json({ ok: true });
    }

    if (parsed.kind === 'create') {
      const assigneeUserId = await resolveAssigneeUserId(parsed.assignee);
      const projectId = await resolveProjectId(parsed.project);
      const task = await createTask({
        title: parsed.title,
        description: parsed.description ?? null,
        assignee: parsed.assignee ?? null,
        assignee_user_id: assigneeUserId ?? null,
        due_date: parsed.due ? normalizeDateInput(parsed.due) : null,
        priority: parsed.priority ?? null,
        project_id: projectId ?? null,
        status: 'open',
      });
      await addTaskEvent({
        task_id: task.id,
        event_type: 'created',
        message: `Created from Slack${parsed.assignee ? `, assigned to ${parsed.assignee}` : ''}.`,
      });
      await postSlackReply(
        event.channel!,
        `Created ${task.task_id}: ${task.title}`,
        event.ts
      );
      return NextResponse.json({ ok: true });
    }

    const task = await getTaskByTaskId(parsed.taskId);
    if (!task) {
      await postSlackReply(
        event.channel!,
        `Task ${parsed.taskId} not found.`,
        event.ts
      );
      return NextResponse.json({ ok: true });
    }

    if (parsed.action === 'done') {
      await updateTask(task.id, { status: 'done' });
      await addTaskEvent({
        task_id: task.id,
        event_type: 'status_changed',
        message: 'Marked done from Slack.',
      });
      await postSlackReply(
        event.channel!,
        `Task ${task.task_id} marked complete.`,
        event.ts
      );
    } else if (parsed.action === 'assign' && parsed.value) {
      const assigneeUserId = await resolveAssigneeUserId(parsed.value);
      await updateTask(task.id, { assignee: parsed.value, assignee_user_id: assigneeUserId ?? null });
      await addTaskEvent({
        task_id: task.id,
        event_type: 'assigned',
        message: `Assigned to ${parsed.value} from Slack.`,
      });
      await postSlackReply(
        event.channel!,
        `Task ${task.task_id} assigned to ${parsed.value}.`,
        event.ts
      );
    } else if (parsed.action === 'due' && parsed.value) {
      const dateStr = normalizeDateInput(parsed.value);
      await updateTask(task.id, { due_date: dateStr });
      await addTaskEvent({
        task_id: task.id,
        event_type: 'due_changed',
        message: `Due date set to ${dateStr} from Slack.`,
      });
      await postSlackReply(
        event.channel!,
        `Task ${task.task_id} due date set to ${dateStr}.`,
        event.ts
      );
    } else if (parsed.action === 'in_progress') {
      await updateTask(task.id, { status: 'in_progress' });
      await addTaskEvent({
        task_id: task.id,
        event_type: 'status_changed',
        message: 'Set to in progress from Slack.',
      });
      await postSlackReply(
        event.channel!,
        `Task ${task.task_id} set to in progress.`,
        event.ts
      );
    }
  } catch (err) {
    console.error('Slack event task update error:', err);
    await postSlackReply(
      event.channel!,
      `Could not update task (e.g. database not configured).`,
      event.ts
    );
  }

  return NextResponse.json({ ok: true });
}
