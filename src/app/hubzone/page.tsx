import Image from 'next/image';
import LeadForm from '@/components/LeadForm';
import JsonLd from '@/components/JsonLd';
import { generateSeo, SITE_URL } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'From Interested To Procurement Ready — HUBZone Webinar | June 15, 2026',
  description:
    'Live webinar for small businesses entering the federal market. Hosted by Eric Coffie with leaders from TeamingPro, Encore Funding, and Logical Technology & Research. June 15, 2026, 8 AM – 6 PM EST.',
  path: '/hubzone',
  keywords: [
    'HUBZone webinar',
    'federal contracting webinar',
    'small business federal contracts',
    'teaming partners',
    'federal contractor funding',
    'US Army Corps of Engineers',
    'GovCon Giants',
    'Encore Funding',
    'TeamingPro',
  ],
});

const pillars = [
  {
    color: 'teaming',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
        <path d="M9 11.5 6 8.5 3 11.5l3 3" />
        <path d="m15 12.5 3 3 3-3-3-3" />
        <path d="M9 11.5 13 7.5l5 5" />
        <path d="m5.5 14 7 7 6-6" />
      </svg>
    ),
    title: 'The Teaming Pillar',
    body: 'Find and secure teaming partners through automation. Skip the 12–18 month "getting-to-know-you" phase that slows small business growth.',
  },
  {
    color: 'funding',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v12" />
        <path d="M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5 1.3 2.5 3 2.5 3 1.1 3 2.5-1.3 2.5-3 2.5-3-1.1-3-2.5" />
      </svg>
    ),
    title: 'The Funding Pillar',
    body: 'Specialized capital built for federal contractors. Manage financial demands without traditional bank restrictions.',
  },
  {
    color: 'agency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
        <path d="M3 21h18" />
        <path d="M5 21V10l7-5 7 5v11" />
        <path d="M9 21v-6h6v6" />
        <path d="M12 3v2" />
      </svg>
    ),
    title: 'The Agency Pillar',
    body: 'Direct insight from the U.S. Army Corps of Engineers on what they look for when selecting small business partners.',
  },
];

const speakers = [
  {
    name: 'Eric Coffie',
    title: 'CEO Govcon Giants',
    role: 'Moderator | GCG — Giant Achievements Federal Contracts',
    bio: 'Bridging the gap between industry and government perspectives.',
    image: '/hubzone/headshot-eric.png',
  },
  {
    name: 'Tim Hagerty',
    title: 'CEO TeamingPro',
    role: 'The Teaming Pillar | TeamingPro',
    bio: 'Demonstrating how automation transforms partner discovery for small businesses.',
    image: '/hubzone/headshot-tim.png',
  },
  {
    name: 'Chad Eberly',
    title: 'General Manager Encore',
    role: 'The Funding Pillar | Encore Funding',
    bio: 'Sharing capital strategies that keep federal contractors performing on every win.',
    image: '/hubzone/headshot-chad.png',
  },
  {
    name: 'Todd Rogers',
    title: 'President & CEO',
    role: 'Logical Technology and Research',
    bio: 'Direct insight into how LTR selects and works with small business partners.',
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
];

export default function HubzonePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: 'From Interested To Procurement Ready — HUBZone Webinar',
          description:
            'Live webinar for small businesses entering the federal market. Three pillars: Teaming, Funding, Agency. Hosted by Eric Coffie with TeamingPro, Encore Funding, and LTR.',
          startDate: '2026-06-15T08:00:00-04:00',
          endDate: '2026-06-15T18:00:00-04:00',
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

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f97316] via-[#ea580c] to-[#9a3412]">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: 'url(/hubzone/hero-capitol.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-20 md:pt-14 md:pb-28">
          {/* Partner logo bar */}
          <div className="bg-white rounded-2xl shadow-xl px-6 py-4 mb-12 inline-block">
            <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center">
              {partnerLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={50}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              ))}
            </div>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block bg-white/95 text-[#ea580c] font-bold uppercase tracking-wide px-5 py-2 rounded-full text-sm mb-6">
              From Interested To
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-6 uppercase tracking-tight">
              Procurement<br />Ready
            </h1>
            <div className="h-1 w-32 bg-white mb-6" />
            <p className="text-xl md:text-2xl text-white/95 max-w-2xl">
              A live webinar for small businesses entering the federal market.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">
              Three Pillars of Federal Success
            </h2>
            <p className="text-lg text-slate-600">
              What you&apos;ll walk away with on June 15.
            </p>
          </div>

          <div className="space-y-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row items-stretch overflow-hidden border border-slate-100"
              >
                <div
                  className={`flex items-center justify-center p-8 md:w-48 md:min-h-[180px] ${
                    p.color === 'teaming'
                      ? 'bg-gradient-to-br from-[#7cb342] to-[#4a7c1f]'
                      : p.color === 'funding'
                      ? 'bg-gradient-to-br from-[#3b82f6] to-[#1e40af]'
                      : 'bg-gradient-to-br from-[#ef4444] to-[#991b1b]'
                  }`}
                >
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                    {p.icon}
                  </div>
                </div>
                <div className="p-8 md:py-10 md:pr-10 flex-1">
                  <h3
                    className={`text-2xl md:text-3xl font-black mb-3 ${
                      p.color === 'teaming'
                        ? 'text-[#4a7c1f]'
                        : p.color === 'funding'
                        ? 'text-[#1e40af]'
                        : 'text-[#b91c1c]'
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p className="text-slate-700 text-lg leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP CTA STRIP */}
      <section className="bg-gradient-to-r from-[#ea580c] via-[#dc2626] to-[#9a3412] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Your Roadmap Forward
          </h2>
          <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto">
            Leave with a clear plan to navigate the federal ecosystem — partners, capital,
            and agency requirements covered.
          </p>
        </div>
      </section>

      {/* SPEAKERS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#ea580c] text-white font-bold uppercase tracking-wide px-5 py-2 rounded-full text-sm mb-5">
              Meet Your
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 uppercase">
              Expert Panel
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Three pillars of federal success. Four voices who&apos;ve built it.
            </p>
          </div>

          <div className="space-y-6">
            {speakers.map((s) => (
              <div
                key={s.name}
                className="bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-slate-100"
              >
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#ea580c] shadow-lg">
                    <Image
                      src={s.image}
                      alt={s.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black text-[#ea580c] mb-1 uppercase">
                    {s.name}
                  </h3>
                  <p className="font-bold text-slate-900">{s.title}</p>
                  <p className="text-sm text-slate-600 mb-2">{s.role}</p>
                  <p className="text-slate-700">{s.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DON'T JUST ATTEND + AUDIENCE */}
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Don&apos;t Just Attend,
              <br />
              Get Ready to Win
            </h2>
            <p className="text-lg text-slate-300">
              Move from interested to procurement-ready in one session.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#fb923c] mb-4 uppercase">
              Who Should Be in the Room
            </h3>
            <ul className="space-y-2">
              {audience.map((a) => (
                <li key={a} className="flex gap-3 text-slate-200">
                  <span className="text-[#fb923c] font-bold flex-shrink-0">●</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RESERVE YOUR SEAT FORM */}
      <section id="reserve" className="py-20 px-6 bg-gradient-to-br from-[#ea580c] via-[#dc2626] to-[#9a3412]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white text-center py-8 px-6">
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-3">
                Reserve Your Seat
              </h2>
              <div className="inline-block bg-white text-[#ea580c] font-black text-xl md:text-2xl px-6 py-2 rounded-full mb-3">
                June 15, 2026
              </div>
              <p className="text-lg font-bold text-white">8:00 AM – 6:00 PM EST</p>
              <p className="text-sm text-white/90 italic">
                (Includes a ½-hour Q&amp;A session)
              </p>
            </div>

            <div className="p-8 md:p-10">
              <p className="text-center text-slate-600 mb-6">
                Hosted by <span className="font-bold text-[#ea580c]">Eric Coffie</span> — CEO,
                GovCon Giants
              </p>
              <LeadForm
                buttonText="Reserve My Seat"
                source="hubzone-webinar"
                redirectUrl="/hubzone/thank-you"
                buttonClassName="w-full bg-gradient-to-r from-[#ea580c] to-[#dc2626] hover:from-[#dc2626] hover:to-[#9a3412] text-white font-black uppercase py-4 px-6 rounded-lg text-lg transition-all shadow-lg disabled:opacity-50"
                inputClassName="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#ea580c] focus:outline-none text-slate-900 placeholder-slate-400"
                helperTextClassName="text-center text-sm text-slate-500 italic"
              />
            </div>
          </div>

          <div className="text-center text-white/90 mt-10 text-sm">
            <p className="mb-1">
              For Further Information:{' '}
              <a
                href="https://encoregov.com"
                className="underline font-bold hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Encoregov.com
              </a>
            </p>
            <p>
              Shelly Sweedler at{' '}
              <a href="tel:2169989021" className="underline">
                216-998-9021
              </a>{' '}
              · Robinn Mikalic at{' '}
              <a href="tel:2169989206" className="underline">
                216-998-9206
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} GovCon Giants. In partnership with Encore Funding,
          TeamingPro, and Logical Technology and Research.
        </p>
      </footer>
    </main>
  );
}
