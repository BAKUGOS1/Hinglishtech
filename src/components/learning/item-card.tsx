import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, Layers3, Route, Star, Trophy, Users } from "lucide-react";
import type { LearningItem } from "@/lib/learning/types";

function itemHref(item: LearningItem) {
  if (item.type === "course") return `/courses/${item.slug}`;
  if (item.type === "roadmap") return `/roadmaps/${item.slug}`;
  if (item.type === "project") return `/projects/${item.slug}`;
  return "/courses";
}

export function LearningItemCard({ item }: { item: LearningItem }) {
  const href = itemHref(item);
  const metaIcon =
    item.type === "roadmap" ? <Route className="h-4 w-4" /> : item.type === "project" ? <Layers3 className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />;

  return (
    <article className="group border border-border bg-card/60 p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{item.type}</p>
          <h3 className="mt-1 font-grotesk text-xl font-semibold text-foreground">{item.title}</h3>
        </div>
        <span className="shrink-0 border border-primary/40 bg-primary/10 px-2 py-0.5 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-primary">
          {item.difficulty}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 font-ibm-mono text-xs leading-6 text-muted-foreground">{item.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="border border-border bg-secondary/60 px-2 py-0.5 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground md:grid-cols-3">
        <span className="inline-flex items-center gap-1 font-ibm-mono">{metaIcon}{item.roadmapSteps.length} steps</span>
        {item.estimatedHours ? (
          <span className="inline-flex items-center gap-1 font-ibm-mono"><Clock3 className="h-4 w-4 text-primary" />~{item.estimatedHours}h</span>
        ) : (
          <span className="inline-flex items-center gap-1 font-ibm-mono"><Clock3 className="h-4 w-4 text-primary" />self-paced</span>
        )}
        <span className="inline-flex items-center gap-1 font-ibm-mono"><BookOpen className="h-4 w-4 text-primary" />{item.lessonCount ?? Math.max(8, item.roadmapSteps.length * 2)} lessons</span>
        <span className="inline-flex items-center gap-1 font-ibm-mono"><Trophy className="h-4 w-4 text-primary" />{item.hasCertificate ? "Certificate" : "No certificate"}</span>
        <span className="inline-flex items-center gap-1 font-ibm-mono"><Users className="h-4 w-4 text-primary" />{(item.studentCount ?? 1200).toLocaleString()}</span>
        <span className="inline-flex items-center gap-1 font-ibm-mono"><Star className="h-4 w-4 text-primary" />{(item.rating ?? 4.6).toFixed(1)}</span>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <p className="font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
          Prerequisites:
        </p>
        <p className="mt-1 text-sm text-foreground">
          {item.prerequisites.slice(0, 1)[0] ?? "No strict prerequisite"}
        </p>
        <p className="mt-2 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
          Recommended next:
        </p>
        <p className="mt-1 text-sm text-foreground">
          {item.roadmapSteps[1] ?? item.outcomes[0] ?? "Complete this track and move to the next level."}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <Link href={href} className="inline-flex items-center gap-1 font-ibm-mono text-[11px] uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-85">
          View details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
