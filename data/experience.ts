/**
 * Experience section copy. EVERY ENTRY BELOW IS A PLACEHOLDER: no real roles, companies or
 * dates for this portfolio's owner were available in the repo, the original Framer content or
 * the GitHub profile. Replace each entry (and delete `placeholder: true`) with real details.
 *
 * Fields
 *  - badge       small black pill before the date, e.g. "Current role" / "Ongoing" (optional)
 *  - date        free text, e.g. "2024 – 2026" (optional)
 *  - title       role or degree; use "\n" to force a line break
 *  - place       company / university
 *  - placeSub    small grey line under the place, e.g. a city or "Remote" (optional)
 *  - description one or two sentences
 *
 * Entries are laid out left → right on desktop (newest first) and top → bottom on mobile.
 */
export type ExperienceEntry = {
  badge?: string;
  date?: string;
  title: string;
  place: string;
  placeSub?: string;
  description: string;
  placeholder?: boolean;
};

export const experience = {
  heading: "Experience.",
  subheading: ["Current work.", "Back to the foundations."],
  entries: [
    {
      badge: "Current role",
      date: "[Month YYYY] – Present",
      title: "[Current role title]",
      place: "[Company name]",
      placeSub: "[Location]",
      description: "[Placeholder] Describe what you do in your current role in one or two sentences.",
      placeholder: true,
    },
    {
      badge: "Ongoing",
      title: "[Freelance or side work]",
      place: "[Client projects]",
      description: "[Placeholder] Describe the freelance or independent work you do.",
      placeholder: true,
    },
    {
      date: "[YYYY] – [YYYY]",
      title: "[Latest degree or course]",
      place: "[University or school]",
      description: "[Placeholder] Graduation date, grade or a highlight.",
      placeholder: true,
    },
    {
      date: "[Month YYYY] – [Month YYYY]",
      title: "[Earlier role or internship]",
      place: "[Company name]",
      placeSub: "[Location or Remote]",
      description: "[Placeholder] Describe what you worked on.",
      placeholder: true,
    },
    {
      date: "[YYYY] – [YYYY]",
      title: "[Earlier degree or course]",
      place: "[University or school]",
      description: "[Placeholder] Grade or a highlight.",
      placeholder: true,
    },
  ] satisfies ExperienceEntry[],
};
