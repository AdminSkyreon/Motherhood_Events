"use client";

import { useState } from "react";
import type { EventConfig, Speaker } from "@/data/event";
import { ScrollReveal } from "./ScrollReveal";
import { SpeakerModal } from "./SpeakerModal";
import { SpeakerPortrait } from "./SpeakerPortrait";

type Props = { config: EventConfig };

function SpeakerCard({
  speaker,
  keynote,
  onSelect,
}: {
  speaker: Speaker;
  keynote: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`speaker-card group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border bg-white text-left shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 ${
        keynote
          ? "border-brand-pink/25 ring-1 ring-brand-pink/15 lg:flex-row lg:items-stretch"
          : "border-brand-blush/80 hover:border-brand-pink/30"
      }`}
      onClick={onSelect}
    >
      {keynote && (
        <span
          className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-brand-pink to-brand-accent lg:top-8 lg:bottom-8"
          aria-hidden="true"
        />
      )}

      <div
        className={`relative overflow-hidden px-4 pt-4 ${keynote ? "lg:w-[44%] lg:px-5 lg:pt-5" : ""}`}
      >
        {keynote && (
          <span className="absolute left-6 top-6 z-10 rounded-pill bg-brand-pink px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-soft">
            Keynote
          </span>
        )}
        <div className="relative overflow-hidden rounded-t-[2.75rem] bg-gradient-to-b from-brand-blush/50 to-brand-peach/30 p-1 ring-1 ring-brand-blush/60">
          <SpeakerPortrait
            name={speaker.name}
            photoSrc={speaker.photoSrc}
            arch
            className="transition duration-500 ease-out group-hover:scale-[1.05]"
          />
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/75 via-brand-ink/25 to-transparent pb-4 pt-16 opacity-90 transition duration-300 group-hover:from-brand-pink/90"
            aria-hidden="true"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <span className="translate-y-1 text-xs font-bold uppercase tracking-[0.18em] text-white opacity-90 transition group-hover:translate-y-0 group-hover:opacity-100">
              View bio →
            </span>
          </span>
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col px-5 pb-6 pt-4 ${keynote ? "lg:justify-center lg:px-8 lg:py-8" : ""}`}
      >
        <h3 className="font-serif text-xl leading-snug text-brand-ink transition group-hover:text-brand-pink md:text-[1.35rem]">
          {speaker.name}
        </h3>
        <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-blue">
          {speaker.designation}
        </p>
        <span className="mt-3 inline-block w-fit rounded-pill border border-brand-blush bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-accent">
          {speaker.specialty}
        </span>
        {speaker.sessionLabel && (
          <p className="mt-4 text-xs font-medium text-brand-ink/55">
            <span className="font-bold uppercase tracking-wider text-brand-ink/40">Session · </span>
            {speaker.sessionLabel}
          </p>
        )}
      </div>
    </button>
  );
}

export function Speakers({ config }: Props) {
  const [selected, setSelected] = useState<Speaker | null>(null);

  return (
    <section
      id="speakers"
      className="relative overflow-hidden bg-gradient-to-b from-brand-blush/40 via-brand-cream to-white px-4 py-24 md:px-6 md:py-32"
      aria-labelledby="speakers-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-pink/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-blue/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-content">
        <ScrollReveal className="text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-pink">Our faculty</p>
          <h2 id="speakers-heading" className="mt-3 font-serif text-[clamp(2rem,4.5vw,3rem)] text-brand-ink">
            Speakers
          </h2>
          <p className="mx-auto mt-3 h-px w-16 bg-brand-pink/40" aria-hidden="true" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-ink/70 md:text-base">
            Meet the clinicians and leaders behind the programme — select a portrait to read the full bio.
          </p>
        </ScrollReveal>

        <div className="relative mt-14 md:mt-16">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-brand-cream to-transparent md:hidden"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent md:hidden"
            aria-hidden="true"
          />

          <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 pl-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4 lg:gap-8 [&::-webkit-scrollbar]:hidden">
            {config.speakers.map((speaker, i) => {
              const keynote = speaker.keynote === true;
              return (
                <ScrollReveal
                  key={speaker.id}
                  delay={i * 0.06}
                  className={`min-w-[min(88vw,360px)] shrink-0 snap-center md:min-w-0 ${
                    keynote ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <li className="h-full">
                    <SpeakerCard
                      speaker={speaker}
                      keynote={keynote}
                      onSelect={() => setSelected(speaker)}
                    />
                  </li>
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </div>

      <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
