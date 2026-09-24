import type { EventConfig } from "@/data/event";
import { EventVideo, getDisplayVideos } from "./EventVideo";
import { ScrollReveal } from "./ScrollReveal";

type Props = { config: EventConfig };

export function Videos({ config }: Props) {
  const displayVideos = getDisplayVideos(config.videos);
  const [primary, secondary] = displayVideos;

  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-brand-ink px-4 py-24 md:px-6 md:py-32"
      aria-labelledby="videos-heading"
    >
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[480px] w-[480px] rounded-full bg-brand-pink/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-content">
        <ScrollReveal className="max-w-2xl">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-blush">Messages</p>
          <h2 id="videos-heading" className="mt-3 font-serif text-[clamp(2rem,4.5vw,3rem)] text-white">
            Words from Our Doctor and CEO
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Personal messages on natural birthing, clinical excellence, and Motherhood&apos;s vision for families.
          </p>
        </ScrollReveal>

        {displayVideos.length === 1 && primary ? (
          <ScrollReveal className="mt-14">
            <EventVideo video={primary} className="w-full" />
            <p className="mt-4 max-w-3xl text-sm text-white/65">{primary.caption}</p>
          </ScrollReveal>
        ) : (
          <ul className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-stretch lg:gap-6">
            {primary && (
              <ScrollReveal className="lg:col-span-3">
                <li className="h-full">
                  <EventVideo video={primary} className="h-full min-h-0 w-full" />
                  <p className="mt-4 text-sm text-white/65">{primary.caption}</p>
                </li>
              </ScrollReveal>
            )}
            {secondary && (
              <ScrollReveal className="lg:col-span-2" delay={0.08}>
                <li className="h-full">
                  <EventVideo video={secondary} className="h-full min-h-0 w-full" />
                  <p className="mt-4 text-sm text-white/65">{secondary.caption}</p>
                </li>
              </ScrollReveal>
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
