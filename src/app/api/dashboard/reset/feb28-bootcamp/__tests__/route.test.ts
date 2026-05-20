import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

const resetMock = vi.hoisted(() => vi.fn());
const notifyMock = vi.hoisted(() => vi.fn());
const formatMock = vi.hoisted(() => vi.fn(() => 'reset summary'));

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: resetMock,
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: notifyMock,
  formatTemplateReleaseSummary: formatMock,
}));

import { POST } from '../route';

function postRequest(secret?: string): NextRequest {
  return new NextRequest('https://govcongiants.com/api/dashboard/reset/feb28-bootcamp', {
    method: 'POST',
    headers: secret ? { authorization: `Bearer ${secret}` } : undefined,
  });
}

describe('/api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    process.env.DASHBOARD_RESET_SECRET = 'reset-secret';
    delete process.env.DASHBOARD_API_SECRET;
  });

  afterEach(() => {
    delete process.env.DASHBOARD_RESET_SECRET;
    delete process.env.DASHBOARD_API_SECRET;
  });

  it('rejects unauthenticated reset attempts before deleting data', async () => {
    const response = await POST(postRequest());

    expect(response.status).toBe(401);
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('does not run when no reset secret is configured', async () => {
    delete process.env.DASHBOARD_RESET_SECRET;

    const response = await POST(postRequest('reset-secret'));

    expect(response.status).toBe(503);
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('runs the reset when the bearer secret matches', async () => {
    resetMock.mockResolvedValueOnce({
      project: {
        id: 'project-1',
        name: 'Feb 28th Bootcamp',
      },
      tasks: [
        { title: 'Confirm bootcamp offer' },
      ],
    });

    const response = await POST(postRequest('reset-secret'));

    expect(response.status).toBe(201);
    expect(resetMock).toHaveBeenCalledTimes(1);
    expect(notifyMock).toHaveBeenCalledWith('reset summary');
  });
});
