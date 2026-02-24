type SlackPayload = {
  text: string;
};

function getTaskWebhookUrl(): string | undefined {
  return (
    process.env.SLACK_TASK_WEBHOOK_URL ||
    process.env.SLACK_LEAD_WEBHOOK_URL ||
    undefined
  );
}

async function postSlackMessage(payload: SlackPayload): Promise<void> {
  const webhookUrl = getTaskWebhookUrl();
  if (!webhookUrl) return;
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Slack webhook failed: ${response.status} ${text}`);
  }
}

export async function notifySlackTaskChange(message: string): Promise<void> {
  try {
    await postSlackMessage({ text: message });
  } catch (err) {
    console.error('notifySlackTaskChange failed:', err);
  }
}

export function formatTaskSlackMessage(args: {
  action: 'created' | 'updated';
  taskId: string;
  title: string;
  status: string;
  assignee?: string | null;
  dueDate?: string | null;
  priority?: string | null;
  projectId?: string | null;
  attachmentUrl?: string | null;
}): string {
  const bits = [
    `*Task ${args.action}:* ${args.taskId}`,
    `*Title:* ${args.title}`,
    `*Status:* ${args.status}`,
    `*Assignee:* ${args.assignee || 'Unassigned'}`,
    `*Due:* ${args.dueDate || '—'}`,
    `*Priority:* ${args.priority || '—'}`,
    `*Project ID:* ${args.projectId || '—'}`,
  ];
  if (args.attachmentUrl) {
    bits.push(`*Attachment:* ${args.attachmentUrl}`);
  }
  return bits.join('\n');
}

export function formatProjectSlackMessage(args: {
  action: 'created' | 'updated';
  projectId: string;
  name: string;
  status: string;
}): string {
  return [
    `*Project ${args.action}:* ${args.name}`,
    `*ID:* ${args.projectId}`,
    `*Status:* ${args.status}`,
  ].join('\n');
}
