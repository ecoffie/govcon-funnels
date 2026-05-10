'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Demo {
  id: string;
  title: string;
  description: string;
  features: string[];
}

interface DemoTabsProps {
  demos: Demo[];
}

export default function DemoTabs({ demos }: DemoTabsProps) {
  const [activeTab, setActiveTab] = useState('opportunity-search');

  const activeDemo = demos.find(d => d.id === activeTab);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          See MI in Action
        </h2>
        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          Explore the key features that help contractors find opportunities, track their pipeline, and win more contracts.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveTab(demo.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === demo.id
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {demo.title}
            </button>
          ))}
        </div>

        {/* Active Demo Content */}
        {activeDemo && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Screenshot Placeholder */}
              <div className="bg-slate-800 aspect-video md:aspect-auto relative flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <div className="text-slate-400 font-medium">
                    {activeDemo.title} Screenshot
                  </div>
                </div>
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none"></div>
              </div>

              {/* Description & Features */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {activeDemo.title}
                </h3>
                <p className="text-slate-400 mb-6">
                  {activeDemo.description}
                </p>

                <div className="space-y-3 mb-8">
                  {activeDemo.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/mi-free"
                  className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all"
                >
                  Try It Yourself →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mini Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveTab(demo.id)}
              className={`bg-slate-900 border rounded-xl p-6 text-left transition-all ${
                activeTab === demo.id
                  ? 'border-green-500/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <h4 className="text-lg font-bold text-white mb-2">
                {demo.title}
              </h4>
              <p className="text-sm text-slate-400 line-clamp-2">
                {demo.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
