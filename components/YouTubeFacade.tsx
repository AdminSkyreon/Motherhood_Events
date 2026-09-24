"use client";

import Image from "next/image";
import { useState } from "react";
import { isYoutubePlaceholder } from "@/lib/video";

type Props = {
  youtubeId: string;
  title: string;
  variant?: "default" | "cinematic";
  personName?: string;
  designation?: string;
  messageTitle?: string;
  duration?: string;
  className?: string;
};

/** Click-to-load privacy-friendly embed (youtube-nocookie.com). */
export function YouTubeFacade({
  youtubeId,
  title,
  variant = "default",
  personName,
  designation,
  messageTitle,
  duration,
  className = "",
}: Props) {
  const [active, setActive] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const cinematic = variant === "cinematic";
  const missing = isYoutubePlaceholder(youtubeId) || thumbError;
  const thumb = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
  const radius = cinematic ? "rounded-[20px]" : "rounded-card";
  const playLabel = personName ? `Play message from ${personName}` : `Play video: ${title}`;

  if (active && !missing) {
    return (
      <div className={`aspect-video overflow-hidden bg-brand-ink shadow-card ${radius} ${className}`}>
        <iframe
          src={embedSrc}
          title={title}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`group relative aspect-video w-full overflow-hidden bg-brand-ink shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink ${radius} ${className}`}
      onClick={() => !missing && setActive(true)}
      aria-label={missing ? `${title} — video coming soon` : playLabel}
      disabled={missing}
    >
      {missing ? (
        <span
          className="absolute inset-0 bg-gradient-to-br from-[#3d2430] via-brand-ink to-[#1a1416]"
          aria-hidden="true"
        />
      ) : (
        <Image
          src={thumb}
          alt=""
          fill
          className="object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 60vw"
          unoptimized
          onError={() => setThumbError(true)}
        />
      )}

      <span
        className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-transparent"
        aria-hidden="true"
      />

      {duration && !missing && (
        <span className="absolute right-4 top-4 rounded-pill bg-brand-ink/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {duration}
        </span>
      )}

      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        {missing ? (
          <span className="flex flex-col items-center gap-3 px-6 text-center">
            <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-white/30 bg-white/10">
              <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-white/90" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-white/90">Video coming soon</span>
          </span>
        ) : (
          <span className="video-play-ring flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white shadow-lift transition group-hover:scale-105 md:h-[72px] md:w-[72px]">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-brand-pink md:h-9 md:w-9" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
      </span>

      {cinematic && personName && (
        <span className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-20 text-left">
          <span className="block font-serif text-lg text-white md:text-xl">{personName}</span>
          {designation && (
            <span className="mt-0.5 block text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white/80">
              {designation}
            </span>
          )}
          {(messageTitle ?? title) && (
            <span className="mt-2 block line-clamp-1 text-sm text-white/75">{messageTitle ?? title}</span>
          )}
        </span>
      )}
    </button>
  );
}
