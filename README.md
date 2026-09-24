# Natural Birthing Event — Showcase landing page

Static Next.js landing page for **Motherhood Hospitals** (Natural Birthing CME). Built for brand review before go-live on [motherhoodindia.com](https://www.motherhoodindia.com/).

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where to edit content

**All copy, dates, agenda, videos, speakers, and venue** live in one file:

- [`data/event.ts`](data/event.ts)

Components read from `eventConfig` only. Do not hard-code event text in components.

## Where to change colors and fonts

1. **Colors, radii, shadows** — CSS variables in [`app/globals.css`](app/globals.css) (`:root`).
2. **Tailwind mapping** — [`tailwind.config.ts`](tailwind.config.ts) (`brand.*`, `surface.*`).
3. **Fonts** — [`app/layout.tsx`](app/layout.tsx) (`DM_Serif_Display` + `Inter` via `next/font`). Swap families there and update `--font-serif` / `--font-sans` if needed.

## Assets

| File | Purpose |
|------|---------|
| `public/logo-placeholder.svg` | Header logo — replace with official Motherhood logo |
| `public/og-image.svg` | Social preview — replace with **og-image.png** 1200×630 before launch |
| `public/speakers/*.svg` | Speaker placeholders — replace with JPG/WebP paths in `data/event.ts` |
| `public/videos/vijayarathna-sireesha-reddy.mp4` | Featured message video (web-compressed ~10 MB, 720p). Original 4K master: `media-source/` (gitignored). |

## Build and export

```bash
npm run build
```

Output is static files in **`/out`** (`output: 'export'`). No Node server required.

### Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Absolute URL for `metadataBase`, Open Graph, canonical |
| `NEXT_PUBLIC_BASE_PATH` | Optional sub-path (sets Next.js `basePath` + `assetPrefix`) |

## GitHub Pages (this repo)

Pushes to **`main`** run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) and publish **`/out`**.

- **Live URL:** [https://adminskyreon.github.io/Motherhood_Events/](https://adminskyreon.github.io/Motherhood_Events/)
- Builds with `NEXT_PUBLIC_BASE_PATH=/Motherhood_Events` so assets resolve under the project Pages path.
- The featured **MP4 is committed** (720p web encode). Re-compress from `media-source/` with ffmpeg if you replace the master.

In the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Deploy `/out`

Upload the contents of `out/` to any static host (Azure Static Web Apps, S3 + CloudFront, nginx, motherhoodindia CDN, etc.).

If using `NEXT_PUBLIC_BASE_PATH`, rebuild with that variable set so asset links resolve correctly.

## Pre-launch checklist

- [ ] Replace all placeholders in `data/event.ts` (date, venue, agenda, bios)
- [ ] Replace `youtubeId` values with real YouTube IDs (or switch embed strategy if using Drive)
- [ ] Swap logo and speaker photos in `public/`
- [ ] Add **`public/og-image.png`** (1200×630) and update `app/layout.tsx` OG `images` URL if needed
- [ ] Confirm **`<meta name="robots" content="noindex, nofollow">`** (via `metadata.robots` in `layout.tsx`)
- [ ] Backend: send **`X-Robots-Tag: noindex, nofollow`** for this URL on the origin
- [ ] Remove or keep restrictive `robots.txt` on the host (do not allow indexing until brand approves)
- [ ] Run Lighthouse on production build (target 90+)
- [ ] Test keyboard: header menu, speaker modal (Esc, focus return), video facades
- [ ] Test `prefers-reduced-motion` (no scroll animations)

## Tech notes

- Next.js App Router, TypeScript, Tailwind CSS
- **No** API routes, server actions, forms, analytics, or cookies
- Framer Motion used only in `ScrollReveal`; respects `prefers-reduced-motion`
- YouTube embeds load only after click (`youtube-nocookie.com`)

## Legacy static site

The previous HTML version remains in the repo root (`index.html`, `assets/`) for reference. The showcase build is the Next.js app described above.
