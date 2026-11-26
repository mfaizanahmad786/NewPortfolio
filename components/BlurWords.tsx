"use client";

import { motion } from "framer-motion";

const spring = (duration: number, delay: number, bounce = 0) =>
  ({ type: "spring" as const, bounce, duration, delay });

export function BlurWords({
  text,
  className,
  as = "span",
  trigger = "view",
  blur = 10,
  duration = 1.8,
  delay = 0.05,
  y = 10,
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  trigger?: "view" | "mount";
  blur?: number;
  duration?: number;
  delay?: number;
  y?: number;
}) {
  const words = text.split(" ");
  const Tag = as;
  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block will-change-[filter,transform,opacity]"
          initial={{ opacity: 0.001, y, filter: `blur(${blur}px)` }}
          animate={trigger === "mount" ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          whileInView={trigger === "view" ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          viewport={{ once: true, amount: 0.8 }}
          transition={spring(duration, delay + index * 0.045)}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
