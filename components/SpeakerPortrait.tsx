import Image from "next/image";
import { assetPath } from "@/lib/site-url";
import { InitialsAvatar, isPlaceholderSpeakerPhoto, type InitialsVariant } from "./InitialsAvatar";

type Props = {
  name: string;
  photoSrc: string;
  className?: string;
  avatarVariant?: InitialsVariant;
  priority?: boolean;
  /** Tall arch mask for faculty cards */
  arch?: boolean;
  /** No decorative mask — the card frame crops the photo */
  plain?: boolean;
};

export function SpeakerPortrait({
  name,
  photoSrc,
  className = "",
  avatarVariant = "speaker",
  priority,
  arch = false,
  plain = false,
}: Props) {
  const src = assetPath(photoSrc);
  const mask = plain ? "" : arch ? "arch-speaker" : "arch-photo";

  if (isPlaceholderSpeakerPhoto(photoSrc)) {
    return <InitialsAvatar name={name} variant={avatarVariant} className={`${mask} ${className}`} />;
  }

  return (
    <Image
      src={src}
      alt={`Portrait of ${name}`}
      width={400}
      height={500}
      priority={priority}
      className={`${plain ? "h-full w-full object-cover object-[center_18%]" : "aspect-[4/5] w-full object-cover"} ${mask} ${className}`}
    />
  );
}
