"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { EventConfig } from "@/data/event";
import { assetPath } from "@/lib/site-url";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Agenda" },
  { href: "#videos", label: "Videos" },
  { href: "#speakers", label: "Speakers" },
  { href: "#venue", label: "Venue" },
] as const;

type Props = { config: EventConfig };

export function Header({ config }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-brand-blush/60 bg-surface/80 shadow-soft backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5 2xl:px-10">
        <Link href="#top" className="shrink-0 rounded-lg focus-visible:outline-offset-4">
          <Image
            src={assetPath(config.logo.src)}
            alt={config.logo.alt}
            width={config.logo.width}
            height={config.logo.height}
            className={`h-14 w-auto sm:h-16 md:h-[4.5rem] lg:h-20 ${
              scrolled ? "" : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            }`}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-pill px-3 py-2 text-sm font-semibold transition ${
                scrolled
                  ? "text-brand-ink/70 hover:bg-brand-blush hover:text-brand-ink"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl md:hidden ${
            scrolled ? "bg-brand-blush" : "bg-white/15 backdrop-blur-sm"
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span
              className={`block h-0.5 w-5 transition ${scrolled ? "bg-brand-pink" : "bg-white"} ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 transition ${scrolled ? "bg-brand-pink" : "bg-white"} ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 transition ${scrolled ? "bg-brand-pink" : "bg-white"} ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-brand-blush bg-surface px-4 py-3 md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-brand-ink/80 hover:bg-brand-blush"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
