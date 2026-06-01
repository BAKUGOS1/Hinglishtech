import catalogData from "@/content/learning-catalog.json";
import type { Difficulty, LearningCatalog, LearningItem, LearningItemType, PagedResult } from "@/lib/learning/types";

const catalog = catalogData as LearningCatalog;
const DEFAULT_PAGE_SIZE = 18;

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
  return catalog.items
    .filter((item) => priority.has(item.type))
    .slice(0, limit);
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
  const needle = tag.toLowerCase();
  return item.tags.some((entry) => entry.toLowerCase() === needle);
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
  const filtered = getItemsByType("course")
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
  const filtered = getItemsByType("roadmap")
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
  const filtered = getItemsByType("project")
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
