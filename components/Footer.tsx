"use client";

import { site } from "@/data/site";
import { getLenis } from "@/lib/lenis";
import { CrowdScene } from "./CrowdScene";
import { WaveLink } from "./WaveLink";

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function backToTop(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = getLenis();
  // The hero portrait flip is driven purely by scroll position (framer-motion useScroll),
  // so landing at scrollY 0 restores its starting state. `force` lets the scroll run even
  // if Lenis was stopped (e.g. by an open overlay).
  if (lenis && !reduce) {
    lenis.scrollTo(0, { duration: 1.6, force: true });
  } else {
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

export function Footer() {
  const giantName = `${site.name.split(" ")[0].toUpperCase()}.`;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top footer-wrap">
        <div className="footer-identity">
          <h2>{site.name}.</h2>
          <p>
            {site.footer.role.map((line, i) => (
              <span key={line}>
                {line}
                {i < site.footer.role.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <p>{site.footer.explore}</p>
          <div>
            {site.nav.map((item) => (
              <WaveLink key={item.label} href={item.href} label={item.label} />
            ))}
          </div>
        </nav>
        <div className="footer-contact">
          <p>{site.footer.getInTouch}</p>
          <WaveLink href={site.emailHref} label={site.email}>
            <ArrowUpRight />
          </WaveLink>
          <span>
            © {year} {site.footer.copyrightName}
          </span>
        </div>
      </div>
      <div className="footer-finale">
        <div className="footer-finale-heading footer-wrap">
          <p>{site.footer.farewell}</p>
          <a href="#top" onClick={backToTop} className="wave-target">
            <span className="wave-text">
              <span className="sr-only">{site.footer.backToTop}</span>
              <span className="wave-words" aria-hidden="true">
                {site.footer.backToTop.split(" ").map((word, i, all) => (
                  <span key={`${word}-${i}`}>
                    <span className="wave-window">
                      <span className="wave-glyph" data-char={word}>
                        {word}
                      </span>
                    </span>
                    {i < all.length - 1 ? " " : null}
                  </span>
                ))}
              </span>
            </span>
            <ArrowUp />
          </a>
        </div>
        <CrowdScene name={giantName} description={site.footer.crowdDescription} />
        <div className="footer-scene-bottom footer-wrap">
          <small>{site.footer.caption}</small>
        </div>
      </div>
    </footer>
  );
}
