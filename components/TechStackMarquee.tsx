"use client";

import { useEffect, useMemo, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stack, type MarqueeRow, type StackGroup, type StackItem } from "@/data/stack";
import { brandIcons } from "@/data/stack-icons";
import { BlurWords } from "./BlurWords";
import { Reveal } from "./Reveal";

/**
 * Tech Stack as an infinite logo marquee: three full-width rows of tiles that scroll in alternating
 * directions at slightly different speeds. Content lives in data/stack.ts.
 *
 * - The loop is a compositor-driven Web Animation on `transform` over two copies of each row.
 * - Hovering a row eases its playbackRate down to a crawl instead of pausing it.
 * - Rows pause while off screen; with prefers-reduced-motion they render as static, wrapped rows.
 */

const SLOW = 0.12; // playbackRate while a row is hovered
const MIN_GROUP_WIDTH = 2700; // one copy must be wider than any realistic viewport so the loop never shows a gap
const EST_TILE = 175; // rough tile width + gap, only used to decide how many times to repeat a row's items

type Tile = { item: StackItem; key: string };

/** Brands whose colour is basically black fall back to the purple accent on hover. */
function hoverColour(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum < 0.2 ? "var(--accent)" : hex;
}

function TileView({ item, interactive }: { item: StackItem; interactive: boolean }) {
  const icon = item.icon ? brandIcons[item.icon] : undefined;
  return (
    <li
      className="marquee-tile group relative shrink-0"
      style={{ ["--brand" as string]: icon ? hoverColour(icon.hex) : "var(--accent)" }}
      tabIndex={interactive ? 0 : undefined}
      aria-hidden={interactive ? undefined : true}
    >
      <span className="marquee-tile-face flex items-center gap-2.5 rounded-[16px] border border-ink/15 bg-white/55 px-4 py-2.5 text-[15px] font-medium leading-none tracking-[-0.02em] min-[810px]:gap-3 min-[810px]:px-5 min-[810px]:py-3.5 min-[810px]:text-[18px]">
        {icon ? (
          <svg viewBox="0 0 24 24" className="marquee-icon h-[18px] w-[18px] shrink-0 min-[810px]:h-[24px] min-[810px]:w-[24px]" fill="currentColor" aria-hidden="true">
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="marquee-icon grid h-[18px] w-[18px] shrink-0 place-items-center min-[810px]:h-[24px] min-[810px]:w-[24px]" aria-hidden="true">
            <i className="block h-[9px] w-[9px] rounded-full border-[1.6px] border-current min-[810px]:h-[11px] min-[810px]:w-[11px]" />
          </span>
        )}
        <span className="whitespace-nowrap">{item.name}</span>
      </span>
      {item.use && (
        <span role="tooltip" className="marquee-tip" aria-hidden={interactive ? undefined : true}>
          <strong>{item.name}</strong>
          <span>{item.use}</span>
        </span>
      )}
    </li>
  );
}

function MarqueeRowView({ row, items, reduced }: { row: MarqueeRow; items: StackItem[]; reduced: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const inView = useInView(viewport, { margin: "200px 0px" });
  const anim = useRef<Animation | null>(null);
  const hovered = useRef(false);
  const raf = useRef(0);

  const repeats = Math.max(1, Math.ceil(MIN_GROUP_WIDTH / (items.length * EST_TILE)));
  const tiles = useMemo<Tile[]>(
    () => Array.from({ length: repeats }, (_, r) => items.map((item) => ({ item, key: `${r}-${item.name}` }))).flat(),
    [items, repeats],
  );

  // Build the animation once the track is measured; rebuild when its width changes.
  useEffect(() => {
    const el = track.current;
    if (!el || reduced || typeof el.animate !== "function") return;
    let width = 0;
    const build = () => {
      const half = el.scrollWidth / 2;
      if (!half || Math.abs(half - width) < 1) return;
      width = half;
      const prev = anim.current;
      const progress = prev && prev.effect?.getComputedTiming().progress;
      prev?.cancel();
      const a = el.animate(
        { transform: ["translate3d(0,0,0)", "translate3d(-50%,0,0)"] },
        {
          duration: (half / row.speed) * 1000,
          iterations: Infinity,
          easing: "linear",
          direction: row.direction === "left" ? "normal" : "reverse",
        },
      );
      if (typeof progress === "number") a.currentTime = progress * (half / row.speed) * 1000;
      a.playbackRate = hovered.current ? SLOW : 1;
      anim.current = a;
      if (!inViewRef.current) a.pause();
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    document.fonts?.ready.then(build);
    return () => {
      ro.disconnect();
      anim.current?.cancel();
      anim.current = null;
      cancelAnimationFrame(raf.current);
    };
  }, [reduced, row.speed, row.direction, tiles]);

  const inViewRef = useRef(inView);
  useEffect(() => {
    inViewRef.current = inView;
    const a = anim.current;
    if (!a) return;
    if (inView) a.play();
    else a.pause();
  }, [inView]);

  /** Ease the playback rate toward its target so slowing down and speeding up are smooth. */
  const easeTo = (target: number) => {
    hovered.current = target < 1;
    cancelAnimationFrame(raf.current);
    const step = () => {
      const a = anim.current;
      if (!a) return;
      const next = a.playbackRate + (target - a.playbackRate) * 0.09;
      if (Math.abs(next - target) < 0.004) {
        a.playbackRate = target;
        return;
      }
      a.playbackRate = next;
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  const label = (
    <p className="m-0 mb-3 px-5 text-[13px] font-medium uppercase leading-none tracking-[0.08em] text-ink/45 min-[810px]:px-12 min-[1280px]:mx-auto min-[1280px]:max-w-page min-[1280px]:px-0">
      {row.label}
    </p>
  );

  if (reduced) {
    return (
      <div className="mx-auto w-full max-w-page px-5 min-[810px]:px-12 min-[1280px]:px-0">
        <p className="m-0 mb-3 text-[13px] font-medium uppercase leading-none tracking-[0.08em] text-ink/45">{row.label}</p>
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {items.map((item) => (
            <TileView key={item.name} item={item} interactive />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {label}
      <div
        ref={viewport}
        className="marquee-row relative"
        onPointerEnter={(e) => e.pointerType === "mouse" && easeTo(SLOW)}
        onPointerLeave={(e) => e.pointerType === "mouse" && easeTo(1)}
        onFocusCapture={() => easeTo(SLOW)}
        onBlurCapture={() => easeTo(1)}
      >
        <ul ref={track} className="marquee-track m-0 flex w-max list-none gap-3 p-0 py-1 min-[810px]:gap-4">
          {[0, 1].map((copy) =>
            tiles.map(({ item, key }) => <TileView key={`${copy}-${key}`} item={item} interactive={copy === 0} />),
          )}
        </ul>
        <span className="marquee-fade marquee-fade-l" aria-hidden="true" />
        <span className="marquee-fade marquee-fade-r" aria-hidden="true" />
      </div>
    </div>
  );
}

export function TechStackMarquee() {
  const reduced = Boolean(useReducedMotion());
  const rows = stack.marquee.rows.map((row) => ({
    row,
    items: row.groups.flatMap((id) => (stack.groups as StackGroup[]).find((g) => g.id === id)?.items ?? []),
  }));

  return (
    <section id="stack" className="w-full pb-12 pt-[76px] min-[701px]:pt-[100px]">
      <div className="mx-auto w-full max-w-page px-5 min-[810px]:px-12 min-[1280px]:px-0">
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
      </div>

      <div className="mt-12 flex flex-col gap-9 overflow-x-clip min-[701px]:mt-16 min-[701px]:gap-11">
        {rows.map(({ row, items }, i) => (
          <Reveal key={row.label} delay={0.08 * i}>
            <MarqueeRowView row={row} items={items} reduced={reduced} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
