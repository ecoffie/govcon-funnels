import { afterEach, describe, expect, it, vi } from 'vitest';
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

const originalEnv = { ...process.env };

function request(headers: Record<string, string> = {}) {
  return new NextRequest('http://localhost/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers,
  });
}

afterEach(() => {
  process.env = { ...originalEnv };
  vi.clearAllMocks();
});

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  it('fails closed when no reset secret is configured', async () => {
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;

    const res = await POST(request());

    expect(res.status).toBe(503);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('rejects anonymous reset attempts', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';

    const res = await POST(request());

    expect(res.status).toBe(401);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('allows reset with the configured secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    vi.mocked(resetTasksAndProjectsToFeb28Bootcamp).mockResolvedValue({
      project: { id: 'p1', name: 'Bootcamp' },
      tasks: [{ title: 'Task 1' }],
      events: [],
    });

    const res = await POST(request({ authorization: 'Bearer reset-secret' }));

    expect(res.status).toBe(201);
    expect(resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledOnce();
  });
});
