import type { ReactNode } from "react";
import Image from "next/image";
import {
  programmeAgenda,
  programmeEvent,
  programmeGlance,
  programmeMessage,
  programmeNotes,
  programmeSpeakers,
  programmeThanks,
  type AgendaBlock,
  type AgendaLine,
} from "@/data/programme";
import { eventConfig } from "@/data/event";
import { assetPath } from "@/lib/site-url";
import { getDisplayVideos } from "./EventVideo";
import { LocalVideoPlayer } from "./LocalVideoPlayer";

/** Renders ordinal suffixes ("4th") as superscript, as in the brochure. */
function ordinals(text: string): ReactNode[] {
  return text.split(/(?<=\d)(th)\b/i).map((part, i) => (i % 2 ? <sup key={i} className="text-[0.55em]">{part}</sup> : part));
}

type ArtName =
  | "hero-leaves-tl"
  | "hero-leaves-tr"
  | "hero-water"
  | "hero-mother"
  | "leaves-tr"
  | "water-bl"
  | "leaf-br"
  | "sprigs-r"
  | "thanks-mother";

const ART_SIZE: Record<ArtName, [number, number]> = {
  "hero-leaves-tl": [420, 360],
  "hero-leaves-tr": [298, 219],
  "hero-water": [750, 550],
  "hero-mother": [644, 1306],
  "leaves-tr": [388, 360],
  "water-bl": [690, 340],
  "leaf-br": [358, 340],
  "sprigs-r": [128, 570],
  "thanks-mother": [675, 1131],
};

function Art({ name, className, priority }: { name: ArtName; className?: string; priority?: boolean }) {
  const [width, height] = ART_SIZE[name];
  return (
    <Image
      src={assetPath(`/brochure/art/${name}.jpg`)}
      alt=""
      width={width}
      height={height}
      priority={priority}
      aria-hidden
      className={`lp-deco ${className ?? ""}`}
    />
  );
}

/** Corner artwork shared by the inner brochure pages. */
function PageArt() {
  return (
    <>
      <Art name="leaves-tr" className="lp-deco--tr" />
      <Art name="water-bl" className="lp-deco--bl" />
      <Art name="leaf-br" className="lp-deco--br" />
      <Art name="sprigs-r" className="lp-deco--r" />
    </>
  );
}

function Tagline({ className = "" }: { className?: string }) {
  return (
    <p className={`lp-goudy lp-zoom text-[clamp(1.15rem,1.7vw,1.6rem)] text-[var(--lp-grey)] ${className}`}>
      <span className="text-[var(--lp-pink)]">{programmeEvent.tagline.accent}</span>
      {programmeEvent.tagline.rest}
    </p>
  );
}

const icons = {
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17M7.5 13.5h1.5M11.25 13.5h1.5M15 13.5h1.5M7.5 17h1.5M11.25 17h1.5M15 17h1.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.5 2.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
};

function Detail({ icon, children, divider }: { icon: keyof typeof icons; children: ReactNode; divider?: boolean }) {
  return (
    <li className={`flex items-start gap-4 py-[clamp(0.7rem,1.2vw,1rem)] ${divider ? "border-b border-[#a7a9ac]" : ""}`}>
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-[clamp(1.35rem,1.8vw,1.75rem)] w-[clamp(1.35rem,1.8vw,1.75rem)] shrink-0 text-[var(--lp-pink)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {icons[icon]}
      </svg>
      <span className="lp-zoom font-medium leading-snug">{children}</span>
    </li>
  );
}

/** Brochure page 1 */
function Hero() {
  const e = programmeEvent;
  return (
    <section className="lp-section flex min-h-[100svh] items-center !pb-20 !pt-32 md:!pt-36" aria-labelledby="lp-title">
      <Art name="hero-leaves-tl" className="lp-deco--tl" priority />
      <Art name="hero-water" className="lp-deco--bl !w-[clamp(260px,38vw,640px)]" priority />
      <Art
        name="hero-leaves-tr"
        className="lp-fade-r right-0 top-[clamp(5.5rem,10vw,8.5rem)] w-[clamp(90px,11vw,190px)]"
      />
      <Art
        name="hero-mother"
        priority
        className="lp-fade-lt bottom-0 right-[-16%] !h-[46%] !w-auto sm:right-[-6%] sm:!h-[58%] lg:right-0 lg:!h-[92%]"
      />

      <div className="absolute right-0 top-0 z-10 rounded-bl-[clamp(1.25rem,2.5vw,2.25rem)] bg-white px-[clamp(1rem,2.5vw,2.25rem)] py-[clamp(0.75rem,1.6vw,1.4rem)] shadow-[0_10px_30px_rgba(96,100,89,0.12)]">
        <Image
          src={assetPath("/motherhood-logo.png")}
          alt="Motherhood Women & Children's Hospital"
          width={237}
          height={80}
          priority
          className="h-[clamp(2.4rem,4.5vw,4rem)] w-auto"
        />
      </div>

      <Tagline className="absolute left-[clamp(1.25rem,5vw,4rem)] top-[clamp(1.75rem,4vw,3rem)] z-10" />

      <div className="lp-container">
        <div className="max-w-[46rem]">
          <p className="lp-zoom inline-block rounded-md bg-[#ebdabc] px-[1em] py-[0.35em] text-[clamp(0.9rem,1.3vw,1.15rem)] font-medium tracking-[0.45em]">
            {e.presents}
          </p>
          <h1
            id="lp-title"
            className="lp-lobster lp-zoom mt-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(3.1rem,8.2vw,7.75rem)] leading-[0.92] text-[var(--lp-olive)]"
          >
            {e.title[0]}
            <br />
            {e.title[1]}
          </h1>
          <p className="lp-zoom mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[26ch] text-[clamp(1.1rem,1.75vw,1.6rem)] font-medium leading-snug">
            {e.subtitle}
          </p>
          <ul className="mt-[clamp(1.75rem,4vw,3rem)] max-w-[min(62%,24rem)] text-[clamp(1rem,1.35vw,1.25rem)] sm:max-w-[24rem]">
            <Detail icon="calendar" divider>
              {ordinals(e.date)}
            </Detail>
            <Detail icon="clock" divider>
              {e.time}
            </Detail>
            <Detail icon="pin">
              {e.venue.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Detail>
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Brochure page 2 */
function Speakers() {
  return (
    <section className="lp-section" aria-labelledby="lp-speakers">
      <PageArt />
      <div className="lp-container">
        <p className="lp-title lp-zoom uppercase">Programme Agenda</p>
        <p className="lp-eyebrow lp-zoom mt-[clamp(2rem,4vw,3rem)] uppercase">Main Speakers</p>
        <h2 id="lp-speakers" className="lp-title lp-zoom mt-3">
          Voices Leading the Conversation
        </h2>

        <ul className="lp-panel mt-[clamp(1.75rem,3vw,2.5rem)] grid grid-cols-2 gap-x-5 gap-y-10 p-[clamp(1.25rem,4vw,3.5rem)] md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {programmeSpeakers.map((s) => (
            <li key={s.name} className="lp-card">
              <div className="aspect-square overflow-hidden rounded-[10px] bg-[#e3c38a]">
                <Image src={assetPath(s.photo)} alt={s.name} width={320} height={320} className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 text-[clamp(0.95rem,1.25vw,1.1rem)] font-bold leading-tight text-[var(--lp-pink)]">{s.name}</p>
              <p className="mt-1.5 text-[clamp(0.82rem,1vw,0.95rem)] leading-snug">
                {s.role.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Video message (not in the PDF; styled like its inner pages) */
function Message() {
  const video = getDisplayVideos(eventConfig.videos)[0];
  if (!video?.fileSrc) return null;
  const m = programmeMessage;

  return (
    <section className="lp-section" aria-labelledby="lp-message">
      <PageArt />
      <div className="lp-container">
        <div className="text-center">
          <p className="lp-eyebrow lp-zoom inline-block [transform-origin:center]">{m.eyebrow}</p>
          <h2 id="lp-message" className="lp-title lp-zoom mt-3 [transform-origin:center]">
            {m.title}
          </h2>
        </div>

        <div className="lp-panel mx-auto mt-[clamp(1.75rem,3vw,2.5rem)] max-w-5xl p-[clamp(0.75rem,2vw,1.5rem)]">
          <div className="overflow-hidden rounded-[10px] shadow-[0_12px_32px_rgba(35,31,32,0.18)]">
            <LocalVideoPlayer
              fileSrc={video.fileSrc}
              title={video.title}
              personName={video.personName}
              duration={video.duration}
              posterSrc={video.posterSrc}
            />
          </div>
          <div className="grid gap-5 px-[clamp(0.5rem,2vw,1.5rem)] pb-3 pt-6 md:grid-cols-[1fr_1fr_1.3fr] md:items-start">
            {m.people.map((p) => (
              <div key={p.name} className="lp-zoom">
                <p className="text-[clamp(1rem,1.3vw,1.15rem)] font-bold text-[var(--lp-pink)]">{p.name}</p>
                <p className="mt-1 text-[clamp(0.85rem,1vw,0.95rem)] font-medium">{p.role}</p>
              </div>
            ))}
            <p className="lp-zoom text-[clamp(0.85rem,1vw,0.95rem)] font-medium italic leading-relaxed text-[var(--lp-grey)]">{m.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const lineStyle: Record<NonNullable<AgendaLine["kind"]> | "body", string> = {
  name: "font-bold text-[var(--lp-pink)] text-[clamp(1rem,1.25vw,1.12rem)]",
  topic: "font-medium text-[var(--lp-pink)] text-[clamp(1rem,1.25vw,1.12rem)]",
  role: "font-medium",
  talk: "font-medium italic text-[var(--lp-grey)]",
  strong: "font-bold",
  body: "font-medium",
};

function SectionIntro({ eyebrow, title, id }: { eyebrow: ReactNode; title: string; id: string }) {
  return (
    <div className="lg:sticky lg:top-12">
      {eyebrow}
      <h2 id={id} className="lp-title lp-zoom mt-[clamp(1.25rem,3vw,2.25rem)]">
        {title}
      </h2>
    </div>
  );
}

/** Brochure pages 3–6 */
function Agenda({ block }: { block: AgendaBlock }) {
  const id = `lp-${block.id}`;
  return (
    <section className="lp-section" aria-labelledby={id}>
      <PageArt />
      <div className="lp-container grid items-start gap-[clamp(1.75rem,4vw,4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
        <SectionIntro
          id={id}
          title={block.title}
          eyebrow={
            <div className="space-y-2 text-[clamp(1.05rem,1.4vw,1.25rem)] font-bold">
              <p className="lp-zoom">
                <span className="text-[var(--lp-pink)]">Date:</span> {ordinals(programmeEvent.date)}
              </p>
              <p className="lp-zoom">
                <span className="text-[var(--lp-pink)]">Time:</span> {block.time}
              </p>
            </div>
          }
        />

        <ol className="lp-panel px-[clamp(0.75rem,3vw,2.5rem)] py-[clamp(0.5rem,1.5vw,1.25rem)]">
          {block.items.map((item) => (
            <li
              key={item.time}
              className="lp-row lp-divider grid gap-x-8 gap-y-1.5 rounded-lg px-[clamp(0.5rem,1.5vw,1rem)] py-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-[minmax(9rem,12rem)_1fr]"
            >
              <p className="text-[clamp(1rem,1.25vw,1.12rem)] font-bold text-[var(--lp-blue)]">{item.time}</p>
              <div className="text-[clamp(0.88rem,1.05vw,0.98rem)] leading-relaxed">
                <p className="text-[clamp(1rem,1.25vw,1.12rem)] font-bold uppercase text-[var(--lp-blue)]">{item.label}</p>
                {item.lines?.map((line, i) => (
                  <p key={i} className={`mt-1 ${lineStyle[line.kind ?? "body"]}`}>
                    {line.text}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Brochure page 7 */
function Glance() {
  return (
    <section className="lp-section" aria-labelledby="lp-glance">
      <PageArt />
      <div className="lp-container grid items-start gap-[clamp(1.75rem,4vw,4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
        <SectionIntro id="lp-glance" title="Day at a Glance" eyebrow={<p className="lp-eyebrow lp-zoom">Quick Reference</p>} />

        <div className="lp-panel p-[clamp(0.75rem,3vw,2.5rem)]">
          <div className="grid grid-cols-[minmax(7.5rem,13rem)_1fr] gap-4 bg-[#60645a] px-4 py-2.5 text-[clamp(0.95rem,1.25vw,1.12rem)] font-medium uppercase text-white">
            <span>Time</span>
            <span>Itinerary</span>
          </div>
          <ul className="mt-2">
            {programmeGlance.map((row) => (
              <li
                key={row.time}
                className={`lp-row lp-divider grid grid-cols-[minmax(7.5rem,13rem)_1fr] gap-4 rounded-md px-4 py-2.5 text-[clamp(0.88rem,1.1vw,1rem)] ${
                  row.highlight ? "font-bold text-[var(--lp-blue)]" : "font-medium"
                }`}
              >
                <span>{row.time}</span>
                <span>
                  {row.items.map((item) => (
                    <span key={item} className="block">
                      {item}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Brochure page 8 */
function Notes() {
  const n = programmeNotes;
  return (
    <section className="lp-section" aria-labelledby="lp-notes">
      <PageArt />
      <div className="lp-container grid items-start gap-[clamp(1.75rem,4vw,4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
        <SectionIntro id="lp-notes" title="A Few Notes to Keep Handy" eyebrow={<p className="lp-eyebrow lp-zoom">Before You Arrive</p>} />

        <div>
          <div className="lp-panel space-y-[clamp(1.5rem,3vw,2.25rem)] p-[clamp(1.5rem,4vw,3rem)] text-[clamp(0.95rem,1.15vw,1.08rem)] leading-relaxed">
            <p className="lp-zoom font-medium">{n.intro}</p>
            {n.notes.map((note) => (
              <div key={note.title} className="lp-zoom">
                <h3 className="text-[clamp(1.15rem,1.5vw,1.35rem)] font-bold text-[var(--lp-olive)]">{note.title}</h3>
                <p className="mt-1">{note.body}</p>
              </div>
            ))}
          </div>
          <p className="lp-zoom mt-[clamp(2rem,4vw,3rem)] text-[clamp(1.15rem,1.6vw,1.45rem)] font-bold text-[var(--lp-blue)]">{n.welcome}</p>
          <p className="lp-zoom mt-4 max-w-[24ch] text-[clamp(0.95rem,1.2vw,1.1rem)] font-medium leading-snug">{ordinals(n.closing)}</p>
        </div>
      </div>
    </section>
  );
}

/** Brochure page 9 */
function Thanks() {
  return (
    <section className="lp-section flex min-h-[100svh] items-center" aria-labelledby="lp-thanks">
      <Art name="hero-leaves-tl" className="lp-deco--tl" />
      <Art name="leaves-tr" className="lp-deco--tr" />
      <Art name="hero-water" className="lp-deco--bl !w-[clamp(260px,36vw,620px)]" />
      <Art name="sprigs-r" className="lp-deco--r" />

      <Tagline className="absolute left-[clamp(1.25rem,5vw,4rem)] top-[clamp(1.75rem,4vw,3rem)] z-10" />

      <div className="lp-container grid items-center gap-8 pt-12 md:grid-cols-[1.1fr_1fr] md:gap-12">
        <Art
          name="thanks-mother"
          className="!relative mx-auto h-auto w-[min(72vw,22rem)] [mask-image:radial-gradient(ellipse_at_center,#000_58%,transparent_78%)] md:w-auto md:max-h-[78svh] md:max-w-full"
        />
        <div className="text-center md:text-left">
          <h2 id="lp-thanks" className="lp-zoom text-[clamp(1.9rem,3.4vw,3rem)] font-bold text-[var(--lp-olive)] md:[transform-origin:left]">
            {programmeThanks.title}
          </h2>
          <p className="lp-zoom mx-auto mt-4 max-w-[24ch] text-[clamp(1.1rem,1.7vw,1.5rem)] font-bold leading-snug text-[var(--lp-olive)] md:mx-0">
            {ordinals(programmeThanks.body)}
          </p>
          <Image
            src={assetPath("/motherhood-logo.png")}
            alt="Motherhood Women & Children's Hospital"
            width={237}
            height={80}
            className="mx-auto mt-8 h-[clamp(3rem,5vw,4.5rem)] w-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  );
}

export function Landing() {
  return (
    <div className="lp">
      <Hero />
      <Speakers />
      <Message />
      {programmeAgenda.map((block) => (
        <Agenda key={block.id} block={block} />
      ))}
      <Glance />
      <Notes />
      <Thanks />
    </div>
  );
}
