import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  getTaskByTaskId,
  updateTask,
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

function parseTaskMessage(text: string): { taskId: string; action: string; value?: string } | null {
  const t = (text || '').trim().toLowerCase();
  const taskMatch = t.match(/task\s+([a-z0-9\-]+)\s+(.+)/i);
  if (!taskMatch) return null;
  const taskId = normalizeTaskId(taskMatch[1]);
  const rest = taskMatch[2].trim();
  if (/^(done|complete|completed|finished)$/i.test(rest)) {
    return { taskId, action: 'done' };
  }
  const assignMatch = rest.match(/^assign\s+(?:to\s+)?(.+)$/i);
  if (assignMatch) {
    return { taskId, action: 'assign', value: assignMatch[1].trim() };
  }
  const dueMatch = rest.match(/^due\s+(.+)$/i);
  if (dueMatch) {
    return { taskId, action: 'due', value: dueMatch[1].trim() };
  }
  if (/^(in\s*progress|started|wip)$/i.test(rest)) {
    return { taskId, action: 'in_progress' };
  }
  return null;
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
  const signature = request.headers.get('x-slack-signature');
  const timestamp = request.headers.get('x-slack-request-timestamp');

  if (!verifySlackSignatureCorrect(rawBody, signature, timestamp)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: SlackEventPayload;
  try {
    payload = JSON.parse(rawBody) as SlackEventPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (payload.type === 'url_verification') {
    return NextResponse.json({ challenge: payload.challenge || '' });
  }

  if (payload.type !== 'event_callback' || !payload.event) {
    return NextResponse.json({ ok: true });
  }

  const event = payload.event as SlackMessageEvent;
  if (event.type !== 'message' || event.bot_id || !event.text?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseTaskMessage(event.text);
  if (!parsed) {
    return NextResponse.json({ ok: true });
  }

  try {
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
      await postSlackReply(
        event.channel!,
        `Task ${task.task_id} marked complete.`,
        event.ts
      );
    } else if (parsed.action === 'assign' && parsed.value) {
      await updateTask(task.id, { assignee: parsed.value });
      await postSlackReply(
        event.channel!,
        `Task ${task.task_id} assigned to ${parsed.value}.`,
        event.ts
      );
    } else if (parsed.action === 'due' && parsed.value) {
      let dateStr = parsed.value.trim();
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) dateStr = d.toISOString().slice(0, 10);
      await updateTask(task.id, { due_date: dateStr });
      await postSlackReply(
        event.channel!,
        `Task ${task.task_id} due date set to ${parsed.value}.`,
        event.ts
      );
    } else if (parsed.action === 'in_progress') {
      await updateTask(task.id, { status: 'in_progress' });
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
