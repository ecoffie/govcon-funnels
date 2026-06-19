import { describe, it, expect, vi, beforeEach } from 'vitest';
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

function postRequest(token?: string): NextRequest {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    mockedReset.mockReset();
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
  });

  it('fails closed when no reset secret is configured', async () => {
    const response = await POST(postRequest());

    expect(response.status).toBe(503);
    expect(mockedReset).not.toHaveBeenCalled();
  });

  it('rejects requests without the bearer secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';

    const response = await POST(postRequest('wrong-secret'));

    expect(response.status).toBe(401);
    expect(mockedReset).not.toHaveBeenCalled();
  });

  it('runs the destructive reset only for authorized requests', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    mockedReset.mockResolvedValueOnce({
      project: {
        id: 'project-1',
        project_key: 'feb28',
        name: 'Feb 28th Bootcamp',
        status: 'active',
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-01T00:00:00.000Z',
        context: 'marketing',
      },
      tasks: [],
    });

    const response = await POST(postRequest('reset-secret'));

    expect(response.status).toBe(201);
    expect(mockedReset).toHaveBeenCalledTimes(1);
  });
});
