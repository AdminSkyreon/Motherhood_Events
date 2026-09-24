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
};

export function SpeakerPortrait({
  name,
  photoSrc,
  className = "",
  avatarVariant = "speaker",
  priority,
  arch = false,
}: Props) {
  const src = assetPath(photoSrc);
  const mask = arch ? "arch-speaker" : "arch-photo";

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
      className={`aspect-[4/5] w-full object-cover ${mask} ${className}`}
    />
  );
}
