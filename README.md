# Aurence Fashion Empire

One house, every atelier. A multi-brand fashion marketplace — shop gowns,
ankara, jewelry, shoes, and couture from the world's finest houses under a
single roof, with a checkout that spans every brand.

This repo is the foundation: Header, Footer, and Hero are live. Every other
route (`/shop`, `/dressing-room`, `/designers`, etc.) renders the
**Under Construction** placeholder until it's built.

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
`localStorage`. An inline script in `index.html` applies the stored theme
before paint to avoid a flash of the wrong theme.

The brand's signature motif is the **stitch line** (`components/ui/StitchLine.tsx`)
— an SVG seam that draws itself in on scroll, used as a divider in the
Hero, Footer, and Under Construction page.

## Folder structure

```
src/
  components/
    layout/       Header, Footer
    sections/     Page sections (Hero, and future ones)
    ui/           Small reusable pieces (StitchLine, ThemeToggle)
  context/        ThemeContext
  lib/            navigation.ts — single source of truth for nav links
  pages/          Route-level components (Home, UnderConstruction)
```

## Adding a new route

1. Add the link to the relevant array in `src/lib/navigation.ts`.
2. It will render `UnderConstruction` automatically (catch-all route in `App.tsx`).
3. When ready to build it, add a real `<Route>` above the catch-all in `App.tsx`
   pointing to a new page in `src/pages/`.

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
