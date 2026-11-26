import type Lenis from "lenis";

/** Shared handle to the page's Lenis instance (null under reduced motion or before mount). */
let instance: Lenis | null = null;

export function setLenis(value: Lenis | null) {
  instance = value;
}

export function getLenis() {
  return instance;
}
