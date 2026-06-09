'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HubzoneSpinWheel from '@/components/HubzoneSpinWheel';

export default function HubzoneThankYou() {
  const [userName, setUserName] = useState('there');

  useEffect(() => {
    const name = localStorage.getItem('leadName');
    if (name) setUserName(name.split(' ')[0]);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ea580c] via-[#dc2626] to-[#9a3412] py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white text-center py-10 px-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-2">
            You&apos;re In, {userName}!
          </h1>
          <p className="text-lg text-white/95">Your seat is reserved.</p>
        </div>

        <div className="p-8 md:p-10 space-y-6">
          {/* Spin-the-wheel reward (PROTOTYPE) */}
          <div className="bg-gradient-to-b from-orange-50 to-white rounded-2xl p-6 border border-orange-100 text-center">
            <h2 className="font-black text-slate-900 text-xl uppercase mb-1">🎡 Spin to Win</h2>
            <p className="text-sm text-slate-500 mb-5">A thank-you for registering — one spin per attendee.</p>
            <HubzoneSpinWheel />
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <h2 className="font-black text-slate-900 text-xl mb-3 uppercase">What Happens Next</h2>
            <ol className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="bg-[#ea580c] text-white font-black w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <span>Check your inbox for a confirmation email with the webinar link.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-[#ea580c] text-white font-black w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <span>Add <span className="font-bold">June 17, 2026 · 6 – 8 PM EST</span> to your calendar.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-[#ea580c] text-white font-black w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <span>We&apos;ll send a reminder 24 hours and 1 hour before we go live.</span>
              </li>
            </ol>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
            <p className="text-slate-700 mb-1">Questions?</p>
            <p className="text-sm text-slate-600">
              Shelly Sweedler{' '}
              <a href="tel:2169989021" className="text-[#ea580c] font-bold underline">216-998-9021</a>{' '}
              · Robinn Mikalic{' '}
              <a href="tel:2169989206" className="text-[#ea580c] font-bold underline">216-998-9206</a>
            </p>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/hubzone"
              className="inline-block text-[#ea580c] font-bold hover:underline"
            >
              ← Back to the webinar page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
