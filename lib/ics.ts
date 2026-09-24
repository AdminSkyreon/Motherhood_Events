/** Client-side .ics download — no server required. */

function formatIcsDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function downloadIcs(options: {
  startIso: string;
  endIso: string;
  summary: string;
  description: string;
  location: string;
  filename?: string;
}): void {
  const uid = `${Date.now()}@motherhoodindia.com`;
  const dtstamp = formatIcsDate(new Date().toISOString());
  const dtstart = formatIcsDate(options.startIso);
  const dtend = formatIcsDate(options.endIso);

  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Motherhood Hospitals//Natural Birthing Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapeIcs(options.summary)}`,
    `DESCRIPTION:${escapeIcs(options.description)}`,
    `LOCATION:${escapeIcs(options.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([body], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = options.filename ?? "natural-birthing-event.ics";
  a.click();
  URL.revokeObjectURL(url);
}
