'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDashboardAuth } from './DashboardAuthGate';

type ContextType = 'marketing' | 'delivery';

type Project = {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  context?: ContextType;
};

type Task = {
  id: string;
  task_id: string;
  title: string;
  status: string;
  due_date: string | null;
  assignee: string | null;
  priority: string | null;
  project_id: string | null;
  context?: ContextType;
};

const managerTitle: Record<ContextType, string> = {
  marketing: 'Marketing Tasks and Projects',
  delivery: 'Delivery to Clients Tasks and Projects',
};

const statusLabel: Record<string, string> = {
  open: 'Open',
  in_progress: 'In progress',
  review: 'Review',
  done: 'Done',
};

function formatDate(iso: string | null): string {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function DashboardTaskManager() {
  const { authHeaders, signOut } = useDashboardAuth();
  const [context, setContext] = useState<ContextType>('marketing');
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const [projectsRes, tasksRes] = await Promise.all([
          fetch(`/api/dashboard/projects?context=${context}`, {
            cache: 'no-store',
            headers: authHeaders,
          }),
          fetch(`/api/dashboard/tasks?context=${context}&limit=200&include_done=true`, {
            cache: 'no-store',
            headers: authHeaders,
          }),
        ]);
        if (projectsRes.status === 401 || tasksRes.status === 401) {
          signOut();
          throw new Error('Session expired — please sign in again.');
        }
        if (!projectsRes.ok || !tasksRes.ok) {
          throw new Error('Failed to load task manager data.');
        }
        const [projectsData, tasksData] = await Promise.all([
          projectsRes.json(),
          tasksRes.json(),
        ]);
        if (!active) return;
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setTasks(Array.isArray(tasksData) ? tasksData : []);
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Failed to load task manager data.');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
    // authHeaders/signOut are stable per session; re-run only on context change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  const projectById = useMemo(
    () => new Map(projects.map((p) => [p.id, p.name])),
    [projects]
  );

  return (
    <section>
      <div className="mb-3 inline-flex rounded-full border border-slate-700 bg-slate-900 p-1">
        <button
          type="button"
          onClick={() => setContext('marketing')}
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            context === 'marketing'
              ? 'border border-green-600/60 bg-green-500/10 text-green-300'
              : 'text-slate-300',
          ].join(' ')}
        >
          Marketing strategy
        </button>
        <button
          type="button"
          onClick={() => setContext('delivery')}
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            context === 'delivery'
              ? 'border border-green-600/60 bg-green-500/10 text-green-300'
              : 'text-slate-300',
          ].join(' ')}
        >
          Delivery to clients
        </button>
      </div>

      <h2 className="mb-2 text-2xl font-bold text-white">{managerTitle[context]}</h2>
      <p className="mb-3 text-sm text-slate-400">
        {tasks.length} tasks · {projects.length} projects
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/70">
        <table className="min-w-full table-fixed border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="w-24 px-3 py-2">ID</th>
              <th className="w-48 px-3 py-2">Project</th>
              <th className="px-3 py-2">Task</th>
              <th className="w-32 px-3 py-2">Status</th>
              <th className="w-36 px-3 py-2">Due</th>
              <th className="w-40 px-3 py-2">Assignee</th>
              <th className="w-28 px-3 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-3 py-5 text-slate-400">
                  Loading task manager...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-3 py-5 text-red-400">
                  {error}
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-5 text-slate-400">
                  No tasks found for this manager.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-b border-slate-800/80 align-top">
                  <td className="px-3 py-2 font-semibold text-green-400">{task.task_id}</td>
                  <td className="px-3 py-2 text-slate-300">
                    {projectById.get(task.project_id || '') ?? 'Unassigned'}
                  </td>
                  <td className="px-3 py-2 text-slate-200">{task.title}</td>
                  <td className="px-3 py-2 text-slate-300">
                    {statusLabel[task.status] ?? task.status}
                  </td>
                  <td className="px-3 py-2 text-slate-300">{formatDate(task.due_date)}</td>
                  <td className="px-3 py-2 text-slate-300">{task.assignee || 'Unassigned'}</td>
                  <td className="px-3 py-2 text-slate-300">
                    {task.priority === 'high' ? 'High' : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
