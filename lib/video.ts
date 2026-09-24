const PLACEHOLDER_IDS = new Set(["", "placeholder", "VIDEO_ID", "VIDEO_ID_HERE", "TBD"]);

/** True when no real YouTube asset is configured yet. */
export function isYoutubePlaceholder(youtubeId: string): boolean {
  const id = youtubeId.trim();
  if (PLACEHOLDER_IDS.has(id) || PLACEHOLDER_IDS.has(id.toUpperCase())) return true;
  if (/^x+$/i.test(id)) return true;
  return false;
}
