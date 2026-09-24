export type InitialsVariant = "pink" | "blue" | "blush" | "peach" | "speaker";

type Props = {
  name: string;
  className?: string;
  variant?: InitialsVariant;
};

export function isPlaceholderSpeakerPhoto(src: string): boolean {
  return src.includes("placeholder");
}

export function getInitials(name: string): string {
  const parts = name.replace(/\./g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts[0]?.toLowerCase() === "birth") return "BT";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : parts[0]?.[1] ?? "";
  return (first + last).toUpperCase();
}

const gradients: Record<InitialsVariant, string> = {
  pink: "from-[#db5070] to-[#9c3456]",
  blue: "from-[#0057a4] to-[#003566]",
  blush: "from-[#fbdce9] to-[#db5070]",
  peach: "from-[#ffe8df] to-[#db5070]",
  speaker: "from-[#fbdce9] to-[#ffe8df]",
};

export function InitialsAvatar({ name, className = "", variant = "pink" }: Props) {
  const lightText = variant !== "speaker";
  return (
    <div
      className={`flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br ${gradients[variant]} ${className}`}
      aria-hidden="true"
    >
      <span
        className={`font-serif text-4xl font-normal md:text-5xl ${lightText ? "text-white/90" : "text-brand-ink/85"}`}
      >
        {getInitials(name)}
      </span>
    </div>
  );
}
