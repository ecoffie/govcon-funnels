import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

const ORIGINAL_ENV = process.env;

function createRequest(headers?: HeadersInit) {
  return new NextRequest('https://example.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
    vi.mocked(resetTasksAndProjectsToFeb28Bootcamp).mockReset();
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  it('rejects requests when no reset secret is configured', async () => {
    const response = await POST(createRequest());

    expect(response.status).toBe(401);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('rejects requests without the bearer secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';

    const response = await POST(createRequest());

    expect(response.status).toBe(401);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('allows authorized reset requests', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    vi.mocked(resetTasksAndProjectsToFeb28Bootcamp).mockResolvedValue({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ title: 'Task one' }, { title: 'Task two' }],
    } as Awaited<ReturnType<typeof resetTasksAndProjectsToFeb28Bootcamp>>);

    const response = await POST(createRequest({ authorization: 'Bearer reset-secret' }));

    expect(response.status).toBe(201);
    expect(resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledOnce();
  });
});
