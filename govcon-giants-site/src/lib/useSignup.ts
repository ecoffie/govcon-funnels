import type { FormEvent } from 'react';
import { useState } from 'react';

/**
 * Shared email-capture hook — POSTs to the main site's lead API
 * (govcongiants.com/api/lead → GHL + Slack), tagged so podcast-site leads are
 * segmentable in the CRM. Replaces the launch-era stub that only wrote the
 * email to the visitor's own localStorage (no lead was ever captured).
 *
 * UX stays non-blocking: the success state shows even if the network call
 * fails (keepalive + fire-and-forget) — an API blip must not eat the signup
 * moment, and the request usually completes anyway.
 */
const LEAD_API = 'https://govcongiants.com/api/lead';

export function useSignup(tags: string[] = []) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    try {
      void fetch(LEAD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: value,
          name: '',
          source: 'podcast-site',
          tags: ['podcast-site', ...tags],
        }),
        keepalive: true,
      });
    } catch {
      /* never block the signup moment */
    }
    setDone(true);
  };

  const reset = () => {
    setEmail('');
    setDone(false);
  };

  return { email, setEmail, done, submit, reset };
}
