import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAccessCookieValue } from '@/lib/accessToken';
import CourseClient from './CourseClient';

export const runtime = 'nodejs';

export default async function Jan31PaidCoursePage() {
  // In development, allow viewing the course without payment (so you can preview)
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    return <CourseClient />;
  }

  const cookie = cookies().get('jan31_bootcamp_access')?.value;
  let result: { ok: boolean } = { ok: false };
  try {
    result = verifyAccessCookieValue({
      value: cookie,
      scope: 'jan31',
      maxAgeMs: 1000 * 60 * 60 * 24 * 365, // 1 year
    });
  } catch {
    // e.g. missing ACCESS_TOKEN_SECRET
  }

  if (!result.ok) {
    redirect('/jan-31-bootcamp-paid/checkout');
  }

  return <CourseClient />;
}

