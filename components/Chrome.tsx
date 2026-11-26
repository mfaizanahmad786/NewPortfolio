"use client";

import { site } from "@/data/site";
import { FramerMark } from "./Icons";

export function Chrome() {
  return (
    <>
      <div className="fixed bottom-[58px] right-3 z-40 flex flex-col items-end gap-2 sm:right-4">
        <a
          href={site.useForFreeHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-[8px] bg-ink px-4 py-[7px] text-[15px] font-medium tracking-[-0.02em] text-cream transition-transform hover:-translate-y-0.5"
        >
          Use for Free
        </a>
        <a
          href={site.moreTemplatesHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-[8px] bg-ink px-4 py-[7px] text-[15px] font-medium tracking-[-0.02em] text-cream transition-transform hover:-translate-y-0.5"
        >
          More Templates
        </a>
      </div>
      <a
        href={site.framerHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-3 right-3 z-40 inline-flex items-center gap-1.5 rounded-[10px] border border-black/10 bg-white px-2.5 py-1.5 text-[11px] font-medium text-ink shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:right-4"
      >
        <FramerMark />
        Made in Framer
      </a>
    </>
  );
}
