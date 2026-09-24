"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Speaker } from "@/data/event";
import { SpeakerPortrait } from "./SpeakerPortrait";

type Props = {
  speaker: Speaker | null;
  onClose: () => void;
};

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function SpeakerModal({ speaker, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!speaker) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (nodes.length === 0) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [speaker, onClose]);

  if (!speaker) return null;

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-brand-ink/60 backdrop-blur-md"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="speaker-modal-title"
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-surface p-6 shadow-card md:p-8"
        {...panelMotion}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-10 rounded-xl border border-brand-blush bg-white px-3 py-1.5 text-sm font-bold text-brand-ink hover:bg-brand-blush"
          onClick={onClose}
        >
          Close
        </button>

        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <SpeakerPortrait
            name={speaker.name}
            photoSrc={speaker.photoSrc}
            arch
            className="mx-auto w-full max-w-[220px] md:mx-0 md:max-w-none md:w-48"
          />
          <div className="min-w-0 flex-1">
            <h2 id="speaker-modal-title" className="pr-16 font-serif text-2xl text-brand-ink md:text-3xl">
              {speaker.name}
            </h2>
            <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-blue">
              {speaker.designation}
            </p>
            <p className="mt-2 inline-block rounded-pill bg-brand-blush px-3 py-1 text-xs font-semibold text-brand-accent">
              {speaker.specialty}
            </p>
            {speaker.sessionLabel && (
              <p className="mt-4 inline-block rounded-pill bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
                {speaker.sessionLabel}
              </p>
            )}
            <p className="mt-5 text-sm leading-relaxed text-brand-ink/75 md:text-base">{speaker.bio}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
