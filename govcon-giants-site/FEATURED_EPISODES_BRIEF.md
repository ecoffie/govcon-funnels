# Build Brief — Featured Episodes section (podcast page)

Project: `govcon-giants-site/` — Vite + React + TS + Tailwind + shadcn/ui, react-router, `@/` = `src/`.
Dev server already runs on **port 3000** (do not start another). Verify with `npm run build` (must pass, zero TS errors).

## Goal
On `/podcast`, replace the current "latest episode" feature spot with a **Featured Episodes** section: curated conversations with government officials, each card showing the **guest's real face** (NOT RSS artwork, NOT the branded icon thumb).

## Already done (do not redo)
- `src/data/featuredEpisodes.ts` — 6 curated episodes (`featuredEpisodes: FeaturedEpisode[]`) with fields: `guest`, `role`, `agency`, `photo`, `title`, `date`, `duration`, `link` (Libsyn page), `audioUrl` (direct MP3), `blurb`.
- Headshots in `public/faces/`: `jackie-robinson-burnett.jpg`, `wayne-berry.png` (circular mask, transparent corners — give the img a `bg-raised` backdrop so corners blend), `katie-arrington.jpg`, `erik-raven.jpg`, `ashley-bell.jpg`, `shelley-hall.jpg`. All square, ≥500px.
- Existing playback infra: `src/lib/useExclusiveAudio.ts` (hook returns a ref to attach to an `<audio>` element; guarantees only one audio plays site-wide).

## What to build

### 1. New component `src/components/podcast/FeaturedGuests.tsx`
- Section header: kicker `CONVERSATIONS WITH GOVERNMENT INSIDERS`, title "Featured Episodes" (use existing `SectionHeader` + `font-display` serif, matching other sections).
- Grid: 3 cols on `lg`, 2 on `sm`, 1 on mobile. Cards = `bg-raised border border-line rounded-xl`, framer-motion `whileInView` reveal like neighboring sections.
- Each card:
  - Square guest photo on top (`aspect-square w-full object-cover`, slight zoom on hover, `bg-raised` behind img).
  - Guest name (serif, ~lg), then `role` (text-xs, `text-slate-400`) and `agency` (text-xs, uppercase tracking, `text-brand` green).
  - Episode `title` clamped to 2 lines (text-sm), `blurb` optional clamp-2 (text-xs slate-400).
  - Meta row: duration chip, a **play/pause toggle button** (same pattern as `EpisodeRow`: toggling reveals an inline `<audio controls autoPlay preload="none">` bar with `src={audioUrl}`, ref from `useExclusiveAudio`, `[color-scheme:dark]`), and a small "Libsyn ↗" external link to `link`.

### 2. Wire into `src/pages/Podcast.tsx`
- Replace the `<FeaturedPlayer />` usage with `<FeaturedGuests />` (this is the section the user calls "new this week" — it must no longer show just the latest episode).
- Remove the now-unused `FeaturedPlayer` import. Delete `src/components/podcast/FeaturedPlayer.tsx` only if nothing else imports it (grep first); otherwise leave the file but unused.
- Keep `ShowHeader` and `EpisodeArchive` (search/filter/list) exactly as they are.

### 3. Home page (small addition)
- On `src/pages/Home.tsx`, in the podcast strip section, add a slim "Featured:" text link or keep as-is — OPTIONAL, skip if it complicates anything.

## Constraints
- Dark navy theme tokens only (`bg-base`, `bg-raised`, `bg-inset`, `border-line`, `text-brand`); NO purple/blue gradients; editorial feel.
- No new dependencies. All copy English.
- Do not touch `src/data/episodes.ts` (script-generated) or `src/data/featuredEpisodes.ts`.
- `npm run build` must pass with zero TS errors before you report done.
