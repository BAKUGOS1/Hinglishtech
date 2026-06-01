import type { Metadata } from "next";
import { PythonLanding } from "@/components/learning/python-landing";

export const metadata: Metadata = {
  title: "Data Science with Python | HinglishTech",
  description: "Transition from Python fundamentals to data science workflows with projects and structured learning stages.",
};

export default function DataScienceWithPythonPage() {
  return (
    <PythonLanding
      kicker="[Python] Data Science"
      title="Data Science with Python"
      description="Move from Python basics to data analysis and model-ready workflows through a beginner-to-advanced path."
      query="python data science"
    />
  );
}
