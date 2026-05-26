import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(() => 'reset summary'),
}));

import { POST } from '../route';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';

function requestWithAuth(secret?: string) {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: secret ? { authorization: `Bearer ${secret}` } : undefined,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
    vi.mocked(resetTasksAndProjectsToFeb28Bootcamp).mockReset();
  });

  it('fails closed when no reset secret is configured', async () => {
    const response = await POST(requestWithAuth());

    expect(response.status).toBe(503);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('rejects requests without the bearer secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';

    const response = await POST(requestWithAuth());

    expect(response.status).toBe(401);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('allows the destructive reset only with the configured bearer secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    vi.mocked(resetTasksAndProjectsToFeb28Bootcamp).mockResolvedValueOnce({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ id: 'task-1', title: 'Task 1' }],
    } as Awaited<ReturnType<typeof resetTasksAndProjectsToFeb28Bootcamp>>);

    const response = await POST(requestWithAuth('reset-secret'));

    expect(response.status).toBe(201);
    expect(resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledTimes(1);
  });
});
