"use client";

import { useEffect } from "react";

const STAGGER_MS = 90;

/** Reveals `[data-reveal]` elements as they scroll into view, staggering items that appear together. */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("lp-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        const show = (el: HTMLElement, delay: number) => {
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add("is-revealed");
          observer.unobserve(el);
        };

        const intersecting = entries.filter((e) => e.isIntersecting);

        // Above the viewport (restored scroll position, jump links, End key): show without waiting.
        intersecting.filter((e) => e.boundingClientRect.bottom <= 0).forEach((e) => show(e.target as HTMLElement, 0));

        intersecting
          .filter((e) => e.boundingClientRect.bottom > 0)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((e, i) => show(e.target as HTMLElement, i * STAGGER_MS));
      },
      // Huge top margin: anything scrolled past counts as seen, even if it was never on screen.
      { rootMargin: "100000px 0px -8% 0px", threshold: 0 },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("lp-reveal-ready");
    };
  }, []);

  return null;
}
