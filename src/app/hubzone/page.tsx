import Image from 'next/image';
import LeadForm from '@/components/LeadForm';
import HubzoneScarcityBanner from '@/components/HubzoneScarcityBanner';
import JsonLd from '@/components/JsonLd';
import { FUNDING_DEST } from '@/lib/funding-dest';
import { generateSeo, SITE_URL } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'From Interested To Procurement Ready — HUBZone Webinar | June 17, 2026',
  description:
    'Live webinar for small businesses entering the federal market. Hosted by Eric Coffie with leaders from TeamingPro, Encore Funding, and Logical Technology & Research. June 17, 2026.',
  path: '/hubzone',
  keywords: [
    'HUBZone webinar',
    'federal contracting webinar',
    'small business federal contracts',
    'teaming partners',
    'federal contractor funding',
    'IDV contracts',
    'government buyer side',
  ],
});

const pillars = [
  {
    icon: '🤝',
    title: 'The Teaming Pillar',
    desc: 'Find and secure teaming partners through automation. Skip the 12–18 month "getting-to-know-you" phase that slows small business growth.',
  },
  {
    icon: '💰',
    title: 'The Funding Pillar',
    desc: 'Specialized capital built for federal contractors. Manage financial demands without traditional bank restrictions.',
  },
  {
    icon: '🏛️',
    title: 'The Agency Pillar',
    desc: 'Inside the government buyer side — how agencies use IDVs and what they actually evaluate when selecting small business partners.',
  },
];

const steps = [
  {
    step: '1',
    title: 'Reserve Your Seat',
    desc: 'Register now and lock in your spot for the June 17 webinar.',
  },
  {
    step: '2',
    title: 'Join the Live Session',
    desc: 'Spend 2 hours with 4 federal contracting experts — teaming, funding, and agency strategy.',
  },
  {
    step: '3',
    title: 'Walk Away Procurement-Ready',
    desc: 'Leave with a clear roadmap and the partners, capital, and agency insight to win.',
  },
];

const speakers = [
  {
    name: 'Eric Coffie',
    title: 'CEO, GovCon Giants',
    role: 'Moderator',
    bio: 'Bridging the gap between industry and government perspectives.',
    image: '/hubzone/headshot-eric.png',
  },
  {
    name: 'Tim Hagerty',
    title: 'CEO, TeamingPro',
    role: 'The Teaming Pillar',
    bio: 'Demonstrating how automation transforms partner discovery for small businesses.',
    image: '/hubzone/headshot-tim.png',
  },
  {
    name: 'Chad Eberly',
    title: 'General Manager, Encore Funding',
    role: 'The Funding Pillar',
    bio: 'Sharing capital strategies that keep federal contractors performing on every win.',
    image: '/hubzone/headshot-chad.png',
  },
  {
    name: 'Todd Rogers',
    title: 'Industry Technical Expert',
    role: 'Agency Insight',
    bio: 'Specializes in IDVs and the government buyer side — how agencies evaluate and buy.',
    image: '/hubzone/headshot-todd.png',
  },
];

const audience = [
  'Small businesses ready to enter or scale in the federal market',
  'New entrants seeking their first federal contract',
  'Small primes looking for teaming partners',
  'Contractors navigating funding gaps on government work',
];

const partnerLogos = [
  { src: '/hubzone/logo-encore.png', alt: 'Encore Funding' },
  { src: '/hubzone/logo-gcg.png', alt: 'GCG — Giant Achievements Federal Contracts' },
  { src: '/hubzone/logo-teamingpro.png', alt: 'TeamingPro' },
  { src: '/hubzone/logo-ltr.png', alt: 'Logical Technology and Research' },
  { src: '/hubzone/logo-hubzone-council.png', alt: 'HUBZone Contractors National Council' },
];

export default function HubzonePage() {
  return (
    <main className="bg-white text-slate-900">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: 'From Interested To Procurement Ready — HUBZone Webinar',
          description:
            'Live webinar for small businesses entering the federal market. Three pillars: Teaming, Funding, Agency.',
          startDate: '2026-06-17T18:00:00-04:00',
          endDate: '2026-06-17T20:00:00-04:00',
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: {
            '@type': 'VirtualLocation',
            url: `${SITE_URL}/hubzone`,
          },
          organizer: {
            '@type': 'Organization',
            name: 'GovCon Giants',
            url: SITE_URL,
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            url: `${SITE_URL}/hubzone`,
            availability: 'https://schema.org/InStock',
          },
        }}
      />

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">
            HUBZone <span className="text-orange-500">Webinar</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              June 17, 2026 · 6 – 8 PM EST
            </span>
            <a
              href="#reserve"
              className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Reserve Seat
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full mb-6">
              Free Live Webinar · June 17, 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              From Interested To{' '}
              <span className="text-orange-500">Procurement Ready</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A live 2-hour webinar for small businesses entering the federal market.
              Three pillars. Four voices who&apos;ve built it. One clear roadmap forward.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Find teaming partners without the 12–18 month wait',
                'Access specialized capital for federal contractors',
                'Learn the government buyer side — IDVs and how agencies evaluate',
                'Walk away with a clear roadmap (½-hour live Q&A)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="reserve-top" className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-center">Reserve Your Seat</h2>
            <p className="text-gray-500 text-center mb-4">
              June 17, 2026 · 6 – 8 PM EST
            </p>
            <div className="flex justify-center mb-6">
              <HubzoneScarcityBanner />
            </div>
            <LeadForm
              buttonText="Reserve My Seat"
              source="hubzone-webinar"
              showCompany
              redirectUrl="/hubzone/thank-you"
              buttonClassName="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              inputClassName="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-slate-900 placeholder-gray-400 bg-white"
              helperTextClassName="text-center text-sm text-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Partners Strip */}
      <section className="border-y border-gray-100 py-12 md:py-14 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">
            Brought to you by
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-8 items-center justify-items-center">
            {partnerLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={240}
                height={96}
                className="h-14 md:h-16 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="bg-gray-50 py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trying to Break Into Federal Contracting?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            You see the $775B federal market. You know there&apos;s opportunity. But
            partners are hard to find, capital is hard to get, and agencies feel like
            a black box.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
            <p className="text-lg font-semibold text-orange-600 mb-3">
              Two hours. Three pillars. Real answers.
            </p>
            <p className="text-gray-600">
              Spend an evening with four experts who&apos;ve built this from every angle —
              teaming, funding, and agency selection — and leave with the playbook
              you need to actually win.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Three Pillars of Federal Success
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            What you&apos;ll walk away with on June 17.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-900 text-white py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#reserve"
              className="inline-block bg-orange-500 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Reserve My Seat
            </a>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Meet Your Expert Panel
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Three pillars of federal success. Four voices who&apos;ve built it.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {speakers.map((s) => (
              <div
                key={s.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500 relative">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-1">
                    {s.role}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{s.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{s.title}</p>
                  <p className="text-sm text-gray-700">{s.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="bg-gray-50 py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who Should Be in the Room
          </h2>
          <p className="text-gray-600 mb-10">
            Built for small businesses ready to take their next step in federal contracting.
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
            {audience.map((a) => (
              <div
                key={a}
                className="bg-white rounded-xl p-5 border border-gray-200 flex items-start gap-3"
              >
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="text-gray-700">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="reserve" className="bg-orange-50 py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Free · Limited Seats
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Don&apos;t Just Attend.<br />Get Ready to Win.
              </h2>
              <p className="text-gray-600 mb-6">
                Move from interested to procurement-ready in one session.
                Reserve your spot for the June 17 live webinar — includes a ½-hour Q&A.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">When:</span>{' '}
                  June 17, 2026 · 6 – 8 PM EST
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Where:</span>{' '}
                  Online · Link sent after registration
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Cost:</span> Free
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-center">Reserve Your Seat</h3>
              <LeadForm
                buttonText="Reserve My Seat"
                source="hubzone-webinar-bottom"
                showCompany
                redirectUrl="/hubzone/thank-you"
                buttonClassName="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                inputClassName="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-slate-900 placeholder-gray-400 bg-white"
                helperTextClassName="text-center text-sm text-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="font-semibold text-lg text-gray-700 mb-2">
                HUBZone <span className="text-orange-500">Webinar</span>
              </div>
              <p className="text-sm text-gray-500">
                Hosted by GovCon Giants in partnership with<br />
                Encore Funding, TeamingPro, and Logical Technology and Research.
              </p>
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <span className="text-gray-700 font-medium">Questions?</span>
              </p>
              <p>
                Shelly Sweedler ·{' '}
                <a href="tel:2169989021" className="hover:text-orange-600">
                  (216) 998-9021
                </a>
              </p>
              <p>
                Robinn Mikalic ·{' '}
                <a href="tel:2169989206" className="hover:text-orange-600">
                  (216) 998-9206
                </a>
              </p>
              <p>
                <a
                  href={FUNDING_DEST}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-orange-600"
                >
                  Government contractor financing by Encore Funding
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GovCon Giants. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
