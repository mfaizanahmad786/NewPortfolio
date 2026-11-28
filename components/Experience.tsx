"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { experience, type ExperienceEntry } from "@/data/experience";
import { BlurWords } from "./BlurWords";

/**
 * Experience roadmap, after the reference at aswinpanengal.me: stops hang off a wavy line that is
 * drawn in ink over a dashed base when the section scrolls into view. Five columns on desktop with
 * alternating drops, a single column with a vertical wave below 1001px.
 */

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Point = { x: number; y: number };

/** Smooth cubic through each marker: horizontal control points on desktop, side bows when stacked. */
function roadPath(points: Point[]) {
  if (points.length < 2) return "";
  const vertical = Math.abs(points[points.length - 1].x - points[0].x) < 20;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (vertical) {
      const my = (a.y + b.y) / 2;
      d += ` C ${a.x + 28} ${my}, ${a.x - 20} ${my}, ${b.x} ${b.y}`;
    } else {
      const mx = (a.x + b.x) / 2;
      d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    }
  }
  return d;
}

function Stop({
  entry,
  index,
  now,
  markerRef,
}: {
  entry: ExperienceEntry;
  index: number;
  now: boolean;
  markerRef: (node: HTMLSpanElement | null) => void;
}) {
  // Desktop: the first stop sits on the top rail; later ones alternate low / high.
  const drop = index === 0 ? "" : index % 2 === 1 ? "min-[1001px]:pt-[100px]" : "min-[1001px]:pt-5";
  return (
    <article
      className={`journey-stop relative min-w-0 grid grid-cols-[38px_minmax(0,1fr)] gap-5 min-[701px]:gap-6 min-[1001px]:block ${drop}`}
      aria-label={entry.title.replace(/\n/g, " ")}
    >
      <span
        ref={markerRef}
        className={`journey-marker grid h-[38px] w-[38px] place-items-center rounded-full border min-[1001px]:mx-auto min-[1001px]:mb-9 ${
          now ? "border-accent bg-accent" : "border-ink bg-cream"
        }`}
        data-now={now ? "true" : undefined}
        aria-hidden="true"
      >
        <span className={`h-[10px] w-[10px] rounded-full ${now ? "bg-cream" : "bg-ink"}`} />
      </span>
      <motion.div
        className="relative bg-cream pt-1 min-[1001px]:pt-0"
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-4 flex min-h-7 flex-wrap items-center gap-2 text-[13px] leading-[1.5] text-ink/60 min-[1001px]:mb-[18px] min-[1001px]:gap-3">
          {entry.badge ? (
            <span className={`rounded-[4px] px-[9px] ${now ? "bg-accent" : "bg-ink"} py-1.5 text-[11px] font-medium leading-[1.4] text-cream`}>
              {entry.badge}
            </span>
          ) : null}
          {entry.date}
        </p>
        <h3 className="mb-[22px] whitespace-pre-line text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] min-[701px]:text-[24px] min-[1101px]:text-[clamp(22px,1.9vw,28px)]">
          {entry.title}
        </h3>
        <p className="mb-4 text-[18px] font-medium leading-normal min-[701px]:text-[16px] min-[1101px]:text-[18px]">
          {entry.place}
          {entry.placeSub ? (
            <span className="mt-1 block text-[14px] font-normal text-ink/60">{entry.placeSub}</span>
          ) : null}
        </p>
        <p className="text-[15px] leading-[1.65] text-ink/60">{entry.description}</p>
      </motion.div>
    </article>
  );
}

export function Experience() {
  const roadmap = useRef<HTMLDivElement>(null);
  const markers = useRef<(HTMLSpanElement | null)[]>([]);
  const [path, setPath] = useState("");
  const inView = useInView(roadmap, { once: true, amount: 0.25 });
  const drawn = inView && path !== "";

  useIsoLayoutEffect(() => {
    const el = roadmap.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const points = markers.current
        .filter((m): m is HTMLSpanElement => Boolean(m))
        .map((m) => {
          const r = m.getBoundingClientRect();
          return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
        });
      setPath(roadPath(points));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section id="experience" className="mx-auto w-full max-w-page px-5 pb-20 pt-[76px] min-[701px]:pt-[100px] min-[810px]:px-12 min-[1280px]:px-0">
      <div className="flex flex-col items-start gap-5 min-[701px]:flex-row min-[701px]:items-end min-[701px]:justify-between min-[701px]:gap-8">
        <BlurWords
          as="h2"
          text={experience.heading}
          className="text-[46px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[62px] min-[1280px]:text-[76px]"
        />
        <p className="m-0 text-[17px] leading-normal text-ink/60 min-[701px]:text-[18px]">
          {experience.subheading.map((line, i) => (
            <span key={line}>
              {line}
              {i < experience.subheading.length - 1 ? <br className="hidden min-[701px]:inline" /> : null}
              {i < experience.subheading.length - 1 ? <span className="min-[701px]:hidden"> </span> : null}
            </span>
          ))}
        </p>
      </div>

      <div
        ref={roadmap}
        data-drawn={drawn ? "true" : "false"}
        className="journey-roadmap relative mt-10 grid grid-cols-1 gap-11 min-[701px]:mt-16 min-[1001px]:grid-cols-5 min-[1001px]:gap-6 min-[1001px]:pt-6 min-[1101px]:gap-7"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <path className="journey-road-base" d={path} />
          <path className="journey-road-ink" d={path} pathLength={1} />
        </svg>
        {experience.entries.map((entry, i) => (
          <Stop
            key={`${entry.title}-${i}`}
            entry={entry}
            index={i}
            now={i === experience.entries.length - 1}
            markerRef={(node) => {
              markers.current[i] = node;
            }}
          />
        ))}
      </div>
    </section>
  );
}
