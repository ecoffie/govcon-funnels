import type { Metadata } from 'next';

// Password-gated internal tracker — keep it out of search indexes.
export const metadata: Metadata = {
  title: 'HUBZone Webinar — Registration Tracker',
  robots: { index: false, follow: false },
};

export default function RegistrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
