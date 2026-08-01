# backend

Express API (Bun runtime) that handles the contact form for the Ecommetrica marketing site, sending mail via Nodemailer/SMTP.

To install dependencies:

```bash
bun install
```

Copy `.env.example` to `.env` and fill in SMTP credentials:

```bash
cp .env.example .env
```

To run in dev (auto-restart on change):

```bash
bun run dev
```

To run:

```bash
bun run start
```

## Deploying to cPanel (Node.js Selector)

cPanel's Node.js Selector runs plain Node, not Bun/TypeScript directly, so build first and upload the compiled output:

```bash
bun run build
```

This bundles `index.ts` + all of `src/**/*.ts` into a single `dist/index.js` (plain CommonJS — only `express`, `cors`, `dotenv`, `nodemailer`, `express-rate-limit` stay as external `require`s, everything else including the logo is inlined) and writes a minimal `dist/package.json` (runtime `dependencies` only, `"main": "index.js"`, `"scripts": { "start": "node index.js" }`). `dist/` contains exactly those two files — no `src/`, no separate asset files.

Upload the contents of `dist/` (`index.js`, `package.json`) to the cPanel Node app's folder, then on cPanel:

1. Run `npm install` (via the Node.js Selector's "Run NPM Install" button, or its terminal) to install `express`, `cors`, `dotenv`, `express-rate-limit`, `nodemailer` from `dist/package.json`.
2. Set the app's entry point to `index.js`.
3. Set env vars in the Node.js Selector UI: `FRONTEND_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO_EMAIL` (`PORT` is provided by cPanel/Passenger automatically — no need to set it).
4. Start/restart the app.

`dist/` is gitignored — rerun `bun run build` after any change and re-upload.

## Structure

- `index.ts` — entry point, loads env and starts the HTTP server.
- `src/app.ts` — Express app setup (CORS allowlist via `FRONTEND_URL`, middleware, route mounting).
- `src/route/` — route definitions (`POST /api/contact` is rate-limited, 5 req / 15 min per IP).
- `src/controller/` — request handling and validation.
- `src/services/email.service.ts` — sends mail via Nodemailer/SMTP: a required notification to `CONTACT_TO_EMAIL` (team) and a best-effort confirmation to the visitor's own email. Attaches the logo as an in-memory `Buffer` (via `cid`), not a file path. There's no logo file committed in `backend/` at all — the logo always comes straight from the frontend's `public/images/logo-principal.png`: in dev it's read live off disk (`fs.readFileSync`, monorepo-local only), and in the production bundle `scripts/build.ts` reads the same file at build time and inlines it as a `__LOGO_PNG_BASE64__` constant via `Bun.build`'s `define`, so `dist/index.js` ships fully self-contained.
- `src/services/email.templates.ts` — branded HTML email templates (Ecommetrica colors/logo) shared by both emails.
- `scripts/build.ts` — the `bun run build` bundler script (uses `Bun.build`).

This project was created using `bun init` in bun v1.3.13. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
