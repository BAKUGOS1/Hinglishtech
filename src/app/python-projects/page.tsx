import type { Metadata } from "next";
import { PythonLanding } from "@/components/learning/python-landing";

export const metadata: Metadata = {
  title: "Python Projects | HinglishTech",
  description: "Project-focused Python learning with guided assignments, solution context, and portfolio outcomes.",
};

export default function PythonProjectsPage() {
  return (
    <PythonLanding
      kicker="[Python] Projects"
      title="Python Projects"
      description="Build practical Python projects with assignment walkthroughs, progress tracking, and portfolio guidance."
      query="python projects"
    />
  );
}
