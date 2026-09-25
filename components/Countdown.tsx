"use client";

import { useEffect, useState } from "react";

type Props = { targetIso: string; variant?: "default" | "hero" };

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function getParts(targetIso: string, now: number): Parts {
  const diff = new Date(targetIso).getTime() - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountdownUnit({
  value,
  label,
  hero,
  placeholder,
}: {
  value: string;
  label: string;
  hero?: boolean;
  placeholder?: boolean;
}) {
  if (hero) {
    return (
      <div className="flex flex-col items-center md:items-start">
        <span
          className={`font-serif text-3xl font-normal tabular-nums sm:text-4xl md:text-5xl ${
            placeholder ? "text-white/40" : "text-white"
          }`}
        >
          {value}
        </span>
        <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/80">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-3xl font-normal tabular-nums text-brand-ink sm:text-4xl">{value}</span>
      <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-ink/55">{label}</span>
    </div>
  );
}

/** Hydration-safe: first paint matches SSR (zeros), then ticks on client. */
export function Countdown({ targetIso, variant = "default" }: Props) {
  const hero = variant === "hero";
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<Parts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    setMounted(true);
    const tick = () => setParts(getParts(targetIso, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  if (!mounted) {
    const labels = ["Days", "Hours", "Min", "Sec"];
    return (
      <div
        className={`flex flex-wrap items-end justify-center gap-6 md:justify-start md:gap-10 ${hero ? "" : "justify-center"}`}
        aria-hidden="true"
      >
        {labels.map((label) => (
          <CountdownUnit key={label} value="--" label={label} hero={hero} placeholder />
        ))}
      </div>
    );
  }

  if (parts.done) {
    return (
      <p
        className={`text-sm font-semibold ${hero ? "hero-readable text-white" : "rounded-2xl bg-brand-blush px-4 py-3 text-brand-accent"}`}
      >
        The event has started — welcome.
      </p>
    );
  }

  const cells = [
    { value: pad(parts.days), label: "Days" },
    { value: pad(parts.hours), label: "Hours" },
    { value: pad(parts.minutes), label: "Min" },
    { value: pad(parts.seconds), label: "Sec" },
  ];

  return (
    <div
      className="flex flex-wrap items-end justify-center gap-6 md:justify-start md:gap-10"
      role="timer"
      aria-live="polite"
    >
      {cells.map((c, i) => (
        <div key={c.label} className="flex items-end gap-6 md:gap-10">
          {i > 0 && (
            <span
              className={`hidden pb-6 font-serif text-2xl md:inline ${hero ? "text-white/35" : "text-brand-ink/25"}`}
              aria-hidden="true"
            >
              ·
            </span>
          )}
          <CountdownUnit value={c.value} label={c.label} hero={hero} />
        </div>
      ))}
    </div>
  );
}
