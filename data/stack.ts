/**
 * Tech Stack content. Edit this file to change the section: heading, groups, items and marquee rows.
 *
 * - `icon` is a key into data/stack-icons.ts (generated from simple-icons). Leave it out for a text tile.
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
      { label: "Backend & Data", groups: ["backend", "data"], direction: "right", speed: 40 },
      { label: "AI, Cloud & Languages", groups: ["ai", "cloud", "languages"], direction: "left", speed: 52 },
    ] satisfies MarqueeRow[],
  },
  heading: "Tech Stack.",
  subheading: ["The tools I reach for,", "and what they build."],
  groups: [
    {
      id: "frontend",
      title: "Frontend",
      blurb: "Fast, polished interfaces.",
      size: "wide",
      visual: "code",
      items: [
        { name: "React", icon: "react", use: "Component-driven interfaces across my web projects." },
        { name: "Next.js", icon: "nextdotjs", use: "My default for fast, SEO-friendly web apps." },
        { name: "TypeScript", icon: "typescript", use: "Type-safe code from front end to back end." },
        { name: "JavaScript", icon: "javascript", use: "The language of the web, front to back." },
        { name: "Tailwind CSS", icon: "tailwindcss", use: "Quick, consistent styling for polished UIs." },
        { name: "shadcn/ui", icon: "shadcnui", use: "Accessible, customisable component primitives." },
        { name: "Framer Motion", icon: "framer", use: "Smooth scroll reveals and micro-interactions." },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      blurb: "APIs, auth and data access.",
      size: "tall",
      visual: "pipeline",
      items: [
        { name: "Node.js", icon: "nodedotjs", use: "APIs and services behind my web apps." },
        { name: "Express", icon: "express", use: "Lightweight REST backends." },
        { name: "Prisma", icon: "prisma", use: "Type-safe database access (YC Directory)." },
        { name: "Auth.js", use: "Sign-in and sessions for Next.js apps (NextAuth)." },
        { name: "JWT", icon: "jsonwebtokens", use: "Stateless token auth for APIs." },
        { name: "REST APIs", use: "Clean contracts between apps and services." },
      ],
    },
    {
      id: "data",
      title: "Data",
      blurb: "Databases and data work.",
      size: "wide",
      visual: "rows",
      items: [
        { name: "MongoDB", icon: "mongodb", use: "Aggregation pipelines & ACID transactions (Itwaar Bazaar)." },
        { name: "PostgreSQL", icon: "postgresql", use: "Relational data and SQL." },
        { name: "SQLite", icon: "sqlite", use: "Lightweight embedded storage." },
        { name: "Pandas", icon: "pandas", use: "Data wrangling and analysis in Python." },
        { name: "NumPy", icon: "numpy", use: "Numerical computing in Python." },
        { name: "Python", icon: "python", use: "Backend scripts, data work and AI glue." },
      ],
    },
    {
      id: "ai",
      title: "AI / Agents",
      blurb: "Multi-agent workflows that plan, call tools and hand work to each other.",
      size: "xl",
      visual: "agents",
      items: [
        { name: "Gemini API", icon: "googlegemini", use: "AI resume analysis (Resumind) & crop advice (Anaaj)." },
        { name: "Claude", icon: "anthropic", use: "Custom skills, plugins and multi-agent workflows." },
        { name: "MCP", icon: "modelcontextprotocol", use: "Connecting agents to tools and data." },
        { name: "Multi-agent workflows", use: "Agents that plan, call tools and hand off work." },
      ],
    },
    {
      id: "mobile",
      title: "Mobile",
      blurb: "One codebase, iOS and Android.",
      size: "sm",
      items: [
        { name: "Flutter", icon: "flutter", use: "Kharcha & QuestHabit apps." },
        { name: "Dart", icon: "dart", use: "The language behind my Flutter apps." },
        { name: "React Native", icon: "react", use: "Cross-platform mobile apps for iOS and Android." },
      ],
    },
    {
      id: "cloud",
      title: "Cloud & Tools",
      blurb: "Ship it, version it.",
      size: "sm",
      items: [
        { name: "Firebase", icon: "firebase", use: "Auth, database and hosting for app backends." },
        { name: "Vercel", icon: "vercel", use: "Deploying and previewing Next.js sites." },
        { name: "Git", icon: "git", use: "Version control and branch workflow." },
        { name: "GitHub", icon: "github", use: "Pull requests and code review." },
      ],
    },
    {
      id: "languages",
      title: "Languages",
      blurb: "Fundamentals.",
      size: "sm",
      items: [
        { name: "C++", icon: "cplusplus", use: "Data structures and algorithms." },
        { name: "Java", icon: "openjdk", use: "Object-oriented programming fundamentals." },
      ],
    },
  ] satisfies StackGroup[],
};
