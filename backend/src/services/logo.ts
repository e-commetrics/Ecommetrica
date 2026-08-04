import { readFileSync } from "fs";
import { join } from "path";

// In the production bundle, scripts/build.ts injects the real logo bytes here
// via Bun.build's `define`, read at build time from the frontend's own
// public/images/logo-secundario.png — so dist/index.js needs no asset file.
declare const __LOGO_PNG_BASE64__: string | undefined;

function loadLogoBase64(): string {
  if (typeof __LOGO_PNG_BASE64__ !== "undefined") {
    return __LOGO_PNG_BASE64__;
  }
  // Dev fallback (unbundled `bun run index.ts`): read straight from the
  // frontend's public folder, since this only ever runs inside the monorepo.
  const devLogoPath = join(__dirname, "../../../public/images/logo-secundario.png");
  return readFileSync(devLogoPath).toString("base64");
}

export const LOGO_BASE64 = loadLogoBase64();
