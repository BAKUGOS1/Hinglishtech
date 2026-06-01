import { CheckCircle2, Clock3, Flame, GraduationCap, ListChecks, Sparkles, Trophy, Users } from "lucide-react";
import type { LearningItem } from "@/lib/learning/types";

function weeksFromHours(hours: number | null): string {
  if (!hours) return "Self-paced";
  const weeks = Math.max(2, Math.round(hours / 6));
  return `${weeks} weeks / ${hours} hours`;
}

export function LearningDetailView({ item }: { item: LearningItem }) {
  const graphSteps = item.roadmapSteps.slice(0, 6);
  const previewLessons = item.roadmapSteps.slice(0, 2);
  const discussionTopics = [
    `Questions on ${item.title} fundamentals`,
    "Code review requests for current assignments",
    "Help thread for quiz and challenge blockers",
  ];

  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-20 pt-28 md:px-10">
      <div className="border border-border bg-card/70 p-6">
        <div className="flex flex-wrap gap-2">
          <span className="border border-border bg-secondary px-2 py-0.5 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            {item.type}
          </span>
          <span className="border border-primary/40 bg-primary/10 px-2 py-0.5 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-primary">
            {item.difficulty}
          </span>
          <span className="border border-border bg-secondary px-2 py-0.5 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            {weeksFromHours(item.estimatedHours)}
          </span>
        </div>

        <h1 className="mt-4 font-grotesk text-3xl font-bold tracking-tight text-foreground md:text-4xl">{item.title}</h1>
        <p className="mt-3 max-w-3xl font-ibm-mono text-sm leading-7 text-muted-foreground">{item.summary}</p>

        <div className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          <p className="inline-flex items-center gap-2 font-ibm-mono"><ListChecks className="h-4 w-4 text-primary" />{item.lessonCount ?? Math.max(10, item.roadmapSteps.length * 2)} lessons</p>
          <p className="inline-flex items-center gap-2 font-ibm-mono"><Clock3 className="h-4 w-4 text-primary" />{item.estimatedHours ? `${item.estimatedHours} hours` : "Self-paced"}</p>
          <p className="inline-flex items-center gap-2 font-ibm-mono"><Users className="h-4 w-4 text-primary" />{(item.studentCount ?? 1600).toLocaleString()} learners</p>
          <p className="inline-flex items-center gap-2 font-ibm-mono"><Trophy className="h-4 w-4 text-primary" />{item.hasCertificate ? "Certificate included" : "Skill badge path"}</p>
        </div>
      </div>

      <section className="mt-6 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Roadmap Graph</h2>
          <p className="mt-1 font-ibm-mono text-xs text-muted-foreground">
            Stage-by-stage path with progress context.
          </p>
          <div className="mt-4 space-y-3">
            {graphSteps.map((step, index) => {
              const progress = Math.round(((index + 1) / graphSteps.length) * 100);
              return (
                <div key={`${index}-${step}`}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-foreground">
                      {index + 1}. {step}
                    </p>
                    <span className="font-ibm-mono text-[10px] text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="h-2 border border-border bg-background">
                    <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Continue Learning</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="border border-border bg-secondary/50 p-3">
              <p className="inline-flex items-center gap-2 font-ibm-mono text-xs text-foreground">
                <Flame className="h-4 w-4 text-primary" />
                Current streak: 6 days
              </p>
            </div>
            <div className="border border-border bg-secondary/50 p-3">
              <p className="inline-flex items-center gap-2 font-ibm-mono text-xs text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Module progress: 57%
              </p>
            </div>
            <div className="border border-border bg-secondary/50 p-3">
              <p className="inline-flex items-center gap-2 font-ibm-mono text-xs text-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                Certificate unlock target: 80%
              </p>
            </div>
            <div className="border border-border bg-secondary/50 p-3">
              <p className="inline-flex items-center gap-2 font-ibm-mono text-xs text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Recommended next: {item.roadmapSteps[1] ?? "Move to the next module"}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-3 lg:grid-cols-2">
        <article className="border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Practice and Assessment</h2>
          <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
            <li>• Coding exercises after every module ({item.practiceCount ?? Math.max(8, item.roadmapSteps.length)} sets).</li>
            <li>• Quiz checkpoints with quick difficulty-based revision hints.</li>
            <li>• Practice assignments with solution walkthroughs.</li>
            <li>• Free preview lessons: module 1 and module 2 are open.</li>
          </ul>
        </article>
        <article className="border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Notes, Outcomes, and Guidance</h2>
          <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
            <li>• Download pack: notes, cheatsheet, and VS Code setup checklist.</li>
            <li>• Hinglish-friendly concept explainers are included for beginners.</li>
            <li>• Instructor profile: Core Team Mentor (8+ years practical delivery).</li>
            <li>• Learning path: {item.learningPath ?? "Foundation → Build → Practice → Ship"}.</li>
          </ul>
        </article>
      </section>

      <section className="mt-6 grid gap-3 lg:grid-cols-2">
        <article className="border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Instructor and Free Preview</h2>
          <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
            <li>• Lead Instructor: Core Team Mentor (8+ years, production backend/frontend delivery)</li>
            <li>• Preview lesson 1: {previewLessons[0] ?? "Course introduction and setup"}</li>
            <li>• Preview lesson 2: {previewLessons[1] ?? "First practical coding assignment"}</li>
            <li>• Full certificate unlock target: 80% completion + capstone submission</li>
          </ul>
        </article>
        <article className="border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Course Discussion Board</h2>
          <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
            {discussionTopics.map((topic) => (
              <li key={topic}>• {topic}</li>
            ))}
          </ul>
          <p className="mt-3 border-t border-border pt-2 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            Peer review queue and mentor replies are updated daily.
          </p>
        </article>
      </section>

      {item.prerequisites.length > 0 ? (
        <section className="mt-6 border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Prerequisites</h2>
          <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
            {item.prerequisites.map((entry) => (
              <li key={entry}>• {entry}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.projectIdeas.length > 0 ? (
        <section className="mt-6 border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Real-World Projects</h2>
          <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
            {item.projectIdeas.map((idea) => (
              <li key={idea}>• {idea}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.outcomes.length > 0 ? (
        <section className="mt-6 border border-border bg-card/50 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">What You Will Build</h2>
          <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
            {item.outcomes.map((outcome) => (
              <li key={outcome}>• {outcome}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}
