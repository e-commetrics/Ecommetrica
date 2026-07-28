# Ecommetrica — Website

Next.js 16 + React 19 + TypeScript + Tailwind CSS 4, matching the stack used
across Ecommetrica/Kevin's other projects.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — API key from [resend.com](https://resend.com), used by
  the contact form's API route (`src/app/api/contact/route.ts`).
- `CONTACT_FROM_EMAIL` — verified sender address in Resend.
- `CONTACT_TO_EMAIL` — inbox that should receive contact form submissions.

Without these, the contact form will return a friendly error instead of
sending email.

## Content

- Blog posts live as MDX files in `src/content/blog/*.mdx`. Add a new file
  with `title`, `date`, and `excerpt` frontmatter to publish a post — no CMS
  required.
- Case studies are defined in `src/lib/work.ts`.

## Branching

- `production` — deploys to the live site.
- `qa` — staging branch for review before merging to `production`.
- Feature work should branch off `qa` and merge back via PR.

## Deploying / previews

This project is built for [Vercel](https://vercel.com):

1. Import the GitHub repo into Vercel.
2. Set the environment variables above in Project Settings → Environment
   Variables (for both Production and Preview environments).
3. Every PR and every push to `qa` gets an automatic preview URL from
   Vercel — share that link for review before merging to `production`.
4. Pushes to `production` deploy to the live domain.

## Brand assets

Logos and fonts (Clash Display) are sourced from
`Branding Ecommetrica/REBRANDING` and live in `public/images`, `public/fonts`,
and `src/fonts`. Brand colors are defined as Tailwind theme tokens in
`src/app/globals.css`:

- `ecom-red` `#9C1512`
- `ecom-gray` `#585A5C`
- `ecom-cream` `#F2EDE9`
- `ecom-dark` `#25272A`
