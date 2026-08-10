#!/usr/bin/env python3
"""Fetch the GovCon Giants Libsyn RSS feed and regenerate src/data/episodes.ts.

Usage: python3 scripts/rss-to-episodes.py [limit]   (default limit: 150)
"""
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

FEED_URL = "https://govcongiants.libsyn.com/rss"
ITUNES = "{http://www.itunes.com/dtds/podcast-1.0.dtd}"
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "episodes.ts"
DESC_MAX = 500


def clean(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) > DESC_MAX:
        text = text[:DESC_MAX].rsplit(" ", 1)[0].rstrip(".,;:") + "…"
    return text


def main() -> None:
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else 150
    with urllib.request.urlopen(FEED_URL, timeout=60) as resp:
        root = ET.fromstring(resp.read())
    items = root.find("channel").findall("item")

    episodes = []
    for it in items[:limit]:
        enc = it.find("enclosure")
        audio_url = enc.get("url") if enc is not None else None
        if not audio_url:
            continue
        img = it.find(f"{ITUNES}image")
        pub = it.findtext("pubDate") or ""
        try:
            date = parsedate_to_datetime(pub).date().isoformat()
        except Exception:
            date = pub[:16]
        episodes.append({
            "title": (it.findtext("title") or "").strip(),
            "date": date,
            "description": clean(it.findtext("description") or ""),
            "duration": (it.findtext(f"{ITUNES}duration") or "").strip(),
            "link": (it.findtext("link") or "").strip(),
            "audioUrl": audio_url.strip(),
            "image": (img.get("href") or "").strip() if img is not None else None,
        })

    ts = (
        "export interface Episode {\n"
        "  title: string;\n"
        "  /** ISO date string (YYYY-MM-DD), parsed from the RSS pubDate */\n"
        "  date: string;\n"
        "  description: string;\n"
        "  /** e.g. \"09:34\" */\n"
        "  duration: string;\n"
        "  /** Libsyn episode page URL */\n"
        "  link: string;\n"
        "  /** Direct MP3 URL from the RSS enclosure (streamable on-site) */\n"
        "  audioUrl: string;\n"
        "  /** Per-episode artwork from the RSS feed, if present */\n"
        "  image: string | null;\n"
        "}\n\n"
        f"/** {len(episodes)} most recent GovCon Giants Podcast episodes, newest first.\n"
        f" *  Regenerate with: python3 scripts/rss-to-episodes.py [limit] */\n"
        f"export const episodes: Episode[] = {json.dumps(episodes, indent=2, ensure_ascii=False)};\n"
    )
    OUT.write_text(ts, encoding="utf-8")
    print(f"wrote {len(episodes)} episodes -> {OUT}")


if __name__ == "__main__":
    main()
