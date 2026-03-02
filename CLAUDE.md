# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing landing page ("Y a vivir") for ElTiempo + Allianz, built with Astro. Single-page site with horizontal scroll animations, video hero, and card-based content sections.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build (outputs to dist/)
npm run preview    # Preview production build
npm run check      # TypeScript checking (astro check)
npm run format     # Format all files with Prettier
npm run cleanup    # Remove .astro, dist, node_modules, bun.lock
```

No test framework is configured.

## Tech Stack

- **Astro 5** — static site generator, no UI framework (pure `.astro` components)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **TypeScript** (strict mode, path alias `@/*` → `./src/*`)
- **Prettier** with astro + tailwindcss plugins (tabs, no semis, single quotes, 160 print width)

## Architecture

**Single page** (`src/pages/index.astro`) composed of sectioned components:

- `Layout.astro` — base HTML shell, loads `main.css` and `main.ts`
- `Head.astro` — analytics scripts (Didomi consent, GTM, ElTiempo content platform)
- `Header.astro` / `NavElTiempo.astro` — branding and navigation
- `Section01.astro` — hero with background video
- `Section02.astro` — three-column card grid (Climate/Emergencies/Wellness)
- `Section03.astro` — footer with links

**Client-side JS** (`src/main.ts`):
- Intersection Observer for `.reveal` scroll animations
- Tab switching with `[id^="tab-"]` selectors

**Styling** (`src/main.css`):
- Custom Tailwind v4 theme with CSS variables (blue color palette, Kanit font)
- Scroll-driven animations via `animation-timeline: view()` (desktop xl+ only)
- Custom variants: `@custom-variant reveal`, `@custom-variant revealed`
- View Transitions API enabled

## Conventions

- Components are `.astro` files with no client framework (vanilla JS only)
- Images use WebP format and Astro's `<Image>` component for optimization
- Custom fonts (Kanit) loaded as WOFF2 from `/public/`
- Site is currently `noindex,nofollow` (staging/testing)
