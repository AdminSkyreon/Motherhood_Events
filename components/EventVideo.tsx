import type { FeaturedVideo } from "@/data/event";
import { isYoutubePlaceholder } from "@/lib/video";
import { LocalVideoPlayer } from "./LocalVideoPlayer";
import { YouTubeFacade } from "./YouTubeFacade";

type Props = {
  video: FeaturedVideo;
  className?: string;
};

export function EventVideo({ video, className }: Props) {
  if (video.fileSrc) {
    return (
      <LocalVideoPlayer
        fileSrc={video.fileSrc}
        title={video.title}
        personName={video.personName}
        designation={video.designation}
        messageTitle={video.title}
        duration={video.duration}
        posterSrc={video.posterSrc}
        className={className}
      />
    );
  }

  return (
    <YouTubeFacade
      youtubeId={video.youtubeId}
      title={video.title}
      variant="cinematic"
      personName={video.personName}
      designation={video.designation}
      messageTitle={video.title}
      duration={video.duration}
      className={className}
    />
  );
}

/** Prefer local file when set; skip duplicate YouTube rows that only mirror the same file. */
export function getDisplayVideos(videos: FeaturedVideo[]): FeaturedVideo[] {
  const withFile = videos.filter((v) => v.fileSrc);
  if (withFile.length > 0) {
    const seen = new Set<string>();
    return withFile.filter((v) => {
      const key = v.fileSrc!;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  return videos.filter((v) => !isYoutubePlaceholder(v.youtubeId));
}
