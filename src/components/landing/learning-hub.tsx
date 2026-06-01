import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getItemsByType } from "@/lib/learning/catalog";

export function LearningHub() {
  const roadmapHighlights = getItemsByType("roadmap").slice(0, 3);
  const projectHighlights = getItemsByType("project").slice(0, 3);
  const caseStudyHighlights = getItemsByType("case-study").slice(0, 3);

  return (
    <section className="border-t border-border/50 py-24">
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        <article className="rounded-lg border border-border/60 bg-card/50 p-6">
          <h3 className="text-xl font-semibold text-foreground">Roadmaps with clear direction</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Move step by step through curated tracks sourced from respected learning repositories.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {roadmapHighlights.map((item) => (
              <li key={item.id} className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                {item.title}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-5 gap-2" render={<Link href="/roadmaps" />}>
            View Roadmaps
            <ArrowRight className="h-4 w-4" />
          </Button>
        </article>

        <article className="rounded-lg border border-border/60 bg-card/50 p-6">
          <h3 className="text-xl font-semibold text-foreground">Project-based learning first</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Learn by building with practical project tracks across multiple languages and stacks.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {projectHighlights.map((item) => (
              <li key={item.id} className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                {item.title}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-5 gap-2" render={<Link href="/projects" />}>
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </article>

        <article className="rounded-lg border border-border/60 bg-card/50 p-6">
          <h3 className="text-xl font-semibold text-foreground">Real production repo context</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Study case tracks from real repositories to understand architecture, tradeoffs, and shipping patterns.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {caseStudyHighlights.map((item) => (
              <li key={item.id} className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                {item.title}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-5 gap-2" render={<Link href="/courses" />}>
            View Full Catalog
            <ArrowRight className="h-4 w-4" />
          </Button>
        </article>
      </div>
    </section>
  );
}
