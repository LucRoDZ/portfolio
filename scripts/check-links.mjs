#!/usr/bin/env node
// Crawls a running build (npm run build && npm start) from /en and /fr.
// Fails on any internal link that does not return 2xx/3xx, or on "TODO(lucas)" leaking into HTML.
// Prints external links for manual checking.
// Usage: BASE_URL=http://localhost:3000 npm run check:links
const base = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
// Canonical/hreflang/OG URLs use the production origin; check them against the local build.
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lucaszivan.app').replace(/\/$/, '');
const queue = ['/en', '/fr', '/sitemap.xml', '/robots.txt', '/'];
const seen = new Set();
const external = new Map();
const failures = [];

const hrefs = (html) => [...html.matchAll(/\s(?:href|src)="([^"#]*)(?:#[^"]*)?"/g)].map((m) => m[1]).filter(Boolean);

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(base + path, { redirect: 'follow' });
  if (!res.ok) {
    failures.push(`${res.status} ${path}`);
    continue;
  }
  if (!(res.headers.get('content-type') ?? '').includes('text/html')) continue;
  const html = await res.text();
  if (html.includes('TODO(lucas)')) failures.push(`TODO placeholder rendered on ${path}`);
  for (const raw of hrefs(html)) {
    if (raw.startsWith('mailto:')) continue;
    const href = raw.startsWith(site) ? raw.slice(site.length) || '/' : raw;
    if (/^https?:\/\//.test(href)) {
      if (!href.startsWith(base)) external.set(href, (external.get(href) ?? new Set()).add(path));
      continue;
    }
    const url = new URL(href, base + path);
    if (!seen.has(url.pathname)) queue.push(url.pathname);
  }
}

console.log(`Checked ${seen.size} internal URLs.`);
console.log(`\nExternal links to check manually (${external.size}):`);
for (const [href, pages] of [...external].sort()) console.log(`  ${href}  ← ${[...pages].join(', ')}`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log('\nAll internal links resolve.');
