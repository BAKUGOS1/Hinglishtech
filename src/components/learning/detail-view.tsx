import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock3, GitBranch, ListChecks } from "lucide-react";
import type { LearningItem } from "@/lib/learning/types";
import { Badge } from "@/components/ui/badge";

export function LearningDetailView({ item }: { item: LearningItem }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-28">
      <div className="rounded-lg border border-border/60 bg-card/50 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{item.type}</Badge>
          <Badge variant="outline">{item.difficulty}</Badge>
          {item.estimatedHours ? <Badge variant="outline">~{item.estimatedHours}h</Badge> : null}
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">{item.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">{item.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/50 bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          <p className="inline-flex items-center gap-2"><ListChecks className="h-4 w-4" />{item.roadmapSteps.length} steps</p>
          <p className="inline-flex items-center gap-2"><GitBranch className="h-4 w-4" />{item.projectIdeas.length} project ideas</p>
          <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />{item.outcomes.length} outcomes</p>
          <p className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{item.estimatedHours ? `${item.estimatedHours} hours` : "Self-paced"}</p>
        </div>

        <div className="mt-6">
          <Link
            href={item.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary transition-opacity hover:opacity-85"
          >
            Open original source <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {item.prerequisites.length > 0 ? (
        <section className="mt-8 rounded-lg border border-border/60 bg-card/40 p-6">
          <h2 className="text-xl font-semibold text-foreground">Prerequisites</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {item.prerequisites.map((entry) => (
              <li key={entry} className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                {entry}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.roadmapSteps.length > 0 ? (
        <section className="mt-8 rounded-lg border border-border/60 bg-card/40 p-6">
          <h2 className="text-xl font-semibold text-foreground">Roadmap Steps</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            {item.roadmapSteps.map((step, index) => (
              <li key={`${index}-${step}`} className="inline-flex items-start gap-3">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/40 text-xs text-primary">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {item.projectIdeas.length > 0 ? (
        <section className="mt-8 rounded-lg border border-border/60 bg-card/40 p-6">
          <h2 className="text-xl font-semibold text-foreground">Project Ideas</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {item.projectIdeas.map((idea) => (
              <li key={idea} className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                {idea}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.outcomes.length > 0 ? (
        <section className="mt-8 rounded-lg border border-border/60 bg-card/40 p-6">
          <h2 className="text-xl font-semibold text-foreground">Outcomes</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {item.outcomes.map((outcome) => (
              <li key={outcome} className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                {outcome}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}
