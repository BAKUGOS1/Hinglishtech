import Link from "next/link";
import { ArrowRight, Flame, Gauge, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { queryRoadmaps } from "@/lib/learning/catalog";

const roadmapHighlights = queryRoadmaps({ page: 1, track: "" }).items.slice(0, 4);

export function LearningHub() {
  return (
    <section className="border-y border-border bg-card/30 py-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            [03] Momentum Layer
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Keep Learning Daily With Clear Progress Signals
          </h2>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="border border-border bg-background p-5">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <p className="font-grotesk text-lg font-semibold text-foreground">Top Roadmap Tracks</p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm border-border bg-secondary font-ibm-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground hover:text-foreground"
                render={<Link href="/roadmaps" />}
              >
                All Roadmaps
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="space-y-3">
              {roadmapHighlights.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/roadmaps/${item.slug}`}
                  className="flex items-center justify-between border border-border bg-card/40 px-3 py-2.5"
                >
                  <div>
                    <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-primary">Track {index + 1}</p>
                    <p className="mt-1 text-sm text-foreground">{item.title}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </article>

          <article className="border border-border bg-background p-5">
            <p className="font-grotesk text-lg font-semibold text-foreground">Engagement Snapshot</p>
            <div className="mt-4 space-y-3">
              <div className="border border-border bg-card/40 p-3">
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Continue Learning</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-foreground">
                  <Gauge className="h-4 w-4 text-primary" />
                  57% complete in Python path
                </p>
              </div>
              <div className="border border-border bg-card/40 p-3">
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Daily Streak</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-foreground">
                  <Flame className="h-4 w-4 text-primary" />
                  8-day active streak
                </p>
              </div>
              <div className="border border-border bg-card/40 p-3">
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Achievements</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-foreground">
                  <Trophy className="h-4 w-4 text-primary" />
                  3 certificates unlocked
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
