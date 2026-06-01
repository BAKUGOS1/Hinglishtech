const GITHUB_API_BASE = "https://api.github.com";

export const BAKUGOS1_SOURCES = [
  "BAKUGOS1/Hinglishtech",
  "BAKUGOS1/pythonprojects",
  "BAKUGOS1/linuxcommands",
  "BAKUGOS1/Phere",
  "BAKUGOS1/phere-website",
  "BAKUGOS1/dsbored121",
  "BAKUGOS1/npmsearch",
  "BAKUGOS1/vedic",
  "BAKUGOS1/tech",
];

export const EXTERNAL_SOURCES = [
  "nilbuild/developer-roadmap",
  "practical-tutorials/project-based-learning",
  "codecrafters-io/build-your-own-x",
  "ossu/computer-science",
  "jwasham/coding-interview-university",
  "EbookFoundation/free-programming-books",
  "prakhar1989/awesome-courses",
  "aquadzn/learn-x-by-doing-y",
];

const ROADMAP_KEYWORDS = ["roadmap", "path", "curriculum", "study plan"];
const COURSE_KEYWORDS = ["course", "learning", "learn", "bootcamp", "fundamentals"];
const PROJECT_KEYWORDS = ["build", "project", "from scratch", "tutorial"];

export function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

export function canonicalUrl(input) {
  try {
    const parsed = new URL(input);
    parsed.hash = "";
    parsed.search = "";
    const cleaned = parsed.toString();
    return cleaned.endsWith("/") ? cleaned.slice(0, -1) : cleaned;
  } catch {
    return "";
  }
}

export function normalizeDifficulty(rawValue) {
  const value = String(rawValue ?? "").toLowerCase();
  if (value.includes("beginner") || value.includes("easy") || value.includes("intro")) {
    return "beginner";
  }
  if (value.includes("intermediate") || value.includes("mid")) {
    return "intermediate";
  }
  if (value.includes("advanced") || value.includes("expert")) {
    return "advanced";
  }
  return "mixed";
}

export function classifyItemType(title, summary = "") {
  const content = `${title} ${summary}`.toLowerCase();
  if (ROADMAP_KEYWORDS.some((token) => content.includes(token))) {
    return "roadmap";
  }
  if (PROJECT_KEYWORDS.some((token) => content.includes(token))) {
    return "project";
  }
  if (COURSE_KEYWORDS.some((token) => content.includes(token))) {
    return "course";
  }
  return "resource";
}

function inferTypeFromRepo(repoName) {
  if (repoName.endsWith("/developer-roadmap") || repoName.endsWith("/computer-science")) {
    return "roadmap";
  }
  if (repoName.endsWith("/build-your-own-x") || repoName.endsWith("/project-based-learning")) {
    return "project";
  }
  if (repoName.startsWith("BAKUGOS1/")) {
    return "case-study";
  }
  return "resource";
}

export function sanitizeTags(tags) {
  const sanitized = [...new Set(
    tags
      .map((tag) => String(tag).trim())
      .filter(Boolean)
      .map((tag) => tag.replace(/\s+/g, " "))
  )];

  return sanitized.sort((a, b) => a.localeCompare(b));
}

export function qualityGate(rawItem) {
  if (!rawItem.title || rawItem.title.length < 4) {
    return false;
  }
  if (!rawItem.sourceUrl || !canonicalUrl(rawItem.sourceUrl)) {
    return false;
  }
  if (!rawItem.summary || rawItem.summary.length < 16) {
    return false;
  }

  const hasContext =
    (rawItem.tags?.length ?? 0) > 0 ||
    (rawItem.roadmapSteps?.length ?? 0) > 0 ||
    (rawItem.projectIdeas?.length ?? 0) > 0 ||
    (rawItem.outcomes?.length ?? 0) > 0;

  return hasContext;
}

export function normalizeItem(rawItem, idSeed) {
  const title = rawItem.title.trim();
  const slugBase = slugify(rawItem.slug || title);
  const sourceRepo = rawItem.sourceRepo.trim();
  const sourceUrl = canonicalUrl(rawItem.sourceUrl);
  const type = rawItem.type ?? classifyItemType(title, rawItem.summary);
  const difficulty = normalizeDifficulty(rawItem.difficulty);
  const tags = sanitizeTags(rawItem.tags ?? []);

  return {
    id: `${slugify(sourceRepo)}-${slugBase}-${idSeed}`,
    slug: `${slugBase}-${slugify(type)}`,
    type,
    title,
    summary: rawItem.summary.trim(),
    difficulty,
    tags,
    sourceRepo,
    sourceUrl,
    estimatedHours: rawItem.estimatedHours ?? null,
    roadmapSteps: rawItem.roadmapSteps?.filter(Boolean) ?? [],
    projectIdeas: rawItem.projectIdeas?.filter(Boolean) ?? [],
    prerequisites: rawItem.prerequisites?.filter(Boolean) ?? [],
    outcomes: rawItem.outcomes?.filter(Boolean) ?? [],
    learningPath: rawItem.learningPath?.trim() ?? null,
    lessonCount: Number.isFinite(rawItem.lessonCount) ? Number(rawItem.lessonCount) : null,
    hasCertificate: Boolean(rawItem.hasCertificate),
    studentCount: Number.isFinite(rawItem.studentCount) ? Number(rawItem.studentCount) : null,
    rating: Number.isFinite(rawItem.rating) ? Number(rawItem.rating) : null,
    practiceCount: Number.isFinite(rawItem.practiceCount) ? Number(rawItem.practiceCount) : null,
  };
}

export function dedupeItems(items) {
  const winnerByKey = new Map();

  for (const item of items) {
    const key = `${canonicalUrl(item.sourceUrl)}|${item.title.toLowerCase()}`;
    const existing = winnerByKey.get(key);
    if (!existing) {
      winnerByKey.set(key, item);
      continue;
    }

    const score = scoreItem(item);
    const existingScore = scoreItem(existing);
    if (score > existingScore) {
      winnerByKey.set(key, item);
    }
  }

  return [...winnerByKey.values()].sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    if (a.title !== b.title) return a.title.localeCompare(b.title);
    if (a.sourceRepo !== b.sourceRepo) return a.sourceRepo.localeCompare(b.sourceRepo);
    return a.sourceUrl.localeCompare(b.sourceUrl);
  });
}

function scoreItem(item) {
  return (
    item.summary.length +
    item.tags.length * 5 +
    item.roadmapSteps.length * 7 +
    item.projectIdeas.length * 7 +
    item.outcomes.length * 4
  );
}

export function extractMarkdownLinks(markdown) {
  const matches = [];
  const linkPattern = /!?\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let match = linkPattern.exec(markdown);
  while (match) {
    const [fullMatch, title, url] = match;
    if (!fullMatch.startsWith("!")) {
      matches.push({ title: title.trim(), url: canonicalUrl(url) });
    }
    match = linkPattern.exec(markdown);
  }

  return matches.filter((entry) => entry.title && entry.url);
}

export function parsePythonProjects(readme, sourceRepo, sourceUrl) {
  const items = [];
  let difficulty = "mixed";

  for (const line of readme.split("\n")) {
    const difficultyMatch = line.match(/^###\s+Difficulty Level\s*:\s*(.+)$/i);
    if (difficultyMatch) {
      difficulty = normalizeDifficulty(difficultyMatch[1]);
      continue;
    }

    const projectMatch = line.match(/^\d+\.\s+\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
    if (!projectMatch) continue;

    const [, title, url] = projectMatch;
    items.push({
      type: "project",
      title,
      summary: `Hands-on Python build: ${title}.`,
      difficulty,
      tags: ["Python", "Project-Based Learning", difficulty],
      sourceRepo,
      sourceUrl: url,
      estimatedHours: difficulty === "advanced" ? 8 : difficulty === "intermediate" ? 6 : 4,
      roadmapSteps: ["Learn concept", "Build implementation", "Refactor and optimize"],
      projectIdeas: [title],
      prerequisites: ["Basic Python syntax"],
      outcomes: [`Build and explain ${title}`],
    });
  }

  if (items.length === 0) {
    return [];
  }

  items.unshift({
    type: "course",
    title: "Python Projects Master Track",
    summary: "Multi-level Python project track collected from curated GitHub learning resources.",
    difficulty: "mixed",
    tags: ["Python", "Projects", "Portfolio"],
    sourceRepo,
    sourceUrl,
    estimatedHours: 120,
    roadmapSteps: ["Beginner projects", "Intermediate projects", "Advanced projects"],
    projectIdeas: items.slice(0, 10).map((item) => item.title),
    prerequisites: ["Python basics"],
    outcomes: ["Build a multi-project Python portfolio"],
  });

  return items;
}

export function parseLinuxCommands(readme, sourceRepo, sourceUrl) {
  const commandSteps = [];

  for (const line of readme.split("\n")) {
    const match = line.match(/^\d+\.\s+([a-z0-9 _.-]+)\s*-\s*(.+)$/i);
    if (!match) continue;
    const command = match[1].trim();
    const purpose = match[2].trim();
    commandSteps.push(`${command}: ${purpose}`);
  }

  if (commandSteps.length === 0) {
    return [];
  }

  return [
    {
      type: "course",
      title: "Linux Command Line Fundamentals",
      summary: "Structured Linux CLI learning path sourced from a 55-command practical list.",
      difficulty: "beginner",
      tags: ["Linux", "CLI", "DevOps Basics"],
      sourceRepo,
      sourceUrl,
      estimatedHours: 30,
      roadmapSteps: commandSteps.slice(0, 55),
      projectIdeas: [
        "Build your shell productivity aliases",
        "Create file-system cleanup scripts",
        "Automate server setup checklist",
      ],
      prerequisites: ["Basic terminal access"],
      outcomes: ["Use core Linux commands confidently in real workflows"],
    },
  ];
}

export function parseRoadmapReadme(readme, sourceRepo) {
  const items = [];
  const lines = readme.split("\n");
  for (const line of lines) {
    const match = line.match(/-\s+\[([^\]]*Roadmap[^\]]*)\]\((https?:\/\/[^\s)]+)\)/i);
    if (!match) continue;
    const [, title, url] = match;
    items.push({
      type: "roadmap",
      title,
      summary: `${title} with step-oriented developer progression.`,
      difficulty: "mixed",
      tags: ["Roadmap", "Career Growth"],
      sourceRepo,
      sourceUrl: url,
      estimatedHours: 80,
      roadmapSteps: ["Foundation", "Core Skills", "Projects", "Advanced Practice"],
      projectIdeas: ["Capstone aligned with roadmap outcomes"],
      prerequisites: ["Basic programming familiarity"],
      outcomes: [`Follow ${title} with clear stage-wise goals`],
    });
  }

  return items;
}

export function parseSectionLinks(readme, sourceRepo, fallbackType) {
  const items = [];
  let currentSection = "General";
  const lines = readme.split("\n");

  for (const line of lines) {
    const sectionMatch = line.match(/^#{2,4}\s+(.+)$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      continue;
    }

    const linkMatch = line.match(/^\s*[-*]\s+\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
    if (!linkMatch) continue;
    const [, title, url] = linkMatch;
    const inferredType = classifyItemType(title, currentSection);

    items.push({
      type: fallbackType === "resource" ? inferredType : fallbackType,
      title,
      summary: `${title} from ${currentSection} in ${sourceRepo}.`,
      difficulty: "mixed",
      tags: [currentSection, "GitHub Learning Resource"],
      sourceRepo,
      sourceUrl: url,
      estimatedHours: null,
      roadmapSteps: [],
      projectIdeas: [],
      prerequisites: [],
      outcomes: [`Study and apply ${title}`],
    });
  }

  return items;
}

export function parseCSVProjects(csvContent, sourceRepo, sourceUrl) {
  const rows = csvContent
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean);
  if (rows.length < 2) return [];

  const headers = rows[0].split(",").map((header) => header.trim().toLowerCase());
  const titleIdx = headers.findIndex((header) => header.includes("title") || header.includes("project"));
  const urlIdx = headers.findIndex((header) => header.includes("url") || header.includes("link"));
  const techIdx = headers.findIndex((header) => header.includes("tech") || header.includes("stack"));

  if (titleIdx < 0) return [];

  return rows.slice(1).map((line) => {
    const columns = line.split(",").map((column) => column.trim());
    const title = columns[titleIdx];
    const url = columns[urlIdx] || sourceUrl;
    const tech = columns[techIdx] || "Mixed";

    return {
      type: "project",
      title,
      summary: `${title} project track from curated learn-by-building dataset.`,
      difficulty: "mixed",
      tags: [tech, "Project-Based Learning"],
      sourceRepo,
      sourceUrl: url,
      estimatedHours: 6,
      roadmapSteps: ["Read tutorial", "Build baseline", "Ship improvement"],
      projectIdeas: [title],
      prerequisites: ["Basic programming knowledge"],
      outcomes: [`Complete ${title}`],
    };
  });
}

export function buildCaseStudyItem(repoData, readme) {
  const firstParagraph = readme
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .join(" ")
    .slice(0, 260);

  const summary = firstParagraph || (repoData.description ?? "Practical production case study.");
  const tags = sanitizeTags([
    repoData.language ?? "Engineering",
    "Case Study",
    "Production Build",
  ]);

  return [
    {
      type: "case-study",
      title: `${repoData.name} Product Case Study`,
      summary,
      difficulty: "mixed",
      tags,
      sourceRepo: repoData.full_name,
      sourceUrl: repoData.html_url,
      estimatedHours: 10,
      roadmapSteps: [
        "Read architecture overview",
        "Map core modules",
        "Ship one focused feature",
      ],
      projectIdeas: [
        `Recreate a core flow from ${repoData.name}`,
        "Document design and tradeoffs",
      ],
      prerequisites: ["Web development basics"],
      outcomes: ["Understand how production repositories are structured"],
    },
  ];
}

export async function githubGet(endpoint, token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "hinglishtech-learning-catalog",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub request failed: ${endpoint} (${response.status})`);
  }

  return response.json();
}

export async function fetchReadme(ownerRepo, token) {
  const payload = await githubGet(`/repos/${ownerRepo}/readme`, token);
  if (payload.encoding !== "base64" || !payload.content) {
    return "";
  }

  return Buffer.from(payload.content, "base64").toString("utf8");
}

export async function fetchRepo(ownerRepo, token) {
  return githubGet(`/repos/${ownerRepo}`, token);
}

export async function fetchRepoFile(ownerRepo, filePath, token) {
  const payload = await githubGet(`/repos/${ownerRepo}/contents/${filePath}`, token);
  if (payload.type !== "file" || payload.encoding !== "base64" || !payload.content) {
    return "";
  }

  return Buffer.from(payload.content, "base64").toString("utf8");
}

export function buildSourceManifest() {
  return [...BAKUGOS1_SOURCES, ...EXTERNAL_SOURCES].sort((a, b) => a.localeCompare(b));
}

export function fallbackTypeForSource(ownerRepo) {
  if (ownerRepo.startsWith("BAKUGOS1/")) return "case-study";
  return inferTypeFromRepo(ownerRepo);
}
