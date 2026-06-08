import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../route';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(() => 'reset summary'),
}));

const originalResetSecret = process.env.DASHBOARD_RESET_SECRET;
const originalApiSecret = process.env.DASHBOARD_API_SECRET;

function request(secret?: string) {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: secret ? { 'x-dashboard-reset-secret': secret } : undefined,
  });
}

describe('dashboard reset route', () => {
  beforeEach(() => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    delete process.env.DASHBOARD_API_SECRET;
    vi.mocked(resetTasksAndProjectsToFeb28Bootcamp).mockResolvedValue({
      project: { id: 'project-1', name: 'Bootcamp' },
      tasks: [{ title: 'Task 1' }],
    } as Awaited<ReturnType<typeof resetTasksAndProjectsToFeb28Bootcamp>>);
  });

  afterEach(() => {
    if (originalResetSecret === undefined) {
      delete process.env.DASHBOARD_RESET_SECRET;
    } else {
      process.env.DASHBOARD_RESET_SECRET = originalResetSecret;
    }

    if (originalApiSecret === undefined) {
      delete process.env.DASHBOARD_API_SECRET;
    } else {
      process.env.DASHBOARD_API_SECRET = originalApiSecret;
    }
  });

  it('rejects anonymous reset requests without mutating data', async () => {
    const response = await POST(request());

    expect(response.status).toBe(401);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('fails closed when no reset secret is configured', async () => {
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;

    const response = await POST(request('reset-secret'));

    expect(response.status).toBe(503);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('allows reset requests with the configured secret', async () => {
    const response = await POST(request('reset-secret'));

    expect(response.status).toBe(201);
    expect(resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledOnce();
  });
});
