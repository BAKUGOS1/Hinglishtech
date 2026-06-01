import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    quote:
      "The step-by-step roadmap made switching from confusion to confidence very practical. The progress graph and assignments kept me consistent.",
  },
  {
    name: "Rahul Verma",
    role: "Python Freelancer",
    quote:
      "The Python beginner path helped me move from basics to automation projects without getting lost in random tutorials.",
  },
  {
    name: "Ananya Gupta",
    role: "CS Student",
    quote:
      "Quizzes, revision cards, and project tasks made learning active. I finally retained what I studied instead of forgetting it.",
  },
];

export function Testimonials() {
  return (
    <section id="community" className="py-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            [04] Success Stories
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Student Wins and Learning Outcomes
          </h2>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {testimonials.map((t) => (
            <article key={t.name} className="border border-border bg-card/60 p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`${t.name}-${index}`} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mt-3 font-ibm-mono text-xs leading-6 text-muted-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
