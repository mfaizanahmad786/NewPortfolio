import raw from "@/data/content.json";
import { liveLinks, postBlurbs, postOrder, projectOrder } from "@/data/site";

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

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  blurb: string;
  date: string;
  readTime: string;
  image: string;
  blocks: RawBlock[];
  related: { slug: string; title: string; excerpt: string; date: string; image: string }[];
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

function parsePost(slug: string): Omit<Post, "related"> & { relatedTitles: { title: string; excerpt: string; date: string; image: string }[] } {
  const blocks = content[slug] ?? [];
  const title = blocks.find((b) => b.type === "h1")?.text ?? slug;
  const texts = paragraphs(blocks);
  const excerpt = texts[0] ?? "";
  const date = texts[1] ?? "";
  const readTime = texts[2] ?? "";
  const moreIdx = blocks.findIndex((b) => b.type === "h2" && b.text === "More Articles");
  const pre = moreIdx === -1 ? blocks : blocks.slice(0, moreIdx);
  const hero = pre.find((b) => b.type === "img" && b.src);
  const skip = new Set([excerpt, date, readTime, "Be the first to read our articles.", "Submit", "Join the newsletter"]);
  const body = pre.filter((b) => {
    if (b.type === "h1") return false;
    if (b.type === "img" && b.src === hero?.src) return false;
    if (b.type === "p" && skip.has(b.text ?? "")) return false;
    return true;
  });
  const relatedBlocks = moreIdx === -1 ? [] : blocks.slice(moreIdx + 1);
  const relatedTitles: { title: string; excerpt: string; date: string; image: string }[] = [];
  let image = "";
  let dateBuf = "";
  for (const block of relatedBlocks) {
    if (block.type === "img" && block.src) image = media(block.src);
    if (block.type === "p" && block.text && /\d{4}/.test(block.text) && block.text.length < 24) dateBuf = block.text;
    if (block.type === "h3" && block.text) {
      if (!relatedTitles.some((r) => r.title === block.text)) {
        relatedTitles.push({ title: block.text, excerpt: "", date: dateBuf, image });
      }
    }
    if (block.type === "p" && block.text && relatedTitles.length) {
      const last = relatedTitles[relatedTitles.length - 1];
      if (!last.excerpt && block.text !== last.date) last.excerpt = block.text;
    }
  }
  return {
    slug,
    title,
    excerpt,
    blurb: postBlurbs[slug] ?? excerpt,
    date,
    readTime,
    image: hero?.src ? media(hero.src) : "",
    blocks: body,
    relatedTitles,
  };
}

const postDrafts = postOrder.map((slug) => parsePost(slug));
const postTitleToSlug = Object.fromEntries(postDrafts.map((p) => [p.title, p.slug]));

export const posts: Post[] = postDrafts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    blurb: p.blurb,
    date: p.date,
  readTime: p.readTime,
  image: p.image,
  blocks: p.blocks,
  related: p.relatedTitles
    .map((r) => {
      const match = postDrafts.find((d) => d.title === r.title);
      return {
        slug: postTitleToSlug[r.title] ?? "",
        title: r.title,
        excerpt: match?.blurb || r.excerpt || "",
        date: r.date || match?.date || "",
        image: r.image || match?.image || "",
      };
    })
    .filter((r) => r.slug),
}));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function isListItem(text: string) {
  if (text.length > 120) return false;
  if (/[.!?:…"”"]$/.test(text)) return false;
  if (text.length < 8) return false;
  return true;
}
