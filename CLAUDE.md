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

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_BACKEND_URL` points the frontend at the Express backend in `backend/` (defaults to `http://localhost:4000` if unset).

The backend itself reads its own `.env` (copy `backend/.env.example` to `backend/.env`): `PORT`, `FRONTEND_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO_EMAIL`. `FRONTEND_URL` is a comma-separated allowlist of origins for CORS (e.g. local dev + qa + production) — with it unset, CORS rejects every cross-origin request rather than defaulting open.

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

**Frontend API layer** (`src/services/`): all calls to the backend go through here — components never call `axios`/`fetch` directly.
- `api.ts` — shared axios instance, `baseURL` from `process.env.NEXT_PUBLIC_BACKEND_URL` (default `http://localhost:4000`).
- `routes.ts` — `API_ROUTES`, the single source of truth for every backend path (e.g. `API_ROUTES.contact`). Add new endpoints here, not as string literals in a service.
- one `*.service.ts` per feature (e.g. `contact.service.ts`) — wraps `api` calls for that feature, converts `AxiosError` into a plain `Error` with the backend's message.

**Contact form**: `ContactForm.tsx` calls `submitContactForm()` from `src/services/contact.service.ts`, which posts to `API_ROUTES.contact` via the shared `api` axios instance. That hits a separate Express backend (`backend/`, Bun runtime — not a Next.js API route) at `/api/contact`. Backend layout mirrors the same `app` / `route` / `controller` / `services` split: `backend/src/app.ts` wires middleware and mounts `backend/src/route/contact.route.ts`, which delegates to `backend/src/controller/contact.controller.ts` (validates payload shape/email regex) and `backend/src/services/email.service.ts` (HTML-escapes user input, sends via Nodemailer/SMTP, credentials from `process.env`). Returns 400 on invalid input, 502 on send failure — never leaks SMTP errors to the client. `POST /api/contact` is also rate-limited (5 requests / 15 min per IP, via `express-rate-limit`) — returns 429 once exceeded. CORS is locked to `FRONTEND_URL` (see above), not open to all origins. Run it with `bun run dev` inside `backend/`.

Two branded HTML emails are sent per submission (`backend/src/services/email.templates.ts`, brand colors/logo pulled from the main site's `globals.css` and `public/images/logo-secundario.png`, embedded via `cid` — see `backend/src/assets/logo.png`): a notification to `CONTACT_TO_EMAIL` (required — failure here 502s the request) and a confirmation to the visitor's own address (best-effort — logged on failure, does not fail the request, since the lead was already captured).

**Backend deploy target is cPanel's Node.js Selector (plain Node, not Bun)**: `bun run build` inside `backend/` (`backend/scripts/build.ts`, via `Bun.build`) bundles `index.ts` + all of `src/**/*.ts` into a single `dist/index.js` (CommonJS — npm packages stay external `require`s, everything else is inlined), plus a minimal generated `dist/package.json`. `dist/` is exactly those two files — no `src/` folder, no separate asset files — that's what gets uploaded to cPanel. There's no logo file committed under `backend/` at all: it's read directly from the frontend's own `public/images/logo-secundario.png` — live off disk in dev (`email.service.ts`, monorepo-local `fs.readFileSync`), and inlined at build time into a `__LOGO_PNG_BASE64__` constant via `Bun.build`'s `define` for the production bundle — then attached to emails as an in-memory `Buffer`. See `backend/README.md` for the full deploy steps.

**Brand assets**: logos in `public/images`, fonts in `public/fonts` and `src/fonts` (sourced from `Branding Ecommetrica/REBRANDING`, external to this repo).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
