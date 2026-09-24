/** Absolute URL helper for static export + optional basePath. */

export function getSiteUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.motherhoodindia.com/natural-birthing-event";
  return base.replace(/\/$/, "");
}

export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
