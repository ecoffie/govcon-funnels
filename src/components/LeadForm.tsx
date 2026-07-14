'use client';

import { useState } from 'react';
import { trackLeadConversion } from '@/lib/google-ads';
import { getLeadSubmissionErrorMessage, submitLead } from '@/lib/lead-submit';

interface LeadFormProps {
  buttonText?: string;
  redirectUrl?: string;
  source?: string;
  /** Hide phone field (e.g. for minimal lead magnets) */
  hidePhone?: boolean;
  /** Show a Company Name field (e.g. webinar registration) */
  showCompany?: boolean;
  /** Make the company field required when shown (default true) */
  companyRequired?: boolean;
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
  showCompany = false,
  companyRequired = true,
  buttonClassName = "btn-primary w-full green-glow disabled:opacity-50",
  inputClassName = "form-input",
  helperTextClassName = "text-center text-sm text-slate-400"
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

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

      // Post to API endpoint (sends to CRM: GoHighLevel and/or webhook).
      // Do not redirect unless the server accepts the lead; otherwise rate
      // limits can look like successful signups while no CRM record exists.
      await submitLead({ ...formData, source, redirectUrl });

      // Fire Google Ads lead conversion, then redirect (deferred so the hit
      // isn't dropped on page unload). Redirects immediately if unconfigured.
      trackLeadConversion(() => {
        window.location.href = redirectUrl;
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage(getLeadSubmissionErrorMessage(error));
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
      {showCompany && (
        <input
          type="text"
          placeholder={companyRequired ? 'Company Name' : 'Company Name (optional)'}
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required={companyRequired}
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
      {errorMessage && (
        <p className="text-center text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
      <p className={helperTextClassName}>
        Instant access. No credit card required.
      </p>
    </form>
  );
}
