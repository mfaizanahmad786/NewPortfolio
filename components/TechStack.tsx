"use client";

import { MotionConfig } from "framer-motion";
import { stack, type StackGroup, type StackItem } from "@/data/stack";
import { brandIcons } from "@/data/stack-icons";
import { AgentsVisual, CodeVisual, PipelineVisual, RowsVisual } from "./StackVisuals";
import { BlurWords } from "./BlurWords";
import { Reveal } from "./Reveal";

/**
 * Tech Stack bento. Light cards with ink outlines, a purple spotlight that follows the cursor along
 * the card border, and tiny live visuals in the bigger cards. All content lives in data/stack.ts.
 */

const spans: Record<StackGroup["size"], string> = {
  xl: "min-[600px]:col-span-2 min-[1000px]:row-span-2",
  wide: "min-[600px]:col-span-2",
  tall: "min-[600px]:col-span-2 min-[1000px]:col-span-1 min-[1000px]:row-span-2",
  sm: "",
};

/** Brands whose colour is basically black fall back to the purple accent on hover. */
function hoverColour(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum < 0.2 ? "var(--accent)" : hex;
}

function Chip({ item }: { item: StackItem }) {
  const icon = item.icon ? brandIcons[item.icon] : undefined;
  return (
    <li
      className="stack-chip inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-3 py-1.5 text-[14px] leading-none tracking-[-0.02em]"
      style={{ ["--brand" as string]: icon ? hoverColour(icon.hex) : "var(--accent)" }}
    >
      {icon && (
        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0" fill="currentColor" aria-hidden="true">
          <path d={icon.path} />
        </svg>
      )}
      <span>{item.name}</span>
    </li>
  );
}

function Card({ group }: { group: StackGroup }) {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const chips = (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {group.items.map((item) => (
        <Chip key={item.name} item={item} />
      ))}
    </ul>
  );

  const head = (
    <header>
      <h3 className="m-0 text-[22px] font-semibold leading-[1.1] tracking-[-0.03em] min-[1280px]:text-[24px]">{group.title}</h3>
      <p className="m-0 mt-1.5 max-w-[34ch] text-[14.5px] leading-[1.4] tracking-[-0.01em] text-ink/55">{group.blurb}</p>
    </header>
  );

  let body: React.ReactNode;
  switch (group.visual) {
    case "agents":
      body = (
        <>
          {head}
          <AgentsVisual />
          {chips}
        </>
      );
      break;
    case "code":
      body = (
        <div className="flex h-full flex-col gap-5 min-[600px]:flex-row min-[600px]:gap-6">
          <div className="flex min-w-0 flex-col justify-between gap-5 min-[600px]:w-[46%]">
            {head}
            {chips}
          </div>
          <div className="min-w-0 min-[600px]:flex-1">
            <CodeVisual />
          </div>
        </div>
      );
      break;
    case "pipeline":
      body = (
        <>
          {head}
          <PipelineVisual />
          {chips}
        </>
      );
      break;
    case "rows":
      body = (
        <div className="flex h-full flex-col gap-5 min-[600px]:flex-row min-[600px]:gap-6">
          <div className="flex min-w-0 flex-col justify-between gap-5 min-[600px]:w-[54%]">
            {head}
            {chips}
          </div>
          <div className="min-w-0 min-[600px]:flex-1">
            <RowsVisual />
          </div>
        </div>
      );
      break;
    default: {
      const watermark = group.id === "mobile" ? brandIcons.react : undefined;
      body = (
        <>
          {head}
          {chips}
          {watermark && (
            <svg viewBox="0 0 24 24" className="stack-watermark pointer-events-none absolute -bottom-5 -right-4 h-28 w-28" fill="currentColor" aria-hidden="true">
              <path d={watermark.path} />
            </svg>
          )}
        </>
      );
    }
  }

  const stacked = group.visual === "code" || group.visual === "rows";

  return (
    <article
      onPointerMove={onMove}
      aria-label={group.title}
      className="stack-card relative h-full overflow-hidden rounded-card border border-ink/15 p-5 min-[1280px]:p-6"
    >
      <div className="relative z-[1] h-full">
        {stacked ? (
          body
        ) : (
          <div className="flex h-full flex-col justify-between gap-5">{body}</div>
        )}
      </div>
    </article>
  );
}

export function TechStack() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="stack"
        className="mx-auto w-full max-w-page px-5 pb-12 pt-[76px] min-[701px]:pt-[100px] min-[810px]:px-12 min-[1280px]:px-0"
      >
        <div className="flex flex-col items-start gap-5 min-[701px]:flex-row min-[701px]:items-end min-[701px]:justify-between min-[701px]:gap-8">
          <BlurWords
            as="h2"
            text={stack.heading}
            className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]"
          />
          <p className="m-0 text-[17px] leading-normal text-ink/60 min-[701px]:text-[18px]">
            {stack.subheading.map((line, i) => (
              <span key={line}>
                {line}
                {i < stack.subheading.length - 1 ? <br className="hidden min-[701px]:inline" /> : null}
                {i < stack.subheading.length - 1 ? <span className="min-[701px]:hidden"> </span> : null}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-10 grid grid-flow-dense grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[701px]:mt-14 min-[1000px]:auto-rows-[224px] min-[1000px]:grid-cols-4">
          {stack.groups.map((group, i) => (
            <Reveal key={group.id} delay={0.06 * i} className={`min-w-0 ${spans[group.size]}`}>
              <Card group={group} />
            </Reveal>
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
