import type { Metadata } from "next";
import { PythonLanding } from "@/components/learning/python-landing";

export const metadata: Metadata = {
  title: "Automation with Python | HinglishTech",
  description: "Learn automation with Python using scripts, APIs, and workflow-focused projects for beginners.",
};

export default function AutomationWithPythonPage() {
  return (
    <PythonLanding
      kicker="[Python] Automation"
      title="Automation with Python"
      description="Build real automation scripts and service workflows with guided exercises, assignments, and progress checkpoints."
      query="python automation"
    />
  );
}
