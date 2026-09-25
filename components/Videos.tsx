import type { EventConfig, FeaturedVideo } from "@/data/event";
import { EventVideo, getDisplayVideos } from "./EventVideo";

type Props = { config: EventConfig };

function VideoCard({ video }: { video: FeaturedVideo }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-lift ring-1 ring-white/15">
      <EventVideo video={video} className="w-full" />
      <div className="grid gap-3 px-5 py-5 sm:px-6 sm:py-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:gap-8">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-pink">Featured message</p>
          <p className="mt-2 font-serif text-xl leading-snug text-brand-ink md:text-2xl">{video.personName}</p>
          <p className="mt-2 text-sm leading-relaxed text-brand-blue">{video.designation}</p>
        </div>
        <p className="text-sm leading-relaxed text-brand-ink/70">{video.caption}</p>
      </div>
    </article>
  );
}

export function Videos({ config }: Props) {
  const displayVideos = getDisplayVideos(config.videos);

  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-brand-ink px-4 py-12 md:px-6 md:py-16 2xl:px-10"
      aria-labelledby="videos-heading"
    >
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-brand-pink/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-brand-blush/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-content">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-blush">Messages</p>
          <h2 id="videos-heading" className="mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-white">
            Words from Our Doctor and CEO
          </h2>
          <p className="mx-auto mt-3 h-px w-16 bg-brand-blush/70" aria-hidden="true" />
          <p className="mt-5 text-base leading-relaxed text-white/75">
            Personal messages on natural birthing, clinical excellence, and Motherhood&apos;s vision for families.
          </p>
        </div>

        <div
          className={`mx-auto mt-8 grid w-full gap-6 ${
            displayVideos.length > 1
              ? "lg:max-w-6xl lg:grid-cols-2"
              : "lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"
          }`}
        >
          {displayVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
