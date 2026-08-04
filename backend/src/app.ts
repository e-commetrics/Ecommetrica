import express from "express";
import cors from "cors";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import contactRoute from "./route/contact.route";
import { buildNotFoundHtml } from "./services/notFound.template";
import type { Lang } from "./types";

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/contact", contactRoute);

// Last resort: cPanel's Node.js Selector (Passenger) forwards any request
// Apache can't serve as a static file to this app, so an unmatched route
// (e.g. a stale/typo'd frontend path) would otherwise hit Express's bare
// "Cannot GET /..." instead of a branded page.
app.use((req, res) => {
  // Prefer the real Next.js-rendered 404 (full branding, and it detects
  // es/en client-side from the URL itself — see GlobalNotFoundShell) when
  // this backend shares a filesystem with the deployed frontend build.
  // Falls back to the plain built-in page (e.g. local dev, where this isn't set).
  const frontendNotFoundPath = process.env.FRONTEND_STATIC_DIR
    ? join(process.env.FRONTEND_STATIC_DIR, "404.html")
    : undefined;

  if (frontendNotFoundPath && existsSync(frontendNotFoundPath)) {
    res.status(404).type("html").send(readFileSync(frontendNotFoundPath, "utf-8"));
    return;
  }

  const lang: Lang = req.path === "/en" || req.path.startsWith("/en/") ? "en" : "es";
  res.status(404).type("html").send(buildNotFoundHtml(lang));
});

export default app;
