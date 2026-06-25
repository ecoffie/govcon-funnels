'use client';

import { useState, useEffect } from 'react';
import { getVariant, trackConversion } from '@/lib/ab-test';
import { trackLeadConversion } from '@/lib/google-ads';

interface ABTestLeadFormProps {
  testId: string;
  fallbackButtonText?: string;
  redirectUrl?: string;
  source?: string;
  hidePhone?: boolean;
  buttonClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
}

export default function ABTestLeadForm({
  testId,
  fallbackButtonText = 'Get Free Access',
  redirectUrl = '/thank-you',
  source = 'funnel',
  hidePhone = false,
  buttonClassName = 'btn-primary w-full green-glow disabled:opacity-50',
  inputClassName = 'form-input',
  helperTextClassName = 'text-center text-sm text-slate-400',
}: ABTestLeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState(fallbackButtonText);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const variant = getVariant(testId);
    if (variant) {
      setButtonText(variant.name);
    }
  }, [testId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track A/B conversion
    trackConversion(testId, 'form_submit');

    try {
      // Store in localStorage for persistence
      const leads = JSON.parse(localStorage.getItem('govcon_leads') || '[]');
      leads.push({
        ...formData,
        source,
        abTestId: testId,
        abVariant: localStorage.getItem(`ab_${testId}`),
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('govcon_leads', JSON.stringify(leads));
      localStorage.setItem('leadName', formData.name);

      // Post to API endpoint (sends to CRM: GoHighLevel and/or webhook)
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source,
          redirectUrl,
          abTestId: testId,
          abVariant: localStorage.getItem(`ab_${testId}`),
        }),
      }).catch(() => {
        // Continue even if API fails so user still gets redirect
      });

      // Fire Google Ads lead conversion, then redirect (deferred so the hit
      // isn't dropped on page unload). Redirects immediately if unconfigured.
      trackLeadConversion(() => {
        window.location.href = redirectUrl;
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className={inputClassName}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className={inputClassName}
      />
      {!hidePhone && (
        <input
          type="tel"
          placeholder="Your Phone (optional)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClassName}
        />
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClassName}
      >
        {isSubmitting ? 'Processing...' : buttonText}
      </button>
      <p className={helperTextClassName}>
        Instant access. No credit card required.
      </p>
    </form>
  );
}
