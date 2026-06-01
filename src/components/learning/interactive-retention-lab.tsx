"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bot, Code2, Lightbulb, ListChecks, MessageSquare, RefreshCcw, Sparkles } from "lucide-react";

const starterCode = `# Goal: return squares of numbers from a list
def square_numbers(nums):
    # write your logic
    return []

print(square_numbers([1, 2, 3, 4]))`;

const challenge = {
  title: "Daily Python Challenge",
  question: "Create a list of squared odd numbers from [1, 2, 3, 4, 5].",
  expectedFragments: ["for", "if", "%", "*"],
  hint: "Use list comprehension and filter odd numbers first.",
  answer: "[n * n for n in [1, 2, 3, 4, 5] if n % 2 != 0]",
};

const revisionCards = [
  {
    topic: "Loops",
    summary: "Use `for` when iterating collections and `while` for state-driven repetition.",
    quickFix: "If loop logic feels long, extract inner logic into a function.",
  },
  {
    topic: "Functions",
    summary: "Functions should do one task. Keep names action-oriented and arguments explicit.",
    quickFix: "Add a small docstring and 2 test examples before moving forward.",
  },
  {
    topic: "Lists",
    summary: "Prefer list comprehensions for clean transforms and filters.",
    quickFix: "Break nested list comprehensions into 2 steps if readability drops.",
  },
  {
    topic: "APIs",
    summary: "Validate status codes and parse JSON carefully before use.",
    quickFix: "Log response shape once before writing mapping logic.",
  },
];

const roadmap30Days = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1;
  const stage =
    day <= 6
      ? "Python Basics"
      : day <= 12
        ? "Data Structures"
        : day <= 18
          ? "Mini Projects"
          : day <= 24
            ? "Automation"
            : "Data Skills";
  return { day, stage };
});

function buildAssistantReply(question: string): string {
  const normalized = question.toLowerCase();
  if (normalized.includes("loop")) {
    return "Start with a `for` loop over a list, then convert it to list comprehension once output is correct.";
  }
  if (normalized.includes("function")) {
    return "Write the function signature first, add one example input/output, then fill logic in small steps.";
  }
  if (normalized.includes("api")) {
    return "Use `requests.get`, check `status_code`, then parse `.json()` and map only required keys.";
  }
  if (normalized.includes("pandas") || normalized.includes("data")) {
    return "Load CSV with `pandas.read_csv`, inspect with `head()` and `info()`, then clean null values before charts.";
  }
  return "Break the topic into: concept → mini example → one practice task → one revision note. Ask me the next step you are stuck on.";
}

type ChatMessage = { role: "user" | "assistant"; text: string };

export function InteractiveRetentionLab({ compact = false }: { compact?: boolean }) {
  const [code, setCode] = useState(starterCode);
  const [playgroundOutput, setPlaygroundOutput] = useState<string>("Run your code check to get feedback.");
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [challengeResult, setChallengeResult] = useState("Submit your attempt to validate logic.");
  const [selectedCard, setSelectedCard] = useState(revisionCards[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Ask me any beginner Python doubt. I will reply with step-by-step guidance." },
  ]);
  const [prompt, setPrompt] = useState("");

  const completedDays = compact ? 11 : 17;
  const progressText = useMemo(() => `${completedDays}/30 days complete`, [completedDays]);

  function runPlaygroundCheck() {
    const normalized = code.toLowerCase();
    const hasFunction = normalized.includes("def square_numbers");
    const hasSquareLogic = normalized.includes("n * n") || normalized.includes("**2");
    const hasReturn = normalized.includes("return");

    if (hasFunction && hasSquareLogic && hasReturn) {
      setPlaygroundOutput("Success: logic looks correct. Sample output: [1, 4, 9, 16]");
      return;
    }
    setPlaygroundOutput("Not quite yet: add square logic (`n * n`) and return the transformed list.");
  }

  function submitChallenge() {
    const normalized = challengeAnswer.toLowerCase();
    const passed = challenge.expectedFragments.every((token) => normalized.includes(token));
    setChallengeResult(
      passed
        ? "Great job: your approach matches the expected pattern."
        : `Try again: ${challenge.hint}`
    );
  }

  function handleAsk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = prompt.trim();
    if (!text) return;
    const reply = buildAssistantReply(text);
    setMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: reply }]);
    setPrompt("");
  }

  return (
    <section className="mt-8 grid gap-3">
      <div className={`grid gap-3 ${compact ? "lg:grid-cols-1" : "lg:grid-cols-[1.1fr_0.9fr]"}`}>
        <article className="border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <p className="font-grotesk text-lg font-semibold text-foreground">Interactive Code Playground</p>
          </div>
          <p className="mt-1 font-ibm-mono text-xs text-muted-foreground">
            Practice inside the lesson flow without switching tabs.
          </p>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="mt-4 h-52 w-full border border-border bg-background p-3 font-ibm-mono text-xs text-foreground"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={runPlaygroundCheck}
              className="border border-primary/50 bg-primary/10 px-3 py-1.5 font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-primary"
            >
              Run Check
            </button>
            <button
              type="button"
              onClick={() => setCode(starterCode)}
              className="inline-flex items-center gap-1 border border-border bg-secondary px-3 py-1.5 font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
          <p className="mt-3 border border-border bg-background/80 p-2.5 font-ibm-mono text-xs text-foreground">
            {playgroundOutput}
          </p>
        </article>

        <article className="border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="font-grotesk text-lg font-semibold text-foreground">{challenge.title}</p>
          </div>
          <p className="mt-2 text-sm text-foreground">{challenge.question}</p>
          <textarea
            value={challengeAnswer}
            onChange={(event) => setChallengeAnswer(event.target.value)}
            placeholder="Write your attempt here..."
            className="mt-3 h-24 w-full border border-border bg-background p-3 font-ibm-mono text-xs text-foreground"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={submitChallenge}
              className="border border-primary/50 bg-primary/10 px-3 py-1.5 font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-primary"
            >
              Check Answer
            </button>
            <button
              type="button"
              onClick={() => setChallengeAnswer(challenge.answer)}
              className="border border-border bg-secondary px-3 py-1.5 font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
            >
              Show Solution
            </button>
          </div>
          <p className="mt-3 border border-border bg-background/80 p-2.5 font-ibm-mono text-xs text-foreground">
            {challengeResult}
          </p>

          <div className="mt-5 border-t border-border pt-4">
            <p className="font-ibm-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              30-Day Python Roadmap
            </p>
            <p className="mt-1 font-ibm-mono text-xs text-foreground">{progressText}</p>
            <div className="mt-3 grid grid-cols-6 gap-1.5">
              {roadmap30Days.map((entry) => (
                <div
                  key={entry.day}
                  className={`border px-1 py-1 text-center font-ibm-mono text-[10px] ${
                    entry.day <= completedDays ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"
                  }`}
                  title={`Day ${entry.day}: ${entry.stage}`}
                >
                  {entry.day}
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      <div className={`grid gap-3 ${compact ? "lg:grid-cols-1" : "lg:grid-cols-[0.95fr_1.05fr]"}`}>
        <article className="border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <p className="font-grotesk text-lg font-semibold text-foreground">Quick Revision Cards</p>
          </div>
          <p className="mt-1 font-ibm-mono text-xs text-muted-foreground">
            Forgot a topic? Use focused cards for instant recall.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {revisionCards.map((card) => (
              <button
                key={card.topic}
                type="button"
                onClick={() => setSelectedCard(card)}
                className={`border px-2.5 py-1 font-ibm-mono text-[10px] uppercase tracking-[0.1em] ${
                  selectedCard.topic === card.topic
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground"
                }`}
              >
                {card.topic}
              </button>
            ))}
          </div>
          <div className="mt-4 border border-border bg-background p-3">
            <p className="font-grotesk text-sm font-semibold text-foreground">{selectedCard.topic}</p>
            <p className="mt-1 font-ibm-mono text-xs leading-6 text-muted-foreground">{selectedCard.summary}</p>
            <p className="mt-2 border-t border-border pt-2 font-ibm-mono text-xs text-foreground">
              Quick fix: {selectedCard.quickFix}
            </p>
          </div>
        </article>

        <article className="border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            <p className="font-grotesk text-lg font-semibold text-foreground">AI Doubt Assistant</p>
          </div>
          <p className="mt-1 font-ibm-mono text-xs text-muted-foreground">
            Ask coding doubts and get guided next steps from course context.
          </p>
          <div className="mt-4 h-48 space-y-2 overflow-y-auto border border-border bg-background p-3">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className="text-xs">
                <p className="font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {message.role === "assistant" ? "Assistant" : "You"}
                </p>
                <p className="mt-1 text-sm text-foreground">{message.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleAsk} className="mt-3 flex gap-2">
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Ask: how do I use loops in Python?"
              className="h-10 flex-1 border border-input bg-background px-3 text-sm text-foreground"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 border border-primary/50 bg-primary/10 px-3 font-ibm-mono text-[11px] uppercase tracking-[0.1em] text-primary"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Ask
            </button>
          </form>
          <p className="mt-3 inline-flex items-center gap-1.5 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            <ListChecks className="h-3.5 w-3.5 text-primary" />
            Practice tip: ask for one example and one assignment after each answer.
          </p>
        </article>
      </div>
    </section>
  );
}
