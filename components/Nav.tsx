"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { CloseIcon, DotsIcon } from "./Icons";

const linkSpring = { type: "spring" as const, bounce: 0.2, duration: 0.8 };

const menu = [
  { label: "About Me", href: "/#bio-section" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="pointer-events-none fixed top-[30px] z-50 w-[min(320px,calc(100%-40px))]"
      style={{ left: "50%" }}
      initial={{ opacity: 0.001, y: 10, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 1.4 }}
    >
      <nav className="pointer-events-auto overflow-hidden rounded-[20px] bg-ink text-cream">
        <div className={`flex items-center justify-between pl-4 pr-3 ${open ? "px-4 pb-0 pt-3" : "h-[60px] pl-6 pr-2"}`}>
          <Link
            href="/#hero-section"
            className="text-[22px] font-semibold leading-none tracking-[-0.04em]"
            onClick={() => setOpen(false)}
          >
            {site.name}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-[12px] bg-cream text-ink"
          >
            {open ? <CloseIcon /> : <DotsIcon />}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              className="flex flex-col gap-2.5 overflow-hidden px-4 pb-6 pt-4"
            >
              {menu.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0.001, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ ...linkSpring, delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex rounded-[8px] bg-cream px-3 py-1.5 text-[15px] tracking-[-0.03em] text-ink transition-colors hover:bg-white"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
