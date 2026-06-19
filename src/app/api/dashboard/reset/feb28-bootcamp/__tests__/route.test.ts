import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../route';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';
import { notifySlackTaskChange } from '@/lib/slackTasks';

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(() => 'template summary'),
}));

const resetMock = vi.mocked(resetTasksAndProjectsToFeb28Bootcamp);
const notifyMock = vi.mocked(notifySlackTaskChange);

function requestWithAuth(token?: string): NextRequest {
  const headers = new Headers();
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
  });

  it('fails closed when no reset secret is configured', async () => {
    const response = await POST(requestWithAuth('anything'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('not configured');
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('rejects unauthorized reset requests before deleting dashboard data', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';

    const response = await POST(requestWithAuth('wrong-secret'));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe('Unauthorized');
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('allows authorized reset requests', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    resetMock.mockResolvedValueOnce({
      project: {
        id: 'project-1',
        project_key: 'feb28-bootcamp',
        name: 'Feb 28th Bootcamp',
        status: 'active',
        context: 'marketing',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      tasks: [
        {
          id: 'task-1',
          task_id: '1',
          title: 'Confirm bootcamp offer',
          description: null,
          attachment_url: null,
          assignee: null,
          assignee_user_id: null,
          status: 'open',
          priority: 'medium',
          estimate: null,
          tags: [],
          due_date: null,
          context: 'marketing',
          project_id: 'project-1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    });
    notifyMock.mockResolvedValueOnce(undefined);

    const response = await POST(requestWithAuth('reset-secret'));

    expect(response.status).toBe(201);
    expect(resetMock).toHaveBeenCalledTimes(1);
    expect(notifyMock).toHaveBeenCalledTimes(1);
  });
});
