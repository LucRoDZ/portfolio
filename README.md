# Portfolio — Lucas Zivan

Source of [lucaszivan.app](https://lucaszivan.app). Next.js 16 (App Router, fully static), Tailwind CSS v4, TypeScript. No client-side animation or 3D libraries.

## Scripts

```bash
npm run dev             # http://localhost:3000 (redirects to /en or /fr)
npm run build           # production build
npm start               # serve the build
npm test                # unit tests (Vitest)
npm run lint
npm run check:links     # crawl a running build; set BASE_URL (default http://localhost:3000)
npm run check:contrast  # WCAG contrast of the colour tokens
```

Copy `.env.example` to `.env.local` for the optional settings (site URL, booking link, analytics).

## Where things live

| Path | What |
|---|---|
| `content/dictionaries/{en,fr}.ts` | Every UI string. `fr.ts` is typed against `en.ts`, so a missing key fails the build. |
| `content/projects.ts` | Case studies and the "More projects" list, with the source of each fact. |
| `content/experience.ts`, `content/skills.ts`, `content/site.ts` | Timeline, skill tiers, e-mail / links / CV paths. |
| `app/tokens.css` | Design tokens: colours (light + dark), type scale, radius, widths. The only place raw values live (plus `lib/brand.ts` for OG images). |
| `app/[locale]/` | Routes: home, `projects/[slug]`, OG images, 404. |
| `proxy.ts` | Redirects locale-less URLs using `Accept-Language`, EN fallback. |
| `lib/` | i18n, SEO/JSON-LD, analytics, diagram layout, TODO handling — all unit-tested in `tests/`. |
| `docs/` | Design audit, before/after screenshots, copy options. |

## Placeholders

Unknown facts are written as `TODO(lucas): …`. They are outlined in development and left out of production builds, and `check:links` fails if one reaches the HTML. Find them with:

```bash
grep -rn "TODO(lucas)" content
```
