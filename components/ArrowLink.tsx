import { ArrowIcon } from "./Icons";

export function ArrowLink({
  href,
  children,
  tone = "dark",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  external?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-2.5"
    >
      <span className={`text-[18px] leading-[1.4] tracking-[-0.04em] ${dark ? "text-ink" : "text-cream"}`}>
        {children}
      </span>
      <span
        className={`grid h-7 w-7 place-items-center rounded-[8px] border transition-colors duration-200 ${
          dark
            ? "border-ink text-ink group-hover:border-accent group-hover:bg-accent group-hover:text-cream"
            : "border-cream text-cream group-hover:border-accent group-hover:bg-accent group-hover:text-cream"
        }`}
      >
        <ArrowIcon />
      </span>
    </a>
  );
}
