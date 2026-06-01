import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";
import { LearningDetailView } from "@/components/learning/detail-view";
import { getDiscoverableItemBySlug, getDiscoverableItemsByType } from "@/lib/learning/catalog";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getDiscoverableItemsByType("project").map((item) => ({ slug: item.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const item = getDiscoverableItemBySlug(slug, "project");
  if (!item) notFound();

  return (
    <>
      <Navbar />
      <main>
        <LearningDetailView item={item} />
      </main>
      <Footer />
    </>
  );
}
