import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(() => 'reset summary'),
}));

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: mocks.resetTasksAndProjectsToFeb28Bootcamp,
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: mocks.notifySlackTaskChange,
  formatTemplateReleaseSummary: mocks.formatTemplateReleaseSummary,
}));

import { POST } from '../route';

function createRequest(headers: Record<string, string> = {}) {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
    mocks.resetTasksAndProjectsToFeb28Bootcamp.mockReset();
    mocks.notifySlackTaskChange.mockReset();
    mocks.formatTemplateReleaseSummary.mockClear();
    mocks.formatTemplateReleaseSummary.mockReturnValue('reset summary');
  });

  it('refuses to run when no reset secret is configured', async () => {
    const response = await POST(createRequest());

    expect(response.status).toBe(503);
    expect(mocks.resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('rejects unauthenticated reset requests without deleting dashboard data', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'known-secret';

    const response = await POST(createRequest());

    expect(response.status).toBe(401);
    expect(mocks.resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('allows reset requests authenticated with the shared secret header', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'known-secret';
    mocks.resetTasksAndProjectsToFeb28Bootcamp.mockResolvedValue({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ title: 'Task 1' }],
    });

    const response = await POST(createRequest({
      'x-dashboard-reset-secret': 'known-secret',
    }));

    expect(response.status).toBe(201);
    expect(mocks.resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledTimes(1);
  });

  it('allows reset requests authenticated with a bearer token', async () => {
    process.env.DASHBOARD_API_SECRET = 'api-secret';
    mocks.resetTasksAndProjectsToFeb28Bootcamp.mockResolvedValue({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ title: 'Task 1' }],
    });

    const response = await POST(createRequest({
      authorization: 'Bearer api-secret',
    }));

    expect(response.status).toBe(201);
    expect(mocks.resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledTimes(1);
  });
});
