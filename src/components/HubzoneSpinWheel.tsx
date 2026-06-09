'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * HUBZone webinar spin-the-wheel — PROTOTYPE.
 *
 * Drops onto the /hubzone/thank-you page as a post-registration reward.
 * Prizes are weighted; the wheel lands on a weighted-random segment and
 * the result is recorded so each registrant spins once. Swap PRIZES below
 * once the team finalizes the real giveaway mechanics.
 *
 * NOTE (prototype): the winning segment is chosen client-side. For a real
 * giveaway with valuable prizes, move the draw server-side and record the
 * outcome against the GHL contact to prevent tampering.
 */

interface Prize {
  label: string;
  /** Higher weight = more likely. */
  weight: number;
  color: string;
  /** Short message shown when won. */
  message: string;
}

// ---- EDIT THESE once the giveaway is finalized ----
const PRIZES: Prize[] = [
  { label: 'Free Dinner', weight: 1, color: '#ea580c', message: "🍽️ You won a free dinner on us at the D.C. conference!" },
  { label: '$25 Gift Card', weight: 3, color: '#f97316', message: '🎁 A $25 gift card is headed your way.' },
  { label: 'Front-Row Q&A', weight: 4, color: '#fb923c', message: '🎤 Priority Q&A — your questions get answered first.' },
  { label: 'Free Guide', weight: 6, color: '#fdba74', message: '📘 The Procurement-Ready guide is yours, free.' },
  { label: 'Conference Ticket', weight: 1, color: '#c2410c', message: '🎟️ You won a free D.C. conference ticket!' },
  { label: 'Spin Again Later', weight: 3, color: '#fed7aa', message: '🔄 So close — we may run another spin before the webinar.' },
];

const STORAGE_KEY = 'hubzone-spin-result';
const SIZE = 320; // canvas px

function weightedPick(prizes: Prize[]): number {
  const total = prizes.reduce((s, p) => s + p.weight, 0);
  // Deterministic-enough randomness without Math.random restrictions:
  // use crypto if available, else fall back to time-derived jitter.
  let r: number;
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    r = (buf[0] / 0xffffffff) * total;
  } else {
    r = (performance.now() % 1000) / 1000 * total;
  }
  for (let i = 0; i < prizes.length; i++) {
    r -= prizes[i].weight;
    if (r <= 0) return i;
  }
  return prizes.length - 1;
}

export default function HubzoneSpinWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState<Prize | null>(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  // Restore prior result so each person spins only once.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const prize = JSON.parse(saved) as Prize;
        setWon(prize);
        setAlreadyPlayed(true);
      } catch {
        /* ignore corrupt value */
      }
    }
  }, []);

  // Draw the wheel.
  const draw = useCallback((rot: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const radius = SIZE / 2 - 6;
    const seg = (2 * Math.PI) / PRIZES.length;

    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    PRIZES.forEach((prize, i) => {
      const start = i * seg;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, start + seg);
      ctx.closePath();
      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.rotate(start + seg / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = i >= 3 ? '#7c2d12' : '#ffffff';
      ctx.font = 'bold 13px -apple-system, Segoe UI, sans-serif';
      ctx.fillText(prize.label, radius - 14, 5);
      ctx.restore();
    });

    // Hub
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  }, []);

  useEffect(() => { draw(rotation); }, [rotation, draw]);

  function spin() {
    if (spinning || alreadyPlayed) return;
    setSpinning(true);

    const winnerIdx = weightedPick(PRIZES);
    const seg = 360 / PRIZES.length;
    // Pointer sits at top (12 o'clock). We want the winner's segment center
    // under the pointer. Add several full turns for drama.
    const segCenterDeg = winnerIdx * seg + seg / 2;
    const targetWithinTurn = (360 - segCenterDeg + 360) % 360; // align to pointer at top
    const turns = 6;
    const finalDeg = turns * 360 + targetWithinTurn;

    const start = performance.now();
    const duration = 4200;
    const startRot = rotation;
    const endRot = (finalDeg * Math.PI) / 180;

    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setRotation(startRot + (endRot - startRot) * eased);
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        const prize = PRIZES[winnerIdx];
        setWon(prize);
        setAlreadyPlayed(true);
        setSpinning(false);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prize));
        // Fire a lightweight event so the page can record the win if desired.
        window.dispatchEvent(new CustomEvent('hubzone-spin-won', { detail: prize }));
      }
    };
    requestAnimationFrame(animate);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Pointer */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-10"
          style={{ width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '24px solid #1f2937' }} />
        <canvas ref={canvasRef} width={SIZE} height={SIZE}
          className="drop-shadow-xl rounded-full" />
      </div>

      {!alreadyPlayed ? (
        <button
          onClick={spin}
          disabled={spinning}
          className="mt-6 bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-60 text-white font-black uppercase tracking-wide py-3 px-10 rounded-full shadow-lg transition-colors"
        >
          {spinning ? 'Spinning…' : 'Spin to Win 🎉'}
        </button>
      ) : won ? (
        <div className="mt-6 text-center bg-white border-2 border-orange-200 rounded-2xl px-6 py-5 shadow-md max-w-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">You won</p>
          <p className="text-2xl font-black text-slate-900 mb-1">{won.label}</p>
          <p className="text-sm text-slate-600">{won.message}</p>
          <p className="text-xs text-gray-400 mt-3">We&apos;ll confirm your prize at the webinar.</p>
        </div>
      ) : null}
    </div>
  );
}
