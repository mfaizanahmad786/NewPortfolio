/**
 * Experience section copy.
 *
 * Fields
 *  - badge       small black pill before the date, e.g. "Current role" / "Ongoing" (optional)
 *  - date        free text, e.g. "2024 – 2026" (optional)
 *  - title       role or degree; use "\n" to force a line break
 *  - place       company / university
 *  - placeSub    small grey line under the place, e.g. a city or "Remote" (optional)
 *  - description one or two sentences
 *
 * Entries are chronological: oldest on the left (top on mobile), newest on the right (bottom).
 * The LAST entry is the "current" stop: it gets the filled marker and the pop animation.
 */
export type ExperienceEntry = {
  badge?: string;
  date?: string;
  title: string;
  place: string;
  placeSub?: string;
  description: string;
};

export const experience = {
  heading: "Experience.",
  subheading: ["Where it started,", "and where I am now."],
  entries: [
    {
      badge: "Ongoing",
      date: "2023 – 2027",
      title: "Bachelor of Science in Computer Science",
      place: "COMSATS University Islamabad",
      placeSub: "Islamabad",
      description: "Currently pursuing a BS in Computer Science.",
    },
    {
      date: "2024 – 2025",
      title: "Freelance Web Developer",
      place: "Client projects",
      placeSub: "Remote",
      description: "Built websites and web apps for clients.",
    },
    {
      date: "2025 – 2026",
      title: "Frontend Developer",
      place: "Speed Speak",
      placeSub: "Remote (UK)",
      description:
        "Built the website, a web app and a mobile app for a UK translation company, bringing qualified interpreters together on one platform.",
    },
    {
      date: "June 2026 – August 2026",
      title: "AI Intern",
      place: "Taleemabad",
      placeSub: "Islamabad",
      description:
        "Orchestrated multi-agent AI workflows and built custom Claude skills, plugins and MCP integrations, plus background workers for async job processing.",
    },
    {
      badge: "Current role",
      date: "August 2026 – Present",
      title: "Software Engineer",
      place: "Saak Remit",
      placeSub: "Remote (UK)",
      description:
        "Building internal tools and developing and managing the digital wallet and remittance app for a UK remittance company serving South Asia.",
    },
  ] satisfies ExperienceEntry[],
};
