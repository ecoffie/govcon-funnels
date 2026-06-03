import { NextRequest } from 'next/server';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../route';
import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';
import { formatTemplateReleaseSummary, notifySlackTaskChange } from '@/lib/slackTasks';

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(),
}));

const resetMock = vi.mocked(resetTasksAndProjectsToFeb28Bootcamp);
const notifyMock = vi.mocked(notifySlackTaskChange);
const formatMock = vi.mocked(formatTemplateReleaseSummary);

function request(token?: string) {
  return new NextRequest('https://example.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });
}

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
    vi.clearAllMocks();
    resetMock.mockResolvedValue({
      project: { id: 'project-1', name: 'Feb 28 Bootcamp' },
      tasks: [{ title: 'Task 1' }],
    } as Awaited<ReturnType<typeof resetTasksAndProjectsToFeb28Bootcamp>>);
    formatMock.mockReturnValue('reset summary');
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('fails closed when no reset secret is configured', async () => {
    const response = await POST(request('anything'));

    expect(response.status).toBe(503);
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('rejects missing or invalid bearer tokens before resetting data', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'correct-secret';

    const missingResponse = await POST(request());
    const wrongResponse = await POST(request('wrong-secret'));

    expect(missingResponse.status).toBe(401);
    expect(wrongResponse.status).toBe(401);
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('runs the reset only when the bearer token matches the configured secret', async () => {
    process.env.DASHBOARD_RESET_SECRET = 'correct-secret';

    const response = await POST(request('correct-secret'));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.project.id).toBe('project-1');
    expect(resetMock).toHaveBeenCalledTimes(1);
    expect(notifyMock).toHaveBeenCalledWith('reset summary');
  });

  it('accepts DASHBOARD_API_SECRET as a fallback configured secret', async () => {
    process.env.DASHBOARD_API_SECRET = 'dashboard-secret';

    const response = await POST(request('dashboard-secret'));

    expect(response.status).toBe(201);
    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});
