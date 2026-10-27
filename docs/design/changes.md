# Before → after

Screenshots: `before/` (dark only, v1 had no light theme) and `after/` (light + dark, 390 / 768 / 1440 px,
home and the Asmodee case study). `after/squint-1440-light.png` is the blurred hierarchy check;
`after/en-work-hover-1440-light.png` shows the project-row reveal.

| Area | Before | After | Why |
|---|---|---|---|
| Background | Three.js torus knot, perspective grid, grid-bg, noise overlay | Flat off-white / near-black | Four decorative layers carried no information and cost ~1 MB of JS and Perf 50 |
| Colour | Purple, cyan, amber + gradients | Neutrals + one burnt-orange accent, per-theme lightness | One accent can mean something (CTA, numbers, focus); AA verified by `npm run check:contrast` |
| Type | Space Grotesk 300–700, 9 sizes, light grey body | Schibsted Grotesk 400/600 + IBM Plex Mono 400, 1.25 scale, 9 named steps | Real weight contrast, readable body; mono only for metadata |
| Hero | Centred-ish name, pill badge, gradient surname, 3D blob, bouncing scroll cue | Left-aligned name → sentence headline → lead → availability → 2 CTAs | Says who/what/when in the first screen; nothing decorative |
| Proof | No numbers | 13% → 4%, 0 → 88%, 800+ as large numerals under the hero | The strongest material on the site, now the visual hook |
| Projects | 8 glass cards → modal repeating the text | 4 ruled index rows with an outcome metric; diagram revealed on hover/focus; 10 more in a collapsed list | Index scales; each featured row links to a real case study |
| Case studies | None | 4 pages: pitch, metrics, context, decisions, SVG architecture, results, links | Problem → role → decision → result, as asked |
| Skills | Colour logo wall + % bars | Three tiers of mono tags | Percentages were arbitrary and contradicted each other |
| Experience | Two columns of cards with glowing dots, 7 entries | Ruled timeline, 2 work + 3 education entries, one "Earlier" line | Removes padding (2019 internship, summer job) |
| Shape | rounded-full / 2xl / xl, glass + glow | One 4px radius, 1px hairlines, no shadows | Consistency |
| Motion | Fade-in-up on almost everything, Lenis smooth scroll | Hero stagger (≤390 ms), 160 ms hover/focus, CSS smooth anchors; all off under reduced motion | Purposeful only |
| Theme | Dark only | Light + dark via `prefers-color-scheme`, manual toggle stored in localStorage | Brief |

Numbers: mobile Lighthouse home Perf 50 → 97, A11y 95 → 100, BP 100 → 100, SEO 100 → 100.
JS in `.next/static/chunks`: 1.62 MB → 0.57 MB. CSS: 39 KB → 29 KB.
