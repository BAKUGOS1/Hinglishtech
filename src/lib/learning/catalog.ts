import catalogData from "@/content/learning-catalog.json";
import type { Difficulty, LearningCatalog, LearningItem, LearningItemType, PagedResult } from "@/lib/learning/types";

const catalog = catalogData as LearningCatalog;
const DEFAULT_PAGE_SIZE = 18;
const PRIORITY_TERMS: Record<LearningItemType, string[]> = {
  course: [
    "python",
    "react",
    "javascript",
    "java",
    "typescript",
    "node",
    "backend",
    "frontend",
  ],
  roadmap: ["frontend", "backend", "mern", "fullstack", "full stack", "devops", "web"],
  project: ["mern", "fullstack", "full stack", "frontend", "backend", "portfolio", "capstone"],
  "case-study": ["architecture", "production", "system", "platform"],
  resource: ["reference", "learning"],
};

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function contextDepth(item: LearningItem): number {
  return (
    item.roadmapSteps.length * 3 +
    item.projectIdeas.length * 2 +
    item.prerequisites.length * 2 +
    item.outcomes.length * 2 +
    item.tags.length
  );
}

function priorityScore(item: LearningItem): number {
  const terms = PRIORITY_TERMS[item.type] ?? [];
  const title = normalizeToken(item.title);
  const summary = normalizeToken(item.summary);
  const tags = item.tags.map(normalizeToken);

  let score = 0;
  for (let index = 0; index < terms.length; index += 1) {
    const term = normalizeToken(terms[index]);
    const base = 400 - index * 10;
    if (!term) continue;
    if (title.includes(term)) score = Math.max(score, base + 120);
    if (tags.some((tag) => tag.includes(term))) score = Math.max(score, base + 80);
    if (summary.includes(term)) score = Math.max(score, base + 40);
  }

  if (item.sourceRepo.startsWith("BAKUGOS1/")) score += 25;
  return score + contextDepth(item);
}

function sortByCatalogPriority(items: LearningItem[]): LearningItem[] {
  return [...items].sort((a, b) => {
    const scoreDiff = priorityScore(b) - priorityScore(a);
    if (scoreDiff !== 0) return scoreDiff;
    const titleCompare = a.title.localeCompare(b.title);
    if (titleCompare !== 0) return titleCompare;
    return a.sourceRepo.localeCompare(b.sourceRepo);
  });
}

export function getLearningCatalog(): LearningCatalog {
  return catalog;
}

export function getItemsByType(type: LearningItemType): LearningItem[] {
  return catalog.items.filter((item) => item.type === type);
}

export function getItemBySlug(slug: string, type: LearningItemType): LearningItem | undefined {
  return catalog.items.find((item) => item.slug === slug && item.type === type);
}

export function getFeaturedCourses(limit = 6): LearningItem[] {
  const priority = new Set(["course", "roadmap"]);
  return sortByCatalogPriority(catalog.items.filter((item) => priority.has(item.type))).slice(0, limit);
}

function matchesSearch(item: LearningItem, search: string): boolean {
  if (!search) return true;
  const haystack = [
    item.title,
    item.summary,
    ...item.tags,
    ...item.roadmapSteps,
    ...item.projectIdeas,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(search.toLowerCase());
}

function matchesDifficulty(item: LearningItem, difficulty: string): boolean {
  if (!difficulty) return true;
  return item.difficulty === difficulty;
}

function matchesTag(item: LearningItem, tag: string): boolean {
  if (!tag) return true;
  const needle = normalizeToken(tag);
  const title = normalizeToken(item.title);
  const summary = normalizeToken(item.summary);
  if (title.includes(needle) || summary.includes(needle)) return true;
  return item.tags.some((entry) => {
    const normalized = normalizeToken(entry);
    return normalized === needle || normalized.includes(needle) || needle.includes(normalized);
  });
}

function paginate<T>(items: T[], page: number, pageSize = DEFAULT_PAGE_SIZE): PagedResult<T> {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(safePage, totalPages);
  const offset = (currentPage - 1) * pageSize;

  return {
    items: items.slice(offset, offset + pageSize),
    totalItems,
    totalPages,
    currentPage,
    pageSize,
  };
}

export function queryCourses(input: {
  search?: string;
  level?: Difficulty | "";
  tag?: string;
  page?: number;
}): PagedResult<LearningItem> {
  const filtered = sortByCatalogPriority(getItemsByType("course"))
    .filter((item) => matchesSearch(item, input.search ?? ""))
    .filter((item) => matchesDifficulty(item, input.level ?? ""))
    .filter((item) => matchesTag(item, input.tag ?? ""));

  return paginate(filtered, input.page ?? 1);
}

export function queryRoadmaps(input: {
  track?: string;
  level?: Difficulty | "";
  page?: number;
}): PagedResult<LearningItem> {
  const filtered = sortByCatalogPriority(getItemsByType("roadmap"))
    .filter((item) => matchesTag(item, input.track ?? ""))
    .filter((item) => matchesDifficulty(item, input.level ?? ""));

  return paginate(filtered, input.page ?? 1);
}

export function queryProjects(input: {
  search?: string;
  lang?: string;
  difficulty?: Difficulty | "";
  page?: number;
}): PagedResult<LearningItem> {
  const filtered = sortByCatalogPriority(getItemsByType("project"))
    .filter((item) => matchesSearch(item, input.search ?? ""))
    .filter((item) => matchesTag(item, input.lang ?? ""))
    .filter((item) => matchesDifficulty(item, input.difficulty ?? ""));

  return paginate(filtered, input.page ?? 1);
}

export function getTopTags(type: LearningItemType, limit = 20): string[] {
  const counts = new Map<string, number>();
  for (const item of getItemsByType(type)) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}
