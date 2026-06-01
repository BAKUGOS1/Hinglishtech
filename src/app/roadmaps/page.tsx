import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";
import { LearningItemCard } from "@/components/learning/item-card";
import { Pagination, QueryChips } from "@/components/learning/query-bar";
import { getTopTags, queryRoadmaps } from "@/lib/learning/catalog";
import { firstQueryValue, parsePage, toQueryMap, type SearchParams } from "@/lib/learning/query";

type PageProps = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

const LEVELS = ["beginner", "intermediate", "advanced", "mixed"];

export default async function RoadmapsPage({ searchParams }: PageProps) {
  const params = await Promise.resolve(searchParams ?? {});
  const track = firstQueryValue(params.track);
  const level = firstQueryValue(params.level);
  const page = parsePage(params.page);
  const currentQuery = toQueryMap(params);
  const result = queryRoadmaps({
    track,
    level: (level || "") as "" | "beginner" | "intermediate" | "advanced" | "mixed",
    page,
  });
  const tracks = getTopTags("roadmap", 16);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Roadmaps</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">Structured Learning Paths</h1>
          <p className="mt-3 text-muted-foreground">
            Follow staged roadmaps built from top-tier GitHub learning repositories with clear direction and outcomes.
          </p>
        </header>

        <section className="mt-8 rounded-lg border border-border/60 bg-card/40 p-4 space-y-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Track</p>
            <QueryChips
              pathname="/roadmaps"
              current={currentQuery}
              queryKey="track"
              values={tracks}
              activeValue={track}
            />
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Level</p>
            <QueryChips
              pathname="/roadmaps"
              current={currentQuery}
              queryKey="level"
              values={LEVELS}
              activeValue={level}
            />
          </div>
        </section>

        <p className="mt-6 text-sm text-muted-foreground">
          Showing {result.items.length} of {result.totalItems} roadmaps.
        </p>

        <section className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {result.items.map((item) => (
            <LearningItemCard key={item.id} item={item} />
          ))}
        </section>

        <Pagination
          pathname="/roadmaps"
          current={currentQuery}
          currentPage={result.currentPage}
          totalPages={result.totalPages}
        />
      </main>
      <Footer />
    </>
  );
}
