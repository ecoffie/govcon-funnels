import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Free TempNet Book | Encore Funding',
  description: 'Download the free TempNet book from Encore Funding. Government contractor financing insights and resources.',
};

export default function EncorePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero + Form - Encore: white bg, dark text, orange accents */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Encore branding */}
          <p className="text-orange-500 font-semibold text-sm tracking-wide uppercase mb-6">
            Encore Funding
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Get Your Free <span className="text-orange-500">TempNet Book</span>
          </h1>
          <p className="text-slate-600 text-lg mb-10">
            Enter your name and email for instant access to the PDF. Then we&apos;ll take you to Encore Funding.
          </p>

          {/* Form card - light with orange accent */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 shadow-lg">
            <LeadForm
              buttonText="Download Free Book"
              redirectUrl="/encore/thank-you"
              source="encore"
              hidePhone
              inputClassName="form-input-encore"
              helperTextClassName="text-center text-sm text-slate-500"
              buttonClassName="w-full py-4 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50 encore-glow"
            />
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="py-8 px-6 border-t border-slate-200 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Encore Funding
        </p>
      </footer>
    </main>
  );
}
