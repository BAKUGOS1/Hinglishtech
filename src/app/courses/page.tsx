import { Flame, GraduationCap, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";
import { LearningItemCard } from "@/components/learning/item-card";
import { Pagination, QueryChips } from "@/components/learning/query-bar";
import { queryCourses } from "@/lib/learning/catalog";
import { firstQueryValue, parsePage, toQueryMap, type SearchParams } from "@/lib/learning/query";

type PageProps = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

const COURSE_LEVELS = ["beginner", "intermediate", "advanced", "mixed"];
const COURSE_TAGS = ["Python", "React", "JavaScript", "Java", "Frontend", "Backend", "MERN", "Full Stack"];
const PYTHON_PATH = ["Absolute Beginner", "Python Basics", "Projects", "Automation", "Data Science"];

export default async function CoursesPage({ searchParams }: PageProps) {
  const params = await Promise.resolve(searchParams ?? {});
  const search = firstQueryValue(params.search);
  const level = firstQueryValue(params.level);
  const tag = firstQueryValue(params.tag);
  const page = parsePage(params.page);
  const currentQuery = toQueryMap(params);

  const result = queryCourses({
    search,
    level: (level || "") as "" | "beginner" | "intermediate" | "advanced" | "mixed",
    tag,
    page,
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-28 md:px-10">
        <header>
          <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            [Courses] Python Hinglish + Developer Tracks
          </p>
          <h1 className="mt-3 font-grotesk text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Beginner-Friendly Learning Platform
          </h1>
          <p className="mt-3 max-w-3xl font-ibm-mono text-sm leading-7 text-muted-foreground">
            Structured courses with lessons, practice, quizzes, roadmap context, progress tracking, and clear next steps.
          </p>
        </header>

        <section className="mt-7 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="border border-border bg-card/60 p-5">
            <p className="font-grotesk text-lg font-semibold text-foreground">Continue Learning</p>
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              <div className="border border-border bg-secondary/50 p-3">
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Current course</p>
                <p className="mt-1 text-sm text-foreground">Python Developer Career Track</p>
              </div>
              <div className="border border-border bg-secondary/50 p-3">
                <p className="inline-flex items-center gap-1.5 font-ibm-mono text-xs text-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Completion: 57%
                </p>
              </div>
              <div className="border border-border bg-secondary/50 p-3">
                <p className="inline-flex items-center gap-1.5 font-ibm-mono text-xs text-foreground">
                  <Flame className="h-4 w-4 text-primary" />
                  Streak: 8 days
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 border border-border bg-background">
              <div className="h-full bg-primary" style={{ width: "57%" }} />
            </div>
            <p className="mt-2 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Recommended next course: JavaScript Foundations to Advanced
            </p>
          </article>

          <article className="border border-border bg-card/60 p-5">
            <p className="font-grotesk text-lg font-semibold text-foreground">Python Beginner Learning Path</p>
            <div className="mt-4 space-y-3">
              {PYTHON_PATH.map((step, index) => {
                const progress = Math.round(((index + 1) / PYTHON_PATH.length) * 100);
                return (
                  <div key={step}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-foreground">
                        {index + 1}. {step}
                      </p>
                      <span className="font-ibm-mono text-[10px] text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="h-2 border border-border bg-background">
                      <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="mt-6 border border-border bg-card/40 p-4">
          <form className="grid gap-3 sm:grid-cols-[1fr_auto]" method="GET" action="/courses">
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search by topic, language, or skill..."
              className="h-10 border border-input bg-background px-3 text-sm text-foreground"
            />
            <button
              type="submit"
              className="h-10 border border-primary/50 bg-primary/10 px-4 font-ibm-mono text-[11px] uppercase tracking-[0.12em] text-primary"
            >
              Search
            </button>
            {level ? <input type="hidden" name="level" value={level} /> : null}
            {tag ? <input type="hidden" name="tag" value={tag} /> : null}
          </form>

          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-2 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Difficulty</p>
              <QueryChips
                pathname="/courses"
                current={currentQuery}
                queryKey="level"
                values={COURSE_LEVELS}
                activeValue={level}
              />
            </div>
            <div>
              <p className="mb-2 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Track</p>
              <QueryChips
                pathname="/courses"
                current={currentQuery}
                queryKey="tag"
                values={COURSE_TAGS}
                activeValue={tag}
              />
            </div>
          </div>
        </section>

        <p className="mt-5 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Showing {result.items.length} of {result.totalItems} courses
        </p>

        <section className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.items.map((item) => (
            <LearningItemCard key={item.id} item={item} />
          ))}
        </section>

        <Pagination
          pathname="/courses"
          current={currentQuery}
          currentPage={result.currentPage}
          totalPages={result.totalPages}
        />

        <section className="mt-8 grid gap-3 md:grid-cols-2">
          <article className="border border-border bg-card/50 p-5">
            <p className="font-grotesk text-xl font-semibold text-foreground">What You Get in Every Course</p>
            <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
              <li>• Coding exercises after each module</li>
              <li>• Quick quizzes + assignment solutions</li>
              <li>• Downloadable notes and cheatsheets</li>
              <li>• Certificate and practical project milestone tracking</li>
            </ul>
          </article>
          <article className="border border-border bg-card/50 p-5">
            <p className="font-grotesk text-xl font-semibold text-foreground">Trust and Conversion Layer</p>
            <ul className="mt-3 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
              <li>• Student testimonials and success story highlights</li>
              <li>• Instructor profile with expertise snapshot</li>
              <li>• Free preview lessons before enrollment</li>
              <li>• Clear outcomes: what you will build by completion</li>
            </ul>
          </article>
        </section>

        <section className="mt-8 border border-border bg-card/50 p-5">
          <p className="font-grotesk text-xl font-semibold text-foreground">Beginner FAQ</p>
          <div className="mt-4 space-y-3">
            <article className="border border-border bg-background/70 p-3">
              <p className="font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-primary">How should I start Python as a beginner?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Follow the path: Absolute Beginner → Python Basics → Projects → Automation → Data Science.
              </p>
            </article>
            <article className="border border-border bg-background/70 p-3">
              <p className="font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-primary">Do I get practice and revision material?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Yes. Courses include exercises, quizzes, notes, cheatsheets, and assignment walkthroughs.
              </p>
            </article>
            <article className="border border-border bg-background/70 p-3">
              <p className="font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-primary">Is this good for job-focused learners?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Every track is outcome-based and project-first, so learners build practical portfolio pieces.
              </p>
            </article>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 font-ibm-mono text-xs text-foreground">
            <GraduationCap className="h-4 w-4 text-primary" />
            Goal: move learners from beginner confusion to step-by-step confidence.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
