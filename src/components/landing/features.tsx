import { BookCheck, ChartColumn, ClipboardCheck, NotebookTabs, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: BookCheck,
    title: "Structured Learning Paths",
    description: "Go from absolute beginner to role-ready through guided milestones and recommended next courses.",
  },
  {
    icon: ClipboardCheck,
    title: "Practice After Every Module",
    description: "Each track includes exercises, quizzes, and assignment prompts with solution directions.",
  },
  {
    icon: ChartColumn,
    title: "Progress Graphs",
    description: "Visual stage graphs show where learners are and what to complete next without confusion.",
  },
  {
    icon: NotebookTabs,
    title: "Notes and Cheatsheets",
    description: "Focused module notes and quick-recall references keep revision fast before interviews.",
  },
  {
    icon: Trophy,
    title: "Certificates and Outcomes",
    description: "Cards and detail pages show expected skills, practical deliverables, and certificate availability.",
  },
  {
    icon: Users,
    title: "Trust Through Context",
    description: "Clear prerequisites, estimated effort, and project impact help learners choose the right track.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-y border-border bg-card/30 py-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            [01] Platform Strength
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for Practical Learning, Not Passive Watching
          </h2>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="border border-border bg-background p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center border border-primary/50 bg-secondary">
                <feature.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <h3 className="mt-4 font-grotesk text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 font-ibm-mono text-xs leading-6 tracking-[0.02em] text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
