'use client';

import { useState } from 'react';

interface LeadFormProps {
  buttonText?: string;
  redirectUrl?: string;
  source?: string;
  /** Hide phone field (e.g. for minimal lead magnets) */
  hidePhone?: boolean;
  /** Custom button class (e.g. for Encore branding) */
  buttonClassName?: string;
  /** Custom input class (e.g. form-input-encore for light theme) */
  inputClassName?: string;
  /** Custom helper text class */
  helperTextClassName?: string;
}

export default function LeadForm({
  buttonText = "Get Free Access",
  redirectUrl = "/thank-you",
  source = "funnel",
  hidePhone = false,
  buttonClassName = "btn-primary w-full green-glow disabled:opacity-50",
  inputClassName = "form-input",
  helperTextClassName = "text-center text-sm text-slate-400"
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store in localStorage for persistence
      const leads = JSON.parse(localStorage.getItem('govcon_leads') || '[]');
      leads.push({
        ...formData,
        source,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('govcon_leads', JSON.stringify(leads));
      localStorage.setItem('leadName', formData.name);

      // Post to API endpoint (sends to CRM: GoHighLevel and/or webhook)
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source, redirectUrl })
      }).catch(() => {
        // Continue even if API fails so user still gets redirect
      });

      // Redirect to thank you / upsell page
      window.location.href = redirectUrl;
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
