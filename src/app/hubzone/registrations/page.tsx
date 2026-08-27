import { notFound } from 'next/navigation';

/**
 * Retired HUBZone webinar registration command center.
 * Intentionally returns 404 — no password gate, no API fetch, no registrant UI.
 */
export default function HubzoneRegistrationsPage() {
  notFound();
}
