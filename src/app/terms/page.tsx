import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/landing/footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28 md:px-10">
        <h1 className="font-grotesk text-4xl font-bold text-foreground">Terms</h1>
        <p className="mt-4 font-ibm-mono text-sm leading-7 text-muted-foreground">
          By using HinglishTech, learners agree to use the platform for educational purposes and to respect shared community and project spaces.
        </p>
      </main>
      <Footer />
    </>
  );
}
