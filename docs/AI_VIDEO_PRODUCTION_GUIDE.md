# AI Video Production Guide - GovCon Course

This guide explains how to produce AI avatar videos from the course content for the GovCon Action Plan platform.

## Overview

**Pipeline:** Scripts (JSON) → Text-to-Speech (TTS) → AI Avatar Tool → Video → Platform

## Prerequisites

1. **Content ready:** `src/data/scripts/scripts.json` - narration for each lesson
2. **Slides ready:** Run `node scripts/generate-slides.js` to generate HTML slides
3. **Accounts:** Sign up for TTS and AI Avatar services (see Tools section)

---

## Tools

### Text-to-Speech (TTS)

| Tool | Pros | Pricing |
|------|------|---------|
| **ElevenLabs** | Natural, many voices, API | ~$5-22/mo |
| **Play.ht** | Good quality, API, voice cloning | ~$19-99/mo |
| **Azure Speech** | Enterprise, reliable | Pay per character |
| **Google Cloud TTS** | Good quality, many languages | Pay per character |

**Recommended:** ElevenLabs or Play.ht for natural-sounding narration.

### AI Avatar Tools

| Tool | Pros | How It Works |
|------|------|--------------|
| **HeyGen** | High quality, many avatars, API | Upload script + slides → AI reads + presents |
| **Synthesia** | Professional, templates | Paste script, choose avatar, export |
| **D-ID** | Simple, API | Upload photo/avatar + script or audio |
| **Colossyan** | Good for training | Similar to Synthesia |

**Recommended:** HeyGen or Synthesia—both support slides + avatar in one workflow.

---

## Production Workflow

### Step 1: Extract Scripts

Scripts are in `src/data/scripts/scripts.json`. Lesson IDs match `course-curriculum.json` (e.g., `1-01-1`, `2-04-1`). Each lesson has:

- `lessonId` (e.g., "1-01-1")
- `slides[].title` - slide title
- `slides[].narration` - full narration text for TTS

All 30 lessons have narration ready for the AI video pipeline.

### Step 2: Generate TTS Audio

**Option A - ElevenLabs API:**

```bash
# Example using ElevenLabs (requires API key)
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID" \
  -H "xi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your narration text here"}'
```

**Option B - Manual:** Paste each narration into the TTS tool's web interface and download MP3.

### Step 3: Generate Slides

Run the slide generator:

```bash
cd govcon-funnels
npm run generate-slides
```

Output: `public/slides/generated/` - HTML files and `manifest.json`

**For AI Avatar Tools:** Convert HTML to PNG/PDF or use built-in slide upload. Most tools accept:
- PowerPoint/Keynote
- PNG/JPEG images (one per slide)
- PDF

### Step 4: Create Video in AI Avatar Tool

**HeyGen / Synthesia workflow:**

1. Create new project
2. Choose AI avatar (professional presenter style)
3. For each lesson:
   - Paste narration (or upload TTS audio)
   - Upload corresponding slide as background/attachment
   - Generate video
4. Export MP4 per lesson

**Batch approach:** If using API (HeyGen, D-ID), script the process:

```javascript
// Pseudocode for batch generation
for (const { lessonId, narration, slidePath } of manifest) {
  const audio = await elevenlabs.textToSpeech(narration);
  const video = await heygen.createVideo({
    avatarId: 'your-avatar-id',
    audio,
    background: slidePath,
  });
  await video.download(`videos/${lessonId}.mp4`);
}
```

### Step 5: Upload Videos

- **Vimeo:** Upload each MP4, get video IDs
- **Or** host on your CDN / S3 / Cloudflare R2

### Step 6: Update Platform

Add `videoId` (Vimeo) or `videoUrl` to `course-curriculum.json` or the platform's lesson data.

---

## File Structure

```
govcon-funnels/
├── src/data/
│   ├── course-curriculum.json   # Phase/module/lesson structure
│   ├── scripts/
│   │   └── scripts.json         # Narration per lesson
│   └── slides/
│       └── slide-template.html  # HTML slide template
├── scripts/
│   └── generate-slides.js       # Generates slides from curriculum
├── public/
│   └── slides/
│       └── generated/           # Output: HTML slides + manifest.json
└── docs/
    └── AI_VIDEO_PRODUCTION_GUIDE.md  # This file
```

---

## Manifest Format

After running `generate-slides.js`, `manifest.json` contains:

```json
{
  "slides": [
    {
      "slideIndex": 1,
      "phaseId": "phase-1",
      "moduleId": "1-1",
      "lessonId": "1-1-1",
      "title": "Supplier vs Service Provider vs Consultant",
      "filename": "slide-001-1-1-1.html",
      "narration": "Full narration text..."
    }
  ],
  "totalSlides": 42
}
```

Use this manifest to drive batch TTS and avatar generation.

---

## Tips

1. **Voice consistency:** Use the same voice for all lessons.
2. **Pacing:** Aim for ~150 words per minute for narration.
3. **Slide timing:** Match slide visibility to narration; some tools auto-sync.
4. **Placeholder videos:** Until AI videos are ready, use `videoId: null` and show "Coming soon" or link to existing Vimeo content.
