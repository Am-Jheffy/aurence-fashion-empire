# Aurence Fashion Empire

One house, every atelier. A multi-brand fashion marketplace — shop gowns,
ankara, jewelry, shoes, and couture from the world's finest houses under a
single roof, with a checkout that spans every brand.

Header, Footer, Hero, and the full Brands directory + individual brand
pages are live. Every other route (`/shop`, `/dressing-room`, `/designers`,
etc.) renders the **Under Construction** placeholder until it's built.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, using `@theme` tokens — no `tailwind.config.js`)
- **React Router v7** for routing
- **Framer Motion** for animation

## Design system

Palette, type, and motion tokens live in `src/index.css` under `@theme`.

| Token | Value | Use |
|---|---|---|
| `obsidian` | `#0b0708` | Dark background |
| `bone` | `#f7f1ec` | Light background |
| `bordeaux` | `#6e0f1a` | Primary accent (CTAs, seal) |
| `bordeaux-bright` | `#9e1b2b` | Hover state |
| `champagne` | `#c9a227` | Accent hairlines, labels, stitch motif |
| `ink` | `#1a1210` | Text on light background |

Fonts: **Fraunces** (display/headlines) + **Manrope** (body/UI), loaded via
Google Fonts in `index.html`.

Light/dark mode is a user-controlled toggle (`ThemeToggle`), not just a
system preference — state lives in `ThemeContext` and persists to
`localStorage`.

## Folder structure

```
src/
  components/
    layout/       Header, Footer
    sections/     Homepage sections (Hero, HowItWorks, FeaturedBrands, etc.)
    ui/           Small reusable pieces (StitchLine, ThemeToggle, BrandCard, WaitlistModal)
  context/        ThemeContext, WaitlistModalContext
  lib/            navigation.ts, mockData.ts, waitlist.ts, submitWaitlistEntry.ts
  pages/          Route-level components (Home, BrandsDirectory, BrandDetail, UnderConstruction)
```

## Pre-launch waitlist (temporary)

The waitlist modal (`context/WaitlistModalContext.tsx`, `components/ui/WaitlistModal.tsx`)
and the footer newsletter form exist only to capture early interest before
launch. They are **not** meant to survive launch — this section is here so
that's not forgotten in a few months.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Deployed on Vercel. Framework preset: Vite. Build command: `npm run build`.
Output directory: `dist`.
