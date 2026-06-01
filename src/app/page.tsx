import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Courses } from "@/components/landing/courses";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { LearningHub } from "@/components/landing/learning-hub";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <LearningHub />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
