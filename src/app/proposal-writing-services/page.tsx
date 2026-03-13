import Link from 'next/link';
import { generateSeo, serviceJsonLd, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal Proposal Writing Services — Win Government Contracts',
  description:
    'Expert federal proposal writing support for small businesses. From compliance matrices to full proposal development — learn how to write winning government contract proposals.',
  path: '/proposal-writing-services',
  keywords: [
    'federal proposal writing services',
    'government proposal writing',
    'proposal writing government contracts',
    'federal proposal support',
    'government contract proposal help',
    'RFP response writing',
  ],
});

const faqs = [
  {
    question: 'What does federal proposal writing involve?',
    answer:
      'Federal proposal writing includes analyzing the solicitation requirements, building a compliance matrix, developing technical and management approaches, writing past performance narratives, preparing pricing volumes, and ensuring full compliance with all RFP instructions. It requires knowledge of FAR requirements, evaluation criteria, and government formatting standards.',
  },
  {
    question: 'How long does it take to write a government proposal?',
    answer:
      'A typical proposal takes 2-6 weeks depending on complexity. Simple quotes for simplified acquisitions may take a few days, while large IDIQ or full-and-open proposals with multiple volumes can take 4-8 weeks. Starting early — ideally before the solicitation drops — is critical to producing a competitive submission.',
  },
  {
    question: 'Can I write proposals myself without hiring a consultant?',
    answer:
      'Absolutely. Many successful small businesses write their own proposals. Our free course and proposal writing guide teach you the fundamentals. For your first few proposals, self-writing builds valuable skills. As you pursue larger, more complex opportunities, professional support can increase your win rate.',
  },
  {
    question:
      'What is the difference between a proposal and a quote?',
    answer:
      'A quote (typically for simplified acquisitions under $250,000) is a straightforward price submission, sometimes with a brief technical description. A proposal (for larger procurements) is a comprehensive multi-volume submission including technical approach, management plan, past performance, and price — evaluated against detailed criteria.',
  },
  {
    question: 'How much do proposal writing services cost?',
    answer:
      'Costs vary widely based on proposal complexity. Simple proposals may cost $2,000-$5,000 for professional support, while large multi-volume proposals can cost $15,000-$50,000 or more. Our training programs teach you to do it yourself, and our consulting packages provide targeted support at a fraction of full-service costs.',
  },
];

const services = [
  {
    title: 'Proposal Writing Training',
    description:
      'Learn the fundamentals of federal proposal writing through our free course and in-depth guides. Covers compliance matrices, technical writing, past performance, and pricing strategies.',
    icon: '📖',
  },
  {
    title: 'Compliance Matrix Review',
    description:
      'We review your solicitation analysis and compliance matrix to ensure you have not missed any requirements — the number one reason proposals are eliminated.',
    icon: '✅',
  },
  {
    title: 'Technical Approach Coaching',
    description:
      'One-on-one guidance on structuring your technical volume, developing win themes, and writing to evaluation criteria that score highest.',
    icon: '🎯',
  },
  {
    title: 'Past Performance Narratives',
    description:
      'Help crafting compelling past performance write-ups that demonstrate relevance, even when your direct federal experience is limited.',
    icon: '📋',
  },
  {
    title: 'Bid/No-Bid Analysis',
    description:
      'Before you invest weeks in a proposal, we help you analyze the opportunity to determine if it is worth pursuing based on competition, requirements, and your strengths.',
    icon: '🔍',
  },
  {
    title: 'Full Proposal Support',
    description:
      'For high-value opportunities, our Accelerator program provides hands-on proposal development support from outline through final submission.',
    icon: '🚀',
  },
];

export default function ProposalWritingServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd
        data={serviceJsonLd({
          name: 'Federal Proposal Writing Services — GovCon Giants',
          description:
            'Expert federal proposal writing support for small businesses pursuing government contracts.',
          url: 'https://govcongiants.org/proposal-writing-services',
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Federal{' '}
            <span className="text-green-500">Proposal Writing</span>{' '}
            Services
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Winning government contracts starts with winning proposals. Whether
            you need to learn the process or want expert support on a live
            opportunity, we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides/proposal-writing"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Read the Free Guide
            </Link>
            <Link
              href="/consulting"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              Get Proposal Help
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            How We Help You Write Winning Proposals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            The Winning Proposal Process
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Analyze the Solicitation',
                desc: 'Break down every requirement, evaluation factor, and instruction. Build a compliance matrix that maps each requirement to your response.',
              },
              {
                step: '2',
                title: 'Develop Win Themes',
                desc: 'Identify what makes your company the best choice. Connect your strengths to the agency\'s pain points and evaluation criteria.',
              },
              {
                step: '3',
                title: 'Write to the Evaluation Criteria',
                desc: 'Structure every section to directly address how evaluators will score your proposal. Make it easy for them to give you the highest marks.',
              },
              {
                step: '4',
                title: 'Review and Refine',
                desc: 'Run compliance checks, red team reviews, and final edits. A polished, error-free proposal signals professionalism and reliability.',
              },
              {
                step: '5',
                title: 'Submit with Confidence',
                desc: 'Verify all submission requirements, upload to the correct portal, and submit well before the deadline. Late proposals are automatically eliminated.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 items-start bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-green-600/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Start Writing Winning Proposals Today
          </h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Our free proposal writing guide covers everything from compliance
            matrices to pricing strategies. For hands-on support, our consulting
            team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides/proposal-writing"
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Read the Free Guide
            </Link>
            <Link
              href="/consulting"
              className="inline-block px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              Book Consulting
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
