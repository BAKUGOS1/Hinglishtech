/**
 * Seed script — populates the database with initial data.
 * Run with: pnpm db:seed
 *
 * Requires DATABASE_URL and ADMIN_EMAIL in .env.local
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { createId } from "@paralleldrive/cuid2";
import * as schema from "./schema";

// ── Load env ───────────────────────────────────────────────────────────────────

// Next.js doesn't auto-load .env.local for scripts, so we do it manually.
// If dotenv isn't installed we fall back to process.env (CI, Vercel, etc.)
try {
  const dotenv = "dotenv";
  const { config } = (await import(dotenv)) as {
    config: (options: { path: string }) => void;
  };
  config({ path: ".env.local" });
} catch {
  // dotenv not installed — rely on existing env vars
}

const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@hinglishtech.com";

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set. Aborting seed.");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

// ── Seed data ──────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding database...\n");

  // 1. Admin user
  const adminId = createId();
  const [admin] = await db
    .insert(schema.users)
    .values({
      id: adminId,
      email: ADMIN_EMAIL,
      name: "HinglishTech Admin",
      emailVerified: true,
      role: "admin",
    })
    .onConflictDoNothing({ target: schema.users.email })
    .returning();

  const userId = admin?.id ?? adminId;
  console.log(`✅ Admin user: ${ADMIN_EMAIL} (id: ${userId})`);

  // 2. Courses
  const pythonCourseId = createId();
  const jsCourseId = createId();

  await db
    .insert(schema.courses)
    .values([
      {
        id: pythonCourseId,
        slug: "python-hinglish",
        title: "Python Seekho — Hinglish Mein",
        description:
          "Zero se hero tak Python programming, bilkul Hinglish mein explained. Variables, loops, functions, OOP, aur real projects.",
        level: "beginner",
        language: "hi",
        durationMinutes: 600,
        price: 49900, // ₹499
        published: true,
        featured: true,
      },
      {
        id: jsCourseId,
        slug: "javascript-hinglish",
        title: "JavaScript Masterclass — Hinglish Edition",
        description:
          "DOM manipulation se async/await tak, complete JavaScript course Hinglish mein. Modern ES6+ syntax aur real-world projects.",
        level: "intermediate",
        language: "hi",
        durationMinutes: 720,
        price: 59900, // ₹599
        published: true,
        featured: true,
      },
    ])
    .onConflictDoNothing({ target: schema.courses.slug });

  console.log("✅ Courses: python-hinglish, javascript-hinglish");

  // 3. Modules — 3 per course
  const pythonModules = [
    {
      id: createId(),
      courseId: pythonCourseId,
      slug: "intro-aur-setup",
      title: "Introduction aur Setup",
      description: "Python kya hai, install kaise kare, aur pehla program likhein.",
      orderIndex: 0,
      mdxPath: "content/courses/python-hinglish/01-intro-aur-setup.mdx",
      durationMinutes: 30,
    },
    {
      id: createId(),
      courseId: pythonCourseId,
      slug: "variables-aur-data-types",
      title: "Variables aur Data Types",
      description: "Strings, integers, floats, booleans — sab kuch samjhein.",
      orderIndex: 1,
      mdxPath: "content/courses/python-hinglish/02-variables-aur-data-types.mdx",
      durationMinutes: 45,
    },
    {
      id: createId(),
      courseId: pythonCourseId,
      slug: "loops-aur-conditions",
      title: "Loops aur Conditions",
      description: "if/else, for loop, while loop — control flow ka pura game.",
      orderIndex: 2,
      mdxPath: "content/courses/python-hinglish/03-loops-aur-conditions.mdx",
      durationMinutes: 50,
    },
  ];

  const jsModules = [
    {
      id: createId(),
      courseId: jsCourseId,
      slug: "js-basics-aur-setup",
      title: "JS Basics aur Setup",
      description: "Browser console, variables, aur JavaScript ka introduction.",
      orderIndex: 0,
      mdxPath: "content/courses/javascript-hinglish/01-js-basics-aur-setup.mdx",
      durationMinutes: 35,
    },
    {
      id: createId(),
      courseId: jsCourseId,
      slug: "dom-manipulation",
      title: "DOM Manipulation",
      description: "HTML elements ko JavaScript se kaise control karein.",
      orderIndex: 1,
      mdxPath: "content/courses/javascript-hinglish/02-dom-manipulation.mdx",
      durationMinutes: 55,
    },
    {
      id: createId(),
      courseId: jsCourseId,
      slug: "async-await-promises",
      title: "Async/Await aur Promises",
      description: "Asynchronous JavaScript samjhein — fetch, promises, aur async/await.",
      orderIndex: 2,
      mdxPath: "content/courses/javascript-hinglish/03-async-await-promises.mdx",
      durationMinutes: 60,
    },
  ];

  await db
    .insert(schema.modules)
    .values([...pythonModules, ...jsModules])
    .onConflictDoNothing();

  console.log("✅ Modules: 3 per course (6 total)");

  console.log("\n🎉 Seed complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
