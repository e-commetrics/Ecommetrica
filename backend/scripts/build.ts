import { rmSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

const root = join(import.meta.dir, "..");
process.chdir(root);

rmSync("dist", { recursive: true, force: true });

// Read the logo straight from the frontend's own asset — no copy kept in
// backend/ — and inline it into the bundle so dist/index.js is self-contained.
const logoPath = join(root, "../public/images/logo-secundario.png");
const logoBase64 = readFileSync(logoPath).toString("base64");

const result = await Bun.build({
  entrypoints: ["./index.ts"],
  outdir: "dist",
  target: "node",
  format: "cjs",
  // Keep npm packages external — they're installed via `npm install` on the
  // server from dist/package.json — only our own src/*.ts gets bundled in.
  external: ["express", "cors", "dotenv", "nodemailer", "express-rate-limit"],
  naming: "index.js",
  define: {
    __LOGO_PNG_BASE64__: JSON.stringify(logoBase64),
  },
});

if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
const distPkg = {
  name: pkg.name,
  version: pkg.version ?? "1.0.0",
  private: true,
  main: "index.js",
  scripts: { start: "node index.js" },
  dependencies: pkg.dependencies,
};
writeFileSync("dist/package.json", JSON.stringify(distPkg, null, 2) + "\n");

console.log(
  "Build complete: backend/dist/index.js (single bundled file, logo embedded inline). Upload backend/dist to cPanel, then run `npm install` there."
);
