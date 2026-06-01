import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

const pathNodes = [
  { label: "Absolute Beginner", progress: 18 },
  { label: "Python Basics", progress: 35 },
  { label: "Projects", progress: 57 },
  { label: "Automation", progress: 76 },
  { label: "Data Science", progress: 100 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-18 pt-28 md:px-10 md:pt-34">
      <div className="mx-auto max-w-[1280px]">
        <div className="inline-flex items-center gap-2 border border-primary/80 bg-secondary px-3 py-1">
          <span className="h-2 w-2 bg-primary" />
          <span className="font-ibm-mono text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
            New Catalog Sync Live
          </span>
        </div>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="font-grotesk text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Build Job-Ready Skills
              <br />
              <span className="text-primary">With Structured Learning Paths</span>
            </h1>
            <p className="mt-6 max-w-2xl font-ibm-mono text-sm leading-7 tracking-[0.03em] text-muted-foreground md:text-base">
              Courses, roadmaps, and project tracks mapped from curated repositories with clear direction,
              hands-on practice, and progress context.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-11 rounded-sm bg-primary px-5 font-grotesk text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-primary/90"
                render={<Link href="/courses" />}
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 rounded-sm border-border bg-secondary px-5 font-ibm-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                render={<Link href="/roadmaps" />}
              >
                View Roadmaps
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Python", "React", "JavaScript", "Java", "Frontend", "Backend", "MERN", "Fullstack"].map((tag) => (
                <Link
                  key={tag}
                  href={`/courses?search=${encodeURIComponent(tag)}`}
                  className="border border-border bg-secondary px-2.5 py-1 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <article className="border border-border bg-card/90 p-5 md:p-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <p className="font-ibm-mono text-[10px] uppercase tracking-[0.16em] text-primary">Learning Path Graph</p>
              <span className="inline-flex items-center gap-1.5 font-ibm-mono text-[10px] text-muted-foreground">
                <Route className="h-3 w-3" />
                Python Beginner Track
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {pathNodes.map((step, index) => (
                <div key={step.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-foreground">
                      {index + 1}. {step.label}
                    </p>
                    <span className="font-ibm-mono text-[10px] text-muted-foreground">{step.progress}%</span>
                  </div>
                  <div className="h-2 border border-border bg-background">
                    <div className="h-full bg-primary" style={{ width: `${step.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
              <div>
                <p className="font-grotesk text-lg font-semibold text-foreground">520+</p>
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">Courses</p>
              </div>
              <div>
                <p className="font-grotesk text-lg font-semibold text-foreground">240+</p>
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">Roadmaps</p>
              </div>
              <div>
                <p className="font-grotesk text-lg font-semibold text-foreground">1.2k+</p>
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">Projects</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
