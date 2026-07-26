import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, RotateCw } from 'lucide-react';
import EqBars from '@/components/EqBars';
import { useExclusiveAudio } from '@/lib/useExclusiveAudio';
import { cn } from '@/lib/utils';

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

interface CustomPlayerProps {
  /** MP3 URL of the active episode. Changing it resets the player — never autoplays. */
  src: string;
  /** Duration string from the data, shown until audio metadata loads. */
  fallbackDuration: string;
  /** Lifted play/pause state (e.g. so the gallery can pause auto-rotation). */
  onPlayingChange?: (playing: boolean) => void;
}

/**
 * useAudioPlayer — drives one hidden <audio> element: play/pause state,
 * current/total time, ±15s seeks, pointer seeking, error state. The element
 * registers with useExclusiveAudio, so starting playback here pauses every
 * other player on the page (one-at-a-time rule).
 */
function useAudioPlayer(src: string, onPlayingChange?: (playing: boolean) => void) {
  const audioRef = useExclusiveAudio();
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  // Latest callback in a ref so the listener wiring stays mount-only
  const cbRef = useRef(onPlayingChange);
  cbRef.current = onPlayingChange;

  // Guest switch: full reset, no autoplay
  useEffect(() => {
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
    setError(false);
    cbRef.current?.(false);
  }, [src]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setCurrent(el.currentTime);
    const onMeta = () => setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    const onPlay = () => {
      setPlaying(true);
      cbRef.current?.(true);
    };
    const notifyPaused = () => {
      setPlaying(false);
      cbRef.current?.(false);
    };
    const onError = () => {
      notifyPaused();
      setError(true);
    };
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', notifyPaused);
    el.addEventListener('ended', notifyPaused);
    el.addEventListener('error', onError);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', notifyPaused);
      el.removeEventListener('ended', notifyPaused);
      el.removeEventListener('error', onError);
    };
  }, [audioRef]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el || error) return;
    if (el.paused) {
      el.play().catch(() => setError(true));
    } else {
      el.pause();
    }
  };

  const skip = (delta: number) => {
    const el = audioRef.current;
    if (!el) return;
    const max = duration || el.duration || 0;
    el.currentTime = Math.min(Math.max(0, el.currentTime + delta), max);
  };

  const seekTo = (ratio: number) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    el.currentTime = Math.min(Math.max(ratio, 0), 1) * duration;
  };

  return { audioRef, playing, current, duration, error, toggle, skip, seekTo };
}

/**
 * Custom-designed audio player (home featured gallery): skip −15s, big green
 * play/pause, skip +15s, click/drag progress bar (hairline track, green
 * fill), and a mono `current / total` readout that falls back to the data
 * duration string until metadata loads.
 */
export default function CustomPlayer({ src, fallbackDuration, onPlayingChange }: CustomPlayerProps) {
  const { audioRef, playing, current, duration, error, toggle, skip, seekTo } =
    useAudioPlayer(src, onPlayingChange);
  const trackRef = useRef<HTMLDivElement>(null);

  const seekFromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const r = track.getBoundingClientRect();
    seekTo((clientX - r.left) / r.width);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  const skipBtnCls =
    'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-slate-500 transition-all duration-150 hover:border-brand hover:text-brand cursor-pointer';

  return (
    <div>
      <audio ref={audioRef} preload="metadata" src={src} className="hidden" />

      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => skip(-15)}
          aria-label="Back 15 seconds"
          className={skipBtnCls}
        >
          <RotateCcw className="h-4 w-4" />
          <span className="absolute -bottom-1 -right-1 font-mono text-[9px] font-semibold">15</span>
        </button>

        <button
          type="button"
          onClick={toggle}
          disabled={error}
          aria-label={playing ? 'Pause episode' : 'Play episode'}
          aria-pressed={playing}
          className={cn(
            'flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-150 cursor-pointer',
            error
              ? 'cursor-not-allowed border border-line text-slate-400'
              : 'bg-brand text-brand-ink hover:-translate-y-px hover:bg-brand-hover active:scale-[0.97]',
          )}
        >
          {playing ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="ml-1 h-6 w-6 fill-current" />
          )}
        </button>

        <button
          type="button"
          onClick={() => skip(15)}
          aria-label="Forward 15 seconds"
          className={skipBtnCls}
        >
          <RotateCw className="h-4 w-4" />
          <span className="absolute -bottom-1 -right-1 font-mono text-[9px] font-semibold">15</span>
        </button>

        {playing && <EqBars className="hidden sm:flex" />}

        {/* Progress bar — click or drag to seek */}
        <div
          ref={trackRef}
          role="slider"
          aria-label="Seek within episode"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
          aria-valuetext={`${formatTime(current)} of ${duration ? formatTime(duration) : fallbackDuration}`}
          tabIndex={0}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            seekFromPointer(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1) seekFromPointer(e.clientX);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') skip(-15);
            if (e.key === 'ArrowRight') skip(15);
          }}
          className="group relative h-6 min-w-0 flex-1 cursor-pointer touch-none"
        >
          <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-line" />
          <span
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-brand"
            style={{ width: `${progress}%` }}
          />
          <span
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>

        <span className="shrink-0 font-mono text-xs tabular-nums text-slate-500">
          {formatTime(current)} / {duration ? formatTime(duration) : fallbackDuration}
        </span>
      </div>

      {error && (
        <p className="mt-2 text-sm text-slate-500">
          Audio unavailable right now — listen on Libsyn instead.
        </p>
      )}
    </div>
  );
}
