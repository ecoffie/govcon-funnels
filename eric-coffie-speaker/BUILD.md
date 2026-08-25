# Eric Coffie — Speaker Page

Complete build spec. Hand this file to any developer or AI coding agent and they can rebuild the page from scratch.

Stack: single static index.html. No framework, no build step, no dependencies except Google Fonts. Deploys to Vercel as-is.

## 1. Repo structure

```
eric-coffie-speaker/
├── index.html
├── README.md
├── BUILD.md              <- this file
├── vercel.json
└── images/
    ├── eric-hero.jpg                    4:5   stage photo, mid-talk
    ├── eric-portrait.jpg                1:1   quieter portrait
    ├── podcast-cover.jpg                1:1   GovCon Giants artwork
    ├── book-billion-dollar-playbook.jpg 2:3   real cover
    ├── book-govcon-launch.jpg           2:3   real cover
    └── logo-1.png … logo-5.png          ~38px tall, transparent
```

Every image slot degrades to a styled CSS placeholder if the file is missing. The page never looks broken mid-build.

vercel.json

```json
{
  "cleanUrls": true
}
```

```bash
git init && git add -A && git commit -m "speaker page"
gh repo create eric-coffie-speaker --public --source=. --push
npx vercel --prod
```

Vercel settings: Framework preset Other, Build command (none), Output directory ./

## 2. Design system

Fonts (single Google Fonts call):

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role | Face | Usage |
|---|---|---|
| Display | Anton | All headings. Always text-transform:uppercase, line-height:.94 |
| Body | Inter | Paragraphs, nav, buttons |
| Utility | IBM Plex Mono | Eyebrows, labels, stats captions. 11px, letter-spacing:.18em, uppercase |

Color tokens:

```css
:root{
  --void:#0A0C0E;   /* page background */
  --char:#15191D;   /* raised panels, alternating sections */
  --paper:#F4F2EC;  /* primary text */
  --gold:#E4B23C;   /* accent, CTAs, booking section background */
  --green:#1C4B3A;  /* podcast art fallback */
  --mute:#8C949B;   /* secondary text */
  --line:#252B31;   /* all borders */
}
```

Rules:

- Dark page throughout. The booking section inverts to solid gold with dark text — it's the only inversion, which is what makes it read as the destination.
- Borders are hairline 1px solid var(--line). Grid gaps of 1px over a --line background create seamless dividers.
- border-radius stays at 0–4px. No soft cards.
- Focus states: `:focus-visible{outline:2px solid var(--gold);outline-offset:3px}`
- `@media(prefers-reduced-motion:reduce)` stops the marquee.
- Signature element: the agency marquee under the hero. A horizontally scrolling strip of FEMA / VA / DHS / USACE / Navy / Air Force / DLA / Dept. of State, alternating gold and grey. Duplicate the span set twice inside the track and animate translateX(0) → translateX(-50%) over 34s linear infinite. This is the fastest proof on the page and nothing generic can copy it.

## 3. Page structure

| # | Section | id | Background | Purpose |
|---|---|---|---|---|
| 1 | Nav | — | void, sticky | Logo + anchors + gold Book CTA |
| 2 | Hero | #top | void | H1 thesis, lede, 2 CTAs, 4:5 photo |
| 3 | Agency marquee | — | char | Signature proof strip |
| 4 | Stat strip | — | void | 4 numbers |
| 5 | Audience | — | void | 3 cards: who this is for |
| 6 | Signature talks | #talks | void | 4 talks, numbered 01–04 |
| 7 | Story | #story | char | First-person origin + 1:1 photo |
| 8 | Credentials | — | void | 6 cred cards |
| 9 | Reach | #reach | char | 4 platform tiles + organizer note |
| 10 | Podcast | #podcast | void | Player mockup + episode list |
| 11 | Books | #books | void | 2 CSS book covers + copy |
| 12 | Formats | #formats | void | 6-cell grid |
| 13 | Proof | #proof | void | 2 testimonials + logo row |
| 14 | Booking | #book | gold | Final CTA |
| 15 | Footer | — | void | Contact + social |

Section shell: `padding:96px 0; border-bottom:1px solid var(--line)` (64px on mobile).

Each section opens with a mono eyebrow in gold, then an Anton H2, then a `.sec-intro` paragraph capped at ~640px.

## 4. Content

### Hero

Eyebrow: `Keynote · Workshop · Panel · Fireside`

H1 — "extraordinary contracts." in gold:

> Teaching everyday people to win extraordinary contracts.

Lede:

> Eric Coffie went from a construction company weeks away from collapse to winning multi-million dollar federal contracts — then gave the entire playbook away for free. Put him in front of your audience and they leave knowing exactly what to do Monday morning.

CTAs: Book Eric to speak (gold) · See the talks (ghost)

### Stat strip

| Number | Label |
|---|---|
| $100M+ (gold) | In contracts won by his students |
| 250K+ | Podcast listens |
| 91 | Countries watching his content |
| #5 | Creator worldwide in procurement |

### Audience — 3 cards

- **Conferences & associations** → Small business audiences. Owners who keep hearing "go get government contracts" and have never been told how. Eric gives them the first three moves, not a motivational speech.
- **Agencies & APEX** → Government outreach events. OSDBU/OSBP industry days, APEX Accelerator programs, matchmaking events. Eric speaks the industry side fluently and fills the room.
- **Primes & corporates** → Supplier diversity programs. Prime contractors building a real subcontractor bench. Eric coaches suppliers on being findable, qualified, and easy to team with.

### Signature talks

Layout: 3-column grid `64px | 1fr | 1fr` — number, title block, body block. Collapses to single column on mobile.

Each talk has a format line (gold mono), an Anton title, a Best for: line with a gold left border, a description, and 3 arrow bullets.

**01 — The First Contract** · Keynote 45–60 min · Best for: owners registered in SAM with zero awards

The exact path from registered entity to first award — and the handful of mistakes that keep most small businesses stuck at zero for years.

- Where opportunities actually live before they hit SAM.gov
- How to qualify a bid before you waste 40 hours on it
- Building past performance when you have none

**02 — Winning the Room Before the RFP** · Keynote · Best for: contractors bidding and losing

Bidders chase RFPs. Winners build habits. Why most contracts are effectively decided long before the solicitation drops — and what to do in that window.

- Capability statements that get callbacks, not deletions
- Working the forecast instead of the bid list
- Teaming and subcontracting on purpose, not by accident

**03 — AI in Federal Contracting** · Workshop 90 min–half day · Best for: firms already bidding who want speed

A working session on using AI and market intelligence to research agencies, size markets, find incumbents, and cut proposal cycles down.

- Market research in minutes instead of weeks
- Incumbent and recompete analysis anyone can run
- Where AI helps — and where it gets you disqualified

**04 — Building a Business on Government Revenue** · Fireside/Panel 30–60 min · Best for: firms past first award, scaling

The operator's view. Eric ran a steel erection company building hangars for federal agencies — this is what nobody tells you after the award letter.

- Pricing to win and still make money
- Financing performance and surviving slow pay
- Knowing when to walk away from a bid

### Story

H2: He's not a professor. He's a grinder who figured it out.

Opening line in Anton, larger: In 2007 the market crashed and took his construction company with it.

Then body paragraphs covering: weeks from going under, bad credit / no connections / no money, saved by a friend who understood federal buying, found the information wasn't hard — it was hoarded, friends lost businesses.

Pull quote (gold left border, Anton, gold text):

> "When I won a $4 million contract, I quit traveling and started sharing everything I learned."

Closing paragraphs: Evankoff Construction (2012, steel erection, airplane hangars for federal agencies) → 2017 pointed a camera at himself and gave away 99% for free → GovCon Giants became a 501(c)(3), top-ranked podcast, training platform, AI market intelligence tool → students winning with FEMA, VA, DHS, USACE, Navy, Air Force → the stated goal.

### Credentials — 6 cards

- **U.S. Department of State speaker** — Selected to consult with foreign audiences abroad through the State Department's speaker program.
- **Author, two books** — Billion Dollar Playbook and GovCon Launch.
- **#5 procurement creator worldwide** — Podcast ranks on the U.S. procurement leaderboard, 250K+ listens.
- **8(a) business mentor** — Hundreds of firms through registration, certification, first federal award.
- **Host of the GCG Summit** — Runs his own annual small business summit.
- **Global reach** — Content translated into Spanish and Russian, viewed in 91 countries.

### Reach — 4 platform tiles

Each tile: icon box (38px, gold glyph, hairline border) → big Anton number → gold mono label → grey descriptor. Tiles 1–3 are `<a>` links.

| Icon | Number | Label | Descriptor | Link |
|---|---|---|---|---|
| ▶ | 53K+ | YouTube subscribers | 1,500+ videos teaching federal procurement | youtube.com/c/EricCoffie |
| 🎙 | 250K+ | Podcast listens | 300+ episodes heard worldwide | govcongiants.libsyn.com |
| in | 24K+ | LinkedIn followers | Daily posts to federal contracting decision makers | linkedin.com/in/ecoffie |
| ◎ | 91 | Countries reached | Content translated into Spanish and Russian | — |

Then the organizer note (gold left border):

> What that means for your event — Eric promotes the events he speaks at across every channel above — before, during, and after. Several organizers have used a live GovCon Giants podcast recording on site as their own content asset. If registration matters to you, that's the lever.

### Podcast — 2-column .85fr / 1.15fr

Left: player mockup. Panel on --char with 1px border, 4px radius. Contains a 104px square cover art slot (falls back to a --green tile with "GOVCON GIANTS" in Anton gold), title block with three platform badges (Apple / Spotify / YouTube as hairline mono pills), a 3px progress bar 36% filled in gold, 18:42 / 52:10 timestamps, and a control row with a 46px gold circular play button.

Right: episode list. 44px | 1fr grid, hairline separators, gold mono episode numbers.

| # | Title | Sub |
|---|---|---|
| 304 | From Zero GovCon Experience to Buying a 20-Year Federal Contractor | with Mario Antwine — how a finance guy acquired an eight-figure federal contractor sight unseen |
| — | The Real Cost of CMMC Compliance | with Katie Arrington, the architect behind CMMC — killing the $250,000 myth |
| 246 | DLA Secrets: How to Win Big in Federal Contracting | with Kevie Hendrix — inside the Defense Logistics Agency |

Then a ghost button: Browse all episodes.

### Books — 2 columns, each 170px | 1fr

Cover mockup is CSS-only until real jackets are dropped in:

```css
.cover{
  aspect-ratio:2/3;
  border-radius:2px 5px 5px 2px;
  box-shadow:0 18px 40px rgba(0,0,0,.55), inset 9px 0 14px -9px rgba(0,0,0,.75);
  transform:perspective(900px) rotateY(-11deg);
  transition:.3s;
}
.cover:hover{transform:perspective(900px) rotateY(-4deg)}
```

The inset shadow is the spine. rotateY gives the shelf angle. Disable the transform on `prefers-reduced-motion`. Fallback gradients: Billion Dollar Playbook `linear-gradient(160deg,#153A2C,#0B1F18)` · GovCon Launch `linear-gradient(160deg,#2A2113,#12100A)`

**Billion Dollar Playbook** — 72 Websites for Massive Scaling in the Federal Marketplace

The reference book. Seventy-two places where federal opportunity data actually lives — forecasts, expiring contracts, subcontracting flows, agency portals — and what to do with each one.

**GovCon Launch** — A Complete Guide to Launching Your Government Contracting Business

The starting point. Dismantles the false narratives around federal contracts and lays out a framework for landing a first government client using free resources. Includes Eric's own journey and the mistakes in it.

### Formats — 6 cells

| Format | Description | Length |
|---|---|---|
| Keynote | Main stage talk with Q&A, tailored to your theme and audience | 45–60 min |
| Workshop | Hands-on. Attendees leave with a finished capability statement or bid plan | 90 min – half day |
| Panel / Moderator | Small business, GovCon, and supplier diversity sessions | 30–60 min |
| Virtual | Webinars and virtual summits for national or distributed audiences | 45–60 min |
| Live podcast | Record a GovCon Giants episode on site — content your event keeps | On request |
| Private / Corporate | Prime contractor supplier events and internal small business programs | Custom |

### Booking — gold background, dark text

H2: Put Eric on your stage.

> Tell us the date, the audience, and what you want them walking away able to do. You'll get a reply within two business days.

Checks (mono, uppercase): ✓ Dates open 2026–2027 · ✓ In-person & virtual · ✓ Fees vary by event — inquire · ✓ Speaker kit on request

CTAs: Request availability (solid dark) → `mailto:service@govcongiants.com?subject=Speaking%20request%20for%20Eric%20Coffie` · Download speaker one-sheet (dark outline)

No fee is published anywhere on the page. Inquiry-only is deliberate — it lets the negotiation start from the organizer's budget.

## 5. Placeholder checklist before launch

- Two `[ TESTIMONIAL ]` blocks in #proof
- Five `.logoph` divs → replace with `<img src="images/logo-N.png" alt="Org name">`
- Download speaker one-sheet `href="#"` → real PDF path
- All images into `/images`
- Confirm every number below with Eric

## 6. Source notes — verify before publishing

All figures below came from public sources. Get Eric's live numbers first — several are stale and understate him.

| Claim | Source | Note |
|---|---|---|
| $100M+ in client contracts | Amazon / Audible author bio | |
| Dept. of State speaker | Amazon / Audible author bio | |
| 250K+ podcast listens | Podcast platform bios | |
| 53K+ YouTube subscribers | Current platform bios | Older bios say 49K; a 2023 interview says 30,750. Trending up fast. |
| 24K+ LinkedIn followers | Current platform bios | Older bios say 19K |
| #5 procurement creator worldwide | Podcast platform bios | |
| 91 countries, ES + RU translations | Business RadioX interview | |
| 1,500+ videos | 2023 CanvasRebel interview | |
| Agencies: FEMA, VA, DHS, USACE, Navy, Air Force, DLA, State | Business RadioX interview | |
| $4M contract → started sharing | CanvasRebel interview | A separate source says a $5M Air Force base hospital contract funded the channel. Confirm which. |
| Evankoff Construction, 2012, steel erection | The How of Business podcast | |
| 501(c)(3) | GovCon Giants Eventbrite page | |
| Goal: 200 companies → $5M → $1B impact | Business RadioX | Conflict: the 2023 CanvasRebel interview states 500 companies → $2.5B for underrepresented founders. Ask Eric which is current. |

Contact used: service@govcongiants.com. Swap for a dedicated booking address if Eric wants one.

## 7. Design references

Two pages this was modeled on:

- **danmartell.com** — audience-segment cards ("For the ambitious ones…"), and a story section that explicitly refuses to lead with credentials: "I could tell you about the $100M business, the book… But that's all bullsh*t without the WHY." Eric's origin is strong enough to earn the same treatment.
- **garyvaynerchuk.com** — minimal confident hero, single-line thesis ("Legacy is greater than currency"). Eric already had his: teaching everyday people to win extraordinary contracts. That became the H1.
- **philmjones.com/event-organizers** — worth studying for the next iteration. Lists each keynote with its intended audience and theme (adopted here as the "Best for:" lines), names a dedicated events email, and offers organizers on-site content capture.

## 8. Next builds

- **Speaker one-sheet PDF** — single page, same visual system, printable. This is the most-forwarded asset in the speaking business; organizers attach it when selling Eric internally to a committee.
- **Press kit page** — headshots at multiple resolutions, short/medium/long bios, logo files, past appearances.
- **Speaker reel** — the one asset the page still lacks. Even 90 seconds of stage footage outperforms any copy on this page.
