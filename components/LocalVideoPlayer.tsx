"use client";

import { useRef, useState } from "react";
import { assetPath } from "@/lib/site-url";

type Props = {
  fileSrc: string;
  title: string;
  personName?: string;
  designation?: string;
  messageTitle?: string;
  duration?: string;
  className?: string;
};

export function LocalVideoPlayer({
  fileSrc,
  title,
  personName,
  designation,
  messageTitle,
  duration,
  className = "",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const src = assetPath(fileSrc);
  const playLabel = personName ? `Play message from ${personName}` : `Play video: ${title}`;

  const startPlayback = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  };

  if (playing) {
    return (
      <div className={`aspect-video overflow-hidden rounded-[20px] bg-brand-ink shadow-card ${className}`}>
        <video
          ref={videoRef}
          className="h-full w-full object-contain bg-black"
          controls
          playsInline
          preload="metadata"
          title={title}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`group relative aspect-video w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-[#3d2430] via-brand-ink to-[#1a1416] shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink ${className}`}
      onClick={startPlayback}
      aria-label={playLabel}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>

      <span
        className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/35 to-brand-ink/20"
        aria-hidden="true"
      />

      {duration && (
        <span className="absolute right-4 top-4 rounded-pill bg-brand-ink/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {duration}
        </span>
      )}

      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="video-play-ring flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white shadow-lift transition group-hover:scale-105 md:h-[72px] md:w-[72px]">
          <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-brand-pink md:h-9 md:w-9" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      {personName && (
        <span className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-20 text-left">
          <span className="block font-serif text-lg text-white md:text-xl">{personName}</span>
          {designation && (
            <span className="mt-0.5 block text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white/80">
              {designation}
            </span>
          )}
          {(messageTitle ?? title) && (
            <span className="mt-2 block line-clamp-2 text-sm text-white/75">{messageTitle ?? title}</span>
          )}
        </span>
      )}
    </button>
  );
}
