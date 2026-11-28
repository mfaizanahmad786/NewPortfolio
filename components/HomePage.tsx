"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";
import type { Project } from "@/lib/content";
import { ArrowLink } from "./ArrowLink";
import { BlurWords } from "./BlurWords";
import { Experience } from "./Experience";
import { ProjectCard } from "./ProjectCard";
import { TechStack } from "./TechStack";
import { SocialIcon } from "./Icons";
import { WaveLink } from "./WaveLink";

/**
 * The hero portrait flips from black and white to this state as it lands in the intro.
 * The reference keeps the portrait grayscale; set to true to land in colour instead.
 */
const LANDS_IN_COLOR = false;

function PortraitFaces({
  rotateFront,
  rotateBack,
  scale,
  y,
  className,
}: {
  rotateFront: number | ReturnType<typeof useTransform<number, number>>;
  rotateBack: number | ReturnType<typeof useTransform<number, number>>;
  scale?: number | ReturnType<typeof useTransform<number, number>>;
  y?: number | ReturnType<typeof useTransform<number, number>>;
  className: string;
}) {
  return (
    <div className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={{ rotateY: rotateBack, scale, y, filter: LANDS_IN_COLOR ? "none" : "grayscale(1)" }}
        className="absolute inset-0 overflow-hidden rounded-[16px] [backface-visibility:hidden] [transform-style:preserve-3d]"
      >
        <img src={site.hero.portrait} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        style={{ rotateY: rotateFront, scale, y, filter: "grayscale(1)" }}
        className="absolute inset-0 overflow-hidden rounded-[16px] [backface-visibility:hidden] [transform-style:preserve-3d]"
      >
        <img src={site.hero.portrait} alt="Portrait of Faizan" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
}

function ScrollPortrait() {
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (value) => {
    const vh = typeof window === "undefined" ? 900 : window.innerHeight;
    return Math.min(1, Math.max(0, value / vh));
  });
  const scale = useTransform(progress, [0, 1], [0.5, 1]);
  const y = useTransform(progress, [0, 1], [114, 0]);
  const rotateFront = useTransform(progress, [0, 1], [0, 180]);
  const rotateBack = useTransform(progress, [0, 1], [180, 360]);

  return (
    <div className="pointer-events-none sticky top-0 z-20 flex h-screen items-end justify-center pb-5">
      <PortraitFaces
        rotateFront={rotateFront}
        rotateBack={rotateBack}
        scale={scale}
        y={y}
        className="relative h-[429px] w-[373px]"
      />
    </div>
  );
}

function MountPortrait() {
  return (
    <div className="relative mx-auto h-[220px] w-[196px] min-[810px]:h-[250px] min-[810px]:w-[220px]" style={{ perspective: 1200 }}>
      <motion.div
        className={`absolute inset-0 overflow-hidden rounded-[16px] [backface-visibility:hidden] ${LANDS_IN_COLOR ? "" : "grayscale"}`}
        initial={{ rotateY: -180 }}
        animate={{ rotateY: 0 }}
        transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 2 }}
      >
        <img src={site.hero.portrait} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[16px] grayscale [backface-visibility:hidden]"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 180 }}
        transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 2 }}
      >
        <img src={site.hero.portrait} alt="Portrait of Faizan" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
}

function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part))}
    </>
  );
}

/** Left column of the intro: greeting, title, divider and current role. */
function IntroText() {
  const { bio } = site;
  return (
    <div className="flex flex-col gap-6 min-[1280px]:gap-8">
      <h2 className="text-[56px] font-bold leading-[0.98] tracking-[-0.04em] min-[810px]:text-[72px] min-[1280px]:text-[88px]">
        {bio.greeting.map((line, i) => (
          <span key={line} className={`block whitespace-nowrap ${i === bio.greeting.length - 1 ? "text-accent" : ""}`}>
            {line}
          </span>
        ))}
      </h2>
      <p className="text-[28px] font-bold leading-[1.15] tracking-[-0.01em] min-[810px]:text-[24px] min-[1280px]:text-[31.68px]">
        {bio.role.split("& Full-Stack").flatMap((part, i, all) =>
          i < all.length - 1
            ? [part, <span key={i} className="whitespace-nowrap">& Full-Stack</span>]
            : [part],
        )}
      </p>
      <div className="border-t border-ink/15 pt-6">
        <span className="mb-2.5 block text-[14px] font-medium leading-[1.6] text-ink/60">{bio.currentLabel}</span>
        <p className="text-[18px] font-medium leading-[1.5] tracking-[-0.02em]">
          <strong className="font-bold">{bio.company}</strong>
          <br />
          {bio.position}
          <br />
          <span className="font-normal text-ink/50">{bio.location}</span>
        </p>
      </div>
    </div>
  );
}

/** Right column of the intro: tagline and the projects button. */
function IntroTagline() {
  const { bio } = site;
  return (
    <div className="flex flex-col gap-7">
      <p className="text-[28px] font-medium leading-[1.3] tracking-[-0.02em] min-[810px]:text-[28px] min-[1280px]:text-[30px]">
        <Bold text={bio.tagline} />
      </p>
      <div>
        <WaveLink
          href={bio.ctaHref}
          label={bio.cta}
          className="inline-flex items-center gap-3 rounded-[6px] border border-ink bg-ink p-[14px] text-[16px] font-semibold leading-[1.3] tracking-[-0.02em] text-cream transition-colors duration-200 hover:border-accent hover:bg-accent"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
            <path d="M6.5 13.5l7-7M7.5 6.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </WaveLink>
      </div>
    </div>
  );
}

export function HomePage({ featured }: { featured: Project[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  return (
    <main>
      <div ref={stage} className="relative hidden h-[200vh] overflow-x-clip min-[1280px]:block">
        <ScrollPortrait />
        <div className="absolute inset-0">
          <section id="hero-section" className="mx-auto flex h-screen w-full max-w-[1180px] flex-col px-0 pb-10 pt-[293px]">
            <div className="relative w-full">
              <motion.img
                src={site.hero.star}
                alt=""
                initial={{ opacity: 0.001, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 1.4 }}
                className="pointer-events-none absolute -left-4 -top-14 w-[140px]"
              />
              <motion.img
                src={site.hero.bolt}
                alt=""
                initial={{ opacity: 0.001, y: 10, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 16 }}
                transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 1.4 }}
                className="pointer-events-none absolute -right-8 bottom-[-18px] w-[170px]"
              />
              <h1 className="text-center text-[174px] font-extrabold leading-[0.9] tracking-[-0.02em] text-ink">
                <BlurWords text={site.hero.title[0]} trigger="mount" blur={2} duration={2.8} delay={0.25} />
                <br />
                <BlurWords text={site.hero.title[1]} trigger="mount" blur={2} duration={2.8} delay={0.4} />
              </h1>
            </div>
            <div className="mt-auto flex items-end justify-between pt-8">
              <p className="text-[68px] font-semibold leading-none tracking-[-0.02em]">{site.hero.year}</p>
            </div>
          </section>
          <section id="bio-section" className="mx-auto h-screen w-full max-w-[1180px]">
            <div
              className="grid h-[462px] grid-cols-[339px_373px_373px] items-center gap-[47.5px]"
              style={{ marginTop: "calc(100vh - 466px)" }}
            >
              <IntroText />
              <div aria-hidden />
              <IntroTagline />
            </div>
          </section>
        </div>
      </div>

      <div className="min-[1280px]:hidden">
        <section id="hero-section" className="relative mx-auto flex min-h-[100svh] w-full max-w-page flex-col px-5 pb-10 pt-[200px] min-[810px]:px-12 min-[810px]:pt-28">
          <div className="relative mx-auto mt-8 w-full max-w-[1180px] min-[810px]:mt-10 min-[1280px]:mt-[181px]">
            <motion.img
              src={site.hero.star}
              alt=""
              initial={{ opacity: 0.001, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 1.4 }}
              className="pointer-events-none absolute -left-2 -top-8 w-[78px] min-[810px]:-left-2 min-[810px]:-top-10 min-[810px]:w-[110px] min-[1280px]:-left-4 min-[1280px]:-top-14 min-[1280px]:w-[140px]"
            />
            <motion.img
              src={site.hero.bolt}
              alt=""
              initial={{ opacity: 0.001, y: 10, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 16 }}
              transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 1.4 }}
              className="pointer-events-none absolute -right-2 bottom-[-8px] w-[72px] min-[810px]:-right-4 min-[810px]:w-[130px] min-[1280px]:-right-8 min-[1280px]:bottom-[-18px] min-[1280px]:w-[170px]"
            />
            <h1 className="text-center text-[46px] font-extrabold leading-[0.9] tracking-[-0.02em] text-ink min-[810px]:text-[120px] min-[1280px]:text-[174px]">
              <BlurWords text={site.hero.title[0]} trigger="mount" blur={2} duration={2.8} delay={0.25} />
              <br />
              <BlurWords text={site.hero.title[1]} trigger="mount" blur={2} duration={2.8} delay={0.4} />
            </h1>
          </div>

          <div className="mt-8 min-[1280px]:hidden">
            <MountPortrait />
          </div>

          <div className="hidden min-[1280px]:block min-[1280px]:flex-1" />
          <div className="mt-auto hidden items-end justify-between pt-8 min-[1280px]:flex">
            <p className="text-[68px] font-semibold leading-none tracking-[-0.02em]">{site.hero.year}</p>
          </div>
        </section>

        <section id="bio-section" className="mx-auto w-full max-w-page px-5 pb-20 pt-24 min-[810px]:px-12 min-[810px]:pb-24 min-[810px]:pt-[180px]">
          <div className="grid gap-10 min-[810px]:grid-cols-2">
            <figure className="m-0 aspect-[342/393] w-full overflow-hidden rounded-[16px] min-[810px]:order-2 min-[810px]:self-start">
              <img src={site.hero.portrait} alt="Portrait of Faizan" className="h-full w-full object-cover grayscale" />
            </figure>
            <div className="flex flex-col gap-10 min-[810px]:order-1">
              <IntroText />
              <IntroTagline />
            </div>
          </div>
        </section>
      </div>

      <TechStack />

      <section id="services" className="mx-auto w-full max-w-page px-5 py-8 min-[810px]:px-12 min-[1280px]:px-0">
        <BlurWords
          as="h2"
          text={site.services.heading}
          className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]"
        />
        <div className="mt-12 border-t border-ink/10">
          {site.services.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 border-b border-ink/10 py-8 min-[810px]:flex-row min-[810px]:items-start min-[810px]:justify-between min-[810px]:gap-10 min-[810px]:py-10"
            >
              <BlurWords
                as="h3"
                text={item.title}
                className="text-[28px] font-medium leading-[1.2] tracking-[-0.02em] min-[810px]:max-w-[46%] min-[810px]:text-[30px] min-[1280px]:text-[32px]"
              />
              <div className="flex flex-col gap-3 min-[810px]:w-[46%] min-[810px]:shrink-0 min-[1280px]:w-[44%]">
                <BlurWords
                  as="p"
                  text={item.description}
                  className="text-[18px] leading-[1.45] tracking-[-0.02em] text-ink/80"
                  duration={1.4}
                  blur={6}
                />
                <BlurWords text={item.tags.join("  ·  ")} className="text-[15px] tracking-[-0.03em] text-ink/45" duration={1.4} blur={6} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Experience />

      <section id="projects" className="mx-auto w-full max-w-page px-5 py-24 min-[810px]:px-12 min-[1280px]:px-0">
          <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-[520px] text-[46px] font-semibold leading-[1] tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]">
            <BlurWords text="Featured" />
            <br />
            <BlurWords text="Projects" delay={0.12} />
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
        <BlurWords
          as="h2"
          text={site.testimonials.heading}
          className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 min-[1280px]:grid-cols-4">
          {site.testimonials.items.map((item) => (
            <article key={item.name} className="group h-[340px] [perspective:1200px]">
              <motion.div
                className="relative h-full w-full [transform-style:preserve-3d]"
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 180 }}
                transition={{ type: "spring", bounce: 0.2, duration: 1.6 }}
              >
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
              </motion.div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto grid w-full max-w-page items-start gap-12 px-5 py-20 min-[810px]:px-12 min-[1280px]:grid-cols-[minmax(0,640px)_minmax(0,484px)] min-[1280px]:justify-between min-[1280px]:px-0 min-[1280px]:py-28">
        <div className="flex min-h-[280px] flex-col min-[1280px]:min-h-[455px]">
          <BlurWords
            as="h2"
            text={site.contact.heading}
            className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]"
          />
          <p className="mt-4 max-w-[520px] text-[18px] leading-[1.4] tracking-[-0.04em]">{site.contact.body}</p>
          <div className="mt-10 flex gap-3 min-[1280px]:mt-auto">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-[8px] bg-ink/10 text-ink transition-colors hover:bg-accent hover:text-cream"
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
            className="mt-4 h-11 w-full rounded-[8px] bg-cream text-[16px] tracking-[-0.02em] text-ink transition-colors hover:bg-accent hover:text-cream"
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
