import type { AgendaItem } from "@/data/event";

/** Returns the agenda item that is "live" at `now`, if any. */
export function getLiveAgendaItem(items: AgendaItem[], now: Date): AgendaItem | null {
  const t = now.getTime();
  for (const item of items) {
    if (item.isBreak) continue;
    const start = new Date(item.startIso).getTime();
    const end = new Date(item.endIso).getTime();
    if (t >= start && t < end) return item;
  }
  return null;
}

export function formatAgendaTime(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

/** Clock face for schedule rows: large time + smaller AM/PM. */
export function formatAgendaClock(iso: string): { time: string; period: string } {
  const parts = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).formatToParts(new Date(iso));

  const hour = parts.find((p) => p.type === "hour")?.value ?? "";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "";
  const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value?.toUpperCase() ?? "";

  return { time: `${hour}:${minute}`, period: dayPeriod };
}

export function agendaDurationMinutes(startIso: string, endIso: string): number {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  return Math.max(0, Math.round(ms / 60_000));
}
