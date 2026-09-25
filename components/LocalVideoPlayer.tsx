"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/site-url";

type Props = {
  fileSrc: string;
  title: string;
  personName?: string;
  duration?: string;
  posterSrc?: string;
  className?: string;
};

export function LocalVideoPlayer({
  fileSrc,
  title,
  personName,
  duration,
  posterSrc,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [needsSound, setNeedsSound] = useState(false);
  const src = assetPath(fileSrc);
  const poster = posterSrc ? assetPath(posterSrc) : undefined;

  const play = (video: HTMLVideoElement) => {
    setStarted(true);
    const attempt = video.play();
    if (!attempt) return;
    attempt.catch((error: unknown) => {
      // AbortError: paused (e.g. scrolled away) before playback started — not an autoplay block.
      if (error instanceof DOMException && error.name === "AbortError") return;
      video.muted = true;
      setNeedsSound(true);
      video.play().catch(() => {});
    });
  };

  useEffect(() => {
    const node = wrapRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!reduceMotion) play(video);
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.5] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`relative aspect-video overflow-hidden bg-black ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-contain bg-black"
        poster={poster}
        playsInline
        controls={started}
        preload="metadata"
        title={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>

      {!started && (
        <button
          type="button"
          className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none"
          aria-label={personName ? `Play message from ${personName}` : `Play video: ${title}`}
          onClick={() => {
            const video = videoRef.current;
            if (video) play(video);
          }}
        >
          {poster && <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />}
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(35,31,32,0.2),transparent_58%)]" />
          {duration && (
            <span className="absolute right-4 top-4 rounded-pill bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-ink shadow-soft">
              {duration}
            </span>
          )}
          <span className="video-play-ring relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lift transition group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-brand-pink" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {needsSound && (
        <button
          type="button"
          className="absolute left-4 top-4 z-10 rounded-pill bg-white px-3 py-1.5 text-xs font-bold text-brand-ink shadow-soft"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            video.muted = false;
            setNeedsSound(false);
            void video.play();
          }}
        >
          Tap for sound
        </button>
      )}
    </div>
  );
}
