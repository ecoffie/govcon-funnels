'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurriculum, getTotalLessons, type Phase, type Module, type Lesson } from '@/lib/course';

const STORAGE_KEY = 'govcon_action_plan_progress';

export default function ActionPlanCoursePage() {
  const curriculum = getCurriculum();
  const totalLessons = getTotalLessons();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set([curriculum.phases[0]?.id ?? '']));
  const [activeLesson, setActiveLesson] = useState<{ phase: Phase; module: Module; lesson: Lesson } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[];
        setCompletedLessons(new Set(parsed));
      } catch {
        setCompletedLessons(new Set());
      }
    }
  }, []);

  useEffect(() => {
    if (completedLessons.size > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedLessons]));
    }
  }, [completedLessons]);

  const toggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  };

  const completedCount = completedLessons.size;
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <main className="min-h-screen bg-slate-950">
      <header className="py-6 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <Link href="/free-course" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">GovCon</span>
            <span className="text-2xl font-bold text-green-500">Giants</span>
          </Link>
          <span className="text-slate-400 text-sm">
            {completedCount} of {totalLessons} completed
          </span>
        </div>
      </header>

      <div className="bg-slate-900 py-3 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {activeLesson && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-green-500 text-sm font-medium">
                  Phase {activeLesson.phase.order}: {activeLesson.phase.name} / {activeLesson.module.title}
                </p>
                <h3 className="text-white font-bold text-lg">{activeLesson.lesson.title}</h3>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="text-white hover:text-slate-300 text-2xl p-2"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-800">
              {activeLesson.lesson.videoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${activeLesson.lesson.videoId}?autoplay=1`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold mb-2">Video Coming Soon</p>
                  <p className="text-slate-400 text-sm max-w-md">
                    AI-generated video for this lesson is in production. Content will be available soon.
                  </p>
                  {activeLesson.lesson.description && (
                    <p className="text-slate-500 text-sm mt-4 max-w-lg">{activeLesson.lesson.description}</p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    toggleComplete(activeLesson.lesson.id);
                    setActiveLesson(null);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    completedLessons.has(activeLesson.lesson.id)
                      ? 'bg-slate-700 text-slate-300'
                      : 'bg-green-600 text-white hover:bg-green-500'
                  }`}
                >
                  {completedLessons.has(activeLesson.lesson.id) ? '✓ Completed' : 'Mark as Complete'}
                </button>
                <button
                  onClick={() => setActiveLesson(null)}
                  className="px-6 py-3 rounded-lg font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
      )}

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Government Contracting Action Plan
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Your step-by-step path to break into federal government contracts. Based on 15 years of experience.
            </p>
          </div>

          <div className="space-y-4">
            {curriculum.phases.map((phase) => (
              <div
                key={phase.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-500 font-bold">{phase.order}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Phase {phase.order}: {phase.name}</h2>
                      <p className="text-slate-400 text-sm">{phase.description}</p>
                      <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-400">
                        {phase.type}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-slate-400 transition-transform ${expandedPhases.has(phase.id) ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedPhases.has(phase.id) && (
                  <div className="border-t border-slate-800 p-6 pt-0">
                    {phase.modules.map((module) => (
                      <div key={module.id} className="mt-6 first:mt-0">
                        <h3 className="text-lg font-semibold text-slate-200 mb-3">{module.title}</h3>
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => setActiveLesson({ phase, module, lesson })}
                              className={`w-full flex items-center gap-4 p-4 rounded-lg text-left transition-all hover:bg-slate-800/50 ${
                                completedLessons.has(lesson.id) ? 'border border-green-600/30 bg-green-500/5' : 'border border-transparent'
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  completedLessons.has(lesson.id) ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'
                                }`}
                              >
                                {completedLessons.has(lesson.id) ? (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-white truncate">{lesson.title}</p>
                                {lesson.description && (
                                  <p className="text-sm text-slate-500 truncate">{lesson.description}</p>
                                )}
                              </div>
                              <span className="text-slate-500 text-sm flex-shrink-0">Watch</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Ready for the Next Step?</h2>
              <p className="text-slate-400 mb-6">
                Join our Bootcamp for live training, personalized guidance, and a complete action plan to win your first contract.
              </p>
              <Link href="/bootcamp" className="btn-primary inline-block green-glow">
                Learn About the Bootcamp →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
