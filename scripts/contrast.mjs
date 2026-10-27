#!/usr/bin/env node
// Prints WCAG contrast of text tokens against bg and surface, for both themes in app/tokens.css.
// Exits 1 if any text token is below AA (4.5:1).
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/tokens.css', import.meta.url), 'utf8');
const block = (re) => Object.fromEntries([...css.match(re)[1].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const themes = { light: block(/:root \{([^}]*)\}/), dark: block(/:root\[data-theme='dark'\] \{([^}]*)\}/) };

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

let failed = false;
for (const [name, t] of Object.entries(themes)) {
  for (const token of ['fg', 'muted', 'faint', 'accent']) {
    for (const bg of ['bg', 'surface']) {
      const r = ratio(t[token], t[bg]);
      if (r < 4.5) failed = true;
      console.log(`${name.padEnd(5)} ${token.padEnd(6)} on ${bg.padEnd(7)} ${r.toFixed(2)}${r < 4.5 ? '  FAIL' : ''}`);
    }
  }
  const r = ratio(t['on-accent'], t.accent);
  if (r < 4.5) failed = true;
  console.log(`${name.padEnd(5)} on-accent on accent  ${r.toFixed(2)}`);
}
process.exit(failed ? 1 : 0);
