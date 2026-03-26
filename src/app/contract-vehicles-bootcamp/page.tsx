import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Contract Vehicles Bootcamp - IDIQs, BPAs & Set-Asides',
  description: 'Free live bootcamp: Learn IDIQs, BPAs, Sources Sought, set-asides, and major federal contract types. Live on Zoom.',
  path: '/contract-vehicles-bootcamp',
  keywords: ['IDIQ contracts', 'BPA government', 'contract vehicles', 'federal set-asides', 'government contracting bootcamp'],
});

const freeDownloads = [
  {
    icon: '📊',
    title: 'March 2026 Expiring Contracts List',
    desc: '15 sample contracts from 944 expiring in March 2026',
  },
  {
    icon: '✅',
    title: 'Recompete Positioning Checklist',
    desc: '18-month timeline to position for expiring contracts',
  },
  {
    icon: '🎯',
    title: '10 IDIQ Vehicles Guide',
    desc: 'GSA MAS, OASIS+, CIO-SP4, SEWP & more explained',
  },
  {
    icon: '📋',
    title: 'Active IDIQ Vehicles List',
    desc: '50 vehicles with ceiling values & NAICS codes',
  },
  {
    icon: '📄',
    title: 'Sources Sought Response Template',
    desc: 'Fill-in-the-blank template to respond to RFIs',
  },
  {
    icon: '📝',
    title: 'Task Order Response Template',
    desc: 'Framework for responding to IDIQ task orders',
  },
];

const contractVehicles = [
  {
    icon: '📘',
    title: 'IDIQs (Indefinite Delivery/Indefinite Quantity)',
    desc: 'Understand ceiling values, ordering periods, and task order strategies.',
  },
  {
    icon: '🧩',
    title: 'BPAs (Blanket Purchase Agreements)',
    desc: 'Learn how to position for recurring agency buys and call orders.',
  },
  {
    icon: '🔎',
    title: 'Sources Sought & RFIs',
    desc: 'Use early-stage signals to shape opportunities before solicitation.',
  },
  {
    icon: '🏛️',
    title: 'Set-Asides and Socioeconomic Vehicles',
    desc: 'Target small business, 8(a), HUBZone, SDVOSB, and WOSB pathways.',
  },
  {
    icon: '📑',
    title: 'Contract Type Breakdown',
    desc: 'Compare firm-fixed-price, T&M, cost-reimbursement, and hybrid types.',
  },
  {
    icon: '🎯',
    title: 'Vehicle-Specific Win Strategy',
    desc: 'Know which vehicles fit your offer and where to prioritize effort.',
  },
];

export default function ContractVehiclesBootcampLanding() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="inline-block text-slate-400 hover:text-white text-sm mb-8 transition"
          >
            ← Back to Resources
          </Link>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span>🎓</span> FREE LIVE BOOTCAMP - Mar 28, 2026
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Master <span className="text-green-500">Federal Contract Vehicles</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            Join us live on <span className="text-white font-semibold">March 28, 2026 at 9:00 AM Eastern</span>{' '}
            for a Zoom training that breaks down IDIQs, BPAs, Sources Sought, set-asides, and contract types.
          </p>

          <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-5 mb-8 text-left max-w-xl mx-auto">
            <h2 className="text-white font-bold mb-3 text-center">Bootcamp Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <p className="text-slate-500">Date</p>
                <p className="text-white font-semibold">March 28, 2026</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <p className="text-slate-500">Time</p>
                <p className="text-white font-semibold">9:00 AM ET</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <p className="text-slate-500">Location</p>
                <p className="text-white font-semibold">Live on Zoom</p>
              </div>
            </div>
          </div>

          {/* Free Downloads Preview */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Register & Get 6 Free Resources Instantly
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freeDownloads.map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-green-900/50 border border-green-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto mb-12">
            <h3 className="text-xl font-bold text-white mb-2">Reserve Your Spot</h3>
            <p className="text-slate-500 text-sm mb-6">
              Get instant access to all 6 resources + the live bootcamp.
            </p>
            <LeadForm
              buttonText="Get Free Access Now"
              redirectUrl="/contract-vehicles-bootcamp/upsell"
              source="contract-vehicles-bootcamp"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What You Will Learn</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractVehicles.map((item, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-blue-900/50 border border-blue-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
            <p className="text-slate-400 mb-2">Training Value</p>
            <p className="text-4xl font-bold text-white mb-2">
              <span className="line-through text-slate-500 text-2xl mr-2">$997</span>
              <span className="text-green-500">FREE</span>
            </p>
            <p className="text-slate-500 text-sm">Complete your signup above to continue</p>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
