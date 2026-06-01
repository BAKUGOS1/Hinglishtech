import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="learning-retention" className="border-y border-border bg-card/30 py-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="border border-border bg-background p-6">
            <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
              [05] Learning and Retention
            </p>
            <h2 className="mt-3 font-grotesk text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Learn Daily, Revise Fast, Build Consistently
            </h2>
            <ul className="mt-4 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
              <li>• Interactive code playground inside lessons</li>
              <li>• Daily Python challenge on homepage</li>
              <li>• 30-Day Python roadmap with streak tracking</li>
              <li>• Quick revision cards for forgotten topics</li>
              <li>• AI-powered doubt assistant context panel</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-10 rounded-sm bg-primary px-4 font-grotesk text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground hover:bg-primary/90"
                render={<Link href="/courses?search=python&level=beginner" />}
              >
                Start Python Path
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-10 rounded-sm border-border bg-secondary px-4 font-ibm-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
                render={<Link href="/projects?search=challenge" />}
              >
                Daily Challenge
              </Button>
            </div>
          </article>

          <article className="border border-border bg-background p-6">
            <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
              [06] Career Focus
            </p>
            <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
              <li>• Python Developer roadmap and portfolio templates</li>
              <li>• Automation Engineer practical track</li>
              <li>• Data Analyst / Data Science bridge path</li>
              <li>• Interview question bank and resume templates</li>
              <li>• Internship and junior-role preparation board</li>
              <li>• Course discussion threads, peer reviews, weekly contests</li>
            </ul>
            <div className="mt-6 border border-border bg-card/60 p-3">
              <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Career tracks</p>
              <p className="mt-1 text-sm text-foreground">
                Python Developer • Automation Engineer • Data Analyst
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
