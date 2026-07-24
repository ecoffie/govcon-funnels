import { useEffect, useRef } from 'react';

/**
 * Exclusive audio playback: a module-level registry of every mounted
 * <audio> element. When one starts playing, all others pause — only one
 * episode ever plays at a time, no external player library needed.
 */
const players = new Set<HTMLAudioElement>();

/** Ref to attach to an <audio> element; registers it for exclusive playback. */
export function useExclusiveAudio() {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const el = ref.current;
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

  return ref;
}
