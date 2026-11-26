import Link from "next/link";
import type { ReactNode } from "react";

/** Link whose words slide up on hover/focus while a duplicate rises in from below. */
export function WaveLink({
  href,
  label,
  className = "",
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  const words = label.split(" ");
  const inner = (
    <>
      <span className="wave-text">
        <span className="sr-only">{label}</span>
        <span className="wave-words" aria-hidden="true">
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              <span className="wave-window">
                <span className="wave-glyph" data-char={word}>
                  {word}
                </span>
              </span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
      </span>
      {children}
    </>
  );
  const cls = `wave-target ${className}`.trim();
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}
