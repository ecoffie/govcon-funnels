/**
 * Redis (Upstash) client for dashboard tasks.
 * Set KV_REST_API_URL and KV_REST_API_TOKEN in env.
 * Uses the existing Upstash Redis instance shared across GovCon projects,
 * with the "gfd:" namespace prefix to avoid key collisions.
 */

import { Redis } from '@upstash/redis';

const NS = 'gfd';
export type TaskContext = 'marketing' | 'delivery';

let _redis: Redis | null = null;

function getRedis(): Redis {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error('KV_REST_API_URL is not set');
  }
  if (!_redis) {
    _redis = new Redis({ url, token });
  }
  return _redis;
}

const k = {
  user:     (id: string) => `${NS}:user:${id}`,
  users:    ()           => `${NS}:users`,
  uname:    (u: string)  => `${NS}:uname:${u}`,
  project:  (id: string) => `${NS}:project:${id}`,
  projects: ()           => `${NS}:projects`,
  task:     (id: string) => `${NS}:task:${id}`,
  tasks:    ()           => `${NS}:tasks`,
  taskSeq:  ()           => `${NS}:task:seq`,
  tid:      (t: string)  => `${NS}:tid:${t}`,
  events:   (id: string) => `${NS}:events:${id}`,
};

export interface Task {
  id: string;
  task_id: string;
  title: string;
  description: string | null;
  attachment_url: string | null;
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
  context: TaskContext;
}

export interface Project {
  id: string;
  project_key: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  created_at: string;
  updated_at: string;
  context: TaskContext;
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

function strOrNull(v: unknown): string | null {
  if (v === null || v === undefined || v === '' || v === false) return null;
  return String(v);
}

function normalizeContext(input: unknown): TaskContext {
  return input === 'delivery' ? 'delivery' : 'marketing';
}

function mapTask(h: Record<string, unknown>): Task {
  let tags: string[] = [];
  if (Array.isArray(h.tags)) {
    tags = h.tags as string[];
  } else if (typeof h.tags === 'string' && h.tags) {
    try { tags = JSON.parse(h.tags); } catch { tags = []; }
  }
  return {
    id: String(h.id ?? ''),
    task_id: String(h.task_id ?? ''),
    title: String(h.title ?? ''),
    description: strOrNull(h.description),
    attachment_url: strOrNull(h.attachment_url),
    assignee: strOrNull(h.assignee),
    assignee_user_id: strOrNull(h.assignee_user_id),
    project_id: strOrNull(h.project_id),
    due_date: strOrNull(h.due_date),
    priority: strOrNull(h.priority),
    status: String(h.status ?? 'open'),
    estimate: strOrNull(h.estimate),
    tags,
    created_at: String(h.created_at ?? ''),
    updated_at: String(h.updated_at ?? ''),
    context: normalizeContext(h.context),
  };
}

function mapProject(h: Record<string, unknown>): Project {
  return {
    id: String(h.id ?? ''),
    project_key: String(h.project_key ?? ''),
    name: String(h.name ?? ''),
    status: (h.status as 'active' | 'paused' | 'archived') || 'active',
    created_at: String(h.created_at ?? ''),
    updated_at: String(h.updated_at ?? ''),
    context: normalizeContext(h.context),
  };
}

function mapUser(h: Record<string, unknown>): User {
  return {
    id: String(h.id ?? ''),
    username: String(h.username ?? ''),
    display_name: String(h.display_name ?? ''),
    active: h.active === 'true' || h.active === true,
    created_at: String(h.created_at ?? ''),
  };
}

async function ensureDefaultProject(context: TaskContext): Promise<string> {
  const r = getRedis();
  const ids = await r.smembers(k.projects());
  if (ids.length > 0) {
    const hashes = await Promise.all(
      (ids as string[]).map(id => r.hgetall<Record<string, unknown>>(k.project(id)))
    );
    const active = hashes.find(
      h => h && h.status === 'active' && normalizeContext(h.context) === context
    );
    if (active) return String(active.id);
  }
  const project = await createProject({
    name: context === 'delivery' ? 'Delivery Ops' : 'Marketing Ops',
    status: 'active',
    context,
  });
  return project.id;
}

export async function queryTasks(opts: {
  limit?: number;
  status?: string;
  project_id?: string;
  includeDone?: boolean;
  context?: TaskContext;
}): Promise<Task[]> {
  const { limit = 50, status, project_id, includeDone = true, context } = opts;
  const r = getRedis();
  const ids = await r.smembers(k.tasks());
  if (!(ids as string[]).length) return [];
  const hashes = await Promise.all(
    (ids as string[]).map(id => r.hgetall<Record<string, unknown>>(k.task(id)))
  );
  let tasks = hashes
    .filter((h): h is Record<string, unknown> => h !== null)
    .map(mapTask);
  if (context) tasks = tasks.filter(t => t.context === context);
  if (status) tasks = tasks.filter(t => t.status === status);
  if (project_id) tasks = tasks.filter(t => t.project_id === project_id);
  if (!includeDone) tasks = tasks.filter(t => t.status !== 'done');
  tasks.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
  return tasks.slice(0, limit);
}

export async function getTaskById(id: string): Promise<Task | null> {
  const r = getRedis();
  const h = await r.hgetall<Record<string, unknown>>(k.task(id));
  return h ? mapTask(h) : null;
}

export async function getTaskByTaskId(taskId: string): Promise<Task | null> {
  const r = getRedis();
  const normalized = normalizeTaskId(taskId);
  let uuid = await r.get<string>(k.tid(taskId));
  if (!uuid) uuid = await r.get<string>(k.tid(normalized));
  if (!uuid) return null;
  return getTaskById(uuid);
}

export function normalizeTaskId(input: string): string {
  const s = input.trim().toUpperCase().replace(/\s/g, '');
  if (/^\d+$/.test(s)) return 'T-' + s.padStart(3, '0');
  if (/^T-?\d+$/.test(s)) return 'T-' + s.replace(/^T-?/, '').padStart(3, '0');
  return input.trim();
}

async function nextTaskId(): Promise<string> {
  const r = getRedis();
  const num = await r.incr(k.taskSeq());
  return 'T-' + String(num).padStart(3, '0');
}

export async function createTask(data: {
  title: string;
  description?: string | null;
  attachment_url?: string | null;
  assignee?: string | null;
  assignee_user_id?: string | null;
  project_id?: string | null;
  due_date?: string | null;
  priority?: string | null;
  status?: 'open' | 'in_progress' | 'review' | 'done' | null;
  estimate?: string | null;
  tags?: string[] | null;
  context?: TaskContext;
}): Promise<Task> {
  const r = getRedis();
  const id = crypto.randomUUID();
  const task_id = await nextTaskId();
  let context: TaskContext = normalizeContext(data.context);
  if (data.project_id) {
    const linkedProject = await r.hgetall<Record<string, unknown>>(k.project(data.project_id));
    if (linkedProject) context = normalizeContext(linkedProject.context);
  }
  const projectId = data.project_id || (await ensureDefaultProject(context));
  const now = new Date().toISOString();
  const status = data.status || 'open';
  const hash: Record<string, string> = {
    id,
    task_id,
    title: data.title,
    description: data.description ?? '',
    attachment_url: data.attachment_url ?? '',
    assignee: data.assignee ?? '',
    assignee_user_id: data.assignee_user_id ?? '',
    project_id: projectId,
    due_date: data.due_date ?? '',
    priority: data.priority ?? '',
    status,
    estimate: data.estimate ?? '',
    tags: JSON.stringify(data.tags ?? []),
    context,
    created_at: now,
    updated_at: now,
  };
  await r.hset(k.task(id), hash);
  await r.sadd(k.tasks(), id);
  await r.set(k.tid(task_id), id);
  return mapTask(hash);
}

export async function updateTask(
  id: string,
  updates: {
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
  }
): Promise<Task | null> {
  const r = getRedis();
  const existing = await r.hgetall<Record<string, unknown>>(k.task(id));
  if (!existing) return null;
  const now = new Date().toISOString();
  const patch: Record<string, string> = { updated_at: now };
  if (updates.title !== undefined) patch.title = updates.title;
  if (updates.description !== undefined) patch.description = updates.description ?? '';
  if (updates.attachment_url !== undefined) patch.attachment_url = updates.attachment_url ?? '';
  if (updates.assignee !== undefined) patch.assignee = updates.assignee ?? '';
  if (updates.assignee_user_id !== undefined) patch.assignee_user_id = updates.assignee_user_id ?? '';
  if (updates.project_id !== undefined) patch.project_id = updates.project_id ?? '';
  if (updates.due_date !== undefined) patch.due_date = updates.due_date ?? '';
  if (updates.priority !== undefined) patch.priority = updates.priority ?? '';
  if (updates.estimate !== undefined) patch.estimate = updates.estimate ?? '';
  if (updates.tags !== undefined) patch.tags = JSON.stringify(updates.tags ?? []);
  if (updates.status !== undefined) patch.status = updates.status;
  if (updates.context !== undefined) patch.context = normalizeContext(updates.context);
  await r.hset(k.task(id), patch);
  const updated = await r.hgetall<Record<string, unknown>>(k.task(id));
  return updated ? mapTask(updated) : null;
}

export async function queryProjects(context?: TaskContext): Promise<Project[]> {
  const r = getRedis();
  const ids = await r.smembers(k.projects());
  if (!(ids as string[]).length) return [];
  const hashes = await Promise.all(
    (ids as string[]).map(id => r.hgetall<Record<string, unknown>>(k.project(id)))
  );
  let projects = hashes
    .filter((h): h is Record<string, unknown> => h !== null)
    .map(mapProject);
  if (context) projects = projects.filter((p) => p.context === context);
  return projects.sort((a, b) => a.created_at.localeCompare(b.created_at));
}

export async function createProject(data: {
  name: string;
  status?: 'active' | 'paused' | 'archived';
  context?: TaskContext;
}): Promise<Project> {
  const r = getRedis();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const projectKey =
    data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') +
    '-' + Math.floor(Math.random() * 1000);
  const hash: Record<string, string> = {
    id,
    project_key: projectKey,
    name: data.name,
    status: data.status ?? 'active',
    context: normalizeContext(data.context),
    created_at: now,
    updated_at: now,
  };
  await r.hset(k.project(id), hash);
  await r.sadd(k.projects(), id);
  return mapProject(hash);
}

export async function updateProject(
  id: string,
  updates: {
    name?: string;
    status?: 'active' | 'paused' | 'archived';
    context?: TaskContext;
  }
): Promise<Project | null> {
  const r = getRedis();
  const existing = await r.hgetall<Record<string, unknown>>(k.project(id));
  if (!existing) return null;
  if (!updates.name && !updates.status && updates.context === undefined) return null;
  const now = new Date().toISOString();
  const patch: Record<string, string> = { updated_at: now };
  if (updates.name) patch.name = updates.name;
  if (updates.status) patch.status = updates.status;
  if (updates.context !== undefined) patch.context = normalizeContext(updates.context);
  await r.hset(k.project(id), patch);
  const updated = await r.hgetall<Record<string, unknown>>(k.project(id));
  return updated ? mapProject(updated) : null;
}

export async function queryUsers(): Promise<User[]> {
  const r = getRedis();
  const ids = await r.smembers(k.users());
  if (!(ids as string[]).length) return [];
  const hashes = await Promise.all(
    (ids as string[]).map(id => r.hgetall<Record<string, unknown>>(k.user(id)))
  );
  return hashes
    .filter((h): h is Record<string, unknown> => h !== null && (h.active === 'true' || h.active === true))
    .map(mapUser)
    .sort((a, b) => a.display_name.localeCompare(b.display_name));
}

export async function importUsers(displayNames: string[]): Promise<User[]> {
  const r = getRedis();
  const normalized = Array.from(
    new Set(displayNames.map(n => n.trim()).filter(Boolean))
  );
  const inserted: User[] = [];
  for (const name of normalized) {
    const username = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '.')
      .replace(/^\.+|\.+$/g, '');
    const existingId = await r.get<string>(k.uname(username));
    if (existingId) {
      await r.hset(k.user(existingId), { display_name: name });
      const h = await r.hgetall<Record<string, unknown>>(k.user(existingId));
      if (h) inserted.push(mapUser(h));
    } else {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const hash: Record<string, string> = {
        id, username, display_name: name, active: 'true', created_at: now,
      };
      await r.hset(k.user(id), hash);
      await r.sadd(k.users(), id);
      await r.set(k.uname(username), id);
      inserted.push(mapUser(hash));
    }
  }
  return inserted;
}

export async function addTaskEvent(data: {
  task_id: string;
  actor_user_id?: string | null;
  event_type?: string;
  message: string;
}): Promise<TaskEvent> {
  const r = getRedis();
  const event: TaskEvent = {
    id: crypto.randomUUID(),
    task_id: data.task_id,
    actor_user_id: data.actor_user_id ?? null,
    event_type: data.event_type ?? 'note',
    message: data.message,
    created_at: new Date().toISOString(),
  };
  await r.lpush(k.events(data.task_id), event);
  return event;
}

export async function getTaskEvents(taskId: string): Promise<TaskEvent[]> {
  const r = getRedis();
  const items = await r.lrange<TaskEvent>(k.events(taskId), 0, -1);
  return items;
}

export async function releaseProjectTemplate(data: {
  name: string;
  template: 'funnel_launch' | 'content_update' | 'crm_cleanup' | 'bootcamp';
  context?: TaskContext;
}): Promise<{ project: Project; tasks: Task[] }> {
  const context = normalizeContext(data.context);
  const project = await createProject({
    name: data.name,
    status: 'active',
    context,
  });
  const templates: Record<'funnel_launch' | 'content_update' | 'crm_cleanup' | 'bootcamp', string[]> = {
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
    // Monthly bootcamp preset. Replace these titles with your exact list when provided.
    bootcamp: [
      'Confirm bootcamp offer and monthly objective',
      'Finalize bootcamp landing page headline and CTA',
      'QA registration form and tracking parameters',
      'Upload/update bootcamp handouts and download links',
      'Configure CRM tags and pipeline stage for bootcamp leads',
      'Verify Slack lead + task notifications are active',
      'Schedule promotional email and SMS sequence',
      'Publish social promo assets and ad links',
      'Run full test signup (form -> CRM -> Slack -> email)',
      'Launch day checklist and live monitoring',
      'Post-bootcamp replay + follow-up sequence',
      'Review conversion metrics and lessons learned',
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
      context,
    });
    tasks.push(task);
  }
  return { project, tasks };
}

export async function resetTasksAndProjectsToFeb28Bootcamp(): Promise<{
  project: Project;
  tasks: Task[];
}> {
  const r = getRedis();

  const taskIds = (await r.smembers(k.tasks())) as string[];
  for (const id of taskIds) {
    const taskHash = await r.hgetall<Record<string, unknown>>(k.task(id));
    if (taskHash && taskHash.task_id) {
      await r.del(k.tid(String(taskHash.task_id)));
    }
    await r.del(k.task(id));
    await r.del(k.events(id));
  }
  await r.del(k.tasks());
  await r.del(k.taskSeq());

  const projectIds = (await r.smembers(k.projects())) as string[];
  for (const id of projectIds) {
    await r.del(k.project(id));
  }
  await r.del(k.projects());

  return releaseProjectTemplate({
    name: 'Feb 28th Bootcamp',
    template: 'bootcamp',
  });
}
