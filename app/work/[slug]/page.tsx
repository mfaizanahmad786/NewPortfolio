import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
import { RichText } from "@/components/RichText";
import { site } from "@/data/site";
import { getProject, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Work" };
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-prose px-5 pb-28 pt-36 min-[810px]:px-10 min-[1280px]:pt-40">
      <h1 className="text-[56px] font-semibold leading-none tracking-[-0.03em] min-[810px]:text-[76px]">{project.title}</h1>
      <div className="mt-10 flex flex-col gap-8 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:justify-between">
        <div>
          <div className="flex gap-10 text-[13px] tracking-[-0.02em] text-ink/45">
            <span className="w-40">Category</span>
            <span>Year</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[16px] tracking-[-0.02em]">
            <span className="w-40">{project.category}</span>
            <span className="text-ink/35">/</span>
            <span>{project.year}</span>
            <span className="text-ink/35">/</span>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-70">
              Live Link
              <span className="grid h-7 w-7 place-items-center rounded-[8px] border border-ink">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
        <p className="max-w-[420px] text-[16px] leading-[1.5] tracking-[-0.02em]">{project.summary}</p>
      </div>
      <div className="mt-12">
        <RichText blocks={project.blocks} wide />
      </div>
      {project.related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-[40px] font-semibold tracking-[-0.03em]">{site.moreProjects}</h2>
          <div className="mt-8 grid gap-6 min-[810px]:grid-cols-2">
            {project.related.map((item) => (
              <ProjectCard
                key={item.title}
                href={item.slug ? `/work/${item.slug}` : "/work"}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                imageClass="aspect-[16/11]"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
