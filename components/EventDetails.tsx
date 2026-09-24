import Image from "next/image";
import type { EventConfig } from "@/data/event";
import { assetPath } from "@/lib/site-url";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

type Props = { config: EventConfig };

const FACT_ICONS = {
  date: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" d="M8 4v2M16 4v2M4 9h16M6 6h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z" />
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path strokeLinecap="round" d="M12 8v4l3 2" />
    </svg>
  ),
  venue: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  ),
  mode: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" d="M4 6h16M4 12h10M4 18h16" />
    </svg>
  ),
} as const;

type FactKey = keyof typeof FACT_ICONS;

export function EventDetails({ config }: Props) {
  const facts: { key: FactKey; label: string; value: string }[] = [
    { key: "date", label: "Date", value: config.displayDate },
    { key: "time", label: "Time", value: config.displayTime },
    { key: "venue", label: "Venue", value: `${config.venue.name}, ${config.venue.city}` },
    { key: "mode", label: "Mode", value: config.mode },
  ];

  return (
    <section id="about" className="bg-white px-4 py-24 md:px-6 md:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-content">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <ScrollReveal className="lg:col-span-5">
            <SectionHeading eyebrow="About the event" title="Event details" id="about-heading" />
            <ul className="mt-10 space-y-8">
              {facts.map((fact, i) => (
                <li key={fact.label} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blush/60 text-brand-pink">
                    {FACT_ICONS[fact.key]}
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-blue">{fact.label}</p>
                    <p className="mt-1 font-serif text-lg text-brand-ink">{fact.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-7" delay={0.08}>
            <div className="grid gap-8 md:grid-cols-[1fr,min(280px,40%)] md:items-start">
              <p className="text-base leading-relaxed text-brand-ink/75 md:text-lg">{config.about}</p>
              <div className="relative mx-auto w-full max-w-xs md:mx-0 md:max-w-none">
                <div className="arch-photo relative aspect-[4/5] overflow-hidden shadow-card">
                  <Image
                    src={assetPath("/hero-indian-mother-child.jpg")}
                    alt=""
                    width={480}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-pink/30 to-transparent" aria-hidden="true" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
