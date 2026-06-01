import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3, Layers3, Route } from "lucide-react";
import type { LearningItem } from "@/lib/learning/types";
import { Badge } from "@/components/ui/badge";

function itemHref(item: LearningItem) {
  if (item.type === "course") return `/courses/${item.slug}`;
  if (item.type === "roadmap") return `/roadmaps/${item.slug}`;
  if (item.type === "project") return `/projects/${item.slug}`;
  return item.sourceUrl;
}

export function LearningItemCard({ item }: { item: LearningItem }) {
  const href = itemHref(item);
  const isInternal = href.startsWith("/");
  const metaIcon =
    item.type === "roadmap" ? <Route className="h-4 w-4" /> : item.type === "project" ? <Layers3 className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />;

  return (
    <article className="group rounded-lg border border-border/60 bg-card/60 p-5 transition-colors hover:border-primary/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.type}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
        </div>
        <Badge variant="outline" className="shrink-0">
          {item.difficulty}
        </Badge>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border/50 bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">{metaIcon}{item.roadmapSteps.length} steps</span>
        {item.estimatedHours ? (
          <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" />~{item.estimatedHours}h</span>
        ) : (
          <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" />self-paced</span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="truncate text-xs text-muted-foreground">{item.sourceRepo}</p>
        {isInternal ? (
          <Link href={href} className="inline-flex items-center gap-1 text-sm text-primary transition-opacity hover:opacity-80">
            View details <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary transition-opacity hover:opacity-80"
          >
            Open source <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
