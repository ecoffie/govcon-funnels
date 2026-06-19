import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db', () => ({
  resetTasksAndProjectsToFeb28Bootcamp: vi.fn(),
}));

vi.mock('@/lib/slackTasks', () => ({
  notifySlackTaskChange: vi.fn(),
  formatTemplateReleaseSummary: vi.fn(() => 'reset summary'),
}));

import { resetTasksAndProjectsToFeb28Bootcamp } from '@/lib/db';
import { POST } from '../route';

describe('POST /api/dashboard/reset/feb28-bootcamp', () => {
  beforeEach(() => {
    vi.mocked(resetTasksAndProjectsToFeb28Bootcamp).mockReset();
    vi.unstubAllEnvs();
  });

  it('does not run the destructive reset when no reset secret is configured', async () => {
    vi.stubEnv('DASHBOARD_RESET_SECRET', '');
    vi.stubEnv('DASHBOARD_API_SECRET', '');
    const request = new NextRequest(
      'https://govcongiants.com/api/dashboard/reset/feb28-bootcamp',
      { method: 'POST' }
    );

    const response = await POST(request);

    expect(response.status).toBe(503);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('rejects requests without the configured reset secret', async () => {
    vi.stubEnv('DASHBOARD_RESET_SECRET', 'known-secret');
    vi.stubEnv('DASHBOARD_API_SECRET', '');
    const request = new NextRequest(
      'https://govcongiants.com/api/dashboard/reset/feb28-bootcamp',
      { method: 'POST', headers: { 'x-dashboard-secret': 'wrong-secret' } }
    );

    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(resetTasksAndProjectsToFeb28Bootcamp).not.toHaveBeenCalled();
  });

  it('allows the reset with the configured bearer secret', async () => {
    vi.stubEnv('DASHBOARD_RESET_SECRET', 'known-secret');
    vi.stubEnv('DASHBOARD_API_SECRET', '');
    vi.mocked(resetTasksAndProjectsToFeb28Bootcamp).mockResolvedValueOnce({
      project: {
        id: 'project-1',
        project_key: 'FEB',
        name: 'Feb 28th Bootcamp',
        status: 'active',
        created_at: '2026-05-19T00:00:00.000Z',
        updated_at: '2026-05-19T00:00:00.000Z',
        context: 'marketing',
      },
      tasks: [],
    });
    const request = new NextRequest(
      'https://govcongiants.com/api/dashboard/reset/feb28-bootcamp',
      { method: 'POST', headers: { authorization: 'Bearer known-secret' } }
    );

    const response = await POST(request);

    expect(response.status).toBe(201);
    expect(resetTasksAndProjectsToFeb28Bootcamp).toHaveBeenCalledOnce();
  });
});
