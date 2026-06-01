import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

const dbMocks = vi.hoisted(() => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

const slackMocks = vi.hoisted(() => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(),
}));

vi.mock('@/lib/db', () => dbMocks);
vi.mock('@/lib/slackTasks', () => slackMocks);

import { POST } from '../route';

function postRequest(token?: string): NextRequest {
  const headers = token ? { authorization: `Bearer ${token}` } : undefined;
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    dbMocks.resetTasksAndProjectsToFeb28Bootcamp.mockReset();
    slackMocks.notifySlackTaskChange.mockReset();
    slackMocks.formatTemplateReleaseSummary.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('fails closed when no reset secret is configured', async () => {
    const response = await POST(postRequest());

    expect(response.status).toBe(503);
    expect(dbMocks.resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('rejects requests without the bearer reset secret', async () => {
    vi.stubEnv('DASHBOARD_RESET_SECRET', 'reset-secret');

    const response = await POST(postRequest());

    expect(response.status).toBe(401);
    expect(dbMocks.resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('runs the reset when the bearer reset secret matches', async () => {
    vi.stubEnv('DASHBOARD_RESET_SECRET', 'reset-secret');
    dbMocks.resetTasksAndProjectsToFeb28Bootcamp.mockResolvedValue({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ title: 'Task 1' }],
    });
    slackMocks.formatTemplateReleaseSummary.mockReturnValue('summary');

    const response = await POST(postRequest('reset-secret'));

    expect(response.status).toBe(201);
    expect(dbMocks.resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledTimes(1);
    expect(slackMocks.notifySlackTaskChange).toHaveBeenCalledWith('summary');
  });
});
