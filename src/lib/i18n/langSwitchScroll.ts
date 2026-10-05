const KEY = "ecom-lang-scroll";
const MAX_AGE_MS = 10000;

type Saved = { target: string; ratio: number; at: number };

function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export function saveScrollForLangSwitch(targetPath: string) {
  try {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    const saved: Saved = { target: normalize(targetPath), ratio, at: Date.now() };
    sessionStorage.setItem(KEY, JSON.stringify(saved));
  } catch {}
}

let consumed: { path: string; ratio: number } | null = null;

export function takeSavedLangSwitchScroll(currentPath: string): number | null {
  const path = normalize(currentPath);
  if (consumed && consumed.path === path) return consumed.ratio;
  consumed = null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    const saved = JSON.parse(raw) as Saved;
    if (Date.now() - saved.at > MAX_AGE_MS) return null;
    if (saved.target !== path) return null;
    consumed = { path, ratio: saved.ratio };
    return saved.ratio;
  } catch {
    return null;
  }
}
