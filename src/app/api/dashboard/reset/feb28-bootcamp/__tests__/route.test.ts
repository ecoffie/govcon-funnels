import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const dbMocks = vi.hoisted(() => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

const slackMocks = vi.hoisted(() => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(() => 'summary'),
}));

vi.mock('@/lib/db', () => dbMocks);
vi.mock('@/lib/slackTasks', () => slackMocks);

import { POST } from '../route';

const originalEnv = {
  DASHBOARD_RESET_SECRET: process.env.DASHBOARD_RESET_SECRET,
  DASHBOARD_API_SECRET: process.env.DASHBOARD_API_SECRET,
};

function request(headers: Record<string, string> = {}) {
  return new NextRequest('http://localhost/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers,
  });
}

describe('Feb 28 bootcamp reset route', () => {
  beforeEach(() => {
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (originalEnv.DASHBOARD_RESET_SECRET === undefined) {
      delete process.env.DASHBOARD_RESET_SECRET;
    } else {
      process.env.DASHBOARD_RESET_SECRET = originalEnv.DASHBOARD_RESET_SECRET;
    }

    if (originalEnv.DASHBOARD_API_SECRET === undefined) {
      delete process.env.DASHBOARD_API_SECRET;
    } else {
      process.env.DASHBOARD_API_SECRET = originalEnv.DASHBOARD_API_SECRET;
    }
  });

  it('fails closed when no reset secret is configured', async () => {
    const response = await POST(request());

    expect(response.status).toBe(503);
    expect(dbMocks.resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('rejects anonymous requests before deleting dashboard data', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';

    const response = await POST(request());

    expect(response.status).toBe(401);
    expect(dbMocks.resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('allows requests with the configured reset secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    dbMocks.resetTasksAndProjectsToFeb28Bootcamp.mockResolvedValue({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [],
    });

    const response = await POST(request({ authorization: 'Bearer reset-secret' }));

    expect(response.status).toBe(201);
    expect(dbMocks.resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledOnce();
  });
});
