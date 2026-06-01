import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28 md:px-10">
        <h1 className="font-grotesk text-4xl font-bold text-foreground">Privacy</h1>
        <p className="mt-4 font-ibm-mono text-sm leading-7 text-muted-foreground">
          HinglishTech stores only essential learning preferences and progress context required to improve the learner experience.
        </p>
      </main>
      <Footer />
    </>
  );
}
