import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

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

const ORIGINAL_ENV = process.env;

function createRequest(token?: string) {
  return new NextRequest('http://localhost/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
    mocks.resetTasksAndProjectsToFeb28Bootcamp.mockReset();
    mocks.notifySlackTaskChange.mockReset();
    mocks.formatTemplateReleaseSummary.mockClear();
  });

  it('fails closed when no reset secret is configured', async () => {
    const response = await POST(createRequest());
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('secret not configured');
    expect(mocks.resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('rejects requests without the reset bearer token', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';

    const response = await POST(createRequest());
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe('Unauthorized');
    expect(mocks.resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('allows the destructive reset with the configured bearer token', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    mocks.resetTasksAndProjectsToFeb28Bootcamp.mockResolvedValueOnce({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ title: 'Task 1' }],
    });

    const response = await POST(createRequest('reset-secret'));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.project.id).toBe('project-1');
    expect(mocks.resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledTimes(1);
    expect(mocks.notifySlackTaskChange).toHaveBeenCalledWith('reset summary');
  });
});
