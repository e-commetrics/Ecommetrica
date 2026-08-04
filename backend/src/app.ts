import express from "express";
import cors from "cors";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import contactRoute from "./route/contact.route";

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
