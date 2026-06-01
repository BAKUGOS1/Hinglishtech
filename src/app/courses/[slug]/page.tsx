import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";
import { LearningDetailView } from "@/components/learning/detail-view";
import { getItemBySlug, getItemsByType } from "@/lib/learning/catalog";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getItemsByType("course").map((item) => ({ slug: item.slug }));
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const item = getItemBySlug(slug, "course");
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
