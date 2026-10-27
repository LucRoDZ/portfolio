# Visual audit — portfolio v1 (2026-10-27)

Screenshots: `docs/design/before/` (390 / 768 / 1440 px, dark only — there is no light theme).

## Working
- Dark, quiet base and the "LZ" monogram give a recognisable identity.
- Left-aligned hero with a big name; mono labels for metadata are a good instinct.
- Copy is in one place per section, so it is easy to replace.

## Looks templated (the "generated portfolio" tells)
- Purple → cyan → amber gradient text on the surname, logo, card hovers and email. Three accents + a gradient = no accent.
- Three.js torus knot + perspective floor grid + grid-bg + noise overlay: four decorative layers behind the content, none carry information. The 3D scene alone costs ~1.4 MB JS and ~146 s TBT in Lighthouse (Perf 50).
- Pill badge with pulsing green dot ("Disponible pour opportunités") above the name; bouncing "Scroll" mouse indicator.
- Every block is a `glass rounded-2xl` card (stats, skills, projects, socials, modal). Glow shadows on buttons.
- Skill rows: coloured logo wall + percentage bars with arbitrary numbers (Kubernetes 70 % > Docker 65 %).
- `// À propos` code-comment labels; "Conçu & développé avec passion" footer.
- Fade-in-up on almost every element, with per-item delays up to ~1 s.

## Inconsistent
- Radii: `rounded-full` (buttons, tags, badges), `rounded-2xl` (cards), `rounded-xl` (skills), `rounded-[3px]` (scrollbar).
- Type: 9 sizes from `text-[11px]` to `text-9xl`, weights 300–700; light 300 body on grey (`#888` on `#050505`) — low contrast; Lighthouse flags color-contrast.
- Spacing: sections `py-32 md:py-40` but inner gaps 4/6/8/12/16 without a rhythm; no shared max-width (Tailwind `container` changes at every breakpoint).
- Colours: 15 CSS variables plus raw `rgba(167,139,250,…)`, `emerald-400`, `purple-500/10`, brand hexes in the skills data.
- Project cards: no image, no outcome, no link — a click opens a modal that repeats the same text.

## Content problems that are also design problems
- No numbers anywhere, although the Asmodee metrics (13 % → 4 %, 0 → 88 %, 800+) are the strongest material available.
- Hierarchy on squint: name → 3D blob → buttons. Projects and proof are invisible above the fold.
