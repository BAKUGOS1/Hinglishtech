import type { Metadata } from "next";
import { PythonLanding } from "@/components/learning/python-landing";

export const metadata: Metadata = {
  title: "Python for Beginners | HinglishTech",
  description: "Start Python from absolute beginner level with projects, quizzes, and guided progression.",
};

export default function PythonForBeginnersPage() {
  return (
    <PythonLanding
      kicker="[Python] Beginner"
      title="Python for Beginners"
      description="Start from zero and grow through guided beginner modules with clear outcomes and practical projects."
      query="python beginner"
    />
  );
}
