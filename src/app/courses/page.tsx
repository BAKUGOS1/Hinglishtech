import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";
import { LearningItemCard } from "@/components/learning/item-card";
import { Pagination, QueryChips } from "@/components/learning/query-bar";
import { getTopTags, queryCourses } from "@/lib/learning/catalog";
import { firstQueryValue, parsePage, toQueryMap, type SearchParams } from "@/lib/learning/query";

type PageProps = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

const COURSE_LEVELS = ["beginner", "intermediate", "advanced", "mixed"];

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
  const topTags = getTopTags("course", 20);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Courses</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">GitHub-Powered Learning Catalog</h1>
          <p className="mt-3 text-muted-foreground">
            Structured English learning tracks with roadmap context, project ideas, and direct source attribution.
          </p>
        </header>

        <section className="mt-8 rounded-lg border border-border/60 bg-card/40 p-4">
          <form className="grid gap-3 sm:grid-cols-[1fr_auto]" method="GET" action="/courses">
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search courses, tags, topics..."
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            />
            <button
              type="submit"
              className="h-10 rounded-md border border-primary/50 bg-primary/10 px-4 text-sm font-medium text-primary"
            >
              Search
            </button>
            {level ? <input type="hidden" name="level" value={level} /> : null}
            {tag ? <input type="hidden" name="tag" value={tag} /> : null}
          </form>

          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Level</p>
              <QueryChips
                pathname="/courses"
                current={currentQuery}
                queryKey="level"
                values={COURSE_LEVELS}
                activeValue={level}
              />
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Tag</p>
              <QueryChips
                pathname="/courses"
                current={currentQuery}
                queryKey="tag"
                values={topTags}
                activeValue={tag}
              />
            </div>
          </div>
        </section>

        <p className="mt-6 text-sm text-muted-foreground">
          Showing {result.items.length} of {result.totalItems} courses.
        </p>

        <section className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
      </main>
      <Footer />
    </>
  );
}
