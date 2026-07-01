// Type shim for the plain-JS email content module (kept as .mjs so the local
// CLI runner can import it directly without a build step).
export interface ReigniteStage {
  key: string;
  daysAfterPrev: number;
  subject: string;
  fn: (firstName: string, profileUrl: string) => string;
}
export const STAGES: ReigniteStage[];
export function renderStage(
  stage: ReigniteStage,
  firstName: string,
  profileUrl: string
): { subject: string; html: string };
