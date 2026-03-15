'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem('exitPopupShown');
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Only add listener after 10 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
          aria-label="Close popup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎓</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Wait! Before You Go...
          </h2>

          <p className="text-slate-400 mb-6">
            Get our <span className="text-green-500 font-semibold">FREE beginner&apos;s course</span> on
            government contracting. Learn how to register, find opportunities, and win your first contract.
          </p>

          <div className="space-y-3">
            <Link
              href="/free-course"
              className="block w-full px-6 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition"
              onClick={handleClose}
            >
              Get Free Course →
            </Link>

            <button
              onClick={handleClose}
              className="text-slate-500 hover:text-slate-400 text-sm transition"
            >
              No thanks, I&apos;ll figure it out myself
            </button>
          </div>

          <p className="text-slate-600 text-xs mt-4">
            Join 5,000+ contractors who started here
          </p>
        </div>
      </div>
    </div>
  );
}
