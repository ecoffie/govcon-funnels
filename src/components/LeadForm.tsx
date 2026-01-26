'use client';

import { useState } from 'react';

interface LeadFormProps {
  buttonText?: string;
  redirectUrl?: string;
  source?: string;
}

export default function LeadForm({
  buttonText = "Get Free Access",
  redirectUrl = "/thank-you",
  source = "funnel"
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

      // Post to API endpoint
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source })
      }).catch(() => {
        // Continue even if API fails
      });

      // Redirect to thank you / upsell page
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="form-input"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="form-input"
      />
      <input
        type="tel"
        placeholder="Your Phone (optional)"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="form-input"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full green-glow disabled:opacity-50"
      >
        {isSubmitting ? 'Processing...' : buttonText}
      </button>
      <p className="text-center text-sm text-slate-400">
        Instant access. No credit card required.
      </p>
    </form>
  );
}
