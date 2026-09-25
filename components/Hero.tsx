"use client";

import Image from "next/image";
import type { EventConfig } from "@/data/event";
import { assetPath } from "@/lib/site-url";
import { downloadIcs } from "@/lib/ics";
import { Countdown } from "./Countdown";
import { ScrollReveal } from "./ScrollReveal";

/** Swap hero photography by replacing this file in /public — no code changes needed. */
const HERO_IMAGE = "/hero-indian-mother-child.jpg";

type Props = { config: EventConfig };

export function Hero({ config }: Props) {
  return (
    <section
      id="top"
      className="hero-grain relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={assetPath(HERO_IMAGE)}
          alt=""
          fill
          priority
          className="object-cover object-[78%_40%] scale-105 md:object-[75%_35%]"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <img
        src={assetPath("/hero-blob.svg")}
        alt=""
        className="pointer-events-none absolute -left-20 top-24 w-[min(90vw,520px)] opacity-80 mix-blend-soft-light"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-40 h-[420px] w-[420px] rounded-[45%] bg-brand-pink/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-0 w-full max-w-content flex-1 flex-col justify-center px-4 pb-4 pt-20 md:px-6 md:pt-24">
        <ScrollReveal>
          <p className="hero-readable text-center text-[0.7rem] font-bold uppercase tracking-[0.24em] md:text-left">
            {config.siteName}
          </p>
          <h1
            id="hero-title"
            className="hero-readable mt-2 text-center font-serif text-[clamp(2.35rem,5.5vw,4.75rem)] font-normal leading-[0.95] tracking-tight md:text-left"
          >
            <span className="italic text-[var(--hero-accent)]">Natural</span> Birthing Event
          </h1>
          <p className="hero-readable mx-auto mt-3 max-w-xl text-center text-base leading-snug md:mx-0 md:text-left md:text-lg">
            {config.tagline}
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-5 md:mt-6" delay={0.1}>
          <p className="hero-readable mb-4 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-80 md:text-left">
            Countdown to start
          </p>
          <Countdown targetIso={config.startIso} variant="hero" />
        </ScrollReveal>

        <ScrollReveal className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-start" delay={0.16}>
          <a
            href="#videos"
            className="inline-flex items-center justify-center rounded-pill bg-brand-pink px-9 py-4 text-sm font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-brand-accent hover:shadow-card"
          >
            Watch videos
          </a>
          <button
            type="button"
            className="hero-readable inline-flex items-center justify-center rounded-pill border-[1.5px] border-white bg-[rgba(35,31,32,0.35)] px-9 py-4 text-sm font-bold backdrop-blur-sm transition hover:bg-[rgba(35,31,32,0.5)]"
            onClick={() =>
              downloadIcs({
                startIso: config.startIso,
                endIso: config.endIso,
                summary: config.ics.summary,
                description: config.ics.description,
                location: config.ics.location,
              })
            }
          >
            Add to calendar
          </button>
        </ScrollReveal>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-content shrink-0 px-4 pb-4 md:px-6 md:pb-6">
        <dl className="hero-glass-bar grid grid-cols-3 gap-3 rounded-2xl px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <dt className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/80">Date</dt>
            <dd className="hero-readable mt-1 text-xs font-semibold leading-snug sm:text-sm md:text-base">{config.displayDate}</dd>
          </div>
          <div className="min-w-0 border-l border-white/25 pl-3 sm:pl-6">
            <dt className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/80">Time</dt>
            <dd className="hero-readable mt-1 text-xs font-semibold leading-snug sm:text-sm md:text-base">{config.displayTime}</dd>
          </div>
          <div className="min-w-0 border-l border-white/25 pl-3 sm:pl-6">
            <dt className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/80">Venue</dt>
            <dd className="hero-readable mt-1 text-xs font-semibold leading-snug sm:text-sm md:text-base">
              {config.venue.name}, {config.venue.city}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
