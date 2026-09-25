"use client";

import { useEffect, useMemo, useState } from "react";
import type { AgendaDay, AgendaItem, EventConfig } from "@/data/event";
import { agendaDurationMinutes, formatAgendaClock, getLiveAgendaItem } from "@/lib/agenda";
import { getInitials } from "./InitialsAvatar";
import { ScrollReveal } from "./ScrollReveal";

type Props = { config: EventConfig };

function BreakIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  const isFood = t.includes("lunch") || t.includes("tea") || t.includes("coffee");
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blush/80 text-brand-pink">
      {isFood ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" d="M6 8h12v8a4 4 0 01-4 4H10a4 4 0 01-4-4V8zM18 8V5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )}
    </span>
  );
}

function SpeakerAvatar({ name }: { name: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blush to-brand-peach text-xs font-semibold text-brand-ink"
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  );
}

function AgendaRow({
  item,
  isLive,
  index,
}: {
  item: AgendaItem;
  isLive: boolean;
  index: number;
}) {
  const clock = formatAgendaClock(item.startIso);
  const durationMin = agendaDurationMinutes(item.startIso, item.endIso);

  if (item.isBreak) {
    return (
      <ScrollReveal delay={index * 0.05}>
        <li className="relative flex gap-4 pb-3">
          <div className="w-[5.5rem] shrink-0 pt-1">
            <time dateTime={item.startIso} className="font-serif text-lg font-bold tabular-nums text-brand-ink/55">
              {clock.time}
            </time>
          </div>
          <div className="relative min-w-0 flex-1">
            <span
              className="absolute -left-[calc(1.5rem+11px)] top-3 hidden h-3 w-3 rounded-full border-2 border-white bg-brand-pink/40 md:block"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-brand-pink/30 bg-brand-blush/25 px-4 py-3">
              <BreakIcon title={item.title} />
              <div>
                <h3 className="font-medium text-brand-ink/75">{item.title}</h3>
                {item.description && <p className="text-sm text-brand-ink/55">{item.description}</p>}
              </div>
            </div>
          </div>
        </li>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal delay={index * 0.05}>
      <li className="group relative flex gap-4 pb-3">
        <div className="w-[5.5rem] shrink-0 pt-1 text-right md:text-left">
          <time dateTime={item.startIso} className="block font-serif text-3xl font-bold tabular-nums text-brand-ink">
            {clock.time}
          </time>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-ink/55">{clock.period}</span>
        </div>

        <div className="relative min-w-0 flex-1">
          <span
            className={`absolute -left-[calc(1.5rem+11px)] top-4 hidden h-3 w-3 rounded-full border-2 border-white bg-brand-pink md:block ${
              isLive ? "live-dot-pulse" : ""
            }`}
            aria-hidden="true"
          />

          <article
            className={`rounded-2xl bg-white p-5 shadow-soft transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-card ${
              item.featured ? "border-l-4 border-brand-pink bg-gradient-to-r from-brand-blush/35 to-white" : ""
            } ${isLive ? "ring-1 ring-brand-pink/25" : ""}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="font-serif text-xl leading-snug text-brand-ink md:text-[1.35rem]">{item.title}</h3>
              <div className="flex items-center gap-2">
                {durationMin > 0 && (
                  <span className="rounded-pill bg-brand-cream px-2.5 py-0.5 text-xs font-semibold text-brand-ink/70">
                    {durationMin} min
                  </span>
                )}
                {isLive && (
                  <span className="rounded-pill bg-brand-pink px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                    Live now
                  </span>
                )}
              </div>
            </div>

            {item.speaker && (
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-ink">
                <SpeakerAvatar name={item.speaker} />
                {item.speaker}
              </p>
            )}

            {item.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-ink/65">{item.description}</p>
            )}
          </article>
        </div>
      </li>
    </ScrollReveal>
  );
}

export function Agenda({ config }: Props) {
  const days = config.agendaDays;
  const [activeDayId, setActiveDayId] = useState(days[0]?.id ?? "");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const activeDay: AgendaDay | undefined = days.find((d) => d.id === activeDayId) ?? days[0];
  const liveItem = useMemo(
    () => (now && activeDay ? getLiveAgendaItem(activeDay.items, now) : null),
    [now, activeDay],
  );

  return (
    <section id="agenda" className="bg-brand-cream px-4 py-12 md:px-6 md:py-16" aria-labelledby="agenda-heading">
      <div className="mx-auto max-w-content">
        <div className="lg:grid lg:grid-cols-[minmax(220px,280px)_1fr] lg:gap-10">
          <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-pink">The program</p>
            <h2 id="agenda-heading" className="mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-brand-ink">
              Event Schedule
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-ink/70">
              All times are IST. Select a day to browse sessions, breaks, and live updates during the event.
            </p>

            {days.length > 0 && (
              <div
                className="mt-5 inline-flex flex-wrap gap-1 rounded-pill border border-brand-blush bg-white p-1 shadow-soft"
                role="tablist"
                aria-label="Agenda days"
              >
                {days.map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    role="tab"
                    aria-selected={day.id === activeDayId}
                    id={`agenda-tab-${day.id}`}
                    aria-controls={`agenda-panel-${day.id}`}
                    className={`rounded-pill px-5 py-2.5 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-brand-blue ${
                      day.id === activeDayId
                        ? "bg-brand-pink text-white shadow-lift"
                        : "text-brand-ink/65 hover:text-brand-ink"
                    }`}
                    onClick={() => setActiveDayId(day.id)}
                    onKeyDown={(e) => {
                      const idx = days.findIndex((d) => d.id === day.id);
                      if (e.key === "ArrowRight" && idx < days.length - 1) {
                        e.preventDefault();
                        setActiveDayId(days[idx + 1]!.id);
                        document.getElementById(`agenda-tab-${days[idx + 1]!.id}`)?.focus();
                      }
                      if (e.key === "ArrowLeft" && idx > 0) {
                        e.preventDefault();
                        setActiveDayId(days[idx - 1]!.id);
                        document.getElementById(`agenda-tab-${days[idx - 1]!.id}`)?.focus();
                      }
                    }}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            )}
          </ScrollReveal>

          <div
            role="tabpanel"
            id={`agenda-panel-${activeDayId}`}
            aria-labelledby={`agenda-tab-${activeDayId}`}
            className="mt-8 lg:mt-0"
          >
            <ol className="relative space-y-0 pl-0 md:pl-6">
              <div
                className="absolute bottom-2 left-[5.5rem] top-2 hidden w-0.5 bg-brand-pink/30 md:left-[calc(5.5rem+1.5rem)] md:block"
                aria-hidden="true"
              />
              {activeDay?.items.map((item, index) => (
                <AgendaRow
                  key={item.id}
                  item={item}
                  isLive={liveItem?.id === item.id}
                  index={index}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
