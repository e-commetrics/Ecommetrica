import express from "express";
import cors from "cors";
import { existsSync, readFileSync } from "fs";
import { extname, join } from "path";
import contactRoute from "./route/contact.route";
import geoRoute from "./route/geo.route";

const app = express();

// Single hop: cPanel's Apache/Passenger reverse-proxies every request to this app, so
// req.ip is the proxy's own address unless this is set — needed for both /api/geo (real
// visitor IP for the GeoIP lookup) and the /api/contact rate limiter (keyed on req.ip).
app.set("trust proxy", 1);

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
app.use("/api/geo", geoRoute);

// Same Passenger fallback as below, but for a narrower case: the frontend's
// static export (trailingSlash: true) only has an index.html at
// "/work/slug/", never at "/work/slug". Apache's own mod_dir would normally
// 301 that bare path to the slash-terminated one, but it never gets the
// chance — a directory with no exact file match already falls through to
// this app. Redo that redirect here before the 404 fallback below claims it.
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  if (req.path === "/" || req.path.endsWith("/") || extname(req.path)) return next();

  const staticDir = process.env.FRONTEND_STATIC_DIR;
  if (!staticDir || !existsSync(join(staticDir, req.path, "index.html"))) return next();

  const query = req.url.slice(req.path.length);
  res.redirect(301, `${req.path}/${query}`);
});

// Last resort: cPanel's Node.js Selector (Passenger) forwards any request
// Apache can't serve as a static file to this app, so an unmatched route
// (e.g. a stale/typo'd frontend path) would otherwise hit Express's bare
// "Cannot GET /...". Serve the real Next.js-rendered 404 from the deployed
// frontend build instead, since this backend shares a filesystem with it.
app.use((_req, res) => {
  const frontendNotFoundPath = process.env.FRONTEND_STATIC_DIR
    ? join(process.env.FRONTEND_STATIC_DIR, "404.html")
    : undefined;

  if (frontendNotFoundPath && existsSync(frontendNotFoundPath)) {
    res.status(404).type("html").send(readFileSync(frontendNotFoundPath, "utf-8"));
    return;
  }

  res.status(404).send("Not found");
});

export default app;
