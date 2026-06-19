import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

const mockReset = vi.mocked(resetTasksAndProjectsToFeb28Bootcamp);
const originalResetSecret = process.env.DASHBOARD_RESET_SECRET;
const originalApiSecret = process.env.DASHBOARD_API_SECRET;

function buildRequest(auth?: string): NextRequest {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: auth ? { authorization: auth } : undefined,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    mockReset.mockReset();
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
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

  it('fails closed when no reset secret is configured', async () => {
    const response = await POST(buildRequest());

    expect(response.status).toBe(503);
    expect(mockReset).not.toHaveBeenCalled();
  });

  it('rejects unauthenticated reset requests before deleting dashboard data', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';

    const response = await POST(buildRequest());

    expect(response.status).toBe(401);
    expect(mockReset).not.toHaveBeenCalled();
  });

  it('allows authorized reset requests', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    mockReset.mockResolvedValue({
      project: { id: 'project-1', name: 'Feb 28th Bootcamp' },
      tasks: [{ title: 'Task one' }],
    } as Awaited<ReturnType<typeof resetTasksAndProjectsToFeb28Bootcamp>>);

    const response = await POST(buildRequest('Bearer reset-secret'));

    expect(response.status).toBe(201);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
