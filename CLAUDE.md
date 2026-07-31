# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Ecommetrica marketing website: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4. No CMS or database — content lives in the repo as MDX files and TypeScript data modules.

## Commands

```bash
npm run dev      # start dev server (Turbopack) at http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config: next/core-web-vitals, next/typescript)
```

There is no test suite configured. `bun.lock` is present alongside `package-lock.json`, but `npm` is the workflow documented in the README — check with the user before assuming bun is the intended package manager.

## Environment variables

Copy `.env.example` to `.env.local`. Required for the contact form (`src/app/api/contact/route.ts`) to actually send email via Resend:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — verified sender in Resend
- `CONTACT_TO_EMAIL` — destination inbox

Without these set, the API route returns a 500 with a friendly error instead of throwing.

## Branching

- `production` — deploys to the live site.
- `qa` — staging; every push and PR gets a Vercel preview URL.
- Feature work branches off `qa` and merges back via PR; `qa` promotes to `production` when ready.

## Architecture

**Routing**: standard App Router pages under `src/app/`. Dynamic routes (`work/[slug]`, `blog/[slug]`) use `generateStaticParams` + `generateMetadata` and treat `params` as a `Promise` (Next 16 convention) — always `await params` before use.

**Content is data, not a CMS**:
- Case studies: a single array in `src/lib/work.ts`. Each `CaseStudy` is a discriminated union on `external` — internal projects (`external?: false`) render their own page at `/work/[slug]` via `src/lib/work.ts`'s `summary`; external projects (`external: true`) carry a `url` and link out instead (the `[slug]` page calls `notFound()` for these). Use `getInternalCaseStudies()` when listing pages that should be internally routable.
- Blog posts: MDX files in `src/content/blog/*.mdx` with `title`/`date`/`excerpt` frontmatter, read via `src/lib/blog.ts` (`fs.readdirSync`/`gray-matter`, sorted by date descending). Adding a post is just adding a file — no registration step elsewhere.
- Pricing plans: static array in `src/lib/pricing.ts`.

**Global providers/layout** (`src/app/layout.tsx`): loads the Clash Display local font (three weights, CSS var `--font-clash`), wraps the app in `LanguageProvider`, and always renders `SmoothScroll` + `Header` + `Footer` around page content. `src/app/template.tsx` wraps every route transition in a `framer-motion` fade/slide — this runs on every navigation, not just first mount.

**i18n**: `src/components/LanguageProvider.tsx` is a from-scratch client-side context (no i18n library). `Lang` is `"es" | "en"`, default `"es"` (root `<html lang="es">`), persisted to `localStorage["ecom-lang"]`. The dictionary (`Dict` type) currently only covers nav/chrome strings (studio/work/blog/contact/etc.) — most page copy is hardcoded Spanish and not yet wired through `useLanguage()`. When adding UI text, check whether it belongs in the shared dict or is page-specific copy.

**Theming**: `src/components/ThemeSwitcher.tsx` re-tints the whole page at runtime, persisted to `localStorage["ecom-theme"]`. Three presets — `ember` (warm, default), `crimson` (red), `noir` (fully dark monochrome) — each set six custom properties. The token roles are strict, and mixing them up is what breaks a dark theme:

- `--color-ecom-surface` / `--color-ecom-ink` — the page background and the text on it. These **invert** in `noir`. Use `text-ecom-ink`, `border-ecom-ink/10`, `bg-ecom-surface` for anything on the page itself.
- `--color-ecom-dark` / `--color-ecom-black` — blocks that are dark in *every* theme (Hero, Pillars, Planes, Footer, project-card gradients, image overlays). Text on these is hardcoded `text-white`, so they must never lighten. **Never use `ecom-dark` as a text color** — it is a background role.
- `--color-ecom-orange` (accent) / `--color-ecom-red` (accent-deep). Only the accent is contrast-checked against both light and dark surfaces, so accent-deep is for gradients/backgrounds only — **never `text-ecom-red`**.

`noir` sets `surface` and `black` to the same value on purpose: the light and dark sections collapse together so no boundary line can appear between components. Two things exist to keep that seamless and must be preserved — film grain is a single fixed `body::after` overlay (per-section grain drew a texture seam at every boundary), and blurred accent glows are inset from section top/bottom edges (a blur clipped by `overflow-hidden` draws a hard line there). `.prose` overrides in `globals.css` repoint the typography plugin's fixed greys at the themed ink for the same reason.

During a swap the switcher adds `.theming` to `<html>` for 500ms, which a rule in `globals.css` uses to cross-fade every themed property before removing itself, leaving normal hover transitions untouched. This mutates `document.documentElement.style` directly rather than toggling a class — brand colors are Tailwind v4 `@theme` tokens defined in `src/app/globals.css` (`ecom-orange`, `ecom-red`, `ecom-gray`, `ecom-cream`, `ecom-dark`, `ecom-black`), so use those token classes (e.g. `text-ecom-dark`, `bg-ecom-red`) rather than hardcoding hex values.

**Motion**: two shared animation primitives — `Reveal` (scroll-triggered fade/slide-in via `whileInView`, used for on-page sections) and `template.tsx` (route-level transition). Both use the same easing curve (`[0.22, 1, 0.36, 1]`). `SmoothScroll` wraps the whole app in Lenis for inertial scrolling. GSAP is also a dependency for more custom animation work (e.g. `Planes.tsx`, `Counter.tsx`).

**Contact form** (`src/app/api/contact/route.ts`): Node runtime route, validates payload shape/email regex server-side, HTML-escapes all interpolated user input before sending via Resend, and returns 500/502 with generic messages on missing config or send failure — never leaks Resend errors to the client.

**Brand assets**: logos in `public/images`, fonts in `public/fonts` and `src/fonts` (sourced from `Branding Ecommetrica/REBRANDING`, external to this repo).
