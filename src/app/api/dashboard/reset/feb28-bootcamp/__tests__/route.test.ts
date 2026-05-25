import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../route';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(() => 'summary'),
}));

const mockedReset = vi.mocked(resetTasksAndProjectsToFeb28Bootcamp);

function makeRequest(token?: string) {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    mockedReset.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('fails closed when no reset secret is configured', async () => {
    vi.stubEnv('DASHBOARD_RESET_SECRET', '');
    vi.stubEnv('DASHBOARD_API_SECRET', '');

    const response = await POST(makeRequest());

    expect(response.status).toBe(503);
    expect(mockedReset).not.toHaveBeenCalled();
  });

  it('rejects unauthenticated destructive reset requests', async () => {
    vi.stubEnv('DASHBOARD_RESET_SECRET', 'reset-secret');

    const response = await POST(makeRequest());

    expect(response.status).toBe(401);
    expect(mockedReset).not.toHaveBeenCalled();
  });

  it('runs the reset only with the configured bearer token', async () => {
    vi.stubEnv('DASHBOARD_RESET_SECRET', 'reset-secret');
    mockedReset.mockResolvedValue({
      project: {
        id: 'project-1',
        project_key: 'feb-28th-bootcamp',
        name: 'Feb 28th Bootcamp',
        status: 'active',
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-01T00:00:00.000Z',
        context: 'marketing',
      },
      tasks: [
        {
          id: 'task-1',
          task_id: '1',
          title: 'Feb 28th Bootcamp: Launch task',
          description: null,
          attachment_url: null,
          assignee: null,
          assignee_user_id: null,
          status: 'open',
          priority: 'medium',
          project_id: 'project-1',
          due_date: null,
          estimate: null,
          tags: [],
          created_at: '2026-01-01T00:00:00.000Z',
          updated_at: '2026-01-01T00:00:00.000Z',
          context: 'marketing',
        },
      ],
    });

    const response = await POST(makeRequest('reset-secret'));

    expect(response.status).toBe(201);
    expect(mockedReset).toHaveBeenCalledTimes(1);
  });
});
