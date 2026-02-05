import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Free 12-Day Government Contracting Course | GovCon Giants',
  description: 'Learn government contracting from scratch. Join thousands of entrepreneurs who have used this free course to break into the $700+ billion federal marketplace.',
};

const courseModules = [
  { day: 1, title: "Is This the Right Decision for Me?", desc: "Assess if government contracting fits your business goals" },
  { day: 2, title: "Is This Really for Me?", desc: "Deep dive into what it takes to succeed" },
  { day: 3, title: "What Can I Sell to the Federal Government?", desc: "Discover what products/services are in demand" },
  { day: 4, title: "Is My Business Eligible to Sell?", desc: "Check your eligibility requirements" },
  { day: 5, title: "Will My Product Sell?", desc: "Market research fundamentals" },
  { day: 6, title: "How Do I Find the Right Opportunity?", desc: "Navigate SAM.gov and other sources" },
  { day: 7, title: "How Do I Find Small Opportunities?", desc: "Micro-purchase and simplified acquisitions" },
  { day: 8, title: "How Do I Make Contact?", desc: "Build relationships with contracting officers" },
  { day: 9, title: "How Do I Get Set Up?", desc: "SAM.gov registration walkthrough" },
  { day: 10, title: "What Are the Next Steps?", desc: "Your 90-day action plan" },
  { day: 11, title: "How Do I Build a Capability Statement?", desc: "Create your one-page marketing document" },
  { day: 12, title: "How Do I Stay Optimized?", desc: "Continuous improvement strategies" },
];

export default function FreeCoursePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                FREE COURSE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Learn Government Contracting <span className="text-green-500">From Scratch</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of entrepreneurs who have used this free course to break into the $700+ billion federal marketplace.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-8">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  12-Day Course
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  5,000+ Students
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% FREE
                </span>
              </div>
            </div>
            <div className="card green-glow">
              <h3 className="text-2xl font-bold mb-6 text-center">Start Your Free Course</h3>
              <LeadForm
                buttonText="Start Free Course Now"
                redirectUrl="/free-course/upsell"
                source="free-course"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="section bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What You&apos;ll Learn</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            A step-by-step journey from complete beginner to confident government contractor
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseModules.map((module) => (
              <div key={module.day} className="card hover:translate-y-[-4px] transition-transform">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-500 font-bold">Day {module.day}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{module.title}</h3>
                    <p className="text-sm text-slate-400">{module.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-lg mx-auto">
          <div className="card green-glow text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-slate-300 mb-6">
              Join 5,000+ entrepreneurs who are already learning how to win federal contracts.
            </p>
            <LeadForm
              buttonText="Get Free Access Now"
              redirectUrl="/free-course/upsell"
              source="free-course"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 GovCon Giants. All rights reserved.
      </footer>
    </main>
  );
}
