import raw from "@/data/content.json";
import { liveLinks, projectOrder } from "@/data/site";

export type RawBlock = {
  type: string;
  text?: string;
  src?: string;
  alt?: string;
  href?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  liveUrl: string;
  image: string;
  subtitle: string;
  blocks: RawBlock[];
  related: { slug: string; title: string; subtitle: string; image: string }[];
};

const content = raw as Record<string, RawBlock[]>;

export function media(src: string) {
  const name = src.split("/").pop()?.split("?")[0] ?? "";
  return `/media/${name}`;
}

function paragraphs(blocks: RawBlock[]) {
  return blocks.filter((b) => b.type === "p" && b.text).map((b) => b.text!) ;
}

function parseProject(slug: string, subtitle: string): Omit<Project, "related"> & { relatedTitles: { title: string; subtitle: string; image: string }[] } {
  const blocks = content[slug] ?? [];
  const title = blocks.find((b) => b.type === "h1")?.text ?? slug;
  const texts = paragraphs(blocks);
  const yearIdx = texts.indexOf("Year");
  const category = texts[texts.indexOf("Category") + 1] ?? "";
  const year = texts[yearIdx + 1] ?? "";
  const summary = texts[yearIdx + 4] ?? "";
  const moreIdx = blocks.findIndex((b) => b.type === "h2" && b.text === "More Projects");
  const body = (moreIdx === -1 ? blocks : blocks.slice(0, moreIdx)).filter((b) => b.type !== "h1");
  const firstImage = body.find((b) => b.type === "img" && b.src);
  const relatedBlocks = moreIdx === -1 ? [] : blocks.slice(moreIdx + 1);
  const relatedTitles: { title: string; subtitle: string; image: string }[] = [];
  let pendingImage = "";
  for (const block of relatedBlocks) {
    if (block.type === "img" && block.src) pendingImage = media(block.src);
    if (block.type === "h3" && block.text) {
      relatedTitles.push({ title: block.text, subtitle: "", image: pendingImage });
      pendingImage = "";
    }
    if (block.type === "p" && block.text && relatedTitles.length && !relatedTitles[relatedTitles.length - 1].subtitle) {
      relatedTitles[relatedTitles.length - 1].subtitle = block.text;
    }
  }
  return {
    slug,
    title,
    category,
    year,
    summary,
    liveUrl: liveLinks[slug] ?? "#",
    image: firstImage?.src ? media(firstImage.src) : "",
    subtitle,
    blocks: body.filter((b) => !(b.type === "p" && ["Category", "Year", "Live Link", "/", category, year, summary].includes(b.text ?? ""))),
    relatedTitles,
  };
}

const subtitles: Record<string, string> = {
  damas: "Agency Framer Template",
  najm: "SaaS Framer Template",
  kavi: "AI Framer Template",
  sham: "Studio Framer Template",
  aiwings: "Generate Images & Videos in Your AI Agent",
  abjad: "AI Framer Template",
  fasselh: "Environmental Framer Template",
};

const projectDrafts = projectOrder.map((slug) => parseProject(slug, subtitles[slug] ?? ""));

const titleToSlug = Object.fromEntries(projectDrafts.map((p) => [p.title, p.slug]));

export const projects: Project[] = projectDrafts.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  year: p.year,
  summary: p.summary,
  liveUrl: p.liveUrl,
  image: p.image,
  subtitle: p.subtitle,
  blocks: p.blocks,
  related: p.relatedTitles.map((r) => ({
    slug: titleToSlug[r.title] ?? "",
    title: r.title,
    subtitle: r.subtitle,
    image: r.image,
  })),
}));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function isListItem(text: string) {
  if (text.length > 120) return false;
  if (/[.!?:…"”"]$/.test(text)) return false;
  if (text.length < 8) return false;
  return true;
}
