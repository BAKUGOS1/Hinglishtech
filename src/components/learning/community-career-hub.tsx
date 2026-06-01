import Link from "next/link";
import { ArrowRight, Medal, MessagesSquare, Trophy, Users } from "lucide-react";

const discussions = [
  { course: "Python Developer Career Track", topic: "Help with list comprehensions", replies: 18 },
  { course: "JavaScript Foundations to Advanced", topic: "Async await debugging patterns", replies: 24 },
  { course: "React Engineer Track", topic: "State management for dashboards", replies: 15 },
];

const showcases = [
  { title: "Expense Tracker Automation", author: "Nisha", stack: "Python + CSV + Charts" },
  { title: "MERN Team Planner", author: "Aditya", stack: "MongoDB + Express + React + Node" },
  { title: "Frontend KPI Dashboard", author: "Arjun", stack: "React + TypeScript + Charts" },
];

const leaderboard = [
  { name: "Priya", points: 920, streak: 21 },
  { name: "Rahul", points: 860, streak: 19 },
  { name: "Ananya", points: 790, streak: 17 },
];

const contests = [
  "Week 1: Python string and loop challenge",
  "Week 2: API data cleaning challenge",
  "Week 3: Automation mini script sprint",
];

export function CommunityCareerHub() {
  return (
    <section className="mt-8 grid gap-3">
      <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2">
            <MessagesSquare className="h-4 w-4 text-primary" />
            <p className="font-grotesk text-lg font-semibold text-foreground">Course Discussions</p>
          </div>
          <p className="mt-1 font-ibm-mono text-xs text-muted-foreground">
            Course-specific doubt threads and peer code reviews.
          </p>
          <div className="mt-4 space-y-2">
            {discussions.map((entry) => (
              <div key={entry.topic} className="border border-border bg-background/80 p-3">
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-primary">{entry.course}</p>
                <p className="mt-1 text-sm text-foreground">{entry.topic}</p>
                <p className="mt-1 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {entry.replies} replies
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <p className="font-grotesk text-lg font-semibold text-foreground">Weekly Contests</p>
          </div>
          <ul className="mt-4 space-y-2 font-ibm-mono text-xs leading-6 text-muted-foreground">
            {contests.map((contest) => (
              <li key={contest}>• {contest}</li>
            ))}
          </ul>
          <div className="mt-4 border-t border-border pt-3">
            <p className="font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Next event
            </p>
            <p className="mt-1 text-sm text-foreground">Saturday coding contest + leaderboard updates</p>
          </div>
        </article>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
        <article className="border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <p className="font-grotesk text-lg font-semibold text-foreground">Student Project Showcase</p>
          </div>
          <div className="mt-4 grid gap-2">
            {showcases.map((project) => (
              <div key={project.title} className="border border-border bg-background/80 p-3">
                <p className="text-sm text-foreground">{project.title}</p>
                <p className="mt-1 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  by {project.author} • {project.stack}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2">
            <Medal className="h-4 w-4 text-primary" />
            <p className="font-grotesk text-lg font-semibold text-foreground">Active Learner Leaderboard</p>
          </div>
          <div className="mt-4 space-y-2">
            {leaderboard.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between border border-border bg-background/80 px-3 py-2">
                <p className="text-sm text-foreground">
                  {index + 1}. {entry.name}
                </p>
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {entry.points} pts • {entry.streak}d streak
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="border border-border bg-card/60 p-5">
        <p className="font-grotesk text-lg font-semibold text-foreground">Career Focus Resources</p>
        <p className="mt-2 font-ibm-mono text-xs text-muted-foreground">
          Python Developer roadmap, interview prep, resume templates, internship board, and portfolio project templates.
        </p>
        <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/roadmaps?track=Python" className="border border-border bg-background px-3 py-2 text-sm text-foreground">
            Python Developer Roadmap
          </Link>
          <Link href="/courses?search=resume" className="border border-border bg-background px-3 py-2 text-sm text-foreground">
            Resume Templates for Beginners
          </Link>
          <Link href="/courses?search=interview" className="border border-border bg-background px-3 py-2 text-sm text-foreground">
            Interview Question Bank
          </Link>
          <Link href="/projects?search=internship" className="border border-border bg-background px-3 py-2 text-sm text-foreground">
            Internship and Job Board
          </Link>
          <Link href="/projects?search=portfolio" className="border border-border bg-background px-3 py-2 text-sm text-foreground">
            Portfolio Project Templates
          </Link>
          <Link href="/courses?search=automation" className="inline-flex items-center justify-between border border-border bg-background px-3 py-2 text-sm text-foreground">
            Automation Engineer Track
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </article>
    </section>
  );
}
