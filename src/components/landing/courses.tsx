import Link from "next/link";
import { ArrowRight, Clock3, ListChecks, Star, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { queryCourses } from "@/lib/learning/catalog";

const featuredCourses = queryCourses({ level: "", page: 1 }).items.slice(0, 4);

export function Courses() {
  return (
    <section id="courses" className="py-18">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
              [02] Beginner Courses
            </p>
            <h2 className="mt-3 font-grotesk text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Popular Starter Tracks With Clear Outcomes
            </h2>
          </div>
          <Button
            variant="outline"
            className="h-10 rounded-sm border-border bg-secondary px-4 font-ibm-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
            render={<Link href="/courses?level=beginner" />}
          >
            View All Beginner
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-9 grid gap-3 lg:grid-cols-2">
          {featuredCourses.map((item) => (
            <Link key={item.id} href={`/courses/${item.slug}`} className="group border border-border bg-card/60 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="max-w-[70%] font-grotesk text-xl font-semibold text-foreground group-hover:text-primary">
                  {item.title}
                </h3>
                <span className="border border-primary/40 bg-primary/10 px-2 py-0.5 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                  {item.difficulty}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 font-ibm-mono text-xs leading-6 text-muted-foreground">{item.summary}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground md:grid-cols-3">
                <div className="flex items-center gap-1.5 font-ibm-mono">
                  <Clock3 className="h-3.5 w-3.5 text-primary" />
                  {item.estimatedHours ? `${item.estimatedHours}h` : "Self-paced"}
                </div>
                <div className="flex items-center gap-1.5 font-ibm-mono">
                  <ListChecks className="h-3.5 w-3.5 text-primary" />
                  {item.lessonCount ?? Math.max(10, item.roadmapSteps.length * 3)} lessons
                </div>
                <div className="flex items-center gap-1.5 font-ibm-mono">
                  <Trophy className="h-3.5 w-3.5 text-primary" />
                  {item.hasCertificate ? "Certificate" : "No certificate"}
                </div>
                <div className="flex items-center gap-1.5 font-ibm-mono">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  {(item.studentCount ?? 1250).toLocaleString()} learners
                </div>
                <div className="flex items-center gap-1.5 font-ibm-mono">
                  <Star className="h-3.5 w-3.5 text-primary" />
                  {(item.rating ?? 4.6).toFixed(1)} rating
                </div>
                <div className="flex items-center gap-1.5 font-ibm-mono">
                  <ListChecks className="h-3.5 w-3.5 text-primary" />
                  {item.projectIdeas.length} projects
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  Recommended next:
                </p>
                <p className="mt-1 text-sm text-foreground">{item.roadmapSteps[1] ?? "Move to the next intermediate track"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
