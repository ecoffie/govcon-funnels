import curriculumData from '@/data/course-curriculum.json';
import scriptsData from '@/data/scripts/scripts.json';

export interface Lesson {
  id: string;
  title: string;
  key: string;
  videoId?: string | null;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Phase {
  id: string;
  order: number;
  name: string;
  type: string;
  description: string;
  modules: Module[];
}

export interface CourseCurriculum {
  title: string;
  description: string;
  phases: Phase[];
}

// Video ID overrides for lessons not in curriculum (Phases 2-5)
const videoIdOverrides: Record<string, string | null> = {};

function getVideoId(lesson: { id: string; videoId?: string | null }): string | null {
  if (lesson.videoId) return lesson.videoId;
  if (lesson.id in videoIdOverrides) return videoIdOverrides[lesson.id];
  return null;
}

function getLessonDescription(lesson: { id: string; description?: string }): string {
  if (lesson.description) return lesson.description;
  const script = (scriptsData as { scripts: Record<string, { slides: { narration: string }[] }> }).scripts[lesson.id];
  if (!script?.slides?.[0]?.narration) return '';
  const narration = script.slides[0].narration;
  return narration.length > 120 ? narration.substring(0, 120) + '...' : narration;
}

export function getCurriculum(): CourseCurriculum {
  const curriculum = curriculumData as CourseCurriculum;
  return {
    ...curriculum,
    phases: curriculum.phases.map((phase) => ({
      ...phase,
      modules: phase.modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => ({
          ...lesson,
          videoId: getVideoId(lesson),
          description: getLessonDescription(lesson),
        })),
      })),
    })),
  };
}

export function getTotalLessons(): number {
  const curriculum = getCurriculum();
  return curriculum.phases.reduce(
    (acc, phase) =>
      acc + phase.modules.reduce((mAcc, mod) => mAcc + mod.lessons.length, 0),
    0
  );
}

export function getLessonById(lessonId: string): { phase: Phase; module: Module; lesson: Lesson } | null {
  const curriculum = getCurriculum();
  for (const phase of curriculum.phases) {
    for (const module of phase.modules) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson) return { phase, module, lesson };
    }
  }
  return null;
}
