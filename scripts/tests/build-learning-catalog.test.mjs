import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  dedupeItems,
  normalizeItem,
  parseLinuxCommands,
  parsePythonProjects,
  parseRoadmapReadme,
  parseSectionLinks,
} from "../learning-catalog-utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.resolve(__dirname, "../fixtures");

async function fixture(name) {
  return readFile(path.join(fixturesDir, name), "utf8");
}

test("parsePythonProjects extracts projects and difficulty", async () => {
  const content = await fixture("pythonprojects.md");
  const items = parsePythonProjects(content, "BAKUGOS1/pythonprojects", "https://github.com/BAKUGOS1/pythonprojects");
  assert.ok(items.length >= 4);
  assert.equal(items[0].type, "course");
  assert.equal(items[1].difficulty, "beginner");
  assert.equal(items[items.length - 1].difficulty, "advanced");
});

test("parseLinuxCommands creates a course with roadmap steps", async () => {
  const content = await fixture("linuxcommands.md");
  const items = parseLinuxCommands(content, "BAKUGOS1/linuxcommands", "https://github.com/BAKUGOS1/linuxcommands");
  assert.equal(items.length, 1);
  assert.equal(items[0].type, "course");
  assert.equal(items[0].roadmapSteps.length, 3);
});

test("parseRoadmapReadme extracts roadmap links", async () => {
  const content = await fixture("roadmaps.md");
  const items = parseRoadmapReadme(content, "nilbuild/developer-roadmap");
  assert.equal(items.length, 2);
  assert.ok(items.every((item) => item.type === "roadmap"));
});

test("parseSectionLinks extracts project links by section", async () => {
  const content = await fixture("project-based.md");
  const items = parseSectionLinks(content, "practical-tutorials/project-based-learning", "project");
  assert.equal(items.length, 3);
  assert.ok(items.every((item) => item.type === "project"));
});

test("normalize and dedupe keep stable, highest-quality winner", () => {
  const raw = [
    {
      type: "course",
      title: "Node.js Basics",
      summary: "Short summary that is still valid for matching and ranking.",
      difficulty: "beginner",
      tags: ["Node.js"],
      sourceRepo: "test/repo",
      sourceUrl: "https://example.com/node",
      estimatedHours: 8,
      roadmapSteps: ["Start"],
      projectIdeas: [],
      prerequisites: [],
      outcomes: ["Learn Node.js basics"],
    },
    {
      type: "course",
      title: "Node.js Basics",
      summary: "A longer summary with more roadmap depth and better quality for dedupe winner selection.",
      difficulty: "beginner",
      tags: ["Node.js", "Backend"],
      sourceRepo: "test/repo",
      sourceUrl: "https://example.com/node/",
      estimatedHours: 10,
      roadmapSteps: ["Start", "Build", "Ship"],
      projectIdeas: ["Create API"],
      prerequisites: [],
      outcomes: ["Learn Node.js basics"],
    },
  ];

  const normalized = raw.map((entry, index) => normalizeItem(entry, String(index + 1)));
  const deduped = dedupeItems(normalized);
  assert.equal(deduped.length, 1);
  assert.equal(deduped[0].roadmapSteps.length, 3);
});
