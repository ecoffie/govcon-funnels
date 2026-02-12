'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const lessons = [
  { day: 1, title: "What is a Government Contract?", desc: "Understand government contracts and what agencies are actually buying.", videoId: "763400851" },
  { day: 2, title: "What does it mean to have a Contract?", desc: "Learn why nearly anyone—even working from home—can succeed in this space.", videoId: "570786652" },
  { day: 3, title: "8 Reasons why YOU can do this", desc: "Find out if you need partners, employees, licenses or special programs to start.", videoId: "763380522" },
  { day: 4, title: "Can I do this working from home?", desc: "Discover if running a government contracting business remotely is viable for you.", videoId: "763382045" },
  { day: 5, title: "Does the government buy direct?", desc: "Understand the difference between prime contractors and subcontractors.", videoId: "763403543" },
  { day: 6, title: "What about the competition?", desc: "Learn about the small business competition landscape and how to stand out.", videoId: "763404266" },
  { day: 7, title: "Do I need employees or partners?", desc: "Evaluate whether to start as a solopreneur or build a team.", videoId: "763405254" },
  { day: 8, title: "Do I need a license to get a contract?", desc: "Determine the minimum requirements you need to get started.", videoId: "763406574" },
  { day: 9, title: "Small Business Programs", desc: "Compare the different small business programs and opportunities available.", videoId: "763407589" },
  { day: 10, title: "I am brand new, how do I get started?", desc: "Identify your first steps to entering the government contracting space.", videoId: "763408640" },
  { day: 11, title: "How do I setup my corporation?", desc: "Navigate business formation and legal requirements.", videoId: "763409248" },
  { day: 12, title: "Choosing the right NAICS code", desc: "Select the appropriate business classification for your services.", videoId: "763409957" },
];

export default function FreeCourse() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('govcon_course_progress');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const toggleComplete = (day: number) => {
    const updated = completedLessons.includes(day)
      ? completedLessons.filter(d => d !== day)
      : [...completedLessons, day];
    setCompletedLessons(updated);
    localStorage.setItem('govcon_course_progress', JSON.stringify(updated));
  };

  const completedCount = completedLessons.length;

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Progress Bar */}
      <div className="bg-slate-900 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / 12) * 100}%` }}
            ></div>
          </div>
          <span className="text-slate-400 text-sm flex-shrink-0">{completedCount} of 12 completed</span>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">
                Day {lessons[activeVideo].day}: {lessons[activeVideo].title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-white hover:text-slate-300 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://player.vimeo.com/video/${lessons[activeVideo].videoId}?autoplay=1`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  toggleComplete(lessons[activeVideo].day);
                  setActiveVideo(null);
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  completedLessons.includes(lessons[activeVideo].day)
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-green-600 text-white hover:bg-green-500'
                }`}
              >
                {completedLessons.includes(lessons[activeVideo].day)
                  ? '✓ Completed'
                  : 'Mark as Complete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Free 12-Day Government Contracting Course
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Watch each video in order to build your foundation in government contracting. Your progress is saved automatically.
            </p>
          </div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.day}
                className={`bg-slate-900 border rounded-xl overflow-hidden transition-all hover:translate-y-[-4px] cursor-pointer ${
                  completedLessons.includes(lesson.day)
                    ? 'border-green-600/50'
                    : 'border-slate-800'
                }`}
                onClick={() => setActiveVideo(index)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-slate-800">
                  <img
                    src={`https://vumbnail.com/${lesson.videoId}.jpg`}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <svg className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  {/* Completed Badge */}
                  {completedLessons.includes(lesson.day) && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-4">
                  <div className="inline-block bg-green-600/20 text-green-500 text-xs font-semibold px-2 py-1 rounded mb-2">
                    Day {lesson.day}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{lesson.title}</h3>
                  <p className="text-slate-400 text-sm">{lesson.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Next Step CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Ready for the Next Step?</h2>
              <p className="text-slate-400 mb-6">
                Join our January Bootcamp for live training, personalized guidance, and a complete action plan to win your first contract.
              </p>
              <Link
                href="/bootcamp"
                className="btn-primary inline-block green-glow"
              >
                Learn About the Bootcamp →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
