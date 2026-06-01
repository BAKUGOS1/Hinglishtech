import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";
import { LearningItemCard } from "@/components/learning/item-card";
import { Pagination, QueryChips } from "@/components/learning/query-bar";
import { queryProjects } from "@/lib/learning/catalog";
import { firstQueryValue, parsePage, toQueryMap, type SearchParams } from "@/lib/learning/query";

type PageProps = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

const LEVELS = ["beginner", "intermediate", "advanced", "mixed"];
const PROJECT_TAGS = ["Python", "React", "JavaScript", "Java", "Frontend", "Backend", "MERN", "Full Stack"];

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await Promise.resolve(searchParams ?? {});
  const search = firstQueryValue(params.search);
  const lang = firstQueryValue(params.lang);
  const difficulty = firstQueryValue(params.difficulty);
  const page = parsePage(params.page);
  const currentQuery = toQueryMap(params);
  const result = queryProjects({
    search,
    lang,
    difficulty: (difficulty || "") as "" | "beginner" | "intermediate" | "advanced" | "mixed",
    page,
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-28 md:px-10">
        <header className="max-w-3xl">
          <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">[Projects]</p>
          <h1 className="mt-3 font-grotesk text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Build Real Projects With Guided Practice
          </h1>
          <p className="mt-3 font-ibm-mono text-sm leading-7 text-muted-foreground">
            Project-first tracks with quizzes, assignments, and concrete deliverables for portfolio growth.
          </p>
        </header>

        <section className="mt-8 border border-border bg-card/40 p-4">
          <form className="grid gap-3 sm:grid-cols-[1fr_auto]" method="GET" action="/projects">
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search projects or target skills..."
              className="h-10 border border-input bg-background px-3 text-sm text-foreground"
            />
            <button
              type="submit"
              className="h-10 border border-primary/50 bg-primary/10 px-4 font-ibm-mono text-[11px] uppercase tracking-[0.12em] text-primary"
            >
              Search
            </button>
            {lang ? <input type="hidden" name="lang" value={lang} /> : null}
            {difficulty ? <input type="hidden" name="difficulty" value={difficulty} /> : null}
          </form>

          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-2 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Track</p>
              <QueryChips
                pathname="/projects"
                current={currentQuery}
                queryKey="lang"
                values={PROJECT_TAGS}
                activeValue={lang}
              />
            </div>
            <div>
              <p className="mb-2 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Difficulty</p>
              <QueryChips
                pathname="/projects"
                current={currentQuery}
                queryKey="difficulty"
                values={LEVELS}
                activeValue={difficulty}
              />
            </div>
          </div>
        </section>

        <p className="mt-6 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Showing {result.items.length} of {result.totalItems} projects
        </p>

        <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.items.map((item) => (
            <LearningItemCard key={item.id} item={item} />
          ))}
        </section>

        <Pagination
          pathname="/projects"
          current={currentQuery}
          currentPage={result.currentPage}
          totalPages={result.totalPages}
        />
      </main>
      <Footer />
    </>
  );
}
