'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * On-page episode player, ported from the SPA's CustomPlayer.
 *
 * Rewritten without lucide-react / EqBars / cn so the podcast port adds no new
 * dependencies to the Next app. Behavior kept from the original: a single
 * <audio> element, 15s skip controls, a seekable progress bar, and exclusive
 * playback (starting one player pauses every other one on the page).
 */

const players = new Set<HTMLAudioElement>();

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h ? String(m).padStart(2, '0') : String(m);
  return `${h ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}

export default function EpisodePlayer({
  src,
  fallbackDuration,
}: {
  src: string;
  fallbackDuration?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // Register for exclusive playback — only one episode plays at a time.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => {
      players.forEach((other) => {
        if (other !== el) other.pause();
      });
    };
    players.add(el);
    el.addEventListener('play', onPlay);
    return () => {
      players.delete(el);
      el.removeEventListener('play', onPlay);
    };
  }, []);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }

  function skip(delta: number) {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.min(Math.max(el.currentTime + delta, 0), el.duration || 0);
  }

  function seek(event: React.ChangeEvent<HTMLInputElement>) {
    const el = audioRef.current;
    if (!el || !duration) return;
    el.currentTime = (Number(event.target.value) / 100) * duration;
  }

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause episode' : 'Play episode'}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-500 text-slate-950 transition-colors hover:bg-green-400"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden>
              <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.5-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={pct}
            onChange={seek}
            aria-label="Seek within episode"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-green-500"
            style={{
              background: `linear-gradient(to right, #22c55e ${pct}%, #334155 ${pct}%)`,
            }}
          />
          <div className="mt-2 flex items-center justify-between font-mono text-xs text-slate-400">
            <span>{formatTime(current)}</span>
            <span>{duration ? formatTime(duration) : fallbackDuration ?? '--:--'}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => skip(-15)}
            aria-label="Back 15 seconds"
            className="rounded-lg px-2 py-1 font-mono text-xs font-semibold text-slate-400 transition-colors hover:text-green-400"
          >
            −15s
          </button>
          <button
            type="button"
            onClick={() => skip(15)}
            aria-label="Forward 15 seconds"
            className="rounded-lg px-2 py-1 font-mono text-xs font-semibold text-slate-400 transition-colors hover:text-green-400"
          >
            +15s
          </button>
        </div>
      </div>
    </div>
  );
}
