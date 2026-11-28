/**
 * Tech Stack content. Edit this file to change the section: heading, groups, items and marquee rows.
 *
 * - `icon` is a key into data/stack-icons.ts (generated from simple-icons). Leave it out for a text tile.
 * - `projects` is where the tool was used (up to two names). Shown prominently in the tooltip.
 * - `use` is the short supporting line under the project name.
 * - `marquee.rows` groups the categories into scrolling rows for the logo marquee.
 * - `size` / `blurb` are only used by the bento-grid version (branch `tech-stack`, tag
 *   `tech-stack-bento`); the marquee ignores them.
 * - `marquee.note` is the muted line under the row.
 * - To add a logo: add its name to scripts/generate-stack-icons.mjs and run
 *   `node scripts/generate-stack-icons.mjs`.
 */

export type StackItem = {
  name: string;
  icon?: string;
  /** Up to two project or product names, shown first in the tooltip. */
  projects?: string[];
  /** Short supporting line under the project name (tooltip). */
  use?: string;
};

export type StackGroup = {
  id: string;
  title: string;
  blurb: string;
  size: "xl" | "wide" | "tall" | "sm";
  items: StackItem[];
};

export type MarqueeRow = {
  /** Optional small caption above the row. */
  label?: string;
  /** Group ids whose items appear in this row, in order. */
  groups: string[];
  direction: "left" | "right";
  /** Scroll speed in pixels per second. */
  speed: number;
};

export const stack = {
  marquee: {
    rows: [
      { groups: ["frontend", "backend", "mobile", "cloud", "ai"], direction: "left", speed: 46 },
    ] satisfies MarqueeRow[],
    note: "and the usual: Git, REST, auth, testing",
  },
  heading: "Tech Stack.",
  subheading: ["The tools I reach for,", "and what they build."],
  groups: [
    {
      id: "frontend",
      title: "Frontend",
      blurb: "Fast, polished interfaces.",
      size: "wide",
      items: [
        { name: "React", icon: "react", use: "Component-driven interfaces across my web projects." },
        { name: "Next.js", icon: "nextdotjs", use: "My default for fast, SEO-friendly web apps." },
        { name: "TypeScript", icon: "typescript", use: "Type-safe code from front end to back end." },
        { name: "Tailwind CSS", icon: "tailwindcss", use: "Quick, consistent styling for polished UIs." },
      ],
    },
    {
      id: "backend",
      title: "Backend & Data",
      blurb: "APIs, databases and data access.",
      size: "tall",
      items: [
        { name: "Node.js", icon: "nodedotjs", use: "APIs and services behind my web apps." },
        { name: "Express", icon: "express", use: "Lightweight REST backends." },
        { name: "PostgreSQL", icon: "postgresql", use: "Relational data and SQL." },
        {
          name: "MongoDB",
          icon: "mongodb",
          projects: ["Itwaar Bazaar"],
          use: "Aggregation pipelines & ACID transactions.",
        },
        {
          name: "Prisma",
          icon: "prisma",
          projects: ["YC Directory"],
          use: "Type-safe database access.",
        },
        { name: "Python", icon: "python", use: "Backend scripts, data work and AI glue." },
      ],
    },
    {
      id: "mobile",
      title: "Mobile",
      blurb: "One codebase, iOS and Android.",
      size: "sm",
      items: [
        {
          name: "Flutter",
          icon: "flutter",
          projects: ["Kharcha", "QuestHabit"],
          use: "Cross-platform apps for iOS and Android.",
        },
        { name: "React Native", icon: "react", use: "Cross-platform mobile apps for iOS and Android." },
      ],
    },
    {
      id: "cloud",
      title: "Cloud",
      blurb: "Ship it.",
      size: "sm",
      items: [
        { name: "Firebase", icon: "firebase", use: "Auth, database and hosting for app backends." },
        { name: "Vercel", icon: "vercel", use: "Deploying and previewing Next.js sites." },
      ],
    },
    {
      id: "ai",
      title: "AI",
      blurb: "Models and agents.",
      size: "xl",
      items: [
        {
          name: "Gemini",
          icon: "googlegemini",
          projects: ["Resumind", "Anaaj"],
          use: "AI resume analysis and crop advice.",
        },
        {
          name: "Claude",
          icon: "anthropic",
          projects: ["Taleemabad"],
          use: "Custom skills, plugins and multi-agent workflows.",
        },
      ],
    },
  ] satisfies StackGroup[],
};
