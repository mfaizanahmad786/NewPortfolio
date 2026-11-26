"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { CloseIcon, DotsIcon } from "./Icons";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed left-1/2 top-[30px] z-50 w-[min(320px,calc(100%-28px))] -translate-x-1/2">
      <nav className="pointer-events-auto overflow-hidden rounded-[20px] bg-ink text-cream">
        <div className="flex h-[60px] items-center justify-between pl-6 pr-[8px]">
          <Link href="/#hero-section" className="text-[22px] font-semibold leading-none tracking-[-0.04em]" onClick={() => setOpen(false)}>
            {site.name}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-[12px] bg-cream text-ink transition-transform hover:scale-[1.03]"
          >
            {open ? <CloseIcon /> : <DotsIcon />}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="flex flex-col gap-1 px-3 pb-4">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-[12px] px-3 py-2.5 text-[20px] font-medium tracking-[-0.03em] text-cream/90 transition-colors hover:bg-white/10 hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
