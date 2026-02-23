/**
 * Postgres client for dashboard tasks.
 * Set DATABASE_URL in env (Vercel Postgres, Supabase, Neon, etc.).
 */

import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      max: 2,
      allowExitOnIdle: true,
    });
  }
  return pool;
}

export interface Task {
  id: string;
  task_id: string;
  title: string;
  description: string | null;
  assignee: string | null;
  assignee_user_id: string | null;
  project_id: string | null;
  due_date: string | null;
  priority: string | null;
  status: string;
  estimate: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  project_key: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  display_name: string;
  active: boolean;
  created_at: string;
}

export interface TaskEvent {
  id: string;
  task_id: string;
  actor_user_id: string | null;
  event_type: string;
  message: string;
  created_at: string;
}

function mapTaskRow(row: any): Task {
  return {
    id: row.id,
    task_id: row.task_id,
    title: row.title,
    description: row.description,
    assignee: row.assignee,
    assignee_user_id: row.assignee_user_id,
    project_id: row.project_id,
    due_date: row.due_date,
    priority: row.priority,
    status: row.status,
    estimate: row.estimate,
    tags: Array.isArray(row.tags) ? row.tags : [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

const TASK_SELECT =
  'SELECT id, task_id, title, description, assignee, assignee_user_id, project_id, due_date, priority, status, estimate, tags, created_at, updated_at FROM tasks';

async function ensureDefaultProject(): Promise<string> {
  const client = getPool();
  const found = await client.query(
    "SELECT id FROM projects WHERE status = 'active' ORDER BY created_at ASC LIMIT 1"
  );
  if (found.rows[0]?.id) return found.rows[0].id as string;
  const now = new Date().toISOString();
  const key = 'general-' + now.slice(0, 10).replace(/-/g, '');
  const created = await client.query(
    `INSERT INTO projects (project_key, name, status, created_at, updated_at)
     VALUES ($1, $2, 'active', $3::timestamptz, $4::timestamptz)
     RETURNING id`,
    [key, 'General Ops', now, now]
  );
  return created.rows[0].id as string;
}

export async function queryTasks(opts: {
  limit?: number;
  status?: string;
  project_id?: string;
  includeDone?: boolean;
}): Promise<Task[]> {
  const { limit = 50, status, project_id, includeDone = true } = opts;
  const client = getPool();
  let text = TASK_SELECT;
  const params: (string | number)[] = [];
  const conditions: string[] = [];
  if (status) {
    conditions.push(`status = $${params.length + 1}`);
    params.push(status);
  }
  if (project_id) {
    conditions.push(`project_id = $${params.length + 1}`);
    params.push(project_id);
  }
  if (!includeDone) {
    conditions.push(`status <> 'done'`);
  }
  if (conditions.length) text += ' WHERE ' + conditions.join(' AND ');
  text += ' ORDER BY updated_at DESC LIMIT $' + (params.length + 1);
  params.push(limit);
  const res = await client.query(text, params);
  return res.rows.map(mapTaskRow);
}

export async function getTaskById(id: string): Promise<Task | null> {
  const client = getPool();
  const res = await client.query(
    `${TASK_SELECT} WHERE id = $1`,
    [id]
  );
  return res.rows[0] ? mapTaskRow(res.rows[0]) : null;
}

export async function getTaskByTaskId(taskId: string): Promise<Task | null> {
  const client = getPool();
  const normalized = normalizeTaskId(taskId);
  const res = await client.query(
    `${TASK_SELECT} WHERE task_id = $1 OR task_id = $2`,
    [taskId, normalized]
  );
  return res.rows[0] ? mapTaskRow(res.rows[0]) : null;
}

/** Normalize "T-001", "T001", "001" to "T-001" style for lookup. */
export function normalizeTaskId(input: string): string {
  const s = input.trim().toUpperCase().replace(/\s/g, '');
  if (/^\d+$/.test(s)) return 'T-' + s.padStart(3, '0');
  if (/^T-?\d+$/.test(s)) return 'T-' + s.replace(/^T-?/, '').padStart(3, '0');
  return input.trim();
}

/** Get next task_id (e.g. T-001, T-002). */
async function nextTaskId(): Promise<string> {
  const client = getPool();
  const res = await client.query(
    "SELECT COALESCE(MAX(CAST(SUBSTRING(task_id FROM 4) AS INTEGER)), 0) + 1 AS next_num FROM tasks WHERE task_id ~ '^T-[0-9]+$'"
  );
  const nextNum = res.rows[0]?.next_num ?? 1;
  return 'T-' + String(nextNum).padStart(3, '0');
}

export async function createTask(data: {
  title: string;
  description?: string | null;
  assignee?: string | null;
  assignee_user_id?: string | null;
  project_id?: string | null;
  due_date?: string | null;
  priority?: string | null;
  status?: 'open' | 'in_progress' | 'review' | 'done' | null;
  estimate?: string | null;
  tags?: string[] | null;
}): Promise<Task> {
  const client = getPool();
  const task_id = await nextTaskId();
  const projectId = data.project_id || (await ensureDefaultProject());
  const now = new Date().toISOString();
  const status = data.status || 'open';
  const res = await client.query(
    `INSERT INTO tasks (
      task_id, title, description, assignee, assignee_user_id, project_id, due_date, priority, status, estimate, tags, created_at, updated_at
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12::timestamptz, $13::timestamptz)
     RETURNING id, task_id, title, description, assignee, assignee_user_id, project_id, due_date, priority, status, estimate, tags, created_at, updated_at`,
    [
      task_id,
      data.title,
      data.description ?? null,
      data.assignee ?? null,
      data.assignee_user_id ?? null,
      projectId,
      data.due_date ?? null,
      data.priority ?? null,
      status,
      data.estimate ?? null,
      JSON.stringify(data.tags ?? []),
      now,
      now,
    ]
  );
  return mapTaskRow(res.rows[0]);
}

export async function updateTask(
  id: string,
  updates: {
    title?: string;
    description?: string | null;
    assignee?: string | null;
    assignee_user_id?: string | null;
    project_id?: string | null;
    due_date?: string | null;
    priority?: string | null;
    estimate?: string | null;
    tags?: string[] | null;
    status?: string;
  }
): Promise<Task | null> {
  const client = getPool();
  const allowed = [
    'title',
    'description',
    'assignee',
    'assignee_user_id',
    'project_id',
    'due_date',
    'priority',
    'estimate',
    'status',
  ] as const;
  const setClauses: string[] = [];
  const values: unknown[] = [];
  let i = 1;
  for (const key of allowed) {
    const v = updates[key];
    if (v === undefined) continue;
    setClauses.push(`${key} = $${i}`);
    values.push(v === '' ? null : v);
    i++;
  }
  if (updates.tags !== undefined) {
    setClauses.push(`tags = $${i}::jsonb`);
    values.push(JSON.stringify(updates.tags ?? []));
    i++;
  }
  if (setClauses.length === 0) return getTaskById(id);
  setClauses.push(`updated_at = $${i}::timestamptz`);
  values.push(new Date().toISOString());
  i++;
  values.push(id);
  const res = await client.query(
    `UPDATE tasks SET ${setClauses.join(', ')} WHERE id = $${i}
     RETURNING id, task_id, title, description, assignee, assignee_user_id, project_id, due_date, priority, status, estimate, tags, created_at, updated_at`,
    values
  );
  return res.rows[0] ? mapTaskRow(res.rows[0]) : null;
}

export async function queryProjects(): Promise<Project[]> {
  const client = getPool();
  const res = await client.query(
    'SELECT id, project_key, name, status, created_at, updated_at FROM projects ORDER BY created_at ASC'
  );
  return res.rows as Project[];
}

export async function createProject(data: {
  name: string;
  status?: 'active' | 'paused' | 'archived';
}): Promise<Project> {
  const client = getPool();
  const now = new Date().toISOString();
  const projectKey =
    data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') +
    '-' +
    Math.floor(Math.random() * 1000);
  const res = await client.query(
    `INSERT INTO projects (project_key, name, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4::timestamptz, $5::timestamptz)
     RETURNING id, project_key, name, status, created_at, updated_at`,
    [projectKey, data.name, data.status ?? 'active', now, now]
  );
  return res.rows[0] as Project;
}

export async function updateProject(
  id: string,
  updates: { name?: string; status?: 'active' | 'paused' | 'archived' }
): Promise<Project | null> {
  const set: string[] = [];
  const values: unknown[] = [];
  let i = 1;
  if (updates.name !== undefined) {
    set.push(`name = $${i}`);
    values.push(updates.name);
    i++;
  }
  if (updates.status !== undefined) {
    set.push(`status = $${i}`);
    values.push(updates.status);
    i++;
  }
  if (!set.length) return null;
  set.push(`updated_at = $${i}::timestamptz`);
  values.push(new Date().toISOString());
  i++;
  values.push(id);
  const client = getPool();
  const res = await client.query(
    `UPDATE projects SET ${set.join(', ')} WHERE id = $${i}
     RETURNING id, project_key, name, status, created_at, updated_at`,
    values
  );
  return (res.rows[0] as Project) ?? null;
}

export async function queryUsers(): Promise<User[]> {
  const client = getPool();
  const res = await client.query(
    `SELECT id, username, display_name, active, created_at
     FROM users
     WHERE active = true
     ORDER BY display_name ASC`
  );
  return res.rows as User[];
}

export async function importUsers(displayNames: string[]): Promise<User[]> {
  const client = getPool();
  const normalized = Array.from(
    new Set(displayNames.map((n) => n.trim()).filter(Boolean))
  );
  const inserted: User[] = [];
  for (const name of normalized) {
    const username = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '.')
      .replace(/^\.+|\.+$/g, '');
    const res = await client.query(
      `INSERT INTO users (username, display_name, active)
       VALUES ($1, $2, true)
       ON CONFLICT (username) DO UPDATE SET display_name = EXCLUDED.display_name
       RETURNING id, username, display_name, active, created_at`,
      [username, name]
    );
    inserted.push(res.rows[0] as User);
  }
  return inserted;
}

export async function addTaskEvent(data: {
  task_id: string;
  actor_user_id?: string | null;
  event_type?: string;
  message: string;
}): Promise<TaskEvent> {
  const client = getPool();
  const res = await client.query(
    `INSERT INTO task_events (task_id, actor_user_id, event_type, message)
     VALUES ($1, $2, $3, $4)
     RETURNING id, task_id, actor_user_id, event_type, message, created_at`,
    [data.task_id, data.actor_user_id ?? null, data.event_type ?? 'note', data.message]
  );
  return res.rows[0] as TaskEvent;
}

export async function getTaskEvents(taskId: string): Promise<TaskEvent[]> {
  const client = getPool();
  const res = await client.query(
    `SELECT id, task_id, actor_user_id, event_type, message, created_at
     FROM task_events
     WHERE task_id = $1
     ORDER BY created_at DESC`,
    [taskId]
  );
  return res.rows as TaskEvent[];
}

export async function releaseProjectTemplate(data: {
  name: string;
  template: 'funnel_launch' | 'content_update' | 'crm_cleanup';
}): Promise<{ project: Project; tasks: Task[] }> {
  const project = await createProject({ name: data.name, status: 'active' });
  const templates: Record<string, string[]> = {
    funnel_launch: [
      'Kickoff checklist',
      'Landing page QA',
      'CRM lead flow test',
      'Post-launch monitoring',
    ],
    content_update: [
      'Review existing copy',
      'Update primary CTA sections',
      'QA links and forms',
      'Publish and verify',
    ],
    crm_cleanup: [
      'Normalize source tags',
      'Deduplicate records',
      'Fix missing owners',
      'Re-run lead sync',
    ],
  };
  const taskTitles = templates[data.template] ?? templates.funnel_launch;
  const tasks: Task[] = [];
  for (const title of taskTitles) {
    const task = await createTask({
      title: `${data.name}: ${title}`,
      project_id: project.id,
      priority: 'medium',
      status: 'open',
    });
    tasks.push(task);
  }
  return { project, tasks };
}
