"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Projects", href: "/projects" },
  { label: "Python Start", href: "/courses?search=python&level=beginner" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-[62px] max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80"
        >
          <span className="h-2.5 w-2.5 bg-primary transition-transform group-hover:scale-110" />
          <span className="font-grotesk text-[13px] font-bold tracking-[0.2em] uppercase">
            HinglishTech
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-ibm-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            size="sm"
            className="rounded-sm bg-primary px-4 font-grotesk text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-primary/90"
            render={<Link href="/courses" />}
          >
            Start Learning
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground md:hidden cursor-pointer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-[1280px] space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-sm px-3 py-2 font-ibm-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button
                size="sm"
                className="h-9 w-full rounded-sm bg-primary font-grotesk text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-primary/90"
                render={<Link href="/courses" />}
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
