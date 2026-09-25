"use client";

import { useState } from "react";
import type { EventConfig, Speaker } from "@/data/event";
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
      id={`speaker-${speaker.id}`}
      className="speaker-card group flex h-full w-full overflow-hidden rounded-[1.75rem] border border-brand-blush bg-white text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-pink/35 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 max-sm:min-h-[11.5rem] sm:flex-col"
      onClick={onSelect}
    >
      <div className="relative w-[34%] shrink-0 overflow-hidden bg-brand-blush sm:aspect-[3/4] sm:w-full">
        {keynote && (
          <span className="absolute left-3 top-3 z-10 rounded-pill bg-brand-pink px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white shadow-soft">
            Keynote
          </span>
        )}
        <SpeakerPortrait
          name={speaker.name}
          photoSrc={speaker.photoSrc}
          plain
          className="h-full min-h-[11.5rem] w-full sm:absolute sm:inset-0 sm:min-h-0"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:pb-5 sm:pt-4">
        <h3 className="font-serif text-lg leading-snug text-brand-ink group-hover:text-brand-pink sm:text-xl">
          {speaker.name}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-brand-blue">{speaker.designation}</p>
        <p className="mt-2 text-xs font-semibold leading-snug text-brand-accent">{speaker.specialty}</p>
        {speaker.sessionLabel && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-brand-ink/55">{speaker.sessionLabel}</p>
        )}
        <span className="mt-auto pt-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-pink">Read bio</span>
      </div>
    </button>
  );
}

export function Speakers({ config }: Props) {
  const [selected, setSelected] = useState<Speaker | null>(null);

  return (
    <section
      id="speakers"
      className="relative scroll-mt-20 overflow-hidden bg-white px-4 py-12 md:scroll-mt-24 md:px-6 md:py-16"
      aria-labelledby="speakers-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-blush/80 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-brand-peach/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-content">
        <div className="text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-pink">Our faculty</p>
          <h2 id="speakers-heading" className="mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-brand-ink">
            Speakers
          </h2>
          <p className="mx-auto mt-3 h-px w-16 bg-brand-pink/40" aria-hidden="true" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-ink/70 md:text-base">
            Meet the clinicians and leaders behind the programme — select a portrait to read the full bio.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4">
          {config.speakers.map((speaker) => (
            <li key={speaker.id} className="h-full">
              <SpeakerCard
                speaker={speaker}
                keynote={speaker.keynote === true}
                onSelect={() => setSelected(speaker)}
              />
            </li>
          ))}
        </ul>
      </div>

      <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
