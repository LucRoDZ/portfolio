#!/usr/bin/env node
// Prints WCAG contrast of text tokens against their backgrounds in app/tokens.css (light only).
// Exits 1 if any pair is below AA (4.5:1).
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/tokens.css', import.meta.url), 'utf8');
const t = Object.fromEntries([...css.match(/:root \{([^}]*)\}/)[1].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const pairs = [
  ...['fg', 'muted', 'accent'].flatMap((fg) => ['bg', 'surface', 'sunken'].map((bg) => [fg, bg])),
  ['accent', 'accent-soft'],
  ['fg', 'accent-soft'],
  ['on-accent', 'accent'],
  ['on-pill', 'pill'],
];

let failed = false;
for (const [fg, bg] of pairs) {
  const r = ratio(t[fg], t[bg]);
  if (r < 4.5) failed = true;
  console.log(`${fg.padEnd(9)} on ${bg.padEnd(11)} ${r.toFixed(2)}${r < 4.5 ? '  FAIL' : ''}`);
}
process.exit(failed ? 1 : 0);
