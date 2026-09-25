type Props = {
  eyebrow: string;
  title: string;
  id?: string;
  description?: string;
  inverted?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, id, description, inverted, className = "" }: Props) {
  return (
    <header className={className}>
      <p
        className={`text-[0.7rem] font-bold uppercase tracking-[0.22em] ${
          inverted ? "text-brand-blush/90" : "text-brand-pink"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.08] tracking-tight ${
          inverted ? "text-white" : "text-brand-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${inverted ? "text-white/75" : "text-brand-ink/70"}`}>
          {description}
        </p>
      )}
    </header>
  );
}
