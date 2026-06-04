import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

const { resetMock, notifyMock } = vi.hoisted(() => ({
  resetMock: vi.fn(),
  notifyMock: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: resetMock,
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: notifyMock,
  formatTemplateReleaseSummary: vi.fn(() => 'summary'),
}));

import { POST } from '../route';

function request(secret?: string) {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: secret ? { authorization: `Bearer ${secret}` } : undefined,
  });
}

describe('dashboard reset route', () => {
  const originalResetSecret = process.env.DASHBOARD_RESET_SECRET;
  const originalApiSecret = process.env.DASHBOARD_API_SECRET;

  afterEach(() => {
    process.env.DASHBOARD_RESET_SECRET = originalResetSecret;
    process.env.DASHBOARD_API_SECRET = originalApiSecret;
    resetMock.mockReset();
    notifyMock.mockReset();
  });

  it('fails closed when no reset secret is configured', async () => {
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;

    const response = await POST(request());

    expect(response.status).toBe(503);
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('rejects requests without the configured reset secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    delete process.env.DASHBOARD_API_SECRET;

    const response = await POST(request('wrong-secret'));

    expect(response.status).toBe(401);
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('runs the reset with the configured reset secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    delete process.env.DASHBOARD_API_SECRET;
    resetMock.mockResolvedValue({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ title: 'Task 1' }],
    });

    const response = await POST(request('reset-secret'));

    expect(response.status).toBe(201);
    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});
