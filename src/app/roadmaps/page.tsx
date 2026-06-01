import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";
import { LearningItemCard } from "@/components/learning/item-card";
import { Pagination, QueryChips } from "@/components/learning/query-bar";
import { queryRoadmaps } from "@/lib/learning/catalog";
import { firstQueryValue, parsePage, toQueryMap, type SearchParams } from "@/lib/learning/query";

type PageProps = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

const LEVELS = ["beginner", "intermediate", "advanced", "mixed"];
const TRACKS = ["Frontend", "Backend", "MERN", "Full Stack", "DevOps", "JavaScript", "Python"];

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

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-28 md:px-10">
        <header className="max-w-3xl">
          <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">[Roadmaps]</p>
          <h1 className="mt-3 font-grotesk text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Frontend, Backend, MERN, and Fullstack Paths
          </h1>
          <p className="mt-3 font-ibm-mono text-sm leading-7 text-muted-foreground">
            Guided learning tracks with stage-wise direction, context, prerequisites, and outcome focus.
          </p>
        </header>

        <section className="mt-8 border border-border bg-card/40 p-4 space-y-4">
          <div>
            <p className="mb-2 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Track</p>
            <QueryChips
              pathname="/roadmaps"
              current={currentQuery}
              queryKey="track"
              values={TRACKS}
              activeValue={track}
            />
          </div>
          <div>
            <p className="mb-2 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Level</p>
            <QueryChips
              pathname="/roadmaps"
              current={currentQuery}
              queryKey="level"
              values={LEVELS}
              activeValue={level}
            />
          </div>
        </section>

        <p className="mt-6 font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Showing {result.items.length} of {result.totalItems} roadmaps
        </p>

        <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
