'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Jan 31 Bootcamp replay — order matches your Vimeo uploads (chronological by recording time)
const lessons = [
  { day: 1, title: 'Part 1 — Early Session', desc: 'Bootcamp kickoff and morning content.', videoId: '1161765986' },
  { day: 2, title: 'Part 2 — Mid-Day Session', desc: 'Core training and implementation.', videoId: '1161766070' },
  { day: 3, title: 'Part 3 — Afternoon Session', desc: 'Deep dive and Q&A.', videoId: '1161766212' },
  { day: 4, title: 'Part 4 — Evening Session', desc: 'Evening block and next steps.', videoId: '1161766342' },
  { day: 5, title: 'Part 5', desc: 'Additional bootcamp content.', videoId: '1161766348' },
  { day: 6, title: 'Part 6', desc: 'Additional bootcamp content.', videoId: '1161766514' },
];

export default function CourseClient() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('govcon_jan31_progress');
    if (saved) setCompletedLessons(JSON.parse(saved));
  }, []);

  const toggleComplete = (day: number) => {
    const updated = completedLessons.includes(day)
      ? completedLessons.filter((d) => d !== day)
      : [...completedLessons, day];
    setCompletedLessons(updated);
    localStorage.setItem('govcon_jan31_progress', JSON.stringify(updated));
  };

  const completedCount = completedLessons.length;
  const totalCount = lessons.length;

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="py-6 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">GovCon</span>
            <span className="text-2xl font-bold text-green-500">Giants</span>
          </Link>
          <div className="text-slate-400 text-sm">
            {completedCount} of {totalCount} completed
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-slate-900 py-3 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">
                Chapter {lessons[activeVideo].day}: {lessons[activeVideo].title}
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
              Jan 31 Bootcamp Replay Course
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Watch each chapter in order. Your progress is saved automatically
              on this device.
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
                <div className="relative aspect-video bg-slate-800">
                  <img
                    src={`https://vumbnail.com/${lesson.videoId}.jpg`}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <svg
                        className="w-6 h-6 text-slate-900 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  {completedLessons.includes(lesson.day) && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="inline-block bg-green-600/20 text-green-500 text-xs font-semibold px-2 py-1 rounded mb-2">
                    Chapter {lesson.day}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{lesson.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 text-sm">
            © 2026 GovCon Giants. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

