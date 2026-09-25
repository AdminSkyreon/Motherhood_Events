import type { EventConfig } from "@/data/event";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

type Props = { config: EventConfig };

export function Venue({ config }: Props) {
  const { venue } = config;

  return (
    <section id="venue" className="bg-white px-4 py-12 md:px-6 md:py-16" aria-labelledby="venue-heading">
      <div className="mx-auto max-w-content">
        <ScrollReveal>
          <SectionHeading eyebrow="Location" title="Venue" id="venue-heading" />
        </ScrollReveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
          <ScrollReveal>
            <address className="not-italic">
              <p className="font-serif text-3xl text-brand-ink">{venue.name}</p>
              {venue.addressLines.map((line) => (
                <p key={line} className="mt-3 text-base text-brand-ink/75">
                  {line}
                </p>
              ))}
              <p className="mt-2 text-base font-semibold text-brand-ink">{venue.city}</p>
              <a
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-pill bg-brand-pink px-8 py-3.5 text-sm font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-brand-accent"
              >
                Get directions
              </a>
            </address>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="overflow-hidden rounded-3xl border border-brand-blush shadow-card">
              <iframe
                title={`Map showing ${venue.name}`}
                src={venue.mapEmbedUrl}
                className="aspect-[16/10] w-full border-0 lg:aspect-[2/1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
