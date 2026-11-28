/**
 * Tech Stack bento. Edit this file to change the section: heading, groups, and the items in each.
 *
 * - `icon` is a key into data/stack-icons.ts (generated from simple-icons). Leave it out for a text chip.
 * - `size` sets the bento footprint on desktop: xl 2x2, wide 2x1, tall 1x2, sm 1x1.
 * - `visual` picks the little live animation a card shows (only the larger cards have one).
 * - To add a logo: add its name to scripts/generate-stack-icons.mjs and run
 *   `node scripts/generate-stack-icons.mjs`.
 */

export type StackItem = { name: string; icon?: string };

export type StackGroup = {
  id: string;
  title: string;
  blurb: string;
  size: "xl" | "wide" | "tall" | "sm";
  visual?: "agents" | "code" | "pipeline" | "rows";
  items: StackItem[];
};

export const stack = {
  heading: "Tech Stack.",
  subheading: ["The tools I reach for,", "and what they build."],
  groups: [
    {
      id: "ai",
      title: "AI / Agents",
      blurb: "Multi-agent workflows that plan, call tools and hand work to each other.",
      size: "xl",
      visual: "agents",
      items: [
        { name: "Claude", icon: "anthropic" },
        { name: "MCP", icon: "modelcontextprotocol" },
        { name: "OpenAI" },
        { name: "RAG" },
        { name: "Multi-agent workflows" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend",
      blurb: "Fast, polished interfaces.",
      size: "wide",
      visual: "code",
      items: [
        { name: "Next.js", icon: "nextdotjs" },
        { name: "React", icon: "react" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Tailwind", icon: "tailwindcss" },
        { name: "Framer Motion", icon: "framer" },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      blurb: "APIs and background workers that keep jobs moving.",
      size: "tall",
      visual: "pipeline",
      items: [
        { name: "Node.js", icon: "nodedotjs" },
        { name: "Python", icon: "python" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "Express", icon: "express" },
        { name: "REST APIs" },
        { name: "Queues & workers" },
      ],
    },
    {
      id: "mobile",
      title: "Mobile",
      blurb: "One codebase, iOS and Android.",
      size: "sm",
      items: [{ name: "React Native", icon: "react" }],
    },
    {
      id: "data",
      title: "Databases",
      blurb: "Relational, document and in-memory.",
      size: "wide",
      visual: "rows",
      items: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Redis", icon: "redis" },
      ],
    },
    {
      id: "devops",
      title: "Cloud & Tools",
      blurb: "Ship it, version it.",
      size: "sm",
      items: [
        { name: "Vercel", icon: "vercel" },
        { name: "Docker", icon: "docker" },
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
      ],
    },
  ] satisfies StackGroup[],
};
