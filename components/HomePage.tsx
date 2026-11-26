"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";
import type { Post, Project } from "@/lib/content";
import { ArrowLink } from "./ArrowLink";
import { PostCard } from "./PostCard";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SocialIcon } from "./Icons";

function QuoteWords() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 35%"],
  });
  const words = site.quote.split(" ");

  return (
    <section ref={ref} className="relative h-[1350px]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-5">
        <p className="max-w-[980px] text-center text-[26px] font-medium leading-[1.28] tracking-[-0.03em] min-[810px]:text-[34px] min-[1280px]:text-[42px]">
          {words.map((word, i) => (
            <Word key={`${word}-${i}`} word={word} index={i} total={words.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = Math.min(1, start + 1.15 / total);
  const color = useTransform(progress, [start, end], ["rgba(17,17,17,0.22)", "rgb(17,17,17)"]);
  return (
    <motion.span style={{ color }} className="inline">
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

function Portrait({ wrap }: { wrap: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 0.34], [200, 360]);
  const height = useTransform(scrollYProgress, [0, 0.34], [228, 470]);
  const gray = useTransform(scrollYProgress, [0.05, 0.22], [1, 0]);
  const filter = useTransform(gray, (g) => `grayscale(${g})`);
  const opacity = useTransform(scrollYProgress, [0.58, 0.72], [1, 0]);

  return (
    <div className="pointer-events-none sticky top-[24vh] z-20 -mt-[38vh] mb-[-10vh] hidden h-[520px] items-start justify-center min-[1280px]:flex">
      <motion.img
        src={site.hero.portrait}
        alt="Portrait of Majd"
        style={{ width, height, filter, opacity }}
        className="rounded-[20px] object-cover"
      />
    </div>
  );
}

export function HomePage({ featured, thoughts }: { featured: Project[]; thoughts: Post[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  return (
    <main>
      <div ref={wrap}>
        <section id="hero-section" className="relative mx-auto flex min-h-[100svh] w-full max-w-page flex-col px-5 pb-10 pt-[200px] min-[810px]:px-12 min-[810px]:pt-28 min-[1280px]:px-0">
          <div className="relative mx-auto mt-6 w-full max-w-[1180px] min-[1280px]:mt-10">
            <img
              src={site.hero.star}
              alt=""
              className="pointer-events-none absolute -left-2 -top-8 w-[78px] min-[810px]:-left-2 min-[810px]:-top-10 min-[810px]:w-[110px] min-[1280px]:-left-4 min-[1280px]:-top-14 min-[1280px]:w-[140px]"
            />
            <img
              src={site.hero.bolt}
              alt=""
              className="pointer-events-none absolute -right-2 bottom-[-8px] w-[72px] min-[810px]:-right-4 min-[810px]:w-[130px] min-[1280px]:-right-8 min-[1280px]:bottom-[-18px] min-[1280px]:w-[170px]"
            />
            <h1 className="text-center text-[46px] font-extrabold leading-[0.9] tracking-[-0.02em] text-ink min-[810px]:text-[108px] min-[1280px]:text-[164px] min-[1440px]:text-[174px]">
              {site.hero.title[0]}
              <br />
              {site.hero.title[1]}
            </h1>
          </div>

          <div className="mt-8 flex justify-center min-[1280px]:hidden">
            <img
              src={site.hero.portrait}
              alt="Portrait of Majd"
              className="h-[210px] w-[188px] rounded-[20px] object-cover min-[810px]:h-[250px] min-[810px]:w-[220px]"
            />
          </div>
          <p className="mt-6 text-center text-[18px] tracking-[-0.04em] min-[1280px]:hidden">{site.hero.since}</p>

          <div className="hidden min-[1280px]:block min-[1280px]:flex-1" />
          <div className="mt-auto hidden items-end justify-between pt-8 min-[1280px]:flex">
            <p className="text-[68px] font-semibold leading-none tracking-[-0.02em]">{site.hero.year}</p>
            <p className="mr-36 text-[18px] tracking-[-0.04em]">{site.hero.since}</p>
          </div>
        </section>

        <Portrait wrap={wrap} />

        <section id="bio-section" className="mx-auto flex min-h-[100svh] w-full max-w-page flex-col justify-center px-5 py-24 min-[810px]:px-12 min-[1280px]:px-0">
          <div className="grid items-center gap-10 min-[1280px]:grid-cols-[1fr_400px_1fr] min-[1280px]:gap-8">
            <div>
              <h2 className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]">
                {site.bio.heading}
              </h2>
              <p className="mt-8 max-w-[340px] text-[22px] font-semibold leading-[1.4] tracking-[-0.04em] min-[1280px]:mt-16">
                {site.bio.lead}
              </p>
            </div>
            <div className="hidden min-[1280px]:block" aria-hidden />
            <div className="max-w-[360px] justify-self-end">
              {site.bio.paragraphs.map((p) => (
                <p key={p} className="mb-5 text-[18px] leading-[1.4] tracking-[-0.04em]">
                  {p}
                </p>
              ))}
              <div className="mt-2">
                <ArrowLink href={site.getStartedHref} external>
                  {site.bio.cta}
                </ArrowLink>
              </div>
            </div>
          </div>
        </section>
      </div>

      <QuoteWords />

      <section id="services" className="mx-auto w-full max-w-page px-5 py-8 min-[810px]:px-12 min-[1280px]:px-0">
        <Reveal>
          <h2 className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]">
            {site.services.heading}
          </h2>
        </Reveal>
        <div className="mt-12 border-t border-ink/10">
          {site.services.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex flex-col gap-3 border-b border-ink/10 py-8 min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between min-[810px]:py-10">
                <h3 className="text-[28px] font-medium leading-[1.2] tracking-[-0.02em] min-[810px]:text-[30px] min-[1280px]:text-[32px]">
                  {item.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[18px] tracking-[-0.04em] text-ink/50">
                  {item.tags.map((tag, idx) => (
                    <span key={tag} className="inline-flex items-center gap-3">
                      {idx > 0 && <span className="h-1 w-1 rounded-full bg-ink/70" />}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-page px-5 py-24 min-[810px]:px-12 min-[1280px]:px-0">
          <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-[520px] text-[46px] font-semibold leading-[1] tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]">
            Featured
            <br />
            Projects
          </h2>
          <div className="mb-2 min-[1280px]:mr-[150px]">
            <ArrowLink href={site.projectsSection.href}>{site.projectsSection.cta}</ArrowLink>
          </div>
        </div>
        <div className="mt-12 grid gap-x-4 gap-y-10 min-[810px]:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              href={`/work/${project.slug}`}
              image={project.image}
              title={project.title}
              subtitle={project.subtitle}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-page px-5 py-10 min-[810px]:px-12 min-[1280px]:px-0">
        <h2 className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]">
          {site.testimonials.heading}
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 min-[1280px]:grid-cols-4">
          {site.testimonials.items.map((item) => (
            <article key={item.name} className="group h-[340px] [perspective:1200px]">
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex flex-col justify-between rounded-card bg-ink p-5 text-cream [backface-visibility:hidden]">
                  <p className="text-[18px] leading-[1.4] tracking-[-0.04em]">{item.quote}</p>
                  <div className="flex items-center gap-3">
                    <img src={item.avatar} alt="" className="h-[46px] w-[46px] rounded-full object-cover" />
                    <div>
                      <p className="text-[16px] tracking-[-0.04em]">{item.name}</p>
                      <p className="text-[16px] font-light tracking-[-0.04em] text-cream/80">{item.role}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 grid place-items-center rounded-card bg-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <img src={item.logo} alt="" className="h-16 w-16 rounded-xl object-cover" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-page px-5 py-24 min-[810px]:px-12 min-[1280px]:px-0">
        <h2 className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]">
          {site.thoughts.heading}
        </h2>
        <div className="mt-12 grid gap-4 min-[810px]:grid-cols-2 min-[1280px]:grid-cols-3">
          {thoughts.slice(0, 2).map((post) => (
            <PostCard key={post.slug} href={`/blog/${post.slug}`} image={post.image} date={post.date} title={post.title} excerpt={post.blurb} />
          ))}
          <div className="flex min-h-[420px] flex-col justify-between rounded-card bg-[#1a1a1a] p-6 text-cream min-[810px]:col-span-2 min-[1280px]:col-span-1 min-[1280px]:min-h-[460px]">
            <p className="max-w-[340px] text-[32px] font-normal leading-[1.2] tracking-[-0.02em] min-[1280px]:text-[40px]">
              {site.thoughts.promo}
            </p>
            <ArrowLink href={site.thoughts.href} tone="light">
              {site.thoughts.cta}
            </ArrowLink>
          </div>
          {thoughts.slice(2, 3).map((post) => (
            <div key={post.slug} className="min-[1280px]:hidden">
              <PostCard href={`/blog/${post.slug}`} image={post.image} date={post.date} title={post.title} excerpt={post.blurb} />
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto grid w-full max-w-page items-start gap-12 px-5 py-20 min-[810px]:px-12 min-[1280px]:grid-cols-[minmax(0,640px)_minmax(0,484px)] min-[1280px]:justify-between min-[1280px]:px-0 min-[1280px]:py-28">
        <div className="flex min-h-[280px] flex-col min-[1280px]:min-h-[455px]">
          <h2 className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]">
            {site.contact.heading}
          </h2>
          <p className="mt-4 max-w-[520px] text-[18px] leading-[1.4] tracking-[-0.04em]">{site.contact.body}</p>
          <div className="mt-10 flex gap-3 min-[1280px]:mt-auto">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-[8px] bg-ink/10 text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                <SocialIcon name={social.label} />
              </a>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-[24px] bg-ink p-5 text-cream min-[810px]:p-6"
        >
          <label className="block text-[16px] tracking-[-0.04em]">
            {site.contact.fields.name}
            <input
              required
              name="name"
              placeholder={site.contact.fields.namePlaceholder}
              className="mt-2 h-12 w-full rounded-[12px] border border-cream/30 bg-transparent px-3 text-[16px] tracking-[-0.02em] text-cream outline-none placeholder:text-cream/50 focus:border-cream"
            />
          </label>
          <label className="mt-4 block text-[16px] tracking-[-0.04em]">
            {site.contact.fields.email}
            <input
              required
              type="email"
              name="email"
              placeholder={site.contact.fields.emailPlaceholder}
              className="mt-2 h-12 w-full rounded-[12px] border border-cream/30 bg-transparent px-3 text-[16px] tracking-[-0.02em] text-cream outline-none placeholder:text-cream/50 focus:border-cream"
            />
          </label>
          <label className="mt-4 block text-[16px] tracking-[-0.04em]">
            {site.contact.fields.project}
            <textarea
              required
              name="project"
              placeholder={site.contact.fields.projectPlaceholder}
              className="mt-2 min-h-[140px] w-full resize-y rounded-[12px] border border-cream/30 bg-transparent px-3 py-3 text-[16px] tracking-[-0.02em] text-cream outline-none placeholder:text-cream/50 focus:border-cream"
            />
          </label>
          <button
            type="submit"
            className="mt-4 h-11 w-full rounded-[8px] bg-cream text-[16px] tracking-[-0.02em] text-ink transition-colors hover:bg-white"
          >
            {sent ? "Sent" : site.contact.fields.submit}
          </button>
        </form>
      </section>
    </main>
  );
}

export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <header className="mx-auto w-full max-w-page px-5 pb-8 pt-36 min-[810px]:px-12 min-[1280px]:px-0 min-[1280px]:pt-40">
      <h1 className="max-w-[760px] whitespace-pre-line text-[48px] font-semibold leading-[0.95] tracking-[-0.03em] min-[810px]:text-[72px] min-[1280px]:text-[84px]">
        {title}
      </h1>
      <p className="mt-5 max-w-[460px] text-[16px] leading-[1.45] tracking-[-0.03em] text-ink/80">{description}</p>
    </header>
  );
}

export function NewsletterForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-[20px] bg-ink p-5 text-cream"
    >
      <p className="text-[20px] font-medium tracking-[-0.03em]">{site.newsletter.heading}</p>
      <p className="mt-1 text-[14px] tracking-[-0.02em] text-cream/70">{site.newsletter.body}</p>
      <input
        required
        type="email"
        placeholder={site.newsletter.placeholder}
        className="mt-4 h-11 w-full rounded-[12px] border border-cream/30 bg-transparent px-3 text-[15px] outline-none placeholder:text-cream/50 focus:border-cream"
      />
      <button type="submit" className="mt-3 h-11 w-full rounded-[8px] bg-cream text-[16px] text-ink hover:bg-white">
        {sent ? "Sent" : site.newsletter.submit}
      </button>
    </form>
  );
}
