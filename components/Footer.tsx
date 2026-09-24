import Image from "next/image";
import type { EventConfig } from "@/data/event";
import { assetPath } from "@/lib/site-url";

type Props = { config: EventConfig };

export function Footer({ config }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <Image
              src={assetPath(config.logo.src)}
              alt={config.logo.alt}
              width={config.logo.width}
              height={config.logo.height}
              className="mx-auto h-12 w-auto brightness-0 invert md:mx-0"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">{config.tagline}</p>
            <a
              href={config.footer.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-bold text-brand-blush hover:text-white"
            >
              {config.footer.websiteLabel}
            </a>
          </div>
        </div>
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-white/45 md:text-sm">{config.footer.disclaimer}</p>
        <p className="mt-8 text-xs text-white/35">© {year} Motherhood Hospitals. Showcase / review build.</p>
      </div>
    </footer>
  );
}
