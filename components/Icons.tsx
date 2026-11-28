export function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 transition-transform duration-300 ease-out"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      fill="none"
      aria-hidden
    >
      <path d="M6 9.5l6 6 6-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SocialIcon({ name }: { name: string }) {
  const common = "h-[18px] w-[18px]";
  if (name === "X") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <path fill="currentColor" d="M14.7 10.3 22 2h-2.2l-6.1 7L8.7 2H2l7.7 11.1L2.3 22H4.5l6.6-7.6L15.6 22H22l-7.3-11.7Zm-2.3 2.7-.8-1.1L5.2 3.6h2.6l4.7 6.7.8 1.1 6.4 9.1h-2.6l-5.1-7.5Z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <path fill="currentColor" d="M5.7 8.7H2.9V21h2.8V8.7ZM4.3 3C3.3 3 2.5 3.8 2.5 4.8S3.3 6.6 4.3 6.6 6.1 5.8 6.1 4.8 5.3 3 4.3 3ZM21.1 21h-2.8v-6.2c0-1.8-.8-2.4-1.8-2.4s-2 .9-2 2.5V21H11.7V8.7h2.7v1.7c.5-.9 1.7-1.9 3.5-1.9 2.3 0 4.2 1.5 4.2 4.8V21Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden>
      <path fill="currentColor" d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM9.8 15.5v-6.6l6.2 3.3-6.2 3.3Z" />
    </svg>
  );
}
