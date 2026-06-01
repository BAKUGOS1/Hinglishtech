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
  const rawItems = [];
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
