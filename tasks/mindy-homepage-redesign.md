# Mindy (getmindy.ai) Homepage Redesign — Apollo-style

**Status: TABLED** (mockups built, no decision locked, live site untouched)

Inspiration: apollo.io homepage structure.

## Mockup files (standalone HTML, scratchpad — session-specific, copy out if needed)
- Dark variant: `.../scratchpad/mindy-hero-mockup.html`
- Light variant: `.../scratchpad/mindy-hero-light.html` (truer Apollo look — RECOMMENDED)
- (scratchpad path: `/private/tmp/claude-501/-Users-ericcoffie-govcon-funnels/59109883-53dc-4691-bc9e-0d5cf622cd87/scratchpad/`)

## What's built (full page, both themes)
Hero (headline + real-dashboard product screenshot) → stats bar (real: 317K/88K/1.0M/7,700+) →
feature tabs → "why buy 5 tools" grid → testimonial → comparison table → pricing ($0/$149/$499) →
FAQ → closing CTA → footer.

## Grounded in real codebase data
- Nav/labels/icons from `src/components/app/UnifiedSidebar.tsx` (Intelligence/Pipeline/Research groups)
- Pricing from `src/app/pricing/page.tsx` ($0 Free / $149 Pro / $499 Teams; vs $15K–50K/yr enterprise)
- Stats from CLAUDE.md/memory

## Open decision + honesty caveats before ANY real build
- [ ] Pick theme: light (recommended) vs dark vs hybrid (dark hero only)
- [ ] Testimonial is "representative use case" — swap in a REAL named quote before shipping
- [ ] Numbers INSIDE hero product screenshot ($4.2B / Booz Allen table) are illustrative placeholders — wire to a real cached market-intel result or keep clearly as demo
- [ ] Real build target: `~/Market Assasin/market-assassin/src/app/page.tsx` (Next.js + Tailwind), not funnels
