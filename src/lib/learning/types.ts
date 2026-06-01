export type LearningItemType =
  | "course"
  | "roadmap"
  | "project"
  | "case-study"
  | "resource";

export type Difficulty = "beginner" | "intermediate" | "advanced" | "mixed";

export type LearningItem = {
  id: string;
  slug: string;
  type: LearningItemType;
  title: string;
  summary: string;
  difficulty: Difficulty;
  tags: string[];
  sourceRepo: string;
  sourceUrl: string;
  estimatedHours: number | null;
  roadmapSteps: string[];
  projectIdeas: string[];
  prerequisites: string[];
  outcomes: string[];
};

export type LearningCatalog = {
  generatedAt: string;
  sourceCount: number;
  itemCount: number;
  sources: string[];
  errors: Array<{ source: string; message: string }>;
  items: LearningItem[];
};

export type PagedResult<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
