type TaskItem = {
  id: string;
  task_id: string;
  title: string;
  status: string;
  updated_at: string;
  project_id: string | null;
};

type ProjectItem = {
  id: string;
  name: string;
};
import { queryProjects, queryTasks } from '@/lib/db';

const STATUS_LABEL: Record<string, string> = {
  open: 'Open',
  in_progress: 'In progress',
  review: 'Review',
  done: 'Done',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function RecentUpdates() {
  try {
    const [projects, tasks] = await Promise.all([
      queryProjects({ context: 'marketing' }),
      queryTasks({ context: 'marketing', limit: 8, includeDone: true }),
    ]);
    const byProjectId = new Map(
      (projects as ProjectItem[]).map((p) => [p.id, p.name])
    );

    if (!tasks.length) {
      return (
        <p className="text-sm text-slate-400">No recent task activity yet.</p>
      );
    }

    return (
      <ul className="space-y-3">
        {(tasks as TaskItem[]).map((task) => (
          <li key={task.id} className="border-b border-slate-800 pb-3 last:border-b-0">
            <p className="mb-1 text-sm font-semibold text-green-400">
              {formatDate(task.updated_at)}
            </p>
            <p className="text-sm text-slate-300">
              Task {task.task_id}: {task.title} -{' '}
              {STATUS_LABEL[task.status] ?? task.status} -{' '}
              {byProjectId.get(task.project_id || '') ?? 'Unassigned'}
            </p>
          </li>
        ))}
      </ul>
    );
  } catch {
    return (
      <p className="text-sm text-slate-400">
        Recent updates are unavailable right now.
      </p>
    );
  }
}
