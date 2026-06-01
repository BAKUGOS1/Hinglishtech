import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  "Learning Tracks": [
    { label: "Python for Beginners", href: "/python-for-beginners" },
    { label: "Python in Hinglish", href: "/python-in-hinglish" },
    { label: "Python Projects", href: "/python-projects" },
    { label: "Data Science with Python", href: "/data-science-with-python" },
    { label: "Automation with Python", href: "/automation-with-python" },
  ],
  Resources: [
    { label: "Python Cheat Sheet", href: "/courses?search=cheat%20sheet" },
    { label: "Interview Questions", href: "/courses?search=interview" },
    { label: "VS Code Setup Guide", href: "/courses?search=vs%20code" },
    { label: "Python Roadmap", href: "/roadmaps?track=Python" },
  ],
  Community: [
    { label: "Discord Community", href: "/projects?search=community" },
    { label: "Telegram Updates", href: "/projects?search=telegram" },
    { label: "Project Showcase", href: "/projects?search=showcase" },
    { label: "Weekly Contests", href: "/projects?search=contest" },
  ],
  Support: [
    { label: "Blog & Tutorials", href: "/courses?search=tutorial" },
    { label: "Contact", href: "/courses?search=support" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-primary" />
              <span className="font-grotesk text-[13px] font-bold uppercase tracking-[0.18em] text-foreground">
                HinglishTech
              </span>
            </Link>
            <p className="mt-3 font-ibm-mono text-xs leading-6 text-muted-foreground">
              Structured learning platform for beginner-to-career journeys with projects, roadmaps, and progress context.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {heading}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-foreground/90 transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            © {new Date().getFullYear()} HinglishTech
          </p>
          <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            Built for consistent beginner growth and retention
          </p>
        </div>
      </div>
    </footer>
  );
}
