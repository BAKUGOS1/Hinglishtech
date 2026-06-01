import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";

type PythonLandingProps = {
  kicker: string;
  title: string;
  description: string;
  query: string;
};

export function PythonLanding({ kicker, title, description, query }: PythonLandingProps) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-6 pb-20 pt-28 md:px-10">
        <header>
          <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">{kicker}</p>
          <h1 className="mt-3 font-grotesk text-4xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-3xl font-ibm-mono text-sm leading-7 text-muted-foreground">{description}</p>
        </header>

        <section className="mt-8 grid gap-3 md:grid-cols-2">
          <article className="border border-border bg-card/60 p-5">
            <h2 className="font-grotesk text-xl font-semibold text-foreground">Beginner Roadmap</h2>
            <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
              <li>• Absolute Beginner</li>
              <li>• Python Basics</li>
              <li>• Projects</li>
              <li>• Automation</li>
              <li>• Data Science</li>
            </ul>
          </article>
          <article className="border border-border bg-card/60 p-5">
            <h2 className="font-grotesk text-xl font-semibold text-foreground">Included in This Track</h2>
            <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
              <li>• Practice assignments and solutions</li>
              <li>• Quizzes and progress checkpoints</li>
              <li>• Notes and cheatsheets</li>
              <li>• Free preview lessons and certificate targets</li>
            </ul>
          </article>
        </section>

        <section className="mt-8 border border-border bg-card/60 p-5">
          <h2 className="font-grotesk text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            <article className="border border-border bg-background/70 p-3">
              <p className="font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-primary">Is this beginner friendly?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Yes. This page is designed for complete beginners and includes guided progression.
              </p>
            </article>
            <article className="border border-border bg-background/70 p-3">
              <p className="font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-primary">Do I get projects and practice?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Yes. You get practical assignments, projects, and revision resources.
              </p>
            </article>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/courses?search=${encodeURIComponent(query)}&level=beginner`}
            className="inline-flex items-center gap-2 border border-primary/50 bg-primary/10 px-4 py-2 font-ibm-mono text-[11px] uppercase tracking-[0.12em] text-primary"
          >
            Explore related courses
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/roadmaps?track=Python"
            className="inline-flex items-center gap-2 border border-border bg-secondary px-4 py-2 font-ibm-mono text-[11px] uppercase tracking-[0.12em] text-foreground"
          >
            View python roadmaps
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
