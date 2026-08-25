# Eric Coffie — Speaker Page

Single static `index.html`. No framework, no build step, no dependencies except Google Fonts.

## Deploy

```bash
npx vercel --prod
```

Vercel settings: Framework preset **Other**, Build command **(none)**, Output directory `./`.

## Images

Drop files into `/images` and the placeholders are replaced automatically:

- `eric-hero.jpg` — 4:5 stage photo, mid-talk
- `eric-portrait.jpg` — 1:1 quieter portrait
- `podcast-cover.jpg` — 1:1 GovCon Giants artwork
- `book-billion-dollar-playbook.jpg` — 2:3 real cover
- `book-govcon-launch.jpg` — 2:3 real cover
- `logo-1.png … logo-5.png` — ~38px tall, transparent

Every slot degrades to a styled CSS placeholder if the file is missing.

## Before launch

- Replace the two `[ TESTIMONIAL ]` blocks in `#proof`
- Replace the five `.logoph` divs with `<img src="images/logo-N.png" alt="Org name">`
- Point "Download speaker one-sheet" `href="#"` at the real PDF
- Confirm every number on the page with Eric

See `BUILD.md` for the full spec and source notes.
