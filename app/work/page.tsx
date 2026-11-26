import type { Metadata } from "next";
import { PageIntro } from "@/components/HomePage";
import { ProjectCard } from "@/components/ProjectCard";
import { site } from "@/data/site";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: site.workPage.title };

export default function WorkPage() {
  const title = site.workPage.title.replace("Creations", "\nCreations");
  return (
    <main>
      <PageIntro title={title} description={site.workPage.description} />
      <section className="mx-auto grid w-full max-w-page gap-x-5 gap-y-12 px-5 pb-28 min-[810px]:grid-cols-2 min-[810px]:px-12 min-[1280px]:px-0">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            href={`/work/${project.slug}`}
            image={project.image}
            title={project.title}
            subtitle={project.subtitle}
          />
        ))}
      </section>
    </main>
  );
}
