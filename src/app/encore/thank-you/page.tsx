'use client';

import { useEffect, useState } from 'react';

const PDF_FILE = '/encore/tempnet-book.pdf';
const ENCORE_URL = 'https://gov.encore-funding.com/';

export default function EncoreThankYou() {
  const [userName, setUserName] = useState('there');

  useEffect(() => {
    const name = localStorage.getItem('leadName');
    if (name) {
      setUserName(name.split(' ')[0]);
    }
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          {/* Success */}
          <div className="w-20 h-20 bg-orange-100 border-2 border-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Thanks, <span className="text-orange-500">{userName}</span>!
          </h1>

          <p className="text-slate-600 mb-8">
            Click below to download your free TempNet book.
          </p>

          {/* Download */}
          <a
            href={PDF_FILE}
            download="TempNet-Book.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition-all encore-glow mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download TempNet Book
          </a>

          {/* Redirect to Encore */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <p className="text-slate-600 mb-4">
              Continue to Encore Funding to learn more about government contractor financing.
            </p>
            <a
              href={ENCORE_URL}
              className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold transition"
            >
              Go to Encore Funding →
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-slate-200 text-center">
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Encore Funding</p>
      </footer>
    </main>
  );
}
