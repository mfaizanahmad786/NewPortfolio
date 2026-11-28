/**
 * Tech Stack bento. Edit this file to change the section: heading, groups, and the items in each.
 *
 * - `icon` is a key into data/stack-icons.ts (generated from simple-icons). Leave it out for a text chip.
 * - `use` is the one-line description shown in the marquee tooltip.
 * - `marquee.rows` groups the categories into scrolling rows for the logo marquee.
 * - `size` / `visual` / `blurb` are only used by the bento-grid version (branch `tech-stack`, tag
 *   `tech-stack-bento`); the marquee ignores them.
 * - To add a logo: add its name to scripts/generate-stack-icons.mjs and run
 *   `node scripts/generate-stack-icons.mjs`.
 */

export type StackItem = {
  name: string;
  icon?: string;
  /** One short line on what it is used for (tooltip in the marquee). */
  use?: string;
};

export type StackGroup = {
  id: string;
  title: string;
  blurb: string;
  size: "xl" | "wide" | "tall" | "sm";
  visual?: "agents" | "code" | "pipeline" | "rows";
  items: StackItem[];
};

export type MarqueeRow = {
  label: string;
  /** Group ids whose items appear in this row, in order. */
  groups: string[];
  direction: "left" | "right";
  /** Scroll speed in pixels per second; keep the rows close but not identical. */
  speed: number;
};

export const stack = {
  marquee: {
    rows: [
      { label: "Frontend & Mobile", groups: ["frontend", "mobile"], direction: "left", speed: 46 },
      { label: "Backend, Data & Cloud", groups: ["backend", "data", "devops"], direction: "right", speed: 38 },
      { label: "AI & Agents", groups: ["ai"], direction: "left", speed: 52 },
    ] satisfies MarqueeRow[],
  },
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
        { name: "Claude", icon: "anthropic", use: "Custom skills, plugins and multi-agent workflows." },
        { name: "MCP", icon: "modelcontextprotocol", use: "Connecting agents to tools and data." },
        { name: "OpenAI", use: "LLM APIs behind AI-powered features." },
        { name: "RAG", use: "Grounding answers in your own data." },
        { name: "Multi-agent workflows", use: "Agents that plan, call tools and hand off work." },
      ],
    },
    {
      id: "frontend",
      title: "Frontend",
      blurb: "Fast, polished interfaces.",
      size: "wide",
      visual: "code",
      items: [
        { name: "Next.js", icon: "nextdotjs", use: "My default for fast, SEO-friendly websites and web apps." },
        { name: "React", icon: "react", use: "Component-driven interfaces across web projects." },
        { name: "TypeScript", icon: "typescript", use: "Type-safe code from front end to back end." },
        { name: "Tailwind", icon: "tailwindcss", use: "Quick, consistent styling for polished UIs." },
        { name: "Framer Motion", icon: "framer", use: "Smooth scroll reveals and micro-interactions." },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      blurb: "APIs and background workers that keep jobs moving.",
      size: "tall",
      visual: "pipeline",
      items: [
        { name: "Node.js", icon: "nodedotjs", use: "APIs and services behind web and fintech apps." },
        { name: "Python", icon: "python", use: "Backend services and AI workflow glue." },
        { name: "FastAPI", icon: "fastapi", use: "Quick, typed Python APIs." },
        { name: "Express", icon: "express", use: "Lightweight Node.js REST backends." },
        { name: "REST APIs", use: "Clean contracts between apps and services." },
        { name: "Queues & workers", use: "Background jobs for async processing." },
      ],
    },
    {
      id: "mobile",
      title: "Mobile",
      blurb: "One codebase, iOS and Android.",
      size: "sm",
      items: [{ name: "React Native", icon: "react", use: "Cross-platform mobile apps for iOS and Android." }],
    },
    {
      id: "data",
      title: "Databases",
      blurb: "Relational, document and in-memory.",
      size: "wide",
      visual: "rows",
      items: [
        { name: "PostgreSQL", icon: "postgresql", use: "Relational data for transactional, fintech-style apps." },
        { name: "MongoDB", icon: "mongodb", use: "Flexible document storage." },
        { name: "Redis", icon: "redis", use: "Caching and fast in-memory state." },
      ],
    },
    {
      id: "devops",
      title: "Cloud & Tools",
      blurb: "Ship it, version it.",
      size: "sm",
      items: [
        { name: "Vercel", icon: "vercel", use: "Deploying and previewing Next.js sites." },
        { name: "Docker", icon: "docker", use: "Consistent, portable environments." },
        { name: "Git", icon: "git", use: "Version control and branch workflow." },
        { name: "GitHub", icon: "github", use: "Pull requests and code review." },
      ],
    },
  ] satisfies StackGroup[],
};
