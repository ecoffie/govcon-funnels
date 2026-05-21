import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(() => 'summary'),
}));

import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';
import { POST } from '../route';

const resetMock = vi.mocked(resetTasksAndProjectsToFeb28Bootcamp);

function request(headers: HeadersInit = {}) {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    delete process.env.DASHBOARD_API_SECRET;
  });

  afterEach(() => {
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
  });

  it('rejects anonymous reset requests before touching dashboard data', async () => {
    const response = await POST(request());

    expect(response.status).toBe(401);
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('fails closed when no reset secret is configured', async () => {
    delete process.env.DASHBOARD_RESET_SECRET;

    const response = await POST(request({ 'x-dashboard-reset-secret': 'reset-secret' }));

    expect(response.status).toBe(503);
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('allows authorized reset requests', async () => {
    resetMock.mockResolvedValueOnce({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ id: 'task-1', title: 'Task 1' }],
    } as Awaited<ReturnType<typeof resetTasksAndProjectsToFeb28Bootcamp>>);

    const response = await POST(request({ authorization: 'Bearer reset-secret' }));

    expect(response.status).toBe(201);
    expect(resetMock).toHaveBeenCalledOnce();
  });
});
