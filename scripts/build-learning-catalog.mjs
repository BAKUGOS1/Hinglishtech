import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  BAKUGOS1_SOURCES,
  EXTERNAL_SOURCES,
  buildCaseStudyItem,
  buildSourceManifest,
  dedupeItems,
  fallbackTypeForSource,
  fetchReadme,
  fetchRepo,
  fetchRepoFile,
  normalizeItem,
  parseCSVProjects,
  parseLinuxCommands,
  parsePythonProjects,
  parseRoadmapReadme,
  parseSectionLinks,
  qualityGate,
  sanitizeTags,
} from "./learning-catalog-utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, "../src/content/learning-catalog.json");

function splitSource(ownerRepo) {
  const [owner, repo] = ownerRepo.split("/");
  return { owner, repo };
}

function createCoreCourseFromRepo(repoData, sourceRepo) {
  const baseTitle =
    repoData.name === "Hinglishtech" ? "HinglishTech Core Curriculum" : `${repoData.name} Learning Track`;
  const description = repoData.description || `${repoData.name} practical engineering learning track.`;

  return [
    {
      type: "course",
      title: baseTitle,
      summary: description,
      difficulty: "mixed",
      tags: sanitizeTags([repoData.language || "Engineering", "GitHub Source", "Applied Learning"]),
      sourceRepo,
      sourceUrl: repoData.html_url,
      estimatedHours: 24,
      roadmapSteps: ["Read architecture", "Replicate core workflow", "Build extension feature"],
      projectIdeas: [`Create a mini project inspired by ${repoData.name}`],
      prerequisites: ["Programming basics"],
      outcomes: [`Understand and extend ${repoData.name}`],
    },
  ];
}

function buildCoreLearningTracks() {
  return [
    {
      type: "course",
      title: "Python Developer Career Track",
      summary:
        "A practical Python-first path focused on syntax, automation, APIs, data handling, and portfolio projects with production habits.",
      difficulty: "beginner",
      tags: sanitizeTags(["Python", "Backend", "Automation", "Career Track"]),
      sourceRepo: "BAKUGOS1/pythonprojects",
      sourceUrl: "https://github.com/BAKUGOS1/pythonprojects",
      estimatedHours: 110,
      learningPath: "Absolute Beginner → Python Basics → Projects → Automation → Data Science",
      lessonCount: 42,
      hasCertificate: true,
      studentCount: 18240,
      rating: 4.8,
      practiceCount: 36,
      roadmapSteps: [
        "Python fundamentals and clean code style",
        "Core data structures and file handling",
        "Automation scripts and CLI workflows",
        "REST API consumption and integration",
        "Backend mini services with persistence",
        "Portfolio capstone and deployment",
      ],
      projectIdeas: [
        "Expense tracker with CSV and charts",
        "Automation bot for reporting workflow",
        "Flask or FastAPI backend microservice",
      ],
      prerequisites: ["Basic computer literacy"],
      outcomes: ["Build Python apps with deployable portfolio projects"],
    },
    {
      type: "course",
      title: "JavaScript Foundations to Advanced",
      summary:
        "A structured JavaScript course from language fundamentals to modern app architecture, async systems, and debugging at scale.",
      difficulty: "beginner",
      tags: sanitizeTags(["JavaScript", "Web", "Frontend", "Programming Fundamentals"]),
      sourceRepo: "practical-tutorials/project-based-learning",
      sourceUrl: "https://github.com/practical-tutorials/project-based-learning",
      estimatedHours: 130,
      learningPath: "Absolute Beginner → JavaScript Basics → DOM Projects → Advanced App Patterns",
      lessonCount: 48,
      hasCertificate: true,
      studentCount: 24110,
      rating: 4.7,
      practiceCount: 39,
      roadmapSteps: [
        "Syntax, scope, functions, and objects",
        "DOM, events, and browser APIs",
        "Async JavaScript and API integration",
        "Module architecture and code organization",
        "Testing, debugging, and performance basics",
        "Capstone web application delivery",
      ],
      projectIdeas: [
        "Interactive dashboard with API data",
        "Vanilla JS productivity app",
        "Reusable component library starter",
      ],
      prerequisites: ["Basic HTML and CSS"],
      outcomes: ["Ship robust JavaScript applications with clean architecture"],
    },
    {
      type: "course",
      title: "React Engineer Track",
      summary:
        "A complete React pathway covering component systems, state management, routing, performance, and production patterns.",
      difficulty: "intermediate",
      tags: sanitizeTags(["React", "Frontend", "Next.js", "UI Engineering"]),
      sourceRepo: "nilbuild/developer-roadmap",
      sourceUrl: "https://github.com/nilbuild/developer-roadmap",
      estimatedHours: 120,
      learningPath: "JavaScript Core → React Fundamentals → State Systems → Next.js Production",
      lessonCount: 40,
      hasCertificate: true,
      studentCount: 19730,
      rating: 4.8,
      practiceCount: 33,
      roadmapSteps: [
        "React core and component composition",
        "State management and data flows",
        "Routing, forms, and accessibility",
        "Server rendering and Next.js patterns",
        "Performance profiling and optimization",
        "Design systems and reusable UI architecture",
      ],
      projectIdeas: [
        "Production-grade ecommerce frontend",
        "Admin analytics dashboard",
        "Design-system driven component suite",
      ],
      prerequisites: ["JavaScript fundamentals", "Basic Git workflow"],
      outcomes: ["Build scalable React products with production-ready structure"],
    },
    {
      type: "course",
      title: "Java Software Engineering Track",
      summary:
        "A Java path for object-oriented design, backend services, system-level thinking, and interview-ready engineering practice.",
      difficulty: "intermediate",
      tags: sanitizeTags(["Java", "Backend", "OOP", "System Design"]),
      sourceRepo: "codecrafters-io/build-your-own-x",
      sourceUrl: "https://github.com/codecrafters-io/build-your-own-x",
      estimatedHours: 140,
      learningPath: "Java Core → OOP Mastery → Backend APIs → Performance and System Design",
      lessonCount: 45,
      hasCertificate: true,
      studentCount: 11890,
      rating: 4.6,
      practiceCount: 31,
      roadmapSteps: [
        "Core Java, OOP, and collections",
        "Concurrency, IO, and JVM fundamentals",
        "API design and service architecture",
        "Data access patterns and SQL integration",
        "Testing strategies and maintainability",
        "System design capstone implementation",
      ],
      projectIdeas: [
        "Concurrent task scheduler",
        "RESTful service with persistence",
        "Mini distributed event processor",
      ],
      prerequisites: ["Programming basics"],
      outcomes: ["Engineer Java services with maintainable architecture"],
    },
    {
      type: "roadmap",
      title: "Frontend Developer Roadmap",
      summary:
        "Step-by-step frontend path from web foundations to modern framework engineering, accessibility, testing, and deployment.",
      difficulty: "beginner",
      tags: sanitizeTags(["Frontend", "Roadmap", "HTML", "CSS", "JavaScript"]),
      sourceRepo: "nilbuild/developer-roadmap",
      sourceUrl: "https://github.com/nilbuild/developer-roadmap",
      estimatedHours: 170,
      learningPath: "Web Basics → UI Systems → JavaScript Apps → Framework Mastery → Deployment",
      lessonCount: 52,
      hasCertificate: true,
      studentCount: 28600,
      rating: 4.8,
      practiceCount: 44,
      roadmapSteps: [
        "HTML semantics and accessible structure",
        "CSS systems, responsive layouts, and design tokens",
        "JavaScript fundamentals and browser APIs",
        "React and modern state management",
        "Testing, quality, and performance optimization",
        "Deployment workflows and production monitoring",
      ],
      projectIdeas: ["Portfolio site", "Dashboard app", "Design-system challenge"],
      prerequisites: ["Basic computer usage"],
      outcomes: ["Operate as a job-ready frontend developer"],
    },
    {
      type: "roadmap",
      title: "Backend Developer Roadmap",
      summary:
        "A backend engineering roadmap covering APIs, databases, authentication, scaling, observability, and deployment security.",
      difficulty: "beginner",
      tags: sanitizeTags(["Backend", "Roadmap", "APIs", "Databases", "Security"]),
      sourceRepo: "nilbuild/developer-roadmap",
      sourceUrl: "https://github.com/nilbuild/developer-roadmap",
      estimatedHours: 190,
      learningPath: "Programming Basics → APIs → Data Systems → Security → Scalable Operations",
      lessonCount: 54,
      hasCertificate: true,
      studentCount: 22940,
      rating: 4.8,
      practiceCount: 41,
      roadmapSteps: [
        "Programming fundamentals and service basics",
        "HTTP, REST design, and request lifecycle",
        "SQL and NoSQL data modeling",
        "Authentication and authorization strategies",
        "Caching, queues, and horizontal scaling",
        "Observability, reliability, and secure deployment",
      ],
      projectIdeas: ["Auth API", "Background jobs platform", "Scalable URL shortener"],
      prerequisites: ["Basic programming knowledge"],
      outcomes: ["Build and maintain production backend systems"],
    },
    {
      type: "roadmap",
      title: "MERN Stack Roadmap",
      summary:
        "A full MERN progression that combines frontend and backend delivery with shared TypeScript contracts and deployment.",
      difficulty: "intermediate",
      tags: sanitizeTags(["MERN", "MongoDB", "Express", "React", "Node.js", "Roadmap"]),
      sourceRepo: "practical-tutorials/project-based-learning",
      sourceUrl: "https://github.com/practical-tutorials/project-based-learning",
      estimatedHours: 210,
      learningPath: "Node + Express → MongoDB → React → Auth + Security → Cloud Deployment",
      lessonCount: 58,
      hasCertificate: true,
      studentCount: 17320,
      rating: 4.7,
      practiceCount: 47,
      roadmapSteps: [
        "Node.js and Express service foundation",
        "MongoDB schema design and indexing",
        "React frontend architecture and routing",
        "Shared API contracts and validation",
        "Authentication, role access, and security",
        "Deployment pipeline and production hardening",
      ],
      projectIdeas: [
        "MERN SaaS starter",
        "Realtime team collaboration board",
        "Role-based content platform",
      ],
      prerequisites: ["JavaScript fundamentals", "Basic React knowledge"],
      outcomes: ["Deliver end-to-end MERN products with confidence"],
    },
    {
      type: "roadmap",
      title: "Full Stack Developer Roadmap",
      summary:
        "A comprehensive full-stack plan that aligns frontend, backend, data, DevOps, and shipping discipline in one path.",
      difficulty: "mixed",
      tags: sanitizeTags(["Full Stack", "Roadmap", "Architecture", "Deployment", "Career Growth"]),
      sourceRepo: "nilbuild/developer-roadmap",
      sourceUrl: "https://github.com/nilbuild/developer-roadmap",
      estimatedHours: 240,
      learningPath: "Foundations → Frontend → Backend → Data → DevOps → Capstone",
      lessonCount: 64,
      hasCertificate: true,
      studentCount: 30380,
      rating: 4.9,
      practiceCount: 52,
      roadmapSteps: [
        "Web foundations and programming fluency",
        "Frontend systems and UX implementation",
        "Backend architecture and service contracts",
        "Database modeling and performance",
        "CI/CD, cloud deployment, and observability",
        "System design and portfolio-grade capstone",
      ],
      projectIdeas: [
        "Full-stack ecommerce platform",
        "Internal tools dashboard with auth",
        "Production blogging platform with analytics",
      ],
      prerequisites: ["Programming basics", "Git fundamentals"],
      outcomes: ["Operate independently across the full product stack"],
    },
    {
      type: "project",
      title: "Frontend Portfolio Project Track",
      summary:
        "A project sequence designed to demonstrate practical UI engineering, state management, testing, and performance improvements.",
      difficulty: "beginner",
      tags: sanitizeTags(["Frontend", "Portfolio", "React", "Projects"]),
      sourceRepo: "practical-tutorials/project-based-learning",
      sourceUrl: "https://github.com/practical-tutorials/project-based-learning",
      estimatedHours: 65,
      learningPath: "UI Basics → Interactive Apps → Accessibility → Testing + Performance",
      lessonCount: 24,
      hasCertificate: true,
      studentCount: 14120,
      rating: 4.7,
      practiceCount: 18,
      roadmapSteps: [
        "Landing page and design token setup",
        "Interactive dashboard with API integration",
        "Accessibility and keyboard navigation pass",
        "Test coverage and performance optimization",
      ],
      projectIdeas: ["Analytics UI", "Task planner", "Team portal"],
      prerequisites: ["HTML, CSS, and JavaScript basics"],
      outcomes: ["Publish a frontend portfolio with measurable quality"],
    },
    {
      type: "project",
      title: "Backend API Project Track",
      summary:
        "Hands-on API engineering track with authentication, data modeling, background jobs, and production observability.",
      difficulty: "intermediate",
      tags: sanitizeTags(["Backend", "API", "Node.js", "Projects"]),
      sourceRepo: "aquadzn/learn-x-by-doing-y",
      sourceUrl: "https://github.com/aquadzn/learn-x-by-doing-y",
      estimatedHours: 75,
      learningPath: "API Fundamentals → Auth → Data Layer → Async Jobs → Monitoring",
      lessonCount: 27,
      hasCertificate: true,
      studentCount: 10290,
      rating: 4.6,
      practiceCount: 21,
      roadmapSteps: [
        "Service bootstrap and clean architecture",
        "Auth, rate limits, and validation",
        "Data modeling and query optimization",
        "Caching and async processing",
        "Monitoring, alerting, and release workflow",
      ],
      projectIdeas: ["Auth service", "Document workflow API", "Event-driven notification backend"],
      prerequisites: ["JavaScript or Python basics"],
      outcomes: ["Ship secure and observable backend APIs"],
    },
    {
      type: "project",
      title: "MERN Full Stack Capstone Projects",
      summary:
        "A capstone set for MERN learners focused on architecture decisions, feature completeness, and deployable user experience.",
      difficulty: "advanced",
      tags: sanitizeTags(["MERN", "Full Stack", "Capstone", "Projects"]),
      sourceRepo: "practical-tutorials/project-based-learning",
      sourceUrl: "https://github.com/practical-tutorials/project-based-learning",
      estimatedHours: 95,
      learningPath: "Architecture Setup → Feature Build → Quality Hardening → Production Release",
      lessonCount: 31,
      hasCertificate: true,
      studentCount: 8910,
      rating: 4.7,
      practiceCount: 24,
      roadmapSteps: [
        "Scaffold monorepo and shared contracts",
        "Feature development across frontend and backend",
        "Security and reliability hardening",
        "Analytics, logs, and production release",
      ],
      projectIdeas: ["Learning platform clone", "B2B operations panel", "Realtime event booking app"],
      prerequisites: ["React and Node.js fundamentals"],
      outcomes: ["Deliver complex full-stack products with confidence"],
    },
  ];
}

async function extractItemsForSource(ownerRepo, token) {
  const sourceRepo = ownerRepo;
  const fallbackType = fallbackTypeForSource(ownerRepo);
  const repo = await fetchRepo(ownerRepo, token);
  const readme = await fetchReadme(ownerRepo, token);
  const items = [];

  if (ownerRepo === "BAKUGOS1/pythonprojects") {
    items.push(...parsePythonProjects(readme, sourceRepo, repo.html_url));
  } else if (ownerRepo === "BAKUGOS1/linuxcommands") {
    items.push(...parseLinuxCommands(readme, sourceRepo, repo.html_url));
  } else if (ownerRepo === "nilbuild/developer-roadmap") {
    items.push(...parseRoadmapReadme(readme, sourceRepo));
  } else if (ownerRepo === "aquadzn/learn-x-by-doing-y") {
    const csv = await fetchRepoFile(ownerRepo, "projects.csv", token).catch(() => "");
    items.push(...parseCSVProjects(csv, sourceRepo, repo.html_url));
    items.push(...parseSectionLinks(readme, sourceRepo, "project"));
  } else if (ownerRepo === "practical-tutorials/project-based-learning") {
    items.push(...parseSectionLinks(readme, sourceRepo, "project"));
  } else if (ownerRepo === "codecrafters-io/build-your-own-x") {
    items.push(...parseSectionLinks(readme, sourceRepo, "project"));
  } else if (ownerRepo === "ossu/computer-science") {
    items.push(...parseSectionLinks(readme, sourceRepo, "roadmap"));
  } else if (ownerRepo === "jwasham/coding-interview-university") {
    items.push(...parseSectionLinks(readme, sourceRepo, "roadmap"));
  } else if (ownerRepo === "EbookFoundation/free-programming-books") {
    items.push(...parseSectionLinks(readme, sourceRepo, "resource"));
  } else if (ownerRepo === "prakhar1989/awesome-courses") {
    items.push(...parseSectionLinks(readme, sourceRepo, "course"));
  } else if (ownerRepo.startsWith("BAKUGOS1/")) {
    items.push(...createCoreCourseFromRepo(repo, sourceRepo));
    items.push(...buildCaseStudyItem(repo, readme));
    items.push(...parseSectionLinks(readme, sourceRepo, "resource"));
  } else {
    items.push(...parseSectionLinks(readme, sourceRepo, fallbackType));
  }

  if (items.length === 0) {
    items.push({
      type: fallbackType,
      title: `${repo.name} Learning Source`,
      summary: repo.description || `${repo.name} source repository for learning references.`,
      difficulty: "mixed",
      tags: sanitizeTags([repo.language || "Engineering", "GitHub Source"]),
      sourceRepo,
      sourceUrl: repo.html_url,
      estimatedHours: null,
      roadmapSteps: [],
      projectIdeas: [],
      prerequisites: [],
      outcomes: [`Use ${repo.name} as a guided learning reference`],
    });
  }

  return items;
}

function addShowcaseCollections(items) {
  const projects = items.filter((item) => item.type === "project").slice(0, 20);
  const roadmaps = items.filter((item) => item.type === "roadmap").slice(0, 16);
  const courses = items.filter((item) => item.type === "course").slice(0, 16);

  return [
    ...items,
    {
      type: "roadmap",
      title: "Full-Stack Engineer Global Roadmap",
      summary:
        "A cross-source path built from roadmaps, project tracks, and production case studies from selected GitHub repositories.",
      difficulty: "mixed",
      tags: ["Full Stack", "Roadmap", "Career Path"],
      sourceRepo: "Hinglishtech/catalog",
      sourceUrl: "https://github.com/BAKUGOS1/Hinglishtech",
      estimatedHours: 220,
      roadmapSteps: [
        "Programming foundations",
        "Web fundamentals",
        "Frontend framework mastery",
        "Backend and data",
        "DevOps and deployment",
        "System design and capstone",
      ],
      projectIdeas: projects.slice(0, 6).map((project) => project.title),
      prerequisites: ["Basic coding knowledge"],
      outcomes: ["Build a production-ready full-stack portfolio"],
    },
    {
      type: "course",
      title: "GitHub Project-Based Master Catalog",
      summary:
        "Structured, high-signal learning catalog synthesized from top-tier project-based GitHub resources.",
      difficulty: "mixed",
      tags: ["Projects", "Portfolio", "GitHub"],
      sourceRepo: "Hinglishtech/catalog",
      sourceUrl: "https://github.com/BAKUGOS1/Hinglishtech",
      estimatedHours: 180,
      roadmapSteps: roadmaps.slice(0, 6).map((roadmap) => roadmap.title),
      projectIdeas: projects.slice(0, 10).map((project) => project.title),
      prerequisites: ["Basic development workflow"],
      outcomes: ["Select and execute projects with clear progression"],
    },
    {
      type: "resource",
      title: "Top-Tier Learning Sources Index",
      summary: "Curated source index covering all selected course, roadmap, and project repositories.",
      difficulty: "mixed",
      tags: ["Reference", "Index", "Sources"],
      sourceRepo: "Hinglishtech/catalog",
      sourceUrl: "https://github.com/BAKUGOS1/Hinglishtech",
      estimatedHours: null,
      roadmapSteps: courses.slice(0, 8).map((course) => course.title),
      projectIdeas: [],
      prerequisites: [],
      outcomes: ["Navigate learning sources quickly by topic and level"],
    },
  ];
}

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
  const sources = [...BAKUGOS1_SOURCES, ...EXTERNAL_SOURCES];
  const rawItems = [...buildCoreLearningTracks()];
  const errors = [];

  for (const ownerRepo of sources) {
    const { owner, repo } = splitSource(ownerRepo);
    try {
      console.log(`Fetching ${owner}/${repo}`);
      const extracted = await extractItemsForSource(ownerRepo, token);
      rawItems.push(...extracted);
      console.log(`  -> extracted ${extracted.length} items`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push({ source: ownerRepo, message });
      rawItems.push({
        type: "resource",
        title: `${repo} Source Index`,
        summary:
          "Source repository is currently restricted or unavailable to this runtime token. Public catalog keeps the source mapped for future sync.",
        difficulty: "mixed",
        tags: sanitizeTags(["Source Index", "Restricted Access"]),
        sourceRepo: ownerRepo,
        sourceUrl: `https://github.com/${ownerRepo}`,
        estimatedHours: null,
        roadmapSteps: [],
        projectIdeas: [],
        prerequisites: [],
        outcomes: ["Track this source for future authorized sync"],
      });
      console.warn(`  -> failed ${ownerRepo}: ${message}`);
    }
  }

  const enriched = addShowcaseCollections(rawItems);
  const normalized = enriched
    .map((item, index) => normalizeItem(item, String(index + 1).padStart(5, "0")))
    .filter(qualityGate);
  const deduped = dedupeItems(normalized);

  const catalog = {
    generatedAt: new Date().toISOString(),
    sourceCount: sources.length,
    itemCount: deduped.length,
    sources: buildSourceManifest(),
    errors,
    items: deduped,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(catalog, null, 2));
  console.log(`Catalog generated at ${outputPath}`);
  console.log(`Total items: ${deduped.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
