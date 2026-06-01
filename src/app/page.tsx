import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Courses } from "@/components/landing/courses";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { LearningHub } from "@/components/landing/learning-hub";
import { InteractiveRetentionLab } from "@/components/learning/interactive-retention-lab";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <LearningHub />
        <section className="mx-auto max-w-[1280px] px-6 pb-6 md:px-10">
          <InteractiveRetentionLab compact />
        </section>
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
