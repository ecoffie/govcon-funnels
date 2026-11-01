/* Editorial photography at CSS-controlled sizes, same approach as the homepage. */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import {
  AUDIENCES,
  CHANNELS,
  CURRICULUM,
  FAQS,
  PROGRAM,
  STAGES,
} from '@/data/business-accelerator';
import styles from './BusinessAcceleratorPage.module.css';

const FORMAT_LABELS = { cohort: 'Cohort-based', 'self-paced': 'Self-paced', hybrid: 'Live and self-paced' } as const;

/* Only decided facts appear; an undecided field is left out, never guessed. */
function programFacts(): string[] {
  const facts = [`${PROGRAM.weeks} weeks`, `${PROGRAM.weeks} deliverables`];
  if (PROGRAM.format) facts.push(FORMAT_LABELS[PROGRAM.format]);
  if (PROGRAM.hoursPerWeek) facts.push(`${PROGRAM.hoursPerWeek} per week`);
  if (PROGRAM.nextStart) facts.push(`Starts ${PROGRAM.nextStart}`);
  return facts;
}

function Heading({ kicker, children, intro }: { kicker: string; children: React.ReactNode; intro?: string }) {
  return (
    <div className={styles.heading}>
      <p className={styles.kicker}>{kicker}</p>
      <h2>{children}</h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={`${styles.container} ${styles.heroInner}`}>
        <p className={styles.heroKicker}>GOVCON GIANTS · BUSINESS OWNERSHIP ACCELERATOR</p>
        <h1>
          Turn your skills
          <em>into a business.</em>
        </h1>
        <p className={styles.heroLede}>
          You don&apos;t need another skill. You need a business built around the skills you already have. Eight weeks
          of focused work to go from what you can do to a clear offer, real customers and a business that runs.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.primary} href="#curriculum">Explore the program</a>
          <a className={styles.secondary} href="#apply">
            {PROGRAM.applicationsOpen ? 'Apply to the Accelerator' : 'Application status'}
          </a>
        </div>
        <ul className={styles.facts}>
          {programFacts().map((fact) => <li key={fact}>{fact}</li>)}
        </ul>
        <ol className={styles.path} aria-label="The path through the accelerator">
          {STAGES.map((stage, index) => (
            <li key={stage.name}>
              <span className={styles.pathIndex}>{String(index + 1).padStart(2, '0')}</span>
              <b>{stage.name}</b>
              <small>{stage.line}</small>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Transformation() {
  const columns = [
    { label: 'Having a skill', line: 'You do great work when someone hands it to you.' },
    { label: 'Self-employed', line: 'You find your own work, but everything stops when you stop.' },
    { label: 'Business owner', line: 'A defined offer, a way to win customers, and systems that keep running.' },
  ];
  return (
    <section id="transformation" className={styles.section}>
      <div className={styles.container}>
        <Heading kicker="THE TRANSFORMATION" intro="Most skilled people stop at the second column. The accelerator is the work between the second and the third.">
          A skill is not a business. <em>Yet.</em>
        </Heading>
        <ol className={styles.ladder}>
          {columns.map((column, index) => (
            <li key={column.label} className={index === 2 ? styles.ladderGoal : undefined}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{column.label}</h3>
              <p>{column.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section id="who" className={`${styles.section} ${styles.tinted}`}>
      <div className={styles.container}>
        <Heading kicker="WHO IT'S FOR" intro="Already running something small? It's for making that established, too.">
          Built for people who are <em>already good at something.</em>
        </Heading>
        <ul className={styles.audienceGrid}>
          {AUDIENCES.map((audience) => (
            <li key={audience.who}>
              <h3>{audience.who}</h3>
              <p>{audience.could}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks() {
  const loop = [
    { step: 'Learn', line: "Each week opens with the lesson for that stage of the business." },
    { step: 'Build', line: 'You turn the lesson into a working deliverable for your own business, from a template.' },
    { step: 'Check', line: 'A measurable milestone tells you the week is done, not just watched.' },
  ];
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <Heading kicker="HOW IT WORKS">
          Eight weeks. Eight deliverables. <em>One operating business.</em>
        </Heading>
        <ol className={styles.loop}>
          {loop.map((item) => (
            <li key={item.step}>
              <h3>{item.step}</h3>
              <p>{item.line}</p>
            </li>
          ))}
        </ol>
        <p className={styles.capstone}>
          By Week 8 the eight deliverables add up to one document: <b>your business plan</b>, written by you, tested
          against real customers.
        </p>
      </div>
    </section>
  );
}

function Curriculum() {
  return (
    <section id="curriculum" className={`${styles.section} ${styles.dark}`}>
      <div className={styles.container}>
        <Heading kicker="CURRICULUM" intro="Every week names what you build and how you know it's done.">
          What you build, <em>week by week.</em>
        </Heading>
        <ol className={styles.weeks}>
          {CURRICULUM.map((week) => (
            <li key={week.week} className={styles.week}>
              <div className={styles.weekTop}>
                <span className={styles.weekNumber}>Week {week.week}</span>
                <span className={styles.stageTag}>{week.stage}</span>
              </div>
              <h3>{week.title}</h3>
              <p className={styles.objective}>{week.objective}</p>
              <ul className={styles.topics}>
                {week.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
              <dl className={styles.outcome}>
                <div>
                  <dt>You leave with</dt>
                  <dd>{week.deliverable}</dd>
                </div>
                <div>
                  <dt>Milestone</dt>
                  <dd>{week.milestone}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
        <p className={styles.disclaimer}>
          Weeks 4 and 7 are general education, not individualized legal, tax or accounting advice.
        </p>
      </div>
    </section>
  );
}

function Channels() {
  return (
    <section id="channels" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.split}>
          <Heading kicker="WHERE CUSTOMERS COME FROM" intro="Week 8 is where you choose your channels. Government contracting is one of them, for the businesses where it fits, not the point of the program.">
            More than one way to <em>grow.</em>
          </Heading>
          <ul className={styles.channelList}>
            {CHANNELS.map((channel) => (
              <li key={channel.name}>
                <b>{channel.name}</b>
                <span>{channel.line}</span>
              </li>
            ))}
            <li className={styles.channelNote}>
              Pursuing government work? <Link href="/mi">Mindy</Link> is our optional platform for finding federal
              opportunities. It is not required for the accelerator.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Support() {
  const decided = PROGRAM.support.length > 0;
  const labels = { 'live-sessions': 'Live sessions', 'mentor-feedback': 'Mentor feedback', community: 'Community' } as const;
  return (
    <section id="support" className={`${styles.section} ${styles.tinted}`}>
      <div className={styles.container}>
        <div className={styles.split}>
          <Heading kicker="THE PROGRAM EXPERIENCE">
            Structure you can <em>actually finish.</em>
          </Heading>
          <div>
            <ul className={styles.included}>
              <li><b>A lesson for each week</b><span>Short, practical, tied to that week&apos;s deliverable.</span></li>
              <li><b>A template for each deliverable</b><span>You fill it in for your business, not a case study.</span></li>
              <li><b>A milestone for each week</b><span>Measured by what you did, not what you watched.</span></li>
              <li><b>Your business plan</b><span>The eight deliverables, assembled into one document.</span></li>
              {decided && PROGRAM.support.map((feature) => <li key={feature}><b>{labels[feature]}</b></li>)}
            </ul>
            {!decided && (
              <p className={styles.pending}>
                Live sessions, mentors and community details will be published here before applications open.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" className={styles.section}>
      <div className={`${styles.container} ${styles.founder}`}>
        <img
          src="/home/eric-coffie-stage.jpg"
          alt="Eric Coffie speaking at the GCG National Summit"
          width={736}
          height={921}
          loading="lazy"
        />
        <div>
          <Heading kicker="WHY GOVCON GIANTS BUILT THIS">
            We build <em>business owners.</em>
          </Heading>
          <p className={styles.lead}>
            Eric Coffie went from a construction company weeks away from collapse to winning multi-million dollar
            federal contracts, then gave the entire playbook away for free.
          </p>
          <p className={styles.lead}>
            GovCon Giants exists to turn what people can do into businesses people buy from. This accelerator lays
            that path out week by week, for every kind of skilled business, not only government contractors.
          </p>
          <a className={styles.textLink} href="https://ericcoffie.com/#story" target="_blank" rel="noopener">
            Read Eric&apos;s story ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function FitCheck() {
  return (
    <section id="fit" className={`${styles.section} ${styles.tinted}`}>
      <div className={styles.container}>
        <Heading kicker="IS THIS FOR YOU?">Be honest with yourself <em>first.</em></Heading>
        <div className={styles.fit}>
          <div>
            <h3>A good fit if</h3>
            <ul>
              <li>You have a skill people already pay for, or would.</li>
              <li>You will do the weekly deliverable, not just the lesson.</li>
              <li>You want an operating business, not a side gig.</li>
              <li>You are open to feedback on your offer and your price.</li>
            </ul>
          </div>
          <div>
            <h3>Not a fit if</h3>
            <ul>
              <li>You are looking for guaranteed income.</li>
              <li>You want someone to build the business for you.</li>
              <li>You are not ready to talk to real customers in Week 2.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const answered = FAQS.filter((faq) => faq.answer);
  return (
    <section id="faq" className={styles.section}>
      <div className={`${styles.container} ${styles.narrow}`}>
        <Heading kicker="FAQ">Questions, <em>answered.</em></Heading>
        <div className={styles.faq}>
          {answered.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Apply() {
  return (
    <section id="apply" className={`${styles.section} ${styles.applySection}`}>
      <div className={`${styles.container} ${styles.narrow} ${styles.apply}`}>
        <p className={styles.kicker}>APPLY</p>
        <h2>Business Ownership Accelerator</h2>
        {PROGRAM.applicationsOpen ? (
          <Link className={styles.primary} href="/business-accelerator/apply">Apply to the Accelerator</Link>
        ) : (
          <>
            <p className={styles.applyStatus}>Applications are not open yet.</p>
            <p>
              Format, schedule and cost are being finalized. They will be published on this page before anyone is
              asked to apply.
            </p>
            <div className={styles.applyLinks}>
              <Link href="/podcast">Watch GovCon Giants</Link>
              <a href="https://ericcoffie.com" target="_blank" rel="noopener">Meet Eric Coffie ↗</a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function BusinessAcceleratorPage() {
  return (
    <div className={styles.page}>
      <main>
        <Hero />
        <Transformation />
        <WhoItsFor />
        <HowItWorks />
        <Curriculum />
        <Channels />
        <Support />
        <Founder />
        <FitCheck />
        <Faq />
        <Apply />
      </main>
    </div>
  );
}
