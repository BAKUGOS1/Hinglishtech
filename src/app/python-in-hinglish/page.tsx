import type { Metadata } from "next";
import { PythonLanding } from "@/components/learning/python-landing";

export const metadata: Metadata = {
  title: "Python in Hinglish | HinglishTech",
  description: "Beginner-friendly Python learning flow with Hinglish explanations, practice, and roadmap context.",
};

export default function PythonInHinglishPage() {
  return (
    <PythonLanding
      kicker="[Python] Hinglish"
      title="Python in Hinglish"
      description="Learn Python with beginner-friendly Hinglish style explanations while following a structured practice-first roadmap."
      query="python hinglish"
    />
  );
}
