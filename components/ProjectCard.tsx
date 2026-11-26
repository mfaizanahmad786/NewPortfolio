"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ProjectCard({
  href,
  image,
  title,
  subtitle,
  imageClass = "aspect-[1160/800]",
}: {
  href: string;
  image: string;
  title: string;
  subtitle: string;
  imageClass?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.001, y: 10, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", bounce: 0, duration: 1.4 }}
    >
    <Link href={href} className="group block">
      <div className={`overflow-hidden rounded-card bg-[#ece8e2] ${imageClass}`}>
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
      </div>
      <h3 className="mt-4 text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-ink min-[1280px]:text-[32px]">
        {title}
      </h3>
      <p className="mt-0.5 text-[16px] leading-[1.4] tracking-[-0.04em] text-ink">{subtitle}</p>
    </Link>
    </motion.div>
  );
}
