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

**All copy, dates, agenda, speakers, notes, and the video** live in one file:

- [`data/programme.ts`](data/programme.ts) — text from the *Natural Birthing Programme* brochure (PDF)

The page itself is [`components/Landing.tsx`](components/Landing.tsx), which reads from `data/programme.ts`.

## Where to change colors and fonts

1. **Landing page colours** — `--lp-*` variables on `.lp` in [`app/globals.css`](app/globals.css).
2. **Fonts** — [`app/layout.tsx`](app/layout.tsx): Lobster (title), Montserrat (≈ Gotham, body), Sorts Mill Goudy (≈ Goudy Old Style, tagline) via `next/font`.
3. **Animations** — load sequence (`.lp-in`, `.lp-write`) and scroll reveal (`[data-reveal]`, driven by [`components/RevealOnScroll.tsx`](components/RevealOnScroll.tsx)) in `app/globals.css`.

## Assets

| File | Purpose |
|------|---------|
| `public/brochure/art/*` | Watercolour, leaves and mother illustration cut from the brochure PDF |
| `public/brochure/speakers/*` | Speaker photos from the brochure PDF |
| `public/motherhood-logo.png` | Motherhood logo |
| `public/og-image.png` | Social preview image |
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

- [ ] Confirm all copy in `data/programme.ts` against the final brochure
- [ ] Add **`public/og-image.png`** (1200×630) and update `app/layout.tsx` OG `images` URL if needed
- [ ] Confirm **`<meta name="robots" content="noindex, nofollow">`** (via `metadata.robots` in `layout.tsx`)
- [ ] Backend: send **`X-Robots-Tag: noindex, nofollow`** for this URL on the origin
- [ ] Run Lighthouse on production build (target 90+)
- [ ] Test `prefers-reduced-motion` (no load or scroll animations)

## Tech notes

- Next.js App Router, TypeScript, Tailwind CSS
- **No** API routes, server actions, forms, analytics, or cookies
- Animations are plain CSS plus one small `IntersectionObserver`; both respect `prefers-reduced-motion`
