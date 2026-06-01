import Link from "next/link";
import { ArrowRight, Clock3, Layers3, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeaturedCourses } from "@/lib/learning/catalog";
import type { LearningItem } from "@/lib/learning/types";

function detailHref(item: LearningItem) {
  if (item.type === "course") return `/courses/${item.slug}`;
  if (item.type === "roadmap") return `/roadmaps/${item.slug}`;
  if (item.type === "project") return `/projects/${item.slug}`;
  return item.sourceUrl;
}

const featured = getFeaturedCourses(6);

export function Courses() {
  return (
    <section id="courses" className="border-t border-border/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Learning Catalog</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Curated from real GitHub learning sources
          </h2>
          <p className="mt-4 text-muted-foreground">
            Courses, roadmaps, and project tracks with clear progression and source attribution.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={detailHref(item)}
              className="group flex flex-col rounded-lg border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary">
                  {item.title}
                </h3>
                <Badge variant="outline" className="shrink-0 text-[10px]">
                  {item.type}
                </Badge>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/50 bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-border/30 pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Route className="h-3.5 w-3.5" />
                  {item.roadmapSteps.length} steps
                </span>
                <span className="flex items-center gap-1">
                  <Layers3 className="h-3.5 w-3.5" />
                  {item.projectIdeas.length} ideas
                </span>
                <span className="flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {item.estimatedHours ? `~${item.estimatedHours}h` : "self-paced"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="outline" className="gap-2" render={<Link href="/courses" />}>
            Explore Courses
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2" render={<Link href="/roadmaps" />}>
            Explore Roadmaps
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2" render={<Link href="/projects" />}>
            Explore Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
