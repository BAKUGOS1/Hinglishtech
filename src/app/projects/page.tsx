import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";
import { LearningItemCard } from "@/components/learning/item-card";
import { Pagination, QueryChips } from "@/components/learning/query-bar";
import { getTopTags, queryProjects } from "@/lib/learning/catalog";
import { firstQueryValue, parsePage, toQueryMap, type SearchParams } from "@/lib/learning/query";

type PageProps = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

const LEVELS = ["beginner", "intermediate", "advanced", "mixed"];

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
  const languages = getTopTags("project", 20);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Projects</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">Project-Based Learning Library</h1>
          <p className="mt-3 text-muted-foreground">
            Build-by-doing tracks aggregated from top GitHub learning repositories and real-world engineering sources.
          </p>
        </header>

        <section className="mt-8 rounded-lg border border-border/60 bg-card/40 p-4">
          <form className="grid gap-3 sm:grid-cols-[1fr_auto]" method="GET" action="/projects">
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search projects or skills..."
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            />
            <button
              type="submit"
              className="h-10 rounded-md border border-primary/50 bg-primary/10 px-4 text-sm font-medium text-primary"
            >
              Search
            </button>
            {lang ? <input type="hidden" name="lang" value={lang} /> : null}
            {difficulty ? <input type="hidden" name="difficulty" value={difficulty} /> : null}
          </form>

          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Language/Tag</p>
              <QueryChips
                pathname="/projects"
                current={currentQuery}
                queryKey="lang"
                values={languages}
                activeValue={lang}
              />
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Difficulty</p>
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

        <p className="mt-6 text-sm text-muted-foreground">
          Showing {result.items.length} of {result.totalItems} projects.
        </p>

        <section className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
