'use client';

import { FormEvent, useState } from 'react';
import styles from './NewsletterForm.module.css';

/*
 * One newsletter signup for the whole site: homepage hero, footer action-plan
 * box, and the header modal. `tone` only changes the input colors for the
 * surface it sits on; the submit path is identical everywhere.
 */
export default function NewsletterForm({
  compact = false,
  tone = 'dark',
  onSuccess,
}: {
  compact?: boolean;
  tone?: 'dark' | 'light';
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || status === 'submitting') return;
    setStatus('submitting');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'newsletter' }),
      });
      if (!response.ok) throw new Error(`Lead request failed: ${response.status}`);
      setStatus('done');
      onSuccess?.();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <p className={styles.success}>✓ You&apos;re on the list — check your inbox.</p>;
  }

  const formClass = [
    styles.form,
    compact ? styles.compact : styles.hero,
    tone === 'light' ? styles.light : '',
  ].join(' ');

  return (
    <form className={formClass} onSubmit={submit} aria-label="Newsletter signup">
      <input
        type="email"
        required
        value={email}
        disabled={status === 'submitting'}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
        aria-label="Email address"
      />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Joining…' : compact ? 'Send Me the Action Plan →' : 'Join the Newsletter →'}
      </button>
      {status === 'error' && <span className={styles.formError}>Something went wrong — try again.</span>}
    </form>
  );
}
